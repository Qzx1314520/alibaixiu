$(function() {
    // 获取分类列表
    $.ajax({
        url: '/categories',
        type: 'get',
        success: function (data) {
            var html = template('catetpl', {data: data})
            $('#category').html(html);
        }
    })



})

