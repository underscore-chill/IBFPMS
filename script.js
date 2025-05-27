window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop(); // Get current file name
  links.forEach((link) => {
    const linkPage = link?.getAttribute("href")?.split("/").pop();
    if (linkPage == currentPage) {
      if (window.innerWidth <= 700) {
        link.classList.add("text-primary");
      } else {
        if (link.classList.contains("text-white")) {
          link.classList.remove("text-white");
        }
        link.classList.add(
          "border-2",
          "border-primary",
          "bg-transparent",
          "text-black"
        );
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

// Form submission handling
const careerForm = document.getElementById("career-form");
const formSuccess = document.getElementById("form-success");

careerForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate form
  const formData = new FormData(careerForm);
  const resume = formData.get("resume");

  // Check if resume is PDF
  if (resume && resume.type !== "application/pdf") {
    alert("Please upload a PDF file for your resume.");
    return;
  }

  // Show success message
  formSuccess.classList.remove("hidden");
  careerForm.reset();

  // Scroll to success message
  formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });

  // Hide success message after 10 seconds
  setTimeout(() => {
    formSuccess.classList.add("hidden");
  }, 10000);
});

// File upload validation
const resumeInput = document.getElementById("resume");
resumeInput?.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file && file.type !== "application/pdf") {
    alert("Please select a PDF file only.");
    e.target.value = "";
  }
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

// Add scroll animations
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

// Apply animation to cards and sections
document
  .querySelectorAll(".grid > div, section > div")
  .forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = `opacity 0.8s ease ${
      index * 0.1
    }s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(element);
  });

// Form field focus animations
document.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("focus", function () {
    this.parentElement.classList.add("transform", "scale-105");
  });

  field.addEventListener("blur", function () {
    this.parentElement.classList.remove("transform", "scale-105");
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
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    // Add dot click listeners
    this.dots?.forEach((dot, index) => {
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
const emailInput = newsletterForm?.querySelector('input[type="email"]');
const subscribeButton = newsletterForm?.querySelector("button");

subscribeButton?.addEventListener("click", (e) => {
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
const observerOptions2 = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions2);

// Apply animation to service cards
document.querySelectorAll(".grid > div").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = `opacity 0.6s ease ${
    index * 0.1
  }s, transform 0.6s ease ${index * 0.1}s`;
  observer2.observe(card);
});

// Contact form submission

const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");
const contactSuccess = document.getElementById("contact-success");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  try {
    // const response = await fetch(form.action, {
    //   method: form.method,
    //   body: data,
    //   headers: {
    //     Accept: "application/json",
    //   },
    // });

    // if (response.ok) {
    if (true) {
      if (statusMessage) {
        statusMessage.innerHTML = "Thanks! Your message has been sent.";
      }
      form.reset();
    } else {
      const result = await response.json();
      if (statusMessage) {
        statusMessage.innerHTML =
          result.errors?.[0]?.message || "Oops! Something went wrong.";
      }
    }
  } catch (error) {
    statusMessage.innerHTML = "Oops! Network error.";
  }

  // Show success message
  contactSuccess.classList.remove("hidden");
  form.reset();

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
