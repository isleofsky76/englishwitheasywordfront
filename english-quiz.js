// 시사 영어 퀴즈 데이터 - 카테고리별 분류
const quizData = {
    "Economics": [
          {
            "question": "What is the currency of the European Union?",
            "options": ["Dollar", "Euro", "Pound", "Franc"],
            "answer": "Euro",
            "explanation": "The Euro is the official currency of the European Union."
          },
          {
            "question": "What does GDP stand for?",
            "options": ["Gross Domestic Product", "General Domestic Profit", "Global Development Program", "Gross Domestic Progress"],
            "answer": "Gross Domestic Product",
            "explanation": "GDP stands for Gross Domestic Product, a measure of economic activity."
          },
     
          {
            "question": "What does inflation mean?",
            "options": ["Rising prices", "Falling prices", "Stable prices", "No change"],
            "answer": "Rising prices",
            "explanation": "Inflation is the general increase in prices of goods and services over time."
          },
          {
            "question": "Which U.S. institution sets interest rates?",
            "options": ["Treasury", "Congress", "Federal Reserve", "White House"],
            "answer": "Federal Reserve",
            "explanation": "The Federal Reserve (the Fed) sets monetary policy including interest rates."
          },
          {
            "question": "What does 'recession' mean?",
            "options": ["Economic growth", "Economic slowdown", "High inflation", "Budget surplus"],
            "answer": "Economic slowdown",
            "explanation": "A recession is a period of economic decline marked by falling GDP and employment."
          },
          {
            "question": "Which Asian country is called the 'world’s factory'?",
            "options": ["India", "Japan", "South Korea", "China"],
            "answer": "China",
            "explanation": "China is called the world’s factory due to its large-scale manufacturing industry."
          },
          {
            "question": "What is 'fiscal policy' mainly concerned with?",
            "options": ["Government spending and taxation", "Interest rates", "Trade agreements", "Technology"],
            "answer": "Government spending and taxation",
            "explanation": "Fiscal policy refers to government decisions about spending and taxes."
          },
          {
            "question": "What is 'cryptocurrency'?",
            "options": ["Digital money", "Paper money", "Gold coin", "Bank deposit"],
            "answer": "Digital money",
            "explanation": "Cryptocurrency is digital currency secured by cryptography, like Bitcoin."
          },
          {
            "question": "Which organization monitors global financial stability?",
            "options": ["FED", "IMF", "UN", "WTO"],
            "answer": "IMF",
            "explanation": "The International Monetary Fund (IMF) works to ensure global financial stability."
          }
        ],
        "Technology": [
          {
            "question": "What does AI stand for?",
            "options": ["Artificial Intelligence", "Advanced Internet", "Automated Information", "Artificial Innovation"],
            "answer": "Artificial Intelligence",
            "explanation": "AI stands for Artificial Intelligence, computer systems that can perform tasks requiring human intelligence."
          },
          {
            "question": "Which company developed ChatGPT?",
            "options": ["Google", "Microsoft", "OpenAI", "Meta"],
            "answer": "OpenAI",
            "explanation": "OpenAI developed ChatGPT, a large language model chatbot."
          },
          {
            "question": "What does 5G refer to?",
            "options": ["5th Generation", "5 Gigabytes", "5 Global", "5 Graphics"],
            "answer": "5th Generation",
            "explanation": "5G refers to the 5th generation of cellular network technology."
          },
          {
            "question": "What does 'cloud computing' mean?",
            "options": ["Computing on the internet", "Computing at home", "Computing without electricity", "Computing with a USB"],
            "answer": "Computing on the internet",
            "explanation": "Cloud computing means delivering computing services over the internet."
          },
          {
            "question": "Which company created the Android operating system?",
            "options": ["Google", "Apple", "Microsoft", "Samsung"],
            "answer": "Google",
            "explanation": "Google acquired Android Inc. in 2005 and developed the Android OS."
          },
          {
            "question": "What is the name of Elon Musk's space company?",
            "options": ["NASA", "Blue Origin", "SpaceX", "Virgin Galactic"],
            "answer": "SpaceX",
            "explanation": "Elon Musk founded SpaceX, a private aerospace manufacturer and space transport company."
          },

        
          {
            "question": "What does 'IoT' stand for?",
            "options": ["Internet of Things", "Information on Technology", "Innovation of Tools", "Interface of Technology"],
            "answer": "Internet of Things",
            "explanation": "IoT refers to physical devices connected and communicating via the internet."
          },
      
        ],
        "Environment": [
          {
            "question": "What does CO2 stand for?",
            "options": ["Carbon Dioxide", "Carbon Oxide", "Chemical Oxygen", "Carbon Monoxide"],
            "answer": "Carbon Dioxide",
            "explanation": "CO2 stands for Carbon Dioxide, a greenhouse gas that contributes to climate change."
          },
          {
            "question": "What is the main cause of global warming?",
            "options": ["Deforestation", "Greenhouse gases", "Ocean pollution", "Solar radiation"],
            "answer": "Greenhouse gases",
            "explanation": "Greenhouse gases, particularly CO2, are the main cause of global warming."
          },
          {
            "question": "What does ESG stand for?",
            "options": ["Environmental, Social, Governance", "Energy, Society, Growth", "Economic, Sustainable, Green", "Environmental, Social, Growth"],
            "answer": "Environmental, Social, Governance",
            "explanation": "ESG stands for Environmental, Social, and Governance criteria for investing."
          },
          {
            "question": "What is deforestation?",
            "options": ["Planting trees", "Cutting down forests", "Cleaning rivers", "Protecting animals"],
            "answer": "Cutting down forests",
            "explanation": "Deforestation is the clearing of trees from forests, often for agriculture."
          },
          {
            "question": "Which international agreement aims to limit global warming to below 2°C?",
            "options": ["Kyoto Protocol", "Paris Agreement", "Montreal Protocol", "Doha Amendment"],
            "answer": "Paris Agreement",
            "explanation": "The Paris Agreement aims to limit global warming by reducing emissions."
          },
          {
            "question": "What is 'biodiversity'?",
            "options": ["Variety of life forms", "Variety of cities", "Variety of minerals", "Variety of climates"],
            "answer": "Variety of life forms",
            "explanation": "Biodiversity refers to the variety of living organisms on Earth."
          },
          {
            "question": "Which renewable energy comes from sunlight?",
            "options": ["Wind", "Solar", "Geothermal", "Hydro"],
            "answer": "Solar",
            "explanation": "Solar energy harnesses energy from sunlight using panels."
          },
         
      
          {
            "question": "What is 'carbon neutrality'?",
            "options": ["Balancing carbon emissions with absorption", "Zero energy use", "Only using solar power", "Banning oil"],
            "answer": "Balancing carbon emissions with absorption",
            "explanation": "Carbon neutrality means offsetting emitted carbon with reductions or absorption."
          }
        ],
        "Sports": [
          {
            "question": "Which country will host the 2028 Summer Olympics?",
            "options": ["Japan", "France", "United States", "Germany"],
            "answer": "United States",
            "explanation": "The United States, specifically Los Angeles, will host the 2028 Summer Olympics."
          },
       
          {
            "question": "Which country won the 2022 FIFA World Cup?",
            "options": ["Brazil", "Germany", "Argentina", "France"],
            "answer": "Argentina",
            "explanation": "Argentina won the 2022 FIFA World Cup, defeating France in the final."
          },
          {
            "question": "How many players are on a standard soccer team?",
            "options": ["9", "10", "11", "12"],
            "answer": "11",
            "explanation": "Each soccer team fields 11 players, including the goalkeeper."
          },
          {
            "question": "Which sport uses terms like love, deuce, and ace?",
            "options": ["Tennis", "Badminton", "Table Tennis", "Squash"],
            "answer": "Tennis",
            "explanation": "These are scoring terms in tennis."
          },
        
          {
            "question": "What is the maximum break in snooker?",
            "options": ["147", "155", "100", "120"],
            "answer": "147",
            "explanation": "The highest possible break in snooker is 147 points."
          },
          {
            "question": "Which team has won the most NBA championships?",
            "options": ["Chicago Bulls", "Boston Celtics", "Los Angeles Lakers", "Golden State Warriors"],
            "answer": "Boston Celtics",
            "explanation": "The Boston Celtics hold the record for the most NBA championships."
          },
          {
            "question": "Which country will host the 2030 FIFA World Cup?",
            "options": ["Spain/Portugal/Morocco", "USA", "Qatar", "China"],
            "answer": "Spain/Portugal/Morocco",
            "explanation": "The 2030 FIFA World Cup will be jointly hosted by Spain, Portugal, and Morocco."
          }
        ],
        "Health": [
         
          {
            "question": "What does WHO stand for?",
            "options": ["World Health Organization", "World Hospital Organization", "World Health Office", "World Healthcare Organization"],
            "answer": "World Health Organization",
            "explanation": "WHO stands for World Health Organization, a UN specialized agency."
          },
        
          {
            "question": "What organ pumps blood through the body?",
            "options": ["Liver", "Lungs", "Heart", "Kidneys"],
            "answer": "Heart",
            "explanation": "The heart pumps blood throughout the body."
          },
          {
            "question": "Which vitamin is produced when the skin is exposed to sunlight?",
            "options": ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
            "answer": "Vitamin D",
            "explanation": "The skin produces Vitamin D when exposed to sunlight."
          },
          {
            "question": "What is hypertension commonly known as?",
            "options": ["High blood pressure", "Low blood pressure", "Heart attack", "Stroke"],
            "answer": "High blood pressure",
            "explanation": "Hypertension is another term for high blood pressure."
          },
          {
            "question": "Which nutrient mainly provides energy to the body?",
            "options": ["Protein", "Carbohydrates", "Vitamins", "Minerals"],
            "answer": "Carbohydrates",
            "explanation": "Carbohydrates are the body’s primary source of energy."
          },
          
         
          {
            "question": "What does BMI stand for?",
            "options": ["Body Mass Index", "Blood Muscle Indicator", "Bone Mass Index", "Body Measurement Indicator"],
            "answer": "Body Mass Index",
            "explanation": "BMI stands for Body Mass Index, a measure of body fat based on height and weight."
          }
        ],
        "Culture": [
        
          {
            "question": "Which country is famous for its Oktoberfest celebration?",
            "options": ["Austria", "Germany", "Switzerland", "Czech Republic"],
            "answer": "Germany",
            "explanation": "Germany is famous for Oktoberfest, the world's largest beer festival held annually in Munich."
          },
          {
            "question": "What does 'K-Pop' stand for?",
            "options": ["Korean Pop", "Korea Popular", "Korean Popular music", "Korea Pop music"],
            "answer": "Korean Pop",
            "explanation": "K-Pop stands for Korean Pop, referring to popular music from South Korea."
          },
          {
            "question": "Which country is home to the Carnival festival in Rio de Janeiro?",
            "options": ["Brazil", "Argentina", "Mexico", "Spain"],
            "answer": "Brazil",
            "explanation": "Rio de Janeiro, Brazil, hosts the world-famous Carnival festival."
          },
          {
            "question": "What does 'Bollywood' refer to?",
            "options": ["Indian film industry", "Korean drama industry", "Hollywood in Africa", "Chinese opera"],
            "answer": "Indian film industry",
            "explanation": "Bollywood is the Hindi-language film industry based in Mumbai, India."
          },
          {
            "question": "Which country is known for flamenco dance?",
            "options": ["Italy", "Spain", "Portugal", "Mexico"],
            "answer": "Spain",
            "explanation": "Flamenco is a traditional dance and music style from Spain."
          },
          {
            "question": "What is the main religion in Thailand?",
            "options": ["Christianity", "Buddhism", "Islam", "Hinduism"],
            "answer": "Buddhism",
            "explanation": "Most Thais practice Theravada Buddhism."
          },
          {
            "question": "Which festival is known as the 'Festival of Lights' in India?",
            "options": ["Diwali", "Holi", "Eid", "Vesak"],
            "answer": "Diwali",
            "explanation": "Diwali is the Hindu festival of lights, symbolizing victory of light over darkness."
          },
          {
            "question": "What is the official language of Brazil?",
            "options": ["Spanish", "Portuguese", "English", "French"],
            "answer": "Portuguese",
            "explanation": "Brazil’s official language is Portuguese due to its colonial history."
          },
          {
            "question": "Which cultural landmark is located in Paris, France?",
            "options": ["Colosseum", "Eiffel Tower", "Big Ben", "Statue of Liberty"],
            "answer": "Eiffel Tower",
            "explanation": "The Eiffel Tower is a world-famous cultural landmark in Paris."
          }
        ],
        "Entertainment": [
        
          {
            "question": "What does 'VFX' stand for in film production?",
            "options": ["Visual Effects", "Video Effects", "Virtual Effects", "Visual Experience"],
            "answer": "Visual Effects",
            "explanation": "VFX stands for Visual Effects, referring to computer-generated imagery and digital effects in films."
          },
          {
            "question": "Which social media platform is known for short-form video content?",
            "options": ["Instagram", "TikTok", "YouTube Shorts", "All of the above"],
            "answer": "All of the above",
            "explanation": "All of these platforms feature short-form video content, though TikTok popularized the format."
          },
          {
            "question": "Which movie won the Best Picture Oscar in 2023?",
            "options": ["Everything Everywhere All At Once", "Top Gun: Maverick", "Avatar: The Way of Water", "The Fabelmans"],
            "answer": "Everything Everywhere All At Once",
            "explanation": "The film won Best Picture at the 2023 Academy Awards."
          },
          {
            "question": "Who is known as the 'King of Pop'?",
            "options": ["Elvis Presley", "Michael Jackson", "Prince", "Justin Bieber"],
            "answer": "Michael Jackson",
            "explanation": "Michael Jackson is widely known as the 'King of Pop'."
          },
          {
            "question": "Which Disney movie features the song 'Let It Go'?",
            "options": ["Frozen", "Moana", "Tangled", "Encanto"],
            "answer": "Frozen",
            "explanation": "The song 'Let It Go' is from Disney’s Frozen (2013)."
          },
          {
            "question": "Which Marvel superhero is also called 'Iron Man'?",
            "options": ["Bruce Wayne", "Tony Stark", "Clark Kent", "Peter Parker"],
            "answer": "Tony Stark",
            "explanation": "Tony Stark is the alter ego of Marvel’s Iron Man."
          },
          {
            "question": "What does 'binge-watching' mean?",
            "options": ["Watching multiple episodes in a row", "Watching only once a week", "Watching in the cinema", "Watching with friends"],
            "answer": "Watching multiple episodes in a row",
            "explanation": "Binge-watching refers to watching many episodes of a show in one sitting."
          },
          {
            "question": "Who directed the movie 'Inception'?",
            "options": ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Quentin Tarantino"],
            "answer": "Christopher Nolan",
            "explanation": "Inception (2010) was directed by Christopher Nolan."
          },
          {
            "question": "Which series is based on George R.R. Martin's books?",
            "options": ["Harry Potter", "Game of Thrones", "The Witcher", "Lord of the Rings"],
            "answer": "Game of Thrones",
            "explanation": "Game of Thrones is based on Martin’s 'A Song of Ice and Fire'."
          }
        ],
        "Art": [
          {
            "question": "Who painted the famous artwork 'The Starry Night'?",
            "options": ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"],
            "answer": "Vincent van Gogh",
            "explanation": "Vincent van Gogh painted 'The Starry Night' in 1889 during his stay at the asylum in Saint-Rémy."
          },
       
          {
            "question": "Which museum houses Leonardo da Vinci's 'Mona Lisa'?",
            "options": ["The Louvre", "Uffizi Gallery", "Metropolitan Museum", "British Museum"],
            "answer": "The Louvre",
            "explanation": "The Mona Lisa is housed in the Louvre Museum in Paris, France."
          },
         
          {
            "question": "Which Spanish artist is famous for 'Guernica'?",
            "options": ["Pablo Picasso", "Joan Miró", "Salvador Dalí", "Francisco Goya"],
            "answer": "Pablo Picasso",
            "explanation": "Picasso painted 'Guernica' in 1937 as a protest against war."
          },
          {
            "question": "What is the technique of painting on wet plaster called?",
            "options": ["Mosaic", "Fresco", "Oil painting", "Tempera"],
            "answer": "Fresco",
            "explanation": "Fresco is a technique of mural painting on freshly applied plaster."
          },
          {
            "question": "Which French impressionist is known for water lilies paintings?",
            "options": ["Claude Monet", "Paul Gauguin", "Henri Matisse", "Edgar Degas"],
            "answer": "Claude Monet",
            "explanation": "Monet created the famous series of Water Lilies paintings."
          },
        
          {
            "question": "Which sculpture is Michelangelo famous for?",
            "options": ["David", "Venus de Milo", "The Thinker", "Pieta"],
            "answer": "David",
            "explanation": "Michelangelo's David is one of the most famous sculptures of the Renaissance."
          },
          {
            "question": "Which Russian art style features brightly painted wooden dolls?",
            "options": ["Matryoshka dolls", "Icon painting", "Avant-garde", "Constructivism"],
            "answer": "Matryoshka dolls",
            "explanation": "Matryoshka dolls are a traditional Russian art form."
          }
        ],
        "Fashion": [
          {
            "question": "Which fashion capital is known as the 'City of Light'?",
            "options": ["Milan", "Paris", "New York", "London"],
            "answer": "Paris",
            "explanation": "Paris is known as the 'City of Light' and is one of the world's major fashion capitals."
          },
         
          {
            "question": "Which designer is known for the little black dress concept?",
            "options": ["Coco Chanel", "Yves Saint Laurent", "Christian Dior", "Givenchy"],
            "answer": "Coco Chanel",
            "explanation": "Coco Chanel popularized the concept of the little black dress in the 1920s."
          },
          {
            "question": "Which brand is famous for its red-soled shoes?",
            "options": ["Prada", "Christian Louboutin", "Gucci", "Versace"],
            "answer": "Christian Louboutin",
            "explanation": "Christian Louboutin shoes are known for their signature red soles."
          },
          {
            "question": "Which Italian city is considered a fashion capital?",
            "options": ["Rome", "Milan", "Venice", "Florence"],
            "answer": "Milan",
            "explanation": "Milan is one of the four major global fashion capitals."
          },
          {
            "question": "What does 'fast fashion' refer to?",
            "options": ["Clothes made quickly", "Affordable trendy clothing", "Luxury fashion", "Handmade clothes"],
            "answer": "Affordable trendy clothing",
            "explanation": "Fast fashion means inexpensive clothing produced rapidly to match trends."
          },
          {
            "question": "Which luxury brand has the initials LV?",
            "options": ["Louis Vuitton", "Loewe", "Valentino", "Versace"],
            "answer": "Louis Vuitton",
            "explanation": "Louis Vuitton is a famous French luxury fashion house."
          },
         
          {
            "question": "Which fabric is made by silkworms?",
            "options": ["Cotton", "Linen", "Silk", "Polyester"],
            "answer": "Silk",
            "explanation": "Silk is a natural fiber produced by silkworms."
          },
          {
            "question": "What is the Met Gala?",
            "options": ["A fashion fundraising event", "A movie award show", "A music festival", "A sports event"],
            "answer": "A fashion fundraising event",
            "explanation": "The Met Gala is an annual fundraising gala for the Metropolitan Museum of Art's Costume Institute in New York."
          }
        ],
        "Politics": [
          {
            "question": "What is the capital of Ukraine?",
            "options": ["Kyiv", "Moscow", "Warsaw", "Bucharest"],
            "answer": "Kyiv",
            "explanation": "Kyiv is the capital and largest city of Ukraine."
          },
          {
            "question": "Which country has the largest economy in the world?",
            "options": ["China", "United States", "Germany", "Japan"],
            "answer": "United States",
            "explanation": "The United States has the largest economy by nominal GDP."
          },
          {
            "question": "What does NATO stand for?",
            "options": ["North Atlantic Treaty Organization", "National Atlantic Trade Organization", "North American Treaty Organization", "National Atlantic Treaty Organization"],
            "answer": "North Atlantic Treaty Organization",
            "explanation": "NATO is the North Atlantic Treaty Organization, a military alliance."
          },
          {
            "question": "Who is the current Secretary-General of the United Nations (as of 2025)?",
            "options": ["Ban Ki-moon", "Kofi Annan", "António Guterres", "Ursula von der Leyen"],
            "answer": "António Guterres",
            "explanation": "António Guterres from Portugal has served as UN Secretary-General since 2017."
          },
          {
            "question": "Which country recently left the European Union in 2020?",
            "options": ["France", "Germany", "United Kingdom", "Italy"],
            "answer": "United Kingdom",
            "explanation": "The UK officially left the EU on January 31, 2020, known as Brexit."
          },
          {
            "question": "What is the lower house of the U.S. Congress called?",
            "options": ["The Senate", "House of Commons", "House of Representatives", "Parliament"],
            "answer": "House of Representatives",
            "explanation": "The U.S. Congress has two chambers: the Senate and the House of Representatives."
          },
          {
            "question": "Which political ideology advocates for government ownership of industry?",
            "options": ["Capitalism", "Socialism", "Liberalism", "Conservatism"],
            "answer": "Socialism",
            "explanation": "Socialism emphasizes collective or government control over industry and production."
          },
        
          {
            "question": "Which G7 country will host the summit in 2025?",
            "options": ["Canada", "Germany", "Japan", "United States"],
            "answer": "Canada",
            "explanation": "Canada is scheduled to host the 2025 G7 summit."
          },
          {
            "question": "What does 'bipartisan' mean in politics?",
            "options": ["Support from one party only", "Support from two parties", "Support from military", "Support from citizens"],
            "answer": "Support from two parties",
            "explanation": "Bipartisan means agreement or cooperation between two major political parties."
          }
        ]
};

