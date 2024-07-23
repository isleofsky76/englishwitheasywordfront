const words = [
    {
        "korean": "계속하다",
        "english": "go on",
        "pronunciation": "[ɡoʊ ɑn]",
        "examples": [
            "Please go on with your story (이야기를 계속해 주세요).",
            "The show must go on despite the rain (비에도 불구하고 쇼는 계속되어야 한다).",

        ]
    },
    {
        "korean": "지나가다",
        "english": "go by",
        "pronunciation": "[ɡoʊ baɪ]",
        "examples": [
            "The weeks went by so quickly (주가 너무 빨리 지나갔다).",
            "I saw the bus go by without stopping (나는 버스가 멈추지 않고 지나가는 것을 보았다).",
          
        ]
    },
    {
        "korean": "다 써버리다",
        "english": "use up",
        "pronunciation": "[juːz ʌp]",
        "examples": [
            "We need to use up all the leftover food (남은 음식을 모두 사용해야 한다).",
            "She used up all her savings on the vacation (그녀는 휴가에 모든 저축을 사용했다).",
          
        ]
    },
    {
        "korean": "입어보다",
        "english": "try on",
        "pronunciation": "[traɪ ɑn]",
        "examples": [
            "She tried on the dress before buying it (그녀는 드레스를 사기 전에 입어보았다).",
            "You should try on these shoes to see if they fit (이 신발을 신어보아야 맞는지 확인할 수 있다).",
      
        ]
    },
    {
        "korean": "묶다",
        "english": "tie up",
        "pronunciation": "[taɪ ʌp]",
        "examples": [
            "She tied up the package with string (그녀는 끈으로 소포를 묶었다).",
            "We need to tie up loose ends before the project is complete (프로젝트가 완료되기 전에 미비한 부분을 정리해야 한다).",

        ]
    },
    {
        "korean": "설정하다",
        "english": "set up",
        "pronunciation": "[sɛt ʌp]",
        "examples": [
            "We need to set up the new computer system (새 컴퓨터 시스템을 설정해야 한다).",
            "She set up the meeting for next week (그녀는 다음 주에 회의를 설정했다).",
      
        ]
    },
    {
        "korean": "시작되다",
        "english": "set in",
        "pronunciation": "[sɛt ɪn]",
        "examples": [
            "Winter is starting to set in (겨울이 시작되고 있다).",
            "Once the rain sets in, it won't stop for hours (비가 내리기 시작하면 몇 시간 동안 그치지 않을 것이다).",
     
        ]
    },
    {
        "korean": "쌓이다",
        "english": "run up",
        "pronunciation": "[rʌn ʌp]",
        "examples": [
            "The bills ran up quickly (청구서가 빠르게 쌓였다).",
            "She ran up a huge debt (그녀는 큰 빚을 지었다).",
   
        ]
    },
    {
        "korean": "찢다",
        "english": "rip up",
        "pronunciation": "[rɪp ʌp]",
        "examples": [
            "He ripped up the letter in anger (그는 화가 나서 편지를 찢었다).",
            "The paper was ripped up into small pieces (종이는 작은 조각으로 찢어졌다).",
     
        ]
    },
    {
        "korean": "올리다",
        "english": "put up",
        "pronunciation": "[pʊt ʌp]",
        "examples": [
            "They put up new posters on the wall (그들은 벽에 새로운 포스터를 붙였다).",
            "I put up with the noise because it was temporary (나는 소음을 참았다, 왜냐하면 일시적이었기 때문이다).",

        ]
    },
    {
        "korean": "입다",
        "english": "put on",
        "pronunciation": "[pʊt ɑn]",
        "examples": [
            "He put on his coat before leaving (그는 나가기 전에 코트를 입었다).",
            "She put on a brave face despite the challenges (그녀는 도전에도 불구하고 용감한 얼굴을 했다).",
         
        ]
    },
    {
        "korean": "넣다",
        "english": "put in",
        "pronunciation": "[pʊt ɪn]",
        "examples": [
            "She put in a lot of effort into the project (그녀는 프로젝트에 많은 노력을 기울였다).",
            "He put in the keys into the drawer (그는 열쇠를 서랍에 넣었다).",

        ]
    },
    {
        "korean": "지불하다",
        "english": "pay up",
        "pronunciation": "[peɪ ʌp]",
        "examples": [
            "You need to pay up before the deadline (마감 전에 지불해야 한다).",
            "He paid up all his debts (그는 모든 빚을 갚았다).",

        ]
    },
    {
        "korean": "혼동하다",
        "english": "mix up",
        "pronunciation": "[mɪks ʌp]",
        "examples": [
            "I mixed up the dates for the appointment (약속 날짜를 혼동했다).",
            "She mixed up the ingredients while cooking (그녀는 요리할 때 재료를 혼동했다).",

        ]
    },
    {
        "korean": "다시 멈추다",
        "english": "let up",
        "pronunciation": "[lɛt ʌp]",
        "examples": [
            "The rain finally let up (비가 드디어 멈췄다).",
            "When will the traffic let up? (교통이 언제 풀릴까요?)",

        ]
    },
    {
        "korean": "털어놓다",
        "english": "let on",
        "pronunciation": "[lɛt ɒn]",
        "examples": [
            "She didn't let on that she knew the secret (그녀는 비밀을 알고 있다는 것을 털어놓지 않았다).",
            "He let on too much about his plans (그는 자신의 계획에 대해 너무 많이 털어놓았다).",
      
        ]
    },
    {
        "korean": "들어오다",
        "english": "let in",
        "pronunciation": "[lɛt ɪn]",
        "examples": [
            "Can you let me in the house? (집에 들어가게 해줄 수 있나요?)",
            "She let the guests in through the back door (그녀는 손님들을 뒷문으로 들여보냈다).",

        ]
    },
    {
        "korean": "정확히 맞다",
        "english": "hit on",
        "pronunciation": "[hɪt ɒn]",
        "examples": [
            "She hit on the perfect solution to the problem (그녀는 문제에 대한 완벽한 해결책을 찾았다).",
            "He hit on an idea during the meeting (그는 회의 중에 아이디어를 떠올렸다).",
   
        ]
    },
    {
        "korean": "외출하다",
        "english": "go out",
        "pronunciation": "[ɡoʊ aʊt]",
        "examples": [
            "They decided to go out for dinner (그들은 저녁을 먹으러 외출하기로 했다).",
            "She goes out every Friday night (그녀는 매주 금요일 밤 외출한다).",
     
        ]
    },
    {
        "korean": "떠나다",
        "english": "go off",
        "pronunciation": "[ɡoʊ ɒf]",
        "examples": [
            "The alarm went off at 6 AM (알람이 오전 6시에 울렸다).",
            "He went off to college in another city (그는 다른 도시의 대학으로 떠났다).",
   
        ]
    },
    {
        "korean": "추구하다",
        "english": "go for",
        "pronunciation": "[ɡoʊ fɔːr]",
        "examples": [
            "She decided to go for the promotion (그녀는 승진을 추구하기로 했다).",
            "Are you going to go for the new job? (새로운 직업을 추구할 건가요?)",
    
        ]
    },
    {
        "korean": "일어나다",
        "english": "get up",
        "pronunciation": "[ɡɛt ʌp]",
        "examples": [
            "He gets up early every morning (그는 매일 아침 일찍 일어난다).",
            "She got up from the table and left (그녀는 테이블에서 일어나서 떠났다).",

        ]
    },
    {
        "korean": "도착하다",
        "english": "get to",
        "pronunciation": "[ɡɛt tʊ]",
        "examples": [
            "We will get to the station by 5 PM (우리는 오후 5시까지 역에 도착할 것이다).",
            "She got to the office early today (그녀는 오늘 사무실에 일찍 도착했다).",
  
        ]
    },
    {
        "korean": "타다",
        "english": "get on",
        "pronunciation": "[ɡɛt ɒn]",
        "examples": [
            "He got on the bus at the next stop (그는 다음 정류장에서 버스에 탔다).",
            "They get on well with each other (그들은 서로 잘 지낸다).",
    
        ]
    },
    {
        "korean": "들어가다",
        "english": "get in",
        "pronunciation": "[ɡɛt ɪn]",
        "examples": [
            "She got in the car and drove away (그녀는 차에 타고 떠났다).",
            "The package should get in by Friday (패키지는 금요일까지 도착할 것이다).",
   
        ]
    },
    {
        "korean": "지내다",
        "english": "get by",
        "pronunciation": "[ɡɛt baɪ]",
        "examples": [
            "They manage to get by with their limited budget (그들은 제한된 예산으로 어떻게든 지낸다).",
            "I can get by with a little help from my friends (친구들의 약간의 도움으로 지낼 수 있다).",

        ]
    },
    {
        "korean": "비판하다",
        "english": "get at",
        "pronunciation": "[ɡɛt æt]",
        "examples": [
            "What are you trying to get at with your comment? (당신의 댓글로 무엇을 의미하려고 하는 건가요?)",
            "He’s not sure what you’re getting at (그는 당신이 무엇을 지적하려는 것인지 확실하지 않다).",
      
        ]
    },
    {
        "korean": "수리하다",
        "english": "fix up",
        "pronunciation": "[fɪks ʌp]",
        "examples": [
            "They fixed up the old house (그들은 오래된 집을 수리했다).",
            "I need to fix up my car before the trip (여행 전에 차를 수리해야 한다).",

        ]
    },
    {
        "korean": "말리다",
        "english": "dry up",
        "pronunciation": "[draɪ ʌp]",
        "examples": [
            "The paint will dry up quickly (페인트는 빨리 마를 것이다).",
            "Her tears dried up after the comforting words (위로의 말들로 그녀의 눈물이 말랐다).",
    
        ]
    },
    {
        "korean": "파다",
        "english": "dig in",
        "pronunciation": "[dɪɡ ɪn]",
        "examples": [
            "The children dug in the sand at the beach (아이들은 해변에서 모래를 팠다).",
            "Let's dig in and start the meal (식사를 시작하자).",
       
        ]
    },
    {
        "korean": "잘게 자르다",
        "english": "cut up",
        "pronunciation": "[kʌt ʌp]",
        "examples": [
            "She cut up the vegetables for the salad (그녀는 샐러드를 위해 채소를 잘게 잘랐다).",
            "He cut up the old clothes to make rags (그는 헌 옷을 잘게 잘라서 걸레를 만들었다).",

        ]
    },
    {
        "korean": "끼어들다",
        "english": "cut in",
        "pronunciation": "[kʌt ɪn]",
        "examples": [
            "He cut in while she was speaking (그는 그녀가 이야기하는 중에 끼어들었다).",
            "She cut in line at the store (그녀는 가게에서 줄을 끼어들었다).",
   
        ]
    },
    {
        "korean": "대상으로 하다",
        "english": "aim at",
        "pronunciation": "[eɪm æt]",
        "examples": [
            "The campaign is aimed at young adults (캠페인은 젊은 성인을 대상으로 한다).",
            "He aimed at the target and shot (그는 목표를 겨냥하고 쏘았다).",

        ]
    },
    {
        "korean": "행동하다",
        "english": "act up",
        "pronunciation": "[ækt ʌp]",
        "examples": [
            "The machine started to act up after a few hours (기계가 몇 시간 후에 이상 행동을 하기 시작했다).",
            "The kids acted up during the trip (아이들이 여행 중에 행동이 엉망이 되었다).",
       
        ]
    },
    {
        "korean": "마무리하다",
        "english": "wrap up",
        "pronunciation": "[ræp ʌp]",
        "examples": [
            "Let's wrap up the meeting (회의를 마무리하자).",
            "She wrapped up the gift with colorful paper (그녀는 선물을 색깔 있는 종이로 포장했다).",

        ]
    },
    {
        "korean": "세척하다",
        "english": "wash up",
        "pronunciation": "[wɑʃ ʌp]",
        "examples": [
            "He washed up the dishes after dinner (그는 저녁 식사 후에 접시를 씻었다).",
            "I need to wash up before going to bed (잠자기 전에 씻어야 한다).",
    
        ]
    },
    {
        "korean": "몸을 풀다",
        "english": "warm up",
        "pronunciation": "[wɔrm ʌp]",
        "examples": [
            "Make sure to warm up before exercising (운동하기 전에 몸을 풀어야 한다).",
            "He warmed up by jogging for 10 minutes (그는 10분 동안 조깅하여 몸을 풀었다).",

        ]
    },
    {
        "korean": "깨우다",
        "english": "wake up",
        "pronunciation": "[weɪk ʌp]",
        "examples": [
            "She wakes up early every day (그녀는 매일 일찍 일어난다).",
            "I woke up to the sound of the alarm (나는 알람 소리에 깨어났다).",
  
        ]
    },
    {
        "korean": "기다리다",
        "english": "wait on",
        "pronunciation": "[weɪt ɒn]",
        "examples": [
            "She waited on customers at the restaurant (그녀는 레스토랑에서 고객을 기다렸다).",
            "I am waiting on your response (나는 당신의 답변을 기다리고 있다).",
  
        ]
    },
    {
        "korean": "올리다",
        "english": "turn up",
        "pronunciation": "[tɜrn ʌp]",
        "examples": [
            "He turned up the volume on the radio (그는 라디오 볼륨을 높였다).",
            "She turned up for the meeting on time (그녀는 제시간에 회의에 참석했다).",

        ]
    },
    {
        "korean": "켜다",
        "english": "turn on",
        "pronunciation": "[tɜrn ɒn]",
        "examples": [
            "Please turn on the lights (불을 켜 주세요).",
            "He turned on the TV to watch the news (그는 뉴스를 보기 위해 TV를 켰다).",

        ]
    },
    {
        "korean": "제출하다",
        "english": "turn in",
        "pronunciation": "[tɜrn ɪn]",
        "examples": [
            "You need to turn in your assignment by Friday (금요일까지 과제를 제출해야 한다).",
            "He turned in his resignation letter (그는 사직서를 제출했다).",

        ]
    },
    {
        "korean": "시험해보다",
        "english": "try out",
        "pronunciation": "[traɪ aʊt]",
        "examples": [
            "She decided to try out for the school play (그녀는 학교 연극에 출연해 보겠다고 결정했다).",
            "He tried out the new software before buying it (그는 구매하기 전에 새로운 소프트웨어를 시험해 보았다).",

        ]
    },
    {
        "korean": "정리하다",
        "english": "tidy up",
        "pronunciation": "[ˈtaɪdi ʌp]",
        "examples": [
            "We need to tidy up the office before the meeting (회의 전에 사무실을 정리해야 한다).",
            "She tidied up her room before the guests arrived (그녀는 손님들이 도착하기 전에 방을 정리했다).",

        ]
    },
    {
        "korean": "찢다",
        "english": "tear up",
        "pronunciation": "[tɛr ʌp]",
        "examples": [
            "He tore up the old documents (그는 오래된 문서를 찢었다).",
            "She started to tear up when she heard the news (그녀는 소식을 듣고 눈물이 나기 시작했다).",

        ]
    },
    {
        "korean": "팀을 이루다",
        "english": "team up",
        "pronunciation": "[tiːm ʌp]",
        "examples": [
            "They teamed up to finish the project on time (그들은 제시간에 프로젝트를 끝내기 위해 팀을 이뤘다).",
            "She decided to team up with her colleague (그녀는 동료와 팀을 이루기로 했다).",
        ]
    },
    {
        "korean": "차지하다",
        "english": "take up",
        "pronunciation": "[teɪk ʌp]",
        "examples": [
            "He decided to take up painting as a hobby (그는 취미로 그림 그리기를 시작하기로 했다).",
            "The new sofa takes up a lot of space (새 소파는 많은 공간을 차지한다).",
        ]
    },
    {
        "korean": "부담을 지다",
        "english": "take on",
        "pronunciation": "[teɪk ɒn]",
        "examples": [
            "He took on the challenge of learning a new language (그는 새로운 언어를 배우는 도전을 받았다).",
            "She took on additional responsibilities at work (그녀는 직장에서 추가적인 책임을 지게 되었다).",
            "They took on a large project last year (그들은 작년에 큰 프로젝트를 맡았다)."
        ]
    },
    {
        "korean": "흡수하다",
        "english": "take in",
        "pronunciation": "[teɪk ɪn]",
        "examples": [
            "He took in the beautiful scenery (그는 아름다운 경치를 감상했다).",
            "She couldn't take in all the information at once (그녀는 한 번에 모든 정보를 받아들일 수 없었다).",
            "The sponge took in the spilled water (스펀지가 쏟아진 물을 흡수했다)."
        ]
    },
    {
        "korean": "선동하다",
        "english": "stir up",
        "pronunciation": "[stɜr ʌp]",
        "examples": [
            "He stirred up excitement among the fans (그는 팬들 사이에 흥분을 일으켰다).",
            "The rumors stirred up trouble in the office (소문이 사무실에서 문제를 일으켰다).",
            "She tried to stir up support for the cause (그녀는 그 원인을 위해 지지를 일으키려고 했다)."
        ]
    },
    {
        "korean": "시험하다",
        "english": "try out",
        "pronunciation": "[traɪ aʊt]",
        "examples": [
            "She decided to try out for the school play (그녀는 학교 연극에 출연해 보겠다고 결정했다).",
            "He tried out the new software before buying it (그는 구매하기 전에 새로운 소프트웨어를 시험해 보았다).",
            "They will try out the new recipe tonight (그들은 오늘 밤 새로운 레시피를 시도할 것이다)."
        ]
    },
    {
        "korean": "자기 자신을 닫다",
        "english": "close up",
        "pronunciation": "[kloʊz ʌp]",
        "examples": [
            "The shop closes up at 9 PM (가게는 오후 9시에 문을 닫는다).",
            "He closed up the store for the night (그는 밤을 위해 가게를 닫았다).",
            "She tends to close up when she feels nervous (그녀는 긴장할 때 자기 자신을 닫는 경향이 있다)."
        ]
    },
    {
        "korean": "공식화하다",
        "english": "set up",
        "pronunciation": "[sɛt ʌp]",
        "examples": [
            "They set up the conference room for the meeting (그들은 회의를 위해 회의실을 준비했다).",
            "She set up a new business last year (그녀는 지난해 새 사업을 시작했다).",
            "He set up the equipment before the event (그는 행사 전에 장비를 설치했다)."
        ]
    },
    {
        korean: "먹다",
        english: "eat up",
        pronunciation: "[iːt ʌp]",
        examples: [
            "Please eat up your dinner (제발 저녁을 다 먹어).",
            "The repairs ate up all my savings (수리비가 내 모든 저축을 소진했다)."
        ]
    },
    {
        korean: "외식하다",
        english: "eat out",
        pronunciation: "[iːt aʊt]",
        examples: [
            "We decided to eat out at a new restaurant (우리는 새로운 레스토랑에서 외식하기로 결정했다).",
            "They eat out every Friday (그들은 매주 금요일 외식을 한다)."
        ]
    },
    {
        korean: "완화하다",
        english: "ease up",
        pronunciation: "[iːz ʌp]",
        examples: [
            "The pain started to ease up after taking the medication (약을 복용한 후 통증이 완화되기 시작했다).",
            "You need to ease up on the criticism (비판을 좀 줄여야 해)."
        ]
    },
    {
        korean: "방문하다",
        english: "drop by",
        pronunciation: "[drɑːp baɪ]",
        examples: [
            "I'll drop by your place after work (퇴근 후에 네 집에 들를게).",
            "She decided to drop by unexpectedly (그녀는 갑작스럽게 들르기로 결정했다)."
        ]
    },
    {
        korean: "작성하다",
        english: "draw up",
        pronunciation: "[drɔː ʌp]",
        examples: [
            "The lawyer will draw up the contract (변호사가 계약서를 작성할 것이다).",
            "We need to draw up a plan (우리는 계획을 세워야 한다)."
        ]
    },
    {
        korean: "다시 하다",
        english: "do over",
        pronunciation: "[duː ˈoʊvər]",
        examples: [
            "I made a mistake and had to do the project over (나는 실수를 해서 프로젝트를 다시 해야 했다).",
            "Can we do this over? It doesn't seem right (이거 다시 할 수 있을까? 이건 맞지 않는 것 같아)."
        ]
    },
    {
        korean: "자르다",
        english: "cut out",
        pronunciation: "[kʌt aʊt]",
        examples: [
            "He cut out the article from the newspaper (그는 신문에서 기사를 잘라냈다).",
            "You need to cut out eating so much junk food (너는 정크 푸드를 그만 먹어야 해)."
        ]
    },
    {
        korean: "끊다",
        english: "cut off",
        pronunciation: "[kʌt ɔːf]",
        examples: [
            "The electricity was cut off due to non-payment (미납으로 전기가 끊겼다).",
            "He cut off the rope with a knife (그는 칼로 밧줄을 잘랐다)."
        ]
    },
    {
        korean: "떠오르다",
        english: "come up",
        pronunciation: "[kʌm ʌp]",
        examples: [
            "Something urgent has come up (급한 일이 생겼다).",
            "A new issue has come up in the meeting (회의에서 새로운 문제가 생겼다)."
        ]
    },
    {
        korean: "들르다",
        english: "come by",
        pronunciation: "[kʌm baɪ]",
        examples: [
            "You can come by my office anytime (언제든 내 사무실에 들를 수 있어).",
            "Rare items like these don't come by often (이런 희귀한 아이템은 자주 볼 수 없다)."
        ]
    },
    {
        korean: "기여하다",
        english: "chip in",
        pronunciation: "[tʃɪp ɪn]",
        examples: [
            "We all chipped in to buy a gift (우리는 모두 선물을 사기 위해 돈을 모았다).",
            "She chipped in with some helpful suggestions (그녀는 몇 가지 유용한 제안을 했다)."
        ]
    },
    {
        korean: "현금화하다",
        english: "cash in",
        pronunciation: "[kæʃ ɪn]",
        examples: [
            "He decided to cash in his savings bonds (그는 저축 채권을 현금화하기로 결정했다).",
            "You can cash in your points for rewards (포인트를 보상으로 교환할 수 있습니다)."
        ]
    },
    {
        korean: "전화하다",
        english: "call up",
        pronunciation: "[kɔːl ʌp]",
        examples: [
            "I'll call up my friend to invite her (나는 그녀를 초대하기 위해 친구에게 전화할 것이다).",
            "They called up the reserves (그들은 예비군을 소집했다)."
        ]
    },
    {
        korean: "폭발하다",
        english: "blow up",
        pronunciation: "[bloʊ ʌp]",
        examples: [
            "The bomb could blow up at any moment (폭탄은 언제든지 터질 수 있다).",
            "She blew up at him for being late (그녀는 그가 늦어서 화를 냈다)."
        ]
    },
    {
        korean: "백업하다",
        english: "back up",
        pronunciation: "[bæk ʌp]",
        examples: [
            "Make sure to back up your files (파일을 백업하는 것을 잊지 마세요).",
            "Can you back up your car? (차를 뒤로 뺄 수 있니?)"
        ]
    },
    {
        korean: "행동하다",
        english: "act out",
        pronunciation: "[ækt aʊt]",
        examples: [
            "The children were acting out a story (아이들은 이야기를 연기하고 있었다).",
            "He started to act out in class (그는 수업 시간에 행동하기 시작했다)."
        ]
    },
    {
        korean: "운동하다",
        english: "work out",
        pronunciation: "[wɜːrk aʊt]",
        examples: [
            "They finally worked out their differences (그들은 마침내 그들의 차이점을 해결했다).",
            "I need to work out at the gym (나는 체육관에서 운동을 해야 한다)."
        ]
    },
    {
        korean: "지우다",
        english: "wipe out",
        pronunciation: "[waɪp aʊt]",
        examples: [
            "The storm wiped out the entire village (폭풍이 마을 전체를 쓸어버렸다).",
            "I need to wipe out all the data on this drive (이 드라이브의 모든 데이터를 지워야 한다)."
        ]
    },
    {
        korean: "사라지다",
        english: "wear off",
        pronunciation: "[weər ɔːf]",
        examples: [
            "The effects of the drug will wear off soon (약의 효과가 곧 사라질 것이다).",
            "The excitement began to wear off (흥분이 가라앉기 시작했다)."
        ]
    },
    {
        korean: "막다",
        english: "ward off",
        pronunciation: "[wɔːrd ɔːf]",
        examples: [
            "They warded off the attack (그들은 공격을 막아냈다).",
            "Garlic is said to ward off vampires (마늘은 뱀파이어를 막는다고 한다)."
        ]
    },
    {
        korean: "기다리다",
        english: "wait out",
        pronunciation: "[weɪt aʊt]",
        examples: [
            "We need to wait out the storm (우리는 폭풍을 기다려야 한다).",
            "They waited out the traffic jam (그들은 교통 체증을 기다렸다)."
        ]
    },
    {
        korean: "토하다",
        english: "throw up",
        pronunciation: "[θroʊ ʌp]",
        examples: [
            "He threw up after eating too much (그는 너무 많이 먹고 토했다).",
            "They threw up a quick defense (그들은 빠르게 방어선을 구축했다)."
        ]
    },
    {
        korean: "포장하다",
        english: "take out",
        pronunciation: "[teɪk aʊt]",
        examples: [
            "I'll take out the trash (쓰레기를 내다 버릴게).",
            "He took her out for dinner (그는 그녀를 저녁 식사에 데리고 나갔다)."
        ]
    },
    {
        korean: "이륙하다",
        english: "take off",
        pronunciation: "[teɪk ɔːf]",
        examples: [
            "The plane will take off soon (비행기가 곧 이륙할 것이다).",
            "He took off his shoes (그는 신발을 벗었다)."
        ]
    },
    {
        korean: "들르다",
        english: "swing by",
        pronunciation: "[swɪŋ baɪ]",
        examples: [
            "I'll swing by your place later (나중에 네 집에 들를게).",
            "Can you swing by the store? (가게에 들러줄 수 있니?)"
        ]
    },
    {
        korean: "들르다",
        english: "stop by",
        pronunciation: "[stɑːp baɪ]",
        examples: [
            "She stopped by to say hello (그녀는 인사하러 들렀다).",
            "I need to stop by the bank (나는 은행에 들러야 한다)."
        ]
    },
    {
        korean: "피하다",
        english: "stay off",
        pronunciation: "[steɪ ɔːf]",
        examples: [
            "Stay off the grass (잔디를 밟지 마세요).",
            "He needs to stay off his feet (그는 발을 디디지 말아야 한다)."
        ]
    },
    {
        korean: "시작하다",
        english: "start up",
        pronunciation: "[stɑːrt ʌp]",
        examples: [
            "They started up a new company (그들은 새 회사를 시작했다).",
            "The engine won't start up (엔진이 시작되지 않는다)."
        ]
    },
    {
        korean: "일어서다",
        english: "stand up",
        pronunciation: "[stænd ʌp]",
        examples: [
            "She stood up for her rights (그녀는 그녀의 권리를 위해 일어섰다).",
            "He stood up and spoke (그는 일어서서 말했다)."
        ]
    },
    {
        korean: "기다리다",
        english: "stand by",
        pronunciation: "[stænd baɪ]",
        examples: [
            "Please stand by for further instructions (추가 지시를 기다려 주십시오).",
            "She stood by her friend (그녀는 그녀의 친구를 지지했다)."
        ]
    },
    {
        korean: "헤어지다",
        english: "split up",
        pronunciation: "[splɪt ʌp]",
        examples: [
            "They decided to split up (그들은 헤어지기로 결정했다).",
            "The team was split up into groups (팀은 그룹으로 나뉘었다)."
        ]
    },
    {
        korean: "속도를 높이다",
        english: "speed up",
        pronunciation: "[spiːd ʌp]",
        examples: [
            "You need to speed up the process (과정을 속도 높여야 한다).",
            "The car sped up as it entered the highway (차가 고속도로에 진입하면서 속도를 높였다)."
        ]
    },
    {
        korean: "목소리를 높이다",
        english: "speak up",
        pronunciation: "[spiːk ʌp]",
        examples: [
            "Please speak up, I can't hear you (제발 크게 말해 주세요, 나는 당신이 들리지 않습니다).",
            "He spoke up against the injustice (그는 불의에 맞서 목소리를 높였다)."
        ]
    },
    {
        korean: "늦잠 자다",
        english: "sleep in",
        pronunciation: "[sliːp ɪn]",
        examples: [
            "I love to sleep in on weekends (나는 주말에 늦잠 자는 것을 좋아한다).",
            "She slept in and missed her class (그녀는 늦잠 자서 수업을 놓쳤다)."
        ]
    },
    {
        korean: "쉬다",
        english: "sit back",
        pronunciation: "[sɪt bæk]",
        examples: [
            "Just sit back and relax (그냥 앉아서 쉬세요).",
            "He sat back and watched the show (그는 앉아서 쇼를 보았다)."
        ]
    },
    {
        korean: "끄다",
        english: "shut off",
        pronunciation: "[ʃʌt ɔːf]",
        examples: [
            "Please shut off the lights (불을 꺼 주세요).",
            "They shut off the water supply (그들은 수도 공급을 끊었다)."
        ]
    },
    {
        korean: "자랑하다",
        english: "show off",
        pronunciation: "[ʃoʊ ɔːf]",
        examples: [
            "He likes to show off his new car (그는 그의 새 차를 자랑하는 것을 좋아한다).",
            "Stop showing off, it's annoying (자랑 좀 그만해, 짜증 나)."
        ]
    },
    {
        korean: "흔들다",
        english: "shake up",
        pronunciation: "[ʃeɪk ʌp]",
        examples: [
            "The scandal shook up the company (그 스캔들이 회사를 흔들었다).",
            "He shook up the bottle (그는 병을 흔들었다)."
        ]
    },
    {
        korean: "실수하다",
        english: "screw up",
        pronunciation: "[skruː ʌp]",
        examples: [
            "Don't screw up this time (이번에는 실수하지 마라).",
            "I really screwed up the presentation (나는 발표를 정말 망쳤다)."
        ]
    },
    {
        korean: "나사를 조이다",
        english: "screw on",
        pronunciation: "[skruː ɔːn]",
        examples: [
            "Screw on the lid tightly (뚜껑을 단단히 조이세요).",
            "He screwed on the light bulb (그는 전구를 조였다)."
        ]
    },
    {
        korean: "우연히 만나다",
        english: "run into",
        pronunciation: "[rʌn ˈɪntuː]",
        examples: [
            "I ran into an old friend (나는 옛 친구를 우연히 만났다).",
            "Be careful not to run into trouble (문제를 일으키지 않도록 조심해라)."
        ]
    },
    {
        korean: "다 되다",
        english: "run down",
        pronunciation: "[rʌn daʊn]",
        examples: [
            "She was run down by a car (그녀는 차에 치였다).",
            "The battery ran down quickly (배터리가 빨리 다 되었다)."
        ]
    },
    {
        korean: "도망치다",
        english: "run away",
        pronunciation: "[rʌn əˈweɪ]",
        examples: [
            "The dog ran away (개가 도망갔다).",
            "He ran away from home (그는 집에서 도망갔다)."
        ]
    },
    {
        korean: "배제하다",
        english: "rule out",
        pronunciation: "[ruːl aʊt]",
        examples: [
            "We can't rule out the possibility (우리는 그 가능성을 배제할 수 없다).",
            "They ruled out the suspect (그들은 용의자를 배제했다)."
        ]
    },
    {
        korean: "연기하다",
        english: "put off",
        pronunciation: "[pʊt ɔːf]",
        examples: [
            "Don't put off your homework (숙제를 미루지 마라).",
            "They put off the meeting (그들은 회의를 연기했다)."
        ]
    },
    {
        korean: "내려놓다",
        english: "put down",
        pronunciation: "[pʊt daʊn]",
        examples: [
            "He put down the book (그는 책을 내려놓았다).",
            "She put down a deposit (그녀는 보증금을 지불했다)."
        ]
    },
    {
        korean: "되돌려놓다",
        english: "put back",
        pronunciation: "[pʊt bæk]",
        examples: [
            "Please put back the book (책을 제자리에 돌려놓아 주세요).",
            "He put back the furniture (그는 가구를 제자리에 돌려놓았다)."
        ]
    },
    {
        korean: "치우다",
        english: "put away",
        pronunciation: "[pʊt əˈweɪ]",
        examples: [
            "Put away your toys (장난감을 치우세요).",
            "She put away the groceries (그녀는 식료품을 치웠다)."
        ]
    },
    {
        korean: "성공하다",
        english: "pull off",
        pronunciation: "[pʊl ɔːf]",
        examples: [
            "He pulled off the road (그는 도로에서 벗어났다).",
            "She managed to pull off the deal (그녀는 거래를 성사시켰다)."
        ]
    },
    {
        korean: "계획하다",
        english: "plan on",
        pronunciation: "[plæn ɑːn]",
        examples: [
            "We plan on going to the beach (우리는 해변에 갈 계획이다).",
            "They plan on expanding the business (그들은 사업 확장을 계획하고 있다)."
        ]
    }
];

