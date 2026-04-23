document.addEventListener("DOMContentLoaded", (event) => {
    const cards = document.querySelectorAll('.ul-about-content-tab');

    function checkCardPosition() {
        const viewportHeight = window.innerHeight;
        let totalWidth = 0;

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const top = rect.top;

            // When the top of the card reaches 80% of the viewport
            if (top <= viewportHeight * 0.8) {
                card.classList.add('class-80');
            } else {
                card.classList.remove('class-80'); // Remove when scrolling back up
            }

            // When the top of the card reaches 20% of the viewport
            if (top <= viewportHeight * 0.2) {
                card.classList.add('class-20');
            } else {
                card.classList.remove('class-20'); // Remove when scrolling back up
            }

            const tabNav = card.querySelector('.tab-sticky-nav');

            if (index === 0) {
                tabNav.style.marginLeft = `0px`; // First child stays at 0
            } else {
                tabNav.style.marginLeft = `${totalWidth}px`; // Previous widths + 10px gap
            }

            totalWidth += tabNav.offsetWidth + 10; // Update total width for next iteration
        });
    }

    // Run on scroll
    window.addEventListener('scroll', checkCardPosition);

    // Run on page load (in case elements are already in the viewport)
    checkCardPosition();
});