let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let timer = null;

// 전역 함수로 selectCategory 정의
window.selectCategory = function(category) {
    console.log('selectCategory called with:', category); // 디버깅용
    currentCategory = category;
    currentQuestionIndex = 0;
    
    // 퀴즈 컨트롤 버튼 표시
    const controls = document.getElementById('quiz').querySelector('.text-center');
    if (controls) {
        controls.style.display = 'block';
    }
    
    console.log('About to call showQuestion'); // 디버깅용
    showQuestion();
};

// 전역 함수로 selectOption 정의
window.selectOption = function(selectedIndex) {
    const question = quizData[currentCategory][currentQuestionIndex];
    const isCorrect = question.options[selectedIndex] === question.answer;
    
    // Change option button colors and add ✓/✗ indicators
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.disabled = true;
        const originalText = question.options[index]; // Save original text
        if (question.options[index] === question.answer) {
            // Correct answer with light green background and original text
            btn.style.backgroundColor = '#d4edda';
            btn.style.color = '#2d3748';
            btn.innerHTML = `<span style="color: #28a745; font-weight: bold; margin-right: 8px;">✓</span><span style="color: #2d3748;">${originalText}</span>`;
        } else {
            // Incorrect answer with light red background and original text
            btn.style.backgroundColor = '#f8d7da';
            btn.style.color = '#2d3748';
            btn.innerHTML = `<span style="color: #dc3545; font-weight: bold; margin-right: 8px;">✗</span><span style="color: #2d3748;">${originalText}</span>`;
        }
    });
    
    if (isCorrect) {
        score++;
    }
    
    document.getElementById('result').innerHTML = `
        <div class="quiz-result">
            <div class="result-section">
                <h3><i class="fas fa-${isCorrect ? 'check' : 'times'} me-2"></i>${isCorrect ? 'Correct!' : 'Incorrect'}</h3>
                <p class="answer">Answer: ${question.answer}</p>
                ${!isCorrect ? `<p class="selected-answer">Your choice: ${question.options[selectedIndex]}</p>` : ''}
            </div>
            <div class="result-section">
                <h3><i class="fas fa-info-circle me-2"></i>Explanation</h3>
                <p class="explanation">${question.explanation}</p>
            </div>
        </div>
    `;
};


