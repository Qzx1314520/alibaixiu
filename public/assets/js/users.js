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

        formData.append('avatar', this.files[0]);
        // console.log(formData);
        // console.log(this.files[0]);
        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                // console.log(data);
                $('#youphoto').attr('src', data[0].avatar);
                // 使用隐藏标签将图片地址存在页面
                $('#avatarHidden').val(data[0].avatar);
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

    //批量删除

    var selectAll = $('#selectAll');
    var delMany = $('#delMany');

        // 选中复选框
    selectAll.on('change', function() {
        var status = $(this).prop('checked');

        $('#userBody').find('.findOne').prop('checked', status)
         if (status) {
            delMany.show();
        } else {
            delMany.hide();
        }
    })
        // 选中单选框   
    $('#userBody').on('change', '.findOne', function () {
        var inputs = $('#userBody').find('.findOne');

        if ( inputs.length === inputs.filter(':checked').length) {
            selectAll.prop('checked',true);
        } else {
            selectAll.prop('checked',false);
        }

        // 批量删除按钮显示隐藏
        if (inputs.filter(':checked').length > 0) {
            delMany.show();
        } else {
            delMany.hide();
        }
    })

    // 批量删除按钮的点击删除事件
    delMany.on('click',function () {
        var inputs = $('#userBody').find('.findOne').filter(':checked');
        var arr = [];

        // 遍历向数组添加元素
        inputs.each(function (index, dom) {
            arr.push($(dom).attr('data-id'))
        })
        // console.log(arr);
        $.ajax({
            url:`/users/${arr.join('-')}`,
            type: 'delete',
            success: function (data) {
                location.reload();
            }
        })
    })
    
});