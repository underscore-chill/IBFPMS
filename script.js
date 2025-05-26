window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop(); // Get current file name
  links.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    console.log(linkPage);
    console.log(currentPage);
    if (linkPage == currentPage) {
      if (window.innerWidth <= 700) {
        link.classList.add("text-primary");
      } else {
        console.log(link);
        if (link.classList.contains("text-white")) {
          link.classList.remove("text-white");
        }
        link.classList.add(
          "border-2",
          "border-primary",
          "bg-transparent",
          "text-black"
        );
        console.log(link);
      }
    } else {
      if (window.innerWidth <= 700) {
        link.classList.remove("text-primary");
      } else {
        link.classList.add("text-black");
        link.classList.remove("border-2", "border-primary", "bg-transparent");
      }
    }
  });
});
// Hero Slider Functionality
class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll(".slider-slide");
    this.dots = document.querySelectorAll(".slider-dot");
    this.prevBtn = document.getElementById("prev-slide");
    this.nextBtn = document.getElementById("next-slide");
    this.currentSlide = 0;
    this.slideInterval = null;

    this.init();
  }

  init() {
    // Set initial active dot
    this.updateDots();

    // Add event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Add dot click listeners
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Start auto-slide
    this.startAutoSlide();

    // Pause on hover
    const heroSection = document.querySelector("#hero-slider").parentElement;
    heroSection.addEventListener("mouseenter", () => this.stopAutoSlide());
    heroSection.addEventListener("mouseleave", () => this.startAutoSlide());
  }

  goToSlide(slideIndex) {
    // Hide current slide
    this.slides[this.currentSlide].style.opacity = "0";

    // Update current slide index
    this.currentSlide = slideIndex;

    // Show new slide
    this.slides[this.currentSlide].style.opacity = "1";

    // Update dots
    this.updateDots();
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.remove("bg-opacity-50");
        dot.classList.add("bg-opacity-100");
      } else {
        dot.classList.remove("bg-opacity-100");
        dot.classList.add("bg-opacity-50");
      }
    });
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroSlider();
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Newsletter subscription
const newsletterForm = document.querySelector("section.bg-primary .flex");
const emailInput = newsletterForm.querySelector('input[type="email"]');
const subscribeButton = newsletterForm.querySelector("button");

subscribeButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (email && isValidEmail(email)) {
    alert("Thank you for subscribing to our newsletter!");
    emailInput.value = "";
  } else {
    alert("Please enter a valid email address.");
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("shadow-lg");
  } else {
    header.classList.remove("shadow-lg");
  }
});

// Animate service cards on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply animation to service cards
document.querySelectorAll(".grid > div").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = `opacity 0.6s ease ${
    index * 0.1
  }s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Contact form submission

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.innerHTML = "Thanks! Your message has been sent.";
      form.reset();
    } else {
      const result = await response.json();
      status.innerHTML =
        result.errors?.[0]?.message || "Oops! Something went wrong.";
    }
  } catch (error) {
    status.innerHTML = "Oops! Network error.";
  }

  // Show success message
  contactSuccess.classList.remove("hidden");
  contactForm.reset();

  // Scroll to success message
  contactSuccess.scrollIntoView({ behavior: "smooth", block: "center" });

  // Hide success message after 10 seconds
  setTimeout(() => {
    contactSuccess.classList.add("hidden");
  }, 10000);
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