document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 바로 카테고리 목록 표시
    showCategoryList();
    
    document.getElementById('showAnswer').addEventListener('click', showAnswer);
    document.getElementById('nextQuiz').addEventListener('click', nextQuestion);
    document.getElementById('backToCategories').addEventListener('click', showCategoryList);
    document.getElementById('refreshQuiz').addEventListener('click', () => location.reload());
});

function showCategoryList() {
    // Start 버튼 숨기기
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').innerHTML = '';
    
    let categoryHTML = '<div class="category-list"><h3>Choose a Category:</h3><div class="category-grid">';
    
    Object.keys(quizData).forEach(category => {
        const questionCount = quizData[category].length;
        categoryHTML += `
            <button class="category-btn" onclick="selectCategory('${category}')">
                <div class="category-name">${category}</div>
                <div class="category-count">${questionCount} Questions</div>
            </button>
        `;
    });
    
    categoryHTML += '</div></div>';
    
    document.getElementById('question').innerHTML = categoryHTML;
    
    // 퀴즈 컨트롤 버튼 숨기기
    const controls = document.getElementById('quiz').querySelector('.text-center');
    if (controls) {
        controls.style.display = 'none';
    }
}


function showQuestionList() {
    const questions = quizData[currentCategory];
    
    let questionListHTML = `<div class="question-list">
        <h3>Select a ${currentCategory} question:</h3>
        <div class="question-grid">`;
    
    questions.forEach((question, index) => {
        questionListHTML += `
            <button class="question-btn" onclick="selectQuestion(${index})">
                ${index + 1}. ${question.question}
            </button>
        `;
    });
    
    questionListHTML += `
        </div>
        <button class="back-btn" onclick="showCategoryList()">← Categories</button>
    </div>`;
    
    document.getElementById('question').innerHTML = questionListHTML;
    
    // 퀴즈 컨트롤 버튼 숨기기
    const controls = document.getElementById('quiz').querySelector('.text-center');
    if (controls) {
        controls.style.display = 'none';
    }
}

