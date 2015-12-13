$(function(){

	var websiteData = {};

	var getCompanyData = function(){
		websiteData.fullName= $("#ClientName").val();
		websiteData.phone= $("#phoneName").val();
		websiteData.workemail= $("#email").val();
		websiteData.business= $("#bdet").val();
		websiteData.businessType= $("#bstType").val();
		websiteData.busTypeOther= $("#busTypeOther").val();
	};

	var getAppointConfigData = function(){
			websiteData.concurrentCount= $("#concCount").val();
			websiteData.workingHourStart= $("#wrkHrsStart").val();
			websiteData.workingHourEnd= $("#wrkHrsEnd").val();
			websiteData.perDayCapacity= $("#perdayCap").val();
			websiteData.preConfigAppoints= [];
			websiteData.overlap= $("#wrkHrsOverlap").val();
			websiteData.allowCustom= $("#allowCustom").val();
			websiteData.autoAcknowledge= $("#autoAcknowledge").val();
			websiteData.specialityOptions=[];
		$(".splty").each(function(){
			var slty = {
				specialityName: $(this).find(".add-splity .res-name").val(),
				specialityMins: $(this).find(".add-splity .res-mins").val(),
				resources: []
			};
			$(this).find(".add-resource").each(function(){
				slty.resources.push({
					resourceName: $(this).find("input.res-name").val(),
					resourceMins: $(this).find("input.res-mins").val()
				});
			});
			websiteData.specialityOptions.push(slty);
		});
	}

	var getWebsiteData = function(){
		websiteData.companyName =  $("#wsClientName").val();
		websiteData.subdomain =  $("#sdomain").val();
		websiteData.logourl =  $("#logourl").val();
		websiteData.logo = $("#logoupload-hide").val();
		return websiteData;
	}

	var request1 =function() { 
		websiteData.email= $("#emailstore").text();
		websiteData._oid= $("#_idstore").text();
		var tt = JSON.stringify(websiteData);
		var request = $.ajax({
	        //url: "http://landing.que.one/endpoint/ccreate",
	        url: "/endpoint/cupdate",
	        type: "POST",
	        data: tt, //JSON.stringify($("#frm-ss").serialize()),
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

	$("#sveWs").on("click", function(e) {
		if (!$("#sdomain").val())	{
			$("#sdomain").css({
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
		$(ele).find(".spl-icon, .res-icon").each(function(){
			var that = this;
			$(this).fileupload({ dataType: 'json', autoUpload: true, 
				done: function(dd, edata){
					$(dd.target).next().val(edata.result.files[0].name);
				} 
			});
		});
	};

	$("#add-spltyy").on("click", function(){
		var cnt = makeid();
		var str1 = '<tr>' +
            '<td></td>' +
            '<td>' +
                '<div class="splty">' +
                    '<div class="add-splity">' +
                        '<input class="spl-name" data-res-append="' + cnt +
                        '" value="" placeholder="Speciality" />' +
                        '<input class="spl-mins" data-res-append="' + cnt +
                        '" value="" placeholder="In Minutes" style="width:40px;" />' +
                        '<input type="file" class="spl-icon" name="files[]" data-url="/upload" style="width:30px;" />' +
                        '<input type="hidden" class="spl-icon-hide">' +
                        '<a class="del-splt" href="javascript:void(0)">Del Speciality</a>' +
                        '<br>' +
                        '<div style="float:left"><a class="add-rsrc" data-res-append="' + cnt + 
                        '" href="javascript:void(0);">Add Resource</a></div><br>' +
                    '</div>' +
                '</div>' +
            '</td>' +
        '</tr>';
        var $str = $(str1);
        $str.insertAfter($(this).closest("tr"));
        addbluimp($str);
	});

	$(document).on("click", ".del-splt", function() {
		$(this).closest("tr").remove();
	});

	$(document).on("click", ".add-rsrc", function() {
		var cnt = $(this).attr("data-res-append");
		var str1 = '<div class="add-resource"> <div style="float:left"><input class="res-name ' + cnt
						+ '" value="" placeholder="Resource" /></div>'
                        + '<div style="float:left"><input class="res-mins ' + cnt 
                        + '" value="" placeholder="In Minutes" style="width:40px;" /></div>' 
                        + '<input type="file" class="res-icon" name="files[]" data-url="/upload" style="width:30px;" />' 
                        + '<input type="hidden" class="res-icon-hide">' 
                        + '<a class="del-rsrc" href="javascript:void(0)">Del Resource</a>'
                        + '</div>';
        var $str = $(str1);
        $str.insertAfter($(this).closest(".add-splity"));
        addbluimp($str);
	});

	$(document).on("click", ".del-rsrc", function(){
		$(this).closest(".add-resource").remove();
	});

	$('#uploadBtn').fileupload({ dataType: 'json', autoUpload: true, 
		done: function(dd, edata){
			$("#logoPath").attr("src", 'uploaded/' + edata.result.files[0].name);
		} 
	});

	$('.spl-icon, .res-icon').each(function(){
		var that = this;
		$(this).fileupload({ dataType: 'json', autoUpload: true, 
			done: function(dd, edata){
				$(dd.target).next().val(edata.result.files[0].name);
			} 
		});
	});
});