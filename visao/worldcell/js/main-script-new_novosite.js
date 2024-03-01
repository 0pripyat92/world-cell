/*Menu*/
$('.categoriasMenu li').click(function () {
  $('.' + $(this).attr('data-target')).show();
  $('.box-menu-side').hide();
  $('.menu').hide();
});

$('.title-menu-side').click(function () {
  $(this).parent().hide();
  $('.box-menu-side').show();
  $('.menu').show();
});


/*$('.favoritos,.login2').on("click", function () {
    $('#modal-login .error_msg').hide();
    $('#modal-login').modal('show');
});*/
