//AJAX的预过滤器。
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //统一为有权限的接口，设置headers请求
    if (options.url.includes('/my')) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }

    }

    // if (options.url.indexOf('/my/') !== -1) {
    //     options.headers = {
    //         Authorization: localStorage.getItem('token') || ''
    //     }
    // }
    
    //权限控制的代码
    options.complete = function (res) {

        // console.log('执行了 complete 回调：') 
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据 
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面 
            location.href = '/qd/login.html'
        }
    }
})