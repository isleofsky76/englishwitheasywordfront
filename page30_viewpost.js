// //https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app

// API 베이스 URL 설정 (로컬/프로덕션 자동 전환)
// URL 파라미터로 강제 설정 가능: ?api=local 또는 ?api=prod
let API_BASE_URL;
const urlParams = new URLSearchParams(window.location.search);
const apiMode = urlParams.get('api'); // 'local' 또는 'prod'로 강제 설정 가능

if (apiMode === 'prod') {
    // URL 파라미터로 프로덕션 강제 지정
    API_BASE_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
    console.log('🟢 Production 모드 (강제) - API_BASE_URL:', API_BASE_URL);
} else if (apiMode === 'local') {
    // URL 파라미터로 로컬 강제 지정
    API_BASE_URL = `http://${window.location.hostname}:3000`;
    console.log('🔵 Localhost 모드 (강제) - API_BASE_URL:', API_BASE_URL);
} else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // 자동 감지: 로컬 호스트면 로컬 API 사용
    API_BASE_URL = `http://${window.location.hostname}:3000`;
    console.log('🔵 Localhost 모드 (자동) - API_BASE_URL:', API_BASE_URL);
    console.log('💡 프로덕션 API를 사용하려면 URL에 ?api=prod 를 추가하세요');
} else {
    // 자동 감지: 프로덕션 호스트면 프로덕션 API 사용
    API_BASE_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
    console.log('🟢 Production 모드 (자동) - API_BASE_URL:', API_BASE_URL);
}

// HTML 이스케이프 헬퍼 함수 (전역)
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 안전한 HTML 태그만 허용하는 함수
function sanitizeHtml(html) {
    if (!html) return html;
    const div = document.createElement('div');
    div.innerHTML = html;
    
    // 허용된 태그와 속성
    const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div', 'a', 'img'];
    const allowedAttributes = ['style', 'href', 'target', 'rel', 'src', 'alt', 'loading', 'decoding', 'onerror'];
    
    // 위험한 태그 제거
    const allElements = div.querySelectorAll('*');
    allElements.forEach(el => {
        if (!allowedTags.includes(el.tagName.toLowerCase())) {
            el.replaceWith(el.textContent);
        } else {
            // 허용되지 않은 속성 제거
            Array.from(el.attributes).forEach(attr => {
                if (!allowedAttributes.includes(attr.name.toLowerCase())) {
                    el.removeAttribute(attr.name);
                }
            });
            // 스크립트 관련 속성 제거
            if (el.onclick || el.onerror) {
                el.removeAttribute('onclick');
                el.removeAttribute('onerror');
            }
        }
    });
    
    return div.innerHTML;
}

