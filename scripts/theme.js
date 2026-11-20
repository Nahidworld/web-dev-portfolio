/* Theme control — explicit choice wins; system preference is the default. */

(function () {
    const STORAGE_KEY = "portfolio-theme";
    const root = document.documentElement;
    const toggle = document.querySelector("[data-theme-toggle]");
    const system = window.matchMedia("(prefers-color-scheme: dark)");

    function systemTheme() {
        return system.matches ? "dark" : "light";
    }

    function currentTheme() {
        return root.dataset.theme === "dark" ? "dark" : "light";
    }

    function storedTheme() {
        try {
            const value = localStorage.getItem(STORAGE_KEY);
            return value === "light" || value === "dark" ? value : null;
        } catch (error) {
            return null;
        }
    }

    function apply(theme, persist) {
        root.dataset.theme = theme;
        root.style.colorScheme = theme;

        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEY, theme);
            } catch (error) {
                /* Storage may be unavailable; the theme still applies for this visit. */
            }
        }

        if (toggle) {
            const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
            toggle.setAttribute("aria-label", label);
            toggle.setAttribute("title", label);
            toggle.setAttribute("aria-pressed", String(theme === "dark"));
        }
    }

    /* Sync control state with the theme chosen by the inline head script. */
    apply(currentTheme(), false);

    if (toggle) {
        toggle.addEventListener("click", function () {
            apply(currentTheme() === "dark" ? "light" : "dark", true);
        });
    }

    /* Follow system changes only while the visitor has not chosen a theme. */
    function onSystemChange(event) {
        if (storedTheme()) return;
        apply(event.matches ? "dark" : "light", false);
    }

    if (system.addEventListener) {
        system.addEventListener("change", onSystemChange);
    } else if (system.addListener) {
        system.addListener(onSystemChange);
    }
})();
