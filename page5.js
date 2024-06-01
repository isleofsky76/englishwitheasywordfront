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

    // 페이지 로드 시 로컬 스토리지에서 메모 불러오기
    loadMemos();

    saveBtn.addEventListener('click', saveToLocalStorage);
    downloadBtn.addEventListener('click', createDownloadLink);
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
            saveToLocalStorage();
        } else {
            alert('Please select a row to delete.');
        }
    }

    function saveToLocalStorage() {
        const memos = [];
        const rows = taskTable.rows;
        for (let i = 0; i < rows.length; i++) {
            memos.push(rows[i].cells[0].innerHTML);
        }
        localStorage.setItem('memos', JSON.stringify(memos));
    }

    function loadMemos() {
        const memos = JSON.parse(localStorage.getItem('memos')) || [];
        taskTable.innerHTML = ''; // 기존 행을 모두 제거
        memos.forEach(content => addNewRow(content));
    }

    function createDownloadLink() {
        let tableText = "";
        const rows = taskTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].cells;
            for (let j = 0; j < cells.length; j++) {
                tableText += cells[j].innerText + "\t";
            }
            tableText += "\n";
        }

        const blob = new Blob([tableText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        // 타임스탬프를 이용한 파일 이름 생성
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        const filename = `memo_${timestamp}.txt`;

        // 다운로드 링크 생성
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.textContent = `Download ${filename}`;
        a.style.display = 'block';
        downloadLinkContainer.appendChild(a);

        // 다운로드 링크 컨테이너를 화면에 표시되도록 스크롤
        a.scrollIntoView({ behavior: 'smooth' });
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




