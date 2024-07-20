let currentWordIndex = 0;
let pronounceInterval;
let synth = window.speechSynthesis;
let autoPlayInterval;

const words = [
    {
        "korean": "있다",
        "english": "be",
        "pronunciation": "[biː]",
        "hangul_pronunciation": "[비]",
        "sample_sentence": "There will be a meeting tomorrow.",
        "korean_sentence": "내일 회의가 있을 것입니다."
    },
    {
        "korean": "존재하다",
        "english": "be",
        "pronunciation": "[biː]",
        "hangul_pronunciation": "[비]",
        "sample_sentence": "To be or not to be, that is the question.",
        "korean_sentence": "존재하느냐, 아니냐, 그것이 문제로다."
    },
    {
        "korean": "있다 (장소에)",
        "english": "be at",
        "pronunciation": "[biː æt]",
        "hangul_pronunciation": "[비 앳]",
        "sample_sentence": "She will be at the office all day.",
        "korean_sentence": "그녀는 하루 종일 사무실에 있을 것입니다."
    },
    {
        "korean": "있다 (상태에)",
        "english": "be in",
        "pronunciation": "[biː ɪn]",
        "hangul_pronunciation": "[비 인]",
        "sample_sentence": "The documents are in the drawer.",
        "korean_sentence": "서류는 서랍 안에 있습니다."
    },
    {
        "korean": "있다 (동반하다)",
        "english": "be with",
        "pronunciation": "[biː wɪð]",
        "hangul_pronunciation": "[비 윗]",
        "sample_sentence": "I will be with you in a moment.",
        "korean_sentence": "잠시 후에 당신과 함께 있을 것입니다."
    },
    {
        "korean": "되다",
        "english": "become",
        "pronunciation": "[bɪˈkʌm]",
        "hangul_pronunciation": "[비컴]",
        "sample_sentence": "He wants to be a doctor when he grows up.",
        "korean_sentence": "그는 자라서 의사가 되고 싶어합니다."
    },
    {
        "korean": "있다 (존재하다)",
        "english": "exist",
        "pronunciation": "[ɪɡˈzɪst]",
        "hangul_pronunciation": "[이그지스트]",
        "sample_sentence": "Does life exist on other planets?",
        "korean_sentence": "다른 행성에 생명체가 존재할까요?"
    },
    {
        "korean": "있다 (존재하다)",
        "english": "be present",
        "pronunciation": "[biː ˈprezənt]",
        "hangul_pronunciation": "[비 프레즌트]",
        "sample_sentence": "All members must be present at the meeting.",
        "korean_sentence": "모든 구성원들은 회의에 참석해야 합니다."
    },
    {
        "korean": "있다 (남다)",
        "english": "remain",
        "pronunciation": "[rɪˈmeɪn]",
        "hangul_pronunciation": "[리메인]",
        "sample_sentence": "Only a few seats remain available.",
        "korean_sentence": "남아있는 좌석은 몇 개 안 됩니다."
    },
    {
        "korean": "있다 (기대다)",
        "english": "rely",
        "pronunciation": "[rɪˈlaɪ]",
        "hangul_pronunciation": "[릴라이]",
        "sample_sentence": "You can rely on me.",
        "korean_sentence": "당신은 저를 믿어도 됩니다."
    },
    {
        "korean": "이다",
        "english": "be",
        "pronunciation": "[biː]",
        "hangul_pronunciation": "[비]",
        "sample_sentence": "She is a teacher.",
        "korean_sentence": "그녀는 교사입니다."
    },
    {
        "korean": "되다",
        "english": "become",
        "pronunciation": "[bɪˈkʌm]",
        "hangul_pronunciation": "[비컴]",
        "sample_sentence": "He became a famous actor.",
        "korean_sentence": "그는 유명한 배우가 되었습니다."
    },
    {
        "korean": "있다 (상태에)",
        "english": "be in",
        "pronunciation": "[biː ɪn]",
        "hangul_pronunciation": "[비 인]",
        "sample_sentence": "She is in a good mood today.",
        "korean_sentence": "그녀는 오늘 기분이 좋습니다."
    },
    {
        "korean": "있다 (장소에)",
        "english": "be at",
        "pronunciation": "[biː æt]",
        "hangul_pronunciation": "[비 앳]",
        "sample_sentence": "He is at the gym right now.",
        "korean_sentence": "그는 지금 체육관에 있습니다."
    },
    {
        "korean": "있다 (위치하다)",
        "english": "be located",
        "pronunciation": "[biː loʊˈkeɪtɪd]",
        "hangul_pronunciation": "[비 로케이티드]",
        "sample_sentence": "The restaurant is located downtown.",
        "korean_sentence": "그 식당은 도심에 위치해 있습니다."
    },
    {
        "korean": "속하다",
        "english": "belong",
        "pronunciation": "[bɪˈlɔːŋ]",
        "hangul_pronunciation": "[빌롱]",
        "sample_sentence": "This book belongs to me.",
        "korean_sentence": "이 책은 내 것입니다."
    },
    {
        "korean": "관련 있다",
        "english": "be related",
        "pronunciation": "[biː rɪˈleɪtɪd]",
        "hangul_pronunciation": "[비 릴레이티드]",
        "sample_sentence": "She is related to the CEO.",
        "korean_sentence": "그녀는 CEO와 관련이 있습니다."
    },
    {
        "korean": "맞다",
        "english": "be right",
        "pronunciation": "[biː raɪt]",
        "hangul_pronunciation": "[비 라이트]",
        "sample_sentence": "You are right about the answer.",
        "korean_sentence": "당신은 답이 맞습니다."
    },
    {
        "korean": "유명하다",
        "english": "be famous",
        "pronunciation": "[biː ˈfeɪməs]",
        "hangul_pronunciation": "[비 페이머스]",
        "sample_sentence": "Paris is famous for its beautiful landmarks.",
        "korean_sentence": "파리는 아름다운 랜드마크로 유명합니다."
    },
    {
        "korean": "강하다",
        "english": "be strong",
        "pronunciation": "[biː strɔŋ]",
        "hangul_pronunciation": "[비 스트롱]",
        "sample_sentence": "You need to be strong in difficult times.",
        "korean_sentence": "어려운 시기에 강해져야 합니다."
    },
    {
        "korean": "필요하다",
        "english": "be needed",
        "pronunciation": "[biː ˈniːdɪd]",
        "hangul_pronunciation": "[비 니디드]",
        "sample_sentence": "Your help is needed for this project.",
        "korean_sentence": "이 프로젝트에는 당신의 도움이 필요합니다."
    },
    {
        "korean": "기다리다",
        "english": "be waiting",
        "pronunciation": "[biː ˈweɪtɪŋ]",
        "hangul_pronunciation": "[비 웨이팅]",
        "sample_sentence": "He is waiting for the bus.",
        "korean_sentence": "그는 버스를 기다리고 있습니다."
    },
    {
        "korean": "즐기다",
        "english": "be enjoying",
        "pronunciation": "[biː ɪnˈʤɔɪɪŋ]",
        "hangul_pronunciation": "[비 인조잉]",
        "sample_sentence": "They are enjoying their vacation.",
        "korean_sentence": "그들은 휴가를 즐기고 있습니다."
    },
    {
        "korean": "좋아하다",
        "english": "be fond of",
        "pronunciation": "[biː fɑnd ʌv]",
        "hangul_pronunciation": "[비 폰드 오브]",
        "sample_sentence": "She is fond of classical music.",
        "korean_sentence": "그녀는 클래식 음악을 좋아합니다."
    },
    {
        "korean": "준비되다",
        "english": "be ready",
        "pronunciation": "[biː ˈrɛdi]",
        "hangul_pronunciation": "[비 레디]",
        "sample_sentence": "Dinner is ready.",
        "korean_sentence": "저녁 식사가 준비되었습니다."
    },
    {
        "korean": "화나다",
        "english": "be angry",
        "pronunciation": "[biː ˈæŋɡri]",
        "hangul_pronunciation": "[비 앵그리]",
        "sample_sentence": "He was angry about the delay.",
        "korean_sentence": "그는 지연에 대해 화가 났습니다."
    },
    {
        "korean": "놀라다",
        "english": "be surprised",
        "pronunciation": "[biː səˈpraɪzd]",
        "hangul_pronunciation": "[비 서프라이즈드]",
        "sample_sentence": "She was surprised by the news.",
        "korean_sentence": "그녀는 그 소식에 놀랐습니다."
    },
    {
        "korean": "바쁘다",
        "english": "be busy",
        "pronunciation": "[biː ˈbɪzi]",
        "hangul_pronunciation": "[비 비지]",
        "sample_sentence": "They are busy with their work.",
        "korean_sentence": "그들은 일로 바쁩니다."
    },
    {
        "korean": "행복하다",
        "english": "be happy",
        "pronunciation": "[biː ˈhæpi]",
        "hangul_pronunciation": "[비 해피]",
        "sample_sentence": "I am happy to see you.",
        "korean_sentence": "당신을 만나서 기쁩니다."
    },
    {
        "korean": "기대하다",
        "english": "be excited",
        "pronunciation": "[biː ɪkˈsaɪtɪd]",
        "hangul_pronunciation": "[비 익사이티드]",
        "sample_sentence": "The children are excited about the trip.",
        "korean_sentence": "아이들은 여행을 기대하고 있습니다."
    },
    {
        "korean": "용서하다",
        "english": "be forgiven",
        "pronunciation": "[biː fərˈɡɪvən]",
        "hangul_pronunciation": "[비 퍼기븐]",
        "sample_sentence": "You are forgiven for your mistakes.",
        "korean_sentence": "당신의 실수는 용서받았습니다."
    },
    {
        "korean": "실패하다",
        "english": "be failed",
        "pronunciation": "[biː feɪld]",
        "hangul_pronunciation": "[비 페일드]",
        "sample_sentence": "He was failed in the exam.",
        "korean_sentence": "그는 시험에서 실패했습니다."
    },
    {
        "korean": "감동받다",
        "english": "be moved",
        "pronunciation": "[biː muːvd]",
        "hangul_pronunciation": "[비 무브드]",
        "sample_sentence": "She was moved by the story.",
        "korean_sentence": "그녀는 그 이야기로 감동받았습니다."
    },
    {
        "korean": "고용되다",
        "english": "be employed",
        "pronunciation": "[biː ɛmˈplɔɪd]",
        "hangul_pronunciation": "[비 엠플로이드]",
        "sample_sentence": "He was employed by a large company.",
        "korean_sentence": "그는 대기업에 고용되었습니다."
    },
    {
        "korean": "재미있다",
        "english": "be interesting",
        "pronunciation": "[biː ˈɪntrəstɪŋ]",
        "hangul_pronunciation": "[비 인터레스팅]",
        "sample_sentence": "The book is very interesting.",
        "korean_sentence": "그 책은 매우 재미있습니다."
    },
    {
        "korean": "불안하다",
        "english": "be nervous",
        "pronunciation": "[biː ˈnɜːrvəs]",
        "hangul_pronunciation": "[비 너버스]",
        "sample_sentence": "She was nervous before the interview.",
        "korean_sentence": "그녀는 면접 전에 불안해했습니다."
    },
    {
        "korean": "추진하다",
        "english": "be promoted",
        "pronunciation": "[biː prəˈmoʊtɪd]",
        "hangul_pronunciation": "[비 프로모티드]",
        "sample_sentence": "He was promoted to manager.",
        "korean_sentence": "그는 매니저로 승진했습니다."
    },
    {
        "korean": "사랑받다",
        "english": "be loved",
        "pronunciation": "[biː lʌvd]",
        "hangul_pronunciation": "[비 러브드]",
        "sample_sentence": "Everyone wants to be loved.",
        "korean_sentence": "모든 사람은 사랑받기를 원합니다."
    },
    {
        "korean": "비난받다",
        "english": "be criticized",
        "pronunciation": "[biː ˈkrɪtɪsaɪzd]",
        "hangul_pronunciation": "[비 크리티사이즈드]",
        "sample_sentence": "The politician was criticized for his actions.",
        "korean_sentence": "그 정치가는 그의 행동에 대해 비난받았습니다."
    },
    {
        "korean": "준수하다",
        "english": "be followed",
        "pronunciation": "[biː ˈfɑloʊd]",
        "hangul_pronunciation": "[비 팔로우드]",
        "sample_sentence": "The rules must be followed.",
        "korean_sentence": "규칙은 준수되어야 합니다."
    },
    {
        "korean": "보호받다",
        "english": "be protected",
        "pronunciation": "[biː prəˈtɛktɪd]",
        "hangul_pronunciation": "[비 프로텍티드]",
        "sample_sentence": "Endangered species must be protected.",
        "korean_sentence": "멸종 위기 종은 보호받아야 합니다."
    },
    {
        "korean": "변화하다",
        "english": "be changed",
        "pronunciation": "[biː ʧeɪndʒd]",
        "hangul_pronunciation": "[비 체인지드]",
        "sample_sentence": "The schedule has been changed.",
        "korean_sentence": "일정이 변경되었습니다."
    },
    {
        "korean": "인정받다",
        "english": "be recognized",
        "pronunciation": "[biː ˈrɛkəɡnaɪzd]",
        "hangul_pronunciation": "[비 레코그나이즈드]",
        "sample_sentence": "She was recognized for her achievements.",
        "korean_sentence": "그녀는 그녀의 업적으로 인정받았습니다."
    },
    {
        "korean": "해고되다",
        "english": "be fired",
        "pronunciation": "[biː ˈfaɪərd]",
        "hangul_pronunciation": "[비 파이어드]",
        "sample_sentence": "He was fired for breaking the rules.",
        "korean_sentence": "그는 규칙을 어겨서 해고되었습니다."
    },
    {
        "korean": "준비되다",
        "english": "be prepared",
        "pronunciation": "[biː prɪˈpɛrd]",
        "hangul_pronunciation": "[비 프리페어드]",
        "sample_sentence": "We must be prepared for the worst.",
        "korean_sentence": "우리는 최악의 상황에 대비해야 합니다."
    },
    {
        "korean": "모으다",
        "english": "be gathered",
        "pronunciation": "[biː ˈɡæðərd]",
        "hangul_pronunciation": "[비 개더드]",
        "sample_sentence": "All the information has been gathered.",
        "korean_sentence": "모든 정보가 모아졌습니다."
    },
    {
        "korean": "반대하다",
        "english": "be opposed",
        "pronunciation": "[biː əˈpoʊzd]",
        "hangul_pronunciation": "[비 어포즈드]",
        "sample_sentence": "Many people are opposed to the new law.",
        "korean_sentence": "많은 사람들이 새 법에 반대하고 있습니다."
    },
    {
        "korean": "설명되다",
        "english": "be explained",
        "pronunciation": "[biː ɪkˈspleɪnd]",
        "hangul_pronunciation": "[비 익스플레인드]",
        "sample_sentence": "The process will be explained in detail.",
        "korean_sentence": "과정이 자세히 설명될 것입니다."
    },
    {
        "korean": "확신하다",
        "english": "be assured",
        "pronunciation": "[biː əˈʃʊrd]",
        "hangul_pronunciation": "[비 어슈어드]",
        "sample_sentence": "You can be assured of our support.",
        "korean_sentence": "당신은 우리의 지원을 확신할 수 있습니다."
    },
    {
        "korean": "존중받다",
        "english": "be respected",
        "pronunciation": "[biː rɪˈspɛktɪd]",
        "hangul_pronunciation": "[비 리스펙티드]",
        "sample_sentence": "Everyone deserves to be respected.",
        "korean_sentence": "모든 사람은 존중받을 자격이 있습니다."
    },
    {
        "korean": "감사하다",
        "english": "be grateful",
        "pronunciation": "[biː ˈɡreɪtfəl]",
        "hangul_pronunciation": "[비 그레이트풀]",
        "sample_sentence": "I am grateful for your help.",
        "korean_sentence": "당신의 도움에 감사합니다."
    },
    {
        "korean": "알려지다",
        "english": "be known",
        "pronunciation": "[biː noʊn]",
        "hangul_pronunciation": "[비 논]",
        "sample_sentence": "He is known for his generosity.",
        "korean_sentence": "그는 그의 관대함으로 알려져 있습니다."
    },
    {
        "korean": "확인되다",
        "english": "be confirmed",
        "pronunciation": "[biː kənˈfɜrmd]",
        "hangul_pronunciation": "[비 컨펌드]",
        "sample_sentence": "The appointment has been confirmed.",
        "korean_sentence": "약속이 확인되었습니다."
    },
    {
        "korean": "존재하다",
        "english": "be existent",
        "pronunciation": "[biː ɪɡˈzɪstənt]",
        "hangul_pronunciation": "[비 이그지스턴트]",
        "sample_sentence": "Such problems are not existent here.",
        "korean_sentence": "그러한 문제들은 여기 존재하지 않습니다."
    },
    {
        "korean": "보상받다",
        "english": "be rewarded",
        "pronunciation": "[biː rɪˈwɔrdɪd]",
        "hangul_pronunciation": "[비 리워디드]",
        "sample_sentence": "You will be rewarded for your hard work.",
        "korean_sentence": "당신의 노고에 대해 보상받을 것입니다."
    },
    {
        "korean": "기억되다",
        "english": "be remembered",
        "pronunciation": "[biː rɪˈmɛmbərd]",
        "hangul_pronunciation": "[비 리멤버드]",
        "sample_sentence": "He will be remembered for his kindness.",
        "korean_sentence": "그는 그의 친절함으로 기억될 것입니다."
    },
    {
        "korean": "조사되다",
        "english": "be investigated",
        "pronunciation": "[biː ɪnˈvɛstəˌɡeɪtɪd]",
        "hangul_pronunciation": "[비 인베스티게이티드]",
        "sample_sentence": "The incident is being investigated.",
        "korean_sentence": "그 사건은 조사 중입니다."
    },
    {
        "korean": "만들어지다",
        "english": "be created",
        "pronunciation": "[biː kriˈeɪtɪd]",
        "hangul_pronunciation": "[비 크리에이티드]",
        "sample_sentence": "The artwork was created by a local artist.",
        "korean_sentence": "그 예술 작품은 지역 예술가에 의해 만들어졌습니다."
    },
    {
        "korean": "발견되다",
        "english": "be discovered",
        "pronunciation": "[biː dɪˈskʌvərd]",
        "hangul_pronunciation": "[비 디스커버드]",
        "sample_sentence": "The treasure was discovered by accident.",
        "korean_sentence": "그 보물은 우연히 발견되었습니다."
    },
    {
        "korean": "선택되다",
        "english": "be chosen",
        "pronunciation": "[biː ˈʧoʊzən]",
        "hangul_pronunciation": "[비 초즌]",
        "sample_sentence": "She was chosen for the lead role.",
        "korean_sentence": "그녀는 주연 역할로 선택되었습니다."
    },
    {
        "korean": "비싸다",
        "english": "be expensive",
        "pronunciation": "[biː ɪkˈspɛnsɪv]",
        "hangul_pronunciation": "[비 익스펜시브]",
        "sample_sentence": "This watch is very expensive.",
        "korean_sentence": "이 시계는 매우 비쌉니다."
    },
    {
        "korean": "어렵다",
        "english": "be difficult",
        "pronunciation": "[biː ˈdɪfɪkəlt]",
        "hangul_pronunciation": "[비 디피컬트]",
        "sample_sentence": "Math can be difficult for some students.",
        "korean_sentence": "수학은 일부 학생들에게 어려울 수 있습니다."
    },
    {
        "korean": "즐겁다",
        "english": "be enjoyable",
        "pronunciation": "[biː ɪnˈʤɔɪəbl]",
        "hangul_pronunciation": "[비 인조이어블]",
        "sample_sentence": "The movie was very enjoyable.",
        "korean_sentence": "그 영화는 매우 즐거웠습니다."
    },
    {
        "korean": "충분하다",
        "english": "be enough",
        "pronunciation": "[biː ɪˈnʌf]",
        "hangul_pronunciation": "[비 이너프]",
        "sample_sentence": "Three apples are enough for the recipe.",
        "korean_sentence": "세 개의 사과면 그 레시피에 충분합니다."
    },
    {
        "korean": "유명하다",
        "english": "be well-known",
        "pronunciation": "[biː wɛl noʊn]",
        "hangul_pronunciation": "[비 웰 논]",
        "sample_sentence": "She is well-known in her community.",
        "korean_sentence": "그녀는 지역사회에서 유명합니다."
    },
    {
        "korean": "낯익다",
        "english": "be familiar",
        "pronunciation": "[biː fəˈmɪljər]",
        "hangul_pronunciation": "[비 패밀리어]",
        "sample_sentence": "The voice on the phone was familiar.",
        "korean_sentence": "전화 속 목소리가 낯익었습니다."
    },
    {
        "korean": "불안하다",
        "english": "be uneasy",
        "pronunciation": "[biː ənˈiːzi]",
        "hangul_pronunciation": "[비 언이지]",
        "sample_sentence": "He felt uneasy about the decision.",
        "korean_sentence": "그는 그 결정에 대해 불안해했습니다."
    },
    {
        "korean": "성공적이다",
        "english": "be successful",
        "pronunciation": "[biː səkˈsɛsfəl]",
        "hangul_pronunciation": "[비 석세스풀]",
        "sample_sentence": "The project was very successful.",
        "korean_sentence": "그 프로젝트는 매우 성공적이었습니다."
    },
    {
        "korean": "안전하다",
        "english": "be safe",
        "pronunciation": "[biː seɪf]",
        "hangul_pronunciation": "[비 세이프]",
        "sample_sentence": "It is important to be safe while driving.",
        "korean_sentence": "운전할 때 안전이 중요합니다."
    },
    {
        "korean": "행복하다",
        "english": "be joyful",
        "pronunciation": "[biː ˈʤɔɪfəl]",
        "hangul_pronunciation": "[비 조이풀]",
        "sample_sentence": "She was joyful after hearing the good news.",
        "korean_sentence": "그녀는 좋은 소식을 듣고 행복했습니다."
    },
    {
        "korean": "차분하다",
        "english": "be calm",
        "pronunciation": "[biː kɑːm]",
        "hangul_pronunciation": "[비 캄]",
        "sample_sentence": "Try to be calm during the exam.",
        "korean_sentence": "시험 동안 차분하게 하세요."
    },
    {
        "korean": "깨끗하다",
        "english": "be clean",
        "pronunciation": "[biː kliːn]",
        "hangul_pronunciation": "[비 클린]",
        "sample_sentence": "Make sure your room is clean.",
        "korean_sentence": "방이 깨끗한지 확인하세요."
    },
    {
        "korean": "건강하다",
        "english": "be healthy",
        "pronunciation": "[biː ˈhɛlθi]",
        "hangul_pronunciation": "[비 헬씨]",
        "sample_sentence": "It is important to be healthy.",
        "korean_sentence": "건강한 것이 중요합니다."
    },
    {
        "korean": "기쁘다",
        "english": "be glad",
        "pronunciation": "[biː ɡlæd]",
        "hangul_pronunciation": "[비 글래드]",
        "sample_sentence": "I am glad to see you.",
        "korean_sentence": "당신을 만나서 기쁩니다."
    },
    {
        "korean": "강하다",
        "english": "be strong",
        "pronunciation": "[biː strɔːŋ]",
        "hangul_pronunciation": "[비 스트롱]",
        "sample_sentence": "You need to be strong in difficult times.",
        "korean_sentence": "어려운 시기에 강해져야 합니다."
    },
    {
        "korean": "조용하다",
        "english": "be quiet",
        "pronunciation": "[biː ˈkwaɪət]",
        "hangul_pronunciation": "[비 콰이엇]",
        "sample_sentence": "Please be quiet in the library.",
        "korean_sentence": "도서관에서 조용히 해주세요."
    },
    {
        "korean": "부끄럽다",
        "english": "be shy",
        "pronunciation": "[biː ʃaɪ]",
        "hangul_pronunciation": "[비 샤이]",
        "sample_sentence": "She is too shy to speak in public.",
        "korean_sentence": "그녀는 사람들 앞에서 말하기 너무 부끄러워합니다."
    },
    {
        "korean": "착하다",
        "english": "be kind",
        "pronunciation": "[biː kaɪnd]",
        "hangul_pronunciation": "[비 카인드]",
        "sample_sentence": "It is good to be kind to others.",
        "korean_sentence": "다른 사람들에게 친절한 것이 좋습니다."
    },
    {
        "korean": "준비되다",
        "english": "be ready",
        "pronunciation": "[biː ˈrɛdi]",
        "hangul_pronunciation": "[비 레디]",
        "sample_sentence": "Dinner is ready.",
        "korean_sentence": "저녁 식사가 준비되었습니다."
    },
    {
        "korean": "유명하다",
        "english": "be famous",
        "pronunciation": "[biː ˈfeɪməs]",
        "hangul_pronunciation": "[비 페이머스]",
        "sample_sentence": "Paris is famous for its beautiful landmarks.",
        "korean_sentence": "파리는 아름다운 랜드마크로 유명합니다."
    },
    {
        "korean": "피곤하다",
        "english": "be tired",
        "pronunciation": "[biː ˈtaɪərd]",
        "hangul_pronunciation": "[비 타이어드]",
        "sample_sentence": "I am tired after a long day.",
        "korean_sentence": "긴 하루 후에 피곤합니다."
    },
    {
        "korean": "부드럽다",
        "english": "be gentle",
        "pronunciation": "[biː ˈdʒɛntəl]",
        "hangul_pronunciation": "[비 젠틀]",
        "sample_sentence": "Be gentle with the baby.",
        "korean_sentence": "아기에게 부드럽게 대하세요."
    },
    {
        "korean": "긴장하다",
        "english": "be anxious",
        "pronunciation": "[biː ˈæŋkʃəs]",
        "hangul_pronunciation": "[비 앵셔스]",
        "sample_sentence": "He was anxious about the exam.",
        "korean_sentence": "그는 시험에 대해 긴장했습니다."
    },
    {
        "korean": "흐리다",
        "english": "be cloudy",
        "pronunciation": "[biː ˈklaʊdi]",
        "hangul_pronunciation": "[비 클라우디]",
        "sample_sentence": "The sky is cloudy today.",
        "korean_sentence": "오늘 하늘이 흐립니다."
    },
    {
        "korean": "더럽다",
        "english": "be dirty",
        "pronunciation": "[biː ˈdɜːrti]",
        "hangul_pronunciation": "[비 더티]",
        "sample_sentence": "The room is dirty.",
        "korean_sentence": "방이 더럽습니다."
    },
    {
        "korean": "가까이 있다",
        "english": "be near",
        "pronunciation": "[biː nɪr]",
        "hangul_pronunciation": "[비 니어]",
        "sample_sentence": "The school is near my house.",
        "korean_sentence": "학교는 내 집 가까이에 있습니다."
    },
    {
        "korean": "이상하다",
        "english": "be strange",
        "pronunciation": "[biː streɪndʒ]",
        "hangul_pronunciation": "[비 스트레인지]",
        "sample_sentence": "That sound is strange.",
        "korean_sentence": "그 소리는 이상합니다."
    },
    {
        "korean": "무겁다",
        "english": "be heavy",
        "pronunciation": "[biː ˈhɛvi]",
        "hangul_pronunciation": "[비 헤비]",
        "sample_sentence": "This box is heavy.",
        "korean_sentence": "이 상자는 무겁습니다."
    },
    {
        "korean": "가볍다",
        "english": "be light",
        "pronunciation": "[biː laɪt]",
        "hangul_pronunciation": "[비 라이트]",
        "sample_sentence": "The bag is light.",
        "korean_sentence": "그 가방은 가볍습니다."
    },
    {
        "korean": "졸리다",
        "english": "be sleepy",
        "pronunciation": "[biː ˈsliːpi]",
        "hangul_pronunciation": "[비 슬리피]",
        "sample_sentence": "I am sleepy after lunch.",
        "korean_sentence": "점심 후에 졸립니다."
    },
    {
        "korean": "자랑스럽다",
        "english": "be proud",
        "pronunciation": "[biː praʊd]",
        "hangul_pronunciation": "[비 프라우드]",
        "sample_sentence": "He is proud of his achievements.",
        "korean_sentence": "그는 자신의 업적을 자랑스럽게 생각합니다."
    },
    {
        "korean": "걱정하다",
        "english": "be worried",
        "pronunciation": "[biː ˈwɜːrid]",
        "hangul_pronunciation": "[비 워리드]",
        "sample_sentence": "She is worried about the test.",
        "korean_sentence": "그녀는 시험에 대해 걱정하고 있습니다."
    },
    {
        "korean": "아프다",
        "english": "be sick",
        "pronunciation": "[biː sɪk]",
        "hangul_pronunciation": "[비 씩]",
        "sample_sentence": "He is sick with the flu.",
        "korean_sentence": "그는 독감에 걸렸습니다."
    },
    {
        "korean": "늦다",
        "english": "be late",
        "pronunciation": "[biː leɪt]",
        "hangul_pronunciation": "[비 레이트]",
        "sample_sentence": "Don't be late for the meeting.",
        "korean_sentence": "회의에 늦지 마세요."
    },
    {
        "korean": "맡다",
        "english": "be in charge",
        "pronunciation": "[biː ɪn ʧɑrʤ]",
        "hangul_pronunciation": "[비 인 차지]",
        "sample_sentence": "She is in charge of the project.",
        "korean_sentence": "그녀는 그 프로젝트를 맡고 있습니다."
    },
    {
        "korean": "준비하다",
        "english": "be prepared",
        "pronunciation": "[biː prɪˈpɛrd]",
        "hangul_pronunciation": "[비 프리페어드]",
        "sample_sentence": "We should be prepared for emergencies.",
        "korean_sentence": "우리는 비상사태에 대비해야 합니다."
    },
    {
        "korean": "인기 있다",
        "english": "be popular",
        "pronunciation": "[biː ˈpɑpjələr]",
        "hangul_pronunciation": "[비 파퓰러]",
        "sample_sentence": "She is popular among her peers.",
        "korean_sentence": "그녀는 또래 사이에서 인기가 많습니다."
    },
    {
        "korean": "재미있다",
        "english": "be fun",
        "pronunciation": "[biː fʌn]",
        "hangul_pronunciation": "[비 펀]",
        "sample_sentence": "The party was fun.",
        "korean_sentence": "그 파티는 재미있었습니다."
    },
    {
        "korean": "쉽다",
        "english": "be easy",
        "pronunciation": "[biː ˈiːzi]",
        "hangul_pronunciation": "[비 이지]",
        "sample_sentence": "This task is easy.",
        "korean_sentence": "이 작업은 쉽습니다."
    },
    {
        "korean": "배고프다",
        "english": "be hungry",
        "pronunciation": "[biː ˈhʌŋɡri]",
        "hangul_pronunciation": "[비 헝그리]",
        "sample_sentence": "I am hungry after the workout.",
        "korean_sentence": "운동 후에 배가 고픕니다."
    },
    {
        "korean": "침착하다",
        "english": "be composed",
        "pronunciation": "[bi kəmˈpoʊzd]",
        "hangul_pronunciation": "[비 컴포즈드]",
        "sample_sentence": "She managed to be composed during the crisis.",
        "korean_sentence": "그녀는 위기 동안 침착함을 유지했습니다."
    },
    {
        "korean": "주문하다",
        "english": "be ordered",
        "pronunciation": "[bi ˈɔrdərd]",
        "hangul_pronunciation": "[비 오더드]",
        "sample_sentence": "The supplies were ordered last week.",
        "korean_sentence": "물품은 지난주에 주문되었습니다."
    },
    {
        "korean": "불평하다",
        "english": "be complaining",
        "pronunciation": "[bi kəmˈpleɪnɪŋ]",
        "hangul_pronunciation": "[비 컴플레이닝]",
        "sample_sentence": "He is always complaining about something.",
        "korean_sentence": "그는 항상 무언가에 대해 불평합니다."
    },
    {
        "korean": "불안하다",
        "english": "be uneasy",
        "pronunciation": "[bi ənˈiːzi]",
        "hangul_pronunciation": "[비 언이지]",
        "sample_sentence": "I felt uneasy in the new environment.",
        "korean_sentence": "나는 새로운 환경에서 불안감을 느꼈습니다."
    },
    {
        "korean": "의심하다",
        "english": "be doubtful",
        "pronunciation": "[bi ˈdaʊtfəl]",
        "hangul_pronunciation": "[비 다우트풀]",
        "sample_sentence": "She was doubtful about the success of the plan.",
        "korean_sentence": "그녀는 그 계획의 성공에 대해 의심했습니다."
    },
    {
        "korean": "놀라다",
        "english": "be amazed",
        "pronunciation": "[bi əˈmeɪzd]",
        "hangul_pronunciation": "[비 어메이즈드]",
        "sample_sentence": "We were amazed by the beautiful scenery.",
        "korean_sentence": "우리는 아름다운 풍경에 놀랐습니다."
    },
    {
        "korean": "낙담하다",
        "english": "be discouraged",
        "pronunciation": "[bi dɪsˈkɜrɪdʒd]",
        "hangul_pronunciation": "[비 디스커리지드]",
        "sample_sentence": "Don't be discouraged by the initial failures.",
        "korean_sentence": "초기 실패에 낙담하지 마세요."
    },
    {
        "korean": "실망하다",
        "english": "be disappointed",
        "pronunciation": "[bi dɪsəˈpɔɪntɪd]",
        "hangul_pronunciation": "[비 디서포인티드]",
        "sample_sentence": "He was disappointed with the results.",
        "korean_sentence": "그는 결과에 실망했습니다."
    },
    {
        "korean": "혼란스럽다",
        "english": "be confused",
        "pronunciation": "[bi kənˈfjuzd]",
        "hangul_pronunciation": "[비 컨퓨즈드]",
        "sample_sentence": "I was confused by the instructions.",
        "korean_sentence": "나는 지시 사항에 혼란스러웠습니다."
    },
    {
        "korean": "만족하다",
        "english": "be satisfied",
        "pronunciation": "[bi ˈsætɪsfaɪd]",
        "hangul_pronunciation": "[비 새티스파이드]",
        "sample_sentence": "She was satisfied with her performance.",
        "korean_sentence": "그녀는 자신의 성과에 만족했습니다."
    },
    {
        "korean": "확신하다",
        "english": "be certain",
        "pronunciation": "[biː ˈsɜːrtn]",
        "hangul_pronunciation": "[비 써튼]",
        "sample_sentence": "She is certain about her decision.",
        "korean_sentence": "그녀는 자신의 결정에 확신을 가지고 있습니다."
    },
    {
        "korean": "불만스럽다",
        "english": "be dissatisfied",
        "pronunciation": "[biː dɪsˈsætɪsfaɪd]",
        "hangul_pronunciation": "[비 디스새티스파이드]",
        "sample_sentence": "He was dissatisfied with the service.",
        "korean_sentence": "그는 서비스에 불만이 있었습니다."
    },
    {
        "korean": "평화롭다",
        "english": "be peaceful",
        "pronunciation": "[biː ˈpiːsfəl]",
        "hangul_pronunciation": "[비 피스풀]",
        "sample_sentence": "The garden is a peaceful place.",
        "korean_sentence": "그 정원은 평화로운 장소입니다."
    },
    {
        "korean": "의무이다",
        "english": "be obliged",
        "pronunciation": "[biː əˈblaɪdʒd]",
        "hangul_pronunciation": "[비 어블라이지드]",
        "sample_sentence": "You are obliged to follow the rules.",
        "korean_sentence": "당신은 규칙을 따라야 할 의무가 있습니다."
    },
    {
        "korean": "동의하다",
        "english": "be agreeable",
        "pronunciation": "[biː əˈɡriːəbl]",
        "hangul_pronunciation": "[비 어그리어블]",
        "sample_sentence": "She is very agreeable to the new proposal.",
        "korean_sentence": "그녀는 새로운 제안에 매우 동의합니다."
    },
    {
        "korean": "불행하다",
        "english": "be unhappy",
        "pronunciation": "[biː ʌnˈhæpi]",
        "hangul_pronunciation": "[비 언해피]",
        "sample_sentence": "He was unhappy with the outcome.",
        "korean_sentence": "그는 결과에 불만이 있었습니다."
    },
    {
        "korean": "불확실하다",
        "english": "be uncertain",
        "pronunciation": "[biː ʌnˈsɜːrtn]",
        "hangul_pronunciation": "[비 언써튼]",
        "sample_sentence": "They are uncertain about their future.",
        "korean_sentence": "그들은 자신의 미래에 대해 불확실해합니다."
    },
    {
        "korean": "기뻐하다",
        "english": "be delighted",
        "pronunciation": "[biː dɪˈlaɪtɪd]",
        "hangul_pronunciation": "[비 딜라이트드]",
        "sample_sentence": "She was delighted with the gift.",
        "korean_sentence": "그녀는 선물에 기뻐했습니다."
    },
    {
        "korean": "긴장하다",
        "english": "be tense",
        "pronunciation": "[biː tɛns]",
        "hangul_pronunciation": "[비 텐스]",
        "sample_sentence": "The atmosphere was tense during the meeting.",
        "korean_sentence": "회의 동안 분위기가 긴장되었습니다."
    },
    {
        "korean": "용감하다",
        "english": "be brave",
        "pronunciation": "[biː breɪv]",
        "hangul_pronunciation": "[비 브레이브]",
        "sample_sentence": "He was brave enough to stand up for his beliefs.",
        "korean_sentence": "그는 자신의 신념을 위해 나설 만큼 용감했습니다."
    }
    
    // 여기에 나머지 단어를 추가하세요...
];

