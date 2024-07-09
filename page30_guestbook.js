document.addEventListener('DOMContentLoaded', () => {
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
            const response = await fetch('http://localhost:3000/guestbook', {
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
            const response = await fetch('http://localhost:3000/updatepost', {
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
            const response = await fetch('http://localhost:3000/guestbook');
            if (!response.ok) {
                throw new Error('Failed to load messages');
            }
            const messages = await response.json();
            const messagesContainer = document.getElementById('messages');
            messagesContainer.innerHTML = '';
            const today = new Date().toDateString();

            messages.entries.forEach((entry, index) => {
                const postDate = new Date(entry.date);
                const isToday = postDate.toDateString() === today;

                const formattedDate = isToday
                    ? `${('0' + (postDate.getMonth() + 1)).slice(-2)}/${('0' + postDate.getDate()).slice(-2)} ${postDate.getHours().toString().padStart(2, '0')}:${postDate.getMinutes().toString().padStart(2, '0')}`
                    : `${('0' + (postDate.getMonth() + 1)).slice(-2)}/${('0' + postDate.getDate()).slice(-2)}`;

                const msgDiv = document.createElement('tr');
                msgDiv.innerHTML = `
                    <td>${index + 1}</td>
                    <td><a href="page30_viewpost.html?index=${index}">${entry.title}</a></td>
                    <td>${entry.nickname}</td>
                    <td>${formattedDate}</td>
                    <td>${entry.views}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deletePost('${entry._id}')">Del</button>
                        <button class="btn btn-warning" onclick="editPost('${entry._id}')">Edit</button>
                        <button class="btn btn-danger2" onclick="adminDeletePost('${entry._id}')">Adm</button>
                    </td>
                `;
                messagesContainer.appendChild(msgDiv);
            });
        } catch (error) {
            console.error('Error while loading messages:', error);
        }
    }

    window.deletePost = async function (id) {
        const password = prompt('Enter password to delete this post:');
        if (password) {
            try {
                const response = await fetch('http://localhost:3000/deletepost', {
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
                const response = await fetch(`http://localhost:3000/viewpost`, {
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
                const response = await fetch('http://localhost:3000/admin/deletepost', {
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
