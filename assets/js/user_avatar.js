
$(function () {
    //实现基本裁剪效果
    // 1.1 获取裁剪区域的 DOM 元素 
    var $image = $('#image')
    // 1.2 配置选项 
    const options = {
        // 纵横比 
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }// 1.3 创建裁剪区域 
    $image.cropper(options)

    //点击上传弹出文件选择框
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    //更换裁剪区域的图片
    $('#file').on('change', function (e) {
        console.log(e);
        const filelist = e.target.files
        console.log(filelist);
        if (filelist.length === 0) {
            return layui.layer.msg('请选择照片！')
        }
        //拿到用户选择的文件
        const file = e.target.files[0]
        //将文件转化为路径
        const imgURL = URL.createObjectURL(file)
        //重新初始化裁剪区域
        $image.cropper('destroy')
            // 销毁旧的裁剪区域 
            .attr('src', imgURL)
            // 重新设置图片路径 
            .cropper(options)
        // 重新初始化裁剪区域


    })
    //将裁剪后的头像上传到服务器
    $('#btnUpload').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布 
            width: 100,
            height: 100
        })
            .toDataURL('image/png')


        //发起ajax请求，更换头像
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar:dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
               window.parent.getUserInfo()
            }

        })



    })


})