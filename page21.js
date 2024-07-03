document.addEventListener('DOMContentLoaded', () => {
    const forbiddenWords = [
        "sex", "sexual", "rape", "molest", "violence", "murder", "gore", "drugs", "narcotics", 
        "prostitute", "prostitution", "pedophile", "pedophilia", "incest", "self-harm", "bully", 
        "bullying", "harassment",  "slavery", "enslave", "exploitation", "trafficking", 
        "slaughter", "genocide","homophobia", "transphobia", "homophobic", "transphobic","suicide"
    ];

    const words = [
        'Mathematics', 'Science', 'History', 'Geography', 'Art', 'Music', 'Physical Education',
        'Computer Science', 'English', 'Korean', 'Biology', 'Chemistry', 'Physics', 'Economics',
        'Social Studies', 'Literature', 'Language Arts', 'Health Education', 'Environmental Science',
        'Political Science', 'Psychology', 'Sociology', 'Philosophy', 'Ethics', 'Business Studies',
        'Engineering', 'Technology', 'Foreign Languages', 'Drama', 'Civics', 'Astronomy', 'Anthropology',
        'Archaeology', 'Journalism', 'Media Studies', 'Graphic Design', 'Statistics', 'Mathematical Sciences',
        'Linguistics', 'Law', 'Agriculture', 'Home Economics', 'Marketing', 'Management', 'Accounting',
        'Finance', 'Human Resources', 'Hospitality', 'Tourism', 'Nursing', 'Medical Studies', 'Dentistry',
        'Pharmacy', 'Veterinary Science', 'Public Administration', 'Urban Planning', 'Architecture',
        'Fine Arts', 'Creative Writing', 'Dance', 'Film Studies', 'Photography', 'Religious Studies',
        'Theology', 'International Relations', 'Gender Studies', 'Cultural Studies', 'Classics', 'Education'
    ];

    const generateTextButton = document.getElementById('generateTextButton');
    const randomTextButton = document.getElementById('randomTextButton');
    const getTranslationButton = document.getElementById('getTranslationButton');
    const inputTopic = document.getElementById('inputTopic');
    const shortTextSection = document.getElementById('shortTextSection');
    const shortTextElement = document.getElementById('shortText');
    const readShortTextButton = document.getElementById('readShortTextButton');
    const stopShortTextButton = document.getElementById('stopShortTextButton');
    const translationSection = document.getElementById('translationSection');
    const translationExplanationElement = document.getElementById('translationExplanation');
    const wordsContainer = document.getElementById('wordsContainer');

    let currentUtterance = null;

    // Populate the word list with clickable items
    words.forEach(word => {
        const wordItem = document.createElement('button');
        wordItem.className = 'btn btn-outline-primary m-1';
        wordItem.textContent = word;
        wordItem.addEventListener('click', () => {
        inputTopic.value = word;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        generateShortText(); // Automatically generate text on word click
        highlightSelectedWord(wordItem); // Highlight the selected word
        });
        wordsContainer.appendChild(wordItem);
    });

    // Function to highlight the selected word
    function highlightSelectedWord(selectedItem) {
        const wordButtons = document.querySelectorAll('#wordsContainer button');
        wordButtons.forEach(button => button.classList.remove('btn-primary'));
        selectedItem.classList.add('btn-primary');
    }

    // Function to show the short text section
    function showShortTextSection() {
        shortTextSection.style.display = 'block';
    }

    // Function to show the translation section
    function showTranslationSection() {
        translationSection.style.display = 'block';
    }

    // Function to toggle loading spinner on button
    function toggleButtonLoading(button, isLoading) {
        if (isLoading) {
        button.classList.add('loading');
        button.innerHTML = 'Loading... <div class="spinner-border spinner-border-sm text-light" role="status"></div>';
        } else {
        button.classList.remove('loading');
        button.innerHTML = button.getAttribute('data-original-text');
        }
    }

    // Function to check for forbidden words
    function containsForbiddenWords(text) {
        const lowerText = text.toLowerCase();
        return forbiddenWords.some(word => lowerText.includes(word));
    }

    // Function to fetch and display short text
    async function generateShortText() {
        const topic = inputTopic.value.trim();

        if (!topic) {
        alert("Please enter a topic.");
        return;
        }

        // Check for forbidden words in the topic
        if (containsForbiddenWords(topic)) {
        alert("The input contains forbidden words. Please remove them and try again.");
        return;
        }

        toggleButtonLoading(generateTextButton, true);

        try {
        const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/generate-short-text', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        shortTextElement.textContent = responseData.shortText;
        showShortTextSection();
        } catch (error) {
        console.error('Error generating short text:', error.message);
        } finally {
        toggleButtonLoading(generateTextButton, false);
        }
    }

    // Function to generate and display random text
    async function generateRandomText() {
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        inputTopic.value = randomWord;

        await generateShortText();
    }

    // Function to fetch and display translation and explanation
    async function getTranslationAndExplanation() {
        const shortText = shortTextElement.textContent.trim();

        if (!shortText) {
        alert("No short text to translate. Please generate a short text first.");
        return;
        }

        toggleButtonLoading(getTranslationButton, true);

        try {
        const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/get-translation-explanation', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ shortText })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        translationExplanationElement.innerHTML = responseData.translationExplanation.replace(/\n/g, "<br>");
        showTranslationSection();
        } catch (error) {
        console.error('Error getting translation and explanation:', error.message);
        } finally {
        toggleButtonLoading(getTranslationButton, false);
        }
    }

    // Function to read only English text aloud
    function readEnglishText(text) {
        const englishText = text.match(/[A-Za-z0-9 .,!?']+/g).join(' ');
        if (currentUtterance) {
        speechSynthesis.cancel();
        }
        currentUtterance = new SpeechSynthesisUtterance(englishText);
        currentUtterance.lang = 'en-US';
        speechSynthesis.speak(currentUtterance);
    }

    // Function to stop reading
    function stopReading() {
        speechSynthesis.cancel();
        if (currentUtterance) {
        currentUtterance.onend = null; // Clear the onend event
        currentUtterance = null;
        }
    }

    // Save original button text for restoring later
    generateTextButton.setAttribute('data-original-text', generateTextButton.innerHTML);
    getTranslationButton.setAttribute('data-original-text', getTranslationButton.innerHTML);
    generateTextButton.addEventListener('click', generateShortText);
    randomTextButton.addEventListener('click', generateRandomText);
    getTranslationButton.addEventListener('click', getTranslationAndExplanation);
    readShortTextButton.addEventListener('click', () => readEnglishText(shortTextElement.textContent));
    stopShortTextButton.addEventListener('click', stopReading);
    });
