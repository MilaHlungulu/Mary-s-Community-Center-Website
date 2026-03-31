// const hamburger = document.querySelector(".hamburger");
// const mobileMenu = document.querySelector(".mobile-menu");

// hamburger.addEventListener("click", () => {
//   hamburger.classList.toggle("active");
//   mobileMenu.classList.toggle("active");
// });
// // Add this inside your script tag
// document.addEventListener("DOMContentLoaded", () => {
//   const navCta = document.getElementById("nav-cta");

//   if (navCta) {
//     navCta.addEventListener("click", () => {
//       const contactSection = document.getElementById("contact");
//       contactSection.scrollIntoView({ behavior: "smooth" });
//     });
//   }
// });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const countTo = parseInt(target.getAttribute("data-count"));
      let current = 0;
      const increment = countTo / 50; // Adjust speed here

      const updateCount = () => {
        current += increment;
        if (current < countTo) {
          target.innerText = Math.ceil(current) + "+";
          requestAnimationFrame(updateCount);
        } else {
          target.innerText = countTo + "+";
        }
      };
      updateCount();
      observer.unobserve(target); // Only animate once
    }
  });
});

document.querySelectorAll(".stat-number").forEach((n) => observer.observe(n));


