let currentWordIndex = 0;
let pronounceInterval;
let synth = window.speechSynthesis;
let autoPlayInterval;

const words = [
    { word: "about", definition: "on the subject of; concerning", pronunciation: "[əˈbaʊt]" },
    { word: "across", definition: "from one side to the other of (something)", pronunciation: "[əˈkrɔs]" },
    { word: "act", definition: "take action; do something", pronunciation: "[ækt]" },
    { word: "address", definition: "the particulars of the place where someone lives or an organization is situated", pronunciation: "[əˈdrɛs]" },
    { word: "afraid", definition: "feeling fear or anxiety; frightened", pronunciation: "[əˈfreɪd]" },
    { word: "after", definition: "in the time following (an event or another period of time)", pronunciation: "[ˈæftər]" },
    { word: "afternoon", definition: "the time from noon or lunchtime to evening", pronunciation: "[ˌæftərˈnun]" },
    { word: "again", definition: "another time; once more", pronunciation: "[əˈɡɛn]" },
    { word: "age", definition: "the length of time that a person has lived or a thing has existed", pronunciation: "[eɪdʒ]" },
    { word: "ago", definition: "before the present; earlier (used with a measurement of time)", pronunciation: "[əˈɡoʊ]" },
    { word: "air", definition: "the invisible gaseous substance surrounding the earth, a mixture mainly of oxygen and nitrogen", pronunciation: "[ɛr]" },
    { word: "airport", definition: "a complex of runways and buildings for the takeoff, landing, and maintenance of civil aircraft, with facilities for passengers", pronunciation: "[ˈɛrˌpɔrt]" },
    { word: "album", definition: "a collection of recordings issued as a single item on CD, record, or another medium", pronunciation: "[ˈælbəm]" },
    { word: "all", definition: "used to refer to the whole quantity or extent of a particular group or thing", pronunciation: "[ɔl]" },
    { word: "along", definition: "moving in a constant direction on (a path or any more or less horizontal surface)", pronunciation: "[əˈlɔŋ]" },
    { word: "always", definition: "at all times; on all occasions", pronunciation: "[ˈɔlweɪz]" },
    { word: "among", definition: "situated more or less centrally in relation to (several other things)", pronunciation: "[əˈmʌŋ]" },
    { word: "and", definition: "used to connect words of the same part of speech, clauses, or sentences, that are to be taken jointly", pronunciation: "[ænd]" },
    { word: "angry", definition: "having a strong feeling of or showing annoyance, displeasure, or hostility; full of anger", pronunciation: "[ˈæŋɡri]" },
    { word: "animal", definition: "a living organism that feeds on organic matter, typically having specialized sense organs and nervous system and able to respond rapidly to stimuli", pronunciation: "[ˈænɪməl]" },
    { word: "answer", definition: "a thing said, written, or done to deal with or as a reaction to a question, statement, or situation", pronunciation: "[ˈænsər]" },
    { word: "any", definition: "used to refer to one or some of a thing or number of things, no matter how much or how many", pronunciation: "[ˈɛni]" },
    { word: "apartment", definition: "a set of rooms forming an individual residence, typically on one floor and within a larger building containing a number of such residences", pronunciation: "[əˈpɑrtmənt]" },
    { word: "apple", definition: "the round fruit of a tree of the rose family, which typically has thin green or red skin and crisp flesh", pronunciation: "[ˈæpəl]" },
    { word: "arm", definition: "each of the two upper limbs of the human body from the shoulder to the hand", pronunciation: "[ɑrm]" },
    { word: "around", definition: "located or situated on every side", pronunciation: "[əˈraʊnd]" },
    { word: "arrive", definition: "reach a place at the end of a journey or a stage in a journey", pronunciation: "[əˈraɪv]" },
    { word: "as", definition: "used in comparisons to refer to the extent or degree of something", pronunciation: "[æz]" },
    { word: "ask", definition: "say something in order to obtain an answer or some information", pronunciation: "[æsk]" },
    { word: "at", definition: "expressing location or arrival in a particular place or position", pronunciation: "[æt]" },
    { word: "aunt", definition: "the sister of one's father or mother or the wife of one's uncle", pronunciation: "[ænt]" },
    { word: "autumn", definition: "the season after summer and before winter, in the northern hemisphere from September to November and in the southern hemisphere from March to May", pronunciation: "[ˈɔtəm]" },
    { word: "away", definition: "to or at a distance from a particular place, person, or thing", pronunciation: "[əˈweɪ]" },
    { word: "baby", definition: "a very young child, especially one newly or recently born", pronunciation: "[ˈbeɪbi]" },
    { word: "back", definition: "the rear surface of the human body from the shoulders to the hips", pronunciation: "[bæk]" },
    { word: "bad", definition: "of poor quality or a low standard", pronunciation: "[bæd]" },
    { word: "bag", definition: "a flexible container with an opening at the top, used for carrying things", pronunciation: "[bæɡ]" },
    { word: "ball", definition: "a solid or hollow spherical or egg-shaped object that is kicked, thrown, or hit in a game", pronunciation: "[bɔl]" },
    { word: "balloon", definition: "a small, thin rubber bag that you blow air into so that it becomes larger and round in shape and is used as a toy or a decoration", pronunciation: "[bəˈlun]" },
    { word: "banana", definition: "a long curved fruit which grows in clusters and has soft pulpy flesh and yellow skin when ripe", pronunciation: "[bəˈnænə]" },
    { word: "band", definition: "a flat, thin strip or loop of material put around something, typically to hold it together or to decorate it", pronunciation: "[bænd]" },
    { word: "bank", definition: "the land alongside or sloping down to a river or lake", pronunciation: "[bæŋk]" },
    { word: "base", definition: "the lowest part or edge of something, especially the part on which it rests or is supported", pronunciation: "[beɪs]" },
    { word: "basket", definition: "a container used to hold or carry things, typically made from interwoven strips of cane or wire", pronunciation: "[ˈbæskɪt]" },
    { word: "bath", definition: "an act or process of immersing and washing one's body in a large container of water", pronunciation: "[bæθ]" },
    { word: "be", definition: "exist", pronunciation: "[bi]" },
    { word: "beach", definition: "a pebbly or sandy shore, especially by the ocean between high- and low-water marks", pronunciation: "[biʧ]" },
    { word: "bear", definition: "a large, heavy mammal that walks on the soles of its feet, with thick fur and a very short tail", pronunciation: "[bɛr]" },
    { word: "beautiful", definition: "pleasing the senses or mind aesthetically", pronunciation: "[ˈbjutɪfəl]" },
    { word: "because", definition: "for the reason that; since", pronunciation: "[bɪˈkɔz]" },
    { word: "become", definition: "begin to be", pronunciation: "[bɪˈkʌm]" },
    { word: "bed", definition: "a piece of furniture for sleep or rest, typically a framework with a mattress", pronunciation: "[bɛd]" },
    { word: "before", definition: "during the period of time preceding (a particular event, date, or time)", pronunciation: "[bɪˈfɔr]" },
    { word: "begin", definition: "start; perform or undergo the first part of (an action or activity)", pronunciation: "[bɪˈɡɪn]" },
    { word: "behind", definition: "at or to the far side of (something), typically so as to be hidden by it", pronunciation: "[bɪˈhaɪnd]" },
    { word: "bell", definition: "a hollow object, typically made of metal and shaped like a deep inverted cup that sounds a clear musical note when struck, typically by means of a clapper inside", pronunciation: "[bɛl]" },
    { word: "below", definition: "at a lower level or layer than", pronunciation: "[bɪˈloʊ]" },
    { word: "bench", definition: "a long seat for several people, typically made of wood or stone", pronunciation: "[bɛnʧ]" },
    { word: "beside", definition: "at the side of; next to", pronunciation: "[bɪˈsaɪd]" },
    { word: "between", definition: "at, into, or across the space separating (two objects or regions)", pronunciation: "[bɪˈtwin]" },
    { word: "bicycle", definition: "a vehicle composed of two wheels held in a frame one behind the other, propelled by pedals and steered with handlebars attached to the front wheel", pronunciation: "[ˈbaɪsɪkəl]" },
    { word: "big", definition: "of considerable size, extent, or intensity", pronunciation: "[bɪɡ]" },
    { word: "bird", definition: "a warm-blooded egg-laying vertebrate distinguished by the possession of feathers, wings, and a beak and (typically) by being able to fly", pronunciation: "[bɜrd]" },
    { word: "birthday", definition: "the anniversary of the day on which a person was born, typically treated as an occasion for celebration and the giving of gifts", pronunciation: "[ˈbɜrθˌdeɪ]" },
    { word: "black", definition: "of the very darkest color owing to the absence of or complete absorption of light; the opposite of white", pronunciation: "[blæk]" },
    { word: "blow", definition: "a strong wind", pronunciation: "[bloʊ]" },
    { word: "blue", definition: "of a color intermediate between green and violet, as of the sky or sea on a sunny day", pronunciation: "[blu]" },
    { word: "board", definition: "a long, thin, flat piece of wood or other hard material, used for floors or other building purposes", pronunciation: "[bɔrd]" },
    { word: "boat", definition: "a small vessel for traveling over water, propelled by oars, sails, or an engine", pronunciation: "[boʊt]" },
    { word: "body", definition: "the physical structure of a person or an animal, including the bones, flesh, and organs", pronunciation: "[ˈbɑdi]" },
    { word: "book", definition: "a written or printed work consisting of pages glued or sewn together along one side and bound in covers", pronunciation: "[bʊk]" },
    { word: "bottle", definition: "a container, typically made of glass or plastic and with a narrow neck, used for storing drinks or other liquids", pronunciation: "[ˈbɑtəl]" },
    { word: "bowl", definition: "a round, deep dish or basin used for food or liquid", pronunciation: "[boʊl]" },
    { word: "box", definition: "a container with a flat base and sides, typically square or rectangular and having a lid", pronunciation: "[bɑks]" },
    { word: "boy", definition: "a male child or youth", pronunciation: "[bɔɪ]" },
    { word: "bread", definition: "food made of flour, water, and yeast or another leavening agent, mixed together and baked", pronunciation: "[brɛd]" },
    { word: "break", definition: "separate or cause to separate into pieces as a result of a blow, shock, or strain", pronunciation: "[breɪk]" },
    { word: "breakfast", definition: "the first meal of the day, usually eaten in the morning", pronunciation: "[ˈbrɛkfəst]" },
    { word: "bridge", definition: "a structure carrying a road, path, railroad, or canal across a river, ravine, road, railroad, or other obstacle", pronunciation: "[brɪdʒ]" },
    { word: "bright", definition: "giving out or reflecting a lot of light; shining", pronunciation: "[braɪt]" },
    { word: "bring", definition: "take or go with (someone or something) to a place", pronunciation: "[brɪŋ]" },
    { word: "brother", definition: "a man or boy in relation to other sons and daughters of his parents", pronunciation: "[ˈbrʌðər]" },
    { word: "brown", definition: "of a color produced by mixing red, yellow, and blue, as of dark wood or rich soil", pronunciation: "[braʊn]" },
    { word: "brush", definition: "an implement with a handle, consisting of bristles, hair, or wire set into a block, used for cleaning, grooming, painting, or polishing", pronunciation: "[brʌʃ]" },
    { word: "build", definition: "construct (something) by putting parts or material together", pronunciation: "[bɪld]" },
    { word: "burn", definition: "consume by fire", pronunciation: "[bɜrn]" },
    { word: "bus", definition: "a large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare", pronunciation: "[bʌs]" },
    { word: "busy", definition: "having a great deal to do", pronunciation: "[ˈbɪzi]" },
    { word: "but", definition: "used to introduce a phrase or clause contrasting with what has already been mentioned", pronunciation: "[bʌt]" },
    { word: "butter", definition: "a pale yellow edible fatty substance made by churning cream and used as a spread or in cooking", pronunciation: "[ˈbʌtər]" },
    { word: "button", definition: "a small disk, typically round and made of plastic, used to fasten clothing by fitting through a buttonhole or loop", pronunciation: "[ˈbʌtən]" },
    { word: "buy", definition: "obtain in exchange for payment", pronunciation: "[baɪ]" },
    { word: "by", definition: "indicating the means of achieving something", pronunciation: "[baɪ]" },
    { word: "bye", definition: "short for goodbye", pronunciation: "[baɪ]" },
    { word: "calendar", definition: "a chart or series of pages showing the days, weeks, and months of a particular year, or giving particular seasonal information", pronunciation: "[ˈkæləndər]" },
    { word: "cake", definition: "an item of soft, sweet food made from a mixture of flour, shortening, eggs, sugar, and other ingredients, baked and often decorated", pronunciation: "[keɪk]" },
    { word: "call", definition: "cry out to (someone) in order to summon them or attract their attention", pronunciation: "[kɔl]" },
    { word: "camera", definition: "a device for recording visual images in the form of photographs, film, or video signals", pronunciation: "[ˈkæmərə]" },
    { word: "camp", definition: "a place with temporary accommodations of huts, tents, or other structures", pronunciation: "[kæmp]" },
    { word: "can", definition: "to be able to", pronunciation: "[tu bi ˈeɪbəl tu]" },
    { word: "candle", definition: "a cylinder of wax with a central wick that is burned to produce light", pronunciation: "[ə ˈsɪlɪndər ʌv wæks wɪð ə ˈsɛntrəl wɪk ðæt ɪz bɜrnd tu prəˈdus laɪt]" },
    { word: "candy", definition: "a sweet food made with sugar or syrup", pronunciation: "[ə swit fud meɪd wɪð ˈʃʊɡər ɔr ˈsɪrəp]" },
    { word: "cap", definition: "a soft, flat hat without a brim and sometimes having a peak", pronunciation: "[ə sɔft, flæt hæt wɪˈðaʊt ə brɪm ənd ˈsʌmˌtaɪmz ˈhævɪŋ ə pik]" },
    { word: "capital", definition: "a city that is the seat of government", pronunciation: "[ə ˈsɪti ðæt ɪz ðə sit ʌv ˈɡʌvərnmənt]" },
    { word: "captain", definition: "the person in command of a ship, aircraft, or sports team", pronunciation: "[ðə ˈpɜrsən ɪn kəˈmænd ʌv ə ʃɪp, ˈɛrˌkræft, ɔr spɔrts tim]" },
];

