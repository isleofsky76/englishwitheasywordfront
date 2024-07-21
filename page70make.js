const words = [
    {
        "korean": "만들다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She likes to make pottery (그녀는 도자기를 만드는 것을 좋아합니다).",
            "We need to make dinner (우리는 저녁을 만들어야 합니다).",
            "He makes handmade cards (그는 손으로 만든 카드를 만듭니다)."
        ]
    },
    {
        "korean": "기여하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He made a significant contribution to the project (그는 프로젝트에 중요한 기여를 했습니다).",
            "They made a donation to the local shelter (그들은 지역 쉼터에 기부를 했습니다).",
            "Her research made an impact on the field (그녀의 연구는 그 분야에 영향을 미쳤습니다)."
        ]
    },
    {
        "korean": "차지하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The news made headlines (그 뉴스는 대서특필되었습니다).",
            "His performance made history (그의 공연은 역사를 만들었습니다).",
            "Their invention made waves in the industry (그들의 발명은 업계에 큰 반향을 일으켰습니다)."
        ]
    },
    {
        "korean": "결정하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made a decision to travel alone (그녀는 혼자 여행하기로 결정했습니다).",
            "He made up his mind to quit his job (그는 일을 그만두기로 결심했습니다).",
            "They made a choice to adopt a child (그들은 아이를 입양하기로 선택했습니다)."
        ]
    },
    {
        "korean": "노력하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "They made an effort to recycle more (그들은 더 많이 재활용하기 위해 노력했습니다).",
            "He made a concerted effort to improve his grades (그는 성적을 올리기 위해 열심히 노력했습니다).",
            "She made a great effort to learn a new language (그녀는 새로운 언어를 배우기 위해 많은 노력을 했습니다)."
        ]
    },
    {
        "korean": "약속하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "They made a promise to stay in touch (그들은 연락을 유지하기로 약속했습니다).",
            "He made a vow to always be honest (그는 항상 정직할 것을 맹세했습니다).",
            "She made a commitment to volunteer regularly (그녀는 정기적으로 자원봉사를 하기로 약속했습니다)."
        ]
    },
    {
        "korean": "연락하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made a call to her friend (그녀는 친구에게 전화를 걸었습니다).",
            "He made contact with his old colleague (그는 예전 동료와 연락을 취했습니다).",
            "They made a connection through social media (그들은 소셜 미디어를 통해 연락을 취했습니다)."
        ]
    },
    {
        "korean": "시간을 내다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "Can you make time for a quick meeting? (빠른 회의를 할 시간을 낼 수 있나요?).",
            "She made time to read every evening (그녀는 매일 저녁 독서할 시간을 냈습니다).",
            "He made time to exercise despite his busy schedule (그는 바쁜 일정에도 불구하고 운동할 시간을 냈습니다)."
        ]
    },
    {
        "korean": "예약하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "I made a reservation for two at the restaurant (나는 레스토랑에 두 명의 예약을 했습니다).",
            "They made a booking for the weekend getaway (그들은 주말 여행을 예약했습니다).",
            "She made an appointment with the doctor (그녀는 의사와 약속을 잡았습니다)."
        ]
    },
    {
        "korean": "결심하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He made a resolution to get fit (그는 건강해지기로 결심했습니다).",
            "She made up her mind to go back to school (그녀는 학교로 돌아가기로 결심했습니다).",
            "They made a decision to invest in the new business (그들은 새로운 사업에 투자하기로 결정했습니다)."
        ]
    },
    {
        "korean": "성취하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He made it to the top of the mountain (그는 산 정상에 올랐습니다).",
            "She made her dreams come true (그녀는 꿈을 이루었습니다).",
            "They made history with their discovery (그들은 발견으로 역사를 만들었습니다)."
        ]
    },
    {
        "korean": "벌다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He makes a lot of money from his business (그는 사업으로 많은 돈을 법니다).",
            "She made a fortune in the stock market (그녀는 주식 시장에서 많은 돈을 벌었습니다).",
            "They make a good living as artists (그들은 예술가로서 좋은 수입을 올립니다)."
        ]
    },
    {
        "korean": "이루다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "They made a deal with the supplier (그들은 공급업체와 거래를 했습니다).",
            "He made an agreement with his partner (그는 파트너와 합의를 했습니다).",
            "She made peace with her past (그녀는 과거와 화해했습니다)."
        ]
    },
    {
        "korean": "초래하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "His actions made a lot of trouble (그의 행동은 많은 문제를 초래했습니다).",
            "The storm made a lot of damage (폭풍은 많은 피해를 초래했습니다).",
            "Their decisions made a big difference (그들의 결정은 큰 변화를 초래했습니다)."
        ]
    },
    {
        "korean": "시작하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "They made a new beginning after moving to the city (그들은 도시로 이사한 후 새로운 시작을 했습니다).",
            "She made a fresh start after her graduation (그녀는 졸업 후 새로운 출발을 했습니다).",
            "He made the first move in the negotiation (그는 협상에서 첫 발을 내디뎠습니다)."
        ]
    },
    {
        "korean": "시행하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The government made new policies to support small businesses (정부는 소규모 사업체를 지원하기 위해 새로운 정책을 시행했습니다).",
            "They made changes to the existing system (그들은 기존 시스템에 변화를 주었습니다).",
            "He made improvements to the software (그는 소프트웨어를 개선했습니다)."
        ]
    },
    {
        "korean": "준비하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made preparations for the trip (그녀는 여행 준비를 했습니다).",
            "They made arrangements for the meeting (그들은 회의를 준비했습니다).",
            "He made the bed in the morning (그는 아침에 침대를 정리했습니다)."
        ]
    },
    {
        "korean": "유도하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made him laugh with her jokes (그녀는 농담으로 그를 웃게 만들었습니다).",
            "The movie made her cry (그 영화는 그녀를 울게 만들었습니다).",
            "His speech made them think deeply (그의 연설은 그들을 깊이 생각하게 만들었습니다)."
        ]
    },
    {
        "korean": "확보하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He made sure everyone was safe (그는 모두가 안전한지 확인했습니다).",
            "She made certain that all doors were locked (그녀는 모든 문이 잠겨 있는지 확인했습니다).",
            "They made arrangements to ensure the success of the event (그들은 행사의 성공을 보장하기 위해 준비를 했습니다)."
        ]
    },
    {
        "korean": "생성하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The company made a new product line (그 회사는 새로운 제품 라인을 생성했습니다).",
            "She made a new account on the platform (그녀는 플랫폼에 새로운 계정을 생성했습니다).",
            "They made a website for their business (그들은 사업을 위해 웹사이트를 생성했습니다)."
        ]
    },
    {
        "korean": "변화시키다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "His innovation made a big change in the industry (그의 혁신은 업계에 큰 변화를 가져왔습니다).",
            "She made a significant change in her lifestyle (그녀는 생활 방식을 크게 바꾸었습니다).",
            "They made improvements to the existing system (그들은 기존 시스템을 개선했습니다)."
        ]
    },
    {
        "korean": "시도하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made an attempt to climb the mountain (그녀는 산에 오르려고 시도했습니다).",
            "He made an effort to understand the problem (그는 문제를 이해하려고 노력했습니다).",
            "They made a try to solve the puzzle (그들은 퍼즐을 풀려고 시도했습니다)."
        ]
    },
    {
        "korean": "전달하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He made a speech at the conference (그는 회의에서 연설을 했습니다).",
            "She made an announcement to the team (그녀는 팀에게 발표를 했습니다).",
            "They made a presentation about the new project (그들은 새로운 프로젝트에 대해 발표했습니다)."
        ]
    },
    {
        "korean": "성취하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made it to the finals of the competition (그녀는 대회의 결승전에 진출했습니다).",
            "He made his dreams come true (그는 자신의 꿈을 이루었습니다).",
            "They made history with their achievements (그들은 업적으로 역사를 만들었습니다)."
        ]
    },
    {
        "korean": "요청하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made a request for more information (그녀는 추가 정보를 요청했습니다).",
            "He made a demand for higher wages (그는 임금 인상을 요구했습니다).",
            "They made an appeal to the public (그들은 대중에게 호소했습니다)."
        ]
    },
    {
        "korean": "생각해내다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made up a story to entertain the kids (그녀는 아이들을 즐겁게 하기 위해 이야기를 지어냈습니다).",
            "He made an excuse for being late (그는 지각한 핑계를 댔습니다).",
            "They made a plan for their vacation (그들은 휴가 계획을 세웠습니다)."
        ]
    },
    {
        "korean": "결심하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made a decision to move abroad (그녀는 해외로 이주하기로 결심했습니다).",
            "He made up his mind to start a new job (그는 새로운 일을 시작하기로 결심했습니다).",
            "They made a resolution to improve their health (그들은 건강을 개선하기로 결심했습니다)."
        ]
    },
    {
        "korean": "강요하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made him apologize for his mistake (그녀는 그의 실수에 대해 사과하게 했습니다).",
            "The teacher made the students study harder (선생님은 학생들이 더 열심히 공부하게 했습니다).",
            "His parents made him clean his room (그의 부모님은 그에게 방을 청소하게 했습니다)."
        ]
    },
    {
        "korean": "지시하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The manager made the team follow the new guidelines (관리자는 팀이 새로운 지침을 따르게 했습니다).",
            "She made them adhere to the schedule (그녀는 그들이 일정을 따르게 했습니다).",
            "He made sure everyone understood the instructions (그는 모두가 지시 사항을 이해하도록 했습니다)."
        ]
    },
    {
        "korean": "초래하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "His actions made a lot of trouble (그의 행동은 많은 문제를 초래했습니다).",
            "The storm made a lot of damage (폭풍은 많은 피해를 초래했습니다).",
            "Their decisions made a big difference (그들의 결정은 큰 변화를 초래했습니다)."
        ]
    },
    {
        "korean": "강화하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "Regular exercise can make your muscles stronger (규칙적인 운동은 근육을 더 강하게 만들 수 있습니다).",
            "A good night's sleep can make a big difference in your health (충분한 수면은 건강에 큰 차이를 가져올 수 있습니다).",
            "Learning new skills can make your resume more impressive (새로운 기술을 배우면 이력서를 더 인상적으로 만들 수 있습니다)."
        ]
    },
    {
        "korean": "구성하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "These parts make the whole machine work (이 부품들은 전체 기계를 작동하게 합니다).",
            "The committee is made up of members from different departments (위원회는 다양한 부서의 구성원들로 이루어져 있습니다).",
            "The book is made of several chapters (그 책은 여러 장으로 구성되어 있습니다)."
        ]
    },
    {
        "korean": "제공하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The hotel staff made us feel welcome (호텔 직원들은 우리를 환영해주었습니다).",
            "She made the guests feel at home (그녀는 손님들이 집처럼 편안하게 느끼도록 했습니다).",
            "They made a generous offer to support the project (그들은 프로젝트를 지원하기 위해 관대한 제안을 했습니다)."
        ]
    },
    {
        "korean": "정리하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He made the bed before leaving the house (그는 집을 떠나기 전에 침대를 정리했습니다).",
            "She made her desk neat and tidy (그녀는 책상을 깔끔하게 정리했습니다).",
            "They made the room ready for the meeting (그들은 회의 준비를 위해 방을 정리했습니다)."
        ]
    },
    {
        "korean": "생계를 꾸리다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He makes a living by teaching English (그는 영어를 가르치며 생계를 꾸립니다).",
            "She makes money by selling handmade crafts (그녀는 수공예품을 팔아서 돈을 법니다).",
            "They make ends meet by working two jobs (그들은 두 가지 일을 하며 생계를 유지합니다)."
        ]
    },
    {
        "korean": "초대하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made an invitation to her birthday party (그녀는 생일 파티에 초대했습니다).",
            "He made a call to invite his friends over (그는 친구들을 초대하기 위해 전화를 걸었습니다).",
            "They made an offer to join their team (그들은 팀에 합류하라고 제안했습니다)."
        ]
    },
    {
        "korean": "압박하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The deadline made him feel pressured (마감 기한이 그에게 압박감을 주었습니다).",
            "She made them work harder with her strict rules (그녀의 엄격한 규칙으로 그들을 더 열심히 일하게 했습니다).",
            "They made him feel obligated to attend the meeting (그들은 그에게 회의에 참석해야 한다는 압박감을 주었습니다)."
        ]
    },
    {
        "korean": "보장하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The contract made sure all terms were clear (계약은 모든 조건이 명확하도록 했습니다).",
            "He made sure everyone knew the plan (그는 모두가 계획을 알도록 했습니다).",
            "She made certain that all lights were turned off (그녀는 모든 불이 꺼졌는지 확인했습니다)."
        ]
    },
    {
        "korean": "이해하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made sense of the complex instructions (그녀는 복잡한 지시를 이해했습니다).",
            "He made out the faint handwriting (그는 희미한 글씨를 알아보았습니다).",
            "They made sense of the data (그들은 데이터를 이해했습니다)."
        ]
    },
    {
        "korean": "수익을 내다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The company made a profit last year (그 회사는 작년에 수익을 냈습니다).",
            "He made a good return on his investment (그는 투자에서 좋은 수익을 얻었습니다).",
            "They made money from selling their old car (그들은 오래된 차를 팔아서 돈을 벌었습니다)."
        ]
    },
    {
        "korean": "형성하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The river made a natural border between the countries (그 강은 자연스럽게 국가 간의 경계를 형성했습니다).",
            "She made a circle with her hands (그녀는 손으로 원을 만들었습니다).",
            "They made a plan to address the issue (그들은 문제를 해결하기 위해 계획을 세웠습니다)."
        ]
    },
    {
        "korean": "작성하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made a list of things to do (그녀는 할 일 목록을 작성했습니다).",
            "He made notes during the lecture (그는 강의 중에 노트를 작성했습니다).",
            "They made a report on the project's progress (그들은 프로젝트 진행에 대한 보고서를 작성했습니다)."
        ]
    },
    {
        "korean": "준비하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made preparations for the wedding (그녀는 결혼 준비를 했습니다).",
            "He made arrangements for the guests (그는 손님들을 위해 준비를 했습니다).",
            "They made plans for the future (그들은 미래를 위한 계획을 세웠습니다)."
        ]
    },
    {
        "korean": "시행하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The government made new regulations (정부는 새로운 규정을 시행했습니다).",
            "They made changes to the company's policy (그들은 회사 정책을 변경했습니다).",
            "He made an improvement in the process (그는 과정에서 개선을 했습니다)."
        ]
    },
    {
        "korean": "도착하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "They made it to the airport on time (그들은 제시간에 공항에 도착했습니다).",
            "He made it home despite the traffic (그는 교통 체증에도 불구하고 집에 도착했습니다).",
            "She made it to the meeting before it started (그녀는 회의가 시작되기 전에 도착했습니다)."
        ]
    },
    {
        "korean": "성공하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He made a successful career in law (그는 법률 분야에서 성공적인 경력을 쌓았습니다).",
            "She made it big in the music industry (그녀는 음악 산업에서 큰 성공을 거두었습니다).",
            "They made a name for themselves in the tech world (그들은 기술 분야에서 명성을 얻었습니다)."
        ]
    },
    {
        "korean": "시작하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "They made a fresh start in a new city (그들은 새로운 도시에서 새 출발을 했습니다).",
            "She made a beginning on her new book (그녀는 새 책을 시작했습니다).",
            "He made a start on his homework (그는 숙제를 시작했습니다)."
        ]
    },
    {
        "korean": "제안하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made a suggestion to improve the workflow (그녀는 작업 흐름을 개선하기 위한 제안을 했습니다).",
            "He made a proposal to the board (그는 이사회에 제안을 했습니다).",
            "They made an offer to buy the house (그들은 집을 사기 위한 제안을 했습니다)."
        ]
    },
    {
        "korean": "가져오다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "He made her smile with his kind words (그는 친절한 말로 그녀를 웃게 만들었습니다).",
            "The news made everyone happy (그 소식은 모두를 행복하게 만들었습니다).",
            "The joke made the whole room laugh (그 농담은 방 안의 모두를 웃게 만들었습니다)."
        ]
    },
    {
        "korean": "제조하다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "The company makes cars in their factory (그 회사는 공장에서 자동차를 제조합니다).",
            "He makes furniture by hand (그는 손으로 가구를 만듭니다).",
            "They make clothes for a living (그들은 생계를 위해 옷을 만듭니다)."
        ]
    }
];

