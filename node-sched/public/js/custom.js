$(function(){
	$('.pop_up').hide();
	$('.shadow').hide();
	
	
	$('.close_btn').on('click',function (params) {
		$('.pop_up').fadeOut();
		$('.shadow').fadeOut();
	})	
	
	
});