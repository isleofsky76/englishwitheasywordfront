document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소
    const elements = {
        saveBtn: document.querySelector('.emoji-tooltip[title="Save"]'),
        downloadBtn: document.querySelector('.emoji-tooltip[title="Download"]'),
        copyBtn: document.querySelector('.emoji-tooltip[title="Copy"]'),
        addRowBtn: document.querySelector('.emoji-tooltip[title="Add Row"]'),
        emptyRowBtn: document.querySelector('.emoji-tooltip[title="Empty Row"]'),
        deleteRowBtn: document.querySelector('.emoji-tooltip[title="Delete Row"]'),
        taskTable: document.getElementById('taskTable').getElementsByTagName('tbody')[0],
        downloadLinkContainer: document.getElementById('downloadLinkContainer')
    };

    // 상태 관리
    const state = {
        selectedRow: null
    };

    // 이벤트 리스너 설정
    function setupEventListeners() {
        elements.saveBtn.addEventListener('click', saveToLocalStorage);
        elements.downloadBtn.addEventListener('click', handleDownload);
        elements.copyBtn.addEventListener('click', copyToClipboard);
        elements.addRowBtn.addEventListener('click', () => {
            addNewRow();
            saveToLocalStorage();
        });
        elements.emptyRowBtn.addEventListener('click', emptySelectedRow);
        elements.deleteRowBtn.addEventListener('click', deleteSelectedRow);
    }

    // 새 행 추가
    function addNewRow(content = "") {
        const newRow = elements.taskTable.insertRow();
        const cell = newRow.insertCell(0);

        cell.contentEditable = "true";
        cell.spellcheck = false;
        cell.className = 'text-left';
        cell.innerHTML = content;

        // 방향키 이벤트 처리
        cell.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevRow = newRow.previousElementSibling;
                if (prevRow) {
                    prevRow.cells[0].focus();
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextRow = newRow.nextElementSibling;
                if (nextRow) {
                    nextRow.cells[0].focus();
                }
            }
        });

        newRow.addEventListener('click', () => {
            if (state.selectedRow) {
                state.selectedRow.classList.remove('selected');
            }
            newRow.classList.add('selected');
            state.selectedRow = newRow;
        });

        return newRow;
    }

    // 선택된 행 비우기
    function emptySelectedRow() {
        if (!state.selectedRow) {
            showAlert('Please select a row to empty.');
            return;
        }
        state.selectedRow.cells[0].innerHTML = "";
        saveToLocalStorage(false);
    }

    // 선택된 행 삭제
    function deleteSelectedRow() {
        if (!state.selectedRow) {
            showAlert('Please select a row to delete.');
            return;
        }
        state.selectedRow.remove();
        state.selectedRow = null;
        saveToLocalStorage(false);
    }

    // 로컬 스토리지에 저장
    function saveToLocalStorage(showMessage = true) {
        const memos = Array.from(elements.taskTable.rows).map(row => row.cells[0].innerHTML);
        localStorage.setItem('memos', JSON.stringify(memos));
        if (showMessage) {
            showAlert('Memos saved to local storage.');
        }
    }

    // 메모 불러오기
    function loadMemos() {
        // 로컬 스토리지 초기화
        localStorage.removeItem('memos');
        
        elements.taskTable.innerHTML = '';
        
        // 첫 번째 행에 기본 메시지 추가
        addNewRow("여기에 메모를 작성해 보세요");
        
        // 나머지 빈 행 추가 (총 7개 행)
        for (let i = 0; i < 6; i++) {
            addNewRow();
        }
    }

    // 다운로드 링크 저장
    function saveDownloadLinks() {
        const links = Array.from(elements.downloadLinkContainer.querySelectorAll('.download-link-wrapper')).map(wrapper => {
            const link = wrapper.querySelector('a');
            return {
                href: link.href,
                download: link.download,
                textContent: link.textContent
            };
        });
        localStorage.setItem('downloadLinks', JSON.stringify(links));
    }

    // 다운로드 링크 불러오기
    function loadDownloadLinks() {
        const links = JSON.parse(localStorage.getItem('downloadLinks')) || [];
        elements.downloadLinkContainer.innerHTML = '';
        
        links.forEach(linkData => {
            const wrapper = document.createElement('div');
            wrapper.className = 'download-link-wrapper';

            const a = document.createElement('a');
            a.href = linkData.href;
            a.download = linkData.download;
            a.textContent = linkData.textContent;

            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-link-btn';
            deleteBtn.addEventListener('click', () => {
                wrapper.remove();
                saveDownloadLinks();
            });

            wrapper.appendChild(a);
            wrapper.appendChild(deleteBtn);
            elements.downloadLinkContainer.appendChild(wrapper);
        });
    }

    // 다운로드 처리
    function handleDownload() {
        const filename = prompt("Enter the file name to download:");
        if (!filename) return;

        const tableText = Array.from(elements.taskTable.rows)
            .map(row => row.cells[0].innerText)
            .join('\n');

        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        const blob = new Blob([bom, tableText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const wrapper = document.createElement('div');
        wrapper.className = 'download-link-wrapper';

        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.txt`;
        a.textContent = `${filename}.txt`;

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-link-btn';
        deleteBtn.addEventListener('click', () => {
            wrapper.remove();
            saveDownloadLinks();
        });

        wrapper.appendChild(a);
        wrapper.appendChild(deleteBtn);
        elements.downloadLinkContainer.appendChild(wrapper);

        a.addEventListener('click', () => {
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        });

        saveDownloadLinks();
    }

    // 클립보드에 복사
    function copyToClipboard() {
        const tableText = Array.from(elements.taskTable.rows)
            .map(row => row.cells[0].innerText)
            .join('\n');

        navigator.clipboard.writeText(tableText)
            .then(() => showAlert('Table contents copied to clipboard.'))
            .catch(err => {
                console.error('Failed to copy text: ', err);
                showAlert('Failed to copy text. Please try again.');
            });
    }

    // 알림 표시
    function showAlert(message) {
        alert(message);
    }

    // 초기화
    function init() {
        setupEventListeners();
        loadMemos();
        loadDownloadLinks();
    }

    // 앱 시작
    init();
});

