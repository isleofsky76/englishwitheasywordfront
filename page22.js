document.addEventListener('DOMContentLoaded', function() {
    const jobs = [
        "able", "about", "above", "accept", "across", "act", "add", "after", "again", "against", 
        "age", "agree", "air", "all", "also", "always", "am", "amount", "and", "animal", 
        "answer", "any", "appear", "area", "around", "arrive", "ask", "at", "away", "back", 
        "bad", "base", "be", "become", "bed", "before", "begin", "behind", "believe", "best", 
        "better", "between", "big", "bit", "black", "blue", "book", "both", "break", "bring", 
        "brother", "build", "but", "buy", "by", "call", "can", "car", "care", "carry", 
        "case", "cat", "cause", "change", "check", "child", "choose", "city", "class", "clear", 
        "close", "cold", "come", "common", "company", "complete", "concern", "consider", "continue", "control", 
        "cost", "could", "country", "course", "cover", "create", "cross", "cut", "dark", "day", 
        "dead", "decide", "deep", "develop", "die", "different", "do", "dog", "door", "down", 
        "draw", "dream", "drive", "during", "each", "early", "earth", "east", "easy", "eat", 
        "education", "effect", "eight", "either", "end", "energy", "enjoy", "enough", "enter", "environment", 
        "evening", "even", "event", "ever", "every", "example", "except", "experience", "eye", "face", 
        "fact", "fall", "family", "far", "farm", "fast", "father", "fear", "feel", "few", 
        "field", "fight", "figure", "fill", "film", "find", "fine", "finish", "fire", "first", 
        "fish", "five", "fly", "food", "for", "force", "form", "four", "free", "friend", 
        "from", "front", "full", "game", "garden", "general", "get", "girl", "give", "glass", 
        "go", "good", "great", "green", "ground", "group", "grow", "guess", "hair", "half", 
        "hand", "happen", "happy", "hard", "have", "he", "head", "hear", "heart", "help", 
        "her", "here", "high", "him", "his", "history", "hold", "home", "hope", "horse", 
        "hot", "hour", "house", "how", "huge", "human", "hundred", "husband", "idea", "if", 
        "imagine", "important", "in", "include", "increase", "inside", "interest", "into", "involve", "issue", 
        "it", "job", "join", "just", "keep", "key", "kid", "kill", "kind", "king", 
        "kitchen", "know", "land", "language", "large", "last", "late", "laugh", "law", "lay", 
        "lead", "learn", "least", "leave", "left", "leg", "less", "let", "letter", "life", 
        "light", "like", "line", "listen", "little", "live", "long", "look", "lose", "lot", 
        "love", "low", "machine", "main", "major", "make", "man", "manage", "many", "market", 
        "matter", "may", "maybe", "mean", "measure", "meet", "member", "memory", "mention", "message", 
        "method", "middle", "might", "mile", "mind", "minute", "miss", "modern", "moment", "money", 
        "month", "more", "morning", "most", "mother", "move", "much", "music", "must", "name", 
        "nation", "natural", "nature", "near", "necessary", "need", "never", "new", "next", "night", 
        "no", "north", "not", "note", "nothing", "notice", "now", "number", "occur", "offer", 
        "office", "often", "oil", "old", "on", "once", "one", "only", "open", "operation", 
        "opportunity", "option", "or", "order", "other", "our", "out", "outside", "over", "own", 
        "page", "pain", "paper", "parent", "part", "particular", "party", "pass", "past", "pay", 
        "peace", "people", "per", "perform", "perhaps", "period", "person", "personal", "phone", "physical", 
        "pick", "picture", "piece", "place", "plan", "plant", "play", "please", "point", "police", 
        "policy", "political", "poor", "popular", "population", "position", "possible", "post", "power", "practice", 
        "prepare", "present", "pressure", "pretty", "prevent", "price", "private", "probably", "problem", "process", 
        "produce", "product", "production", "professional", "professor", "program", "project", "property", "protect", "prove", 
        "provide", "public", "pull", "purpose", "push", "put", "quality", "question", "quick", "quickly", 
        "quite", "race", "radio", "raise", "range", "rate", "rather", "reach", "read", "ready", 
        "real", "reality", "realize", "really", "reason", "receive", "recent", "recently", "recognize", "record", 
        "red", "reduce", "reflect", "region", "relate", "relationship", "religious", "remain", "remember", "remove", 
        "report", "represent", "require", "research", "resource", "respond", "response", "responsibility", "rest", "result", 
        "return", "reveal", "rich", "right", "rise", "risk", "road", "rock", "role", "room", 
        "rule", "run", "safe", "same", "save", "say", "scene", "school", "science", "scientist", 
        "score", "sea", "season", "seat", "second", "section", "security", "see", "seek", "seem", 
        "sell", "send", "senior", "sense", "series", "serious", "serve", "service", "set", "seven", 
        "several", "sex", "sexual", "shake", "share", "she", "shoot", "short", "should", "shoulder", 
        "show", "side", "sign", "significant", "similar", "simple", "simply", "since", "sing", "single", 
        "sister", "sit", "site", "situation", "six", "size", "skill", "skin", "small", "smile", 
        "so", "social", "society", "soldier", "some", "somebody", "someone", "something", "sometimes", "son", 
        "song", "soon", "sort", "sound", "source", "south", "southern", "space", "speak", "special", 
        "specific", "speech", "spend", "sport", "spring", "staff", "stage", "stand", "standard", "star", 
        "start", "state", "statement", "station", "stay", "step", "still", "stock", "stop", "store", 
        "story", "strategy", "street", "strong", "structure", "student", "study", "stuff", "style", "subject", 
        "success", "successful", "such", "suddenly", "suffer", "suggest", "summer", "support", "sure", "surface", 
        "system", "table", "take", "talk", "task", "tax", "teach", "teacher", "team", "technology", 
        "television", "tell", "ten", "tend", "term", "test", "than", "thank", "that", "the", 
        "their", "them", "themselves", "then", "theory", "there", "these", "they", "thing", "think", 
        "third", "this", "those", "though", "thought", "thousand", "threat", "three", "through", "throughout", 
        "throw", "thus", "time", "to", "today", "together", "tonight", "too", "top", "total", 
        "tough", "toward", "town", "trade", "traditional", "training", "travel", "treat", "treatment", "tree", 
        "trial", "trip", "trouble", "true", "truth", "try", "turn", "TV", "two", "type", 
        "under", "understand", "unit", "until", "up", "upon", "us", "use", "usually", "value", 
        "various", "very", "victim", "view", "violence", "visit", "voice", "vote", "wait", "walk", 
        "wall", "want", "war", "watch", "water", "way", "we", "weapon", "wear", "week", 
        "weight", "well", "west", "western", "what", "whatever", "when", "where", "whether", "which", 
        "while", "white", "who", "whole", "whom", "whose", "why", "wide", "wife", "will", 
        "win", "wind", "window", "wish", "with", "within", "without", "woman", "wonder", "word", 
        "work", "worker", "world", "worry", "would", "write", "writer", "wrong", "yard", "yeah", 
        "year", "yes", "yet", "you", "young", "your", "yourself"
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
            const response = await fetch('http://localhost:3000/get-synonyms', {
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
            const response = await fetch('http://localhost:3000/ask-question', {
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
        return synonyms.replace(/(\d+\.)/g, '<br>$1');
    }

    function formatResponse(response) {
        return response.replace(/\n/g, '<br>');
    }
});