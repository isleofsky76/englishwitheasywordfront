const words = [
    {
        "korean": "찾다",
        "english": "find",
        "pronunciation": "[faɪnd]",
        "examples": [
            "She couldn't find her keys (그녀는 열쇠를 찾을 수 없었습니다).",
            "He found his wallet under the couch (그는 소파 밑에서 지갑을 찾았습니다).",
            "They found the missing cat in the garden (그들은 정원에서 실종된 고양이를 찾았습니다)."
        ]
    },
    {
        "korean": "발견하다",
        "english": "discover",
        "pronunciation": "[dɪˈskʌvər]",
        "examples": [
            "She discovered a hidden talent (그녀는 숨겨진 재능을 발견했습니다).",
            "He discovered a new species of bird (그는 새로운 조류의 종을 발견했습니다).",
            "They discovered an ancient artifact (그들은 고대 유물을 발견했습니다)."
        ]
    },
    {
        "korean": "알아차리다",
        "english": "realize",
        "pronunciation": "[ˈriːəˌlaɪz]",
        "examples": [
            "She realized the door was unlocked (그녀는 문이 잠겨 있지 않다는 것을 알아차렸습니다).",
            "He realized he had made a mistake (그는 자신이 실수했다는 것을 알아차렸습니다).",
            "They realized that the weather was getting worse (그들은 날씨가 나빠지고 있다는 것을 알아차렸습니다)."
        ]
    },
    {
        "korean": "만들다",
        "english": "make",
        "pronunciation": "[meɪk]",
        "examples": [
            "She made a cake (그녀는 케이크를 만들었습니다).",
            "He made a new friend (그는 새로운 친구를 사귀었습니다).",
            "They made a decision (그들은 결정을 내렸습니다)."
        ]
    },
    {
        "korean": "먹다",
        "english": "eat",
        "pronunciation": "[iːt]",
        "examples": [
            "She eats an apple every day (그녀는 매일 사과를 먹습니다).",
            "He ate dinner at six (그는 여섯 시에 저녁을 먹었습니다).",
            "They eat out often (그들은 자주 외식합니다)."
        ]
    },
    {
        "korean": "보다",
        "english": "see",
        "pronunciation": "[siː]",
        "examples": [
            "She saw a movie (그녀는 영화를 보았습니다).",
            "He saw his friend at the park (그는 공원에서 친구를 보았습니다).",
            "They see each other every week (그들은 매주 만납니다)."
        ]
    },
    {
        "korean": "쓰다",
        "english": "write",
        "pronunciation": "[raɪt]",
        "examples": [
            "She wrote a letter (그녀는 편지를 썼습니다).",
            "He writes in his diary every night (그는 매일 밤 일기를 씁니다).",
            "They wrote a book together (그들은 함께 책을 썼습니다)."
        ]
    },
    {
        "korean": "읽다",
        "english": "read",
        "pronunciation": "[riːd]",
        "examples": [
            "She reads a book every week (그녀는 매주 책을 읽습니다).",
            "He read the newspaper this morning (그는 오늘 아침 신문을 읽었습니다).",
            "They read to their children (그들은 아이들에게 책을 읽어줍니다)."
        ]
    },
    {
        "korean": "달리다",
        "english": "run",
        "pronunciation": "[rʌn]",
        "examples": [
            "She runs every morning (그녀는 매일 아침 달립니다).",
            "He ran a marathon last year (그는 작년에 마라톤을 뛰었습니다).",
            "They run a small business (그들은 작은 사업을 운영합니다)."
        ]
    },
    {
        "korean": "걷다",
        "english": "walk",
        "pronunciation": "[wɔːk]",
        "examples": [
            "She walks to work (그녀는 걸어서 출근합니다).",
            "He walked the dog (그는 개를 산책시켰습니다).",
            "They walk in the park every evening (그들은 매일 저녁 공원을 걷습니다)."
        ]
    },
    {
        "korean": "운전하다",
        "english": "drive",
        "pronunciation": "[draɪv]",
        "examples": [
            "She drives to the office (그녀는 차로 사무실에 갑니다).",
            "He drove all night (그는 밤새 운전했습니다).",
            "They drive a big car (그들은 큰 차를 운전합니다)."
        ]
    },
    {
        "korean": "노래하다",
        "english": "sing",
        "pronunciation": "[sɪŋ]",
        "examples": [
            "She sings beautifully (그녀는 아름답게 노래합니다).",
            "He sang at the concert (그는 콘서트에서 노래했습니다).",
            "They sing together on weekends (그들은 주말에 함께 노래합니다)."
        ]
    },
    {
        "korean": "춤추다",
        "english": "dance",
        "pronunciation": "[dæns]",
        "examples": [
            "She loves to dance (그녀는 춤추는 것을 좋아합니다).",
            "He danced with his partner (그는 파트너와 춤을 췄습니다).",
            "They dance every Friday night (그들은 매주 금요일 밤에 춤을 춥니다)."
        ]
    },
    {
        "korean": "사랑하다",
        "english": "love",
        "pronunciation": "[lʌv]",
        "examples": [
            "She loves her family (그녀는 가족을 사랑합니다).",
            "He loves to read (그는 독서를 좋아합니다).",
            "They love each other (그들은 서로를 사랑합니다)."
        ]
    },
    {
        "korean": "싫어하다",
        "english": "hate",
        "pronunciation": "[heɪt]",
        "examples": [
            "She hates spiders (그녀는 거미를 싫어합니다).",
            "He hates doing laundry (그는 빨래하는 것을 싫어합니다).",
            "They hate waiting in line (그들은 줄 서서 기다리는 것을 싫어합니다)."
        ]
    },
    {
        "korean": "일하다",
        "english": "work",
        "pronunciation": "[wɜːrk]",
        "examples": [
            "She works at a bank (그녀는 은행에서 일합니다).",
            "He works from home (그는 재택근무를 합니다).",
            "They work hard every day (그들은 매일 열심히 일합니다)."
        ]
    },
    {
        "korean": "쉬다",
        "english": "rest",
        "pronunciation": "[rɛst]",
        "examples": [
            "She needs to rest (그녀는 휴식이 필요합니다).",
            "He rested after lunch (그는 점심 후에 쉬었습니다).",
            "They rest on Sundays (그들은 일요일마다 쉽니다)."
        ]
    },
    {
        "korean": "배우다",
        "english": "learn",
        "pronunciation": "[lɜːrn]",
        "examples": [
            "She is learning Spanish (그녀는 스페인어를 배우고 있습니다).",
            "He learned to play the guitar (그는 기타를 배웠습니다).",
            "They learn new things every day (그들은 매일 새로운 것을 배웁니다)."
        ]
    },
    {
        "korean": "가르치다",
        "english": "teach",
        "pronunciation": "[tiːtʃ]",
        "examples": [
            "She teaches math (그녀는 수학을 가르칩니다).",
            "He taught me how to swim (그는 나에게 수영하는 방법을 가르쳐 주었습니다).",
            "They teach at a university (그들은 대학에서 가르칩니다)."
        ]
    },
    {
        "korean": "기억하다",
        "english": "remember",
        "pronunciation": "[rɪˈmɛmbər]",
        "examples": [
            "She remembers everything (그녀는 모든 것을 기억합니다).",
            "He remembered her birthday (그는 그녀의 생일을 기억했습니다).",
            "They remember their first meeting (그들은 첫 만남을 기억합니다)."
        ]
    },
    {
        "korean": "잊다",
        "english": "forget",
        "pronunciation": "[fərˈɡɛt]",
        "examples": [
            "She forgot her password (그녀는 비밀번호를 잊어버렸습니다).",
            "He forgot to call (그는 전화하는 것을 잊었습니다).",
            "They forgot their anniversary (그들은 기념일을 잊었습니다)."
        ]
    },
    {
        "korean": "시작하다",
        "english": "start",
        "pronunciation": "[stɑːrt]",
        "examples": [
            "She started a new job (그녀는 새 일을 시작했습니다).",
            "He started the car (그는 차를 시동 걸었습니다).",
            "They started the project (그들은 프로젝트를 시작했습니다)."
        ]
    },
    {
        "korean": "끝내다",
        "english": "finish",
        "pronunciation": "[ˈfɪnɪʃ]",
        "examples": [
            "She finished her homework (그녀는 숙제를 끝냈습니다).",
            "He finished the race (그는 경주를 끝냈습니다).",
            "They finished the meeting (그들은 회의를 끝냈습니다)."
        ]
    },
    {
        "korean": "열다",
        "english": "open",
        "pronunciation": "[ˈoʊpən]",
        "examples": [
            "She opened the door (그녀는 문을 열었습니다).",
            "He opened the window (그는 창문을 열었습니다).",
            "They opened a new store (그들은 새 가게를 열었습니다)."
        ]
    },
    {
        "korean": "닫다",
        "english": "close",
        "pronunciation": "[kloʊz]",
        "examples": [
            "She closed the book (그녀는 책을 닫았습니다).",
            "He closed the gate (그는 문을 닫았습니다).",
            "They closed the shop early (그들은 가게를 일찍 닫았습니다)."
        ]
    },
    {
        "korean": "필요하다",
        "english": "need",
        "pronunciation": "[niːd]",
        "examples": [
            "She needs help (그녀는 도움이 필요합니다).",
            "He needed more time (그는 더 많은 시간이 필요했습니다).",
            "They need to leave now (그들은 지금 떠나야 합니다)."
        ]
    },
    {
        "korean": "원하다",
        "english": "want",
        "pronunciation": "[wɑːnt]",
        "examples": [
            "She wants a new car (그녀는 새 차를 원합니다).",
            "He wanted to visit (그는 방문하고 싶었습니다).",
            "They want to be friends (그들은 친구가 되고 싶어 합니다)."
        ]
    },
    {
        "korean": "기다리다",
        "english": "wait",
        "pronunciation": "[weɪt]",
        "examples": [
            "She waited for an hour (그녀는 한 시간을 기다렸습니다).",
            "He waits for the bus (그는 버스를 기다립니다).",
            "They are waiting outside (그들은 밖에서 기다리고 있습니다)."
        ]
    },
    {
        "korean": "듣다",
        "english": "listen",
        "pronunciation": "[ˈlɪsən]",
        "examples": [
            "She listens to music (그녀는 음악을 듣습니다).",
            "He listened to the lecture (그는 강의를 들었습니다).",
            "They listen carefully (그들은 주의 깊게 듣습니다)."
        ]
    },
    {
        "korean": "보다",
        "english": "look",
        "pronunciation": "[lʊk]",
        "examples": [
            "She looked at the painting (그녀는 그림을 보았습니다).",
            "He looked for his phone (그는 그의 전화를 찾았습니다).",
            "They looked around the city (그들은 도시를 둘러보았습니다)."
        ]
    },
    {
        "korean": "만지다",
        "english": "touch",
        "pronunciation": "[tʌtʃ]",
        "examples": [
            "She touched the sculpture (그녀는 조각을 만졌습니다).",
            "He touched the hot stove (그는 뜨거운 스토브를 만졌습니다).",
            "They touched each other's hands (그들은 서로의 손을 만졌습니다)."
        ]
    },
    {
        "korean": "잡다",
        "english": "hold",
        "pronunciation": "[hoʊld]",
        "examples": [
            "She held the baby (그녀는 아기를 안았습니다).",
            "He held the door open (그는 문을 열어 두었습니다).",
            "They held a meeting (그들은 회의를 열었습니다)."
        ]
    },
    {
        "korean": "놓다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the book on the table (그녀는 책을 탁자 위에 놓았습니다).",
            "He put on his coat (그는 그의 코트를 입었습니다).",
            "They put the groceries away (그들은 식료품을 치웠습니다)."
        ]
    },
    {
        "korean": "주다",
        "english": "give",
        "pronunciation": "[ɡɪv]",
        "examples": [
            "She gave him a gift (그녀는 그에게 선물을 주었습니다).",
            "He gave a presentation (그는 발표를 했습니다).",
            "They gave their time to help (그들은 도와주기 위해 시간을 내었습니다)."
        ]
    },
    {
        "korean": "받다",
        "english": "receive",
        "pronunciation": "[rɪˈsiːv]",
        "examples": [
            "She received a letter (그녀는 편지를 받았습니다).",
            "He received an award (그는 상을 받았습니다).",
            "They received a warm welcome (그들은 따뜻한 환영을 받았습니다)."
        ]
    },
    {
        "korean": "고르다",
        "english": "choose",
        "pronunciation": "[tʃuːz]",
        "examples": [
            "She chose a red dress (그녀는 빨간 드레스를 골랐습니다).",
            "He chose to stay home (그는 집에 있기로 선택했습니다).",
            "They chose a new leader (그들은 새로운 리더를 선택했습니다)."
        ]
    },
    {
        "korean": "설명하다",
        "english": "explain",
        "pronunciation": "[ɪkˈspleɪn]",
        "examples": [
            "She explained the rules (그녀는 규칙을 설명했습니다).",
            "He explained the situation (그는 상황을 설명했습니다).",
            "They explained their decision (그들은 그들의 결정을 설명했습니다)."
        ]
    },
    {
        "korean": "이해하다",
        "english": "understand",
        "pronunciation": "[ˌʌndərˈstænd]",
        "examples": [
            "She understands the problem (그녀는 문제를 이해합니다).",
            "He understood her feelings (그는 그녀의 감정을 이해했습니다).",
            "They understand each other (그들은 서로를 이해합니다)."
        ]
    },
    {
        "korean": "알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the answer (그녀는 답을 알고 있습니다).",
            "He knew the way (그는 길을 알고 있었습니다).",
            "They know the truth (그들은 진실을 알고 있습니다)."
        ]
    },
    {
        "korean": "믿다",
        "english": "believe",
        "pronunciation": "[bɪˈliːv]",
        "examples": [
            "She believes in herself (그녀는 자신을 믿습니다).",
            "He believed her story (그는 그녀의 이야기를 믿었습니다).",
            "They believe in hard work (그들은 열심히 일하는 것을 믿습니다)."
        ]
    },
    {
        "korean": "의심하다",
        "english": "doubt",
        "pronunciation": "[daʊt]",
        "examples": [
            "She doubts his words (그녀는 그의 말을 의심합니다).",
            "He doubted the outcome (그는 결과를 의심했습니다).",
            "They doubt their ability (그들은 자신의 능력을 의심합니다)."
        ]
    },
    {
        "korean": "전화하다",
        "english": "call",
        "pronunciation": "[kɔːl]",
        "examples": [
            "She called her friend (그녀는 친구에게 전화했습니다).",
            "He called the police (그는 경찰에 전화했습니다).",
            "They called for help (그들은 도움을 요청했습니다)."
        ]
    },
    {
        "korean": "기억하다",
        "english": "recall",
        "pronunciation": "[rɪˈkɔːl]",
        "examples": [
            "She recalled the event (그녀는 그 사건을 기억해냈습니다).",
            "He recalls his childhood (그는 자신의 어린 시절을 기억합니다).",
            "They recalled their promise (그들은 약속을 기억해냈습니다)."
        ]
    },
    {
        "korean": "말하다",
        "english": "say",
        "pronunciation": "[seɪ]",
        "examples": [
            "She said hello (그녀는 인사했습니다).",
            "He said he was sorry (그는 미안하다고 말했습니다).",
            "They said they would come (그들은 오겠다고 말했습니다)."
        ]
    },
    {
        "korean": "말하다",
        "english": "speak",
        "pronunciation": "[spiːk]",
        "examples": [
            "She speaks three languages (그녀는 세 가지 언어를 말합니다).",
            "He spoke to the audience (그는 청중에게 연설했습니다).",
            "They speak often (그들은 자주 대화합니다)."
        ]
    },
    {
        "korean": "이야기하다",
        "english": "talk",
        "pronunciation": "[tɔːk]",
        "examples": [
            "She talks to her friends (그녀는 친구들과 이야기합니다).",
            "He talked about his day (그는 자신의 하루에 대해 이야기했습니다).",
            "They talked for hours (그들은 몇 시간 동안 이야기했습니다)."
        ]
    },
    {
        "korean": "웃다",
        "english": "laugh",
        "pronunciation": "[læf]",
        "examples": [
            "She laughed at the joke (그녀는 농담을 듣고 웃었습니다).",
            "He made her laugh (그는 그녀를 웃게 했습니다).",
            "They laughed together (그들은 함께 웃었습니다)."
        ]
    },
    {
        "korean": "울다",
        "english": "cry",
        "pronunciation": "[kraɪ]",
        "examples": [
            "She cried during the movie (그녀는 영화 보는 동안 울었습니다).",
            "He cried for help (그는 도움을 요청했습니다).",
            "They cried tears of joy (그들은 기쁨의 눈물을 흘렸습니다)."
        ]
    },
    {
        "korean": "도와주다",
        "english": "help",
        "pronunciation": "[hɛlp]",
        "examples": [
            "She helped him with his homework (그녀는 그의 숙제를 도와주었습니다).",
            "He helps around the house (그는 집안일을 도와줍니다).",
            "They help each other (그들은 서로를 도와줍니다)."
        ]
    },
    {
        "korean": "준비하다",
        "english": "prepare",
        "pronunciation": "[prɪˈpɛr]",
        "examples": [
            "She prepared dinner (그녀는 저녁을 준비했습니다).",
            "He prepared for the exam (그는 시험을 준비했습니다).",
            "They prepared a presentation (그들은 발표를 준비했습니다)."
        ]
    },
    {
        "korean": "청소하다",
        "english": "clean",
        "pronunciation": "[kliːn]",
        "examples": [
            "She cleaned the house (그녀는 집을 청소했습니다).",
            "He cleaned his room (그는 자신의 방을 청소했습니다).",
            "They clean every weekend (그들은 매주 주말에 청소합니다)."
        ]
    },
    {
        "korean": "운동하다",
        "english": "exercise",
        "pronunciation": "[ˈɛksərˌsaɪz]",
        "examples": [
            "She exercises every morning (그녀는 매일 아침 운동합니다).",
            "He exercised for an hour (그는 한 시간 동안 운동했습니다).",
            "They exercise together (그들은 함께 운동합니다)."
        ]
    },
    {
        "korean": "요리하다",
        "english": "cook",
        "pronunciation": "[kʊk]",
        "examples": [
            "She cooks dinner every night (그녀는 매일 밤 저녁을 요리합니다).",
            "He cooked a delicious meal (그는 맛있는 식사를 요리했습니다).",
            "They cook together on weekends (그들은 주말에 함께 요리합니다)."
        ]
    },
    {
        "korean": "사다",
        "english": "buy",
        "pronunciation": "[baɪ]",
        "examples": [
            "She bought a new dress (그녀는 새 드레스를 샀습니다).",
            "He buys groceries every week (그는 매주 식료품을 삽니다).",
            "They bought a house (그들은 집을 샀습니다)."
        ]
    },
    {
        "korean": "팔다",
        "english": "sell",
        "pronunciation": "[sɛl]",
        "examples": [
            "She sold her car (그녀는 차를 팔았습니다).",
            "He sells fruits at the market (그는 시장에서 과일을 팝니다).",
            "They sold their old house (그들은 오래된 집을 팔았습니다)."
        ]
    },
    {
        "korean": "빌리다",
        "english": "borrow",
        "pronunciation": "[ˈbɑːroʊ]",
        "examples": [
            "She borrowed a book from the library (그녀는 도서관에서 책을 빌렸습니다).",
            "He borrowed money from a friend (그는 친구에게 돈을 빌렸습니다).",
            "They borrowed a car for the trip (그들은 여행을 위해 차를 빌렸습니다)."
        ]
    },
    {
        "korean": "빌려주다",
        "english": "lend",
        "pronunciation": "[lɛnd]",
        "examples": [
            "She lent him her pen (그녀는 그에게 펜을 빌려주었습니다).",
            "He lends money to his friends (그는 친구들에게 돈을 빌려줍니다).",
            "They lent their car to a neighbor (그들은 이웃에게 차를 빌려주었습니다)."
        ]
    },
    {
        "korean": "가지다",
        "english": "have",
        "pronunciation": "[hæv]",
        "examples": [
            "She has a dog (그녀는 개를 키우고 있습니다).",
            "He had a great time (그는 좋은 시간을 보냈습니다).",
            "They have three children (그들은 세 명의 자녀가 있습니다)."
        ]
    },
    {
        "korean": "사용하다",
        "english": "use",
        "pronunciation": "[juːz]",
        "examples": [
            "She uses a computer (그녀는 컴퓨터를 사용합니다).",
            "He used a map to find the way (그는 길을 찾기 위해 지도를 사용했습니다).",
            "They use public transportation (그들은 대중교통을 이용합니다)."
        ]
    },
    {
        "korean": "놀다",
        "english": "play",
        "pronunciation": "[pleɪ]",
        "examples": [
            "She plays the piano (그녀는 피아노를 연주합니다).",
            "He played soccer yesterday (그는 어제 축구를 했습니다).",
            "They play with their children (그들은 아이들과 놉니다)."
        ]
    },
    {
        "korean": "여행하다",
        "english": "travel",
        "pronunciation": "[ˈtrævəl]",
        "examples": [
            "She travels a lot (그녀는 여행을 많이 합니다).",
            "He traveled to Europe last summer (그는 지난 여름에 유럽을 여행했습니다).",
            "They travel together (그들은 함께 여행합니다)."
        ]
    },
    {
        "korean": "방문하다",
        "english": "visit",
        "pronunciation": "[ˈvɪzɪt]",
        "examples": [
            "She visits her parents every weekend (그녀는 매주 주말에 부모님을 방문합니다).",
            "He visited the museum (그는 박물관을 방문했습니다).",
            "They visited their friends (그들은 친구들을 방문했습니다)."
        ]
    },
    {
        "korean": "떠나다",
        "english": "leave",
        "pronunciation": "[liːv]",
        "examples": [
            "She leaves for work at 8 AM (그녀는 오전 8시에 출근합니다).",
            "He left the party early (그는 파티에서 일찍 떠났습니다).",
            "They leave tomorrow (그들은 내일 떠납니다)."
        ]
    },
    {
        "korean": "도착하다",
        "english": "arrive",
        "pronunciation": "[əˈraɪv]",
        "examples": [
            "She arrived at the station (그녀는 역에 도착했습니다).",
            "He arrived late (그는 늦게 도착했습니다).",
            "They arrived safely (그들은 안전하게 도착했습니다)."
        ]
    },
    {
        "korean": "머물다",
        "english": "stay",
        "pronunciation": "[steɪ]",
        "examples": [
            "She stayed at a hotel (그녀는 호텔에 머물렀습니다).",
            "He stayed home all day (그는 하루 종일 집에 있었습니다).",
            "They stay with their grandparents (그들은 조부모님과 함께 지냅니다)."
        ]
    },
    {
        "korean": "이사하다",
        "english": "move",
        "pronunciation": "[muːv]",
        "examples": [
            "She moved to a new apartment (그녀는 새 아파트로 이사했습니다).",
            "He moved the furniture (그는 가구를 옮겼습니다).",
            "They moved to the city (그들은 도시로 이사했습니다)."
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
  
    document.querySelector('button[onclick="pronounceWord(1)"]').addEventListener('click', () => pronounceWord(1));
    document.querySelector('button[onclick="pronounceWord(5)"]').addEventListener('click', () => pronounceWord(5));
    document.querySelector('button[onclick="pronounceWord(10)"]').addEventListener('click', () => pronounceWord(10));
    document.querySelector('button[onclick="stopPronouncing()"]').addEventListener('click', stopPronouncing);
    document.querySelector('button[onclick="nextWord()"]').addEventListener('click', nextWord);
    document.querySelector('button[onclick="autoPlay()"]').addEventListener('click', autoPlay);
  
    updateWord();
    setTimeout(() => pronounceWord(1), 2000); // 페이지 로드 후 2초 지연
  });
