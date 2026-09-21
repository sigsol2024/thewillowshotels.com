// Common JavaScript for all pages - Mobile Menu Toggle

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
}

// Submenu toggle
function toggleSubmenu(e) {
  e.preventDefault();
  const submenu = document.getElementById('locationsSubmenu');
  submenu.classList.toggle('active');
}

