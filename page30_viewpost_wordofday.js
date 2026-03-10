// Word of the Day view post - uses /wordofday API and wordofday collection
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

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function sanitizeHtml(html) {
    if (!html) return html;
    const div = document.createElement('div');
    div.innerHTML = html;
    const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div', 'a', 'img'];
    // Word of the Day 전용 카드(wotd-card 등)를 위해 class 속성 허용
    const allowedAttributes = ['class', 'style', 'href', 'target', 'rel', 'src', 'alt', 'loading', 'decoding', 'onerror'];
    div.querySelectorAll('*').forEach(el => {
        if (!allowedTags.includes(el.tagName.toLowerCase())) {
            el.replaceWith(el.textContent);
        } else {
            Array.from(el.attributes).forEach(attr => {
                if (!allowedAttributes.includes(attr.name.toLowerCase())) el.removeAttribute(attr.name);
            });
        }
    });
    return div.innerHTML;
}

function convertMediaLinks(text) {
    if (!text) return text;
    const hasHtml = /<[^>]+>/.test(text);
    const urlPattern = /(https?:\/\/[^\s<>"'\n\r()]+)/g;
    let result = hasHtml ? text : escapeHtml(text);
    result = result.replace(urlPattern, (url) => {
        const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
        const youtubeMatch = url.match(youtubeRegex);
        if (youtubeMatch) {
            const videoId = youtubeMatch[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
            return `<div class="video-preview-container" style="position: relative; max-width: 100%; margin: 10px 0; cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;"><div class="video-thumbnail" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000;"><img src="${thumbnailUrl}" alt="YouTube Video" loading="lazy" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'"></div></a></div>`;
        }
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
        if (imageExtensions.test(url)) {
            return `<img src="${url}" alt="Image" loading="lazy" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; display: block;">`;
        }
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
    // 이미 HTML 구조가 있는 경우(이번 Word of the Day 카드처럼)는
    // 줄바꿈을 <br>로 바꾸지 않아서 불필요한 공백이 생기지 않게 함
    if (!hasHtml) {
        result = result.replace(/\n/g, '<br>');
    }
    return sanitizeHtml(result);
}

function showLoading() {
    document.getElementById('post-container').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;"></div>
            <p style="margin-top: 15px; color: #666;">게시글을 불러오는 중...</p>
        </div>`;
}

function showError(message, details = '') {
    const apiParam = apiMode ? `?api=${apiMode}` : '';
    document.getElementById('post-container').innerHTML = `
        <div style="text-align: center; padding: 30px; color: #d32f2f; background-color: #ffebee; border-radius: 8px; margin: 20px;">
            <p style="font-size: 1.2em; font-weight: bold;">⚠️ ${message}</p>
            ${details ? `<p style="font-size: 0.9em; color: #666;">${details}</p>` : ''}
            <button class="btn btn-primary mt-3" onclick="window.location.href='page30_guestbook_wordofday.html${apiParam}'">목록으로 돌아가기</button>
        </div>`;
}

async function loadPost() {
    const index = new URLSearchParams(window.location.search).get('index');
    if (!index) {
        showError('게시글을 찾을 수 없습니다', 'index 파라미터가 없습니다.');
        return;
    }
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/wordofday`);
        if (!response.ok) {
            if (response.status === 503) {
                const errorData = await response.json();
                showError('데이터베이스 연결 오류', errorData.error || 'MongoDB 연결을 확인해주세요.');
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const messages = await response.json();
        let entries = Array.isArray(messages) ? messages : (messages.entries || messages.data || []);
        const indexNum = parseInt(index, 10);
        if (isNaN(indexNum) || indexNum < 0 || indexNum >= entries.length) {
            showError('게시글을 찾을 수 없습니다', `인덱스 ${index}에 해당하는 게시글이 없습니다.`);
            return;
        }
        const post = entries[indexNum];
        window.currentIndex = indexNum;

        try {
            const viewResponse = await fetch(`${API_BASE_URL}/wordofday/${post._id}/view`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            if (viewResponse.ok) {
                const viewData = await viewResponse.json();
                if (viewData.entry && viewData.entry.views !== undefined) post.views = viewData.entry.views;
            }
        } catch (_) {}

        let formattedDate = 'Date not available';
        if (post.date) {
            const d = new Date(post.date);
            if (!isNaN(d.getTime())) {
                formattedDate = `${d.getFullYear()}.${('0' + (d.getMonth() + 1)).slice(-2)}.${('0' + d.getDate()).slice(-2)}  ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
            }
        }
        const convertedMessage = convertMediaLinks(post.message || '');
        const isAdmin = (post.nickname || '').toLowerCase() === 'admin';
        const metaHtml = isAdmin ? '' : `<p id="post-meta">Author: ${escapeHtml(post.nickname || 'Anonymous')} | Date: ${formattedDate} | Views: ${post.views || 0}</p>`;
        document.getElementById('post-container').innerHTML = `
            <div id="post-header">
                <h2 id="post-title">${escapeHtml(post.title || '제목 없음')}</h2>
                ${metaHtml}
            </div>
            <div id="post-content">
                <div id="post-message">${convertedMessage || '<span style="color: #999;">내용이 없습니다.</span>'}</div>
            </div>`;

        document.getElementById('backBtn').onclick = () => {
            window.location.href = `page30_guestbook_wordofday.html${apiMode ? '?api=' + apiMode : ''}`;
        };

        document.getElementById('editBtn').onclick = async () => {
            const password = prompt('비밀번호를 입력하세요:');
            if (!password) return;
            try {
                const res = await fetch(`${API_BASE_URL}/wordofday-viewpost`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: post._id, password })
                });
                if (res.ok) {
                    const data = await res.json();
                    const entry = data.entry;
                    document.getElementById('edit-id').value = entry._id;
                    document.getElementById('edit-title').value = entry.title;
                    document.getElementById('edit-message').value = entry.message;
                    document.getElementById('edit-nickname').value = entry.nickname;
                    document.getElementById('edit-isSecret').checked = entry.isSecret;
                    document.getElementById('post-container').style.display = 'none';
                    document.getElementById('viewpost-actions').style.display = 'none';
                    document.getElementById('edit-post-container').style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const err = await res.json();
                    alert(`오류: ${err.error || '게시글을 불러올 수 없습니다.'}`);
                }
            } catch (e) {
                alert('네트워크 오류가 발생했습니다.');
            }
        };

        document.getElementById('edit-guestbook-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = '수정 중...';
            try {
                const res = await fetch(`${API_BASE_URL}/wordofday-updatepost`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: document.getElementById('edit-id').value,
                        password: document.getElementById('edit-password').value,
                        title: document.getElementById('edit-title').value.trim(),
                        message: document.getElementById('edit-message').value.trim(),
                        nickname: document.getElementById('edit-nickname').value.trim(),
                        isSecret: document.getElementById('edit-isSecret').checked
                    })
                });
                if (res.ok) {
                    const apiParam = apiMode ? `&api=${apiMode}` : '';
                    window.location.href = `${window.location.pathname}?index=${window.currentIndex}${apiParam}`;
                } else {
                    const err = await res.json();
                    alert(`오류: ${err.error || '수정에 실패했습니다.'}`);
                    btn.textContent = 'Update';
                }
            } catch (_) {
                alert('네트워크 오류');
                btn.textContent = 'Update';
            }
            btn.disabled = false;
        });

        document.getElementById('cancelEditBtn').onclick = () => {
            document.getElementById('edit-post-container').style.display = 'none';
            document.getElementById('post-container').style.display = 'block';
            document.getElementById('viewpost-actions').style.display = 'flex';
            document.getElementById('edit-guestbook-form').reset();
        };

        document.getElementById('deleteBtn').onclick = async () => {
            const password = prompt('비밀번호를 입력하세요:');
            if (!password || !confirm('정말 삭제하시겠습니까?')) return;
            try {
                const res = await fetch(`${API_BASE_URL}/wordofday-deletepost`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: post._id, password })
                });
                if (res.ok) {
                    alert('삭제되었습니다.');
                    window.location.href = `page30_guestbook_wordofday.html${apiMode ? '?api=' + apiMode : ''}`;
                } else {
                    const err = await res.json();
                    alert(`오류: ${err.error || '삭제에 실패했습니다.'}`);
                }
            } catch (_) {
                alert('네트워크 오류');
            }
        };
    } catch (error) {
        showError('게시글을 불러올 수 없습니다', error.message);
    }
}

loadPost();
