document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        daily_routines: [
            "wake up(일어나다)", "brush teeth(양치하다)", "take a shower(샤워하다)", "eat breakfast(아침 먹다)", 
            "go to work(출근하다)", "have lunch(점심 먹다)", "finish work(퇴근하다)", "have dinner(저녁 먹다)", 
            "watch TV(텔레비전 보다)", "read a book(책 읽다)", "exercise(운동하다)", "go to bed(잠자리에 들다)", 
            "commute(통근하다)", "study(공부하다)", "clean the house(집 청소하다)", "do laundry(빨래하다)", 
            "cook dinner(저녁 요리하다)", "walk the dog(개 산책시키다)", "feed the cat(고양이 밥 주다)", "water the plants(식물에 물 주다)", 
            "check email(이메일 확인하다)", "go for a run(달리기 하다)", "take out the trash(쓰레기 버리다)", "make the bed(침대 정리하다)", 
            "wash dishes(설거지하다)", "vacuum the floor(바닥 청소기 돌리다)", "iron clothes(옷 다림질하다)", "prepare lunch(점심 준비하다)", 
            "pack lunch(점심 싸다)", "attend a meeting(회의에 참석하다)", "answer phone calls(전화 받다)", "write a report(보고서 작성하다)", 
            "send an email(이메일 보내다)", "pick up groceries(식료품 사다)", "go grocery shopping(식료품 쇼핑하다)", "pay bills(청구서 납부하다)", 
            "walk to work(직장까지 걷다)", "take a nap(낮잠 자다)", "have a snack(간식 먹다)", "browse the internet(인터넷 검색하다)", 
            "listen to music(음악 듣다)", "meditate(명상하다)", "do yoga(요가하다)", "stretch(스트레칭하다)", 
            "take a break(휴식하다)", "call a friend(친구에게 전화하다)", "text someone(문자 보내다)", "play a game(게임하다)", 
            "wash the car(차 세차하다)", "mow the lawn(잔디 깎다)", "rake leaves(낙엽을 긁다)", "shovel snow(눈 치우다)", 
            "go for a walk(산책하다)", "ride a bike(자전거 타다)", "visit a friend(친구를 방문하다)", "go to the gym(체육관에 가다)", 
            "take a bath(목욕하다)", "brush hair(머리 빗다)", "shave(면도하다)", "put on makeup(화장하다)", 
            "get dressed(옷 입다)", "get undressed(옷 벗다)", "do homework(숙제하다)", "prepare breakfast(아침 준비하다)", 
            "tidy up(정리정돈하다)", "set the table(식탁 차리다)", "clear the table(식탁 치우다)", "dust the furniture(가구 먼지 털다)", 
            "sweep the floor(바닥 쓸다)", "mop the floor(바닥 닦다)", "organize the closet(옷장 정리하다)", "fold laundry(빨래 개다)", 
            "hang up clothes(옷 걸다)", "water the garden(정원에 물 주다)", "feed the fish(물고기 먹이 주다)", "go to school(학교 가다)", 
            "leave for work(출근하다)", "catch the bus(버스 타다)", "take the train(기차 타다)", "drive to work(운전해서 출근하다)", 
            "park the car(차 주차하다)", "buy groceries(식료품 사다)", "pick up the kids(아이들 데리러 가다)", "drop off the kids(아이들 내려주다)", 
            "have coffee(커피 마시다)", "drink water(물 마시다)", "eat dinner(저녁 먹다)", "take vitamins(비타민 먹다)", 
            "read the newspaper(신문 읽다)", "check the news(뉴스 확인하다)", "plan the day(하루 계획하다)", "write in a journal(일기 쓰다)", 
            "work on a project(프로젝트 작업하다)", "attend a class(수업에 참석하다)", "study for a test(시험 공부하다)", "review notes(노트 복습하다)", 
            "practice a hobby(취미 활동하다)", "sew(바느질하다)", "knit(뜨개질하다)", "paint(그림 그리다)", 
            "draw(그리다)", "write(쓰기)", "read(읽기)", "play an instrument(악기 연주하다)", "watch a movie(영화 보다)", 
            "go to the movies(영화관에 가다)", "visit a museum(박물관을 방문하다)", "attend a concert(콘서트에 참석하다)", "go to a restaurant(레스토랑에 가다)", 
            "cook a meal(음식 요리하다)", "bake cookies(쿠키 굽다)", "make coffee(커피 만들다)", "brew tea(차 끓이다)", 
            "feed a baby(아기에게 먹이다)", "change a diaper(기저귀 갈다)", "bathe a baby(아기 목욕시키다)", "read a story(이야기 읽다)", 
            "put a baby to bed(아기 재우다)", "sing a lullaby(자장가 부르다)", "comfort a crying baby(우는 아기를 달래다)", "rock a baby(아기를 흔들다)", 
            "play with a child(아이와 놀다)", "teach a child(아이를 가르치다)", "help with homework(숙제를 도와주다)", "prepare for bed(잠자리 준비하다)", 
            "say goodnight(잘 자라고 말하다)", "turn off the lights(불 끄다)", "lock the door(문 잠그다)", "set an alarm(알람 설정하다)", 
            "turn on the alarm(알람 켜다)", "check social media(소셜 미디어 확인하다)", "update social media(소셜 미디어 업데이트하다)", "post a photo(사진 올리다)", 
            "like a post(게시물 좋아요 누르다)", "comment on a post(게시물에 댓글 달다)", "share a post(게시물 공유하다)", "follow someone(누군가를 팔로우하다)", 
            "unfollow someone(누군가를 언팔로우하다)", "browse photos(사진을 둘러보다)", "watch videos(비디오를 보다)", "join a group(그룹에 가입하다)", 
            "create a group(그룹을 만들다)", "send a message(메시지 보내다)", "reply to a message(메시지에 답장하다)", "delete a message(메시지 삭제하다)", 
            "block someone(누군가를 차단하다)", "unblock someone(누군가를 차단 해제하다)", "read notifications(알림 읽다)", "clear notifications(알림 삭제하다)", 
            "check calendar(달력 확인하다)", "schedule an appointment(약속을 잡다)", "reschedule an appointment(약속을 변경하다)", "cancel an appointment(약속을 취소하다)", 
            "attend an event(행사에 참석하다)", "host an event(행사를 주최하다)", "invite friends(친구를 초대하다)", "RSVP to an event(행사에 응답하다)", 
            "shop online(온라인 쇼핑하다)", "add items to cart(장바구니에 항목 추가하다)", "checkout(결제하다)", "enter shipping information(배송 정보 입력하다)", 
            "track an order(주문을 추적하다)", "write a review(리뷰를 쓰다)", "return an item(상품을 반품하다)", "exchange an item(상품을 교환하다)", 
            "buy a gift(선물을 사다)", "wrap a gift(선물을 포장하다)", "send a gift(선물을 보내다)", "receive a gift(선물을 받다)", 
            "write a thank you note(감사 편지를 쓰다)", "donate to charity(자선 단체에 기부하다)", "volunteer(자원봉사하다)", "attend a volunteer event(자원봉사 행사에 참석하다)", 
            "clean the garage(차고 청소하다)", "organize the attic(다락방 정리하다)", "declutter the house(집 정리하다)", "donate old clothes(헌 옷 기부하다)", 
            "recycle(재활용하다)", "compost(퇴비화하다)", "plant a tree(나무 심다)", "start a garden(정원을 시작하다)", 
            "water the lawn(잔디에 물 주다)", "fertilize the lawn(잔디에 비료 주다)", "trim the hedges(생울타리를 다듬다)", "prune the trees(나무를 가지치기하다)", 
            "harvest vegetables(채소를 수확하다)", "pick fruits(과일을 따다)", "rake the garden(정원을 갈퀴질하다)", "sweep the porch(현관을 쓸다)", 
            "wash windows(창문을 닦다)", "clean the gutters(홈통을 청소하다)", "paint the fence(울타리를 페인트칠하다)", "stain the deck(데크를 착색하다)", 
            "repair a leaky faucet(새는 수도꼭지를 고치다)", "fix a broken door(고장난 문을 고치다)", "patch a hole in the wall(벽의 구멍을 메우다)", "install a new light fixture(새 조명 기구를 설치하다)", 
            "change a light bulb(전구를 갈다)", "reset the router(라우터를 리셋하다)", "upgrade the software(소프트웨어를 업그레이드하다)", "update the firmware(펌웨어를 업데이트하다)", 
            "scan documents(문서를 스캔하다)", "print documents(문서를 인쇄하다)", "send a fax(팩스를 보내다)", "make photocopies(복사하다)", 
            "file documents(문서를 파일하다)", "shred documents(문서를 파쇄하다)", "backup data(데이터를 백업하다)", "restore data(데이터를 복원하다)", 
            "format a hard drive(하드 드라이브를 포맷하다)", "defragment the hard drive(하드 드라이브를 조각 모음하다)", "clean up the desktop(데스크탑을 정리하다)", "organize files(파일을 정리하다)", 
            "delete old files(오래된 파일을 삭제하다)", "empty the recycle bin(휴지통을 비우다)", "scan for viruses(바이러스를 스캔하다)", "update antivirus software(바이러스 백신 소프트웨어를 업데이트하다)", 
            "schedule a system scan(시스템 검사를 예약하다)", "run a diagnostic(진단을 실행하다)", "troubleshoot problems(문제를 해결하다)", "call tech support(기술 지원에 전화하다)", 
            "chat with customer service(고객 서비스와 채팅하다)", "email support(지원 이메일을 보내다)", "visit a service center(서비스 센터를 방문하다)", "read a user manual(사용자 설명서를 읽다)", 
            "watch a tutorial(튜토리얼을 시청하다)", "join a webinar(웹 세미나에 참여하다)", "attend an online class(온라인 수업에 참여하다)", "participate in a discussion(토론에 참여하다)", 
            "ask a question(질문을 하다)", "answer a question(질문에 답하다)", "write a blog post(블로그 게시물을 쓰다)", "comment on a blog post(블로그 게시물에 댓글 달다)", 
            "subscribe to a blog(블로그를 구독하다)", "share a blog post(블로그 게시물을 공유하다)", "create a podcast(팟캐스트를 만들다)", "record a podcast episode(팟캐스트 에피소드를 녹음하다)", 
            "edit a podcast episode(팟캐스트 에피소드를 편집하다)", "upload a podcast episode(팟캐스트 에피소드를 업로드하다)", "promote a podcast(팟캐스트를 홍보하다)", "listen to a podcast(팟캐스트를 듣다)", 
            "write a script(대본을 쓰다)", "shoot a video(비디오를 촬영하다)", "edit a video(비디오를 편집하다)", "upload a video(비디오를 업로드하다)", 
            "watch a video tutorial(비디오 튜토리얼을 시청하다)", "create a presentation(프레젠테이션을 만들다)", "design a slide(슬라이드를 디자인하다)", "practice a presentation(프레젠테이션을 연습하다)", 
            "present a project(프로젝트를 발표하다)", "attend a workshop(워크숍에 참여하다)", "lead a workshop(워크숍을 이끌다)", "facilitate a discussion(토론을 주도하다)", 
            "moderate a panel(패널을 주재하다)", "host a webinar(웹 세미나를 주최하다)", "participate in a webinar(웹 세미나에 참여하다)", "write a review(리뷰를 쓰다)", 
            "rate a product(제품을 평가하다)", "share feedback(피드백을 공유하다)", "answer a survey(설문 조사에 답하다)", "participate in a focus group(포커스 그룹에 참여하다)", 
            "read a whitepaper(백서를 읽다)", "watch a product demo(제품 데모를 시청하다)", "join a user group(사용자 그룹에 가입하다)", "attend a conference(컨퍼런스에 참석하다)", 
            "network with peers(동료들과 네트워킹하다)", "exchange business cards(명함을 교환하다)", "follow up on leads(리드를 따르다)", "write a follow-up email(후속 이메일을 쓰다)", 
            "set a reminder(알림을 설정하다)", "schedule a meeting(회의를 예약하다)", "cancel a meeting(회의를 취소하다)", "reschedule a meeting(회의를 다시 예약하다)", 
            "join a meeting(회의에 참여하다)", "host a meeting(회의를 주최하다)", "take meeting minutes(회의록을 작성하다)", "share meeting notes(회의 노트를 공유하다)", 
            "plan an agenda(안건을 계획하다)", "prepare a presentation(프레젠테이션을 준비하다)", "facilitate a meeting(회의를 주도하다)", "assign action items(실행 항목을 할당하다)", 
            "track progress(진행 상황을 추적하다)", "follow up on tasks(작업을 추적하다)", "update a project plan(프로젝트 계획을 업데이트하다)", "set project milestones(프로젝트 이정표를 설정하다)", 
            "review project status(프로젝트 상태를 검토하다)", "report on project status(프로젝트 상태를 보고하다)", "celebrate project milestones(프로젝트 이정표를 축하하다)", "close out a project(프로젝트를 종료하다)", 
            "conduct a project review(프로젝트 검토를 수행하다)", "document lessons learned(배운 교훈을 문서화하다)", "archive project files(프로젝트 파일을 보관하다)", "plan for the next project(다음 프로젝트를 계획하다)"
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
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/generate-sentences-routines', {
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
