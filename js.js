document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER
    ========================= */

    const header = document.querySelector(".header");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }

    });


    /* =========================
       MOBILE MENU
    ========================= */

    function openMobileMenu() {

        mobileMenu.classList.add("is-active");

        if (mobileNav) {
            mobileNav.classList.add("is-active");
        }

        if (mobileNavOverlay) {
            mobileNavOverlay.classList.add("is-active");
        }

        document.body.classList.add("mobile-nav-open");

    }

    function closeMobileMenu() {

        mobileMenu.classList.remove("is-active");

        if (mobileNav) {
            mobileNav.classList.remove("is-active");
        }

        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove("is-active");
        }

        document.body.classList.remove("mobile-nav-open");

    }

    if (mobileMenu) {

        mobileMenu.addEventListener("click", () => {

            if (mobileMenu.classList.contains("is-active")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });

    }

    if (mobileNavOverlay) {

        mobileNavOverlay.addEventListener("click", closeMobileMenu);

    }

    if (mobileNav) {

        mobileNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", closeMobileMenu);

        });

    }

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && mobileMenu &&
            mobileMenu.classList.contains("is-active")) {
            closeMobileMenu();
        }

    });


    /* =========================
       MAIN VISUAL SLIDER
    ========================= */

    const slides = document.querySelectorAll(".visual-slide");
    const indicators = document.querySelectorAll(".indicator");

    const prevButton = document.querySelector(".visual-prev");
    const nextButton = document.querySelector(".visual-next");

    const progress = document.querySelector(".visual-progress span");

    let currentSlide = 0;
    let slideTimer;

    const slideDuration = 5000;


    function showSlide(index) {

        if (!slides.length) {
            return;
        }

        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        indicators.forEach((indicator) => {
            indicator.classList.remove("active");
        });

        currentSlide = index;

        slides[currentSlide].classList.add("active");

        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add("active");
        }

        resetProgress();

    }


    function nextSlide() {

        let next = currentSlide + 1;

        if (next >= slides.length) {
            next = 0;
        }

        showSlide(next);

    }


    function prevSlide() {

        let previous = currentSlide - 1;

        if (previous < 0) {
            previous = slides.length - 1;
        }

        showSlide(previous);

    }


    function startAutoSlide() {

        clearInterval(slideTimer);

        slideTimer = setInterval(() => {
            nextSlide();
        }, slideDuration);

    }


    function resetProgress() {

        if (!progress) {
            return;
        }

        progress.style.animation = "none";

        progress.offsetHeight;

        progress.style.animation =
            `progressBar ${slideDuration}ms linear`;

    }


    if (nextButton) {

        nextButton.addEventListener("click", () => {

            nextSlide();
            startAutoSlide();

        });

    }


    if (prevButton) {

        prevButton.addEventListener("click", () => {

            prevSlide();
            startAutoSlide();

        });

    }


    indicators.forEach((indicator, index) => {

        indicator.addEventListener("click", () => {

            showSlide(index);
            startAutoSlide();

        });

    });


    if (slides.length) {

        showSlide(0);
        startAutoSlide();

    }


    /* =========================
       SITE SEARCH
    ========================= */

    const searchForm = document.querySelector("#siteSearch");
    const searchInput = document.querySelector("#searchInput");
    const searchResult = document.querySelector("#searchResult");


    if (searchForm) {

        searchForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const keyword = searchInput.value.trim();

            if (!keyword) {

                searchResult.textContent =
                    "검색어를 입력해주세요.";

                searchInput.focus();

                return;
            }

            searchResult.textContent =
                `"${keyword}"에 대한 검색 결과를 준비하고 있습니다.`;

        });

    }


    /* =========================
       PRODUCT SLIDER
    ========================= */

    const productSlides =
        document.querySelectorAll(".product-slide");

    const productIndicators =
        document.querySelectorAll(".product-indicator");

    const productPrev =
        document.querySelector(".product-prev");

    const productNext =
        document.querySelector(".product-next");


    let currentProduct = 0;


    function showProduct(index) {

        if (!productSlides.length) {
            return;
        }

        productSlides.forEach((slide) => {
            slide.classList.remove("active");
        });

        productIndicators.forEach((indicator) => {
            indicator.classList.remove("active");
        });

        currentProduct = index;

        productSlides[currentProduct].classList.add("active");

        if (productIndicators[currentProduct]) {
            productIndicators[currentProduct].classList.add("active");
        }

    }


    function nextProduct() {

        let next = currentProduct + 1;

        if (next >= productSlides.length) {
            next = 0;
        }

        showProduct(next);

    }


    function prevProduct() {

        let previous = currentProduct - 1;

        if (previous < 0) {
            previous = productSlides.length - 1;
        }

        showProduct(previous);

    }


    if (productNext) {

        productNext.addEventListener("click", () => {
            nextProduct();
        });

    }


    if (productPrev) {

        productPrev.addEventListener("click", () => {
            prevProduct();
        });

    }


    productIndicators.forEach((indicator, index) => {

        indicator.addEventListener("click", () => {
            showProduct(index);
        });

    });


    if (productSlides.length) {
        showProduct(0);
    }


    /* =========================
       POPUP MODAL
    ========================= */

    const popupOverlay = document.querySelector("#popupOverlay");
    const popupClose = document.querySelector("#popupClose");
    const popupHideToday = document.querySelector("#popupHideToday");

    if (popupOverlay) {

        const storageKey = "archonPopupHiddenUntil";
        const today = new Date().toDateString();

        let hiddenUntil = null;

        try {
            hiddenUntil = localStorage.getItem(storageKey);
        } catch (error) {
            hiddenUntil = null;
        }

        function openPopup() {
            popupOverlay.classList.add("is-active");
        }

        function closePopup() {

            popupOverlay.classList.remove("is-active");

            if (popupHideToday && popupHideToday.checked) {

                try {
                    localStorage.setItem(storageKey, today);
                } catch (error) {
                    /* localStorage unavailable, ignore */
                }

            }

        }

        if (hiddenUntil !== today) {

            window.setTimeout(() => {
                openPopup();
            }, 400);

        }

        if (popupClose) {

            popupClose.addEventListener("click", closePopup);

        }

        popupOverlay.addEventListener("click", (event) => {

            if (event.target === popupOverlay) {
                closePopup();
            }

        });

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape" &&
                popupOverlay.classList.contains("is-active")) {
                closePopup();
            }

        });

    }

});