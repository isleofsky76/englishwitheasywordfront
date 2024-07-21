const words = [
    {
        "korean": "있다",
        "english": "be",
        "pronunciation": "[biː]",
        "examples": [
            "She wants to be a doctor (그녀는 의사가 되고 싶어합니다).",
            "They are happy (그들은 행복합니다).",
            "This book is interesting (이 책은 재미있습니다)."
        ]
    },
    {
        "korean": "가지다",
        "english": "have",
        "pronunciation": "[hæv]",
        "examples": [
            "I have a car (나는 차를 가지고 있습니다).",
            "She has three cats (그녀는 고양이 세 마리를 키우고 있습니다).",
            "We had dinner at 7 PM (우리는 저녁을 7시에 먹었습니다)."
        ]
    },
    {
        "korean": "하다",
        "english": "do",
        "pronunciation": "[duː]",
        "examples": [
            "I do my homework every day (나는 매일 숙제를 합니다).",
            "She does yoga every morning (그녀는 매일 아침 요가를 합니다).",
            "Do you like ice cream? (아이스크림을 좋아하나요?)"
        ]
    },
    {
        "korean": "말하다",
        "english": "say",
        "pronunciation": "[seɪ]",
        "examples": [
            "He says hello to everyone (그는 모든 사람에게 인사합니다).",
            "She said she would come (그녀는 온다고 말했습니다).",
            "What did you say? (뭐라고 말했나요?)"
        ]
    },
    {
        "korean": "가다",
        "english": "go",
        "pronunciation": "[ɡoʊ]",
        "examples": [
            "I go to school by bus (나는 버스를 타고 학교에 갑니다).",
            "She goes shopping every weekend (그녀는 주말마다 쇼핑을 갑니다).",
            "We went to the beach last summer (우리는 지난 여름에 해변에 갔습니다)."
        ]
    },
    {
        "korean": "보다",
        "english": "see",
        "pronunciation": "[siː]",
        "examples": [
            "I see a bird in the tree (나무에 새가 보여요).",
            "Did you see that movie? (그 영화를 봤나요?)",
            "She sees her friends every weekend (그녀는 주말마다 친구들을 만납니다)."
        ]
    },
    {
        "korean": "가지다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "examples": [
            "Please take a seat (자리에 앉아 주세요).",
            "She took the book from the shelf (그녀는 책장에서 책을 꺼냈습니다).",
            "I take a walk every morning (나는 매일 아침 산책을 합니다)."
        ]
    },
    {
        "korean": "얻다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "examples": [
            "Can you get me some water? (물 좀 가져다줄 수 있나요?)",
            "He got a new job (그는 새로운 일을 얻었습니다).",
            "She gets up early every morning (그녀는 매일 아침 일찍 일어납니다)."
        ]
    },
    {
        "korean": "만들다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "I make breakfast every morning (나는 매일 아침 식사를 만듭니다).",
            "She made a cake for the party (그녀는 파티를 위해 케이크를 만들었습니다).",
            "They make a good team (그들은 좋은 팀을 만듭니다)."
        ]
    },
    {
        "korean": "오다",
        "english": "come",
        "pronunciation": "[kʌm]",
        "examples": [
            "Can you come here for a moment? (잠깐 여기로 올 수 있나요?)",
            "She came to my house yesterday (그녀는 어제 내 집에 왔습니다).",
            "He comes to work by train (그는 기차로 출근합니다)."
        ]
    },
    {
        "korean": "알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "Do you know her? (그녀를 아나요?)",
            "He knows a lot about history (그는 역사에 대해 많이 알고 있습니다).",
            "She knew the answer (그녀는 정답을 알고 있었습니다)."
        ]
    },
    {
        "korean": "생각하다",
        "english": "think",
        "pronunciation": "[θɪŋk]",
        "examples": [
            "I think it will rain tomorrow (나는 내일 비가 올 것 같아요).",
            "She thinks about her future often (그녀는 종종 자신의 미래에 대해 생각합니다).",
            "Do you think this is a good idea? (이것이 좋은 아이디어라고 생각하나요?)"
        ]
    },
    {
        "korean": "주다",
        "english": "give",
        "pronunciation": "[ɡɪv]",
        "examples": [
            "Can you give me a hand? (저 좀 도와줄 수 있나요?)",
            "She gave him a gift (그녀는 그에게 선물을 주었습니다).",
            "I give my time to volunteer work (나는 자원봉사에 내 시간을 바칩니다)."
        ]
    },
    {
        "korean": "찾다",
        "english": "find",
        "pronunciation": "[faɪnd]",
        "examples": [
            "I can't find my keys (내 열쇠를 찾을 수가 없어요).",
            "She found a great place to eat (그녀는 먹기 좋은 장소를 찾았습니다).",
            "Did you find the information you needed? (필요한 정보를 찾았나요?)"
        ]
    },
    {
        "korean": "두다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "Put the book on the table (책을 테이블 위에 두세요).",
            "She puts her keys in her bag (그녀는 가방에 열쇠를 넣습니다).",
            "I put my phone on silent mode (나는 내 폰을 무음 모드로 설정합니다)."
        ]
    },
    {
        "korean": "부르다",
        "english": "call",
        "pronunciation": "[kɔl]",
        "examples": [
            "I will call you later (나중에 전화할게요).",
            "She called her friend to talk (그녀는 친구에게 전화를 걸었습니다).",
            "Call me if you need help (도움이 필요하면 전화하세요)."
        ]
    },
    {
        "korean": "원하다",
        "english": "want",
        "pronunciation": "[wɑnt]",
        "examples": [
            "I want to travel the world (나는 세계 여행을 하고 싶습니다).",
            "She wants a new phone (그녀는 새 전화기를 원합니다).",
            "Do you want something to drink? (뭐 마실 것 좀 드릴까요?)"
        ]
    },
    {
        "korean": "사용하다",
        "english": "use",
        "pronunciation": "[juz]",
        "examples": [
            "Can I use your phone? (당신의 전화기를 사용해도 될까요?)",
            "She uses a laptop for work (그녀는 일을 위해 노트북을 사용합니다).",
            "We use public transportation every day (우리는 매일 대중교통을 이용합니다)."
        ]
    },
    {
        "korean": "보다",
        "english": "look",
        "pronunciation": "[lʊk]",
        "examples": [
            "Look at the stars (별들을 보세요).",
            "She looked out the window (그녀는 창밖을 보았습니다).",
            "I look forward to meeting you (당신을 만나기를 고대합니다)."
        ]
    },
    {
        "korean": "듣다",
        "english": "hear",
        "pronunciation": "[hɪr]",
        "examples": [
            "Can you hear me? (내 목소리가 들리나요?)",
            "She heard a strange noise (그녀는 이상한 소리를 들었습니다).",
            "I hear that you are moving (당신이 이사 간다는 말을 들었어요)."
        ]
    },
    {
        "korean": "묻다",
        "english": "ask",
        "pronunciation": "[æsk]",
        "examples": [
            "Can I ask you a question? (질문 하나 해도 될까요?)",
            "She asked for directions (그녀는 길을 물었습니다).",
            "I asked him to help me (나는 그에게 도와달라고 요청했습니다)."
        ]
    },
    {
        "korean": "일하다",
        "english": "work",
        "pronunciation": "[wɜrk]",
        "examples": [
            "I work from home (나는 집에서 일합니다).",
            "She works at a bank (그녀는 은행에서 일합니다).",
            "They worked all night (그들은 밤새 일했습니다)."
        ]
    },
    {
        "korean": "느끼다",
        "english": "feel",
        "pronunciation": "[fil]",
        "examples": [
            "I feel happy today (나는 오늘 기분이 좋습니다).",
            "She felt a pain in her leg (그녀는 다리에 통증을 느꼈습니다).",
            "Do you feel okay? (괜찮으세요?)"
        ]
    },
    {
        "korean": "떠나다",
        "english": "leave",
        "pronunciation": "[liv]",
        "examples": [
            "I will leave the office at 6 PM (나는 오후 6시에 사무실을 떠날 것입니다).",
            "She left her bag at home (그녀는 가방을 집에 두고 왔습니다).",
            "Don't leave without saying goodbye (작별 인사를 하지 않고 떠나지 마세요)."
        ]
    },
    {
        "korean": "보여주다",
        "english": "show",
        "pronunciation": "[ʃoʊ]",
        "examples": [
            "Can you show me how to do it? (어떻게 하는지 보여줄 수 있나요?)",
            "She showed her photos to her friends (그녀는 친구들에게 사진을 보여주었습니다).",
            "I will show you the way (길을 알려드릴게요)."
        ]
    },
    {
        "korean": "변하다",
        "english": "change",
        "pronunciation": "[ʧeɪndʒ]",
        "examples": [
            "I need to change my clothes (나는 옷을 갈아입어야 해요).",
            "She changed her mind (그녀는 마음을 바꿨습니다).",
            "The weather changes quickly here (여기 날씨는 빨리 변합니다)."
        ]
    },
    {
        "korean": "말하다",
        "english": "tell",
        "pronunciation": "[tɛl]",
        "examples": [
            "Can you tell me your name? (이름을 말해줄 수 있나요?)",
            "She told him the truth (그녀는 그에게 진실을 말했습니다).",
            "I told you it was a good idea (나는 그것이 좋은 생각이라고 말했잖아요)."
        ]
    },
    {
        "korean": "설명하다",
        "english": "explain",
        "pronunciation": "[ɪkˈspleɪn]",
        "examples": [
            "Can you explain this to me? (이것을 나에게 설명해줄 수 있나요?)",
            "She explained the rules to us (그녀는 우리에게 규칙을 설명했습니다).",
            "I will explain everything later (나중에 모든 것을 설명할게요)."
        ]
    },
    {
        "korean": "보다",
        "english": "see",
        "pronunciation": "[siː]",
        "examples": [
            "I see a bird in the tree (나무에 새가 보여요).",
            "Did you see that movie? (그 영화를 봤나요?)",
            "She sees her friends every weekend (그녀는 주말마다 친구들을 만납니다)."
        ]
    },
    {
        "korean": "필요하다",
        "english": "need",
        "pronunciation": "[nid]",
        "examples": [
            "I need some help (나는 도움이 필요해요).",
            "She needs to rest (그녀는 쉬어야 해요).",
            "Do you need anything else? (다른 것이 필요하신가요?)"
        ]
    },
    {
        "korean": "시도하다",
        "english": "try",
        "pronunciation": "[traɪ]",
        "examples": [
            "I will try to fix it (나는 그것을 고치려고 노력할게요).",
            "She tried to open the door (그녀는 문을 열려고 했습니다).",
            "Try again later (나중에 다시 시도해 보세요)."
        ]
    },
    {
        "korean": "되다",
        "english": "become",
        "pronunciation": "[bɪˈkʌm]",
        "examples": [
            "He wants to become a doctor (그는 의사가 되고 싶어합니다).",
            "She became very famous (그녀는 매우 유명해졌습니다).",
            "It is becoming cold outside (밖이 추워지고 있습니다)."
        ]
    },
    {
        "korean": "의미하다",
        "english": "mean",
        "pronunciation": "[min]",
        "examples": [
            "What does this word mean? (이 단어는 무슨 뜻인가요?)",
            "She means well (그녀는 선의로 말합니다).",
            "I didn't mean to hurt you (당신을 다치게 하려던 것은 아니에요)."
        ]
    },
    {
        "korean": "유지하다",
        "english": "keep",
        "pronunciation": "[kip]",
        "examples": [
            "Keep the change (잔돈은 가지세요).",
            "She keeps her room clean (그녀는 방을 깨끗하게 유지합니다).",
            "I keep forgetting his name (나는 그의 이름을 계속 잊어버려요)."
        ]
    },
    {
        "korean": "시작하다",
        "english": "start",
        "pronunciation": "[stɑrt]",
        "examples": [
            "We will start the meeting at 9 AM (우리는 오전 9시에 회의를 시작할 것입니다).",
            "She started a new job last month (그녀는 지난달에 새 일을 시작했습니다).",
            "Let's start with the basics (기본부터 시작합시다)."
        ]
    },
    {
        "korean": "가지다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "examples": [
            "Please take a seat (자리에 앉아 주세요).",
            "She took the book from the shelf (그녀는 책장에서 책을 꺼냈습니다).",
            "I take a walk every morning (나는 매일 아침 산책을 합니다)."
        ]
    },
    {
        "korean": "주다",
        "english": "give",
        "pronunciation": "[ɡɪv]",
        "examples": [
            "Can you give me a hand? (저 좀 도와줄 수 있나요?)",
            "She gave him a gift (그녀는 그에게 선물을 주었습니다).",
            "I give my time to volunteer work (나는 자원봉사에 내 시간을 바칩니다)."
        ]
    },
    {
        "korean": "쓰다",
        "english": "write",
        "pronunciation": "[raɪt]",
        "examples": [
            "I write in my journal every night (나는 매일 밤 일기에 씁니다).",
            "She wrote a letter to her friend (그녀는 친구에게 편지를 썼습니다).",
            "He is writing a book (그는 책을 쓰고 있습니다)."
        ]
    },
    {
        "korean": "놀다",
        "english": "play",
        "pronunciation": "[pleɪ]",
        "examples": [
            "The children play in the park (아이들은 공원에서 놉니다).",
            "She plays the piano beautifully (그녀는 피아노를 아름답게 연주합니다).",
            "Do you want to play a game? (게임을 하고 싶나요?)"
        ]
    },
    {
        "korean": "보다",
        "english": "see",
        "pronunciation": "[siː]",
        "examples": [
            "I see a bird in the tree (나무에 새가 보여요).",
            "Did you see that movie? (그 영화를 봤나요?)",
            "She sees her friends every weekend (그녀는 주말마다 친구들을 만납니다)."
        ]
    },
    {
        "korean": "추가하다",
        "english": "add",
        "pronunciation": "[æd]",
        "examples": [
            "Please add more sugar to the tea (차에 설탕을 더 넣어주세요).",
            "She added some comments to the report (그녀는 보고서에 몇 가지 의견을 추가했습니다).",
            "I will add you to the list (당신을 목록에 추가할게요)."
        ]
    },
    {
        "korean": "서다",
        "english": "stand",
        "pronunciation": "[stænd]",
        "examples": [
            "Please stand up (일어서 주세요).",
            "She stood by the window (그녀는 창문 옆에 서 있었습니다).",
            "I can't stand this heat (이 더위를 참을 수 없어요)."
        ]
    },
    {
        "korean": "오다",
        "english": "come",
        "pronunciation": "[kʌm]",
        "examples": [
            "Can you come here for a moment? (잠깐 여기로 올 수 있나요?)",
            "She came to my house yesterday (그녀는 어제 내 집에 왔습니다).",
            "He comes to work by train (그는 기차로 출근합니다)."
        ]
    },
    {
        "korean": "힘을 주다",
        "english": "power",
        "pronunciation": "[ˈpaʊər]",
        "examples": [
            "This device is powered by solar energy (이 장치는 태양 에너지로 구동됩니다).",
            "She has the power to change things (그녀는 변화를 일으킬 힘이 있습니다).",
            "They powered through the project (그들은 그 프로젝트를 강행했습니다)."
        ]
    },
    {
        "korean": "돕다",
        "english": "help",
        "pronunciation": "[hɛlp]",
        "examples": [
            "Can you help me with this task? (이 작업을 도와줄 수 있나요?)",
            "She helps her neighbors often (그녀는 종종 이웃을 돕습니다).",
            "He helped me carry the boxes (그는 내게 상자를 옮기는 것을 도와주었습니다)."
        ]
    },
    {
        "korean": "돌리다",
        "english": "turn",
        "pronunciation": "[tɜrn]",
        "examples": [
            "Please turn off the lights (불을 꺼 주세요).",
            "She turned the key in the lock (그녀는 자물쇠에 열쇠를 돌렸습니다).",
            "Turn left at the next intersection (다음 교차로에서 좌회전하세요)."
        ]
    },
    {
        "korean": "찾다",
        "english": "find",
        "pronunciation": "[faɪnd]",
        "examples": [
            "I can't find my keys (내 열쇠를 찾을 수가 없어요).",
            "She found a great place to eat (그녀는 먹기 좋은 장소를 찾았습니다).",
            "Did you find the information you needed? (필요한 정보를 찾았나요?)"
        ]
    },
    {
        "korean": "할 수 있었다",
        "english": "could",
        "pronunciation": "[kʊd]",
        "examples": [
            "I could swim when I was a child (나는 어렸을 때 수영을 할 수 있었습니다).",
            "She said she could help (그녀는 도와줄 수 있다고 말했습니다).",
            "Could you pass the salt, please? (소금을 건네주실 수 있나요?)"
        ]
    },
    {
        "korean": "알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "Do you know her? (그녀를 아나요?)",
            "He knows a lot about history (그는 역사에 대해 많이 알고 있습니다).",
            "She knew the answer (그녀는 정답을 알고 있었습니다)."
        ]
    },
    {
        "korean": "가지다",
        "english": "take",
        "pronunciation": "[teɪk]",
        "examples": [
            "Please take a seat (자리에 앉아 주세요).",
            "She took the book from the shelf (그녀는 책장에서 책을 꺼냈습니다).",
            "I take a walk every morning (나는 매일 아침 산책을 합니다)."
        ]
    },
    {
        "korean": "사용하다",
        "english": "use",
        "pronunciation": "[juz]",
        "examples": [
            "Can I use your phone? (당신의 전화기를 사용해도 될까요?)",
            "She uses a laptop for work (그녀는 일을 위해 노트북을 사용합니다).",
            "We use public transportation every day (우리는 매일 대중교통을 이용합니다)."
        ]
    },
    {
        "korean": "만들다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "I make breakfast every morning (나는 매일 아침 식사를 만듭니다).",
            "She made a cake for the party (그녀는 파티를 위해 케이크를 만들었습니다).",
            "They make a good team (그들은 좋은 팀을 만듭니다)."
        ]
    },
    {
        "korean": "생각하다",
        "english": "think",
        "pronunciation": "[θɪŋk]",
        "examples": [
            "I think it will rain tomorrow (나는 내일 비가 올 것 같아요).",
            "She thinks about her future often (그녀는 종종 자신의 미래에 대해 생각합니다).",
            "Do you think this is a good idea? (이것이 좋은 아이디어라고 생각하나요?)"
        ]
    },
    {
        "korean": "보다",
        "english": "look",
        "pronunciation": "[lʊk]",
        "examples": [
            "Look at the stars (별들을 보세요).",
            "She looked out the window (그녀는 창밖을 보았습니다).",
            "I look forward to meeting you (당신을 만나기를 고대합니다)."
        ]
    },
    {
        "korean": "얻다",
        "english": "get",
        "pronunciation": "[ɡɛt]",
        "examples": [
            "Can you get me some water? (물 좀 가져다줄 수 있나요?)",
            "He got a new job (그는 새로운 일을 얻었습니다).",
            "She gets up early every morning (그녀는 매일 아침 일찍 일어납니다)."
        ]
    },
    {
        "korean": "부르다",
        "english": "call",
        "pronunciation": "[kɔl]",
        "examples": [
            "I will call you later (나중에 전화할게요).",
            "She called her friend to talk (그녀는 친구에게 전화를 걸었습니다).",
            "Call me if you need help (도움이 필요하면 전화하세요)."
        ]
    },
    {
        "korean": "하다",
        "english": "do",
        "pronunciation": "[duː]",
        "examples": [
            "I do my homework every day (나는 매일 숙제를 합니다).",
            "She does yoga every morning (그녀는 매일 아침 요가를 합니다).",
            "Do you like ice cream? (아이스크림을 좋아하나요?)"
        ]
    },
    {
        "korean": "묻다",
        "english": "ask",
        "pronunciation": "[æsk]",
        "examples": [
            "Can I ask you a question? (질문 하나 해도 될까요?)",
            "She asked for directions (그녀는 길을 물었습니다).",
            "I asked him to help me (나는 그에게 도와달라고 요청했습니다)."
        ]
    },
    {
        "korean": "보다",
        "english": "see",
        "pronunciation": "[siː]",
        "examples": [
            "I see a bird in the tree (나무에 새가 보여요).",
            "Did you see that movie? (그 영화를 봤나요?)",
            "She sees her friends every weekend (그녀는 주말마다 친구들을 만납니다)."
        ]
    },
    {
        "korean": "필요하다",
        "english": "need",
        "pronunciation": "[nid]",
        "examples": [
            "I need some help (나는 도움이 필요해요).",
            "She needs to rest (그녀는 쉬어야 해요).",
            "Do you need anything else? (다른 것이 필요하신가요?)"
        ]
    },
    {
        "korean": "떠나다",
        "english": "leave",
        "pronunciation": "[liv]",
        "examples": [
            "I will leave the office at 6 PM (나는 오후 6시에 사무실을 떠날 것입니다).",
            "She left her bag at home (그녀는 가방을 집에 두고 왔습니다).",
            "Don't leave without saying goodbye (작별 인사를 하지 않고 떠나지 마세요)."
        ]
    },
    {
        "korean": "오다",
        "english": "come",
        "pronunciation": "[kʌm]",
        "examples": [
            "Can you come here for a moment? (잠깐 여기로 올 수 있나요?)",
            "She came to my house yesterday (그녀는 어제 내 집에 왔습니다).",
            "He comes to work by train (그는 기차로 출근합니다)."
        ]
    },
    {
        "korean": "보이다",
        "english": "seem",
        "pronunciation": "[siːm]",
        "examples": [
            "She seems happy (그녀는 행복해 보입니다).",
            "It seems like a good idea (좋은 생각인 것 같아요).",
            "He seems to know everything (그는 모든 것을 알고 있는 것 같아요)."
        ]
    },
    {
        "korean": "계속하다",
        "english": "continue",
        "pronunciation": "[kənˈtɪnju]",
        "examples": [
            "We will continue our discussion later (우리는 나중에 논의를 계속할 것입니다).",
            "She continued to work despite the pain (그녀는 통증에도 불구하고 일을 계속했습니다).",
            "Please continue with your story (당신의 이야기를 계속해 주세요)."
        ]
    },
    {
        "korean": "이해하다",
        "english": "understand",
        "pronunciation": "[ˌʌndərˈstænd]",
        "examples": [
            "I don't understand this problem (나는 이 문제를 이해하지 못하겠어요).",
            "She understands the importance of education (그녀는 교육의 중요성을 이해합니다).",
            "Do you understand what I mean? (내 말이 무슨 뜻인지 알겠어요?)"
        ]
    },
    {
        "korean": "따르다",
        "english": "follow",
        "pronunciation": "[ˈfɑloʊ]",
        "examples": [
            "Please follow me (나를 따라오세요).",
            "She follows her dreams (그녀는 자신의 꿈을 따릅니다).",
            "He followed the instructions carefully (그는 지시를 주의 깊게 따랐습니다)."
        ]
    },
    {
        "korean": "배우다",
        "english": "learn",
        "pronunciation": "[lɜrn]",
        "examples": [
            "I want to learn a new language (나는 새로운 언어를 배우고 싶습니다).",
            "She is learning to play the piano (그녀는 피아노를 배우고 있습니다).",
            "We learned a lot from the experience (우리는 그 경험에서 많은 것을 배웠습니다)."
        ]
    },
    {
        "korean": "변하다",
        "english": "change",
        "pronunciation": "[ʧeɪndʒ]",
        "examples": [
            "I need to change my clothes (나는 옷을 갈아입어야 해요).",
            "She changed her mind (그녀는 마음을 바꿨습니다).",
            "The weather changes quickly here (여기 날씨는 빨리 변합니다)."
        ]
    },
    {
        "korean": "일어나다",
        "english": "happen",
        "pronunciation": "[ˈhæpən]",
        "examples": [
            "Accidents can happen anytime (사고는 언제든지 일어날 수 있습니다).",
            "What happened here? (여기서 무슨 일이 일어났나요?)",
            "She made it happen (그녀는 그것을 이루었습니다)."
        ]
    },
    {
        "korean": "말하다",
        "english": "speak",
        "pronunciation": "[spiːk]",
        "examples": [
            "Can you speak louder? (좀 더 크게 말해줄 수 있나요?)",
            "She speaks three languages (그녀는 세 가지 언어를 말합니다).",
            "He spoke to the audience (그는 청중에게 연설했습니다)."
        ]
    },
    {
        "korean": "보다",
        "english": "watch",
        "pronunciation": "[wɑʧ]",
        "examples": [
            "I like to watch movies (나는 영화를 보는 것을 좋아합니다).",
            "She watched the sunset (그녀는 일몰을 보았습니다).",
            "He watches TV every evening (그는 매일 저녁 TV를 봅니다)."
        ]
    },
    {
        "korean": "살다",
        "english": "live",
        "pronunciation": "[lɪv]",
        "examples": [
            "I live in New York (나는 뉴욕에 살아요).",
            "She lives with her parents (그녀는 부모님과 함께 삽니다).",
            "We live in a small apartment (우리는 작은 아파트에 삽니다)."
        ]
    },
    {
        "korean": "믿다",
        "english": "believe",
        "pronunciation": "[bɪˈliv]",
        "examples": [
            "I believe in you (나는 당신을 믿어요).",
            "She believes in hard work (그녀는 열심히 일하는 것을 믿습니다).",
            "They believe that honesty is the best policy (그들은 정직이 최선의 정책이라고 믿습니다)."
        ]
    },
    {
        "korean": "쥐다",
        "english": "hold",
        "pronunciation": "[hoʊld]",
        "examples": [
            "Can you hold this for me? (이거 좀 잡아줄 수 있나요?)",
            "She held the baby in her arms (그녀는 아기를 품에 안았습니다).",
            "He holds a meeting every Monday (그는 매주 월요일에 회의를 엽니다)."
        ]
    },
    {
        "korean": "가져오다",
        "english": "bring",
        "pronunciation": "[brɪŋ]",
        "examples": [
            "Can you bring me a glass of water? (물 한 잔 가져다줄 수 있나요?)",
            "She brought a gift for the host (그녀는 주인에게 선물을 가져왔습니다).",
            "Don't forget to bring your book (책을 가져오는 것을 잊지 마세요)."
        ]
    },
    {
        "korean": "쓰다",
        "english": "write",
        "pronunciation": "[raɪt]",
        "examples": [
            "I write in my journal every night (나는 매일 밤 일기에 씁니다).",
            "She wrote a letter to her friend (그녀는 친구에게 편지를 썼습니다).",
            "He is writing a book (그는 책을 쓰고 있습니다)."
        ]
    },
    {
        "korean": "짓다",
        "english": "build",
        "pronunciation": "[bɪld]",
        "examples": [
            "They are building a new house (그들은 새 집을 짓고 있습니다).",
            "He built a treehouse for his kids (그는 아이들을 위해 나무 집을 지었습니다).",
            "She wants to build her own company (그녀는 자신의 회사를 세우고 싶어합니다)."
        ]
    },
    {
        "korean": "머무르다",
        "english": "stay",
        "pronunciation": "[steɪ]",
        "examples": [
            "Can you stay for dinner? (저녁 먹고 갈래요?)",
            "She stayed at a hotel (그녀는 호텔에 머물렀습니다).",
            "I will stay here until you come back (나는 당신이 돌아올 때까지 여기 있을게요)."
        ]
    },
    {
        "korean": "떨어지다",
        "english": "fall",
        "pronunciation": "[fɔl]",
        "examples": [
            "The leaves fall in autumn (가을에는 나뭇잎이 떨어집니다).",
            "She fell off the bike (그녀는 자전거에서 떨어졌습니다).",
            "He fell asleep during the movie (그는 영화 도중에 잠들었습니다)."
        ]
    },
    {
        "korean": "자르다",
        "english": "cut",
        "pronunciation": "[kʌt]",
        "examples": [
            "Can you cut the cake? (케이크를 잘라줄 수 있나요?)",
            "She cut her finger while cooking (그녀는 요리하다가 손가락을 베었습니다).",
            "I cut my hair yesterday (나는 어제 머리를 잘랐습니다)."
        ]
    },
    {
        "korean": "닿다",
        "english": "reach",
        "pronunciation": "[riʧ]",
        "examples": [
            "I can't reach the top shelf (나는 맨 위 선반에 닿지 않아요).",
            "She reached out to help him (그녀는 그를 돕기 위해 손을 내밀었습니다).",
            "We reached our destination (우리는 목적지에 도착했습니다)."
        ]
    },
    {
        "korean": "죽이다",
        "english": "kill",
        "pronunciation": "[kɪl]",
        "examples": [
            "The disease killed many people (그 병은 많은 사람들을 죽였습니다).",
            "He killed the spider (그는 거미를 죽였습니다).",
            "She was killed in an accident (그녀는 사고로 사망했습니다)."
        ]
    },
    {
        "korean": "남다",
        "english": "remain",
        "pronunciation": "[rɪˈmeɪn]",
        "examples": [
            "Only a few seats remain (몇 자리만 남았습니다).",
            "She remained calm during the crisis (그녀는 위기 상황에서도 침착했습니다).",
            "The building remains in good condition (그 건물은 여전히 좋은 상태를 유지하고 있습니다)."
        ]
    },
    {
        "korean": "두다",
        "english": "set",
        "pronunciation": "[sɛt]",
        "examples": [
            "Please set the table for dinner (저녁 식사를 위해 테이블을 세팅해 주세요).",
            "She set the alarm for 6 AM (그녀는 알람을 오전 6시에 맞췄습니다).",
            "He set a goal to run a marathon (그는 마라톤을 목표로 세웠습니다)."
        ]
    },
    {
        "korean": "바꾸다",
        "english": "change",
        "pronunciation": "[ʧeɪndʒ]",
        "examples": [
            "I need to change my clothes (나는 옷을 갈아입어야 해요).",
            "She changed her mind (그녀는 마음을 바꿨습니다).",
            "The weather changes quickly here (여기 날씨는 빨리 변합니다)."
        ]
    },
    {
        "korean": "이끌다",
        "english": "lead",
        "pronunciation": "[lid]",
        "examples": [
            "He leads a team of engineers (그는 엔지니어 팀을 이끕니다).",
            "She led the way to the park (그녀는 공원으로 가는 길을 이끌었습니다).",
            "Good leaders lead by example (좋은 리더는 모범을 보이며 이끕니다)."
        ]
    },
    {
        "korean": "보다",
        "english": "watch",
        "pronunciation": "[wɑʧ]",
        "examples": [
            "I like to watch movies (나는 영화를 보는 것을 좋아합니다).",
            "She watched the sunset (그녀는 일몰을 보았습니다).",
            "He watches TV every evening (그는 매일 저녁 TV를 봅니다)."
        ]
    },
    {
        "korean": "따르다",
        "english": "follow",
        "pronunciation": "[ˈfɑloʊ]",
        "examples": [
            "Please follow me (나를 따라오세요).",
            "She follows her dreams (그녀는 자신의 꿈을 따릅니다).",
            "He followed the instructions carefully (그는 지시를 주의 깊게 따랐습니다)."
        ]
    },
    {
        "korean": "멈추다",
        "english": "stop",
        "pronunciation": "[stɑp]",
        "examples": [
            "Please stop talking (이야기를 멈춰 주세요).",
            "She stopped to take a break (그녀는 쉬기 위해 멈췄습니다).",
            "The bus stopped at the station (버스는 정류장에 멈췄습니다)."
        ]
    },
    {
        "korean": "만들다",
        "english": "create",
        "pronunciation": "[kriˈeɪt]",
        "examples": [
            "She loves to create art (그녀는 예술을 창작하는 것을 좋아합니다).",
            "They created a new software (그들은 새로운 소프트웨어를 만들었습니다).",
            "Can you create a presentation for the meeting? (회의를 위한 발표 자료를 만들 수 있나요?)"
        ]
    },
    {
        "korean": "말하다",
        "english": "speak",
        "pronunciation": "[spiːk]",
        "examples": [
            "Can you speak louder? (좀 더 크게 말해줄 수 있나요?)",
            "She speaks three languages (그녀는 세 가지 언어를 말합니다).",
            "He spoke to the audience (그는 청중에게 연설했습니다)."
        ]
    },
    {
        "korean": "읽다",
        "english": "read",
        "pronunciation": "[rid]",
        "examples": [
            "I read a book every night (나는 매일 밤 책을 읽습니다).",
            "She reads the newspaper every morning (그녀는 매일 아침 신문을 읽습니다).",
            "He likes to read science fiction (그는 과학 소설을 읽는 것을 좋아합니다)."
        ]
    },
    {
        "korean": "허락하다",
        "english": "allow",
        "pronunciation": "[əˈlaʊ]",
        "examples": [
            "Please allow me to explain (설명하게 해 주세요).",
            "They don't allow pets in this building (이 건물에서는 애완동물을 허용하지 않습니다).",
            "She allowed him to go to the party (그녀는 그가 파티에 가도록 허락했습니다)."
        ]
    },
    {
        "korean": "추가하다",
        "english": "add",
        "pronunciation": "[æd]",
        "examples": [
            "Please add more sugar to the tea (차에 설탕을 더 넣어주세요).",
            "She added some comments to the report (그녀는 보고서에 몇 가지 의견을 추가했습니다).",
            "I will add you to the list (당신을 목록에 추가할게요)."
        ]
    },
    {
        "korean": "쓰다",
        "english": "spend",
        "pronunciation": "[spɛnd]",
        "examples": [
            "I spend a lot of time reading (나는 많은 시간을 독서에 보냅니다).",
            "She spends money wisely (그녀는 돈을 현명하게 씁니다).",
            "We spent the weekend at the beach (우리는 주말을 해변에서 보냈습니다)."
        ]
    },
    {
        "korean": "자라다",
        "english": "grow",
        "pronunciation": "[ɡroʊ]",
        "examples": [
            "Children grow up so fast (아이들은 정말 빨리 자랍니다).",
            "She grows her own vegetables (그녀는 자신의 채소를 재배합니다).",
            "The company is growing rapidly (그 회사는 급속히 성장하고 있습니다)."
        ]
    },
    {
        "korean": "열다",
        "english": "open",
        "pronunciation": "[ˈoʊpən]",
        "examples": [
            "Can you open the door? (문을 열어줄 수 있나요?)",
            "She opened a new store (그녀는 새로운 가게를 열었습니다).",
            "He opened his book to read (그는 책을 펴서 읽었습니다)."
        ]
    },
    {
        "korean": "걷다",
        "english": "walk",
        "pronunciation": "[wɔk]",
        "examples": [
            "I walk to work every day (나는 매일 걸어서 출근합니다).",
            "She walked in the park (그녀는 공원에서 걸었습니다).",
            "He walks his dog every morning (그는 매일 아침 개를 산책시킵니다)."
        ]
    },
    {
        "korean": "이기다",
        "english": "win",
        "pronunciation": "[wɪn]",
        "examples": [
            "Our team won the game (우리 팀이 경기를 이겼습니다).",
            "She wins every time (그녀는 매번 이깁니다).",
            "He wants to win the competition (그는 대회에서 이기고 싶어합니다)."
        ]
    },
    {
        "korean": "제안하다",
        "english": "offer",
        "pronunciation": "[ˈɔfər]",
        "examples": [
            "Can I offer you a drink? (음료를 드릴까요?)",
            "She offered her help (그녀는 도와주겠다고 제안했습니다).",
            "He offered to drive me home (그는 나를 집에 데려다주겠다고 제안했습니다)."
        ]
    }
];




let currentWordIndex = 0;
let pronounceInterval;
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

            setTimeout(() => {
                synth.speak(koreanUtterance);
            }, 500); // 0.5초 지연

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
                            setTimeout(speakExample, 1000); // 1초 간격
                        };
                        synth.speak(exampleUtterance);
                    } else {
                        count++;
                        if (count < times) {
                            setTimeout(speak, 1000); // 1초 후 다음 발음 시작
                        } else if (callback) {
                            callback();
                        }
                    }
                }
                speakExample();
            };
        }
    }

    speak();
}

function stopPronouncing() {
    clearInterval(pronounceInterval);
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