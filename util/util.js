const xml2js = require('xml2js')
const _ = require('lodash')
const template = require('../wechat-lib/tpl')

exports.parseXML = xml => {
  return new Promise( (resolve,reject)=>{
    xml2js.parseString(xml,{trim:true}, (err,content)=>{
      if (err) reject(err)
      else resolve(content)
    })
  })
}



/**
 * 
 * 
 * 
      { ToUserName: [ 'gh_15a0742ce96b' ],
        FromUserName: [ 'oqTmpjvJz_Z9myIR6_nW0QOV33hw' ],
        CreateTime: [ '1536016165' ],
        MsgType: [ 'text' ],
        Content: [ '11' ],
        MsgId: [ '6597139195249680773' ] 
      } 
 
 * 
 */
exports.formatMessage = result => {
  let message = {};
  if(typeof result === 'object'){
    _.forEach(result, (item,key)=>{
      if(item.length == 1){
        let val = item[0]
        if(typeof val === 'object'){
          message[key] = formatMessage(val)
        }else{
          message[key] = (val || '').trim()
        }
      }else{
        message[key] = []
        for (let j = 0;j<item.lenght;j++){
          message[key].push(formatMessage[item[j]])
        }
      }
    })
  }
  return message
}


exports.tpl = (content,msg)=>{
  let type = 'text'
  if(Array.isArray(content)) type ='news'
  if(!content) type='Empty news'
  if(content && content.type){
    type = content.type
  }
  let info = Object.assign({},{
    content,
    msgType:type,
    createTime:new Date().getTime()/1000,
    toUserName:msg.FromUserName,
    fromUserName:msg.ToUserName
  })
  return template(info)
}

