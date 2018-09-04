exports.reply =  async (ctx,next) => {
  const message = ctx.wexin
  if(message && message.MsgType == 'text'){
    let content = message.content
    let reply = `ni shuo de neirong ${content}`
    if (content == 1){
      reply = '钱兆宇'
    }
    ctx.body = reply
    await next()
    
  } 
}