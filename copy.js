function copyToClipboard() {
    const outputArea = document.getElementById('outputArea');
    const textToCopy = outputArea.innerText;

    // 텍스트를 클립보드로 복사
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('예문이 복사되었습니다!');
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}



function copyToClipboard() {
    const outputArea = document.getElementById('adviceDisplay');
    const textToCopy = outputArea.innerText;

    // 텍스트를 클립보드로 복사
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('예문이 복사되었습니다!');
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}


function copyToClipboard() {
    const outputArea = document.getElementById('chatMessages');
    const textToCopy = outputArea.innerText;

    // 텍스트를 클립보드로 복사
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('예문이 복사되었습니다!');
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}