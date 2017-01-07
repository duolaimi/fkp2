import router from '../../route'
import libs from 'libs'
import adapter from 'component/adapter/mgbloglist'
import {
  forList,
  forDetail,
  forSave,
  forTotal
} from './handle/topic'

function forDelete(){}
function forUpdate(){}
function forAdd(){}

export default async function(ctx, next){
  let fkp = ctx.fkp
  const component = fkp.component()
  let blog = await fkp.blog()
  let routePrefix = this.opts.prefix
  let route = router.makeRoute(ctx, routePrefix)
  let pageData = router.staticMapper(ctx, fkp.staticMapper, route, routePrefix)

  let xData, xDetail, xAdd, xSave
  let [cat, title, id] = Object.values(ctx.params)
  let isAjax = fkp.isAjax()
  switch (cat) {
    case 'update':
      forUpdate()
      break;
    case 'delete':
      forDelete()
      break;
    case 'add':
      xAdd = true
      break;
    case 'save':
      xSave = await forSave(ctx, blog, isAjax)
      break;
    case 'checkLogin':
      // xAdd = true
      break;
    case 'get':
      if (ctx.query.topic) xDetail = await forDetail(ctx, blog, isAjax)
      else if(title == 'total') {
        return ctx.body = {total: await forTotal(ctx, blog, isAjax)}
      }
      else xData = await forList(ctx, blog, isAjax)
      break;
    case 'page':
      xData = await forList(ctx, blog)
      break;
    case 'topic':
      if (title) xDetail = await forDetail(ctx, blog)
      break;
    default:
      xData = await forList(ctx, blog)
  }

  if (isAjax) {
    pageData =  xData||xDetail||xSave
  } else {
    /**
     * blog list
     */
    if (xData) {
      // node 端注入js和css
      let attachjs
      let attachcss = await fkp.injectcss([
        '~/css/m/boot_button',
        '/css/m/list/qqmusic',
        '/css/m/tabs/blog'

        // '/css/m/list/lagou',
        // '/css/m/list/pagination'
      ])

      const props = {
        data: adapter(xData.lists),
        header: <div style={{marginTop: '15px'}}></div>,
        listClass: 'qqmusic',  //like_lagou
        pagenation: {
          data: { total: xData.total, query: '/blog/page/', per: 20 },
          begin: { start: parseInt(title||1)-1 }
        }
      }

      const tabsTreeHeader = () => {
        const headerItem = [
          { img: '/images/logo128.png',
            body:[
              {title: <div>天天修改</div>},
              {title: <hr />},
            ]
          }
        ]
        return component.cards({
          data: headerItem,
          theme: 'cards/blog'
        }, true)
      }

      const tabsProps = {
        data: [
          {title: 'AGZGZ', idf: 'category'},
          {title: '博客', content: component.loadlist(props, true), parent: 'category' },
          {title: '用户', content: '444', parent: 'category'}
        ],
        treeHeader: tabsTreeHeader(),
        theme: '/css/m/tabs/blog',
      }

      let listStr = ''
      if (routePrefix=='/logs') {
        route = 'blog'
        listStr = component.pagilist(props)
        attachjs = await fkp.injectjs(['/js/blog/pagilist'])   // node端注入js return {attachCss: resource...} 分页按钮
      } else {
        listStr = component.tabs(tabsProps)
        attachjs = await fkp.injectjs(['/js/blog/tabs'])   // node端注入js {attachCss: resource...} 自动加载
        attachjs.istab = true   //控制一下模板

        // listStr = component.loadlist(props)
        // attachjs = await fkp.injectjs(['/js/blog/loadlist'])   // node端注入js {attachCss: resource...} 自动加载
      }
      pageData = _.assign(pageData, attachcss, attachjs, {blog:{list: listStr}} )
    }

    /**
     * blog 详情
     */
    if (xDetail) {
      let attachcss = await fkp.injectcss(['/css/t/markdown.css'])   // node端注入css {attachCss: resource...}
      let attachjs = await fkp.injectjs(['/js/t/prettfy.js'])   // node端注入js {attachCss: resource...}
      pageData = _.assign(pageData, attachcss, attachjs, {blog:{mdcontent: xDetail.mdcontent}} )
    }

    /**
     * 添加文章
     */
    if (xAdd) {
      pageData.xAdd = true
    }

    if (xSave) {
      pageData = _.assign(pageData, xSave )
    }

  }
  return router.renderPage(ctx, route, pageData, isAjax)
}
