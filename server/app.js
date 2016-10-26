// import init from './init'
// let app = init()
//
// // import Koa from 'koa'
// // const app = new Koa()
//
// // app.use( async function (ctx, next){
// //   // ctx.body = 'Hello World'
// //   return await ctx.render('hello',{})
// // })
// app.listen(8070)

import init from './init'
async function server(){
  try {
    let app = await init()
    app.listen(CONFIG.port)
  } catch (e) {
    console.error(e.stack)
  }
}
server()
