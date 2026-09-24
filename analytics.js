(() => {
  'use strict';
  // Production only: previews must never contribute to visitor statistics.
  if (!['strut2.com', 'www.strut2.com'].includes(location.hostname) || location.pathname.startsWith('/review/')) return;
  const id = 'G-NR4G0KX4JJ';
  const key = 'strut2:analytics-consent:v1';
  let choice = null;
  let loaded = false;
  try { choice = localStorage.getItem(key); } catch (_) {}
  const cleanURL = value => {
    try { const url = new URL(value); return url.origin + url.pathname; } catch (_) { return ''; }
  };
  const start = () => {
    if (loaded) return;
    loaded = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: cleanURL(location.href),
      page_referrer: cleanURL(document.referrer)
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(tag);
  };
  const panel = document.createElement('section');
  panel.className = 'analytics-notice';
  panel.setAttribute('aria-label', 'Analytics preferences');
  panel.innerHTML = '<p><strong>Your privacy matters.</strong> Allow Google Analytics to help us understand visits and improve STRUT2? Optional analytics cookies are off until you accept. <a href="privacy.html">Website privacy</a></p><div><button type="button" data-analytics-accept>Accept analytics</button><button type="button" data-analytics-decline>Decline</button></div>';
  panel.hidden = choice === 'accepted' || choice === 'declined';
  document.body.appendChild(panel);
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'analytics-settings';
  settings.textContent = 'Analytics preferences';
  (document.querySelector('.footer-bottom') || document.body).appendChild(settings);
  settings.addEventListener('click', () => {
    panel.hidden = false;
    panel.querySelector('button').focus();
  });
  const save = value => {
    try { localStorage.setItem(key, value); } catch (_) {}
    choice = value;
    panel.hidden = true;
    settings.focus({preventScroll: true});
    if (value === 'accepted') start();
    else {
      window['ga-disable-' + id] = true;
      // Remove first-party GA cookies, then unload the running tag.
      document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) return;
        ['', '; domain=strut2.com', '; domain=.strut2.com', '; domain=' + location.hostname].forEach(domain => {
          document.cookie = name + '=; Max-Age=0; path=/' + domain;
        });
      });
      if (loaded) location.reload();
    }
  };
  panel.querySelector('[data-analytics-accept]').addEventListener('click', () => save('accepted'));
  panel.querySelector('[data-analytics-decline]').addEventListener('click', () => save('declined'));
  if (choice === 'accepted') start();
})();
