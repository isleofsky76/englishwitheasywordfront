document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        kitchen: [
            "oven(오븐)", "microwave(전자레인지)", "refrigerator(냉장고)", "sink(싱크대)", "stove(스토브)", "dishwasher(식기세척기)",
            "frying pan(프라이팬)", "pot(냄비)", "spatula(주걱)", "blender(믹서기)", "toaster(토스터)", "cutting board(도마)",
            "knife(칼)", "fork(포크)", "spoon(숟가락)", "plate(접시)", "bowl(그릇)", "cup(컵)", "mug(머그컵)", "glass(유리컵)",
            "measuring cup(계량컵)", "measuring spoon(계량스푼)", "colander(소쿠리)", "whisk(거품기)", "grater(강판)"
        ],
        jobs: [
            "teacher(교사)", "doctor(의사)", "nurse(간호사)", "engineer(엔지니어)", "police officer(경찰관)", "firefighter(소방관)",
            "chef(요리사)", "artist(예술가)", "musician(음악가)", "actor(배우)", "writer(작가)", "scientist(과학자)",
            "pilot(조종사)", "mechanic(정비사)", "lawyer(변호사)", "accountant(회계사)", "architect(건축가)", "dentist(치과의사)",
            "pharmacist(약사)", "veterinarian(수의사)", "journalist(기자)", "photographer(사진사)"
        ],
        insects: [
            "ant(개미)", "bee(벌)", "butterfly(나비)", "cockroach(바퀴벌레)", "cricket(귀뚜라미)", "dragonfly(잠자리)",
            "fly(파리)", "grasshopper(메뚜기)", "ladybug(무당벌레)", "mosquito(모기)", "spider(거미)", "termite(흰개미)",
            "wasp(말벌)", "beetle(딱정벌레)", "caterpillar(애벌레)", "moth(나방)", "flea(벼룩)"
        ],
        halloween_monsters: [
            "vampire(뱀파이어)", "werewolf(늑대인간)", "zombie(좀비)", "witch(마녀)", "ghost(유령)", "mummy(미라)",
            "skeleton(해골)", "goblin(도깨비)", "ghoul(구울)", "frankenstein(프랑켄슈타인)", "troll(트롤)", "demon(악마)",
            "reaper(사신)", "monster(괴물)", "poltergeist(폴터가이스트)"
        ],
        fast_food: [
            "burger(버거)", "fries(감자튀김)", "pizza(피자)", "hot dog(핫도그)", "nuggets(너겟)", "soda(탄산음료)",
            "milkshake(밀크쉐이크)", "taco(타코)", "burrito(부리또)", "chicken wings(치킨 윙)", "sandwich(샌드위치)",
            "salad(샐러드)", "donut(도넛)", "ice cream(아이스크림)", "sub(서브 샌드위치)", "wrap(랩)"
        ],
        fruits: [
            "apple(사과)", "banana(바나나)", "grape(포도)", "orange(오렌지)", "lemon(레몬)", "strawberry(딸기)",
            "blueberry(블루베리)", "pineapple(파인애플)", "watermelon(수박)", "melon(멜론)", "cherry(체리)", "pear(배)",
            "peach(복숭아)", "kiwi(키위)", "mango(망고)", "papaya(파파야)", "plum(자두)", "pomegranate(석류)"
        ],
        furniture: [
            "sofa(소파)", "table(테이블)", "chair(의자)", "bed(침대)", "wardrobe(옷장)", "bookshelf(책장)",
            "desk(책상)", "drawer(서랍)", "cabinet(캐비닛)", "armchair(안락의자)", "dining table(식탁)", "coffee table(커피 테이블)",
            "nightstand(침실용 탁자)", "dresser(화장대)", "couch(긴 소파)", "ottoman(오토만)"
        ],
        christmas: [
            "tree(트리)", "lights(전구)", "ornament(장식)", "wreath(화환)", "sleigh(썰매)", "reindeer(순록)",
            "santa(산타)", "elf(요정)", "stocking(양말)", "gift(선물)", "candy cane(캔디 케인)", "snowman(눈사람)",
            "gingerbread(진저브레드)", "mistletoe(겨우살이)", "poinsettia(포인세티아)", "christmas carol(크리스마스 캐럴)"
        ],
        daily_routines: [
            "wake up(일어나다)", "brush teeth(양치하다)", "take a shower(샤워하다)", "eat breakfast(아침 먹다)", "go to work(출근하다)",
            "have lunch(점심 먹다)", "finish work(퇴근하다)", "have dinner(저녁 먹다)", "watch TV(텔레비전 보다)", "read a book(책 읽다)",
            "exercise(운동하다)", "go to bed(잠자리에 들다)", "commute(통근하다)", "study(공부하다)", "clean the house(집 청소하다)"
        ],
        drinks: [
            "water(물)", "coffee(커피)", "tea(차)", "juice(주스)", "soda(탄산음료)", "milk(우유)", "wine(와인)", "beer(맥주)",
            "smoothie(스무디)", "cocktail(칵테일)", "whiskey(위스키)", "vodka(보드카)", "lemonade(레모네이드)", "iced tea(아이스티)",
            "hot chocolate(핫초코)", "energy drink(에너지 음료)"
        ],
        clothes: [
            "shirt(셔츠)", "pants(바지)", "dress(드레스)", "skirt(치마)", "jacket(자켓)", "coat(코트)", "shoes(신발)",
            "socks(양말)", "hat(모자)", "scarf(스카프)", "gloves(장갑)", "sweater(스웨터)", "jeans(청바지)", "t-shirt(티셔츠)",
            "shorts(반바지)", "belt(벨트)", "tie(넥타이)", "blouse(블라우스)", "boots(부츠)", "sandals(샌들)"
        ],
        birds: [
            "sparrow(참새)", "eagle(독수리)", "parrot(앵무새)", "owl(부엉이)", "penguin(펭귄)", "flamingo(홍학)",
            "peacock(공작)", "duck(오리)", "swan(백조)", "seagull(갈매기)", "pigeon(비둘기)", "hummingbird(벌새)",
            "woodpecker(딱따구리)", "robin(울새)", "crow(까마귀)", "dove(비둘기)", "heron(왜가리)"
        ],
        body_parts: [
            "head(머리)", "eye(눈)", "ear(귀)", "nose(코)", "mouth(입)", "arm(팔)", "hand(손)", "leg(다리)",
            "foot(발)", "finger(손가락)", "toe(발가락)", "knee(무릎)", "elbow(팔꿈치)", "shoulder(어깨)", "neck(목)",
            "back(등)", "stomach(배)", "chest(가슴)", "hip(엉덩이)", "waist(허리)", "ankle(발목)", "wrist(손목)"
        ],
        transportation: [
            "car(자동차)", "bus(버스)", "train(기차)", "bicycle(자전거)", "motorcycle(오토바이)", "airplane(비행기)",
            "ship(배)", "subway(지하철)", "tram(전차)", "taxi(택시)", "truck(트럭)", "scooter(스쿠터)", "helicopter(헬리콥터)",
            "ferry(페리)", "metro(지하철)", "van(밴)", "ambulance(구급차)", "police car(경찰차)", "fire truck(소방차)"
        ],
        school_supplies: [
            "backpack(배낭)", "notebook(노트)", "pencil(연필)", "ruler(자)", "eraser(지우개)", "marker(마커)", "binder(바인더)",
            "glue(풀)", "scissors(가위)", "calculator(계산기)", "highlighter(형광펜)"
        ],
        bathroom: [
            "towel(수건)", "soap(비누)", "shampoo(샴푸)", "conditioner(컨디셔너)", "toothbrush(칫솔)", "toothpaste(치약)",
            "shower(샤워)", "bathtub(욕조)", "toilet(변기)", "mirror(거울)", "faucet(수도꼭지)"
        ],
        garden: [
            "flower(꽃)", "tree(나무)", "grass(잔디)", "soil(흙)", "shovel(삽)", "rake(갈퀴)", "hose(호스)", "lawnmower(잔디 깎이)",
            "wheelbarrow(외바퀴 손수레)", "fertilizer(비료)", "watering can(물뿌리개)"
        ],
        technology: [
            "computer(컴퓨터)", "smartphone(스마트폰)", "tablet(태블릿)", "internet(인터넷)", "software(소프트웨어)",
            "hardware(하드웨어)", "application(애플리케이션)", "email(이메일)", "keyboard(키보드)", "screen(화면)"
        ],
        hobbies: [
            "painting(그림 그리기)", "reading(독서)", "gardening(원예)", "cooking(요리)", "photography(사진 촬영)",
            "knitting(뜨개질)", "playing guitar(기타 치기)", "hiking(등산)", "fishing(낚시)", "traveling(여행)"
        ],
        health: [
            "doctor(의사)", "nurse(간호사)", "medicine(약)", "hospital(병원)", "clinic(진료소)", "appointment(예약)",
            "prescription(처방전)", "exercise(운동)", "diet(식단)", "vaccination(예방접종)"
        ],
        weather: [
            "sunny(맑은)", "rainy(비 오는)", "cloudy(흐린)", "snowy(눈 오는)", "windy(바람 부는)", "stormy(폭풍우)",
            "foggy(안개 낀)", "thunder(천둥)", "lightning(번개)", "temperature(온도)"
        ],
        shopping: [
            "mall(쇼핑몰)", "supermarket(슈퍼마켓)", "cashier(계산원)", "discount(할인)", "receipt(영수증)", "cart(카트)",
            "basket(바구니)", "price tag(가격표)", "aisle(통로)", "fitting room(탈의실)"
        ]
    };
    

    const keywordList = document.getElementById('keywordList');
    for (const category in keywords) {
        // Create and append the category headline
        const headline = document.createElement('h3');
        headline.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        headline.classList.add('keyword-headline'); // *** Add a class for styling ***
        keywordList.appendChild(headline);

        // Append each keyword under the respective headline
        keywords[category].forEach(keyword => {
            const li = document.createElement('li');
            li.textContent = keyword;
            li.addEventListener('click', async () => {
                topicInput.value = keyword;
                topicInput.scrollIntoView({ behavior: 'smooth' });

                resultsSection.style.display = 'none';
                loadingSection.style.display = 'block';

                try {
                    const sentences = await generateSentences(keyword);
                    displaySentences(sentences);
                } catch (error) {
                    alert('Error generating sentences. Please try again later.');
                } finally {
                    loadingSection.style.display = 'none';
                }
            });
            keywordList.appendChild(li);
        });
    }

    generateButton.addEventListener('click', async function() {
        const topic = topicInput.value.trim();

        if (!topic) {
            alert('Please enter a topic.');
            return;
        }

        document.getElementById('selectedTopic').innerText = topic;
        resultsSection.style.display = 'none';
        loadingSection.style.display = 'block';

        try {
            const sentences = await generateSentences(topic);
            displaySentences(sentences);
        } catch (error) {
            alert('Error generating sentences. Please try again later.');
        } finally {
            loadingSection.style.display = 'none';
        }
    });

    async function generateSentences(topic) {
        try {
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/generate-sentences2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: topic })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            return data.sentences;
        } catch (error) {
            console.error('Error generating sentences:', error);
            throw error;
        }
    }

    function displaySentences(sentences) {
        sentenceList.innerHTML = '';
        sentences.split('\n').forEach(sentence => {
            const li = document.createElement('li');
            li.textContent = sentence;

            const readButton = document.createElement('button');
            readButton.textContent = 'Read';
            readButton.style.marginLeft = '10px';
            readButton.addEventListener('click', () => readSentence(sentence));
            li.appendChild(readButton);

            sentenceList.appendChild(li);
        });
        resultsSection.style.display = 'block';
    }

    function readSentence(sentence) {
        const englishPart = sentence.match(/^[^\(]+/)[0].trim();
        const utterance = new SpeechSynthesisUtterance(englishPart);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    }
});