function selectQuestion(index) {
    currentQuestionIndex = index;
    showQuestion();
}

function showQuestion() {
    console.log('showQuestion called'); // 디버깅용
    console.log('currentCategory:', currentCategory); // 디버깅용
    console.log('currentQuestionIndex:', currentQuestionIndex); // 디버깅용
    console.log('quizData[currentCategory]:', quizData[currentCategory]); // 디버깅용
    
    const question = quizData[currentCategory][currentQuestionIndex];
    console.log('question:', question); // 디버깅용
    
    const totalQuestions = quizData[currentCategory].length;
    const questionNumber = currentQuestionIndex + 1;
    
    document.getElementById('question').innerHTML = `
        <div class="question-counter">${questionNumber} of ${totalQuestions}</div>
        <div class="question-text">${question.question}</div>
        <div class="options-container">
            ${question.options.map((option, index) => `
                <button class="option-btn" onclick="selectOption(${index})">${option}</button>
            `).join('')}
        </div>
    `;
    document.getElementById('result').innerHTML = '';
    
    // 퀴즈 컨트롤 버튼 표시
    const controls = document.getElementById('quiz').querySelector('.text-center');
    if (controls) {
        controls.style.display = 'block';
    }
}


// Option selection function
function selectOption(selectedIndex) {
    const question = quizData[currentCategory][currentQuestionIndex];
    const isCorrect = question.options[selectedIndex] === question.answer;
    
    // Change option button colors and add ✓/✗ indicators
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.disabled = true;
        const originalText = question.options[index]; // Save original text
        if (question.options[index] === question.answer) {
            // Correct answer with light green background and original text
            btn.style.backgroundColor = '#d4edda';
            btn.style.color = '#2d3748';
            btn.innerHTML = `<span style="color: #28a745; font-weight: bold; margin-right: 8px;">✓</span><span style="color: #2d3748;">${originalText}</span>`;
        } else {
            // Incorrect answer with light red background and original text
            btn.style.backgroundColor = '#f8d7da';
            btn.style.color = '#2d3748';
            btn.innerHTML = `<span style="color: #dc3545; font-weight: bold; margin-right: 8px;">✗</span><span style="color: #2d3748;">${originalText}</span>`;
        }
    });
    
    document.getElementById('result').innerHTML = `
        <div class="quiz-result">
            <div class="result-section">
                <h3><i class="fas fa-${isCorrect ? 'check' : 'times'} me-2"></i>${isCorrect ? 'Correct!' : 'Incorrect'}</h3>
                <p class="answer">Answer: ${question.answer}</p>
                ${!isCorrect ? `<p class="selected-answer">Your choice: ${question.options[selectedIndex]}</p>` : ''}
            </div>
            <div class="result-section">
                <h3><i class="fas fa-info-circle me-2"></i>Explanation</h3>
                <p class="explanation">${question.explanation}</p>
            </div>
        </div>
    `;
}

