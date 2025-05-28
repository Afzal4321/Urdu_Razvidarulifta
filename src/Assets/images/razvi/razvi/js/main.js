(function ($) {
            "use strict";

            $(function () {
                var header = $(".start-style");
                $(window).scroll(function () {
                    var scroll = $(window).scrollTop();

                    if (scroll >= 10) {
                        header.removeClass('start-style').addClass("scroll-on");
                    } else {
                        header.removeClass("scroll-on").addClass('start-style');
                    }
                });
            });

            //Animation

            $(document).ready(function () {
                $('body.hero-anime').removeClass('hero-anime');
            });

            //Menu On Hover

            $('body').on('mouseenter mouseleave', '.nav-item', function (e) {
                if ($(window).width() > 750) {
                    var _d = $(e.target).closest('.nav-item'); _d.addClass('show');
                    setTimeout(function () {
                        _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
                    }, 1);
                }
            });

            //Switch light/dark

            $("#switch").on('click', function () {
                if ($("body").hasClass("dark")) {
                    $("body").removeClass("dark");
                    $("#switch").removeClass("switched");
                }
                else {
                    $("body").addClass("dark");
                    $("#switch").addClass("switched");
                }
            });

        })(jQuery);

        jQuery(document).ready(function ($) {
        var owl2 = $("#owl-demo-2");
        owl2.owlCarousel({
            autoplay: true,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 3,
            loop: true,
            margin: 10,
            nav: true, // Enable arrows
            navText: ["<div class='prev-arrow'><i class='fa fa-angle-left'></i></div>", "<div class='next-arrow'><i class='fa fa-angle-right'></i></div>"], // Custom arrow text/icons
            dots: true, // Enable dots
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 4,
                },
            },
        });

        var owl3 = $("#owl-demo-3");
        owl3.owlCarousel({
            autoplay: true,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 3,
            loop: true,
            margin: 10,
            nav: true, // Enable arrows
            navText: ["<div class='prev-arrow'><i class='fa fa-angle-left'></i></div>", "<div class='next-arrow'><i class='fa fa-angle-right'></i></div>"], // Custom arrow text/icons
            dots: true, // Enable dots
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 4,
                },
            },
        });

        jQuery("#hero-slider").owlCarousel({
            autoplay: true,
            rewind: false, /* use rewind if you don't want loop */
            margin: 0,
            loop: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsiveClass: true,
            autoHeight: true,
            //autoplayTimeout: 7000,
            smartSpeed: 800,
            nav: false,
            dots: true,
            
            responsive: {
                0: {
                items: 1
                },

                600: {
                items: 1
                },

                1024: {
                items: 1
                },

                1366: {
                items: 1
                }
            }
            });

    });

    
