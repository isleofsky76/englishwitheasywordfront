const words = [
    {
        "english": "Accuse",
        "definition": "To charge someone with a wrongdoing or to state that someone has committed an offense or fault. When you accuse someone, you assert that they are responsible for a particular misdeed or crime.<br><br>(누군가를 잘못한 일로 고발하거나 누군가가 범죄나 잘못을 저질렀다고 말하는 것. 누군가를 고발할 때, 그들이 특정한 잘못이나 범죄에 대해 책임이 있다고 주장하는 것)",
        "pronunciation": "[əˈkjuːz]",
        "examples": [
            "The prosecutor accused the defendant of theft (검사는 피고를 절도 혐의로 기소했다).",
            "She was accused of lying during the investigation (그녀는 조사 중에 거짓말을 했다고 비난받았다)."
        ]
    },
    {
        "english": "Address",
        "definition": "To speak to; to direct one's attention to.<br><br>(말하다; 주의를 기울이다)",
        "pronunciation": "[əˈdrɛs]",
        "examples": [
            "She addressed the crowd with confidence (그녀는 자신감을 가지고 군중에게 연설했다).",
            "We need to address the issue immediately (우리는 즉시 문제를 해결해야 합니다)."
        ]
    },
    {
        "english": "Apologize",
        "definition": "To express regret for something that one has done wrong.<br><br>(잘못한 일에 대해 사과하다)",
        "pronunciation": "[əˈpɑːləˌdʒaɪz]",
        "examples": [
            "He apologized for being late (그는 늦은 것에 대해 사과했다).",
            "She apologized to her friend for the mistake (그녀는 실수에 대해 친구에게 사과했다)."
        ]
    },
    {
        "english": "Arrest",
        "definition": "To take someone into custody, typically by the police.<br><br>(주로 경찰이 누군가를 구금하다)",
        "pronunciation": "[əˈrɛst]",
        "examples": [
            "The police arrested the suspect at the scene (경찰이 현장에서 용의자를 체포했다).",
            "He was arrested for theft (그는 절도 혐의로 체포되었다)."
        ]
    },
    {
        "english": "Arrive",
        "definition": "To reach a destination.<br><br>(목적지에 도착하다)",
        "pronunciation": "[əˈraɪv]",
        "examples": [
            "We arrived at the airport early (우리는 일찍 공항에 도착했다).",
            "The train arrived on time (기차가 제시간에 도착했다)."
        ]
    },
    {
        "english": "Attract",
        "definition": "To draw by appealing to the emotions or senses.<br><br>(감정이나 감각에 호소하여 끌어당기다)",
        "pronunciation": "[əˈtrækt]",
        "examples": [
            "The garden attracts many visitors (정원은 많은 방문객을 끌어들인다).",
            "She attracts attention wherever she goes (그녀는 어디를 가든 주목을 끈다)."
        ]
    },
    {
        "english": "Autumn",
        "definition": "The season between summer and winter.<br><br>(여름과 겨울 사이의 계절)",
        "pronunciation": "[ˈɔːtəm]",
        "examples": [
            "The leaves change color in autumn (가을에는 잎이 색깔이 변한다).",
            "We love to go hiking in the autumn (우리는 가을에 하이킹 가는 것을 좋아한다)."
        ]
    },
    {
        "english": "Bank",
        "definition": "An institution for receiving, keeping, and lending money.<br><br>(돈을 수령하고 보관하며 대출하는 기관)",
        "pronunciation": "[bæŋk]",
        "examples": [
            "She deposited the check at the bank (그녀는 은행에 수표를 입금했다).",
            "He works at a local bank (그는 지역 은행에서 일한다)."
        ]
    },
    {
        "english": "Begin",
        "definition": "To start or commence something.<br><br>(무엇인가를 시작하다)",
        "pronunciation": "[bɪˈɡɪn]",
        "examples": [
            "The meeting will begin at 10 AM (회의는 오전 10시에 시작됩니다).",
            "She began to cry (그녀는 울기 시작했다)."
        ]
    },
    {
        "english": "Believe",
        "definition": "To accept as true or real.<br><br>(사실이나 실제로 받아들이다)",
        "pronunciation": "[bɪˈliːv]",
        "examples": [
            "I believe in you (나는 당신을 믿습니다).",
            "She believes that anything is possible (그녀는 모든 것이 가능하다고 믿는다)."
        ]
    },
    {
        "english": "Belong",
        "definition": "To be the property of or be a member of.<br><br>(소유하거나 일원이 되다)",
        "pronunciation": "[bɪˈlɔŋ]",
        "examples": [
            "This book belongs to me (이 책은 내 것입니다).",
            "He belongs to the chess club (그는 체스 동아리에 소속되어 있다)."
        ]
    },
    {
        "english": "Bend",
        "definition": "To curve or cause to curve.<br><br>(구부리다 또는 구부러지게 하다)",
        "pronunciation": "[bɛnd]",
        "examples": [
            "She bent down to pick up the coin (그녀는 동전을 줍기 위해 몸을 숙였다).",
            "The road bends to the left (도로가 왼쪽으로 굽어있다)."
        ]
    },
    {
        "english": "Bill",
        "definition": "A statement of money owed for goods or services supplied.<br><br>(공급된 상품 또는 서비스에 대한 돈을 청구하는 명세서)",
        "pronunciation": "[bɪl]",
        "examples": [
            "The bill for dinner was expensive (저녁 식사 비용이 비쌌다).",
            "He paid the electricity bill (그는 전기 요금을 지불했다)."
        ]
    },
    {
        "english": "Bore",
        "definition": "To make someone feel weary and uninterested.<br><br>(누군가를 지루하고 흥미를 잃게 하다)",
        "pronunciation": "[bɔːr]",
        "examples": [
            "His long speech bored the audience (그의 긴 연설은 청중을 지루하게 했다).",
            "She was bored during the lecture (그녀는 강의 도중에 지루했다)."
        ]
    },
    {
        "english": "Breeze",
        "definition": "A gentle wind.<br><br>(부드러운 바람)",
        "pronunciation": "[briːz]",
        "examples": [
            "A cool breeze was blowing (시원한 바람이 불고 있었다).",
            "We enjoyed the evening breeze (우리는 저녁 바람을 즐겼다)."
        ]
    },
    {
        "english": "Bullet",
        "definition": "A projectile for firing from a gun.<br><br>(총에서 발사되는 탄환)",
        "pronunciation": "[ˈbʊlɪt]",
        "examples": [
            "The bullet hit the target (탄환이 표적에 맞았다).",
            "He loaded the gun with bullets (그는 총에 탄환을 장전했다)."
        ]
    },
    {
        "english": "Burden",
        "definition": "A heavy load or responsibility.<br><br>(무거운 짐 또는 책임)",
        "pronunciation": "[ˈbɜrdən]",
        "examples": [
            "He carried the burden alone (그는 혼자서 짐을 나르었다).",
            "The burden of proof lies with the prosecution (증명 책임은 검찰 측에 있다)."
        ]
    },
    {
        "english": "Bury",
        "definition": "To place a dead body in the ground.<br><br>(죽은 몸을 땅에 묻다)",
        "pronunciation": "[ˈbɛri]",
        "examples": [
            "They buried the treasure in the backyard (그들은 뒷마당에 보물을 묻었다).",
            "She was buried in her hometown (그녀는 고향에 묻혔다)."
        ]
    },
    {
        "english": "Case",
        "definition": "An instance of a particular situation; an example of something occurring.<br><br>(특정 상황의 예; 어떤 일이 발생한 사례)",
        "pronunciation": "[keɪs]",
        "examples": [
            "The case was solved by the detective (그 사건은 탐정에 의해 해결되었다).",
            "It's a simple case of right and wrong (그것은 옳고 그름의 간단한 문제다)."
        ]
    },
    {
        "english": "Cash",
        "definition": "Money in coins or notes, as distinct from checks, money orders, or credit.<br><br>(수표, 송금, 신용과 구별되는 동전이나 지폐로 된 돈)",
        "pronunciation": "[kæʃ]",
        "examples": [
            "She paid in cash (그녀는 현금으로 지불했다).",
            "The store only accepts cash (그 가게는 현금만 받습니다)."
        ]
    },
    {
        "english": "Ceremony",
        "definition": "A formal event held in honor of a special occasion.<br><br>(특별한 행사를 기념하기 위해 열리는 공식 행사)",
        "pronunciation": "[ˈsɛrəˌmoʊni]",
        "examples": [
            "The wedding ceremony was beautiful (결혼식은 아름다웠다).",
            "They attended the award ceremony (그들은 시상식에 참석했다)."
        ]
    },
    {
        "english": "Charity",
        "definition": "An organization set up to provide help and raise money for those in need.<br><br>(도움이 필요한 사람들을 돕고 돈을 모으기 위해 설립된 단체)",
        "pronunciation": "[ˈʧærɪti]",
        "examples": [
            "She donates money to charity (그녀는 자선 단체에 돈을 기부한다).",
            "They organized a charity event (그들은 자선 행사를 조직했다)."
        ]
    },
    {
        "english": "Chew",
        "definition": "To bite and work food in the mouth with the teeth.<br><br>(이로 음식을 물고 씹다)",
        "pronunciation": "[ʧuː]",
        "examples": [
            "She chewed her food slowly (그녀는 음식을 천천히 씹었다).",
            "He chews gum all the time (그는 항상 껌을 씹는다)."
        ]
    },
    {
        "english": "Close",
        "definition": "To move so as to cover an opening; shut.<br><br>(열린 곳을 덮기 위해 움직이다; 닫다)",
        "pronunciation": "[kloʊz]",
        "examples": [
            "Please close the door (문을 닫아 주세요).",
            "The store closes at 9 PM (가게는 오후 9시에 문을 닫습니다)."
        ]
    },
    {
        "english": "Combine",
        "definition": "To unite or merge two or more things.<br><br>(두 개 이상의 것을 결합하거나 통합하다)",
        "pronunciation": "[kəmˈbaɪn]",
        "examples": [
            "We combined our resources to finish the project (우리는 프로젝트를 마치기 위해 자원을 결합했다).",
            "The flavors combine well (그 맛들은 잘 어울린다)."
        ]
    },
    {
        "english": "Communicate",
        "definition": "To share or exchange information, news, or ideas.<br><br>(정보, 뉴스 또는 아이디어를 공유하거나 교환하다)",
        "pronunciation": "[kəˈmjunɪˌkeɪt]",
        "examples": [
            "They communicate by email (그들은 이메일로 소통한다).",
            "Good leaders communicate effectively (좋은 리더는 효과적으로 소통한다)."
        ]
    },
    {
        "english": "Compose",
        "definition": "To write or create a work of art, especially music or poetry.<br><br>(특히 음악이나 시와 같은 예술 작품을 쓰거나 창작하다)",
        "pronunciation": "[kəmˈpoʊz]",
        "examples": [
            "He composed a beautiful song (그는 아름다운 노래를 작곡했다).",
            "She composed a letter to her friend (그녀는 친구에게 편지를 썼다)."
        ]
    },
    {
        "english": "Condition",
        "definition": "The state of something with regard to its appearance, quality, or working order.<br><br>(외관, 품질 또는 작동 상태와 관련된 무언가의 상태)",
        "pronunciation": "[kənˈdɪʃən]",
        "examples": [
            "The car is in good condition (차가 좋은 상태에 있다).",
            "He has a medical condition (그는 건강 상태가 안 좋다)."
        ]
    },
    {
        "english": "Confuse",
        "definition": "To make someone unable to think clearly.<br><br>(누군가를 명확하게 생각할 수 없게 만들다)",
        "pronunciation": "[kənˈfjuz]",
        "examples": [
            "The instructions confused me (지침이 나를 혼란스럽게 했다).",
            "She often confuses the two words (그녀는 종종 그 두 단어를 혼동한다)."
        ]
    },
    {
        "english": "Congratulation",
        "definition": "An expression of praise for an achievement or good wishes on a special occasion.<br><br>(성취에 대한 칭찬 표현 또는 특별한 행사에 대한 축하 인사)",
        "pronunciation": "[kənˌɡræʧəˈleɪʃən]",
        "examples": [
            "Congratulations on your promotion (승진을 축하합니다).",
            "He received many congratulations (그는 많은 축하를 받았다)."
        ]
    },
    {
        "english": "Consider",
        "definition": "To think about something carefully, especially before making a decision.<br><br>(특히 결정을 내리기 전에 무언가를 신중히 생각하다)",
        "pronunciation": "[kənˈsɪdər]",
        "examples": [
            "She is considering a career change (그녀는 직업 변화를 고려하고 있다).",
            "Please consider my application (제 신청서를 고려해 주세요)."
        ]
    },
    {
        "english": "Consist",
        "definition": "To be made up or composed of.<br><br>(구성되거나 이루어지다)",
        "pronunciation": "[kənˈsɪst]",
        "examples": [
            "The team consists of five players (팀은 다섯 명의 선수로 구성되어 있다).",
            "Her diet consists mainly of fruits and vegetables (그녀의 식단은 주로 과일과 채소로 구성되어 있다)."
        ]
    },
    {
        "english": "Continue",
        "definition": "To persist in an activity or process.<br><br>(활동이나 과정을 지속하다)",
        "pronunciation": "[kənˈtɪnju]",
        "examples": [
            "We will continue our meeting after lunch (우리는 점심 후에 회의를 계속할 것이다).",
            "He continued to work despite the pain (그는 고통에도 불구하고 일을 계속했다)."
        ]
    },
    {
        "english": "Contribute",
        "definition": "To give something, especially money, in order to help achieve or provide something.<br><br>(특히 무언가를 달성하거나 제공하기 위해 무엇을 기부하다)",
        "pronunciation": "[kənˈtrɪbjut]",
        "examples": [
            "Many people contributed to the charity (많은 사람들이 자선단체에 기부했다).",
            "She contributes articles to the magazine (그녀는 잡지에 기사를 기고한다)."
        ]
    },
    {
        "english": "Conversation",
        "definition": "A talk between two or more people in which thoughts, feelings, and ideas are expressed, questions are asked, and answers are given.<br><br>(생각, 감정, 아이디어가 표현되고 질문과 답변이 오가는 두 사람 이상 간의 대화)",
        "pronunciation": "[ˌkɑnvərˈseɪʃən]",
        "examples": [
            "They had a long conversation about their future (그들은 미래에 대해 긴 대화를 나누었다).",
            "I overheard their conversation (나는 그들의 대화를 엿들었다)."
        ]
    },
    {
        "english": "Convert",
        "definition": "To change something into a different form or properties.<br><br>(무언가를 다른 형태나 특성으로 바꾸다)",
        "pronunciation": "[kənˈvɜrt]",
        "examples": [
            "She converted the attic into a study (그녀는 다락방을 서재로 개조했다).",
            "He converted to a different religion (그는 다른 종교로 개종했다)."
        ]
    },
    {
        "english": "Crop",
        "definition": "A cultivated plant that is grown as food, especially a grain, fruit, or vegetable.<br><br>(음식으로 재배되는 작물, 특히 곡물, 과일 또는 채소)",
        "pronunciation": "[krɑp]",
        "examples": [
            "The farmers harvested their crops (농부들은 작물을 수확했다).",
            "The main crop of this region is rice (이 지역의 주요 작물은 쌀이다)."
        ]
    },
    {
        "english": "Culture",
        "definition": "The arts and other manifestations of human intellectual achievement regarded collectively.<br><br>(집합적으로 간주되는 인간 지적 성취의 예술 및 기타 표현)",
        "pronunciation": "[ˈkʌlʧər]",
        "examples": [
            "We learned about ancient cultures (우리는 고대 문화에 대해 배웠다).",
            "The festival celebrates local culture (그 축제는 지역 문화를 기념한다)."
        ]
    },
    {
        "english": "Curiosity",
        "definition": "A strong desire to know or learn something.<br><br>(무언가를 알고 배우고자 하는 강한 욕망)",
        "pronunciation": "[ˌkjʊriˈɑsəti]",
        "examples": [
            "Her curiosity led her to explore the island (그녀의 호기심은 그녀를 섬을 탐험하게 만들었다).",
            "Children have a natural curiosity about the world (아이들은 세상에 대해 자연스러운 호기심을 가지고 있다)."
        ]
    },
    {
        "english": "Custom",
        "definition": "A traditional and widely accepted way of behaving or doing something that is specific to a particular society, place, or time.<br><br>(특정 사회, 장소, 시간에 특정한 행동 방식이나 무언가를 하는 전통적이고 널리 받아들여진 방법)",
        "pronunciation": "[ˈkʌstəm]",
        "examples": [
            "It's a custom to shake hands when meeting someone (누군가를 만날 때 악수하는 것은 관습이다).",
            "They follow their own customs and traditions (그들은 그들만의 관습과 전통을 따른다)."
        ]
    },
    {
        "english": "Declare",
        "definition": "To make known formally or officially.<br><br>(공식적으로 알리다)",
        "pronunciation": "[dɪˈklɛr]",
        "examples": [
            "She declared her intention to run for mayor (그녀는 시장 출마 의사를 밝혔다).",
            "The country declared independence (그 나라는 독립을 선언했다)."
        ]
    },
    {
        "english": "Decorate",
        "definition": "To make something look more attractive by adding items or images to it.<br><br>(무언가를 더 매력적으로 보이게 하려고 아이템이나 이미지를 추가하다)",
        "pronunciation": "[ˈdɛkəˌreɪt]",
        "examples": [
            "They decorated the house for the holidays (그들은 휴일을 위해 집을 장식했다).",
            "She decorated the cake with flowers (그녀는 꽃으로 케이크를 장식했다)."
        ]
    },
    {
        "english": "Departure",
        "definition": "The act of leaving, especially to start a journey.<br><br>(떠나는 행위, 특히 여행을 시작하기 위해)",
        "pronunciation": "[dɪˈpɑrtʃər]",
        "examples": [
            "The plane's departure was delayed (비행기 출발이 지연되었다).",
            "They were sad about her departure (그들은 그녀의 떠남에 슬퍼했다)."
        ]
    },
    {
        "english": "Depress",
        "definition": "To make someone feel sad or without enthusiasm.<br><br>(누군가를 슬프게 하거나 열의를 잃게 하다)",
        "pronunciation": "[dɪˈprɛs]",
        "examples": [
            "The gloomy weather depressed everyone (음울한 날씨는 모두를 우울하게 만들었다).",
            "He was depressed by the news (그는 그 소식에 우울해졌다)."
        ]
    },
    {
        "english": "Describe",
        "definition": "To give an account in words of someone or something, including all the relevant characteristics, qualities, or events.<br><br>(누군가 또는 무언가의 관련된 모든 특성, 품질, 또는 사건을 설명하다)",
        "pronunciation": "[dɪˈskraɪb]",
        "examples": [
            "She described the scene in detail (그녀는 장면을 상세히 설명했다).",
            "Can you describe what happened? (무슨 일이 있었는지 설명해 줄 수 있나요?)"
        ]
    },
    {
        "english": "Destroy",
        "definition": "To end the existence of something by damaging or attacking it.<br><br>(손상시키거나 공격하여 무언가의 존재를 끝내다)",
        "pronunciation": "[dɪˈstrɔɪ]",
        "examples": [
            "The building was destroyed by fire (그 건물은 불에 의해 파괴되었다).",
            "They plan to destroy the old bridge (그들은 오래된 다리를 철거할 계획이다)."
        ]
    },
    {
        "english": "Device",
        "definition": "A thing made or adapted for a particular purpose, especially a piece of mechanical or electronic equipment.<br><br>(특정 목적을 위해 만들어지거나 적응된 것, 특히 기계나 전자 장비)",
        "pronunciation": "[dɪˈvaɪs]",
        "examples": [
            "She bought a new electronic device (그녀는 새로운 전자 장치를 샀다).",
            "The device is used for measuring temperature (그 장치는 온도를 측정하는 데 사용된다)."
        ]
    },
    {
        "english": "Die",
        "definition": "To stop living.<br><br>(살아있는 것을 멈추다)",
        "pronunciation": "[daɪ]",
        "examples": [
            "The plant died from lack of water (식물이 물 부족으로 죽었다).",
            "He died peacefully in his sleep (그는 잠자다 평화롭게 죽었다)."
        ]
    },
    {
        "english": "Diet",
        "definition": "The kinds of food that a person, animal, or community habitually eats.<br><br>(사람, 동물, 또는 공동체가 습관적으로 먹는 음식의 종류)",
        "pronunciation": "[ˈdaɪət]",
        "examples": [
            "She is on a strict diet (그녀는 엄격한 다이어트를 하고 있다).",
            "His diet includes a lot of vegetables (그의 식단에는 많은 채소가 포함되어 있다)."
        ]
    },
    {
        "english": "Difference",
        "definition": "A point or way in which people or things are not the same.<br><br>(사람이나 사물이 같지 않은 점이나 방법)",
        "pronunciation": "[ˈdɪfərəns]",
        "examples": [
            "There is a big difference between the two (그 두 가지 사이에는 큰 차이가 있다).",
            "She noticed the difference in quality (그녀는 품질의 차이를 알아챘다)."
        ]
    },
    {
        "english": "Direction",
        "definition": "The course along which someone or something moves.<br><br>(누군가 또는 무언가가 이동하는 경로)",
        "pronunciation": "[dəˈrɛkʃən]",
        "examples": [
            "She asked for directions to the museum (그녀는 박물관으로 가는 길을 물었다).",
            "The wind changed direction (바람의 방향이 바뀌었다)."
        ]
    },
    {
        "english": "Disappoint",
        "definition": "To fail to fulfill the hopes or expectations of someone.<br><br>(누군가의 희망이나 기대를 충족시키지 못하다)",
        "pronunciation": "[ˌdɪsəˈpɔɪnt]",
        "examples": [
            "The movie disappointed her (그 영화는 그녀를 실망시켰다).",
            "I hate to disappoint you, but we are out of stock (당신을 실망시키기 싫지만, 재고가 없습니다)."
        ]
    },
    {
        "english": "Discover",
        "definition": "To find something or someone unexpectedly or during a search.<br><br>(찾고 있는 도중에 또는 예상치 못하게 무언가 또는 누군가를 찾다)",
        "pronunciation": "[dɪˈskʌvər]",
        "examples": [
            "He discovered a hidden treasure (그는 숨겨진 보물을 발견했다).",
            "They discovered a new species of bird (그들은 새로운 종의 새를 발견했다)."
        ]
    },
    {
        "english": "Dish",
        "definition": "A shallow, flat-bottomed container for cooking or serving food.<br><br>(음식을 요리하거나 제공하기 위한 얕고 평평한 바닥의 용기)",
        "pronunciation": "[dɪʃ]",
        "examples": [
            "She washed the dishes after dinner (그녀는 저녁 식사 후에 설거지를 했다).",
            "The dish was filled with pasta (그 접시는 파스타로 가득 찼다)."
        ]
    },
    {
        "english": "Distance",
        "definition": "The amount of space between two points.<br><br>(두 지점 사이의 공간의 양)",
        "pronunciation": "[ˈdɪstəns]",
        "examples": [
            "The distance between the two cities is 200 miles (두 도시 사이의 거리는 200마일이다).",
            "She could see him in the distance (그녀는 그를 멀리서 볼 수 있었다)."
        ]
    },
    {
        "english": "Distinguish",
        "definition": "To recognize or treat as different.<br><br>(다른 것으로 인식하거나 다르게 대우하다)",
        "pronunciation": "[dɪˈstɪŋɡwɪʃ]",
        "examples": [
            "He can distinguish between right and wrong (그는 옳고 그름을 구별할 수 있다).",
            "She distinguished herself in the competition (그녀는 대회에서 두각을 나타냈다)."
        ]
    },
    {
        "english": "Earthquake",
        "definition": "A sudden and violent shaking of the ground.<br><br>(갑작스럽고 격렬한 지반의 흔들림)",
        "pronunciation": "[ˈɜrθˌkweɪk]",
        "examples": [
            "The earthquake caused widespread damage (지진은 광범위한 피해를 초래했다).",
            "They felt the earthquake early in the morning (그들은 아침 일찍 지진을 느꼈다)."
        ]
    },
    {
        "english": "Electricity",
        "definition": "A form of energy resulting from the existence of charged particles.<br><br>(전하 입자의 존재로 인해 발생하는 에너지 형태)",
        "pronunciation": "[ɪˌlɛkˈtrɪsɪti]",
        "examples": [
            "The electricity went out during the storm (폭풍 동안 전기가 나갔다).",
            "They use electricity to power their homes (그들은 집에 전력을 공급하기 위해 전기를 사용한다)."
        ]
    },
    {
        "english": "Embarrass",
        "definition": "To cause someone to feel awkward, self-conscious, or ashamed.<br><br>(누군가를 어색하게 하거나, 자의식적으로 만들거나, 부끄럽게 하다)",
        "pronunciation": "[ɪmˈbærəs]",
        "examples": [
            "His comments embarrassed her (그의 발언은 그녀를 당황하게 했다).",
            "She was embarrassed by her mistake (그녀는 자신의 실수로 당황했다)."
        ]
    },
    {
        "english": "Emergency",
        "definition": "A serious, unexpected, and often dangerous situation requiring immediate action.<br><br>(심각하고 예상치 못한, 종종 즉각적인 조치를 필요로 하는 위험한 상황)",
        "pronunciation": "[ɪˈmɜrdʒənsi]",
        "examples": [
            "In case of emergency, call 911 (비상시에는 911로 전화하세요).",
            "The hospital is prepared for any emergency (병원은 어떤 응급 상황에도 대비하고 있다)."
        ]
    },
    {
        "english": "Enter",
        "definition": "To come or go into a place.<br><br>(어떤 장소에 들어오거나 들어가다)",
        "pronunciation": "[ˈɛntər]",
        "examples": [
            "She entered the room quietly (그녀는 조용히 방에 들어갔다).",
            "Please enter your password (비밀번호를 입력하세요)."
        ]
    },
    {
        "english": "Entrance",
        "definition": "An opening, such as a door, passage, or gate, that allows access to a place.<br><br>(장소에 접근할 수 있게 하는 문, 통로, 또는 문과 같은 개구부)",
        "pronunciation": "[ˈɛntrəns]",
        "examples": [
            "They stood at the entrance of the building (그들은 건물 입구에 서 있었다).",
            "The entrance fee is $10 (입장료는 10달러입니다)."
        ]
    },
    {
        "english": "Establish",
        "definition": "To set up or create something.<br><br>(무언가를 설립하거나 창설하다)",
        "pronunciation": "[ɪˈstæblɪʃ]",
        "examples": [
            "They established a new company (그들은 새로운 회사를 설립했다).",
            "She established herself as a leading expert (그녀는 선도적인 전문가로 자리 잡았다)."
        ]
    },
    {
        "english": "Exhibition",
        "definition": "A public display of works of art or items of interest.<br><br>(작품이나 관심 있는 항목의 공개 전시)",
        "pronunciation": "[ˌɛksɪˈbɪʃən]",
        "examples": [
            "The art exhibition was a huge success (미술 전시회는 큰 성공을 거두었다).",
            "They visited the new exhibition at the museum (그들은 박물관의 새로운 전시회를 방문했다)."
        ]
    },
    {
        "english": "Expect",
        "definition": "To regard something as likely to happen.<br><br>(무엇인가가 일어날 가능성이 있다고 생각하다)",
        "pronunciation": "[ɪkˈspɛkt]",
        "examples": [
            "We expect good weather tomorrow (우리는 내일 좋은 날씨를 기대한다).",
            "She is expecting a baby (그녀는 아기를 기대하고 있다)."
        ]
    },
    {
        "english": "Explore",
        "definition": "To travel through an area to learn about it.<br><br>(어떤 지역을 배워서 탐험하다)",
        "pronunciation": "[ɪkˈsplɔr]",
        "examples": [
            "They explored the jungle (그들은 정글을 탐험했다).",
            "She loves to explore new places (그녀는 새로운 장소를 탐험하는 것을 좋아한다)."
        ]
    },
    {
        "english": "Expression",
        "definition": "The process of making known one's thoughts or feelings.<br><br>(자신의 생각이나 감정을 알리는 과정)",
        "pronunciation": "[ɪkˈsprɛʃən]",
        "examples": [
            "His face showed a sad expression (그의 얼굴은 슬픈 표정을 보였다).",
            "She has a unique way of expression (그녀는 독특한 표현 방식을 가지고 있다)."
        ]
    },
    {
        "english": "Fee",
        "definition": "A payment made to a professional person or public body in exchange for advice or services.<br><br>(조언이나 서비스와 교환하여 전문가 또는 공공 기관에 지불하는 비용)",
        "pronunciation": "[fiː]",
        "examples": [
            "The lawyer's fee was very high (변호사의 수수료는 매우 높았다).",
            "They charge a small fee for admission (그들은 입장료로 작은 비용을 청구한다)."
        ]
    },
    {
        "english": "Fever",
        "definition": "An abnormally high body temperature, usually accompanied by shivering, headache, and in severe instances, delirium.<br><br>(보통 오한, 두통, 심한 경우에는 섬망을 동반하는 비정상적으로 높은 체온)",
        "pronunciation": "[ˈfiːvər]",
        "examples": [
            "She has a high fever (그녀는 고열이 있다).",
            "The fever lasted for three days (열은 사흘 동안 계속되었다)."
        ]
    },
    {
        "english": "Few",
        "definition": "A small number of.<br><br>(소수의)",
        "pronunciation": "[fjuː]",
        "examples": [
            "There are a few books on the table (테이블 위에 몇 권의 책이 있다).",
            "Few people attended the meeting (회의에 참석한 사람은 거의 없었다)."
        ]
    },
    {
        "english": "Fill",
        "definition": "To make or become full.<br><br>(가득 채우다 또는 가득 차다)",
        "pronunciation": "[fɪl]",
        "examples": [
            "He filled the glass with water (그는 잔을 물로 채웠다).",
            "The room filled with smoke (방이 연기로 가득 찼다)."
        ]
    },
    {
        "english": "Final",
        "definition": "Coming at the end of a series.<br><br>(시리즈의 끝에 오는)",
        "pronunciation": "[ˈfaɪnəl]",
        "examples": [
            "The final exam is next week (기말 시험은 다음 주이다).",
            "They reached the final stage of the competition (그들은 대회의 마지막 단계에 도달했다)."
        ]
    },
    {
        "english": "Finish",
        "definition": "To bring a task or activity to an end; complete.<br><br>(작업이나 활동을 끝내다; 완료하다)",
        "pronunciation": "[ˈfɪnɪʃ]",
        "examples": [
            "She finished her homework (그녀는 숙제를 끝냈다).",
            "He finished the race in first place (그는 경주에서 1위로 결승선을 통과했다)."
        ]
    },
    {
        "english": "Fire",
        "definition": "Combustion or burning, in which substances combine chemically with oxygen from the air and typically give out bright light, heat, and smoke.<br><br>(공기 중의 산소와 화학적으로 결합하여 밝은 빛, 열, 연기를 방출하는 연소 또는 불타는 과정)",
        "pronunciation": "[faɪr]",
        "examples": [
            "The fire destroyed the building (불이 건물을 파괴했다).",
            "They sat by the fire and told stories (그들은 불 옆에 앉아 이야기를 나누었다)."
        ]
    },
    {
        "english": "Fix",
        "definition": "To repair or mend.<br><br>(수리하거나 고치다)",
        "pronunciation": "[fɪks]",
        "examples": [
            "He fixed the broken chair (그는 부러진 의자를 고쳤다).",
            "She fixed the problem quickly (그녀는 문제를 빨리 해결했다)."
        ]
    },
    {
        "english": "Fog",
        "definition": "A thick cloud of tiny water droplets suspended in the atmosphere, obscuring or restricting visibility.<br><br>(대기 중에 떠 있는 작은 물방울로 이루어진 두꺼운 구름, 시야를 흐리거나 제한하는 것)",
        "pronunciation": "[fɔɡ]",
        "examples": [
            "The fog was very thick this morning (오늘 아침 안개가 매우 짙었다).",
            "Driving in the fog can be dangerous (안개 속에서 운전하는 것은 위험할 수 있다)."
        ]
    },
    {
        "english": "Follow",
        "definition": "To go or come after someone or something.<br><br>(누군가 또는 무언가 뒤를 따라가다)",
        "pronunciation": "[ˈfɑloʊ]",
        "examples": [
            "She followed him to the park (그녀는 그를 따라 공원에 갔다).",
            "He follows the instructions carefully (그는 지침을 주의 깊게 따른다)."
        ]
    },
    {
        "english": "Found",
        "definition": "To establish or originate an institution or organization.<br><br>(기관이나 조직을 설립하거나 창설하다)",
        "pronunciation": "[faʊnd]",
        "examples": [
            "They founded a new startup company (그들은 새로운 스타트업 회사를 설립했다).",
            "She founded the charity organization (그녀는 자선 단체를 설립했다)."
        ]
    },
    {
        "english": "Frame",
        "definition": "A rigid structure that surrounds or encloses something such as a door or window.<br><br>(문이나 창문과 같은 것을 둘러싸거나 감싸는 단단한 구조)",
        "pronunciation": "[freɪm]",
        "examples": [
            "She put the photo in a frame (그녀는 사진을 액자에 넣었다).",
            "The window frame needs to be replaced (창틀을 교체해야 합니다)."
        ]
    },
    {
        "english": "Fuel",
        "definition": "A material such as coal, gas, or oil that is burned to produce heat or power.<br><br>(열이나 전력을 생산하기 위해 태워지는 석탄, 가스, 기름과 같은 물질)",
        "pronunciation": "[ˈfjuəl]",
        "examples": [
            "The car runs on diesel fuel (그 차는 디젤 연료로 움직인다).",
            "They need to refuel the airplane (그들은 비행기에 연료를 다시 채워야 한다)."
        ]
    },
    {
        "english": "Garbage",
        "definition": "Waste material, especially unwanted or unusable material.<br><br>(특히 원하지 않거나 사용할 수 없는 폐기물)",
        "pronunciation": "[ˈɡɑrbɪdʒ]",
        "examples": [
            "She took out the garbage (그녀는 쓰레기를 내다 버렸다).",
            "The garbage truck comes every Monday (쓰레기 수거 트럭은 매주 월요일에 온다)."
        ]
    },
    {
        "english": "Germ",
        "definition": "A microorganism, especially one that causes disease.<br><br>(특히 질병을 일으키는 미생물)",
        "pronunciation": "[dʒɜrm]",
        "examples": [
            "Wash your hands to get rid of germs (세균을 없애기 위해 손을 씻으세요).",
            "The germ can cause infections (그 세균은 감염을 일으킬 수 있다)."
        ]
    },
    {
        "english": "Greet",
        "definition": "To give a polite word or sign of welcome or recognition to someone on meeting.<br><br>(만날 때 누군가에게 환영하거나 인사를 나타내는 예의 바른 말이나 신호를 주다)",
        "pronunciation": "[ɡriːt]",
        "examples": [
            "She greeted him with a smile (그녀는 웃으며 그를 맞이했다).",
            "They greeted each other warmly (그들은 따뜻하게 인사를 나누었다)."
        ]
    },
    {
        "english": "Grow",
        "definition": "To undergo natural development by increasing in size and changing physically.<br><br>(크기가 증가하고 신체적으로 변화하면서 자연스럽게 발달하다)",
        "pronunciation": "[ɡroʊ]",
        "examples": [
            "The plants grow quickly in the spring (식물은 봄에 빨리 자란다).",
            "He has grown taller this year (그는 올해 키가 더 자랐다)."
        ]
    },
    {
        "english": "Gun",
        "definition": "A weapon incorporating a metal tube from which bullets, shells, or other missiles are propelled by explosive force.<br><br>(탄환, 포탄, 또는 기타 미사일을 폭발력으로 발사하는 금속 튜브를 포함한 무기)",
        "pronunciation": "[ɡʌn]",
        "examples": [
            "He fired the gun at the target (그는 표적을 향해 총을 발사했다).",
            "She owns a hunting gun (그녀는 사냥용 총을 소유하고 있다)."
        ]
    },
    {
        "english": "Half",
        "definition": "Either of two equal or corresponding parts into which something is or can be divided.<br><br>(무언가가 나뉘거나 나눌 수 있는 두 개의 동등하거나 대응하는 부분 중 하나)",
        "pronunciation": "[hæf]",
        "examples": [
            "He ate half of the pizza (그는 피자의 절반을 먹었다).",
            "The bottle is half full (병이 반쯤 차 있다)."
        ]
    },
    {
        "english": "Hammer",
        "definition": "A tool with a heavy metal head mounted at right angles at the end of a handle, used for jobs such as breaking things and driving in nails.<br><br>(물건을 부수거나 못을 박는 등의 작업에 사용되는 손잡이 끝에 직각으로 장착된 무거운 금속 머리를 가진 도구)",
        "pronunciation": "[ˈhæmər]",
        "examples": [
            "He used a hammer to build the shelf (그는 선반을 만들기 위해 망치를 사용했다).",
            "The hammer broke the stone (망치가 돌을 부쉈다)."
        ]
    },
    {
        "english": "Hang",
        "definition": "To attach or place something so that it is held up without support from below.<br><br>(아래에서 지지받지 않고 떠받쳐지도록 무언가를 붙이거나 배치하다)",
        "pronunciation": "[hæŋ]",
        "examples": [
            "She hung the picture on the wall (그녀는 벽에 그림을 걸었다).",
            "They hang their clothes to dry (그들은 옷을 말리기 위해 걸어 놓는다)."
        ]
    },
    {
        "english": "Height",
        "definition": "The measurement from base to top or (of a standing person) from head to foot.<br><br>(기초에서 꼭대기까지의 측정 또는 (서 있는 사람의 경우) 머리에서 발까지의 측정)",
        "pronunciation": "[haɪt]",
        "examples": [
            "She is afraid of heights (그녀는 고소공포증이 있다).",
            "The height of the building is impressive (건물의 높이가 인상적이다)."
        ]
    },
    {
        "english": "History",
        "definition": "The study of past events, particularly in human affairs.<br><br>(과거 사건, 특히 인간사에서의 사건을 연구하는 학문)",
        "pronunciation": "[ˈhɪstəri]",
        "examples": [
            "He loves to read about history (그는 역사에 관한 책을 읽는 것을 좋아한다).",
            "They studied the history of ancient civilizations (그들은 고대 문명의 역사를 연구했다)."
        ]
    },
    {
        "english": "Humor",
        "definition": "The quality of being amusing or comic, especially as expressed in literature or speech.<br><br>(특히 문학이나 말에서 표현되는 재미있거나 희극적인 특성)",
        "pronunciation": "[ˈhjumər]",
        "examples": [
            "He has a great sense of humor (그는 유머 감각이 뛰어나다).",
            "Her humor always cheers me up (그녀의 유머는 항상 나를 기운 나게 한다)."
        ]
    },
    {
        "english": "Improve",
        "definition": "To make or become better.<br><br>(더 좋게 만들거나 되다)",
        "pronunciation": "[ɪmˈpruv]",
        "examples": [
            "She wants to improve her English skills (그녀는 영어 실력을 향상시키고 싶어 한다).",
            "The weather is improving (날씨가 좋아지고 있다)."
        ]
    },
    {
        "english": "Information",
        "definition": "Facts provided or learned about something or someone.<br><br>(무엇이나 누군가에 대해 제공되거나 학습된 사실)",
        "pronunciation": "[ˌɪnfərˈmeɪʃən]",
        "examples": [
            "We need more information about the project (우리는 프로젝트에 대한 더 많은 정보가 필요하다).",
            "He gave us useful information (그는 우리에게 유용한 정보를 주었다)."
        ]
    },
    {
        "english": "Insist",
        "definition": "To demand something forcefully, not accepting refusal.<br><br>(거절을 받아들이지 않고 강력히 요구하다)",
        "pronunciation": "[ɪnˈsɪst]",
        "examples": [
            "She insisted on paying for dinner (그녀는 저녁 식사 비용을 지불하겠다고 주장했다).",
            "He insists that we stay longer (그는 우리가 더 오래 머물러야 한다고 주장한다)."
        ]
    },
    {
        "english": "Introduce",
        "definition": "To make someone known by name to another in person, especially formally.<br><br>(특히 공식적으로 이름을 알려 사람을 소개하다)",
        "pronunciation": "[ˌɪntrəˈdus]",
        "examples": [
            "She introduced herself to the class (그녀는 반에 자신을 소개했다).",
            "He introduced me to his parents (그는 나를 부모님께 소개했다)."
        ]
    },
    {
        "english": "Investigate",
        "definition": "To carry out a systematic or formal inquiry to discover and examine the facts of an incident, allegation, etc., so as to establish the truth.<br><br>(사실을 발견하고 조사하기 위해 체계적이거나 공식적인 조사를 수행하다)",
        "pronunciation": "[ɪnˈvɛstəˌɡeɪt]",
        "examples": [
            "The police are investigating the crime (경찰이 범죄를 수사하고 있다).",
            "They decided to investigate further (그들은 추가 조사를 하기로 결정했다)."
        ]
    },
    {
        "english": "Invitation",
        "definition": "A written or verbal request inviting someone to go somewhere or to do something.<br><br>(어디로 가거나 무엇을 하도록 요청하는 서면 또는 구두 요청)",
        "pronunciation": "[ˌɪnvɪˈteɪʃən]",
        "examples": [
            "I received an invitation to the party (나는 파티 초대를 받았다).",
            "She sent out wedding invitations (그녀는 결혼식 초대장을 보냈다)."
        ]
    },
    {
        "english": "Invite",
        "definition": "To make a polite, formal, or friendly request to someone to go somewhere or to do something.<br><br>(어디로 가거나 무엇을 하도록 누군가에게 정중하고, 공식적이거나 친근한 요청을 하다)",
        "pronunciation": "[ɪnˈvaɪt]",
        "examples": [
            "He invited her to the concert (그는 그녀를 콘서트에 초대했다).",
            "We invited them over for dinner (우리는 그들을 저녁 식사에 초대했다)."
        ]
    },
    {
        "english": "Jewel",
        "definition": "A precious stone, typically a single crystal or piece of a hard lustrous or translucent mineral cut and polished or engraved.<br><br>(보석, 보통 단일 결정 또는 단단하고 빛나는 또는 반투명의 광물 조각을 절단하고 연마하거나 새긴 것)",
        "pronunciation": "[ˈʤuəl]",
        "examples": [
            "She wore a necklace with a beautiful jewel (그녀는 아름다운 보석이 달린 목걸이를 착용했다).",
            "The crown was decorated with jewels (왕관은 보석으로 장식되어 있었다)."
        ]
    },
    {
        "english": "Jog",
        "definition": "To run at a steady, gentle pace, especially as a form of exercise.<br><br>(특히 운동의 한 형태로 꾸준하고 부드러운 속도로 달리다)",
        "pronunciation": "[ʤɑɡ]",
        "examples": [
            "He jogs every morning (그는 매일 아침 조깅을 한다).",
            "They went for a jog in the park (그들은 공원에서 조깅을 했다)."
        ]
    },
    {
        "english": "Joy",
        "definition": "A feeling of great pleasure and happiness.<br><br>(큰 기쁨과 행복의 감정)",
        "pronunciation": "[ʤɔɪ]",
        "examples": [
            "She felt a great joy when she saw her baby (그녀는 아기를 보았을 때 큰 기쁨을 느꼈다).",
            "The news brought joy to everyone (그 소식은 모두에게 기쁨을 가져다주었다)."
        ]
    },
    {
        "english": "Kingdom",
        "definition": "A country, state, or territory ruled by a king or queen.<br><br>(왕이나 여왕이 다스리는 나라, 주 또는 영토)",
        "pronunciation": "[ˈkɪŋdəm]",
        "examples": [
            "The kingdom was known for its wealth (그 왕국은 부유함으로 유명했다).",
            "He ruled the kingdom wisely (그는 현명하게 왕국을 다스렸다)."
        ]
    },
    {
        "english": "Kite",
        "definition": "A toy consisting of a light frame covered with paper, cloth, or plastic, often provided with a stabilizing tail, designed to be flown in the wind at the end of a long string.<br><br>(가벼운 프레임에 종이, 천 또는 플라스틱을 덮어 만든 장난감으로, 종종 안정 꼬리가 달려 있으며, 긴 줄 끝에 바람에 날리도록 설계됨)",
        "pronunciation": "[kaɪt]",
        "examples": [
            "They flew a kite at the beach (그들은 해변에서 연을 날렸다).",
            "The kite soared high in the sky (연이 하늘 높이 날아올랐다)."
        ]
    },
    {
        "english": "Laundry",
        "definition": "Clothes and linens that need to be washed or that have been newly washed.<br><br>(세탁해야 할 옷과 린넨 또는 새로 세탁한 옷과 린넨)",
        "pronunciation": "[ˈlɔːndri]",
        "examples": [
            "She did the laundry on Saturday (그녀는 토요일에 세탁을 했다).",
            "The laundry is still wet (세탁물이 아직 젖어 있다)."
        ]
    },
    {
        "english": "Lead",
        "definition": "To guide or direct in a course.<br><br>(길을 안내하거나 방향을 잡아주다)",
        "pronunciation": "[liːd]",
        "examples": [
            "He leads the team with confidence (그는 자신감을 가지고 팀을 이끈다).",
            "She led the group to the museum (그녀는 그룹을 박물관으로 안내했다)."
        ]
    },
    {
        "english": "Learn",
        "definition": "To gain or acquire knowledge or skill in something by study, experience, or being taught.<br><br>(공부나 경험, 교육을 통해 지식이나 기술을 습득하다)",
        "pronunciation": "[lɜrn]",
        "examples": [
            "She is learning French (그녀는 프랑스어를 배우고 있다).",
            "They learned a lot from the trip (그들은 여행에서 많은 것을 배웠다)."
        ]
    },
    {
        "english": "Live",
        "definition": "To remain alive or to reside.<br><br>(살아남다 또는 거주하다)",
        "pronunciation": "[lɪv]",
        "examples": [
            "She lives in New York (그녀는 뉴욕에 산다).",
            "He lived a long and happy life (그는 길고 행복한 삶을 살았다)."
        ]
    },
    {
        "english": "Location",
        "definition": "A particular place or position.<br><br>(특정 장소나 위치)",
        "pronunciation": "[loʊˈkeɪʃən]",
        "examples": [
            "The restaurant is in a great location (그 레스토랑은 좋은 위치에 있다).",
            "We need to find a new location for the event (우리는 행사를 위한 새로운 장소를 찾아야 한다)."
        ]
    },
    {
        "english": "Magazine",
        "definition": "A periodical publication containing articles and illustrations, often on a particular subject or aimed at a particular readership.<br><br>(특정 주제나 독자층을 겨냥한 기사와 삽화가 담긴 정기 간행물)",
        "pronunciation": "[ˈmæɡəˌzin]",
        "examples": [
            "She reads fashion magazines (그녀는 패션 잡지를 읽는다).",
            "The magazine features an article on health (그 잡지는 건강에 관한 기사를 실었다)."
        ]
    },
    {
        "english": "Mean",
        "definition": "To intend to convey, indicate, or refer to a particular thing or notion.<br><br>(특정한 것을 전달하거나 나타내거나 언급하고자 하다)",
        "pronunciation": "[min]",
        "examples": [
            "What do you mean by that? (그것은 무슨 뜻인가요?)",
            "He didn't mean to hurt anyone (그는 누구도 다치게 할 의도가 없었다)."
        ]
    },
    {
        "english": "Medicine",
        "definition": "The science or practice of the diagnosis, treatment, and prevention of disease.<br><br>(질병의 진단, 치료 및 예방의 과학 또는 실습)",
        "pronunciation": "[ˈmɛdəsən]",
        "examples": [
            "She is studying medicine (그녀는 의학을 공부하고 있다).",
            "Take this medicine twice a day (이 약을 하루에 두 번 복용하세요)."
        ]
    },
    {
        "english": "Memory",
        "definition": "The faculty by which the mind stores and remembers information.<br><br>(마음이 정보를 저장하고 기억하는 능력)",
        "pronunciation": "[ˈmɛməri]",
        "examples": [
            "She has a good memory for names (그녀는 이름을 잘 기억한다).",
            "The memory of their trip will last forever (그들의 여행 기억은 영원히 남을 것이다)."
        ]
    },
    {
        "english": "Mention",
        "definition": "To refer to something briefly and without going into detail.<br><br>(짧게 언급하다, 자세히 설명하지 않고)",
        "pronunciation": "[ˈmɛnʃən]",
        "examples": [
            "He mentioned your name in the meeting (그는 회의에서 당신의 이름을 언급했다).",
            "Did I mention that I got a new job? (내가 새 직장을 구했다고 말했나요?)"
        ]
    },
    {
        "english": "Method",
        "definition": "A particular form of procedure for accomplishing or approaching something, especially a systematic or established one.<br><br>(무엇을 달성하거나 접근하기 위한 특정한 절차, 특히 체계적이거나 확립된 것)",
        "pronunciation": "[ˈmɛθəd]",
        "examples": [
            "They developed a new method for testing (그들은 새로운 테스트 방법을 개발했다).",
            "Her teaching method is very effective (그녀의 교수법은 매우 효과적이다)."
        ]
    },
    {
        "english": "Minute",
        "definition": "A period of time equal to sixty seconds or a sixtieth of an hour.<br><br>(60초 또는 1시간의 60분의 1에 해당하는 시간의 단위)",
        "pronunciation": "[ˈmɪnɪt]",
        "examples": [
            "I'll be back in a minute (금방 돌아올게요).",
            "The meeting lasted 30 minutes (회의는 30분 동안 지속되었다)."
        ]
    },
    {
        "english": "Miss",
        "definition": "To fail to hit, reach, or come into contact with something aimed at.<br><br>(목표로 한 것에 닿지 못하거나 접촉하지 못하다)",
        "pronunciation": "[mɪs]",
        "examples": [
            "He missed the target (그는 표적을 놓쳤다).",
            "She misses her family (그녀는 가족을 그리워한다)."
        ]
    },
    {
        "english": "Mud",
        "definition": "Soft, sticky matter resulting from the mixing of earth and water.<br><br>(흙과 물이 섞여 생기는 부드럽고 끈적거리는 물질)",
        "pronunciation": "[mʌd]",
        "examples": [
            "The car got stuck in the mud (차가 진흙에 빠졌다).",
            "He slipped and fell in the mud (그는 미끄러져서 진흙에 넘어졌다)."
        ]
    },
    {
        "english": "Orphanage",
        "definition": "A residential institution for the care and education of orphans.<br><br>(고아들을 돌보고 교육하는 주거 기관)",
        "pronunciation": "[ˈɔrfənɪdʒ]",
        "examples": [
            "She grew up in an orphanage (그녀는 고아원에서 자랐다).",
            "The orphanage was founded in 1900 (그 고아원은 1900년에 설립되었다)."
        ]
    },
    {
        "english": "Owe",
        "definition": "To have an obligation to pay or repay something, typically money, in return for something received.<br><br>(받은 것에 대한 대가로 무엇, 특히 돈을 갚아야 할 의무가 있다)",
        "pronunciation": "[oʊ]",
        "examples": [
            "He owes me $10 (그는 나에게 10달러를 빚졌다).",
            "She owes her success to her hard work (그녀의 성공은 그녀의 노력 덕분이다)."
        ]
    },
    {
        "english": "Pair",
        "definition": "A set of two things used together or regarded as a unit.<br><br>(함께 사용되거나 하나의 단위로 간주되는 두 개의 물건 세트)",
        "pronunciation": "[pɛr]",
        "examples": [
            "She bought a new pair of shoes (그녀는 새 신발 한 켤레를 샀다).",
            "They make a good pair (그들은 좋은 한 쌍이다)."
        ]
    },
    {
        "english": "Part",
        "definition": "A piece or segment of something such as an object, activity, or period of time, which combined with other pieces makes up the whole.<br><br>(다른 부분들과 결합하여 전체를 구성하는 물체, 활동, 시간 등의 조각이나 부분)",
        "pronunciation": "[pɑrt]",
        "examples": [
            "This is part of the plan (이것은 계획의 일부입니다).",
            "He played the part of Romeo (그는 로미오 역을 맡았다)."
        ]
    },
    {
        "english": "Pill",
        "definition": "A small round mass of solid medicine to be swallowed whole.<br><br>(통째로 삼키는 작은 둥근 고체 약)",
        "pronunciation": "[pɪl]",
        "examples": [
            "She takes a pill every morning (그녀는 매일 아침 약을 먹는다).",
            "He has difficulty swallowing pills (그는 알약을 삼키는 데 어려움을 겪는다)."
        ]
    },
    {
        "english": "Possess",
        "definition": "To have as belonging to one; own.<br><br>(소유하다; 가지다)",
        "pronunciation": "[pəˈzɛs]",
        "examples": [
            "He possesses great wealth (그는 많은 재산을 가지고 있다).",
            "They possess the skills needed for the job (그들은 그 일을 위해 필요한 기술을 가지고 있다)."
        ]
    },
    {
        "english": "Prediction",
        "definition": "A statement about what will happen or might happen in the future.<br><br>(미래에 일어나거나 일어날 수 있는 일에 대한 진술)",
        "pronunciation": "[prɪˈdɪkʃən]",
        "examples": [
            "Her prediction about the weather was accurate (그녀의 날씨 예측은 정확했다).",
            "The prediction of economic growth is positive (경제 성장 예측은 긍정적이다)."
        ]
    },
    {
        "english": "Price",
        "definition": "The amount of money expected, required, or given in payment for something.<br><br>(무엇을 지불하기 위해 예상되거나 요구되거나 주어지는 금액)",
        "pronunciation": "[praɪs]",
        "examples": [
            "The price of the car is high (그 차의 가격은 비싸다).",
            "He asked for the price of the book (그는 그 책의 가격을 물어봤다)."
        ]
    },
    {
        "english": "Production",
        "definition": "The action of making or manufacturing from components or raw materials.<br><br>(부품이나 원료에서 만들거나 제조하는 행동)",
        "pronunciation": "[prəˈdʌkʃən]",
        "examples": [
            "The production of the new model has started (새 모델의 생산이 시작되었다).",
            "They work in a production line (그들은 생산 라인에서 일한다)."
        ]
    },
    {
        "english": "Prove",
        "definition": "To demonstrate the truth or existence of something by evidence or argument.<br><br>(증거나 논증으로 무엇의 진실이나 존재를 입증하다)",
        "pronunciation": "[pruv]",
        "examples": [
            "She proved her point with solid evidence (그녀는 확실한 증거로 자신의 주장을 입증했다).",
            "He needs to prove his innocence (그는 자신의 무죄를 입증해야 한다)."
        ]
    },
    {
        "english": "Public",
        "definition": "Of or concerning the people as a whole.<br><br>(사람들 전체와 관련된)",
        "pronunciation": "[ˈpʌblɪk]",
        "examples": [
            "The park is open to the public (공원은 대중에게 개방되어 있다).",
            "Public opinion is divided on the issue (대중의 의견이 그 문제에 대해 분열되어 있다)."
        ]
    },
    {
        "english": "Quit",
        "definition": "To leave a place, usually permanently.<br><br>(보통 영구적으로 장소를 떠나다)",
        "pronunciation": "[kwɪt]",
        "examples": [
            "She decided to quit her job (그녀는 직장을 그만두기로 결심했다).",
            "He quit smoking last year (그는 작년에 담배를 끊었다)."
        ]
    },
    {
        "english": "Recognize",
        "definition": "To identify someone or something from having encountered them before.<br><br>(이전에 만난 적이 있어서 누군가나 무언가를 식별하다)",
        "pronunciation": "[ˈrɛkəɡˌnaɪz]",
        "examples": [
            "I recognized him from the conference (나는 그를 회의에서 알아봤다).",
            "She didn't recognize the address (그녀는 그 주소를 알아보지 못했다)."
        ]
    },
    {
        "english": "Recommend",
        "definition": "To put forward someone or something with approval as being suitable for a particular purpose or role.<br><br>(특정 목적이나 역할에 적합하다고 승인하여 누군가나 무언가를 추천하다)",
        "pronunciation": "[ˌrɛkəˈmɛnd]",
        "examples": [
            "I recommend this book to anyone who loves mystery (나는 이 책을 미스터리를 좋아하는 누구에게나 추천한다).",
            "He recommended a good restaurant (그는 좋은 레스토랑을 추천했다)."
        ]
    },
    {
        "english": "Recover",
        "definition": "To return to a normal state of health, mind, or strength.<br><br>(건강, 마음, 힘의 정상 상태로 돌아가다)",
        "pronunciation": "[rɪˈkʌvər]",
        "examples": [
            "She is recovering from her illness (그녀는 병에서 회복 중이다).",
            "He recovered his strength after a good rest (그는 충분한 휴식을 취한 후 힘을 되찾았다)."
        ]
    },
    {
        "english": "Reduce",
        "definition": "To make smaller or less in amount, degree, or size.<br><br>(양, 정도, 크기를 줄이다)",
        "pronunciation": "[rɪˈdus]",
        "examples": [
            "We need to reduce costs (우리는 비용을 줄여야 한다).",
            "She reduced the amount of sugar in the recipe (그녀는 레시피의 설탕 양을 줄였다)."
        ]
    },
    {
        "english": "Refrigerator",
        "definition": "An appliance or compartment that is artificially kept cool and used to store food and drink.<br><br>(인위적으로 차갑게 유지되어 음식과 음료를 저장하는 기기 또는 구획)",
        "pronunciation": "[rɪˈfrɪdʒəˌreɪtər]",
        "examples": [
            "She put the milk in the refrigerator (그녀는 우유를 냉장고에 넣었다).",
            "The refrigerator is full of food (냉장고는 음식으로 가득 차 있다)."
        ]
    },
    {
        "english": "Relax",
        "definition": "To make or become less tense or anxious.<br><br>(긴장이나 불안을 덜게 하다 또는 덜하게 되다)",
        "pronunciation": "[rɪˈlæks]",
        "examples": [
            "She relaxed after a long day at work (그녀는 긴 하루 일과 후에 휴식을 취했다).",
            "He took a hot bath to relax (그는 휴식을 취하기 위해 뜨거운 목욕을 했다)."
        ]
    },
    {
        "english": "Roll",
        "definition": "To move in a particular direction by turning over and over on an axis.<br><br>(축을 따라 반복해서 굴러 특정 방향으로 이동하다)",
        "pronunciation": "[roʊl]",
        "examples": [
            "The ball rolled down the hill (공이 언덕 아래로 굴러갔다).",
            "She rolled the dough flat (그녀는 반죽을 평평하게 폈다)."
        ]
    },
    {
        "english": "Scale",
        "definition": "A device for weighing things or a series of marks at regular intervals in a line used in measuring something.<br><br>(물건을 무게를 재는 장치 또는 무언가를 측정하는 데 사용되는 선의 규칙적인 간격의 일련의 표시)",
        "pronunciation": "[skeɪl]",
        "examples": [
            "She weighed herself on the scale (그녀는 저울에 몸무게를 쟀다).",
            "The map uses a scale of 1:1000 (지도는 1:1000의 축척을 사용한다)."
        ]
    },
    {
        "english": "Scan",
        "definition": "To look at all parts of something carefully in order to detect some feature.<br><br>(어떤 특징을 발견하기 위해 모든 부분을 주의 깊게 살펴보다)",
        "pronunciation": "[skæn]",
        "examples": [
            "She scanned the document for errors (그녀는 오류를 찾기 위해 문서를 스캔했다).",
            "He scanned the horizon for any signs of the ship (그는 배의 징후를 찾기 위해 지평선을 살펴봤다)."
        ]
    },
    {
        "english": "Seed",
        "definition": "A flowering plant's unit of reproduction, capable of developing into another such plant.<br><br>(다른 식물로 발달할 수 있는 개화 식물의 번식 단위)",
        "pronunciation": "[sid]",
        "examples": [
            "She planted tomato seeds in the garden (그녀는 정원에 토마토 씨앗을 심었다).",
            "The seeds will germinate in a few days (씨앗은 며칠 안에 발아할 것이다)."
        ]
    },
    {
        "english": "Seek",
        "definition": "To attempt to find (something).<br><br>(무언가를 찾으려고 시도하다)",
        "pronunciation": "[sik]",
        "examples": [
            "They are seeking a solution to the problem (그들은 문제에 대한 해결책을 찾고 있다).",
            "He sought advice from his mentor (그는 멘토에게 조언을 구했다)."
        ]
    },
    {
        "english": "Seem",
        "definition": "To give the impression or sensation of being something or having a particular quality.<br><br>(무엇인가인 것처럼 또는 특정한 특성을 가진 것처럼 인상을 주다)",
        "pronunciation": "[sim]",
        "examples": [
            "She seems happy today (그녀는 오늘 행복해 보인다).",
            "It seems like a good idea (좋은 생각인 것 같다)."
        ]
    },
    {
        "english": "Serve",
        "definition": "To perform duties or services for another person or an organization.<br><br>(다른 사람이나 조직을 위해 의무나 서비스를 수행하다)",
        "pronunciation": "[sɜrv]",
        "examples": [
            "She served them dinner (그녀는 그들에게 저녁을 대접했다).",
            "He serves in the military (그는 군 복무 중이다)."
        ]
    },
    {
        "english": "Shame",
        "definition": "A painful feeling of humiliation or distress caused by the consciousness of wrong or foolish behavior.<br><br>(잘못되거나 어리석은 행동에 대한 인식으로 인한 굴욕감이나 고통스러운 감정)",
        "pronunciation": "[ʃeɪm]",
        "examples": [
            "She felt a deep sense of shame (그녀는 깊은 수치심을 느꼈다).",
            "It's a shame that he couldn't come to the party (그가 파티에 올 수 없어서 유감이다)."
        ]
    },
    {
        "english": "Shape",
        "definition": "The external form or appearance characteristic of someone or something.<br><br>(누군가 또는 무언가의 외형 또는 특징적인 모양)",
        "pronunciation": "[ʃeɪp]",
        "examples": [
            "The table is round in shape (테이블은 둥근 모양이다).",
            "She is in good shape (그녀는 좋은 체형을 가지고 있다)."
        ]
    },
    {
        "english": "Sheet",
        "definition": "A large rectangular piece of cotton, linen, or other material used as an article of bedding, commonly paired with blankets.<br><br>(침구류의 한 부분으로 사용되는 큰 직사각형의 면, 린넨 또는 기타 재료로, 일반적으로 담요와 짝을 이룬다)",
        "pronunciation": "[ʃit]",
        "examples": [
            "She changed the bed sheets (그녀는 침대 시트를 갈았다).",
            "The sheets are made of high-quality cotton (시트는 고급 면으로 만들어졌다)."
        ]
    },
    {
        "english": "Shelter",
        "definition": "A place giving temporary protection from bad weather or danger.<br><br>(악천후나 위험으로부터 일시적인 보호를 제공하는 장소)",
        "pronunciation": "[ˈʃɛltər]",
        "examples": [
            "They found shelter from the storm (그들은 폭풍우로부터 피신처를 찾았다).",
            "The shelter provides beds for the homeless (그 쉼터는 노숙자들에게 침대를 제공한다)."
        ]
    },
    {
        "english": "Shine",
        "definition": "To give out a bright light.<br><br>(밝은 빛을 내다)",
        "pronunciation": "[ʃaɪn]",
        "examples": [
            "The sun is shining brightly (해가 밝게 빛나고 있다).",
            "She polished the silver until it shone (그녀는 은을 빛날 때까지 닦았다)."
        ]
    },
    {
        "english": "Shut",
        "definition": "To move something into position so that it blocks an opening.<br><br>(열린 곳을 막기 위해 무언가를 움직여 위치에 두다)",
        "pronunciation": "[ʃʌt]",
        "examples": [
            "She shut the door behind her (그녀는 뒤에서 문을 닫았다).",
            "The window won't shut properly (창문이 제대로 닫히지 않는다)."
        ]
    },
    {
        "english": "Silence",
        "definition": "Complete absence of sound.<br><br>(완전한 무음)",
        "pronunciation": "[ˈsaɪləns]",
        "examples": [
            "The silence was broken by a loud noise (침묵이 큰 소음에 의해 깨졌다).",
            "They sat in silence for a while (그들은 잠시 동안 침묵 속에 앉아 있었다)."
        ]
    },
    {
        "english": "Solve",
        "definition": "To find an answer to, explanation for, or means of effectively dealing with a problem or mystery.<br><br>(문제나 미스터리에 대한 해답을 찾거나 설명을 하거나 효과적으로 대처하는 수단을 찾다)",
        "pronunciation": "[sɑlv]",
        "examples": [
            "She solved the math problem easily (그녀는 수학 문제를 쉽게 풀었다).",
            "He worked hard to solve the mystery (그는 그 미스터리를 풀기 위해 열심히 일했다)."
        ]
    },
    {
        "english": "Spot",
        "definition": "A particular place or point.<br><br>(특정 장소나 지점)",
        "pronunciation": "[spɒt]",
        "examples": [
            "She found a perfect spot for a picnic (그녀는 피크닉을 위한 완벽한 장소를 찾았다).",
            "There was a spot of ink on the paper (종이에 잉크 얼룩이 있었다)."
        ]
    },
    {
        "english": "Starve",
        "definition": "To suffer or die from extreme hunger.<br><br>(극심한 배고픔으로 고통받거나 죽다)",
        "pronunciation": "[stɑrv]",
        "examples": [
            "They would starve without help (그들은 도움이 없으면 굶어 죽을 것이다).",
            "The animals were left to starve (동물들은 굶어 죽도록 방치되었다)."
        ]
    },
    {
        "english": "Steel",
        "definition": "A strong, hard metal made of iron and carbon.<br><br>(철과 탄소로 만들어진 강하고 단단한 금속)",
        "pronunciation": "[stil]",
        "examples": [
            "The building is made of steel and glass (그 건물은 강철과 유리로 만들어졌다).",
            "Steel is used in construction (강철은 건설에 사용된다)."
        ]
    },
    {
        "english": "Storm",
        "definition": "A violent disturbance of the atmosphere with strong winds and usually rain, thunder, lightning, or snow.<br><br>(강한 바람과 보통 비, 천둥, 번개, 또는 눈을 동반하는 격렬한 기상 현상)",
        "pronunciation": "[stɔrm]",
        "examples": [
            "The storm caused a lot of damage (폭풍은 많은 피해를 입혔다).",
            "They stayed indoors during the storm (그들은 폭풍 동안 집 안에 머물렀다)."
        ]
    },
    {
        "english": "Straw",
        "definition": "Dried stalks of grain, used especially as fodder or as material for thatching, packing, or weaving.<br><br>(건조된 곡물 줄기, 특히 사료, 지붕 재료, 포장재 또는 직물 재료로 사용됨)",
        "pronunciation": "[strɔ]",
        "examples": [
            "He drank juice through a straw (그는 빨대로 주스를 마셨다).",
            "The barn is full of straw (헛간은 짚으로 가득 차 있다)."
        ]
    },
    {
        "english": "Subway",
        "definition": "An underground electric railroad.<br><br>(지하 전철)",
        "pronunciation": "[ˈsʌbweɪ]",
        "examples": [
            "They took the subway to downtown (그들은 지하철을 타고 시내로 갔다).",
            "The subway station is crowded (지하철역은 붐빈다)."
        ]
    },
    {
        "english": "Suffer",
        "definition": "To experience or be subjected to something bad or unpleasant.<br><br>(나쁘거나 불쾌한 것을 경험하거나 당하다)",
        "pronunciation": "[ˈsʌfər]",
        "examples": [
            "She suffers from allergies (그녀는 알레르기로 고생한다).",
            "He suffered a lot during the war (그는 전쟁 동안 많은 고통을 겪었다)."
        ]
    },
    {
        "english": "Suicide",
        "definition": "The act of intentionally causing one's own death.<br><br>(자신의 죽음을 의도적으로 초래하는 행위)",
        "pronunciation": "[ˈsuɪˌsaɪd]",
        "examples": [
            "He contemplated suicide (그는 자살을 생각했다).",
            "Suicide rates have increased (자살률이 증가했다)."
        ]
    },
    {
        "english": "Symbol",
        "definition": "A thing that represents or stands for something else, especially a material object representing something abstract.<br><br>(다른 것을 나타내거나 상징하는 것, 특히 추상적인 것을 나타내는 물질적 객체)",
        "pronunciation": "[ˈsɪmbəl]",
        "examples": [
            "The dove is a symbol of peace (비둘기는 평화의 상징이다).",
            "The flag is a national symbol (그 깃발은 국가의 상징이다)."
        ]
    },
    {
        "english": "Target",
        "definition": "A person, object, or place selected as the aim of an attack.<br><br>(공격의 목표로 선택된 사람, 물체 또는 장소)",
        "pronunciation": "[ˈtɑrɡɪt]",
        "examples": [
            "The target of the attack was a military base (공격의 목표는 군사 기지였다).",
            "She hit the target with her arrow (그녀는 화살로 표적을 맞췄다)."
        ]
    },
    {
        "english": "Tend",
        "definition": "To regularly or frequently behave in a particular way or have a certain characteristic.<br><br>(특정한 방식으로 정기적으로 또는 자주 행동하거나 특정한 특징을 가지다)",
        "pronunciation": "[tɛnd]",
        "examples": [
            "She tends to talk a lot (그녀는 말을 많이 하는 경향이 있다).",
            "He tends to forget things (그는 물건을 자주 잊어버리는 경향이 있다)."
        ]
    },
    {
        "english": "Thought",
        "definition": "An idea or opinion produced by thinking or occurring suddenly in the mind.<br><br>(생각하거나 갑자기 마음에 떠오른 아이디어나 의견)",
        "pronunciation": "[θɔt]",
        "examples": [
            "She had a sudden thought (그녀는 갑작스러운 생각을 했다).",
            "His thoughts were on the upcoming test (그의 생각은 다가오는 시험에 있었다)."
        ]
    },
    {
        "english": "Threaten",
        "definition": "To state one's intention to take hostile action against someone in retribution for something done or not done.<br><br>(한 일이든 하지 않은 일이든 보복으로 누군가에게 적대적인 행동을 하겠다는 의도를 밝히다)",
        "pronunciation": "[ˈθrɛtən]",
        "examples": [
            "He threatened to call the police (그는 경찰에 신고하겠다고 위협했다).",
            "The storm threatens to destroy the crops (폭풍이 농작물을 파괴할 위협이 있다)."
        ]
    },
    {
        "english": "Total",
        "definition": "Comprising the whole number or amount.<br><br>(전체 수나 양을 포함하다)",
        "pronunciation": "[ˈtoʊtəl]",
        "examples": [
            "The total cost is $50 (총 비용은 50달러이다).",
            "They have a total of three children (그들은 총 세 명의 자녀가 있다)."
        ]
    },
    {
        "english": "Toy",
        "definition": "An object for a child to play with, typically a model or miniature replica of something.<br><br>(아이들이 가지고 노는 물건, 보통 무언가의 모형이나 소형 복제품)",
        "pronunciation": "[tɔɪ]",
        "examples": [
            "The child played with his toy car (그 아이는 장난감 자동차를 가지고 놀았다).",
            "She bought a new toy for her dog (그녀는 개를 위해 새 장난감을 샀다)."
        ]
    },
    {
        "english": "Tradition",
        "definition": "The transmission of customs or beliefs from generation to generation, or the fact of being passed on in this way.<br><br>(세대에서 세대로 전해지는 관습이나 신념의 전파, 또는 이러한 방식으로 전해지는 사실)",
        "pronunciation": "[trəˈdɪʃən]",
        "examples": [
            "They follow the traditions of their ancestors (그들은 조상들의 전통을 따른다).",
            "It is a tradition to celebrate New Year's Eve (새해 전야를 기념하는 것은 전통이다)."
        ]
    },
    {
        "english": "Treatment",
        "definition": "The manner in which someone behaves toward or deals with someone or something.<br><br>(누군가가 누군가나 무엇에 대해 행동하는 방식)",
        "pronunciation": "[ˈtritmənt]",
        "examples": [
            "She received excellent treatment at the hospital (그녀는 병원에서 훌륭한 치료를 받았다).",
            "The treatment of animals in some places is terrible (일부 지역에서의 동물 취급은 끔찍하다)."
        ]
    },
    {
        "english": "Unify",
        "definition": "To make or become united, uniform, or whole.<br><br>(통합되거나 통합되게 하다)",
        "pronunciation": "[ˈjunɪˌfaɪ]",
        "examples": [
            "The leader worked to unify the country (지도자는 국가를 통합하기 위해 노력했다).",
            "The two companies were unified into one (두 회사는 하나로 통합되었다)."
        ]
    },
    {
        "english": "Unite",
        "definition": "To come or bring together for a common purpose or action.<br><br>(공통의 목적이나 행동을 위해 함께 모이거나 모이게 하다)",
        "pronunciation": "[juˈnaɪt]",
        "examples": [
            "They united to fight against a common enemy (그들은 공통의 적과 싸우기 위해 단결했다).",
            "The two families were united by marriage (두 가문은 결혼으로 결합되었다)."
        ]
    },
    {
        "english": "Valley",
        "definition": "A low area of land between hills or mountains, typically with a river or stream flowing through it.<br><br>(언덕이나 산 사이의 낮은 땅, 보통 그곳을 흐르는 강이나 시내가 있음)",
        "pronunciation": "[ˈvæli]",
        "examples": [
            "They hiked through the valley (그들은 계곡을 하이킹했다).",
            "The river runs through the valley (강이 계곡을 관통한다)."
        ]
    },
    {
        "english": "Volcano",
        "definition": "A mountain or hill with a crater or vent through which lava, rock fragments, hot vapor, and gas are being or have been erupted from the earth's crust.<br><br>(용암, 암석 파편, 뜨거운 증기, 가스가 지각에서 분출되거나 분출된 분화구나 환기구가 있는 산이나 언덕)",
        "pronunciation": "[vɑlˈkeɪnoʊ]",
        "examples": [
            "The volcano erupted last year (그 화산은 작년에 분화했다).",
            "They visited an active volcano (그들은 활화산을 방문했다)."
        ]
    },
    {
        "english": "Wall",
        "definition": "A continuous vertical brick or stone structure that encloses or divides an area of land.<br><br>(토지를 둘러싸거나 분할하는 연속적인 수직 벽돌 또는 돌 구조물)",
        "pronunciation": "[wɔl]",
        "examples": [
            "The garden is surrounded by a high wall (정원은 높은 벽으로 둘러싸여 있다).",
            "They painted the walls of the room (그들은 방의 벽을 칠했다)."
        ]
    },
    {
        "english": "Warn",
        "definition": "To inform someone in advance of an impending or possible danger, problem, or other unpleasant situation.<br><br>(다가오는 또는 가능한 위험, 문제 또는 다른 불쾌한 상황에 대해 미리 누군가에게 알리다)",
        "pronunciation": "[wɔrn]",
        "examples": [
            "He warned them about the storm (그는 그들에게 폭풍에 대해 경고했다).",
            "The sign warns of a slippery floor (그 표지판은 미끄러운 바닥을 경고한다)."
        ]
    },
    {
        "english": "Wash",
        "definition": "To clean with water and typically soap or detergent.<br><br>(물과 보통 비누나 세제로 깨끗하게 하다)",
        "pronunciation": "[wɑʃ]",
        "examples": [
            "She washed her hands before dinner (그녀는 저녁 식사 전에 손을 씻었다).",
            "He washed the car on Sunday (그는 일요일에 차를 씻었다)."
        ]
    },
    {
        "english": "Weapon",
        "definition": "A thing designed or used for inflicting bodily harm or physical damage.<br><br>(신체적 해를 입히거나 물리적 손상을 입히기 위해 설계되거나 사용되는 물건)",
        "pronunciation": "[ˈwɛpən]",
        "examples": [
            "The knife is considered a deadly weapon (그 칼은 치명적인 무기로 간주된다).",
            "They found a hidden weapon (그들은 숨겨진 무기를 발견했다)."
        ]
    },
    {
        "english": "Weekend",
        "definition": "The period from Friday evening through Sunday evening, especially regarded as a time for leisure.<br><br>(특히 여가 시간으로 간주되는 금요일 저녁부터 일요일 저녁까지의 기간)",
        "pronunciation": "[ˈwikˌɛnd]",
        "examples": [
            "They went on a trip over the weekend (그들은 주말에 여행을 갔다).",
            "I spent the weekend relaxing at home (나는 주말을 집에서 쉬며 보냈다)."
        ]
    },
    {
        "english": "Worth",
        "definition": "Equivalent in value to the sum or item specified.<br><br>(지정된 금액이나 항목에 상응하는 가치)",
        "pronunciation": "[wɜrθ]",
        "examples": [
            "The painting is worth a million dollars (그 그림은 백만 달러의 가치가 있다).",
            "It's not worth the effort (그것은 노력할 가치가 없다)."
        ]
    },
    {
        "english": "Wrap",
        "definition": "To cover or enclose in paper or soft material.<br><br>(종이 또는 부드러운 재료로 덮거나 싸다)",
        "pronunciation": "[ræp]",
        "examples": [
            "She wrapped the gift in colorful paper (그녀는 선물을 화려한 종이로 포장했다).",
            "He wrapped a scarf around his neck (그는 목에 스카프를 감았다)."
        ]
    },
    {
        "english": "Zone",
        "definition": "An area or stretch of land having a particular characteristic, purpose, or use, or subject to particular restrictions.<br><br>(특정한 특징, 목적, 용도를 가진 지역 또는 특정 제한을 받는 지역)",
        "pronunciation": "[zoʊn]",
        "examples": [
            "This is a no-parking zone (여기는 주차 금지 구역이다).",
            "They live in a war zone (그들은 전쟁 지역에 산다)."
        ]
    },
    {
        "english": "Ability",
        "definition": "Possession of the means or skill to do something.<br><br>(무언가를 할 수 있는 수단이나 기술을 소유하고 있음)",
        "pronunciation": "[əˈbɪləti]",
        "examples": [
            "She has the ability to solve complex problems (그녀는 복잡한 문제를 해결할 능력이 있다).",
            "His ability in mathematics is impressive (그의 수학 능력은 인상적이다)."
        ]
    },
    {
        "english": "Able",
        "definition": "Having the power, skill, means, or opportunity to do something.<br><br>(무언가를 할 수 있는 힘, 기술, 수단, 기회를 가지고 있음)",
        "pronunciation": "[ˈeɪbəl]",
        "examples": [
            "She is able to speak three languages (그녀는 세 가지 언어를 말할 수 있다).",
            "He was able to fix the car (그는 차를 고칠 수 있었다)."
        ]
    },
    {
        "english": "Aboard",
        "definition": "On or into (a ship, aircraft, train, or other vehicle).<br><br>(배, 항공기, 기차 또는 기타 차량에 타거나 탑승하여)",
        "pronunciation": "[əˈbɔrd]",
        "examples": [
            "They went aboard the ship (그들은 배에 탑승했다).",
            "Welcome aboard! (탑승을 환영합니다!)"
        ]
    },
    {
        "english": "Abroad",
        "definition": "In or to a foreign country or countries.<br><br>(외국 또는 외국으로)",
        "pronunciation": "[əˈbrɔd]",
        "examples": [
            "She studied abroad for a year (그녀는 1년 동안 외국에서 공부했다).",
            "They are planning a trip abroad (그들은 해외 여행을 계획하고 있다)."
        ]
    },
    {
        "english": "Absent",
        "definition": "Not present in a place, at an occasion, or as part of something.<br><br>(어떤 장소, 행사 또는 무언가의 일원으로 존재하지 않는)",
        "pronunciation": "[ˈæbsənt]",
        "examples": [
            "She was absent from school yesterday (그녀는 어제 학교에 결석했다).",
            "He was absent from the meeting (그는 회의에 결석했다)."
        ]
    },
    {
        "english": "Absorb",
        "definition": "To take in or soak up (energy or a liquid or other substance) by chemical or physical action.<br><br>(화학적 또는 물리적 작용으로 (에너지, 액체 또는 다른 물질을) 흡수하거나 빨아들이다)",
        "pronunciation": "[əbˈzɔrb]",
        "examples": [
            "Plants absorb sunlight (식물은 햇빛을 흡수한다).",
            "The sponge absorbed all the water (스펀지가 모든 물을 흡수했다)."
        ]
    },
    {
        "english": "Abstract",
        "definition": "Existing in thought or as an idea but not having a physical or concrete existence.<br><br>(생각이나 아이디어로 존재하지만 물리적 또는 구체적인 존재는 없는)",
        "pronunciation": "[ˈæbstrækt]",
        "examples": [
            "Abstract art can be difficult to understand (추상 예술은 이해하기 어려울 수 있다).",
            "The concept is too abstract for me (그 개념은 나에게 너무 추상적이다)."
        ]
    },
    {
        "english": "Academic",
        "definition": "Relating to education and scholarship.<br><br>(교육 및 학문과 관련된)",
        "pronunciation": "[ˌækəˈdɛmɪk]",
        "examples": [
            "She has an academic background in science (그녀는 과학 분야에서 학문적 배경을 가지고 있다).",
            "The academic year starts in September (학년도는 9월에 시작한다)."
        ]
    },
    {
        "english": "Accept",
        "definition": "To consent to receive or undertake (something offered).<br><br>(제공된 것을 받거나 맡는 데 동의하다)",
        "pronunciation": "[əkˈsɛpt]",
        "examples": [
            "She accepted the job offer (그녀는 일자리 제안을 받아들였다).",
            "He accepted the gift with gratitude (그는 감사하게 선물을 받았다)."
        ]
    },
    {
        "english": "Accident",
        "definition": "An unfortunate incident that happens unexpectedly and unintentionally, typically resulting in damage or injury.<br><br>(예기치 않게 그리고 의도하지 않게 발생하는 불행한 사건, 보통 손상이나 부상을 초래함)",
        "pronunciation": "[ˈæksɪdənt]",
        "examples": [
            "He was involved in a car accident (그는 자동차 사고에 연루되었다).",
            "The accident happened yesterday (사고는 어제 발생했다)."
        ]
    },
    {
        "english": "Account",
        "definition": "A report or description of an event or experience.<br><br>(사건이나 경험에 대한 보고서나 설명)",
        "pronunciation": "[əˈkaʊnt]",
        "examples": [
            "She gave an account of the meeting (그녀는 회의에 대한 설명을 했다).",
            "The witness provided a detailed account of the incident (목격자는 사건에 대한 상세한 설명을 제공했다)."
        ]
    },
    {
        "english": "Accurate",
        "definition": "Correct in all details; exact.<br><br>(모든 세부 사항에서 정확한; 정확한)",
        "pronunciation": "[ˈækjərət]",
        "examples": [
            "The information is accurate (정보가 정확하다).",
            "She made an accurate calculation (그녀는 정확한 계산을 했다)."
        ]
    },
    {
        "english": "Accuse",
        "definition": "To charge someone with a wrongdoing or to state that someone has committed an offense or fault.<br><br>(누군가를 잘못한 일로 고발하거나 누군가가 범죄나 잘못을 저질렀다고 말하는 것)",
        "pronunciation": "[əˈkjuːz]",
        "examples": [
            "The prosecutor accused the defendant of theft (검사는 피고를 절도 혐의로 기소했다).",
            "She was accused of lying during the investigation (그녀는 조사 중에 거짓말을 했다고 비난받았다)."
        ]
    },
    {
        "english": "Ache",
        "definition": "A continuous or prolonged dull pain.<br><br>(지속적이거나 오래 지속되는 둔한 통증)",
        "pronunciation": "[eɪk]",
        "examples": [
            "She felt a dull ache in her back (그녀는 허리에 둔한 통증을 느꼈다).",
            "His head began to ache after reading for hours (그는 몇 시간 동안 읽고 난 후에 머리가 아프기 시작했다)."
        ]
    },
    {
        "english": "Achieve",
        "definition": "To successfully bring about or reach (a desired objective, level, or result) by effort, skill, or courage.<br><br>(노력, 기술 또는 용기로 성공적으로 (원하는 목표, 수준 또는 결과)에 도달하다)",
        "pronunciation": "[əˈtʃiv]",
        "examples": [
            "She achieved her goal of becoming a doctor (그녀는 의사가 되겠다는 목표를 달성했다).",
            "He achieved great success in his career (그는 그의 경력에서 큰 성공을 거두었다)."
        ]
    },
    {
        "english": "Acid",
        "definition": "A chemical substance that neutralizes alkalis, dissolves some metals, and turns litmus red; typically, a corrosive or sour-tasting liquid of this kind.<br><br>(알칼리를 중화하고 일부 금속을 녹이며 리트머스를 빨갛게 변하게 하는 화학 물질; 일반적으로 이러한 종류의 부식성 또는 신맛이 나는 액체)",
        "pronunciation": "[ˈæsɪd]",
        "examples": [
            "The scientist studied the properties of the acid (과학자는 산의 특성을 연구했다).",
            "Lemon juice contains citric acid (레몬 주스에는 구연산이 포함되어 있다)."
        ]
    },
    {
        "english": "Act",
        "definition": "To take action; do something.<br><br>(행동을 취하다; 무언가를 하다)",
        "pronunciation": "[ækt]",
        "examples": [
            "He acted quickly to save the child (그는 아이를 구하기 위해 재빨리 행동했다).",
            "She acts in a responsible manner (그녀는 책임감 있게 행동한다)."
        ]
    },
    {
        "english": "Action",
        "definition": "The fact or process of doing something, typically to achieve an aim.<br><br>(일반적으로 목표를 달성하기 위해 무언가를 하는 사실 또는 과정)",
        "pronunciation": "[ˈækʃən]",
        "examples": [
            "Her quick action saved his life (그녀의 빠른 행동이 그의 생명을 구했다).",
            "The government took action to improve education (정부는 교육을 개선하기 위해 조치를 취했다)."
        ]
    },
    {
        "english": "Active",
        "definition": "Engaging or ready to engage in physically energetic pursuits.<br><br>(신체적으로 에너지가 넘치는 활동에 참여하거나 참여할 준비가 된)",
        "pronunciation": "[ˈæktɪv]",
        "examples": [
            "She has an active lifestyle (그녀는 활동적인 생활을 하고 있다).",
            "He remains active despite his age (그는 나이에도 불구하고 활발하게 활동하고 있다)."
        ]
    },
    {
        "english": "Activity",
        "definition": "A thing that a person or group does or has done.<br><br>(사람이나 그룹이 하는 또는 한 일)",
        "pronunciation": "[ækˈtɪvɪti]",
        "examples": [
            "They enjoy outdoor activities (그들은 야외 활동을 즐긴다).",
            "The camp offers a variety of activities (캠프는 다양한 활동을 제공한다)."
        ]
    },
    {
        "english": "Actually",
        "definition": "As the truth or facts of a situation; really.<br><br>(실제로, 사실은)",
        "pronunciation": "[ˈæktʃuəli]",
        "examples": [
            "She actually enjoyed the movie (그녀는 실제로 그 영화를 즐겼다).",
            "He actually knows a lot about the subject (그는 그 주제에 대해 실제로 많이 알고 있다)."
        ]
    },
    {
        "english": "Add",
        "definition": "To join (something) to something else so as to increase the size, number, or amount.<br><br>(크기, 수, 양을 늘리기 위해 무언가를 다른 것에 더하다)",
        "pronunciation": "[æd]",
        "examples": [
            "Add sugar to the coffee (커피에 설탕을 추가하다).",
            "They added a new member to the team (그들은 팀에 새 멤버를 추가했다)."
        ]
    },
    {
        "english": "Addition",
        "definition": "The action or process of adding something to something else.<br><br>(무언가를 다른 것에 추가하는 행동이나 과정)",
        "pronunciation": "[əˈdɪʃən]",
        "examples": [
            "The addition of a new wing to the building (건물에 새로운 윙을 추가하는 것).",
            "There has been an addition to the family (가족이 추가되었다)."
        ]
    },
    {
        "english": "Address",
        "definition": "The particulars of the place where someone lives or an organization is situated.<br><br>(누군가가 사는 곳이나 조직이 위치한 곳의 세부 사항)",
        "pronunciation": "[əˈdrɛs]",
        "examples": [
            "Please send it to my home address (제 집 주소로 보내주세요).",
            "She gave a speech at the address (그녀는 그 주소에서 연설을 했다)."
        ]
    },
    {
        "english": "Admiral",
        "definition": "A commander of a fleet or naval squadron, or a naval officer of very high rank.<br><br>(함대나 해군 비행단의 사령관 또는 매우 높은 계급의 해군 장교)",
        "pronunciation": "[ˈædmərəl]",
        "examples": [
            "The admiral commanded the fleet (제독은 함대를 지휘했다).",
            "He was promoted to admiral (그는 제독으로 승진했다)."
        ]
    },
    {
        "english": "Admire",
        "definition": "To regard (an object, quality, or person) with respect or warm approval.<br><br>(사물, 품질, 사람을 존경하거나 따뜻하게 승인하다)",
        "pronunciation": "[ədˈmaɪər]",
        "examples": [
            "I admire her dedication to her work (나는 그녀의 일에 대한 헌신을 존경한다).",
            "They stopped to admire the view (그들은 경치를 감상하기 위해 멈췄다)."
        ]
    },
    {
        "english": "Admit",
        "definition": "To confess to be true or to be the case, typically with reluctance.<br><br>(보통 마지못해 사실이라고 인정하다)",
        "pronunciation": "[ədˈmɪt]",
        "examples": [
            "He admitted his mistake (그는 자신의 실수를 인정했다).",
            "She admitted to having lied (그녀는 거짓말을 했다고 인정했다)."
        ]
    },
    {
        "english": "Adopt",
        "definition": "To legally take (another's child) and bring it up as one's own.<br><br>(법적으로 (남의 아이)를 데려와 자신의 아이로 기르다)",
        "pronunciation": "[əˈdɑpt]",
        "examples": [
            "They decided to adopt a child (그들은 아이를 입양하기로 결정했다).",
            "The company adopted a new policy (그 회사는 새로운 정책을 채택했다)."
        ]
    },
    {
        "english": "Adult",
        "definition": "A person who is fully grown or developed.<br><br>(완전히 자란 또는 발달한 사람)",
        "pronunciation": "[əˈdʌlt]",
        "examples": [
            "Children must be accompanied by an adult (어린이는 성인이 동반해야 한다).",
            "She is an adult now and can make her own decisions (그녀는 이제 성인이 되어 자신의 결정을 내릴 수 있다)."
        ]
    },
    {
        "english": "Advance",
        "definition": "To move forward, typically in a purposeful way.<br><br>(일반적으로 목적 있는 방식으로 앞으로 나아가다)",
        "pronunciation": "[ədˈvæns]",
        "examples": [
            "They advanced towards the enemy (그들은 적을 향해 전진했다).",
            "Technology has advanced rapidly (기술이 빠르게 발전했다)."
        ]
    },
    {
        "english": "Advantage",
        "definition": "A condition or circumstance that puts one in a favorable or superior position.<br><br>(유리하거나 우월한 위치에 두는 조건이나 상황)",
        "pronunciation": "[ədˈvæntɪdʒ]",
        "examples": [
            "She had an advantage in the competition (그녀는 경쟁에서 유리했다).",
            "Knowing multiple languages is an advantage (여러 언어를 아는 것은 유리하다)."
        ]
    },
    {
        "english": "Adventure",
        "definition": "An unusual and exciting, typically hazardous, experience or activity.<br><br>(보통 위험한, 특이하고 흥미로운 경험이나 활동)",
        "pronunciation": "[ədˈvɛntʃər]",
        "examples": [
            "They went on an adventure to the jungle (그들은 정글로 모험을 떠났다).",
            "Her life is full of adventure (그녀의 삶은 모험으로 가득 차 있다)."
        ]
    },
    {
        "english": "Advertise",
        "definition": "To describe or draw attention to (a product, service, or event) in a public medium in order to promote sales or attendance.<br><br>(제품, 서비스, 행사 등을 홍보하기 위해 공공 매체에 설명하거나 주의를 끌다)",
        "pronunciation": "[ˈædvərˌtaɪz]",
        "examples": [
            "They advertised the new product on TV (그들은 새로운 제품을 TV에 광고했다).",
            "The event was advertised in the newspaper (그 행사는 신문에 광고되었다)."
        ]
    },
    {
        "english": "Advertisement",
        "definition": "A notice or announcement in a public medium promoting a product, service, or event or publicizing a job vacancy.<br><br>(제품, 서비스, 행사 등을 홍보하거나 구인 광고를 공고하는 공공 매체의 공지 또는 발표)",
        "pronunciation": "[ədˈvərtɪsmənt]",
        "examples": [
            "I saw an advertisement for a new car (나는 새로운 차에 대한 광고를 보았다).",
            "The advertisement was very convincing (그 광고는 매우 설득력이 있었다)."
        ]
    },
    {
        "english": "Advice",
        "definition": "Guidance or recommendations offered with regard to prudent future action.<br><br>(신중한 미래 행동에 관한 조언이나 추천)",
        "pronunciation": "[ədˈvaɪs]",
        "examples": [
            "She gave me good advice (그녀는 나에게 좋은 조언을 해주었다).",
            "I need your advice on this matter (나는 이 문제에 대한 당신의 조언이 필요하다)."
        ]
    },
    {
        "english": "Advise",
        "definition": "To offer suggestions about the best course of action to someone.<br><br>(누군가에게 최선의 행동 방침에 대한 제안을 하다)",
        "pronunciation": "[ədˈvaɪz]",
        "examples": [
            "The doctor advised him to rest (의사는 그에게 휴식을 취하라고 조언했다).",
            "She advised me to take the job (그녀는 나에게 그 일을 맡으라고 조언했다)."
        ]
    },
    {
        "english": "Affair",
        "definition": "An event or sequence of events of a specified kind or that has previously been referred to.<br><br>(특정 종류의 사건 또는 이전에 언급된 사건의 일련)",
        "pronunciation": "[əˈfɛr]",
        "examples": [
            "The entire affair was very mysterious (그 사건 전체가 매우 신비로웠다).",
            "They had a brief affair (그들은 짧은 연애를 했다)."
        ]
    },
    {
        "english": "Affect",
        "definition": "To have an effect on; make a difference to.<br><br>(영향을 미치다; 차이를 만들다)",
        "pronunciation": "[əˈfɛkt]",
        "examples": [
            "The weather can affect your mood (날씨는 당신의 기분에 영향을 미칠 수 있다).",
            "Her speech affected everyone in the room (그녀의 연설은 방 안의 모든 사람에게 영향을 미쳤다)."
        ]
    },
    {
        "english": "Afford",
        "definition": "To have enough money to pay for.<br><br>(지불할 돈이 충분하다)",
        "pronunciation": "[əˈfɔrd]",
        "examples": [
            "I can't afford to buy a new car (나는 새 차를 살 여유가 없다).",
            "They can afford to travel abroad (그들은 해외여행을 갈 여유가 있다)."
        ]
    },
    {
        "english": "Afraid",
        "definition": "Feeling fear or anxiety; frightened.<br><br>(두려움이나 불안을 느끼는; 겁먹은)",
        "pronunciation": "[əˈfreɪd]",
        "examples": [
            "She is afraid of spiders (그녀는 거미를 무서워한다).",
            "He was afraid to speak in public (그는 공개적으로 말하는 것을 두려워했다)."
        ]
    },
    {
        "english": "Age",
        "definition": "The length of time that a person has lived or a thing has existed.<br><br>(사람이 살아온 시간 또는 물건이 존재한 시간의 길이)",
        "pronunciation": "[eɪdʒ]",
        "examples": [
            "He is 10 years of age (그는 10살이다).",
            "The age of the building is unknown (그 건물의 나이는 알려져 있지 않다)."
        ]
    },
    {
        "english": "Agent",
        "definition": "A person who acts on behalf of another person or group.<br><br>(다른 사람이나 그룹을 대신하여 행동하는 사람)",
        "pronunciation": "[ˈeɪdʒənt]",
        "examples": [
            "He is a secret agent (그는 비밀 요원이다).",
            "The travel agent helped us book the trip (여행사는 우리에게 여행 예약을 도와주었다)."
        ]
    },
    {
        "english": "Ago",
        "definition": "Before the present; earlier (used with a measurement of time).<br><br>(현재 이전에; 더 일찍 (시간 측정과 함께 사용))",
        "pronunciation": "[əˈɡoʊ]",
        "examples": [
            "She moved here five years ago (그녀는 5년 전에 이곳으로 이사했다).",
            "It happened a long time ago (그것은 오래 전에 일어났다)."
        ]
    },
    {
        "english": "Agree",
        "definition": "To have the same opinion about something; concur.<br><br>(어떤 것에 대해 같은 의견을 가지다; 동의하다)",
        "pronunciation": "[əˈɡri]",
        "examples": [
            "They agreed to the terms (그들은 조건에 동의했다).",
            "I agree with your decision (나는 당신의 결정에 동의한다)."
        ]
    },
    {
        "english": "Ahead",
        "definition": "Further forward in space; in the line of one's forward motion.<br><br>(공간에서 더 앞으로; 자신의 전진 운동 라인에)",
        "pronunciation": "[əˈhɛd]",
        "examples": [
            "The road ahead is clear (앞에 있는 도로는 깨끗하다).",
            "She walked ahead of me (그녀는 내 앞에서 걸었다)."
        ]
    },
    {
        "english": "Aid",
        "definition": "Help, typically of a practical nature.<br><br>(보통 실질적인 도움)",
        "pronunciation": "[eɪd]",
        "examples": [
            "They provided aid to the refugees (그들은 난민들에게 도움을 제공했다).",
            "She walks with the aid of a cane (그녀는 지팡이의 도움으로 걷는다)."
        ]
    },
    {
        "english": "Aim",
        "definition": "To point or direct (a weapon or camera) at a target.<br><br>(무기나 카메라를 목표물에 겨누거나 조준하다)",
        "pronunciation": "[eɪm]",
        "examples": [
            "He aimed the gun at the target (그는 표적을 향해 총을 겨눴다).",
            "The program aims to help students (그 프로그램은 학생들을 돕는 것을 목표로 한다)."
        ]
    },
    {
        "english": "Aisle",
        "definition": "A passage between rows of seats in a building such as a church or theater, an airplane, or a train.<br><br>(교회나 극장, 비행기, 기차와 같은 건물의 좌석 열 사이의 통로)",
        "pronunciation": "[aɪl]",
        "examples": [
            "She walked down the aisle (그녀는 통로를 걸어 내려갔다).",
            "The flight attendant walked down the aisle (승무원이 통로를 걸어 내려갔다)."
        ]
    },
    {
        "english": "Alarm",
        "definition": "An anxious awareness of danger.<br><br>(위험에 대한 불안한 인식)",
        "pronunciation": "[əˈlɑrm]",
        "examples": [
            "She felt a sense of alarm (그녀는 불안감을 느꼈다).",
            "The fire alarm went off (화재 경보가 울렸다)."
        ]
    },
    {
        "english": "Alike",
        "definition": "Similar to each other.<br><br>(서로 비슷한)",
        "pronunciation": "[əˈlaɪk]",
        "examples": [
            "The two sisters look alike (두 자매는 닮았다).",
            "They think alike (그들은 생각이 비슷하다)."
        ]
    },
    {
        "english": "Alive",
        "definition": "Living, not dead.<br><br>(살아있는, 죽지 않은)",
        "pronunciation": "[əˈlaɪv]",
        "examples": [
            "He is still alive (그는 아직 살아 있다).",
            "The plant is alive and well (그 식물은 살아 있고 건강하다)."
        ]
    },
    {
        "english": "Allow",
        "definition": "To give permission for something to happen or someone to do something.<br><br>(무언가가 일어나거나 누군가가 무언가를 할 수 있도록 허락하다)",
        "pronunciation": "[əˈlaʊ]",
        "examples": [
            "They allowed him to enter the building (그들은 그가 건물에 들어가도록 허락했다).",
            "Smoking is not allowed here (여기서는 흡연이 허용되지 않는다)."
        ]
    },
    {
        "english": "Almost",
        "definition": "Not quite; very nearly.<br><br>(거의; 아주 근접하게)",
        "pronunciation": "[ˈɔlˌmoʊst]",
        "examples": [
            "She almost missed the bus (그녀는 거의 버스를 놓칠 뻔했다).",
            "It's almost time to go (거의 갈 시간이다)."
        ]
    },
    {
        "english": "Alone",
        "definition": "Having no one else present; on one's own.<br><br>(다른 사람이 없는; 혼자서)",
        "pronunciation": "[əˈloʊn]",
        "examples": [
            "She lives alone (그녀는 혼자 산다).",
            "He felt alone in the crowd (그는 군중 속에서 외로움을 느꼈다)."
        ]
    },
    {
        "english": "Aloud",
        "definition": "Audibly; not silently or in a whisper.<br><br>(들리게; 조용히 또는 속삭이지 않고)",
        "pronunciation": "[əˈlaʊd]",
        "examples": [
            "She read the letter aloud (그녀는 편지를 소리 내어 읽었다).",
            "He laughed aloud (그는 크게 웃었다)."
        ]
    },
    {
        "english": "Already",
        "definition": "Before or by now or the time in question.<br><br>(이미, 지금 또는 문제의 시간 전에)",
        "pronunciation": "[ɔlˈrɛdi]",
        "examples": [
            "I have already eaten (나는 이미 먹었다).",
            "She is already here (그녀는 이미 여기 있다)."
        ]
    },
    {
        "english": "Also",
        "definition": "In addition; too.<br><br>(게다가; 또한)",
        "pronunciation": "[ˈɔlsoʊ]",
        "examples": [
            "She is a talented singer and also a great dancer (그녀는 재능 있는 가수일 뿐만 아니라 훌륭한 댄서이기도 하다).",
            "I like apples and also oranges (나는 사과와 오렌지를 좋아한다)."
        ]
    },
    {
        "english": "Always",
        "definition": "At all times; on all occasions.<br><br>(항상; 모든 경우에)",
        "pronunciation": "[ˈɔlweɪz]",
        "examples": [
            "She always arrives on time (그녀는 항상 제시간에 도착한다).",
            "He is always happy to help (그는 항상 기꺼이 돕는다)."
        ]
    },
    {
        "english": "Amazing",
        "definition": "Causing great surprise or wonder; astonishing.<br><br>(큰 놀라움이나 경이로움을 일으키는; 놀라운)",
        "pronunciation": "[əˈmeɪzɪŋ]",
        "examples": [
            "The view from the top of the mountain is amazing (산 정상에서의 경치는 놀랍다).",
            "She did an amazing job on the project (그녀는 프로젝트에서 놀라운 일을 해냈다)."
        ]
    },
    {
        "english": "Amount",
        "definition": "A quantity of something, especially the total of a thing or things in number, size, value, or extent.<br><br>(무언가의 양, 특히 수, 크기, 가치, 범위에서의 총계)",
        "pronunciation": "[əˈmaʊnt]",
        "examples": [
            "The amount of money needed is large (필요한 돈의 양은 많다).",
            "He consumed a large amount of food (그는 많은 양의 음식을 소비했다)."
        ]
    },
    {
        "english": "Ancestor",
        "definition": "A person, typically one more remote than a grandparent, from whom one is descended.<br><br>(보통 조부모보다 더 멀리 떨어진, 자손이 된 사람)",
        "pronunciation": "[ˈænsɛstər]",
        "examples": [
            "Her ancestors came to America in the 1800s (그녀의 조상들은 1800년대에 미국으로 왔다).",
            "They traced their ancestry back to their ancestors (그들은 조상으로 거슬러 올라가며 혈통을 추적했다)."
        ]
    },
    {
        "english": "Ancient",
        "definition": "Belonging to the very distant past and no longer in existence.<br><br>(아주 먼 과거에 속하며 더 이상 존재하지 않는)",
        "pronunciation": "[ˈeɪnʃənt]",
        "examples": [
            "They visited ancient ruins (그들은 고대 유적지를 방문했다).",
            "Ancient civilizations have fascinated historians (고대 문명은 역사가들을 매료시켰다)."
        ]
    },
    {
        "english": "Anger",
        "definition": "A strong feeling of annoyance, displeasure, or hostility.<br><br>(짜증, 불쾌감 또는 적대감의 강한 감정)",
        "pronunciation": "[ˈæŋɡər]",
        "examples": [
            "He couldn't control his anger (그는 자신의 분노를 제어할 수 없었다).",
            "Her words sparked anger in him (그녀의 말은 그의 분노를 촉발했다)."
        ]
    },
    {
        "english": "Angle",
        "definition": "The space (usually measured in degrees) between two intersecting lines or surfaces at or close to the point where they meet.<br><br>(두 교차하는 선이나 표면 사이의 공간, 보통 그들이 만나는 지점 또는 가까운 지점에서 측정됨)",
        "pronunciation": "[ˈæŋɡəl]",
        "examples": [
            "The picture was taken from an interesting angle (그 사진은 흥미로운 각도에서 찍혔다).",
            "He measured the angle between the two lines (그는 두 선 사이의 각도를 측정했다)."
        ]
    },
    {
        "english": "Angry",
        "definition": "Feeling or showing strong annoyance, displeasure, or hostility; full of anger.<br><br>(강한 짜증, 불쾌감, 적대감을 느끼거나 보여주는; 분노로 가득 찬)",
        "pronunciation": "[ˈæŋɡri]",
        "examples": [
            "She was angry about the delay (그녀는 지연에 대해 화가 났다).",
            "He looked at her with angry eyes (그는 화난 눈으로 그녀를 바라봤다)."
        ]
    },
    {
        "english": "Anniversary",
        "definition": "The date on which an event took place or an institution was founded in a previous year.<br><br>(어떤 사건이 발생했거나 기관이 설립된 날짜, 이전 해에 해당됨)",
        "pronunciation": "[ˌænəˈvɜrsəri]",
        "examples": [
            "They celebrated their wedding anniversary (그들은 결혼 기념일을 축하했다).",
            "The company is planning a big event for its anniversary (회사는 기념일을 위한 큰 행사를 계획하고 있다)."
        ]
    },
    {
        "english": "Announce",
        "definition": "To make a public and typically formal declaration about a fact, occurrence, or intention.<br><br>(사실, 사건, 의도에 대해 공개적이고 보통 공식적인 선언을 하다)",
        "pronunciation": "[əˈnaʊns]",
        "examples": [
            "They announced their engagement (그들은 약혼을 발표했다).",
            "The government announced new regulations (정부는 새로운 규정을 발표했다)."
        ]
    },
    {
        "english": "Annoy",
        "definition": "To irritate (someone); make (someone) a little angry.<br><br>(누군가를 짜증나게 하다; 누군가를 약간 화나게 하다)",
        "pronunciation": "[əˈnɔɪ]",
        "examples": [
            "His constant talking annoyed her (그의 끊임없는 말이 그녀를 짜증나게 했다).",
            "The loud noise annoyed the neighbors (큰 소음이 이웃들을 짜증나게 했다)."
        ]
    },
    {
        "english": "Another",
        "definition": "Used to refer to an additional person or thing of the same type as one already mentioned or known.<br><br>(이미 언급되었거나 알려진 동일 유형의 추가적인 사람이나 물건을 가리키는 데 사용됨)",
        "pronunciation": "[əˈnʌðər]",
        "examples": [
            "She has another car (그녀는 또 다른 차를 가지고 있다).",
            "Would you like another cup of coffee? (또 한 잔의 커피를 드시겠습니까?)"
        ]
    },
    {
        "english": "Anxious",
        "definition": "Experiencing worry, unease, or nervousness, typically about an imminent event or something with an uncertain outcome.<br><br>(보통 임박한 사건이나 불확실한 결과에 대해 걱정, 불안, 긴장감을 경험하는)",
        "pronunciation": "[ˈæŋkʃəs]",
        "examples": [
            "She felt anxious about the exam (그녀는 시험에 대해 불안감을 느꼈다).",
            "He was anxious to hear the news (그는 그 소식을 듣고 싶어 안달이 났다)."
        ]
    },
    {
        "english": "Any",
        "definition": "Used to refer to one or some of a thing or number of things, no matter how much or many.<br><br>(얼마나 많은지 상관없이 하나 또는 몇 개의 것 또는 수를 가리키는 데 사용됨)",
        "pronunciation": "[ˈɛni]",
        "examples": [
            "Do you have any questions? (질문 있습니까?)",
            "You can take any book you like (마음에 드는 책을 아무거나 가져가도 됩니다)."
        ]
    },
    {
        "english": "Anymore",
        "definition": "To any further extent; any longer.<br><br>(더 이상; 더는)",
        "pronunciation": "[ˌɛniˈmɔr]",
        "examples": [
            "She doesn't live here anymore (그녀는 더 이상 여기 살지 않는다).",
            "I don't want to talk about it anymore (더 이상 그것에 대해 이야기하고 싶지 않다)."
        ]
    },
    {
        "english": "Anyway",
        "definition": "Used to confirm or support a point or idea just mentioned.<br><br>(방금 언급한 점이나 아이디어를 확인하거나 지지하는 데 사용됨)",
        "pronunciation": "[ˈɛniˌweɪ]",
        "examples": [
            "Anyway, let's move on to the next topic (어쨌든, 다음 주제로 넘어가자).",
            "It was a difficult task, but she did it anyway (어려운 일이었지만 그녀는 어쨌든 해냈다)."
        ]
    },
    {
        "english": "Anywhere",
        "definition": "In or to any place.<br><br>(어디든지, 어떤 장소에서나)",
        "pronunciation": "[ˈɛniˌwɛr]",
        "examples": [
            "You can sit anywhere you like (당신이 좋아하는 곳 어디든 앉을 수 있습니다).",
            "Have you seen my keys anywhere? (어디에서 내 열쇠를 본 적 있나요?)"
        ]
    },
    {
        "english": "Apart",
        "definition": "Separated by a distance; at a specified distance from each other in time or space.<br><br>(거리에 의해 분리된; 시간이나 공간에서 특정한 거리에 떨어져 있는)",
        "pronunciation": "[əˈpɑrt]",
        "examples": [
            "They live apart from each other (그들은 서로 떨어져 산다).",
            "The two events were a week apart (두 사건은 일주일 간격으로 있었다)."
        ]
    },
    {
        "english": "Apologize",
        "definition": "To express regret for something that one has done wrong.<br><br>(자신이 잘못한 일에 대해 유감을 표현하다)",
        "pronunciation": "[əˈpɑlədʒaɪz]",
        "examples": [
            "She apologized for being late (그녀는 늦어서 사과했다).",
            "He apologized to her for his mistake (그는 자신의 실수에 대해 그녀에게 사과했다)."
        ]
    },
    {
        "english": "Apology",
        "definition": "A regretful acknowledgment of an offense or failure.<br><br>(잘못이나 실패에 대한 유감스러운 인정)",
        "pronunciation": "[əˈpɑlədʒi]",
        "examples": [
            "She offered an apology for her behavior (그녀는 자신의 행동에 대해 사과했다).",
            "He wrote a letter of apology (그는 사과 편지를 썼다)."
        ]
    },
    {
        "english": "Appeal",
        "definition": "To make a serious or urgent request, typically to the public.<br><br>(보통 대중에게 진지하거나 긴급한 요청을 하다)",
        "pronunciation": "[əˈpil]",
        "examples": [
            "They appealed for calm (그들은 진정할 것을 호소했다).",
            "The charity appealed to the public for donations (그 자선 단체는 기부를 요청했다)."
        ]
    },
    {
        "english": "Appear",
        "definition": "To come into sight; become visible or noticeable, typically without visible agent or apparent cause.<br><br>(시야에 들어오다; 눈에 보이거나 눈에 띄다, 보통 눈에 보이는 원인 없이)",
        "pronunciation": "[əˈpɪr]",
        "examples": [
            "She appeared suddenly at the door (그녀는 갑자기 문에 나타났다).",
            "The sun appeared from behind the clouds (해가 구름 뒤에서 나타났다)."
        ]
    },
    {
        "english": "Appearance",
        "definition": "The way that someone or something looks.<br><br>(누군가 또는 무언가가 생긴 모습)",
        "pronunciation": "[əˈpɪrəns]",
        "examples": [
            "She takes pride in her appearance (그녀는 자신의 외모에 자부심을 느낀다).",
            "The appearance of the building has changed (건물의 외관이 변했다)."
        ]
    },
    {
        "english": "Appetite",
        "definition": "A natural desire to satisfy a bodily need, especially for food.<br><br>(신체적 필요를 충족시키려는 자연스러운 욕구, 특히 음식에 대한 욕구)",
        "pronunciation": "[ˈæpɪˌtaɪt]",
        "examples": [
            "She has a healthy appetite (그녀는 건강한 식욕을 가지고 있다).",
            "He lost his appetite after the incident (그는 사건 이후 식욕을 잃었다)."
        ]
    },
    {
        "english": "Apply",
        "definition": "To make a formal application or request.<br><br>(공식적인 신청이나 요청을 하다)",
        "pronunciation": "[əˈplaɪ]",
        "examples": [
            "She applied for a job at the company (그녀는 그 회사에 일자리를 신청했다).",
            "He applied for a loan (그는 대출을 신청했다)."
        ]
    },
    {
        "english": "Appointment",
        "definition": "An arrangement to meet someone at a particular time and place.<br><br>(특정 시간과 장소에서 누군가를 만나기 위한 약속)",
        "pronunciation": "[əˈpɔɪntmənt]",
        "examples": [
            "She has an appointment with the doctor (그녀는 의사와 약속이 있다).",
            "He made an appointment for a haircut (그는 이발 약속을 잡았다)."
        ]
    },
    {
        "english": "Appreciate",
        "definition": "To recognize the full worth of.<br><br>(완전한 가치를 인식하다)",
        "pronunciation": "[əˈpriʃiˌeɪt]",
        "examples": [
            "She appreciates his help (그녀는 그의 도움을 감사하게 여긴다).",
            "I appreciate your concern (당신의 걱정에 감사드립니다)."
        ]
    },
    {
        "english": "Approach",
        "definition": "To come near or nearer to (someone or something) in distance.<br><br>(거리에서 (누군가 또는 무언가) 가까이 다가가다)",
        "pronunciation": "[əˈproʊtʃ]",
        "examples": [
            "She approached the house slowly (그녀는 천천히 집에 다가갔다).",
            "The train is approaching the station (기차가 역에 접근하고 있다)."
        ]
    },
    {
        "english": "Approve",
        "definition": "To officially agree to or accept as satisfactory.<br><br>(공식적으로 동의하거나 만족스럽게 받아들이다)",
        "pronunciation": "[əˈpruv]",
        "examples": [
            "The committee approved the proposal (위원회는 제안을 승인했다).",
            "She does not approve of smoking (그녀는 흡연을 승인하지 않는다)."
        ]
    },
    {
        "english": "Aptitude",
        "definition": "A natural ability to do something.<br><br>(무언가를 하는 타고난 능력)",
        "pronunciation": "[ˈæptɪˌtud]",
        "examples": [
            "She has an aptitude for mathematics (그녀는 수학에 대한 소질이 있다).",
            "His aptitude for languages is impressive (그의 언어 소질은 인상적이다)."
        ]
    },
    {
        "english": "Architect",
        "definition": "A person who designs buildings and in many cases also supervises their construction.<br><br>(건물을 설계하는 사람이며, 많은 경우 건설을 감독하기도 함)",
        "pronunciation": "[ˈɑrkɪˌtɛkt]",
        "examples": [
            "The architect designed the new library (건축가는 새 도서관을 설계했다).",
            "She is a famous architect (그녀는 유명한 건축가이다)."
        ]
    },
    {
        "english": "Area",
        "definition": "A region or part of a town, a country, or the world.<br><br>(도시, 국가 또는 세계의 지역 또는 부분)",
        "pronunciation": "[ˈɛriə]",
        "examples": [
            "The area around the school is very safe (학교 주변 지역은 매우 안전하다).",
            "They live in a rural area (그들은 시골 지역에 산다)."
        ]
    },
    {
        "english": "Argue",
        "definition": "To give reasons or cite evidence in support of an idea, action, or theory, typically with the aim of persuading others to share one's view.<br><br>(아이디어, 행동 또는 이론을 지지하기 위해 이유를 제시하거나 증거를 인용하다, 보통 다른 사람들을 설득하여 자신의 견해를 공유하도록 하기 위함)",
        "pronunciation": "[ˈɑrɡju]",
        "examples": [
            "They argued about the best way to solve the problem (그들은 문제를 해결하는 가장 좋은 방법에 대해 논쟁했다).",
            "She argued that the decision was wrong (그녀는 그 결정이 잘못되었다고 주장했다)."
        ]
    },
    {
        "english": "Arm",
        "definition": "Each of the two upper limbs of the human body from the shoulder to the hand.<br><br>(어깨에서 손까지의 인간 몸의 두 상지 각각)",
        "pronunciation": "[ɑrm]",
        "examples": [
            "She broke her arm in the accident (그녀는 사고로 팔이 부러졌다).",
            "He raised his arm to ask a question (그는 질문을 하기 위해 팔을 들었다)."
        ]
    },
    {
        "english": "Army",
        "definition": "An organized military force equipped for fighting on land.<br><br>(육지에서 싸우기 위해 장비를 갖춘 조직된 군사력)",
        "pronunciation": "[ˈɑrmi]",
        "examples": [
            "He joined the army when he was young (그는 젊었을 때 군대에 입대했다).",
            "The army was deployed to the front lines (군대는 전선으로 배치되었다)."
        ]
    },
    {
        "english": "Arrange",
        "definition": "To put (things) in a neat, attractive, or required order.<br><br>(물건을 깔끔하고 매력적이거나 필요한 순서로 정리하다)",
        "pronunciation": "[əˈreɪndʒ]",
        "examples": [
            "She arranged the flowers in a vase (그녀는 꽃병에 꽃을 정리했다).",
            "They arranged a meeting for next week (그들은 다음 주에 회의를 정리했다)."
        ]
    },
    {
        "english": "Arrest",
        "definition": "To seize (someone) by legal authority and take into custody.<br><br>(법적 권한으로 누군가를 체포하고 구금하다)",
        "pronunciation": "[əˈrɛst]",
        "examples": [
            "The police arrested the suspect (경찰은 용의자를 체포했다).",
            "He was arrested for theft (그는 절도로 체포되었다)."
        ]
    },
    {
        "english": "Arrive",
        "definition": "To reach a place at the end of a journey or a stage in a journey.<br><br>(여행의 끝이나 여행의 한 단계에서 장소에 도착하다)",
        "pronunciation": "[əˈraɪv]",
        "examples": [
            "They arrived at the hotel late at night (그들은 밤늦게 호텔에 도착했다).",
            "She will arrive in Paris tomorrow (그녀는 내일 파리에 도착할 것이다)."
        ]
    },
    {
        "english": "Art",
        "definition": "The expression or application of human creative skill and imagination, typically in a visual form such as painting or sculpture.<br><br>(보통 그림이나 조각과 같은 시각적 형태로 인간의 창의적 기술과 상상력을 표현하거나 적용한 것)",
        "pronunciation": "[ɑrt]",
        "examples": [
            "She studied art in college (그녀는 대학에서 미술을 공부했다).",
            "The museum has a great collection of modern art (그 박물관은 현대 미술 작품을 많이 소장하고 있다)."
        ]
    },
    {
        "english": "Article",
        "definition": "A particular item or object, typically one of a specified type.<br><br>(특정한 항목이나 물건, 보통 특정 유형의 것)",
        "pronunciation": "[ˈɑrtɪkəl]",
        "examples": [
            "She wrote an article for the newspaper (그녀는 신문에 기사를 썼다).",
            "The article was about climate change (그 기사는 기후 변화에 관한 것이었다)."
        ]
    },
    {
        "english": "Artificial",
        "definition": "Made or produced by human beings rather than occurring naturally, typically as a copy of something natural.<br><br>(자연적으로 발생하는 것이 아니라 인간에 의해 만들어지거나 생산된, 보통 자연적인 것의 복사본으로)",
        "pronunciation": "[ˌɑrtəˈfɪʃəl]",
        "examples": [
            "The flowers were artificial (그 꽃들은 인공적이었다).",
            "They use artificial intelligence in their products (그들은 제품에 인공 지능을 사용한다)."
        ]
    },
    {
        "english": "Ash",
        "definition": "The powdery residue left after the burning of a substance.<br><br>(물질이 타고 남은 가루 같은 잔여물)",
        "pronunciation": "[æʃ]",
        "examples": [
            "The fireplace was full of ash (벽난로는 재로 가득 차 있었다).",
            "She scattered the ashes of the burnt paper (그녀는 불에 탄 종이의 재를 흩뿌렸다)."
        ]
    },
    {
        "english": "Ashamed",
        "definition": "Embarrassed or guilty because of one's actions, characteristics, or associations.<br><br>(자신의 행동, 특성, 연관성 때문에 부끄럽거나 죄책감을 느끼는)",
        "pronunciation": "[əˈʃeɪmd]",
        "examples": [
            "She was ashamed of her behavior (그녀는 자신의 행동이 부끄러웠다).",
            "He felt ashamed for lying (그는 거짓말을 해서 부끄러웠다)."
        ]
    },
    {
        "english": "Asleep",
        "definition": "In a state of sleep.<br><br>(잠든 상태의)",
        "pronunciation": "[əˈslip]",
        "examples": [
            "She fell asleep on the couch (그녀는 소파에서 잠들었다).",
            "He was fast asleep when I came in (내가 들어왔을 때 그는 깊이 잠들어 있었다)."
        ]
    },
    {
        "english": "Aspect",
        "definition": "A particular part or feature of something.<br><br>(무엇의 특정 부분이나 특징)",
        "pronunciation": "[ˈæspɛkt]",
        "examples": [
            "She considered every aspect of the problem (그녀는 문제의 모든 측면을 고려했다).",
            "One important aspect is the cost (중요한 측면 중 하나는 비용이다)."
        ]
    },
    {
        "english": "Assist",
        "definition": "To help (someone), typically by doing a share of the work.<br><br>(일반적으로 일의 일부를 함으로써 누군가를 돕다)",
        "pronunciation": "[əˈsɪst]",
        "examples": [
            "She assisted the teacher with the lesson (그녀는 수업에서 교사를 도왔다).",
            "He assists with the project every week (그는 매주 프로젝트를 돕는다)."
        ]
    },
    {
        "english": "Assistant",
        "definition": "A person who ranks below a senior person and helps them in their work.<br><br>(상급자보다 아래에 위치하고 그들의 일을 돕는 사람)",
        "pronunciation": "[əˈsɪstənt]",
        "examples": [
            "She works as an assistant to the manager (그녀는 매니저의 조수로 일한다).",
            "He hired an assistant to help with the paperwork (그는 서류 작업을 도울 조수를 고용했다)."
        ]
    },
    {
        "english": "Associate",
        "definition": "To connect (someone or something) with something else in one's mind.<br><br>(누군가나 무언가를 마음속에서 다른 것과 연결하다)",
        "pronunciation": "[əˈsoʊsiˌeɪt]",
        "examples": [
            "She associates the smell of roses with her childhood (그녀는 장미 냄새를 어린 시절과 연관 짓는다).",
            "He is associated with a well-known company (그는 잘 알려진 회사와 관련이 있다)."
        ]
    },
    {
        "english": "Association",
        "definition": "A group of people organized for a joint purpose.<br><br>(공동의 목적을 위해 조직된 사람들의 모임)",
        "pronunciation": "[əˌsoʊsiˈeɪʃən]",
        "examples": [
            "She joined the professional association (그녀는 전문 협회에 가입했다).",
            "The association meets monthly (그 협회는 매월 모인다)."
        ]
    },
    {
        "english": "Astronaut",
        "definition": "A person who is trained to travel in a spacecraft.<br><br>(우주선을 타고 여행할 훈련을 받은 사람)",
        "pronunciation": "[ˈæstrəˌnɔt]",
        "examples": [
            "The astronaut spent a year on the space station (우주 비행사는 우주 정거장에서 1년을 보냈다).",
            "She dreamed of becoming an astronaut (그녀는 우주 비행사가 되는 것을 꿈꿨다)."
        ]
    },
    {
        "english": "Athlete",
        "definition": "A person who is proficient in sports and other forms of physical exercise.<br><br>(스포츠 및 기타 형태의 신체 운동에 능숙한 사람)",
        "pronunciation": "[ˈæθlit]",
        "examples": [
            "He is a professional athlete (그는 프로 운동 선수이다).",
            "The athlete won a gold medal (그 운동 선수는 금메달을 땄다)."
        ]
    },
    {
        "english": "Atmosphere",
        "definition": "The envelope of gases surrounding the earth or another planet.<br><br>(지구나 다른 행성을 둘러싼 가스의 외피)",
        "pronunciation": "[ˈætməsˌfɪr]",
        "examples": [
            "The atmosphere of Mars is thin (화성의 대기는 얇다).",
            "The restaurant has a cozy atmosphere (그 레스토랑은 아늑한 분위기를 가지고 있다)."
        ]
    },
    {
        "english": "Attach",
        "definition": "To fasten, join, or connect (something) to something else.<br><br>(무언가를 다른 것에 붙이거나 연결하다)",
        "pronunciation": "[əˈtætʃ]",
        "examples": [
            "She attached the file to the email (그녀는 이메일에 파일을 첨부했다).",
            "He attached a label to the box (그는 상자에 라벨을 붙였다)."
        ]
    },
    {
        "english": "Attack",
        "definition": "To take aggressive action against (a place or enemy forces) with weapons or armed force, typically in a battle or war.<br><br>(일반적으로 전투나 전쟁에서 무기나 무장한 힘으로 (장소나 적군)에 대해 공격적인 행동을 취하다)",
        "pronunciation": "[əˈtæk]",
        "examples": [
            "The soldiers attacked the enemy camp (군인들은 적의 진영을 공격했다).",
            "He was attacked by a dog (그는 개에게 공격을 받았다)."
        ]
    },
    {
        "english": "Attempt",
        "definition": "To make an effort to achieve or complete (something, typically a difficult task or action).<br><br>(보통 어려운 일이나 행동을 달성하거나 완료하기 위해 노력하다)",
        "pronunciation": "[əˈtɛmpt]",
        "examples": [
            "She attempted to climb the mountain (그녀는 산을 오르려 시도했다).",
            "He made an attempt to break the record (그는 기록을 깨기 위해 시도했다)."
        ]
    },
    {
        "english": "Attend",
        "definition": "To be present at (an event, meeting, or function).<br><br>(행사, 회의, 기능에 참석하다)",
        "pronunciation": "[əˈtɛnd]",
        "examples": [
            "She attended the conference last week (그녀는 지난주에 회의에 참석했다).",
            "He attends a prestigious university (그는 명문 대학에 다니고 있다)."
        ]
    },
    {
        "english": "Attendant",
        "definition": "A person employed to provide a service to the public in a particular place.<br><br>(특정 장소에서 공공에 서비스를 제공하기 위해 고용된 사람)",
        "pronunciation": "[əˈtɛndənt]",
        "examples": [
            "An attendant at the museum helped the visitors (박물관의 안내원이 방문객들을 도왔다).",
            "Flight attendants are responsible for passenger safety (승무원은 승객의 안전을 책임진다)."
        ]
    },
    {
        "english": "Attention",
        "definition": "Notice taken of someone or something; the regarding of someone or something as interesting or important.<br><br>(누군가나 무언가에 대한 주목; 흥미롭거나 중요하다고 여겨지는 것)",
        "pronunciation": "[əˈtɛnʃən]",
        "examples": [
            "The project received a lot of attention from the media (프로젝트는 미디어로부터 많은 주목을 받았다).",
            "He needs to pay more attention in class (그는 수업에 더 집중해야 한다)."
        ]
    },
    {
        "english": "Attitude",
        "definition": "A settled way of thinking or feeling about someone or something, typically one that is reflected in a person's behavior.<br><br>(누군가나 무언가에 대한 생각이나 느낌의 정해진 방식, 일반적으로 사람의 행동에 반영됨)",
        "pronunciation": "[ˈætɪˌtud]",
        "examples": [
            "She has a positive attitude towards life (그녀는 삶에 대해 긍정적인 태도를 가지고 있다).",
            "His attitude at work is very professional (그의 직장 태도는 매우 전문적이다)."
        ]
    },
    {
        "english": "Attract",
        "definition": "To cause (someone) to have a liking for or interest in something.<br><br>(누군가가 무언가에 대해 호감을 갖거나 관심을 가지게 하다)",
        "pronunciation": "[əˈtrækt]",
        "examples": [
            "The new program is designed to attract young people (새 프로그램은 젊은이들을 끌어들이기 위해 설계되었다).",
            "Her smile attracts everyone she meets (그녀의 미소는 만나는 모든 사람을 끌어들인다)."
        ]
    },
    {
        "english": "Attractive",
        "definition": "Pleasing or appealing to the senses.<br><br>(감각에 기쁨을 주거나 매력적인)",
        "pronunciation": "[əˈtræktɪv]",
        "examples": [
            "She finds him very attractive (그녀는 그를 매우 매력적으로 여긴다).",
            "An attractive offer is hard to refuse (매력적인 제안은 거절하기 어렵다)."
        ]
    },
    {
        "english": "Audience",
        "definition": "The assembled spectators or listeners at a public event, such as a play, movie, concert, or meeting.<br><br>(연극, 영화, 콘서트 또는 회의와 같은 공공 행사에서 모인 관객이나 청중)",
        "pronunciation": "[ˈɔdiəns]",
        "examples": [
            "The audience applauded at the end of the performance (관객들은 공연이 끝난 후 박수를 쳤다).",
            "He spoke to an audience of over a thousand (그는 천 명 이상의 청중에게 연설했다)."
        ]
    },
    {
        "english": "Author",
        "definition": "A writer of a book, article, or report.<br><br>(책, 기사, 보고서의 작가)",
        "pronunciation": "[ˈɔːθər]",
        "examples": [
            "She is the author of several best-selling novels (그녀는 여러 베스트셀러 소설의 저자이다).",
            "The author discussed his new book at the event (저자는 그 행사에서 자신의 새 책에 대해 논의했다)."
        ]
    },
    {
        "english": "Authority",
        "definition": "The power or right to give orders, make decisions, and enforce obedience.<br><br>(명령을 내리고, 결정을 내리며, 복종을 강요할 수 있는 권력 또는 권리)",
        "pronunciation": "[əˈθɔrɪti]",
        "examples": [
            "The local authority is responsible for roads and schools (지방 정부는 도로와 학교에 대한 책임이 있다).",
            "She has the authority to make decisions (그녀는 결정을 내릴 권한이 있다)."
        ]
    },
    {
        "english": "Autumn",
        "definition": "The season after summer and before winter, in which vegetation begins to die down, in the northern hemisphere from September to November and in the southern hemisphere from March to May.<br><br>(북반구에서 9월부터 11월까지, 남반구에서 3월부터 5월까지, 여름이 지나고 겨울이 오기 전 식물이 죽기 시작하는 계절)",
        "pronunciation": "[ˈɔːtəm]",
        "examples": [
            "The trees are beautiful in autumn (가을에 나무들이 아름답다).",
            "Autumn is my favorite season (가을은 내가 가장 좋아하는 계절이다)."
        ]
    },
    {
        "english": "Available",
        "definition": "Able to be used or obtained; at someone's disposal.<br><br>(사용 가능하거나 획득 가능; 누군가의 처분에 있음)",
        "pronunciation": "[əˈveɪləbəl]",
        "examples": [
            "The book is available at the library (그 책은 도서관에서 이용 가능하다).",
            "Are there any tickets available? (표가 아직 있나요?)"
        ]
    },
    {
        "english": "Average",
        "definition": "A number expressing the central or typical value in a set of data, in particular the mode, median, or (most commonly) the mean, which is calculated by dividing the sum of the values in the set by their number.<br><br>(데이터 집합에서 중앙값이나 전형적인 값을 표현하는 숫자, 특히 모드, 중앙값 또는 (가장 일반적으로) 평균, 그것은 집합의 값의 합을 그 수로 나누어 계산된다)",
        "pronunciation": "[ˈævərɪdʒ]",
        "examples": [
            "Her performance was above average (그녀의 성능은 평균 이상이었다).",
            "He has an average income (그는 평균 수입을 가지고 있다)."
        ]
    },
    {
        "english": "Avoid",
        "definition": "To keep away from or stop oneself from doing (something).<br><br>(무언가를 피하거나 하지 않기 위해 노력하다)",
        "pronunciation": "[əˈvɔɪd]",
        "examples": [
            "He avoided the question (그는 그 질문을 피했다).",
            "She avoids going out during the heat of the day (그녀는 낮 더위에 나가지 않기 위해 피한다)."
        ]
    },
    {
        "english": "Awake",
        "definition": "Not sleeping.<br><br>(자지 않는)",
        "pronunciation": "[əˈweɪk]",
        "examples": [
            "She was awake all night (그녀는 밤새도록 깨어 있었다).",
            "I was suddenly wide awake (나는 갑자기 완전히 깨어났다)."
        ]
    },
    {
        "english": "Award",
        "definition": "A prize or other mark of recognition given in honor of an achievement.<br><br>(성취를 기리기 위해 주어진 상 또는 다른 인식 표시)",
        "pronunciation": "[əˈwɔrd]",
        "examples": [
            "He received an award for his work (그는 그의 작업에 대해 상을 받았다).",
            "The film won several awards (그 영화는 여러 상을 수상했다)."
        ]
    },
    {
        "english": "Away",
        "definition": "At a distance from the place in question; to or at a distance.<br><br>(문제의 장소로부터 거리에 있음; 거리에 있거나 거리에 있음)",
        "pronunciation": "[əˈweɪ]",
        "examples": [
            "He walked away from the crowd (그는 군중으로부터 걸어서 멀어졌다).",
            "Put the knives away from the children (아이들로부터 칼을 멀리 두세요)."
        ]
    },
    {
        "english": "Awful",
        "definition": "Very bad or unpleasant.<br><br>(매우 나쁘거나 불쾌한)",
        "pronunciation": "[ˈɔːfəl]",
        "examples": [
            "She felt awful after the news (그녀는 소식을 듣고 기분이 나빴다).",
            "The weather was awful last weekend (지난 주말 날씨가 끔찍했다)."
        ]
    },
    {
        "english": "Awkward",
        "definition": "Causing or feeling embarrassment or inconvenience.<br><br>(당황하게 하거나 불편함을 느끼게 하는)",
        "pronunciation": "[ˈɔːkwərd]",
        "examples": [
            "The conversation became awkward (대화가 어색해졌다).",
            "He was in an awkward position (그는 곤란한 상황에 처했다)."
        ]
    },
    {
        "english": "Back",
        "definition": "The rear surface of the human body from the shoulders to the hips.<br><br>(어깨에서 엉덩이까지 인간 몸의 뒷면)",
        "pronunciation": "[bæk]",
        "examples": [
            "She carried the backpack on her back (그녀는 배낭을 등에 메고 다녔다).",
            "He lay on his back (그는 누워서 등을 대고 있었다)."
        ]
    },
    {
        "english": "Backbone",
        "definition": "The series of vertebrae extending from the skull to the pelvis; the spine.<br><br>(머리뼈에서 골반까지 이어지는 척추골 시리즈; 척추)",
        "pronunciation": "[ˈbækˌboʊn]",
        "examples": [
            "He has the backbone to stand up for what he believes (그는 자신의 믿음을 위해 맞설 수 있는 기반을 가지고 있다).",
            "A strong backbone is important for overall health (튼튼한 척추는 전반적인 건강에 중요하다)."
        ]
    },
    {
        "english": "Background",
        "definition": "The part of a picture or scene toward the back.<br><br>(사진이나 장면의 뒷부분)",
        "pronunciation": "[ˈbækˌɡraʊnd]",
        "examples": [
            "The mountains in the background were beautiful (배경의 산들이 아름다웠다).",
            "He comes from a legal background (그는 법적 배경을 가지고 있다)."
        ]
    },
    {
        "english": "Badly",
        "definition": "In a bad manner; poorly.<br><br>(나쁜 방식으로; 형편없이)",
        "pronunciation": "[ˈbædli]",
        "examples": [
            "The team played badly last night (팀은 어젯밤에 형편없이 경기했다).",
            "He was badly injured in the accident (그는 사고로 심하게 다쳤다)."
        ]
    },
    {
        "english": "Baggage",
        "definition": "Personal belongings packed in suitcases for traveling; luggage.<br><br>(여행을 위해 여행 가방에 싸인 개인 소지품; 짐)",
        "pronunciation": "[ˈbæɡɪdʒ]",
        "examples": [
            "We checked our baggage at the airport (우리는 공항에서 짐을 맡겼다).",
            "He carried his baggage to the train (그는 기차에 짐을 실었다)."
        ]
    },
    {
        "english": "Bake",
        "definition": "To cook (food) by dry heat without direct exposure to a flame, typically in an oven.<br><br>(불꽃에 직접 노출시키지 않고 건열로 음식을 요리하다, 일반적으로 오븐에서)",
        "pronunciation": "[beɪk]",
        "examples": [
            "She loves to bake cookies (그녀는 쿠키를 굽는 것을 좋아한다).",
            "He baked a cake for her birthday (그는 그녀의 생일을 위해 케이크를 굽기로 했다)."
        ]
    },
    {
        "english": "Balance",
        "definition": "A condition in which different elements are equal or in the correct proportions.<br><br>(다양한 요소가 동등하거나 올바른 비율을 유지하는 상태)",
        "pronunciation": "[ˈbæləns]",
        "examples": [
            "He lost his balance and fell (그는 균형을 잃고 넘어졌다).",
            "The diet aims to achieve the right nutritional balance (그 식단은 올바른 영양 균형을 달성하려고 한다)."
        ]
    },
    {
        "english": "Balloon",
        "definition": "A flexible bag that can be inflated with a gas, such as helium, hydrogen, nitrous oxide, oxygen, or air.<br><br>(헬륨, 수소, 아산화 질소, 산소 또는 공기와 같은 가스로 부풀릴 수 있는 유연한 가방)",
        "pronunciation": "[bəˈlun]",
        "examples": [
            "The child let go of the balloon and it floated away (아이가 풍선을 놓아버리자 그것은 떠내려갔다).",
            "We decorated the room with colorful balloons (우리는 방을 다채로운 풍선으로 장식했다)."
        ]
    },
    {
        "english": "Band",
        "definition": "A group of musicians who play modern music together.<br><br>(현대 음악을 함께 연주하는 음악가들의 그룹)",
        "pronunciation": "[bænd]",
        "examples": [
            "He plays guitar in a rock band (그는 록 밴드에서 기타를 친다).",
            "The band performed at the festival (그 밴드는 축제에서 공연을 했다)."
        ]
    },
    {
        "english": "Bank",
        "definition": "The land alongside or sloping down to a river or lake.<br><br>(강이나 호수 옆이나 경사진 땅)",
        "pronunciation": "[bæŋk]",
        "examples": [
            "They sat on the bank of the river (그들은 강변에 앉았다).",
            "He caught a fish off the bank (그는 강가에서 물고기를 잡았다)."
        ]
    },
    {
        "english": "Bar",
        "definition": "A long rod or rigid piece of wood, metal, or similar material, typically used as an obstruction, fastening, or weapon.<br><br>(장애물, 고정 또는 무기로 일반적으로 사용되는 목재, 금속 또는 유사한 재료로 만든 긴 막대기 또는 강성 조각)",
        "pronunciation": "[bɑr]",
        "examples": [
            "He lifted the bar and walked in (그는 막대를 들어 올리고 들어갔다).",
            "We went to a bar to have a few drinks (우리는 몇 잔 마시러 바에 갔다)."
        ]
    },
    {
        "english": "Bark",
        "definition": "The sharp, loud cry of a dog, fox, or seal.<br><br>(개, 여우 또는 물개의 날카롭고 큰 울음소리)",
        "pronunciation": "[bɑrk]",
        "examples": [
            "The dog's bark could be heard in the night (개의 짖는 소리가 밤에 들릴 수 있었다).",
            "He commanded the dog to bark (그는 개에게 짖으라고 명령했다)."
        ]
    },
    {
        "english": "Base",
        "definition": "The bottom or foundation on which something stands or is supported.<br><br>(무언가가 서 있거나 지지되는 바닥이나 기초)",
        "pronunciation": "[beɪs]",
        "examples": [
            "The vase has a wide base (그 꽃병은 넓은 바닥이 있다).",
            "The company's base is in New York (그 회사의 기반은 뉴욕에 있다)."
        ]
    },
    {
        "english": "Basic",
        "definition": "Forming an essential foundation or starting point; fundamental.<br><br>(필수적인 기초나 출발점을 형성하는; 기본적인)",
        "pronunciation": "[ˈbeɪsɪk]",
        "examples": [
            "He learned the basic rules of the game (그는 게임의 기본 규칙을 배웠다).",
            "She covered the basic concepts during the lecture (그녀는 강의 중에 기본 개념을 다뤘다)."
        ]
    },
    {
        "english": "Bat",
        "definition": "A mainly nocturnal mammal capable of sustained flight, with long slender wings consisting of a membrane stretching from the fingers to the body.<br><br>(주로 야행성 포유동물로, 손가락에서 몸까지 막이 펼쳐진 길고 가는 날개로 지속적인 비행이 가능함)",
        "pronunciation": "[bæt]",
        "examples": [
            "Bats are often found in caves (박쥐는 종종 동굴에서 발견된다).",
            "He hit the ball with a baseball bat (그는 야구 방망이로 공을 쳤다)."
        ]
    },
    {
        "english": "Bath",
        "definition": "A process of bathing, especially in a tub or pool.<br><br>(특히 욕조나 수영장에서의 목욕 과정)",
        "pronunciation": "[bæθ]",
        "examples": [
            "She took a long hot bath (그녀는 뜨거운 물로 긴 목욕을 했다).",
            "The bathroom has a large bath (욕실에는 큰 욕조가 있다)."
        ]
    },
    {
        "english": "Battle",
        "definition": "A sustained fight between large organized armed forces.<br><br>(대규모 조직화된 무장 군대 간의 지속적인 싸움)",
        "pronunciation": "[ˈbætəl]",
        "examples": [
            "The battle lasted for hours (전투는 몇 시간 동안 지속되었다).",
            "They won the battle but lost the war (그들은 전투에서 이겼지만 전쟁에서는 졌다)."
        ]
    },
    {
        "english": "Be aware of",
        "definition": "Having knowledge or perception of a situation or fact.<br><br>(상황이나 사실에 대한 지식이나 인식을 가지고 있는)",
        "pronunciation": "[bi əˈwɛr ʌv]",
        "examples": [
            "Be aware of the risks before you invest (투자하기 전에 위험을 인식하십시오).",
            "She was not aware of his presence (그녀는 그의 존재를 알지 못했다)."
        ]
    },
    {
        "english": "Be fond of",
        "definition": "To have a liking or affection for (someone or something).<br><br>(누군가나 무언가를 좋아하거나 애정을 갖다)",
        "pronunciation": "[bi fɒnd ʌv]",
        "examples": [
            "He is very fond of his dog (그는 자신의 개를 매우 좋아한다).",
            "She's always been fond of chocolate (그녀는 항상 초콜릿을 좋아했다)."
        ]
    },
    {
        "english": "Bear",
        "definition": "A large, heavy mammal that walks on the soles of its feet, with thick fur and a very short tail.<br><br>(두꺼운 모피와 매우 짧은 꼬리를 가지고 발바닥으로 걷는 크고 무거운 포유동물)",
        "pronunciation": "[bɛər]",
        "examples": [
            "Bears hibernate during the winter (곰은 겨울에 동면한다).",
            "A bear can be dangerous if provoked (도발되면 곰이 위험할 수 있다)."
        ]
    },
    {
        "english": "Beast",
        "definition": "An animal, especially a large or wild one.<br><br>(동물, 특히 크거나 야생의 것)",
        "pronunciation": "[biːst]",
        "examples": [
            "The forest is home to many wild beasts (그 숲은 많은 야생 동물의 집이다).",
            "He fought the beast and saved the village (그는 짐승과 싸워 마을을 구했다)."
        ]
    },
    {
        "english": "Beat",
        "definition": "To strike (someone or something) repeatedly and violently.<br><br>(누군가나 무언가를 반복적이고 격렬하게 때리다)",
        "pronunciation": "[biːt]",
        "examples": [
            "The drummers beat their drums loudly (드러머들은 북을 크게 쳤다).",
            "His heart was beating fast (그의 심장은 빠르게 뛰고 있었다)."
        ]
    },
    {
        "english": "Beauty",
        "definition": "A combination of qualities, such as shape, color, or form, that pleases the aesthetic senses, especially the sight.<br><br>(모양, 색상 또는 형태와 같은 특성의 조합으로, 미적 감각을 기쁘게 하며 특히 시각적으로)",
        "pronunciation": "[ˈbjuːti]",
        "examples": [
            "She admired the beauty of the landscape (그녀는 풍경의 아름다움을 감상했다).",
            "Beauty is subjective and varies with culture (미는 주관적이며 문화에 따라 다르다)."
        ]
    },
    {
        "english": "Beg",
        "definition": "To ask (someone) earnestly or humbly for something.<br><br>(무언가를 진심으로 또는 겸손하게 요청하다)",
        "pronunciation": "[bɛɡ]",
        "examples": [
            "He begged her to stay (그는 그녀에게 남아달라고 애원했다).",
            "The children were begging for food (아이들은 음식을 구걸했다)."
        ]
    },
    {
        "english": "Beggar",
        "definition": "A person, typically a homeless one, who lives by asking for money or food.<br><br>(일반적으로 노숙자인, 돈이나 음식을 요청함으로써 살아가는 사람)",
        "pronunciation": "[ˈbɛɡər]",
        "examples": [
            "The beggar was sitting at the street corner (거지가 거리 모퉁이에 앉아 있었다).",
            "They gave some coins to the beggar (그들은 그 거지에게 몇 개의 동전을 주었다)."
        ]
    },
    {
        "english": "Begin",
        "definition": "To start; commence.<br><br>(시작하다; 시작되다)",
        "pronunciation": "[bɪˈɡɪn]",
        "examples": [
            "The ceremony will begin at noon (식은 정오에 시작될 것이다).",
            "He began working at the company last year (그는 지난해 회사에서 일하기 시작했다)."
        ]
    },
    {
        "english": "Behave",
        "definition": "To act in a way that is considered proper or typical.<br><br>(적절하거나 전형적인 방식으로 행동하다)",
        "pronunciation": "[bɪˈheɪv]",
        "examples": [
            "The children behaved well at the party (아이들은 파티에서 예의 바르게 행동했다).",
            "She behaved as if nothing had happened (그녀는 아무 일도 일어나지 않은 것처럼 행동했다)."
        ]
    },
    {
        "english": "Behavior",
        "definition": "The way in which one acts or conducts oneself, especially towards others.<br><br>(특히 다른 사람들에게, 어떤 방식으로 행동하거나 행동하는지)",
        "pronunciation": "[bɪˈheɪvjər]",
        "examples": [
            "His behavior was exemplary (그의 행동은 모범적이었다).",
            "The teacher discussed the student's behavior with his parents (선생님은 그 학생의 행동에 대해 그의 부모와 논의했다)."
        ]
    },
    {
        "english": "Being",
        "definition": "Existence.<br><br>(존재)",
        "pronunciation": "[ˈbiːɪŋ]",
        "examples": [
            "The complexities of human being are vast (인간 존재의 복잡성은 광대하다).",
            "He questioned the very being of God (그는 신의 존재 자체를 의심했다)."
        ]
    },
    {
        "english": "Believe",
        "definition": "To accept (something) as true; feel sure of the truth of.<br><br>(무언가를 진실로 받아들이다; 진실의 확신을 가지다)",
        "pronunciation": "[bɪˈliːv]",
        "examples": [
            "She believes that he is innocent (그녀는 그가 무죄라고 믿는다).",
            "Do you believe in ghosts? (귀신을 믿나요?)"
        ]
    },
    {
        "english": "Belong",
        "definition": "To be a member or part of (a group, team, etc.).<br><br>(그룹, 팀 등의 구성원이나 일부분이 되다)",
        "pronunciation": "[bɪˈlɔŋ]",
        "examples": [
            "That book belongs on the top shelf (그 책은 윗층에 속한다).",
            "Do these keys belong to you? (이 열쇠들은 당신 것입니까?)"
        ]
    },
    {
        "english": "Bend",
        "definition": "To shape or force (something straight) into a curve or angle.<br><br>(무언가를 곧게 휘거나 각도로 만들거나 강제로)",
        "pronunciation": "[bɛnd]",
        "examples": [
            "The tree was bending in the wind (그 나무는 바람에 휘었다).",
            "He bent the rod into a circle (그는 막대기를 원으로 구부렸다)."
        ]
    },
    {
        "english": "Benefit",
        "definition": "An advantage or profit gained from something.<br><br>(무언가로부터 얻은 이점이나 이익)",
        "pronunciation": "[ˈbɛnəfɪt]",
        "examples": [
            "The new policy has many benefits (새 정책은 많은 혜택이 있다).",
            "He received benefits after his accident (그는 사고 후 혜택을 받았다)."
        ]
    },
    {
        "english": "Besides",
        "definition": "In addition to; apart from.<br><br>(추가로; ~외에)",
        "pronunciation": "[bɪˈsaɪdz]",
        "examples": [
            "Besides the salary, the job offers health benefits (급여 외에도 직업은 건강 혜택을 제공한다).",
            "Who is going to the party besides you? (당신 외에 누가 파티에 가나요?)"
        ]
    },
    {
        "english": "Bet",
        "definition": "To risk a sum of money or valued item against someone else's on the basis of the outcome of a future event, such as a game or race.<br><br>(게임이나 경주와 같은 미래의 사건의 결과에 따라 다른 사람의 돈이나 가치 있는 항목에 돈을 걸다)",
        "pronunciation": "[bɛt]",
        "examples": [
            "He bet $50 on the horse (그는 그 말에 50달러를 걸었다).",
            "I wouldn't bet against her; she's very skilled (나는 그녀에게 걸지 않을 것이다; 그녀는 매우 숙련되었다)."
        ]
    },
    {
        "english": "Blank",
        "definition": "Not written or printed on; unmarked.<br><br>(글씨나 인쇄가 없는; 표시가 없는)",
        "pronunciation": "[blæŋk]",
        "examples": [
            "He handed her a blank sheet of paper (그는 그녀에게 빈 종이 한 장을 건넸다).",
            "The form has a blank space for your name (양식에 이름을 쓸 빈 칸이 있다)."
        ]
    },
    {
        "english": "Blanket",
        "definition": "A large piece of woolen or similar material used as a covering for warmth.<br><br>(따뜻함을 위한 덮개로 사용되는 울 또는 비슷한 재료로 만든 큰 조각)",
        "pronunciation": "[ˈblæŋkɪt]",
        "examples": [
            "She wrapped herself in a blanket (그녀는 담요로 몸을 감쌌다).",
            "The ground was covered with a blanket of snow (땅은 눈의 담요로 덮여 있었다)."
        ]
    },
    {
        "english": "Bless",
        "definition": "To invoke divine favor upon; pray for divine favor.<br><br>(신의 호의를 빌다; 신의 호의를 기도하다)",
        "pronunciation": "[blɛs]",
        "examples": [
            "The priest blessed the bread and wine (신부는 빵과 포도주에 축복을 내렸다).",
            "Bless you for your kindness (당신의 친절에 축복을 받으세요)."
        ]
    },
    {
        "english": "Blind",
        "definition": "Unable to see; lacking the sense of sight.<br><br>(볼 수 없는; 시력을 갖추지 못한)",
        "pronunciation": "[blaɪnd]",
        "examples": [
            "The accident left him blind (그 사고로 그는 시력을 잃었다).",
            "Blind people often use braille to read (시각 장애인은 종종 점자를 사용하여 읽는다)."
        ]
    },
    {
        "english": "Block",
        "definition": "A solid piece of hard material, especially rock or concrete, having flat sides and often used as a building material.<br><br>(특히 암석이나 콘크리트와 같은 단단한 재료의 고체 덩어리로, 평평한 면을 가지고 있으며 종종 건축 재료로 사용된다)",
        "pronunciation": "[blɒk]",
        "examples": [
            "He lives on the next block (그는 다음 블록에 산다).",
            "The road was blocked by a fallen tree (도로는 쓰러진 나무에 의해 막혔다)."
        ]
    },
    {
        "english": "Blond",
        "definition": "Of a light color; fair-haired.<br><br>(밝은 색의; 금발의)",
        "pronunciation": "[blɒnd]",
        "examples": [
            "She has blond hair (그녀는 금발이다).",
            "The young blond boy smiled (젊은 금발 소년이 웃었다)."
        ]
    },
    {
        "english": "Blood",
        "definition": "The red liquid that circulates in the arteries and veins of humans and other vertebrate animals, carrying oxygen to and carbon dioxide from the tissues of the body.<br><br>(인간과 다른 척추 동물의 동맥과 정맥을 순환하는 적색 액체로, 산소를 몸의 조직으로 운반하고 이산화탄소를 조직에서 운반한다)",
        "pronunciation": "[blʌd]",
        "examples": [
            "Blood is crucial for transporting nutrients and oxygen (혈액은 영양소와 산소를 운반하는 데 중요하다).",
            "He donated blood at the hospital (그는 병원에서 피를 기증했다)."
        ]
    },
    {
        "english": "Bloom",
        "definition": "To produce flowers; be in flower.<br><br>(꽃을 피우다; 꽃이 피다)",
        "pronunciation": "[bluːm]",
        "examples": [
            "The garden blooms in spring (정원은 봄에 꽃이 핀다).",
            "Cherry trees bloom beautifully in April (벚나무는 4월에 아름답게 꽃을 피운다)."
        ]
    },
    {
        "english": "Blossom",
        "definition": "A flower or a mass of flowers, especially on a tree or bush.<br><br>(나무나 관목, 특히 그 위에 있는 꽃 또는 꽃의 덩어리)",
        "pronunciation": "[ˈblɒsəm]",
        "examples": [
            "The apple tree is in full blossom (사과나무가 만개했다).",
            "Spring is the season of blossom (봄은 꽃이 피는 계절이다)."
        ]
    },
    {
        "english": "Blow",
        "definition": "To (cause to) move creating an air current.<br><br>(공기 흐름을 만들면서 움직이게 하다)",
        "pronunciation": "[bloʊ]",
        "examples": [
            "The wind blows from the west (바람이 서쪽에서 불어온다).",
            "He blew on his coffee to cool it down (그는 커피를 식히기 위해 불었다)."
        ]
    },
    {
        "english": "Board",
        "definition": "A long, thin, flat piece of wood or other hard material, used for floors or other building purposes.<br><br>(바닥이나 다른 건축 목적으로 사용되는 목재 또는 기타 단단한 재료로 만든 길고 얇고 평평한 조각)",
        "pronunciation": "[bɔːrd]",
        "examples": [
            "He cut the board to size with a saw (그는 톱으로 크기에 맞게 판자를 자르다).",
            "We use a whiteboard in our classroom (우리 교실에서는 화이트보드를 사용한다)."
        ]
    },
    {
        "english": "Bill",
        "definition": "A statement of money owed for goods or services supplied.<br><br>(상품이나 서비스 공급에 대해 청구된 금액 명세서)",
        "pronunciation": "[bɪl]",
        "examples": [
            "He paid his electricity bill (그는 전기 요금을 지불했다).",
            "The waiter brought the bill to our table (웨이터가 우리 테이블로 계산서를 가져왔다)."
        ]
    },
    {
        "english": "Billion",
        "definition": "The number equivalent to the product of a thousand and a million; 1,000,000,000 or 10^9.<br><br>(천과 백만을 곱한 수에 해당하는 숫자; 10억 또는 10^9)",
        "pronunciation": "[ˈbɪljən]",
        "examples": [
            "The company is valued at several billion dollars (이 회사는 몇 십억 달러로 평가된다).",
            "It will take billions of years for such stars to form (그러한 별이 형성되는 데는 수십억 년이 걸릴 것이다)."
        ]
    },
    {
        "english": "Bird",
        "definition": "A warm-blooded egg-laying vertebrate distinguished by the possession of feathers, wings, a beak, and typically by being able to fly.<br><br>(깃털, 날개, 부리를 가지고 있으며, 일반적으로 비행할 수 있는 특성으로 구별되는 따뜻한 피를 가진 알을 낳는 척추동물)",
        "pronunciation": "[bɜːrd]",
        "examples": [
            "The garden is filled with the sound of birds singing (정원은 새들의 노래 소리로 가득 차 있다).",
            "She enjoys bird watching (그녀는 새 관찰을 즐긴다)."
        ]
    },
    {
        "english": "Birth",
        "definition": "The emergence of a baby or other young from the body of its mother; the start of life as a physically separate being.<br><br>(어머니의 몸에서 아기나 다른 어린 생물의 출현; 물리적으로 독립된 존재로서의 생명의 시작)",
        "pronunciation": "[bɜːrθ]",
        "examples": [
            "She gave birth to a healthy baby boy (그녀는 건강한 아기를 낳았다).",
            "The birth of a child is a joyful event (아이의 탄생은 기쁜 사건이다)."
        ]
    },
    {
        "english": "Bite",
        "definition": "To use the teeth to cut into something or someone.<br><br>(무언가나 누군가를 물기 위해 이를 사용하다)",
        "pronunciation": "[baɪt]",
        "examples": [
            "The dog might bite if you tease it (그 개는 당신이 놀리면 물 수도 있다).",
            "She bit into the apple (그녀는 사과를 깨물었다)."
        ]
    },
    {
        "english": "Bitter",
        "definition": "Having a sharp, pungent taste or smell; not sweet.<br><br>(맛이나 냄새가 날카롭고 톡 쏘는; 달지 않은)",
        "pronunciation": "[ˈbɪtər]",
        "examples": [
            "The medicine has a bitter taste (그 약은 쓴맛이 난다).",
            "He had bitter feelings about the way he was treated (그는 자신이 대우받는 방식에 대해 쓰라린 감정을 가지고 있었다)."
        ]
    },
    {
        "english": "Blackboard",
        "definition": "A dark-colored board used as a writing surface, typically in a school.<br><br>(학교에서 일반적으로 사용되는 쓰기 표면으로 사용되는 어두운 색의 판)",
        "pronunciation": "[ˈblækˌbɔːrd]",
        "examples": [
            "The teacher wrote the equation on the blackboard (선생님은 칠판에 방정식을 썼다).",
            "He erased the blackboard after the lesson (그는 수업 후에 칠판을 지웠다)."
        ]
    },
    {
        "english": "Blame",
        "definition": "To hold responsible; assign fault or responsibility for something bad or unfortunate.<br><br>(책임을 지우다; 나쁜 일이나 불운에 대한 책임이나 잘못을 지정하다)",
        "pronunciation": "[bleɪm]",
        "examples": [
            "She blamed him for the failure of their project (그녀는 그들 프로젝트의 실패에 대해 그를 탓했다).",
            "The company was blamed for the pollution (그 회사는 오염에 대한 책임을 지었다)."
        ]
    },
    {
        "english": "Boil",
        "definition": "To reach or cause to reach the temperature at which a liquid bubbles and turns to vapor.<br><br>(액체가 거품을 내면서 증발하기 시작하는 온도에 도달하게 하다)",
        "pronunciation": "[bɔɪl]",
        "examples": [
            "Water boils at 100 degrees Celsius (물은 섭씨 100도에서 끓는다).",
            "He boiled some water to make tea (그는 차를 만들기 위해 물을 끓였다)."
        ]
    },
    {
        "english": "Bomb",
        "definition": "An explosive weapon detonated by impact, proximity to an object, a timing mechanism, or other means.<br><br>(충격, 근접, 타이밍 메커니즘 또는 기타 수단에 의해 폭발하는 폭발물)",
        "pronunciation": "[bɒm]",
        "examples": [
            "The bomb exploded in a busy marketplace (폭탄은 붐비는 시장에서 폭발했다).",
            "Bomb disposal teams are trained to handle such threats (폭발물 처리 팀은 그러한 위협을 처리하는 훈련을 받는다)."
        ]
    },
    {
        "english": "Bone",
        "definition": "Any of the pieces of hard, whitish tissue making up the skeleton in humans and other vertebrates.<br><br>(인간 및 기타 척추동물의 골격을 구성하는 단단하고 흰색의 조직 조각)",
        "pronunciation": "[boʊn]",
        "examples": [
            "He broke a bone in his arm (그는 팔뼈를 부러뜨렸다).",
            "Dogs love to chew on bones (개들은 뼈를 씹는 것을 좋아한다)."
        ]
    },
    {
        "english": "Border",
        "definition": "The line separating two political or geographical areas, especially countries.<br><br>(특히 국가 간을 구분하는 경계선)",
        "pronunciation": "[ˈbɔːrdər]",
        "examples": [
            "They crossed the border into Canada (그들은 캐나다 국경을 넘었다).",
            "The river forms the natural border between the two regions (그 강은 두 지역 사이의 자연 경계를 형성한다)."
        ]
    },
    {
        "english": "Bore",
        "definition": "To make (someone) feel weary and uninterested by tedious talk or dullness.<br><br>(지루한 이야기나 따분함으로 지치고 흥미를 잃게 만들다)",
        "pronunciation": "[bɔːr]",
        "examples": [
            "He bored us with his long speech (그는 그의 긴 연설로 우리를 지루하게 했다).",
            "The lecture was so boring that several students fell asleep (강의가 너무 지루해서 몇 명의 학생들이 잠들었다)."
        ]
    },
    {
        "english": "Borrow",
        "definition": "To take and use (something belonging to someone else) with the intention of returning it.<br><br>(다른 사람의 것을 빌려 사용하고 반환할 의도를 가지다)",
        "pronunciation": "[ˈbɒrəʊ]",
        "examples": [
            "She borrowed a book from the library (그녀는 도서관에서 책을 빌렸다).",
            "Can I borrow your pen for a moment? (잠깐 펜을 빌릴 수 있을까요?)"
        ]
    },
    {
        "english": "Both",
        "definition": "Used to refer to two people or things, regarded and identified together.<br><br>(함께 고려되고 식별되는 두 사람이나 물건을 가리키는 데 사용됨)",
        "pronunciation": "[boʊθ]",
        "examples": [
            "Both of these roads lead to the town center (이 두 길 모두 도심으로 이어진다).",
            "Both children were playing in the garden (두 아이 모두 정원에서 놀고 있었다)."
        ]
    },
    {
        "english": "Bother",
        "definition": "To take the trouble to do something; concern oneself.<br><br>(무언가를 하기 위해 귀찮게 하다; 관심을 가지다)",
        "pronunciation": "[ˈbɒðər]",
        "examples": [
            "Why bother going if you're not interested? (관심이 없다면 왜 굳이 가려고 하나요?)",
            "Don't bother him while he's working (그가 일하는 동안 그를 방해하지 마세요)."
        ]
    },
    {
        "english": "Bottle",
        "definition": "A container, typically made of glass or plastic and with a narrow neck, used for storing drinks or other liquids.<br><br>(음료수나 기타 액체를 저장하는 데 사용되는, 일반적으로 유리 또는 플라스틱으로 만들어진 좁은 목이 있는 용기)",
        "pronunciation": "[ˈbɒtəl]",
        "examples": [
            "He drank a whole bottle of water (그는 물 한 병을 전부 마셨다).",
            "Please recycle the empty bottles (빈 병은 재활용해 주세요)."
        ]
    },
    {
        "english": "Brain",
        "definition": "The organ inside the head that controls thought, memory, feelings, and activity.<br><br>(생각, 기억, 감정 및 활동을 제어하는 머리 속의 기관)",
        "pronunciation": "[breɪn]",
        "examples": [
            "The brain is capable of processing complex information (뇌는 복잡한 정보를 처리할 수 있다).",
            "He suffered a severe brain injury (그는 심각한 뇌 손상을 입었다)."
        ]
    },
    {
        "english": "Branch",
        "definition": "A part of a tree which grows out from the trunk or from a bough.<br><br>(줄기나 가지에서 자라나는 나무의 일부)",
        "pronunciation": "[bræntʃ]",
        "examples": [
            "The cat was stuck on a high branch (고양이는 높은 나뭇가지에 걸려 있었다).",
            "Birds built a nest on the branch (새들은 가지에 둥지를 만들었다)."
        ]
    },
    {
        "english": "Brave",
        "definition": "Ready to face and endure danger or pain; showing courage.<br><br>(위험이나 고통을 견디고 맞서려는; 용기를 보이는)",
        "pronunciation": "[breɪv]",
        "examples": [
            "Firefighters are brave people (소방관들은 용감한 사람들이다).",
            "She was brave enough to speak out against injustice (그녀는 부정의에 맞서 말하기에 충분히 용감했다)."
        ]
    },
    {
        "english": "Break",
        "definition": "To separate into pieces as a result of a blow, shock, or strain.<br><br>(충격, 충격 또는 긴장의 결과로 조각으로 나누다)",
        "pronunciation": "[breɪk]",
        "examples": [
            "The plate broke when it fell to the floor (접시가 바닥에 떨어지면서 깨졌다).",
            "He broke the window by accident (그는 실수로 창문을 깼다)."
        ]
    },
    {
        "english": "Breath",
        "definition": "The air taken into or expelled from the lungs.<br><br>(폐로 들어오거나 폐에서 나오는 공기)",
        "pronunciation": "[breθ]",
        "examples": [
            "He took a deep breath before diving into the pool (그는 수영장에 뛰어들기 전에 깊게 숨을 들이켰다).",
            "You could see her breath in the cold air (추운 공기 속에서 그녀의 숨결을 볼 수 있었다)."
        ]
    },
    {
        "english": "Breathe",
        "definition": "To take air into the lungs and then expel it, especially as a regular physiological process.<br><br>(공기를 폐로 들이마시고 내뱉다, 특히 정기적인 생리적 과정으로)",
        "pronunciation": "[briːð]",
        "examples": [
            "She was breathing heavily after the run (그녀는 달리기 후에 숨을 헐떡였다).",
            "Breathe in through your nose and out through your mouth (코로 숨을 들이쉬고 입으로 숨을 내쉬세요)."
        ]
    },
    {
        "english": "Breeze",
        "definition": "A gentle wind.<br><br>(산들바람)",
        "pronunciation": "[briːz]",
        "examples": [
            "A cool breeze was blowing from the sea (바다에서 시원한 바람이 불고 있었다).",
            "The curtains fluttered in the light breeze (커튼이 가벼운 바람에 흔들렸다)."
        ]
    },
    {
        "english": "Brick",
        "definition": "A small rectangular block typically made of fired or sun-dried clay, used in building.<br><br>(일반적으로 건축에 사용되는 구운 또는 햇볕에 말린 점토로 만든 작고 직사각형의 블록)",
        "pronunciation": "[brɪk]",
        "examples": [
            "The house was built with red bricks (그 집은 빨간 벽돌로 지어졌다).",
            "He threw a brick through the window (그는 창문을 통해 벽돌을 던졌다)."
        ]
    },
    {
        "english": "Bridge",
        "definition": "A structure carrying a road, path, railroad, or canal across a river, road, or other obstacle.<br><br>(강, 도로 또는 기타 장애물을 가로질러 도로, 길, 철도 또는 운하를 운반하는 구조)",
        "pronunciation": "[brɪdʒ]",
        "examples": [
            "The old bridge collapsed during the storm (폭풍 동안 오래된 다리가 무너졌다).",
            "They are building a new bridge over the river (그들은 강 위에 새 다리를 짓고 있다)."
        ]
    },
    {
        "english": "Brief",
        "definition": "Short in duration, extent, or length.<br><br>(기간, 범위, 또는 길이가 짧은)",
        "pronunciation": "[brif]",
        "examples": [
            "We had a brief meeting in the office (우리는 사무실에서 잠깐 회의를 했다).",
            "The event was brief but very impactful (행사는 짧았지만 매우 강력했다)."
        ]
    },
    {
        "english": "Bright",
        "definition": "Giving out or reflecting a lot of light; shining.<br><br>(많은 빛을 내거나 반사하는; 빛나는)",
        "pronunciation": "[braɪt]",
        "examples": [
            "The sun was bright and warm today (오늘 해는 밝고 따뜻했다).",
            "She wore a bright red dress to the party (그녀는 파티에 밝은 빨간 드레스를 입었다)."
        ]
    },
    {
        "english": "Brilliant",
        "definition": "Exceptionally clever or talented.<br><br>(특별히 똑똑하거나 재능이 있는)",
        "pronunciation": "[ˈbrɪliənt]",
        "examples": [
            "She gave a brilliant performance in the concert (그녀는 콘서트에서 훌륭한 공연을 했다).",
            "He's brilliant at math (그는 수학에 뛰어나다)."
        ]
    },
    {
        "english": "Bring",
        "definition": "To carry or transport to the place where one is, especially when emphasizing the effort needed.<br><br>(특히 노력이 필요할 때, 누군가 있는 곳으로 운반하거나 옮기다)",
        "pronunciation": "[brɪŋ]",
        "examples": [
            "Don't forget to bring your umbrella (우산을 가져오는 것을 잊지 마세요).",
            "She brought her friend to the party (그녀는 파티에 친구를 데려왔다)."
        ]
    },
    {
        "english": "Broad",
        "definition": "Having a distance larger than usual from side to side; wide.<br><br>(보통보다 측면 간 거리가 넓은)",
        "pronunciation": "[brɔːd]",
        "examples": [
            "The river is very broad here (여기 강은 매우 넓다).",
            "He has a broad understanding of the subject (그는 그 주제에 대해 폭넓은 이해를 가지고 있다)."
        ]
    },
    {
        "english": "Broadcast",
        "definition": "To transmit (programs or some information) by radio or television.<br><br>(라디오나 텔레비전을 통해 프로그램이나 정보를 전송하다)",
        "pronunciation": "[ˈbrɔːdkæst]",
        "examples": [
            "The interview was broadcast live (인터뷰가 생방송으로 방송됐다).",
            "News of the event was broadcast around the world (그 사건의 뉴스는 전 세계에 방송되었다)."
        ]
    },
    {
        "english": "Bubble",
        "definition": "A thin sphere of liquid enclosing air or another gas.<br><br>(공기 또는 다른 가스를 포함하는 액체의 얇은 구)",
        "pronunciation": "[ˈbʌbl]",
        "examples": [
            "Children love to pop soap bubbles (아이들은 비눗방울을 터뜨리는 것을 좋아한다).",
            "The water boiled with bubbles rising to the surface (물이 끓으면서 거품이 표면으로 올라왔다)."
        ]
    },
    {
        "english": "Bucket",
        "definition": "A roughly cylindrical open container with a handle, used to hold and carry liquids or other material.<br><br>(손잡이가 달린 대략 원통형의 개방형 용기로, 액체나 다른 재료를 담고 운반하는 데 사용됨)",
        "pronunciation": "[ˈbʌkɪt]",
        "examples": [
            "He filled the bucket with water (그는 양동이에 물을 채웠다).",
            "She carried a bucket of sand from the beach (그녀는 해변에서 모래가 담긴 양동이를 들고 왔다)."
        ]
    },
    {
        "english": "Bug",
        "definition": "A small insect.<br><br>(작은 곤충)",
        "pronunciation": "[bʌɡ]",
        "examples": [
            "We found a bug in the garden (우리는 정원에서 벌레를 발견했다).",
            "She hates bugs and screams when she sees one (그녀는 벌레를 싫어하고 하나를 볼 때마다 소리를 질러대다)."
        ]
    },
    {
        "english": "Build",
        "definition": "To construct (something) by putting parts or material together.<br><br>(부품이나 재료를 함께 조립하여 무엇인가를 만들다)",
        "pronunciation": "[bɪld]",
        "examples": [
            "They plan to build a new house next year (그들은 내년에 새 집을 짓기로 계획하고 있다).",
            "The company builds commercial aircraft (그 회사는 상업용 항공기를 제조한다)."
        ]
    },
    {
        "english": "Bulb",
        "definition": "A round root of some plants from which the plant grows.<br><br>(일부 식물이 자라나는 둥근 뿌리)",
        "pronunciation": "[bʌlb]",
        "examples": [
            "We planted tulip bulbs in the fall (우리는 가을에 튤립 구근을 심었다).",
            "The light bulb needs to be changed (전구를 교체해야 한다)."
        ]
    },
    {
        "english": "Bullet",
        "definition": "A small metal projectile for firing from a gun.<br><br>(총에서 발사되는 작은 금속 발사체)",
        "pronunciation": "[ˈbʊlɪt]",
        "examples": [
            "The police found a bullet casing at the scene (경찰은 현장에서 탄피를 발견했다).",
            "He was hit by a stray bullet (그는 길잃은 총알에 맞았다)."
        ]
    },
    {
        "english": "Burden",
        "definition": "A load, typically a heavy one.<br><br>(일반적으로 무거운 짐)",
        "pronunciation": "[ˈbɜrdn]",
        "examples": [
            "The donkey carried the burden up the hill (당나귀는 언덕을 오르면서 짐을 지고 갔다).",
            "He felt the burden of responsibility (그는 책임의 무게를 느꼈다)."
        ]
    },
    {
        "english": "Burn",
        "definition": "To be or cause to be destroyed by fire.<br><br>(화재로 인해 파괴되거나 파괴되게 하다)",
        "pronunciation": "[bɜrn]",
        "examples": [
            "The candle burned brightly (촛불이 밝게 타올랐다).",
            "The house burned to the ground (집이 완전히 불에 탔다)."
        ]
    },
    {
        "english": "Bury",
        "definition": "To put or hide under ground.<br><br>(땅 속에 묻거나 숨기다)",
        "pronunciation": "[ˈbɛri]",
        "examples": [
            "They buried the treasure in the woods (그들은 숲에 보물을 묻었다).",
            "She buried her face in her hands (그녀는 얼굴을 손에 묻었다)."
        ]
    },
    {
        "english": "Busy",
        "definition": "Occupied with or concentrating on a particular activity or object of attention.<br><br>(특정 활동이나 주의를 요하는 대상에 바쁜)",
        "pronunciation": "[ˈbɪzi]",
        "examples": [
            "She was too busy to come to the phone (그녀는 전화할 시간이 없을 만큼 바빴다).",
            "The restaurant is always busy on weekends (그 식당은 주말에 항상 붐빈다)."
        ]
    },
    {
        "english": "Buy",
        "definition": "To obtain something by paying money for it.<br><br>(무언가를 돈을 지불하여 얻다)",
        "pronunciation": "[baɪ]",
        "examples": [
            "I need to buy groceries (나는 식료품을 사야 한다).",
            "She bought a new car (그녀는 새 차를 샀다)."
        ]
    },
    {
        "english": "Cage",
        "definition": "A structure of bars or wires in which birds or other animals are confined.<br><br>(새나 다른 동물들이 갇혀 있는 막대기나 철사 구조)",
        "pronunciation": "[keɪdʒ]",
        "examples": [
            "The bird was singing in the cage (새는 새장에서 노래를 불렀다).",
            "They put the lion in a large cage (그들은 사자를 큰 새장에 넣었다)."
        ]
    },
    {
        "english": "Calculate",
        "definition": "To determine the amount or number of something mathematically.<br><br>(수학적으로 어떤 것의 양이나 숫자를 결정하다)",
        "pronunciation": "[ˈkælkjuleɪt]",
        "examples": [
            "Calculate the total cost of your expenses (당신의 지출 총액을 계산하세요).",
            "The computer can calculate faster than any human (컴퓨터는 어떤 인간보다 더 빨리 계산할 수 있다)."
        ]
    },
    {
        "english": "Call",
        "definition": "To cry out or shout.<br><br>(소리치거나 외치다)",
        "pronunciation": "[kɔːl]",
        "examples": [
            "He called her name from across the street (그는 거리 건너편에서 그녀의 이름을 불렀다).",
            "I'll call you tomorrow (내일 전화할게)."
        ]
    },
    {
        "english": "Calm",
        "definition": "Not showing or feeling nervousness, anger, or other strong emotions.<br><br>(긴장, 화남 또는 기타 강한 감정을 보이거나 느끼지 않는)",
        "pronunciation": "[kɑːm]",
        "examples": [
            "She remained calm throughout the crisis (그녀는 위기 내내 차분했다).",
            "The sea was calm today (오늘 바다는 잔잔했다)."
        ]
    },
    {
        "english": "Campaign",
        "definition": "A series of military operations intended to achieve a particular objective, confined to a particular area, or involving a specified type of fighting.<br><br>(특정 목표를 달성하기 위해 특정 지역에 국한되거나 특정 유형의 전투를 포함하는 일련의 군사 작전)",
        "pronunciation": "[kæmˈpeɪn]",
        "examples": [
            "The campaign lasted several months (캠페인은 몇 달간 지속되었다).",
            "He is working on the election campaign (그는 선거 캠페인을 진행 중이다)."
        ]
    },
    {
        "english": "Cancel",
        "definition": "To decide or announce that (a planned event) will not take place.<br><br>(계획된 이벤트가 진행되지 않을 것임을 결정하거나 발표하다)",
        "pronunciation": "[ˈkænsəl]",
        "examples": [
            "They had to cancel the concert due to rain (그들은 비로 인해 콘서트를 취소해야 했다).",
            "The meeting was canceled at the last minute (회의는 마지막 순간에 취소되었다)."
        ]
    },
    {
        "english": "Cancer",
        "definition": "A disease caused by an uncontrolled division of abnormal cells in a part of the body.<br><br>(몸의 일부에서 비정상 세포의 통제되지 않는 분열에 의해 발생하는 질병)",
        "pronunciation": "[ˈkænsər]",
        "examples": [
            "He was diagnosed with lung cancer (그는 폐암 진단을 받았다).",
            "Cancer research is critically important (암 연구는 매우 중요하다)."
        ]
    },
    {
        "english": "Candle",
        "definition": "A cylinder or block of wax or tallow with a central wick which is lit to produce light as it burns.<br><br>(심지가 중앙에 있는 왁스 또는 황 속의 실린더 또는 블록으로, 태워서 빛을 생산하기 위해 점화된다)",
        "pronunciation": "[ˈkændl]",
        "examples": [
            "The room was lit by candlelight (방은 촛불로 밝혀졌다).",
            "He blew out the candles on his birthday cake (그는 생일 케이크 위의 촛불을 끄는 데 성공했다)."
        ]
    },
    {
        "english": "Capable",
        "definition": "Having the ability, fitness, or quality necessary to do or achieve a specified thing.<br><br>(특정한 것을 하거나 달성하기 위한 능력, 적합성 또는 품질을 가지고 있는)",
        "pronunciation": "[ˈkeɪpəbl]",
        "examples": [
            "She is capable of running a marathon (그녀는 마라톤을 뛸 수 있는 능력이 있다).",
            "The company is capable of handling large projects (그 회사는 대규모 프로젝트를 처리할 수 있다)."
        ]
    },
    {
        "english": "Capital",
        "definition": "The most important city or town of a country or region, usually its seat of government and administrative center.<br><br>(보통 그 나라나 지역의 정부와 행정 중심지인 나라 또는 지역의 가장 중요한 도시)",
        "pronunciation": "[ˈkæpɪtəl]",
        "examples": [
            "Paris is the capital of France (파리는 프랑스의 수도이다).",
            "The company invested a large amount of capital in the new factory (회사는 새 공장에 많은 자본을 투자했다)."
        ]
    },
    {
        "english": "Captain",
        "definition": "The person in command of a ship.<br><br>(선박을 지휘하는 사람)",
        "pronunciation": "[ˈkæptɪn]",
        "examples": [
            "The captain steered the ship through the storm (선장은 폭풍을 헤치고 배를 조종했다).",
            "She was appointed captain of the team (그녀는 팀의 주장으로 임명되었다)."
        ]
    },
    {
        "english": "Care",
        "definition": "The provision of what is necessary for the health, welfare, maintenance, and protection of someone or something.<br><br>(누군가나 무언가의 건강, 복지, 유지 및 보호를 위해 필요한 것을 제공하는 것)",
        "pronunciation": "[kɛr]",
        "examples": [
            "The nurse provided excellent care to her patients (간호사는 환자들에게 훌륭한 간호를 제공했다).",
            "Take care of your brother while I'm gone (내가 없는 동안 동생을 잘 돌봐)."
        ]
    },
    {
        "english": "Career",
        "definition": "An occupation undertaken for a significant period of a person's life and with opportunities for progress.<br><br>(한 사람의 인생에서 상당 기간 동안 종사하는 직업 및 진행 기회)",
        "pronunciation": "[kəˈrɪər]",
        "examples": [
            "She had a long and successful career in law (그녀는 법 분야에서 길고 성공적인 경력을 가졌다).",
            "He is planning a career change (그는 경력 변경을 계획하고 있다)."
        ]
    },
    {
        "english": "Careful",
        "definition": "Making sure of avoiding potential danger, mishap, or harm; cautious.<br><br>(잠재적 위험, 사고 또는 해를 피하기 위해 확실히 보증하는; 조심스러운)",
        "pronunciation": "[ˈkɛrfʊl]",
        "examples": [
            "Be careful with the glass (유리를 조심해).",
            "He was careful to avoid further mistakes (그는 추가 실수를 피하기 위해 주의했다)."
        ]
    },
    {
        "english": "Careless",
        "definition": "Not giving sufficient attention or thought to avoiding harm or errors.<br><br>(해를 입거나 실수를 피하기 위해 충분한 주의나 생각을 하지 않는)",
        "pronunciation": "[ˈkɛrləs]",
        "examples": [
            "It was a careless mistake (그것은 부주의한 실수였다).",
            "He was careless with his spending (그는 지출에 대해 부주의했다)."
        ]
    },
    {
        "english": "Carry",
        "definition": "To support and move (someone or something) from one place to another.<br><br>(어떤 사람이나 물건을 한 곳에서 다른 곳으로 지지하고 옮기다)",
        "pronunciation": "[ˈkæri]",
        "examples": [
            "Can you help me carry these boxes? (이 상자들을 옮기는 데 도와줄 수 있니?)",
            "The bridge is strong enough to carry heavy trucks (그 다리는 무거운 트럭을 견딜 만큼 충분히 강하다)."
        ]
    },
    {
        "english": "Cart",
        "definition": "A wheeled vehicle typically used for transporting goods or passengers.<br><br>(일반적으로 상품이나 승객을 운송하는 데 사용되는 바퀴가 달린 차량)",
        "pronunciation": "[kɑːrt]",
        "examples": [
            "He pulled a cart loaded with groceries (그는 식료품으로 가득 찬 카트를 끌었다).",
            "The horse was hitched to a cart (말은 카트에 매여 있었다)."
        ]
    },
    {
        "english": "Case",
        "definition": "An instance of a particular situation; an example of something occurring.<br><br>(특정 상황의 사례; 무언가가 발생하는 예)",
        "pronunciation": "[keɪs]",
        "examples": [
            "A case of mistaken identity (잘못된 신원의 사례)",
            "The detective solved the murder case (탐정은 살인 사건을 해결했다)."
        ]
    },
    {
        "english": "Cash",
        "definition": "Money in coins or notes, as distinct from checks, money orders, or credit.<br><br>(수표, 송금, 또는 신용과 구분되는 동전이나 지폐로 된 돈)",
        "pronunciation": "[kæʃ]",
        "examples": [
            "I need to stop at the ATM to get some cash (현금을 조금 찾기 위해 ATM에 들러야 한다).",
            "He paid in cash (그는 현금으로 결제했다)."
        ]
    },
    {
        "english": "Cat",
        "definition": "A small domesticated carnivorous mammal with soft fur, a short snout, and retractable claws.<br><br>(부드러운 털, 짧은 주둥이, 그리고 들어갈 수 있는 발톱을 가진 작고 가축화된 육식 포유동물)",
        "pronunciation": "[kæt]",
        "examples": [
            "The cat purred contentedly in her lap (고양이는 그녀의 무릎에서 만족스럽게 골골거렸다).",
            "She adopted a cat from the shelter (그녀는 보호소에서 고양이를 입양했다)."
        ]
    },
    {
        "english": "Catch",
        "definition": "To capture or seize, especially after a chase.<br><br>(특히 추격 후에 포착하거나 붙잡다)",
        "pronunciation": "[kætʃ]",
        "examples": [
            "He caught the ball just before it hit the ground (그는 공이 땅에 닿기 직전에 공을 잡았다).",
            "The police caught the thief in the act (경찰은 도둑을 현장에서 붙잡았다)."
        ]
    },
    {
        "english": "Cause",
        "definition": "A person or thing that gives rise to an action, phenomenon, or condition.<br><br>(행동, 현상 또는 상태를 야기하는 사람이나 물건)",
        "pronunciation": "[kɔːz]",
        "examples": [
            "The cause of the accident is not yet known (사고의 원인은 아직 알려지지 않았다).",
            "She fought for a cause she believed in (그녀는 자신이 믿는 원인을 위해 싸웠다)."
        ]
    },
    {
        "english": "Cave",
        "definition": "A large underground chamber, typically of natural origin, in a hillside or cliff.<br><br>(언덕이나 절벽에 있는, 일반적으로 자연적 기원의 큰 지하 공간)",
        "pronunciation": "[keɪv]",
        "examples": [
            "The explorers discovered a cave filled with ancient artifacts (탐험가들은 고대 유물로 가득 찬 동굴을 발견했다).",
            "Bats often live in caves (박쥐는 종종 동굴에서 산다)."
        ]
    },
    {
        "english": "Cease",
        "definition": "To come to an end.<br><br>(끝나다)",
        "pronunciation": "[siːs]",
        "examples": [
            "The rain ceased after a few hours (몇 시간 후 비가 그쳤다).",
            "Hostilities must cease immediately (적대 행위는 즉시 중단되어야 한다)."
        ]
    },
    {
        "english": "Ceiling",
        "definition": "The upper interior surface of a room or other similar compartment.<br><br>(방 또는 다른 유사한 구획의 상부 내부 표면)",
        "pronunciation": "[ˈsiːlɪŋ]",
        "examples": [
            "The ceiling of the cave was decorated with stalactites (동굴의 천장은 종유석으로 장식되어 있었다).",
            "He painted the ceiling white (그는 천장을 흰색으로 칠했다)."
        ]
    },
    {
        "english": "Celebrate",
        "definition": "To acknowledge (a significant or happy day or event) with a social gathering or enjoyable activity.<br><br>(사교 모임이나 즐거운 활동으로 중요하거나 행복한 날이나 사건을 기념하다)",
        "pronunciation": "[ˈsɛlɪbreɪt]",
        "examples": [
            "They gathered to celebrate the holiday (그들은 휴일을 기념하기 위해 모였다).",
            "Her family celebrated her graduation with a big party (그녀의 가족은 큰 파티로 그녀의 졸업을 축하했다)."
        ]
    },
    {
        "english": "Cell",
        "definition": "The smallest structural and functional unit of an organism, typically microscopic and consisting of cytoplasm and a nucleus enclosed in a membrane.<br><br>(일반적으로 현미경으로 보이며 세포질과 막으로 둘러싸인 핵을 포함하는 유기체의 가장 작은 구조적 및 기능적 단위)",
        "pronunciation": "[sɛl]",
        "examples": [
            "Human body is made up of millions of cells (인간의 몸은 수백만 개의 세포로 구성되어 있다).",
            "The research focused on cancer cells (연구는 암 세포에 집중되었다)."
        ]
    },
    {
        "english": "Chain",
        "definition": "A series of linked metal rings used for fastening or securing something, or for pulling loads.<br><br>(무언가를 고정하거나 확보하거나 부하를 당기는 데 사용되는 연결된 금속 링의 연속)",
        "pronunciation": "[tʃeɪn]",
        "examples": [
            "He secured the gate with a chain (그는 체인으로 문을 고정했다).",
            "The dog was kept on a chain in the yard (개는 마당에 체인으로 묶여 있었다)."
        ]
    },
    {
        "english": "Chairperson",
        "definition": "The person who presides over a meeting.<br><br>(회의를 주재하는 사람)",
        "pronunciation": "[ˈtʃɛəˌpɜːrsn]",
        "examples": [
            "The chairperson called the meeting to order (의장은 회의를 소집했다).",
            "She was elected as the new chairperson of the committee (그녀는 위원회의 새 의장으로 선출되었다)."
        ]
    },
    {
        "english": "Chalk",
        "definition": "A soft white limestone used for writing on blackboards or other surfaces.<br><br>(칠판이나 다른 표면에 쓰기 위해 사용되는 부드러운 흰색 석회석)",
        "pronunciation": "[tʃɔːk]",
        "examples": [
            "The teacher wrote with chalk on the blackboard (선생님은 칠판에 분필로 글씨를 썼다).",
            "Children were drawing with colored chalks on the sidewalk (아이들은 인도에 색깔 분필로 그림을 그렸다)."
        ]
    },
    {
        "english": "Challenge",
        "definition": "A call to someone to participate in a competitive situation or fight to decide who is superior in terms of ability or strength.<br><br>(능력이나 힘의 우월성을 결정하기 위해 경쟁 상황이나 싸움에 참여하도록 누군가에게 요구하는 것)",
        "pronunciation": "[ˈtʃælɪndʒ]",
        "examples": [
            "He accepted the challenge to race against the champion (그는 챔피언과의 경주 도전을 받아들였다).",
            "The role was a real challenge for her (그 역할은 그녀에게 진정한 도전이었다)."
        ]
    },
    {
        "english": "Chance",
        "definition": "A possibility of something happening.<br><br>(무언가가 일어날 가능성)",
        "pronunciation": "[tʃæns]",
        "examples": [
            "There's a good chance of rain tomorrow (내일 비가 올 가능성이 높다).",
            "He took a chance and invested in the stock market (그는 기회를 잡고 주식 시장에 투자했다)."
        ]
    },
    {
        "english": "Change",
        "definition": "To make or become different.<br><br>(다르게 만들거나 다르게 되다)",
        "pronunciation": "[tʃeɪndʒ]",
        "examples": [
            "We need to change the way we operate (우리는 운영 방식을 바꿔야 한다).",
            "She changed her name after getting married (그녀는 결혼 후 이름을 바꿨다)."
        ]
    },
    {
        "english": "Character",
        "definition": "The mental and moral qualities distinctive to an individual.<br><br>(개인에게 독특한 정신적 및 도덕적 품질)",
        "pronunciation": "[ˈkærəktər]",
        "examples": [
            "She is known for her strong character (그녀는 강한 성격으로 알려져 있다).",
            "The novel features a cast of colorful characters (소설에는 다채로운 인물들이 등장한다)."
        ]
    },
    {
        "english": "Charge",
        "definition": "The responsibility of taking care, control, or management of something.<br><br>(무언가를 돌보거나 관리하거나 제어하는 책임)",
        "pronunciation": "[tʃɑrdʒ]",
        "examples": [
            "She left him in charge of the children (그녀는 그에게 아이들을 맡겼다).",
            "The teacher has charge of the class (선생님은 반을 책임지고 있다)."
        ]
    },
    {
        "english": "Chase",
        "definition": "To pursue in order to catch or catch up with.<br><br>(따라잡거나 따라잡기 위해 추격하다)",
        "pronunciation": "[tʃeɪs]",
        "examples": [
            "The police car chased the escaping thief (경찰차는 도망치는 도둑을 추격했다).",
            "The cat chased the mouse across the yard (고양이는 마당을 가로질러 쥐를 쫓았다)."
        ]
    },
    {
        "english": "Chat",
        "definition": "To talk in a friendly and informal way.<br><br>(친근하고 비공식적인 방식으로 이야기하다)",
        "pronunciation": "[tʃæt]",
        "examples": [
            "They chatted about their plans for the summer (그들은 여름 계획에 대해 이야기했다).",
            "She chatted with her friend online (그녀는 친구와 온라인으로 채팅했다)."
        ]
    },
    {
        "english": "Cheap",
        "definition": "Low in price, especially in relation to similar items or services.<br><br>(특히 유사한 항목이나 서비스와 관련하여 가격이 낮은)",
        "pronunciation": "[tʃiːp]",
        "examples": [
            "They found a cheap hotel for the night (그들은 그날 밤 저렴한 호텔을 찾았다).",
            "Cheap clothing often doesn't last long (저렴한 옷은 종종 오래 가지 않는다)."
        ]
    },
    {
        "english": "Check",
        "definition": "To examine (something) in order to determine its accuracy, quality, or condition, or to detect the presence of something.<br><br>(정확성, 품질 또는 상태를 결정하거나 무언가의 존재를 감지하기 위해 검사하다)",
        "pronunciation": "[tʃɛk]",
        "examples": [
            "Please check your email for the confirmation (확인을 위해 이메일을 확인하세요).",
            "The doctor checked her heart rate (의사는 그녀의 심박수를 확인했다)."
        ]
    },
    {
        "english": "Cheer",
        "definition": "To shout for joy or in praise or encouragement.<br><br>(기쁨이나 칭찬 또는 격려를 위해 외치다)",
        "pronunciation": "[tʃɪər]",
        "examples": [
            "The crowd cheered when the team scored (팀이 득점하자 군중이 환호했다).",
            "She cheered him on during the race (그녀는 경주 중에 그를 응원했다)."
        ]
    },
    {
        "english": "Cheerful",
        "definition": "Noticeably happy and optimistic.<br><br>(눈에 띄게 행복하고 낙관적인)",
        "pronunciation": "[ˈtʃɪərfʊl]",
        "examples": [
            "He is always cheerful in the morning (그는 아침에 항상 쾌활하다).",
            "The room was decorated in cheerful colors (그 방은 쾌활한 색상으로 꾸며졌다)."
        ]
    },
    {
        "english": "Chef",
        "definition": "A professional cook, typically the chief cook in a restaurant or hotel.<br><br>(일반적으로 레스토랑이나 호텔에서 주방장인 전문 요리사)",
        "pronunciation": "[ʃɛf]",
        "examples": [
            "The chef prepared a wonderful meal (셰프가 멋진 식사를 준비했다).",
            "She trained to become a chef (그녀는 셰프가 되기 위해 훈련을 받았다)."
        ]
    },
    {
        "english": "Chemical",
        "definition": "A compound or substance that has been purified or prepared, especially artificially.<br><br>(특히 인공적으로 정제되거나 준비된 화합물이나 물질)",
        "pronunciation": "[ˈkɛmɪkəl]",
        "examples": [
            "This cleaner contains harsh chemicals (이 세정제에는 강한 화학물질이 들어 있다).",
            "They use chemical fertilizers on the crops (그들은 작물에 화학 비료를 사용한다)."
        ]
    },
    {
        "english": "Chemistry",
        "definition": "The branch of science that deals with the identification of the substances of which matter is composed; the investigation of their properties and the ways in which they interact, combine, and change.<br><br>(물질이 구성된 물질의 확인을 다루는 과학의 한 분야; 그들의 특성과 그들이 상호 작용, 결합 및 변화하는 방식의 조사)",
        "pronunciation": "[ˈkɛmɪstri]",
        "examples": [
            "She is studying chemistry at university (그녀는 대학에서 화학을 공부하고 있다).",
            "The chemistry between the lead actors contributed to the film's success (주연 배우들 사이의 화학적 조화가 영화의 성공에 기여했다)."
        ]
    },
    {
        "english": "Chew",
        "definition": "To bite and work (food) in the mouth with the teeth, especially to make it easier to swallow.<br><br>(특히 삼키기 쉽게 만들기 위해 입 안에서 이로 음식을 씹다)",
        "pronunciation": "[tʃuː]",
        "examples": [
            "Chew your food well before swallowing (음식을 삼키기 전에 잘 씹으세요).",
            "The dog chewed up my shoe (개가 내 신을 씹어 먹었다)."
        ]
    },
    {
        "english": "Chief",
        "definition": "A leader or ruler of a people or clan.<br><br>(사람이나 부족의 지도자 또는 통치자)",
        "pronunciation": "[tʃiːf]",
        "examples": [
            "The tribal chief led the negotiations (부족장이 협상을 이끌었다).",
            "She was appointed as the chief of the department (그녀는 부서의 수장으로 임명되었다)."
        ]
    },
    {
        "english": "Childhood",
        "definition": "The state or period of being a child.<br><br>(어린이로서의 상태나 기간)",
        "pronunciation": "[ˈtʃaɪldhʊd]",
        "examples": [
            "His childhood was spent in the countryside (그의 어린 시절은 시골에서 보냈다).",
            "She often talks about her happy childhood (그녀는 자주 자신의 행복했던 어린 시절에 대해 이야기한다)."
        ]
    },
    {
        "english": "Chimney",
        "definition": "A vertical channel or pipe which conducts smoke and combustion gases up from a fire or furnace and typically through the roof of a building.<br><br>(화재 또는 화덕에서 연기와 연소 가스를 위로 전달하고 일반적으로 건물의 지붕을 통과하는 수직 채널 또는 파이프)",
        "pronunciation": "[ˈtʃɪmni]",
        "examples": [
            "Smoke billowed from the chimney (연기가 굴뚝에서 피어올랐다).",
            "We need to clean the chimney before winter (겨울이 오기 전에 굴뚝을 청소해야 한다)."
        ]
    },
    {
        "english": "Choice",
        "definition": "An act of selecting or making a decision when faced with two or more possibilities.<br><br>(두 가지 이상의 가능성에 직면했을 때 선택하거나 결정하는 행위)",
        "pronunciation": "[tʃɔɪs]",
        "examples": [
            "He had no choice but to accept the offer (그는 제안을 받아들일 수밖에 없었다).",
            "The menu offered a wide choice of desserts (메뉴에는 다양한 디저트 선택이 제공되었다)."
        ]
    },
    {
        "english": "Choose",
        "definition": "To decide on a course of action, typically after rejecting alternatives.<br><br>(일반적으로 대안을 거부한 후 행동 과정을 결정하다)",
        "pronunciation": "[tʃuːz]",
        "examples": [
            "She chose to stay at the company (그녀는 회사에 남기로 선택했다).",
            "You can choose between chicken or fish (치킨 또는 생선 중에서 선택할 수 있다)."
        ]
    },
    {
        "english": "Circle",
        "definition": "A round plane figure whose boundary consists of points equidistant from a fixed point, the center.<br><br>(중심점으로부터 거리가 동일한 점들로 구성된 경계를 가진 둥근 평면 도형)",
        "pronunciation": "[ˈsɜːrkəl]",
        "examples": [
            "Draw a circle on the paper (종이에 원을 그리세요).",
            "They sat in a circle and shared their stories (그들은 원을 그리고 앉아 자신의 이야기를 나누었다)."
        ]
    },
    {
        "english": "Citizen",
        "definition": "A legally recognized subject or national of a state or commonwealth, either native or naturalized.<br><br>(태생적이거나 귀화한, 국가 또는 연방의 법적으로 인정된 주민 또는 국민)",
        "pronunciation": "[ˈsɪtɪzən]",
        "examples": [
            "Every citizen has the right to vote (모든 시민은 투표할 권리가 있다).",
            "She was a proud citizen of her country (그녀는 자국의 자랑스러운 시민이었다)."
        ]
    },
    {
        "english": "Claim",
        "definition": "To state or assert that something is the case, typically without providing evidence or proof.<br><br>(일반적으로 증거나 증명 없이 무언가가 사실이라고 주장하거나 단언하다)",
        "pronunciation": "[kleɪm]",
        "examples": [
            "He claimed that he was not at the scene of the crime (그는 범죄 현장에 없었다고 주장했다).",
            "The company claims that their product is the best on the market (회사는 그들의 제품이 시장에서 최고라고 주장한다)."
        ]
    },
    {
        "english": "Classical",
        "definition": "Relating to ancient Greek or Latin literature, art, or culture.<br><br>(고대 그리스 또는 라틴 문학, 예술 또는 문화와 관련된)",
        "pronunciation": "[ˈklæsɪkəl]",
        "examples": [
            "She studies classical music at the conservatory (그녀는 음악원에서 클래식 음악을 공부한다).",
            "Classical architecture is characterized by symmetry and balance (클래식 건축은 대칭과 균형이 특징이다)."
        ]
    },
    {
        "english": "Clean",
        "definition": "Free from dirt, marks, or stains.<br><br>(더러움, 자국, 또는 얼룩이 없는)",
        "pronunciation": "[kliːn]",
        "examples": [
            "The kitchen was clean and well organized (부엌은 깨끗하고 잘 정돈되어 있었다).",
            "He made sure his clothes were clean for the interview (그는 면접을 위해 옷이 깨끗한지 확인했다)."
        ]
    },
    {
        "english": "Clear",
        "definition": "Easy to perceive, understand, or interpret.<br><br>(인지, 이해 또는 해석하기 쉬운)",
        "pronunciation": "[klɪər]",
        "examples": [
            "The sky is clear tonight (오늘 밤 하늘은 맑다).",
            "She gave clear instructions (그녀는 명확한 지시를 제공했다)."
        ]
    },
    {
        "english": "Clerk",
        "definition": "A person employed in an office or bank to keep records, accounts, and undertake other routine administrative duties.<br><br>(기록, 계좌를 유지하고 기타 일상적인 행정 업무를 수행하는 사무실이나 은행에 고용된 사람)",
        "pronunciation": "[klɑːrk]",
        "examples": [
            "The clerk at the hotel checked us in (호텔의 점원이 우리를 체크인했다).",
            "She worked as a clerk before she became a lawyer (그녀는 변호사가 되기 전에 점원으로 일했다)."
        ]
    },
    {
        "english": "Clever",
        "definition": "Quick to understand, learn, and devise or apply ideas; intelligent.<br><br>(이해, 학습, 아이디어를 고안하거나 적용하는 데 빠르며 지능적인)",
        "pronunciation": "[ˈklɛvər]",
        "examples": [
            "He's clever with his hands (그는 손재주가 좋다).",
            "She found a clever solution to the problem (그녀는 문제에 대한 영리한 해결책을 찾았다)."
        ]
    },
    {
        "english": "Client",
        "definition": "A person or organization using the services of a lawyer or other professional person or company.<br><br>(변호사나 다른 전문 인력 또는 회사의 서비스를 이용하는 개인 또는 조직)",
        "pronunciation": "[ˈklaɪənt]",
        "examples": [
            "The lawyer advised her client against testifying (변호사는 그녀의 의뢰인에게 증언하지 말 것을 조언했다).",
            "Our agency has several major clients in the entertainment industry (우리 기관은 엔터테인먼트 산업에서 여러 주요 고객을 가지고 있다)."
        ]
    },
    {
        "english": "Climate",
        "definition": "The weather conditions prevailing in an area in general or over a long period.<br><br>(일반적으로 또는 장기간에 걸쳐 특정 지역에서 지배적인 기후 조건)",
        "pronunciation": "[ˈklaɪmɪt]",
        "examples": [
            "The climate in this region allows for a wide variety of crops (이 지역의 기후는 다양한 작물을 재배할 수 있게 한다).",
            "Climate change is a global concern (기후 변화는 전 세계적인 관심사이다)."
        ]
    },
    {
        "english": "Climb",
        "definition": "To go up, or to go towards the top of something.<br><br>(올라가거나 무언가의 꼭대기를 향해 가다)",
        "pronunciation": "[klaɪm]",
        "examples": [
            "We climbed the mountain in just over two hours (우리는 산을 두 시간 조금 넘게 올랐다).",
            "The children love to climb trees (아이들은 나무를 오르는 것을 좋아한다)."
        ]
    },
    {
        "english": "Close",
        "definition": "To move so as to cover an opening; shut.<br><br>(구멍을 막기 위해 움직이다; 닫다)",
        "pronunciation": "[kloʊz]",
        "examples": [
            "Please close the door behind you (뒤에 문을 닫아 주세요).",
            "The store closes at 8 p.m. (점포는 오후 8시에 문을 닫습니다)."
        ]
    },
    {
        "english": "Clothes",
        "definition": "Items worn to cover the body.<br><br>(몸을 덮기 위해 착용하는 아이템)",
        "pronunciation": "[kloʊðz]",
        "examples": [
            "She bought some new clothes for the trip (그녀는 여행을 위해 새 옷을 몇 벌 샀다).",
            "Hang your wet clothes on the line to dry (젖은 옷은 빨래줄에 걸어 말리세요)."
        ]
    },
    {
        "english": "Cloud",
        "definition": "A visible mass of condensed water vapor floating in the atmosphere, typically high above the ground.<br><br>(일반적으로 지상 고도에서 떠다니는 응축된 수증기의 가시적인 덩어리)",
        "pronunciation": "[klaʊd]",
        "examples": [
            "The sky was full of white fluffy clouds (하늘은 하얀 솜털 같은 구름으로 가득했다).",
            "Cloud computing is revolutionizing the IT industry (클라우드 컴퓨팅이 IT 산업을 혁신하고 있다)."
        ]
    },
    {
        "english": "Coal",
        "definition": "A combustible black or dark brown rock consisting mainly of carbonized plant matter, found mainly in underground deposits and widely used as fuel.<br><br>(주로 지하 매장층에서 발견되고 연료로 널리 사용되는 주로 탄화된 식물 물질로 구성된 가연성 검은색 또는 짙은 갈색 암석)",
        "pronunciation": "[koʊl]",
        "examples": [
            "Coal mining was a major industry in the area (탄광업은 그 지역의 주요 산업이었다).",
            "The power plant burns coal to produce electricity (발전소는 전기를 생산하기 위해 석탄을 태운다)."
        ]
    },
    {
        "english": "Coast",
        "definition": "The part of the land near the sea; the edge of the land.<br><br>(바다 근처의 땅 부분; 땅의 가장자리)",
        "pronunciation": "[koʊst]",
        "examples": [
            "They built a house right on the coast (그들은 해안 바로 옆에 집을 지었다).",
            "We drove along the coast for miles (우리는 수마일에 걸쳐 해안을 따라 운전했다)."
        ]
    },
    {
        "english": "Coin",
        "definition": "A flat, typically round piece of metal with an official stamp, used as money.<br><br>(공식적인 도장이 찍힌, 일반적으로 둥근 금속 조각으로 사용되는 돈)",
        "pronunciation": "[kɔɪn]",
        "examples": [
            "He pulled a coin from his pocket (그는 주머니에서 동전을 꺼냈다).",
            "The coin is worth more than its face value because of its rarity (그 동전은 희귀성 때문에 액면가보다 가치가 더 크다)."
        ]
    },
    {
        "english": "Cold",
        "definition": "Of or at a low or relatively low temperature, especially when compared with the human body.<br><br>(특히 인체와 비교했을 때 낮거나 상대적으로 낮은 온도의)",
        "pronunciation": "[koʊld]",
        "examples": [
            "I'm feeling cold, can you turn up the heat? (추운데, 히터 좀 틀어 줄래?)",
            "The water was too cold for swimming (수영하기에는 물이 너무 차가웠다)."
        ]
    },
    {
        "english": "Collect",
        "definition": "To bring together; gather.<br><br>(모으다; 모으다)",
        "pronunciation": "[kəˈlɛkt]",
        "examples": [
            "She collects stamps as a hobby (그녀는 취미로 우표를 수집한다).",
            "We need to collect more data for the research (연구를 위해 더 많은 데이터를 수집해야 한다)."
        ]
    },
    {
        "english": "Collection",
        "definition": "A group of things or people gathered or accumulated.<br><br>(모인 또는 축적된 물건이나 사람들의 그룹)",
        "pronunciation": "[kəˈlɛkʃən]",
        "examples": [
            "He has an impressive collection of books (그는 인상적인 책 컬렉션을 가지고 있다).",
            "The museum's collection includes artifacts from ancient Greece (박물관의 컬렉션에는 고대 그리스의 유물이 포함되어 있다)."
        ]
    },
    {
        "english": "College",
        "definition": "An educational institution or establishment, in particular one providing higher education or specialized professional or vocational training.<br><br>(특히 고등 교육 또는 전문적인 또는 직업적인 훈련을 제공하는 교육 기관 또는 설립)",
        "pronunciation": "[ˈkɑlɪdʒ]",
        "examples": [
            "She is going to college next year (그녀는 내년에 대학에 간다).",
            "He graduated from college with a degree in engineering (그는 공학 학위로 대학을 졸업했다)."
        ]
    },
    {
        "english": "Colorful",
        "definition": "Having much or varied color; bright.<br><br>(많거나 다양한 색상을 가진; 밝은)",
        "pronunciation": "[ˈkʌlərfʊl]",
        "examples": [
            "The festival is known for its colorful costumes (이 축제는 화려한 의상으로 유명하다).",
            "She painted a colorful mural on the wall (그녀는 벽에 화려한 벽화를 그렸다)."
        ]
    },
    {
        "english": "Combine",
        "definition": "To join or merge to form a single unit or substance.<br><br>(하나의 단위나 물질을 형성하기 위해 결합하거나 합병하다)",
        "pronunciation": "[kəmˈbaɪn]",
        "examples": [
            "Combine the flour and water to make a paste (반죽을 만들기 위해 밀가루와 물을 섞으세요).",
            "The two companies combined to increase their market share (두 회사는 시장 점유율을 높이기 위해 합병했다)."
        ]
    },
    {
        "english": "Comfort",
        "definition": "A state of physical ease and freedom from pain or constraint.<br><br>(육체적 편안함과 고통이나 제약으로부터의 자유)",
        "pronunciation": "[ˈkʌmfərt]",
        "examples": [
            "The chair is designed for comfort and durability (의자는 편안함과 내구성을 위해 설계되었다).",
            "He stayed home for the comfort of his own bed (그는 자신의 침대의 편안함을 위해 집에 머물렀다)."
        ]
    },
    {
        "english": "Comfortable",
        "definition": "Providing physical ease and relaxation.<br><br>(육체적인 안락함과 휴식을 제공하는)",
        "pronunciation": "[ˈkʌmfərtəbl]",
        "examples": [
            "The hotel room was spacious and comfortable (호텔 방은 넓고 편안했다).",
            "I need to buy comfortable shoes for walking (걷기 위해 편안한 신발을 사야 한다)."
        ]
    },
    {
        "english": "Comic",
        "definition": "A periodical publication containing comic strips, intended primarily for humor.<br><br>(주로 유머를 목적으로 하는 만화를 포함하는 정기 간행물)",
        "pronunciation": "[ˈkɑmɪk]",
        "examples": [
            "He collects comic books from the 1950s (그는 1950년대의 만화책을 수집한다).",
            "The comic strip in the newspaper always makes me laugh (신문의 만화는 항상 나를 웃게 한다)."
        ]
    },
    {
        "english": "Comment",
        "definition": "A verbal or written remark expressing an opinion or reaction.<br><br>(의견이나 반응을 표현하는 구두 또는 서면 발언)",
        "pronunciation": "[ˈkɑmɛnt]",
        "examples": [
            "She made a positive comment about the presentation (그녀는 발표에 대해 긍정적인 코멘트를 했다).",
            "Readers left comments below the article (독자들은 기사 아래에 댓글을 남겼다)."
        ]
    },
    {
        "english": "Commercial",
        "definition": "Concerned with or engaged in commerce.<br><br>(상업에 관련되거나 종사하는)",
        "pronunciation": "[kəˈmɜrʃəl]",
        "examples": [
            "The software is available for both personal and commercial use (이 소프트웨어는 개인 및 상업적 용도로 사용할 수 있다).",
            "The radio station airs too many commercials (그 라디오 방송국은 너무 많은 광고를 방송한다)."
        ]
    },
    {
        "english": "Commit",
        "definition": "To carry out or perpetrate (a mistake, crime, or immoral act).<br><br>(실수, 범죄 또는 부도덕한 행위를 저지르다)",
        "pronunciation": "[kəˈmɪt]",
        "examples": [
            "He committed the crime alone (그는 혼자 범죄를 저질렀다).",
            "She committed her life to helping others (그녀는 자신의 삶을 다른 사람을 돕는 데 헌신했다)."
        ]
    },
    {
        "english": "Common",
        "definition": "Occurring, found, or done often; prevalent.<br><br>(자주 발생하거나 발견되거나 행해지는; 널리 퍼져 있는)",
        "pronunciation": "[ˈkɑmən]",
        "examples": [
            "Colds are common in the winter (감기는 겨울에 흔하다).",
            "It's common practice in this field (이 분야에서는 일반적인 관행이다)."
        ]
    },
    {
        "english": "Communicate",
        "definition": "To share or exchange information, news, or ideas.<br><br>(정보, 뉴스 또는 아이디어를 공유하거나 교환하다)",
        "pronunciation": "[kəˈmjuːnɪkeɪt]",
        "examples": [
            "We communicate by email regularly (우리는 정기적으로 이메일로 소통한다).",
            "It's important to communicate clearly (명확하게 소통하는 것이 중요하다)."
        ]
    },
    {
        "english": "Communication",
        "definition": "The imparting or exchanging of information by speaking, writing, or using some other medium.<br><br>(말하기, 쓰기 또는 다른 매체를 사용하여 정보를 전달하거나 교환하는 것)",
        "pronunciation": "[kəˌmjuːnɪˈkeɪʃən]",
        "examples": [
            "Effective communication is key to success (효과적인 의사소통은 성공의 열쇠이다).",
            "There was a lack of communication between team members (팀원들 사이에 의사소통이 부족했다)."
        ]
    },
    {
        "english": "Community",
        "definition": "A group of people living in the same place or having a particular characteristic in common.<br><br>(같은 장소에 사는 사람들의 집단 또는 특정한 특성을 공유하는 사람들의 집단)",
        "pronunciation": "[kəˈmjuːnɪti]",
        "examples": [
            "The local community was involved in the project (지역 사회가 프로젝트에 참여했다).",
            "She feels a strong sense of community (그녀는 강한 공동체 의식을 느낀다)."
        ]
    },
    {
        "english": "Company",
        "definition": "A commercial business.<br><br>(상업적 사업)",
        "pronunciation": "[ˈkʌmpəni]",
        "examples": [
            "He works for a large software company (그는 대규모 소프트웨어 회사에서 일한다).",
            "The company is launching a new product (회사는 새 제품을 출시하고 있다)."
        ]
    },
    {
        "english": "Compare",
        "definition": "To estimate, measure, or note the similarity or dissimilarity between.<br><br>(유사성 또는 차이점을 추정, 측정 또는 주목하다)",
        "pronunciation": "[kəmˈpɛər]",
        "examples": [
            "Compare the two illustrations for differences (두 그림을 비교하여 차이점을 찾으세요).",
            "She compared the copy to the original (그녀는 사본과 원본을 비교했다)."
        ]
    },
    {
        "english": "Compete",
        "definition": "To strive to gain or win something by defeating or establishing superiority over others.<br><br>(다른 사람을 이기거나 우위를 확립하여 무언가를 얻거나 이기려고 애쓰다)",
        "pronunciation": "[kəmˈpiːt]",
        "examples": [
            "Athletes compete for the gold medal (운동선수들은 금메달을 위해 경쟁한다).",
            "Companies compete in the market to attract more customers (회사들은 더 많은 고객을 끌어들이기 위해 시장에서 경쟁한다)."
        ]
    },
    {
        "english": "Competition",
        "definition": "The activity or condition of competing.<br><br>(경쟁하는 활동 또는 상태)",
        "pronunciation": "[ˌkɒmpɪˈtɪʃən]",
        "examples": [
            "There is fierce competition between the two teams (두 팀 간의 치열한 경쟁이 있다).",
            "The competition for the job was intense (그 일자리를 두고 벌어진 경쟁은 격렬했다)."
        ]
    },
    {
        "english": "Complain",
        "definition": "To express dissatisfaction or annoyance about something.<br><br>(무언가에 대해 불만이나 짜증을 표현하다)",
        "pronunciation": "[kəmˈpleɪn]",
        "examples": [
            "She complained about the noise coming from upstairs (그녀는 위층에서 들려오는 소음에 대해 불평했다).",
            "Customers often complain if the service is slow (서비스가 느리면 고객들이 종종 불평한다)."
        ]
    },
    {
        "english": "Complaint",
        "definition": "A statement that something is unsatisfactory or unacceptable.<br><br>(무언가가 만족스럽지 않거나 받아들일 수 없다는 진술)",
        "pronunciation": "[kəmˈpleɪnt]",
        "examples": [
            "He filed a complaint with the company (그는 회사에 불만을 제기했다).",
            "The most common complaint is about poor service (가장 흔한 불만은 서비스가 나쁘다는 것이다)."
        ]
    },
    {
        "english": "Complete",
        "definition": "Having all the necessary or appropriate parts.<br><br>(필요하거나 적절한 모든 부분을 갖춘)",
        "pronunciation": "[kəmˈpliːt]",
        "examples": [
            "The book is complete and ready for publication (책은 출판을 위해 완성되었다).",
            "She completed the assignment on time (그녀는 과제를 기한 내에 완료했다)."
        ]
    },
    {
        "english": "Complain",
        "definition": "Express dissatisfaction or annoyance about something.<br><br>(무언가에 대해 불만이나 짜증을 표현하다)",
        "pronunciation": "[kəmˈpleɪn]",
        "examples": [
            "He complained about the noise (그는 소음에 대해 불평했다).",
            "Customers often complain if the service is slow (서비스가 느리면 고객들이 종종 불평한다)."
        ]
    },
    {
        "english": "Complaint",
        "definition": "A statement that something is unsatisfactory or unacceptable.<br><br>(무언가가 만족스럽지 못하거나 받아들일 수 없다는 진술)",
        "pronunciation": "[kəmˈpleɪnt]",
        "examples": [
            "The company has received several complaints this month (회사는 이번 달에 여러 건의 불만을 받았다).",
            "She filed a formal complaint against her employer (그녀는 고용주에 대해 정식 불만을 제기했다)."
        ]
    },
    {
        "english": "Complete",
        "definition": "Having all the necessary or appropriate parts.<br><br>(필요하거나 적절한 모든 부분을 갖추고 있는)",
        "pronunciation": "[kəmˈpliːt]",
        "examples": [
            "The puzzle is complete (퍼즐이 완성되었다).",
            "He completed the project on time (그는 프로젝트를 기한 내에 완료했다)."
        ]
    },
    {
        "english": "Completely",
        "definition": "Totally; utterly.<br><br>(완전히; 철저히)",
        "pronunciation": "[kəmˈpliːtli]",
        "examples": [
            "The room was completely dark (방은 완전히 어두웠다).",
            "I completely agree with you (나는 당신에게 전적으로 동의한다)."
        ]
    },
    {
        "english": "Complex",
        "definition": "Consisting of many different and connected parts.<br><br>(많은 다양하고 연결된 부분으로 구성된)",
        "pronunciation": "[ˈkɒmplɛks]",
        "examples": [
            "The human brain is a complex organ (인간의 뇌는 복잡한 기관이다).",
            "The situation became more complex when new facts emerged (새로운 사실이 밝혀지면서 상황은 더 복잡해졌다)."
        ]
    },
    {
        "english": "Complicated",
        "definition": "Consisting of many interconnecting parts or elements; intricate.<br><br>(많은 상호 연결된 부분이나 요소로 구성된; 복잡한)",
        "pronunciation": "[ˈkɒmplɪkeɪtɪd]",
        "examples": [
            "The instructions were too complicated for me to understand (지침이 너무 복잡해서 이해할 수 없었다).",
            "It's a complicated issue that requires careful consideration (그것은 신중한 고려가 필요한 복잡한 문제이다)."
        ]
    },
    {
        "english": "Compose",
        "definition": "Write or create (a work of art, especially music or poetry).<br><br>(예술 작품, 특히 음악이나 시를 쓰거나 창작하다)",
        "pronunciation": "[kəmˈpoʊz]",
        "examples": [
            "He composed a symphony (그는 교향곡을 작곡했다).",
            "She composed a letter to her friend (그녀는 친구에게 편지를 썼다)."
        ]
    },
    {
        "english": "Concentrate",
        "definition": "Focus all one's attention on a particular object or activity.<br><br>(특정 대상이나 활동에 모든 주의를 집중하다)",
        "pronunciation": "[ˈkɒnsəntreɪt]",
        "examples": [
            "I need to concentrate on my work (나는 내 일에 집중해야 한다).",
            "She couldn't concentrate because of the noise (그녀는 소음 때문에 집중할 수 없었다)."
        ]
    },
    {
        "english": "Concentration",
        "definition": "The action or power of focusing one's attention or mental effort.<br><br>(주의나 정신적 노력을 집중하는 행위 또는 능력)",
        "pronunciation": "[ˌkɒnsənˈtreɪʃən]",
        "examples": [
            "Her concentration was disturbed by the loud music (그녀의 집중력은 시끄러운 음악 때문에 방해받았다).",
            "This game requires a high level of concentration (이 게임은 높은 집중력을 요구한다)."
        ]
    },
    {
        "english": "Concern",
        "definition": "Relate to; be about.<br><br>(관계가 있다; ~에 관한 것이다)",
        "pronunciation": "[kənˈsɜrn]",
        "examples": [
            "The story concerns a young girl who is searching for her parents (이 이야기는 부모를 찾고 있는 어린 소녀에 관한 것이다).",
            "His main concern is his family's safety (그의 주된 관심사는 가족의 안전이다)."
        ]
    },
    {
        "english": "Conclude",
        "definition": "Bring (something) to an end.<br><br>(무언가를 끝내다)",
        "pronunciation": "[kənˈkluːd]",
        "examples": [
            "They concluded the meeting on a positive note (그들은 긍정적인 분위기에서 회의를 마쳤다).",
            "The study concluded that more research is needed (연구는 더 많은 연구가 필요하다고 결론지었다)."
        ]
    },
    {
        "english": "Condition",
        "definition": "The state of something with regard to its appearance, quality, or working order.<br><br>(외관, 품질 또는 작업 상태와 관련된 상태)",
        "pronunciation": "[kənˈdɪʃən]",
        "examples": [
            "The car is in excellent condition (그 차는 상태가 매우 좋다).",
            "He suffers from a heart condition (그는 심장 질환을 앓고 있다)."
        ]
    },
    {
        "english": "Conduct",
        "definition": "The manner in which a person behaves, especially on a particular occasion or in a particular context.<br><br>(특정한 경우나 맥락에서 사람이 행동하는 방식)",
        "pronunciation": "[kənˈdʌkt]",
        "examples": [
            "His conduct during the meeting was commendable (회의 중 그의 행동은 칭찬할 만했다).",
            "She was asked to conduct the interview (그녀는 인터뷰를 진행해 달라는 요청을 받았다)."
        ]
    },
    {
        "english": "Conductor",
        "definition": "A person who directs the performance of an orchestra or choir.<br><br>(오케스트라나 합창단의 공연을 지휘하는 사람)",
        "pronunciation": "[kənˈdʌktər]",
        "examples": [
            "The conductor raised his baton (지휘자는 그의 지휘봉을 들었다).",
            "She is the conductor of the city orchestra (그녀는 시립 오케스트라의 지휘자이다)."
        ]
    },
    {
        "english": "Confidence",
        "definition": "The feeling or belief that one can rely on someone or something; firm trust.<br><br>(누군가 또는 무언가를 신뢰할 수 있다는 느낌이나 믿음; 굳건한 신뢰)",
        "pronunciation": "[ˈkɒnfɪdəns]",
        "examples": [
            "She has confidence in her abilities (그녀는 자신의 능력을 신뢰한다).",
            "He spoke with confidence during the presentation (그는 발표 중에 자신 있게 말했다)."
        ]
    },
    {
        "english": "Confident",
        "definition": "Feeling or showing confidence in oneself; self-assured.<br><br>(자신에 대한 신뢰를 느끼거나 보여주는; 자신감 있는)",
        "pronunciation": "[ˈkɒnfɪdənt]",
        "examples": [
            "She felt confident about her exam (그녀는 시험에 대해 자신감을 느꼈다).",
            "He looked confident as he walked into the room (그는 방에 들어서며 자신 있어 보였다)."
        ]
    },
    {
        "english": "Conflict",
        "definition": "A serious disagreement or argument, typically a protracted one.<br><br>(심각한 의견 충돌 또는 논쟁, 보통 장기간에 걸친 것)",
        "pronunciation": "[ˈkɒnflɪkt]",
        "examples": [
            "The conflict between the two countries lasted for years (두 나라 간의 갈등은 몇 년간 지속되었다).",
            "There was a conflict of interest in the decision-making process (의사 결정 과정에서 이해 충돌이 있었다)."
        ]
    },
    {
        "english": "Confuse",
        "definition": "Make (someone) bewildered or perplexed.<br><br>(누군가를 당황하거나 혼란스럽게 만들다)",
        "pronunciation": "[kənˈfjuːz]",
        "examples": [
            "The instructions confused me (지침이 나를 혼란스럽게 만들었다).",
            "She often confuses the two words (그녀는 종종 두 단어를 혼동한다)."
        ]
    },
    {
        "english": "Congratulation",
        "definition": "An expression of praise for an achievement or good wishes on a special occasion.<br><br>(성취에 대한 칭찬 또는 특별한 행사에 대한 좋은 소망의 표현)",
        "pronunciation": "[kənˌɡrædʒəˈleɪʃən]",
        "examples": [
            "Congratulations on your promotion! (승진을 축하합니다!)",
            "She received many congratulations after the award ceremony (그녀는 시상식 후에 많은 축하를 받았다)."
        ]
    },
    {
        "english": "Connect",
        "definition": "Bring together or into contact so that a real or notional link is established.<br><br>(실제 또는 개념상의 연결이 이루어지도록 함께 모으거나 접촉하게 하다)",
        "pronunciation": "[kəˈnɛkt]",
        "examples": [
            "Please connect the cables to the back of the TV (TV 뒤쪽에 케이블을 연결해주세요).",
            "The bridge connects the island to the mainland (그 다리는 섬을 본토와 연결한다)."
        ]
    },
    {
        "english": "Conscious",
        "definition": "Aware of and responding to one's surroundings; awake.<br><br>(자신의 주변 환경을 인식하고 반응하는; 깨어 있는)",
        "pronunciation": "[ˈkɒnʃəs]",
        "examples": [
            "She was conscious during the entire operation (그녀는 수술 내내 의식이 있었다).",
            "He is conscious of the risks involved (그는 관련된 위험을 인식하고 있다)."
        ]
    },
    {
        "english": "Consider",
        "definition": "Think carefully about (something), typically before making a decision.<br><br>(보통 결정을 내리기 전에 신중하게 생각하다)",
        "pronunciation": "[kənˈsɪdər]",
        "examples": [
            "She considered all the options before making a decision (그녀는 결정을 내리기 전에 모든 옵션을 고려했다).",
            "Please consider my application for the job (내 직장 지원서를 고려해주세요)."
        ]
    },
    {
        "english": "Consist",
        "definition": "Be composed or made up of.<br><br>(구성되다, 이루어지다)",
        "pronunciation": "[kənˈsɪst]",
        "examples": [
            "The team consists of five members (팀은 다섯 명의 멤버로 구성되어 있다).",
            "His diet consists mainly of fruits and vegetables (그의 식단은 주로 과일과 채소로 구성되어 있다)."
        ]
    },
    {
        "english": "Construction",
        "definition": "The building of something, typically a large structure.<br><br>(보통 큰 구조물을 건설하는 것)",
        "pronunciation": "[kənˈstrʌkʃən]",
        "examples": [
            "The construction of the new bridge will start next year (새 다리 건설은 내년에 시작될 것이다).",
            "He works in the construction industry (그는 건설업에 종사한다)."
        ]
    },
    {
        "english": "Consumer",
        "definition": "A person who purchases goods and services for personal use.<br><br>(개인적 사용을 위해 상품과 서비스를 구매하는 사람)",
        "pronunciation": "[kənˈsjuːmər]",
        "examples": [
            "Consumers are looking for the best deals (소비자들은 최고의 거래를 찾고 있다).",
            "The company focuses on consumer satisfaction (그 회사는 소비자 만족에 중점을 둔다)."
        ]
    },
    {
        "english": "Contact",
        "definition": "The state or condition of physical touching.<br><br>(물리적 접촉 상태 또는 조건)",
        "pronunciation": "[ˈkɒntækt]",
        "examples": [
            "Please contact me if you have any questions (질문이 있으시면 저에게 연락주세요).",
            "They are in contact with their old friends (그들은 옛 친구들과 연락하고 있다)."
        ]
    },
    {
        "english": "Contain",
        "definition": "Have or hold (someone or something) within.<br><br>(누군가 또는 무언가를 안에 포함하거나 지니다)",
        "pronunciation": "[kənˈteɪn]",
        "examples": [
            "This box contains all my old letters (이 상자는 내 모든 옛 편지를 담고 있다).",
            "The book contains a lot of useful information (그 책은 많은 유용한 정보를 포함하고 있다)."
        ]
    },
    {
        "english": "Container",
        "definition": "An object that can be used to hold or transport something.<br><br>(무언가를 담거나 운반하는 데 사용할 수 있는 물체)",
        "pronunciation": "[kənˈteɪnər]",
        "examples": [
            "We need a container to store the rice (우리는 쌀을 저장할 용기가 필요하다).",
            "The container is full of water (용기는 물로 가득 차 있다)."
        ]
    },
    {
        "english": "Content",
        "definition": "The things that are held or included in something.<br><br>(어떤 것에 포함되거나 포함된 것들)",
        "pronunciation": "[ˈkɒntɛnt]",
        "examples": [
            "She is content with her life (그녀는 자신의 삶에 만족한다).",
            "The content of the book was very interesting (그 책의 내용은 매우 흥미로웠다)."
        ]
    },
    {
        "english": "Contest",
        "definition": "An event in which people compete for supremacy in a sport or other activity, or in a quality.<br><br>(사람들이 스포츠나 다른 활동, 또는 품질에서 우위를 다투는 행사)",
        "pronunciation": "[ˈkɒntɛst]",
        "examples": [
            "She won the baking contest (그녀는 제빵 대회에서 우승했다).",
            "There was a heated contest between the two rivals (두 경쟁자 간에 치열한 경쟁이 있었다)."
        ]
    },
    {
        "english": "Continent",
        "definition": "Any of the world's main continuous expanses of land (Africa, Antarctica, Asia, Australia, Europe, North America, South America).<br><br>(세계의 주요 연속된 대지(아프리카, 남극 대륙, 아시아, 오스트레일리아, 유럽, 북아메리카, 남아메리카) 중 하나)",
        "pronunciation": "[ˈkɒntɪnənt]",
        "examples": [
            "Africa is the second largest continent (아프리카는 두 번째로 큰 대륙이다).",
            "They traveled across the European continent (그들은 유럽 대륙을 가로질러 여행했다)."
        ]
    },
    {
        "english": "Continue",
        "definition": "Persist in an activity or process.<br><br>(활동이나 과정을 지속하다)",
        "pronunciation": "[kənˈtɪnjuː]",
        "examples": [
            "She decided to continue her education (그녀는 교육을 계속하기로 결정했다).",
            "The rain continued for hours (비가 몇 시간 동안 계속 내렸다)."
        ]
    },
    {
        "english": "Contrast",
        "definition": "The state of being strikingly different from something else in juxtaposition or close association.<br><br>(나란히 있거나 밀접하게 연관된 다른 것과 현저히 다른 상태)",
        "pronunciation": "[ˈkɒntræst]",
        "examples": [
            "The contrast between the two paintings is remarkable (두 그림의 대비가 두드러진다).",
            "She contrasted the new plan with the old one (그녀는 새 계획과 옛 계획을 대조했다)."
        ]
    },
    {
        "english": "Contribute",
        "definition": "Give (something, especially money) in order to help achieve or provide something.<br><br>(무언가를 달성하거나 제공하는 것을 돕기 위해 (특히 돈을) 주다)",
        "pronunciation": "[kənˈtrɪbjuːt]",
        "examples": [
            "She contributed $100 to the charity (그녀는 자선 단체에 100달러를 기부했다).",
            "Everyone is expected to contribute to the project (모두가 프로젝트에 기여할 것으로 기대된다)."
        ]
    },
    {
        "english": "Control",
        "definition": "The power to influence or direct people's behavior or the course of events.<br><br>(사람들의 행동이나 사건의 진행을 영향을 미치거나 지시할 수 있는 힘)",
        "pronunciation": "[kənˈtrəʊl]",
        "examples": [
            "She lost control of the car (그녀는 차의 제어를 잃었다).",
            "He has control over the budget (그는 예산을 통제한다)."
        ]
    },
    {
        "english": "Convenience",
        "definition": "The state of being able to proceed with something with little effort or difficulty.<br><br>(노력이나 어려움 없이 무언가를 진행할 수 있는 상태)",
        "pronunciation": "[kənˈviːniəns]",
        "examples": [
            "The convenience of online shopping is undeniable (온라인 쇼핑의 편리함은 부인할 수 없다).",
            "The hotel provides many conveniences for its guests (호텔은 손님들에게 많은 편의를 제공한다)."
        ]
    },
    {
        "english": "Convenient",
        "definition": "Fitting in well with a person's needs, activities, and plans.<br><br>(사람의 필요, 활동 및 계획에 잘 맞는)",
        "pronunciation": "[kənˈviːniənt]",
        "examples": [
            "The store's location is very convenient (그 가게의 위치는 매우 편리하다).",
            "She found a convenient time for the meeting (그녀는 회의에 편리한 시간을 찾았다)."
        ]
    },
    {
        "english": "Conversation",
        "definition": "A talk, especially an informal one, between two or more people, in which news and ideas are exchanged.<br><br>(두 명 이상의 사람들이 뉴스와 아이디어를 교환하는, 특히 비공식적인 대화)",
        "pronunciation": "[ˌkɒnvəˈseɪʃən]",
        "examples": [
            "We had a long conversation about our plans (우리는 우리의 계획에 대해 긴 대화를 나누었다).",
            "She struck up a conversation with the stranger (그녀는 낯선 사람과 대화를 시작했다)."
        ]
    },
    {
        "english": "Convert",
        "definition": "Change (something) into a different form or properties.<br><br>(무언가를 다른 형태나 속성으로 바꾸다)",
        "pronunciation": "[kənˈvɜːt]",
        "examples": [
            "They converted the spare room into an office (그들은 여분의 방을 사무실로 개조했다).",
            "She converted to a new religion (그녀는 새로운 종교로 개종했다)."
        ]
    },
    {
        "english": "Cook",
        "definition": "Prepare (food, a dish, or a meal) by combining and heating the ingredients in various ways.<br><br>(재료를 다양한 방식으로 결합하고 가열하여 음식을 준비하다)",
        "pronunciation": "[kʊk]",
        "examples": [
            "She loves to cook Italian food (그녀는 이탈리아 음식을 요리하는 것을 좋아한다).",
            "He cooked a delicious dinner for his friends (그는 친구들을 위해 맛있는 저녁을 요리했다)."
        ]
    },
    {
        "english": "Cool",
        "definition": "Of or at a fairly low temperature.<br><br>(상당히 낮은 온도의)",
        "pronunciation": "[kuːl]",
        "examples": [
            "The weather is cool today (오늘 날씨가 시원하다).",
            "Let the soup cool before serving (서빙하기 전에 수프를 식히세요)."
        ]
    },
    {
        "english": "Cooperate",
        "definition": "Act jointly; work toward the same end.<br><br>(공동으로 행동하다; 같은 목표를 향해 일하다)",
        "pronunciation": "[koʊˈɒpəˌreɪt]",
        "examples": [
            "The two companies decided to cooperate on the project (두 회사는 프로젝트에 협력하기로 결정했다).",
            "She agreed to cooperate with the investigation (그녀는 조사에 협력하기로 동의했다)."
        ]
    },
    {
        "english": "Cooperation",
        "definition": "The process of working together to the same end.<br><br>(같은 목표를 위해 함께 일하는 과정)",
        "pronunciation": "[koʊˌɒpəˈreɪʃən]",
        "examples": [
            "The success of the project depends on cooperation (프로젝트의 성공은 협력에 달려 있다).",
            "They expressed their willingness to increase cooperation (그들은 협력을 강화할 의사를 표명했다)."
        ]
    },
    {
        "english": "Correct",
        "definition": "Free from error; in accordance with fact or truth.<br><br>(오류가 없는; 사실 또는 진실에 부합하는)",
        "pronunciation": "[kəˈrɛkt]",
        "examples": [
            "Please correct me if I'm wrong (제가 틀리면 수정해 주세요).",
            "She gave the correct answer to the question (그녀는 질문에 대한 정답을 제시했다)."
        ]
    },
    {
        "english": "Cost",
        "definition": "An amount that has to be paid or spent to buy or obtain something.<br><br>(무언가를 사거나 얻기 위해 지불하거나 소비해야 하는 금액)",
        "pronunciation": "[kɔst]",
        "examples": [
            "The cost of living has increased (생활비가 증가했다).",
            "How much does this shirt cost? (이 셔츠는 얼마입니까?)"
        ]
    },
    {
        "english": "Cough",
        "definition": "Expel air from the lungs with a sudden sharp sound.<br><br>(갑작스럽고 날카로운 소리와 함께 폐에서 공기를 배출하다)",
        "pronunciation": "[kɔf]",
        "examples": [
            "She has a bad cough (그녀는 심한 기침을 하고 있다).",
            "He coughed loudly to get their attention (그는 그들의 주의를 끌기 위해 크게 기침했다)."
        ]
    },
    {
        "english": "Counselor",
        "definition": "A person trained to give guidance on personal, social, or psychological problems.<br><br>(개인적, 사회적, 심리적 문제에 대한 지도를 제공하도록 훈련된 사람)",
        "pronunciation": "[ˈkaʊnsələr]",
        "examples": [
            "She spoke to her school counselor (그녀는 학교 상담사와 이야기를 나눴다).",
            "They sought help from a marriage counselor (그들은 결혼 상담사의 도움을 구했다)."
        ]
    },
    {
        "english": "Count",
        "definition": "Determine the total number of (a collection of items).<br><br>(아이템 모음의 총 수를 결정하다)",
        "pronunciation": "[kaʊnt]",
        "examples": [
            "She counted the money (그녀는 돈을 세었다).",
            "He can count to ten in five languages (그는 다섯 개 언어로 열까지 셀 수 있다)."
        ]
    },
    {
        "english": "Country",
        "definition": "A nation with its own government, occupying a particular territory.<br><br>(자신의 정부를 가진 국가, 특정 영토를 차지하는)",
        "pronunciation": "[ˈkʌntri]",
        "examples": [
            "France is a beautiful country (프랑스는 아름다운 나라이다).",
            "He traveled across the country (그는 나라를 가로질러 여행했다)."
        ]
    },
    {
        "english": "Countryside",
        "definition": "The land and scenery of a rural area.<br><br>(농촌 지역의 땅과 경치)",
        "pronunciation": "[ˈkʌntrisaɪd]",
        "examples": [
            "They live in the countryside (그들은 시골에 산다).",
            "The countryside is peaceful and quiet (시골은 평화롭고 조용하다)."
        ]
    },
    {
        "english": "Couple",
        "definition": "Two individuals of the same sort considered together.<br><br>(같은 종류의 두 개인을 함께 고려하다)",
        "pronunciation": "[ˈkʌpəl]",
        "examples": [
            "The couple got married last year (그 커플은 작년에 결혼했다).",
            "I need a couple of minutes to finish this (나는 이것을 끝내는 데 몇 분이 필요하다)."
        ]
    },
    {
        "english": "Courage",
        "definition": "The ability to do something that frightens one; bravery.<br><br>(자신을 겁나게 하는 일을 할 수 있는 능력; 용기)",
        "pronunciation": "[ˈkʌrɪdʒ]",
        "examples": [
            "She showed great courage during the fire (그녀는 화재 중에 큰 용기를 보였다).",
            "It takes courage to speak out against injustice (불의에 맞서 발언하는 데는 용기가 필요하다)."
        ]
    },
    {
        "english": "Course",
        "definition": "The route or direction followed by a ship, aircraft, road, or river.<br><br>(배, 항공기, 도로, 강이 따라가는 경로 또는 방향)",
        "pronunciation": "[kɔrs]",
        "examples": [
            "The plane changed its course (비행기는 경로를 변경했다).",
            "She took a course in French (그녀는 프랑스어 강좌를 수강했다)."
        ]
    },
    {
        "english": "Court",
        "definition": "A tribunal presided over by a judge, judges, or a magistrate in civil and criminal cases.<br><br>(민사 및 형사 사건에서 판사 또는 재판관이 주재하는 법정)",
        "pronunciation": "[kɔrt]",
        "examples": [
            "The court ruled in his favor (법원은 그의 편을 들었다).",
            "She is a respected figure in the court (그녀는 법원에서 존경받는 인물이다)."
        ]
    },
    {
        "english": "Cover",
        "definition": "Put something such as a cloth or lid on top of or in front of (something) in order to protect or conceal it.<br><br>(보호하거나 숨기기 위해 천이나 뚜껑과 같은 것을 위나 앞에 놓다)",
        "pronunciation": "[ˈkʌvər]",
        "examples": [
            "She covered the table with a cloth (그녀는 테이블을 천으로 덮었다).",
            "The insurance will cover the cost of the repairs (보험이 수리 비용을 부담할 것이다)."
        ]
    },
    {
        "english": "Crash",
        "definition": "Collide violently with an obstacle or another vehicle.<br><br>(장애물이나 다른 차량과 격렬하게 충돌하다)",
        "pronunciation": "[kræʃ]",
        "examples": [
            "The car crashed into the tree (차가 나무에 충돌했다).",
            "He heard a loud crash (그는 큰 충돌 소리를 들었다)."
        ]
    },
    {
        "english": "Crazy",
        "definition": "Mentally deranged, especially as manifested in a wild or aggressive way.<br><br>(정신이 나간, 특히 야생적이거나 공격적인 방식으로 나타나는)",
        "pronunciation": "[ˈkreɪzi]",
        "examples": [
            "That's a crazy idea (그것은 미친 생각이다).",
            "He went crazy when he heard the news (그는 그 소식을 듣고 미쳐 버렸다)."
        ]
    },
    {
        "english": "Create",
        "definition": "Bring (something) into existence.<br><br>(무언가를 존재하게 하다)",
        "pronunciation": "[kriˈeɪt]",
        "examples": [
            "She created a beautiful painting (그녀는 아름다운 그림을 그렸다).",
            "The new law will create many jobs (새 법은 많은 일자리를 창출할 것이다)."
        ]
    },
    {
        "english": "Creative",
        "definition": "Relating to or involving the use of the imagination or original ideas to create something.<br><br>(상상력이나 독창적인 아이디어를 사용하여 무언가를 창조하는 것과 관련된 또는 포함하는)",
        "pronunciation": "[kriˈeɪtɪv]",
        "examples": [
            "She has a creative mind (그녀는 창의적인 사고를 가지고 있다).",
            "The team came up with a creative solution (팀은 창의적인 해결책을 생각해냈다)."
        ]
    },
    {
        "english": "Creature",
        "definition": "An animal, as distinct from a human being.<br><br>(인간과 구별되는 동물)",
        "pronunciation": "[ˈkriːtʃər]",
        "examples": [
            "The forest is home to many wild creatures (숲은 많은 야생 동물의 집이다).",
            "They saw a strange creature in the water (그들은 물에서 이상한 생물을 보았다)."
        ]
    },
    {
        "english": "Credit",
        "definition": "The ability of a customer to obtain goods or services before payment, based on the trust that payment will be made in the future.<br><br>(고객이 미래에 지불이 이루어질 것이라는 신뢰를 바탕으로 지불 전에 상품이나 서비스를 얻을 수 있는 능력)",
        "pronunciation": "[ˈkrɛdɪt]",
        "examples": [
            "She has a good credit rating (그녀는 신용 등급이 좋다).",
            "He paid for the car on credit (그는 차를 신용으로 샀다)."
        ]
    },
    {
        "english": "Crime",
        "definition": "An action or omission that constitutes an offense that may be prosecuted by the state and is punishable by law.<br><br>(국가에 의해 기소될 수 있고 법에 의해 처벌될 수 있는 범죄를 구성하는 행위 또는 태만)",
        "pronunciation": "[kraɪm]",
        "examples": [
            "He was arrested for a crime he didn't commit (그는 저지르지 않은 범죄로 체포되었다).",
            "Crime rates have been increasing (범죄율이 증가하고 있다)."
        ]
    },
    {
        "english": "Crisis",
        "definition": "A time of intense difficulty, trouble, or danger.<br><br>(강렬한 어려움, 문제 또는 위험의 시기)",
        "pronunciation": "[ˈkraɪsɪs]",
        "examples": [
            "The country is facing an economic crisis (그 나라는 경제 위기에 직면해 있다).",
            "They handled the crisis well (그들은 위기를 잘 처리했다)."
        ]
    },
    {
        "english": "Criticize",
        "definition": "Indicate the faults of (someone or something) in a disapproving way.<br><br>(비판적인 방식으로 누군가 또는 무언가의 결점을 지적하다)",
        "pronunciation": "[ˈkrɪtɪˌsaɪz]",
        "examples": [
            "She criticized the government's policies (그녀는 정부의 정책을 비판했다).",
            "He was criticized for his poor performance (그는 그의 부진한 성과로 비판받았다)."
        ]
    },
    {
        "english": "Crop",
        "definition": "A cultivated plant that is grown as food, especially a grain, fruit, or vegetable.<br><br>(음식으로 재배되는 식물, 특히 곡물, 과일 또는 채소)",
        "pronunciation": "[krɒp]",
        "examples": [
            "The main crops grown here are rice and wheat (이곳에서 주로 재배되는 작물은 쌀과 밀이다).",
            "The farmer harvested his crops (농부는 그의 작물을 수확했다)."
        ]
    },
    {
        "english": "Cross",
        "definition": "A mark, object, or figure formed by two short intersecting lines or pieces (+ or ×).<br><br>(두 개의 짧은 교차선이나 조각으로 형성된 표시, 물체 또는 도형)",
        "pronunciation": "[krɒs]",
        "examples": [
            "She drew a cross on the map to mark the spot (그녀는 지점 표시를 위해 지도에 십자가를 그렸다).",
            "He walked across the street (그는 길을 건너갔다)."
        ]
    },
    {
        "english": "Crosswalk",
        "definition": "A marked part of a road where pedestrians have right of way to cross.<br><br>(보행자가 건널 권리가 있는 도로의 표시된 부분)",
        "pronunciation": "[ˈkrɒswɔːk]",
        "examples": [
            "Always use the crosswalk when crossing the street (길을 건널 때는 항상 횡단보도를 이용하세요).",
            "The crosswalk is painted in white stripes (횡단보도는 흰색 줄무늬로 칠해져 있다)."
        ]
    },
    {
        "english": "Crowd",
        "definition": "A large number of people gathered together, typically in a disorganized or unruly way.<br><br>(보통 무질서하거나 통제되지 않은 방식으로 모인 많은 사람들)",
        "pronunciation": "[kraʊd]",
        "examples": [
            "A large crowd gathered to watch the concert (많은 사람들이 콘서트를 보기 위해 모였다).",
            "The streets were crowded with people (거리는 사람들로 붐볐다)."
        ]
    },
    {
        "english": "Cruel",
        "definition": "Willfully causing pain or suffering to others, or feeling no concern about it.<br><br>(고의적으로 다른 사람들에게 고통이나 고통을 초래하거나 그것에 대해 전혀 걱정하지 않는)",
        "pronunciation": "[ˈkruːəl]",
        "examples": [
            "He was known for his cruel treatment of animals (그는 동물을 잔인하게 대하는 것으로 알려져 있었다).",
            "She made a cruel remark (그녀는 잔인한 발언을 했다)."
        ]
    },
    {
        "english": "Cultural",
        "definition": "Relating to the ideas, customs, and social behavior of a society.<br><br>(사회의 사상, 관습 및 사회적 행동과 관련된)",
        "pronunciation": "[ˈkʌltʃərəl]",
        "examples": [
            "The festival is a cultural event (그 축제는 문화 행사이다).",
            "They are studying the cultural heritage of the region (그들은 그 지역의 문화 유산을 연구하고 있다)."
        ]
    },
    {
        "english": "Culture",
        "definition": "The arts and other manifestations of human intellectual achievement regarded collectively.<br><br>(예술 및 인간 지적 성취의 다른 표현을 집합적으로 고려한 것)",
        "pronunciation": "[ˈkʌltʃər]",
        "examples": [
            "Japanese culture is known for its unique traditions (일본 문화는 독특한 전통으로 유명하다).",
            "The museum showcases the culture of ancient Greece (박물관은 고대 그리스 문화를 전시한다)."
        ]
    },
    {
        "english": "Cure",
        "definition": "Relieve (a person or animal) of the symptoms of a disease or condition.<br><br>(사람이나 동물의 질병이나 상태의 증상을 완화하다)",
        "pronunciation": "[kjʊər]",
        "examples": [
            "The doctor was able to cure him of his illness (의사는 그의 병을 고칠 수 있었다).",
            "They are looking for a cure for cancer (그들은 암 치료제를 찾고 있다)."
        ]
    },
    {
        "english": "Curiosity",
        "definition": "A strong desire to know or learn something.<br><br>(무언가를 알고 배우고자 하는 강한 욕구)",
        "pronunciation": "[ˌkjʊəriˈɒsɪti]",
        "examples": [
            "Her curiosity led her to explore the old house (그녀의 호기심은 그녀를 오래된 집을 탐험하게 했다).",
            "Curiosity is a key trait of a good scientist (호기심은 좋은 과학자의 중요한 특성이다)."
        ]
    },
    {
        "english": "Curious",
        "definition": "Eager to know or learn something.<br><br>(무언가를 알고 배우고자 하는 열망)",
        "pronunciation": "[ˈkjʊərɪəs]",
        "examples": [
            "The children were curious about the new teacher (아이들은 새 선생님에 대해 궁금해 했다).",
            "I'm curious to know more about this topic (나는 이 주제에 대해 더 알고 싶다)."
        ]
    },
    {
        "english": "Curly",
        "definition": "Made, growing, or arranged in curls or curves.<br><br>(컬이나 곡선으로 만들어지거나 자라거나 배열된)",
        "pronunciation": "[ˈkɜːrli]",
        "examples": [
            "She has curly hair (그녀는 곱슬머리를 가지고 있다).",
            "The ribbon was tied in a curly bow (리본은 곱슬곱슬한 리본으로 묶여 있었다)."
        ]
    },
    {
        "english": "Curve",
        "definition": "A smoothly flowing, continuous line or surface that differs from a straight line in any way.<br><br>(어떤 식으로든 직선과 다른 부드럽게 흐르는 연속적인 선이나 표면)",
        "pronunciation": "[kɜːrv]",
        "examples": [
            "The road curves around the mountain (도로는 산을 따라 곡선을 이룬다).",
            "She drew a curve on the graph (그녀는 그래프에 곡선을 그렸다)."
        ]
    },
    {
        "english": "Custom",
        "definition": "A traditional and widely accepted way of behaving or doing something that is specific to a particular society, place, or time.<br><br>(특정 사회, 장소 또는 시간에 특정한 전통적이고 널리 받아들여진 행동 방식이나 무언가를 하는 방식)",
        "pronunciation": "[ˈkʌstəm]",
        "examples": [
            "It is a custom to give gifts during the holidays (휴일 동안 선물을 주는 것은 관습이다).",
            "The custom of shaking hands is common in many countries (악수를 하는 관습은 많은 나라에서 일반적이다)."
        ]
    },
    {
        "english": "Customer",
        "definition": "A person or organization that buys goods or services from a store or business.<br><br>(가게나 사업체에서 상품이나 서비스를 구매하는 사람이나 조직)",
        "pronunciation": "[ˈkʌstəmər]",
        "examples": [
            "The customer is always right (고객은 항상 옳다).",
            "We have many loyal customers (우리는 많은 충성 고객을 가지고 있다)."
        ]
    },
];


