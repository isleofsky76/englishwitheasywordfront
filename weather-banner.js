/**
 * Navbar 아래 날씨 배너 — 백엔드 /weather 프록시 경유 (Open-Meteo, API 키 불필요)
 * weather-banner.css 와 함께 로드
 */
(function () {
  var PRODUCTION_API_BASE = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
  var DEFAULT = { lat: 37.5665, lon: 126.978, label: '서울' };
  var CACHE_KEY = 'ees-weather-banner-v7';
  var CACHE_MS = 30 * 60 * 1000;
  var FETCH_TIMEOUT_MS = 20000;

  var CONDITIONS = {
    0: { ko: '맑음', en: 'Clear', icon: '☀️' },
    1: { ko: '대체로 맑음', en: 'Mainly clear', icon: '🌤️' },
    2: { ko: '구름 조금', en: 'Partly cloudy', icon: '⛅' },
    3: { ko: '흐림', en: 'Cloudy', icon: '☁️' },
    45: { ko: '안개', en: 'Foggy', icon: '🌫️' },
    48: { ko: '안개', en: 'Foggy', icon: '🌫️' },
    51: { ko: '이슬비', en: 'Drizzle', icon: '🌦️' },
    53: { ko: '이슬비', en: 'Drizzle', icon: '🌦️' },
    55: { ko: '이슬비', en: 'Drizzle', icon: '🌦️' },
    61: { ko: '비', en: 'Rain', icon: '🌧️' },
    63: { ko: '비', en: 'Rain', icon: '🌧️' },
    65: { ko: '폭우', en: 'Heavy rain', icon: '🌧️' },
    71: { ko: '눈', en: 'Snow', icon: '❄️' },
    73: { ko: '눈', en: 'Snow', icon: '❄️' },
    75: { ko: '폭설', en: 'Heavy snow', icon: '❄️' },
    80: { ko: '소나기', en: 'Showers', icon: '🌦️' },
    81: { ko: '소나기', en: 'Showers', icon: '🌦️' },
    82: { ko: '폭우', en: 'Heavy showers', icon: '🌧️' },
    95: { ko: '뇌우', en: 'Thunderstorm', icon: '⛈️' },
    96: { ko: '뇌우', en: 'Thunderstorm', icon: '⛈️' },
    99: { ko: '뇌우', en: 'Thunderstorm', icon: '⛈️' }
  };

  function getWeatherApiBase() {
    if (typeof getPage30ApiBaseUrl === 'function') {
      return getPage30ApiBaseUrl();
    }
    var params = new URLSearchParams(window.location.search);
    if (params.get('api') === 'prod') return PRODUCTION_API_BASE;
    if (params.get('api') === 'local') {
      return 'http://' + window.location.hostname + ':3000';
    }
    var h = window.location.hostname;
    if (h === 'localhost' || h === '127.0.0.1') {
      return 'http://' + h + ':3000';
    }
    return PRODUCTION_API_BASE;
  }

  function condition(code) {
    return CONDITIONS[code] || { ko: '날씨', en: 'Weather', icon: '🌡️' };
  }

  function cacheKey(lat, lon) {
    return CACHE_KEY + ':' + Math.round(lat * 10) + ':' + Math.round(lon * 10);
  }

  function readCache(lat, lon) {
    try {
      var raw = sessionStorage.getItem(cacheKey(lat, lon));
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || Date.now() - data.ts > CACHE_MS) return null;
      return data.html || null;
    } catch (e) {
      return null;
    }
  }

  function writeCache(lat, lon, html) {
    try {
      sessionStorage.setItem(cacheKey(lat, lon), JSON.stringify({ ts: Date.now(), html: html }));
    } catch (e) { /* Tracking Prevention 등으로 storage 차단 시 무시 */ }
  }

  function weatherDetailUrl(lat, lon) {
    return 'https://wttr.in/' + encodeURIComponent(lat.toFixed(2) + ',' + lon.toFixed(2)) + '?lang=ko';
  }

  function renderBanner(banner, html, loc) {
    var href = weatherDetailUrl(loc.lat, loc.lon);
    banner.classList.remove('weather-banner--error');
    banner.classList.add('weather-banner--clickable');
    banner.innerHTML =
      '<a class="weather-banner__link" href="' + href + '" target="_blank" rel="noopener noreferrer" ' +
      'title="자세한 날씨 보기 (새 탭)">' +
      '<span class="weather-banner__inner">' + html + '</span></a>';
  }

  function renderError(banner, msg) {
    banner.classList.remove('weather-banner--clickable');
    banner.innerHTML = '<span class="weather-banner__inner weather-banner__text">' + msg + '</span>';
    banner.classList.add('weather-banner--error');
  }

  function buildHtml(city, info, temp, feels) {
    var tempNum = Number(temp);
    var feelsNum = Number(feels);
    return (
      '<span class="weather-banner__icon" aria-hidden="true">' + info.icon + '</span>' +
      '<span class="weather-banner__text">' +
      city + ' · ' + info.ko +
      ' <span class="weather-banner__en">(' + info.en + ')</span> · ' +
      Math.round(tempNum) + '°C' +
      (!isNaN(feelsNum) ? ' <span class="weather-banner__en">Real feels ' + Math.round(feelsNum) + '°C</span>' : '') +
      '</span>'
    );
  }

  function fetchJson(url) {
    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, FETCH_TIMEOUT_MS);

    return fetch(url, { signal: controller.signal })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .finally(function () {
        clearTimeout(timer);
      });
  }

  function fetchWeather(lat, lon, cityLabel) {
    var url = getWeatherApiBase() + '/weather?lat=' + encodeURIComponent(lat) +
      '&lon=' + encodeURIComponent(lon) +
      '&label=' + encodeURIComponent(cityLabel);

    return fetchJson(url).then(function (data) {
      if (!data || data.temperature == null) throw new Error('no data');
      var info = condition(data.weathercode);
      return buildHtml(data.label || cityLabel, info, data.temperature, data.apparentTemperature);
    });
  }

  function loadWeather(banner, loc, opts) {
    opts = opts || {};
    var optional = !!opts.optional;
    var cached = readCache(loc.lat, loc.lon);
    if (cached) {
      renderBanner(banner, cached, loc);
    }

    return fetchWeather(loc.lat, loc.lon, loc.label)
      .then(function (html) {
        renderBanner(banner, html, loc);
        writeCache(loc.lat, loc.lon, html);
      })
      .catch(function () {
        // 위치 갱신(optional) 실패 시 서울 표시 유지
        if (!optional && !cached) {
          renderError(banner, '☁️ 날씨 정보를 불러올 수 없습니다 (백엔드 3000번 확인)');
        }
      });
  }

  function getLocation() {
    return new Promise(function (resolve) {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            label: '현재 위치'
          });
        },
        function () { resolve(null); },
        { timeout: 5000, maximumAge: 600000 }
      );
    });
  }

  function createBanner() {
    var nav = document.querySelector('.navbar.fixed-top');
    if (!nav || document.getElementById('weather-banner')) return null;

    var banner = document.createElement('div');
    banner.id = 'weather-banner';
    banner.className = 'weather-banner';
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = '<span class="weather-banner__inner weather-banner__text">날씨 불러오는 중…</span>';
    nav.insertAdjacentElement('afterend', banner);
    document.documentElement.classList.add('has-weather-banner');
    if (document.querySelector('.main-content')) {
      document.documentElement.classList.add('page-with-main-content');
    }
    return banner;
  }

  function init() {
    var banner = createBanner();
    if (!banner) return;

    loadWeather(banner, DEFAULT).then(function () {
      return getLocation();
    }).then(function (loc) {
      if (!loc) return;
      var samePlace = Math.abs(loc.lat - DEFAULT.lat) < 0.05 && Math.abs(loc.lon - DEFAULT.lon) < 0.05;
      if (samePlace) return;
      return loadWeather(banner, loc, { optional: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
