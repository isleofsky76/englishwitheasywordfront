let currentWordIndex = 0;
let pronounceInterval;
let synth = window.speechSynthesis;
let autoPlayInterval;

const words = [
    {
        "korean": "가지다",
        "english": "have",
        "pronunciation": "[hæv]",
        "hangul_pronunciation": "[해브]",
        "sample_sentence": "I have a car.",
        "korean_sentence": "나는 차를 가지고 있습니다."
    },
    {
        "korean": "먹다",
        "english": "have",
        "pronunciation": "[hæv]",
        "hangul_pronunciation": "[해브]",
        "sample_sentence": "We have dinner at 7 PM.",
        "korean_sentence": "우리는 저녁을 7시에 먹습니다."
    },
    {
        "korean": "시간을 보내다",
        "english": "have",
        "pronunciation": "[hæv]",
        "hangul_pronunciation": "[해브]",
        "sample_sentence": "They have fun at the park.",
        "korean_sentence": "그들은 공원에서 즐거운 시간을 보냅니다."
    },
    {
        "korean": "경험하다",
        "english": "have",
        "pronunciation": "[hæv]",
        "hangul_pronunciation": "[해브]",
        "sample_sentence": "She has a lot of experience.",
        "korean_sentence": "그녀는 많은 경험을 가지고 있습니다."
    },
    {
        "korean": "시간을 가지다",
        "english": "have",
        "pronunciation": "[hæv]",
        "hangul_pronunciation": "[해브]",
        "sample_sentence": "Can we have a moment?",
        "korean_sentence": "잠시 시간을 가질 수 있을까요?"
    },
    {
        "korean": "병에 걸리다",
        "english": "have",
        "pronunciation": "[hæv]",
        "hangul_pronunciation": "[해브]",
        "sample_sentence": "He has a cold.",
        "korean_sentence": "그는 감기에 걸렸습니다."
    },
    {
        "korean": "문제가 있다",
        "english": "have",
        "pronunciation": "[hæv]",
        "hangul_pronunciation": "[해브]",
        "sample_sentence": "We have a problem.",
        "korean_sentence": "우리는 문제가 있습니다."
    },
    {
        "korean": "아이를 낳다",
        "english": "have",
        "pronunciation": "[hæv]",
        "hangul_pronunciation": "[해브]",
        "sample_sentence": "They have three children.",
        "korean_sentence": "그들은 세 명의 아이가 있습니다."
    },
    {
        "korean": "회의하다",
        "english": "have a meeting",
        "pronunciation": "[hæv ə ˈmiːtɪŋ]",
        "hangul_pronunciation": "[해브 어 미팅]",
        "sample_sentence": "We will have a meeting at 10 AM.",
        "korean_sentence": "우리는 오전 10시에 회의를 할 것입니다."
    },
    {
        "korean": "즐거운 시간을 보내다",
        "english": "have a good time",
        "pronunciation": "[hæv ə ɡʊd taɪm]",
        "hangul_pronunciation": "[해브 어 굿 타임]",
        "sample_sentence": "Have a good time at the party!",
        "korean_sentence": "파티에서 즐거운 시간 보내세요!"
    },
    {
        "korean": "기회를 가지다",
        "english": "have an opportunity",
        "pronunciation": "[hæv ən ˌɑːpərˈtuːnɪti]",
        "hangul_pronunciation": "[해브 언 오퍼튜니티]",
        "sample_sentence": "I hope to have an opportunity to travel abroad.",
        "korean_sentence": "해외여행을 할 기회가 있었으면 좋겠어요."
    },
    {
        "korean": "대화하다",
        "english": "have a conversation",
        "pronunciation": "[hæv ə ˌkɑnvərˈseɪʃən]",
        "hangul_pronunciation": "[해브 어 컨버세이션]",
        "sample_sentence": "Let's have a conversation about your plans.",
        "korean_sentence": "당신의 계획에 대해 대화를 나눕시다."
    },
    {
        "korean": "꿈을 꾸다",
        "english": "have a dream",
        "pronunciation": "[hæv ə drim]",
        "hangul_pronunciation": "[해브 어 드림]",
        "sample_sentence": "Last night, I had a strange dream.",
        "korean_sentence": "어젯밤에 이상한 꿈을 꾸었어요."
    },
    {
        "korean": "걱정하다",
        "english": "have a concern",
        "pronunciation": "[hæv ə kənˈsɜrn]",
        "hangul_pronunciation": "[해브 어 컨선]",
        "sample_sentence": "I have a concern about your health.",
        "korean_sentence": "당신의 건강에 대해 걱정이 있어요."
    },
    {
        "korean": "문제를 풀다",
        "english": "have a solution",
        "pronunciation": "[hæv ə səˈluːʃən]",
        "hangul_pronunciation": "[해브 어 솔루션]",
        "sample_sentence": "We have a solution to the problem.",
        "korean_sentence": "우리는 그 문제에 대한 해결책을 가지고 있습니다."
    },
    {
        "korean": "생각하다",
        "english": "have a thought",
        "pronunciation": "[hæv ə θɔt]",
        "hangul_pronunciation": "[해브 어 소트]",
        "sample_sentence": "I have a thought about the project.",
        "korean_sentence": "그 프로젝트에 대해 생각이 있어요."
    },
    {
        "korean": "차를 마시다",
        "english": "have tea",
        "pronunciation": "[hæv ti]",
        "hangul_pronunciation": "[해브 티]",
        "sample_sentence": "We often have tea in the afternoon.",
        "korean_sentence": "우리는 오후에 종종 차를 마십니다."
    },
    {
        "korean": "샤워하다",
        "english": "have a shower",
        "pronunciation": "[hæv ə ˈʃaʊər]",
        "hangul_pronunciation": "[해브 어 샤워]",
        "sample_sentence": "I need to have a shower before dinner.",
        "korean_sentence": "저녁 식사 전에 샤워를 해야겠어요."
    },
    {
        "korean": "의견을 가지다",
        "english": "have an opinion",
        "pronunciation": "[hæv ən əˈpɪnjən]",
        "hangul_pronunciation": "[해브 언 어피니언]",
        "sample_sentence": "She always has an opinion on everything.",
        "korean_sentence": "그녀는 항상 모든 것에 대해 의견이 있습니다."
    },
    {
        "korean": "일정을 잡다",
        "english": "have a schedule",
        "pronunciation": "[hæv ə ˈskɛʤʊl]",
        "hangul_pronunciation": "[해브 어 스케줄]",
        "sample_sentence": "We have a schedule for the meeting.",
        "korean_sentence": "우리는 회의 일정을 가지고 있습니다."
    },
    {
        "korean": "목표를 가지다",
        "english": "have a goal",
        "pronunciation": "[hæv ə ɡoʊl]",
        "hangul_pronunciation": "[해브 어 골]",
        "sample_sentence": "It's important to have a goal in life.",
        "korean_sentence": "인생에서 목표를 가지는 것이 중요합니다."
    },
    {
        "korean": "통증이 있다",
        "english": "have pain",
        "pronunciation": "[hæv peɪn]",
        "hangul_pronunciation": "[해브 페인]",
        "sample_sentence": "Do you have pain anywhere?",
        "korean_sentence": "어디에 통증이 있나요?"
    },
    {
        "korean": "취미를 가지다",
        "english": "have a hobby",
        "pronunciation": "[hæv ə ˈhɑbi]",
        "hangul_pronunciation": "[해브 어 하비]",
        "sample_sentence": "Do you have a hobby?",
        "korean_sentence": "취미가 있나요?"
    },
    {
        "korean": "갈증을 느끼다",
        "english": "have thirst",
        "pronunciation": "[hæv θɜrst]",
        "hangul_pronunciation": "[해브 서스트]",
        "sample_sentence": "I have a thirst for knowledge.",
        "korean_sentence": "나는 지식에 대한 갈증이 있습니다."
    },
    {
        "korean": "피로를 느끼다",
        "english": "have fatigue",
        "pronunciation": "[hæv fəˈtiɡ]",
        "hangul_pronunciation": "[해브 퍼티그]",
        "sample_sentence": "He has fatigue after working all day.",
        "korean_sentence": "그는 하루 종일 일한 후 피로를 느낍니다."
    },
    {
        "korean": "대답하다",
        "english": "have an answer",
        "pronunciation": "[hæv ən ˈænsər]",
        "hangul_pronunciation": "[해브 언 앤서]",
        "sample_sentence": "Do you have an answer to the question?",
        "korean_sentence": "그 질문에 대한 답이 있나요?"
    },
    {
        "korean": "변명을 하다",
        "english": "have an excuse",
        "pronunciation": "[hæv ən ɪkˈskjus]",
        "hangul_pronunciation": "[해브 언 익스큐즈]",
        "sample_sentence": "He always has an excuse for being late.",
        "korean_sentence": "그는 항상 늦는 변명이 있습니다."
    },
    {
        "korean": "계획을 가지다",
        "english": "have a plan",
        "pronunciation": "[hæv ə plæn]",
        "hangul_pronunciation": "[해브 어 플랜]",
        "sample_sentence": "We have a plan for the weekend.",
        "korean_sentence": "우리는 주말 계획이 있습니다."
    },
    {
        "korean": "걱정하다",
        "english": "have worries",
        "pronunciation": "[hæv ˈwɜriz]",
        "hangul_pronunciation": "[해브 워리즈]",
        "sample_sentence": "Do you have any worries?",
        "korean_sentence": "걱정거리가 있나요?"
    },
    {
        "korean": "만남을 가지다",
        "english": "have a meeting",
        "pronunciation": "[hæv ə ˈmitɪŋ]",
        "hangul_pronunciation": "[해브 어 미팅]",
        "sample_sentence": "We have a meeting every Monday.",
        "korean_sentence": "우리는 매주 월요일에 회의가 있습니다."
    },
    {
        "korean": "행복하다",
        "english": "have happiness",
        "pronunciation": "[hæv ˈhæpinəs]",
        "hangul_pronunciation": "[해브 해피니스]",
        "sample_sentence": "They have a lot of happiness in their life.",
        "korean_sentence": "그들은 삶에 많은 행복이 있습니다."
    },
    {
        "korean": "화가 나다",
        "english": "have anger",
        "pronunciation": "[hæv ˈæŋɡər]",
        "hangul_pronunciation": "[해브 앵거]",
        "sample_sentence": "He has anger issues.",
        "korean_sentence": "그는 화를 잘 냅니다."
    },
    {
        "korean": "조언하다",
        "english": "have advice",
        "pronunciation": "[hæv ædˈvaɪs]",
        "hangul_pronunciation": "[해브 어드바이스]",
        "sample_sentence": "Do you have any advice for me?",
        "korean_sentence": "나에게 조언이 있나요?"
    },
    {
        "korean": "꿈을 꾸다",
        "english": "have a dream",
        "pronunciation": "[hæv ə drim]",
        "hangul_pronunciation": "[해브 어 드림]",
        "sample_sentence": "I had a dream about flying.",
        "korean_sentence": "나는 날아다니는 꿈을 꾸었습니다."
    },
    {
        "korean": "손님을 맞다",
        "english": "have guests",
        "pronunciation": "[hæv ɡɛsts]",
        "hangul_pronunciation": "[해브 게스츠]",
        "sample_sentence": "We have guests coming over tonight.",
        "korean_sentence": "오늘 밤에 손님들이 옵니다."
    },
    {
        "korean": "영향을 미치다",
        "english": "have an impact",
        "pronunciation": "[hæv ən ˈɪmpækt]",
        "hangul_pronunciation": "[해브 언 임팩트]",
        "sample_sentence": "His speech had an impact on the audience.",
        "korean_sentence": "그의 연설은 청중에게 영향을 미쳤습니다."
    },
    {
        "korean": "토론하다",
        "english": "have a discussion",
        "pronunciation": "[hæv ə dɪˈskʌʃən]",
        "hangul_pronunciation": "[해브 어 디스커션]",
        "sample_sentence": "We need to have a discussion about this.",
        "korean_sentence": "이 문제에 대해 토론이 필요합니다."
    },
    {
        "korean": "기회를 가지다",
        "english": "have a chance",
        "pronunciation": "[hæv ə ʧæns]",
        "hangul_pronunciation": "[해브 어 찬스]",
        "sample_sentence": "You will have a chance to prove yourself.",
        "korean_sentence": "당신은 자신을 증명할 기회가 있을 것입니다."
    },
    {
        "korean": "약속을 가지다",
        "english": "have an appointment",
        "pronunciation": "[hæv ən əˈpɔɪntmənt]",
        "hangul_pronunciation": "[해브 언 어포인트먼트]",
        "sample_sentence": "I have an appointment with the doctor.",
        "korean_sentence": "나는 의사와 약속이 있습니다."
    },
    {
        "korean": "논쟁하다",
        "english": "have an argument",
        "pronunciation": "[hæv ən ˈɑːrɡjumənt]",
        "hangul_pronunciation": "[해브 언 아규먼트]",
        "sample_sentence": "They had an argument about politics.",
        "korean_sentence": "그들은 정치에 대해 논쟁을 벌였습니다."
    },
    {
        "korean": "의심하다",
        "english": "have doubts",
        "pronunciation": "[hæv daʊts]",
        "hangul_pronunciation": "[해브 다웃츠]",
        "sample_sentence": "I have doubts about his story.",
        "korean_sentence": "나는 그의 이야기에는 의심이 듭니다."
    },
    {
        "korean": "기회를 잡다",
        "english": "have a go",
        "pronunciation": "[hæv ə ɡoʊ]",
        "hangul_pronunciation": "[해브 어 고]",
        "sample_sentence": "Why don't you have a go at solving this puzzle?",
        "korean_sentence": "이 퍼즐을 한번 풀어보는 게 어때요?"
    },
    {
        "korean": "잠을 자다",
        "english": "have a sleep",
        "pronunciation": "[hæv ə slip]",
        "hangul_pronunciation": "[해브 어 슬립]",
        "sample_sentence": "I need to have a sleep before we go out.",
        "korean_sentence": "나가기 전에 잠을 좀 자야겠어요."
    },
    {
        "korean": "말다툼하다",
        "english": "have a quarrel",
        "pronunciation": "[hæv ə ˈkwɔrəl]",
        "hangul_pronunciation": "[해브 어 쿼럴]",
        "sample_sentence": "They often have a quarrel over trivial matters.",
        "korean_sentence": "그들은 사소한 일로 자주 말다툼을 합니다."
    },
    {
        "korean": "술을 마시다",
        "english": "have a drink",
        "pronunciation": "[hæv ə drɪŋk]",
        "hangul_pronunciation": "[해브 어 드링크]",
        "sample_sentence": "Let's have a drink to celebrate.",
        "korean_sentence": "축하하기 위해 한 잔 하자."
    },
    {
        "korean": "휴가를 보내다",
        "english": "have a holiday",
        "pronunciation": "[hæv ə ˈhɒlɪdeɪ]",
        "hangul_pronunciation": "[해브 어 홀리데이]",
        "sample_sentence": "We will have a holiday next month.",
        "korean_sentence": "우리는 다음 달에 휴가를 보낼 것입니다."
    },
    {
        "korean": "고통을 느끼다",
        "english": "have a pain",
        "pronunciation": "[hæv ə peɪn]",
        "hangul_pronunciation": "[해브 어 페인]",
        "sample_sentence": "I have a pain in my back.",
        "korean_sentence": "등에 통증이 있어요."
    },
    {
        "korean": "재미있다",
        "english": "have fun",
        "pronunciation": "[hæv fʌn]",
        "hangul_pronunciation": "[해브 펀]",
        "sample_sentence": "Did you have fun at the party?",
        "korean_sentence": "파티에서 재미있었나요?"
    },
    {
        "korean": "산책하다",
        "english": "have a walk",
        "pronunciation": "[hæv ə wɔk]",
        "hangul_pronunciation": "[해브 어 워크]",
        "sample_sentence": "Let's have a walk after dinner.",
        "korean_sentence": "저녁 먹고 산책하자."
    },
    {
        "korean": "논쟁하다",
        "english": "have a debate",
        "pronunciation": "[hæv ə dɪˈbeɪt]",
        "hangul_pronunciation": "[해브 어 디베이트]",
        "sample_sentence": "They had a debate about the new policy.",
        "korean_sentence": "그들은 새 정책에 대해 논쟁을 벌였습니다."
    },
    {
        "korean": "갈등하다",
        "english": "have a conflict",
        "pronunciation": "[hæv ə ˈkɒnflɪkt]",
        "hangul_pronunciation": "[해브 어 컨플릭트]",
        "sample_sentence": "We had a conflict of opinions.",
        "korean_sentence": "우리는 의견 충돌이 있었습니다."
    },
    {
        "korean": "휴식을 취하다",
        "english": "have a break",
        "pronunciation": "[hæv ə breɪk]",
        "hangul_pronunciation": "[해브 어 브레이크]",
        "sample_sentence": "Let's have a break and continue later.",
        "korean_sentence": "잠시 휴식을 취하고 나중에 계속합시다."
    },
    {
        "korean": "생각하다",
        "english": "have an idea",
        "pronunciation": "[hæv ən aɪˈdiə]",
        "hangul_pronunciation": "[해브 언 아이디어]",
        "sample_sentence": "I have an idea for the project.",
        "korean_sentence": "프로젝트에 대한 아이디어가 있습니다."
    },
    {
        "korean": "약속하다",
        "english": "have an agreement",
        "pronunciation": "[hæv ən əˈɡrimənt]",
        "hangul_pronunciation": "[해브 언 어그리먼트]",
        "sample_sentence": "We have an agreement to work together.",
        "korean_sentence": "우리는 함께 일하기로 약속했습니다."
    },
    {
        "korean": "유머를 가지다",
        "english": "have a sense of humor",
        "pronunciation": "[hæv ə sɛns ʌv ˈhjumər]",
        "hangul_pronunciation": "[해브 어 센스 오브 휴머]",
        "sample_sentence": "She has a great sense of humor.",
        "korean_sentence": "그녀는 유머 감각이 뛰어납니다."
    },
    {
        "korean": "친구를 사귀다",
        "english": "have a friend",
        "pronunciation": "[hæv ə frɛnd]",
        "hangul_pronunciation": "[해브 어 프렌드]",
        "sample_sentence": "I have a friend who lives in New York.",
        "korean_sentence": "나는 뉴욕에 사는 친구가 있습니다."
    },
    {
        "korean": "강의를 듣다",
        "english": "have a lecture",
        "pronunciation": "[hæv ə ˈlɛkʧər]",
        "hangul_pronunciation": "[해브 어 렉처]",
        "sample_sentence": "We will have a lecture on history tomorrow.",
        "korean_sentence": "우리는 내일 역사 강의를 들을 것입니다."
    },
    {
        "korean": "조언을 구하다",
        "english": "have a consultation",
        "pronunciation": "[hæv ə ˌkɒnsəlˈteɪʃən]",
        "hangul_pronunciation": "[해브 어 컨설테이션]",
        "sample_sentence": "I need to have a consultation with my lawyer.",
        "korean_sentence": "변호사와 상담을 해야 합니다."
    },
    {
        "korean": "만찬을 가지다",
        "english": "have a feast",
        "pronunciation": "[hæv ə fist]",
        "hangul_pronunciation": "[해브 어 피스트]",
        "sample_sentence": "They had a feast to celebrate the holiday.",
        "korean_sentence": "그들은 휴일을 기념하기 위해 만찬을 가졌습니다."
    },
    {
        "korean": "목욕하다",
        "english": "have a bath",
        "pronunciation": "[hæv ə bæθ]",
        "hangul_pronunciation": "[해브 어 배쓰]",
        "sample_sentence": "I like to have a bath to relax.",
        "korean_sentence": "나는 휴식을 위해 목욕하는 것을 좋아합니다."
    },
    {
        "korean": "문제를 해결하다",
        "english": "have a solution",
        "pronunciation": "[hæv ə səˈluʃən]",
        "hangul_pronunciation": "[해브 어 솔루션]",
        "sample_sentence": "Do you have a solution to this problem?",
        "korean_sentence": "이 문제에 대한 해결책이 있나요?"
    },
    {
        "korean": "꿈을 꾸다",
        "english": "have a vision",
        "pronunciation": "[hæv ə ˈvɪʒən]",
        "hangul_pronunciation": "[해브 어 비전]",
        "sample_sentence": "She has a vision for the future.",
        "korean_sentence": "그녀는 미래에 대한 비전을 가지고 있습니다."
    },
    {
        "korean": "체력을 가지다",
        "english": "have stamina",
        "pronunciation": "[hæv ˈstæmɪnə]",
        "hangul_pronunciation": "[해브 스태미나]",
        "sample_sentence": "You need to have stamina to run a marathon.",
        "korean_sentence": "마라톤을 뛰려면 체력이 필요합니다."
    },
    {
        "korean": "차를 마시다",
        "english": "have a cup of tea",
        "pronunciation": "[hæv ə kʌp ʌv ti]",
        "hangul_pronunciation": "[해브 어 컵 오브 티]",
        "sample_sentence": "Would you like to have a cup of tea?",
        "korean_sentence": "차 한잔 하시겠어요?"
    },
    {
        "korean": "피크닉을 하다",
        "english": "have a picnic",
        "pronunciation": "[hæv ə ˈpɪknɪk]",
        "hangul_pronunciation": "[해브 어 피크닉]",
        "sample_sentence": "Let's have a picnic in the park.",
        "korean_sentence": "공원에서 피크닉을 합시다."
    },
    {
        "korean": "회의를 열다",
        "english": "have a conference",
        "pronunciation": "[hæv ə ˈkɒnfərəns]",
        "hangul_pronunciation": "[해브 어 컨퍼런스]",
        "sample_sentence": "We will have a conference next week.",
        "korean_sentence": "우리는 다음 주에 회의를 열 것입니다."
    },
    {
        "korean": "노래를 부르다",
        "english": "have a song",
        "pronunciation": "[hæv ə sɔŋ]",
        "hangul_pronunciation": "[해브 어 송]",
        "sample_sentence": "Let's have a song to celebrate.",
        "korean_sentence": "축하하기 위해 노래를 부르자."
    },
    {
        "korean": "목소리를 가지다",
        "english": "have a voice",
        "pronunciation": "[hæv ə vɔɪs]",
        "hangul_pronunciation": "[해브 어 보이스]",
        "sample_sentence": "Everyone should have a voice in this discussion.",
        "korean_sentence": "모두가 이 논의에서 목소리를 내야 합니다."
    },
    {
        "korean": "추억을 가지다",
        "english": "have a memory",
        "pronunciation": "[hæv ə ˈmɛməri]",
        "hangul_pronunciation": "[해브 어 메모리]",
        "sample_sentence": "I have a good memory of our trip.",
        "korean_sentence": "나는 우리의 여행에 대한 좋은 추억을 가지고 있습니다."
    },
    {
        "korean": "경험을 가지다",
        "english": "have an experience",
        "pronunciation": "[hæv ən ɪkˈspɪəriəns]",
        "hangul_pronunciation": "[해브 언 익스피어리언스]",
        "sample_sentence": "She has a lot of experience in teaching.",
        "korean_sentence": "그녀는 교육에 많은 경험이 있습니다."
    },
    {
        "korean": "집회를 열다",
        "english": "have a rally",
        "pronunciation": "[hæv ə ˈræli]",
        "hangul_pronunciation": "[해브 어 랠리]",
        "sample_sentence": "They will have a rally to support the cause.",
        "korean_sentence": "그들은 그 대의를 지지하기 위해 집회를 열 것입니다."
    },
    {
        "korean": "연설을 하다",
        "english": "have a speech",
        "pronunciation": "[hæv ə spiʧ]",
        "hangul_pronunciation": "[해브 어 스피치]",
        "sample_sentence": "He will have a speech at the event.",
        "korean_sentence": "그는 행사에서 연설을 할 것입니다."
    },
    {
        "korean": "고백하다",
        "english": "have a confession",
        "pronunciation": "[hæv ə kənˈfɛʃən]",
        "hangul_pronunciation": "[해브 어 컨페션]",
        "sample_sentence": "I have a confession to make.",
        "korean_sentence": "고백할 것이 있습니다."
    },
    {
        "korean": "계획이 있다",
        "english": "have a plan",
        "pronunciation": "[hæv ə plæn]",
        "hangul_pronunciation": "[해브 어 플랜]",
        "sample_sentence": "Do you have a plan for the weekend?",
        "korean_sentence": "주말에 계획이 있나요?"
    },
    {
        "korean": "휴식을 취하다",
        "english": "have a rest",
        "pronunciation": "[hæv ə rɛst]",
        "hangul_pronunciation": "[해브 어 레스트]",
        "sample_sentence": "You should have a rest after the long journey.",
        "korean_sentence": "긴 여행 후에 휴식을 취해야 합니다."
    },
    {
        "korean": "농담을 하다",
        "english": "have a joke",
        "pronunciation": "[hæv ə ʤoʊk]",
        "hangul_pronunciation": "[해브 어 조크]",
        "sample_sentence": "Let's have a joke to lighten the mood.",
        "korean_sentence": "분위기를 풀기 위해 농담을 해봅시다."
    },
    {
        "korean": "안정을 취하다",
        "english": "have peace",
        "pronunciation": "[hæv pis]",
        "hangul_pronunciation": "[해브 피스]",
        "sample_sentence": "It's important to have peace in your life.",
        "korean_sentence": "삶에서 안정을 취하는 것이 중요합니다."
    },
    {
        "korean": "차를 마시다",
        "english": "have coffee",
        "pronunciation": "[hæv ˈkɔfi]",
        "hangul_pronunciation": "[해브 커피]",
        "sample_sentence": "Let's have coffee together sometime.",
        "korean_sentence": "언제 같이 커피 마시자."
    },
    {
        "korean": "통증이 있다",
        "english": "have an ache",
        "pronunciation": "[hæv ən eɪk]",
        "hangul_pronunciation": "[해브 언 에이크]",
        "sample_sentence": "I have an ache in my shoulder.",
        "korean_sentence": "어깨에 통증이 있어요."
    },
    {
        "korean": "친구를 사귀다",
        "english": "have a friend",
        "pronunciation": "[hæv ə frɛnd]",
        "hangul_pronunciation": "[해브 어 프렌드]",
        "sample_sentence": "She wants to have a friend to talk to.",
        "korean_sentence": "그녀는 이야기할 친구를 사귀고 싶어해요."
    },
    {
        "korean": "의문이 있다",
        "english": "have a doubt",
        "pronunciation": "[hæv ə daʊt]",
        "hangul_pronunciation": "[해브 어 다우트]",
        "sample_sentence": "I have a doubt about his story.",
        "korean_sentence": "그의 이야기에는 의문이 있어요."
    },
    {
        "korean": "식사를 하다",
        "english": "have a meal",
        "pronunciation": "[hæv ə mil]",
        "hangul_pronunciation": "[해브 어 밀]",
        "sample_sentence": "We should have a meal together sometime.",
        "korean_sentence": "언제 같이 식사합시다."
    },
    {
        "korean": "아이디어를 가지다",
        "english": "have an idea",
        "pronunciation": "[hæv ən aɪˈdiə]",
        "hangul_pronunciation": "[해브 언 아이디어]",
        "sample_sentence": "I have an idea for the project.",
        "korean_sentence": "프로젝트에 대한 아이디어가 있어요."
    },
    {
        "korean": "쇼핑하다",
        "english": "have a shopping",
        "pronunciation": "[hæv ə ˈʃɑpɪŋ]",
        "hangul_pronunciation": "[해브 어 샤핑]",
        "sample_sentence": "Let's have a shopping day next week.",
        "korean_sentence": "다음 주에 쇼핑하러 가자."
    },
    {
        "korean": "흥미가 있다",
        "english": "have an interest",
        "pronunciation": "[hæv ən ˈɪntrəst]",
        "hangul_pronunciation": "[해브 언 인트레스트]",
        "sample_sentence": "She has an interest in photography.",
        "korean_sentence": "그녀는 사진에 흥미가 있어요."
    },
    {
        "korean": "상상하다",
        "english": "have an imagination",
        "pronunciation": "[hæv ən ɪˌmæʤəˈneɪʃən]",
        "hangul_pronunciation": "[해브 언 이매지네이션]",
        "sample_sentence": "Kids have a vivid imagination.",
        "korean_sentence": "아이들은 생생한 상상력을 가지고 있어요."
    },
    {
        "korean": "잠자리를 가지다",
        "english": "have a bed",
        "pronunciation": "[hæv ə bɛd]",
        "hangul_pronunciation": "[해브 어 베드]",
        "sample_sentence": "Everyone needs to have a bed to sleep in.",
        "korean_sentence": "모든 사람은 잘 수 있는 침대가 필요해요."
    },
    {
        "korean": "재미있다",
        "english": "have fun",
        "pronunciation": "[hæv fʌn]",
        "hangul_pronunciation": "[해브 펀]",
        "sample_sentence": "We had a lot of fun at the amusement park.",
        "korean_sentence": "놀이공원에서 많은 재미를 느꼈어요."
    },
    {
        "korean": "목적이 있다",
        "english": "have a purpose",
        "pronunciation": "[hæv ə ˈpɜrpəs]",
        "hangul_pronunciation": "[해브 어 퍼포스]",
        "sample_sentence": "It's important to have a purpose in life.",
        "korean_sentence": "삶에서 목적을 가지는 것이 중요합니다."
    },
    {
        "korean": "의문을 가지다",
        "english": "have a query",
        "pronunciation": "[hæv ə ˈkwɪri]",
        "hangul_pronunciation": "[해브 어 퀘리]",
        "sample_sentence": "I have a query about the new policy.",
        "korean_sentence": "새 정책에 대해 의문이 있어요."
    },
    {
        "korean": "기억하다",
        "english": "have a memory",
        "pronunciation": "[hæv ə ˈmɛməri]",
        "hangul_pronunciation": "[해브 어 메모리]",
        "sample_sentence": "I have a good memory of our trip.",
        "korean_sentence": "우리 여행에 대한 좋은 기억이 있어요."
    },
    {
        "korean": "도전하다",
        "english": "have a challenge",
        "pronunciation": "[hæv ə ˈʧælɪnʤ]",
        "hangul_pronunciation": "[해브 어 챌린지]",
        "sample_sentence": "We have a challenge ahead of us.",
        "korean_sentence": "우리 앞에 도전 과제가 있어요."
    },
    {
        "korean": "조언하다",
        "english": "have advice",
        "pronunciation": "[hæv ædˈvaɪs]",
        "hangul_pronunciation": "[해브 어드바이스]",
        "sample_sentence": "Can you have advice for me?",
        "korean_sentence": "나에게 조언해 줄 수 있나요?"
    },
    {
        "korean": "질문을 하다",
        "english": "have a question",
        "pronunciation": "[hæv ə ˈkwɛsʧən]",
        "hangul_pronunciation": "[해브 어 퀘스천]",
        "sample_sentence": "Do you have a question about the assignment?",
        "korean_sentence": "과제에 대해 질문이 있나요?"
    },
    {
        "korean": "책을 읽다",
        "english": "have a read",
        "pronunciation": "[hæv ə rid]",
        "hangul_pronunciation": "[해브 어 리드]",
        "sample_sentence": "I like to have a read before bed.",
        "korean_sentence": "나는 잠들기 전에 책을 읽는 것을 좋아해요."
    },
    {
        "korean": "게임을 하다",
        "english": "have a game",
        "pronunciation": "[hæv ə ɡeɪm]",
        "hangul_pronunciation": "[해브 어 게임]",
        "sample_sentence": "Let's have a game of chess.",
        "korean_sentence": "체스 게임을 하자."
    },


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