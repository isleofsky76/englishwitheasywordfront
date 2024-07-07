document.addEventListener('DOMContentLoaded', function() {
    const jobs = [
        
    ];
    

    const jobList = document.getElementById('jobList');
    const synonymsDiv = document.getElementById('synonymsContent');
    const jobInput = document.getElementById('jobInput');
    const submitButton = document.getElementById('submitButton');
    const chatInput = document.getElementById('chatInput');
    const chatButton = document.getElementById('chatButton');
    const chatResponse = document.getElementById('chatResponse');
    const spinner = document.getElementById('spinner');

    jobs.forEach(job => {
        const button = document.createElement('button');
        button.textContent = job;
        button.classList.add('btn', 'btn-outline-primary');
        button.addEventListener('click', () => {
            jobInput.value = job;
            fetchSynonyms(job);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        jobList.appendChild(button);
    });

    submitButton.addEventListener('click', () => {
        const job = jobInput.value.trim();
        if (job) {
            fetchSynonyms(job);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    chatButton.addEventListener('click', () => {
        const question = chatInput.value.trim();
        if (question) {
            askQuestion(question);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    async function fetchSynonyms(word) {
        try {
            spinner.style.display = 'block';
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/get-synonyms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ word })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            synonymsDiv.innerHTML = formatSynonyms(data.synonyms);
            synonymsDiv.scrollTop = 0; // ***여기*** Scroll to the top after loading content
        } catch (error) {
            console.error('Error fetching synonyms:', error);
            synonymsDiv.textContent = `Error: ${error.message}`;
        } finally {
            spinner.style.display = 'none';
        }
    }

    async function askQuestion(question) {
        try {
            spinner.style.display = 'block';
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/ask-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            chatResponse.innerHTML = formatResponse(data.response);
        } catch (error) {
            console.error('Error asking question:', error);
            chatResponse.textContent = `Error: ${error.message}`;
        } finally {
            spinner.style.display = 'none';
        }
    }

    function formatSynonyms(synonyms) {
        return synonyms.replace(/(\d+\.)/g, '<br><br>$1');  // ***여기***
    }

    function formatResponse(response) {
        return response.replace(/\n/g, '<br>');
    }
});
