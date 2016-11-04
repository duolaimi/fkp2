let co = require('co')
let Path = require('path')
let through2 = require('through2')
let bluebird = require('bluebird')
let stream = require('stream')
let request = require('request')
let fs = bluebird.promisifyAll(require('fs'))
let parseanyHtmlDirs = require('./base/_readhtmldir').default
let debug = Debug('fkp')
let mapper = require('./modules/mapper')
let Fetch = require('./modules/fetch').default
let router = require('./route')
global.Fetch = Fetch

export default async function(app) {

    let innerData = {
      route: {
        prefix: []
      }
    }

    let fns = [
      save2file,
      routepreset,
      fileexist,
      filetype,
      readdir,
      mkdir,
      copy
    ]

    function _fkp(ctx, opts){
      this.ctx = ctx
      this.opts = opts
    }

    let fkp = function(ctx, opts){
      return new _fkp(ctx, opts)
    }
    fkp.staticMapper = mapper
    fkp.innerData = innerData
    fkp.config = CONFIG
    fkp.root = Path.join(__dirname, '../../')
    for (let item of fns){
      fkp[item.name] = item
    }

    fkp.plugins = function(name, fn){
      _fkp.prototype[name] = function() {
        return fn.apply(this, [fkp, ...arguments])
      }
    }

    fkp.utileHand = function(name, fn){
      fkp[name] = function() {
        return fn.apply(null, [fkp, ...arguments])
      }
    }

    // register 助手方法
    let _utilesFiles = fs.readdirSync(Path.resolve(__dirname, './base'))
    if (_utilesFiles && _utilesFiles.length) {
      for (let utileFile of _utilesFiles) {
        if (utileFile.indexOf('_')!=0) {
          let utileFun = require('./base/'+utileFile).default()
          fkp.utileHand(Path.parse(utileFile).name, utileFun)
        }
      }
    }

    // // register 插件
    let _pluginFiles = fs.readdirSync(Path.resolve(__dirname, './plugins'))
    if (_pluginFiles && _pluginFiles.length) {
      for (let pluginFile of _pluginFiles) {
        if (pluginFile.indexOf('_')!=0) {
          let plugin = require('./plugins/'+pluginFile).default(fkp)
          fkp.plugins(Path.parse(pluginFile).name, plugin)
        }
      }
    }

    // ============ 内联助手方法 ==============

    function copy(src, dist){
      // fs.createReadStream(src).pipe(fs.createWriteStream(dist))
      fs.createReadStream(src)
      .pipe(through2({ objectMode: true, allowHalfOpen: false },
        function (chunk, enc, cb) {
          cb(null, chunk)
        }
      ))
      .pipe(fs.createWriteStream(dist))
    }

    async function save2file(str, dist){
      if (str && str.indexOf('http')==0) {
        request.get(str).pipe(fs.createWriteStream(dist))
      }

      if (str && str.length>20) {
        fs.writeFileAsync(dist, str).then( sss=>sss).catch(e=>{
          debug('fileexist: ' + e.message)
          return false
        })
      }
    }

    // 动态设置路由的prefix
    async function routepreset(prefix, routerOptions) {
      if (!prefix) return
      if (prefix.indexOf('/')==-1) return
      let prefixs = innerData.route.prefix
      if (prefixs.indexOf(prefix)>-1) return
      prefixs.push(prefix)
      await router(app, prefix, routerOptions)
    }

    async function fileexist(_path){
      return fs.statAsync(_path).then( sss => sss ).catch( e => {
        debug('fileexist: ' + e.message)
        return false
      })
    }

    function filetype(extname) {
      if (extname.indexOf('.')===0) extname = extname.replace('.', '')
      var all = {
        style: ['css', 'less', 'stylus', 'styl'],
        templet: ['hbs', 'ejs', 'jade', 'pug', 'htm', 'html', 'php', 'jsp'],
        script: ['js', 'jsx', 'coffee', 'cjsx', 'ts', 'tsx']
      }

      var staticType = 'script'
      for (let item in all) {
        var arys = all[item];
        if (_.indexOf(arys, extname) > -1) staticType = item;
      }
      return staticType;
    }

    async function readdir(_path){
      let stat = await fileexist(_path)
      if (!stat) return false
      return fs.readdirAsync(_path)
      .then( dirs => {
        return dirs.filter( item => item.indexOf('.')!=0 || item.indexOf('.')==-1 || item.indexOf('_')!=0 )
      })
      .catch( e => {
        debug('readdir: ' + e.message)
        return false
      })
    }

    function mkdir(path){
      let _mode = '0777'
      return fs.mkdirAsync(path).then( ()=>true ) .catch( e => {
        debug('mkdir: ' + e.message)
        return false
      })
    }

    // =========== 注册fkp中间件 =============
    app.fkp = fkp
    app.use(async (ctx, next)=>{
      Fetch.init(ctx)   //初始化Fetch API
      ctx.fkp = fkp
      await next()
    })

    //路由处理
    if (_.isArray(CONFIG.route.prefix)) {  //koa-router prefix，任何prefix均带有resful三层结构 :cat:title:id
      let prefix = CONFIG.route.prefix
      prefix.map((item)=>{
        if (item.indexOf('/')==0) router(app, item)
      })
    }
    router(app)
}