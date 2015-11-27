$(function(){
	var onSuccess = function(location){
	  //alert( "Lookup successful:\n\n" + JSON.stringify(location, undefined, 4));
	  $.ajax({
			type: 'POST',
			data: JSON.stringify(location, undefined, 4),
	        contentType: 'application/json',
	        url: 'http://localhost:3000/endpoint/userentry',						
	        success: function(data) {
	            console.log('success');
	            console.log(JSON.stringify(data));
	        }
    	});
	};
 
	var onError = function(error){
	  console.log( "Error:\n\n" + JSON.stringify(error, undefined, 4));
	};

	geoip2.city(onSuccess, onError);
});