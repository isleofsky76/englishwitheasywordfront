async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');

    const response = await fetch('http://localhost:3000/guestbook');
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
            Author: ${post.nickname} | Date: ${formattedDate} | Views: 0
        `;
        document.getElementById('post-message').textContent = post.message;
    } else {
        alert('Post not found.');
    }
}

loadPost();
