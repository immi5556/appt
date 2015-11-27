var a7 = (function (win, d3abru) {

    var a7core = (function () {
        var Extend = function (a, b) {
            var b = (b || {}), d = {};
            for (var p in a) {
                if (typeof b[p] === "object" && b[p] !== null) {
                    if (!a[p]) {
                        a[p] = b[p];
                    }
                    else {
                        Extend(a[p], b[p]);
                    }
                }
                d[p] = (!b[p]) ? a[p] : b[p];
            }
            return d;
        }

        return {
            extend: Extend
        }
    })();

    return function (selector) {
        var dom = document.querySelectorAll(selector);

        var w = dom.offsetWidth || window.innerWidth;
        var h = dom.offsetHeight || window.innerHeight;
        var steps = [
            { 'time': '06:00', 'disp': '06:00 AM' },
            { 'time': '06:30', 'disp': '06:30 AM' },
            { 'time': '07:00', 'disp': '07:00 AM' },
            { 'time': '07:30', 'disp': '07:30 AM' },
            { 'time': '08:00', 'disp': '08:00 AM' },
            { 'time': '08:30', 'disp': '08:30 AM' },
            { 'time': '09:00', 'disp': '09:00 AM' },
            { 'time': '09:30', 'disp': '09:30 AM' },
            { 'time': '10:00', 'disp': '10:00 AM' },
            { 'time': '11:30', 'disp': '11:30 AM' },
            { 'time': '12:00', 'disp': '12:00 PM' },
            { 'time': '12:30', 'disp': '12:30 PM' },
            { 'time': '13:00', 'disp': '01:00 PM' },
            { 'time': '13:30', 'disp': '01:30 PM' },
            { 'time': '14:00', 'disp': '02:00 PM' },
            { 'time': '14:30', 'disp': '02:30 PM' },
            { 'time': '15:00', 'disp': '03:00 PM' },
            { 'time': '15:30', 'disp': '03:30 PM' },
            { 'time': '16:00', 'disp': '04:00 PM' },
            { 'time': '16:30', 'disp': '04:30 PM' },
            { 'time': '17:00', 'disp': '05:00 PM' },
            { 'time': '17:30', 'disp': '05:30 PM' }
        ];
        var base = {
            width: w - 40,
            height: h - 40,
            maxMinutes: 1440,
            minMinutes: 0,
            pixelsPerHour: 200,
            headerlabel: 'Schedule',
            variety: [],
            steps: steps,
            tasks: []
        };

        var Css = function (conf) {
            for (i in conf) {
                for (j; j < dom.length; j++) {
                    dom[j].style[i] = conf[i];
                }
            }
        };

        var minutesToTimeStr = function (minutes) {
            var hours = Math.floor(minutes / 60);
            var minutesInHour = minutes - hours * 60;
            var str = '';

            if (hours < 10) {
                str = '0' + String(hours);
            } else {
                str = String(hours);
            }

            if (minutesInHour < 10) {
                str += ':0' + String(minutesInHour);
            } else {
                str += ':' + String(minutesInHour);
            }

            return str;
        };

        var timeStrToMinutes = function (strdat) {
            var str = strdat.time || strdat;
            var split = str.split(':');
            return parseInt(split[0]) * 60 + parseInt(split[1]);
        };

        var minutesToPixels = function (minutes) {
            return Math.round(minutes * config.pixelsPerHour / 60);
        };

        var pixelsToMinutes = function (pixels) {
            return Math.round(60 * pixels / this.opts.pixelsPerHour);
        };

        var getConfig = function (opt) {
            var config = a7core.extend(base, opt);
            config.hHeight = 40 - 1;
            config.dWidth = (config.width / 10) < 140 ? 140 : (config.width / 10);
            config.dHeight = (config.height - 40) / config.variety.length;
            config.dislocation = 1;
            config.steps = config.steps.map(function (item) {
                item.mins = timeStrToMinutes(item.time);
                return item;
            });
            return config;
        };

        var buildHeader = function () {
            var ghdr0 = svg.append("g")
                .attr("class", "hdr-g-0");

            var hdr0 = ghdr0
                .append("rect")
                .attr("class", "hdr-rect-0")
                .attr("width", config.dWidth)
                .attr("height", config.hHeight)
                .style("fill", c20c(0));

            ghdr0.append("text")
                .attr("class", "hdr-text-0")
                .attr("y", config.hHeight / 2)
                .attr("x", config.dWidth / 2)
                .attr("text-anchor", "middle")
                .text(config.headerlabel);

            var hdrtime0 = svg.append("g")
            .attr("transform", "translate(" + (config.dWidth + config.dislocation) + ",0)")
                .append("rect")
                .attr("class", "hdr-time-0")
                .attr("width", (config.width - config.dWidth + config.dislocation))
                .attr("height", config.hHeight - 1)
                .style("fill", 'white');

            var ghtime0 = svg.selectAll(".hdr-htime").data(config.steps)
                .enter().append("g")
                .attr("class", "hdr-g-time-0");

            var ghrect = ghtime0.append("rect")
                .attr("class", "hdr-htime-rect")
                .attr("x", function (d, i) {
                    return i * (config.width - config.dWidth) / config.steps.length + config.dWidth + 1;
                })
                .attr("width", function (d, i) {
                    return (config.width - config.dWidth) / config.steps.length;
                })
                .attr("height", function (d, i) {
                    return config.hHeight;
                })
                .style("fill", c20c(0));

            var timetext0 = ghtime0.append("text")
                .attr("class", "hdr-htime-text")
                .attr("x", function (d, i) {
                    return i * (config.width - config.dWidth) / config.steps.length + config.dWidth + config.dislocation;
                })
                .attr("y", 20)
                    .attr("text-anchor", "start")
                    .attr("fill", "#fff")
                .style("stroke-width", 1)
                .text(function (d) {
                    return d.disp;
                });
        };

        var buildVariety = function () {
            var hbar = svg.selectAll(".g-bar")
                .data(config.variety)
                .enter().append("g")
                .attr("class", "g-bar")
                .attr("transform", function (d, i) {
                    return "translate(0," + ((i * config.dHeight) + config.hHeight + 1) + ")";
                });

            hbar.append("rect")
                .attr("class", "h-rect")
                .style("fill", function (d, i) {
                    //return c20c(i + 1);
                    return colorbrewer.Pastel1[9][(i % 9)];
                })
                .attr("width", config.dWidth)
                .attr("height", config.dHeight - 1);

            hbar.append("text")
                .attr("y", config.dHeight / 2)
                .attr("x", config.dWidth / 2)
                .attr("text-anchor", "middle")
                .text(function (d) { return d; });
        };

        var buildTimeBar = function () {
            var bar = svg.selectAll(".gh-bar")
            .data(config.variety)
            .enter().append("g")
                .attr("class", "gh-bar")
                .attr("transform", function (d, i) {
                    return "translate(" + (config.dWidth + 1) + "," + ((i * config.dHeight) + config.hHeight + 1) + ")";
                });

            timebar = bar.append("rect")
                .attr("class", "h-rect")
                .style("fill", function (d, i) {
                    return colorbrewer.Pastel1[9][(i % 9)];
                })
                .attr("width", (config.width - config.dWidth + 1))
                .attr("height", config.dHeight - 1)
            .on("mouseup", function (d, i) {

            });
        };
        var timebar;
        var buildTasks = function () {
            var xlin = d3.scale.linear()
                //.domain([0, 1440])
                .domain([d3.min(config.steps, function(d) { return d.mins; }), d3.max(config.steps, function(d) { return d.mins; }) ])
                .range([(config.dWidth + 1), (config.width - config.dWidth + 1)]);
            var taksarr = [];
            config.tasks.forEach(function (item, idx) {
                item.appointments.forEach(function (apts) {
                    apts.startMins = timeStrToMinutes(apts.start);
                    apts.endMins = timeStrToMinutes(apts.end);
                    apts.x = xlin(apts.startMins);
                    apts.endx = xlin(apts.endMins);
                    apts.width = apts.endx - apts.x;
                    apts.height = config.dHeight;
                    apts.y = (idx * config.dHeight) + config.hHeight;
                    apts.r1 = config.dHeight / 2;
                    apts.x1 = apts.x + apts.r1;
                    apts.y1 = (idx * config.dHeight) + config.hHeight + apts.r1;
                    taksarr.push(apts);
                });
            });

            var drag = d3.behavior.drag()
                    .origin(function (d) { return d; })
                    .on("drag", dragmove)
                     .on("dragend", dragdrop);

            var gtask = svg.selectAll(".g-tasks")
                    .data(taksarr)
                    .enter()
                    .append("g")
                    .attr("class", "g-tasks")
                    .attr("transform", function(d) { 
                        return "translate(" + d.x + "," + d.y + ")"; 
                    })
                    .call(drag);

            gtask.append("rect")
                    .attr("rx", 6)
                    .attr("ry", 6)
                    .attr("width", function (d, i) { return d.width; })
                    .attr("height", function (d, i) { return d.height; })
                    .attr("class", "tasks-i")
                    .style("fill", function (d, i) {
                        return colorbrewer.Set3[12][(i % 12)];
                    })
                    .on("mouseover", function () {
                        d3.select(this)
                        .style("fill", "red");
                    })
                    .on("mouseout", function (d, i) {
                        d3.select(this)
                       .style("fill", colorbrewer.Set3[12][(i % 12)]);
                    });

            function dragmove(d) {
                d3.select(this)
                    .attr("transform", function(d){
                        d.x = d3.event.x;
                        return "translate(" + d3.event.x + "," + d3.event.y + ")";
                    });
                    //.attr("x", d.x = d3.event.x)
                    //.attr("y", d.y = d3.event.y);
            }
            var sx1, sx1, sy1, sy2, curolap, cridx;
            function collide(node1) {
                var node = d3.transform(d3.select(node1).attr("transform")).translate,
                    mwid = d3.select(node1).node() .getBBox(),
                  x1 = node[0],
                  x2 = x1 + mwid.width,
                  y1 = node[1],
                  y2 = y1 + mwid.height;
                var colliding = false;
                timebar.each(function (d, i) {
                    var nd2 = d3.transform(d3.select(this.parentNode).attr("transform")).translate,
                      nd1 = d3.select(this),
                      nx1 = parseFloat(nd2[0]),
                      nx2 = nx1 + parseFloat(nd1.attr("width")),
                      ny1 = nd2[1],
                      ny2 = ny1 + parseFloat(nd1.attr("height"));

                    if (!(x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1) && !colliding) {
                        curolap = this;
                        sx1 = nx1; sx1 = nx2; sy1 = ny1; sy2 = ny2; cridx = i;
                        colliding = true;
                    }
                })

                return colliding;
            }

            function dragdrop(d) {
                if (collide(this)) {
                    d3.select(this)
                        .attr("transform", function(d) {
                            return "translate(" + d.x + "," + sy1 + ")"; 
                        });
                        //.attr("x", d.x = d3.event.x)
                        //.attr("y", d.y = sy1);
                }
            }
        };

        var config, x, c20c, svg;
        var Scheduler = function (opt) {
            config = getConfig(opt);

            c20c = d3.scale.category20c();

            svg = d3.select(selector).append("svg")
                        .attr("width", config.width)
                        .attr("height", config.height);

            buildHeader();
            buildVariety();
            buildTimeBar();
            buildTasks();
        };

        var execute = function (opt) {
            var config = a7core.extend(base, opt);
        };

        return {    
            css: Css,
            scheduler: Scheduler
        };
    };

})(window, d3);

a7.prototype = fn = {};