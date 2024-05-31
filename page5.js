document.addEventListener('DOMContentLoaded', (event) => {
    const saveBtn = document.getElementById('saveBtn');
    const copyBtn = document.getElementById('copyBtn');
    const addRowBtn = document.getElementById('addRowBtn');
    const deleteRowBtn = document.getElementById('deleteRowBtn');
    const toggleStrikethroughBtn = document.getElementById('toggleStrikethroughBtn');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];

    // 기본적으로 10개의 메모 칸 추가
    for (let i = 0; i < 10; i++) {
        addNewRow();
    }

    saveBtn.addEventListener('click', saveToFile);

    // 수정된 부분: copyBtn 이벤트 리스너 수정
    copyBtn.addEventListener('click', copyToClipboard);

    addRowBtn.addEventListener('click', addNewRow);

    deleteRowBtn.addEventListener('click', deleteLastRow);

    toggleStrikethroughBtn.addEventListener('click', () => {
        document.execCommand('strikeThrough');
    });

    function addNewRow() {
        const newRow = taskTable.insertRow();
        const newCell = newRow.insertCell(0);
        newCell.contentEditable = "true";
        newCell.spellcheck = false;
        newCell.className = 'text-left';  // 새로 추가된 셀에 클래스 적용
        newCell.innerHTML = "";
    }

    function deleteLastRow() {
        const rowCount = taskTable.rows.length;
        if (rowCount > 0) {
            taskTable.deleteRow(rowCount - 1);
        }
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

        const blob = new Blob([tableText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 수정된 부분: copyToClipboard 함수
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
