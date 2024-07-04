document.getElementById('getFortuneButton').addEventListener('click', async () => {
    const word = document.getElementById('wordInput').value;
    const spinner = document.getElementById('spinner');
    const fortuneOutput = document.getElementById('fortuneOutput');
    const readButton = document.getElementById('readButton');
    const stopButton = document.getElementById('stopButton');

    // Check if the input is empty
    if (!word.trim()) {
        alert('Please enter your birth date, time, and place. Your data will not be stored.');
        return;
    }

    // Show the spinner and clear previous output
    spinner.style.display = 'block';
    fortuneOutput.innerText = '';
    readButton.style.display = 'none';
    stopButton.style.display = 'none';

    try {
        const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/get-fortune', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseText = await response.text();
        console.log(`Raw response: ${responseText}`);
        const data = JSON.parse(responseText);

        console.log(`Received fortune: ${data.fortune}`);
        // Extract the English part (assuming it's the first part before a space or '(')
        const englishPart = data.fortune.match(/^[^\(]+/)[0].trim();
        fortuneOutput.innerText = englishPart;
        readButton.style.display = 'inline';
        stopButton.style.display = 'inline';

        const utterance = new SpeechSynthesisUtterance(englishPart);
        utterance.lang = 'en-US';
        utterance.rate = 1;

        readButton.onclick = () => {
            window.speechSynthesis.speak(utterance);
        };

        stopButton.onclick = () => {
            window.speechSynthesis.cancel();
        };
    } catch (error) {
        console.error('Error fetching fortune:', error);
        fortuneOutput.innerText = 'Error fetching fortune. Please try again later.';
    } finally {
        // Hide the spinner
        spinner.style.display = 'none';
    }
});

