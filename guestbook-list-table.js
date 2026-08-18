/**
 * 게시판 목록 공통 카드 렌더러
 * 사용: renderGuestbookTable(container, messages, { postPage, apiMode, board, apiBaseUrl })
 */
(function () {
  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/"/g, '&quot;');
  }

  function formatDateTime(dateStr) {
    if (!dateStr) return '-';
    try {
      var date = new Date(dateStr);
      if (isNaN(date.getTime())) return '-';
      var y = date.getFullYear();
      var m = ('0' + (date.getMonth() + 1)).slice(-2);
      var d = ('0' + date.getDate()).slice(-2);
      var h = ('0' + date.getHours()).slice(-2);
      var min = ('0' + date.getMinutes()).slice(-2);
      return y + '.' + m + '.' + d + ' ' + h + ':' + min;
    } catch (e) {
      return '-';
    }
  }

  function isValidObjectId(id) {
    return /^[a-f0-9]{24}$/i.test(String(id || ''));
  }

  function hasUserLiked(entryId) {
    return localStorage.getItem('gb-like-' + entryId) === '1';
  }

  function getLikeDisplayCount(serverLikes) {
    return parseInt(serverLikes, 10) || 0;
  }

  function entryHasImage(entry) {
    var msg = entry && entry.message ? String(entry.message) : '';
    if (!msg) return false;
    return /<img[\s>]/i.test(msg) || /data:image\//i.test(msg);
  }

  var IMAGE_BADGE_HTML =
    '<span class="gb-img-badge" title="이미지 포함" aria-label="이미지 포함">' +
    '<svg class="gb-img-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">' +
    '<rect x="1.5" y="0.5" width="13" height="15" rx="1" fill="#ffffff" stroke="#a0a0a0" stroke-width="0.7"/>' +
    '<path d="M1.5 0.5h3.2v3.2H1.5z" fill="#e8e8e8" stroke="#a0a0a0" stroke-width="0.5"/>' +
    '<rect x="3.2" y="4.2" width="9.6" height="7.2" rx="0.4" fill="#7eb6f7"/>' +
    '<circle cx="5.4" cy="6.1" r="1" fill="#f5c842"/>' +
    '<path d="M3.2 10.8 L5.9 8.1 L7.8 9.6 L10.2 7 L12.8 9.1 V11.4 H3.2 Z" fill="#5cb85c"/>' +
    '</svg></span>';

  function splitSourceTitle(rawTitle) {
    var text = String(rawTitle || '제목 없음');
    var match = text.match(/^\[([^\]]+)\]\s*(.*)$/);
    if (!match) return { source: '', title: text };
    return {
      source: String(match[1] || '').trim(),
      title: String(match[2] || '').trim() || text
    };
  }

  function sourceBadgeClass(source) {
    var key = String(source || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    if (key === 'wsj') return 'gb-badge--wsj';
    if (key === 'cnn') return 'gb-badge--cnn';
    if (key === 'bbc') return 'gb-badge--bbc';
    return 'gb-badge--source';
  }

  function buildShareLinks(url, title) {
    var xUrl = 'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(title + ' ') + '&url=' + encodeURIComponent(url);
    var mailUrl = 'mailto:?subject=' +
      encodeURIComponent(title) + '&body=' + encodeURIComponent(url);
    return '<span class="gb-share-group">' +
      '<a class="gb-action-btn gb-share-x" href="' + escapeAttr(xUrl) + '" target="_blank" rel="noopener noreferrer" title="X에 공유">𝕏</a>' +
      '<a class="gb-action-btn gb-share-email" href="' + escapeAttr(mailUrl) + '" title="이메일로 공유">✉</a>' +
      '</span>';
  }

  function buildPostHref(entry, originalIndex, postPage, apiParam, postPath) {
    var slug = entry && String(entry.slug || '').trim();
    if (slug && postPage === 'popular-voca.html') {
      var hrefPopular = 'popular-voca/' + encodeURIComponent(slug) + '/';
      if (apiParam) hrefPopular += '?' + String(apiParam).replace(/^&/, '');
      return hrefPopular;
    }
    if (slug && postPath) {
      var hrefPath = postPath + '/' + encodeURIComponent(slug) + '/';
      if (apiParam) hrefPath += '?' + String(apiParam).replace(/^&/, '');
      return hrefPath;
    }
    if (slug) {
      return postPage + '?slug=' + encodeURIComponent(slug) + apiParam;
    }
    return postPage + '?index=' + originalIndex + apiParam;
  }

  function buildCardMeta(dateTimeStr, views, likeCount) {
    return '<div class="gb-card-meta">' +
      '<span class="gb-meta-item"><span class="gb-meta-icon" aria-hidden="true">📅</span>' +
      '<time class="gb-meta-date">' + escapeHtml(dateTimeStr) + '</time></span>' +
      '<span class="gb-meta-item"><span class="gb-meta-icon" aria-hidden="true">👁</span>' +
      '<span class="gb-meta-views">' + views + '</span> 조회</span>' +
      '<span class="gb-meta-item"><span class="gb-meta-icon" aria-hidden="true">👍</span>' +
      '<span class="gb-meta-likes">' + likeCount + '</span> 추천</span>' +
      '</div>';
  }

  window.renderGuestbookTable = function (container, messages, options) {
    if (!container) return;

    options = options || {};
    var postPage = options.postPage || 'news-voca.html';
    var postPath = options.postPath || null;
    var apiMode = options.apiMode || null;
    var apiParam = apiMode ? '&api=' + apiMode : '';
    var hideViewsAndLikes = options.hideViewsAndLikes === true;

    if (options.apiBaseUrl) {
      window._gbTableLikeConfig = {
        apiBaseUrl: options.apiBaseUrl,
        board: options.board || 'guestbook'
      };
    }

    if (!messages || !messages.entries || !messages.entries.length) {
      container.innerHTML =
        '<div class="gb-table-empty">게시글이 없습니다.</div>';
      return;
    }

    var total = messages.entries.length;
    var reversedEntries = messages.entries.slice().reverse();
    var rows = reversedEntries.map(function (entry, idx) {
      var originalIndex = total > 0 ? total - 1 - idx : 0;
      if (originalIndex < 0 || originalIndex >= total) return '';

      var number = total - idx;
      var rawTitle = entry.title || '제목 없음';
      var parts = splitSourceTitle(rawTitle);
      var safeTitle = escapeHtml(parts.title);
      var safeSource = escapeHtml(parts.source);
      var dateTimeStr = formatDateTime(entry.date);
      var entryId = String(entry._id || ('idx-' + originalIndex));
      var postHref = buildPostHref(entry, originalIndex, postPage, apiParam, postPath);

      var nickname = entry.nickname || '';
      var safeNickname = escapeHtml(nickname);

      var views = entry.views || 0;
      var likeCount = getLikeDisplayCount(entry.likes);

      var titleCell = safeTitle;
      if (safeSource) {
        titleCell =
          '<span class="gb-title-source">' + safeSource + '</span>' +
          '<span class="gb-title-sep" aria-hidden="true"> | </span>' +
          safeTitle;
      }

      var showViews = hideViewsAndLikes ? '-' : views;
      var showLikes = hideViewsAndLikes ? '-' : likeCount;

      return '<tr class="gb-table-row" data-gb-entry="' + escapeAttr(entryId) + '">' +
        '<td class="gb-td gb-td-num">' + number + '</td>' +
        '<td class="gb-td gb-td-title">' +
          '<a class="gb-title-link" href="' + postHref + '" title="' + escapeAttr(parts.title) + '">' + titleCell + '</a>' +
        '</td>' +
        '<td class="gb-td gb-td-nickname">' + safeNickname + '</td>' +
        '<td class="gb-td gb-td-date">' + escapeHtml(dateTimeStr) + '</td>' +
        '<td class="gb-td gb-td-views">' + showViews + '</td>' +
        '<td class="gb-td gb-td-likes">' + showLikes + '</td>' +
        '</tr>';
    }).join('');

    container.innerHTML =
      '<div class="gb-table-wrap">' +
        '<table class="gb-list-table" role="table" aria-label="게시글 목록">' +
          '<thead>' +
            '<tr>' +
              '<th class="gb-th gb-th-num">번호</th>' +
              '<th class="gb-th gb-th-title">제목</th>' +
              '<th class="gb-th gb-th-nickname">닉네임</th>' +
              '<th class="gb-th gb-th-date">날짜</th>' +
              '<th class="gb-th gb-th-views">조회수</th>' +
              '<th class="gb-th gb-th-likes">추천수</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
      '</div>';
  };

  if (!window._guestbookTableActionsInit) {
    window._guestbookTableActionsInit = true;

    function handleLikeClick(e) {
      var likeBtn = e.target.closest('.gb-like-btn');
      if (!likeBtn || likeBtn.disabled) return;
      e.preventDefault();
      e.stopPropagation();

      var id = likeBtn.dataset.gbLike;
      if (!id || !isValidObjectId(id) || hasUserLiked(id)) return;

      var config = window._gbTableLikeConfig || {};
      var apiBase = config.apiBaseUrl;
      var board = config.board || 'guestbook';
      if (!apiBase) {
        console.warn('좋아요 API URL이 설정되지 않았습니다.');
        return;
      }

      likeBtn.disabled = true;

      fetch(apiBase + '/' + board + '/' + id + '/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          if (!result.ok) {
            throw new Error((result.data && result.data.error) || 'Like request failed');
          }
          var likes = result.data.likes != null ? result.data.likes : 0;
          localStorage.setItem('gb-like-' + id, '1');
          likeBtn.classList.add('is-active');
          likeBtn.title = '이미 좋아요를 눌렀습니다';

          var card = likeBtn.closest('.gb-card');
          var countEl = card && card.querySelector('.gb-like-count');
          if (countEl) countEl.textContent = likes;
          var metaLikesEl = card && card.querySelector('.gb-meta-likes');
          if (metaLikesEl) metaLikesEl.textContent = likes;
        })
        .catch(function (err) {
          console.error('좋아요 저장 실패:', err);
          likeBtn.disabled = false;
          alert('좋아요를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.');
        });
    }

    document.addEventListener('click', handleLikeClick);
    document.addEventListener('touchend', function (e) {
      var likeBtn = e.target.closest('.gb-like-btn');
      if (!likeBtn || likeBtn.disabled) return;
      e.preventDefault();
      e.stopPropagation();
      handleLikeClick(e);
    }, { passive: false });
  }
})();
