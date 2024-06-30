let currentHintIndex = 0;
let currentItem = '';

document.getElementById('hintButton').addEventListener('click', showHint);
document.getElementById('submitAnswer').addEventListener('click', submitAnswer);
document.getElementById('showAnswer').addEventListener('click', showAnswer);
document.getElementById('refreshQuiz').addEventListener('click', () => location.reload());

async function startNewQuiz() {
    try {
        const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/get-random-item');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        currentItem = data.item;
        currentHintIndex = 0;
        for (let i = 1; i <= 20; i++) {
            document.getElementById(`hint${i}`).innerText = '';
        }
        document.getElementById('result').innerText = '';
        document.getElementById('answerInput').value = '';
        console.log(`New quiz started with item: ${currentItem}`); // Debugging

        // Display the first hint by default
        await showHint();
    } catch (error) {
        console.error('Error starting new quiz:', error);
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
}

async function showHint() {
    try {
        const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/get-hint', { // Update the URL if needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: currentItem,
                hintIndex: currentHintIndex
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received hint:', data);  // Debugging
        let hint = data.hint.replace(/Hint\s*#?\d*:\s*/i, ''); // Remove any existing "Hint X:" or "Hint #" text

        if (currentHintIndex < 19) {
            document.getElementById(`hint${currentHintIndex + 1}`).textContent = `Hint ${currentHintIndex + 1}: ${hint}`;
        } else if (currentHintIndex === 19) {
            hint = `The first letter of the word is "${currentItem.charAt(0)}". ${hint}`;
            document.getElementById(`hint${currentHintIndex + 1}`).textContent = `Hint ${currentHintIndex + 1}: ${hint}`;
        }

        currentHintIndex++;
    } catch (error) {
        console.error('Error getting hint:', error);  // Error handling
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
}

function submitAnswer() {
    const userAnswer = document.getElementById('answerInput').value.toLowerCase();

    if (userAnswer === currentItem) {
        document.getElementById('result').innerText = "Congratulations! You guessed it right!";
        document.getElementById('result').style.color = "green";
    } else {
        document.getElementById('result').innerText = "Incorrect. Try again.";
        document.getElementById('result').style.color = "red";
    }
}

function showAnswer() {
    document.getElementById('result').innerText = `The correct answer is: ${currentItem}`;
    document.getElementById('result').style.color = "blue";
}

// Start the first quiz when the page loads
startNewQuiz();
