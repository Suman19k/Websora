const basePath = window.location.pathname
  .substring(
      0,
      window.location.pathname.lastIndexOf("/") + 1
  );

Promise.all([
    fetch(basePath + "header.html").then(res => {
        if (!res.ok) throw new Error("Header not found");
        return res.text();
    }),
    fetch(basePath + "footer.html").then(res => {
        if (!res.ok) throw new Error("Footer not found");
        return res.text();
    }),
    fetch(basePath + "sidebar.html").then(res => {
        if (!res.ok) throw new Error("Sidebar not found");
        return res.text();
    }),
    fetch(basePath + "search-form.html").then(res => {
        if (!res.ok) throw new Error("Search form not found");
        return res.text();
    })
])
.then(([headerHTML, footerHTML, sidebarHTML, searchHTML]) => {
    $("#header").html(headerHTML);
    $("#footer").html(footerHTML);
    $("#sidebar").html(sidebarHTML);
    $("#edit-sidebar").html(sidebarHTML);
    $("#search-form-container").html(searchHTML);

    initBannerVideo();
    initNavLink();
    initSidebar();
    initEditSidebar();
    initSidebarDropdown();
    initCounter();
    initSubmitContact();
    initSubmitNewsletter();
    initAnimateData();
})
.catch(error => console.log(error));
      
