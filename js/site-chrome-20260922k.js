/**
 * Shared site chrome (Silkwood-style): loyalty top bar + nav + mobile menu + footer.
 * Update CACHE_BUST and rename fingerprinted filenames when shipping chrome changes. Do not use ?v= query busting on this host.
 */
(function () {
  var CACHE_BUST = '20260922k';
  var LOYALTY_SECTION = '/#loyalty';
  var BOOK =
    'https://www.swiftbook.io/inst/#group?groupId=282NTh9QwE9ozesA6TSYxMzc=&JDRN=Y';

  // Clean folder URLs (physical page/index.html + DirectoryIndex). Keep root *.html as silent fallbacks.
  var NAV = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about/' },
    { id: 'locations', label: 'Locations', href: '/locations/', dropdown: true },
    { id: 'facilities', label: 'Facilities', href: '/facilities/' },
    { id: 'contact', label: 'Contact', href: '/contact/' },
    { id: 'faq', label: 'FAQ', href: '/faq/' }
  ];

  function detectPage() {
    var fromBody = document.body && document.body.getAttribute('data-page');
    if (fromBody) return fromBody;
    var path = (location.pathname || '/').toLowerCase();
    if (path === '/' || /\/index\.html?$/.test(path)) return 'home';
    if (path.indexOf('about') !== -1) return 'about';
    if (path.indexOf('location-ibadan') !== -1) return 'location-ibadan';
    if (path.indexOf('location-ogbomosho') !== -1) return 'location-ogbomosho';
    if (path.indexOf('location-abuja') !== -1) return 'location-abuja';
    if (path.indexOf('locations') !== -1) return 'locations';
    if (path.indexOf('facilities') !== -1) return 'facilities';
    if (path.indexOf('contact') !== -1) return 'contact';
    if (path.indexOf('faq') !== -1) return 'faq';
    if (path.indexOf('privacy') !== -1) return 'privacy';
    if (path.indexOf('hotel-policies') !== -1) return 'policies';
    return 'home';
  }

  function isActive(page, id) {
    if (page === id) return true;
    if (id === 'locations' && page.indexOf('location') === 0) return true;
    return false;
  }

  function injectChromeStyles() {
    if (document.getElementById('willow-chrome-styles')) return;
    var style = document.createElement('style');
    style.id = 'willow-chrome-styles';
    style.textContent = [
      '.loyalty-topbar{background:var(--bg-dark,#3a3736)!important;color:#fff;font-size:12px;position:relative;z-index:110}',
      '.loyalty-topbar-inner{max-width:var(--max-width,1200px);margin:0 auto;padding:6px 20px!important;display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:0}',
      '.loyalty-topbar-label{color:#fff!important;font-weight:500;white-space:nowrap;font-size:12px!important;line-height:1.3}',
      '.loyalty-topbar-ctas{display:flex;align-items:center;gap:14px;flex-shrink:0;justify-content:flex-end;flex-wrap:nowrap}',
      '.loyalty-topbar a.loyalty-topbar-link,.loyalty-topbar a.loyalty-topbar-btn{',
      'display:inline!important;background:none!important;border:0!important;border-radius:0!important;',
      'box-shadow:none!important;padding:0!important;min-width:0!important;margin:0!important;',
      'color:var(--accent,#d9a51a)!important;font-size:12px!important;font-weight:500!important;',
      'line-height:1.3!important;text-decoration:none!important;white-space:nowrap;cursor:pointer;transition:color .2s ease',
      '}',
      '.loyalty-topbar a.loyalty-topbar-link:hover,.loyalty-topbar a.loyalty-topbar-btn:hover{',
      'color:var(--accent-2,#e6b93a)!important;transform:none!important;box-shadow:none!important;text-decoration:underline',
      '}',
      '#loyalty{scroll-margin-top:120px}',
      '@media (max-width:780px){',
      '.loyalty-topbar-inner{padding:5px 12px!important;gap:8px;flex-direction:row!important;align-items:center!important;text-align:left!important}',
      '.loyalty-topbar-label{font-size:11px!important;display:none}',
      '.loyalty-topbar-ctas{gap:10px;justify-content:flex-end!important;flex:1;min-width:0}',
      '.loyalty-topbar a.loyalty-topbar-link,.loyalty-topbar a.loyalty-topbar-btn{font-size:11px!important;white-space:normal;text-align:right}',
      '#loyalty{scroll-margin-top:100px}',
      '}'
    ].join('');
    document.head.appendChild(style);
  }

  function renderTopbar() {
    return (
      '<div class="loyalty-topbar" data-loyalty-bar="' + CACHE_BUST + '">' +
      '<div class="loyalty-topbar-inner">' +
      '<span class="loyalty-topbar-label">Loyalty Program</span>' +
      '<div class="loyalty-topbar-ctas">' +
      '<a href="' + LOYALTY_SECTION + '" class="loyalty-topbar-link">Sign up for our loyalty program</a>' +
      '</div></div></div>'
    );
  }

  function scrollToLoyaltySection() {
    if ((location.hash || '').toLowerCase() !== '#loyalty') return;
    var el = document.getElementById('loyalty');
    if (!el) return;
    window.requestAnimationFrame(function () {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function renderNavLinks(page, mobile) {
    var html = '';
    NAV.forEach(function (item) {
      var active = isActive(page, item.id);
      if (item.dropdown && !mobile) {
        html +=
          '<div class="nav-dropdown">' +
          '<a href="' + item.href + '"' + (active ? ' class="active"' : '') + '>Locations ▾</a>' +
          '<div class="nav-dropdown-content">' +
          '<a href="/location-ibadan/">Ibadan</a>' +
          '<a href="/location-ogbomosho/">Ogbomosho</a>' +
          '<a href="/location-abuja/">Abuja</a>' +
          '</div></div>';
      } else if (item.dropdown && mobile) {
        html +=
          '<a href="#" onclick="toggleSubmenu(event)">Locations ▾</a>' +
          '<div class="submenu" id="locationsSubmenu">' +
          '<a href="/location-ibadan/">Ibadan</a>' +
          '<a href="/location-ogbomosho/">Ogbomosho</a>' +
          '<a href="/location-abuja/">Abuja</a>' +
          '</div>';
      } else {
        html +=
          '<a href="' + item.href + '"' + (active ? ' class="active"' : '') + '>' +
          item.label + '</a>';
      }
    });
    return html;
  }

  function renderHeader(page) {
    return (
      renderTopbar() +
      '<nav><div class="nav-container">' +
      '<a href="/" class="logo"><img src="/header-logo.webp" alt="The Willow Nest Hotel"></a>' +
      '<div class="nav-links">' +
      renderNavLinks(page, false) +
      '<a href="' + BOOK + '" target="_blank" class="btn btn-primary">Book Now</a>' +
      '</div>' +
      '<button class="mobile-toggle" aria-label="Toggle menu" onclick="toggleMobileMenu()">☰</button>' +
      '</div></nav>' +
      '<div class="menu-overlay" id="menuOverlay" onclick="toggleMobileMenu()"></div>' +
      '<div class="mobile-menu" id="mobileMenu">' +
      '<div class="mobile-menu-header"><h3>Menu</h3>' +
      '<button class="mobile-menu-close" onclick="toggleMobileMenu()" aria-label="Close menu">×</button></div>' +
      renderNavLinks(page, true) +
      '<a href="' + BOOK + '" target="_blank" class="btn btn-primary" style="margin-top:16px">Book Now</a>' +
      '</div>'
    );
  }

  function renderFooter() {
    return (
      '<footer><div class="footer-container"><div class="footer-grid">' +
      '<div class="footer-col">' +
      '<img src="/footer-logo.webp" alt="The Willow Nest Hotel" class="footer-logo">' +
      '<p class="footer-desc">Experience timeless elegance, modern luxury, and authentic cultural touches across Nigeria.</p>' +
      '<div class="social-links">' +
      '<a href="https://instagram.com/thewillownest" target="_blank" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>' +
      '<a href="https://facebook.com/thewillownest" target="_blank" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>' +
      '<a href="https://linkedin.com/company/thewillownest" target="_blank" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>' +
      '</div></div>' +
      '<div class="footer-col"><h3>Quick Links</h3><ul>' +
      '<li><a href="/">Home</a></li><li><a href="/about/">About Us</a></li><li><a href="/locations/">Locations</a></li><li><a href="/facilities/">Facilities</a></li><li><a href="/contact/">Contact</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><h3>Our Locations</h3><ul>' +
      '<li><a href="/location-ibadan/">Ibadan (81 Rooms)</a></li><li><a href="/location-ogbomosho/">Ogbomosho (34 Rooms)</a></li><li><a href="/location-abuja/">Abuja (27 Rooms)</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><h3>Contact Info</h3><ul>' +
      '<li style="display:flex;align-items:center;gap:8px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+234 (0) 813 111 1808</li>' +
      '<li style="display:flex;align-items:center;gap:8px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>reservations@thewillownest.com</li>' +
      '</ul></div></div>' +
      '<div class="footer-bottom"><p>© ' + new Date().getFullYear() + ' The Willow Nest Hotel. All rights reserved.</p>' +
      '<div class="footer-bottom-links"><a href="/privacy-policy/">Privacy Policy</a><a href="/hotel-policies/">Hotel Policies</a></div>' +
      '</div></div></footer>'
    );
  }

  window.toggleMobileMenu = function () {
    var menu = document.getElementById('mobileMenu');
    var overlay = document.getElementById('menuOverlay');
    if (!menu || !overlay) return;
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
  };

  window.toggleSubmenu = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    var submenu = document.getElementById('locationsSubmenu');
    if (!submenu) return;
    submenu.classList.toggle('active');
  };

  function removeDirectChrome() {
    Array.prototype.slice
      .call(document.querySelectorAll('body > .loyalty-topbar, body > nav, body > #menuOverlay, body > #mobileMenu, body > footer'))
      .forEach(function (el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
  }

  function upgradeLegacyTopbar() {
    var bar = document.querySelector('.loyalty-topbar');
    if (!bar) return;
    bar.setAttribute('data-loyalty-bar', CACHE_BUST);
    var ctas = bar.querySelector('.loyalty-topbar-ctas');
    if (!ctas) return;
    ctas.innerHTML =
      '<a href="' + LOYALTY_SECTION + '" class="loyalty-topbar-link">Sign up for our loyalty program</a>';
  }

  function upgradeLoyaltySection() {
    var title = document.querySelector('.loyalty-content h2');
    if (title && /^loyalty program$/i.test(title.textContent.trim())) {
      title.textContent = 'The Willow Nest Loyalty Program';
    }
    var section = document.querySelector('.loyalty-program');
    if (section && !section.id) section.id = 'loyalty';
  }

  function initChrome() {
    if (!document.body) return;
    injectChromeStyles();

    var page = detectPage();
    document.body.setAttribute('data-page', page);

    var headerRoot = document.getElementById('site-header-root');
    var footerRoot = document.getElementById('site-footer-root');

    if (headerRoot) {
      removeDirectChrome();
      headerRoot.innerHTML = renderHeader(page);
    } else if (document.querySelector('body > .loyalty-topbar, body > nav')) {
      // Old cached markup: restyle topbar in place and keep existing nav
      upgradeLegacyTopbar();
    } else {
      var created = document.createElement('div');
      created.id = 'site-header-root';
      created.innerHTML = renderHeader(page);
      document.body.insertBefore(created, document.body.firstChild);
    }

    if (footerRoot) {
      var strayFooter = document.querySelector('body > footer');
      if (strayFooter) strayFooter.parentNode.removeChild(strayFooter);
      footerRoot.innerHTML = renderFooter();
    } else if (!document.querySelector('footer')) {
      var f = document.createElement('div');
      f.id = 'site-footer-root';
      f.innerHTML = renderFooter();
      document.body.appendChild(f);
    }

    upgradeLoyaltySection();
    scrollToLoyaltySection();
    window.addEventListener('hashchange', scrollToLoyaltySection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChrome);
  } else {
    initChrome();
  }

  window.WillowChrome = { version: CACHE_BUST, init: initChrome };
})();
