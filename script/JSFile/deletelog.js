// 使用 Shell 指令删除所有日志文件
// 定时任务： 59 23 * * * https://raw.githubusercontent.com/elecV2/elecV2P/master/script/JSFile/deletelog.js

$exec('rm -f *.log', {
  cwd: './logs',        // 日志文件所在文件夹
  call: true,
  cb(data, error, finish){
    error ? console.error(error) : console.log(data)
    if (finish) console.log('日志已删除')
  }
})