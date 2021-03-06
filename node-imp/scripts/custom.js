$(function(){

	$('.sec-carousel').gbcarousel({});

	$('.grid-tile').on('click',function(){
		$(this).addClass('active');
		var tt = $(this).data("bustype");
		$(".item-client").hide('slow');
		$("." + tt).show('slow');
		$('.pageShadow').show();
		$('.close-arrow').show();
	});

	$('.close-arrow').on('click',function(){
		closeShadow();
	});

	$(document).on('keyup',function(e){
		if(e.keyCode == 27) {
			closeShadow();
		}
	})

	function closeShadow(){
		$('.grid-tile').removeClass('active');
		$(".item-client").show('slow');
		$('.pageShadow').hide();
		$('.close-arrow').hide();
	}

	var item = $('.select-drop').find('li');
	var labelDATA = $('.text-label');
	
	$('.text-label').on('click',function(e){
		e.stopPropagation();
		if(!$('.select-drop').is(':visible')){
			$(this).next('.select-drop').slideDown();
		}else {
			$('.select-drop').slideUp();
		}
		$('#city-text').text('Cities');
		$('.city-tlt').text('City');
	});
	
	
	
	$(document).on('click',function(){
		$('.select-drop').slideUp();
	});
	
	var loadAjax = function(data, action, callback){
		data = data || {};
		data.country = $("#countryText").text();
		$.ajax({
            url: "/endpoint/" + action,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json; charset=UTF-8",
            success: function(cdat) {
            	if (callback){
            		callback(cdat);
            	}
            }
        });
	}

	var loadCity = function(cdat){
		console.log(cdat);
		cdat.cities.forEach(function(item){
    		var ll = $("<li />").addClass(item.replace(/ /g, '-')).text(item);
    		$('#cityList').append(ll);
    		ll.on("click", function(){
    			$(".near-citi").html("");
				$("#rngsel").val(0);
				$("#range").text(0);

    			$(this).closest('.selectbx').find(labelDATA).text($(this).text());
    			$('.city-tlt').text($('#city-text').text());
    			var geocoder =  new google.maps.Geocoder();
			    geocoder.geocode( { 'address': $('#city-text').text() }, function(results, status) {
		          if (status == google.maps.GeocoderStatus.OK) {
		            //alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng()); 
		            $('#city-text').data("city-latlong", {
		            	lat: results[0].geometry.location.lat(),
		            	lng: results[0].geometry.location.lng()
		            } );
		          } else {
		            alert("Something got wrong " + status);
		          }
		        });
    		});
    	});
    	if (cdat.detectedCity){
    		$("." + cdat.detectedCity.replace(/ /g, '-')).trigger("click");
    	}
	}

	var loadCountry = function(cdat){
		console.log(cdat);
    	cdat.countries.forEach(function(item){
    		var ll = $("<li />").addClass(item.replace(/ /g, '-')).text(item);
    		$('#countryList').append(ll);
    		ll.on("click", function(){
				$(".near-citi").html("");
				$("#rngsel").val(0);
				$("#range").text(0);

    			$(this).closest('.selectbx').find(labelDATA).text($(this).text());
    			$('.country-tlt').text($('#countryText').text());
    			$('#cityList').html('');
    			loadAjax(undefined, "getCities", loadCity);
    		});
    	});
    	if (cdat.detectedCountry){
    		$("." + cdat.detectedCountry.replace(/ /g, '-')).trigger("click");
    	}
	}

	loadAjax(undefined, "getCountries", loadCountry);

	var loadClients = function(cdat){
		console.log(cdat);
		(cdat || []).forEach(function(item){
			var tt = $("<li />").append("<div class='item-client " + item.businessType.replace(" ", "-") + "' style='background:grey;padding:5px;margin:5px;border-radius: 25px;text-align:center;vertical-align:middle;'><a target='_blank' href='http://" + item.subdomain + ".que.one'> " + item.fullName + "</a></div>");
			$(".slider").append(tt);
		});
	}

	loadAjax(undefined, "getClients", loadClients);

	var loadNearCities = function(ncdat){
		$(".near-citi").html("");
		(ncdat || []).forEach(function(item){
			var tt = $("<div class='near-c " + item.city.replace(" ", "-") + "' style='background:grey;padding:5px;margin:5px;border-radius: 25px;text-align:center;vertical-align:middle;'><a href='javascript:void(0)'> " + item.city + "</a> (" + parseInt(item.distance) + " km)</div>");
			$(".near-citi").append(tt);
		});
	}

	$(document).on("change", "#rngsel", function(){
		document.getElementById("range").innerHTML= $(this).val();
		if (isCitySelected()){
			var ti = $('#city-text').data("city-latlong");
			var tt = {
				lat: (ti.lat || 17.413828),
				long: (ti.lng || 78.439758),
				dist: $(this).val()
			}
			loadAjax(tt, "getNearestCities", loadNearCities);		
		}
	});
	
	//slide mode simple
//using data attributes
$(".live-tile").liveTile();

//without data-attributes
//$("#tile1").liveTile();
//$("#tile2").liveTile({ direction:'horizontal' });
	
// carousel mode: simple
$("#tile3").liveTile();

/*
// without data- atrributes
$("#tile1").liveTile({
    delay: 3000,
    startNow: true,
    direction: 'horizontal'    
});
*/
	function isCitySelected(){
		return $("#countryText").text();
	}

	function isValidEmailAddress(emailAddress) {
    	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    	return pattern.test(emailAddress);
	};


	$("#btnReg-Submit").on("click", function(){
		if (!$("#email-txt").val() || !isValidEmailAddress($("#email-txt").val())){
			$("#email-txt").css({
				'border-color': 'red'
			});

			return;
		}
		var request = $.ajax({
            //url: "http://landing.que.one/endpoint/ccreate",
            url: "http://49.206.64.209:9095/endpoint/ccreate",
            //url: "http://localhost:9095/endpoint/ccreate",
            //url: "/endpoint/ccreate",
            type: "POST",
            data: JSON.stringify({
                regis : { 
                	name : 'From W30', 
                	email: $("#email-txt").val() 
                }
            }),
            contentType: "application/json; charset=UTF-8"
        });

        request.success(function(result) {
        	//alert(result);
        	$("#reg-blck").css("display", "none");;
        	$("#reg-msg").css("display", "block");
        	$("#email-txt").val("");
        	setInterval(function(){
        		$("#reg-blck").css("display", "block");;
        		$("#reg-msg").css("display", "none");;
        	}, 9000);
        });
        request.fail(function(jqXHR, textStatus) {
        	alert(textStatus);
        });
	});

});

