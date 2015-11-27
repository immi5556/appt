$(function(){
	var getCompanyData = function(){
		return {
			fullName: $("#ClientName").val(),
			phone: $("#phoneName").val(),
			workemail: $("#email").val(),
			business: $("#bdet").val()
		};
	};

	var getAppointConfigData = function(){
		return {
			concurrentCount: $("#concCount").val(),
			workingHourStart: $("#wrkHrsStart").val(),
			workingHourEnd: $("#wrkHrsEnd").val(),
			perDayCapacity: $("#perdayCap").val(),
			preConfig: $("#preConfigured"),
			preConfigAppoints: [], 
			overlap: $("#wrkHrsOverlap").val(),
			allowCustom: $("#allowCustom").val(),
			autoAcknowledge: $("#autoAcknowledge").val(),
			selectOption:[]
		};
	}

	var getWebsiteData = function(){
		return {
			companyName: $("#wsClientName").val(),
			subdomain: $("#sdomain").val(),
			logo:'',
			selectIcon: ''
		}
	}


	var request1 =function() { 

		var request = $.ajax({
	        //url: "http://landing.que.one/endpoint/ccreate",
	        url: "/endpoint/cupdate",
	        type: "POST",
	        data: JSON.stringify({
	        	email: $("#emailstore").text(),
				_oid: $("#_idstore").text(),
	            registration : { 
	            	company : getCompanyData(), 
	            	appointment: getAppointConfigData(),
	            	website: getWebsiteData() 
	            }
	        }),
	        contentType: "application/json; charset=UTF-8"
	    });

	    request.success(function(result) {
	        $("#resp-cont").html('<p>follow the url : <a href="http://' + $("#sdomain").val()  + '.que.one"><b>' +  ($("#sdomain").val() || 'test') + ".que.one</b></a>");
	        Custombox.open({
		      target: '#alert-pop',
		      effect: 'fadein'
		    });
	        //console.log(result);
	    });
	    request.fail(function(jqXHR, textStatus) {
	        $("#resp-cont").text('Errored: ' + jqXHR.responseText);
	        Custombox.open({
		      target: '#alert-pop',
		      effect: 'fadein'
		    });
	    });
	}

    

	$("#sveCli").on("click", function(){

	});

	$("#apptConfig").on("click", function(){

	});

	$("#sveWs").on("click", function() {
		if (!$("#sdomain").val())	{
			$("#sdomain").css({
				'border-color': 'red'
			});
			return;
		}
		request1();
	});
});