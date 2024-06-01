document.addEventListener('DOMContentLoaded', (event) => {
    const saveBtn = document.getElementById('saveBtn');
    const copyBtn = document.getElementById('copyBtn');
    const addRowBtn = document.getElementById('addRowBtn');
    const emptyRowBtn = document.getElementById('emptyRowBtn');
    const deleteRowBtn = document.getElementById('deleteRowBtn');
    const toggleStrikethroughBtn = document.getElementById('toggleStrikethroughBtn');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];

    // 페이지 로드 시 로컬 스토리지에서 메모 불러오기
    loadMemos();

    saveBtn.addEventListener('click', saveToFile);
    copyBtn.addEventListener('click', copyToClipboard);
    addRowBtn.addEventListener('click', () => {
        addNewRow();
        saveMemosToLocalStorage();
    });
    emptyRowBtn.addEventListener('click', emptySelectedRow);
    deleteRowBtn.addEventListener('click', deleteSelectedRow);

    toggleStrikethroughBtn.addEventListener('click', () => {
        document.execCommand('strikeThrough');
    });

    // 로컬 스토리지에서 메모 불러오기
    function loadMemos() {
        const memos = JSON.parse(localStorage.getItem('memos')) || [];
        if (memos.length === 0) {
            // 로컬 스토리지가 비어 있는 경우 기본적으로 10개의 빈 메모 칸 추가
            for (let i = 0; i < 10; i++) {
                addNewRow();
            }
        } else {
            // 로컬 스토리지에서 불러온 메모 표시
            memos.forEach(content => addNewRow(content));
        }
    }

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
            saveMemosToLocalStorage();
        } else {
            alert('Please select a row to empty.');
        }
    }

    function deleteSelectedRow() {
        const selectedRow = taskTable.querySelector('tr.selected');
        if (selectedRow) {
            selectedRow.remove();
            saveMemosToLocalStorage();
        } else {
            alert('Please select a row to delete.');
        }
    }

    function saveMemosToLocalStorage() {
        const memos = [];
        const rows = taskTable.rows;
        for (let i = 0; i < rows.length; i++) {
            memos.push(rows[i].cells[0].innerHTML);
        }
        localStorage.setItem('memos', JSON.stringify(memos));
        console.log("Memos saved to localStorage:", memos);
    }

    function saveToFile() {
        let tableText = "";
        const rows = taskTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].cells;
            for (let j = 0; j < cells.length; j++) {
                tableText += cells[j].innerText + "\t";
            }
            tableText += "\n";
        }

        const blob = new Blob([new TextEncoder().encode(tableText)], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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