function initBannerVideo() {
    var player;

    var $tag = $('<script>', { src: "https://www.youtube.com/iframe_api" });
    $('script').first().before($tag);

    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('banner-video-background', {
            videoId: 'P68V3iH4TeE',
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'mute': 1,
                'loop': 1,
                'playlist': 'P68V3iH4TeE',
                'showinfo': 0,
                'rel': 0,
                'enablejsapi': 1,
                'disablekb': 1,
                'modestbranding': 1,
                'iv_load_policy': 3,
                'origin': window.location.origin
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerReady(event) {
        event.target.playVideo();
        setYoutubeSize();
        $(window).on('resize', setYoutubeSize);
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            player.playVideo();
        }
    }

    function setYoutubeSize() {
        var $container = $('.banner-video-container');
        var containerWidth = $container.outerWidth();
        var containerHeight = $container.outerHeight();
        var aspectRatio = 16 / 9;
        var newWidth, newHeight;

        if (containerWidth / containerHeight > aspectRatio) {
            newWidth = containerWidth;
            newHeight = containerWidth / aspectRatio;
        } else {
            newWidth = containerHeight * aspectRatio;
            newHeight = containerHeight;
        }

        if (player && player.getIframe) {
            var $iframe = $(player.getIframe());
            $iframe.width(newWidth).height(newHeight);
        }
    }

    function handleYouTubeErrors() {
        window.addEventListener('message', function(event) {
            if (event.origin !== 'https://www.youtube.com') return;
        
            try {
                var data = JSON.parse(event.data);
               
            } catch (e) {
     
            }
        });
    }
}
$(document).ready(function () {
    $('body').addClass('lightmode');
});

function initCounter() {
    var $counters = $(".counter");

    function updateCount($counter) {
        var target = +$counter.data("target");
        var count = +$counter.text().replace("+", "");
        var duration = 2000; 
        var steps = 60;
        var increment = Math.max(1, Math.ceil(target / steps));
        var delay = Math.floor(duration / (target / increment));

        if (count < target) {
            var nextCount = Math.min(target, count + increment);
            $counter.text(nextCount);
            setTimeout(function() {
                updateCount($counter);
            }, delay);
        } else {
            $counter.text(target);
        }
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var $counter = $(entry.target);
                updateCount($counter);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    $counters.each(function() {
        observer.observe(this);
    });
}

function initNavLink() {
    const currentUrl = window.location.href;
    $(".navbar-nav .nav-link").each(function() {
        if (this.href === currentUrl) {
            $(this).addClass("active");
        }
    });
    $(".navbar-nav .dropdown-menu .dropdown-item").each(function() {
        if (this.href === currentUrl) {
            $(this).closest(".dropdown").find(".nav-link.dropdown-toggle").addClass("active");
        }
    });
}

$(function(){
    const elements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add(entry.target.getAttribute('data-animate'));
                    entry.target.style.opacity = 1;
    
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, {
        threshold: 0.1
    });
    elements.forEach(el => observer.observe(el));    
});

function initSidebar() {
    const $menuBtn = $('.nav-btn');
    const $closeBtn = $('.close-btn');
    const $overlay = $('.sidebar-overlay');
    const $sidebar = $('.sidebar');
  
    $menuBtn.click(function() {
      $overlay.addClass('active');
      setTimeout(() => {
        $sidebar.addClass('active');
      }, 200);
    });
  
    $closeBtn.click(function() {
      $sidebar.removeClass('active');
      setTimeout(() => {
        $overlay.removeClass('active');
      }, 200);
    });
  
    $overlay.click(function() {
      $sidebar.removeClass('active');
      setTimeout(() => {
        $overlay.removeClass('active');
      }, 200);
    });
  }

function initEditSidebar() {
    const $contentBtn = $('.content-edit');
    const $closeBtn = $('.close-btn-second');
    const $overlay = $('.content-overlay');
    const $sidebar = $('.content-edit-sidebar');

    $contentBtn.click(function() {
        $sidebar.addClass('active');
        setTimeout(() => {
            $overlay.addClass('active');    
        }, 200);
    });

    $closeBtn.click(function() {
        $sidebar.removeClass('active');
        setTimeout(() => {
            $overlay.removeClass('active');
        }, 200);
    });
}

function initSidebarDropdown() {
    const $dropdownButtons = $(".sidebar-dropdown-btn");

    $dropdownButtons.each(function() {
        $(this).on("click", function() {
            const $dropdownMenu = $(this).parent().next(".sidebar-dropdown-menu");
            const isOpen = $dropdownMenu.hasClass("active");

            $(".sidebar-dropdown-menu").not($dropdownMenu).removeClass("active");

            $dropdownMenu.toggleClass("active", !isOpen);
        });
    });
}


function initSearchBar() {
    const $searchBtn = $(".search-btn");
    const $overlay = $(".search-overlay");
    const $closeBtn = $(".search-close");
  
    if ($overlay.length === 0) return;
  
    $searchBtn.on("click", function () {
      $overlay.addClass("active");
      setTimeout(() => {
        $overlay.addClass("active");
      }, 200);
    });
  
    $closeBtn.on("click", function () {
      $overlay.removeClass("active");
      setTimeout(() => {
        $overlay.removeClass("active");
      }, 200);
    });
  
    $overlay.on("click", function (e) {
      if ($(e.target).hasClass("search-overlay")) {
        $overlay.removeClass("active");
      }
    });
  }
  
function initAnimateData() {
    const $elements = $('[data-animate]');
    const observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $el = $(entry.target);
                const delay = $el.data('delay') || 0;
                setTimeout(() => {
                    $el.addClass($el.data('animate'));
                    $el.css('opacity', 1);
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, {
        threshold: 0.1
    });
    $elements.each(function() {
        observer.observe(this);
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".navbar-toggler");
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector(".close-btn");
    const overlay = document.querySelector(".sidebar-overlay");

    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

});

document.querySelectorAll(".sidebar-dropdown-btn")
.forEach(button => {

    button.addEventListener("click", function () {

        const dropdownMenu = this.closest(".sidebar-dropdown")
                                   .querySelector(".sidebar-dropdown-menu");

        dropdownMenu.classList.toggle("active");

        // Rotate arrow icon
        this.querySelector("i").classList.toggle("rotate");

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = parseInt(counter.getAttribute("data-target"));
        let count = 0;

        const updateCounter = () => {
            const increment = target / 100;

            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();

    });

});

const track = document.querySelector(".portfolio-track");
const cards = document.querySelectorAll(".portfolio-card");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.prepend(lastClone);

const allCards = document.querySelectorAll(".portfolio-card");

let current = 1;
let cardWidth;

function updateSlider() {

    cardWidth = allCards[0].offsetWidth + 25;

    let moveValue;

    if (window.innerWidth <= 768) {

        moveValue = current * allCards[0].offsetWidth;

    } else {

        const containerWidth =
        document.querySelector(".portfolio-slider")
        .clientWidth;

        moveValue =
        (current * cardWidth)
        - (containerWidth/2)
        + (cardWidth/2);
    }

    track.style.transform =
    `translateX(-${moveValue}px)`;


    allCards.forEach(card=>{
        card.classList.remove("active");
    });

    allCards[current].classList.add("active");
}

track.style.transition = "transform .6s ease";

nextBtn.addEventListener("click", ()=>{

    current++;
    updateSlider();

});

prevBtn.addEventListener("click", ()=>{

    current--;
    updateSlider();

});

track.addEventListener("transitionend", ()=>{

    if(current === allCards.length - 1){

        track.style.transition = "none";

        current = 1;

        updateSlider();

        track.offsetHeight;

        track.style.transition =
        "transform .6s ease";
    }

    if(current === 0){

        track.style.transition = "none";

        current = allCards.length - 2;

        updateSlider();

        track.offsetHeight;

        track.style.transition =
        "transform .6s ease";
    }

});

setInterval(()=>{

    current++;
    updateSlider();

},4000);

window.addEventListener(
'resize',
updateSlider
);

updateSlider();