// 이미지/동영상 링크를 HTML로 변환하는 함수
function convertMediaLinks(text) {
    if (!text) return text;
    
    // HTML이 포함되어 있는지 확인 (태그가 있는지)
    const hasHtml = /<[^>]+>/.test(text);
    
    // URL 패턴 찾기
    const urlPattern = /(https?:\/\/[^\s<]+)/g;
    let result = hasHtml ? text : escapeHtml(text);
    
    result = result.replace(urlPattern, (url) => {
        // YouTube 링크 처리 (일반 동영상, Shorts, youtu.be 모두 포함)
        const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
        const youtubeMatch = url.match(youtubeRegex);
        if (youtubeMatch) {
            const videoId = youtubeMatch[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
            return `<div class="video-preview-container" style="position: relative; max-width: 100%; margin: 10px 0; cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); z-index: 1;">
                <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3); touch-action: manipulation; position: relative; z-index: 10;">
                    <div class="video-thumbnail" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000;">
                        <img src="${thumbnailUrl}" alt="YouTube Video" loading="lazy" decoding="async" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none;" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
                        <div class="play-button" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background: rgba(23, 35, 34, 0.9); border-radius: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.3s; pointer-events: none; z-index: 2;">
                            <div style="width: 0; height: 0; border-left: 24px solid white; border-top: 14px solid transparent; border-bottom: 14px solid transparent; margin-left: 6px;"></div>
                        </div>
                    </div>
                </a>
            </div>`;
        }
        
        // Vimeo 링크 처리
        const vimeoRegex = /vimeo\.com\/(\d+)/;
        const vimeoMatch = url.match(vimeoRegex);
        if (vimeoMatch) {
            const videoId = vimeoMatch[1];
            const vimeoUrl = `https://vimeo.com/${videoId}`;
            return `<div class="video-preview-container" style="position: relative; max-width: 100%; margin: 10px 0; cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); z-index: 1;">
                <a href="${vimeoUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3); touch-action: manipulation; position: relative; z-index: 10;">
                    <div class="video-thumbnail" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center;">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); pointer-events: none;"></div>
                        <div class="play-button" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background: rgba(255, 255, 255, 0.9); border-radius: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.3s; pointer-events: none; z-index: 2;">
                            <div style="width: 0; height: 0; border-left: 20px solid #667eea; border-top: 12px solid transparent; border-bottom: 12px solid transparent; margin-left: 4px;"></div>
                        </div>
                        <div style="position: absolute; bottom: 10px; left: 10px; color: white; font-size: 14px; font-weight: 600; pointer-events: none;">Vimeo Video</div>
                    </div>
                </a>
            </div>`;
        }
        
        // Base64 이미지 처리 (data:image로 시작)
        if (url.startsWith('data:image/')) {
            return `<img src="${url}" alt="Image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; display: block;">`;
        }
        
        // 이미지 링크 처리 (지연 로딩 최적화)
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
        if (imageExtensions.test(url)) {
            return `<img src="${url}" alt="Image" loading="lazy" decoding="async" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; display: block;" onerror="this.style.display='none';">`;
        }
        
        // 일반 링크는 그대로 유지 (모바일 터치 최적화)
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 4px 6px; margin: 2px; -webkit-tap-highlight-color: rgba(43, 108, 176, 0.3); touch-action: manipulation; cursor: pointer; position: relative; z-index: 10;">${url}</a>`;
    });
    
    // HTML이 없는 경우에만 이스케이프 처리
    if (!hasHtml) {
        // HTML 태그가 아닌 부분만 이스케이프 처리
        result = result.replace(/([^<]+)(?![^<]*>)/g, (match) => {
            // 이미 HTML 태그인 부분은 그대로 유지
            if (match.trim().startsWith('<')) {
                return match;
            }
            return escapeHtml(match);
        });
    }
    
    // 안전한 HTML만 허용
    result = sanitizeHtml(result);
    
    // 줄바꿈 처리
    result = result.replace(/\n/g, '<br>');
    
    return result;
}

// 로딩 상태 표시 함수
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

// 에러 메시지 표시 함수
function showError(message, details = '') {
    const postContainer = document.getElementById('post-container');
    const apiParam = apiMode ? `?api=${apiMode}` : '';
    postContainer.innerHTML = `
        <div style="text-align: center; padding: 30px; color: #d32f2f; background-color: #ffebee; border-radius: 8px; margin: 20px;">
            <p style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px;">⚠️ ${message}</p>
            ${details ? `<p style="font-size: 0.9em; color: #666; margin-top: 10px;">${details}</p>` : ''}
            <button class="btn btn-primary mt-3" onclick="window.location.href='page30_guestbook.html${apiParam}'">목록으로 돌아가기</button>
        </div>
    `;
}

async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');

    if (!index) {
        showError('게시글을 찾을 수 없습니다', 'index 파라미터가 없습니다.');
        return;
    }

    // 로딩 상태 표시
    showLoading();

    try {
        const url = `${API_BASE_URL}/guestbook`;
        console.log('📡 API 요청 URL:', url);
        const response = await fetch(url);
        console.log('📥 응답 상태:', response.status, response.statusText);

        if (!response.ok) {
            if (response.status === 503) {
                const errorData = await response.json();
                showError('데이터베이스 연결 오류', 
                    `${errorData.error || 'MongoDB 연결이 되지 않았습니다.'}<br><br>
                    <strong>해결 방법:</strong><br>
                    1. MongoDB 서비스가 실행 중인지 확인<br>
                    2. backend/.env 파일의 MONGO_URI 설정 확인<br>
                    3. 백엔드 서버를 재시작`);
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const messages = await response.json();
        console.log('📦 응답 데이터:', messages);

        // API 응답 형식 확인 및 정규화
        let entries = [];
        if (Array.isArray(messages)) {
            entries = messages;
        } else if (messages.entries && Array.isArray(messages.entries)) {
            entries = messages.entries;
        } else if (messages.data && Array.isArray(messages.data)) {
            entries = messages.data;
        } else {
            console.error('⚠️ 예상치 못한 응답 형식:', messages);
            showError('게시글을 불러올 수 없습니다', '서버 응답 형식이 올바르지 않습니다.');
            return;
        }

        const indexNum = parseInt(index, 10);
        if (isNaN(indexNum) || indexNum < 0 || indexNum >= entries.length) {
            showError('게시글을 찾을 수 없습니다', `인덱스 ${index}에 해당하는 게시글이 없습니다. (총 ${entries.length}개)`);
            return;
        }

        // 목록에서 전달된 index는 원본 배열 기준이므로 직접 사용
        // 목록에서는 역순으로 표시하지만, index는 total - 1 - idx로 계산되어 원본 배열의 인덱스입니다
        const post = entries[indexNum];
        
        if (!post) {
            showError('게시글을 찾을 수 없습니다', `인덱스 ${indexNum}에 해당하는 게시글이 없습니다.`);
            return;
        }
        
        console.log(`📌 인덱스 ${indexNum}로 게시글 찾기 (총 ${entries.length}개)`);

        console.log('📝 로드된 게시글:', post);
        console.log('📅 게시글 날짜 정보:', post.date, typeof post.date);

        // 게시글 표시 - HTML 구조를 다시 생성
        const postContainer = document.getElementById('post-container');
        
        let postDate;
        let formattedDate = 'Date not available';
        
        if (post.date) {
            try {
                postDate = new Date(post.date);
                console.log('📅 파싱된 날짜:', postDate);
                // 유효한 날짜인지 확인
                if (isNaN(postDate.getTime())) {
                    console.warn('유효하지 않은 날짜:', post.date);
                    formattedDate = 'Date not available';
                } else {
                    // 형식: "2025.12.29  17:00" (날짜와 시간 사이 공백 2개)
                    const year = postDate.getFullYear();
                    const month = ('0' + (postDate.getMonth() + 1)).slice(-2);
                    const day = ('0' + postDate.getDate()).slice(-2);
                    const hours = ('0' + postDate.getHours()).slice(-2);
                    const minutes = ('0' + postDate.getMinutes()).slice(-2);
                    formattedDate = `${year}.${month}.${day}  ${hours}:${minutes}`;
                    console.log('📅 포맷된 날짜:', formattedDate);
                }
            } catch (e) {
                console.error('날짜 파싱 오류:', e, post.date);
                formattedDate = 'Date not available';
            }
        } else {
            console.warn('게시글에 날짜 정보가 없습니다:', post);
            // 날짜가 없으면 현재 시간 사용 (임시)
            formattedDate = new Date().toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }).replace(/\. /g, '.').replace(/\.$/, '');
        }

        // 이미지/동영상 링크 변환하여 표시
        const convertedMessage = convertMediaLinks(post.message || '');
        console.log('원본 메시지:', post.message);
        console.log('변환된 메시지:', convertedMessage);
        
        // HTML 구조 재생성
        postContainer.innerHTML = `
            <div id="post-header">
                <h2 id="post-title">${escapeHtml(post.title || '제목 없음')}</h2>
                <p id="post-meta">Author: ${escapeHtml(post.nickname || 'Anonymous')} | Date: ${formattedDate} | Views: ${post.views || 0}</p>
            </div>
            <div id="post-content">
                <p id="post-message">${convertedMessage || '<span style="color: #999;">내용이 없습니다.</span>'}</p>
            </div>
        `;
        
        // 게시글 내용 복사 시 HTML 태그 제거하고 순수 텍스트만 복사
        const postMessage = document.getElementById('post-message');
        if (postMessage) {
            postMessage.addEventListener('copy', (e) => {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    // 선택된 영역의 순수 텍스트만 추출
                    const selectedText = range.toString();
                    
                    // 클립보드에 순수 텍스트만 넣기
                    e.clipboardData.setData('text/plain', selectedText);
                    e.preventDefault(); // 기본 동작 방지 (HTML 복사 방지)
                }
            });
        }

        // 버튼 기능 연결
        document.getElementById('backBtn').onclick = () => {
            const apiParam = apiMode ? `?api=${apiMode}` : '';
            window.location.href = `page30_guestbook.html${apiParam}`;
        };
        
        document.getElementById('editBtn').onclick = async () => {
            const password = prompt('비밀번호를 입력하세요:');
            if (!password) return;
            
            try {
                const response = await fetch(`${API_BASE_URL}/viewpost`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: post._id, password })
                });
                if (response.ok) {
                    const data = await response.json();
                    const entry = data.entry;
                    
                    // 수정 폼에 데이터 채우기
                    document.getElementById('edit-id').value = entry._id;
                    document.getElementById('edit-title').value = entry.title;
                    document.getElementById('edit-message').value = entry.message;
                    document.getElementById('edit-nickname').value = entry.nickname;
                    document.getElementById('edit-isSecret').checked = entry.isSecret;
                    
                    // 게시글 컨테이너 숨기고 수정 폼 표시
                    document.getElementById('post-container').style.display = 'none';
                    document.getElementById('viewpost-actions').style.display = 'none';
                    document.getElementById('edit-post-container').style.display = 'block';
                    
                    // 페이지 상단으로 스크롤 (수정 폼이 전체 화면을 차지하므로)
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const errorData = await response.json();
                    alert(`오류: ${errorData.error || '게시글을 불러올 수 없습니다.'}`);
                }
            } catch (error) {
                console.error('Error while fetching post for edit:', error);
                alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
            }
        };
        
        // 수정 폼 제출 처리
        document.getElementById('edit-guestbook-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const form = event.target;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // 로딩 상태 표시
            submitButton.disabled = true;
            submitButton.textContent = '수정 중...';
            
            const id = document.getElementById('edit-id').value;
            const title = document.getElementById('edit-title').value.trim();
            const message = document.getElementById('edit-message').value.trim();
            const nickname = document.getElementById('edit-nickname').value.trim();
            const password = document.getElementById('edit-password').value;
            const isSecret = document.getElementById('edit-isSecret').checked;

            try {
                const response = await fetch(`${API_BASE_URL}/updatepost`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, password, title, message, nickname, isSecret })
                });

                if (response.ok) {
                    // 수정 완료 후 페이지 새로고침
                    const apiParam = apiMode ? `&api=${apiMode}` : '';
                    window.location.href = `${window.location.pathname}?index=${window.currentIndex}${apiParam}`;
                } else {
                    const errorData = await response.json();
                    alert(`오류: ${errorData.error || '게시글 수정에 실패했습니다.'}`);
                    submitButton.textContent = originalButtonText;
                }
            } catch (error) {
                console.error('Error while updating guestbook entry:', error);
                alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
                submitButton.textContent = originalButtonText;
            } finally {
                submitButton.disabled = false;
            }
        });
        
        // Cancel 버튼 처리
        document.getElementById('cancelEditBtn').onclick = () => {
            document.getElementById('edit-post-container').style.display = 'none';
            document.getElementById('post-container').style.display = 'block';
            document.getElementById('viewpost-actions').style.display = 'flex';
            document.getElementById('edit-guestbook-form').reset();
        };
        
        document.getElementById('deleteBtn').onclick = async () => {
            const password = prompt('비밀번호를 입력하세요:');
            if (!password) return;
            
            if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
            
            try {
                const response = await fetch(`${API_BASE_URL}/deletepost`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: post._id, password })
                });
                if (response.ok) {
                    alert('게시글이 삭제되었습니다.');
                    const apiParam = apiMode ? `?api=${apiMode}` : '';
                    window.location.href = `page30_guestbook.html${apiParam}`;
                } else {
                    const errorData = await response.json();
                    alert(`오류: ${errorData.error || '게시글 삭제에 실패했습니다.'}`);
                }
            } catch (error) {
                console.error('Error while deleting post:', error);
                alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
            }
        };

    } catch (error) {
        console.error('❌ Error while loading post:', error);
        showError('게시글을 불러올 수 없습니다', 
            `백엔드 서버(${API_BASE_URL})가 실행 중인지 확인해주세요.<br><br>
            <strong>에러 메시지:</strong> ${error.message}`);
    }
}

loadPost();

