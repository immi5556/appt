jQuery(document).ready(function(){

    var selectedDate = moment(new Date()), tline, $sc, selectedAppt;
    var openModal = function(date, idx, predata){
        $("#sHead").text(optdata.rows[idx].title);
        if (date){
            $("#startTime").val(date);
            $("#endTime").val($sc.formatTime($sc.calcStringTime(date) + 1800));
        }
        $("#apName").val("");
        $("#apEmail").val("");
        $("#apMobile").val("");
        $("#apDet").val("");
        $("#ress-avail").html("");
        $("#ress-headd").css("display", "none");
        $('.pop_up').fadeIn();
        $('.shadow').fadeIn();
    }

    $('.slider li').on('click',function(e) {
        //var scdat = optdata.rows[$(this).find(".spl_title").data("que-idx")];
        //$("#sHead").text(scdat.title);
        //$("#ress-avail").html("");
        //$("#ress-headd").css("display", "none");
        /*(scdat.resources || []).forEach(function(item, idx){
            $("#ress-headd").css("display", "block");
            var htm = '<li> \
                    <figure><img class="img-res" src="/static/images/doctor-1.png"></figure> \
                    <span id="head-res">Doctor A</span> \
                </li>';
            var $htm = $(htm);
            $htm.find("#head-res").text(item.title);
            $htm.find(".img-res").attr("src", (item.url || "/static/images/doctor-1.png"));
            $("#ress-avail").append($htm);
        });*/
        //$('.pop_up').fadeIn();
        //$('.shadow').fadeIn();
        openModal(undefined, $(this).find(".spl_title").data("que-idx"));
    });

    var optdata = {
        startTime: "07:00", // schedule start time(HH:ii)
        endTime: "21:00",   // schedule end time(HH:ii)
        widthTime:60 * 10,  // cell timestamp example 10 minutes
        timeLineY:60,       // height(px)
        verticalScrollbar:20,   // scrollbar (px)
        timeLineBorder:2,   // border(top and bottom)
        debug:"#debug",     // debug string output elements
        overlap: true,
        overlapCount: 10,
        rows : [],
        change: function(node,data){
            console.log("change event");
        },
        init_data: function(node,data){
        	console.log('init_data');
        },
        click: function(node,data){
            console.log("click event");
        },
        dblclick: function(node,data){
            selectedAppt = data;
            console.log("dbl click event");
            $("#startTime").val($sc.formatTime(data.start));
            $("#endTime").val($sc.formatTime(data.end));
            $("#txtDeta").val(data.text);
            if (data.data){
                $("#apName").val(data.data.name);
                $("#apEmail").val(data.data.email);
                $("#apMobile").val(data.data.mobile);
                $("#apDet").val(data.data.details);
                $('.pop_up').fadeIn();
                $('.shadow').fadeIn();
            }
        },
        append: function(node,data){
            console.log("append event.");
        },
        time_click: function(time,data){
            console.log("time click event");
            
            /*(optdata.rows[tline].resources || []).forEach(function(item, idx){
                $("#ress-headd").css("display", "block");
                var htm = '<li> \
                        <figure><img class="img-res" src="/static/images/doctor-1.png"></figure> \
                        <span id="head-res">Doctor A</span> \
                    </li>';
                var $htm = $(htm);
                $htm.find("#head-res").text(item.title);
                $htm.find(".img-res").attr("src", (item.url || "/static/images/doctor-1.png"));
                $("#ress-avail").append($htm);
            });*/
            tline = $(time).data("timeline");
            selectedAppt = undefined;
            openModal(data, tline);
        },
        time_dblclick: function(time,data){
            console.log("time dblclick event");
        }
    };

    //var $sc = jQuery("#schedule").timeSchedule(optdata);

    var validateOverlap = function(){
        var cc = $sc.checkOverlapCount(tline);
        console.log(cc);
        if (!optdata.overlap && cc > 0){
            $("#id-err").html("<b>Overlap not allowed..</b>");
            return false;
        }
        if (optdata.overlap && optdata.overlapCount && (cc == optdata.overlapCount)){
            $("#id-err").html("<b>Overlap count increased.. Choose other timings</b>");
            return false;
        }
        return true;
    }
	$(document).on("LordJesus", function(){
		schData.Name.schedule.push(bdata);
		$sc = jQuery("#schedule").timeSchedule(optdata);
	});
	
    $('.clockpicker').clockpicker({
        donetext: 'Done',
        afterDone: function(e1, e2){
            validateOverlap();
        }
    });

    $("#aptSubmit").on("click", function(){
        //ajaxCall("Insert");
        //$("#txtStrtTime").val($sc.formatTime(data.start));
        //$("#txtendtime").val($sc.formatTime(data.end));
        if (!validateOverlap()){
            return;
        }
        var s = $sc.calcStringTime($("#startTime").val());
        var e = $sc.calcStringTime($("#endTime").val());
        
        if (selectedAppt){
            var data = {};
            selectedAppt["timeline"] = tline;
            selectedAppt["start"] = s;
            selectedAppt["end"] = e;
            selectedAppt["text"] = $("#apDet").val();
            selectedAppt["data"] = {};
            selectedAppt.data.name = $("#apName").val();
            selectedAppt.data.email = $("#apEmail").val();
            selectedAppt.data.mobile = $("#apMobile").val();
            selectedAppt.data.details = $("#apDet").val();
            selectedAppt.data.resources = "";
            $sc.editScheduleData(selectedAppt)
        }
        else{
            var data = {};
            data["timeline"] = tline;
            data["start"] = s;
            data["end"] = e;
            data["text"] = $("#apDet").val();
            data["data"] = {};
            data.data.name = $("#apName").val();
            data.data.email = $("#apEmail").val();
            data.data.mobile = $("#apMobile").val();
            data.data.details = $("#apDet").val();
            data.data.resources = "";
            $sc.addScheduleData(data);
        }
        $sc.resetBarPosition(tline);
        $('.close_btn').trigger("click"); 
        $("." + data.uniqueid).css("background-color", "green")
    });

    $(document).on("mouseover", ".sc_Bar", function(){
        var bd = $(this);
        var dt = bd.data("sc_data");
        bd.animate( { 
            "width": (dt.barData.width + 100) + 'px',
            "height": (dt.barData.height + 50) + 'px',
        });
    });

    $(document).on("mouseleave", ".sc_Bar", function(){
        var bd = $(this);
        var dt = bd.data("sc_data");
        bd.stop( true, true ).animate( { 
            "width": dt.barData.width,
            "height": dt.barData.height
        });
    });

    var ajaxCall = function(action, data, method){
        var bb = { 
            action: action,
            subdomain: $("#compTbl").text(), 
            data: data
        }
        var request = $.ajax({
            //url: "http://landing.que.one/endpoint/ccreate",
            url: "/endpoint/" + action,
            type: "POST",
            data: JSON.stringify(bb),
            contentType: "application/json; charset=UTF-8"
        });

        request.success(function(result) {
            console.log(result);
            if (action == "getresources"){
                    var schData = [
                    ];
                    (result.specialities || []).forEach(function(item, idx){
                        var tt = {
                            title: item.name,
                            mins: item.mins,
                            url: item.icon,
                            resources: []
                        };
                        (item.resources || []).forEach(function(item1, idx1){
                            tt.resources.push({
                                title: item1.name,
                                mins: item1.mins,
                                url: item1.icon
                            });
                        });
                        schData.push(tt);
                    });
                    optdata.rows = schData;
                    optdata.startTime = (result.startHour || optdata.startTime);
                    optdata.endTime = (result.endHour || optdata.endTime);
                    optdata.overlap = result.overlap;
                    optdata.overlapCount = result.concurrentCount;
                $sc = jQuery("#schedule").timeSchedule(optdata)
            }
        });
        request.fail(function(jqXHR, textStatus) {
            $("#alert-pop").text('Errored: ' + textStatus);
        });
    }

    var populateWdayText = function () {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var now = new Date();
        //var now = new Date(2015, 11, 28);  - for dec 2015
        var day = now.getDay();
        var tddt = now.getDate();
        var tdm = (now.getMonth() + 1);
        var dt = new Date(now.getFullYear(), now.getMonth(), 0);
        var monthDays = dt.getDate();
        var mmtdt = selectedDate;
        for (i = 0; i < 7; i++) {
            var tdd = days[day];
            $("#apptcnt" + (i + 1)).addClass(tdd.toLowerCase()).data("selected-date", mmtdt);
            mmtdt = moment(mmtdt).add(1, 'd')
            tdd = tdd + ' <br> (' + (tddt) + ' / ' + (tdm) + ')';
            $("#wday" + (i + 1)).html(tdd);
            day = day + 1;
            tddt = tddt + 1;
            //tdm = tdm + 1;
            if (day > 6) {
                day = 0;
            }
            if (tddt > monthDays) {
                tddt = 1;
                tdm = tdm + 1;
                if (tdm == 13){
                    tdm = 1;
                }
            }
        }

    };

    $(".num").on("click", function(){
        console.log($(this).data("selected-date"));
        if (selectedDate == $(this).data("selected-date")){
            console.log("good..");
        } else {
            selectedDate = $(this).data("selected-date");
            ajaxCall("getresources");
        }
    });
    populateWdayText();
    ajaxCall("getresources");
});