document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener for question submission
    const questionInput = document.getElementById('questionInput');
    const questionSubmitButton = document.getElementById('questionSubmitButton');
    if (questionInput && questionSubmitButton) {
        questionInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitQuestion();
            }
        });
        questionSubmitButton.addEventListener('click', submitQuestion);
    } else {
        console.error("Error: 'questionInput' or 'questionSubmitButton' element not found.");
    }

    // Attach event listener for chat submission
    const inputMessage = document.getElementById('inputMessage');
    const chatSubmitButton = document.getElementById('submitButton');
    if (inputMessage && chatSubmitButton) {
        inputMessage.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        chatSubmitButton.addEventListener('click', sendMessage);
    } else {
        console.error("Error: 'inputMessage' or 'submitButton' for chat not found.");
    }

    // Attach event listener for deleting all messages
    const deleteButton = document.getElementById('deleteButton');
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteMessages);
    } else {
        console.error("Error: 'deleteButton' not found.");
    }

    //download event listener.
    const downloadButton = document.getElementById('downloadButton');
    if (downloadButton) {
        downloadButton.addEventListener('click', function(event) {
            event.preventDefault();
            downloadSentences();
        });
    } else {
        console.error("Error: 'downloadButton' not found.");
    }


    // Attach event listener for rate slider
    const rateSlider = document.getElementById("rateSlider");
    if (rateSlider) {
        rateSlider.addEventListener("input", function() {
            currentRate = parseFloat(this.value);
            console.log("Updated speech rate:", currentRate);
        });
    } else {
        console.error('Element not found: rateSlider');
    }

    // Attach event listener for volume slider
    const volumeSlider = document.getElementById("volumeSlider");
    if (volumeSlider) {
        volumeSlider.addEventListener("input", function() {
            currentVolume = parseFloat(this.value);
            console.log("Updated volume:", currentVolume);
        });
    } else {
        console.error('Element not found: volumeSlider');
    }

    // // Attach event listeners for speech synthesis
    // const speakButton = document.getElementById('speakButton');
    // if (speakButton) {
    //     speakButton.addEventListener('click', function(event) {
    //         event.preventDefault();
    //         speakText(); // Start text-to-speech
    //     });
    // } else {
    //     console.error("Error: 'speakButton' not found.");
    // }

    const stopButton = document.getElementById('stopButton');
    if (stopButton) {
        stopButton.addEventListener('click', function(event) {
            event.preventDefault();
            stopText(); // Stop text-to-speech
        });
    } else {
        console.error("Error: 'stopButton' not found.");
    }

    // Attach event listener for deleting all messages
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteMessages);
    } else {
        console.error("Error: 'deleteButton' not found.");
    }

});
