const words = [
    {
        "korean": "위로 가다, 오르다",
        "english": "go up",
        "pronunciation": "[ɡoʊ ʌp]",
        "examples": [
            "We decided to go up the hill to enjoy the view (우리는 경치를 즐기기 위해 언덕 위로 가기로 했다).",
            "The price of the product went up last week (그 제품의 가격이 지난주에 올랐다).",
      
        ]
    },
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
        "korean": "팝업하다",
        "english": "pop up",
        "pronunciation": "[pɑp ʌp]",
        "examples": [
            "A new window popped up on my screen (새 창이 화면에 팝업되었다).",
            "The notification will pop up after a few minutes (알림이 몇 분 후에 팝업될 것이다).",
        
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
      
        ]
    },
    {
        "korean": "흡수하다",
        "english": "take in",
        "pronunciation": "[teɪk ɪn]",
        "examples": [
            "He took in the beautiful scenery (그는 아름다운 경치를 감상했다).",
            "She couldn't take in all the information at once (그녀는 한 번에 모든 정보를 받아들일 수 없었다).",
     
        ]
    },
    {
        "korean": "선동하다",
        "english": "stir up",
        "pronunciation": "[stɜr ʌp]",
        "examples": [
            "He stirred up excitement among the fans (그는 팬들 사이에 흥분을 일으켰다).",
            "The rumors stirred up trouble in the office (소문이 사무실에서 문제를 일으켰다).",
         
        ]
    },
    {
        "korean": "시험하다",
        "english": "try out",
        "pronunciation": "[traɪ aʊt]",
        "examples": [
            "She decided to try out for the school play (그녀는 학교 연극에 출연해 보겠다고 결정했다).",
            "He tried out the new software before buying it (그는 구매하기 전에 새로운 소프트웨어를 시험해 보았다).",
         
        ]
    },
    {
        "korean": "자기 자신을 닫다",
        "english": "close up",
        "pronunciation": "[kloʊz ʌp]",
        "examples": [
            "The shop closes up at 9 PM (가게는 오후 9시에 문을 닫는다).",
            "He closed up the store for the night (그는 밤을 위해 가게를 닫았다).",
   
        ]
    },
    {
        "korean": "공식화하다",
        "english": "set up",
        "pronunciation": "[sɛt ʌp]",
        "examples": [
            "They set up the conference room for the meeting (그들은 회의를 위해 회의실을 준비했다).",
            "She set up a new business last year (그녀는 지난해 새 사업을 시작했다).",

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
    },
    {
        korean: "지불하다",
        english: "pay for",
        pronunciation: "[peɪ fɔːr]",
        examples: [
            "He will pay for the damages (그는 피해를 배상할 것이다).",
            "You need to pay for your groceries (당신은 식료품 값을 지불해야 합니다)."
        ]
    },
    {
        korean: "갚다",
        english: "pay back",
        pronunciation: "[peɪ bæk]",
        examples: [
            "She promised to pay back the loan (그녀는 대출을 갚기로 약속했다).",
            "I need to pay back my friend (나는 내 친구에게 돈을 갚아야 한다)."
        ]
    },
    {
        korean: "거절하다",
        english: "pass up",
        pronunciation: "[pæs ʌp]",
        examples: [
            "Don't pass up this opportunity (이 기회를 놓치지 마세요).",
            "She passed up the chance to go abroad (그녀는 해외로 갈 기회를 놓쳤다)."
        ]
    },
    {
        korean: "기절하다",
        english: "pass out",
        pronunciation: "[pæs aʊt]",
        examples: [
            "He passed out from exhaustion (그는 피로로 기절했다).",
            "The teacher will pass out the exams (선생님이 시험지를 나눠 줄 것이다)."
        ]
    },
    {
        korean: "이사 나가다",
        english: "move out",
        pronunciation: "[muːv aʊt]",
        examples: [
            "They decided to move out of the city (그들은 도시를 떠나기로 결정했다).",
            "I'm planning to move out next month (나는 다음 달에 이사 나갈 계획이다)."
        ]
    },
    {
        korean: "놓치다",
        english: "miss out",
        pronunciation: "[mɪs aʊt]",
        examples: [
            "Don't miss out on this deal (이 거래를 놓치지 마세요).",
            "She missed out on the fun (그녀는 재미를 놓쳤다)."
        ]
    },
    {
        korean: "만들다",
        english: "make up",
        pronunciation: "[meɪk ʌp]",
        examples: [
            "She likes to make up stories (그녀는 이야기를 꾸미는 것을 좋아한다).",
            "They made up after the fight (그들은 싸운 후 화해했다)."
        ]
    },
    {
        korean: "작성하다",
        english: "make out",
        pronunciation: "[meɪk aʊt]",
        examples: [
            "Can you make out what he is saying? (그가 말하는 것을 알아들을 수 있나요?)",
            "They made out a check (그들은 수표를 작성했다)."
        ]
    },
    {
        korean: "운 좋게도",
        english: "luck out",
        pronunciation: "[lʌk aʊt]",
        examples: [
            "We lucked out and found a parking spot (우리는 운 좋게도 주차 공간을 찾았다).",
            "She lucked out with the weather (그녀는 날씨 덕분에 운이 좋았다)."
        ]
    },
    {
        korean: "조심하다",
        english: "look out",
        pronunciation: "[lʊk aʊt]",
        examples: [
            "Look out for that car! (저 차를 조심해!)",
            "You need to look out for your health (당신은 건강을 돌봐야 합니다)."
        ]
    },
    {
        korean: "찾다",
        english: "look for",
        pronunciation: "[lʊk fɔːr]",
        examples: [
            "She is looking for her keys (그녀는 열쇠를 찾고 있다).",
            "I'm looking for a new job (나는 새 직장을 찾고 있다)."
        ]
    },
    {
        korean: "밝히다",
        english: "light up",
        pronunciation: "[laɪt ʌp]",
        examples: [
            "Her face lit up when she saw him (그녀는 그를 보자 얼굴이 환해졌다).",
            "He lit up a cigarette (그는 담배에 불을 붙였다)."
        ]
    },
    {
        korean: "눕다",
        english: "lie down",
        pronunciation: "[laɪ daʊn]",
        examples: [
            "I'm going to lie down for a while (나는 잠시 누울 것이다).",
            "He lay down on the sofa (그는 소파에 누웠다)."
        ]
    },
    {
        korean: "실망시키다",
        english: "let down",
        pronunciation: "[lɛt daʊn]",
        examples: [
            "Don't let me down (나를 실망시키지 마세요).",
            "She let down her team (그녀는 팀을 실망시켰다)."
        ]
    },
    {
        korean: "내쫓다",
        english: "kick out",
        pronunciation: "[kɪk aʊt]",
        examples: [
            "They were kicked out of the club (그들은 클럽에서 쫓겨났다).",
            "He was kicked out of school (그는 학교에서 퇴학당했다)."
        ]
    },
    {
        korean: "시작하다",
        english: "kick off",
        pronunciation: "[kɪk ɔːf]",
        examples: [
            "The game will kick off at noon (경기는 정오에 시작될 것이다).",
            "They kicked off the meeting with a joke (그들은 농담으로 회의를 시작했다)."
        ]
    },
    {
        korean: "금지하다",
        english: "keep off",
        pronunciation: "[kiːp ɔːf]",
        examples: [
            "Please keep off the grass (잔디에 들어가지 마세요).",
            "Keep off sugary foods (설탕이 든 음식을 피하세요)."
        ]
    },
    {
        korean: "서두르다",
        english: "hurry up",
        pronunciation: "[ˈhɜːri ʌp]",
        examples: [
            "Hurry up, we're going to be late (서둘러, 우리 늦겠다).",
            "She needs to hurry up and finish her work (그녀는 서둘러 일을 끝내야 한다)."
        ]
    },
    {
        korean: "견디다",
        english: "hold out",
        pronunciation: "[hoʊld aʊt]",
        examples: [
            "They held out against the attackers (그들은 공격자들에 맞서 버텼다).",
            "I don't know how much longer we can hold out (우리가 얼마나 더 버틸 수 있을지 모르겠다)."
        ]
    },
    {
        korean: "돕다",
        english: "help out",
        pronunciation: "[hɛlp aʊt]",
        examples: [
            "Can you help me out with this problem? (이 문제를 도와줄 수 있나요?)",
            "She helps out at the local shelter (그녀는 지역 보호소에서 도와준다)."
        ]
    },
    {
        korean: "막다",
        english: "head off",
        pronunciation: "[hɛd ɔːf]",
        examples: [
            "We need to head off the crisis (우리는 위기를 막아야 한다).",
            "They headed off in the opposite direction (그들은 반대 방향으로 떠났다)."
        ]
    },
    {
        korean: "향하다",
        english: "head for",
        pronunciation: "[hɛd fɔːr]",
        examples: [
            "They are heading for the mountains (그들은 산으로 향하고 있다).",
            "I'm heading for the station (나는 역으로 향하고 있다)."
        ]
    },
    {
        korean: "어울리다",
        english: "hang out",
        pronunciation: "[hæŋ aʊt]",
        examples: [
            "We used to hang out at the park (우리는 공원에서 어울리곤 했다).",
            "Do you want to hang out this weekend? (이번 주말에 같이 놀래?)"
        ]
    },
    {
        korean: "기다리다",
        english: "hang on",
        pronunciation: "[hæŋ ɔːn]",
        examples: [
            "Hang on a minute, I'll be right back (잠시만 기다려, 금방 돌아올게).",
            "She told him to hang on tight (그녀는 그에게 꽉 잡으라고 말했다)."
        ]
    },
    {
        korean: "나눠주다",
        english: "hand out",
        pronunciation: "[hænd aʊt]",
        examples: [
            "They handed out flyers (그들은 전단지를 나눠주었다).",
            "Can you hand out these papers? (이 서류들을 나눠줄 수 있나요?)"
        ]
    },
    {
        korean: "내려가다",
        english: "go down",
        pronunciation: "[ɡoʊ daʊn]",
        examples: [
            "The sun is going down (해가 지고 있다).",
            "Prices are expected to go down (가격이 내려갈 것으로 예상된다)."
        ]
    },
    {
        korean: "계속하다",
        english: "go ahead",
        pronunciation: "[ɡoʊ əˈhɛd]",
        examples: [
            "You can go ahead with your plan (당신의 계획을 계속 진행하세요).",
            "They decided to go ahead without him (그들은 그 없이 진행하기로 결정했다)."
        ]
    },
    {
        korean: "뒤쫓다",
        english: "go after",
        pronunciation: "[ɡoʊ ˈæftər]",
        examples: [
            "He went after his dreams (그는 자신의 꿈을 뒤쫓았다).",
            "The police went after the suspect (경찰이 용의자를 뒤쫓았다)."
        ]
    },
    {
        korean: "포기하다",
        english: "give up",
        pronunciation: "[ɡɪv ʌp]",
        examples: [
            "Don't give up on your goals (당신의 목표를 포기하지 마세요).",
            "She gave up smoking (그녀는 담배를 끊었다)."
        ]
    },
    {
        korean: "나눠주다",
        english: "give out",
        pronunciation: "[ɡɪv aʊt]",
        examples: [
            "They gave out free samples (그들은 무료 샘플을 나눠주었다).",
            "The teacher gave out the assignments (선생님이 과제를 나눠주었다)."
        ]
    },
    {
        korean: "극복하다",
        english: "get over",
        pronunciation: "[ɡɛt ˈoʊvər]",
        examples: [
            "It took her a long time to get over the breakup (그녀는 이별을 극복하는 데 오랜 시간이 걸렸다).",
            "He needs to get over his fear of flying (그는 비행에 대한 두려움을 극복해야 한다)."
        ]
    },
    {
        korean: "내려오다",
        english: "get down",
        pronunciation: "[ɡɛt daʊn]",
        examples: [
            "Get down from there! (거기서 내려와!)",
            "He got down on one knee (그는 한쪽 무릎을 꿇었다)."
        ]
    },
    {
        korean: "도망치다",
        english: "get away",
        pronunciation: "[ɡɛt əˈweɪ]",
        examples: [
            "They managed to get away (그들은 도망치는 데 성공했다).",
            "I need to get away for a few days (나는 며칠 동안 떠나야 한다)."
        ]
    },
    {
        korean: "집중하다",
        english: "focus on",
        pronunciation: "[ˈfoʊkəs ɑːn]",
        examples: [
            "You need to focus on your studies (당신은 공부에 집중해야 합니다).",
            "Let's focus on the main issue (주요 문제에 집중합시다)."
        ]
    },
    {
        korean: "알아내다",
        english: "find out",
        pronunciation: "[faɪnd aʊt]",
        examples: [
            "I need to find out the truth (나는 진실을 알아내야 한다).",
            "Did you find out what happened? (무슨 일이 있었는지 알아냈나요?)"
        ]
    },
    {
        korean: "작성하다",
        english: "fill out",
        pronunciation: "[fɪl aʊt]",
        examples: [
            "Please fill out this form (이 양식을 작성해 주세요).",
            "He filled out the application (그는 신청서를 작성했다)."
        ]
    },
    {
        korean: "싸우다",
        english: "fall out",
        pronunciation: "[fɔːl aʊt]",
        examples: [
            "They fell out over a trivial matter (그들은 사소한 일로 싸웠다).",
            "Her hair started to fall out (그녀의 머리카락이 빠지기 시작했다)."
        ]
    },
    {
        korean: "반하다",
        english: "fall for",
        pronunciation: "[fɔːl fɔːr]",
        examples: [
            "He fell for her at first sight (그는 첫눈에 그녀에게 반했다).",
            "Don't fall for that trick (그 속임수에 넘어가지 마세요)."
        ]
    },
    {
        korean: "균등하게 하다",
        english: "even out",
        pronunciation: "[ˈiːvən aʊt]",
        examples: [
            "They need to even out the workload (그들은 업무량을 균등하게 해야 한다).",
            "The surface was evened out (표면이 평평하게 되었다)."
        ]
    },
    {
        korean: "중퇴하다",
        english: "drop out",
        pronunciation: "[drɑːp aʊt]",
        examples: [
            "He decided to drop out of school (그는 학교를 중퇴하기로 결정했다).",
            "She dropped out of the race (그녀는 경주에서 중도 하차했다)."
        ]
    },
    {
        korean: "내려주다",
        english: "drop off",
        pronunciation: "[drɑːp ɔːf]",
        examples: [
            "Can you drop me off at the station? (나를 역에 내려줄 수 있나요?)",
            "I need to drop off the package (나는 소포를 내려줘야 한다)."
        ]
    },
    {
        korean: "차려입다",
        english: "dress up",
        pronunciation: "[drɛs ʌp]",
        examples: [
            "She likes to dress up for parties (그녀는 파티를 위해 차려입는 것을 좋아한다).",
            "He dressed up as a pirate (그는 해적 복장을 했다)."
        ]
    },
    {
        korean: "길게 하다",
        english: "draw out",
        pronunciation: "[drɔː aʊt]",
        examples: [
            "He drew out the conversation (그는 대화를 길게 늘였다).",
            "She drew out the meeting (그녀는 회의를 길게 끌었다)."
        ]
    },
    {
        korean: "졸다",
        english: "doze off",
        pronunciation: "[doʊz ɔːf]",
        examples: [
            "He dozed off during the lecture (그는 강의 중에 졸았다).",
            "I dozed off while watching TV (나는 TV를 보다가 졸았다)."
        ]
    },
    {
        korean: "진정되다",
        english: "die down",
        pronunciation: "[daɪ daʊn]",
        examples: [
            "The storm finally died down (폭풍이 마침내 진정되었다).",
            "The noise will die down soon (소음이 곧 잦아들 것이다)."
        ]
    },
    {
        korean: "사라지다",
        english: "die away",
        pronunciation: "[daɪ əˈweɪ]",
        examples: [
            "The sound of the music slowly died away (음악 소리가 서서히 사라졌다).",
            "Her voice died away as she left (그녀가 떠나면서 목소리가 사라졌다)."
        ]
    },
    {
        korean: "줄이다",
        english: "cut down",
        pronunciation: "[kʌt daʊn]",
        examples: [
            "You need to cut down on sugar (당신은 설탕을 줄여야 합니다).",
            "They cut down the tree (그들은 나무를 베었다)."
        ]
    },
    {
        korean: "줄이다",
        english: "cut back",
        pronunciation: "[kʌt bæk]",
        examples: [
            "We need to cut back on expenses (우리는 비용을 줄여야 한다).",
            "They cut back production (그들은 생산을 줄였다)."
        ]
    },
    {
        korean: "의지하다",
        english: "count on",
        pronunciation: "[kaʊnt ɑːn]",
        examples: [
            "You can count on me (당신은 나를 믿어도 돼).",
            "He is counting on your support (그는 당신의 지지를 기대하고 있다)."
        ]
    },
    {
        korean: "나오다",
        english: "come out",
        pronunciation: "[kʌm aʊt]",
        examples: [
            "The new book will come out next month (새 책이 다음 달에 나온다).",
            "She came out of the room (그녀는 방에서 나왔다)."
        ]
    },
    {
        korean: "떨어지다",
        english: "come off",
        pronunciation: "[kʌm ɔːf]",
        examples: [
            "The paint is starting to come off (페인트가 벗겨지기 시작하고 있다).",
            "He came off his bike (그는 자전거에서 떨어졌다)."
        ]
    },
    {
        korean: "들어오다",
        english: "come in",
        pronunciation: "[kʌm ɪn]",
        examples: [
            "Please come in (들어오세요).",
            "The train is coming in now (기차가 지금 들어오고 있다)."
        ]
    },
    {
        korean: "클릭하다",
        english: "click on",
        pronunciation: "[klɪk ɔːn]",
        examples: [
            "Click on the link (링크를 클릭하세요).",
            "He clicked on the icon (그는 아이콘을 클릭했다)."
        ]
    },
    {
        korean: "청소하다",
        english: "clean up",
        pronunciation: "[kliːn ʌp]",
        examples: [
            "Let's clean up this mess (이 어질러진 것을 치우자).",
            "She cleaned up the kitchen (그녀는 부엌을 청소했다)."
        ]
    },
    {
        korean: "기운 내다",
        english: "cheer up",
        pronunciation: "[tʃɪr ʌp]",
        examples: [
            "Cheer up! Everything will be fine (기운 내! 모든 것이 잘 될 거야).",
            "He tried to cheer up his friend (그는 친구를 격려하려고 했다)."
        ]
    },
    {
        korean: "체크인하다",
        english: "check in",
        pronunciation: "[tʃɛk ɪn]",
        examples: [
            "We need to check in at the hotel (우리는 호텔에 체크인해야 한다).",
            "She checked in for her flight (그녀는 비행기에 탑승 수속을 했다)."
        ]
    },
    {
        korean: "바람을 피다",
        english: "cheat on",
        pronunciation: "[tʃiːt ɔːn]",
        examples: [
            "He cheated on his wife (그는 아내를 속였다).",
            "She found out he was cheating on her (그녀는 그가 그녀를 속이고 있다는 것을 알게 되었다)."
        ]
    },
    {
        korean: "따라잡다",
        english: "catch up",
        pronunciation: "[kætʃ ʌp]",
        examples: [
            "I need to catch up on my work (나는 내 일을 따라잡아야 한다).",
            "They finally caught up with the group (그들은 마침내 그룹을 따라잡았다)."
        ]
    },
    {
        korean: "인기를 얻다",
        english: "catch on",
        pronunciation: "[kætʃ ɔːn]",
        examples: [
            "The new song is starting to catch on (새 노래가 인기를 얻기 시작하고 있다).",
            "It took him a while to catch on (그는 이해하는 데 시간이 좀 걸렸다)."
        ]
    },
    {
        korean: "계속하다",
        english: "carry on",
        pronunciation: "[ˈkæri ɔːn]",
        examples: [
            "Carry on with your work (당신의 일을 계속하세요).",
            "They decided to carry on despite the difficulties (그들은 어려움에도 불구하고 계속하기로 결정했다)."
        ]
    },
    {
        korean: "돌보다",
        english: "care for",
        pronunciation: "[kɛr fɔːr]",
        examples: [
            "She cares for her elderly parents (그녀는 노부모를 돌본다).",
            "He doesn't care for spicy food (그는 매운 음식을 좋아하지 않는다)."
        ]
    },
    {
        korean: "취소하다",
        english: "call off",
        pronunciation: "[kɔːl ɔːf]",
        examples: [
            "They called off the meeting (그들은 회의를 취소했다).",
            "The event was called off due to rain (행사는 비 때문에 취소되었다)."
        ]
    },
    {
        korean: "지치다",
        english: "burn out",
        pronunciation: "[bɜrn aʊt]",
        examples: [
            "He burned out after working too hard (그는 너무 열심히 일해서 지쳤다).",
            "The light bulb burned out (전구가 나갔다)."
        ]
    },
    {
        korean: "쌓아 올리다",
        english: "build up",
        pronunciation: "[bɪld ʌp]",
        examples: [
            "She built up a successful business (그녀는 성공적인 사업을 일구었다).",
            "Traffic is building up on the highway (고속도로에 교통이 몰리고 있다)."
        ]
    },
    {
        korean: "헤어지다",
        english: "break up",
        pronunciation: "[breɪk ʌp]",
        examples: [
            "They decided to break up (그들은 헤어지기로 결정했다).",
            "The party broke up at midnight (파티는 자정에 끝났다)."
        ]
    },
    {
        korean: "침입하다",
        english: "break in",
        pronunciation: "[breɪk ɪn]",
        examples: [
            "Someone broke in last night (어젯밤에 누군가가 침입했다).",
            "He broke in the new shoes (그는 새 신발을 길들였다)."
        ]
    },
    {
        korean: "꺼지다",
        english: "blow out",
        pronunciation: "[bloʊ aʊt]",
        examples: [
            "The candle blew out (촛불이 꺼졌다).",
            "She blew out the candles on her birthday cake (그녀는 생일 케이크 위의 촛불을 껐다)."
        ]
    },
    {
        korean: "초대하다",
        english: "ask over",
        pronunciation: "[æsk ˈoʊvər]",
        examples: [
            "We should ask them over for dinner (우리는 저녁 식사에 그들을 초대해야 한다).",
            "He asked his friends over to his house (그는 친구들을 집으로 초대했다)."
        ]
    },
    {
        korean: "데이트 신청하다",
        english: "ask out",
        pronunciation: "[æsk aʊt]",
        examples: [
            "He asked her out on a date (그는 그녀에게 데이트 신청을 했다).",
            "She was nervous about asking him out (그녀는 그에게 데이트 신청하는 것에 대해 긴장했다)."
        ]
    },
    {
        korean: "짜내다",
        english: "wring out",
        pronunciation: "[rɪŋ aʊt]",
        examples: [
            "She wrung out the wet towel (그녀는 젖은 수건을 짰다).",
            "He wrung the water out of his clothes (그는 옷에서 물을 짜냈다)."
        ]
    },
    {
        korean: "조심하다",
        english: "watch out",
        pronunciation: "[wɑːtʃ aʊt]",
        examples: [
            "Watch out for the cars (차를 조심해).",
            "You need to watch out for scams (당신은 사기를 조심해야 한다)."
        ]
    },
    {
        korean: "걸어가다",
        english: "walk away",
        pronunciation: "[wɔːk əˈweɪ]",
        examples: [
            "She walked away from the argument (그녀는 논쟁에서 물러났다).",
            "He decided to walk away from the job (그는 일을 그만두기로 결정했다)."
        ]
    },
    {
        korean: "뒤집다",
        english: "turn over",
        pronunciation: "[tɜrn ˈoʊvər]",
        examples: [
            "Please turn over the paper (종이를 뒤집어 주세요).",
            "He turned over the business to his son (그는 아들에게 사업을 넘겼다)."
        ]
    },
    {
        korean: "끄다",
        english: "turn off",
        pronunciation: "[tɜrn ɔːf]",
        examples: [
            "Please turn off the lights (불을 꺼 주세요).",
            "He turned off the TV (그는 TV를 껐다)."
        ]
    },
    {
        korean: "거절하다",
        english: "turn down",
        pronunciation: "[tɜrn daʊn]",
        examples: [
            "She turned down the offer (그녀는 제안을 거절했다).",
            "He turned down the volume (그는 볼륨을 줄였다)."
        ]
    },
    {
        korean: "되돌아가다",
        english: "turn back",
        pronunciation: "[tɜrn bæk]",
        examples: [
            "We had to turn back because of the storm (우리는 폭풍 때문에 되돌아가야 했다).",
            "He decided to turn back and apologize (그는 돌아가서 사과하기로 결심했다)."
        ]
    },
    {
        korean: "설득하다",
        english: "talk into",
        pronunciation: "[tɔk ˈɪntuː]",
        examples: [
            "She talked him into going to the party (그녀는 그를 파티에 가도록 설득했다).",
            "He talked her into buying the car (그는 그녀를 설득해서 그 차를 사게 했다)."
        ]
    },
    {
        korean: "이륙하다",
        english: "take off",
        pronunciation: "[teɪk ɔːf]",
        examples: [
            "The plane will take off soon (비행기가 곧 이륙할 것이다).",
            "He took off his jacket (그는 재킷을 벗었다)."
        ]
    },
    {
        korean: "되돌리다",
        english: "take back",
        pronunciation: "[teɪk bæk]",
        examples: [
            "She took back her words (그녀는 자신의 말을 취소했다).",
            "He took back the faulty product (그는 결함이 있는 제품을 반품했다)."
        ]
    },
    {
        korean: "제거하다",
        english: "take away",
        pronunciation: "[teɪk əˈweɪ]",
        examples: [
            "The waiter took away the plates (웨이터가 접시를 치웠다).",
            "They took away his driving license (그들은 그의 운전면허증을 압수했다)."
        ]
    },
    {
        korean: "고수하다",
        english: "stick to",
        pronunciation: "[stɪk tuː]",
        examples: [
            "You should stick to your principles (당신은 자신의 원칙을 고수해야 한다).",
            "They decided to stick to the original plan (그들은 원래 계획을 고수하기로 결정했다)."
        ]
    },
    {
        korean: "한 발 물러서다",
        english: "step back",
        pronunciation: "[stɛp bæk]",
        examples: [
            "Please step back from the edge (가장자리에서 한 발 물러서 주세요).",
            "He stepped back to think about the situation (그는 상황을 생각하기 위해 한 발 물러섰다)."
        ]
    },
    {
        korean: "시작하다",
        english: "start out",
        pronunciation: "[stɑrt aʊt]",
        examples: [
            "They started out as a small company (그들은 작은 회사로 시작했다).",
            "I started out by reading a book (나는 책을 읽는 것으로 시작했다)."
        ]
    },
    {
        korean: "시작하다",
        english: "start off",
        pronunciation: "[stɑrt ɔːf]",
        examples: [
            "Let's start off with some warm-up exercises (준비 운동부터 시작합시다).",
            "She started off her career in marketing (그녀는 마케팅에서 경력을 시작했다)."
        ]
    },
    {
        korean: "눈에 띄다",
        english: "stand out",
        pronunciation: "[stænd aʊt]",
        examples: [
            "She really stands out in a crowd (그녀는 군중 속에서 정말 눈에 띈다).",
            "His performance stood out among the rest (그의 공연은 다른 것들 중에서 눈에 띄었다)."
        ]
    },
    {
        korean: "상징하다",
        english: "stand for",
        pronunciation: "[stænd fɔːr]",
        examples: [
            "What does 'USA' stand for? (USA는 무엇을 상징하나요?)",
            "He stands for equality and justice (그는 평등과 정의를 상징한다)."
        ]
    },
    {
        korean: "정리하다",
        english: "sort out",
        pronunciation: "[sɔːrt aʊt]",
        examples: [
            "We need to sort out these files (우리는 이 파일들을 정리해야 한다).",
            "He sorted out his problems (그는 자신의 문제를 해결했다)."
        ]
    },
    {
        korean: "잠을 자면서 고민하다",
        english: "sleep on",
        pronunciation: "[sliːp ɔːn]",
        examples: [
            "Let me sleep on it and I'll give you an answer tomorrow (하룻밤 자면서 고민해보고 내일 답을 줄게요).",
            "She decided to sleep on the decision (그녀는 결정을 잠시 미루기로 했다)."
        ]
    },
    {
        korean: "게으름 피우다",
        english: "slack off",
        pronunciation: "[slæk ɔːf]",
        examples: [
            "He's been slacking off at work (그는 직장에서 게으름을 피우고 있다).",
            "Don't slack off, we need to finish this project (게으름 피우지 마, 우리는 이 프로젝트를 끝내야 해)."
        ]
    },
    {
        korean: "앉다",
        english: "sit down",
        pronunciation: "[sɪt daʊn]",
        examples: [
            "Please sit down and relax (앉아서 쉬세요).",
            "He sat down on the bench (그는 벤치에 앉았다)."
        ]
    },
    {
        korean: "떨쳐내다",
        english: "shake off",
        pronunciation: "[ʃeɪk ɔːf]",
        examples: [
            "She tried to shake off her fears (그녀는 두려움을 떨쳐내려고 했다).",
            "He shook off the dirt from his shoes (그는 신발에서 먼지를 털어냈다)."
        ]
    },
    {
        korean: "정착하다",
        english: "settle in",
        pronunciation: "[ˈsɛtl ɪn]",
        examples: [
            "They settled in their new home (그들은 새 집에 정착했다).",
            "It took a while for him to settle in (그가 정착하는 데 시간이 좀 걸렸다)."
        ]
    },
    {
        korean: "따로 떼어 두다",
        english: "set aside",
        pronunciation: "[sɛt əˈsaɪd]",
        examples: [
            "She set aside some money for a rainy day (그녀는 만일을 대비해 돈을 따로 떼어 두었다).",
            "He set aside his differences with his colleague (그는 동료와의 의견 차이를 제쳐 두었다)."
        ]
    },
    {
        korean: "시작하다",
        english: "set about",
        pronunciation: "[sɛt əˈbaʊt]",
        examples: [
            "He set about fixing the car (그는 차를 고치는 것을 시작했다).",
            "They set about their work with enthusiasm (그들은 열정적으로 일을 시작했다)."
        ]
    },
    {
        korean: "처리하다",
        english: "see about",
        pronunciation: "[si əˈbaʊt]",
        examples: [
            "I'll see about getting tickets (내가 티켓을 구할 수 있는지 알아볼게요).",
            "She needs to see about her visa (그녀는 비자를 처리해야 한다)."
        ]
    },
    {
        korean: "스크롤 올리다",
        english: "scroll up",
        pronunciation: "[skroʊl ʌp]",
        examples: [
            "Scroll up to read the previous messages (이전 메시지를 읽으려면 스크롤을 올리세요).",
            "He scrolled up the webpage (그는 웹페이지를 스크롤 올렸다)."
        ]
    },
    {
        korean: "차로 치다",
        english: "run over",
        pronunciation: "[rʌn ˈoʊvər]",
        examples: [
            "She was run over by a car (그녀는 차에 치였다).",
            "The meeting ran over the scheduled time (회의가 예정된 시간을 초과했다)."
        ]
    },
    {
        korean: "되돌리다",
        english: "roll back",
        pronunciation: "[roʊl bæk]",
        examples: [
            "They decided to roll back the prices (그들은 가격을 인하하기로 결정했다).",
            "The policy changes were rolled back (정책 변화가 되돌려졌다)."
        ]
    },
    {
        korean: "차를 세우다",
        english: "pull over",
        pronunciation: "[pʊl ˈoʊvər]",
        examples: [
            "The police officer told him to pull over (경찰관이 그에게 차를 세우라고 말했다).",
            "He pulled over to check the map (그는 지도를 확인하기 위해 차를 세웠다)."
        ]
    },
    {
        korean: "인쇄하다",
        english: "print out",
        pronunciation: "[prɪnt aʊt]",
        examples: [
            "Can you print out the document? (문서를 인쇄해 줄 수 있나요?)",
            "He printed out the tickets (그는 티켓을 인쇄했다)."
        ]
    },
    {
        korean: "분해하다",
        english: "take apart",
        pronunciation: "[teɪk əˈpɑrt]",
        examples: [
            "He took the engine apart (그는 엔진을 분해했다).",
            "She likes to take apart old gadgets (그녀는 오래된 기계를 분해하는 것을 좋아한다)."
        ]
    },
    {
        korean: "닮다",
        english: "take after",
        pronunciation: "[teɪk ˈæftər]",
        examples: [
            "She takes after her mother (그녀는 엄마를 닮았다).",
            "He takes after his father in many ways (그는 많은 면에서 아버지를 닮았다)."
        ]
    },
    {
        korean: "스트레스를 주다",
        english: "stress out",
        pronunciation: "[strɛs aʊt]",
        examples: [
            "Work has been stressing me out (일이 나를 스트레스 받게 하고 있다).",
            "Don't stress out over the small things (작은 일들로 스트레스 받지 마세요)."
        ]
    },
    {
        korean: "속도를 늦추다",
        english: "slow down",
        pronunciation: "[sloʊ daʊn]",
        examples: [
            "Please slow down, you're driving too fast (속도를 늦추세요, 너무 빨리 운전하고 있어요).",
            "He decided to slow down and take it easy (그는 속도를 늦추고 편하게 하기로 결정했다)."
        ]
    },
    {
        korean: "닫다",
        english: "shut down",
        pronunciation: "[ʃʌt daʊn]",
        examples: [
            "The factory will shut down next month (공장이 다음 달에 폐쇄될 것이다).",
            "Please shut down your computer (컴퓨터를 종료해 주세요)."
        ]
    },
    {
        korean: "돌려보내다",
        english: "send back",
        pronunciation: "[sɛnd bæk]",
        examples: [
            "She decided to send back the faulty item (그녀는 결함이 있는 물건을 돌려보내기로 했다).",
            "He sent back the letter (그는 편지를 돌려보냈다)."
        ]
    },
    {
        korean: "다 써버리다",
        english: "run out of",
        pronunciation: "[rʌn aʊt ʌv]",
        examples: [
            "We've run out of milk (우리는 우유가 다 떨어졌다).",
            "They ran out of time (그들은 시간이 다 되었다)."
        ]
    },
    {
        korean: "돌아다니다",
        english: "run around",
        pronunciation: "[rʌn əˈraʊnd]",
        examples: [
            "The children were running around the park (아이들이 공원에서 뛰어다니고 있었다).",
            "I've been running around all day (나는 하루 종일 돌아다녔다)."
        ]
    },
    {
        korean: "우연히 만나다",
        english: "run across",
        pronunciation: "[rʌn əˈkrɔs]",
        examples: [
            "I ran across an old friend yesterday (나는 어제 옛 친구를 우연히 만났다).",
            "She ran across some interesting information (그녀는 흥미로운 정보를 우연히 발견했다)."
        ]
    },
    {
        korean: "죽다",
        english: "pass away",
        pronunciation: "[pæs əˈweɪ]",
        examples: [
            "He passed away last year (그는 작년에 세상을 떠났다).",
            "She passed away peacefully in her sleep (그녀는 잠자던 중 평화롭게 세상을 떠났다)."
        ]
    },
    {
        korean: "존경하다",
        english: "look up to",
        pronunciation: "[lʊk ʌp tuː]",
        examples: [
            "I look up to my older brother (나는 내 형을 존경한다).",
            "She looks up to her mentor (그녀는 그녀의 멘토를 존경한다)."
        ]
    },
    {
        korean: "돌보다",
        english: "look after",
        pronunciation: "[lʊk ˈæftər]",
        examples: [
            "She looks after her younger siblings (그녀는 어린 형제자매를 돌본다).",
            "He asked me to look after his dog (그는 나에게 그의 개를 돌봐달라고 부탁했다)."
        ]
    },
    {
        korean: "기분 전환하다",
        english: "lighten up",
        pronunciation: "[ˈlaɪtn ʌp]",
        examples: [
            "You need to lighten up and have some fun (너는 기분 전환을 하고 좀 재미를 봐야 해).",
            "She told him to lighten up and stop worrying (그녀는 그에게 기분 전환을 하고 걱정을 그만하라고 말했다)."
        ]
    },
    {
        korean: "남겨두다",
        english: "leave over",
        pronunciation: "[liːv ˈoʊvər]",
        examples: [
            "There were some leftovers from the party (파티에서 남은 음식이 있었다).",
            "He left over some money for emergencies (그는 비상사태에 대비해 돈을 남겨두었다)."
        ]
    },
    {
        korean: "무릎을 꿇다",
        english: "kneel down",
        pronunciation: "[niːl daʊn]",
        examples: [
            "She knelt down to tie her shoe (그녀는 신발끈을 묶기 위해 무릎을 꿇었다).",
            "He knelt down in prayer (그는 기도하기 위해 무릎을 꿇었다)."
        ]
    },
    {
        korean: "멀어지다",
        english: "grow apart",
        pronunciation: "[ɡroʊ əˈpɑrt]",
        examples: [
            "They grew apart after college (그들은 대학 졸업 후 멀어졌다).",
            "Friends sometimes grow apart over time (친구들은 때때로 시간이 지나면서 멀어지기도 한다)."
        ]
    },
    {
        korean: "겪다",
        english: "go through",
        pronunciation: "[ɡoʊ θruː]",
        examples: [
            "She went through a lot during the crisis (그녀는 위기 동안 많은 일을 겪었다).",
            "He went through the documents carefully (그는 서류를 꼼꼼히 살펴봤다)."
        ]
    },
    {
        korean: "약속을 어기다",
        english: "go back on",
        pronunciation: "[ɡoʊ bæk ɑːn]",
        examples: [
            "He went back on his word (그는 약속을 어겼다).",
            "She went back on their agreement (그녀는 그들의 합의를 어겼다)."
        ]
    },
    {
        korean: "반대하다",
        english: "go against",
        pronunciation: "[ɡoʊ əˈɡɛnst]",
        examples: [
            "They went against the rules (그들은 규칙을 어겼다).",
            "She went against her parents' wishes (그녀는 부모님의 뜻에 반했다)."
        ]
    },
    {
        korean: "이해시키다",
        english: "get across",
        pronunciation: "[ɡɛt əˈkrɔs]",
        examples: [
            "He tried to get his point across (그는 자신의 요점을 전달하려고 노력했다).",
            "She got the message across clearly (그녀는 메시지를 명확하게 전달했다)."
        ]
    },
    {
        korean: "이해하다",
        english: "figure out",
        pronunciation: "[ˈfɪɡjər aʊt]",
        examples: [
            "I need to figure out how to fix this (나는 이것을 어떻게 고칠지 알아내야 한다).",
            "She finally figured out the problem (그녀는 마침내 문제를 알아냈다)."
        ]
    },
    {
        korean: "무너지다",
        english: "fall apart",
        pronunciation: "[fɔːl əˈpɑrt]",
        examples: [
            "The old building is falling apart (그 오래된 건물은 무너지고 있다).",
            "Their relationship fell apart (그들의 관계는 무너졌다)."
        ]
    },
    {
        korean: "직면하다",
        english: "face up to",
        pronunciation: "[feɪs ʌp tuː]",
        examples: [
            "You need to face up to your responsibilities (당신은 자신의 책임에 직면해야 합니다).",
            "He faced up to the challenge (그는 도전에 직면했다)."
        ]
    },
    {
        korean: "폐쇄하다",
        english: "close down",
        pronunciation: "[kloʊz daʊn]",
        examples: [
            "The shop closed down last year (그 가게는 작년에 문을 닫았다).",
            "They decided to close down the factory (그들은 공장을 폐쇄하기로 결정했다)."
        ]
    },
    {
        korean: "진정하다",
        english: "calm down",
        pronunciation: "[kɑːm daʊn]",
        examples: [
            "She tried to calm down the crying baby (그녀는 우는 아기를 진정시키려고 했다).",
            "He needs to calm down before making a decision (그는 결정을 내리기 전에 진정해야 한다)."
        ]
    },
    {
        korean: "다시 전화하다",
        english: "call back",
        pronunciation: "[kɔːl bæk]",
        examples: [
            "I'll call you back later (나중에 다시 전화할게요).",
            "She called back to confirm the appointment (그녀는 약속을 확인하기 위해 다시 전화했다)."
        ]
    },
    {
        korean: "갑자기 ~하다",
        english: "burst into",
        pronunciation: "[bɜrst ˈɪntuː]",
        examples: [
            "She burst into tears (그녀는 갑자기 눈물을 흘렸다).",
            "He burst into the room (그는 방에 갑자기 들어왔다)."
        ]
    },
    {
        korean: "되돌리다",
        english: "bring back",
        pronunciation: "[brɪŋ bæk]",
        examples: [
            "This song brings back memories (이 노래는 추억을 되살린다).",
            "Can you bring back some milk? (우유 좀 사다 줄래요?)"
        ]
    },
    {
        korean: "발발하다",
        english: "break out",
        pronunciation: "[breɪk aʊt]",
        examples: [
            "A fire broke out in the kitchen (부엌에서 불이 났다).",
            "The war broke out unexpectedly (전쟁이 예기치 않게 발발했다)."
        ]
    },
    {
        korean: "고장 나다",
        english: "break down",
        pronunciation: "[breɪk daʊn]",
        examples: [
            "The car broke down on the highway (차가 고속도로에서 고장 났다).",
            "She broke down in tears (그녀는 눈물을 터뜨렸다)."
        ]
    },
    {
        korean: "여기저기 물어보다",
        english: "ask around",
        pronunciation: "[æsk əˈraʊnd]",
        examples: [
            "I'll ask around to see if anyone knows (누가 아는지 여기저기 물어볼게요).",
            "She asked around about the best places to visit (그녀는 방문할 최고의 장소에 대해 여기저기 물어보았다)."
        ]
    },
    {
        korean: "적다",
        english: "write down",
        pronunciation: "[raɪt daʊn]",
        examples: [
            "Please write down your name and address (이름과 주소를 적어 주세요).",
            "He wrote down the instructions (그는 지시 사항을 적었다)."
        ]
    },
    {
        korean: "돌아보다",
        english: "turn around",
        pronunciation: "[tɜrn əˈraʊnd]",
        examples: [
            "She turned around to see who was calling (그녀는 누가 부르는지 보기 위해 돌아섰다).",
            "He turned the business around (그는 사업을 호전시켰다)."
        ]
    },
    {
        korean: "돌이켜보다",
        english: "think back",
        pronunciation: "[θɪŋk bæk]",
        examples: [
            "Think back to your childhood (어린 시절을 돌이켜보세요).",
            "She thought back to the time they first met (그녀는 그들이 처음 만났던 때를 돌이켜보았다)."
        ]
    },
    {
        korean: "남다",
        english: "stay behind",
        pronunciation: "[steɪ bɪˈhaɪnd]",
        examples: [
            "She stayed behind to help clean up (그녀는 청소를 돕기 위해 남았다).",
            "He decided to stay behind after the meeting (그는 회의 후에 남기로 결정했다)."
        ]
    },
    {
        korean: "밤을 보내다",
        english: "sleep over",
        pronunciation: "[sliːp ˈoʊvər]",
        examples: [
            "Can I sleep over at your place? (너희 집에서 자도 될까?)",
            "The kids are having a sleepover (아이들이 함께 자며 놀고 있다)."
        ]
    },
    {
        korean: "여기저기 돌아다니다",
        english: "shop around",
        pronunciation: "[ʃɑp əˈraʊnd]",
        examples: [
            "I need to shop around for a better deal (나는 더 좋은 거래를 찾아봐야 한다).",
            "She shopped around before buying a car (그녀는 차를 사기 전에 여기저기 돌아다녔다)."
        ]
    },
    {
        korean: "정착하다",
        english: "settle down",
        pronunciation: "[ˈsɛtl daʊn]",
        examples: [
            "They decided to settle down in the countryside (그들은 시골에 정착하기로 결정했다).",
            "He settled down with a good book (그는 좋은 책과 함께 편히 앉았다)."
        ]
    },
    {
        korean: "스크롤 내리다",
        english: "scroll down",
        pronunciation: "[skroʊl daʊn]",
        examples: [
            "Scroll down to read more (더 읽으려면 스크롤을 내리세요).",
            "She scrolled down the webpage (그녀는 웹페이지를 스크롤 내렸다)."
        ]
    },
    {
        korean: "참다",
        english: "put up with",
        pronunciation: "[pʊt ʌp wɪð]",
        examples: [
            "She has to put up with a lot of noise (그녀는 많은 소음을 참아야 한다).",
            "I can't put up with his behavior anymore (나는 그의 행동을 더 이상 참을 수 없다)."
        ]
    },
    {
        korean: "~을 피하다",
        english: "keep out of",
        pronunciation: "[kiːp aʊt ʌv]",
        examples: [
            "Please keep out of the restricted area (제한 구역에 들어가지 마세요).",
            "He tried to keep out of trouble (그는 문제를 피하려고 노력했다)."
        ]
    },
    {
        korean: "빈둥거리다",
        english: "hang around",
        pronunciation: "[hæŋ əˈraʊnd]",
        examples: [
            "They like to hang around the park (그들은 공원에서 빈둥거리는 것을 좋아한다).",
            "Stop hanging around and do something productive (빈둥거리지 말고 생산적인 일을 해라)."
        ]
    },
    {
        korean: "보복하다",
        english: "get back at",
        pronunciation: "[ɡɛt bæk æt]",
        examples: [
            "She wanted to get back at him for the prank (그녀는 장난에 대해 그에게 보복하고 싶어했다).",
            "He got back at his rival (그는 라이벌에게 복수했다)."
        ]
    },
    {
        korean: "놀다",
        english: "fool around",
        pronunciation: "[fuːl əˈraʊnd]",
        examples: [
            "They were just fooling around (그들은 그냥 놀고 있었다).",
            "Stop fooling around and get to work (장난 그만하고 일해라)."
        ]
    },
    {
        korean: "뒤처지다",
        english: "fall behind",
        pronunciation: "[fɔːl bɪˈhaɪnd]",
        examples: [
            "He fell behind in his studies (그는 학업에서 뒤처졌다).",
            "They fell behind schedule (그들은 일정에 뒤처졌다)."
        ]
    },
    {
        korean: "정신을 차리다",
        english: "come round",
        pronunciation: "[kʌm raʊnd]",
        examples: [
            "He finally came round after fainting (그는 기절 후 마침내 정신을 차렸다).",
            "She'll come round to our way of thinking (그녀는 우리 생각에 동의하게 될 것이다)."
        ]
    },
    {
        korean: "우연히 발견하다",
        english: "come across",
        pronunciation: "[kʌm əˈkrɔs]",
        examples: [
            "I came across an old photo (나는 오래된 사진을 우연히 발견했다).",
            "She came across as very confident (그녀는 매우 자신감 있는 인상을 주었다)."
        ]
    },
    {
        korean: "전화하다",
        english: "call around",
        pronunciation: "[kɔːl əˈraʊnd]",
        examples: [
            "I need to call around to find a plumber (나는 배관공을 찾기 위해 여기저기 전화해야 한다).",
            "She called around to get more information (그녀는 더 많은 정보를 얻기 위해 여기저기 전화했다)."
        ]
    },
    {
        korean: "초래하다",
        english: "bring about",
        pronunciation: "[brɪŋ əˈbaʊt]",
        examples: [
            "The new policy brought about many changes (새 정책은 많은 변화를 초래했다).",
            "He wants to bring about positive change (그는 긍정적인 변화를 초래하고 싶어한다)."
        ]
    },
    {
        korean: "말대꾸하다",
        english: "answer back",
        pronunciation: "[ˈænsər bæk]",
        examples: [
            "Don't answer back to your parents (부모님께 말대꾸하지 마세요).",
            "She got in trouble for answering back to the teacher (그녀는 선생님께 말대꾸해서 혼났다)."
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
            const response = await fetch(`https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/generate-audio?text=${encodeURIComponent(text)}&language=${language}`, {
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

