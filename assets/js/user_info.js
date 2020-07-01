//自定义表单验证
const form = layui.form
const layer = layui.layer

form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return '昵称长度必须在1-6个字符之间'
        }
    }
})


$(function () {
    initUserInfo()
})

//获取用户的基本信息
function initUserInfo() {
    //发送ajax请求
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            form.val('formUserInfo', res.data)

        }
    })
}

//表单的重置效果
$('#btnReset').on('click', function (e) {
    //阻止表单的默认重置行为
    e.preventDefault()
    //重新掉调用 initUserInfo()
    initUserInfo()
})
//更新用户的基本信息
// 监听表单的提交事件
$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        type:'post',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                layer.msg(res.message)

            }
            layer.msg(res.message)
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getUserInfo()
        }

    })
})