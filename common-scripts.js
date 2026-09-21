// Common JavaScript for all pages - Mobile Menu + Loyalty Top Bar

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  if (!menu || !overlay) return;
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
}

// Submenu toggle
function toggleSubmenu(e) {
  e.preventDefault();
  const submenu = document.getElementById('locationsSubmenu');
  if (!submenu) return;
  submenu.classList.toggle('active');
}

// Ensure loyalty top bar exists on every page (survives stale HTML caches)
(function ensureLoyaltyTopbar() {
  var ENROLL = 'https://www.rewardbooth.com/thewillowshotels/enroll';
  var BALANCE = 'https://www.rewardbooth.com/thewillowshotels/balance';

  function injectStyles() {
    if (document.getElementById('loyalty-topbar-styles')) return;
    var css = document.createElement('style');
    css.id = 'loyalty-topbar-styles';
    css.textContent = [
      '.loyalty-topbar{background:var(--bg-dark,#3a3736);color:#fff;font-size:12px;position:relative;z-index:110}',
      '.loyalty-topbar-inner{max-width:var(--max-width,1200px);margin:0 auto;padding:4px 20px;display:flex;align-items:center;justify-content:space-between;gap:10px}',
      '.loyalty-topbar-label{color:#fff;font-weight:500;white-space:nowrap;font-size:12px;line-height:1.2}',
      '.loyalty-topbar-ctas{display:flex;align-items:center;gap:6px;flex-shrink:0;justify-content:flex-end}',
      '.loyalty-topbar-btn{display:inline-block;padding:3px 10px;border-radius:4px;font-size:11px;font-weight:600;text-decoration:none;background:linear-gradient(180deg,var(--accent,#d9a51a) 0%,var(--accent-2,#e6b93a) 100%);color:#222;white-space:nowrap;line-height:1.3}',
      '@media (max-width:780px){.loyalty-topbar-inner{padding:3px 12px;gap:6px}.loyalty-topbar-label{font-size:10px}.loyalty-topbar-btn{padding:2px 7px;font-size:9px;border-radius:3px}.loyalty-topbar-ctas{gap:4px}}'
    ].join('');
    document.head.appendChild(css);
  }

  function injectBar() {
    if (document.querySelector('.loyalty-topbar')) return;
    var bar = document.createElement('div');
    bar.className = 'loyalty-topbar';
    bar.setAttribute('data-loyalty-bar', 'v2');
    bar.innerHTML =
      '<div class="loyalty-topbar-inner">' +
        '<span class="loyalty-topbar-label">Loyalty Program</span>' +
        '<div class="loyalty-topbar-ctas">' +
          '<a href="' + ENROLL + '" target="_blank" rel="noopener noreferrer" class="loyalty-topbar-btn">Get Started</a>' +
          '<a href="' + BALANCE + '" target="_blank" rel="noopener noreferrer" class="loyalty-topbar-btn">Check Reward Balance</a>' +
        '</div>' +
      '</div>';
    var nav = document.querySelector('nav');
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(bar, nav);
    } else if (document.body) {
      document.body.insertBefore(bar, document.body.firstChild);
    }
  }

  function run() {
    injectStyles();
    injectBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
