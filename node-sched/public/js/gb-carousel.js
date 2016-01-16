var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

(function($){
	$.fn.gbcarousel = function(opt){
		var defaults = {
			nextElem:'.next',
			prevElem:'.prev',
			sliderUl:'.slider',
			elem:'li',
			showItems:4,
			scrollItems:1,
			autoplay:true,
			scrollSpeed:500,
			scrollDelay:2000
		},
		set = $.extend({},defaults,opt),
		maxslides = set.showItems;

		return this.each(function(){
			var $this = $(this),
			next = $this.find(set.nextElem),
			prev = $this.find(set.prevElem),
			slider = $this.find(set.sliderUl),
			slideLI = slider.find(set.elem),
			marRight = parseInt(slideLI.css("margin-right")),
			slideLength = slideLI.length,
			firstLI =  slideLI.outerWidth() + marRight,
			autoplayCompleted = true,
			scrollCompleted = true,
			counts = 0,
			screenwidth = [1060,960,600],
			timer,
			wW = (isMobile.any()? screen.width : $(window).width()),
			wH = (isMobile.any()? screen.height :$(window).height());

			console.log(wH);

			init();

			function init(){
				$this.css({
					maxWidth: ((set.showItems * firstLI) )
				});

				slider.css({
					width:(slideLength * firstLI)
				});

				next.on('click',function(){
					slideNext(this);
				});

				prev.on('click',function(){
					slidePrev(this);
				});

				autoplay();
			}

			// INIT

			function slideNext(listItem){
				autoplayCompleted = true;
				if(scrollCompleted){
					if(counts < (slideLength - set.showItems )){
						counts += set.scrollItems;
						scrollCompleted = false;
						slider.animate({left: - (counts * firstLI )},set.scrollSpeed,function(){
							scrollCompleted = true;
						})
					}else {
						counts = 0;
						slider.animate({left: - (0)});
						autoplayCompleted = true;
					}
				}
			}

			//NEXT

			function slidePrev(listItem){
				autoplayCompleted = false;
				if(scrollCompleted){
					if(counts > 0 ){
						counts -= set.scrollItems;
						scrollCompleted = false;
						slider.animate({left: - (counts * firstLI )},set.scrollSpeed,function(){
							scrollCompleted = true;
						})
					}else {
						counts = 0;
						autoplayCompleted = true;					
					}
				}
			}

			//PREV

			function autoplay(){
				if(autoplay){
					timer = setInterval(function(){
						if(autoplayCompleted){
							slideNext(next);
						}else{
							slidePrev(prev);
						}
					},set.scrollDelay)
				}
			}

			//autoplay

			if(isMobile.any()){
				$(window).on('orientationchange',function(){
					doResize();
				})
			}else {
				$(window).on('resize',function(){
					doResize();
				})
			}

			function doResize(){
				wW = (isMobile.any()? screen.width : $(window).width());
				wH = (isMobile.any()? screen.height :$(window).height());

				if(wW > screenwidth[0]){
					set.showItems = maxslides;
				}
				if(wW <= screenwidth[0]){
					set.showItems = maxslides - 1;
				}
				if(wW <= screenwidth[1]){
					set.showItems = maxslides - 2;
				}
				if(wW <= screenwidth[2]){
					set.showItems = maxslides - 3;
				}

				$this.css({
					maxWidth:(set.showItems * firstLI )
				})
			}

			//doResize



		});
	}
}(jQuery))