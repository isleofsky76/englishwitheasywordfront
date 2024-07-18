const words = [
    { 
        korean: "비교하다", 
        english: "Compare", 
        pronunciation: "[kəmˈpɛər]",
        examples: [
            "Can you compare these two products?",
            "I want to compare prices before buying.",
            "Let's compare our notes after the meeting."
        ]
    },
    { 
        korean: "설명하다", 
        english: "Explain", 
        pronunciation: "[ɪkˈspleɪn]",
        examples: [
            "Can you explain this to me?",
            "She will explain the rules to everyone.",
            "I need someone to explain how this works."
        ]
    },
    { 
        korean: "제안하다", 
        english: "Suggest", 
        pronunciation: "[səˈdʒɛst]",
        examples: [
            "I suggest we take a break.",
            "What do you suggest we do next?",
            "She suggested a new restaurant for dinner."
        ]
    },
    { 
        korean: "통합하다", 
        english: "Unify", 
        pronunciation: "[ˈjuːnɪfaɪ]",
        examples: [
            "The new policy will unify the departments.",
            "They are working to unify the different systems.",
            "Efforts are being made to unify the community."
        ]
    },
    { 
        korean: "먹다", 
        english: "Eat", 
        pronunciation: "[iːt]",
        examples: [
            "I want to eat dinner.",
            "Let's eat some fruit.",
            "He eats very fast."
        ]
    },
    { 
        korean: "마시다", 
        english: "Drink", 
        pronunciation: "[drɪŋk]",
        examples: [
            "I drink coffee every morning.",
            "She likes to drink tea.",
            "Let's drink some water."
        ]
    },
    { 
        korean: "자다", 
        english: "Sleep", 
        pronunciation: "[sliːp]",
        examples: [
            "I need to sleep early tonight.",
            "He likes to sleep late.",
            "She is sleeping right now."
        ]
    },
    { 
        korean: "가다", 
        english: "Go", 
        pronunciation: "[ɡoʊ]",
        examples: [
            "I need to go to the store.",
            "Let's go to the park.",
            "He is going to school."
        ]
    },
    { 
        korean: "오다", 
        english: "Come", 
        pronunciation: "[kʌm]",
        examples: [
            "Can you come here?",
            "She will come to the party.",
            "He is coming home."
        ]
    },
    { 
        korean: "보다", 
        english: "See", 
        pronunciation: "[siː]",
        examples: [
            "I want to see the movie.",
            "Can you see that?",
            "He sees a bird."
        ]
    },
    { 
        korean: "듣다", 
        english: "Hear", 
        pronunciation: "[hɪr]",
        examples: [
            "Can you hear me?",
            "I hear music.",
            "She hears a noise."
        ]
    },
    { 
        korean: "만나다", 
        english: "Meet", 
        pronunciation: "[miːt]",
        examples: [
            "Let's meet at the cafe.",
            "I will meet you there.",
            "They are meeting today."
        ]
    },
    { 
        korean: "쓰다", 
        english: "Write", 
        pronunciation: "[raɪt]",
        examples: [
            "I need to write a letter.",
            "She likes to write stories.",
            "He is writing in his notebook."
        ]
    },
    { 
        korean: "읽다", 
        english: "Read", 
        pronunciation: "[riːd]",
        examples: [
            "I like to read books.",
            "Can you read this?",
            "She reads every day."
        ]
    },
    { 
        korean: "걷다", 
        english: "Walk", 
        pronunciation: "[wɔːk]",
        examples: [
            "Let's go for a walk.",
            "He walks to school.",
            "She is walking in the park."
        ]
    },
    { 
        korean: "달리다", 
        english: "Run", 
        pronunciation: "[rʌn]",
        examples: [
            "I like to run in the morning.",
            "He runs very fast.",
            "She is running now."
        ]
    },
    { 
        korean: "놀다", 
        english: "Play", 
        pronunciation: "[pleɪ]",
        examples: [
            "Let's play a game.",
            "She likes to play with dolls.",
            "He is playing soccer."
        ]
    },
    { 
        korean: "웃다", 
        english: "Laugh", 
        pronunciation: "[læf]",
        examples: [
            "She makes me laugh.",
            "He laughs at jokes.",
            "They are laughing together."
        ]
    },
    { 
        korean: "울다", 
        english: "Cry", 
        pronunciation: "[kraɪ]",
        examples: [
            "The baby is crying.",
            "She cried at the sad movie.",
            "He cries when he is sad."
        ]
    },
    { 
        korean: "일하다", 
        english: "Work", 
        pronunciation: "[wɜːrk]",
        examples: [
            "I work at a bank.",
            "She works hard.",
            "He is working now."
        ]
    },
    { 
        korean: "공부하다", 
        english: "Study", 
        pronunciation: "[ˈstʌdi]",
        examples: [
            "I need to study for the exam.",
            "She studies every night.",
            "He is studying math."
        ]
    },
    { 
        korean: "말하다", 
        english: "Speak", 
        pronunciation: "[spiːk]",
        examples: [
            "Can you speak English?",
            "She speaks very well.",
            "He is speaking now."
        ]
    },
    { 
        korean: "배우다", 
        english: "Learn", 
        pronunciation: "[lɜːrn]",
        examples: [
            "I want to learn a new language.",
            "She learns quickly.",
            "He is learning to swim."
        ]
    },
    { 
        korean: "사다", 
        english: "Buy", 
        pronunciation: "[baɪ]",
        examples: [
            "I need to buy groceries.",
            "She buys clothes online.",
            "He is buying a new car."
        ]
    },
    { 
        korean: "팔다", 
        english: "Sell", 
        pronunciation: "[sɛl]",
        examples: [
            "They sell fresh vegetables.",
            "She sells handmade jewelry.",
            "He is selling his old bike."
        ]
    },
    { 
        korean: "만들다", 
        english: "Make", 
        pronunciation: "[meɪk]",
        examples: [
            "I will make a cake.",
            "She makes beautiful art.",
            "He is making a model."
        ]
    },
    { 
        korean: "만지다", 
        english: "Touch", 
        pronunciation: "[tʌtʃ]",
        examples: [
            "Don't touch the hot stove.",
            "She touched the soft fabric.",
            "He is touching the screen."
        ]
    },
    { 
        korean: "느끼다", 
        english: "Feel", 
        pronunciation: "[fiːl]",
        examples: [
            "I feel happy today.",
            "She feels cold.",
            "He is feeling better now."
        ]
    },
    { 
        korean: "보내다", 
        english: "Send", 
        pronunciation: "[sɛnd]",
        examples: [
            "I will send you a message.",
            "She sends letters to her family.",
            "He is sending an email."
        ]
    },
    { 
        korean: "받다", 
        english: "Receive", 
        pronunciation: "[rɪˈsiːv]",
        examples: [
            "Did you receive my letter?",
            "She received a gift.",
            "He is receiving a package."
        ]
    },
    { 
        korean: "도와주다", 
        english: "Help", 
        pronunciation: "[hɛlp]",
        examples: [
            "Can you help me?",
            "She helps her friends.",
            "He is helping his neighbor."
        ]
    },
    { 
        korean: "열다", 
        english: "Open", 
        pronunciation: "[ˈoʊpən]",
        examples: [
            "Can you open the door?",
            "She opened her book.",
            "He is opening the window."
        ]
    },
    { 
        korean: "닫다", 
        english: "Close", 
        pronunciation: "[kloʊz]",
        examples: [
            "Please close the door.",
            "She closed her eyes.",
            "He is closing the store."
        ]
    },
    { 
        korean: "운전하다", 
        english: "Drive", 
        pronunciation: "[draɪv]",
        examples: [
            "Can you drive a car?",
            "She drives to work.",
            "He is driving now."
        ]
    },
    { 
        korean: "타다", 
        english: "Ride", 
        pronunciation: "[raɪd]",
        examples: [
            "I like to ride my bike.",
            "She rides the bus every day.",
            "He is riding a horse."
        ]
    },
    { 
        korean: "부르다", 
        english: "Call", 
        pronunciation: "[kɔːl]",
        examples: [
            "Can you call me later?",
            "She calls her parents every week.",
            "He is calling his friend."
        ]
    },
    { 
        korean: "멈추다", 
        english: "Stop", 
        pronunciation: "[stɑːp]",
        examples: [
            "Please stop talking.",
            "She stopped to rest.",
            "He is stopping the car."
        ]
    },
    { 
        korean: "시작하다", 
        english: "Start", 
        pronunciation: "[stɑːrt]",
        examples: [
            "Let's start the meeting.",
            "She started a new hobby.",
            "He is starting his homework."
        ]
    },
    { 
        korean: "끝내다", 
        english: "Finish", 
        pronunciation: "[ˈfɪnɪʃ]",
        examples: [
            "I need to finish my work.",
            "She finished her book.",
            "He is finishing his lunch."
        ]
    },
    { 
        korean: "사랑하다", 
        english: "Love", 
        pronunciation: "[lʌv]",
        examples: [
            "I love my family.",
            "She loves to read.",
            "He loves playing soccer."
        ]
    },
    { 
        korean: "싫어하다", 
        english: "Hate", 
        pronunciation: "[heɪt]",
        examples: [
            "I hate getting up early.",
            "She hates loud noises.",
            "He hates doing homework."
        ]
    },
    { 
        korean: "기다리다", 
        english: "Wait", 
        pronunciation: "[weɪt]",
        examples: [
            "Can you wait a moment?",
            "She waits for the bus.",
            "He is waiting for his friend."
        ]
    },
    { 
        korean: "기억하다", 
        english: "Remember", 
        pronunciation: "[rɪˈmɛmbər]",
        examples: [
            "I remember your name.",
            "She remembers the song.",
            "He is remembering the event."
        ]
    },
    { 
        korean: "잊다", 
        english: "Forget", 
        pronunciation: "[fərˈɡɛt]",
        examples: [
            "I forgot my keys.",
            "She forgets things easily.",
            "He is forgetting the address."
        ]
    },
    { 
        korean: "알다", 
        english: "Know", 
        pronunciation: "[noʊ]",
        examples: [
            "I know the answer.",
            "She knows a lot of people.",
            "He knows how to swim."
        ]
    },
    { 
        korean: "생각하다", 
        english: "Think", 
        pronunciation: "[θɪŋk]",
        examples: [
            "I think it's a good idea.",
            "She thinks about her future.",
            "He is thinking of a solution."
        ]
    },
    { 
        korean: "기대하다", 
        english: "Expect", 
        pronunciation: "[ɪkˈspɛkt]",
        examples: [
            "I expect good results.",
            "She expects a call.",
            "He is expecting visitors."
        ]
    },
    { 
        korean: "추측하다", 
        english: "Guess", 
        pronunciation: "[ɡɛs]",
        examples: [
            "Can you guess the answer?",
            "She guessed the right number.",
            "He is guessing what will happen."
        ]
    },
    { 
        korean: "시도하다", 
        english: "Try", 
        pronunciation: "[traɪ]",
        examples: [
            "I will try my best.",
            "She tries to learn new things.",
            "He is trying to fix it."
        ]
    },
    { 
        korean: "보이다", 
        english: "Show", 
        pronunciation: "[ʃoʊ]",
        examples: [
            "Can you show me the way?",
            "She showed her new dress.",
            "He is showing his project."
        ]
    },
    { 
        korean: "사용하다", 
        english: "Use", 
        pronunciation: "[juːz]",
        examples: [
            "I use my phone every day.",
            "She uses a computer for work.",
            "He is using the new software."
        ]
    },
    { 
        korean: "구매하다", 
        english: "Purchase", 
        pronunciation: "[ˈpɜːrtʃəs]",
        examples: [
            "I need to purchase a new laptop.",
            "She purchased a gift online.",
            "He is purchasing some groceries."
        ]
    },
    { 
        korean: "보내다", 
        english: "Send", 
        pronunciation: "[sɛnd]",
        examples: [
            "Can you send me the document?",
            "She sent a thank-you note.",
            "He is sending an email."
        ]
    },
    { 
        korean: "받다", 
        english: "Get", 
        pronunciation: "[ɡɛt]",
        examples: [
            "Did you get my message?",
            "She got a new job.",
            "He is getting ready for school."
        ]
    },
    { 
        korean: "생각하다", 
        english: "Consider", 
        pronunciation: "[kənˈsɪdər]",
        examples: [
            "Please consider my suggestion.",
            "She considered the offer carefully.",
            "He is considering his options."
        ]
    },
    { 
        korean: "탐험하다", 
        english: "Explore", 
        pronunciation: "[ɪkˈsplɔːr]",
        examples: [
            "Let's explore the city.",
            "She loves to explore new places.",
            "He is exploring the forest."
        ]
    },
    { 
        korean: "찾다", 
        english: "Find", 
        pronunciation: "[faɪnd]",
        examples: [
            "Can you find my keys?",
            "She found a great restaurant.",
            "He is finding it difficult to decide."
        ]
    },
    { 
        korean: "시작하다", 
        english: "Begin", 
        pronunciation: "[bɪˈɡɪn]",
        examples: [
            "Let's begin the lesson.",
            "She began to sing.",
            "He is beginning a new chapter."
        ]
    },
    { 
        korean: "보호하다", 
        english: "Protect", 
        pronunciation: "[prəˈtɛkt]",
        examples: [
            "Can you protect the environment?",
            "She protects her children.",
            "He is protecting his rights."
        ]
    },
    { 
        korean: "성장하다", 
        english: "Grow", 
        pronunciation: "[ɡroʊ]",
        examples: [
            "Plants need water to grow.",
            "She grew up in a small town.",
            "He is growing tomatoes in the garden."
        ]
    },
    { 
        korean: "기다리다", 
        english: "Wait", 
        pronunciation: "[weɪt]",
        examples: [
            "Can you wait here?",
            "She waited for the bus.",
            "He is waiting for his friend."
        ]
    },
    { 
        korean: "바꾸다", 
        english: "Change", 
        pronunciation: "[tʃeɪndʒ]",
        examples: [
            "I need to change my clothes.",
            "She changed her hairstyle.",
            "He is changing his plan."
        ]
    },
    { 
        korean: "믿다", 
        english: "Believe", 
        pronunciation: "[bɪˈliːv]",
        examples: [
            "Do you believe in magic?",
            "She believes in hard work.",
            "He is starting to believe in himself."
        ]
    },
    { 
        korean: "기다리다", 
        english: "Wait", 
        pronunciation: "[weɪt]",
        examples: [
            "Can you wait a moment?",
            "She waits for the bus.",
            "He is waiting for his friend."
        ]
    },
    { 
        korean: "연결하다", 
        english: "Connect", 
        pronunciation: "[kəˈnɛkt]",
        examples: [
            "Can you connect to the Wi-Fi?",
            "She connected the cables.",
            "He is connecting the dots."
        ]
    },
    { 
        korean: "만지다", 
        english: "Touch", 
        pronunciation: "[tʌtʃ]",
        examples: [
            "Don't touch that!",
            "She touched the screen.",
            "He is touching the painting."
        ]
    },
    { 
        korean: "비우다", 
        english: "Empty", 
        pronunciation: "[ˈɛmpti]",
        examples: [
            "Can you empty the trash?",
            "She emptied her bag.",
            "He is emptying the bottle."
        ]
    },
    { 
        korean: "준비하다", 
        english: "Prepare", 
        pronunciation: "[prɪˈpɛər]",
        examples: [
            "I need to prepare dinner.",
            "She prepared for the test.",
            "He is preparing his speech."
        ]
    },
    { 
        korean: "초대하다", 
        english: "Invite", 
        pronunciation: "[ɪnˈvaɪt]",
        examples: [
            "Can you invite her to the party?",
            "She invited me to dinner.",
            "He is inviting his friends."
        ]
    },
    { 
        korean: "이해하다", 
        english: "Understand", 
        pronunciation: "[ˌʌndərˈstænd]",
        examples: [
            "Do you understand the question?",
            "She understands the problem.",
            "He is trying to understand the lesson."
        ]
    },
    { 
        korean: "걱정하다", 
        english: "Worry", 
        pronunciation: "[ˈwɜːri]",
        examples: [
            "Don't worry about it.",
            "She worries about her exams.",
            "He is worrying too much."
        ]
    },
    { 
        korean: "응답하다", 
        english: "Reply", 
        pronunciation: "[rɪˈplaɪ]",
        examples: [
            "Can you reply to the email?",
            "She replied quickly.",
            "He is replying to the message."
        ]
    },
    { 
        korean: "시도하다", 
        english: "Attempt", 
        pronunciation: "[əˈtɛmpt]",
        examples: [
            "I will attempt to solve the problem.",
            "She attempted to climb the mountain.",
            "He is attempting a new recipe."
        ]
    },
    { 
        korean: "수리하다", 
        english: "Fix", 
        pronunciation: "[fɪks]",
        examples: [
            "Can you fix this?",
            "She fixed her bike.",
            "He is fixing the computer."
        ]
    },
    { 
        korean: "준비하다", 
        english: "Arrange", 
        pronunciation: "[əˈreɪndʒ]",
        examples: [
            "I will arrange a meeting.",
            "She arranged the flowers.",
            "He is arranging the chairs."
        ]
    },
    { 
        korean: "기억하다", 
        english: "Recall", 
        pronunciation: "[rɪˈkɔːl]",
        examples: [
            "Do you recall his name?",
            "She recalled the event.",
            "He is trying to recall the details."
        ]
    },
    { 
        korean: "들어가다", 
        english: "Enter", 
        pronunciation: "[ˈɛntər]",
        examples: [
            "Please enter your password.",
            "She entered the room.",
            "He is entering the building."
        ]
    },
    { 
        korean: "나가다", 
        english: "Leave", 
        pronunciation: "[liːv]",
        examples: [
            "I need to leave now.",
            "She left early.",
            "He is leaving for work."
        ]
    },
    { 
        korean: "기부하다", 
        english: "Donate", 
        pronunciation: "[ˈdoʊneɪt]",
        examples: [
            "Can you donate to the charity?",
            "She donates regularly.",
            "He is donating his old clothes."
        ]
    },
    { 
        korean: "기다리다", 
        english: "Await", 
        pronunciation: "[əˈweɪt]",
        examples: [
            "I await your response.",
            "She is awaiting her turn.",
            "He awaits the results."
        ]
    },
    { 
        korean: "필요하다", 
        english: "Need", 
        pronunciation: "[niːd]",
        examples: [
            "I need help with my homework.",
            "She needs a break.",
            "He needs to finish his project."
        ]
    },
    { 
        korean: "믿다", 
        english: "Trust", 
        pronunciation: "[trʌst]",
        examples: [
            "I trust you completely.",
            "She trusts her instincts.",
            "He is trusting his friend."
        ]
    },
    { 
        korean: "수락하다", 
        english: "Accept", 
        pronunciation: "[əkˈsɛpt]",
        examples: [
            "Can you accept my apology?",
            "She accepted the job offer.",
            "He is accepting the award."
        ]
    },
    { 
        korean: "시도하다", 
        english: "Attempt", 
        pronunciation: "[əˈtɛmpt]",
        examples: [
            "I will attempt to solve this.",
            "She attempted to answer.",
            "He is attempting the challenge."
        ]
    },
    { 
        korean: "중단하다", 
        english: "Pause", 
        pronunciation: "[pɔːz]",
        examples: [
            "Let's pause for a moment.",
            "She paused to think.",
            "He is pausing the video."
        ]
    },
    { 
        korean: "쫓다", 
        english: "Chase", 
        pronunciation: "[tʃeɪs]",
        examples: [
            "The dog chased the cat.",
            "She is chasing her dreams.",
            "He chases the ball."
        ]
    },
    { 
        korean: "떠나다", 
        english: "Depart", 
        pronunciation: "[dɪˈpɑːrt]",
        examples: [
            "The train will depart soon.",
            "She departed for New York.",
            "He is departing tomorrow."
        ]
    },
    { 
        korean: "찾다", 
        english: "Seek", 
        pronunciation: "[siːk]",
        examples: [
            "I seek your advice.",
            "She seeks new opportunities.",
            "He is seeking help."
        ]
    },
    { 
        korean: "우편으로 보내다", 
        english: "Mail", 
        pronunciation: "[meɪl]",
        examples: [
            "I need to mail this letter.",
            "She mailed the package.",
            "He is mailing a card."
        ]
    },
    { 
        korean: "접수하다", 
        english: "Receive", 
        pronunciation: "[rɪˈsiːv]",
        examples: [
            "I received your message.",
            "She received a gift.",
            "He is receiving treatment."
        ]
    },
    { 
        korean: "기록하다", 
        english: "Record", 
        pronunciation: "[ˈrɛkɔːrd]",
        examples: [
            "I need to record this lecture.",
            "She recorded her voice.",
            "He is recording the show."
        ]
    },
    { 
        korean: "참여하다", 
        english: "Join", 
        pronunciation: "[dʒɔɪn]",
        examples: [
            "Can you join us for lunch?",
            "She joined the club.",
            "He is joining the meeting."
        ]
    },
    { 
        korean: "즐기다", 
        english: "Enjoy", 
        pronunciation: "[ɪnˈdʒɔɪ]",
        examples: [
            "I enjoy reading books.",
            "She enjoys playing piano.",
            "He is enjoying the party."
        ]
    },
    { 
        korean: "기대다", 
        english: "Lean", 
        pronunciation: "[liːn]",
        examples: [
            "Lean on me for support.",
            "She leaned against the wall.",
            "He is leaning on the table."
        ]
    },
    { 
        korean: "반복하다", 
        english: "Repeat", 
        pronunciation: "[rɪˈpiːt]",
        examples: [
            "Can you repeat that?",
            "She repeated the question.",
            "He is repeating the phrase."
        ]
    },
    { 
        korean: "비밀로 하다", 
        english: "Keep", 
        pronunciation: "[kiːp]",
        examples: [
            "Can you keep a secret?",
            "She keeps her promises.",
            "He is keeping the document."
        ]
    },
    { 
        korean: "고백하다", 
        english: "Confess", 
        pronunciation: "[kənˈfɛs]",
        examples: [
            "I confess, it was my fault.",
            "She confessed her love.",
            "He is confessing his mistake."
        ]
    },
    { 
        korean: "느끼다", 
        english: "Sense", 
        pronunciation: "[sɛns]",
        examples: [
            "I sense something is wrong.",
            "She sensed his presence.",
            "He is sensing danger."
        ]
    },
    { 
        korean: "결혼하다", 
        english: "Marry", 
        pronunciation: "[ˈmæri]",
        examples: [
            "Will you marry me?",
            "She married her high school sweetheart.",
            "He is getting married next month."
        ]
    },
    { 
        korean: "보살피다", 
        english: "Care", 
        pronunciation: "[kɛr]",
        examples: [
            "I care about you.",
            "She cares for her parents.",
            "He is caring for his dog."
        ]
    },
    { 
        korean: "기억하다", 
        english: "Recall", 
        pronunciation: "[rɪˈkɔːl]",
        examples: [
            "I recall our conversation.",
            "She recalls her childhood.",
            "He is recalling the details."
        ]
    },
    { 
        korean: "탐험하다", 
        english: "Venture", 
        pronunciation: "[ˈvɛntʃər]",
        examples: [
            "Let's venture into the unknown.",
            "She ventured into the forest.",
            "He is venturing a guess."
        ]
    },
    { 
        korean: "포기하다", 
        english: "Surrender", 
        pronunciation: "[səˈrɛndər]",
        examples: [
            "I surrender to your will.",
            "She surrendered her passport.",
            "He is surrendering to the authorities."
        ]
    },
    { 
        korean: "여행하다", 
        english: "Travel", 
        pronunciation: "[ˈtrævəl]",
        examples: [
            "I love to travel.",
            "She travels often.",
            "He is traveling to France."
        ]
    },
    { 
        korean: "말하다", 
        english: "Utter", 
        pronunciation: "[ˈʌtər]",
        examples: [
            "Don't utter a word.",
            "She uttered a sigh of relief.",
            "He is uttering nonsense."
        ]
    },
    { 
        korean: "포옹하다", 
        english: "Hug", 
        pronunciation: "[hʌɡ]",
        examples: [
            "Can I have a hug?",
            "She hugged her friend.",
            "He is hugging his mom."
        ]
    },
    { 
        korean: "기도하다", 
        english: "Pray", 
        pronunciation: "[preɪ]",
        examples: [
            "Let's pray for peace.",
            "She prays every night.",
            "He is praying for help."
        ]
    },
    { 
        korean: "탐험하다", 
        english: "Explore", 
        pronunciation: "[ɪkˈsplɔːr]",
        examples: [
            "Let's explore the city.",
            "She loves to explore new places.",
            "He is exploring the forest."
        ]
    },
    { 
        korean: "구입하다", 
        english: "Acquire", 
        pronunciation: "[əˈkwaɪər]",
        examples: [
            "I need to acquire new skills.",
            "She acquired a new hobby.",
            "He is acquiring knowledge."
        ]
    },
    { 
        korean: "대답하다", 
        english: "Respond", 
        pronunciation: "[rɪˈspɒnd]",
        examples: [
            "Please respond to my email.",
            "She responded quickly.",
            "He is responding to a question."
        ]
    },
    { 
        korean: "초대하다", 
        english: "Invite", 
        pronunciation: "[ɪnˈvaɪt]",
        examples: [
            "Can you invite her to the party?",
            "She invited him to dinner.",
            "He is inviting his friends."
        ]
    },
    { 
        korean: "지켜보다", 
        english: "Observe", 
        pronunciation: "[əbˈzɜːrv]",
        examples: [
            "Observe the changes closely.",
            "She observed the stars.",
            "He is observing the experiment."
        ]
    },
    { 
        korean: "나타내다", 
        english: "Express", 
        pronunciation: "[ɪkˈsprɛs]",
        examples: [
            "Express your feelings.",
            "She expressed her gratitude.",
            "He is expressing his opinion."
        ]
    },
    { 
        korean: "제공하다", 
        english: "Offer", 
        pronunciation: "[ˈɔːfər]",
        examples: [
            "Can I offer you some help?",
            "She offered her seat.",
            "He is offering a solution."
        ]
    },
    { 
        korean: "구경하다", 
        english: "Watch", 
        pronunciation: "[wɑːtʃ]",
        examples: [
            "Let's watch a movie.",
            "She watches TV every night.",
            "He is watching the game."
        ]
    },
    { 
        korean: "저장하다", 
        english: "Store", 
        pronunciation: "[stɔːr]",
        examples: [
            "Store the food in the fridge.",
            "She stores her clothes in the closet.",
            "He is storing the files."
        ]
    },
    { 
        korean: "고르다", 
        english: "Select", 
        pronunciation: "[sɪˈlɛkt]",
        examples: [
            "Please select your favorite.",
            "She selected the best option.",
            "He is selecting a book."
        ]
    },
    { 
        korean: "버리다", 
        english: "Discard", 
        pronunciation: "[dɪsˈkɑːrd]",
        examples: [
            "Don't discard that paper.",
            "She discarded the old clothes.",
            "He is discarding the broken chair."
        ]
    },
    { 
        korean: "덮다", 
        english: "Cover", 
        pronunciation: "[ˈkʌvər]",
        examples: [
            "Cover the pot with a lid.",
            "She covered her face.",
            "He is covering the book."
        ]
    },
    { 
        korean: "드리다", 
        english: "Give", 
        pronunciation: "[ɡɪv]",
        examples: [
            "Can you give me a hand?",
            "She gave him a gift.",
            "He is giving a speech."
        ]
    },
    { 
        korean: "받다", 
        english: "Get", 
        pronunciation: "[ɡɛt]",
        examples: [
            "I need to get some sleep.",
            "She got a new phone.",
            "He is getting ready."
        ]
    },
    { 
        korean: "배달하다", 
        english: "Deliver", 
        pronunciation: "[dɪˈlɪvər]",
        examples: [
            "Can you deliver this package?",
            "She delivered the message.",
            "He is delivering food."
        ]
    },
    { 
        korean: "시작하다", 
        english: "Begin", 
        pronunciation: "[bɪˈɡɪn]",
        examples: [
            "Let's begin the lesson.",
            "She began to cry.",
            "He is beginning to understand."
        ]
    },
    { 
        korean: "지불하다", 
        english: "Pay", 
        pronunciation: "[peɪ]",
        examples: [
            "Can you pay the bill?",
            "She paid for the meal.",
            "He is paying attention."
        ]
    },
    { 
        korean: "기다리다", 
        english: "Await", 
        pronunciation: "[əˈweɪt]",
        examples: [
            "I await your response.",
            "She is awaiting her turn.",
            "He awaits the results."
        ]
    },
    { 
        korean: "수락하다", 
        english: "Accept", 
        pronunciation: "[əkˈsɛpt]",
        examples: [
            "Can you accept my apology?",
            "She accepted the job offer.",
            "He is accepting the award."
        ]
    },
    { 
        korean: "믿다", 
        english: "Believe", 
        pronunciation: "[bɪˈliːv]",
        examples: [
            "I believe in you.",
            "She believes in herself.",
            "He believes in hard work."
        ]
    },
    { 
        korean: "거절하다", 
        english: "Refuse", 
        pronunciation: "[rɪˈfjuz]",
        examples: [
            "I refuse to give up.",
            "She refused the offer.",
            "He is refusing to leave."
        ]
    },
    { 
        korean: "가르치다", 
        english: "Teach", 
        pronunciation: "[tiːtʃ]",
        examples: [
            "Can you teach me that?",
            "She teaches math.",
            "He is teaching his son."
        ]
    },
    { 
        korean: "반응하다", 
        english: "React", 
        pronunciation: "[riˈækt]",
        examples: [
            "How did he react?",
            "She reacted calmly.",
            "He is reacting to the news."
        ]
    },
    { 
        korean: "후회하다", 
        english: "Regret", 
        pronunciation: "[rɪˈɡrɛt]",
        examples: [
            "I regret my decision.",
            "She regrets not going.",
            "He is regretting his actions."
        ]
    },
    { 
        korean: "보호하다", 
        english: "Guard", 
        pronunciation: "[ɡɑːrd]",
        examples: [
            "Please guard the entrance.",
            "She guards her privacy.",
            "He is guarding the door."
        ]
    },
    { 
        korean: "말하다", 
        english: "Mention", 
        pronunciation: "[ˈmɛnʃən]",
        examples: [
            "Did you mention the date?",
            "She mentioned it briefly.",
            "He is mentioning his plans."
        ]
    },
    { 
        korean: "이해하다", 
        english: "Understand", 
        pronunciation: "[ˌʌndərˈstænd]",
        examples: [
            "Do you understand?",
            "She understands the problem.",
            "He is understanding the concept."
        ]
    },
    { 
        korean: "연결하다", 
        english: "Link", 
        pronunciation: "[lɪŋk]",
        examples: [
            "Let's link the two ideas.",
            "She linked the two events.",
            "He is linking the cables."
        ]
    },
    { 
        korean: "존경하다", 
        english: "Respect", 
        pronunciation: "[rɪˈspɛkt]",
        examples: [
            "I respect your opinion.",
            "She respects her elders.",
            "He is respecting their wishes."
        ]
    },
    { 
        korean: "창조하다", 
        english: "Create", 
        pronunciation: "[kriˈeɪt]",
        examples: [
            "Can you create this design?",
            "She created a masterpiece.",
            "He is creating a new project."
        ]
    },
    { 
        korean: "따르다", 
        english: "Follow", 
        pronunciation: "[ˈfɒloʊ]",
        examples: [
            "Follow me.",
            "She follows her dreams.",
            "He is following the path."
        ]
    },
    { 
        korean: "말하다", 
        english: "Utter", 
        pronunciation: "[ˈʌtər]",
        examples: [
            "Don't utter a word.",
            "She uttered a sigh of relief.",
            "He is uttering nonsense."
        ]
    },
    { 
        korean: "포옹하다", 
        english: "Hug", 
        pronunciation: "[hʌɡ]",
        examples: [
            "Can I have a hug?",
            "She hugged her friend.",
            "He is hugging his mom."
        ]
    },
    { 
        korean: "기도하다", 
        english: "Pray", 
        pronunciation: "[preɪ]",
        examples: [
            "Let's pray for peace.",
            "She prays every night.",
            "He is praying for help."
        ]
    },
    { 
        korean: "탐험하다", 
        english: "Explore", 
        pronunciation: "[ɪkˈsplɔːr]",
        examples: [
            "Let's explore the city.",
            "She loves to explore new places.",
            "He is exploring the forest."
        ]
    },
    { 
        korean: "구입하다", 
        english: "Acquire", 
        pronunciation: "[əˈkwaɪər]",
        examples: [
            "I need to acquire new skills.",
            "She acquired a new hobby.",
            "He is acquiring knowledge."
        ]
    },
    { 
        korean: "대답하다", 
        english: "Respond", 
        pronunciation: "[rɪˈspɒnd]",
        examples: [
            "Please respond to my email.",
            "She responded quickly.",
            "He is responding to a question."
        ]
    },
    { 
        korean: "초대하다", 
        english: "Invite", 
        pronunciation: "[ɪnˈvaɪt]",
        examples: [
            "Can you invite her to the party?",
            "She invited him to dinner.",
            "He is inviting his friends."
        ]
    },
    { 
        korean: "지켜보다", 
        english: "Observe", 
        pronunciation: "[əbˈzɜːrv]",
        examples: [
            "Observe the changes closely.",
            "She observed the stars.",
            "He is observing the experiment."
        ]
    },
    { 
        korean: "나타내다", 
        english: "Express", 
        pronunciation: "[ɪkˈsprɛs]",
        examples: [
            "Express your feelings.",
            "She expressed her gratitude.",
            "He is expressing his opinion."
        ]
    },
    { 
        korean: "제공하다", 
        english: "Offer", 
        pronunciation: "[ˈɔːfər]",
        examples: [
            "Can I offer you some help?",
            "She offered her seat.",
            "He is offering a solution."
        ]
    },
    { 
        korean: "구경하다", 
        english: "Watch", 
        pronunciation: "[wɑːtʃ]",
        examples: [
            "Let's watch a movie.",
            "She watches TV every night.",
            "He is watching the game."
        ]
    },
    { 
        korean: "저장하다", 
        english: "Store", 
        pronunciation: "[stɔːr]",
        examples: [
            "Store the food in the fridge.",
            "She stores her clothes in the closet.",
            "He is storing the files."
        ]
    },
    { 
        korean: "고르다", 
        english: "Select", 
        pronunciation: "[sɪˈlɛkt]",
        examples: [
            "Please select your favorite.",
            "She selected the best option.",
            "He is selecting a book."
        ]
    },
    { 
        korean: "버리다", 
        english: "Discard", 
        pronunciation: "[dɪsˈkɑːrd]",
        examples: [
            "Don't discard that paper.",
            "She discarded the old clothes.",
            "He is discarding the broken chair."
        ]
    },
    { 
        korean: "덮다", 
        english: "Cover", 
        pronunciation: "[ˈkʌvər]",
        examples: [
            "Cover the pot with a lid.",
            "She covered her face.",
            "He is covering the book."
        ]
    },
    { 
        korean: "드리다", 
        english: "Give", 
        pronunciation: "[ɡɪv]",
        examples: [
            "Can you give me a hand?",
            "She gave him a gift.",
            "He is giving a speech."
        ]
    },
    { 
        korean: "받다", 
        english: "Get", 
        pronunciation: "[ɡɛt]",
        examples: [
            "I need to get some sleep.",
            "She got a new phone.",
            "He is getting ready."
        ]
    },
    { 
        korean: "배달하다", 
        english: "Deliver", 
        pronunciation: "[dɪˈlɪvər]",
        examples: [
            "Can you deliver this package?",
            "She delivered the message.",
            "He is delivering food."
        ]
    },
    { 
        korean: "시작하다", 
        english: "Begin", 
        pronunciation: "[bɪˈɡɪn]",
        examples: [
            "Let's begin the lesson.",
            "She began to cry.",
            "He is beginning to understand."
        ]
    },
    { 
        korean: "지불하다", 
        english: "Pay", 
        pronunciation: "[peɪ]",
        examples: [
            "Can you pay the bill?",
            "She paid for the meal.",
            "He is paying attention."
        ]
    },
    { 
        korean: "기다리다", 
        english: "Await", 
        pronunciation: "[əˈweɪt]",
        examples: [
            "I await your response.",
            "She is awaiting her turn.",
            "He awaits the results."
        ]
    },
    { 
        korean: "수락하다", 
        english: "Accept", 
        pronunciation: "[əkˈsɛpt]",
        examples: [
            "Can you accept my apology?",
            "She accepted the job offer.",
            "He is accepting the award."
        ]
    },
    { 
        korean: "믿다", 
        english: "Believe", 
        pronunciation: "[bɪˈliːv]",
        examples: [
            "I believe in you.",
            "She believes in herself.",
            "He believes in hard work."
        ]
    },
    { 
        korean: "거절하다", 
        english: "Refuse", 
        pronunciation: "[rɪˈfjuz]",
        examples: [
            "I refuse to give up.",
            "She refused the offer.",
            "He is refusing to leave."
        ]
    },
    { 
        korean: "가르치다", 
        english: "Teach", 
        pronunciation: "[tiːtʃ]",
        examples: [
            "Can you teach me that?",
            "She teaches math.",
            "He is teaching his son."
        ]
    },
    { 
        korean: "반응하다", 
        english: "React", 
        pronunciation: "[riˈækt]",
        examples: [
            "How did he react?",
            "She reacted calmly.",
            "He is reacting to the news."
        ]
    },
    { 
        korean: "후회하다", 
        english: "Regret", 
        pronunciation: "[rɪˈɡrɛt]",
        examples: [
            "I regret my decision.",
            "She regrets not going.",
            "He is regretting his actions."
        ]
    },
    { 
        korean: "보호하다", 
        english: "Guard", 
        pronunciation: "[ɡɑːrd]",
        examples: [
            "Please guard the entrance.",
            "She guards her privacy.",
            "He is guarding the door."
        ]
    },
    { 
        korean: "말하다", 
        english: "Mention", 
        pronunciation: "[ˈmɛnʃən]",
        examples: [
            "Did you mention the date?",
            "She mentioned it briefly.",
            "He is mentioning his plans."
        ]
    },
    { 
        korean: "이해하다", 
        english: "Understand", 
        pronunciation: "[ˌʌndərˈstænd]",
        examples: [
            "Do you understand?",
            "She understands the problem.",
            "He is understanding the concept."
        ]
    },
    { 
        korean: "연결하다", 
        english: "Link", 
        pronunciation: "[lɪŋk]",
        examples: [
            "Let's link the two ideas.",
            "She linked the two events.",
            "He is linking the cables."
        ]
    },
    { 
        korean: "존경하다", 
        english: "Respect", 
        pronunciation: "[rɪˈspɛkt]",
        examples: [
            "I respect your opinion.",
            "She respects her elders.",
            "He is respecting their wishes."
        ]
    },
    { 
        korean: "창조하다", 
        english: "Create", 
        pronunciation: "[kriˈeɪt]",
        examples: [
            "Can you create this design?",
            "She created a masterpiece.",
            "He is creating a new project."
        ]
    },
    { 
        korean: "따르다", 
        english: "Follow", 
        pronunciation: "[ˈfɒloʊ]",
        examples: [
            "Follow me.",
            "She follows her dreams.",
            "He is following the path."
        ]
    },
    { 
        korean: "씹다", 
        english: "Chew", 
        pronunciation: "[tʃu]",
        examples: [
            "Chew your food well.",
            "She chews gum.",
            "He is chewing on a pen."
        ]
    },
    { 
        korean: "벗다", 
        english: "Take off", 
        pronunciation: "[teɪk ɔf]",
        examples: [
            "Take off your shoes.",
            "She took off her coat.",
            "He is taking off his hat."
        ]
    },
    { 
        korean: "입다", 
        english: "Put on", 
        pronunciation: "[pʊt ɑn]",
        examples: [
            "Put on your jacket.",
            "She put on her shoes.",
            "He is putting on his glasses."
        ]
    },
    { 
        korean: "누르다", 
        english: "Press", 
        pronunciation: "[prɛs]",
        examples: [
            "Press the button.",
            "She pressed the switch.",
            "He is pressing the bell."
        ]
    },
    { 
        korean: "당기다", 
        english: "Pull", 
        pronunciation: "[pʊl]",
        examples: [
            "Pull the door open.",
            "She pulled the rope.",
            "He is pulling the cart."
        ]
    },
    { 
        korean: "밀다", 
        english: "Push", 
        pronunciation: "[pʊʃ]",
        examples: [
            "Push the door closed.",
            "She pushed the stroller.",
            "He is pushing the box."
        ]
    },
    { 
        korean: "잡다", 
        english: "Grab", 
        pronunciation: "[ɡræb]",
        examples: [
            "Grab your bag.",
            "She grabbed his hand.",
            "He is grabbing the handle."
        ]
    },
    { 
        korean: "타다", 
        english: "Ride", 
        pronunciation: "[raɪd]",
        examples: [
            "Ride a bike.",
            "She rides the bus.",
            "He is riding a horse."
        ]
    },
    { 
        korean: "날다", 
        english: "Fly", 
        pronunciation: "[flaɪ]",
        examples: [
            "Birds fly in the sky.",
            "She flies a kite.",
            "He is flying a drone."
        ]
    },
    { 
        korean: "걷다", 
        english: "Walk", 
        pronunciation: "[wɔk]",
        examples: [
            "Walk to school.",
            "She walks every morning.",
            "He is walking the dog."
        ]
    },
    { 
        korean: "뛰다", 
        english: "Jump", 
        pronunciation: "[dʒʌmp]",
        examples: [
            "Jump over the fence.",
            "She jumped on the trampoline.",
            "He is jumping rope."
        ]
    },
    { 
        korean: "달리다", 
        english: "Run", 
        pronunciation: "[rʌn]",
        examples: [
            "Run fast.",
            "She runs every day.",
            "He is running a marathon."
        ]
    },
    { 
        korean: "쉬다", 
        english: "Rest", 
        pronunciation: "[rɛst]",
        examples: [
            "Take a rest.",
            "She rested on the bed.",
            "He is resting now."
        ]
    },
    { 
        korean: "웃다", 
        english: "Laugh", 
        pronunciation: "[læf]",
        examples: [
            "Laugh at the joke.",
            "She laughed loudly.",
            "He is laughing hard."
        ]
    },
    { 
        korean: "울다", 
        english: "Cry", 
        pronunciation: "[kraɪ]",
        examples: [
            "Don't cry.",
            "She cried during the movie.",
            "He is crying for help."
        ]
    },
    { 
        korean: "노래하다", 
        english: "Sing", 
        pronunciation: "[sɪŋ]",
        examples: [
            "Sing a song.",
            "She sings beautifully.",
            "He is singing on stage."
        ]
    },
    { 
        korean: "춤추다", 
        english: "Dance", 
        pronunciation: "[dæns]",
        examples: [
            "Dance to the music.",
            "She dances every weekend.",
            "He is dancing at the party."
        ]
    },
    { 
        korean: "말하다", 
        english: "Speak", 
        pronunciation: "[spik]",
        examples: [
            "Speak clearly.",
            "She speaks several languages.",
            "He is speaking on the phone."
        ]
    },
    { 
        korean: "듣다", 
        english: "Listen", 
        pronunciation: "[ˈlɪsən]",
        examples: [
            "Listen to the teacher.",
            "She listens to music.",
            "He is listening to the radio."
        ]
    },
    { 
        korean: "보다", 
        english: "Look", 
        pronunciation: "[lʊk]",
        examples: [
            "Look at the sky.",
            "She looked at her watch.",
            "He is looking for his keys."
        ]
    },
    { 
        korean: "찾다", 
        english: "Search", 
        pronunciation: "[sɜrtʃ]",
        examples: [
            "Search for information.",
            "She searched the web.",
            "He is searching the house."
        ]
    },
    { 
        korean: "읽다", 
        english: "Read", 
        pronunciation: "[rid]",
        examples: [
            "Read a book.",
            "She reads every night.",
            "He is reading a newspaper."
        ]
    },
    { 
        korean: "쓰다", 
        english: "Write", 
        pronunciation: "[raɪt]",
        examples: [
            "Write a letter.",
            "She writes in her journal.",
            "He is writing an email."
        ]
    },
    { 
        korean: "그리다", 
        english: "Draw", 
        pronunciation: "[drɔ]",
        examples: [
            "Draw a picture.",
            "She draws beautifully.",
            "He is drawing on the paper."
        ]
    },
    { 
        korean: "말하다", 
        english: "Say", 
        pronunciation: "[seɪ]",
        examples: [
            "Say hello.",
            "She said something interesting.",
            "He is saying goodbye."
        ]
    },
    { 
        korean: "거짓말하다", 
        english: "Lie", 
        pronunciation: "[laɪ]",
        examples: [
            "Don't lie to me.",
            "She lied about her age.",
            "He is lying to his parents."
        ]
    },
    {
        korean: "청소하다",
        english: "Clean",
        pronunciation: "[kliːn]",
        examples: [
            "Clean your room.",
            "She cleans the kitchen every day.",
            "He is cleaning his car."
        ]
    },
    {
        korean: "요리하다",
        english: "Cook",
        pronunciation: "[kʊk]",
        examples: [
            "I like to cook dinner.",
            "She cooks for her family.",
            "He is cooking pasta."
        ]
    },
    {
        korean: "주문하다",
        english: "Order",
        pronunciation: "[ˈɔːrdər]",
        examples: [
            "Order some food.",
            "She ordered a new dress.",
            "He is ordering coffee."
        ]
    },
    {
        korean: "운동하다",
        english: "Exercise",
        pronunciation: "[ˈɛksərˌsaɪz]",
        examples: [
            "Exercise every morning.",
            "She exercises at the gym.",
            "He is exercising outside."
        ]
    },
    {
        korean: "앉다",
        english: "Sit",
        pronunciation: "[sɪt]",
        examples: [
            "Sit on the chair.",
            "She sat by the window.",
            "He is sitting on the floor."
        ]
    },
    {
        korean: "서다",
        english: "Stand",
        pronunciation: "[stænd]",
        examples: [
            "Stand up straight.",
            "She stands in line.",
            "He is standing at the door."
        ]
    },
    {
        korean: "누르다",
        english: "Press",
        pronunciation: "[prɛs]",
        examples: [
            "Press the button.",
            "She pressed the switch.",
            "He is pressing the bell."
        ]
    },
    {
        korean: "데려가다",
        english: "Take",
        pronunciation: "[teɪk]",
        examples: [
            "Take the dog for a walk.",
            "She takes her children to school.",
            "He is taking the bus."
        ]
    },
    {
        korean: "가져오다",
        english: "Bring",
        pronunciation: "[brɪŋ]",
        examples: [
            "Bring your books.",
            "She brought some snacks.",
            "He is bringing a gift."
        ]
    },
    {
        korean: "고르다",
        english: "Choose",
        pronunciation: "[tʃuːz]",
        examples: [
            "Choose a color.",
            "She chose the blue dress.",
            "He is choosing a movie."
        ]
    },
    {
        korean: "열리다",
        english: "Open",
        pronunciation: "[ˈoʊpən]",
        examples: [
            "Open the door.",
            "She opened her book.",
            "He is opening the window."
        ]
    },
    {
        korean: "잡다",
        english: "Catch",
        pronunciation: "[kætʃ]",
        examples: [
            "Catch the ball.",
            "She caught the train.",
            "He is catching fish."
        ]
    },
    {
        korean: "주다",
        english: "Give",
        pronunciation: "[ɡɪv]",
        examples: [
            "Give me your hand.",
            "She gave him a gift.",
            "He is giving a presentation."
        ]
    },
    {
        korean: "받다",
        english: "Receive",
        pronunciation: "[rɪˈsiːv]",
        examples: [
            "Receive a package.",
            "She received a letter.",
            "He is receiving an award."
        ]
    },
    {
        korean: "내려가다",
        english: "Go down",
        pronunciation: "[ɡoʊ daʊn]",
        examples: [
            "Go down the stairs.",
            "She went down the hill.",
            "He is going down the street."
        ]
    },
    {
        korean: "올라가다",
        english: "Go up",
        pronunciation: "[ɡoʊ ʌp]",
        examples: [
            "Go up the hill.",
            "She went up the ladder.",
            "He is going up the stairs."
        ]
    },
    {
        korean: "놓다",
        english: "Put",
        pronunciation: "[pʊt]",
        examples: [
            "Put the book on the table.",
            "She put her bag on the chair.",
            "He is putting the keys in his pocket."
        ]
    },
    {
        korean: "읽다",
        english: "Read",
        pronunciation: "[riːd]",
        examples: [
            "Read a book.",
            "She reads every night.",
            "He is reading a newspaper."
        ]
    },
    {
        korean: "쓰다",
        english: "Write",
        pronunciation: "[raɪt]",
        examples: [
            "Write a letter.",
            "She writes in her journal.",
            "He is writing an email."
        ]
    },
    {
        korean: "그리다",
        english: "Draw",
        pronunciation: "[drɔː]",
        examples: [
            "Draw a picture.",
            "She draws beautifully.",
            "He is drawing on the paper."
        ]
    },
    {
        korean: "말하다",
        english: "Say",
        pronunciation: "[seɪ]",
        examples: [
            "Say hello.",
            "She said something interesting.",
            "He is saying goodbye."
        ]
    },
    {
        korean: "거짓말하다",
        english: "Lie",
        pronunciation: "[laɪ]",
        examples: [
            "Don't lie to me.",
            "She lied about her age.",
            "He is lying to his parents."
        ]
    },
    {
        korean: "마시다",
        english: "Drink",
        pronunciation: "[drɪŋk]",
        examples: [
            "Drink some water.",
            "She drinks coffee every morning.",
            "He is drinking juice."
        ]
    },
    {
        korean: "씻다",
        english: "Wash",
        pronunciation: "[wɑʃ]",
        examples: [
            "Wash your hands.",
            "She washes the dishes.",
            "He is washing the car."
        ]
    },
    {
        korean: "열다",
        english: "Unlock",
        pronunciation: "[ʌnˈlɑk]",
        examples: [
            "Unlock the door.",
            "She unlocked her phone.",
            "He is unlocking the gate."
        ]
    },
    {
        korean: "놀다",
        english: "Play",
        pronunciation: "[pleɪ]",
        examples: [
            "Play a game.",
            "She plays the piano.",
            "He is playing soccer."
        ]
    },
    {
        korean: "기다리다",
        english: "Wait",
        pronunciation: "[weɪt]",
        examples: [
            "Wait here.",
            "She waited for the bus.",
            "He is waiting for his friend."
        ]
    },
    {
        korean: "달리다",
        english: "Run",
        pronunciation: "[rʌn]",
        examples: [
            "Run fast.",
            "She runs every day.",
            "He is running a marathon."
        ]
    },
    {
        korean: "앉다",
        english: "Sit",
        pronunciation: "[sɪt]",
        examples: [
            "Sit on the chair.",
            "She sat by the window.",
            "He is sitting on the floor."
        ]
    },
    {
        korean: "서다",
        english: "Stand",
        pronunciation: "[stænd]",
        examples: [
            "Stand up straight.",
            "She stands in line.",
            "He is standing at the door."
        ]
    },
    {
        korean: "찾다",
        english: "Find",
        pronunciation: "[faɪnd]",
        examples: [
            "Find your keys.",
            "She found a coin.",
            "He is finding his shoes."
        ]
    },
    {
        korean: "만지다",
        english: "Touch",
        pronunciation: "[tʌtʃ]",
        examples: [
            "Don't touch that.",
            "She touched the painting.",
            "He is touching the screen."
        ]
    },
    {
        korean: "듣다",
        english: "Listen",
        pronunciation: "[ˈlɪsən]",
        examples: [
            "Listen to me.",
            "She listens to music.",
            "He is listening to the radio."
        ]
    },
    {
        korean: "자다",
        english: "Sleep",
        pronunciation: "[sliːp]",
        examples: [
            "Sleep well.",
            "She sleeps early.",
            "He is sleeping now."
        ]
    },
    {
        korean: "날다",
        english: "Fly",
        pronunciation: "[flaɪ]",
        examples: [
            "Fly a kite.",
            "She flew to Paris.",
            "He is flying a drone."
        ]
    },
    {
        korean: "노래하다",
        english: "Sing",
        pronunciation: "[sɪŋ]",
        examples: [
            "Sing a song.",
            "She sings beautifully.",
            "He is singing now."
        ]
    },
    {
        korean: "뛰다",
        english: "Jump",
        pronunciation: "[dʒʌmp]",
        examples: [
            "Jump high.",
            "She jumps over the puddle.",
            "He is jumping on the bed."
        ]
    },
    {
        korean: "웃다",
        english: "Laugh",
        pronunciation: "[læf]",
        examples: [
            "Laugh loudly.",
            "She laughed at the joke.",
            "He is laughing with his friends."
        ]
    },
    {
        korean: "울다",
        english: "Cry",
        pronunciation: "[kraɪ]",
        examples: [
            "Don't cry.",
            "She cried during the movie.",
            "He is crying now."
        ]
    },
    {
        korean: "뛰다",
        english: "Run",
        pronunciation: "[rʌn]",
        examples: [
            "Run fast.",
            "She runs every morning.",
            "He is running a race."
        ]
    },
    {
        korean: "먹다",
        english: "Eat",
        pronunciation: "[iːt]",
        examples: [
            "Eat your vegetables.",
            "She eats breakfast early.",
            "He is eating an apple."
        ]
    },
    {
        korean: "마시다",
        english: "Drink",
        pronunciation: "[drɪŋk]",
        examples: [
            "Drink some water.",
            "She drinks tea.",
            "He is drinking coffee."
        ]
    },
    {
        korean: "쓰다",
        english: "Write",
        pronunciation: "[raɪt]",
        examples: [
            "Write a letter.",
            "She writes daily.",
            "He is writing in his diary."
        ]
    },
    {
        korean: "읽다",
        english: "Read",
        pronunciation: "[riːd]",
        examples: [
            "Read a book.",
            "She reads every night.",
            "He is reading a newspaper."
        ]
    },
    {
        korean: "걷다",
        english: "Walk",
        pronunciation: "[wɔːk]",
        examples: [
            "Walk slowly.",
            "She walks to school.",
            "He is walking the dog."
        ]
    },
    {
        korean: "달리다",
        english: "Run",
        pronunciation: "[rʌn]",
        examples: [
            "Run quickly.",
            "She runs every day.",
            "He is running now."
        ]
    },
    {
        korean: "타다",
        english: "Ride",
        pronunciation: "[raɪd]",
        examples: [
            "Ride a bike.",
            "She rides a horse.",
            "He is riding the bus."
        ]
    },
    {
        korean: "운전하다",
        english: "Drive",
        pronunciation: "[draɪv]",
        examples: [
            "Drive safely.",
            "She drives to work.",
            "He is driving a car."
        ]
    },
    {
        korean: "운동하다",
        english: "Exercise",
        pronunciation: "[ˈɛksərˌsaɪz]",
        examples: [
            "Exercise daily.",
            "She exercises in the gym.",
            "He is exercising now."
        ]
    },
    {
        korean: "쉬다",
        english: "Rest",
        pronunciation: "[rɛst]",
        examples: [
            "Rest for a while.",
            "She rests after work.",
            "He is resting now."
        ]
    },
    {
        korean: "가르치다",
        english: "Teach",
        pronunciation: "[tiːtʃ]",
        examples: [
            "Teach me.",
            "She teaches math.",
            "He is teaching a class."
        ]
    },
    {
        korean: "배우다",
        english: "Learn",
        pronunciation: "[lɜrn]",
        examples: [
            "Learn English.",
            "She learns quickly.",
            "He is learning to swim."
        ]
    },
    {
        korean: "기다리다",
        english: "Wait",
        pronunciation: "[weɪt]",
        examples: [
            "Wait here.",
            "She waits patiently.",
            "He is waiting for the bus."
        ]
    },
    {
        korean: "도와주다",
        english: "Help",
        pronunciation: "[hɛlp]",
        examples: [
            "Help me.",
            "She helps her friends.",
            "He is helping his mom."
        ]
    },
    {
        korean: "만나다",
        english: "Meet",
        pronunciation: "[miːt]",
        examples: [
            "Meet me at the park.",
            "She meets new people.",
            "He is meeting his friend."
        ]
    },
    {
        korean: "말하다",
        english: "Speak",
        pronunciation: "[spiːk]",
        examples: [
            "Speak loudly.",
            "She speaks three languages.",
            "He is speaking now."
        ]
    },
    {
        korean: "요리하다",
        english: "Cook",
        pronunciation: "[kʊk]",
        examples: [
            "Cook dinner.",
            "She cooks every day.",
            "He is cooking lunch."
        ]
    },
    {
        korean: "청소하다",
        english: "Clean",
        pronunciation: "[kliːn]",
        examples: [
            "Clean your room.",
            "She cleans the house.",
            "He is cleaning the kitchen."
        ]
    },
    {
        korean: "샤워하다",
        english: "Shower",
        pronunciation: "[ˈʃaʊər]",
        examples: [
            "Shower daily.",
            "She showers every morning.",
            "He is taking a shower."
        ]
    },
    {
        korean: "수영하다",
        english: "Swim",
        pronunciation: "[swɪm]",
        examples: [
            "Swim fast.",
            "She swims in the pool.",
            "He is swimming in the lake."
        ]
    },
    {
        korean: "쓰다",
        english: "Wear",
        pronunciation: "[wɛər]",
        examples: [
            "Wear a hat.",
            "She wears a dress.",
            "He is wearing a jacket."
        ]
    },
    {
        korean: "열다",
        english: "Open",
        pronunciation: "[ˈoʊpən]",
        examples: [
            "Open the door.",
            "She opens her book.",
            "He is opening the box."
        ]
    },
    {
        korean: "닫다",
        english: "Close",
        pronunciation: "[kloʊz]",
        examples: [
            "Close the window.",
            "She closes the lid.",
            "He is closing his eyes."
        ]
    },
    {
        korean: "걷다",
        english: "Climb",
        pronunciation: "[klaɪm]",
        examples: [
            "Climb the hill.",
            "She climbs trees.",
            "He is climbing a ladder."
        ]
    },
    {
        korean: "뛰다",
        english: "Dance",
        pronunciation: "[dæns]",
        examples: [
            "Dance to the music.",
            "She dances gracefully.",
            "He is dancing with his friends."
        ]
    },
    {
        korean: "운전하다",
        english: "Drive",
        pronunciation: "[draɪv]",
        examples: [
            "Drive safely.",
            "She drives to work.",
            "He is driving a car."
        ]
    },
    {
        korean: "타다",
        english: "Ride",
        pronunciation: "[raɪd]",
        examples: [
            "Ride a bike.",
            "She rides a horse.",
            "He is riding the bus."
        ]
    },
    {
        korean: "공부하다",
        english: "Study",
        pronunciation: "[ˈstʌdi]",
        examples: [
            "Study hard.",
            "She studies every night.",
            "He is studying now."
        ]
    },
    {
        korean: "일하다",
        english: "Work",
        pronunciation: "[wɜːrk]",
        examples: [
            "Work diligently.",
            "She works at a bank.",
            "He is working on a project."
        ]
    },
    {
        korean: "말하다",
        english: "Talk",
        pronunciation: "[tɔːk]",
        examples: [
            "Talk to me.",
            "She talks a lot.",
            "He is talking on the phone."
        ]
    },
    {
        korean: "보다",
        english: "Look",
        pronunciation: "[lʊk]",
        examples: [
            "Look here.",
            "She looks beautiful.",
            "He is looking for his keys."
        ]
    },
    {
        korean: "지다",
        english: "Win",
        pronunciation: "[wɪn]",
        examples: [
            "Win the game.",
            "She wins every time.",
            "He is winning the race."
        ]
    },
    {
        korean: "지다",
        english: "Lose",
        pronunciation: "[luːz]",
        examples: [
            "Lose weight.",
            "She lost her wallet.",
            "He is losing the match."
        ]
    },
    {
        korean: "만들다",
        english: "Create",
        pronunciation: "[kriˈeɪt]",
        examples: [
            "Create art.",
            "She creates amazing cakes.",
            "He is creating a website."
        ]
    },
    {
        korean: "배우다",
        english: "Discover",
        pronunciation: "[dɪˈskʌvər]",
        examples: [
            "Discover new places.",
            "She discovered a hidden talent.",
            "He is discovering the truth."
        ]
    },
    {
        korean: "나가다",
        english: "Leave",
        pronunciation: "[liːv]",
        examples: [
            "Leave the room.",
            "She leaves work at five.",
            "He is leaving for vacation."
        ]
    },
    {
        korean: "들어가다",
        english: "Enter",
        pronunciation: "[ˈɛntər]",
        examples: [
            "Enter the building.",
            "She entered the contest.",
            "He is entering the data."
        ]
    },
    {
        korean: "읽다",
        english: "Browse",
        pronunciation: "[braʊz]",
        examples: [
            "Browse the internet.",
            "She browses through books.",
            "He is browsing the catalog."
        ]
    },
    {
        korean: "휴식을 취하다",
        english: "Relax",
        pronunciation: "[rɪˈlæks]",
        examples: [
            "Relax on the beach.",
            "She relaxes after work.",
            "He is relaxing at home."
        ]
    },
    {
        korean: "기억하다",
        english: "Recall",
        pronunciation: "[rɪˈkɔːl]",
        examples: [
            "Recall the event.",
            "She recalls her childhood.",
            "He is recalling a memory."
        ]
    },
    {
        korean: "요리하다",
        english: "Prepare",
        pronunciation: "[prɪˈpɛər]",
        examples: [
            "Prepare a meal.",
            "She prepares for exams.",
            "He is preparing a presentation."
        ]
    },
    {
        korean: "배우다",
        english: "Practice",
        pronunciation: "[ˈpræktɪs]",
        examples: [
            "Practice piano.",
            "She practices yoga.",
            "He is practicing his speech."
        ]
    },
    {
        korean: "쓰다",
        english: "Use",
        pronunciation: "[juːz]",
        examples: [
            "Use the computer.",
            "She uses a smartphone.",
            "He is using a pen."
        ]
    },
    {
        korean: "도착하다",
        english: "Arrive",
        pronunciation: "[əˈraɪv]",
        examples: [
            "Arrive on time.",
            "She arrived early.",
            "He is arriving at the station."
        ]
    },
    {
        korean: "떠나다",
        english: "Depart",
        pronunciation: "[dɪˈpɑːrt]",
        examples: [
            "Depart from here.",
            "She departs tomorrow.",
            "He is departing soon."
        ]
    },
    {
        korean: "보내다",
        english: "Deliver",
        pronunciation: "[dɪˈlɪvər]",
        examples: [
            "Deliver the package.",
            "She delivers newspapers.",
            "He is delivering a speech."
        ]
    },
    {
        korean: "도와주다",
        english: "Assist",
        pronunciation: "[əˈsɪst]",
        examples: [
            "Assist the elderly.",
            "She assists her boss.",
            "He is assisting a customer."
        ]
    },
    {
        korean: "필요하다",
        english: "Need",
        pronunciation: "[niːd]",
        examples: [
            "Need some help?",
            "She needs a break.",
            "He is needing assistance."
        ]
    },
    {
        korean: "원하다",
        english: "Want",
        pronunciation: "[wɒnt]",
        examples: [
            "Want to play?",
            "She wants a new phone.",
            "He is wanting more time."
        ]
    },
    {
        korean: "좋아하다",
        english: "Like",
        pronunciation: "[laɪk]",
        examples: [
            "Like chocolate?",
            "She likes to read.",
            "He is liking his new job."
        ]
    },
    {
        korean: "건너다",
        english: "Cross",
        pronunciation: "[krɔːs]",
        examples: [
            "Cross the street.",
            "She crosses the bridge.",
            "He is crossing the road."
        ]
    },
    {
        korean: "도달하다",
        english: "Reach",
        pronunciation: "[riːtʃ]",
        examples: [
            "Reach for the stars.",
            "She reaches her goal.",
            "He is reaching the top."
        ]
    },
    {
        korean: "이해하다",
        english: "Understand",
        pronunciation: "[ˌʌndərˈstænd]",
        examples: [
            "Understand the problem.",
            "She understands the concept.",
            "He is understanding the lesson."
        ]
    },
    {
        korean: "쓰다",
        english: "Write",
        pronunciation: "[raɪt]",
        examples: [
            "Write a letter.",
            "She writes in her diary.",
            "He is writing a book."
        ]
    },
    {
        korean: "읽다",
        english: "Read",
        pronunciation: "[riːd]",
        examples: [
            "Read a book.",
            "She reads every day.",
            "He is reading a novel."
        ]
    },
    {
        korean: "사용하다",
        english: "Use",
        pronunciation: "[juːz]",
        examples: [
            "Use the computer.",
            "She uses a smartphone.",
            "He is using a tool."
        ]
    },
    {
        korean: "만나다",
        english: "Meet",
        pronunciation: "[miːt]",
        examples: [
            "Meet a friend.",
            "She meets her colleagues.",
            "He is meeting new people."
        ]
    },
    {
        korean: "알리다",
        english: "Inform",
        pronunciation: "[ɪnˈfɔːrm]",
        examples: [
            "Inform the team.",
            "She informs her boss.",
            "He is informing the students."
        ]
    },
    {
        korean: "가져오다",
        english: "Bring",
        pronunciation: "[brɪŋ]",
        examples: [
            "Bring your books.",
            "She brings lunch.",
            "He is bringing the mail."
        ]
    },
    {
        korean: "줍다",
        english: "Pick",
        pronunciation: "[pɪk]",
        examples: [
            "Pick a flower.",
            "She picks apples.",
            "He is picking a team."
        ]
    },
    {
        korean: "보여주다",
        english: "Show",
        pronunciation: "[ʃoʊ]",
        examples: [
            "Show your work.",
            "She shows her painting.",
            "He is showing a movie."
        ]
    },
    {
        korean: "감사하다",
        english: "Thank",
        pronunciation: "[θæŋk]",
        examples: [
            "Thank you.",
            "She thanks her friend.",
            "He is thanking his teacher."
        ]
    },
    {
        korean: "찾다",
        english: "Find",
        pronunciation: "[faɪnd]",
        examples: [
            "Find the key.",
            "She finds a solution.",
            "He is finding his way."
        ]
    },
    {
        korean: "믿다",
        english: "Believe",
        pronunciation: "[bɪˈliːv]",
        examples: [
            "Believe in yourself.",
            "She believes his story.",
            "He is believing in miracles."
        ]
    },
    {
        korean: "말하다",
        english: "Speak",
        pronunciation: "[spiːk]",
        examples: [
            "Speak clearly.",
            "She speaks French.",
            "He is speaking to the crowd."
        ]
    },
    {
        korean: "깨다",
        english: "Break",
        pronunciation: "[breɪk]",
        examples: [
            "Break the glass.",
            "She breaks the rules.",
            "He is breaking a record."
        ]
    },
    {
        korean: "배우다",
        english: "Learn",
        pronunciation: "[lɜːrn]",
        examples: [
            "Learn a new skill.",
            "She learns quickly.",
            "He is learning to swim."
        ]
    },
    {
        korean: "기억하다",
        english: "Remember",
        pronunciation: "[rɪˈmɛmbər]",
        examples: [
            "Remember the date.",
            "She remembers her lines.",
            "He is remembering the song."
        ]
    },
    {
        korean: "기다리다",
        english: "Wait",
        pronunciation: "[weɪt]",
        examples: [
            "Wait a moment.",
            "She waits patiently.",
            "He is waiting for the bus."
        ]
    },
    {
        korean: "살다",
        english: "Live",
        pronunciation: "[lɪv]",
        examples: [
            "Live your life.",
            "She lives in a big city.",
            "He is living his dream."
        ]
    },
    {
        korean: "시작하다",
        english: "Begin",
        pronunciation: "[bɪˈɡɪn]",
        examples: [
            "Begin the project.",
            "She begins her day early.",
            "He is beginning to understand."
        ]
    },
    {
        korean: "도움이 되다",
        english: "Help",
        pronunciation: "[hɛlp]",
        examples: [
            "Help each other.",
            "She helps her neighbors.",
            "He is helping his friend."
        ]
    },
    {
        korean: "만들다",
        english: "Create",
        pronunciation: "[kriˈeɪt]",
        examples: [
            "Create a masterpiece.",
            "She creates beautiful art.",
            "He is creating a website."
        ]
    },
    {
        korean: "바꾸다",
        english: "Change",
        pronunciation: "[tʃeɪndʒ]",
        examples: [
            "Change your clothes.",
            "She changes her mind.",
            "He is changing the plan."
        ]
    },
    {
        korean: "고치다",
        english: "Fix",
        pronunciation: "[fɪks]",
        examples: [
            "Fix the car.",
            "She fixes the computer.",
            "He is fixing the problem."
        ]
    },
    {
        korean: "대답하다",
        english: "Answer",
        pronunciation: "[ˈænsər]",
        examples: [
            "Answer the question.",
            "She answers the phone.",
            "He is answering the email."
        ]
    },
    {
        korean: "기다리다",
        english: "Wait",
        pronunciation: "[weɪt]",
        examples: [
            "Wait for the signal.",
            "She waits for her turn.",
            "He is waiting at the station."
        ]
    },
    {
        korean: "사랑하다",
        english: "Love",
        pronunciation: "[lʌv]",
        examples: [
            "Love your family.",
            "She loves her job.",
            "He is loving the weather."
        ]
    },
    {
        korean: "말하다",
        english: "Say",
        pronunciation: "[seɪ]",
        examples: [
            "Say something nice.",
            "She says it clearly.",
            "He is saying goodbye."
        ]
    },
    {
        korean: "이야기하다",
        english: "Tell",
        pronunciation: "[tɛl]",
        examples: [
            "Tell me a story.",
            "She tells the truth.",
            "He is telling a joke."
        ]
    },
    {
        korean: "운동하다",
        english: "Exercise",
        pronunciation: "[ˈɛksərˌsaɪz]",
        examples: [
            "Exercise is good for health.",
            "She exercises every morning.",
            "He is exercising at the gym."
        ]
    },
    {
        korean: "청소하다",
        english: "Clean",
        pronunciation: "[kliːn]",
        examples: [
            "Clean your room.",
            "She cleans the kitchen.",
            "He is cleaning the car."
        ]
    },
    {
        korean: "구매하다",
        english: "Purchase",
        pronunciation: "[ˈpɜːrtʃəs]",
        examples: [
            "Purchase a new phone.",
            "She purchases groceries online.",
            "He is purchasing a ticket."
        ]
    },
    {
        korean: "전화하다",
        english: "Call",
        pronunciation: "[kɔːl]",
        examples: [
            "Call me later.",
            "She calls her friend.",
            "He is calling his family."
        ]
    },
    {
        korean: "식사하다",
        english: "Dine",
        pronunciation: "[daɪn]",
        examples: [
            "Dine at the restaurant.",
            "She dines with her family.",
            "He is dining out tonight."
        ]
    },
    {
        korean: "공유하다",
        english: "Share",
        pronunciation: "[ʃɛər]",
        examples: [
            "Share your ideas.",
            "She shares her notes.",
            "He is sharing his food."
        ]
    },
    {
        korean: "이사하다",
        english: "Move",
        pronunciation: "[muːv]",
        examples: [
            "Move to a new house.",
            "She is moving next month.",
            "He moves to another city."
        ]
    },
    {
        korean: "쓰다",
        english: "Wear",
        pronunciation: "[wɛər]",
        examples: [
            "Wear a hat.",
            "She wears a dress.",
            "He is wearing a jacket."
        ]
    },
    {
        korean: "재다",
        english: "Measure",
        pronunciation: "[ˈmɛʒər]",
        examples: [
            "Measure the length.",
            "She measures the ingredients.",
            "He is measuring the room."
        ]
    },
    {
        korean: "배달하다",
        english: "Deliver",
        pronunciation: "[dɪˈlɪvər]",
        examples: [
            "Deliver the package.",
            "She delivers the mail.",
            "He is delivering food."
        ]
    },
    {
        korean: "포장하다",
        english: "Pack",
        pronunciation: "[pæk]",
        examples: [
            "Pack your bags.",
            "She packs her lunch.",
            "He is packing his suitcase."
        ]
    },
    {
        korean: "요리하다",
        english: "Cook",
        pronunciation: "[kʊk]",
        examples: [
            "Cook dinner tonight.",
            "She cooks delicious meals.",
            "He is cooking pasta."
        ]
    },
    {
        korean: "배우다",
        english: "Teach",
        pronunciation: "[tiːtʃ]",
        examples: [
            "Teach a class.",
            "She teaches math.",
            "He is teaching English."
        ]
    },
    {
        korean: "경기하다",
        english: "Compete",
        pronunciation: "[kəmˈpiːt]",
        examples: [
            "Compete in the race.",
            "She competes in sports.",
            "He is competing for a prize."
        ]
    },
    {
        korean: "달리다",
        english: "Jog",
        pronunciation: "[dʒɒɡ]",
        examples: [
            "Jog every morning.",
            "She jogs in the park.",
            "He is jogging now."
        ]
    },
    {
        korean: "피하다",
        english: "Avoid",
        pronunciation: "[əˈvɔɪd]",
        examples: [
            "Avoid junk food.",
            "She avoids crowded places.",
            "He is avoiding the rain."
        ]
    },
    {
        korean: "반응하다",
        english: "React",
        pronunciation: "[riˈækt]",
        examples: [
            "React to the news.",
            "She reacts quickly.",
            "He is reacting to the surprise."
        ]
    },
    {
        korean: "저축하다",
        english: "Save",
        pronunciation: "[seɪv]",
        examples: [
            "Save money for a car.",
            "She saves every month.",
            "He is saving for college."
        ]
    },
    {
        korean: "가르치다",
        english: "Educate",
        pronunciation: "[ˈɛdjʊˌkeɪt]",
        examples: [
            "Educate the students.",
            "She educates her children.",
            "He is educating the public."
        ]
    },
    {
        korean: "잡다",
        english: "Catch",
        pronunciation: "[kætʃ]",
        examples: [
            "Catch the ball.",
            "She catches the train.",
            "He is catching a cold."
        ]
    },
    {
        korean: "내려가다",
        english: "Descend",
        pronunciation: "[dɪˈsɛnd]",
        examples: [
            "Descend the stairs.",
            "She descends the mountain.",
            "He is descending the ladder."
        ]
    },
    {
        korean: "오르다",
        english: "Climb",
        pronunciation: "[klaɪm]",
        examples: [
            "Climb the hill.",
            "She climbs trees.",
            "He is climbing a rock wall."
        ]
    },
    {
        korean: "미소 짓다",
        english: "Smile",
        pronunciation: "[smaɪl]",
        examples: [
            "Smile for the camera.",
            "She smiles a lot.",
            "He is smiling at her."
        ]
    },
    {
        korean: "끊다",
        english: "Cut",
        pronunciation: "[kʌt]",
        examples: [
            "Cut the paper.",
            "She cuts her hair.",
            "He is cutting the cake."
        ]
    },
    {
        korean: "따르다",
        english: "Follow",
        pronunciation: "[ˈfɒloʊ]",
        examples: [
            "Follow the leader.",
            "She follows the instructions.",
            "He is following the path."
        ]
    },
    {
        korean: "받아들이다",
        english: "Accept",
        pronunciation: "[əkˈsɛpt]",
        examples: [
            "Accept the offer.",
            "She accepts the challenge.",
            "He is accepting the award."
        ]
    },
    {
        korean: "빌리다",
        english: "Borrow",
        pronunciation: "[ˈbɒroʊ]",
        examples: [
            "Borrow a book.",
            "She borrows money.",
            "He is borrowing a tool."
        ]
    },
    {
        korean: "반환하다",
        english: "Return",
        pronunciation: "[rɪˈtɜːrn]",
        examples: [
            "Return the item.",
            "She returns home.",
            "He is returning to work."
        ]
    },
    {
        korean: "구경하다",
        english: "Watch",
        pronunciation: "[wɒtʃ]",
        examples: [
            "Watch the show.",
            "She watches the news.",
            "He is watching TV."
        ]
    },
    {
        korean: "작동하다",
        english: "Operate",
        pronunciation: "[ˈɒpəˌreɪt]",
        examples: [
            "Operate the machine.",
            "She operates the system.",
            "He is operating the equipment."
        ]
    },
    {
        korean: "시도하다",
        english: "Attempt",
        pronunciation: "[əˈtɛmpt]",
        examples: [
            "I will attempt to solve the problem.",
            "She attempts to climb the mountain.",
            "He is attempting a new method."
        ]
    },
    {
        korean: "고치다",
        english: "Fix",
        pronunciation: "[fɪks]",
        examples: [
            "Can you fix the car?",
            "She fixes broken toys.",
            "He is fixing the computer."
        ]
    },
    {
        korean: "설립하다",
        english: "Establish",
        pronunciation: "[ɪˈstæblɪʃ]",
        examples: [
            "They establish a new company.",
            "She establishes her own business.",
            "He is establishing the rules."
        ]
    },
    {
        korean: "발견하다",
        english: "Discover",
        pronunciation: "[dɪˈskʌvər]",
        examples: [
            "They discover a hidden treasure.",
            "She discovers a new talent.",
            "He is discovering a new place."
        ]
    },
    {
        korean: "축하하다",
        english: "Celebrate",
        pronunciation: "[ˈsɛləˌbreɪt]",
        examples: [
            "Let's celebrate your birthday.",
            "She celebrates her achievements.",
            "He is celebrating a special occasion."
        ]
    },
    {
        korean: "반복하다",
        english: "Repeat",
        pronunciation: "[rɪˈpiːt]",
        examples: [
            "Can you repeat that?",
            "She repeats the question.",
            "He is repeating the process."
        ]
    },
    {
        korean: "걱정하다",
        english: "Worry",
        pronunciation: "[ˈwɜːri]",
        examples: [
            "Don't worry about it.",
            "She worries about her exams.",
            "He is worrying for no reason."
        ]
    },
    {
        korean: "기다리다",
        english: "Await",
        pronunciation: "[əˈweɪt]",
        examples: [
            "We await your reply.",
            "She awaits her turn.",
            "He is awaiting the results."
        ]
    },
    {
        korean: "분석하다",
        english: "Analyze",
        pronunciation: "[ˈænəˌlaɪz]",
        examples: [
            "They analyze the data.",
            "She analyzes the situation.",
            "He is analyzing the results."
        ]
    },
    {
        korean: "청취하다",
        english: "Listen",
        pronunciation: "[ˈlɪsɪn]",
        examples: [
            "Listen to the music.",
            "She listens to her friend.",
            "He is listening to a podcast."
        ]
    },
    {
        korean: "약속하다",
        english: "Promise",
        pronunciation: "[ˈprɑːmɪs]",
        examples: [
            "I promise to be there.",
            "She promises to help.",
            "He is promising a better future."
        ]
    },
    {
        korean: "웃다",
        english: "Laugh",
        pronunciation: "[læf]",
        examples: [
            "Let's laugh together.",
            "She laughs at the joke.",
            "He is laughing loudly."
        ]
    },
    {
        korean: "수집하다",
        english: "Collect",
        pronunciation: "[kəˈlɛkt]",
        examples: [
            "Collect stamps as a hobby.",
            "She collects old coins.",
            "He is collecting data."
        ]
    },
    {
        korean: "작다",
        english: "Shrink",
        pronunciation: "[ʃrɪŋk]",
        examples: [
            "The sweater will shrink in the wash.",
            "She shrinks from the cold.",
            "He is shrinking in size."
        ]
    },
    {
        korean: "향상하다",
        english: "Improve",
        pronunciation: "[ɪmˈpruːv]",
        examples: [
            "Practice will improve your skills.",
            "She improves her performance.",
            "He is improving his health."
        ]
    },
    {
        korean: "조사하다",
        english: "Investigate",
        pronunciation: "[ɪnˈvɛstəˌɡeɪt]",
        examples: [
            "The police investigate the case.",
            "She investigates the problem.",
            "He is investigating a complaint."
        ]
    },
    {
        korean: "감사하다",
        english: "Appreciate",
        pronunciation: "[əˈpriːʃieɪt]",
        examples: [
            "I appreciate your help.",
            "She appreciates good music.",
            "He is appreciating the view."
        ]
    },
    {
        korean: "설득하다",
        english: "Persuade",
        pronunciation: "[pərˈsweɪd]",
        examples: [
            "Try to persuade him.",
            "She persuades her friends.",
            "He is persuading his parents."
        ]
    },
    {
        korean: "제안하다",
        english: "Propose",
        pronunciation: "[prəˈpoʊz]",
        examples: [
            "They propose a new plan.",
            "She proposes a solution.",
            "He is proposing to her."
        ]
    },
    {
        korean: "참가하다",
        english: "Participate",
        pronunciation: "[pɑːrˈtɪsɪˌpeɪt]",
        examples: [
            "Participate in the event.",
            "She participates in the competition.",
            "He is participating in the meeting."
        ]
    },
    {
        korean: "주장하다",
        english: "Claim",
        pronunciation: "[kleɪm]",
        examples: [
            "They claim the prize.",
            "She claims to be right.",
            "He is claiming ownership."
        ]
    },
    {
        korean: "자랑하다",
        english: "Boast",
        pronunciation: "[boʊst]",
        examples: [
            "He likes to boast about his achievements.",
            "She boasts about her new job.",
            "They are boasting their success."
        ]
    },
    {
        korean: "부족하다",
        english: "Lack",
        pronunciation: "[læk]",
        examples: [
            "They lack experience.",
            "She lacks confidence.",
            "He is lacking in skills."
        ]
    },
    {
        korean: "요구하다",
        english: "Demand",
        pronunciation: "[dɪˈmænd]",
        examples: [
            "They demand higher wages.",
            "She demands an explanation.",
            "He is demanding better service."
        ]
    },
    {
        korean: "받다",
        english: "Receive",
        pronunciation: "[rɪˈsiːv]",
        examples: [
            "Receive a gift.",
            "She receives a package.",
            "He is receiving a call."
        ]
    },
    {
        korean: "만족하다",
        english: "Satisfy",
        pronunciation: "[ˈsætɪsˌfaɪ]",
        examples: [
            "They satisfy the requirements.",
            "She satisfies her curiosity.",
            "He is satisfying his hunger."
        ]
    },
    {
        korean: "지다",
        english: "Lose",
        pronunciation: "[luːz]",
        examples: [
            "They lose the game.",
            "She loses her keys often.",
            "He is losing weight."
        ]
    },
    {
        korean: "얻다",
        english: "Gain",
        pronunciation: "[ɡeɪn]",
        examples: [
            "Gain new skills.",
            "She gains knowledge.",
            "He is gaining experience."
        ]
    },
    {
        korean: "혼동하다",
        english: "Confuse",
        pronunciation: "[kənˈfjuz]",
        examples: [
            "Don't confuse the issue.",
            "She confuses the terms.",
            "He is confusing everyone."
        ]
    },
    {
        korean: "발전하다",
        english: "Develop",
        pronunciation: "[dɪˈvɛləp]",
        examples: [
            "Develop new technologies.",
            "She develops her talents.",
            "He is developing a project."
        ]
    },
    {
        korean: "이해하다",
        english: "Understand",
        pronunciation: "[ˌʌndərˈstænd]",
        examples: [
            "I understand your point.",
            "She understands the situation.",
            "He is understanding the concept."
        ]
    },
    {
        korean: "구매하다",
        english: "Purchase",
        pronunciation: "[ˈpɜːrtʃəs]",
        examples: [
            "They purchase groceries.",
            "She purchases a new dress.",
            "He is purchasing a book."
        ]
    },
    {
        korean: "지우다",
        english: "Erase",
        pronunciation: "[ɪˈreɪs]",
        examples: [
            "Erase the board.",
            "She erases her mistakes.",
            "He is erasing the data."
        ]
    },
    {
        korean: "제공하다",
        english: "Provide",
        pronunciation: "[prəˈvaɪd]",
        examples: [
            "They provide good service.",
            "She provides support.",
            "He is providing information."
        ]
    },
    {
        korean: "기억하다",
        english: "Recall",
        pronunciation: "[rɪˈkɔːl]",
        examples: [
            "I recall the event.",
            "She recalls the name.",
            "He is recalling the details."
        ]
    },
    {
        korean: "보호하다",
        english: "Protect",
        pronunciation: "[prəˈtɛkt]",
        examples: [
            "Protect the environment.",
            "She protects her children.",
            "He is protecting the community."
        ]
    },
    {
        korean: "운영하다",
        english: "Operate",
        pronunciation: "[ˈɒpəˌreɪt]",
        examples: [
            "Operate the machine.",
            "She operates a business.",
            "He is operating the equipment."
        ]
    },
    {
        korean: "조정하다",
        english: "Adjust",
        pronunciation: "[əˈdʒʌst]",
        examples: [
            "Adjust the settings.",
            "She adjusts her schedule.",
            "He is adjusting the volume."
        ]
    },
    {
        korean: "선호하다",
        english: "Prefer",
        pronunciation: "[prɪˈfɜːr]",
        examples: [
            "I prefer tea over coffee.",
            "She prefers to work alone.",
            "He is preferring the new plan."
        ]
    },
    {
        korean: "설명하다",
        english: "Describe",
        pronunciation: "[dɪˈskraɪb]",
        examples: [
            "Describe the scene.",
            "She describes her experience.",
            "He is describing the problem."
        ]
    },
    {
        korean: "기다리다",
        english: "Await",
        pronunciation: "[əˈweɪt]",
        examples: [
            "Await further instructions.",
            "She awaits the results.",
            "He is awaiting the news."
        ]
    },
    {
        korean: "확인하다",
        english: "Verify",
        pronunciation: "[ˈvɛrəˌfaɪ]",
        examples: [
            "Verify the information.",
            "She verifies the data.",
            "He is verifying the report."
        ]
    },
    {
        korean: "진행하다",
        english: "Proceed",
        pronunciation: "[prəˈsiːd]",
        examples: [
            "Proceed with caution.",
            "She proceeds to the next step.",
            "He is proceeding as planned."
        ]
    },
    {
        korean: "확인하다",
        english: "Confirm",
        pronunciation: "[kənˈfɜːrm]",
        examples: [
            "Confirm the appointment.",
            "She confirms the details.",
            "He is confirming the reservation."
        ]
    },
    {
        korean: "제안하다",
        english: "Recommend",
        pronunciation: "[ˌrɛkəˈmɛnd]",
        examples: [
            "Recommend a good restaurant.",
            "She recommends this book.",
            "He is recommending a solution."
        ]
    },
    {
        korean: "가져오다",
        english: "Bring",
        pronunciation: "[brɪŋ]",
        examples: [
            "Bring your own drink.",
            "She brings her dog to the park.",
            "He is bringing a gift."
        ]
    },
    {
        korean: "받다",
        english: "Accept",
        pronunciation: "[əkˈsɛpt]",
        examples: [
            "Accept the offer.",
            "She accepts the challenge.",
            "He is accepting the award."
        ]
    },
    {
        korean: "구성하다",
        english: "Compose",
        pronunciation: "[kəmˈpoʊz]",
        examples: [
            "Compose a song.",
            "She composes a letter.",
            "He is composing a speech."
        ]
    },
    {
        korean: "선택하다",
        english: "Select",
        pronunciation: "[sɪˈlɛkt]",
        examples: [
            "Select your favorite.",
            "She selects the best option.",
            "He is selecting a candidate."
        ]
    },
    {
        korean: "사라지다",
        english: "Disappear",
        pronunciation: "[ˌdɪsəˈpɪr]",
        examples: [
            "The magician makes things disappear.",
            "She disappears from sight.",
            "He is disappearing into the crowd."
        ]
    },
    {
        korean: "정리하다",
        english: "Organize",
        pronunciation: "[ˈɔːrɡəˌnaɪz]",
        examples: [
            "Organize the event.",
            "She organizes her files.",
            "He is organizing the team."
        ]
    },
    {
        korean: "연구하다",
        english: "Research",
        pronunciation: "[ˈriːsɜːrtʃ]",
        examples: [
            "Research the topic.",
            "She researches the market.",
            "He is researching new methods."
        ]
    },
    {
        korean: "시작하다",
        english: "Initiate",
        pronunciation: "[ɪˈnɪʃieɪt]",
        examples: [
            "Initiate the project.",
            "She initiates the process.",
            "He is initiating a conversation."
        ]
    },
    {
        korean: "창조하다",
        english: "Create",
        pronunciation: "[kriˈeɪt]",
        examples: [
            "Create a masterpiece.",
            "She creates beautiful artwork.",
            "He is creating a new recipe."
        ]
    },
    {
        korean: "증가하다",
        english: "Increase",
        pronunciation: "[ɪnˈkriːs]",
        examples: [
            "Increase the volume.",
            "She increases her efforts.",
            "He is increasing his speed."
        ]
    },
    {
        korean: "감소하다",
        english: "Decrease",
        pronunciation: "[dɪˈkriːs]",
        examples: [
            "Decrease your speed.",
            "She decreases the amount of sugar.",
            "He is decreasing his workload."
        ]
    },
    {
        korean: "허락하다",
        english: "Permit",
        pronunciation: "[pərˈmɪt]",
        examples: [
            "Permit me to explain.",
            "She permits her children to play outside.",
            "He is permitting access to the building."
        ]
    },
    {
        korean: "부인하다",
        english: "Deny",
        pronunciation: "[dɪˈnaɪ]",
        examples: [
            "Deny the accusation.",
            "She denies the request.",
            "He is denying involvement."
        ]
    },
    {
        korean: "동의하다",
        english: "Agree",
        pronunciation: "[əˈɡriː]",
        examples: [
            "Agree with the terms.",
            "She agrees to the plan.",
            "He is agreeing to help."
        ]
    },
    {
        korean: "충고하다",
        english: "Advise",
        pronunciation: "[ədˈvaɪz]",
        examples: [
            "Advise your friends.",
            "She advises her clients.",
            "He is advising the team."
        ]
    },
    {
        korean: "탐색하다",
        english: "Explore",
        pronunciation: "[ɪkˈsplɔːr]",
        examples: [
            "Let's explore the city.",
            "She loves to explore new ideas.",
            "He is exploring the forest."
        ]
    },
    {
        korean: "축하하다",
        english: "Celebrate",
        pronunciation: "[ˈsɛləˌbreɪt]",
        examples: [
            "We will celebrate her birthday.",
            "She celebrates every achievement.",
            "He is celebrating his promotion."
        ]
    },
    {
        korean: "소통하다",
        english: "Communicate",
        pronunciation: "[kəˈmjuːnɪˌkeɪt]",
        examples: [
            "We need to communicate clearly.",
            "She communicates well with others.",
            "He is communicating his ideas."
        ]
    },
    {
        korean: "조언하다",
        english: "Counsel",
        pronunciation: "[ˈkaʊnsəl]",
        examples: [
            "She will counsel the students.",
            "He counsels people in need.",
            "They are counseling families."
        ]
    },
    {
        korean: "배달하다",
        english: "Deliver",
        pronunciation: "[dɪˈlɪvər]",
        examples: [
            "They deliver packages daily.",
            "She delivers an important message.",
            "He is delivering food to the office."
        ]
    },
    {
        korean: "변경하다",
        english: "Modify",
        pronunciation: "[ˈmɑːdəˌfaɪ]",
        examples: [
            "We will modify the design.",
            "She modifies her plans often.",
            "He is modifying the schedule."
        ]
    },
    {
        korean: "갱신하다",
        english: "Renew",
        pronunciation: "[rɪˈnuː]",
        examples: [
            "I need to renew my license.",
            "She renews her membership annually.",
            "He is renewing the contract."
        ]
    },
    {
        korean: "달성하다",
        english: "Achieve",
        pronunciation: "[əˈʧiːv]",
        examples: [
            "You can achieve your goals.",
            "She achieves great things.",
            "He is achieving his dreams."
        ]
    },
    {
        korean: "설득하다",
        english: "Persuade",
        pronunciation: "[pərˈsweɪd]",
        examples: [
            "She will persuade him to join.",
            "He persuades others easily.",
            "They are persuading the committee."
        ]
    },
    {
        korean: "정리하다",
        english: "Arrange",
        pronunciation: "[əˈreɪndʒ]",
        examples: [
            "Let's arrange the meeting.",
            "She arranges flowers beautifully.",
            "He is arranging the books."
        ]
    },
    {
        korean: "결정하다",
        english: "Decide",
        pronunciation: "[dɪˈsaɪd]",
        examples: [
            "It's time to decide.",
            "She decides quickly.",
            "He is deciding what to do."
        ]
    },
    {
        korean: "보관하다",
        english: "Store",
        pronunciation: "[stɔːr]",
        examples: [
            "Store the files in a safe place.",
            "She stores her clothes neatly.",
            "He is storing the data securely."
        ]
    },
    {
        korean: "지원하다",
        english: "Support",
        pronunciation: "[səˈpɔːrt]",
        examples: [
            "They support each other.",
            "She supports her friends.",
            "He is supporting the cause."
        ]
    },
    {
        korean: "협력하다",
        english: "Collaborate",
        pronunciation: "[kəˈlæbəˌreɪt]",
        examples: [
            "Let's collaborate on this project.",
            "She collaborates well with others.",
            "He is collaborating with a colleague."
        ]
    },
    {
        korean: "고백하다",
        english: "Confess",
        pronunciation: "[kənˈfɛs]",
        examples: [
            "I must confess my mistake.",
            "She confesses her feelings.",
            "He is confessing to the crime."
        ]
    },
    {
        korean: "비교하다",
        english: "Compare",
        pronunciation: "[kəmˈpɛər]",
        examples: [
            "Compare the two options.",
            "She compares prices online.",
            "He is comparing the results."
        ]
    },
    {
        korean: "발견하다",
        english: "Discover",
        pronunciation: "[dɪˈskʌvər]",
        examples: [
            "We discovered a new place.",
            "She discovers new hobbies.",
            "He is discovering his talent."
        ]
    },
    {
        korean: "해결하다",
        english: "Solve",
        pronunciation: "[sɒlv]",
        examples: [
            "Let's solve the problem.",
            "She solves puzzles quickly.",
            "He is solving a complex issue."
        ]
    },
    {
        korean: "운동하다",
        english: "Exercise",
        pronunciation: "[ˈɛksərˌsaɪz]",
        examples: [
            "We exercise every day.",
            "She exercises regularly.",
            "He is exercising in the gym."
        ]
    },
    {
        korean: "교환하다",
        english: "Exchange",
        pronunciation: "[ɪksˈʧeɪndʒ]",
        examples: [
            "Let's exchange gifts.",
            "She exchanges ideas with peers.",
            "He is exchanging currency."
        ]
    },
    {
        korean: "수리하다",
        english: "Repair",
        pronunciation: "[rɪˈpɛər]",
        examples: [
            "I need to repair my car.",
            "She repairs electronics.",
            "He is repairing the roof."
        ]
    },
    {
        korean: "평가하다",
        english: "Evaluate",
        pronunciation: "[ɪˈvæljueɪt]",
        examples: [
            "Evaluate the results.",
            "She evaluates the performance.",
            "He is evaluating the options."
        ]
    },
    {
        korean: "갖다",
        english: "Possess",
        pronunciation: "[pəˈzɛs]",
        examples: [
            "They possess great talent.",
            "She possesses a unique skill.",
            "He is possessing a rare artifact."
        ]
    },
    {
        korean: "운반하다",
        english: "Carry",
        pronunciation: "[ˈkæri]",
        examples: [
            "Carry the bag carefully.",
            "She carries a heavy load.",
            "He is carrying a backpack."
        ]
    },
    {
        korean: "예약하다",
        english: "Book",
        pronunciation: "[bʊk]",
        examples: [
            "Book a table for dinner.",
            "She books her flights online.",
            "He is booking a hotel room."
        ]
    },
    {
        korean: "청소하다",
        english: "Clean",
        pronunciation: "[kliːn]",
        examples: [
            "Clean the house.",
            "She cleans her room daily.",
            "He is cleaning the kitchen."
        ]
    },
    {
        korean: "요리하다",
        english: "Cook",
        pronunciation: "[kʊk]",
        examples: [
            "I love to cook pasta.",
            "She cooks delicious meals.",
            "He is cooking dinner."
        ]
    },
    {
        korean: "전화하다",
        english: "Call",
        pronunciation: "[kɔːl]",
        examples: [
            "Call me later.",
            "She calls her parents often.",
            "He is calling his boss."
        ]
    },
    {
        korean: "노래하다",
        english: "Sing",
        pronunciation: "[sɪŋ]",
        examples: [
            "Sing your favorite song.",
            "She sings beautifully.",
            "He is singing in the shower."
        ]
    },
    {
        korean: "뛰다",
        english: "Jump",
        pronunciation: "[dʒʌmp]",
        examples: [
            "Jump over the hurdle.",
            "She jumps with joy.",
            "He is jumping on the trampoline."
        ]
    },
    {
        korean: "가르치다",
        english: "Teach",
        pronunciation: "[tiːʧ]",
        examples: [
            "She loves to teach children.",
            "He teaches math at the school.",
            "They are teaching a new course."
        ]
    },
    {
        korean: "배달하다",
        english: "Deliver",
        pronunciation: "[dɪˈlɪvər]",
        examples: [
            "The company delivers packages daily.",
            "She delivers food to her neighbors.",
            "He is delivering a presentation."
        ]
    },
    {
        korean: "추천하다",
        english: "Recommend",
        pronunciation: "[ˌrɛkəˈmɛnd]",
        examples: [
            "Can you recommend a good restaurant?",
            "She recommends reading this book.",
            "He is recommending a new strategy."
        ]
    },
    {
        korean: "수리하다",
        english: "Fix",
        pronunciation: "[fɪks]",
        examples: [
            "I need to fix the car.",
            "She fixes broken toys.",
            "He is fixing the computer."
        ]
    },
    {
        korean: "포기하다",
        english: "Quit",
        pronunciation: "[kwɪt]",
        examples: [
            "He decided to quit his job.",
            "She quits smoking.",
            "They are quitting the project."
        ]
    },
    {
        korean: "바꾸다",
        english: "Change",
        pronunciation: "[ʧeɪndʒ]",
        examples: [
            "I need to change my clothes.",
            "She changes her hairstyle often.",
            "He is changing the settings."
        ]
    },
    {
        korean: "준비하다",
        english: "Prepare",
        pronunciation: "[prɪˈpɛər]",
        examples: [
            "Prepare for the meeting.",
            "She prepares meals for her family.",
            "He is preparing a presentation."
        ]
    },
    {
        korean: "기록하다",
        english: "Record",
        pronunciation: "[rɪˈkɔrd]",
        examples: [
            "Record your progress.",
            "She records every detail.",
            "He is recording a video."
        ]
    },
    {
        korean: "지불하다",
        english: "Pay",
        pronunciation: "[peɪ]",
        examples: [
            "I need to pay the bills.",
            "She pays for the groceries.",
            "He is paying the rent."
        ]
    },
    {
        korean: "기억하다",
        english: "Remember",
        pronunciation: "[rɪˈmɛmbər]",
        examples: [
            "Remember to call me.",
            "She remembers her childhood.",
            "He is remembering the song."
        ]
    },
    {
        korean: "조언하다",
        english: "Advise",
        pronunciation: "[ədˈvaɪz]",
        examples: [
            "Can you advise me on this?",
            "She advises new students.",
            "He is advising the team."
        ]
    },
    {
        korean: "연습하다",
        english: "Practice",
        pronunciation: "[ˈpræktɪs]",
        examples: [
            "I need to practice more.",
            "She practices the piano every day.",
            "He is practicing for the match."
        ]
    },
    {
        korean: "충전하다",
        english: "Charge",
        pronunciation: "[ʧɑrdʒ]",
        examples: [
            "I need to charge my phone.",
            "She charges her laptop overnight.",
            "He is charging the battery."
        ]
    },
    {
        korean: "예약하다",
        english: "Reserve",
        pronunciation: "[rɪˈzɜrv]",
        examples: [
            "Reserve a table for dinner.",
            "She reserves tickets for the show.",
            "He is reserving a room at the hotel."
        ]
    },
    {
        korean: "산책하다",
        english: "Stroll",
        pronunciation: "[stroʊl]",
        examples: [
            "Let's take a stroll in the park.",
            "She strolls along the beach.",
            "He is strolling through the garden."
        ]
    },
    {
        korean: "놀라게 하다",
        english: "Surprise",
        pronunciation: "[sərˈpraɪz]",
        examples: [
            "Let's surprise her with a party.",
            "She surprises her friend with a gift.",
            "He is surprising everyone with his skills."
        ]
    },
    {
        korean: "고르다",
        english: "Select",
        pronunciation: "[səˈlɛkt]",
        examples: [
            "Select your favorite book.",
            "She selects the best option.",
            "He is selecting a movie to watch."
        ]
    },
    {
        korean: "구입하다",
        english: "Purchase",
        pronunciation: "[ˈpɜrʧəs]",
        examples: [
            "I need to purchase a new phone.",
            "She purchases her clothes online.",
            "He is purchasing a car."
        ]
    },
    {
        korean: "공유하다",
        english: "Share",
        pronunciation: "[ʃɛr]",
        examples: [
            "Let's share our experiences.",
            "She shares her food with everyone.",
            "He is sharing his screen."
        ]
    },
    {
        korean: "소유하다",
        english: "Own",
        pronunciation: "[oʊn]",
        examples: [
            "I own a small business.",
            "She owns a house in the city.",
            "He is owning up to his mistakes."
        ]
    },
    {
        korean: "유지하다",
        english: "Maintain",
        pronunciation: "[meɪnˈteɪn]",
        examples: [
            "Maintain a healthy lifestyle.",
            "She maintains her car regularly.",
            "He is maintaining a balanced diet."
        ]
    },
    {
        korean: "믿다",
        english: "Believe",
        pronunciation: "[bɪˈliv]",
        examples: [
            "Believe in yourself.",
            "She believes in hard work.",
            "He is believing what he hears."
        ]
    },
    {
        korean: "돕다",
        english: "Assist",
        pronunciation: "[əˈsɪst]",
        examples: [
            "Can you assist me with this?",
            "She assists the elderly.",
            "He is assisting his colleague."
        ]
    },
    {
        korean: "창조하다",
        english: "Create",
        pronunciation: "[kriˈeɪt]",
        examples: [
            "Create a new project.",
            "She creates beautiful paintings.",
            "He is creating a website."
        ]
    },
    {
        korean: "수락하다",
        english: "Accept",
        pronunciation: "[əkˈsɛpt]",
        examples: [
            "I accept your apology.",
            "She accepts the job offer.",
            "He is accepting the challenge."
        ]
    },
    {
        korean: "가져오다",
        english: "Bring",
        pronunciation: "[brɪŋ]",
        examples: [
            "Can you bring the documents?",
            "She brings lunch to work.",
            "He is bringing his friend to the party."
        ]
    },
    {
        korean: "운영하다",
        english: "Operate",
        pronunciation: "[ˈɑpəˌreɪt]",
        examples: [
            "They operate a successful business.",
            "She operates the machinery carefully.",
            "He is operating the computer."
        ]
    },
    {
        korean: "지우다",
        english: "Erase",
        pronunciation: "[ɪˈreɪs]",
        examples: [
            "Erase the board after class.",
            "She erases mistakes with an eraser.",
            "He is erasing the data."
        ]
    },
    {
        korean: "연결하다",
        english: "Connect",
        pronunciation: "[kəˈnɛkt]",
        examples: [
            "Connect the cables properly.",
            "She connects with people easily.",
            "He is connecting to the internet."
        ]
    },
    {
        korean: "고용하다",
        english: "Employ",
        pronunciation: "[ɪmˈplɔɪ]",
        examples: [
            "The company employs many workers.",
            "She employs a unique teaching method.",
            "He is employing new strategies."
        ]
    },
    {
        korean: "고려하다",
        english: "Consider",
        pronunciation: "[kənˈsɪdər]",
        examples: [
            "Consider all the options.",
            "She considers her friend's advice.",
            "He is considering a new job."
        ]
    },
    {
        korean: "건너다",
        english: "Cross",
        pronunciation: "[krɔs]",
        examples: [
            "Let's cross the street.",
            "She crosses the bridge every day.",
            "He is crossing the road."
        ]
    },
    {
        korean: "던지다",
        english: "Throw",
        pronunciation: "[θroʊ]",
        examples: [
            "Can you throw the ball?",
            "She throws a great party.",
            "He is throwing the dice."
        ]
    },
    {
        korean: "잡다",
        english: "Catch",
        pronunciation: "[kæʧ]",
        examples: [
            "Catch the bus to school.",
            "She catches fish in the lake.",
            "He is catching a cold."
        ]
    },
    {
        korean: "오르다",
        english: "Climb",
        pronunciation: "[klaɪm]",
        examples: [
            "Let's climb the mountain.",
            "She climbs the stairs every day.",
            "He is climbing a tree."
        ]
    },
    {
        korean: "떨어지다",
        english: "Fall",
        pronunciation: "[fɔl]",
        examples: [
            "Watch out, you might fall.",
            "She falls asleep quickly.",
            "He is falling down."
        ]
    },
    {
        korean: "달다",
        english: "Hang",
        pronunciation: "[hæŋ]",
        examples: [
            "Let's hang the picture.",
            "She hangs her clothes to dry.",
            "He is hanging the decorations."
        ]
    },
    {
        korean: "열리다",
        english: "Open",
        pronunciation: "[ˈoʊpən]",
        examples: [
            "The store opens at 9 AM.",
            "She opens her book.",
            "He is opening the gift."
        ]
    },
    {
        korean: "닫히다",
        english: "Close",
        pronunciation: "[kloʊz]",
        examples: [
            "The store closes at 9 PM.",
            "She closes her eyes.",
            "He is closing the door."
        ]
    },
    {
        korean: "서다",
        english: "Stand",
        pronunciation: "[stænd]",
        examples: [
            "Please stand up.",
            "She stands in line.",
            "He is standing near the window."
        ]
    },
    {
        korean: "앉다",
        english: "Sit",
        pronunciation: "[sɪt]",
        examples: [
            "Let's sit on the bench.",
            "She sits in the front row.",
            "He is sitting on the floor."
        ]
    },
    {
        korean: "눕다",
        english: "Lie",
        pronunciation: "[laɪ]",
        examples: [
            "I need to lie down.",
            "She lies on the grass.",
            "He is lying in bed."
        ]
    },
    {
        korean: "읽다",
        english: "Read",
        pronunciation: "[rid]",
        examples: [
            "I like to read books.",
            "She reads every night.",
            "He is reading a newspaper."
        ]
    },
    {
        korean: "쓰다",
        english: "Write",
        pronunciation: "[raɪt]",
        examples: [
            "Write a letter to your friend.",
            "She writes in her diary.",
            "He is writing a report."
        ]
    },
    {
        korean: "청소하다",
        english: "Clean",
        pronunciation: "[klin]",
        examples: [
            "Let's clean the house.",
            "She cleans her room every weekend.",
            "He is cleaning the car."
        ]
    },
    {
        korean: "요리하다",
        english: "Cook",
        pronunciation: "[kʊk]",
        examples: [
            "I love to cook dinner.",
            "She cooks delicious meals.",
            "He is cooking breakfast."
        ]
    },
    {
        korean: "빨다",
        english: "Wash",
        pronunciation: "[wɑʃ]",
        examples: [
            "I need to wash my clothes.",
            "She washes the dishes.",
            "He is washing his hands."
        ]
    },
    {
        korean: "먹다",
        english: "Eat",
        pronunciation: "[it]",
        examples: [
            "I like to eat pizza.",
            "She eats breakfast every morning.",
            "He is eating lunch."
        ]
    },
    {
        korean: "마시다",
        english: "Drink",
        pronunciation: "[drɪŋk]",
        examples: [
            "Drink plenty of water.",
            "She drinks coffee every day.",
            "He is drinking juice."
        ]
    },
    {
        korean: "걷다",
        english: "Walk",
        pronunciation: "[wɔk]",
        examples: [
            "I walk to school.",
            "She walks her dog in the park.",
            "He is walking home."
        ]
    },
    {
        korean: "달리다",
        english: "Run",
        pronunciation: "[rʌn]",
        examples: [
            "Run as fast as you can.",
            "She runs every morning.",
            "He is running a marathon."
        ]
    },
    {
        korean: "운전하다",
        english: "Drive",
        pronunciation: "[draɪv]",
        examples: [
            "I drive to work every day.",
            "She drives a red car.",
            "He is driving to the store."
        ]
    },
    {
        korean: "타다",
        english: "Ride",
        pronunciation: "[raɪd]",
        examples: [
            "I like to ride my bike.",
            "She rides the bus every day.",
            "He is riding a horse."
        ]
    },
    {
        korean: "보내다",
        english: "Send",
        pronunciation: "[sɛnd]",
        examples: [
            "Send me a message.",
            "She sends letters to her friends.",
            "He is sending an email."
        ]
    },
    {
        korean: "받다",
        english: "Receive",
        pronunciation: "[rɪˈsiv]",
        examples: [
            "Did you receive my gift?",
            "She receives a lot of emails.",
            "He is receiving a package."
        ]
    },
    {
        korean: "열다",
        english: "Open",
        pronunciation: "[ˈoʊpən]",
        examples: [
            "Can you open the door?",
            "She opens her book.",
            "He is opening the window."
        ]
    },
    {
        korean: "닫다",
        english: "Close",
        pronunciation: "[kloʊz]",
        examples: [
            "Please close the door.",
            "She closes her eyes.",
            "He is closing the store."
        ]
    },
    {
        korean: "가져오다",
        english: "Bring",
        pronunciation: "[brɪŋ]",
        examples: [
            "Can you bring the documents?",
            "She brings lunch to work.",
            "He is bringing his friend to the party."
        ]
    },
    {
        korean: "던지다",
        english: "Throw",
        pronunciation: "[θroʊ]",
        examples: [
            "Throw the ball to me.",
            "She throws a great party.",
            "He is throwing the dice."
        ]
    },
    {
        korean: "잡다",
        english: "Catch",
        pronunciation: "[kæʧ]",
        examples: [
            "Catch the bus to school.",
            "She catches fish in the lake.",
            "He is catching a cold."
        ]
    },
    {
        korean: "걷다",
        english: "Walk",
        pronunciation: "[wɔk]",
        examples: [
            "I walk to school.",
            "She walks her dog in the park.",
            "He is walking home."
        ]
    },
    {
        korean: "달리다",
        english: "Run",
        pronunciation: "[rʌn]",
        examples: [
            "Run as fast as you can.",
            "She runs every morning.",
            "He is running a marathon."
        ]
    },
    {
        korean: "바라다",
        english: "Hope",
        pronunciation: "[hoʊp]",
        examples: [
            "I hope you have a great day.",
            "She hopes to visit Paris.",
            "He is hoping for good news."
        ]
    },
    {
        korean: "필요하다",
        english: "Need",
        pronunciation: "[niːd]",
        examples: [
            "I need a new phone.",
            "She needs to finish her homework.",
            "He needs help with the project."
        ]
    },
    {
        korean: "만족하다",
        english: "Satisfy",
        pronunciation: "[ˈsætɪsfaɪ]",
        examples: [
            "This meal will satisfy your hunger.",
            "She satisfies all the requirements.",
            "He is satisfied with his job."
        ]
    },
    {
        korean: "방문하다",
        english: "Visit",
        pronunciation: "[ˈvɪzɪt]",
        examples: [
            "I want to visit my grandparents.",
            "She visits her friends every weekend.",
            "He is visiting the museum."
        ]
    },
    {
        korean: "기뻐하다",
        english: "Rejoice",
        pronunciation: "[rɪˈʤɔɪs]",
        examples: [
            "We will rejoice at the news.",
            "She rejoices in her success.",
            "He is rejoicing with his friends."
        ]
    },
    {
        korean: "유지하다",
        english: "Maintain",
        pronunciation: "[meɪnˈteɪn]",
        examples: [
            "It's important to maintain good health.",
            "She maintains a positive attitude.",
            "He is maintaining the garden."
        ]
    },
    {
        korean: "발전하다",
        english: "Develop",
        pronunciation: "[dɪˈvɛləp]",
        examples: [
            "I want to develop my skills.",
            "She develops new recipes.",
            "He is developing a new app."
        ]
    },
    {
        korean: "배달하다",
        english: "Deliver",
        pronunciation: "[dɪˈlɪvər]",
        examples: [
            "They deliver fresh food every day.",
            "She delivers a powerful speech.",
            "He is delivering the package."
        ]
    },
    {
        korean: "제공하다",
        english: "Provide",
        pronunciation: "[prəˈvaɪd]",
        examples: [
            "I will provide the information.",
            "She provides excellent service.",
            "He is providing for his family."
        ]
    },
    {
        korean: "준비하다",
        english: "Prepare",
        pronunciation: "[prɪˈpɛər]",
        examples: [
            "Let's prepare for the meeting.",
            "She prepares dinner every night.",
            "He is preparing his presentation."
        ]
    },
    {
        korean: "초대하다",
        english: "Invite",
        pronunciation: "[ɪnˈvaɪt]",
        examples: [
            "I will invite you to the party.",
            "She invites her friends over.",
            "He is inviting everyone to the event."
        ]
    },
    {
        korean: "축하하다",
        english: "Celebrate",
        pronunciation: "[ˈsɛləˌbreɪt]",
        examples: [
            "Let's celebrate your success.",
            "She celebrates her birthday.",
            "He is celebrating with his family."
        ]
    },
    {
        korean: "연습하다",
        english: "Practice",
        pronunciation: "[ˈpræktɪs]",
        examples: [
            "I need to practice the piano.",
            "She practices yoga every morning.",
            "He is practicing his speech."
        ]
    },
    {
        korean: "도착하다",
        english: "Arrive",
        pronunciation: "[əˈraɪv]",
        examples: [
            "I will arrive at 5 PM.",
            "She arrives early every day.",
            "He is arriving at the airport now."
        ]
    },
    {
        korean: "떠나다",
        english: "Leave",
        pronunciation: "[liːv]",
        examples: [
            "I have to leave soon.",
            "She leaves for work at 8 AM.",
            "He is leaving the office."
        ]
    },
    {
        korean: "찾다",
        english: "Find",
        pronunciation: "[faɪnd]",
        examples: [
            "I need to find my keys.",
            "She finds joy in reading.",
            "He is finding it difficult."
        ]
    },
    {
        korean: "감사하다",
        english: "Thank",
        pronunciation: "[θæŋk]",
        examples: [
            "I want to thank you for your help.",
            "She thanks her parents.",
            "He is thanking everyone for coming."
        ]
    },
    {
        korean: "존경하다",
        english: "Respect",
        pronunciation: "[rɪˈspɛkt]",
        examples: [
            "We respect your decision.",
            "She respects her teachers.",
            "He is respected by his peers."
        ]
    },
    {
        korean: "배우다",
        english: "Learn",
        pronunciation: "[lɜrn]",
        examples: [
            "I want to learn a new language.",
            "She learns quickly.",
            "He is learning to swim."
        ]
    },
    {
        korean: "가르치다",
        english: "Teach",
        pronunciation: "[tiːʧ]",
        examples: [
            "I will teach you how to play the guitar.",
            "She teaches math at school.",
            "He is teaching his son to ride a bike."
        ]
    },
    {
        korean: "설명하다",
        english: "Explain",
        pronunciation: "[ɪkˈspleɪn]",
        examples: [
            "Can you explain this to me?",
            "She explains the rules clearly.",
            "He is explaining the situation."
        ]
    },
    {
        korean: "동의하다",
        english: "Agree",
        pronunciation: "[əˈɡriː]",
        examples: [
            "I agree with your opinion.",
            "She agrees to the terms.",
            "He is agreeing to help us."
        ]
    },
    {
        korean: "반대하다",
        english: "Disagree",
        pronunciation: "[ˌdɪsəˈɡriː]",
        examples: [
            "I disagree with that statement.",
            "She disagrees with her brother.",
            "He is disagreeing with the plan."
        ]
    },
    {
        korean: "확신하다",
        english: "Believe",
        pronunciation: "[bɪˈliv]",
        examples: [
            "I believe in you.",
            "She believes in hard work.",
            "He is believing in his team."
        ]
    },
    {
        korean: "기억하다",
        english: "Remember",
        pronunciation: "[rɪˈmɛmbər]",
        examples: [
            "I remember your name.",
            "She remembers the song.",
            "He is remembering the event."
        ]
    },
    {
        korean: "잊다",
        english: "Forget",
        pronunciation: "[fərˈɡɛt]",
        examples: [
            "I forgot my keys.",
            "She forgets things easily.",
            "He is forgetting the address."
        ]
    },
    {
        korean: "들리다",
        english: "Hear",
        pronunciation: "[hɪər]",
        examples: [
            "Can you hear me?",
            "She hears a strange noise.",
            "He is hearing the news now."
        ]
    },
    {
        korean: "보다",
        english: "Look",
        pronunciation: "[lʊk]",
        examples: [
            "Look at the sky.",
            "She looks happy.",
            "He is looking for his phone."
        ]
    },
    {
        korean: "들여다보다",
        english: "Peek",
        pronunciation: "[pik]",
        examples: [
            "Don't peek at your presents.",
            "She peeked through the window.",
            "He is peeking at the surprise."
        ]
    },
    {
        korean: "줍다",
        english: "Pick",
        pronunciation: "[pɪk]",
        examples: [
            "Pick a card.",
            "She picks flowers every morning.",
            "He is picking up his kids."
        ]
    },
    {
        korean: "던지다",
        english: "Throw",
        pronunciation: "[θroʊ]",
        examples: [
            "Throw the ball to me.",
            "She throws a great party.",
            "He is throwing the dice."
        ]
    },
    {
        korean: "가져오다",
        english: "Bring",
        pronunciation: "[brɪŋ]",
        examples: [
            "Can you bring me a glass of water?",
            "She always brings her dog to the park.",
            "He is bringing his lunch today."
        ]
    },
    {
        korean: "배달하다",
        english: "Deliver",
        pronunciation: "[dɪˈlɪvər]",
        examples: [
            "The courier will deliver the package tomorrow.",
            "She delivers newspapers every morning.",
            "He is delivering a speech at the conference."
        ]
    },
    {
        korean: "기다리다",
        english: "Wait",
        pronunciation: "[weɪt]",
        examples: [
            "Please wait here for a moment.",
            "She waits patiently for her turn.",
            "He is waiting for the bus to arrive."
        ]
    },
    {
        korean: "오르다",
        english: "Rise",
        pronunciation: "[raɪz]",
        examples: [
            "The sun will rise at 6 AM.",
            "She rises early every morning.",
            "He is watching the tide rise."
        ]
    },
    {
        korean: "받다",
        english: "Accept",
        pronunciation: "[əkˈsɛpt]",
        examples: [
            "Please accept this gift.",
            "She accepts the challenge.",
            "He is accepting the award on behalf of his team."
        ]
    },
    {
        korean: "시작하다",
        english: "Begin",
        pronunciation: "[bɪˈɡɪn]",
        examples: [
            "Let's begin the meeting.",
            "She begins her day with a cup of coffee.",
            "He is beginning a new project."
        ]
    },
    {
        korean: "깨다",
        english: "Break",
        pronunciation: "[breɪk]",
        examples: [
            "Be careful not to break the glass.",
            "She breaks the rules sometimes.",
            "He is breaking the bad news gently."
        ]
    },
    {
        korean: "청소하다",
        english: "Clean",
        pronunciation: "[kliːn]",
        examples: [
            "I need to clean my room.",
            "She cleans the house every weekend.",
            "He is cleaning the car."
        ]
    },
    {
        korean: "닫다",
        english: "Close",
        pronunciation: "[kloʊz]",
        examples: [
            "Please close the door.",
            "She closes the shop at 6 PM.",
            "He is closing the window."
        ]
    },
    {
        korean: "춤추다",
        english: "Dance",
        pronunciation: "[dæns]",
        examples: [
            "Do you want to dance?",
            "She dances beautifully.",
            "He is dancing at the party."
        ]
    },
    {
        korean: "그리다",
        english: "Draw",
        pronunciation: "[drɔː]",
        examples: [
            "Can you draw a picture?",
            "She draws portraits in her free time.",
            "He is drawing a map."
        ]
    },
    {
        korean: "운전하다",
        english: "Drive",
        pronunciation: "[draɪv]",
        examples: [
            "I like to drive at night.",
            "She drives to work every day.",
            "He is driving a new car."
        ]
    },
    {
        korean: "떨어지다",
        english: "Fall",
        pronunciation: "[fɔːl]",
        examples: [
            "Be careful not to fall.",
            "She falls asleep quickly.",
            "He is watching the leaves fall."
        ]
    },
    {
        korean: "고치다",
        english: "Fix",
        pronunciation: "[fɪks]",
        examples: [
            "Can you fix the broken chair?",
            "She fixes her hair before leaving.",
            "He is fixing the computer."
        ]
    },
    {
        korean: "주다",
        english: "Give",
        pronunciation: "[ɡɪv]",
        examples: [
            "Please give me the book.",
            "She gives her time to charity.",
            "He is giving a presentation."
        ]
    },
    {
        korean: "자르다",
        english: "Cut",
        pronunciation: "[kʌt]",
        examples: [
            "Can you cut the paper in half?",
            "She cuts her hair short.",
            "He is cutting vegetables for dinner."
        ]
    },
    {
        korean: "도움이 되다",
        english: "Help",
        pronunciation: "[hɛlp]",
        examples: [
            "Can you help me with this?",
            "She helps her mother with the chores.",
            "He is helping his friend move."
        ]
    },
    {
        korean: "듣다",
        english: "Listen",
        pronunciation: "[ˈlɪsən]",
        examples: [
            "Please listen to the instructions.",
            "She listens to music while studying.",
            "He is listening to a podcast."
        ]
    },
    {
        korean: "배우다",
        english: "Learn",
        pronunciation: "[lɜːrn]",
        examples: [
            "I want to learn a new language.",
            "She learns quickly.",
            "He is learning to play the guitar."
        ]
    },
    {
        korean: "잃다",
        english: "Lose",
        pronunciation: "[luːz]",
        examples: [
            "Be careful not to lose your keys.",
            "She loses her temper easily.",
            "He is afraid of losing the game."
        ]
    },
    {
        korean: "만들다",
        english: "Make",
        pronunciation: "[meɪk]",
        examples: [
            "I will make some coffee.",
            "She makes beautiful crafts.",
            "He is making dinner."
        ]
    },
    {
        korean: "열다",
        english: "Open",
        pronunciation: "[ˈoʊpən]",
        examples: [
            "Can you open the window?",
            "She opens her store at 9 AM.",
            "He is opening the gift."
        ]
    },
    {
        korean: "달리다",
        english: "Run",
        pronunciation: "[rʌn]",
        examples: [
            "I like to run in the morning.",
            "She runs marathons.",
            "He is running to catch the bus."
        ]
    },
    {
        korean: "노래하다",
        english: "Sing",
        pronunciation: "[sɪŋ]",
        examples: [
            "Can you sing a song?",
            "She sings in a choir.",
            "He is singing in the shower."
        ]
    },
    {
        korean: "앉다",
        english: "Sit",
        pronunciation: "[sɪt]",
        examples: [
            "Please sit down.",
            "She sits by the window.",
            "He is sitting at his desk."
        ]
    },
    {
        korean: "이야기하다",
        english: "Talk",
        pronunciation: "[tɔːk]",
        examples: [
            "Can we talk about it?",
            "She talks to her friends every day.",
            "He is talking on the phone."
        ]
    },
    {
        korean: "걷다",
        english: "Walk",
        pronunciation: "[wɔːk]",
        examples: [
            "I like to walk in the park.",
            "She walks her dog every morning.",
            "He is walking to the store."
        ]
    },
    {
        korean: "보다",
        english: "Watch",
        pronunciation: "[wɑːʧ]",
        examples: [
            "Let's watch a movie.",
            "She watches TV in the evening.",
            "He is watching the game."
        ]
    },
    {
        korean: "쓰다",
        english: "Write",
        pronunciation: "[raɪt]",
        examples: [
            "Can you write your name here?",
            "She writes in her journal every night.",
            "He is writing an email."
        ]
    },
    {
        korean: "말하다",
        english: "Speak",
        pronunciation: "[spiːk]",
        examples: [
            "Can you speak English?",
            "She speaks very well.",
            "He is speaking at the conference."
        ]
    },
    {
        korean: "싸우다",
        english: "Fight",
        pronunciation: "[faɪt]",
        examples: [
            "They often fight about small things.",
            "He fights for what he believes in.",
            "She is fighting a cold."
        ]
    },
    {
        korean: "탐험하다",
        english: "Explore",
        pronunciation: "[ɪkˈsplɔːr]",
        examples: [
            "Let's explore the city.",
            "She loves to explore new places.",
            "He is exploring the forest."
        ]
    },
    {
        korean: "고백하다",
        english: "Confess",
        pronunciation: "[kənˈfɛs]",
        examples: [
            "I must confess, I was wrong.",
            "She confessed her love for him.",
            "He is confessing to the crime."
        ]
    },
    {
        korean: "발견하다",
        english: "Discover",
        pronunciation: "[dɪˈskʌvər]",
        examples: [
            "They discovered a hidden cave.",
            "She discovered her passion for painting.",
            "He is discovering new opportunities."
        ]
    },
    {
        korean: "망치다",
        english: "Ruin",
        pronunciation: "[ˈruːɪn]",
        examples: [
            "Don't ruin the surprise.",
            "She ruined her dress.",
            "He is ruining his chances."
        ]
    },
    {
        korean: "버리다",
        english: "Abandon",
        pronunciation: "[əˈbændən]",
        examples: [
            "They had to abandon the ship.",
            "She abandoned her old habits.",
            "He is abandoning the project."
        ]
    },
    {
        korean: "성취하다",
        english: "Achieve",
        pronunciation: "[əˈtʃiːv]",
        examples: [
            "You can achieve anything you set your mind to.",
            "She achieved her goal.",
            "He is achieving great success."
        ]
    },
    {
        korean: "조언하다",
        english: "Advise",
        pronunciation: "[ədˈvaɪz]",
        examples: [
            "Can you advise me on this matter?",
            "She advises her friends.",
            "He is advising the company."
        ]
    },
    {
        korean: "동의하다",
        english: "Agree",
        pronunciation: "[əˈɡriː]",
        examples: [
            "I agree with your opinion.",
            "She agrees to the terms.",
            "He is agreeing to help."
        ]
    },
    {
        korean: "놀라다",
        english: "Amaze",
        pronunciation: "[əˈmeɪz]",
        examples: [
            "The magician will amaze you.",
            "She amazes everyone with her talent.",
            "He is amazed by the view."
        ]
    },
    {
        korean: "요청하다",
        english: "Request",
        pronunciation: "[rɪˈkwɛst]",
        examples: [
            "Can I request a song?",
            "She requests a day off.",
            "He is requesting more information."
        ]
    },
    {
        korean: "도착하다",
        english: "Arrive",
        pronunciation: "[əˈraɪv]",
        examples: [
            "They will arrive soon.",
            "She arrives at 7 PM.",
            "He is arriving at the station."
        ]
    },
    {
        korean: "속이다",
        english: "Deceive",
        pronunciation: "[dɪˈsiːv]",
        examples: [
            "Don't deceive your friends.",
            "She was deceived by the scam.",
            "He is deceiving himself."
        ]
    },
    {
        korean: "우울하게 하다",
        english: "Depress",
        pronunciation: "[dɪˈprɛs]",
        examples: [
            "The rainy weather can depress people.",
            "She feels depressed sometimes.",
            "He is depressed about his grades."
        ]
    },
    {
        korean: "나타나다",
        english: "Appear",
        pronunciation: "[əˈpɪər]",
        examples: [
            "A rainbow appeared in the sky.",
            "She appears happy.",
            "He is appearing in court."
        ]
    },
    {
        korean: "흐르다",
        english: "Flow",
        pronunciation: "[floʊ]",
        examples: [
            "The river flows to the sea.",
            "She flows through her dance routine.",
            "He is flowing with creativity."
        ]
    },
    {
        korean: "안내하다",
        english: "Guide",
        pronunciation: "[ɡaɪd]",
        examples: [
            "Can you guide me to the hotel?",
            "She guides the new employees.",
            "He is guiding the tour group."
        ]
    },
    {
        korean: "증가하다",
        english: "Increase",
        pronunciation: "[ɪnˈkriːs]",
        examples: [
            "We need to increase our sales.",
            "She wants to increase her savings.",
            "He is increasing his knowledge."
        ]
    },
    {
        korean: "유지하다",
        english: "Maintain",
        pronunciation: "[meɪnˈteɪn]",
        examples: [
            "You should maintain a healthy diet.",
            "She maintains her car well.",
            "He is maintaining his grades."
        ]
    },
    {
        korean: "관리하다",
        english: "Manage",
        pronunciation: "[ˈmænɪdʒ]",
        examples: [
            "He manages a large team.",
            "She manages her time efficiently.",
            "They are managing the event."
        ]
    },

    {
        korean: "준비하다",
        english: "Prepare",
        pronunciation: "[prɪˈpɛər]",
        examples: [
            "Let's prepare for the meeting.",
            "She prepares dinner every night.",
            "He is preparing for his exam."
        ]
    },
    {
        korean: "보호하다",
        english: "Protect",
        pronunciation: "[prəˈtɛkt]",
        examples: [
            "We need to protect the environment.",
            "She protects her family.",
            "He is protecting his rights."
        ]
    },
    {
        korean: "위험을 무릅쓰다",
        english: "Risk",
        pronunciation: "[rɪsk]",
        examples: [
            "Don't risk your health.",
            "She risks her life for others.",
            "He is risking a lot."
        ]
    },
    {
        korean: "구하다",
        english: "Save",
        pronunciation: "[seɪv]",
        examples: [
            "Save your work frequently.",
            "She saves money every month.",
            "He is saving the document."
        ]
    },
    {
        korean: "찾다",
        english: "Search",
        pronunciation: "[sɜːrtʃ]",
        examples: [
            "Search for the answer online.",
            "She is searching for a new job.",
            "He searches the house for his keys."
        ]
    },
    {
        korean: "보이다",
        english: "Show",
        pronunciation: "[ʃoʊ]",
        examples: [
            "Can you show me the way?",
            "She shows great talent.",
            "He is showing his artwork."
        ]
    },
    {
        korean: "먹이다",
        english: "Feed",
        pronunciation: "[fiːd]",
        examples: [
            "Feed the dog twice a day.",
            "She feeds the birds in the morning.",
            "He is feeding the fish."
        ]
    },
    {
        korean: "고려하다",
        english: "Consider",
        pronunciation: "[kənˈsɪdər]",
        examples: [
            "Please consider my suggestion.",
            "She considers every detail.",
            "He is considering a career change."
        ]
    },
    {
        korean: "여행하다",
        english: "Travel",
        pronunciation: "[ˈtrævəl]",
        examples: [
            "I love to travel around the world.",
            "She travels for work.",
            "He is traveling to Europe."
        ]
    },
    {
        korean: "이해하다",
        english: "Understand",
        pronunciation: "[ˌʌndərˈstænd]",
        examples: [
            "Do you understand the instructions?",
            "She understands the problem.",
            "He is trying to understand."
        ]
    },
    {
        korean: "기다리다",
        english: "Await",
        pronunciation: "[əˈweɪt]",
        examples: [
            "We await your response.",
            "She awaits the results.",
            "He is awaiting his turn."
        ]
    },
    {
        korean: "깨닫다",
        english: "Realize",
        pronunciation: "[ˈriəˌlaɪz]",
        examples: [
            "I realize my mistake.",
            "She realized the truth.",
            "He is realizing his potential."
        ]
    },
    {
        korean: "만족하다",
        english: "Satisfy",
        pronunciation: "[ˈsætɪsˌfaɪ]",
        examples: [
            "This food will satisfy your hunger.",
            "She is satisfied with her job.",
            "He satisfies all the requirements."
        ]
    },
    {
        korean: "거부하다",
        english: "Refuse",
        pronunciation: "[rɪˈfjuz]",
        examples: [
            "I refuse to give up.",
            "She refused the offer.",
            "He is refusing to cooperate."
        ]
    },
    {
        korean: "교체하다",
        english: "Replace",
        pronunciation: "[rɪˈpleɪs]",
        examples: [
            "Please replace the broken part.",
            "She replaced her old phone.",
            "He is replacing the batteries."
        ]
    },
    {
        korean: "존재하다",
        english: "Exist",
        pronunciation: "[ɪɡˈzɪst]",
        examples: [
            "Do ghosts really exist?",
            "She believes aliens exist.",
            "He thinks a solution exists."
        ]
    },
    {
        korean: "명령하다",
        english: "Command",
        pronunciation: "[kəˈmænd]",
        examples: [
            "He commands respect.",
            "She commanded him to leave.",
            "He is commanding the troops."
        ]
    },
    {
        korean: "반복하다",
        english: "Repeat",
        pronunciation: "[rɪˈpit]",
        examples: [
            "Can you repeat that?",
            "She repeats the question.",
            "He is repeating the exercise."
        ]
    },
    {
        korean: "공급하다",
        english: "Provide",
        pronunciation: "[prəˈvaɪd]",
        examples: [
            "They provide excellent service.",
            "She provided the information.",
            "He is providing support."
        ]
    },
    {
        korean: "저장하다",
        english: "Store",
        pronunciation: "[stɔr]",
        examples: [
            "Store the data safely.",
            "She stores old photos.",
            "He is storing the documents."
        ]
    },
    {
        korean: "끊다",
        english: "Cut",
        pronunciation: "[kʌt]",
        examples: [
            "Cut the paper in half.",
            "She cut her hair short.",
            "He is cutting the vegetables."
        ]
    },
    {
        korean: "닫다",
        english: "Shut",
        pronunciation: "[ʃʌt]",
        examples: [
            "Please shut the door.",
            "She shut her book.",
            "He is shutting the window."
        ]
    },
    {
        korean: "지다",
        english: "Lose",
        pronunciation: "[luz]",
        examples: [
            "Don't lose your keys.",
            "She lost her wallet.",
            "He is losing the game."
        ]
    },
    {
        korean: "발견하다",
        english: "Discover",
        pronunciation: "[dɪˈskʌvər]",
        examples: [
            "They discovered a hidden talent.",
            "She discovered a new species.",
            "He is discovering new interests."
        ]
    },
    {
        korean: "채우다",
        english: "Fill",
        pronunciation: "[fɪl]",
        examples: [
            "Fill the bottle with water.",
            "She filled the form.",
            "He is filling the tank."
        ]
    },
    {
        korean: "울다",
        english: "Weep",
        pronunciation: "[wip]",
        examples: [
            "She began to weep.",
            "He weeps for joy.",
            "They are weeping over the loss."
        ]
    },
    {
        korean: "두드리다",
        english: "Knock",
        pronunciation: "[nɑk]",
        examples: [
            "Knock on the door.",
            "She knocked three times.",
            "He is knocking loudly."
        ]
    },
    {
        korean: "고치다",
        english: "Fix",
        pronunciation: "[fɪks]",
        examples: [
            "Can you fix this?",
            "She fixed her bike.",
            "He is fixing the computer."
        ]
    },
    {
        korean: "맞다",
        english: "Fit",
        pronunciation: "[fɪt]",
        examples: [
            "These shoes fit well.",
            "She fits into the team perfectly.",
            "He is trying to fit in."
        ]
    },
    {
        korean: "기뻐하다",
        english: "Rejoice",
        pronunciation: "[rɪˈdʒɔɪs]",
        examples: [
            "Rejoice in the success.",
            "She rejoices in small victories.",
            "He is rejoicing with his friends."
        ]
    },
    {
        korean: "신뢰하다",
        english: "Trust",
        pronunciation: "[trʌst]",
        examples: [
            "I trust you completely.",
            "She trusts her instincts.",
            "He is trusted by his peers."
        ]
    },
    {
        korean: "들다",
        english: "Lift",
        pronunciation: "[lɪft]",
        examples: [
            "Can you lift this box?",
            "She lifted the child.",
            "He is lifting weights."
        ]
    },
    {
        korean: "기부하다",
        english: "Donate",
        pronunciation: "[ˈdoʊneɪt]",
        examples: [
            "Donate to charity.",
            "She donates regularly.",
            "He is donating clothes."
        ]
    },
    {
        korean: "모으다",
        english: "Collect",
        pronunciation: "[kəˈlɛkt]",
        examples: [
            "Collect stamps as a hobby.",
            "She collects vintage items.",
            "He is collecting data."
        ]
    },
    {
        korean: "지키다",
        english: "Protect",
        pronunciation: "[prəˈtɛkt]",
        examples: [
            "Protect your skin from the sun.",
            "She protects her children.",
            "He is protecting his home."
        ]
    },
    {
        korean: "위험하다",
        english: "Risk",
        pronunciation: "[rɪsk]",
        examples: [
            "Don't risk your health.",
            "She risks everything for her dream.",
            "He is risking his career."
        ]
    },
    {
        korean: "저항하다",
        english: "Resist",
        pronunciation: "[rɪˈzɪst]",
        examples: [
            "Resist the temptation.",
            "She resisted the urge to quit.",
            "He is resisting change."
        ]
    },
    {
        korean: "지연하다",
        english: "Delay",
        pronunciation: "[dɪˈleɪ]",
        examples: [
            "Don't delay your work.",
            "She delayed her trip.",
            "He is delaying the project."
        ]
    },
    {
        korean: "연구하다",
        english: "Research",
        pronunciation: "[rɪˈsɜrtʃ]",
        examples: [
            "Research the topic thoroughly.",
            "She researches daily.",
            "He is researching for his thesis."
        ]
    },
    {
        korean: "희망하다",
        english: "Hope",
        pronunciation: "[hoʊp]",
        examples: [
            "I hope you succeed.",
            "She hopes for the best.",
            "He is hoping for good weather."
        ]
    },
    {
        korean: "생각하다",
        english: "Consider",
        pronunciation: "[kənˈsɪdər]",
        examples: [
            "Consider all options.",
            "She considers everyone’s feelings.",
            "He is considering a new job."
        ]
    },
    {
        korean: "숨다",
        english: "Hide",
        pronunciation: "[haɪd]",
        examples: [
            "Hide the keys somewhere safe.",
            "She hides her emotions.",
            "He is hiding from the rain."
        ]
    },
    {
        korean: "탐험하다",
        english: "Explore",
        pronunciation: "[ɪkˈsplɔːr]",
        examples: [
            "They love to explore new places.",
            "She explores the city every weekend.",
            "He is exploring different career options."
        ]
    },
    {
        korean: "의견을 말하다",
        english: "Express",
        pronunciation: "[ɪkˈsprɛs]",
        examples: [
            "Feel free to express your opinion.",
            "She expresses herself through art.",
            "He is expressing his gratitude."
        ]
    },
    {
        korean: "기억하다",
        english: "Recall",
        pronunciation: "[rɪˈkɔl]",
        examples: [
            "I recall meeting her at the event.",
            "She recalls her childhood fondly.",
            "He is trying to recall the details."
        ]
    },
    {
        korean: "창조하다",
        english: "Create",
        pronunciation: "[kriˈeɪt]",
        examples: [
            "Let's create something amazing.",
            "She creates beautiful paintings.",
            "He is creating a new project."
        ]
    },
    {
        korean: "저축하다",
        english: "Save",
        pronunciation: "[seɪv]",
        examples: [
            "I save money for emergencies.",
            "She saves her work frequently.",
            "He is saving his progress."
        ]
    },
    {
        korean: "삭제하다",
        english: "Delete",
        pronunciation: "[dɪˈlit]",
        examples: [
            "Delete the unnecessary files.",
            "She deleted her old emails.",
            "He is deleting the duplicate entries."
        ]
    },
    {
        korean: "위치하다",
        english: "Locate",
        pronunciation: "[ˈloʊkeɪt]",
        examples: [
            "Can you locate the nearest gas station?",
            "She located her lost keys.",
            "He is trying to locate the source of the problem."
        ]
    },


    {
        korean: "만들다",
        english: "Construct",
        pronunciation: "[kənˈstrʌkt]",
        examples: [
            "They construct buildings quickly.",
            "She constructed a detailed model.",
            "He is constructing a new theory."
        ]
    },
    {
        korean: "개선하다",
        english: "Enhance",
        pronunciation: "[ɪnˈhæns]",
        examples: [
            "This course will enhance your skills.",
            "She enhanced the image quality.",
            "He is enhancing his performance."
        ]
    },
    {
        korean: "발전하다",
        english: "Progress",
        pronunciation: "[ˈprɑɡrɛs]",
        examples: [
            "We need to make progress.",
            "She is progressing well in her studies.",
            "He is tracking the project's progress."
        ]
    },
    {
        korean: "분석하다",
        english: "Analyze",
        pronunciation: "[ˈænəˌlaɪz]",
        examples: [
            "Analyze the data carefully.",
            "She analyzes the market trends.",
            "He is analyzing the results."
        ]
    },
    {
        korean: "지원하다",
        english: "Support",
        pronunciation: "[səˈpɔrt]",
        examples: [
            "We support each other.",
            "She supports her local community.",
            "He is supporting the new initiative."
        ]
    },
    {
        korean: "추구하다",
        english: "Pursue",
        pronunciation: "[pərˈsu]",
        examples: [
            "Pursue your dreams.",
            "She is pursuing a degree in medicine.",
            "He pursues his hobbies with passion."
        ]
    },
    {
        korean: "입증하다",
        english: "Prove",
        pronunciation: "[pruv]",
        examples: [
            "Prove your theory.",
            "She proved her point effectively.",
            "He is trying to prove his innocence."
        ]
    },
    {
        korean: "고려하다",
        english: "Consider",
        pronunciation: "[kənˈsɪdər]",
        examples: [
            "Consider all your options.",
            "She considered the offer carefully.",
            "He is considering a career change."
        ]
    },
    {
        korean: "기대하다",
        english: "Anticipate",
        pronunciation: "[ænˈtɪsɪˌpeɪt]",
        examples: [
            "I anticipate good results.",
            "She anticipates a lot of questions.",
            "He is anticipating the meeting."
        ]
    },
    {
        korean: "관찰하다",
        english: "Observe",
        pronunciation: "[əbˈzɜrv]",
        examples: [
            "Observe the changes carefully.",
            "She observes the stars at night.",
            "He is observing the experiment."
        ]
    },
    {
        korean: "기록하다",
        english: "Record",
        pronunciation: "[ˈrɛkɔrd]",
        examples: [
            "Record your findings.",
            "She records her daily activities.",
            "He is recording the lecture."
        ]
    },
    {
        korean: "조사하다",
        english: "Investigate",
        pronunciation: "[ɪnˈvɛstəˌɡeɪt]",
        examples: [
            "Investigate the issue thoroughly.",
            "She investigates historical events.",
            "He is investigating the case."
        ]
    },
    {
        korean: "복사하다",
        english: "Duplicate",
        pronunciation: "[ˈduplɪˌkeɪt]",
        examples: [
            "Duplicate the documents.",
            "She duplicated the key.",
            "He is duplicating the files."
        ]
    },
    {
        korean: "포기하다",
        english: "Abandon",
        pronunciation: "[əˈbændən]",
        examples: [
            "Don't abandon your dreams.",
            "She abandoned the project.",
            "He is abandoning his old habits."
        ]
    },
    {
        korean: "제안하다",
        english: "Propose",
        pronunciation: "[prəˈpoʊz]",
        examples: [
            "I propose a new plan.",
            "She proposed a solution.",
            "He is proposing a partnership."
        ]
    },
    {
        korean: "보호하다",
        english: "Defend",
        pronunciation: "[dɪˈfɛnd]",
        examples: [
            "Defend your position.",
            "She defended her thesis.",
            "He is defending his friend."
        ]
    },
    {
        korean: "설명하다",
        english: "Explain",
        pronunciation: "[ɪkˈspleɪn]",
        examples: [
            "Explain the process clearly.",
            "She explains things well.",
            "He is explaining the concept."
        ]
    },
    {
        korean: "실패하다",
        english: "Fail",
        pronunciation: "[feɪl]",
        examples: [
            "Don't be afraid to fail.",
            "She failed the exam.",
            "He is afraid of failing."
        ]
    },
    {
        korean: "성공하다",
        english: "Succeed",
        pronunciation: "[səkˈsid]",
        examples: [
            "You will succeed if you try hard.",
            "She succeeded in her career.",
            "He is succeeding beyond expectations."
        ]
    },
    {
        korean: "가르치다",
        english: "Teach",
        pronunciation: "[tiʧ]",
        examples: [
            "Teach me how to play the piano.",
            "She teaches at the local school.",
            "He is teaching a new course."
        ]
    },
    {
        korean: "배우다",
        english: "Learn",
        pronunciation: "[lɜrn]",
        examples: [
            "I want to learn a new language.",
            "She learns quickly.",
            "He is learning to swim."
        ]
    },
    {
        korean: "비교하다",
        english: "Compare",
        pronunciation: "[kəmˈpɛr]",
        examples: [
            "Compare these two products.",
            "She compared the prices.",
            "He is comparing the results."
        ]
    },
    {
        korean: "연결하다",
        english: "Connect",
        pronunciation: "[kəˈnɛkt]",
        examples: [
            "Connect the cables properly.",
            "She connects with people easily.",
            "He is connecting the dots."
        ]
    },
    {
        korean: "나누다",
        english: "Divide",
        pronunciation: "[dɪˈvaɪd]",
        examples: [
            "Divide the cake into equal parts.",
            "She divided the tasks among the team.",
            "He is dividing his time between work and study."
        ]
    },
    {
        korean: "탐험하다",
        english: "Explore",
        pronunciation: "[ɪkˈsplɔːr]",
        examples: [
            "They love to explore new places.",
            "She explores the city every weekend.",
            "He is exploring different career options."
        ]
    },
    {
        korean: "청소하다",
        english: "Clean",
        pronunciation: "[kliːn]",
        examples: [
            "I need to clean my room.",
            "She cleans the house every Saturday.",
            "He is cleaning the kitchen."
        ]
    },
    {
        korean: "요리하다",
        english: "Cook",
        pronunciation: "[kʊk]",
        examples: [
            "I will cook dinner tonight.",
            "She loves to cook Italian food.",
            "He is cooking breakfast."
        ]
    },
    {
        korean: "운동하다",
        english: "Exercise",
        pronunciation: "[ˈɛksərsaɪz]",
        examples: [
            "I exercise every morning.",
            "She exercises at the gym.",
            "He is exercising to stay healthy."
        ]
    },
    {
        korean: "기다리다",
        english: "Wait",
        pronunciation: "[weɪt]",
        examples: [
            "Please wait here.",
            "She is waiting for her friend.",
            "He waits patiently."
        ]
    },
    {
        korean: "배달하다",
        english: "Deliver",
        pronunciation: "[dɪˈlɪvər]",
        examples: [
            "They deliver packages quickly.",
            "She delivers food to customers.",
            "He is delivering a speech."
        ]
    },
    {
        korean: "구매하다",
        english: "Purchase",
        pronunciation: "[ˈpɜːrtʃəs]",
        examples: [
            "I need to purchase a new laptop.",
            "She purchases clothes online.",
            "He is purchasing tickets for the concert."
        ]
    },
    {
        korean: "이사하다",
        english: "Move",
        pronunciation: "[muːv]",
        examples: [
            "We will move to a new house.",
            "She is moving to another city.",
            "He moves his furniture around."
        ]
    },
    {
        korean: "수영하다",
        english: "Swim",
        pronunciation: "[swɪm]",
        examples: [
            "I love to swim in the ocean.",
            "She swims every morning.",
            "He is swimming in the pool."
        ]
    },
    {
        korean: "타다",
        english: "Ride",
        pronunciation: "[raɪd]",
        examples: [
            "I ride my bike to work.",
            "She rides her horse every weekend.",
            "He is riding a motorcycle."
        ]
    },
    {
        korean: "그리다",
        english: "Draw",
        pronunciation: "[drɔː]",
        examples: [
            "I like to draw pictures.",
            "She draws beautifully.",
            "He is drawing a landscape."
        ]
    },
    {
        korean: "노래하다",
        english: "Sing",
        pronunciation: "[sɪŋ]",
        examples: [
            "I love to sing in the shower.",
            "She sings in the choir.",
            "He is singing a song."
        ]
    },
    {
        korean: "춤추다",
        english: "Dance",
        pronunciation: "[dæns]",
        examples: [
            "We like to dance at parties.",
            "She dances gracefully.",
            "He is dancing to the music."
        ]
    },
    {
        korean: "걱정하다",
        english: "Worry",
        pronunciation: "[ˈwɜːri]",
        examples: [
            "I often worry about my health.",
            "She worries about her exams.",
            "He is worrying too much."
        ]
    },
    {
        korean: "산책하다",
        english: "Stroll",
        pronunciation: "[stroʊl]",
        examples: [
            "I enjoy a stroll in the park.",
            "She takes a stroll every evening.",
            "He is strolling by the river."
        ]
    },
    {
        korean: "설거지하다",
        english: "Wash",
        pronunciation: "[wɒʃ]",
        examples: [
            "I wash the dishes every night.",
            "She washes her clothes on weekends.",
            "He is washing his car."
        ]
    },
    {
        korean: "기다리다",
        english: "Await",
        pronunciation: "[əˈweɪt]",
        examples: [
            "I await your response.",
            "She awaits the arrival of her guests.",
            "He is awaiting his turn."
        ]
    },
    {
        korean: "가르치다",
        english: "Teach",
        pronunciation: "[tiːtʃ]",
        examples: [
            "I teach English to children.",
            "She teaches at a university.",
            "He is teaching a new class."
        ]
    },
    {
        korean: "공부하다",
        english: "Learn",
        pronunciation: "[lɜːrn]",
        examples: [
            "I want to learn a new language.",
            "She learns quickly.",
            "He is learning to swim."
        ]
    },
    {
        korean: "기록하다",
        english: "Record",
        pronunciation: "[ˈrɛkərd]",
        examples: [
            "I record all my expenses.",
            "She records her lectures.",
            "He is recording a new song."
        ]
    },
    {
        korean: "말하다",
        english: "Speak",
        pronunciation: "[spiːk]",
        examples: [
            "Can you speak English?",
            "She speaks very well.",
            "He is speaking now."
        ]
    },
    {
        korean: "읽다",
        english: "Read",
        pronunciation: "[riːd]",
        examples: [
            "I like to read books.",
            "Can you read this?",
            "She reads every day."
        ]
    },
    {
        korean: "쓰다",
        english: "Write",
        pronunciation: "[raɪt]",
        examples: [
            "I need to write a letter.",
            "She likes to write stories.",
            "He is writing in his notebook."
        ]
    },
    {
        korean: "찾다",
        english: "Search",
        pronunciation: "[sɜːrtʃ]",
        examples: [
            "I need to search for my keys.",
            "She searches the internet for recipes.",
            "He is searching for his lost dog."
        ]
    },
    {
        korean: "발견하다",
        english: "Discover",
        pronunciation: "[dɪˈskʌvər]",
        examples: [
            "They discovered a new species.",
            "She discovered a hidden talent.",
            "He is discovering new music."
        ]
    },
    {
        korean: "필요하다",
        english: "Need",
        pronunciation: "[niːd]",
        examples: [
            "I need some help.",
            "She needs more time.",
            "He needs to finish his work."
        ]
    },
    {
        korean: "원하다",
        english: "Want",
        pronunciation: "[wɒnt]",
        examples: [
            "I want a new phone.",
            "She wants to travel the world.",
            "He wants to learn to play guitar."
        ]
    },
    {
        korean: "받다",
        english: "Receive",
        pronunciation: "[rɪˈsiːv]",
        examples: [
            "Did you receive my letter?",
            "She received a gift.",
            "He is receiving a package."
        ]
    },
    {
        korean: "주다",
        english: "Give",
        pronunciation: "[ɡɪv]",
        examples: [
            "Can you give me a pen?",
            "She gives great advice.",
            "He is giving a presentation."
        ]
    },
    {
        korean: "감사하다",
        english: "Thank",
        pronunciation: "[θæŋk]",
        examples: [
            "I thank you for your help.",
            "She thanked her teacher.",
            "He is thanking his parents."
        ]
    },


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
            englishUtterance.lang = 'en-US';
            englishUtterance.rate = 1;

            koreanUtterance.onend = () => {
                setTimeout(() => {
                    synth.speak(englishUtterance);
                }, 500);
            };

            englishUtterance.onend = () => {
                examples.forEach((example, index) => {
                    const exampleUtterance = new SpeechSynthesisUtterance(example);
                    exampleUtterance.lang = 'en-US';
                    exampleUtterance.rate = 1;
                    exampleUtterance.onend = () => {
                        if (index === examples.length - 1) {
                            count++;
                            if (count < times) {
                                speak();
                            } else if (callback) {
                                callback();
                            }
                        }
                    };
                    setTimeout(() => {
                        synth.speak(exampleUtterance);
                    }, (index + 1) * 500);
                });
            };

            synth.speak(koreanUtterance);
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
    setTimeout(() => pronounceWord(1), 1000); // 1초 지연
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
        playNextWord(); // 초 간격으로 다음 단어 재생
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
    setTimeout(() => pronounceWord(1), 1000); // 페이지 로드 후 1초 지연
});