// 음성 옵션 설정
function getVoice(lang, name) {
    const voices = synth.getVoices();
    return voices.find(voice => voice.lang === lang && voice.name.includes(name));
}

function updateWord() {
    const word = words[currentWordIndex];
    document.getElementById('word-korean').innerText = word.korean;
    document.getElementById('word-english').innerText = word.english;
    document.getElementById('word-pronunciation').innerText = word.pronunciation;
    document.getElementById('word-hangul-pronunciation').innerText = word.hangul_pronunciation;
    document.getElementById('word-sample-sentence').innerText = word.sample_sentence;
    document.getElementById('word-korean-sentence').innerText = word.korean_sentence;
}

function pronounceWord(times, callback) {
    let count = 0;
    const word = words[currentWordIndex];
    const { korean, english, sample_sentence } = word;

    function speak() {
        if (count < times) {
            // 한국어 음성 설정
            const koreanUtterance = new SpeechSynthesisUtterance(korean);
            koreanUtterance.voice = getVoice('ko-KR', ''); // 한국어 음성 선택 (특정 이름으로 설정 가능)
            koreanUtterance.rate = 1;

            // 영국식 영어 음성 설정
            const englishUtterance = new SpeechSynthesisUtterance(english);
            englishUtterance.voice = getVoice('en-GB', ''); // 영국식 영어 음성 선택 (특정 이름으로 설정 가능)
            englishUtterance.rate = 1;

            // 샘플 문장 음성 설정
            const sampleSentenceUtterance = new SpeechSynthesisUtterance(sample_sentence);
            sampleSentenceUtterance.voice = getVoice('en-GB', ''); // 영국식 영어 음성 선택 (특정 이름으로 설정 가능)
            sampleSentenceUtterance.rate = 1;

            koreanUtterance.onend = () => {
                setTimeout(() => {
                    synth.speak(englishUtterance);
                }, 500);
            };

            englishUtterance.onend = () => {
                setTimeout(() => {
                    synth.speak(sampleSentenceUtterance);
                }, 500);
            };

            sampleSentenceUtterance.onend = () => {
                count++;
                if (count < times) {
                    speak();
                } else if (callback) {
                    callback();
                }
            };

            synth.speak(koreanUtterance);
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

    async function playNextWord() {
        updateWord();
        await new Promise(resolve => pronounceWord(1, resolve)); // 음성 재생이 완료될 때까지 기다림
        currentWordIndex = (currentWordIndex + 1) % words.length;
    }

    playNextWord(); // 첫 단어를 즉시 재생

    autoPlayInterval = setInterval(async () => {
        await playNextWord(); // 15초 간격으로 다음 단어 재생
    }, 15000);
}

function showWordList() {
    const wordList = document.getElementById('word-list');
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>${word.korean}</strong><br>${word.english}<em><br>${word.pronunciation}</em><br>${word.hangul_pronunciation}<br><br>${word.sample_sentence}<br>${word.korean_sentence}<br><br>`;
        wordList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWord();
    showWordList(); // 페이지 로드 시 단어 목록 표시
    setTimeout(() => pronounceWord(1), 2000); // 페이지 로드 후 2초 지연

    // 음성 옵션 로드 대기
    setTimeout(() => {
        const voices = synth.getVoices();
        console.log('Available voices:', voices);
    }, 1000);
});