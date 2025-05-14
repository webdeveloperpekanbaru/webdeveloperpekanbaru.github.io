// SPA Controller
const SPAController = (function () {
  // Private variables
  const pages = {
    about: document.getElementById("about-page"),
    experience: document.getElementById("experience-page"),
    education: document.getElementById("education-page"),
    skills: document.getElementById("skills-page"),
    projects: document.getElementById("projects-page"),
    contact: document.getElementById("contact-page"),
  };

  let currentPage = "about";
  const menuItems = document.querySelectorAll(".menu-item");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const sidebar = document.getElementById("sidebar");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

  // Initialize the app
  function init() {
    setupEventListeners();
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
  }

  // Set up event listeners
  function setupEventListeners() {
    // Menu item clicks
    menuItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const targetPage = this.getAttribute("href").substring(1);
        navigateTo(targetPage);

        // Close mobile menu if open
        if (sidebar.classList.contains("mobile-menu-visible")) {
          toggleMobileMenu();
        }
      });
    });

    // Mobile menu button
    mobileMenuButton.addEventListener("click", toggleMobileMenu);

    // Mobile menu overlay
    mobileMenuOverlay.addEventListener("click", toggleMobileMenu);
  }

  // Handle hash changes
  function handleHashChange() {
    const hash = window.location.hash.substring(1) || "about";
    if (pages[hash]) {
      navigateTo(hash);
    }
  }

  // Navigate to a specific page
  function navigateTo(page) {
    if (page !== currentPage && pages[page]) {
      // Hide current page
      pages[currentPage].classList.remove("page-visible");
      pages[currentPage].classList.add("page-hidden");

      // Show new page
      pages[page].classList.remove("page-hidden");
      pages[page].classList.add("page-visible");

      // Update current page
      currentPage = page;

      // Update URL hash
      window.location.hash = page;

      // Update active menu item
      updateActiveMenuItem(page);

      // Animate skill bars if navigating to skills page
      if (page === "skills") {
        animateSkillBars();
      }
    }
  }

  // Update active menu item
  function updateActiveMenuItem(page) {
    menuItems.forEach((item) => {
      const itemPage = item.getAttribute("href").substring(1);
      if (itemPage === page) {
        item.parentElement.classList.add("active-menu-item");
      } else {
        item.parentElement.classList.remove("active-menu-item");
      }
    });
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    sidebar.classList.toggle("mobile-menu-hidden");
    sidebar.classList.toggle("mobile-menu-visible");
    mobileMenuOverlay.classList.toggle("active");

    // Change icon based on state
    const isOpen = sidebar.classList.contains("mobile-menu-visible");
    mobileMenuButton.innerHTML = isOpen
      ? '<i class="fas fa-times text-white"></i>'
      : '<i class="fas fa-bars text-white"></i>';
  }

  // Animate skill bars
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-bar");
    skillBars.forEach((bar) => {
      // Reset animation by removing and re-adding the width
      const width = bar.style.width;
      bar.style.width = "0";
      // Force reflow
      void bar.offsetWidth;
      // Restore width with animation
      bar.style.width = width;
    });
  }

  // Public API
  return {
    init: init,
    navigateTo: navigateTo,
  };
})();

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  SPAController.init();
});
