// (function ($) {
//     "use strict";

//     // Spinner
//     var spinner = function () {
//         setTimeout(function () {
//             if ($('#spinner').length > 0) {
//                 $('#spinner').removeClass('show');
//             }
//         }, 1);
//     };
//     spinner();
    
    
//     // Initiate the wowjs
//     new WOW().init();


//     // Sticky Navbar
//     $(window).scroll(function () {
//         if ($(this).scrollTop() > 45) {
//             $('.navbar').addClass('sticky-top shadow-sm');
//         } else {
//             $('.navbar').removeClass('sticky-top shadow-sm');
//         }
//     });
    
    
//     // Back to top button
//     $(window).scroll(function () {
//         if ($(this).scrollTop() > 100) {
//             $('.back-to-top').fadeIn('slow');
//         } else {
//             $('.back-to-top').fadeOut('slow');
//         }
//     });
//     $('.back-to-top').click(function () {
//         $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
//         return false;
//     });


//     // Skills
//     $('.skill').waypoint(function () {
//         $('.progress .progress-bar').each(function () {
//             $(this).css("width", $(this).attr("aria-valuenow") + '%');
//         });
//     }, {offset: '80%'});


//     // Facts counter
//     $('[data-toggle="counter-up"]').counterUp({
//         delay: 10,
//         time: 2000
//     });


//     // Testimonials carousel
//     $(".testimonial-carousel").owlCarousel({
//         autoplay: true,
//         smartSpeed: 1000,
//         margin: 25,
//         dots: false,
//         loop: true,
//         nav : true,
//         navText : [
//             '<i class="bi bi-chevron-left"></i>',
//             '<i class="bi bi-chevron-right"></i>'
//         ],
//         responsive: {
//             0:{
//                 items:1
//             },
//             992:{
//                 items:2
//             }
//         }
//     });


//     // Portfolio isotope and filter
//     var portfolioIsotope = $('.portfolio-container').isotope({
//         itemSelector: '.portfolio-item',
//         layoutMode: 'fitRows'
//     });
//     $('#portfolio-flters li').on('click', function () {
//         $("#portfolio-flters li").removeClass('active');
//         $(this).addClass('active');

//         portfolioIsotope.isotope({filter: $(this).data('filter')});
//     });
    
// })(jQuery);



"use strict";

// Spinner
var spinner = function () {
    setTimeout(function () {
        var spinnerElement = document.getElementById('spinner');
        if (spinnerElement) {
            spinnerElement.classList.remove('show');
        }
    }, 1);
};
spinner();

// Initiate the wowjs
new WOW().init();

const mainHeading = document.getElementById("main-heading");

// Sticky Navbar
window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 45) {
        navbar.classList.add('sticky-top', 'shadow-sm');
        mainHeading.classList.add("text-primary")
    } else {
        navbar.classList.remove('sticky-top', 'shadow-sm');
        mainHeading.classList.remove("text-primary")
    }
});

// Back to top button
window.addEventListener('scroll', function () {
    var backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});
document.querySelector('.back-to-top').addEventListener('click', function () {
    // var easeInOutExpo = function (t, b, c, d) {
    //     t /= d / 2;
    //     if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    //     t--;
    //     return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
    // };
    // var scrollToTop = function () {
    //     var scrollTop = window.scrollY;
    //     if (scrollTop > 0) {
    //         window.scrollBy(0, -Math.min(scrollTop, 50));
    //         requestAnimationFrame(scrollToTop);
    //     }
    // };
    scrollToTop();
});

// Skills
function updateProgress() {
    var skillElements = document.querySelectorAll('.skill');
    skillElements.forEach(function (skillElement) {
        var progressBar = skillElement.querySelector('.progress-bar');
        progressBar.style.width = progressBar.getAttribute('aria-valuenow') + '%';
    });
}
window.addEventListener('scroll', function () {
    var skillSection = document.querySelector('.skill');
    if (isElementInViewport(skillSection)) {
        updateProgress();
    }
});
function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 80);
}

// Facts counter
function counterUp() {
    var counterElements = document.querySelectorAll('[data-toggle="counter-up"]');
    counterElements.forEach(function (counterElement) {
        var delay = parseInt(counterElement.getAttribute('data-delay')) || 10;
        var time = parseInt(counterElement.getAttribute('data-time')) || 2000;
        var targetValue = parseInt(counterElement.innerText);
        var currentValue = 0;
        var increment = targetValue / (time / delay);
        var updateCounter = function () {
            currentValue += increment;
            counterElement.innerText = Math.ceil(currentValue);
            if (currentValue < targetValue) {
                requestAnimationFrame(updateCounter);
            }
        };
        updateCounter();
    });
}
counterUp();

// Testimonials carousel
function createCarousel() {
    var testimonialCarousel = new Carousel({
        element: document.querySelector('.testimonial-carousel'),
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });
    return testimonialCarousel;
}
function Carousel(options) {
    // Implement your carousel logic here
    // This is just a placeholder for demonstration purposes
    return {
        start: function () { },
        stop: function () { }
    };
}
createCarousel();

// Portfolio isotope and filter
function filterPortfolioItems(filter) {
    var portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(function (item) {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
var portfolioFilters = document.querySelectorAll('#portfolio-flters li');
portfolioFilters.forEach(function (filter) {
    filter.addEventListener('click', function () {
        portfolioFilters.forEach(function (item) {
            item.classList.remove('active');
        });
        filter.classList.add('active');
        filterPortfolioItems(filter.getAttribute('data-filter'));
    });
});
