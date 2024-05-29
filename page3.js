const forbiddenWords = [
    "sex", "sexual", "rape", "molest", "violence", "murder", "gore", "drugs", "narcotics", 
    "prostitute", "prostitution", "pedophile", "pedophilia", "incest", "self-harm", "bully", 
    "bullying", "harassment",  "slavery", "enslave", "exploitation", "trafficking", 
    "slaughter", "genocide","homophobia", "transphobia", "homophobic", "transphobic","suicide"
];


// 금지된 단어 검사 함수
function containsForbiddenWords(text) {
    const lowerText = text.toLowerCase(); // 대소문자 구분 없이 검사
    return forbiddenWords.some(word => lowerText.includes(word));
}

function setInput(word) {
    document.getElementById("inputWord").value = word; // Set the input value
    sendRequest(); // Trigger the search
}

function clearInputField() {
    document.getElementById("inputWord").value = ''; // Clear the input field
    updateWordList(Object.entries(wordFrequency)); // Update the word list with the current word frequency data
}

// (3) 질문하기 기능. Function to set default advice text
function setDefaultAdvice() {
    const adviceDisplay = document.getElementById("adviceDisplay");
    if (adviceDisplay) {
        adviceDisplay.innerHTML = `
            <p>"Questions"는 "질문"의 의미로, 무엇을 물어보거나 알고 싶은 것을 상대방에게 묻는 것을 말합니다.</p>
        `;
    }
}

// Array to store questions and answers
let qnaStorage = [];

// Function to handle form submission and send the question to the backend
async function submitQuestion() {
    // Retrieve the value from the input field
    const questionInputField = document.getElementById('questionInput');
    const questionInput = questionInputField.value;
    // Log the value to verify that it's correctly retrieved
    console.log("Submitting question:", questionInput);

    if (containsForbiddenWords(questionInput)) {
        alert("The input contains forbidden words. Please remove them and try again  (입력이 금지된 단어입니다. 다시 입력해주세요).");
        return;
    }

    // Clear the input field immediately after getting the value
    questionInputField.value = '';

    try {
        // Send the question to the backend with the expected key
        const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/business-advice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questionInput }) // Adjusted key name to 'question'
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received advice:", data.advice);

        // Store the question and response in qnaStorage
        qnaStorage.push({ question: questionInput, advice: data.advice });

        // Update the adviceDisplay div by appending new content without overwriting
        const adviceDisplay = document.getElementById('adviceDisplay');
        const newQuestion = document.createElement('div');
        newQuestion.className = 'question';
        newQuestion.innerText = `Q${qnaStorage.length}: ${questionInput}`;
        
        const newAdvice = document.createElement('div');
        newAdvice.className = 'answer';
        newAdvice.innerText = `A${qnaStorage.length}: ${data.advice}`;

        adviceDisplay.appendChild(newQuestion);
        adviceDisplay.appendChild(newAdvice);

    } catch (error) {
        console.error('Error submitting question:', error);
        const adviceDisplay = document.getElementById('adviceDisplay');
        if (adviceDisplay) {
            adviceDisplay.innerHTML = '<p>Error: Unable to retrieve advice.</p>';
        }
    }

    // Clear the input field after submission
    questionInputField.value = '';
}

// Function to clear the question input field and reset the advice display
function refreshForm() {
    // Clear the question input field
    const questionInput = document.getElementById('questionInput');
    if (questionInput) {
        questionInput.value = '';
    }

    // Clear the advice display to be empty
    const adviceDisplay = document.getElementById("adviceDisplay");
    if (adviceDisplay) {
        adviceDisplay.innerHTML = ''; // Make the display empty
    }
}


// Function to copy the content of the output area to clipboard
function copyToClipboard() {
    const outputArea = document.getElementById('responseArea');
    const textToCopy = outputArea.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Add event listener for the copy button
document.getElementById('copybutton').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent any default form submission behavior
    copyToClipboard();
});

//질의 응답 다운 받기 
function downloadQnA() {
    // Create a data string to be written into the text file
    let dataString = '질문과 답\n\n'; // Header for the data

    // Iterate over qnaStorage to append each question and its corresponding advice to the data string
    qnaStorage.forEach((item, index) => {
        dataString += `Q${index + 1}: ${item.question}\n`; // Append question
        dataString += `A${index + 1}: ${item.advice}\n\n`; // Append advice
    });

    // Create a Blob object containing the data string
    const blob = new Blob([dataString], { type: 'text/plain' });

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'questions_and_answers.txt';

    // Append the anchor element to the document body and trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the temporary anchor element
    document.body.removeChild(a);
}
