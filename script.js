document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Active Navigation Link
    // ==========================
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");
        });
    });

    // ==========================
    // Reveal Animation on Scroll
    // ==========================
    const revealElements = document.querySelectorAll(
        "section, .card, .project, .timeline-item"
    );

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.2
        }
    );

    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(40px)";
        element.style.transition = "all 0.7s ease";

        revealObserver.observe(element);

    });

    // ==========================
    // Navbar Shadow
    // ==========================
    const navbar = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";

        } else {

            navbar.style.boxShadow = "none";

        }

    });

    // ==========================
    // Typing Animation
    // ==========================
    const profession = document.querySelector(".hero h2");

    if (profession) {

        const text = profession.textContent;

        profession.textContent = "";

        let index = 0;

        function typeWriter() {

            if (index < text.length) {

                profession.textContent += text.charAt(index);

                index++;

                setTimeout(typeWriter, 70);

            }

        }

        typeWriter();

    }

    // ==========================
    // Smooth Button Hover
    // ==========================
    const buttons = document.querySelectorAll(".btn, .btn-outline");

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-3px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "translateY(0)";

        });

    });

    // ==========================
    // Footer Year
    // ==========================
    const year = document.querySelector(".year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

});