/**
 * 날씨 배너 아래 세계 주요 도시 시계 — 5초마다 도시 순환
 */
(function () {
  var CITIES = [
    { label: '서울', tz: 'Asia/Seoul' },
    { label: '런던', tz: 'Europe/London' },
    { label: '뉴욕', tz: 'America/New_York' },
    { label: '시애틀', tz: 'America/Los_Angeles' },
    { label: '시드니', tz: 'Australia/Sydney' },
    { label: '토론토', tz: 'America/Toronto' },
    { label: '로마', tz: 'Europe/Rome' },
    { label: '파리', tz: 'Europe/Paris' }
  ];

  var ROTATE_MS = 5000;
  var FADE_MS = 450;
  var cityIndex = 0;
  var fadeTimer = null;

  function formatTime(timeZone) {
    try {
      var hour = '';
      var minute = '';
      new Intl.DateTimeFormat('en-GB', {
        timeZone: timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).formatToParts(new Date()).forEach(function (part) {
        if (part.type === 'hour') hour = part.value;
        if (part.type === 'minute') minute = part.value;
      });
      return hour + ':' + minute;
    } catch (e) {
      return '--:--';
    }
  }

  function cityHtml(city) {
    var time = formatTime(city.tz);
    return (
      '<span class="world-clock-bar__entry">' +
      '<span class="world-clock-bar__city-wrap">[<span class="world-clock-bar__city">' +
      city.label + '</span>]</span>' +
      '<span class="world-clock-bar__time">' + time + '</span>' +
      '</span>'
    );
  }

  function showCity(slot, index, animate) {
    var city = CITIES[index];
    if (!city || !slot) return;

    if (!animate) {
      slot.innerHTML = cityHtml(city);
      slot.classList.remove('is-fading');
      slot.setAttribute('aria-label', city.label + ' 현재 시각');
      return;
    }

    slot.classList.add('is-fading');
    if (fadeTimer) clearTimeout(fadeTimer);
    fadeTimer = setTimeout(function () {
      slot.innerHTML = cityHtml(city);
      slot.setAttribute('aria-label', city.label + ' 현재 시각');
      requestAnimationFrame(function () {
        slot.classList.remove('is-fading');
      });
    }, FADE_MS);
  }

  function nextCity(slot) {
    cityIndex = (cityIndex + 1) % CITIES.length;
    showCity(slot, cityIndex, true);
  }

  function showSiteHeader(navbar, weather, clock) {
    if (navbar) navbar.style.top = '0';
    if (weather) weather.style.top = 'var(--navbar-height)';
    if (clock) {
      clock.style.top = 'calc(var(--navbar-height) + var(--weather-banner-height))';
    }
    document.documentElement.classList.remove('site-header-hidden');
  }

  function hideSiteHeader(navbar, weather, clock) {
    if (navbar) navbar.style.top = 'calc(-1 * var(--navbar-height))';
    if (weather) {
      weather.style.top = 'calc(-1 * (var(--navbar-height) + var(--weather-banner-height)))';
    }
    if (clock) clock.style.top = 'calc(-1 * var(--site-header-total))';
    document.documentElement.classList.add('site-header-hidden');
  }

  function syncHeaderScroll() {
    var navbar = document.getElementById('navbar');
    var weather = document.getElementById('weather-banner');
    var clock = document.getElementById('world-clock-bar');

    var lastScrollTop = 0;
    window.addEventListener('scroll', function () {
      if (document.documentElement.classList.contains('nav-home-open')) {
        showSiteHeader(navbar, weather, clock);
        return;
      }

      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var hiding = scrollTop > lastScrollTop && scrollTop > 10;

      if (hiding) {
        hideSiteHeader(navbar, weather, clock);
      } else {
        showSiteHeader(navbar, weather, clock);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
  }

  function createWorldClock() {
    var weather = document.getElementById('weather-banner');
    if (!weather || document.getElementById('world-clock-bar')) return null;

    var bar = document.createElement('div');
    bar.id = 'world-clock-bar';
    bar.className = 'world-clock-bar';
    bar.setAttribute('aria-label', '세계 주요 도시 시각');
    bar.innerHTML =
      '<div class="world-clock-bar__list">' +
      '<span class="world-clock-bar__prefix">' +
      '<span class="world-clock-bar__icon" aria-hidden="true">🕐</span>' +
      '<span class="world-clock-bar__label">현재 시간</span>' +
      '</span>' +
      '<span class="world-clock-bar__slot" role="status" aria-live="polite"></span>' +
      '</div>';
    weather.insertAdjacentElement('afterend', bar);
    document.documentElement.classList.add('has-world-clock');
    return bar.querySelector('.world-clock-bar__slot');
  }

  function init() {
    var slot = createWorldClock();
    if (!slot) return;

    cityIndex = 0;
    showCity(slot, cityIndex, false);

    setInterval(function () {
      nextCity(slot);
    }, ROTATE_MS);

    setInterval(function () {
      showCity(slot, cityIndex, false);
    }, 30000);

    syncHeaderScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