let currentWordIndex = 0;
let synth = window.speechSynthesis;
let autoPlayInterval;

function updateWord() {
    const word = words[currentWordIndex];
    document.getElementById('word-korean').innerText = word.korean;
    document.getElementById('word-english').innerText = word.english;
    document.getElementById('word-pronunciation').innerText = word.pronunciation;

    const exampleList = document.getElementById('example-list');
    exampleList.innerHTML = '';
    word.examples.forEach(example => {
        const listItem = document.createElement('li');
        listItem.innerText = example;
        exampleList.appendChild(listItem);
    });
}

function pronounceWord(times, callback) {
    let count = 0;
    const word = words[currentWordIndex];
    const { korean, english, examples } = word;

    function speak() {
        if (count < times) {
            const koreanUtterance = new SpeechSynthesisUtterance(korean);
            koreanUtterance.lang = 'ko-KR';
            koreanUtterance.rate = 1;

            const englishUtterance = new SpeechSynthesisUtterance(english);
            englishUtterance.lang = 'en-GB';
            englishUtterance.rate = 1;

            koreanUtterance.onend = () => {
                setTimeout(() => {
                    synth.speak(englishUtterance);
                }, 500);
            };

            englishUtterance.onend = () => {
                let exampleIndex = 0;
                function speakExample() {
                    if (exampleIndex < examples.length) {
                        const exampleUtterance = new SpeechSynthesisUtterance(examples[exampleIndex].split(" (")[0]); // 한글을 제외한 영어 부분만 발음
                        exampleUtterance.lang = 'en-GB';
                        exampleUtterance.rate = 1;
                        exampleUtterance.onend = () => {
                            exampleIndex++;
                            if (exampleIndex < examples.length) {
                                setTimeout(speakExample, 1000); // 1초 간격
                            } else {
                                count++;
                                if (count < times) {
                                    setTimeout(speak, 1000); // 1초 후 다음 발음 시작
                                } else if (callback) {
                                    callback();
                                }
                            }
                        };
                        synth.speak(exampleUtterance);
                    }
                }
                speakExample();
            };

            setTimeout(() => {
                synth.speak(koreanUtterance);
            }, 500); // 0.5초 지연
        }
    }

    speak();
}

function stopPronouncing() {
    clearInterval(autoPlayInterval);
    synth.cancel();
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
    setTimeout(() => pronounceWord(1), 2000); // 2초 지연
}

function autoPlay() {
    stopPronouncing();

    function playNextWord() {
        updateWord();
        pronounceWord(1, () => {
            currentWordIndex++;
            if (currentWordIndex >= words.length) {
                currentWordIndex = 0;
            }
        });
    }

    playNextWord(); // 첫 단어를 즉시 재생

    autoPlayInterval = setInterval(() => {
        playNextWord(); // 15초 간격으로 다음 단어 재생
    }, 15000);
}

updateWord();

// 단어 목록을 화면에 표시하는 함수
function showWordList() {
    const wordList = document.getElementById('word-list');
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>${word.korean}</strong><br>${word.english}<em><br>${word.pronunciation}</em><br><br>`;
        wordList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWord();
    showWordList(); // 페이지 로드 시 단어 목록 표시
    setTimeout(() => pronounceWord(1), 2000); // 페이지 로드 후 2초 지연
});
