document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
        observer.observe(element);
    });

});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);

});

mainNav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

    });

});