let currentWordIndex = 0;
let autoPlayInterval;
let currentAudioSource = null;
let isStopped = false;

document.addEventListener('DOMContentLoaded', function() {
    const exampleList = document.getElementById('example-list');
    
    
    function updateWord() {
        const word = words[currentWordIndex];
        document.getElementById('word-english').innerText = word.english;
        document.getElementById('word-definition').innerHTML = word.definition; // Use innerHTML to keep the <br> tags
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
        const { english, definition, examples } = word;
    
        async function speak() {
            if (count < times && !isStopped) {
                if (currentAudioSource) {
                    currentAudioSource.stop();
                }
                const englishAudio = await fetchAudio(english, 'en-GB');
                if (!englishAudio) {
                    console.error('Failed to fetch English audio URL');
                    return;
                }
                currentAudioSource = englishAudio;
                englishAudio.onended = async () => {
                    if (isStopped) return;
                    const definitionText = definition.split('<br>')[0]; // 한국어 번역 부분을 제외한 정의 부분만 가져오기
                    const definitionAudio = await fetchAudio(definitionText, 'en-GB');
                    if (!definitionAudio) {
                        console.error('Failed to fetch Definition audio URL');
                        return;
                    }
                    currentAudioSource = definitionAudio;
                    definitionAudio.onended = async () => {
                        if (isStopped) return;
                        let exampleIndex = 0;
                        async function speakExample() {
                            if (exampleIndex < examples.length && !isStopped) {
                                if (currentAudioSource) {
                                    currentAudioSource.stop();
                                }
                                const englishExample = examples[exampleIndex].split(' (')[0];
                                const exampleAudio = await fetchAudio(englishExample, 'en-GB');
                                if (!exampleAudio) {
                                    console.error('Failed to fetch Example audio URL');
                                    return;
                                }
                                currentAudioSource = exampleAudio;
                                exampleAudio.onended = () => {
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
                                exampleAudio.start();
                            }
                        }
                        setTimeout(speakExample, 2000); // 정의와 첫 번째 예문 사이에 2초 지연
                    };
                    definitionAudio.start();
                };
                englishAudio.start();
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

    // Display the list of words in the #words-list div
    const wordsListContainer = document.getElementById('words-list');
    words.forEach(word => {
        const wordItem = document.createElement('p');
        wordItem.textContent = word.english;
        wordsListContainer.appendChild(wordItem);
    });
});