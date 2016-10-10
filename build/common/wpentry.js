var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function(dirname, opts, files, util){
  var _ = util._,
  $ = util.$,
  fs = util.fs,
  path = util.path,
  gulp = util.gulp,
  alias = util.alias,
  gutil = util.gutil,
  configs = util.configs,
  webpack = util.webpack,
  babelQuery = util.babelQuery

  var that = this

  var nodeModulesPath = path.join(__dirname, '../../node_modules')

  //make webpack plugins
  var wpPlugins = function(dirname, opts) {
    var commonName = opts.env !== 'pro' ? 'common.js' : 'common_[hash].js'
    var venders,
        common_trunk_config = {
          name: 'common',
          filename: commonName,
          minChunks: 1, //Infinity
          async: false,
          children: false
        }

    var ret_plugins = [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new ExtractTextPlugin("../css/js_[name]_[contenthash].css", {
        allChunks: opts.isPack === true ? true : false
      }),
      new webpack.optimize.CommonsChunkPlugin(common_trunk_config),
    ]

    if (opts.env !== 'pro'){
      ret_plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
        new ExtractTextPlugin("../css/js_[name]_[contenthash].css", {
          allChunks: opts.isPack === true ? true : false
        }),
        new webpack.optimize.CommonsChunkPlugin(common_trunk_config),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: "dev"
          }
        })
      ]
    }

    if ( _.isString(dirname) && dirname !== 'pages' ) {
      common_trunk_config.filename = "./otherCommon/_" + dirname + ".js";
    }

    return ret_plugins;
  }


  /**
   * [custom_modules 配置webpack的loaders]
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  var custom_modules = function(opts) {
    var module = {
      noParse: [
        path.join(nodeModulesPath, '/react/dist/react.min'),
        path.join(nodeModulesPath, '/react-dom/dist/react-dom.min'),
        path.join(nodeModulesPath, '/redux/dist/redux.min'),
        { test: /[\/\\]js[\/\\](vendor|vendor_custom|global)[\/\\]/ }, //http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
      ],

      loaders: [
        { test: /\.tsx?$/, exclude: /(node_modules|bower_components|builder|dist)/, loader: "ts-loader?compiler=ntypescript" }
        , { test: /\.coffee$/, loader: 'coffee', exclude: /(node_modules|bower_components|builder|dist)/ }
        , { test: /\.hbs$/, loader: "handlebars-loader" }

        , { test: /\.json$/, loader: "json-loader" }
        , { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" }
        , { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" }
        , { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" }
        , { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" }
        , { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        // , { test: /\.(woff|woff2|svg|eot|ttf)$/, loader: 'url?limit=50000&name=fonts/[name].[hash].[ext]'}

        , { test: /\.(gif|png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[name].[hash].[ext]' } // inline base64 URLs for <=8k images, direct URLs for the rest
        , { test: /\.rt$/, loader: "react-templates-loader" }
        , { test: /\.md$/, loader: "html!markdown" }

        // wait for webpack2 stable
        , { test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader") }
        , { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', "raw!less") }
        , { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', "raw!stylus") }
        // ,{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader',"raw!sass") }

        //,{ test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
        // { // Only apply on tinymce/tinymce
        //     include: require.resolve('tinymce/tinymce'),    //检测到路径包含tinymce/tinymce
        //     loader: 'exports?window.tinymce',             //输出全局变量tinymce
        // },
      ]
    }

    if (configs.babel) {
      require('babel-polyfill');
      var _babel = 'babel'
      if (opts.env !== 'pro') {
        _babel = 'babel?' + JSON.stringify(babelQuery)
      }
      module.loaders.push({
        test: /\.js(x)?$/,
        exclude: /(node_modules|bower_components|_builder|dist)/,
        loader: _babel,
        include: [
          // 只去解析运行目录下的 public 文件夹
          path.join(__dirname, '../../public'),
        ],
        // exclude: 
      })
    } else {
      module.loaders.push({
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components|_builder|dist)/,
        loader: "jsx-loader"
      })
    }
    return { module }
  }

  wpEntry = function(dirname, opts){
    var out2path = path.join(configs.dirs.dist + '/' + configs.version + '/dev/js/')
        filename = configs.hash ? '[name]__[hash].js' : '[name].js'
        chunkFilename = configs.hash ? '[id]_[name]_[hash].js' : '[id]_[name].js'
    if (opts.env === 'pro') {
      out2path = path.join(__dirname, '../../', configs.dirs.dist + '/' + configs.version + '/js/');
      filename = '[name]__[hash].js'
      chunkFilename = '[id]_[name]_[hash].js'
    }

    var _plugins = wpPlugins(dirname, opts),
        _externals = {
          "fkp-sax": "SAX"
        }

    var _watch = ( opts.env && opts.env.indexOf('pro')>-1 ? false : true )

    return {
      cache: true,
      debug: true,
      progress: true,
      colors: true,
      recursive: true,
      entry: files,
      watch: _watch,
      output: {
        path: out2path,
        publicPath: '/js/',
        filename: filename,
        chunkFilename: chunkFilename,
        libraryTarget:'var',
      },
      externals: _externals,
      plugins: _plugins,
      resolve: {
        root: path.resolve(__dirname, '../../node_modules'),
        alias: alias,
        extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.coffee', '.html', '.css', '.styl', '.less', '.hbs', '.rt', '.md'],
        modulesDirectories: ["node_modules"],
      },
      module: custom_modules(opts),
      ts: {
        compiler: 'ntypescript'
      }
    }
  }

  return wpEntry(dirname, opts)

}  // end module
