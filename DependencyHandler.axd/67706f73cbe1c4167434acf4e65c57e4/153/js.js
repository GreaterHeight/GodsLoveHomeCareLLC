jQuery(document).ready(function($){$(".mobilemenu-main").each(function(){var e=$(this);var icon=e.siblings(".mobile-menu-icon");icon.on("click",function(){e.addClass("active");$(this).attr("aria-expanded",$(this).attr("aria-expanded")=="true"?"false":"true");$("html").addClass("opne-mobilemenu");setTimeout(function(){e.find("a:visible").eq(0).trigger("focus");},400)})
e.find(".mobileclose").on("click",function(){e.removeClass("active");$("html").removeClass("opne-mobilemenu");icon.trigger("focus");icon.attr("aria-expanded",$(this).attr("aria-expanded")=="true"?"false":"true");})
e.find(".gomenu .dir >a").after('<button type="button" class="arrows" aria-haspopup="true" aria-expanded="false" aria-label="'+e.data("opensubmenu")+'"><i></i></button>')
e.find(".arrows").on("click",function(){$(this).toggleClass("active").parent().toggleClass("active");$(this).siblings("ul").stop().slideToggle().parent().siblings().removeClass("active").children("ul").slideUp().siblings().removeClass("active");if($(this).hasClass("active")){$(this).attr("aria-expanded","true");$(this).parent().siblings().children("button").attr("aria-expanded","false");}else{$(this).attr("aria-expanded","false");}})
$("body").append(e);e.find(".subcurrent").parent("ul").siblings(".arrows").trigger("click");e.find('a[href*="#"]:not(.mm-btn):not(.mm-next):not(.mm-title):not(.mm-subblocker)').on("click",function(){if(jQuery(this.hash).length){$(".mobileclose").trigger("click");}})
e.keydown(function(event){var t=$(this);if(event.keyCode==27){e.find(".mobileclose").trigger("click");}else if(event.which==9){var o=t.find('*');var focusItems=o.filter("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(':visible')
var focusItemsLength=focusItems.length;var focusIndex=focusItems.index(jQuery(':focus'));if(event.shiftKey){if(focusIndex==0){focusItems.get(focusItemsLength-1).focus();event.preventDefault();}}else{if(focusIndex==focusItemsLength-1){focusItems.get(0).focus();event.preventDefault();}}}})})});
;;;$.fn.scrollLoading=function(options){let images=$(this);images.each(function(){if(typeof DNNapplyTypography=="undefined"&&this.nodeName.toLowerCase()=="img"){let url=$(this).attr("data-src");var viewBox=$(this).attr("src")&&$(this).attr("src").indexOf("viewBox='")!=-1?$(this).attr("src").split("viewBox='")[1].split("' ")[0].split(" "):false;if(viewBox[2]){var w=viewBox[2];}else{var w=$(this).width();}
$(this).siblings(".Lazy-loading-transparent,.Lazy-loading").remove();if(url&&(url.indexOf(".png")!=-1||url.indexOf(".gif")!=-1)){$(this).before('<span class="Lazy-loading-transparent" style="width:'+w+'px"></span>').parent().addClass("img-Lazy-warp");}else if(url){$(this).before('<span class="Lazy-loading" style="width:'+w+'px"></span>').parent().addClass("img-Lazy-warp");}
$(this).addClass("img-loading");}})
function imgAnimation(o){o.siblings(".Lazy-loading,.Lazy-loading-transparent").addClass("load-over").delay(400).queue(function(){$(this).remove().dequeue();});o.removeClass("img-loading");}
var LoadImages=function(event){if(event.isTrusted){images.each(function(){var e=$(this);if(this.dataset.src){this.src=this.dataset.src;delete this.dataset.src;e.one("load",function(){imgAnimation(e);});}});['click','scroll'].forEach(function(e){document.removeEventListener(e,LoadImages);window.removeEventListener('resize',LoadImagesOne);});}};['click','scroll'].forEach(function(e){document.addEventListener(e,LoadImages);});var LoadImagesOne=function(event){const viewPortHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;images.each(function(){const top=this.getBoundingClientRect()&&this.getBoundingClientRect().top;if(top<=viewPortHeight&&this.dataset.src){this.src=this.dataset.src;delete this.dataset.src;$(this).one("load",function(){imgAnimation($(this));})}});}
LoadImagesOne();window.addEventListener('resize',LoadImagesOne);};$.fn.scrollLoadingBackground=function(options){let background=$(this);var LoadBackground=function(event){if(event.isTrusted){background.each(function(){var e=$(this);if(this.dataset.src){this.style.backgroundImage="url(\""+this.dataset.src+"\")";delete this.dataset.src;}});['click','scroll'].forEach(function(e){document.removeEventListener(e,LoadBackground);window.removeEventListener('resize',LoadBackgroundOne);});}};['click','scroll'].forEach(function(e){document.addEventListener(e,LoadBackground);});var LoadBackgroundOne=function(event){const viewPortHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;background.each(function(){if($(this).is(":visible")){const top=this.getBoundingClientRect()&&this.getBoundingClientRect().top;if(top<=viewPortHeight&&this.dataset.src){this.style.backgroundImage="url(\""+this.dataset.src+"\")";delete this.dataset.src;}}});};LoadBackgroundOne();window.addEventListener('resize',LoadBackgroundOne);};$.fn.scrollLoadingVideo=function(options){let background=$(this);var LoadBackground=function(event){if(event.isTrusted){background.each(function(){var isLazy=false;$(this).find("source").each(function(){if(this.dataset.src){this.src=this.dataset.src;delete this.dataset.src;isLazy=true;}})
if(isLazy){var video=$(this).find("video");video.after(video[0].outerHTML);video.remove();}});['click','scroll'].forEach(function(e){document.removeEventListener(e,LoadBackground);document.removeEventListener('resize',LoadBackgroundOne);});}};['click','scroll'].forEach(function(e){document.addEventListener(e,LoadBackground);});var LoadBackgroundOne=function(event){const viewPortHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;background.each(function(){if($(this).is(":visible")){const top=this.getBoundingClientRect()&&this.getBoundingClientRect().top;if(top<=viewPortHeight){var isLazy=false;$(this).find("source").each(function(){if(this.dataset.src){this.src=this.dataset.src;delete this.dataset.src;isLazy=true;}})
if(isLazy){var video=$(this).find("video");video.after(video[0].outerHTML);video.remove();}}}});};LoadBackgroundOne();window.addEventListener('resize',LoadBackgroundOne);};jQuery(document).ready(function(){$(".img-Lazy:not(.img-loading)[data-src]").scrollLoading({loading:true,});$(".bg-Lazy").scrollLoadingBackground({loading:true,});$(".video-Lazy").scrollLoadingVideo({loading:true,});$(".iframe-Lazy").scrollLoading({loading:true,});})
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
;;;jQuery(function(){ParallaxScroll.init();});var ParallaxScroll={showLogs:false,round:1000,init:function(){this._log("init");if(this._inited){this._log("Already Inited");this._inited=true;return;}
this._requestAnimationFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback,element){window.setTimeout(callback,1000/60);};})();this._onScroll(true);},_inited:false,_properties:['x','y','z','rotate','rotateX','rotateY','rotateZ','scaleX','scaleY','scaleZ','scale','opacity'],_requestAnimationFrame:null,_log:function(message){if(this.showLogs)console.log("Parallax Scroll / "+message);},_onScroll:function(noSmooth){var scroll=jQuery(document).scrollTop();var windowHeight=jQuery(window).height();this._log("onScroll "+scroll);jQuery("[data-parallax2]").each(jQuery.proxy(function(index,el){var jQueryel=jQuery(el);var properties=[];var applyProperties=false;var style=jQueryel.data("style");if(style==undefined){style=jQueryel.attr("style")||"";jQueryel.data("style",style);}
var datas=[jQueryel.data("parallax2")];var iData;for(iData=2;;iData++){if(jQueryel.data("parallax2"+iData)){datas.push(jQueryel.data("parallax2-"+iData));}
else{break;}}
var datasLength=datas.length;for(iData=0;iData<datasLength;iData++){var data=datas[iData];var scrollFrom=data["from-scroll"];if(scrollFrom==undefined){scrollFrom=jQuery(el).offset().top-windowHeight;}
if(scrollFrom&&String(scrollFrom).indexOf("%")!=-1){scrollFrom=Number(windowHeight)*Number(scrollFrom.replace("%",""))*0.01;}
scrollFrom=scrollFrom|0;var scrollDistance=data["distance"];var scrollTo=data["to-scroll"];if(scrollDistance==undefined&&scrollTo==undefined)scrollDistance=windowHeight+jQueryel.height();if(scrollDistance&&String(scrollDistance).indexOf("%")!=-1){scrollDistance=Number(windowHeight)*Number(scrollDistance.replace("%",""))*0.01;}
scrollDistance=Math.max(scrollDistance|0,1);var easing=data["easing"];var easingReturn=data["easing-return"];if(easing==undefined||!jQuery.easing||!jQuery.easing[easing])easing=null;if(easingReturn==undefined||!jQuery.easing||!jQuery.easing[easingReturn])easingReturn=easing;if(easing){var totalTime=data["duration"];if(totalTime==undefined)totalTime=scrollDistance;totalTime=Math.max(totalTime|0,1);var totalTimeReturn=data["duration-return"];if(totalTimeReturn==undefined)totalTimeReturn=totalTime;scrollDistance=1;var currentTime=jQueryel.data("current-time");if(currentTime==undefined)currentTime=0;}
if(scrollTo==undefined)scrollTo=scrollFrom+scrollDistance;scrollTo=scrollTo|0;var smoothness=data["smoothness"];if(smoothness==undefined)smoothness=10;smoothness=smoothness|0;if(noSmooth||smoothness==0)smoothness=1;smoothness=smoothness|0;var scrollCurrent=scroll;scrollCurrent=Math.max(scrollCurrent,scrollFrom);scrollCurrent=Math.min(scrollCurrent,scrollTo);if(easing){if(jQueryel.data("sens")==undefined)jQueryel.data("sens","back");if(scrollCurrent>scrollFrom){if(jQueryel.data("sens")=="back"){currentTime=1;jQueryel.data("sens","go");}
else{currentTime++;}}
if(scrollCurrent<scrollTo){if(jQueryel.data("sens")=="go"){currentTime=1;jQueryel.data("sens","back");}
else{currentTime++;}}
if(noSmooth)currentTime=totalTime;jQueryel.data("current-time",currentTime);}
this._properties.map(jQuery.proxy(function(prop){var defaultProp=0;var to=data[prop];if(to==undefined)return;if(prop=="scale"||prop=="scaleX"||prop=="scaleY"||prop=="scaleZ"||prop=="opacity"){defaultProp=1;}else{}
var prev=jQueryel.data("_"+prop);if(prev==undefined)prev=defaultProp;var next=(((to-defaultProp)*(scrollCurrent-scrollFrom)/(scrollTo-scrollFrom))+defaultProp);var val=prev+(next-prev)/smoothness;if(easing&&currentTime>0&&currentTime<=totalTime){var from=defaultProp;if(jQueryel.data("sens")=="back"){from=to;to=-to;easing=easingReturn;totalTime=totalTimeReturn;}
val=jQuery.easing[easing](null,currentTime,from,to,totalTime);}
if(val==prev&&next==to)val=Number(to);if(!properties[prop])properties[prop]=0;if(scroll<scrollFrom){val=Number(to)};properties[prop]=val;if(prev!=properties[prop]){if(scroll>=scrollFrom){jQueryel.data("_"+prop,properties[prop]);}
applyProperties=true;}else{}},this));}
var currDatas=datas[iData-1];if(properties["z"]!=undefined||properties["scaleX"]!=undefined||properties["scaleY"]!=undefined||properties["scaleZ"]!=undefined||properties["rotateX"]!=undefined||properties["rotateY"]!=undefined||properties["rotateZ"]!=undefined){var perspective=data["perspective"];if(perspective==undefined)perspective=800;var jQueryparent=jQueryel.parent();if(!jQueryparent.data("style"))jQueryparent.data("style",jQueryparent.attr("style")||"");jQueryparent.attr("style","perspective:"+perspective+"px; -webkit-perspective:"+perspective+"px; "+jQueryparent.data("style"));}
if(scroll>=scrollFrom){for(var key in properties){if(currDatas[key]!=undefined){if((key=="opacity")&&properties[key]!=1&&properties[key]){properties[key]=Math.min(Number(currDatas[key])-Number(properties[key])*2+2,1);}else if((key=="scaleX"||key=="scaleY"||key=="scaleZ")&&properties[key]!=1&&properties[key]){properties[key]=Math.max(0,Math.min(Number(currDatas[key])-Number(properties[key])*2+2,1));}else if((key=="x"||key=="y"||key=="z")&&properties[key]){properties[key]=(currDatas[key]-properties[key]*2).toFixed(4).replace(/[.]?0+$/g,"");}else if((key=="rotate"||key=="rotateX"||key=="rotateY"||key=="rotateZ")&&properties[key]){properties[key]=(currDatas[key]-properties[key]).toFixed(4).replace(/[.]?0+$/g,"");}}}}
var translate3d="translate3d("+(properties["x"]?properties["x"]:0)+"px, "+(properties["y"]?properties["y"]:0)+"px, "+(properties["z"]?properties["z"]:0)+"px)";var rotate3d=(properties["rotateX"]?"rotateX("+properties["rotateX"]+"deg) ":"")+(properties["rotateY"]?"rotateY("+properties["rotateY"]+"deg) ":"")+(properties["rotateZ"]?"rotateZ("+properties["rotateZ"]+"deg) ":"");if(properties["rotate"]){rotate3d="rotate("+properties["rotate"]+"deg)";}
var scale3d=(properties["scaleX"]||properties["scaleX"]==0?"scaleX("+properties["scaleX"]+") ":"")+(properties["scaleY"]||properties["scaleY"]==0?"scaleY("+properties["scaleY"]+") ":"")+(properties["scaleZ"]||properties["scaleZ"]==0?"scaleZ("+properties["scaleZ"]+") ":"");var opacity=properties["opacity"]||properties["opacity"]===0?"opacity:"+properties["opacity"]+";":"";var cssTransform=translate3d+" "+rotate3d+" "+scale3d+";";this._log(cssTransform);jQueryel.attr("style","transform:"+cssTransform+" -webkit-transform:"+cssTransform+opacity+" "+style+" ");},this));if(window.requestAnimationFrame){window.requestAnimationFrame(jQuery.proxy(this._onScroll,this,false));}
else{this._requestAnimationFrame(jQuery.proxy(this._onScroll,this,false));}}};
;;;