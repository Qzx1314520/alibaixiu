$(function () {
    // 添加分类
    $('#cateForm').on('submit', function () {
        var formdate= $(this).serialize();
        console.log(formdate);

        $.ajax({
            url: '/categories',
            type: 'post',
            data: formdate,
            success: function (data){
                console.log(data);
                location.reload();
            }
        })
        return false;
    })

    // 分类列表展示
    $.ajax({
        url: '/categories',
        type: 'get',
        success: function (data) {
            var html = template('categoryListTpl', {data: data});
            $('#categoryBox').html(html); 
        }
    })

    // 分类数据修改
    $('#categoryBox').on('click', '.edit', function () {
        var id = $(this).attr('data-id');
        
        $.ajax({
            url: `/categories/${id}`,
            success: function (data) {
                var html = template('modifyCategoryTpl', data);
                $('#modifyBox').html(html);
            }
        })
    })

    //修改操作后提交表单
    $('#modifyBox').on('submit', '#mdfyBox', function () {
        var formdate = $(this).serialize();
        var id = $(this).attr('data-id');

        $.ajax({
            url: `/categories/${id}`,
            type: 'put',
            data: formdate,
            success: function () {
                location.reload();
            }
        })
        return false;
    })


    // 分类数据删除
    $('#categoryBox').on('click', '.delete',function () {
        if (confirm('确定删除?')) {
            var id = $(this).attr('data-id')
            
            $.ajax({
                type: 'delete',
                url: `/categories/${id}`,
                success: function () {
                    location.reload();
                }
            })
        }
    })

})
