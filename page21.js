document.addEventListener('DOMContentLoaded', () => {
    const forbiddenWords = [
        "sex", "sexual", "rape", "molest", "violence", "murder", "gore", "drugs", "narcotics", 
        "prostitute", "prostitution", "pedophile", "pedophilia", "incest", "self-harm", "bully", 
        "bullying", "harassment",  "slavery", "enslave", "exploitation", "trafficking", 
        "slaughter", "genocide","homophobia", "transphobia", "homophobic", "transphobic","suicide"
    ];

    const words = [
        'accept', 'achieve', 'add', 'admire', 'admit', 'advise', 'afford', 'agree', 'alert', 'allow',
        'amuse', 'analyse', 'announce', 'annoy', 'answer', 'apologize', 'appear', 'applaud', 'appreciate', 'approve',
        'argue', 'arrange', 'arrest', 'arrive', 'ask', 'assist', 'assure', 'attach', 'attack', 'attempt',
        'attend', 'attract', 'avoid', 'back', 'bake', 'balance', 'ban', 'bang', 'base', 'bat',
        'bathe', 'battle', 'be', 'beam', 'bear', 'beat', 'become', 'beg', 'begin', 'behave',
        'believe', 'belong', 'bend', 'bet', 'bind', 'bite', 'bleach', 'bless', 'blind', 'blink',
        'blot', 'blow', 'boast', 'boil', 'bolt', 'bomb', 'book', 'bore', 'borrow', 'bounce',
        'bow', 'box', 'brake', 'branch', 'breathe', 'breed', 'bring', 'broadcast', 'brush', 'bubble',
        'build', 'bump', 'burn', 'burst', 'bury', 'buy', 'calculate', 'call', 'camp', 'care',
        'carry', 'carve', 'cause', 'challenge', 'change', 'charge', 'chase', 'cheat', 'check', 'cheer',
        'chew', 'choke', 'choose', 'chop', 'claim', 'clap', 'clean', 'clear', 'clip', 'close',
        'coach', 'coil', 'collect', 'colour', 'comb', 'come', 'command', 'communicate', 'compare', 'compete',
        'complain', 'complete', 'concentrate', 'concern', 'confess', 'confuse', 'connect', 'consider', 'consist', 'contain',
        'continue', 'copy', 'correct', 'cough', 'count', 'cover', 'crack', 'crash', 'crawl', 'cross',
        'crush', 'cry', 'cure', 'curl', 'curve', 'cut', 'cycle', 'dam', 'damage', 'dance',
        'dare', 'deal', 'decay', 'deceive', 'decide', 'decorate', 'delay', 'delight', 'deliver', 'depend',
        'describe', 'desert', 'deserve', 'destroy', 'detect', 'develop', 'disagree', 'disappear', 'disapprove', 'disarm',
        'discover', 'dislike', 'divide', 'double', 'doubt', 'drag', 'drain', 'dream', 'dress', 'drip',
        'drop', 'drown', 'drum', 'dry', 'dust', 'earn', 'educate', 'embarrass', 'employ', 'empty',
        'encourage', 'end', 'enjoy', 'enter', 'entertain', 'escape', 'examine', 'excite', 'excuse', 'exercise',
        'exist', 'expand', 'expect', 'explain', 'explode', 'extend', 'face', 'fade', 'fail', 'fancy',
        'fasten', 'fax', 'fear', 'fence', 'fetch', 'fight', 'file', 'fill', 'film', 'find',
        'fire', 'fit', 'fix', 'flap', 'flash', 'float', 'flood', 'flow', 'flower', 'fold',
        'follow', 'fool', 'force', 'form', 'found', 'frame', 'freeze', 'frighten', 'fry', 'gather',
        'gaze', 'gel', 'get', 'give', 'glow', 'glue', 'grab', 'grate', 'grease', 'greet',
        'grin', 'grip', 'groan', 'guarantee', 'guard', 'guess', 'guide', 'hammer', 'hand', 'handle',
        'hang', 'happen', 'harass', 'harm', 'hate', 'haunt', 'heal', 'heap', 'hear', 'heat',
        'help', 'hook', 'hop', 'hope', 'hover', 'hug', 'hum', 'hunt', 'hurry', 'hurt',
        'identify', 'ignore', 'imagine', 'impress', 'improve', 'include', 'increase', 'influence', 'inform', 'inject',
        'injure', 'instruct', 'intend', 'interest', 'interfere', 'interrupt', 'introduce', 'invent', 'invite', 'involve',
        'iron', 'irritate', 'jail', 'jam', 'jog', 'join', 'joke', 'judge', 'juggle', 'jump',
        'kick', 'kill', 'kiss', 'kneel', 'knit', 'knock', 'knot', 'know', 'label', 'land',
        'last', 'laugh', 'launch', 'learn', 'level', 'license', 'lick', 'lie', 'lift', 'light',
        'like', 'list', 'listen', 'live', 'load', 'lock', 'long', 'look', 'lose', 'love',
        'maintain', 'make', 'manage', 'march', 'mark', 'marry', 'match', 'mate', 'matter', 'measure',
        'meddle', 'melt', 'memorize', 'mend', 'mess up', 'milk', 'mine', 'miss', 'mix', 'moan',
        'moor', 'mourn', 'move', 'mow', 'muddle', 'mug', 'multiply', 'murder', 'nail', 'name',
        'need', 'nest', 'nod', 'note', 'notice', 'number', 'obey', 'object', 'observe', 'obtain',
        'occur', 'offend', 'offer', 'open', 'operate', 'order', 'overflow', 'owe', 'own', 'pack',
        'paddle', 'paint', 'park', 'part', 'pass', 'paste', 'pat', 'pause', 'pay', 'peck',
        'pedal', 'peel', 'peep', 'perform', 'permit', 'phone', 'pick', 'pinch', 'pine', 'place',
        'plan', 'plant', 'play', 'please', 'plug', 'point', 'poke', 'polish', 'pop', 'possess',
        'post', 'pour', 'practice', 'pray', 'preach', 'precede', 'prefer', 'prepare', 'present', 'preserve',
        'press', 'pretend', 'prevent', 'prick', 'print', 'produce', 'program', 'promise', 'protect', 'provide',
        'pull', 'pump', 'punch', 'puncture', 'punish', 'push', 'question', 'queue', 'race', 'radiate',
        'rain', 'raise', 'reach', 'realize', 'receive', 'recognize', 'record', 'reduce', 'reflect', 'refuse',
        'regret', 'reign', 'reject', 'rejoice', 'relax', 'release', 'rely', 'remain', 'remember', 'remind',
        'remove', 'repair', 'repeat', 'replace', 'reply', 'report', 'reproduce', 'request', 'rescue', 'retire',
        'return', 'rhyme', 'ride', 'ring', 'rinse', 'risk', 'rob', 'rock', 'roll', 'rot',
        'rub', 'ruin', 'rule', 'run', 'rush', 'sack', 'sail', 'satisfy', 'save', 'saw',
        'say', 'scare', 'scatter', 'scream', 'screw', 'scribble', 'scrub', 'seal', 'search', 'see',
        'sell', 'send', 'sense', 'separate', 'serve', 'set', 'settle', 'sew', 'shade', 'shake',
        'shape', 'share', 'shave', 'shelter', 'shine', 'shiver', 'shock', 'shop', 'shrug', 'sigh',
        'sign', 'signal', 'sin', 'sip', 'sit', 'ski', 'skip', 'slap', 'sleep', 'slice',
        'slide', 'slip', 'slow', 'smash', 'smell', 'smile', 'smoke', 'snatch', 'sneeze', 'sniff',
        'snore', 'snow', 'soak', 'soothe', 'sound', 'sow', 'spark', 'sparkle', 'speak', 'spell',
        'spend', 'spill', 'spoil', 'spot', 'spray', 'sprout', 'squash', 'squeak', 'squeal', 'squeeze',
        'stain', 'stamp', 'stand', 'stare', 'start', 'stay', 'steer', 'step', 'stir', 'stitch',
        'stop', 'store', 'strap', 'strengthen', 'stretch', 'strip', 'stroke', 'stuff', 'subtract', 'succeed',
        'suck', 'suffer', 'suggest', 'suit', 'supply', 'support', 'suppose', 'surprise', 'surround', 'suspect',
        'suspend', 'switch', 'talk', 'tame', 'tap', 'taste', 'teach', 'tear', 'tease', 'telephone',
        'tell', 'tempt', 'terrify', 'thank', 'thaw', 'tick', 'tickle', 'tie', 'time', 'tip',
        'tire', 'touch', 'tour', 'tow', 'trace', 'trade', 'train', 'transport', 'trap', 'travel',
        'treat', 'tremble', 'trick', 'trip', 'trot', 'trouble', 'trust', 'try', 'turn', 'twist',
        'type', 'undress', 'unfasten', 'unite', 'unlock', 'unpack', 'untidy', 'use', 'vanish', 'visit',
        'wail', 'wait', 'wake', 'walk', 'wander', 'want', 'warm', 'warn', 'wash', 'waste',
        'watch', 'water', 'wave', 'wear', 'weigh', 'welcome', 'whine', 'whip', 'whirl', 'whisper',
        'whistle', 'wink', 'wipe', 'wish', 'wobble', 'wonder', 'work', 'worry', 'wrap', 'wreck',
        'wrestle', 'wriggle', 'write', 'yawn', 'yell', 'zip', 'zoom'
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
            const response = await fetch('http://localhost:3000/generate-short-text', {
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
            const response = await fetch('http://localhost:3000/get-translation-explanation', {
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

