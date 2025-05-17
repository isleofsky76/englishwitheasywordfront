//https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app

async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');

    const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/guestbook');
    const messages = await response.json();

    if (index >= 0 && index < messages.entries.length) {
        const post = messages.entries[index];
        const postContainer = document.getElementById('post-container');

        const today = new Date();
        const postDate = new Date(post.date);
        const isToday = today.toDateString() === postDate.toDateString();

        const formattedDate = isToday
            ? postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : `${('0' + (postDate.getMonth() + 1)).slice(-2)}${('0' + postDate.getDate()).slice(-2)}`;

        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-meta').innerHTML = `
            Author: ${post.nickname} | Date: ${formattedDate} | Views: ${post.views}
        `;
        document.getElementById('post-message').textContent = post.message;

        // 버튼 기능 연결
        document.getElementById('backBtn').onclick = () => {
            window.location.href = 'page30_guestbook.html';
        };
        document.getElementById('editBtn').onclick = async () => {
            const password = prompt('Enter password to edit this post:');
            if (password) {
                try {
                    const response = await fetch(`https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/viewpost`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: post._id, password })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        const entry = data.entry;
                        
                        // edit form으로 이동하면서 데이터 전달
                        window.location.href = `page30_guestbook.html?edit=true&id=${entry._id}&title=${encodeURIComponent(entry.title)}&message=${encodeURIComponent(entry.message)}&nickname=${encodeURIComponent(entry.nickname)}&isSecret=${entry.isSecret}`;
                    } else {
                        const errorData = await response.json();
                        alert(`Error: ${errorData.error}`);
                    }
                } catch (error) {
                    alert('Error while fetching post for edit.');
                }
            }
        };
        document.getElementById('deleteBtn').onclick = async () => {
            const password = prompt('Enter password to delete this post:');
            if (password) {
                try {
                    const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/deletepost', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: post._id, password })
                    });
                    if (response.ok) {
                        alert('Post deleted.');
                        window.location.href = 'page30_guestbook.html';
                    } else {
                        const errorData = await response.json();
                        alert(`Error: ${errorData.error}`);
                    }
                } catch (error) {
                    alert('Error while deleting post.');
                }
            }
        };
    } else {
        alert('Post not found.');
    }
}

loadPost();

