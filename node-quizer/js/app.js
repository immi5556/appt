$(function(){

	function isValidEmailAddress(emailAddress) {
    	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    	return pattern.test(emailAddress);
	};

	$("#start_now_icn").on("click", function(){
		Custombox.open({
	      target: '#modal',
	      effect: 'fadein'
	    });
	});

	$("#clise-btn").on("click", function(){
		Custombox.close('#modal');
	});

	$("#save-id-btn").on("click", function(){

		if (!$("#comp-txt").val()){
			$("#comp-txt").css({
				'border-color': 'red'
			});

			return;
		}
		if (!$("#email-txt").val() || !isValidEmailAddress($("#email-txt").val())){
			$("#email-txt").css({
				'border-color': 'red'
			});

			return;
		}
		var request = $.ajax({
            //url: "http://landing.que.one/endpoint/ccreate",
            url: "/endpoint/ccreate",
            type: "POST",
            data: JSON.stringify({
                regis : { 
                	name : $("#comp-txt").val(), 
                	email: $("#email-txt").val() 
                }
            }),
            contentType: "application/json; charset=UTF-8"
        });

        request.success(function(result) {
        	Custombox.close('#modal');
            $("#resp-cont").text('Email is sent, please confirm it');
            Custombox.open({
		      target: '#alert-pop',
		      effect: 'fadein'
		    });
            //console.log(result);
        });
        request.fail(function(jqXHR, textStatus) {
        	Custombox.close('#modal');
            //alert("Request failed: " + textStatus);
            $("#resp-cont").text('Errored: ' + textStatus);
            Custombox.open({
		      target: '#alert-pop',
		      effect: 'fadein'
		    });
        });
	});
});