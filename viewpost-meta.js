/**
 * 글 상세 — 제목 아래 메타 (작성자 | 날짜 | 조회수)
 */
(function () {
    function escapeMetaHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatPostMetaDate(dateStr) {
        if (!dateStr) return '-';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return '-';
            const y = d.getFullYear();
            const m = ('0' + (d.getMonth() + 1)).slice(-2);
            const day = ('0' + d.getDate()).slice(-2);
            return y + '/' + m + '/' + day;
        } catch {
            return '-';
        }
    }

    window.buildPostMetaHtml = function (post) {
        const author = escapeMetaHtml(post.nickname || '익명');
        const dateStr = formatPostMetaDate(post.date);
        const views = post.views || 0;

        return '<p id="post-meta">' +
            '<span class="post-meta-part post-meta-author">' + author + '</span>' +
            '<span class="post-meta-sep" aria-hidden="true">|</span>' +
            '<span class="post-meta-part post-meta-date">' + dateStr + '</span>' +
            '<span class="post-meta-sep" aria-hidden="true">|</span>' +
            '<span class="post-meta-part">조회수 <span class="post-meta-views-num">' + views + '</span></span>' +
            '</p>';
    };
})();
