//登录和注册的按需切换
$(function () {
    //点击去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})
//自定义表单的验证规则
layui.form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须为4到12位，且不能出现空格'],
    repwd: function (value) {
        const pwd = $('#mima').val()
        if (pwd !== value) {
            return '两次密码不一致'
        }
    }
})

//注册表单的ajax请求
$('#form_reg').on('submit', function (e) {
    //阻止表单的默认提交行为
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
        type: 'post',
        url: '/api/reguser',
        data: {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            //模拟人的点击行为
            $('#link_login').click()

        }
    })

})
//登录表单的ajax请求
$('#form_login').submit(function (e) {
    //阻止表单的默认提交
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: '/api/login',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            //跳转到后台主页
            location.href = '/qd/index.html'
        }
    })
})
