/**
 * page30 guestbook / viewpost / one-sentence 공통 API 베이스 URL
 *
 * 보안: apiBase·api=local 오버라이드는 localhost에서만 허용.
 * 운영 도메인에서는 항상 PRODUCTION_API_BASE만 사용
 * (?apiBase= 피싱으로 관리자·댓글 비밀번호 탈취 방지)
 */
(function () {
  var PRODUCTION_API_BASE =
    'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';

  function isLocalHost(hostname) {
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '[::1]' ||
      hostname === '::1'
    );
  }

  /**
   * @returns {string} API origin (no trailing slash)
   */
  function getPage30ApiBaseUrl() {
    var h = window.location.hostname;

    // 운영·프리뷰·기타 호스트: URL 파라미터로 API를 바꿀 수 없음
    if (!isLocalHost(h)) {
      return PRODUCTION_API_BASE;
    }

    var params = new URLSearchParams(window.location.search);
    var customBase = params.get('apiBase');
    if (customBase) {
      try {
        var parsed = new URL(customBase);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
          return parsed.origin;
        }
      } catch (e) {
        /* ignore invalid apiBase */
      }
    }
    if (params.get('api') === 'prod') return PRODUCTION_API_BASE;
    if (params.get('api') === 'local') {
      return 'http://' + h + ':3000';
    }
    return 'http://' + h + ':3000';
  }

  window.PAGE30_PRODUCTION_API_BASE = PRODUCTION_API_BASE;
  window.getPage30ApiBaseUrl = getPage30ApiBaseUrl;
})();
