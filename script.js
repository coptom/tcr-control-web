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

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        formStatus.textContent = "Odosielam správu...";

        const formData = new FormData(contactForm);

        const data = {
            name: formData.get("name"),
            company: formData.get("company"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message")
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Chyba pri odosielaní.");
            }

            formStatus.textContent = "Ďakujeme. Správa bola úspešne odoslaná.";
            contactForm.reset();

        } catch (error) {
            console.error(error);
            formStatus.textContent =
                "Správu sa nepodarilo odoslať. Skúste to prosím znova.";
        }
    });
}