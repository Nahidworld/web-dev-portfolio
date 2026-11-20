/* Navigation behavior — scrolled state, mobile menu, and active section. */

(function () {
    const header = document.querySelector(".site-header");
    const nav = document.querySelector(".nav");
    const menuToggle = document.querySelector(".menu-toggle");
    const links = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
    const mobile = window.matchMedia("(max-width: 860px)");

    function setMenu(open) {
        if (!nav || !menuToggle) return;
        nav.classList.toggle("is-open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    }

    function isMenuOpen() {
        return nav ? nav.classList.contains("is-open") : false;
    }

    function updateOnScroll() {
        if (header) {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        }

        let active = null;
        let activeTop = -Infinity;
        links.forEach(function (link) {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            const top = target.getBoundingClientRect().top;
            if (top <= 120 && top > activeTop) {
                active = link;
                activeTop = top;
            }
        });

        links.forEach(function (link) {
            const isActive = link === active;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    let frame = null;
    function scheduleUpdate() {
        if (frame !== null) return;
        frame = window.requestAnimationFrame(function () {
            frame = null;
            updateOnScroll();
        });
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    updateOnScroll();

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            setMenu(!isMenuOpen());
        });
    }

    if (nav) {
        nav.querySelectorAll(".nav-links a").forEach(function (link) {
            link.addEventListener("click", function () {
                setMenu(false);
            });
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && isMenuOpen()) {
            setMenu(false);
            if (menuToggle) menuToggle.focus();
        }
    });

    document.addEventListener("click", function (event) {
        if (isMenuOpen() && nav && !nav.contains(event.target)) {
            setMenu(false);
        }
    });

    function onBreakpointChange(event) {
        if (!event.matches) setMenu(false);
    }

    if (mobile.addEventListener) {
        mobile.addEventListener("change", onBreakpointChange);
    } else if (mobile.addListener) {
        mobile.addListener(onBreakpointChange);
    }
})();
