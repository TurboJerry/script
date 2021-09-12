import { Adapter, Logger, renameProperty } from 'koishi'
import { Opcode, Payload } from './types'
import { adaptSession, adaptUser } from './utils'
import { DiscordBot } from './bot'
import WebSocket from 'ws'

const logger = new Logger('discord')

export namespace WebSocketClient {
  export interface Config extends Adapter.WebSocketClient.Config {}
}

/** https://discord.com/developers/docs/topics/gateway */
export default class WebSocketClient extends Adapter.WebSocketClient<DiscordBot.Config, WebSocketClient.Config> {
  static schama = Adapter.WebSocketClient.schema

  prepare() {
    return new WebSocket('wss://gateway.discord.gg/?v=8&encoding=json')
  }

  heartbeat(bot: DiscordBot) {
    logger.debug(`heartbeat d ${bot._d}`)
    bot.socket.send(JSON.stringify({
      op: Opcode.Heartbeat,
      d: bot._d,
    }))
  }

  accept(bot: DiscordBot) {
    if (bot._sessionId) {
      logger.debug('resuming')
      bot.socket.send(JSON.stringify({
        op: Opcode.Resume,
        d: {
          token: bot.config.token,
          session_id: bot._sessionId,
          seq: bot._d,
        },
      }))
    }

    bot.socket.on('message', async (data) => {
      data = data.toString()
      let parsed: Payload
      try {
        parsed = JSON.parse(data)
      } catch (error) {
        return logger.warn('cannot parse message', data)
      }
      logger.debug(require('util').inspect(parsed, false, null, true))
      if (parsed.s) {
        bot._d = parsed.s
      }

      // https://discord.com/developers/docs/topics/gateway#identifying
      if (parsed.op === Opcode.Hello) {
        bot._ping = setInterval(() => this.heartbeat(bot), parsed.d.heartbeat_interval)
        if (bot._sessionId) return
        bot.socket.send(JSON.stringify({
          op: Opcode.Identify,
          d: {
            token: bot.config.token,
            properties: {},
            compress: false,
            // https://discord.com/developers/docs/topics/gateway#gateway-intents
            intents: (1 << 9) + (1 << 10) + (1 << 12) + (1 << 13),
          },
        }))
      }

      if (parsed.op === Opcode.Dispatch) {
        if (parsed.t === 'READY') {
          bot._sessionId = parsed.d.session_id
          const self: any = adaptUser(parsed.d.user)
          renameProperty(self, 'selfId', 'userId')
          Object.assign(bot, self)
          logger.debug('session_id ' + bot._sessionId)
          return bot.resolve()
        }
        const session = await adaptSession(bot, parsed)
        if (session) this.dispatch(session)
      }
    })

    bot.socket.on('close', () => {
      clearInterval(bot._ping)
    })
  }
}