function showAnswer() {
    const question = quizData[currentCategory][currentQuestionIndex];
    
    // Disable all option buttons and show correct/incorrect answers
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.disabled = true;
        const originalText = question.options[index]; // Save original text
        if (question.options[index] === question.answer) {
            // Correct answer with light green background and original text
            btn.style.backgroundColor = '#d4edda';
            btn.style.color = '#2d3748';
            btn.innerHTML = `<span style="color: #28a745; font-weight: bold; margin-right: 8px;">✓</span><span style="color: #2d3748;">${originalText}</span>`;
        } else {
            // Incorrect answer with light red background and original text
            btn.style.backgroundColor = '#f8d7da';
            btn.style.color = '#2d3748';
            btn.innerHTML = `<span style="color: #dc3545; font-weight: bold; margin-right: 8px;">✗</span><span style="color: #2d3748;">${originalText}</span>`;
        }
    });
    
    document.getElementById('result').innerHTML = `
        <div class="quiz-result">
            <div class="result-section">
                <h3><i class="fas fa-lightbulb me-2"></i>Answer</h3>
                <p class="answer">Answer: ${question.answer}</p>
            </div>
            <div class="result-section">
                <h3><i class="fas fa-info-circle me-2"></i>Explanation</h3>
                <p class="explanation">${question.explanation}</p>
            </div>
        </div>
    `;
}

function nextQuestion() {
    const categoryQuestions = quizData[currentCategory];
    
    if (currentQuestionIndex < categoryQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        // 마지막 문제이면 첫 번째 문제로 돌아가기
        currentQuestionIndex = 0;
        showQuestion();
    }
}

function showFinalScore() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').innerHTML = `
        <div class="quiz-result">
            <div class="result-section text-center">
                <h3><i class="fas fa-trophy me-2"></i>퀴즈 완료!</h3>
                <p class="answer">총 ${quizData.length}문제 중 ${currentQuestionIndex}문제를 완료했습니다!</p>
                <button id="restartQuiz" class="btn btn-primary mt-3">
                    <i class="fas fa-redo me-2"></i>다시 시작
                </button>
            </div>
        </div>
    `;
    
    // 다시 시작 버튼 이벤트 리스너 추가
    document.getElementById('restartQuiz').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById('startButton').style.display = 'inline-block';
        document.getElementById('result').innerHTML = '';
    });
}


