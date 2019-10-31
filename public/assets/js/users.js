$(function() {
    // 表单提交
    $('#userSubmit').on('submit', function() {
        var formData = $(this).serialize();

        $.ajax({
            url: '/users',
            type: 'post',
            data: formData,
            success: function(data) {
                location.reload()
                    // console.log(formData);
            },
            error: function() {
                alert('用户添加失败');
            }
        })
        return false;
    })

    // 上传用户头像
    $('#avatar').on('change', function() {
        var formData = new FormData();
        formData.append('avatar', this.files[0])

        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log(data);
                $('#youphoto').attr('src', data[0].avatar);
                $('#avatarHidden').val(data[0].avatar)
                console.log(data[0].avatar);
            },
            error: function() {
                console.log('你的文件上传失败');
            }

        })
    })

    // 数据列表头像展示
    $.ajax({
        url: '/users',
        type: 'get',
        success: function(data) {
            // console.log(data);
            var html = template('userTpl', {data:data});
            // console.log(html);
            $('#userBody').html(html)
        }
    })

    //编辑
    $('#userBody').on('click','.edit',function(){
        var id = $(this).attr('data-id');

        $.ajax({
            url: `/users/${id}`,
            type: 'get',
            success: function(data){
                // console.log(data);
                var html = template('modifyTpl',data);
                $('#modifyBox').html(html);
            }
        })
    })

    // 修改信息
    $('#modifyBox').on('submit', '#editSubmit', function(){
        var FormData = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            url: `/users/${id}`,
            type: 'put',
            data: FormData,
            success: function(data) {
                location.reload();
            },
            error: function() {
                alert('用户添加失败');
            }
        })
        return false;
    })
    
    // 修改头像
    $('#modifyBox').on('change', '#avatar', function(){
        var formData = new FormData();
        formData.append('avatar', this.files[0])

        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log(data);
                $('#youphoto').attr('src', data[0].avatar);
                $('#avatarHidden').val(data[0].avatar)
                console.log(data[0].avatar);
            },
            error: function() {
                console.log('你的文件上传失败');
            }
        })
    })

    // 删除
    $('#userBody').on('click', '.delete', function(){
       if(confirm('你真的要删除用户吗?')) {
           var id = $(this).attr('data-id');
           $.ajax({
               url: `/users/${id}`,
               type: 'delete',
               success: function() {
                   location.reload();
               }
           })
       }
    })
    
});