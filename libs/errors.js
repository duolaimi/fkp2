module.exports = {
    'success': {success: '1000', message: "ok"},
    '1000': {success: '1000', message: "ok"},
    '1010': {success: '1010', message: "链接正确，但数据为空"},

    '10000': {success: '10000', message: "ok"},
    'success': {success: '10000', message: "ok"},
    // models/user.js
    "10001": {error: "10001", message: "user not found"},
    "10002": {error: "10002", message: "password dose not match"},
    "10003": {error: "10003", message: "该用户名已被注册"},
    "10004": {error: "10004", message: "两次密码不匹配"},
    "10005": {error: "10005", message: "本站使用github第三方登陆，请先登录"},
    "10006": {error: "10006", message: "请用md语法，'# ...'添加文章标题"},
    "10007": {error: "10007", message: "文章字数太少，要求输入不少于50字(含中/英文)"},
    "10010": {error: "10010", message: "请登录后操作"},
    "10510": {error: "10510", message: "更新用户信息失败"},

    // models/topic
    "20000": {error: "20000", message: "修改文章参数不正确"},
    "20001": {error: "20001", message: "请指定文章id"},
    "20002": {error: "20002", message: "没有找到该文章，请确认文章id"},
    "20003": {error: "20003", message: "只能删除/修改自己的文章"},
    "20004": {error: "20004", message: "文章不存在"},


    "40001": {error: "40001", message: "数据返回出错"},


    "50001": {error: "50001", message: "markdown文件不存在"},

    "60001": {error: "60001", message: "指定api不存在"},
    "60002": {error: "60002", message: "java或者php返回数据错误"},
    "60003": {error: "60003", message: "mock api 不存在"},
}
