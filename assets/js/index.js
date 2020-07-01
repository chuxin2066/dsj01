$(function () {
    getUserInfo()
})
//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //获取用户信息成功则渲染用户头像和名称
            renderAvatar(res.data)
        },
        // // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function (res) {
           
        //     // console.log('执行了 complete 回调：') 
        //     // console.log(res)
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据 
        //     if (res.responseJSON.status === 1&&res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面 
        //         location.href = '/qd/login.html'
        //     }
        // }
       

    })
}
//渲染用户的头像和名称
function renderAvatar(user) {
    //获取用户的名称
    const name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }

}
//实现退出功能
const layer = layui.layer
$('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('客观不再想想吗?', { icon: 3, title: '提示' }, function (index) {
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        //重新跳转到登录页面
        location.href = '/qd/login.html'


        layer.close(index);
    });



})