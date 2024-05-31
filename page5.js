document.addEventListener('DOMContentLoaded', (event) => {
    const saveBtn = document.getElementById('saveBtn');
    const copyBtn = document.getElementById('copyBtn');
    // const kakaoBtn = document.getElementById('kakaoBtn');
    const addRowBtn = document.getElementById('addRowBtn');
    const deleteRowBtn = document.getElementById('deleteRowBtn');
    // const highlightBtn = document.getElementById('highlightBtn');
    // const removeHighlightBtn = document.getElementById('removeHighlightBtn');
    const toggleStrikethroughBtn = document.getElementById('toggleStrikethroughBtn');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];

    // 기본적으로 10개의 메모 칸 추가
    for (let i = 0; i < 17; i++) {
        addNewRow();
    }

    saveBtn.addEventListener('click', () => {
        alert('Save functionality is not implemented yet.');
    });

    copyBtn.addEventListener('click', () => {
        alert('Copy functionality is not implemented yet.');
    });

    // kakaoBtn.addEventListener('click', () => {
    //     alert('Kakao share functionality is not implemented yet.');
    // });

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
});