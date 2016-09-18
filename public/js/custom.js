(function($) {
    "use strict";
    $(document).ready(function() {
        var $portfolio_container_isotope = $('.portfolio_container_isotope');
        var height_youtube = $(window).height(),
                item_portfolio,
                owl,
                finish_date = '2014/05/01 12:00:00',
                counter_time = {
                    seconds: 0,
                    minutes: 0,
                    hours: 0,
                    days: 0
                };
        //-----------------------------------------
        // Full Screen Background Init
        //-----------------------------------------
        $(".window-fullscreen").each(function(key, data) {
            window_fullscreen($(data));
        });

        $(".background-full").each(function(key, data) {
            background_full($(data));
        });

        $(".background-normal").each(function(key, data) {
            background_normal($(data));
        });

        $(window).bind("resize", function() {
            $(".background-full").each(function(key, data) {
                background_full($(data));
            });
            $(".background-normal").each(function(key, data) {
                background_normal($(data));
            });

            $(".window-fullscreen").each(function(key, data) {
                window_fullscreen($(data));
            });

            $(".control-youtube").css({overflow: 'hidden', width: $(".wrapper").width(), 'min-height': $(window).height() - 45});
            $(".DivParent-background-full").each(function(key, data) {
                $(data).css({
                    'min-height': $(window).height() - 45,
                    'height': $(data).find(".DivWhichNeedToBeVerticallyAligned").height()
                });
            });

        });

        function window_fullscreen($element) {
            $($element).css({
                'min-height': $(window).height() - 40
            });
        }

        function background_full($element) {
            $($element).css({
                'background-image': 'url(' + $($element).data("background") + ')',
                'background-size': 'cover',
                'background-position': 'center',
                'min-height': $(window).height() - 40
            });
            $(".DivParent-background-full").css({
                'min-height': $(window).height() - 40
            });
            $(".DivParent-background-full").each(function(key, data) {
                $(data).css({
                    'min-height': $(window).height() - 40,
                    'height': $(data).find(".DivWhichNeedToBeVerticallyAligned").height()
                });
            });
        }

        function background_normal($element) {
            $($element).css({
                'background-image': 'url(' + $($element).data("background") + ')',
                'background-position': 'center',
                'background-size': 'cover'
            });
        }

        //-----------------------------------------
        // Owl Slider
        //-----------------------------------------
        $(".owlCarousel").owlCarousel({
            navigation: false, // Show next and prev buttons
            slideSpeed: 900,
            paginationSpeed: 1200,
            singleItem: true
        });

        owl = $(".owl-carousel-multi-image").owlCarousel({
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 1],
            itemsMobile: [479, 1],
            navigation: false,
            pagination: false,
            afterAction: function(el) {
                "use strict";
                //if(this.$owlItems.length )
                $(window).bind('resize', function() {
                    if ($(window).width() > 768) {
                        this.$owlItems.removeClass('active');
                        this.$owlItems.eq(this.currentItem + 1).addClass('active');
                        var active = $('.active');
                        this.$owlItems.removeClass('two');
                        active.next().next().addClass('two');
                        active.prev().prev().addClass('two');
                    } else {
                        if (this.currentItem === 0) {
                            $('.owl-carousel-multi-image').trigger("owl.goTo", 1);
                        }
                        this.$owlItems.removeClass('active');
                        this.$owlItems.eq(this.currentItem).addClass('active');
                    }
                });
                if ($(window).width() > 768) {
                    this.$owlItems.removeClass('active');
                    this.$owlItems.eq(this.currentItem + 1).addClass('active');
                    var active = $('.active');
                    this.$owlItems.removeClass('two');
                    active.next().next().addClass('two');
                    active.prev().prev().addClass('two');
                } else {
                    if (this.currentItem === 0) {
                        $('.owl-carousel-multi-image').trigger("owl.goTo", 1);
                    }
                    this.$owlItems.removeClass('active');
                    this.$owlItems.eq(this.currentItem).addClass('active');
                }
            },
            afterMove: function(el) {
                $(window).bind('resize', function() {
                    if ($(window).width() < 768) {
                        if (this.currentItem === this.$owlItems.length - 1) {
                            $('.owl-carousel-multi-image').trigger("owl.goTo", this.$owlItems.length - 2);
                        }
                    }
                });
                if ($(window).width < 768) {
                    if (this.currentItem === this.$owlItems.length - 1) {
                        $('.owl-carousel-multi-image').trigger("owl.goTo", this.$owlItems.length - 2);
                    }
                }
            }
        });

        //--------------------------------------------
        // Isotope
        //--------------------------------------------

        if (typeof ($.fn.isotope) !== "undefined") {

            $portfolio_container_isotope.isotope({
                itemSelector: '.item-isotope'
            });

            // INIT
            setTimeout(function() {
                setportfolio();
            }, 500);

            //-----------------------------------------
            // isotope filters
            //-----------------------------------------
            setTimeout(function() {
                $(".dropbox-cd-dropdown").change(function() {
                    alert("Test");
                });
                $(document).delegate(".dropbox-cd-dropdown", "change", function() {
                    alert("Test");
                });
            }, 3000);

            //alert($(".cd-dropdown.cd-active input").attr("name"));

            $('.navigation-isotope a').click(function() {
                var selector = $(this).attr('data-filter');
                $portfolio_container_isotope.isotope({filter: selector});

                $('.navigation-isotope a').removeClass("active");
                $(this).addClass("active");
                return false;
            });

        }

        function splitColumns() {
            var winWidth = $(".portfolio_container_isotope").width(), columnNumb = 1, window_page = $(".portfolio_container_isotope").width();

            if (window_page > 1920) {
                columnNumb = 5;
            } else if (window_page > 1600) {
                columnNumb = 4;
            } else if (window_page > 1130) {
                columnNumb = 3;
            } else if (window_page > 992) {
                columnNumb = 3;
            } else if (window_page > 667) {
                columnNumb = 2;
            } else if (window_page > 481) {
                columnNumb = 2;
            } else if (window_page < 481) {
                columnNumb = 1;
            }
            return columnNumb;
        }

        function setColumns() {
            var winWidth = $(".portfolio_container_isotope").width(), columnNumb = splitColumns(), postWidth = Math.floor(winWidth / columnNumb);
            $portfolio_container_isotope.find('.item-isotope').each(function() {

                if (!$($portfolio_container_isotope).hasClass("full")) {
                    $(this).css({
                        width: (postWidth - 25) + 'px',
                        margin: '10px 10px'
                    });
                } else {
                    $(this).css({
                        width: (postWidth) + 'px'
                    });
                }
            });

        }

        function setportfolio() {
            setColumns();
            $portfolio_container_isotope.isotope('reLayout');

        }

        $(window).bind('resize', function() {
            setportfolio();

            $(".parallax").each(function(key, data) {
                $(this).css({
                    'background-attachment': 'fixed',
                    'background-size': 'cover',
                    'position': $(this).data("position"),
                    'background-image': 'url(' + $(this).data("image") + ')',
                    'width': '100%',
                    'height': '100%'
                });
                $(this).parallax("50%", "0.2");
            });
        });


        //-----------------------------------------
        // Parallax
        //-----------------------------------------
        $(".parallax").each(function(key, data) {
            $(this).css({
                'background-attachment': 'fixed',
                'background-size': 'cover',
                'position': $(this).data("position"),
                'background-image': 'url(' + $(this).data("image") + ')',
                'width': '100%',
                'height': '100%'
            });
            $(this).parallax("50%", "0.2");
        });

        //------------------------------------------
        // Portfolio Dialog
        //------------------------------------------
        $(document).delegate(".widget-open", "click", function() {
            if (!$(".navigation-mobile").hasClass("hidden-item")) {
                $(".menu-open").removeClass("bg-black");
                $(".menu-open").removeClass("text-white");
                $(".navigation-mobile").addClass("hidden-item");
            }

            if ($(".widget-sidebar").hasClass("hidden-item")) {
                $(".widget-sidebar").removeClass("hidden-item");
                $(this).addClass("bg-black");
                $(this).addClass("text-white");

                $(".nicescroll-rails").show();
            } else {
                $(this).removeClass("bg-black");
                $(this).removeClass("text-white");
                $(".widget-sidebar").addClass("hidden-item");
                $(".nicescroll-rails").hide();

            }
            return false;
        });

        $(".widget-sidebar").niceScroll({
            cursorcolor: "#424242",
            cursorborderradius: 0,
            scrollspeed: 80,
            mousescrollstep: 60,
            cursorborder: "0px solid #fff",
            zindex: 99,
            cursoropacitymax: 0.6,
            cursorwidth: 8
        });
        $(".nicescroll-rails").hide();


        $(document).delegate(".menu-open", "click", function() {
            if (!$(".widget-sidebar").hasClass("hidden-item")) {
                $(".widget-open").removeClass("bg-black");
                $(".widget-open").removeClass("text-white");
                $(".widget-sidebar").addClass("hidden-item");
            }
            if ($(".navigation-mobile").hasClass("hidden-item")) {
                $(".navigation-mobile").removeClass("hidden-item");
                $(this).addClass("bg-black");
                $(this).addClass("text-white");

                $(".nicescroll-rails").show();
            } else {
                $(this).removeClass("bg-black");
                $(this).removeClass("text-white");
                $(".navigation-mobile").addClass("hidden-item");
                $(".nicescroll-rails").hide();

            }
            return false;
        });

        $(".navigation-mobile").niceScroll({
            cursorcolor: "#424242",
            cursorborderradius: 0,
            scrollspeed: 80,
            mousescrollstep: 60,
            cursorborder: "0px solid #fff",
            zindex: 99,
            cursoropacitymax: 0.6,
            cursorwidth: 8
        });
        $(".nicescroll-rails").hide();


        $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemMargin: 0,
            itemWidth: 25,
            directionNav: false,
            asNavFor: '#slider',
            minItems: 2,
            maxItems: 4,
            move: 4,
            touch: true,
            mousewheel: true,
            start: function(slider) {
                slider.flexslider("next");
            },
        });

        $('#slider').flexslider({
            animation: "fade",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            directionNav: false,
            sync: "#carousel",
            after: function(slider) {
                //slider.flexslider("next");
            },
        });

        $('.sliders-flexslide').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            directionNav: false,
            sync: "#carousel",
            after: function(slider) {
                //slider.flexslider("next");
            },
        });

        //-----------------------------------------
        // google map
        //-----------------------------------------
        if ($("#map").length > 0) {

            if (typeof (document.getElementById('map')) !== "null" && typeof google !== "undefined") {

                google.maps.event.addDomListener(window, 'load', init);

            }
        }

        function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 11,
                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(40.6700, -73.9400), // New York

                // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{featureType: "landscape", stylers: [{saturation: -100}, {lightness: 65}, {visibility: "on"}]}, {featureType: "poi", stylers: [{saturation: -100}, {lightness: 51}, {visibility: "simplified"}]}, {featureType: "road.highway", stylers: [{saturation: -100}, {visibility: "simplified"}]}, {featureType: "road.arterial", stylers: [{saturation: -100}, {lightness: 30}, {visibility: "on"}]}, {featureType: "road.local", stylers: [{saturation: -100}, {lightness: 40}, {visibility: "on"}]}, {featureType: "transit", stylers: [{saturation: -100}, {visibility: "simplified"}]}, {featureType: "administrative.province", stylers: [{visibility: "off"}]/**/}, {featureType: "administrative.locality", stylers: [{visibility: "off"}]}, {featureType: "administrative.neighborhood", stylers: [{visibility: "on"}]/**/}, {featureType: "water", elementType: "labels", stylers: [{visibility: "on"}, {lightness: -25}, {saturation: -100}]}, {featureType: "water", elementType: "geometry", stylers: [{hue: "#ffff00"}, {lightness: -25}, {saturation: -97}]}]
            };

            // Get the HTML DOM element that will contain your map 
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');

            // Create the Google Map using out element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);
        }

        function toggleVideo(state) {
            // if state == 'hide', hide. Else: show video
            var func;
            var div = document.getElementById("youtube_video");
            var iframe = div.getElementsByTagName("iframe")[0].contentWindow;

            //div.style.display = state == 'hide' ? 'none' : '';
            func = state === 'hide' ? 'pauseVideo' : 'playVideo';
            console.log(func);
            iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');

        }
        //toggleVideo('hide');
        $('div.modal.modal-video-play').on('show.bs.modal', function(e) {
            toggleVideo();
        });

        $('div.modal.modal-video-play').on('hide.bs.modal', function(e) {
            toggleVideo("hide");
            window.parent.postMessage('Hello Parent Frame!', '*');
        });

        //window.addEventListener('message', receiveMessage, false);
        //function receiveMessage(event) {
        //    console.log(event);
        //}

        //-----------------------------------------
        // Long Page
        //-----------------------------------------

        $('.navigation-scroll').onePageNav({
            changeHash: false,
            scrollSpeed: 750,
            scrollOffset: $(".nav-top").height()
        });

        [].slice.call(document.querySelectorAll('.dotstyle > ul')).forEach(function(nav) {
            new DotNav(nav, {
                callback: function(idx) {
                    //console.log( idx )
                }
            });
        });

        //-----------------------------------------
        // Youtube
        //-----------------------------------------
        setTimeout(function() {
            if (typeof (YT) !== "undefined") {
                if ($(document).find(".playerYoutube-bg").hasClass("playerYoutube-bg")) {
                    $(document).find(".playerYoutube-bg").each(function(key, data) {
                        new YT.Player($(data).attr("id"), {
                            height: height_youtube,
                            width: '100%',
                            videoId: $(data).attr("data-video_id"),
                            playerVars: {'autoplay': 0, 'controls': 0, 'showinfo': 0, 'loop': 1, 'playlist': 'mavX9Ra9Dxk', 'wmode': 'transparent'},
                            events: {
                                'onReady': function(event) {
                                    event.target.playVideo();
                                    event.target.mute();
                                    event.target.setLoop(true);
                                    if (typeof ($(data).attr("data-video_quality")) !== "undefined") {
                                        event.target.setPlaybackQuality($(data).attr("data-video_quality"));
                                    } else {
                                        /*
                                         Quality level small: Player height is 240px, and player dimensions are at least 320px by 240px for 4:3 aspect ratio.
                                         Quality level medium: Player height is 360px, and player dimensions are 640px by 360px (for 16:9 aspect ratio) or 480px by 360px (for 4:3 aspect ratio).
                                         Quality level large: Player height is 480px, and player dimensions are 853px by 480px (for 16:9 aspect ratio) or 640px by 480px (for 4:3 aspect ratio).
                                         Quality level hd720: Player height is 720px, and player dimensions are 1280px by 720px (for 16:9 aspect ratio) or 960px by 720px (for 4:3 aspect ratio).
                                         Quality level hd1080: Player height is 1080px, and player dimensions are 1920px by 1080px (for 16:9 aspect ratio) or 1440px by 1080px (for 4:3 aspect ratio).
                                         Quality level highres: Player height is greater than 1080px, which means that the player's aspect ratio is greater than 1920px by 1080px.
                                         Quality level default: YouTube selects the appropriate playback quality.This setting effectively reverts the quality level to the default state and nullifies any previous efforts to set playback quality using the cueVideoById, loadVideoById or setPlaybackQuality functions.
                                         */
                                        event.target.setPlaybackQuality('default');
                                    }
                                    var win = {};
                                    win.width = $(window).width();
                                    win.height = $(window).height();

                                    var margin = 24;
                                    var vid = {};
                                    vid.width = win.width + ((win.width * margin) / 100);
                                    vid.height = Math.ceil((9 * win.width) / 16);
                                    vid.marginTop = -((vid.height - win.height) / 2);
                                    vid.marginLeft = -((win.width * (margin / 2)) / 100);

                                    if (vid.height < win.height) {
                                        vid.height = win.height + ((win.height * margin) / 100);
                                        vid.width = Math.floor((16 * win.height) / 9);
                                        vid.marginTop = -((win.height * (margin / 2)) / 100);
                                        vid.marginLeft = -((vid.width - win.width) / 2);
                                    }


                                    $("#" + $(data).attr("id")).css({width: vid.width, height: vid.height, marginTop: vid.marginTop, marginLeft: vid.marginLeft});

                                    $(window).bind('resize', function() {
                                        var win = {};
                                        win.width = $(window).width();
                                        win.height = $(window).height();

                                        var margin = 24;
                                        var vid = {};
                                        vid.width = win.width + ((win.width * margin) / 100);
                                        vid.height = Math.ceil((9 * win.width) / 16);
                                        vid.marginTop = -((vid.height - win.height) / 2);
                                        vid.marginLeft = -((win.width * (margin / 2)) / 100);

                                        if (vid.height < win.height) {
                                            vid.height = win.height + ((win.height * margin) / 100);
                                            vid.width = Math.floor((16 * win.height) / 9);
                                            vid.marginTop = -((win.height * (margin / 2)) / 100);
                                            vid.marginLeft = -((vid.width - win.width) / 2);
                                        }
                                        $("#" + $(data).attr("id")).css({width: vid.width, height: vid.height, marginTop: vid.marginTop, marginLeft: vid.marginLeft});

                                        //$("#" + $(data).attr("id")).css({width: vid.width, height: vid.height, marginTop: vid.marginTop, marginLeft: vid.marginLeft});
                                    });
                                    $(".control-youtube").css({overflow: 'hidden', width: $(".wrapper").width(), 'min-height': $(window).height() - 60});
                                }
                            }
                        });
                    });
                }

            }
        }, 1000);

        //-----------------------------------------
        // Counter Time
        //-----------------------------------------


        $('.counter-time').countdown(finish_date, function(event) {
            if (counter_time.days != event.offset.totalDays) {
                counter_time.days = event.offset.totalDays;
                var el_number = $(this).find('.days');
                var label_prev = $(el_number).find('.prev').addClass('next').removeClass('prev'),
                        label_current = $(el_number).find('.current').addClass('prev').removeClass('current'),
                        label_next = $(el_number).find('.next').html(event.strftime('%D')).addClass('current').removeClass('next');
            }
            if (counter_time.hours != event.offset.hours) {
                counter_time.hours = event.offset.hours;
                var el_number = $(this).find('.hours');
                var label_prev = $(el_number).find('.prev').addClass('next').removeClass('prev'),
                        label_current = $(el_number).find('.current').addClass('prev').removeClass('current'),
                        label_next = $(el_number).find('.next').html(event.strftime('%H')).addClass('current').removeClass('next');
            }
            if (counter_time.minutes != event.offset.minutes) {
                counter_time.minutes = event.offset.minutes;
                var el_number = $(this).find('.minutes');
                var label_prev = $(el_number).find('.prev').addClass('next').removeClass('prev'),
                        label_current = $(el_number).find('.current').addClass('prev').removeClass('current'),
                        label_next = $(el_number).find('.next').html(event.strftime('%M')).addClass('current').removeClass('next');
            }
            if (counter_time.seconds != event.offset.seconds) {
                counter_time.seconds = event.offset.seconds;
                var el_number = $(this).find('.seconds');
                var label_prev = $(el_number).find('.prev').addClass('next').removeClass('prev'),
                        label_current = $(el_number).find('.current').addClass('prev').removeClass('current'),
                        label_next = $(el_number).find('.next').html(event.strftime('%S')).addClass('current').removeClass('next');
            }

        });

        //-----------------------------------------
        // PreLoader
        //-----------------------------------------

        $('body').jpreLoader({}, function() {
            setportfolio();
            
            if ($(".DivParent-background-full").length > 0) {
                $(".DivParent-background-full").each(function(key, data) {
                    $(data).css({
                        'min-height': $(window).height() - 75,
                        'height': $(data).find(".DivWhichNeedToBeVerticallyAligned").height()
                    });
                });
            }
            if ($('#cd-dropdown').length > 0) {
                item_portfolio = $('#cd-dropdown').dropdown({
                    gutter: 0,
                    stack: false
                });
            }
            if (typeof (item_portfolio) !== "undefined") {
                item_portfolio.opts.on('click.dropdown', function() {
                    var opt = $(this);
                    $portfolio_container_isotope.isotope({filter: opt.data('value')});
                });
            }

        });

        //-----------------------------------------
        // Vaild Form
        //-----------------------------------------

        $("#newsletter-form").submit(function(event) {
            event.preventDefault();
            var check = true;
            if ($(this).find('#newsletter_email').val() === "") {
                $(this).find('#newsletter_email').addClass("error");
                $(this).find('#newsletter_email').attr("placeholder", "E-mail is Empty");
                $(this).find('#newsletter_email').focus();
                check = false;
            } else {
                if (isValidEmailAddress($(this).find('#newsletter_email').val()) === false) {
                    $(this).find('#newsletter_email').val("");
                    $(this).find("#newsletter_email").addClass("error");
                    $(this).find("#newsletter_email").attr("placeholder", "E-mail is Incorrect");
                    $(this).find('#newsletter_email').focus();
                    check = false;
                } else {
                    $(this).find("#newsletter_email").removeClass("error");
                }
            }
            if (check === true) {
                $('.success-newsletter').modal('show');
            }
            return false;
        });

        $(document).delegate(".submit-login", "click", function() {
            var login = $(".form-login");
            var check = true;
            if ($(login).find(".name").val() === "") {
                $(login).find(".name").addClass("error");
                $(login).find(".name").attr("placeholder", "Name is Empty");
                $(login).find(".name").focus();
                check = false;
            } else {
                $(login).find(".name").removeClass("error");
            }

            if ($(login).find('.email').val() === "") {
                $(login).find(".email").addClass("error");
                $(login).find(".email").attr("placeholder", "E-mail is Empty");
                $(login).find('.email').focus();
                check = false;
            } else {
                if (isValidEmailAddress($(login).find('.email').val()) === false) {
                    $(login).find('.email').val("");
                    $(login).find(".email").addClass("error");
                    $(login).find(".email").attr("placeholder", "E-mail is Incorrect");
                    $(login).find('.email').focus();
                    check = false;
                } else {
                    $(login).find(".email").removeClass("error");
                }
            }

            if ($(login).find('.description').val().length < 8) {
                $(login).find(".description").val("");
                $(login).find(".description").addClass("error");
                $(login).find(".description").attr("placeholder", "Description Should Message Than 8 Character.");
                $(login).find(".description").focus();
                check = false;
            } else {
                $(login).find(".description").removeClass("error");
            }

            if (check === true) {
                $('.success-login').modal('show');
            }
            return false;
        });

    });
})(this.jQuery);

function isValidEmailAddress(emailAddress) {
    "use strict";
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}