jQuery(document).ready(function($){$(".mobilemenu-main").each(function(){var e=$(this);var icon=e.siblings(".mobile-menu-icon");icon.on("click",function(){e.addClass("active");$(this).attr("aria-expanded",$(this).attr("aria-expanded")=="true"?"false":"true");$("html").addClass("opne-mobilemenu");setTimeout(function(){e.find("a:visible").eq(0).trigger("focus");},400)})
e.find(".mobileclose").on("click",function(){e.removeClass("active");$("html").removeClass("opne-mobilemenu");icon.trigger("focus");icon.attr("aria-expanded",$(this).attr("aria-expanded")=="true"?"false":"true");})
e.find(".gomenu .dir >a").after('<button type="button" class="arrows" aria-haspopup="true" aria-expanded="false" aria-label="'+e.data("opensubmenu")+'"><i></i></button>')
e.find(".arrows").on("click",function(){$(this).toggleClass("active").parent().toggleClass("active");$(this).siblings("ul").stop().slideToggle().parent().siblings().removeClass("active").children("ul").slideUp().siblings().removeClass("active");if($(this).hasClass("active")){$(this).attr("aria-expanded","true");$(this).parent().siblings().children("button").attr("aria-expanded","false");}else{$(this).attr("aria-expanded","false");}})
$("body").append(e);e.find(".subcurrent").parent("ul").siblings(".arrows").trigger("click");e.find('a[href*="#"]:not(.mm-btn):not(.mm-next):not(.mm-title):not(.mm-subblocker)').on("click",function(){if(jQuery(this.hash).length){$(".mobileclose").trigger("click");}})
e.keydown(function(event){var t=$(this);if(event.keyCode==27){e.find(".mobileclose").trigger("click");}else if(event.which==9){var o=t.find('*');var focusItems=o.filter("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(':visible')
var focusItemsLength=focusItems.length;var focusIndex=focusItems.index(jQuery(':focus'));if(event.shiftKey){if(focusIndex==0){focusItems.get(focusItemsLength-1).focus();event.preventDefault();}}else{if(focusIndex==focusItemsLength-1){focusItems.get(0).focus();event.preventDefault();}}}})})});
;;;/*easyCarousel */
(function ($) {
    $.fn.easyCarousel = function (o) {
        o = $.extend({
            autoplay: false,
            speed: 300,
            pagination: true,
            navigation: true,
            mousewheel: true,
            loop: true,
        }, o || {});
        var d = $(this);

        for (var i in o) {
            if (d.data(i) !== undefined) {
                o[i] = d.data(i);
            }
        }
        w = d.innerWidth();
        var sbox = d.find(".carousel-scroll"),
            item = d.find(".carousel-item");
        var current = 0;
        var AnimeEnd = true;
        var itemwidth = item.eq(0).innerWidth();
        var pageitem = Math.round(w / itemwidth);
        var maxpage = item.length;
        var duplicate = maxpage % pageitem ? pageitem + (pageitem - maxpage % pageitem) : pageitem + 1;
        var initpos = itemwidth * duplicate;
        var thumbnail = false;

        if (d.data("activate")) return;
        d.data("activate", true);

        if(d.siblings(".easy-carousel-thumbnail").length){
            thumbnail = d.siblings(".easy-carousel-thumbnail");
        }

        


        if (o.loop) {

            function duplicateItem() {
                d.find(".duplicate-item").remove();

                var mod = duplicate;

                if (pageitem < maxpage) {

                    if (duplicate > maxpage) {
                        sbox.append(item.clone().addClass("duplicate-item"));
                        sbox.prepend(item.clone().addClass("duplicate-item"));
                        mod = duplicate - maxpage;
                    }
                    if (pageitem > 1) {
                        sbox.append(item.clone().addClass("duplicate-item"));
                    }
                    var duplicateAfter = item.slice(0, mod).clone().addClass("duplicate-item");
                    var duplicateBefore = item.slice(maxpage - mod, maxpage).clone().addClass("duplicate-item");

                    sbox.append(duplicateAfter);
                    sbox.prepend(duplicateBefore);

                }
                
                sbox.find(".duplicate-item .is-lightbox").each(function(){
                    $(this).off().on("click",function(event){
                        event.preventDefault();
                        let url = $(this).attr("href");
                        sbox.find('.carousel-item:not(.duplicate-item) .is-lightbox[href="'+url+'"]').trigger("click");
                    })
                });

            }

            duplicateItem();

            if (pageitem < maxpage) {
                sbox.css({
                    "transform": "translate3d(-" + (initpos) + "px, 0px, 0px)",
                    "transition-duration": "0ms"
                });
                d.addClass("no-scroll");
            } else {
                d.removeClass("no-scroll");
            }
            item.eq(0).addClass("active first-item").siblings().removeClass("active first-item last-item");
            item.eq(0).nextAll().eq(pageitem - 2).addClass("last-item");
            if (sbox.find(".duplicate-item .img-Lazy").length && typeof $.fn.scrollLoading == "function") {
                sbox.find(".duplicate-item .img-Lazy").scrollLoading({
                    loading: true
                });

            }

        } else {
            initpos = 0;
            item.eq(0).addClass("active first-item").siblings().removeClass("active first-item last-item");
            item.eq(0).nextAll().eq(pageitem - 2).addClass("last-item");
        }


        var resizeOne = false;

        $(window).resize(function () {
            clearInterval(resizeOne);
            resizeOne = setTimeout(function () {
                w = d.innerWidth();
                itemwidth = item.eq(0).innerWidth();


                if (Math.round(w / itemwidth) != pageitem) {
                    pageitem = Math.round(w / itemwidth);
                    itemwidth = w / pageitem;

                    duplicate = maxpage % pageitem ? pageitem + (pageitem - maxpage % pageitem) : pageitem + 1;

                    if (o.loop) {
                        duplicateItem();
                    }

                    if (o.pagination && typeof pagination) {
                        pagination.empty();
                        for (var p = 0; p < Math.ceil(maxpage / pageitem); p++) {
                            pagination.append('<span class="pagination-bullet" tabindex="0" role="button" aria-label="' + GlobalAriaLabel["Gotoslide"] + ' ' + (p + 1) + '"></span>')
                        }
                        pagination.find(".pagination-bullet").eq(Math.ceil(current / pageitem)).addClass("active");
                    }
                };
                if (pageitem < maxpage) {

                    initpos = o.loop ? itemwidth * duplicate : 0;

                    sbox.css({
                        "transform": "translate3d(-" + (current * itemwidth + initpos) + "px, 0px, 0px)",
                        "transition-duration": "0ms"
                    });

                    item.eq(0).addClass("active").siblings().removeClass("active");

                    if (!o.loop && o.navigation) {
                        if (current + pageitem > maxpage - 1) {
                            navnext.attr("disabled", "disabled").attr("tabindex", "-1");
                        } else {
                            navnext.removeAttr("disabled").attr("tabindex", "0");
                        }
                    }

                   typeof pagination !="undefined" && pagination.show();  
                   typeof navnext !="undefined" && navnext.show();  
                   typeof navprev !="undefined" && navprev.show();  
                   
                   d.removeClass("no-scroll");

                } else {  
                    sbox.css({
                        "transform": "translate3d(0px, 0px, 0px)",
                        "transition-duration": "0ms"
                    });
                    
                    item.eq(0).addClass("active").siblings().removeClass("active");

                    typeof pagination !="undefined" && pagination.hide();  
                    typeof navnext !="undefined" && navnext.hide();  
                    typeof navprev !="undefined" && navprev.hide(); 

                    d.addClass("no-scroll");
                }

            }, 300)
        })


        function carouselplay() {
            if (AnimeEnd && pageitem < maxpage) {
                AnimeEnd = false;
                if (o.loop) {
                    sbox.css({
                        "transform": "translate3d(-" + (current * itemwidth + initpos) + "px, 0px, 0px)",
                        "transition-duration": o.speed + "ms"
                    });
                    item.eq(current).addClass("active first-item").siblings().removeClass("active first-item last-item");
                    item.eq(current).nextAll().eq(pageitem - 2).addClass("last-item");

                    if (current < 0 || current > maxpage - 1) {

                        current = Math.abs(maxpage - Math.abs(current));

                        setTimeout(function () {
                            sbox.css({
                                "transition-duration": "0ms",
                                "transform": "translate3d(-" + (current * itemwidth + initpos) + "px, 0px, 0px)",
                            }).delay(50).queue(function () {
                                $(this).css({
                                    "transition-duration": o.speed + "ms"
                                }).dequeue();
                            })
                            item.eq(current).addClass("active").siblings().removeClass("active");

                        }, o.speed + 50)

                    }
                } else {
                    current = Math.max(Math.min(current, maxpage - pageitem), 0)
                    sbox.css({
                        "transform": "translate3d(-" + (current * itemwidth + initpos) + "px, 0px, 0px)",
                        "transition-duration": o.speed + "ms"
                    });
                    item.eq(current).addClass("active first-item").siblings().removeClass("active first-item last-item");
                    item.eq(current).nextAll().eq(pageitem - 2).addClass("last-item");
 
                }

                if (o.pagination) {
                    pagination.find(".pagination-bullet").eq(Math.ceil(current / pageitem)).addClass("active").siblings().removeClass("active");
                }




                if (!o.loop && o.navigation) {

                    navprev.removeAttr("disabled").attr("tabindex", "0");
                    navnext.removeAttr("disabled").attr("tabindex", "0");

                    if (current == 0) {
                        navprev.attr("disabled", "disabled").attr("tabindex", "-1");
                    }
                    if (current + pageitem > maxpage - 1) {
                        navnext.attr("disabled", "disabled").attr("tabindex", "-1");
                    }

                }
                if(thumbnail){
                    thumbnail.children().eq(current).fadeIn().siblings().fadeOut();
                }



                setTimeout(function () {
                    AnimeEnd = true;
                }, o.speed + 100);
            }
        }


        if (o.autoplay) {
            o.autoplay = Math.max(o.speed, o.autoplay)

            var setIntervalplay = setInterval(function () {
                current = current + 1;
                carouselplay();
            }, o.autoplay);
            d.on("mouseenter", function () {
                clearInterval(setIntervalplay);
            }).on("mouseleave", function () {
                clearInterval(setIntervalplay);
                setIntervalplay = setInterval(function () {
                    current = current + 1;
                    carouselplay();
                }, o.autoplay);
            })
            document.addEventListener("visibilitychange", function () {
                if (document.hidden) {
                    clearInterval(setIntervalplay);
                } else {
                    clearInterval(setIntervalplay);
                    setIntervalplay = setInterval(function () {
                        current = current + 1;
                        carouselplay();
                    }, o.autoplay);
                }
            });
        }
        if (o.pagination) {
            var pagination = $('<div class="carousel-pagination"></div>')
            for (var p = 0; p < Math.ceil(maxpage / pageitem); p++) {
                pagination.append('<span class="pagination-bullet" tabindex="0" role="button" aria-label="' + GlobalAriaLabel["Gotoslide"] + ' ' + (p + 1) + '"></span>')
            }
            d.append(pagination);

            pagination.on("click", ".pagination-bullet", function () {
                current = $(this).index() * pageitem;
                carouselplay();
            }).on("mousemove", ".pagination-bullet", function (event) {
                event.stopPropagation();
            }).find(".pagination-bullet").eq(Math.round(current / pageitem)).addClass("active");
            
            

            if(pageitem >= maxpage){
                pagination.hide();  
            }

            
        }

        d.on("navPrev", function(){
            if (AnimeEnd) {
                current = current - 1;
                carouselplay();
            }
        });

        d.on("navNext", function(){
            if (AnimeEnd) {
                current = current + 1;
                carouselplay();
            }
        });


        if (o.navigation) {
            var navprev = $('<div class="carousel-navigation carousel-prev" tabindex="0" role="button" aria-label="' + GlobalAriaLabel["Previousslide"] + '"><span></span></div>');
            var navnext = $('<div class="carousel-navigation carousel-next" tabindex="0" role="button" aria-label="' + GlobalAriaLabel["Nextslide"] + '"><span></span></div>');
            d.append(navprev);
            d.append(navnext);

            navprev.on("click", function () {
                d.trigger("navPrev");
            }).on("mousemove", function (event) {
                event.stopPropagation();
            });
            navnext.on("click", function () {
                d.trigger("navNext");
            }).on("mousemove", function (event) {
                event.stopPropagation();
            });
            if (!o.loop) {
                if (current == 0) {
                    navprev.attr("disabled", "disabled").attr("tabindex", "-1");;
                }
                if (current + pageitem > maxpage - 1) {
                    navnext.attr("disabled", "disabled").attr("tabindex", "-1");;
                }
            }
            if(pageitem >= maxpage){
                navnext.hide();  
                navprev.hide();  
            }


        }
        if (o.mousewheel) {
            if (typeof $.fn.newMouse == "undefined") {
                $.fn.newMouse = function (options) {
                    var defaults = {
                        mousedown: function () {},
                        mouseup: function () {},
                        mousemove: function () {}
                    }
                    var o = $.extend(defaults, options);
                    var e = $(this);
                    e[0].addEventListener('touchstart', touch, false);
                    e[0].addEventListener('touchmove', touch, false);
                    e[0].addEventListener('touchend', touch, false);
                    e[0].addEventListener('mousedown', touch, false);
                    e[0].addEventListener('mouseup', touch, false);
                    e[0].addEventListener('mousemove', touch, false);
                    e[0].addEventListener('mouseleave', touch, false);
                    var isdown = false,
                        startX = 0,
                        startY = 0,
                        endX = 0,
                        endY = 0;

                    function touch(event) {
                        var event = event || window.event;



                        switch (event.type) {
                            case "touchstart":
                            case "mousedown":
                                events = event.type == "mousedown" ? event : event.touches[0];
                                isdown = true;
                                o.mousedown();
                                break;
                            case "touchend":
                            case "mouseup":
                            case "mouseleave":
                                if (isdown) {
                                    events = event.type != "touchend" ? event : event.changedTouches[0];
                                    isdown = false;
                                    o.mouseup();
                                }
                                break;
                            case "touchmove":
                            case "mousemove":
                                if (isdown) {
                                    //event.preventDefault();
                                    events = event.type == "mousemove" ? event : event.touches[0];
                                    o.mousemove();
                                }
                                break;
                        }
                    }
                }
            }
            var translateX = 0;
            var drop = 0;
            var speedTime = false;

            d.newMouse({
                mousedown: function () {
                    if (AnimeEnd && pageitem < maxpage) {
                        speedTime = new Date();
                        startX = events.clientX;
                        startY = events.clientY;
                        sbox.css({
                            "transition-duration": "0ms"
                        });
                        translateX = -current * itemwidth - initpos;
                        drop = 0;

                    }
                },
                mousemove: function () {
                    if (AnimeEnd && speedTime && pageitem < maxpage) {
                        drop = events.clientX - startX;
                        sbox.css({
                            "transform": "translate3d(" + (translateX + drop) + "px, 0px, 0px)",
                            "transition-duration": "0ms"
                        });
                        d.addClass("mousemove");
                    }else if(typeof event == "undefined" || event.target.nodeName != "A"){
                        d.addClass("mousemove");
                    }
                },
                mouseup: function () {
                    if (AnimeEnd && drop && speedTime && pageitem < maxpage) {
                        speedTime = speedTime ? new Date() - speedTime : 300;
                        current = speedTime > 200 ? current - Math.round(drop / itemwidth) : drop < 0 ? current + pageitem : current - pageitem;

                        sbox.css({
                            "transition-duration": o.speed + "ms"
                        });
                        drop = 0;
                        translateX = 0;
                        speedTime = false;
                        carouselplay();
                    }
                    d.removeClass("mousemove");
                },
            })

            d.append('<span class="drag"></span>');

        }

        d.find(".carousel-navigation,.pagination-bullet").on("keydown", function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            var keycode = e.keyCode;
            if (keycode == 13) {
                $(this).click();
            }
        })

        var focusin = true;

        sbox.on("focusin", function () {
            d.trigger("mouseenter");
            if (focusin) {
                if (sbox.find(":focus").offset().left < 0) {
                    item.eq(current).find("a").trigger("focus");
                }
                focusin = false;
            }

        }).on("focusout", function (event) {
            setTimeout(function () {
                if (!sbox.find(":focus").length) {
                    d.trigger("mouseleave");
                    focusin = true;
                }
            }, 16)
        })



    }
})(jQuery);

var easyCarouselLauncher = function (mod) {
    mod.each(function () {
        var e = $(this);
        if (e.is(":hidden")) {
            var observer = new MutationObserver(function () {
                if (e.is(":visible")) {
                    observer.disconnect();
                    e.easyCarousel();
                }
            });
            observer.observe(e.parents(":hidden").length ? e.parents(":hidden").last()[0] : e[0], {
                "attributes": true
            });
        } else {
            e.easyCarousel();
        }

    })

    $(".carousel-navigation-button").each(function(){

        let carousel = $(this).parents(".is-boxes").find(".easy-carousel").eq(0);
        if(typeof carousel != "undefined"){ 
            $(this).find(".prev").on("click",function(event){
                event.preventDefault()
                carousel.trigger("navPrev");
                return false;
            })
            $(this).find(".next").on("click",function(event){
                event.preventDefault()
                carousel.trigger("navNext");
                return false;
            })
        }
    })
}

$(document).ready(function () {
    easyCarouselLauncher($(".easy-carousel"));
})
;;;