document.addEventListener('DOMContentLoaded', (event) => {
    const saveBtn = document.getElementById('saveBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const addRowBtn = document.getElementById('addRowBtn');
    const emptyRowBtn = document.getElementById('emptyRowBtn');
    const deleteRowBtn = document.getElementById('deleteRowBtn');
    const toggleStrikethroughBtn = document.getElementById('toggleStrikethroughBtn');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const downloadLinkContainer = document.getElementById('downloadLinkContainer');

    // 페이지 로드 시 로컬 스토리지에서 메모와 다운로드 링크 불러오기
    loadMemos();
    loadDownloadLinks();

    saveBtn.addEventListener('click', () => {
        saveToLocalStorage();
    });

    downloadBtn.addEventListener('click', () => {
        const filename = prompt("Enter the file name to download:");
        if (filename) {
            createDownloadLink(filename);
        }
    });

    copyBtn.addEventListener('click', copyToClipboard);
    addRowBtn.addEventListener('click', () => {
        addNewRow();
        saveToLocalStorage();
    });
    emptyRowBtn.addEventListener('click', emptySelectedRow);
    deleteRowBtn.addEventListener('click', deleteSelectedRow);

    toggleStrikethroughBtn.addEventListener('click', () => {
        document.execCommand('strikeThrough');
    });

    function addNewRow(content = "") {
        const newRow = taskTable.insertRow();
        const cell1 = newRow.insertCell(0);

        cell1.contentEditable = "true";
        cell1.spellcheck = false;
        cell1.className = 'text-left';
        cell1.innerHTML = content;

        newRow.addEventListener('click', () => {
            taskTable.querySelectorAll('tr').forEach(row => row.classList.remove('selected'));
            newRow.classList.add('selected');
        });
    }

    function emptySelectedRow() {
        const selectedRow = taskTable.querySelector('tr.selected');
        if (selectedRow) {
            const cell = selectedRow.cells[0];
            cell.innerHTML = "";
            saveToLocalStorage();
        } else {
            alert('Please select a row to empty.');
        }
    }

    function deleteSelectedRow() {
        const selectedRow = taskTable.querySelector('tr.selected');
        if (selectedRow) {
            selectedRow.remove();
            saveToLocalStorage(false);  // delete 버튼 클릭 시 메시지를 표시하지 않음
        } else {
            alert('Please select a row to delete.');
        }
    }

    function saveToLocalStorage(showAlert = false) {
        const memos = [];
        const rows = taskTable.rows;
        for (let i = 0; i < rows.length; i++) {
            memos.push(rows[i].cells[0].innerHTML);
        }
        localStorage.setItem('memos', JSON.stringify(memos));
        if (showAlert) {
            alert('Memos saved to local storage.');
        }
    }

    function loadMemos() {
        const memos = JSON.parse(localStorage.getItem('memos')) || [];
        taskTable.innerHTML = ''; // 기존 행을 모두 제거
        const numRowsToAdd = Math.max(5 - memos.length, 0); // 최소 5개의 행이 보이도록 추가
        memos.forEach(content => addNewRow(content));
        for (let i = 0; i < numRowsToAdd; i++) {
            addNewRow();
        }
    }

    function saveDownloadLinks() {
        const links = [];
        downloadLinkContainer.querySelectorAll('a').forEach(link => {
            links.push({ href: link.href, download: link.download, textContent: link.textContent });
        });
        localStorage.setItem('downloadLinks', JSON.stringify(links));
    }

    function loadDownloadLinks() {
        const links = JSON.parse(localStorage.getItem('downloadLinks')) || [];
        downloadLinkContainer.innerHTML = ''; // 기존 링크를 모두 제거
        links.forEach(linkData => {
            const a = document.createElement('a');
            a.href = linkData.href;
            a.download = linkData.download;
            a.textContent = linkData.textContent;
            a.style.display = 'block';
            downloadLinkContainer.appendChild(a);
        });
    }

    function createDownloadLink(filename) {
        let tableText = "";
        const rows = taskTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].cells;
            for (let j = 0; j < cells.length; j++) {
                tableText += cells[j].innerText + "\t";
            }
            tableText += "\n";
        }

        // UTF-8 BOM 추가
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        const blob = new Blob([bom, tableText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.txt`;
        a.textContent = `${filename}.txt`;
        a.style.display = 'block';
        downloadLinkContainer.appendChild(a);

        a.addEventListener('click', () => {
            setTimeout(() => URL.revokeObjectURL(url), 1000); // 다운로드가 완료된 후 URL을 해제합니다.
        });

        saveDownloadLinks(); // 링크를 생성할 때마다 로컬 스토리지에 저장
    }

    function copyToClipboard() {
        let tableText = "";
        const rows = taskTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].cells;
            for (let j = 0; j < cells.length; j++) {
                tableText += cells[j].innerText + "\t";
            }
            tableText += "\n";
        }

        const textarea = document.createElement('textarea');
        textarea.value = tableText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Table contents copied to clipboard.');
    }
});



