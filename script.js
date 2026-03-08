const revealTargets = document.querySelectorAll(
	"section, .skill-card, .hobby-card, .work-card, .project-card, .contact-card"
);

revealTargets.forEach((element, index) => {
	element.classList.add("reveal");
	element.style.transitionDelay = `${Math.min(index * 45, 100)}ms`;
});

const revealObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.2,
		rootMargin: "0px 0px -40px 0px",
	}
);

revealTargets.forEach((element) => revealObserver.observe(element));

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

if (navbar && menuToggle) {
	menuToggle.addEventListener("click", () => {
		const isOpen = navbar.classList.toggle("nav-open");
		menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
	});

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (navbar.classList.contains("nav-open")) {
				navbar.classList.remove("nav-open");
				menuToggle.setAttribute("aria-expanded", "false");
			}
		});
	});
}
