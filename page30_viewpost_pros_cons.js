let API_BASE_URL;
const urlParams = new URLSearchParams(window.location.search);
const apiMode = urlParams.get('api');

if (apiMode === 'prod') {
  API_BASE_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
} else if (apiMode === 'local') {
  API_BASE_URL = `http://${window.location.hostname}:3000`;
} else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  API_BASE_URL = `http://${window.location.hostname}:3000`;
} else {
  API_BASE_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
}

window.VIEWPOST_SEO = {
  boardPath: 'pros-cons',
  boardLabel: 'Pros & Cons',
  fallbackHtml: 'pros-cons.html',
  listPath: '/pros-cons',
  bySlugPath: '/pros-cons/by-slug',
};

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showLoading() {
  const postContainer = document.getElementById('post-container');
  postContainer.innerHTML = `
    <div style="text-align: center; padding: 40px;">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p style="margin-top: 15px; color: #666;">게시글을 불러오는 중...</p>
    </div>
  `;
}

function showError(message, details = '', listPage = 'pros-cons-list.html') {
  const postContainer = document.getElementById('post-container');
  const apiParam = apiMode ? `?api=${apiMode}` : '';
  const listUrl = listPage + apiParam;
  postContainer.innerHTML = `
    <div style="text-align: center; padding: 30px; color: #d32f2f; background-color: #ffebee; border-radius: 8px; margin: 20px;">
      <p style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px;">⚠️ ${message}</p>
      ${details ? `<p style="font-size: 0.9em; color: #666; margin-top: 10px;">${details}</p>` : ''}
      <a href="${listUrl}" class="btn btn-primary mt-3">목록으로 돌아가기</a>
    </div>
  `;
}

function normalizeEntries(messages) {
  if (Array.isArray(messages)) return messages;
  if (messages.entries && Array.isArray(messages.entries)) return messages.entries;
  if (messages.data && Array.isArray(messages.data)) return messages.data;
  return null;
}

function startEnglishTTS(text, btn) {
  if (!text || !window.speechSynthesis) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.92;
    const voices = speechSynthesis.getVoices();
    const en =
      voices.find((v) => v.lang && /^en-US/i.test(v.lang)) ||
      voices.find((v) => v.lang && /^en(-|$)/i.test(v.lang));
    if (en) u.voice = en;
    const done = () => { if (btn) btn.classList.remove('pv-tts-playing'); };
    u.onend = done;
    u.onerror = done;
    speechSynthesis.speak(u);
  } catch (e) {
    if (btn) btn.classList.remove('pv-tts-playing');
  }
}

function attachProsConsTTS(container) {
  if (!container || !window.speechSynthesis) return;
  try { speechSynthesis.getVoices(); } catch (_) {}

  container.querySelectorAll('.pv-tts-btn').forEach((btn) => {
    if (btn.dataset.pcTtsBound === '1') return;
    btn.dataset.pcTtsBound = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const raw = btn.getAttribute('data-pv-tts');
      if (!raw) return;

      const playing =
        btn.classList.contains('pv-tts-playing') &&
        (speechSynthesis.speaking || speechSynthesis.pending);
      if (playing) {
        speechSynthesis.cancel();
        btn.classList.remove('pv-tts-playing');
        return;
      }

      speechSynthesis.cancel();
      container.querySelectorAll('.pv-tts-btn.pv-tts-playing').forEach((b) =>
        b.classList.remove('pv-tts-playing')
      );
      btn.classList.add('pv-tts-playing');
      startEnglishTTS(raw, btn);
    });
  });
}

async function loadPost() {
  showLoading();

  try {
    const result = window.ViewpostSeo
      ? await window.ViewpostSeo.fetchPostBySlugOrIndex(API_BASE_URL, window.VIEWPOST_SEO)
      : null;

    if (!window.ViewpostSeo) {
      showError('게시글을 불러올 수 없습니다', 'viewpost-seo.js 가 필요합니다.');
      return;
    }
    if (result.error === 'missing-param') {
      showError('게시글을 찾을 수 없습니다', 'slug 또는 index 파라미터가 없습니다.');
      return;
    }
    if (result.error === 'slug-not-found') {
      showError('게시글을 찾을 수 없습니다', `slug "${result.slug}"에 해당하는 글이 없습니다.`);
      return;
    }
    if (result.error) {
      showError('게시글을 불러올 수 없습니다', String(result.error));
      return;
    }

    const post = result.post;

    try {
      const viewResponse = await fetch(`${API_BASE_URL}/pros-cons/${post._id}/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (viewResponse.ok) {
        const viewData = await viewResponse.json();
        if (viewData.entry && viewData.entry.views !== undefined) {
          post.views = viewData.entry.views;
        }
      }
    } catch (viewError) {
      console.warn('조회수 증가 실패 (무시):', viewError);
    }

    window.ViewpostSeo.updatePageSeo(post, window.VIEWPOST_SEO);

    const renderFn = typeof renderProsConsMessage === 'function'
      ? renderProsConsMessage
      : function (msg) { return msg || ''; };
    const bodyHtml = renderFn(post.message || '');

    const metaHtml = typeof buildPostMetaHtml === 'function' ? buildPostMetaHtml(post) : '';
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = `
      <div id="post-header">
        <h2 id="post-title">${escapeHtml(post.title || '제목 없음')}</h2>
        ${metaHtml}
      </div>
      <div id="post-content">
        <div id="post-message">${bodyHtml || '<span style="color:#999;">내용이 없습니다.</span>'}</div>
      </div>
    `;

    const postMessage = document.getElementById('post-message');
    if (postMessage) attachProsConsTTS(postMessage);

    if (typeof initViewpostLike === 'function') {
      initViewpostLike({
        entryId: post._id,
        likes: post.likes,
        apiBaseUrl: API_BASE_URL,
        board: 'pros-cons'
      });
    }
  } catch (error) {
    console.error('Error while loading post:', error);
    showError(
      '게시글을 불러올 수 없습니다',
      `백엔드 서버(${API_BASE_URL})가 실행 중인지 확인해주세요.<br><br><strong>에러:</strong> ${error.message}`
    );
  }
}

loadPost();
