document.addEventListener("DOMContentLoaded", (event) => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
    document.body.style.position = 'static';

    if (document.querySelector(".ul-header-nav")) {
        const ulSidebar = document.querySelector(".ul-sidebar");
        const ulSidebarOpener = document.querySelector(".ul-header-sidebar-opener");
        const ulSidebarCloser = document.querySelector(".ul-sidebar-closer");
        const ulMobileMenuContent = document.querySelector(".to-go-to-sidebar-in-mobile");
        const ulHeaderNavMobileWrapper = document.querySelector(".ul-sidebar-header-nav-wrapper");
        const ulHeaderNavOgWrapper = document.querySelector(".ul-header-nav-wrapper");

        function updateMenuPosition() {
            if (window.innerWidth < 992) {
                ulHeaderNavMobileWrapper.appendChild(ulMobileMenuContent);
            }

            if (window.innerWidth >= 992) {
                ulHeaderNavOgWrapper.appendChild(ulMobileMenuContent);
            }
        }

        updateMenuPosition();

        window.addEventListener("resize", () => {
            updateMenuPosition();
        });

        ulSidebarOpener.addEventListener("click", () => {
            ulSidebar.classList.add("active");
        });

        ulSidebarCloser.addEventListener("click", () => {
            ulSidebar.classList.remove("active");
        });

        const ulHeaderNavMobile = document.querySelector(".ul-header-nav");
        const ulHeaderNavMobileItems = ulHeaderNavMobile.querySelectorAll(".has-sub-menu");
        ulHeaderNavMobileItems.forEach((item) => {
            if (window.innerWidth < 992) {
                item.addEventListener("click", () => {
                    item.classList.toggle("active");
                });
            }
        });
    }

    const ulHeaderSearchOpener = document.querySelector(".ul-header-search-opener");
    const ulHeaderSearchCloser = document.querySelector(".ul-search-closer");
    if (ulHeaderSearchOpener) {
        ulHeaderSearchOpener.addEventListener("click", () => {
            document.querySelector(".ul-search-form-wrapper").classList.add("active");
        });
    }

    if (ulHeaderSearchCloser) {
        ulHeaderSearchCloser.addEventListener("click", () => {
            document.querySelector(".ul-search-form-wrapper").classList.remove("active");
        });
    }

    const ulHeader = document.querySelector(".to-be-sticky");
    if (ulHeader) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                ulHeader.classList.add("sticky");
            } else {
                ulHeader.classList.remove("sticky");
            }
        });
    }

    new WOW({}).init();

    new Swiper(".ul-banner-slider", {
        slidesPerView: 1,
        autoplay: true,
        loop: true,
        speed: 700,
        allowTouchMove: false
    });

    if (document.querySelector(".ul-ticker-slider")) {
        new Splide('.ul-ticker-slider', {
            type: 'loop',
            perPage: 10,
            pagination: false,
            arrows: false,
            type: 'loop',
        }).mount(window.splide.Extensions);
    }

    new Swiper('.ul-services-slider', {
        slidesPerView: 3,
        spaceBetween: 27,
        autoplay: true,
        navigation: {
            prevEl: ".ul-services-slider-nav .prev",
            nextEl: ".ul-services-slider-nav .next"
        },
        breakpoints: {
            0: { slidesPerView: 1.2, spaceBetween: 15, centeredSlides: true },
            480: { slidesPerView: 1.8, spaceBetween: 15, centeredSlides: true },
            576: { slidesPerView: 2, spaceBetween: 15, },
            768: { slidesPerView: 3, spaceBetween: 15, },
            992: { slidesPerView: 3, spaceBetween: 15, },
            1200: { slidesPerView: 3, spaceBetween: 20, },
            1400: {
                slidesPerView: 3,
                spaceBetween: 27,
            }
        }
    });

    new Swiper(".ul-projects-slider", {
        slidesPerView: 3,
        loop: true,
        autoplay: true,
        watchSlidesProgress: true,
        spaceBetween: 27,
        navigation: {
            prevEl: ".ul-projects-slider-prev",
            nextEl: ".ul-projects-slider-next"
        },
        breakpoints: {
            0: { slidesPerView: 1, },
            576: { slidesPerView: 1.5, centeredSlides: true },
            768: { slidesPerView: 2, centeredSlides: false },
            992: { slidesPerView: 2.7, centeredSlides: true },
            1200: { slidesPerView: 3, centeredSlides: true },
        }
    })

    new Swiper(".ul-reviews-slider", {
        slidesPerView: 1,
        loop: true,
        autoplay: true,
        navigation: {
            prevEl: ".ul-reviews-slider-nav .prev",
            nextEl: ".ul-reviews-slider-nav .next"
        }
    });


    new Swiper(".ul-clients-slider", {
        slidesPerView: 5,
        spaceBetween: "37",
        loop: true,
        autoplay: true,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            }
        }
    });

    new Swiper(".ul-inner-testimonial-slider", {
        slidesPerView: 2,
        spaceBetween: 27,
        loop: true,
        autoplay: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            }
        }
    });

    new Swiper(".ul-project-details-img-slider", {
        slidesPerView: 1,
        loop: true,
        autoplay: true,
        navigation: {
            prevEl: ".ul-project-details-slider-nav .prev",
            nextEl: ".ul-project-details-slider-nav .next",
        }
    });

    if (document.querySelector(".ul-about-content-nav")) {
        scrollSpy('.ul-about-content-nav', {
            sectionClass: '.ul-about-content-tab',
            menuActiveTarget: 'a',
            offset: -420,
            smoothScroll: true,
            smoothScrollBehavior: function (element) {
                element.scrollIntoView({ behavior: 'smooth' }) 
            }
        });

    }

    new Swiper(".ul-clients-2-slider", {
        slidesPerView: 5,
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            }
        }
    });

    const accordionItems = document.querySelectorAll(".ul-functions-accordion-item");
    const dynamicImage = document.getElementById("ul-functions-dynamic-img");

    if (accordionItems) {
        accordionItems.forEach((item) => {
            item.addEventListener("click", function () {
                accordionItems.forEach((el) => el.classList.remove("open"));
                item.classList.add("open");
                const newImg = item.getAttribute("data-img");
                if (newImg) {
                    dynamicImage.src = newImg;
                }
            });
        });
    }

    new Swiper(".ul-how-it-works-img-slider", {
        slidesPerView: 3.75,
        spaceBetween: 17,
        loop: true,
        autoplay: true,
        breakpoints: {
            0: {
                slidesPerView: 2
            },
            480: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2.05,
            },
            992: {
                slidesPerView: 2.65,
            },
            1200: {
                slidesPerView: 3.05,
            },
            1400: {
                slidesPerView: 3.15,
            },
            1600: {
                slidesPerView: 3.75,
            }
        }
    });

    new Swiper(".ul-reviews-2-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        watchSlidesProgress: true,
        loop: true,
        navigation: {
            prevEl: ".ul-reviews-2-slider-nav .prev",
            nextEl: ".ul-reviews-2-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 130,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    })

    new Swiper(".ul-banner-3-cutomers-slider ", {
        slidesPerView: 5,
        loop: true,
        autoplay: true,
        breakpoints: {
            0: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 4
            },
            992: {
                slidesPerView: 5
            },
            1200: {
                slidesPerView: 4
            },
            1400: {
                slidesPerView: 5
            }
        }
    });
});

const phrases = [
    "Build Powerful Websites",
    "Deliver Engineering Project Solutions",
    "Protect & Scale Your Business",
    "Secure, Innovate & Elevate Your Digital Future"
];

let i = 0;
const textElement = document.getElementById("text");

function typeText() {
    textElement.innerHTML = "";
    let phrase = phrases[i];

    phrase.split("").forEach((char, index) => {
        let span = document.createElement("span");

        span.innerHTML = char === " " ? "&nbsp;" : char;

        span.style.animationDelay = index * 0.05 + "s";
        textElement.appendChild(span);
    });

    i = (i + 1) % phrases.length;
}

typeText();
setInterval(typeText, 3000);

document.addEventListener('DOMContentLoaded', function () {

    new Splide('.row1', {
        type: 'loop',
        drag: false,
        arrows: false,
        pagination: false,
        autoWidth: true,
        gap: '30px',
        autoScroll: {
            speed: 1,
        },
    }).mount(window.splide.Extensions);

    new Splide('.row2', {
        type: 'loop',
        drag: false,
        arrows: false,
        pagination: false,
        autoWidth: true,
        gap: '30px',

        direction: 'rtl',

        autoScroll: {
            speed: 1,
        },
    }).mount(window.splide.Extensions);

});


