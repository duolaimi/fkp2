import {inject} from 'libs'
import { tabs as xTabs, htabs as Tabs } from 'component'
import partForm from './_common/form'
import phoneForm from './_common/phone'
const baseQRcode = 'data:image/jpeg;base64,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'
const STATE = SAX('Login')

STATE.append({
  isMobile: false
})

// 注入样式表
// _.delay(()=>{
//   inject().css(`
//
// `)
// }, 0)


// ========= tabs ========

const qrcode = (
  <div className='qrcode'>
    微信扫码，快速安全，特惠专享8折起！
    <div className="center">
      <img src={baseQRcode}/>
    </div>
  </div>
)

const configTabs = [
  {title: '账号登录', content: partForm},
  {title: '微信扫码', content: qrcode},
  {title: '手机登录', content: phoneForm},
]
// const configTabs = [
//   {title: '一级菜单', content: qrcode},
//   {title: '一级菜单', content: partForm, idf: 'xxx', url: 'javascript:;'},
//   {title: '二级菜单', content: 'fdfdsfs', parent: 'xxx', idf:'zzz', url: 'javascript:;'},
//   {title: '二级菜单', content: 'fdfdsfs', parent: 'xxx', idf: 'yyy'},
//   {title: '账号登录3', content: 'fdfdsfs', parent: 'yyy', idf: 'zzz'},
//   {title: '微信扫码4', content: 'fdfdsfs', parent: 'zzz',url: 'javascript:;'},
//   {title: '微信扫码4', content: 'fdfdsfs', parent: 'zzz',url: 'javascript:;'},
//   {title: '一级菜单', content: partForm, idf: 'ss', url: 'javascript:;'},
//   {title: '二级菜单', content: 'fdfdsfs', parent: 'ss', url: 'javascript:;'},
//   {title: '二级菜单', content: 'fdfdsfs', parent: 'ss'},
// ]

const tabsxx = Tabs({
  // theme: 'tabs/lgh',
  data: configTabs,
  itemMethod: function(dom, index){
    $(dom).click( e => {
      e.stopPropagation()
      this.select(index)
    })
  }
})

tabsxx.render('register')
