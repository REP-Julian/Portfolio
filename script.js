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
