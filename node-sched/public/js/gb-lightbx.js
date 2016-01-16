$(function ($) {
    
    $.fn.gblightbx = function (opt) {
        var defaults = {
            trigElem: '.btn-pop',
            shadow: '.shadow',
            close: '.close_btn',
            lightCont: '.pop_up '
        },
        set = $.extend({}, defaults, opt);

        return this.each(function () {
            var $this = $(this),
                clickElm = $this.find(set.trigElem),
                lightContbx = $this.find(set.lightCont),
                shadowbx = $this.find(set.shadow),
                Ww = $(window).width(),
                Wh = $(window).height(),
                contentHh = Wh - $(set.lightCont).outerHeight(),
                getVal;

            console.log(contentHh);

            init();

            function init() {
                clickElm.on('click', function () {
                    openLightbx(this);
                    responsive(this);
                })
                $(set.close).on('click', function () {
                    closeLgtbx();
                });
                $(shadowbx).on('click', function () {
                    closeLgtbx();
                });

                $(document).on('keyup', function (evt) {
                    if (evt.keyCode == 27) {
                        closeLgtbx();
                    }
                }); 
            }

            //init 
            $(window).resize();
            function openLightbx(_this) {
                var ind = $(_this).attr('data-id');
                responsive(_this);
                $(ind).fadeIn();
                $(shadowbx).fadeIn();
            }

            //openLightbx 

            function responsive(_this) {
                var ind = $(_this).attr('data-id');

                var Ww = $(window).width(),
                Wh = $(window).height(),
                contentHh = Wh - $(ind).outerHeight();

                $(ind).css({
                    top: contentHh / 2,
                    left: (Ww - $(ind).outerWidth()) / 2
                });
                if ($(ind).outerHeight > Wh) {
                    $(ind).css({
                        maxHeight: Wh - 20,
                        height: '100%'
                    });
                } else {
                    $(ind).css({
                        top: contentHh / 2,
                        maxHeight: Wh - 20,
                        height: 'auto'
                    });
                }

            }

            //responsive 

            function closeLgtbx() {
                $(lightContbx).fadeOut();
                $(shadowbx).fadeOut();
            }

            //close Lightbox

            $(window).resize(function () {                
                responsive();
                closeLgtbx();
            })

            $(this).append(shadowbx);

        });
    }

}(jQuery))