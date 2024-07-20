let currentWordIndex = 0;
let pronounceInterval;
let synth = window.speechSynthesis;
let autoPlayInterval;

const words = [
    {
        "korean": "얻다, 받다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "Can you get me some water?",
        "korean_sentence": "물 좀 가져다줄 수 있어요?"
    },
    {
        "korean": "받다, 얻다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "I got a gift from my friend.",
        "korean_sentence": "친구에게 선물을 받았어요."
    },
    {
        "korean": "얻다, 이루다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "She got the highest score in the class.",
        "korean_sentence": "그녀는 반에서 최고 점수를 얻었어요."
    },
    {
        "korean": "이해하다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "I didn't get what he meant.",
        "korean_sentence": "나는 그가 무슨 뜻인지 이해하지 못했어요."
    },
    {
        "korean": "도착하다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "What time did you get home?",
        "korean_sentence": "집에 몇 시에 도착했어요?"
    },
    {
        "korean": "되다, ~지다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "He got sick after the trip.",
        "korean_sentence": "그는 여행 후에 아팠어요."
    },
    {
        "korean": "사다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "I need to get some groceries.",
        "korean_sentence": "나는 식료품을 사야 해요."
    },
    {
        "korean": "가져오다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "Can you get my coat for me?",
        "korean_sentence": "내 코트를 가져다줄 수 있어요?"
    },
    {
        "korean": "깨닫다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "I finally got the joke.",
        "korean_sentence": "마침내 그 농담을 깨달았어요."
    },
    {
        "korean": "데리러 가다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "I'll get you at the station.",
        "korean_sentence": "역에서 데리러 갈게요."
    },
    {
        "korean": "시키다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "Let's get a pizza for dinner.",
        "korean_sentence": "저녁으로 피자를 시키자."
    },
    {
        "korean": "이기다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "He got me in the game.",
        "korean_sentence": "그가 게임에서 나를 이겼어요."
    },
    {
        "korean": "잡다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "I got the ball.",
        "korean_sentence": "나는 공을 잡았어요."
    },
    {
        "korean": "타다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "Let's get a taxi.",
        "korean_sentence": "택시를 타자."
    },
    {
        "korean": "불러오다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "Can you get the doctor?",
        "korean_sentence": "의사 좀 불러줄 수 있어요?"
    },
    {
        "korean": "만들다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "hangul_pronunciation": "[겟]",
        "sample_sentence": "I'll get us some coffee.",
        "korean_sentence": "커피 좀 만들어줄게요."
    },
    {
        "korean": "도망치다",
        "english": "get away",
        "pronunciation": "[ɡɛt əˈweɪ]",
        "hangul_pronunciation": "[겟 어웨이]",
        "sample_sentence": "The thief managed to get away.",
        "korean_sentence": "도둑이 도망쳤어요."
    },
    {
        "korean": "돌아가다",
        "english": "get back",
        "pronunciation": "[ɡɛt bæk]",
        "hangul_pronunciation": "[겟 백]",
        "sample_sentence": "What time did you get back home?",
        "korean_sentence": "집에 몇 시에 돌아왔어요?"
    },
    {
        "korean": "일어나다",
        "english": "get up",
        "pronunciation": "[ɡɛt ʌp]",
        "hangul_pronunciation": "[겟 업]",
        "sample_sentence": "I get up early every morning.",
        "korean_sentence": "나는 매일 아침 일찍 일어나요."
    },
    {
        "korean": "넘어가다",
        "english": "get over",
        "pronunciation": "[ɡɛt ˈoʊvər]",
        "hangul_pronunciation": "[겟 오버]",
        "sample_sentence": "It took me a long time to get over the flu.",
        "korean_sentence": "독감을 이겨내는 데 오래 걸렸어요."
    },
    {
        "korean": "친해지다",
        "english": "get along",
        "pronunciation": "[ɡɛt əˈlɔːŋ]",
        "hangul_pronunciation": "[겟 얼롱]",
        "sample_sentence": "Do you get along with your coworkers?",
        "korean_sentence": "동료들과 잘 지내세요?"
    },
    {
        "korean": "이어지다",
        "english": "get through",
        "pronunciation": "[ɡɛt θruː]",
        "hangul_pronunciation": "[겟 쓰루]",
        "sample_sentence": "I couldn't get through to him.",
        "korean_sentence": "그에게 연락이 닿지 않았어요."
    },
    {
        "korean": "시작하다",
        "english": "get started",
        "pronunciation": "[ɡɛt ˈstɑːrtɪd]",
        "hangul_pronunciation": "[겟 스타티드]",
        "sample_sentence": "Let's get started on the project.",
        "korean_sentence": "프로젝트를 시작합시다."
    },
    {
        "korean": "돌아오다",
        "english": "get back",
        "pronunciation": "[ɡɛt bæk]",
        "hangul_pronunciation": "[겟 백]",
        "sample_sentence": "When did you get back from your trip?",
        "korean_sentence": "여행에서 언제 돌아왔어요?"
    },
    {
        "korean": "끝내다",
        "english": "get done",
        "pronunciation": "[ɡɛt dʌn]",
        "hangul_pronunciation": "[겟 던]",
        "sample_sentence": "I need to get my work done before the deadline.",
        "korean_sentence": "마감 전에 일을 끝내야 해요."
    },
    {
        "korean": "빠져나가다",
        "english": "get out",
        "pronunciation": "[ɡɛt aʊt]",
        "hangul_pronunciation": "[겟 아웃]",
        "sample_sentence": "We need to get out of here.",
        "korean_sentence": "여기서 빠져나가야 해요."
    },
    {
        "korean": "흥분하다",
        "english": "get excited",
        "pronunciation": "[ɡɛt ɪkˈsaɪtɪd]",
        "hangul_pronunciation": "[겟 익사이티드]",
        "sample_sentence": "I always get excited before a trip.",
        "korean_sentence": "여행 전에 항상 흥분돼요."
    },
    {
        "korean": "지치다",
        "english": "get tired",
        "pronunciation": "[ɡɛt ˈtaɪərd]",
        "hangul_pronunciation": "[겟 타이어드]",
        "sample_sentence": "I get tired after a long day of work.",
        "korean_sentence": "긴 하루 일한 후에 지쳐요."
    },
    {
        "korean": "알아내다",
        "english": "get to know",
        "pronunciation": "[ɡɛt tə noʊ]",
        "hangul_pronunciation": "[겟 투 노우]",
        "sample_sentence": "I want to get to know my new neighbors.",
        "korean_sentence": "새로운 이웃을 알아가고 싶어요."
    },
    {
        "korean": "깨우다",
        "english": "get up",
        "pronunciation": "[ɡɛt ʌp]",
        "hangul_pronunciation": "[겟 업]",
        "sample_sentence": "Can you get me up at 7 AM?",
        "korean_sentence": "아침 7시에 깨워줄 수 있어요?"
    },
    {
        "korean": "사로잡다",
        "english": "get caught",
        "pronunciation": "[ɡɛt kɔːt]",
        "hangul_pronunciation": "[겟 콧]",
        "sample_sentence": "He got caught cheating on the test.",
        "korean_sentence": "그는 시험에서 부정행위를 하다가 걸렸어요."
    },
    {
        "korean": "잘 지내다",
        "english": "get along",
        "pronunciation": "[ɡɛt əˈlɔːŋ]",
        "hangul_pronunciation": "[겟 얼롱]",
        "sample_sentence": "We get along well with our neighbors.",
        "korean_sentence": "우리는 이웃들과 잘 지내요."
    },
    {
        "korean": "다투다",
        "english": "get into a fight",
        "pronunciation": "[ɡɛt ˈɪntu ə faɪt]",
        "hangul_pronunciation": "[겟 인투 어 파이트]",
        "sample_sentence": "They often get into fights.",
        "korean_sentence": "그들은 자주 싸워요."
    },
    {
        "korean": "편해지다",
        "english": "get comfortable",
        "pronunciation": "[ɡɛt ˈkʌmfərtəbl]",
        "hangul_pronunciation": "[겟 컴퍼터블]",
        "sample_sentence": "Please get comfortable and enjoy the show.",
        "korean_sentence": "편하게 앉아서 쇼를 즐기세요."
    },
    {
        "korean": "기뻐하다",
        "english": "get happy",
        "pronunciation": "[ɡɛt ˈhæpi]",
        "hangul_pronunciation": "[겟 해피]",
        "sample_sentence": "I get happy when I see my friends.",
        "korean_sentence": "친구들을 보면 기뻐요."
    },
    {
        "korean": "걱정하다",
        "english": "get worried",
        "pronunciation": "[ɡɛt ˈwɜːrid]",
        "hangul_pronunciation": "[겟 워리드]",
        "sample_sentence": "Parents often get worried about their children.",
        "korean_sentence": "부모님들은 자주 자녀들에 대해 걱정해요."
    },
    {
        "korean": "입다",
        "english": "get dressed",
        "pronunciation": "[ɡɛt drɛst]",
        "hangul_pronunciation": "[겟 드레스트]",
        "sample_sentence": "I need to get dressed for the party.",
        "korean_sentence": "파티에 가기 위해 옷을 입어야 해요."
    },
    {
        "korean": "내려가다",
        "english": "get down",
        "pronunciation": "[ɡɛt daʊn]",
        "hangul_pronunciation": "[겟 다운]",
        "sample_sentence": "The cat won't get down from the tree.",
        "korean_sentence": "고양이가 나무에서 내려오지 않아요."
    },
    {
        "korean": "익숙해지다",
        "english": "get used to",
        "pronunciation": "[ɡɛt juːst tu]",
        "hangul_pronunciation": "[겟 유스트 투]",
        "sample_sentence": "You will get used to the new environment soon.",
        "korean_sentence": "곧 새로운 환경에 익숙해질 거예요."
    },
    {
        "korean": "빠지다",
        "english": "get lost",
        "pronunciation": "[ɡɛt lɔst]",
        "hangul_pronunciation": "[겟 로스트]",
        "sample_sentence": "We always get lost in this city.",
        "korean_sentence": "우리는 이 도시에서 항상 길을 잃어요."
    },
    {
        "korean": "탈출하다",
        "english": "get away",
        "pronunciation": "[ɡɛt əˈweɪ]",
        "hangul_pronunciation": "[겟 어웨이]",
        "sample_sentence": "They managed to get away from the burning building.",
        "korean_sentence": "그들은 불타는 건물에서 탈출했어요."
    },
    {
        "korean": "탑승하다",
        "english": "get on",
        "pronunciation": "[ɡɛt ɑn]",
        "hangul_pronunciation": "[겟 온]",
        "sample_sentence": "Let's get on the bus.",
        "korean_sentence": "버스에 탑승합시다."
    },
    {
        "korean": "내리다",
        "english": "get off",
        "pronunciation": "[ɡɛt ɔf]",
        "hangul_pronunciation": "[겟 오프]",
        "sample_sentence": "We need to get off at the next stop.",
        "korean_sentence": "다음 정류장에서 내려야 해요."
    },
    {
        "korean": "다다르다",
        "english": "get to",
        "pronunciation": "[ɡɛt tu]",
        "hangul_pronunciation": "[겟 투]",
        "sample_sentence": "What time will we get to the hotel?",
        "korean_sentence": "우리는 몇 시에 호텔에 도착할까요?"
    },
    {
        "korean": "체포되다",
        "english": "get arrested",
        "pronunciation": "[ɡɛt əˈrɛstɪd]",
        "hangul_pronunciation": "[겟 어레스티드]",
        "sample_sentence": "He got arrested for theft.",
        "korean_sentence": "그는 절도로 체포되었어요."
    },
    {
        "korean": "가져오다",
        "english": "get back",
        "pronunciation": "[ɡɛt bæk]",
        "hangul_pronunciation": "[겟 백]",
        "sample_sentence": "I need to get back my book from him.",
        "korean_sentence": "그에게서 내 책을 되찾아야 해요."
    },
    {
        "korean": "성공하다",
        "english": "get ahead",
        "pronunciation": "[ɡɛt əˈhɛd]",
        "hangul_pronunciation": "[겟 어헤드]",
        "sample_sentence": "She worked hard to get ahead in her career.",
        "korean_sentence": "그녀는 경력에서 성공하기 위해 열심히 일했어요."
    },
    {
        "korean": "연락하다",
        "english": "get in touch",
        "pronunciation": "[ɡɛt ɪn tʌtʃ]",
        "hangul_pronunciation": "[겟 인 터치]",
        "sample_sentence": "I'll get in touch with you next week.",
        "korean_sentence": "다음 주에 연락드릴게요."
    },
    {
        "korean": "진행하다",
        "english": "get going",
        "pronunciation": "[ɡɛt ˈɡoʊɪŋ]",
        "hangul_pronunciation": "[겟 고잉]",
        "sample_sentence": "Let's get going before it gets too late.",
        "korean_sentence": "너무 늦기 전에 출발합시다."
    },
    {
        "korean": "사라지다",
        "english": "get rid of",
        "pronunciation": "[ɡɛt rɪd ʌv]",
        "hangul_pronunciation": "[겟 리드 오브]",
        "sample_sentence": "I need to get rid of these old clothes.",
        "korean_sentence": "이 낡은 옷들을 없애야 해요."
    },
    {
        "korean": "진정하다",
        "english": "get calm",
        "pronunciation": "[ɡɛt kɑːm]",
        "hangul_pronunciation": "[겟 캄]",
        "sample_sentence": "Take a deep breath and get calm.",
        "korean_sentence": "심호흡을 하고 진정하세요."
    },
    {
        "korean": "복수하다",
        "english": "get back at",
        "pronunciation": "[ɡɛt bæk æt]",
        "hangul_pronunciation": "[겟 백 앳]",
        "sample_sentence": "She wanted to get back at him for the insult.",
        "korean_sentence": "그녀는 모욕에 대해 그에게 복수하고 싶었어요."
    },
    {
        "korean": "작동하다",
        "english": "get working",
        "pronunciation": "[ɡɛt ˈwɜːrkɪŋ]",
        "hangul_pronunciation": "[겟 워킹]",
        "sample_sentence": "We need to get this machine working again.",
        "korean_sentence": "우리는 이 기계를 다시 작동시켜야 해요."
    },
    {
        "korean": "타고 가다",
        "english": "get a ride",
        "pronunciation": "[ɡɛt ə raɪd]",
        "hangul_pronunciation": "[겟 어 라이드]",
        "sample_sentence": "Can I get a ride with you?",
        "korean_sentence": "같이 차 타고 가도 될까요?"
    },
    {
        "korean": "탈출하다",
        "english": "get away with",
        "pronunciation": "[ɡɛt əˈweɪ wɪð]",
        "hangul_pronunciation": "[겟 어웨이 윗]",
        "sample_sentence": "He can't get away with cheating.",
        "korean_sentence": "그는 부정행위를 하고도 무사할 수 없어요."
    },
    {
        "korean": "붙잡다",
        "english": "get hold of",
        "pronunciation": "[ɡɛt hoʊld ʌv]",
        "hangul_pronunciation": "[겟 홀드 오브]",
        "sample_sentence": "I need to get hold of a good book.",
        "korean_sentence": "좋은 책을 하나 구해야 해요."
    },
    {
        "korean": "도망치다",
        "english": "get away",
        "pronunciation": "[ɡɛt əˈweɪ]",
        "hangul_pronunciation": "[겟 어웨이]",
        "sample_sentence": "The thief managed to get away.",
        "korean_sentence": "도둑이 도망쳤어요."
    },
    {
        "korean": "돌아가다",
        "english": "get back",
        "pronunciation": "[ɡɛt bæk]",
        "hangul_pronunciation": "[겟 백]",
        "sample_sentence": "What time did you get back home?",
        "korean_sentence": "집에 몇 시에 돌아왔어요?"
    },
    {
        "korean": "일어나다",
        "english": "get up",
        "pronunciation": "[ɡɛt ʌp]",
        "hangul_pronunciation": "[겟 업]",
        "sample_sentence": "I get up early every morning.",
        "korean_sentence": "나는 매일 아침 일찍 일어나요."
    },
    {
        "korean": "넘어가다",
        "english": "get over",
        "pronunciation": "[ɡɛt ˈoʊvər]",
        "hangul_pronunciation": "[겟 오버]",
        "sample_sentence": "It took me a long time to get over the flu.",
        "korean_sentence": "독감을 이겨내는 데 오래 걸렸어요."
    },
    {
        "korean": "친해지다",
        "english": "get along",
        "pronunciation": "[ɡɛt əˈlɔːŋ]",
        "hangul_pronunciation": "[겟 얼롱]",
        "sample_sentence": "Do you get along with your coworkers?",
        "korean_sentence": "동료들과 잘 지내세요?"
    },
    {
        "korean": "이어지다",
        "english": "get through",
        "pronunciation": "[ɡɛt θruː]",
        "hangul_pronunciation": "[겟 쓰루]",
        "sample_sentence": "I couldn't get through to him.",
        "korean_sentence": "그에게 연락이 닿지 않았어요."
    },
    {
        "korean": "시작하다",
        "english": "get started",
        "pronunciation": "[ɡɛt ˈstɑːrtɪd]",
        "hangul_pronunciation": "[겟 스타티드]",
        "sample_sentence": "Let's get started on the project.",
        "korean_sentence": "프로젝트를 시작합시다."
    },
    {
        "korean": "돌아오다",
        "english": "get back",
        "pronunciation": "[ɡɛt bæk]",
        "hangul_pronunciation": "[겟 백]",
        "sample_sentence": "When did you get back from your trip?",
        "korean_sentence": "여행에서 언제 돌아왔어요?"
    },
    {
        "korean": "끝내다",
        "english": "get done",
        "pronunciation": "[ɡɛt dʌn]",
        "hangul_pronunciation": "[겟 던]",
        "sample_sentence": "I need to get my work done before the deadline.",
        "korean_sentence": "마감 전에 일을 끝내야 해요."
    },
    {
        "korean": "빠져나가다",
        "english": "get out",
        "pronunciation": "[ɡɛt aʊt]",
        "hangul_pronunciation": "[겟 아웃]",
        "sample_sentence": "We need to get out of here.",
        "korean_sentence": "여기서 빠져나가야 해요."
    },
    {
        "korean": "일을 시작하다",
        "english": "get to work",
        "pronunciation": "[ɡɛt tə wɜːrk]",
        "hangul_pronunciation": "[겟 투 워크]",
        "sample_sentence": "Let's get to work on this new project.",
        "korean_sentence": "이 새로운 프로젝트를 시작합시다."
    },
    {
        "korean": "전화를 받다",
        "english": "get a call",
        "pronunciation": "[ɡɛt ə kɔːl]",
        "hangul_pronunciation": "[겟 어 콜]",
        "sample_sentence": "Did you get a call from the office?",
        "korean_sentence": "사무실에서 전화 받았어요?"
    },
    {
        "korean": "병에 걸리다",
        "english": "get sick",
        "pronunciation": "[ɡɛt sɪk]",
        "hangul_pronunciation": "[겟 씩]",
        "sample_sentence": "I tend to get sick in the winter.",
        "korean_sentence": "나는 겨울에 자주 아파요."
    },
    {
        "korean": "피곤해지다",
        "english": "get tired",
        "pronunciation": "[ɡɛt ˈtaɪərd]",
        "hangul_pronunciation": "[겟 타이어드]",
        "sample_sentence": "You will get tired if you don't rest.",
        "korean_sentence": "쉬지 않으면 피곤해질 거예요."
    },
    {
        "korean": "흥분하다",
        "english": "get excited",
        "pronunciation": "[ɡɛt ɪkˈsaɪtɪd]",
        "hangul_pronunciation": "[겟 익사이티드]",
        "sample_sentence": "I get excited before every game.",
        "korean_sentence": "경기 전마다 흥분돼요."
    },
    {
        "korean": "지루해지다",
        "english": "get bored",
        "pronunciation": "[ɡɛt bɔːrd]",
        "hangul_pronunciation": "[겟 보어드]",
        "sample_sentence": "I get bored when I have nothing to do.",
        "korean_sentence": "할 일이 없으면 지루해져요."
    },
    {
        "korean": "화가 나다",
        "english": "get angry",
        "pronunciation": "[ɡɛt ˈæŋɡri]",
        "hangul_pronunciation": "[겟 앵그리]",
        "sample_sentence": "He tends to get angry over small things.",
        "korean_sentence": "그는 작은 일에도 화를 내는 경향이 있어요."
    },
    {
        "korean": "화해하다",
        "english": "get over",
        "pronunciation": "[ɡɛt ˈoʊvər]",
        "hangul_pronunciation": "[겟 오버]",
        "sample_sentence": "We need to get over our differences.",
        "korean_sentence": "우리는 우리의 차이를 극복해야 해요."
    },
    {
        "korean": "다치다",
        "english": "get hurt",
        "pronunciation": "[ɡɛt hɜːrt]",
        "hangul_pronunciation": "[겟 헛]",
        "sample_sentence": "Be careful not to get hurt.",
        "korean_sentence": "다치지 않게 조심하세요."
    },
    {
        "korean": "이혼하다",
        "english": "get divorced",
        "pronunciation": "[ɡɛt dɪˈvɔːrst]",
        "hangul_pronunciation": "[겟 디보스트]",
        "sample_sentence": "They decided to get divorced after 10 years of marriage.",
        "korean_sentence": "그들은 10년의 결혼 생활 끝에 이혼하기로 결정했어요."
    },
    {
        "korean": "집중하다",
        "english": "get focused",
        "pronunciation": "[ɡɛt ˈfoʊkəst]",
        "hangul_pronunciation": "[겟 포커스트]",
        "sample_sentence": "You need to get focused on your studies.",
        "korean_sentence": "공부에 집중해야 해요."
    },
    {
        "korean": "걱정하다",
        "english": "get worried",
        "pronunciation": "[ɡɛt ˈwɜrid]",
        "hangul_pronunciation": "[겟 워리드]",
        "sample_sentence": "Don't get worried about the test.",
        "korean_sentence": "시험에 대해 걱정하지 마세요."
    },
    {
        "korean": "혼나다",
        "english": "get scolded",
        "pronunciation": "[ɡɛt ˈskoʊldɪd]",
        "hangul_pronunciation": "[겟 스콜디드]",
        "sample_sentence": "I got scolded for being late.",
        "korean_sentence": "늦어서 혼났어요."
    },
    {
        "korean": "사인 받다",
        "english": "get an autograph",
        "pronunciation": "[ɡɛt æn ˈɔːtəˌɡræf]",
        "hangul_pronunciation": "[겟 앤 오터그래프]",
        "sample_sentence": "I got an autograph from my favorite singer.",
        "korean_sentence": "내가 좋아하는 가수에게 사인을 받았어요."
    },
    {
        "korean": "긴장하다",
        "english": "get nervous",
        "pronunciation": "[ɡɛt ˈnɜːrvəs]",
        "hangul_pronunciation": "[겟 너버스]",
        "sample_sentence": "I always get nervous before a presentation.",
        "korean_sentence": "발표 전에 항상 긴장돼요."
    },
    {
        "korean": "자리 잡다",
        "english": "get settled",
        "pronunciation": "[ɡɛt ˈsɛtəld]",
        "hangul_pronunciation": "[겟 세틀드]",
        "sample_sentence": "It took a while to get settled in the new city.",
        "korean_sentence": "새 도시에서 자리 잡는 데 시간이 걸렸어요."
    },
    {
        "korean": "회복하다",
        "english": "get better",
        "pronunciation": "[ɡɛt ˈbɛtər]",
        "hangul_pronunciation": "[겟 베터]",
        "sample_sentence": "I hope you get better soon.",
        "korean_sentence": "빨리 회복되길 바래요."
    },
    {
        "korean": "연결하다",
        "english": "get connected",
        "pronunciation": "[ɡɛt kəˈnɛktɪd]",
        "hangul_pronunciation": "[겟 커넥티드]",
        "sample_sentence": "I need to get connected to the internet.",
        "korean_sentence": "인터넷에 연결해야 해요."
    },
    {
        "korean": "지불하다",
        "english": "get paid",
        "pronunciation": "[ɡɛt peɪd]",
        "hangul_pronunciation": "[겟 페이드]",
        "sample_sentence": "I will get paid next week.",
        "korean_sentence": "다음 주에 월급을 받을 거예요."
    },
    {
        "korean": "진학하다",
        "english": "get into",
        "pronunciation": "[ɡɛt ˈɪntuː]",
        "hangul_pronunciation": "[겟 인투]",
        "sample_sentence": "She got into a prestigious university.",
        "korean_sentence": "그녀는 명문 대학에 진학했어요."
    },
    {
        "korean": "기다리다",
        "english": "get in line",
        "pronunciation": "[ɡɛt ɪn laɪn]",
        "hangul_pronunciation": "[겟 인 라인]",
        "sample_sentence": "You need to get in line to buy tickets.",
        "korean_sentence": "표를 사려면 줄을 서야 해요."
    },
    {
        "korean": "잃다",
        "english": "get lost",
        "pronunciation": "[ɡɛt lɔst]",
        "hangul_pronunciation": "[겟 로스트]",
        "sample_sentence": "We always get lost in this city.",
        "korean_sentence": "우리는 이 도시에서 항상 길을 잃어요."
    },
    {
        "korean": "처벌받다",
        "english": "get punished",
        "pronunciation": "[ɡɛt ˈpʌnɪʃt]",
        "hangul_pronunciation": "[겟 퍼니쉬드]",
        "sample_sentence": "He got punished for breaking the rules.",
        "korean_sentence": "그는 규칙을 어겨서 처벌받았어요."
    },
    {
        "korean": "끝내다",
        "english": "get finished",
        "pronunciation": "[ɡɛt ˈfɪnɪʃt]",
        "hangul_pronunciation": "[겟 피니쉬드]",
        "sample_sentence": "We need to get finished before noon.",
        "korean_sentence": "정오 전에 끝내야 해요."
    },
    {
        "korean": "방학하다",
        "english": "get a break",
        "pronunciation": "[ɡɛt ə breɪk]",
        "hangul_pronunciation": "[겟 어 브레이크]",
        "sample_sentence": "I can't wait to get a break from school.",
        "korean_sentence": "학교에서 방학하는 것이 기다려져요."
    },
    {
        "korean": "정착하다",
        "english": "get settled",
        "pronunciation": "[ɡɛt ˈsɛtəld]",
        "hangul_pronunciation": "[겟 세틀드]",
        "sample_sentence": "They need some time to get settled in their new home.",
        "korean_sentence": "그들은 새 집에 정착하는 데 시간이 필요해요."
    },
    {
        "korean": "약속을 잡다",
        "english": "get an appointment",
        "pronunciation": "[ɡɛt ən əˈpɔɪntmənt]",
        "hangul_pronunciation": "[겟 언 어포인트먼트]",
        "sample_sentence": "I need to get an appointment with the dentist.",
        "korean_sentence": "치과 의사와 약속을 잡아야 해요."
    },
    {
        "korean": "진급하다",
        "english": "get promoted",
        "pronunciation": "[ɡɛt prəˈmoʊtɪd]",
        "hangul_pronunciation": "[겟 프로모티드]",
        "sample_sentence": "She worked hard and got promoted.",
        "korean_sentence": "그녀는 열심히 일해서 진급했어요."
    },
    {
        "korean": "어려움을 겪다",
        "english": "get into trouble",
        "pronunciation": "[ɡɛt ˈɪntuː ˈtrʌbəl]",
        "hangul_pronunciation": "[겟 인투 트러블]",
        "sample_sentence": "He got into trouble for missing the deadline.",
        "korean_sentence": "그는 마감일을 놓쳐서 어려움을 겪었어요."
    },
    {
        "korean": "도와주다",
        "english": "get help",
        "pronunciation": "[ɡɛt hɛlp]",
        "hangul_pronunciation": "[겟 헬프]",
        "sample_sentence": "We need to get help from an expert.",
        "korean_sentence": "전문가의 도움을 받아야 해요."
    },
    {
        "korean": "흥분하다",
        "english": "get excited",
        "pronunciation": "[ɡɛt ɪkˈsaɪtɪd]",
        "hangul_pronunciation": "[겟 익사이티드]",
        "sample_sentence": "I always get excited before a trip.",
        "korean_sentence": "여행 전에 항상 흥분돼요."
    },
    {
        "korean": "지치다",
        "english": "get tired",
        "pronunciation": "[ɡɛt ˈtaɪərd]",
        "hangul_pronunciation": "[겟 타이어드]",
        "sample_sentence": "I get tired after a long day of work.",
        "korean_sentence": "긴 하루 일한 후에 지쳐요."
    },
    {
        "korean": "알아내다",
        "english": "get to know",
        "pronunciation": "[ɡɛt tə noʊ]",
        "hangul_pronunciation": "[겟 투 노우]",
        "sample_sentence": "I want to get to know my new neighbors.",
        "korean_sentence": "새로운 이웃을 알아가고 싶어요."
    },
    {
        "korean": "기다리다",
        "english": "get in line",
        "pronunciation": "[ɡɛt ɪn laɪn]",
        "hangul_pronunciation": "[겟 인 라인]",
        "sample_sentence": "You need to get in line to buy tickets.",
        "korean_sentence": "표를 사려면 줄을 서야 해요."
    },
    {
        "korean": "잔뜩 화가 나다",
        "english": "get furious",
        "pronunciation": "[ɡɛt ˈfjʊəriəs]",
        "hangul_pronunciation": "[겟 퓨리어스]",
        "sample_sentence": "She got furious when she found out the truth.",
        "korean_sentence": "그녀는 진실을 알게 되었을 때 잔뜩 화가 났어요."
    },
    {
        "korean": "고르다",
        "english": "get chosen",
        "pronunciation": "[ɡɛt ˈtʃoʊzən]",
        "hangul_pronunciation": "[겟 초즌]",
        "sample_sentence": "He got chosen for the lead role in the play.",
        "korean_sentence": "그는 연극에서 주연으로 선택되었어요."
    },
    {
        "korean": "절약하다",
        "english": "get economical",
        "pronunciation": "[ɡɛt ˌɛkəˈnɑːmɪkəl]",
        "hangul_pronunciation": "[겟 에코노미컬]",
        "sample_sentence": "We need to get economical with our spending.",
        "korean_sentence": "우리는 지출을 절약해야 해요."
    },
    {
        "korean": "익숙해지다",
        "english": "get used to",
        "pronunciation": "[ɡɛt juːst tuː]",
        "hangul_pronunciation": "[겟 유스트 투]",
        "sample_sentence": "You will get used to the new environment soon.",
        "korean_sentence": "곧 새로운 환경에 익숙해질 거예요."
    },
    {
        "korean": "사라지다",
        "english": "get rid of",
        "pronunciation": "[ɡɛt rɪd ʌv]",
        "hangul_pronunciation": "[겟 리드 오브]",
        "sample_sentence": "I need to get rid of these old clothes.",
        "korean_sentence": "이 낡은 옷들을 없애야 해요."
    },
    {
        "korean": "출발하다",
        "english": "get going",
        "pronunciation": "[ɡɛt ˈɡoʊɪŋ]",
        "hangul_pronunciation": "[겟 고잉]",
        "sample_sentence": "We should get going if we want to be on time.",
        "korean_sentence": "시간 맞추려면 출발해야 해요."
    },
    {
        "korean": "잡다",
        "english": "get hold of",
        "pronunciation": "[ɡɛt hoʊld ʌv]",
        "hangul_pronunciation": "[겟 홀드 오브]",
        "sample_sentence": "Can you get hold of a copy of the report?",
        "korean_sentence": "보고서 사본을 구할 수 있어요?"
    },
    {
        "korean": "극복하다",
        "english": "get over",
        "pronunciation": "[ɡɛt ˈoʊvər]",
        "hangul_pronunciation": "[겟 오버]",
        "sample_sentence": "It took him a long time to get over the breakup.",
        "korean_sentence": "그는 이별을 극복하는 데 오래 걸렸어요."
    },
    {
        "korean": "화가 나다",
        "english": "get mad",
        "pronunciation": "[ɡɛt mæd]",
        "hangul_pronunciation": "[겟 매드]",
        "sample_sentence": "She gets mad when people lie to her.",
        "korean_sentence": "그녀는 사람들이 거짓말할 때 화를 내요."
    },
    {
        "korean": "진정하다",
        "english": "get calm",
        "pronunciation": "[ɡɛt kɑːm]",
        "hangul_pronunciation": "[겟 캄]",
        "sample_sentence": "You need to get calm before the presentation.",
        "korean_sentence": "발표 전에 진정해야 해요."
    },
    {
        "korean": "즐기다",
        "english": "get pleasure",
        "pronunciation": "[ɡɛt ˈplɛʒər]",
        "hangul_pronunciation": "[겟 플레저]",
        "sample_sentence": "He gets great pleasure from reading.",
        "korean_sentence": "그는 독서에서 큰 즐거움을 얻어요."
    },
    {
        "korean": "깜짝 놀라다",
        "english": "get surprised",
        "pronunciation": "[ɡɛt səˈpraɪzd]",
        "hangul_pronunciation": "[겟 서프라이즈드]",
        "sample_sentence": "I got surprised by the sudden news.",
        "korean_sentence": "갑작스러운 소식에 깜짝 놀랐어요."
    },
    {
        "korean": "기뻐하다",
        "english": "get happy",
        "pronunciation": "[ɡɛt ˈhæpi]",
        "hangul_pronunciation": "[겟 해피]",
        "sample_sentence": "I get happy when I see my friends.",
        "korean_sentence": "친구들을 보면 기뻐요."
    },
    {
        "korean": "편안해지다",
        "english": "get comfortable",
        "pronunciation": "[ɡɛt ˈkʌmfərtəbl]",
        "hangul_pronunciation": "[겟 컴포터블]",
        "sample_sentence": "Please get comfortable before we start.",
        "korean_sentence": "시작하기 전에 편안하게 앉으세요."
    },
    {
        "korean": "무서워하다",
        "english": "get scared",
        "pronunciation": "[ɡɛt skɛrd]",
        "hangul_pronunciation": "[겟 스케어드]",
        "sample_sentence": "I always get scared during horror movies.",
        "korean_sentence": "나는 공포 영화를 볼 때 항상 무서워요."
    },
    {
        "korean": "성공하다",
        "english": "get successful",
        "pronunciation": "[ɡɛt səkˈsɛsfəl]",
        "hangul_pronunciation": "[겟 석세스풀]",
        "sample_sentence": "She worked hard to get successful.",
        "korean_sentence": "그녀는 성공하기 위해 열심히 일했어요."
    },
    {
        "korean": "지루해지다",
        "english": "get bored",
        "pronunciation": "[ɡɛt bɔrd]",
        "hangul_pronunciation": "[겟 보어드]",
        "sample_sentence": "He gets bored easily during lectures.",
        "korean_sentence": "그는 강의 시간에 쉽게 지루해져요."
    },
    {
        "korean": "혼란스러워하다",
        "english": "get confused",
        "pronunciation": "[ɡɛt kənˈfjuzd]",
        "hangul_pronunciation": "[겟 컨퓨즈드]",
        "sample_sentence": "I often get confused with new concepts.",
        "korean_sentence": "나는 새로운 개념에 종종 혼란스러워요."
    },
    {
        "korean": "지루해지다",
        "english": "get bored",
        "pronunciation": "[ɡɛt bɔrd]",
        "hangul_pronunciation": "[겟 보어드]",
        "sample_sentence": "I get bored when I have nothing to do.",
        "korean_sentence": "할 일이 없으면 지루해져요."
    },
    {
        "korean": "속상하다",
        "english": "get upset",
        "pronunciation": "[ɡɛt əpˈsɛt]",
        "hangul_pronunciation": "[겟 업셋]",
        "sample_sentence": "She got upset when she heard the news.",
        "korean_sentence": "그녀는 그 소식을 듣고 속상했어요."
    },
    {
        "korean": "혼나다",
        "english": "get scolded",
        "pronunciation": "[ɡɛt ˈskoʊldɪd]",
        "hangul_pronunciation": "[겟 스콜디드]",
        "sample_sentence": "I got scolded for being late.",
        "korean_sentence": "늦어서 혼났어요."
    },
    {
        "korean": "긴장하다",
        "english": "get nervous",
        "pronunciation": "[ɡɛt ˈnɜrvəs]",
        "hangul_pronunciation": "[겟 너버스]",
        "sample_sentence": "I always get nervous before a presentation.",
        "korean_sentence": "발표 전에 항상 긴장돼요."
    },
    {
        "korean": "기뻐하다",
        "english": "get glad",
        "pronunciation": "[ɡɛt ɡlæd]",
        "hangul_pronunciation": "[겟 글래드]",
        "sample_sentence": "I get glad when I see my family.",
        "korean_sentence": "가족을 보면 기뻐요."
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