function updateWord() {
    document.getElementById('word-english').innerText = words[currentWordIndex].word;
    document.getElementById('word-definition').innerText = words[currentWordIndex].definition;
    document.getElementById('word-pronunciation').innerText = words[currentWordIndex].pronunciation;
}

function pronounceWord(times, callback) {
    let count = 0;

    function speak() {
        if (count < times) {
            let englishUtteranceWord = new SpeechSynthesisUtterance(words[currentWordIndex].word);
            let englishUtteranceDefinition = new SpeechSynthesisUtterance(words[currentWordIndex].definition);

            englishUtteranceWord.lang = 'en-US';
            englishUtteranceWord.rate = 1;
            englishUtteranceDefinition.lang = 'en-US';
            englishUtteranceDefinition.rate = 1;

            englishUtteranceWord.onend = () => {
                setTimeout(() => {
                    synth.speak(englishUtteranceDefinition);
                }, 1000); // 1 second delay between word and definition
            };

            englishUtteranceDefinition.onend = () => {
                count++;
                if (count < times) {
                    speak();
                } else if (callback) {
                    callback();
                }
            };

            synth.speak(englishUtteranceWord);
        }
    }

    speak();
}


function stopPronouncing() {
    clearInterval(pronounceInterval);
    clearInterval(autoPlayInterval);
    synth.cancel();
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
    pronounceWord(1);
}

function autoPlay() {
    stopPronouncing();
    currentWordIndex = 0;

    function playNextWord() {
        updateWord();
        pronounceWord(1, () => {
            currentWordIndex++;
            if (currentWordIndex >= words.length) {
                currentWordIndex = 0;
            }
        });
    }

    playNextWord(); // 첫 단어를 즉시 업데이트하고 발음

    autoPlayInterval = setInterval(() => {
        playNextWord();
    }, 15000); // 이후 15초 간격으로 반복
}

updateWord();

function showWordList() {
    const wordList = document.getElementById('word-list');
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>${word.word}</strong><br>${word.definition}<em><br>${word.pronunciation}</em><br><br>`;
        wordList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWord();
    showWordList();
});
