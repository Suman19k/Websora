document.addEventListener("DOMContentLoaded", (event) => {
    // gsap.registerPlugin(ScrollTrigger);

    // const cardsWrapper = document.querySelector('.ul-about-3-tabs');
    // const cards = document.querySelectorAll('.ul-about-3-tab');
    // const animation = gsap.timeline()
    // let cardHeight


    // function initCards() {
    //     animation.clear()
    //     cardHeight = cards[0].offsetHeight
    //     cardsWrapper.style.height = `${cardHeight * 1}px`
    //     console.log("initCards()", cardHeight)
    //     cards.forEach((card, index) => {
    //         if (index > 0) {
    //             //increment y value of each card by cardHeight
    //             gsap.set(card, { y: index * cardHeight })
    //             //animate each card back to 0 (for stacking)
    //             animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0)

    //         }
    //     })
    //     // Extend the pinning to avoid early overlap
    //     // ScrollTrigger.refresh();
    //     // animation.to(cards, { y: 0, duration: 1, ease: "none" }, "+=0.2");
    // }

    // initCards()

    // ScrollTrigger.create({
    //     trigger: ".ul-about-3-tabs",
    //     start: "top 120px",
    //     pin: true,
    //     end: () => `+=${(cards.length * cardHeight)}`,
    //     // end: "top -=1000",
    //     scrub: true,
    //     animation: animation,
    //     // markers: true,
    //     invalidateOnRefresh: true,
    //     // scale: 0.9,
    //     // duration: 0.5
    // })

    // ScrollTrigger.addEventListener("refreshInit", initCards)

    // ul-about-3-tab
    // const cards = document.querySelectorAll('.ul-about-3-tab');

    // function checkCardPosition() {
    //     const viewportHeight = window.innerHeight;

    //     cards.forEach(card => {
    //         const rect = card.getBoundingClientRect();
    //         const top = rect.top;

    //         // When the top of the card reaches 80% of the viewport
    //         if (top <= viewportHeight * 0.8) {
    //             card.classList.add('class-80');
    //         } else {
    //             card.classList.remove('class-80'); // Remove when scrolling back up
    //         }

    //         // When the top of the card reaches 20% of the viewport
    //         if (top <= viewportHeight * 0.2) {
    //             card.classList.add('class-20');
    //         } else {
    //             card.classList.remove('class-20'); // Remove when scrolling back up
    //         }
    //     });
    // }

    // // Run on scroll
    // window.addEventListener('scroll', checkCardPosition);

    // // Run on page load (in case elements are already in the viewport)
    // checkCardPosition();


    // const cards = document.querySelectorAll('.ul-about-3-tab');

    // function scaleCardsOnScroll() {
    //     const viewportHeight = window.innerHeight;

    //     cards.forEach((card, index) => {
    //         card.style.top = `${index * 30}px`;
    //         const rect = card.getBoundingClientRect();
    //         const top = rect.top;

    //         // Calculate scale between 1 (100%) and 0.8 (80%) based on scroll progress from 20% to 0%
    //         if (top <= viewportHeight * 0.2) {
    //             let scaleValue = Math.max(0.8, 1 - (0.2 - top / viewportHeight) * 2);
    //             card.style.transform = `scale(${scaleValue})`;
    //         } else {
    //             card.style.transform = 'scale(1)'; // Reset if above 20%
    //         }
    //     });
    // }

    // // Run on scroll
    // window.addEventListener('scroll', scaleCardsOnScroll);

    // // Run on page load
    // scaleCardsOnScroll();

    // ===============================================
    // const cards = document.querySelectorAll('.ul-about-3-tab');

    // function scaleCardsOnScroll() {
    //     const viewportHeight = window.innerHeight;

    //     cards.forEach((card, index) => {
    //         // if (index != 0) {
    //         card.style.top = `${index * 28}px`;
    //         // }
    //         const rect = card.getBoundingClientRect();
    //         const top = rect.top;

    //         // When the top of the card reaches 80% of the viewport
    //         if (top <= viewportHeight * 0.4) {
    //             card.classList.add('active');
    //         } else {
    //             card.classList.remove('active'); // Remove when scrolling back up
    //         }

    //         // Define minimum scale based on order: 1st card = 0.7, 2nd = 0.8, 3rd = 0.9
    //         const minScale = 0.7 + index * 0.1; // Adjust this pattern if needed

    //         // Ensure scale does not go below the defined minScale
    //         if (top <= viewportHeight * 0.2) {
    //             let scaleValue = Math.max(minScale, 1 - (0.2 - top / viewportHeight) * 2);
    //             // card.style.transform = `scale(${scaleValue})`;
    //         } else {
    //             // card.style.transform = 'scale(1)'; // Reset when above 20%
    //         }

    //         if (top <= viewportHeight * 0.1) {
    //             card.classList.add('reached');
    //         }
    //         else {
    //             card.classList.remove('reached');
    //         }
    //     });
    // }

    // // Run on scroll
    // window.addEventListener('scroll', scaleCardsOnScroll);

    // // Run on page load
    // scaleCardsOnScroll();

    // ===============================================

    // const cards = document.querySelectorAll('.ul-about-3-tab');

    // function scaleCardsOnScroll() {
    //     const viewportHeight = window.innerHeight;

    //     cards.forEach((card, index) => {
    //         card.style.top = `${index * 30}px`;
    //         const rect = card.getBoundingClientRect();
    //         const top = rect.top;

    //         // When the top of the card reaches 80% of the viewport
    //         if (top <= viewportHeight * 0.4) {
    //             card.classList.add('active');
    //         } else {
    //             card.classList.remove('active'); // Remove when scrolling back up
    //         }

    //         // Define minimum scale based on order: 1st card = 0.7, 2nd = 0.8, 3rd = 0.9
    //         const minScale = 0.7 + index * 0.1;

    //         // Scaling Logic - Ensures smooth transition without flickering
    //         if (top <= 200) {
    //             let progress = Math.max(0, Math.min(1, (200 - top) / 200)); // Stays within 0 to 1 range
    //             let scaleValue = 1 - (1 - minScale) * progress; // Ensures a smooth scale down
    //             card.style.transform = `scale(${scaleValue})`;
    //         } else {
    //             card.style.transform = 'scale(1)'; // Reset when card moves above 200px
    //         }

    //         // Add 'reached' class when card reaches 200px from top
    //         if (top <= 200) {
    //             card.classList.add('reached');
    //         } else {
    //             card.classList.remove('reached');
    //         }
    //     });
    // }

    // // Run on scroll
    // window.addEventListener('scroll', scaleCardsOnScroll);

    // // Run on page load
    // scaleCardsOnScroll();


    const cards = document.querySelectorAll('.ul-about-3-tab');

    function positionCards() {
        cards.forEach((card, index) => {
            card.style.top = `calc(clamp(70px,7.36vw,140px) + ${index * 28}px)`; // First card at 140px, others spaced by 28px
        });
    }

    function handleScroll() {
        const viewportHeight = window.innerHeight;
        let activeCard = null; // Store the currently active card

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const top = rect.top;
            // When the top of the card reaches 80% of the viewport
            if (top <= viewportHeight * 0.4) {
                activeCard = card;
            }
        });
        // If an active card is found, remove 'active' from all other cards
        if (activeCard) {
            cards.forEach((card) => {
                if (card === activeCard) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active'); // Remove active from all others
                }
            });
        }
    }

    // Run once to position cards initially
    positionCards();

    // Run on scroll
    window.addEventListener('scroll', handleScroll);

    // Run on page load
    handleScroll();

})