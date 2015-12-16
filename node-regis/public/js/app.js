$(function(){

	var websiteData = {};

	var getAccountData = function(){
		websiteData.landing = {
			_emailstore: $("#_emailstore").val(),
			_idstore: $("#_idstore").val(),
			_uniqueid: $("#_uniqueid").val(),
			_name: $("_name").val(),
			_status: $("#_status").val(),
			_createdlandingat: $("#_createdlandingat").val()
		};
		websiteData._clientid = $("#_idclient").val();
	};

	var getDisplayData = function(){
		websiteData.companyName = $("#companyName").val();
		websiteData.subdomain = $("#subdomain").val();
		websiteData.logoPath = $("#logoPath").attr("src");
		websiteData.logoUrl = $("#logoUrl").val();
	};

	var getCompanyData = function(){
		websiteData.fullName = $("#fullName").val();
		websiteData.businessType = $("#businessType").val();
		websiteData.mobile = $("#mobile").val();
		websiteData.companyEmail = $("#companyEmail").val();
		websiteData.details = $("#details").val();
	};

	var getAppointConfigData = function(){
			websiteData.concurrentCount = $("#concurrentCount").val();
			websiteData.startHour = $("#startHour").val();
			websiteData.endHour = $("#endHour").val();
			websiteData.perdayCapacity = $("#perdayCapacity").val();
			websiteData.overlap = $("#overlap").is(":checked");
			websiteData.allowCustom = $("#allowCustom").is(":checked");
			websiteData.autoAcknowledge = $("#autoAcknowledge").is(":checked");
			websiteData.disclaimer = $("#disclaimer").val();
	}

	var getSpecialityOptions = function(){
		websiteData.specialities =[];
		$(".splty-container").each(function(){
			var spl = {};
			$(this).find(".splty-row").each(function(){
				spl.name = $(this).find(".splty-name").val();
				spl.mins = $(this).find(".splty-mins").val();
				spl.icon = $(this).find(".splty-icon").attr("src");
			});
			if (!spl.name){
				return true;
			}
			spl.resources = [];
			$(this).find(".ress-row").each(function(){
				var ress = {};
				ress.name = $(this).find(".res-name").val();
				ress.mins = $(this).find(".res-mins").val();
				ress.icon = $(this).find(".res-icon").attr("src");
				if (!ress.name){
					return true;
				}
				spl.resources.push(ress);
			});
			websiteData.specialities.push(spl);
		});
	}

	var request1 =function() { 
		
		getAccountData();
		getDisplayData();
		getCompanyData();
		getAppointConfigData();
		getSpecialityOptions();

		var tt = JSON.stringify(websiteData);
		var request = $.ajax({
	        url: "/endpoint/cupdate",
	        type: "POST",
	        data: tt, 
	        contentType: "application/json; charset=UTF-8"
	    });

	    request.success(function(result) {
	        $("#resp-cont").html('<p>follow the url : <a href="http://' + $("#subdomain").val()  + '.que.one"><b>' +  ($("#subdomain").val() || 'test') + ".que.one</b></a>");
	        Custombox.open({
		      target: '#alert-pop',
		      effect: 'fadein'
		    });
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
	$("#subdomain").on("focusout", function(){
		$(this).css({
			"border": "1px solid #a9d3bd"
		});
	})

	$("#sveWs").on("click", function(e) {
		if (!$("#subdomain").val())	{
			$("#subdomain").css({
				'border-color': 'red'
			});
			return;
		}
		request1();
		e.preventDefault();
	});

	$("select").on("change", function(){
		if ($(this).val() == 'other'){
			$(this).next().next().css("display", "block");
		}else {
			$(this).next().next().css("display", "none");
		}
	});

	function makeid() {
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    return text;
	}

	var addbluimp = function(ele){
		$(ele).find(".upload-splty, .upload-ress").each(function(){
			var that = this;
			$(this).fileupload({ dataType: 'json', autoUpload: true, 
				done: function(dd, edata){
					$(dd.target).closest(".addrow").find("img").attr("src", "/uploaded/" + edata.result.files[0].name);
				} 
			});
		});
	};

	$(document).on("click", ".del-splt", function() {
		$(this).closest("tr").remove();
	});

	$(document).on("click", ".ad-spl-btn", function() {
		var str1 = '<div class="splty-container">\
						<div class="addrow splty-row" style="background-color:red;"> \
							<input type="text" class="fieldItem1 fieldwid1 splty-name" /> \
							<input type="text" class="fieldItem1 fieldwid2 splty-mins" /> \
							<div class="file-upload"> \
								<i class="fa fa-upload"></i> \
								<input class="upload upload-splty" id="uploadBtn2" type="file" name="files[]" data-url="/upload"> \
							</div> \
							<div class="imgIcon"> \
								<img class="splty-icon" src="static/images/sample-logo.jpg"> \
							</div> \
							<a class="delete del-splt"><i class="fa fa-trash"></i></a> \
							<label><a class="add_btn resource add-ress-btn"><i class="fa fa-plus"></i> Resource</a></label> \
						</div> \
					</div>';
        var $str = $(str1);
        $(this).closest(".add-spl-data").append($str);
        addbluimp($str);
	});

	$(document).on("click", ".add-ress-btn", function(){
		var cnt = makeid();
		var str1 = '<div class="addrow ress-row">\
						<input type="text" class="fieldItem1 fieldwid1 res-name" />\
						<input type="text" class="fieldItem1 fieldwid2 res-mins" />\
						<div class="file-upload">\
							<i class="fa fa-upload"></i> \
							<input class="upload upload-ress" id="uploadBtn1" type="file" name="files[]" data-url="/upload">\
						</div>\
						<div class="imgIcon">\
							<img class="res-icon" src="static/images/sample-logo.jpg">\
						</div>\
						<a class="delete del-rsrc"><i class="fa fa-trash"></i></a> \
					</div>';
        var $str = $(str1);
        $(this).closest(".splty-container").append($str);
        addbluimp($str);
	});

	$(document).on("click", ".del-splt", function(){
		$(this).closest(".splty-container").remove();
	});

	$(document).on("click", ".del-rsrc", function(){
		$(this).closest(".addrow").remove();
	});

	$('#uploadBtn').fileupload({ dataType: 'json', autoUpload: true, 
		done: function(dd, edata){
			$("#logoPath").attr("src", 'uploaded/' + edata.result.files[0].name);
		} 
	});

	$('.upload-splty, .upload-ress').each(function(){
		var that = this;
		$(this).fileupload({ dataType: 'json', autoUpload: true, 
			done: function(dd, edata){
				$(dd.target).closest(".addrow").find("img").attr("src", "/uploaded/" + edata.result.files[0].name);
			} 
		});
	});

	$('.clockpicker').clockpicker();

});