let currentWordIndex = 0;
let autoPlayInterval;
let currentAudioSource = null;
let isStopped = false;

document.addEventListener('DOMContentLoaded', function() {
    const exampleList = document.getElementById('example-list');
    
    function updateWord() {
        const word = words[currentWordIndex];
        document.getElementById('word-korean').innerText = word.korean;
        document.getElementById('word-english').innerText = word.english;
        document.getElementById('word-pronunciation').innerText = word.pronunciation;
    
        exampleList.innerHTML = '';
        word.examples.forEach(example => {
            const [english, korean] = example.split(' (');
            const listItem = document.createElement('li');
            listItem.innerHTML = `${english}<br>(${korean}`; // HTML로 변경하여 줄 바꿈 적용
            exampleList.appendChild(listItem);
        });
    }

    async function fetchAudio(text, language) {
        console.log('request Audio for:', text, 'in', language);
  
        try {
            const response = await fetch(`http://localhost:3000/generate-audio?text=${encodeURIComponent(text)}&language=${language}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
  
            if (!response.ok) {
                console.error('Failed to fetch audio data');
                return;
            }
  
            const arrayBuffer = await response.arrayBuffer();
            const audioContext = getAudioContext();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.onended = () => currentAudioSource = null; // 오디오 종료 시 currentAudioSource 초기화
            return source;
        } catch (error) {
            console.error('Error fetching audio data:', error);
        }
    }
  
    function getAudioContext() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        return new AudioContext();
    }

    async function pronounceWord(times, callback) {
        let count = 0;
        const word = words[currentWordIndex];
        const { korean, examples } = word;
    
        async function speak() {
            if (count < times && !isStopped) {
                if (currentAudioSource) {
                    currentAudioSource.stop();
                }
                const koreanAudio = await fetchAudio(korean, 'ko-KR');
                if (!koreanAudio) {
                    console.error('Failed to fetch Korean audio URL');
                    return;
                }
                currentAudioSource = koreanAudio;
                koreanAudio.onended = async () => {
                    if (isStopped) return;
                    let exampleIndex = 0;
                    async function speakExample() {
                        if (exampleIndex < examples.length && !isStopped) {
                            if (currentAudioSource) {
                                currentAudioSource.stop();
                            }
                            const englishExample = examples[exampleIndex].split(' (')[0];
                            const englishAudio = await fetchAudio(englishExample, 'en-GB');
                            if (!englishAudio) {
                                console.error('Failed to fetch English audio URL');
                                return;
                            }
                            currentAudioSource = englishAudio;
                            englishAudio.onended = () => {
                                if (isStopped) return;
                                exampleIndex++;
                                if (exampleIndex < examples.length) {
                                    setTimeout(speakExample, 2000); // 예문 사이에 2초 지연
                                } else {
                                    count++;
                                    if (count < times) {
                                        setTimeout(speak, 2000); // 단어 사이에 2초 지연
                                    } else if (callback) {
                                        setTimeout(callback, 2000); // 전체 반복 사이에 2초 지연
                                    }
                                }
                            };
                            englishAudio.start();
                        }
                    }
                    setTimeout(speakExample, 2000); // 한국어와 첫 번째 예문 사이에 2초 지연
                };
                koreanAudio.start();
            }
        }
        speak();
    }
  
    function stopPronouncing() {
        clearInterval(autoPlayInterval);
        isStopped = true;
        if (currentAudioSource) {
            currentAudioSource.stop();
        }
        currentAudioSource = null; // currentAudioSource 초기화
    }
  
    function nextWord() {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        updateWord();
        setTimeout(() => pronounceWord(1), 2000); // 2초 지연
    }
  
    function autoPlay() {
        stopPronouncing(); // 자동 재생 시작 전에 현재 재생 중인 오디오 멈추기
        isStopped = false;

        function playNextWord() {
            if (isStopped) return;
            updateWord();
            pronounceWord(1, () => {
                currentWordIndex++;
                if (currentWordIndex >= words.length) {
                    currentWordIndex = 0;
                }
                setTimeout(playNextWord, 2000); // 다음 단어 재생 전에 2초 지연
            });
        }

        setTimeout(playNextWord, 2000); // 첫 단어 재생 전에 2초 지연
    }
  
    document.getElementById('pronounce-1').addEventListener('click', () => pronounceWord(1));
    document.getElementById('pronounce-5').addEventListener('click', () => pronounceWord(5));
    document.getElementById('pronounce-10').addEventListener('click', () => pronounceWord(10));
    document.getElementById('stop-pronouncing').addEventListener('click', stopPronouncing);
    document.getElementById('next-word').addEventListener('click', nextWord);
    document.getElementById('auto-play').addEventListener('click', autoPlay);

    updateWord();
    setTimeout(() => pronounceWord(1), 2000); // 페이지 로드 후 2초 지연
});

