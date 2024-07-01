document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = [
        "airport(공항)", "luggage(수하물)", "security(보안)", "boarding pass(탑승권)", "customs(세관)", "duty-free(면세)",
        "arrival(도착)", "departure(출발)", "check-in(체크인)", "gate(게이트)", "terminal(터미널)", "baggage claim(수하물 찾기)",
        "immigration(출입국 심사)", "visa(비자)", "flight(비행)", "ticket(티켓)", "passport(여권)", "taxi(택시)", "shuttle(셔틀)", "hotel(호텔)",
        "reservation(예약)", "delay(지연)", "cancellation(취소)", "connection(연결)", "aisle seat(통로 좌석)", "window seat(창가 좌석)",
        "itinerary(여행 일정)", "guidebook(안내서)", "sightseeing(관광)", "souvenir(기념품)", "tourist(관광객)", "excursion(소풍)",
        "backpack(배낭)", "travel insurance(여행 보험)", "map(지도)", "currency exchange(환전)", "landmark(랜드마크)", "museum(박물관)",
        "monument(기념비)", "beach(해변)", "resort(리조트)", "cruise(크루즈)", "adventure(모험)", "destination(목적지)", "embassy(대사관)",
        "hostel(호스텔)", "accommodation(숙소)", "cabin(오두막)", "check-out(체크아웃)", "check-in desk(체크인 데스크)", "concierge(컨시어지)",
        "complimentary(무료)", "continental breakfast(유럽식 아침 식사)", "double room(더블룸)", "single room(싱글룸)", "suite(스위트)",
        "vacation(휴가)", "holiday(휴일)", "round trip(왕복 여행)", "one-way ticket(편도 티켓)", "tour guide(관광 가이드)", "travel agency(여행사)",
        "excursion(소풍)", "holidaymaker(휴가객)", "voyage(항해)", "hiking(등산)", "trekking(트레킹)", "camping(캠핑)", "safari(사파리)",
        "campsite(캠핑장)", "car rental(렌터카)", "traveling(여행)", "adventure(모험)", "expedition(탐험)", "journey(여정)",
        "road trip(로드 트립)", "lounge(라운지)", "arrival hall(도착 홀)", "departure lounge(출발 라운지)", "boarding gate(탑승 게이트)",
        "carry-on baggage(기내 수하물)", "departure board(출발 게시판)", "duty-free shop(면세점)", "electronic ticket(전자 티켓)",
        "flight number(항공편 번호)", "hand luggage(휴대 수하물)", "hotel voucher(호텔 바우처)", "in-flight meal(기내 식사)", "lounge access(라운지 이용)",
        "non-stop flight(직항)", "online check-in(온라인 체크인)", "overhead compartment(머리 위 수납칸)", "priority boarding(우선 탑승)",
        "seat assignment(좌석 배정)", "stopover(경유)", "travel adapter(여행용 어댑터)", "travel pillow(여행용 베개)", "travel size(여행용 크기)",
        "window shade(창문 가리개)", "airfare(항공 요금)", "airline lounge(항공사 라운지)", "travel itinerary(여행 일정)", "passport control(여권 심사)",
        "runway(활주로)", "visa on arrival(도착 비자)", "security check(보안 검사)", "airport shuttle(공항 셔틀)", "baggage carousel(수하물 회전대)",
        "arrival gate(도착 게이트)", "departure gate(출발 게이트)", "luggage tag(수하물 태그)", "in-flight entertainment(기내 엔터테인먼트)",
        "flight attendant(승무원)", "business class(비즈니스 클래스)", "economy class(이코노미 클래스)", "premium economy(프리미엄 이코노미)",
        "airline ticket(항공권)", "frequent flyer(단골 승객)", "flight schedule(항공 일정)", "gate number(게이트 번호)", "boarding time(탑승 시간)",
        "landing time(착륙 시간)", "takeoff time(이륙 시간)", "connecting flight(연결 비행편)", "layover(경유)", "air traffic control(항공 교통 관제)",
        "airport terminal(공항 터미널)", "baggage handler(수하물 처리인)", "airline meal(항공기 식사)", "baggage allowance(수하물 허용 한도)",
        "checked baggage(위탁 수하물)", "carry-on luggage(기내 수하물)", "boarding announcement(탑승 안내)", "final call(최종 호출)", "ground transportation(지상 교통)",
        "rental car(렌터카)", "car hire(렌터카)", "taxi stand(택시 승강장)", "airport transfer(공항 이동)", "shuttle bus(셔틀 버스)", "private transfer(개인 이동)",
        "ride-sharing(승차 공유)", "vip lounge(VIP 라운지)", "duty-free shopping(면세 쇼핑)", "travel card(여행 카드)", "sim card(심 카드)", "mobile hotspot(모바일 핫스팟)",
        "international roaming(국제 로밍)", "tourist information(관광 정보)", "local guide(현지 가이드)", "city map(도시 지도)", "metro pass(지하철 패스)",
        "train ticket(기차 티켓)", "bus pass(버스 패스)", "ferry ticket(페리 티켓)", "city tour(도시 투어)", "hop-on hop-off bus(탑승 및 하차 버스)",
        "guided tour(가이드 투어)", "walking tour(도보 투어)", "bike tour(자전거 투어)", "segway tour(세그웨이 투어)", "scooter rental(스쿠터 대여)",
        "moped rental(모페드 대여)", "camping gear(캠핑 장비)", "tent rental(텐트 대여)", "hiking boots(등산화)", "outdoor clothing(아웃도어 의류)", "rain jacket(비옷)",
        "travel backpack(여행 배낭)", "daypack(하루 배낭)", "packing cubes(짐 정리 큐브)", "luggage scale(수하물 저울)", "travel lock(여행 자물쇠)", "medical kit(의료 키트)",
        "first aid kit(구급 상자)", "emergency contact(비상 연락처)", "flight details(항공편 정보)", "hotel booking(호텔 예약)", "reservation confirmation(예약 확인서)",
        "booking reference(예약 참조)", "confirmation number(확인 번호)", "check-in time(체크인 시간)", "check-out time(체크아웃 시간)", "late check-out(늦은 체크아웃)",
        "early check-in(이른 체크인)", "breakfast included(조식 포함)", "room service(룸 서비스)", "mini bar(미니 바)", "hotel amenities(호텔 편의 시설)", "swimming pool(수영장)",
        "fitness center(피트니스 센터)", "business center(비즈니스 센터)", "conference room(회의실)", "free wi-fi(무료 와이파이)", "laundry service(세탁 서비스)", "wake-up call(모닝콜)",
        "housekeeping(객실 관리)", "room upgrade(객실 업그레이드)", "sea view(바다 전망)", "city view(도시 전망)", "balcony room(발코니 객실)", "suite room(스위트 룸)", "executive suite(임원 스위트)",
        "honeymoon suite(허니문 스위트)", "family room(가족 객실)", "connecting room(연결 객실)", "pet-friendly(반려동물 친화적)", "non-smoking room(금연 객실)", "smoking room(흡연 객실)",
        "extra bed(추가 침대)", "baby cot(아기 침대)", "breakfast buffet(조식 뷔페)", "continental breakfast(유럽식 아침 식사)", "full board(풀 보드)", "half board(하프 보드)", "all inclusive(올 인클루시브)",
        "a la carte(일품 요리)", "room rate(객실 요금)", "special offer(특별 할인)", "discount code(할인 코드)", "promo code(프로모션 코드)", "travel package(여행 패키지)", "holiday package(휴일 패키지)",
        "flight and hotel(항공편 및 호텔)", "car rental package(렌터카 패키지)", "last-minute deal(마지막 순간 거래)", "early bird discount(조기 예약 할인)", "off-peak season(비수기)", "peak season(성수기)",
        "high season(성수기)", "low season(비수기)", "shoulder season(어깨 시즌)", "summer vacation(여름 휴가)", "winter vacation(겨울 휴가)", "spring break(봄 방학)", "fall getaway(가을 휴가)",
        "weekend trip(주말 여행)", "holiday weekend(휴일 주말)", "public holiday(공휴일)", "national holiday(국경일)", "local festival(지역 축제)", "cultural event(문화 행사)", "music festival(음악 축제)",
        "food festival(음식 축제)", "film festival(영화제)", "art exhibition(미술 전시회)", "museum pass(박물관 패스)", "gallery ticket(갤러리 티켓)", "concert ticket(콘서트 티켓)", "theater ticket(극장 티켓)",
        "opera ticket(오페라 티켓)", "ballet ticket(발레 티켓)", "sporting event(스포츠 행사)", "football match(축구 경기)", "basketball game(농구 경기)", "baseball game(야구 경기)", "tennis match(테니스 경기)",
        "golf tournament(골프 대회)", "ski pass(스키 패스)", "lift ticket(리프트 티켓)", "snowboard rental(스노보드 대여)", "ski rental(스키 대여)", "snowshoe rental(스노우슈 대여)", "sledding(썰매 타기)",
        "ice skating(아이스 스케이팅)", "dog sledding(개 썰매 타기)", "snowmobiling(스노모빌 타기)", "hot air balloon(열기구)", "paragliding(패러글라이딩)", "bungee jumping(번지 점프)", "zip-lining(집라인 타기)",
        "scuba diving(스쿠버 다이빙)", "snorkeling(스노클링)", "surfing(서핑)", "wind surfing(윈드 서핑)", "kite surfing(카이트 서핑)", "sailing(세일링)", "yacht charter(요트 대여)", "fishing trip(낚시 여행)",
        "whale watching(고래 관찰)", "dolphin tour(돌고래 투어)", "shark diving(상어 다이빙)", "coral reef(산호초)", "marine reserve(해양 보호구역)", "underwater camera(수중 카메라)", "waterproof case(방수 케이스)",
        "beach towel(해변 타월)", "beach umbrella(해변 우산)", "beach chair(해변 의자)", "sun lounger(선 라운저)", "poolside bar(수영장 바)", "swim-up bar(수영장 바)", "beach bar(해변 바)", "tiki bar(티키 바)",
        "sunset cruise(선셋 크루즈)", "dinner cruise(디너 크루즈)", "river cruise(강 크루즈)", "canal tour(운하 투어)", "boat rental(보트 대여)", "kayak rental(카약 대여)", "canoe rental(카누 대여)", "stand-up paddleboarding(스탠드업 패들보드)",
        "jet skiing(제트 스키)", "water skiing(워터 스키)", "wakeboarding(웨이크보드 타기)", "windsurfing(윈드 서핑)", "sailing lessons(세일링 수업)", "diving lessons(다이빙 수업)", "snorkeling gear(스노클링 장비)", "fishing gear(낚시 장비)",
        "fishing license(낚시 면허)", "hunting license(사냥 면허)", "nature reserve(자연 보호구역)", "wildlife sanctuary(야생 동물 보호구역)", "national park(국립 공원)", "state park(주립 공원)", "provincial park(주립 공원)", "botanical garden(식물원)",
        "arboretum(수목원)", "zoo ticket(동물원 티켓)", "aquarium ticket(수족관 티켓)", "wildlife tour(야생 동물 투어)", "safari tour(사파리 투어)", "jungle trek(정글 트레킹)", "rainforest hike(열대 우림 하이킹)", "mountain trek(산 트레킹)",
        "desert safari(사막 사파리)", "camel ride(낙타 타기)", "horseback riding(승마)", "elephant ride(코끼리 타기)", "ox cart ride(황소 카트 타기)", "hot springs(온천)", "mud bath(머드 목욕)", "spa treatment(스파 트리트먼트)", "massage therapy(마사지 치료)",
        "facial treatment(얼굴 트리트먼트)", "manicure(매니큐어)", "pedicure(페디큐어)", "hair salon(미용실)", "beauty salon(뷰티 살롱)", "fitness class(피트니스 수업)", "yoga class(요가 수업)", "pilates class(필라테스 수업)", "dance class(댄스 수업)",
        "cooking class(요리 수업)", "language class(언어 수업)", "photography class(사진 수업)", "art class(미술 수업)", "craft workshop(공예 워크샵)", "cultural workshop(문화 워크샵)", "wine tasting(와인 시음)", "brewery tour(맥주 양조장 투어)",
        "distillery tour(증류소 투어)", "chocolate factory(초콜릿 공장)", "cheese factory(치즈 공장)", "farm visit(농장 방문)", "vineyard tour(포도밭 투어)", "orchard tour(과수원 투어)", "market tour(시장 투어)", "food tour(음식 투어)",
        "gourmet dinner(고급 디너)", "street food(길거리 음식)", "food stall(음식 가판대)", "food truck(푸드 트럭)", "night market(야시장)", "flea market(벼룩시장)", "artisan market(장인 시장)", "craft market(공예 시장)", "souvenir shop(기념품 가게)",
        "gift shop(선물 가게)", "handicraft(수공예품)", "local art(현지 예술)", "folk art(민속 예술)", "traditional costume(전통 의상)", "ceramic(도자기)", "pottery(도자기)", "wood carving(목각)", "stone carving(석각)", "jewelry(보석)", "beads(구슬)", "textiles(섬유)",
        "weaving(직조)", "embroidery(자수)", "knitting(뜨개질)", "crochet(코바늘 뜨기)", "quilting(퀼팅)", "sewing(바느질)", "dressmaking(옷 만들기)", "tailoring(재단)", "custom tailoring(맞춤 재단)", "bespoke tailoring(맞춤 재단)", "suit fitting(정장 맞춤)",
        "clothing alteration(의류 수선)", "shoe repair(신발 수선)", "leather goods(가죽 제품)", "bag repair(가방 수선)", "watch repair(시계 수리)", "jewelry repair(보석 수리)", "electronics repair(전자 제품 수리)", "gadget repair(가젯 수리)", "camera repair(카메라 수리)",
        "phone repair(전화기 수리)", "laptop repair(노트북 수리)", "computer repair(컴퓨터 수리)", "tablet repair(태블릿 수리)", "screen repair(화면 수리)", "battery replacement(배터리 교체)", "charger replacement(충전기 교체)", "headphones(헤드폰)", "earbuds(이어버드)",
        "bluetooth speaker(블루투스 스피커)", "portable charger(휴대용 충전기)", "power bank(보조 배터리)", "travel adapter(여행용 어댑터)", "voltage converter(전압 변환기)", "plug adapter(플러그 어댑터)", "usb cable(USB 케이블)", "hdmi cable(HDMI 케이블)", "memory card(메모리 카드)",
        "memory card reader(메모리 카드 리더기)", "external hard drive(외장 하드 드라이브)", "flash drive(플래시 드라이브)", "portable wifi(휴대용 와이파이)", "wifi hotspot(와이파이 핫스팟)", "international sim card(국제 심 카드)", "data plan(데이터 요금제)", "roaming plan(로밍 요금제)",
        "gps device(GPS 장치)", "satellite phone(위성 전화)", "walkie talkie(워키토키)", "two-way radio(양방향 라디오)", "emergency beacon(비상 신호기)", "first aid kit(구급 상자)", "emergency kit(비상 키트)", "survival kit(생존 키트)", "tool kit(도구 키트)", "sewing kit(바느질 키트)",
        "repair kit(수리 키트)", "cleaning kit(청소 키트)", "grooming kit(그루밍 키트)", "shaving kit(면도 키트)", "manicure kit(매니큐어 키트)", "pedicure kit(페디큐어 키트)", "makeup kit(메이크업 키트)", "toiletry kit(세면 도구 키트)", "travel toothbrush(여행용 칫솔)",
        "toothpaste(치약)", "mouthwash(구강 세정제)", "dental floss(치실)", "shampoo(샴푸)", "conditioner(컨디셔너)", "body wash(바디 워시)", "soap(비누)", "hand sanitizer(손 소독제)", "disinfectant wipes(소독용 물티슈)", "deodorant(데오도란트)", "perfume(향수)",
        "sunscreen(자외선 차단제)", "lip balm(립밤)", "moisturizer(보습제)", "facial cleanser(클렌징 폼)", "toner(토너)", "serum(세럼)", "eye cream(아이 크림)", "face mask(페이스 마스크)", "hand cream(핸드 크림)", "foot cream(풋 크림)", "body lotion(바디 로션)",
        "nail polish(매니큐어)", "nail polish remover(매니큐어 제거제)", "hair brush(헤어 브러시)", "comb(빗)", "hair ties(머리끈)", "hair clips(헤어 클립)", "hair dryer(헤어 드라이어)", "curling iron(고데기)", "flat iron(매직기)", "hair straightener(헤어 스트레이트너)",
        "hair curler(고데기)", "hair gel(헤어 젤)", "hair spray(헤어 스프레이)", "shaving cream(면도 크림)", "razor(면도기)", "electric razor(전기 면도기)", "beard trimmer(수염 트리머)", "nose hair trimmer(코털 트리머)", "eyebrow trimmer(눈썹 트리머)", "scissors(가위)",
        "nail clippers(손톱깎이)", "tweezers(핀셋)", "eyelash curler(뷰러)", "cotton pads(화장솜)", "cotton swabs(면봉)", "tissue(티슈)", "wet wipes(물티슈)", "face wipes(페이스 와입스)", "makeup remover(메이크업 리무버)", "makeup brush(메이크업 브러시)", "makeup sponge(메이크업 스펀지)",
        "foundation(파운데이션)", "concealer(컨실러)", "blush(블러쉬)", "bronzer(브론저)", "highlighter(하이라이터)", "contour(컨투어)", "eye shadow(아이섀도우)", "eyeliner(아이라이너)", "mascara(마스카라)", "lipstick(립스틱)", "lip gloss(립글로스)", "lip liner(립 라이너)",
        "brow pencil(브로우 펜슬)", "brow gel(브로우 젤)", "brow powder(브로우 파우더)", "brow brush(브로우 브러시)", "lash serum(래쉬 세럼)", "lash extensions(속눈썹 연장)"
    ];

    const keywordList = document.getElementById('keywordList');
    keywords.forEach(keyword => {
        const li = document.createElement('li');
        li.textContent = keyword;
        li.addEventListener('click', async () => {
            topicInput.value = keyword;
            topicInput.scrollIntoView({ behavior: 'smooth' });

            // Automatically generate sentences after setting the topic
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
            const response = await fetch('http://localhost:3000/generate-sentences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic: topic })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

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
            const textSpan = document.createElement('span');
            textSpan.textContent = sentence;
            li.appendChild(textSpan);

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
        // Extract only the English part of the sentence
        const englishPartMatch = sentence.match(/^[^\(]+/);
        const englishPart = englishPartMatch ? englishPartMatch[0].trim() : sentence;
        const utterance = new SpeechSynthesisUtterance(englishPart);
        utterance.lang = 'en-US'; // Set the language to English (United States)
        utterance.rate = 0.9; // Slow down the speech rate
        window.speechSynthesis.speak(utterance);
    }
});
