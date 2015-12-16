$(function(){
	var item = $('.select-drop').find('li');
	var labelDATA = $('.text-label');
	
	$('.text-label').on('click',function(e){
		e.stopPropagation();
		if(!$('.select-drop').is(':visible')){
			$(this).next('.select-drop').slideDown();
		}else {
			$('.select-drop').slideUp();
		}
	});
	
	$(item).on('click',function(){
		$(this).closest('.selectbx').find(labelDATA).text($(this).text());		
		$('.country-tlt').text($('#countryText').text());
		$('.city-tlt').text($('#city-text').text());		
	});
	
	$(document).on('click',function(){
		$('.select-drop').slideUp();
	});
});