$(function () {

    // 修改密码
    $('.form-horizontal').on('submit', function (e) {
      // 阻止表单提交默认行为
      e.preventDefault();

      // 获取表单数据
      var formDate = $(this).serialize();
      console.log(formDate);
      
      $.ajax({
        url: '/users/password',
        type: 'put',
        data: formDate,
        success: function (data) {
          console.log(data);
          location.href = 'login.html'
        }
      })
    })


    // 添加分类
    
  })