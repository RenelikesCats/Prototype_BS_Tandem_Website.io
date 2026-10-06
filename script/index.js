document.addEventListener('DOMContentLoaded', () => {
    const navMenuBox = document.getElementById('nav-menu-box');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navOverlay = document.getElementById('nav-overlay');

    // 1. Menu visibility on scroll (ONLY visible when scrollY === 0)
    const updateMenuVisibility = () => {
        if (window.scrollY === 0) {
            navMenuBox.classList.remove('nav-hidden');
            navMenuBox.classList.add('nav-visible');
        } else {
            navMenuBox.classList.remove('nav-visible');
            navMenuBox.classList.add('nav-hidden');
        }
    };

    updateMenuVisibility();
    window.addEventListener('scroll', updateMenuVisibility, { passive: true });

    // 2. Mobile overlay toggle button
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navOverlay.classList.contains('mobile-open');

        if (isOpen) {
            navOverlay.classList.remove('mobile-open');
            if (window.scrollY > 0) {
                navMenuBox.classList.remove('nav-visible');
                navMenuBox.classList.add('nav-hidden');
            }
        } else {
            navOverlay.classList.add('mobile-open');
            navMenuBox.classList.remove('nav-hidden');
            navMenuBox.classList.add('nav-visible');
        }
    });

    // 3. Smooth scroll and close overlay on mobile link click
    navOverlay.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navOverlay.classList.remove('mobile-open');
        });
    });

    // 4. Photo Slider Logic
    const sliderTrack = document.getElementById('slider-track');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = document.querySelectorAll('.slide').length;
    let currentSlide = 0;

    const goToSlide = (slideIndex) => {
        currentSlide = slideIndex;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;

        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    };

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.dataset.slide, 10);
            goToSlide(slideIndex);
        });
    });
});