
// 导入form模块
$(function () {
    //定义密码的验证规则
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('.layui-form [name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        repwd: function (value) {
            if (value !== $('.layui-form [name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })


    //发起AJAX请求实现重置密码功能
    $('.layui-form').on('submit', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //重置表单,jquery对象转为dom对象，用[0]reset()方法是web api原生的方法
                $('.layui-form')[0].reset()
            }

        })
    })
})