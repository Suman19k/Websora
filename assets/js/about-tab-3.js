document.addEventListener("DOMContentLoaded", (event) => {

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