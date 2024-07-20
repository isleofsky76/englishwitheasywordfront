let currentWordIndex = 0;
let pronounceInterval;
let synth = window.speechSynthesis;
let autoPlayInterval;

const words = [
    {
        "korean": "가져가다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "hangul_pronunciation": "[테이크]",
        "sample_sentence": "Please take this book to the library.",
        "korean_sentence": "이 책을 도서관에 가져다 주세요."
    },
    
    {
        "korean": "시간이 걸리다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "hangul_pronunciation": "[테이크]",
        "sample_sentence": "It takes about 30 minutes to get there.",
        "korean_sentence": "거기까지 가는 데 30분 정도 걸려요."
    },
    {
        "korean": "수업을 듣다",
        "english": "take a class",
        "pronunciation": "[teɪk ə klæs]",
        "hangul_pronunciation": "[테이크 어 클래스]",
        "sample_sentence": "I'm going to take a math class this semester.",
        "korean_sentence": "이번 학기에 수학 수업을 들을 거예요."
    },
    {
        "korean": "사진을 찍다",
        "english": "take a photo",
        "pronunciation": "[teɪk ə ˈfoʊtoʊ]",
        "hangul_pronunciation": "[테이크 어 포토]",
        "sample_sentence": "Can you take a photo of us?",
        "korean_sentence": "우리 사진 좀 찍어줄래요?"
    },
    {
        "korean": "기회를 잡다",
        "english": "take a chance",
        "pronunciation": "[teɪk ə tʃæns]",
        "hangul_pronunciation": "[테이크 어 찬스]",
        "sample_sentence": "You should take a chance and apply for the job.",
        "korean_sentence": "기회를 잡고 그 일자리에 지원해 보세요."
    },
    {
        "korean": "책임지다",
        "english": "take responsibility",
        "pronunciation": "[teɪk rɪˌspɒnsəˈbɪləti]",
        "hangul_pronunciation": "[테이크 리스판서빌러티]",
        "sample_sentence": "You need to take responsibility for your actions.",
        "korean_sentence": "당신의 행동에 대해 책임을 져야 합니다."
    },
    {
        "korean": "검사를 받다",
        "english": "take a test",
        "pronunciation": "[teɪk ə tɛst]",
        "hangul_pronunciation": "[테이크 어 테스트]",
        "sample_sentence": "I have to take a test tomorrow.",
        "korean_sentence": "내일 시험을 봐야 해요."
    },
    {
        "korean": "의미하다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "hangul_pronunciation": "[테이크]",
        "sample_sentence": "What do you take me for?",
        "korean_sentence": "당신은 나를 무엇으로 생각하는 거죠?"
    },
    {
        "korean": "차를 타다",
        "english": "take a car",
        "pronunciation": "[teɪk ə kɑr]",
        "hangul_pronunciation": "[테이크 어 카]",
        "sample_sentence": "We decided to take a car to the event.",
        "korean_sentence": "우리는 행사에 차를 타고 가기로 했어요."
    },
    {
        "korean": "받다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "hangul_pronunciation": "[테이크]",
        "sample_sentence": "Take this gift as a token of appreciation.",
        "korean_sentence": "감사의 표시로 이 선물을 받아 주세요."
    },
    {
        "korean": "데리고 가다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "hangul_pronunciation": "[테이크]",
        "sample_sentence": "I'll take you to the bus stop.",
        "korean_sentence": "버스 정류장까지 데려다 줄게요."
    },
    {
        "korean": "취하다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "hangul_pronunciation": "[테이크]",
        "sample_sentence": "You should take a break.",
        "korean_sentence": "쉬는 시간을 가져야 해요."
    },
    {
        "korean": "운전하다",
        "english": "take the wheel",
        "pronunciation": "[teɪk ðə wil]",
        "hangul_pronunciation": "[테이크 더 윌]",
        "sample_sentence": "Can you take the wheel for a while?",
        "korean_sentence": "잠시 운전해 줄 수 있나요?"
    },
    {
        "korean": "자리를 차지하다",
        "english": "take a seat",
        "pronunciation": "[teɪk ə sit]",
        "hangul_pronunciation": "[테이크 어 싯]",
        "sample_sentence": "Please take a seat and wait for your turn.",
        "korean_sentence": "자리에 앉아 순서를 기다려 주세요."
    },
    {
        "korean": "병이 나다",
        "english": "take ill",
        "pronunciation": "[teɪk ɪl]",
        "hangul_pronunciation": "[테이크 일]",
        "sample_sentence": "She suddenly took ill and had to go home.",
        "korean_sentence": "그녀는 갑자기 병이 나서 집에 가야 했어요."
    },
    {
        "korean": "이해하다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "hangul_pronunciation": "[테이크]",
        "sample_sentence": "I take your point, but I still disagree.",
        "korean_sentence": "당신의 요점을 이해하지만 여전히 동의하지 않아요."
    },
    {
        "korean": "결정을 내리다",
        "english": "take a decision",
        "pronunciation": "[teɪk ə dɪˈsɪʒən]",
        "hangul_pronunciation": "[테이크 어 디시젼]",
        "sample_sentence": "It's time to take a decision about your future.",
        "korean_sentence": "당신의 미래에 대해 결정을 내릴 시간이에요."
    },
    {
        "korean": "어려움을 겪다",
        "english": "take a hit",
        "pronunciation": "[teɪk ə hɪt]",
        "hangul_pronunciation": "[테이크 어 히트]",
        "sample_sentence": "The company took a hit during the recession.",
        "korean_sentence": "회사는 불황 동안 큰 타격을 입었어요."
    },
    {
        "korean": "대신하다",
        "english": "take over",
        "pronunciation": "[teɪk ˈoʊvər]",
        "hangul_pronunciation": "[테이크 오버]",
        "sample_sentence": "Can you take over the project for me?",
        "korean_sentence": "나 대신 프로젝트를 맡아 줄 수 있나요?"
    },
    {
        "korean": "도움을 받다",
        "english": "take assistance",
        "pronunciation": "[teɪk əˈsɪstəns]",
        "hangul_pronunciation": "[테이크 어시스턴스]",
        "sample_sentence": "Don't hesitate to take assistance when needed.",
        "korean_sentence": "필요할 때 도움 받는 것을 주저하지 마세요."
    },
    {
        "korean": "휴가를 가지다",
        "english": "take a vacation",
        "pronunciation": "[teɪk ə veɪˈkeɪʃən]",
        "hangul_pronunciation": "[테이크 어 베케이션]",
        "sample_sentence": "I plan to take a vacation next month.",
        "korean_sentence": "다음 달에 휴가를 갈 계획이에요."
    },
    {
        "korean": "의견을 받아들이다",
        "english": "take advice",
        "pronunciation": "[teɪk ədˈvaɪs]",
        "hangul_pronunciation": "[테이크 어드바이스]",
        "sample_sentence": "You should take advice from your mentor.",
        "korean_sentence": "멘토의 조언을 받아들여야 해요."
    },
    {
        "korean": "기록하다",
        "english": "take notes",
        "pronunciation": "[teɪk noʊts]",
        "hangul_pronunciation": "[테이크 노츠]",
        "sample_sentence": "Make sure to take notes during the lecture.",
        "korean_sentence": "강의 중에 반드시 메모하세요."
    },
    {
        "korean": "기회를 잡다",
        "english": "take an opportunity",
        "pronunciation": "[teɪk ən ˌɑpərˈtunɪti]",
        "hangul_pronunciation": "[테이크 언 오퍼튜니티]",
        "sample_sentence": "He decided to take the opportunity and start his own business.",
        "korean_sentence": "그는 기회를 잡아 자신의 사업을 시작하기로 했어요."
    },
    {
        "korean": "약을 복용하다",
        "english": "take medicine",
        "pronunciation": "[teɪk ˈmɛdɪsɪn]",
        "hangul_pronunciation": "[테이크 메디슨]",
        "sample_sentence": "Don't forget to take your medicine.",
        "korean_sentence": "약 복용하는 것을 잊지 마세요."
    },
    {
        "korean": "책임을 지다",
        "english": "take charge",
        "pronunciation": "[teɪk ʧɑrʤ]",
        "hangul_pronunciation": "[테이크 차지]",
        "sample_sentence": "She decided to take charge of the project.",
        "korean_sentence": "그녀는 프로젝트를 책임지기로 했어요."
    },
    {
        "korean": "확인하다",
        "english": "take a look",
        "pronunciation": "[teɪk ə lʊk]",
        "hangul_pronunciation": "[테이크 어 룩]",
        "sample_sentence": "Can you take a look at this report?",
        "korean_sentence": "이 보고서 좀 확인해 줄 수 있나요?"
    },
    {
        "korean": "수업을 듣다",
        "english": "take a lesson",
        "pronunciation": "[teɪk ə ˈlɛsən]",
        "hangul_pronunciation": "[테이크 어 레슨]",
        "sample_sentence": "I want to take a cooking lesson.",
        "korean_sentence": "요리 수업을 듣고 싶어요."
    },
    {
        "korean": "산책하다",
        "english": "take a walk",
        "pronunciation": "[teɪk ə wɔk]",
        "hangul_pronunciation": "[테이크 어 워크]",
        "sample_sentence": "Let's take a walk in the park.",
        "korean_sentence": "공원에서 산책합시다."
    },
    {
        "korean": "결혼하다",
        "english": "take a wife",
        "pronunciation": "[teɪk ə waɪf]",
        "hangul_pronunciation": "[테이크 어 와이프]",
        "sample_sentence": "He decided to take a wife and settle down.",
        "korean_sentence": "그는 결혼하고 정착하기로 했어요."
    },
    {
        "korean": "직업을 가지다",
        "english": "take a job",
        "pronunciation": "[teɪk ə ʤɑb]",
        "hangul_pronunciation": "[테이크 어 잡]",
        "sample_sentence": "She had to take a job to support her family.",
        "korean_sentence": "그녀는 가족을 부양하기 위해 직업을 가져야 했어요."
    },
    {
        "korean": "선두에 서다",
        "english": "take the lead",
        "pronunciation": "[teɪk ðə lid]",
        "hangul_pronunciation": "[테이크 더 리드]",
        "sample_sentence": "He decided to take the lead on the project.",
        "korean_sentence": "그는 프로젝트에서 선두에 서기로 했어요."
    },
    {
        "korean": "기억하다",
        "english": "take note",
        "pronunciation": "[teɪk noʊt]",
        "hangul_pronunciation": "[테이크 노트]",
        "sample_sentence": "Take note of the instructions given.",
        "korean_sentence": "주어진 지시사항을 기억하세요."
    },
    {
        "korean": "도전하다",
        "english": "take a challenge",
        "pronunciation": "[teɪk ə ˈʧælənʤ]",
        "hangul_pronunciation": "[테이크 어 챌린지]",
        "sample_sentence": "Are you ready to take a challenge?",
        "korean_sentence": "도전할 준비가 되었나요?"
    },
    {
        "korean": "목욕하다",
        "english": "take a bath",
        "pronunciation": "[teɪk ə bæθ]",
        "hangul_pronunciation": "[테이크 어 배스]",
        "sample_sentence": "I like to take a bath to relax.",
        "korean_sentence": "나는 휴식을 취하기 위해 목욕하는 것을 좋아해요."
    },
    {
        "korean": "시간을 내다",
        "english": "take time",
        "pronunciation": "[teɪk taɪm]",
        "hangul_pronunciation": "[테이크 타임]",
        "sample_sentence": "You should take time to read this book.",
        "korean_sentence": "이 책을 읽을 시간을 내야 해요."
    },
    {
        "korean": "차를 타다",
        "english": "take a taxi",
        "pronunciation": "[teɪk ə ˈtæksi]",
        "hangul_pronunciation": "[테이크 어 택시]",
        "sample_sentence": "Let's take a taxi to the station.",
        "korean_sentence": "역까지 택시를 탑시다."
    },
    {
        "korean": "선택하다",
        "english": "take a pick",
        "pronunciation": "[teɪk ə pɪk]",
        "hangul_pronunciation": "[테이크 어 픽]",
        "sample_sentence": "Take your pick from these options.",
        "korean_sentence": "이 옵션들 중에서 선택하세요."
    },
    {
        "korean": "자리를 차지하다",
        "english": "take up space",
        "pronunciation": "[teɪk ʌp speɪs]",
        "hangul_pronunciation": "[테이크 업 스페이스]",
        "sample_sentence": "These boxes take up too much space.",
        "korean_sentence": "이 상자들은 너무 많은 공간을 차지해요."
    },
    {
        "korean": "문제를 해결하다",
        "english": "take care of",
        "pronunciation": "[teɪk kɛr ʌv]",
        "hangul_pronunciation": "[테이크 케어 오브]",
        "sample_sentence": "Please take care of this problem.",
        "korean_sentence": "이 문제를 해결해 주세요."
    },
    {
        "korean": "호흡하다",
        "english": "take a breath",
        "pronunciation": "[teɪk ə brɛθ]",
        "hangul_pronunciation": "[테이크 어 브레스]",
        "sample_sentence": "Take a deep breath and relax.",
        "korean_sentence": "깊게 숨을 쉬고 긴장을 푸세요."
    },
    {
        "korean": "주의를 기울이다",
        "english": "take heed",
        "pronunciation": "[teɪk hid]",
        "hangul_pronunciation": "[테이크 히드]",
        "sample_sentence": "You should take heed of the warnings.",
        "korean_sentence": "경고에 주의를 기울여야 해요."
    },
    {
        "korean": "동참하다",
        "english": "take part",
        "pronunciation": "[teɪk pɑrt]",
        "hangul_pronunciation": "[테이크 파트]",
        "sample_sentence": "I want to take part in the event.",
        "korean_sentence": "그 행사에 동참하고 싶어요."
    },
    {
        "korean": "기회 잡다",
        "english": "take the opportunity",
        "pronunciation": "[teɪk ði ɒpərˈtunɪti]",
        "hangul_pronunciation": "[테이크 디 오퍼튜니티]",
        "sample_sentence": "Take the opportunity to learn new skills.",
        "korean_sentence": "새로운 기술을 배울 기회를 잡으세요."
    },
    {
        "korean": "변화를 겪다",
        "english": "take a turn",
        "pronunciation": "[teɪk ə tɜrn]",
        "hangul_pronunciation": "[테이크 어 턴]",
        "sample_sentence": "His health took a turn for the worse.",
        "korean_sentence": "그의 건강이 나빠졌어요."
    },
    {
        "korean": "리스크를 감수하다",
        "english": "take a risk",
        "pronunciation": "[teɪk ə rɪsk]",
        "hangul_pronunciation": "[테이크 어 리스크]",
        "sample_sentence": "Sometimes you need to take a risk to succeed.",
        "korean_sentence": "때로는 성공하기 위해 리스크를 감수해야 해요."
    },
    {
        "korean": "맡다",
        "english": "take charge",
        "pronunciation": "[teɪk ʧɑrdʒ]",
        "hangul_pronunciation": "[테이크 차지]",
        "sample_sentence": "Who will take charge of the meeting?",
        "korean_sentence": "회의를 누가 맡을 건가요?"
    },
    {
        "korean": "적용하다",
        "english": "take effect",
        "pronunciation": "[teɪk ɪˈfɛkt]",
        "hangul_pronunciation": "[테이크 이펙트]",
        "sample_sentence": "The new rules will take effect next month.",
        "korean_sentence": "새 규칙은 다음 달에 적용될 것입니다."
    },
    {
        "korean": "유혹에 넘어가다",
        "english": "take the bait",
        "pronunciation": "[teɪk ðə beɪt]",
        "hangul_pronunciation": "[테이크 더 베이트]",
        "sample_sentence": "Don't take the bait; it's a trap.",
        "korean_sentence": "유혹에 넘어가지 마세요; 그건 함정이에요."
    },
    {
        "korean": "메모하다",
        "english": "take down",
        "pronunciation": "[teɪk daʊn]",
        "hangul_pronunciation": "[테이크 다운]",
        "sample_sentence": "Please take down the minutes of the meeting.",
        "korean_sentence": "회의록을 메모해 주세요."
    },
    {
        "korean": "수업을 듣다",
        "english": "take a course",
        "pronunciation": "[teɪk ə kɔrs]",
        "hangul_pronunciation": "[테이크 어 코스]",
        "sample_sentence": "I'm going to take a course on digital marketing.",
        "korean_sentence": "디지털 마케팅 강좌를 들을 거예요."
    },
    {
        "korean": "의미를 받아들이다",
        "english": "take meaning",
        "pronunciation": "[teɪk ˈminɪŋ]",
        "hangul_pronunciation": "[테이크 미닝]",
        "sample_sentence": "He took my words to mean something else.",
        "korean_sentence": "그는 내 말을 다른 의미로 받아들였어요."
    },
    {
        "korean": "복용하다",
        "english": "take a pill",
        "pronunciation": "[teɪk ə pɪl]",
        "hangul_pronunciation": "[테이크 어 필]",
        "sample_sentence": "Don't forget to take your pill.",
        "korean_sentence": "약을 잊지 말고 복용하세요."
    },
    {
        "korean": "쉬다",
        "english": "take a rest",
        "pronunciation": "[teɪk ə rɛst]",
        "hangul_pronunciation": "[테이크 어 레스트]",
        "sample_sentence": "You should take a rest after the long journey.",
        "korean_sentence": "긴 여행 후에는 쉬는 게 좋아요."
    },
    {
        "korean": "결정을 하다",
        "english": "take a stand",
        "pronunciation": "[teɪk ə stænd]",
        "hangul_pronunciation": "[테이크 어 스탠드]",
        "sample_sentence": "It's time to take a stand on this issue.",
        "korean_sentence": "이 문제에 대해 입장을 정할 때입니다."
    },
    {
        "korean": "잘못을 인정하다",
        "english": "take the blame",
        "pronunciation": "[teɪk ðə bleɪm]",
        "hangul_pronunciation": "[테이크 더 블레임]",
        "sample_sentence": "He was willing to take the blame for the mistake.",
        "korean_sentence": "그는 실수에 대해 잘못을 인정할 용의가 있었어요."
    },
    {
        "korean": "가르치다",
        "english": "take under one's wing",
        "pronunciation": "[teɪk ˈʌndər wʌnz wɪŋ]",
        "hangul_pronunciation": "[테이크 언더 원즈 윙]",
        "sample_sentence": "She took the new employee under her wing.",
        "korean_sentence": "그녀는 신입 직원을 가르쳤어요."
    },
    {
        "korean": "약속하다",
        "english": "take an oath",
        "pronunciation": "[teɪk ən oʊθ]",
        "hangul_pronunciation": "[테이크 언 오스]",
        "sample_sentence": "He had to take an oath of secrecy.",
        "korean_sentence": "그는 비밀을 지킬 것을 약속해야 했어요."
    },
    {
        "korean": "조치를 취하다",
        "english": "take action",
        "pronunciation": "[teɪk ˈækʃən]",
        "hangul_pronunciation": "[테이크 액션]",
        "sample_sentence": "It's time to take action against climate change.",
        "korean_sentence": "이제 기후 변화에 대해 조치를 취할 때입니다."
    },
    {
        "korean": "쉬운 길을 선택하다",
        "english": "take the easy way out",
        "pronunciation": "[teɪk ði ˈizi weɪ aʊt]",
        "hangul_pronunciation": "[테이크 디 이지 웨이 아웃]",
        "sample_sentence": "He decided to take the easy way out and quit his job.",
        "korean_sentence": "그는 쉬운 길을 선택해 직장을 그만두기로 했어요."
    },
    {
        "korean": "구출하다",
        "english": "take out",
        "pronunciation": "[teɪk aʊt]",
        "hangul_pronunciation": "[테이크 아웃]",
        "sample_sentence": "The firefighters managed to take out everyone from the building.",
        "korean_sentence": "소방관들이 건물에서 모든 사람을 구출했습니다."
    },
    {
        "korean": "돈을 인출하다",
        "english": "take out money",
        "pronunciation": "[teɪk aʊt ˈmʌni]",
        "hangul_pronunciation": "[테이크 아웃 머니]",
        "sample_sentence": "I need to take out some money from the ATM.",
        "korean_sentence": "ATM에서 돈을 좀 인출해야 해요."
    },
    {
        "korean": "조사하다",
        "english": "take a look at",
        "pronunciation": "[teɪk ə lʊk æt]",
        "hangul_pronunciation": "[테이크 어 룩 앳]",
        "sample_sentence": "Can you take a look at this document?",
        "korean_sentence": "이 문서를 좀 조사해줄 수 있어요?"
    },
    {
        "korean": "도전하다",
        "english": "take on a challenge",
        "pronunciation": "[teɪk ɑn ə ˈʧælɪndʒ]",
        "hangul_pronunciation": "[테이크 온 어 챌린지]",
        "sample_sentence": "She decided to take on a new challenge at work.",
        "korean_sentence": "그녀는 직장에서 새로운 도전을 하기로 결정했습니다."
    },
    {
        "korean": "배우다",
        "english": "take lessons",
        "pronunciation": "[teɪk ˈlɛsənz]",
        "hangul_pronunciation": "[테이크 레슨즈]",
        "sample_sentence": "I am going to take piano lessons.",
        "korean_sentence": "나는 피아노 레슨을 받을 거예요."
    },
    {
        "korean": "조종하다",
        "english": "take control",
        "pronunciation": "[teɪk kənˈtroʊl]",
        "hangul_pronunciation": "[테이크 컨트롤]",
        "sample_sentence": "He will take control of the project starting today.",
        "korean_sentence": "그는 오늘부터 프로젝트를 조종할 것입니다."
    },
    {
        "korean": "주도권을 잡다",
        "english": "take the initiative",
        "pronunciation": "[teɪk ði ɪˈnɪʃɪətɪv]",
        "hangul_pronunciation": "[테이크 디 이니셔티브]",
        "sample_sentence": "It's important to take the initiative in your career.",
        "korean_sentence": "경력에서 주도권을 잡는 것이 중요합니다."
    },
    {
        "korean": "회의하다",
        "english": "take a meeting",
        "pronunciation": "[teɪk ə ˈmitɪŋ]",
        "hangul_pronunciation": "[테이크 어 미팅]",
        "sample_sentence": "I have to take a meeting with the new clients.",
        "korean_sentence": "새로운 고객들과 회의를 해야 합니다."
    },
    {
        "korean": "해결책을 찾다",
        "english": "take measures",
        "pronunciation": "[teɪk ˈmɛʒərz]",
        "hangul_pronunciation": "[테이크 메저즈]",
        "sample_sentence": "We need to take measures to reduce costs.",
        "korean_sentence": "비용을 줄이기 위한 조치를 취해야 합니다."
    },
    {
        "korean": "마음에 두다",
        "english": "take to heart",
        "pronunciation": "[teɪk tə hɑrt]",
        "hangul_pronunciation": "[테이크 투 하트]",
        "sample_sentence": "She took his criticism to heart.",
        "korean_sentence": "그녀는 그의 비판을 마음에 두었습니다."
    },
    {
        "korean": "머리에 담다",
        "english": "take note of",
        "pronunciation": "[teɪk noʊt ʌv]",
        "hangul_pronunciation": "[테이크 노트 오브]",
        "sample_sentence": "Please take note of the changes in the schedule.",
        "korean_sentence": "일정 변경 사항을 기억해 주세요."
    },
    {
        "korean": "잠시 쉬다",
        "english": "take a breather",
        "pronunciation": "[teɪk ə ˈbriðər]",
        "hangul_pronunciation": "[테이크 어 브리더]",
        "sample_sentence": "Let's take a breather before we continue.",
        "korean_sentence": "계속하기 전에 잠시 쉬자."
    },
    {
        "korean": "받아들이다",
        "english": "take it in",
        "pronunciation": "[teɪk ɪt ɪn]",
        "hangul_pronunciation": "[테이크 잇 인]",
        "sample_sentence": "It's a lot of information to take in.",
        "korean_sentence": "받아들여야 할 정보가 많아요."
    },
    {
        "korean": "참여하다",
        "english": "take part in",
        "pronunciation": "[teɪk pɑrt ɪn]",
        "hangul_pronunciation": "[테이크 파트 인]",
        "sample_sentence": "Many people took part in the survey.",
        "korean_sentence": "많은 사람들이 설문 조사에 참여했습니다."
    },
    {
        "korean": "생각하다",
        "english": "take a view",
        "pronunciation": "[teɪk ə vju]",
        "hangul_pronunciation": "[테이크 어 뷰]",
        "sample_sentence": "He takes a positive view of the situation.",
        "korean_sentence": "그는 상황을 긍정적으로 생각합니다."
    },
    {
        "korean": "일을 맡다",
        "english": "take up a job",
        "pronunciation": "[teɪk ʌp ə ʤɑb]",
        "hangul_pronunciation": "[테이크 업 어 잡]",
        "sample_sentence": "She decided to take up a job as a teacher.",
        "korean_sentence": "그녀는 교사로 일하기로 결정했습니다."
    },
    {
        "korean": "체크하다",
        "english": "take a check",
        "pronunciation": "[teɪk ə ʧɛk]",
        "hangul_pronunciation": "[테이크 어 체크]",
        "sample_sentence": "The restaurant does not take checks.",
        "korean_sentence": "그 식당은 수표를 받지 않습니다."
    },
    {
        "korean": "조치를 취하다",
        "english": "take action against",
        "pronunciation": "[teɪk ˈækʃən əˈɡɛnst]",
        "hangul_pronunciation": "[테이크 액션 어게인스트]",
        "sample_sentence": "The company will take action against illegal activities.",
        "korean_sentence": "회사는 불법 행위에 대해 조치를 취할 것입니다."
    },
    {
        "korean": "자리를 차지하다",
        "english": "take up a seat",
        "pronunciation": "[teɪk ʌp ə sit]",
        "hangul_pronunciation": "[테이크 업 어 싯]",
        "sample_sentence": "Please take up a seat and wait for your turn.",
        "korean_sentence": "자리에 앉아 순서를 기다리세요."
    },
    {
        "korean": "기회를 잡다",
        "english": "take a shot",
        "pronunciation": "[teɪk ə ʃɑt]",
        "hangul_pronunciation": "[테이크 어 샷]",
        "sample_sentence": "You should take a shot at the competition.",
        "korean_sentence": "경쟁에 도전해 보세요."
    },
    {
        "korean": "마음에 새기다",
        "english": "take to heart",
        "pronunciation": "[teɪk tə hɑːrt]",
        "hangul_pronunciation": "[테이크 투 하트]",
        "sample_sentence": "You should take her advice to heart.",
        "korean_sentence": "그녀의 조언을 마음에 새겨야 해요."
    },
    {
        "korean": "긴장을 풀다",
        "english": "take it easy",
        "pronunciation": "[teɪk ɪt ˈiːzi]",
        "hangul_pronunciation": "[테이크 잇 이지]",
        "sample_sentence": "Take it easy and enjoy your vacation.",
        "korean_sentence": "긴장을 풀고 휴가를 즐기세요."
    },
    {
        "korean": "조사하다",
        "english": "take a survey",
        "pronunciation": "[teɪk ə ˈsɜːrveɪ]",
        "hangul_pronunciation": "[테이크 어 서베이]",
        "sample_sentence": "We need to take a survey of customer satisfaction.",
        "korean_sentence": "고객 만족도 조사를 해야 합니다."
    },
    {
        "korean": "배를 타다",
        "english": "take a boat",
        "pronunciation": "[teɪk ə boʊt]",
        "hangul_pronunciation": "[테이크 어 보트]",
        "sample_sentence": "Let's take a boat across the lake.",
        "korean_sentence": "호수를 가로질러 배를 타자."
    },
    {
        "korean": "메모하다",
        "english": "take minutes",
        "pronunciation": "[teɪk ˈmɪnɪts]",
        "hangul_pronunciation": "[테이크 미닛츠]",
        "sample_sentence": "Who will take the minutes of the meeting?",
        "korean_sentence": "회의록은 누가 작성하나요?"
    },
    {
        "korean": "맡기다",
        "english": "take on responsibility",
        "pronunciation": "[teɪk ɑːn rɪˌspɒnsəˈbɪləti]",
        "hangul_pronunciation": "[테이크 온 리스판서빌러티]",
        "sample_sentence": "He decided to take on more responsibility at work.",
        "korean_sentence": "그는 직장에서 더 많은 책임을 맡기로 결정했습니다."
    },
    {
        "korean": "선호하다",
        "english": "take a liking",
        "pronunciation": "[teɪk ə ˈlaɪkɪŋ]",
        "hangul_pronunciation": "[테이크 어 라이킹]",
        "sample_sentence": "She has taken a liking to classical music.",
        "korean_sentence": "그녀는 클래식 음악을 선호하게 되었습니다."
    },
    {
        "korean": "도전을 받아들이다",
        "english": "take up a challenge",
        "pronunciation": "[teɪk ʌp ə ˈʧælɪndʒ]",
        "hangul_pronunciation": "[테이크 업 어 챌린지]",
        "sample_sentence": "He decided to take up the challenge and run a marathon.",
        "korean_sentence": "그는 도전을 받아들여 마라톤을 뛰기로 했습니다."
    },
    {
        "korean": "호흡하다",
        "english": "take a deep breath",
        "pronunciation": "[teɪk ə dip brɛθ]",
        "hangul_pronunciation": "[테이크 어 딥 브레스]",
        "sample_sentence": "Take a deep breath and calm down.",
        "korean_sentence": "깊게 숨을 쉬고 진정하세요."
    },
    {
        "korean": "시간을 갖다",
        "english": "take time out",
        "pronunciation": "[teɪk taɪm aʊt]",
        "hangul_pronunciation": "[테이크 타임 아웃]",
        "sample_sentence": "You need to take time out for yourself.",
        "korean_sentence": "자신을 위해 시간을 가져야 합니다."
    },
    {
        "korean": "기회를 잡다",
        "english": "take a shot",
        "pronunciation": "[teɪk ə ʃɑt]",
        "hangul_pronunciation": "[테이크 어 샷]",
        "sample_sentence": "Why don't you take a shot at the competition?",
        "korean_sentence": "경쟁에 도전해 보는 게 어때요?"
    },
    {
        "korean": "탑승하다",
        "english": "take a ride",
        "pronunciation": "[teɪk ə raɪd]",
        "hangul_pronunciation": "[테이크 어 라이드]",
        "sample_sentence": "Let's take a ride on the Ferris wheel.",
        "korean_sentence": "관람차를 타러 가자."
    },
    {
        "korean": "산책하다",
        "english": "take a stroll",
        "pronunciation": "[teɪk ə stroʊl]",
        "hangul_pronunciation": "[테이크 어 스트롤]",
        "sample_sentence": "We decided to take a stroll in the park.",
        "korean_sentence": "우리는 공원에서 산책하기로 했습니다."
    },
    {
        "korean": "공을 치다",
        "english": "take a swing",
        "pronunciation": "[teɪk ə swɪŋ]",
        "hangul_pronunciation": "[테이크 어 스윙]",
        "sample_sentence": "He took a swing at the baseball.",
        "korean_sentence": "그는 야구공을 향해 스윙을 했습니다."
    },
    {
        "korean": "커피를 마시다",
        "english": "take a coffee",
        "pronunciation": "[teɪk ə ˈkɔfi]",
        "hangul_pronunciation": "[테이크 어 커피]",
        "sample_sentence": "Let's take a coffee break.",
        "korean_sentence": "커피 한잔 하자."
    },
    {
        "korean": "잠을 자다",
        "english": "take a nap",
        "pronunciation": "[teɪk ə næp]",
        "hangul_pronunciation": "[테이크 어 냅]",
        "sample_sentence": "I need to take a nap after lunch.",
        "korean_sentence": "점심 후에 낮잠이 필요해요."
    },
    {
        "korean": "모험을 하다",
        "english": "take an adventure",
        "pronunciation": "[teɪk ən ædˈvɛntʃər]",
        "hangul_pronunciation": "[테이크 언 어드벤처]",
        "sample_sentence": "They decided to take an adventure and travel the world.",
        "korean_sentence": "그들은 모험을 떠나 세계를 여행하기로 했습니다."
    },
    {
        "korean": "전화를 받다",
        "english": "take a call",
        "pronunciation": "[teɪk ə kɔl]",
        "hangul_pronunciation": "[테이크 어 콜]",
        "sample_sentence": "I need to take this call.",
        "korean_sentence": "이 전화를 받아야 해요."
    },
    {
        "korean": "주문을 받다",
        "english": "take an order",
        "pronunciation": "[teɪk ən ˈɔrdər]",
        "hangul_pronunciation": "[테이크 언 오더]",
        "sample_sentence": "The waiter will take your order shortly.",
        "korean_sentence": "웨이터가 곧 주문을 받을 것입니다."
    },
    {
        "korean": "도움을 요청하다",
        "english": "take help",
        "pronunciation": "[teɪk hɛlp]",
        "hangul_pronunciation": "[테이크 헬프]",
        "sample_sentence": "Don't hesitate to take help if you need it.",
        "korean_sentence": "필요하면 도움을 요청하는 것을 주저하지 마세요."
    },
    {
        "korean": "의미를 받아들이다",
        "english": "take meaning",
        "pronunciation": "[teɪk ˈminɪŋ]",
        "hangul_pronunciation": "[테이크 미닝]",
        "sample_sentence": "He took my words to mean something else.",
        "korean_sentence": "그는 내 말을 다른 의미로 받아들였어요."
    },
    {
        "korean": "복용하다",
        "english": "take a pill",
        "pronunciation": "[teɪk ə pɪl]",
        "hangul_pronunciation": "[테이크 어 필]",
        "sample_sentence": "Don't forget to take your pill.",
        "korean_sentence": "약을 잊지 말고 복용하세요."
    },
    {
        "korean": "쉬다",
        "english": "take a rest",
        "pronunciation": "[teɪk ə rɛst]",
        "hangul_pronunciation": "[테이크 어 레스트]",
        "sample_sentence": "You should take a rest after the long journey.",
        "korean_sentence": "긴 여행 후에는 쉬는 게 좋아요."
    },
    {
        "korean": "결정을 하다",
        "english": "take a stand",
        "pronunciation": "[teɪk ə stænd]",
        "hangul_pronunciation": "[테이크 어 스탠드]",
        "sample_sentence": "It's time to take a stand on this issue.",
        "korean_sentence": "이 문제에 대해 입장을 정할 때입니다."
    },
    {
        "korean": "잘못을 인정하다",
        "english": "take the blame",
        "pronunciation": "[teɪk ðə bleɪm]",
        "hangul_pronunciation": "[테이크 더 블레임]",
        "sample_sentence": "He was willing to take the blame for the mistake.",
        "korean_sentence": "그는 실수에 대해 잘못을 인정할 용의가 있었어요."
    },
    {
        "korean": "가르치다",
        "english": "take under one's wing",
        "pronunciation": "[teɪk ˈʌndər wʌnz wɪŋ]",
        "hangul_pronunciation": "[테이크 언더 원즈 윙]",
        "sample_sentence": "She took the new employee under her wing.",
        "korean_sentence": "그녀는 신입 직원을 가르쳤어요."
    },
    {
        "korean": "약속하다",
        "english": "take an oath",
        "pronunciation": "[teɪk ən oʊθ]",
        "hangul_pronunciation": "[테이크 언 오스]",
        "sample_sentence": "He had to take an oath of secrecy.",
        "korean_sentence": "그는 비밀을 지킬 것을 약속해야 했어요."
    },
    {
        "korean": "조치를 취하다",
        "english": "take action",
        "pronunciation": "[teɪk ˈækʃən]",
        "hangul_pronunciation": "[테이크 액션]",
        "sample_sentence": "It's time to take action against climate change.",
        "korean_sentence": "이제 기후 변화에 대해 조치를 취할 때입니다."
    },
    {
        "korean": "쉬운 길을 선택하다",
        "english": "take the easy way out",
        "pronunciation": "[teɪk ði ˈizi weɪ aʊt]",
        "hangul_pronunciation": "[테이크 디 이지 웨이 아웃]",
        "sample_sentence": "He decided to take the easy way out and quit his job.",
        "korean_sentence": "그는 쉬운 길을 선택해 직장을 그만두기로 했어요."
    },
    {
        "korean": "데려오다",
        "english": "take along",
        "pronunciation": "[teɪk əˈlɔːŋ]",
        "hangul_pronunciation": "[테이크 얼롱]",
        "sample_sentence": "You can take along your friend if you like.",
        "korean_sentence": "원하시면 친구를 데려와도 됩니다."
    },
    {
        "korean": "이해하다",
        "english": "take in",
        "pronunciation": "[teɪk ɪn]",
        "hangul_pronunciation": "[테이크 인]",
        "sample_sentence": "It's a lot of information to take in all at once.",
        "korean_sentence": "한꺼번에 많은 정보를 이해하기란 쉽지 않아요."
    },
    {
        "korean": "확인하다",
        "english": "take stock",
        "pronunciation": "[teɪk stɑːk]",
        "hangul_pronunciation": "[테이크 스톡]",
        "sample_sentence": "Let's take stock of what we have achieved so far.",
        "korean_sentence": "지금까지 우리가 이룬 것을 확인해 봅시다."
    },
    {
        "korean": "발언하다",
        "english": "take the floor",
        "pronunciation": "[teɪk ðə flɔːr]",
        "hangul_pronunciation": "[테이크 더 플로어]",
        "sample_sentence": "He is ready to take the floor and address the audience.",
        "korean_sentence": "그는 청중 앞에서 발언할 준비가 되었습니다."
    },
    {
        "korean": "빠르게 발전하다",
        "english": "take off",
        "pronunciation": "[teɪk ɔːf]",
        "hangul_pronunciation": "[테이크 오프]",
        "sample_sentence": "Her career really took off after the promotion.",
        "korean_sentence": "그녀의 경력은 승진 후 빠르게 발전했습니다."
    },
    {
        "korean": "노트 필기를 하다",
        "english": "take notes",
        "pronunciation": "[teɪk noʊts]",
        "hangul_pronunciation": "[테이크 노츠]",
        "sample_sentence": "Remember to take notes during the lecture.",
        "korean_sentence": "강의 중에 노트 필기하는 것을 잊지 마세요."
    },
    {
        "korean": "사진을 찍다",
        "english": "take a picture",
        "pronunciation": "[teɪk ə ˈpɪkʧər]",
        "hangul_pronunciation": "[테이크 어 픽처]",
        "sample_sentence": "Let's take a picture to remember this moment.",
        "korean_sentence": "이 순간을 기억하기 위해 사진을 찍읍시다."
    },
    {
        "korean": "시간을 내다",
        "english": "take time",
        "pronunciation": "[teɪk taɪm]",
        "hangul_pronunciation": "[테이크 타임]",
        "sample_sentence": "Make sure to take time for yourself.",
        "korean_sentence": "자신을 위해 시간을 내는 것이 중요합니다."
    },
    {
        "korean": "자리를 잡다",
        "english": "take a seat",
        "pronunciation": "[teɪk ə siːt]",
        "hangul_pronunciation": "[테이크 어 싯]",
        "sample_sentence": "Please take a seat and wait for your turn.",
        "korean_sentence": "자리에 앉아 순서를 기다리세요."
    },
    {
        "korean": "도전을 받아들이다",
        "english": "take up a challenge",
        "pronunciation": "[teɪk ʌp ə ˈʧælɪndʒ]",
        "hangul_pronunciation": "[테이크 업 어 챌린지]",
        "sample_sentence": "He decided to take up the challenge and run a marathon.",
        "korean_sentence": "그는 도전을 받아들여 마라톤을 뛰기로 했습니다."
    },
    {
        "korean": "끝내다",
        "english": "take it to the end",
        "pronunciation": "[teɪk ɪt tə ði ɛnd]",
        "hangul_pronunciation": "[테이크 잇 투 디 엔드]",
        "sample_sentence": "Let's take this project to the end.",
        "korean_sentence": "이 프로젝트를 끝까지 해냅시다."
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