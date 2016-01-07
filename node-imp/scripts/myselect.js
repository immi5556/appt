(function($){
	
	$.fn.countryList = function(opt){
		var defaults = {
			countryList:"#countryList",
			cityList:"#cityList"
		},
		settings = $.extend({},defaults,opt);
		
		this.each(function(){
			var _this = $(this);
			
			function init(){
				$.ajax({
					type:'GET',
					url:"js/mydata.json",
					success:function(data){
						console.log(data);
					}
				});
			}
			
			init();
			
			console.dir(_this);
		});
		
		
		
	}
	
}(jQuery))