// https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app
// https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app

document.addEventListener('DOMContentLoaded', () => {
    // 기본적으로 모든 form 숨기기
    document.getElementById('write-post-container').style.display = 'none';
    document.getElementById('edit-post-container').style.display = 'none';

    // URL 파라미터 확인
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') === 'true') {
        document.getElementById('edit-id').value = params.get('id');
        document.getElementById('edit-title').value = decodeURIComponent(params.get('title'));
        document.getElementById('edit-message').value = decodeURIComponent(params.get('message'));
        document.getElementById('edit-nickname').value = decodeURIComponent(params.get('nickname'));
        document.getElementById('edit-isSecret').checked = params.get('isSecret') === 'true';
        
        document.getElementById('edit-post-container').style.display = 'block';
    }

    document.getElementById('write-post-button').addEventListener('click', () => {
        document.getElementById('write-post-container').style.display = 'block';
        document.getElementById('edit-post-container').style.display = 'none';
    });

    document.getElementById('guestbook-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const message = document.getElementById('message').value;
        const nickname = document.getElementById('nickname').value;
        const password = document.getElementById('password').value;
        const isSecret = document.getElementById('isSecret').checked;

        try {
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/guestbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, message, nickname, password, isSecret })
            });

            if (response.ok) {
                loadMessages();
                document.getElementById('guestbook-form').reset();
                document.getElementById('write-post-container').style.display = 'none';
            } else {
                const errorData = await response.json();
                console.error('Failed to save guestbook entry:', errorData.error);
            }
        } catch (error) {
            console.error('Error while submitting guestbook entry:', error);
        }
    });

    document.getElementById('edit-guestbook-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('edit-id').value;
        const title = document.getElementById('edit-title').value;
        const message = document.getElementById('edit-message').value;
        const nickname = document.getElementById('edit-nickname').value;
        const password = document.getElementById('edit-password').value;
        const isSecret = document.getElementById('edit-isSecret').checked;

        try {
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/updatepost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, password, title, message, nickname, isSecret })
            });

            if (response.ok) {
                loadMessages();
                document.getElementById('edit-guestbook-form').reset();
                document.getElementById('edit-post-container').style.display = 'none'; // ***
                document.getElementById('write-post-container').style.display = 'none'; // ***
            } else {
                const errorData = await response.json();
                console.error('Failed to update guestbook entry:', errorData.error);
            }
        } catch (error) {
            console.error('Error while updating guestbook entry:', error);
        }
    });

    async function loadMessages() {
        try {
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/guestbook');
            if (!response.ok) {
                throw new Error('Failed to load messages');
            }
            const messages = await response.json();
            const list = document.getElementById('guestbook-list');
            list.innerHTML = '';
            const total = messages.entries.length;
            const reversedEntries = [...messages.entries].reverse();
            reversedEntries.forEach((entry, idx) => {
                const item = document.createElement('div');
                item.className = 'guestbook-item';
                const number = total - idx;
                const originalIndex = total - 1 - idx;
                item.innerHTML = `
                  <div class="item-title">
                    <span class="item-number">${number}.</span> <a href="page30_viewpost.html?index=${originalIndex}">${entry.title}</a>
                  </div>
                  <div class="item-meta">
                    <span class="item-author">${entry.nickname}</span>
                    <span class="item-time">${new Date(entry.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    <span class="item-views">조회 ${entry.views}</span>
                  </div>
                `;
                list.appendChild(item);
            });
        } catch (error) {
            console.error('Error while loading messages:', error);
        }
    }

    window.deletePost = async function (id) {
        const password = prompt('Enter password to delete this post:');
        if (password) {
            try {
                const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/deletepost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, password })
                });

                if (response.ok) {
                    loadMessages();
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error while deleting post:', error);
            }
        }
    };

    window.editPost = async function (id) {
        const password = prompt('Enter password to edit this post:');
        if (password) {
            try {
                const response = await fetch(`https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/viewpost`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    const entry = data.entry;

                    document.getElementById('edit-id').value = entry._id;
                    document.getElementById('edit-title').value = entry.title;
                    document.getElementById('edit-message').value = entry.message;
                    document.getElementById('edit-nickname').value = entry.nickname;
                    document.getElementById('edit-isSecret').checked = entry.isSecret;

                    document.getElementById('write-post-container').style.display = 'none';
                    document.getElementById('edit-post-container').style.display = 'block';
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error while fetching post for edit:', error);
            }
        }
    };

    window.adminDeletePost = async function (id) {
        const adminPasswordInput = prompt('Enter admin password to delete this post:');
        if (adminPasswordInput) {
            try {
                const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/admin/deletepost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, adminPasswordInput })
                });

                if (response.ok) {
                    loadMessages();
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error while deleting post as admin:', error);
            }
        }
    };

    loadMessages();
});


