import { AppOptions, LogLevel } from 'koishi-core'
import { WatchOptions } from 'chokidar'

export * from 'koishi-core'

export type PluginConfig = Record<string, any> | (string | [string, any?])[]

export interface WatchConfig extends WatchOptions {
  root?: string
}

export interface AppConfig extends AppOptions {
  plugins?: PluginConfig
  logLevel?: LogLevel
  logTime?: string | boolean
  watch?: WatchConfig
}
