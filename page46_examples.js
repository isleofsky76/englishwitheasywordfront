const words = [
    {
        korean: "자전거",
        english: "Bicycle",
        pronunciation: "[ˈbaɪsɪkəl]",
        examples: [
            "I ride my bicycle to school every day.",
            "She bought a new bicycle last week.",
            "He loves to explore the city on his bicycle."
        ]
    },
    {
        korean: "큰",
        english: "Big",
        pronunciation: "[bɪɡ]",
        examples: [
            "They live in a big house.",
            "I saw a big dog in the park.",
            "The city has a big population."
        ]
    },
    {
        korean: "새",
        english: "Bird",
        pronunciation: "[bɜrd]",
        examples: [
            "I saw a beautiful bird in the garden.",
            "Birds are singing in the morning.",
            "He has a pet bird named Tweety."
        ]
    },
    {
        korean: "생일",
        english: "Birthday",
        pronunciation: "[ˈbɜrθˌdeɪ]",
        examples: [
            "Today is my birthday!",
            "She received many gifts on her birthday.",
            "They celebrated his birthday with a big party."
        ]
    },
    {
        korean: "검정색",
        english: "Black",
        pronunciation: "[blæk]",
        examples: [
            "She wears a black dress.",
            "He drives a black car.",
            "The night sky is black."
        ]
    },
    {
        korean: "판자",
        english: "Board",
        pronunciation: "[bɔrd]",
        examples: [
            "He nailed the board to the wall.",
            "We need a new board for this project.",
            "She wrote the instructions on the board."
        ]
    },
    {
        korean: "배",
        english: "Boat",
        pronunciation: "[boʊt]",
        examples: [
            "They went fishing on a boat.",
            "The boat is sailing across the lake.",
            "He bought a new boat last summer."
        ]
    },
    {
        korean: "몸",
        english: "Body",
        pronunciation: "[ˈbɑdi]",
        examples: [
            "Exercise is good for the body.",
            "He has a strong body.",
            "She took care of her body by eating healthy."
        ]
    },
    {
        korean: "책",
        english: "Book",
        pronunciation: "[bʊk]",
        examples: [
            "I read a book every night.",
            "She borrowed a book from the library.",
            "He wrote a book about his travels."
        ]
    },
    {
        korean: "병",
        english: "Bottle",
        pronunciation: "[ˈbɑtəl]",
        examples: [
            "She drank a bottle of water.",
            "He found an old bottle on the beach.",
            "They recycled the empty bottles."
        ]
    },
    {
        korean: "사발",
        english: "Bowl",
        pronunciation: "[boʊl]",
        examples: [
            "He ate a bowl of cereal for breakfast.",
            "She bought a new bowl at the store.",
            "They served the soup in a large bowl."
        ]
    },
    {
        korean: "상자",
        english: "Box",
        pronunciation: "[bɑks]",
        examples: [
            "The gift was in a beautiful box.",
            "He stored his toys in a box.",
            "She opened the box to find a surprise."
        ]
    },
    {
        korean: "소년",
        english: "Boy",
        pronunciation: "[bɔɪ]",
        examples: [
            "The boy played in the park.",
            "She saw a boy riding a bicycle.",
            "He is a smart boy."
        ]
    },
    {
        korean: "빵",
        english: "Bread",
        pronunciation: "[brɛd]",
        examples: [
            "She baked fresh bread this morning.",
            "He likes to eat bread with butter.",
            "They bought a loaf of bread at the bakery."
        ]
    },
    {
        korean: "깨뜨리다",
        english: "Break",
        pronunciation: "[breɪk]",
        examples: [
            "Be careful not to break the glass.",
            "He had to break the bad news to her.",
            "She took a break from her work."
        ]
    },
    {
        korean: "아침",
        english: "Breakfast",
        pronunciation: "[ˈbrɛkfəst]",
        examples: [
            "He made pancakes for breakfast.",
            "She never skips breakfast.",
            "They had breakfast at a nearby cafe."
        ]
    },
    {
        korean: "다리",
        english: "Bridge",
        pronunciation: "[brɪdʒ]",
        examples: [
            "They crossed the bridge to get to the other side.",
            "The old bridge was repaired last year.",
            "She took a photo of the beautiful bridge."
        ]
    },
    {
        korean: "밝은",
        english: "Bright",
        pronunciation: "[braɪt]",
        examples: [
            "The sun is very bright today.",
            "She has a bright smile.",
            "He wore a bright yellow shirt."
        ]
    },
    {
        korean: "가져오다",
        english: "Bring",
        pronunciation: "[brɪŋ]",
        examples: [
            "Can you bring me a glass of water?",
            "She brought her friend to the party.",
            "He forgot to bring his homework."
        ]
    },
    {
        korean: "형제",
        english: "Brother",
        pronunciation: "[ˈbrʌðər]",
        examples: [
            "She has an older brother.",
            "They played soccer with their brother.",
            "His brother is in college."
        ]
    },
    {
        korean: "갈색",
        english: "Brown",
        pronunciation: "[braʊn]",
        examples: [
            "She has brown hair.",
            "He wore a brown jacket.",
            "The leaves turned brown in the fall."
        ]
    },
    {
        korean: "솔",
        english: "Brush",
        pronunciation: "[brʌʃ]",
        examples: [
            "She used a brush to paint the wall.",
            "He brushed his teeth before bed.",
            "They bought a new hair brush."
        ]
    },
    {
        korean: "건설하다",
        english: "Build",
        pronunciation: "[bɪld]",
        examples: [
            "They plan to build a new house.",
            "He helped build the school.",
            "She wants to build a career in medicine."
        ]
    },
    {
        korean: "불타다",
        english: "Burn",
        pronunciation: "[bɜrn]",
        examples: [
            "Be careful not to burn yourself.",
            "The fire continued to burn throughout the night.",
            "He burned the old letters."
        ]
    },
    {
        korean: "버스",
        english: "Bus",
        pronunciation: "[bʌs]",
        examples: [
            "She takes the bus to work every day.",
            "They waited for the bus at the stop.",
            "He missed the last bus."
        ]
    },
    {
        korean: "바쁜",
        english: "Busy",
        pronunciation: "[ˈbɪzi]",
        examples: [
            "She is always busy with work.",
            "He had a busy day at school.",
            "They are busy preparing for the event."
        ]
    },
    {
        korean: "그러나",
        english: "But",
        pronunciation: "[bʌt]",
        examples: [
            "I wanted to go, but I was too tired.",
            "She likes coffee but not tea.",
            "They planned to leave, but it started raining."
        ]
    },
    {
        korean: "버터",
        english: "Butter",
        pronunciation: "[ˈbʌtər]",
        examples: [
            "She spread butter on her toast.",
            "He added butter to the recipe.",
            "They bought a stick of butter."
        ]
    },
    {
        korean: "단추",
        english: "Button",
        pronunciation: "[ˈbʌtən]",
        examples: [
            "She sewed a button on her shirt.",
            "He pressed the button to start the machine.",
            "The button on his jacket was loose."
        ]
    },
    {
        korean: "사다",
        english: "Buy",
        pronunciation: "[baɪ]",
        examples: [
            "She went to the store to buy groceries.",
            "He decided to buy a new phone.",
            "They want to buy a house."
        ]
    },
    {
        korean: "옆에",
        english: "By",
        pronunciation: "[baɪ]",
        examples: [
            "She sat by the window.",
            "He walked by the river.",
            "They live by the sea."
        ]
    },
    {
        korean: "안녕",
        english: "Bye",
        pronunciation: "[baɪ]",
        examples: [
            "She waved and said bye.",
            "He left the office with a quick bye.",
            "They said bye to their friends."
        ]
    },
    {
        korean: "달력",
        english: "Calendar",
        pronunciation: "[ˈkæləndər]",
        examples: [
            "She marked the date on the calendar.",
            "He checked his calendar for appointments.",
            "They bought a new calendar for the new year."
        ]
    },
    {
        korean: "케이크",
        english: "Cake",
        pronunciation: "[keɪk]",
        examples: [
            "She baked a chocolate cake.",
            "He bought a cake for the party.",
            "They enjoyed a slice of cake."
        ]
    },
    {
        korean: "부르다",
        english: "Call",
        pronunciation: "[kɔl]",
        examples: [
            "He decided to call his friend.",
            "She received a call from her mother.",
            "They need to call a taxi."
        ]
    },
    {
        korean: "사진기",
        english: "Camera",
        pronunciation: "[ˈkæmərə]",
        examples: [
            "She bought a new camera for her trip.",
            "He loves to take pictures with his camera.",
            "They found an old camera in the attic."
        ]
    },
    {
        korean: "야영지",
        english: "Camp",
        pronunciation: "[kæmp]",
        examples: [
            "They set up camp by the lake.",
            "He went to a summer camp.",
            "She enjoys camping in the mountains."
        ]
    },
    {
        korean: "뚱뚱한",
        english: "Fat",
        pronunciation: "[fæt]",
        examples: [
            "He loves to eat, so he is quite fat.",
            "The cat is getting fat because it eats a lot.",
            "She feels fat after the big meal."
        ]
    },
    {
        korean: "유명한",
        english: "Famous",
        pronunciation: "[ˈfeɪməs]",
        examples: [
            "He is a famous actor.",
            "The city is famous for its food.",
            "She wants to be famous one day."
        ]
    },
    {
        korean: "아버지",
        english: "Father",
        pronunciation: "[ˈfɑðər]",
        examples: [
            "My father is very kind.",
            "He is a great father to his children.",
            "She called her father for advice."
        ]
    },
    {
        korean: "느끼다",
        english: "Feel",
        pronunciation: "[fil]",
        examples: [
            "I feel happy today.",
            "She feels cold in the morning.",
            "He felt a pain in his leg."
        ]
    },
    {
        korean: "다소 양이 적은",
        english: "Few",
        pronunciation: "[fju]",
        examples: [
            "There are only a few apples left.",
            "She has few friends in the new city.",
            "He made a few mistakes on the test."
        ]
    },
    {
        korean: "들판, 경기장",
        english: "Field",
        pronunciation: "[fild]",
        examples: [
            "They played soccer on the field.",
            "The field was covered in flowers.",
            "She works in the field of medicine."
        ]
    },
    {
        korean: "싸움",
        english: "Fight",
        pronunciation: "[faɪt]",
        examples: [
            "They got into a fight at school.",
            "He trained to fight in the ring.",
            "She tried to stop the fight."
        ]
    },
    {
        korean: "채우다",
        english: "Fill",
        pronunciation: "[fɪl]",
        examples: [
            "He filled the glass with water.",
            "She needs to fill out the form.",
            "They fill their days with fun activities."
        ]
    },
    {
        korean: "필름",
        english: "Film",
        pronunciation: "[fɪlm]",
        examples: [
            "They watched a new film last night.",
            "He wants to make a documentary film.",
            "She loves classic black-and-white films."
        ]
    },
    {
        korean: "찾다",
        english: "Find",
        pronunciation: "[faɪnd]",
        examples: [
            "Can you help me find my keys?",
            "She found a great book at the library.",
            "He is trying to find a new job."
        ]
    },
    {
        korean: "좋은, 맑은",
        english: "Fine",
        pronunciation: "[faɪn]",
        examples: [
            "The weather is fine today.",
            "She did a fine job on the project.",
            "He feels fine after the surgery."
        ]
    },
    {
        korean: "손가락",
        english: "Finger",
        pronunciation: "[ˈfɪŋɡər]",
        examples: [
            "She cut her finger while cooking.",
            "He wears a ring on his finger.",
            "They pointed their fingers at the culprit."
        ]
    },
    {
        korean: "끝내다",
        english: "Finish",
        pronunciation: "[ˈfɪnɪʃ]",
        examples: [
            "She finished her homework quickly.",
            "He wants to finish the race first.",
            "They need to finish the project by tomorrow."
        ]
    },
    {
        korean: "불",
        english: "Fire",
        pronunciation: "[ˈfaɪər]",
        examples: [
            "The fire kept them warm.",
            "She called the fire department.",
            "They sat around the campfire."
        ]
    },
    {
        korean: "고기, 낚시하다",
        english: "Fish",
        pronunciation: "[fɪʃ]",
        examples: [
            "He caught a big fish.",
            "She cooked fish for dinner.",
            "They went to the lake to fish."
        ]
    },
    {
        korean: "고정시키다",
        english: "Fix",
        pronunciation: "[fɪks]",
        examples: [
            "He needs to fix his bike.",
            "She fixed the broken vase.",
            "They are trying to fix the problem."
        ]
    },
    {
        korean: "깃발",
        english: "Flag",
        pronunciation: "[flæɡ]",
        examples: [
            "They raised the flag.",
            "The flag was blowing in the wind.",
            "She saluted the flag."
        ]
    },
    {
        korean: "마루",
        english: "Floor",
        pronunciation: "[flɔr]",
        examples: [
            "She cleaned the floor.",
            "He sat on the floor.",
            "They installed a new wooden floor."
        ]
    },
    {
        korean: "꽃",
        english: "Flower",
        pronunciation: "[ˈflaʊər]",
        examples: [
            "She planted a flower in the garden.",
            "He gave her a bouquet of flowers.",
            "They admired the beautiful flowers."
        ]
    },
    {
        korean: "날다",
        english: "Fly",
        pronunciation: "[flaɪ]",
        examples: [
            "The birds fly south for the winter.",
            "He wants to learn how to fly a plane.",
            "She watched the kite fly in the sky."
        ]
    },
    {
        korean: "뒤를 따르다",
        english: "Follow",
        pronunciation: "[ˈfɑloʊ]",
        examples: [
            "She followed him home.",
            "He told the dog to follow him.",
            "They follow the instructions carefully."
        ]
    },
    {
        korean: "음식",
        english: "Food",
        pronunciation: "[fud]",
        examples: [
            "She loves Italian food.",
            "He ordered a lot of food.",
            "They donated food to the shelter."
        ]
    },
    {
        korean: "바보",
        english: "Fool",
        pronunciation: "[ful]",
        examples: [
            "He felt like a fool.",
            "She called him a fool.",
            "Don't be a fool."
        ]
    },
    {
        korean: "발",
        english: "Foot",
        pronunciation: "[fʊt]",
        examples: [
            "He hurt his foot while playing soccer.",
            "She walked barefoot on the beach.",
            "They measured the length in feet."
        ]
    },
    {
        korean: "위하여, 동안",
        english: "For",
        pronunciation: "[fɔr]",
        examples: [
            "This gift is for you.",
            "She waited for an hour.",
            "They left for the airport."
        ]
    },
    {
        korean: "잊다",
        english: "Forget",
        pronunciation: "[fərˈɡɛt]",
        examples: [
            "Don't forget to lock the door.",
            "He forgets names easily.",
            "She forgot her homework."
        ]
    },
    {
        korean: "포크",
        english: "Fork",
        pronunciation: "[fɔrk]",
        examples: [
            "He used a fork to eat the salad.",
            "She bought a new set of forks.",
            "They couldn't find the forks."
        ]
    },
    {
        korean: "자유로운",
        english: "Free",
        pronunciation: "[fri]",
        examples: [
            "The event is free for all.",
            "She felt free after the exams.",
            "He offered a free sample."
        ]
    },
    {
        korean: "신선한",
        english: "Fresh",
        pronunciation: "[frɛʃ]",
        examples: [
            "She bought fresh vegetables.",
            "He loves the fresh air.",
            "They served fresh juice."
        ]
    },
    {
        korean: "친구",
        english: "Friend",
        pronunciation: "[frɛnd]",
        examples: [
            "She met her friend at the cafe.",
            "He has many friends.",
            "They have been friends for years."
        ]
    },
    {
        korean: "아기",
        english: "Baby",
        pronunciation: "[ˈbeɪbi]",
        examples: [
            "The baby is sleeping.",
            "She has a cute baby.",
            "The baby cried all night."
        ]
    },
    {
        korean: "뒤에",
        english: "Back",
        pronunciation: "[bæk]",
        examples: [
            "He stood at the back of the room.",
            "She turned back to look.",
            "They went back to their hometown."
        ]
    },
    {
        korean: "나쁜",
        english: "Bad",
        pronunciation: "[bæd]",
        examples: [
            "He has a bad habit.",
            "The weather was bad today.",
            "She felt bad about the mistake."
        ]
    },
    {
        korean: "가방",
        english: "Bag",
        pronunciation: "[bæɡ]",
        examples: [
            "She packed her bag for school.",
            "He bought a new bag.",
            "They carried their bags to the hotel."
        ]
    },
    {
        korean: "공",
        english: "Ball",
        pronunciation: "[bɔl]",
        examples: [
            "They played with a ball in the park.",
            "He kicked the ball into the goal.",
            "She threw the ball to her friend."
        ]
    },
    {
        korean: "풍선",
        english: "Balloon",
        pronunciation: "[bəˈlun]",
        examples: [
            "The balloon floated in the air.",
            "She tied the balloon to a string.",
            "They popped the balloon for fun."
        ]
    },
    {
        korean: "바나나",
        english: "Banana",
        pronunciation: "[bəˈnænə]",
        examples: [
            "He ate a banana for breakfast.",
            "She likes banana-flavored ice cream.",
            "They bought a bunch of bananas."
        ]
    },
    {
        korean: "끈, 악단",
        english: "Band",
        pronunciation: "[bænd]",
        examples: [
            "He joined a music band.",
            "She wore a rubber band on her wrist.",
            "The band performed at the concert."
        ]
    },
    {
        korean: "은행",
        english: "Bank",
        pronunciation: "[bæŋk]",
        examples: [
            "She deposited money in the bank.",
            "He works at a bank.",
            "They went to the bank to get a loan."
        ]
    },
    {
        korean: "기초",
        english: "Base",
        pronunciation: "[beɪs]",
        examples: [
            "The base of the statue is made of stone.",
            "He touched all the bases in the game.",
            "They built a strong base for the project."
        ]
    },
    {
        korean: "바구니",
        english: "Basket",
        pronunciation: "[ˈbæskɪt]",
        examples: [
            "She filled the basket with fruit.",
            "He carried a basket of flowers.",
            "They bought a picnic basket."
        ]
    },
    {
        korean: "목욕",
        english: "Bath",
        pronunciation: "[bæθ]",
        examples: [
            "She took a bath to relax.",
            "He gave the dog a bath.",
            "They enjoyed a bubble bath."
        ]
    },
    {
        korean: "이다",
        english: "Be",
        pronunciation: "[bi]",
        examples: [
            "She wants to be a teacher.",
            "He will be there soon.",
            "They are happy to be together."
        ]
    },
    {
        korean: "해변",
        english: "Beach",
        pronunciation: "[biʧ]",
        examples: [
            "They spent the day at the beach.",
            "She collected shells on the beach.",
            "He loves to swim at the beach."
        ]
    },
    {
        korean: "곰",
        english: "Bear",
        pronunciation: "[bɛr]",
        examples: [
            "They saw a bear in the forest.",
            "She has a teddy bear.",
            "He learned about bears in school."
        ]
    },
    {
        korean: "아름다움",
        english: "Beautiful",
        pronunciation: "[ˈbjutɪfəl]",
        examples: [
            "She looked beautiful in her dress.",
            "The sunset was beautiful.",
            "He gave her a beautiful bouquet."
        ]
    },
    {
        korean: "때문에",
        english: "Because",
        pronunciation: "[bɪˈkɔz]",
        examples: [
            "She stayed home because she was sick.",
            "He left early because of the traffic.",
            "They are happy because it's a holiday."
        ]
    },
    {
        korean: "되다",
        english: "Become",
        pronunciation: "[bɪˈkʌm]",
        examples: [
            "He wants to become a doctor.",
            "She became very popular.",
            "They will become good friends."
        ]
    },
    {
        korean: "침대",
        english: "Bed",
        pronunciation: "[bɛd]",
        examples: [
            "She went to bed early.",
            "He made the bed in the morning.",
            "They bought a new bed."
        ]
    },
    {
        korean: "전에",
        english: "Before",
        pronunciation: "[bɪˈfɔr]",
        examples: [
            "She finished her work before dinner.",
            "He left before the sun set.",
            "They arrived before the meeting started."
        ]
    },
    {
        korean: "시작하다",
        english: "Begin",
        pronunciation: "[bɪˈɡɪn]",
        examples: [
            "She began to read the book.",
            "He will begin the project next week.",
            "They began their journey early."
        ]
    },
    {
        korean: "뒤에",
        english: "Behind",
        pronunciation: "[bɪˈhaɪnd]",
        examples: [
            "She hid behind the door.",
            "He was standing behind her in line.",
            "They left the city behind."
        ]
    },
    {
        korean: "종",
        english: "Bell",
        pronunciation: "[bɛl]",
        examples: [
            "She rang the bell.",
            "He heard the school bell.",
            "They have a bell at their front door."
        ]
    },
    {
        korean: "아래에",
        english: "Below",
        pronunciation: "[bɪˈloʊ]",
        examples: [
            "The temperature is below freezing.",
            "She looked below the table.",
            "He lives below the apartment."
        ]
    },
    {
        korean: "긴의자",
        english: "Bench",
        pronunciation: "[bɛnʧ]",
        examples: [
            "They sat on the park bench.",
            "She painted the old bench.",
            "He rested on a bench after the run."
        ]
    },
    {
        korean: "곁에",
        english: "Beside",
        pronunciation: "[bɪˈsaɪd]",
        examples: [
            "She stood beside him.",
            "He placed the book beside the bed.",
            "They walked beside the river."
        ]
    },
    {
        korean: "사이에",
        english: "Between",
        pronunciation: "[bɪˈtwin]",
        examples: [
            "She sat between her friends.",
            "He found the paper between the books.",
            "They walked between the trees."
        ]
    },
    {
        korean: "자전거",
        english: "Bicycle",
        pronunciation: "[ˈbaɪsɪkəl]",
        examples: [
            "He rides his bicycle to school.",
            "She bought a new bicycle.",
            "They enjoy going on bicycle rides."
        ]
    },
    {
        korean: "큰",
        english: "Big",
        pronunciation: "[bɪɡ]",
        examples: [
            "He lives in a big house.",
            "She has a big dog.",
            "They saw a big movie."
        ]
    },
    {
        korean: "새",
        english: "Bird",
        pronunciation: "[bɜrd]",
        examples: [
            "She saw a colorful bird.",
            "He feeds the birds every morning.",
            "They have a pet bird."
        ]
    },    
    {
        korean: "바구니",
        english: "Basket",
        pronunciation: "[ˈbæskɪt]",
        examples: [
            "She filled the basket with fruit.",
            "He carried a basket of flowers.",
            "They bought a picnic basket."
        ]
    },
    {
        korean: "목욕",
        english: "Bath",
        pronunciation: "[bæθ]",
        examples: [
            "She took a bath to relax.",
            "He gave the dog a bath.",
            "They enjoyed a bubble bath."
        ]
    },
    {
        korean: "이다",
        english: "Be",
        pronunciation: "[bi]",
        examples: [
            "She wants to be a teacher.",
            "He will be there soon.",
            "They are happy to be together."
        ]
    },
    {
        korean: "해변",
        english: "Beach",
        pronunciation: "[biʧ]",
        examples: [
            "They spent the day at the beach.",
            "She collected shells on the beach.",
            "He loves to swim at the beach."
        ]
    },
    {
        korean: "곰",
        english: "Bear",
        pronunciation: "[bɛr]",
        examples: [
            "They saw a bear in the forest.",
            "She has a teddy bear.",
            "He learned about bears in school."
        ]
    },
    {
        korean: "아름다움",
        english: "Beautiful",
        pronunciation: "[ˈbjutɪfəl]",
        examples: [
            "She looked beautiful in her dress.",
            "The sunset was beautiful.",
            "He gave her a beautiful bouquet."
        ]
    },
    {
        korean: "때문에",
        english: "Because",
        pronunciation: "[bɪˈkɔz]",
        examples: [
            "She stayed home because she was sick.",
            "He left early because of the traffic.",
            "They are happy because it's a holiday."
        ]
    },
    {
        korean: "되다",
        english: "Become",
        pronunciation: "[bɪˈkʌm]",
        examples: [
            "He wants to become a doctor.",
            "She became very popular.",
            "They will become good friends."
        ]
    },
    {
        korean: "침대",
        english: "Bed",
        pronunciation: "[bɛd]",
        examples: [
            "She went to bed early.",
            "He made the bed in the morning.",
            "They bought a new bed."
        ]
    },
    {
        korean: "전에",
        english: "Before",
        pronunciation: "[bɪˈfɔr]",
        examples: [
            "She finished her work before dinner.",
            "He left before the sun set.",
            "They arrived before the meeting started."
        ]
    },
    {
        korean: "시작하다",
        english: "Begin",
        pronunciation: "[bɪˈɡɪn]",
        examples: [
            "She began to read the book.",
            "He will begin the project next week.",
            "They began their journey early."
        ]
    },
    {
        korean: "뒤에",
        english: "Behind",
        pronunciation: "[bɪˈhaɪnd]",
        examples: [
            "She hid behind the door.",
            "He was standing behind her in line.",
            "They left the city behind."
        ]
    },
    {
        korean: "종",
        english: "Bell",
        pronunciation: "[bɛl]",
        examples: [
            "She rang the bell.",
            "He heard the school bell.",
            "They have a bell at their front door."
        ]
    },
    {
        korean: "아래에",
        english: "Below",
        pronunciation: "[bɪˈloʊ]",
        examples: [
            "The temperature is below freezing.",
            "She looked below the table.",
            "He lives below the apartment."
        ]
    },
    {
        korean: "긴의자",
        english: "Bench",
        pronunciation: "[bɛnʧ]",
        examples: [
            "They sat on the park bench.",
            "She painted the old bench.",
            "He rested on a bench after the run."
        ]
    },
    {
        korean: "곁에",
        english: "Beside",
        pronunciation: "[bɪˈsaɪd]",
        examples: [
            "She stood beside him.",
            "He placed the book beside the bed.",
            "They walked beside the river."
        ]
    },
    {
        korean: "사이에",
        english: "Between",
        pronunciation: "[bɪˈtwin]",
        examples: [
            "She sat between her friends.",
            "He found the paper between the books.",
            "They walked between the trees."
        ]
    },
    {
        korean: "자전거",
        english: "Bicycle",
        pronunciation: "[ˈbaɪsɪkəl]",
        examples: [
            "He rides his bicycle to school.",
            "She bought a new bicycle.",
            "They enjoy going on bicycle rides."
        ]
    },
    {
        korean: "머리",
        english: "Head",
        pronunciation: "[hɛd]",
        examples: [
            "He has a headache.",
            "She put on her headscarf.",
            "They nodded their heads in agreement."
        ]
    },
    {
        korean: "듣다",
        english: "Hear",
        pronunciation: "[hɪr]",
        examples: [
            "Can you hear me?",
            "She heard a strange noise.",
            "They listened to hear the announcement."
        ]
    },
    {
        korean: "마음, 상징",
        english: "Heart",
        pronunciation: "[hɑrt]",
        examples: [
            "She has a kind heart.",
            "He felt his heart racing.",
            "They drew a heart on the card."
        ]
    },
    {
        korean: "무거운",
        english: "Heavy",
        pronunciation: "[ˈhɛvi]",
        examples: [
            "The box is very heavy.",
            "She lifted the heavy bag.",
            "He felt a heavy burden."
        ]
    },
    {
        korean: "여보세요",
        english: "Hello",
        pronunciation: "[həˈloʊ]",
        examples: [
            "She greeted him with a hello.",
            "He said hello to his neighbor.",
            "They waved and said hello."
        ]
    },
    {
        korean: "돕다",
        english: "Help",
        pronunciation: "[hɛlp]",
        examples: [
            "Can you help me?",
            "She helps her friends with their homework.",
            "They need help moving the furniture."
        ]
    },
    {
        korean: "암탉",
        english: "Hen",
        pronunciation: "[hɛn]",
        examples: [
            "The hen laid an egg.",
            "She fed the hen some corn.",
            "They have a hen in their backyard."
        ]
    },
    {
        korean: "여기에서",
        english: "Here",
        pronunciation: "[hɪr]",
        examples: [
            "Please sit here.",
            "She is here now.",
            "They arrived here yesterday."
        ]
    },
    {
        korean: "안녕하세요",
        english: "Hi",
        pronunciation: "[haɪ]",
        examples: [
            "He said hi to everyone.",
            "She greeted him with a hi.",
            "They all waved and said hi."
        ]
    },
    {
        korean: "숨기다",
        english: "Hide",
        pronunciation: "[haɪd]",
        examples: [
            "She tried to hide from him.",
            "He hid the gift behind his back.",
            "They played a game of hide and seek."
        ]
    },
    {
        korean: "높은",
        english: "High",
        pronunciation: "[haɪ]",
        examples: [
            "The mountain is very high.",
            "She jumped high into the air.",
            "He scored high on the test."
        ]
    },
    {
        korean: "하이킹, 도보여행",
        english: "Hiking",
        pronunciation: "[ˈhaɪkɪŋ]",
        examples: [
            "They went hiking in the mountains.",
            "She enjoys hiking on weekends.",
            "He bought new boots for hiking."
        ]
    },
    {
        korean: "언덕",
        english: "Hill",
        pronunciation: "[hɪl]",
        examples: [
            "They climbed the hill.",
            "She rolled down the hill.",
            "He lives on a hill."
        ]
    },
    {
        korean: "때리다",
        english: "Hit",
        pronunciation: "[hɪt]",
        examples: [
            "He hit the ball with a bat.",
            "She accidentally hit her hand on the table.",
            "They were told not to hit each other."
        ]
    },
    {
        korean: "잡다",
        english: "Hold",
        pronunciation: "[hoʊld]",
        examples: [
            "She will hold the baby.",
            "He had to hold the door open.",
            "They decided to hold a meeting."
        ]
    },
    {
        korean: "구멍",
        english: "Hole",
        pronunciation: "[hoʊl]",
        examples: [
            "There is a hole in my sock.",
            "He dug a hole in the ground.",
            "She looked through the hole in the fence."
        ]
    },
    {
        korean: "휴일",
        english: "Holiday",
        pronunciation: "[ˈhɑlɪˌdeɪ]",
        examples: [
            "Christmas is a popular holiday.",
            "They went on holiday to the beach.",
            "She decorated the house for the holiday."
        ]
    },
    {
        korean: "집",
        english: "Home",
        pronunciation: "[hoʊm]",
        examples: [
            "She stayed at home all day.",
            "He bought a new home.",
            "They feel comfortable at home."
        ]
    },
    {
        korean: "희망",
        english: "Hope",
        pronunciation: "[hoʊp]",
        examples: [
            "I hope you feel better.",
            "She has high hopes for the future.",
            "They hope to travel next year."
        ]
    },
    {
        korean: "호스",
        english: "Hose",
        pronunciation: "[hoʊs]",
        examples: [
            "He watered the garden with a hose.",
            "She coiled the hose neatly.",
            "They bought a new hose for the yard."
        ]
    },
    {
        korean: "말",
        english: "Horse",
        pronunciation: "[hɔrs]",
        examples: [
            "She rode a horse for the first time.",
            "He fed the horse some hay.",
            "They watched the horse race."
        ]
    },
    {
        korean: "병원",
        english: "Hospital",
        pronunciation: "[ˈhɑspɪtəl]",
        examples: [
            "She was taken to the hospital.",
            "He works as a doctor at the hospital.",
            "They visited their friend in the hospital."
        ]
    },
    {
        korean: "뜨거운",
        english: "Hot",
        pronunciation: "[hɑt]",
        examples: [
            "The coffee is hot.",
            "She likes hot weather.",
            "They played outside in the hot sun."
        ]
    },
    {
        korean: "호텔",
        english: "Hotel",
        pronunciation: "[hoʊˈtɛl]",
        examples: [
            "They booked a room at the hotel.",
            "She works at a luxury hotel.",
            "He stayed at a hotel during his trip."
        ]
    },
    {
        korean: "시간",
        english: "Hour",
        pronunciation: "[ˈaʊər]",
        examples: [
            "The meeting lasted for an hour.",
            "She has an hour to finish her work.",
            "They spent an hour at the park."
        ]
    },
    {
        korean: "집",
        english: "House",
        pronunciation: "[haʊs]",
        examples: [
            "She lives in a big house.",
            "He is building a new house.",
            "They painted their house blue."
        ]
    },
    {
        korean: "어떻게",
        english: "How",
        pronunciation: "[haʊ]",
        examples: [
            "How are you?",
            "She asked how to solve the problem.",
            "They want to know how it works."
        ]
    },
    {
        korean: "백(100)",
        english: "Hundred",
        pronunciation: "[ˈhʌndrəd]",
        examples: [
            "There are a hundred students in the class.",
            "She has a hundred dollars.",
            "He counted to a hundred."
        ]
    },
    {
        korean: "배고픈",
        english: "Hungry",
        pronunciation: "[ˈhʌŋɡri]",
        examples: [
            "She felt hungry after school.",
            "He made a sandwich because he was hungry.",
            "They were hungry after the long trip."
        ]
    },
    {
        korean: "서두르다",
        english: "Hurry",
        pronunciation: "[ˈhɜri]",
        examples: [
            "She had to hurry to catch the bus.",
            "He told her to hurry up.",
            "They were in a hurry to leave."
        ]
    },
    {
        korean: "다치게 하다",
        english: "Hurt",
        pronunciation: "[hɜrt]",
        examples: [
            "She hurt her knee while running.",
            "He didn't mean to hurt her feelings.",
            "They stopped to help the hurt animal."
        ]
    },
    {
        korean: "나",
        english: "I",
        pronunciation: "[aɪ]",
        examples: [
            "I am going to the store.",
            "She said, 'I love you.'",
            "They told me, 'I am here for you.'"
        ]
    },
    {
        korean: "얼음",
        english: "Ice",
        pronunciation: "[aɪs]",
        examples: [
            "The lake is covered with ice.",
            "She put ice in her drink.",
            "They went ice skating."
        ]
    },
    {
        korean: "생각",
        english: "Idea",
        pronunciation: "[aɪˈdiə]",
        examples: [
            "She has a great idea.",
            "He shared his idea with the team.",
            "They brainstormed for new ideas."
        ]
    },
    {
        korean: "만약",
        english: "If",
        pronunciation: "[ɪf]",
        examples: [
            "She asked if he was coming.",
            "He wanted to know if it was true.",
            "They wondered if it would rain."
        ]
    },
    {
        korean: "병든",
        english: "Ill",
        pronunciation: "[ɪl]",
        examples: [
            "She felt ill after eating.",
            "He stayed home because he was ill.",
            "They took care of their ill friend."
        ]
    },
    {
        korean: "속",
        english: "In",
        pronunciation: "[ɪn]",
        examples: [
            "She is in the room.",
            "He put the book in his bag.",
            "They are interested in science."
        ]
    },
    {
        korean: "잉크",
        english: "Ink",
        pronunciation: "[ɪŋk]",
        examples: [
            "She spilled ink on the paper.",
            "He refilled the ink in the pen.",
            "They bought a new ink cartridge."
        ]
    },
    {
        korean: "흥미",
        english: "Interest",
        pronunciation: "[ˈɪntrəst]",
        examples: [
            "She has an interest in art.",
            "He showed interest in the project.",
            "They shared a common interest."
        ]
    },
    {
        korean: "속으로",
        english: "Into",
        pronunciation: "[ˈɪntu]",
        examples: [
            "She walked into the room.",
            "He jumped into the pool.",
            "They divided the cake into pieces."
        ]
    },
    {
        korean: "소개하다",
        english: "Introduce",
        pronunciation: "[ˌɪntrəˈdus]",
        examples: [
            "She will introduce her friend.",
            "He introduced himself to the class.",
            "They introduced a new product."
        ]
    },
    {
        korean: "섬",
        english: "Island",
        pronunciation: "[ˈaɪlənd]",
        examples: [
            "They visited a tropical island.",
            "She lives on an island.",
            "He dreams of owning a private island."
        ]
    },
    {
        korean: "그것",
        english: "It",
        pronunciation: "[ɪt]",
        examples: [
            "It is raining.",
            "She found it on the table.",
            "He said it was important."
        ]
    },
    {
        korean: "직업",
        english: "Job",
        pronunciation: "[dʒɑb]",
        examples: [
            "She got a new job.",
            "He enjoys his job.",
            "They are looking for a job."
        ]
    },
    {
        korean: "가입하다",
        english: "Join",
        pronunciation: "[dʒɔɪn]",
        examples: [
            "She decided to join the club.",
            "He wants to join the team.",
            "They joined the discussion."
        ]
    },
    {
        korean: "주스",
        english: "Juice",
        pronunciation: "[dʒus]",
        examples: [
            "She drank a glass of juice.",
            "He likes orange juice.",
            "They made fresh juice."
        ]
    },
    {
        korean: "뛰어오르다",
        english: "Jump",
        pronunciation: "[dʒʌmp]",
        examples: [
            "She can jump very high.",
            "He jumped over the fence.",
            "They jumped into the pool."
        ]
    },
    {
        korean: "밀림지대",
        english: "Jungle",
        pronunciation: "[ˈdʒʌŋɡəl]",
        examples: [
            "They explored the jungle.",
            "She read a book about the jungle.",
            "He saw animals in the jungle."
        ]
    },
    {
        korean: "오직, 겨우",
        english: "Just",
        pronunciation: "[dʒʌst]",
        examples: [
            "She just arrived.",
            "He is just a beginner.",
            "They just finished their work."
        ]
    },
    {
        korean: "지키다, 유지하다",
        english: "Keep",
        pronunciation: "[kip]",
        examples: [
            "She keeps her room clean.",
            "He wants to keep the secret.",
            "They keep in touch regularly."
        ]
    },
    {
        korean: "열쇠",
        english: "Key",
        pronunciation: "[ki]",
        examples: [
            "She lost her key.",
            "He found the key under the mat.",
            "They gave her the key to the house."
        ]
    },
    {
        korean: "차다",
        english: "Kick",
        pronunciation: "[kɪk]",
        examples: [
            "He kicked the ball.",
            "She kicked the door open.",
            "They taught him how to kick."
        ]
    },
    {
        korean: "아이",
        english: "Kid",
        pronunciation: "[kɪd]",
        examples: [
            "She is a smart kid.",
            "He loves playing with kids.",
            "They have two kids."
        ]
    },
    {
        korean: "죽이다",
        english: "Kill",
        pronunciation: "[kɪl]",
        examples: [
            "He tried to kill the mosquito.",
            "She couldn't kill the spider.",
            "They planned to kill time at the park."
        ]
    },
    {
        korean: "친절한, 종류",
        english: "Kind",
        pronunciation: "[kaɪnd]",
        examples: [
            "She is very kind.",
            "He showed a kind gesture.",
            "They appreciated her kind words."
        ]
    },
    {
        korean: "왕",
        english: "King",
        pronunciation: "[kɪŋ]",
        examples: [
            "The king ruled the country.",
            "She read a story about a king.",
            "He wants to be a king for a day."
        ]
    },
    {
        korean: "부엌",
        english: "Kitchen",
        pronunciation: "[ˈkɪʧən]",
        examples: [
            "She cooked in the kitchen.",
            "He remodeled the kitchen.",
            "They gathered in the kitchen."
        ]
    },
    {
        korean: "무릎",
        english: "Knee",
        pronunciation: "[ni]",
        examples: [
            "She hurt her knee.",
            "He knelt on one knee.",
            "They examined his knee."
        ]
    },
    {
        korean: "칼",
        english: "Knife",
        pronunciation: "[naɪf]",
        examples: [
            "She cut the fruit with a knife.",
            "He sharpened his knife.",
            "They bought a new kitchen knife."
        ]
    },
    {
        korean: "두드리다",
        english: "Knock",
        pronunciation: "[nɑk]",
        examples: [
            "She heard a knock on the door.",
            "He knocked before entering.",
            "They asked him to knock first."
        ]
    },
    {
        korean: "알다",
        english: "Know",
        pronunciation: "[noʊ]",
        examples: [
            "She knows the answer.",
            "He wants to know more about it.",
            "They know each other well."
        ]
    },
    {
        korean: "숙녀",
        english: "Lady",
        pronunciation: "[ˈleɪdi]",
        examples: [
            "She is a kind lady.",
            "He offered his seat to the lady.",
            "They saw a lady in a red dress."
        ]
    },
    {
        korean: "호수",
        english: "Lake",
        pronunciation: "[leɪk]",
        examples: [
            "They went fishing at the lake.",
            "She swam in the lake.",
            "He has a house by the lake."
        ]
    },
    {
        korean: "등불",
        english: "Lamp",
        pronunciation: "[læmp]",
        examples: [
            "She turned on the lamp.",
            "He bought a new lamp for his desk.",
            "They repaired the broken lamp."
        ]
    },
    {
        korean: "땅",
        english: "Land",
        pronunciation: "[lænd]",
        examples: [
            "The plane will land soon.",
            "She owns a piece of land.",
            "They are working on a land development project."
        ]
    },
    {
        korean: "큰, 넓은",
        english: "Large",
        pronunciation: "[lɑrdʒ]",
        examples: [
            "She has a large house.",
            "He bought a large pizza.",
            "They found a large shell on the beach."
        ]
    },
    {
        korean: "마지막, 최근",
        english: "Last",
        pronunciation: "[læst]",
        examples: [
            "She was the last to arrive.",
            "He saved the best for last.",
            "They stayed until the last minute."
        ]
    },
    {
        korean: "늦은",
        english: "Late",
        pronunciation: "[leɪt]",
        examples: [
            "She arrived late.",
            "He apologized for being late.",
            "They stayed up late."
        ]
    },
    {
        korean: "웃다",
        english: "Laugh",
        pronunciation: "[læf]",
        examples: [
            "She has a beautiful laugh.",
            "He made her laugh.",
            "They couldn't stop laughing."
        ]
    },
    {
        korean: "인도하다",
        english: "Lead",
        pronunciation: "[lid]",
        examples: [
            "She will lead the team.",
            "He took the lead in the race.",
            "They need someone to lead the project."
        ]
    },
    {
        korean: "잎",
        english: "Leaf",
        pronunciation: "[lif]",
        examples: [
            "She found a beautiful leaf.",
            "He raked the leaves.",
            "They watched the leaves fall."
        ]
    },
    {
        korean: "배우다",
        english: "Learn",
        pronunciation: "[lɜrn]",
        examples: [
            "She wants to learn Spanish.",
            "He is eager to learn.",
            "They learn something new every day."
        ]
    },
    {
        korean: "떠나다",
        english: "Leave",
        pronunciation: "[liv]",
        examples: [
            "She will leave tomorrow.",
            "He left his keys at home.",
            "They decided to leave early."
        ]
    },
    {
        korean: "왼쪽",
        english: "Left",
        pronunciation: "[lɛft]",
        examples: [
            "She writes with her left hand.",
            "He turned left at the corner.",
            "They followed the left path."
        ]
    },
    {
        korean: "다리",
        english: "Leg",
        pronunciation: "[lɛɡ]",
        examples: [
            "She injured her leg.",
            "He crossed his legs.",
            "They walked on their legs."
        ]
    },
    {
        korean: "학과",
        english: "Lesson",
        pronunciation: "[ˈlɛsən]",
        examples: [
            "She taught the lesson.",
            "He learned a valuable lesson.",
            "They have a math lesson today."
        ]
    },
    {
        korean: "허락하다",
        english: "Let",
        pronunciation: "[lɛt]",
        examples: [
            "She let him borrow her book.",
            "He let the cat out.",
            "They let them join the group."
        ]
    },
    {
        korean: "편지",
        english: "Letter",
        pronunciation: "[ˈlɛtər]",
        examples: [
            "She wrote a letter to her friend.",
            "He received a letter in the mail.",
            "They read the letter together."
        ]
    },
    {
        korean: "도서관",
        english: "Library",
        pronunciation: "[ˈlaɪˌbrɛri]",
        examples: [
            "She goes to the library every week.",
            "He borrowed a book from the library.",
            "They study at the library."
        ]
    },
    {
        korean: "눕다, 거짓말하다",
        english: "Lie",
        pronunciation: "[laɪ]",
        examples: [
            "She decided to lie down for a while.",
            "He told a lie to avoid trouble.",
            "They found out he was lying."
        ]
    },
    {
        korean: "빛",
        english: "Light",
        pronunciation: "[laɪt]",
        examples: [
            "She turned on the light.",
            "He likes the light color.",
            "They saw a bright light."
        ]
    },
    {
        korean: "좋아하다",
        english: "Like",
        pronunciation: "[laɪk]",
        examples: [
            "She likes ice cream.",
            "He likes to play soccer.",
            "They like spending time together."
        ]
    },
    {
        korean: "선, 줄",
        english: "Line",
        pronunciation: "[laɪn]",
        examples: [
            "She drew a straight line.",
            "He stood in line at the store.",
            "They crossed the finish line."
        ]
    },
    {
        korean: "사자",
        english: "Lion",
        pronunciation: "[ˈlaɪən]",
        examples: [
            "They saw a lion at the zoo.",
            "She watched a documentary about lions.",
            "He dressed up as a lion for Halloween."
        ]
    },
    {
        korean: "입술",
        english: "Lip",
        pronunciation: "[lɪp]",
        examples: [
            "She put on some lip balm.",
            "He has chapped lips.",
            "They kissed on the lips."
        ]
    },
    {
        korean: "목록",
        english: "List",
        pronunciation: "[lɪst]",
        examples: [
            "She made a shopping list.",
            "He wrote down a list of tasks.",
            "They checked off items on the list."
        ]
    },
    {
        korean: "듣다",
        english: "Listen",
        pronunciation: "[ˈlɪsən]",
        examples: [
            "She likes to listen to music.",
            "He listened carefully to the instructions.",
            "They listened to a podcast."
        ]
    },
    {
        korean: "작은",
        english: "Little",
        pronunciation: "[ˈlɪtəl]",
        examples: [
            "She has a little dog.",
            "He gave her a little gift.",
            "They have little time to waste."
        ]
    },
    {
        korean: "살다, 생생한",
        english: "Live",
        pronunciation: "[lɪv]",
        examples: [
            "She lives in the city.",
            "He wants to live by the beach.",
            "They live a happy life."
        ]
    },
    {
        korean: "긴",
        english: "Long",
        pronunciation: "[lɔŋ]",
        examples: [
            "She has long hair.",
            "He went on a long trip.",
            "They waited for a long time."
        ]
    },
    {
        korean: "바라보다",
        english: "Look",
        pronunciation: "[lʊk]",
        examples: [
            "She likes to look at the stars.",
            "He looked out the window.",
            "They looked for their lost cat."
        ]
    },
    {
        korean: "잃다",
        english: "Lose",
        pronunciation: "[luz]",
        examples: [
            "She doesn't want to lose her keys.",
            "He lost his wallet.",
            "They were afraid to lose the game."
        ]
    },
    {
        korean: "많음",
        english: "Lot",
        pronunciation: "[lɑt]",
        examples: [
            "She has a lot of friends.",
            "He ate a lot of food.",
            "They have a lot to do."
        ]
    },
    {
        korean: "소리가 큰",
        english: "Loud",
        pronunciation: "[laʊd]",
        examples: [
            "She made a loud noise.",
            "He likes to play loud music.",
            "They heard a loud bang."
        ]
    },
    {
        korean: "사랑하다",
        english: "Love",
        pronunciation: "[lʌv]",
        examples: [
            "She loves her family.",
            "He is in love with her.",
            "They love spending time together."
        ]
    },
    {
        korean: "낮은",
        english: "Low",
        pronunciation: "[loʊ]",
        examples: [
            "She likes the low price.",
            "He has a low voice.",
            "They stayed in a low building."
        ]
    },
    {
        korean: "행운",
        english: "Luck",
        pronunciation: "[lʌk]",
        examples: [
            "She wished him good luck.",
            "He has a lot of luck.",
            "They believe in luck."
        ]
    },
    {
        korean: "점심식사",
        english: "Lunch",
        pronunciation: "[lʌnʧ]",
        examples: [
            "She packed her lunch.",
            "He eats lunch at noon.",
            "They had a picnic lunch."
        ]
    },
    {
        korean: "아주머니",
        english: "Ma'am",
        pronunciation: "[mæm]",
        examples: [
            "She addressed the teacher as ma'am.",
            "He said, 'Yes, ma'am.'",
            "They were respectful to the ma'am."
        ]
    },
    {
        korean: "미친",
        english: "Mad",
        pronunciation: "[mæd]",
        examples: [
            "She was mad at him.",
            "He felt mad about the situation.",
            "They were driving each other mad."
        ]
    },
    {
        korean: "우편",
        english: "Mail",
        pronunciation: "[meɪl]",
        examples: [
            "She sent a letter in the mail.",
            "He checks the mail every day.",
            "They received a package in the mail."
        ]
    },
    {
        korean: "만들다",
        english: "Make",
        pronunciation: "[meɪk]",
        examples: [
            "She likes to make crafts.",
            "He made a delicious meal.",
            "They made a lot of noise."
        ]
    },
    {
        korean: "사람, 남자",
        english: "Man",
        pronunciation: "[mæn]",
        examples: [
            "He is a kind man.",
            "She met a man at the store.",
            "They saw a man walking his dog."
        ]
    },
    {
        korean: "많은",
        english: "Many",
        pronunciation: "[ˈmɛni]",
        examples: [
            "She has many books.",
            "He knows many people.",
            "They took many photos."
        ]
    },
    {
        korean: "지도",
        english: "Map",
        pronunciation: "[mæp]",
        examples: [
            "She used a map to find the way.",
            "He has a world map on his wall.",
            "They followed the map carefully."
        ]
    },
    {
        korean: "행진, 3월",
        english: "March",
        pronunciation: "[mɑrʧ]",
        examples: [
            "They will march in the parade.",
            "She was born in March.",
            "He watched the soldiers march."
        ]
    },
    {
        korean: "상점",
        english: "Market",
        pronunciation: "[ˈmɑrkɪt]",
        examples: [
            "She goes to the market every week.",
            "He bought vegetables at the market.",
            "They enjoy the farmer's market."
        ]
    },
    {
        korean: "결혼하다",
        english: "Marry",
        pronunciation: "[ˈmæri]",
        examples: [
            "She wants to marry him.",
            "He proposed to her, and they will marry soon.",
            "They decided to marry next year."
        ]
    },
    {
        korean: "문제",
        english: "Matter",
        pronunciation: "[ˈmætər]",
        examples: [
            "She discussed the matter with her boss.",
            "He said it doesn't matter.",
            "They need to resolve the matter quickly."
        ]
    },
    {
        korean: "할 수 있다, 5월",
        english: "May",
        pronunciation: "[meɪ]",
        examples: [
            "She may come to the party.",
            "He was born in May.",
            "They may need some help."
        ]
    },
    {
        korean: "고기",
        english: "Meat",
        pronunciation: "[mit]",
        examples: [
            "She cooked some meat for dinner.",
            "He prefers lean meat.",
            "They bought meat from the butcher."
        ]
    },
    {
        korean: "메달",
        english: "Medal",
        pronunciation: "[ˈmɛdəl]",
        examples: [
            "She won a gold medal.",
            "He received a medal for bravery.",
            "They awarded him a medal."
        ]
    },
    {
        korean: "만나다",
        english: "Meet",
        pronunciation: "[mit]",
        examples: [
            "She will meet him at the café.",
            "He likes to meet new people.",
            "They decided to meet after work."
        ]
    },
    {
        korean: "멜론",
        english: "Melon",
        pronunciation: "[ˈmɛlən]",
        examples: [
            "She bought a fresh melon.",
            "He enjoys eating melon in the summer.",
            "They served melon as a dessert."
        ]
    },
    {
        korean: "미터",
        english: "Meter",
        pronunciation: "[ˈmitər]",
        examples: [
            "The pool is 25 meters long.",
            "He measured the room with a meter stick.",
            "They ran a 100-meter race."
        ]
    },
    {
        korean: "한가운데",
        english: "Middle",
        pronunciation: "[ˈmɪdəl]",
        examples: [
            "She sat in the middle of the room.",
            "He found the note in the middle of the book.",
            "They placed the table in the middle."
        ]
    },
    {
        korean: "우유",
        english: "Milk",
        pronunciation: "[mɪlk]",
        examples: [
            "She drinks a glass of milk every morning.",
            "He added milk to his coffee.",
            "They bought a gallon of milk."
        ]
    },
    {
        korean: "100만",
        english: "Million",
        pronunciation: "[ˈmɪljən]",
        examples: [
            "There are a million stars in the sky.",
            "She won a million dollars.",
            "They reached a million subscribers."
        ]
    },
    {
        korean: "분, 순간",
        english: "Minute",
        pronunciation: "[ˈmɪnɪt]",
        examples: [
            "She will be back in a minute.",
            "He needs a few more minutes.",
            "They waited for ten minutes."
        ]
    },
    {
        korean: "거울",
        english: "Mirror",
        pronunciation: "[ˈmɪrər]",
        examples: [
            "She looked in the mirror.",
            "He hung a mirror on the wall.",
            "They cleaned the bathroom mirror."
        ]
    },
    {
        korean: "양, 호칭",
        english: "Miss",
        pronunciation: "[mɪs]",
        examples: [
            "She was called Miss Smith.",
            "He didn't want to miss the show.",
            "They miss their old friends."
        ]
    },
    {
        korean: "모형",
        english: "Model",
        pronunciation: "[ˈmɑdəl]",
        examples: [
            "She built a model airplane.",
            "He is a fashion model.",
            "They displayed a model of the building."
        ]
    },
    {
        korean: "엄마",
        english: "Mom(my)",
        pronunciation: "[mɑm(i)]",
        examples: [
            "She loves her mom.",
            "He called his mommy for help.",
            "They made a card for their mom."
        ]
    },
    {
        korean: "돈",
        english: "Money",
        pronunciation: "[ˈmʌni]",
        examples: [
            "She saved her money.",
            "He needs more money for the trip.",
            "They donated money to charity."
        ]
    },
    {
        korean: "원숭이",
        english: "Monkey",
        pronunciation: "[ˈmʌŋki]",
        examples: [
            "They saw a monkey at the zoo.",
            "She read a book about monkeys.",
            "He likes to watch videos of monkeys."
        ]
    },
    {
        korean: "달, 개월",
        english: "Month",
        pronunciation: "[mʌnθ]",
        examples: [
            "She will visit next month.",
            "He needs to pay rent every month.",
            "They went on vacation for a month."
        ]
    },
    {
        korean: "달",
        english: "Moon",
        pronunciation: "[mun]",
        examples: [
            "They watched the full moon.",
            "She took a photo of the moon.",
            "He read about the phases of the moon."
        ]
    },
    {
        korean: "아침",
        english: "Morning",
        pronunciation: "[ˈmɔrnɪŋ]",
        examples: [
            "She goes for a run every morning.",
            "He drinks coffee in the morning.",
            "They enjoyed a quiet morning."
        ]
    },
    {
        korean: "어머니",
        english: "Mother",
        pronunciation: "[ˈmʌðər]",
        examples: [
            "She called her mother.",
            "He loves his mother.",
            "They celebrated Mother's Day."
        ]
    },
    {
        korean: "산",
        english: "Mountain",
        pronunciation: "[ˈmaʊntən]",
        examples: [
            "They climbed the mountain.",
            "She enjoys hiking in the mountains.",
            "He lives near a mountain range."
        ]
    },
    {
        korean: "입",
        english: "Mouth",
        pronunciation: "[maʊθ]",
        examples: [
            "She covered her mouth when she sneezed.",
            "He has a big mouth.",
            "They fed the baby with a spoon."
        ]
    },
    {
        korean: "움직이다",
        english: "Move",
        pronunciation: "[muv]",
        examples: [
            "She moved to a new city.",
            "He asked her to move the chair.",
            "They will move next month."
        ]
    },
    {
        korean: "영화",
        english: "Movie",
        pronunciation: "[ˈmuvi]",
        examples: [
            "They watched a movie together.",
            "She likes romantic movies.",
            "He is a famous movie actor."
        ]
    },
    {
        korean: "씨",
        english: "Mr.",
        pronunciation: "[ˈmɪstər]",
        examples: [
            "They addressed him as Mr. Smith.",
            "He is known as Mr. Fix-It.",
            "She asked Mr. Johnson for help."
        ]
    },
    {
        korean: "여사",
        english: "Mrs.",
        pronunciation: "[ˈmɪsɪz]",
        examples: [
            "She is known as Mrs. Brown.",
            "They visited Mrs. Anderson.",
            "He asked Mrs. Lee for advice."
        ]
    },
    {
        korean: "많은",
        english: "Much",
        pronunciation: "[mʌʧ]",
        examples: [
            "She doesn't have much time.",
            "He has much work to do.",
            "They enjoyed the party very much."
        ]
    },
    {
        korean: "음악",
        english: "Music",
        pronunciation: "[ˈmjuzɪk]",
        examples: [
            "She loves listening to music.",
            "He plays music on his guitar.",
            "They enjoy different kinds of music."
        ]
    },
    {
        korean: "해야 한다",
        english: "Must",
        pronunciation: "[mʌst]",
        examples: [
            "She must finish her homework.",
            "He must be tired.",
            "They must attend the meeting."
        ]
    },
    {
        korean: "이름",
        english: "Name",
        pronunciation: "[neɪm]",
        examples: [
            "She wrote her name on the paper.",
            "He asked for her name.",
            "They couldn't remember his name."
        ]
    },
    {
        korean: "좁은",
        english: "Narrow",
        pronunciation: "[ˈnɛroʊ]",
        examples: [
            "The street is narrow.",
            "She walked along the narrow path.",
            "He squeezed through the narrow space."
        ]
    },
{
        korean: "가까운",
        english: "Near",
        pronunciation: "[nɪr]",
        examples: [
            "She lives near the park.",
            "He parked his car near the entrance.",
            "They stayed near the beach."
        ]
    },
    {
        korean: "목",
        english: "Neck",
        pronunciation: "[nɛk]",
        examples: [
            "She wore a scarf around her neck.",
            "He hurt his neck while playing sports.",
            "They saw a necklace on her neck."
        ]
    },
    {
        korean: "필요하다",
        english: "Need",
        pronunciation: "[nid]",
        examples: [
            "She needs help with her homework.",
            "He needs to buy groceries.",
            "They need more time to finish the project."
        ]
    },
    {
        korean: "결코 ~않다",
        english: "Never",
        pronunciation: "[ˈnɛvər]",
        examples: [
            "She never misses a class.",
            "He never forgets a birthday.",
            "They never give up."
        ]
    },
    {
        korean: "새로운",
        english: "New",
        pronunciation: "[nu]",
        examples: [
            "She bought a new dress.",
            "He started a new job.",
            "They moved into a new house."
        ]
    },
    {
        korean: "뉴스",
        english: "News",
        pronunciation: "[nuz]",
        examples: [
            "She reads the news every morning.",
            "He watches the news on TV.",
            "They discussed the latest news."
        ]
    },
    {
        korean: "다음의",
        english: "Next",
        pronunciation: "[nɛkst]",
        examples: [
            "She will arrive next week.",
            "He is the next in line.",
            "They plan to visit next year."
        ]
    },
    {
        korean: "좋은",
        english: "Nice",
        pronunciation: "[naɪs]",
        examples: [
            "She has a nice smile.",
            "He lives in a nice neighborhood.",
            "They had a nice time."
        ]
    },
    {
        korean: "밤",
        english: "Night",
        pronunciation: "[naɪt]",
        examples: [
            "She works at night.",
            "He goes to bed early at night.",
            "They had a party last night."
        ]
    },
    {
        korean: "아니다, 없다",
        english: "No",
        pronunciation: "[noʊ]",
        examples: [
            "She said no to the offer.",
            "He has no time to waste.",
            "They found no evidence."
        ]
    },
    {
        korean: "소음",
        english: "Noise",
        pronunciation: "[nɔɪz]",
        examples: [
            "She heard a loud noise.",
            "He complained about the noise.",
            "They couldn't sleep because of the noise."
        ]
    },
    {
        korean: "북쪽",
        english: "North",
        pronunciation: "[nɔrθ]",
        examples: [
            "She traveled to the north.",
            "He lives in the north part of the city.",
            "They are planning a trip to North America."
        ]
    },
    {
        korean: "코",
        english: "Nose",
        pronunciation: "[noʊz]",
        examples: [
            "She has a cold and her nose is runny.",
            "He broke his nose while playing.",
            "They saw a ring on her nose."
        ]
    },
    {
        korean: "아니다",
        english: "Not",
        pronunciation: "[nɑt]",
        examples: [
            "She is not feeling well.",
            "He did not attend the meeting.",
            "They are not going on vacation."
        ]
    },
    {
        korean: "공책",
        english: "Note",
        pronunciation: "[noʊt]",
        examples: [
            "She wrote a note to her friend.",
            "He keeps a note of important dates.",
            "They found a note on the desk."
        ]
    },
    {
        korean: "지금",
        english: "Now",
        pronunciation: "[naʊ]",
        examples: [
            "She is busy right now.",
            "He needs to leave now.",
            "They are watching a movie now."
        ]
    },
    {
        korean: "숫자",
        english: "Number",
        pronunciation: "[ˈnʌmbər]",
        examples: [
            "She dialed the wrong number.",
            "He memorized the phone number.",
            "They counted the number of guests."
        ]
    },
    {
        korean: "간호원",
        english: "Nurse",
        pronunciation: "[nɜrs]",
        examples: [
            "She is a nurse at the hospital.",
            "He talked to the nurse about his symptoms.",
            "They hired a nurse for home care."
        ]
    },
    {
        korean: "~시 정각",
        english: "O'clock",
        pronunciation: "[əˈklɑk]",
        examples: [
            "She will arrive at six o'clock.",
            "He wakes up at seven o'clock.",
            "They have a meeting at nine o'clock."
        ]
    },
    {
        korean: "~의",
        english: "Of",
        pronunciation: "[ʌv]",
        examples: [
            "She is a friend of mine.",
            "He is the captain of the team.",
            "They are members of the club."
        ]
    },
    {
        korean: "떨어진, 끄다",
        english: "Off",
        pronunciation: "[ɔf]",
        examples: [
            "She turned off the light.",
            "He jumped off the bus.",
            "They are taking the day off."
        ]
    },
    {
        korean: "사무실",
        english: "Office",
        pronunciation: "[ˈɔfəs]",
        examples: [
            "She works in an office.",
            "He decorated his office.",
            "They are meeting at the office."
        ]
    },
    {
        korean: "흔히, 종종",
        english: "Often",
        pronunciation: "[ˈɔfən]",
        examples: [
            "She visits her grandmother often.",
            "He often goes to the gym.",
            "They often travel together."
        ]
    },
    {
        korean: "오!",
        english: "Oh",
        pronunciation: "[oʊ]",
        examples: [
            "She said, 'Oh, I see.'",
            "He exclaimed, 'Oh no!'",
            "They shouted, 'Oh, that's amazing!'"
        ]
    },
    {
        korean: "기름",
        english: "Oil",
        pronunciation: "[ɔɪl]",
        examples: [
            "She cooks with olive oil.",
            "He changed the car's oil.",
            "They discovered oil in the field."
        ]
    },
    {
        korean: "좋아",
        english: "Okay (ok)",
        pronunciation: "[oʊˈkeɪ]",
        examples: [
            "She said, 'Okay, I'll do it.'",
            "He feels okay after the check-up.",
            "They replied, 'Okay, see you soon.'"
        ]
    },
    {
        korean: "늙은",
        english: "Old",
        pronunciation: "[oʊld]",
        examples: [
            "She found an old photo.",
            "He is visiting his old friends.",
            "They live in an old house."
        ]
    },
    {
        korean: "~위에",
        english: "On",
        pronunciation: "[ɑn]",
        examples: [
            "She put the book on the table.",
            "He is on the phone.",
            "They are on the way home."
        ]
    },
    {
        korean: "한번",
        english: "Once",
        pronunciation: "[wʌns]",
        examples: [
            "She goes to the gym once a week.",
            "He tried the recipe once.",
            "They visited the place once before."
        ]
    },
    {
        korean: "오직",
        english: "Only",
        pronunciation: "[ˈoʊnli]",
        examples: [
            "She is the only child.",
            "He brought only one book.",
            "They only have a few minutes left."
        ]
    },
    {
        korean: "열린",
        english: "Open",
        pronunciation: "[ˈoʊpən]",
        examples: [
            "She left the door open.",
            "He opened the window.",
            "They are open to new ideas."
        ]
    },
    {
        korean: "또는",
        english: "Or",
        pronunciation: "[ɔr]",
        examples: [
            "She will have tea or coffee.",
            "He asked if she wanted to walk or drive.",
            "They are not sure if it's true or false."
        ]
    },
    {
        korean: "오렌지",
        english: "Orange",
        pronunciation: "[ˈɔrɪndʒ]",
        examples: [
            "She drank a glass of orange juice.",
            "He bought some oranges.",
            "They painted the wall orange."
        ]
    },
    {
        korean: "그 밖의",
        english: "Other",
        pronunciation: "[ˈʌðər]",
        examples: [
            "She has other plans.",
            "He met some other people.",
            "They looked for other options."
        ]
    },
    {
        korean: "밖에",
        english: "Out",
        pronunciation: "[aʊt]",
        examples: [
            "She went out to play.",
            "He looked out the window.",
            "They are out of town."
        ]
    },
    {
        korean: "~위쪽에",
        english: "Over",
        pronunciation: "[ˈoʊvər]",
        examples: [
            "She hung the picture over the fireplace.",
            "He looked over the report.",
            "They jumped over the fence."
        ]
    },
    {
        korean: "쪽",
        english: "Page",
        pronunciation: "[peɪdʒ]",
        examples: [
            "She read the first page of the book.",
            "He wrote a note on the last page.",
            "They bookmarked the page."
        ]
    },
    {
        korean: "칠하다",
        english: "Paint",
        pronunciation: "[peɪnt]",
        examples: [
            "She likes to paint landscapes.",
            "He painted the fence blue.",
            "They are painting the house."
        ]
    },
    {
        korean: "짝",
        english: "Pair",
        pronunciation: "[pɛr]",
        examples: [
            "She bought a new pair of shoes.",
            "He found a matching pair of socks.",
            "They are a perfect pair."
        ]
    },
    {
        korean: "바지",
        english: "Pants",
        pronunciation: "[pænts]",
        examples: [
            "She wore a pair of jeans.",
            "He bought new pants for work.",
            "They are selling designer pants."
        ]
    },
    {
        korean: "종이",
        english: "Paper",
        pronunciation: "[ˈpeɪpər]",
        examples: [
            "She wrote a letter on paper.",
            "He recycled the paper.",
            "They printed the document on paper."
        ]
    },
    {
        korean: "용서하다",
        english: "Pardon",
        pronunciation: "[ˈpɑrdən]",
        examples: [
            "She asked for a pardon.",
            "He was granted a pardon.",
            "They pardoned his mistake."
        ]
    },
    {
        korean: "부모",
        english: "Parent",
        pronunciation: "[ˈpɛrənt]",
        examples: [
            "She is a loving parent.",
            "He helps his parents on weekends.",
            "They are meeting the new parents."
        ]
    },
    {
        korean: "공원",
        english: "Park",
        pronunciation: "[pɑrk]",
        examples: [
            "She took a walk in the park.",
            "He played soccer at the park.",
            "They had a picnic in the park."
        ]
    },
    {
        korean: "파티",
        english: "Party",
        pronunciation: "[ˈpɑrti]",
        examples: [
            "She invited friends to her birthday party.",
            "He enjoyed the party last night.",
            "They are planning a big party."
        ]
    },
    {
        korean: "통과하다",
        english: "Pass",
        pronunciation: "[pæs]",
        examples: [
            "She passed the test.",
            "He passed the ball to his teammate.",
            "They passed each other on the street."
        ]
    },
    {
        korean: "지불하다",
        english: "Pay",
        pronunciation: "[peɪ]",
        examples: [
            "She needs to pay the bills.",
            "He paid for the meal.",
            "They will pay you tomorrow."
        ]
    },
    {
        korean: "평화",
        english: "Peace",
        pronunciation: "[pis]",
        examples: [
            "She enjoys the peace and quiet.",
            "He hopes for world peace.",
            "They made a peace agreement."
        ]
    },
    {
        korean: "배",
        english: "Pear",
        pronunciation: "[pɛr]",
        examples: [
            "She ate a ripe pear.",
            "He picked a pear from the tree.",
            "They bought some pears at the market."
        ]
    },
    {
        korean: "펜, 만년필",
        english: "Pen",
        pronunciation: "[pɛn]",
        examples: [
            "She wrote with a blue pen.",
            "He lost his pen at school.",
            "They gave him a pen as a gift."
        ]
    },
    {
        korean: "연필",
        english: "Pencil",
        pronunciation: "[ˈpɛnsəl]",
        examples: [
            "She sharpened her pencil.",
            "He drew a picture with a pencil.",
            "They found a pencil on the floor."
        ]
    },
    {
        korean: "사람",
        english: "People",
        pronunciation: "[ˈpipəl]",
        examples: [
            "She likes meeting new people.",
            "He saw many people at the concert.",
            "They are kind to other people."
        ]
    },
    {
        korean: "피아노",
        english: "Piano",
        pronunciation: "[piˈænoʊ]",
        examples: [
            "She plays the piano beautifully.",
            "He takes piano lessons.",
            "They bought a grand piano."
        ]
    },
    {
        korean: "따다, 골라내다",
        english: "Pick",
        pronunciation: "[pɪk]",
        examples: [
            "She picked a flower from the garden.",
            "He picked up the book from the table.",
            "They picked their favorite movie to watch."
        ]
    },
    {
        korean: "소풍",
        english: "Picnic",
        pronunciation: "[ˈpɪknɪk]",
        examples: [
            "She packed a lunch for the picnic.",
            "He enjoyed the picnic by the lake.",
            "They had a family picnic in the park."
        ]
    },
    {
        korean: "그림",
        english: "Picture",
        pronunciation: "[ˈpɪkʧər]",
        examples: [
            "She took a picture of the sunset.",
            "He painted a beautiful picture.",
            "They looked at old pictures together."
        ]
    },
    {
        korean: "조각",
        english: "Piece",
        pronunciation: "[pis]",
        examples: [
            "She ate a piece of cake.",
            "He found a missing piece of the puzzle.",
            "They shared a piece of chocolate."
        ]
    },
    {
        korean: "돼지",
        english: "Pig",
        pronunciation: "[pɪɡ]",
        examples: [
            "She saw a pig at the farm.",
            "He read a story about three little pigs.",
            "They fed the pig some apples."
        ]
    },
    {
        korean: "조종사",
        english: "Pilot",
        pronunciation: "[ˈpaɪlət]",
        examples: [
            "She wants to become a pilot.",
            "He met a pilot at the airport.",
            "They watched a documentary about pilots."
        ]
    },
    {
        korean: "핀",
        english: "Pin",
        pronunciation: "[pɪn]",
        examples: [
            "She used a pin to hold her dress.",
            "He found a safety pin.",
            "They pinned the note to the board."
        ]
    },
    {
        korean: "소나무",
        english: "Pine",
        pronunciation: "[paɪn]",
        examples: [
            "She decorated a pine tree for Christmas.",
            "He loves the smell of pine.",
            "They planted a pine in the yard."
        ]
    },
    {
        korean: "분홍",
        english: "Pink",
        pronunciation: "[pɪŋk]",
        examples: [
            "She wore a pink dress.",
            "He painted the room pink.",
            "They bought pink flowers."
        ]
    },
    {
        korean: "파이프, 판",
        english: "Pipe",
        pronunciation: "[paɪp]",
        examples: [
            "She fixed the leaky pipe.",
            "He smoked a pipe.",
            "They installed a new water pipe."
        ]
    },
    {
        korean: "장소",
        english: "Place",
        pronunciation: "[pleɪs]",
        examples: [
            "She found a quiet place to read.",
            "He reserved a place for dinner.",
            "They visited a new place every weekend."
        ]
    },
    {
        korean: "계획",
        english: "Plan",
        pronunciation: "[plæn]",
        examples: [
            "She made a plan for the weekend.",
            "He plans to travel next year.",
            "They discussed their future plans."
        ]
    },
    {
        korean: "비행기",
        english: "Plane",
        pronunciation: "[pleɪn]",
        examples: [
            "She took a plane to New York.",
            "He enjoys watching planes take off.",
            "They missed their plane."
        ]
    },
    {
        korean: "식물",
        english: "Plant",
        pronunciation: "[plænt]",
        examples: [
            "She waters her plants daily.",
            "He bought a new plant for the office.",
            "They planted flowers in the garden."
        ]
    },
    {
        korean: "놀다",
        english: "Play",
        pronunciation: "[pleɪ]",
        examples: [
            "She likes to play tennis.",
            "He played a song on the guitar.",
            "They play together every weekend."
        ]
    },
    {
        korean: "기쁘게 하다, 제발",
        english: "Please",
        pronunciation: "[pliz]",
        examples: [
            "She said, 'Please help me.'",
            "He asked her to please sit down.",
            "They were pleased with the results."
        ]
    },
    {
        korean: "주머니",
        english: "Pocket",
        pronunciation: "[ˈpɑkɪt]",
        examples: [
            "She put her keys in her pocket.",
            "He found a coin in his pocket.",
            "They have pockets full of candy."
        ]
    },
    {
        korean: "점수, 요점",
        english: "Point",
        pronunciation: "[pɔɪnt]",
        examples: [
            "She made a good point.",
            "He pointed at the map.",
            "They scored the winning point."
        ]
    },
    {
        korean: "경찰",
        english: "Police",
        pronunciation: "[pəˈlis]",
        examples: [
            "She called the police.",
            "He saw a police car.",
            "They reported the crime to the police."
        ]
    },
    {
        korean: "웅덩이",
        english: "Pool",
        pronunciation: "[pul]",
        examples: [
            "She swam in the pool.",
            "He cleaned the pool.",
            "They played pool at the bar."
        ]
    },
    {
        korean: "가난한",
        english: "Poor",
        pronunciation: "[pʊr]",
        examples: [
            "She feels poor after paying bills.",
            "He donated to help the poor.",
            "They are working to help poor families."
        ]
    },
    {
        korean: "기둥, 우편",
        english: "Post",
        pronunciation: "[poʊst]",
        examples: [
            "She posted a letter.",
            "He leaned against the post.",
            "They read the post on the blog."
        ]
    },
    {
        korean: "포스터",
        english: "Poster",
        pronunciation: "[ˈpoʊstər]",
        examples: [
            "She hung a poster on the wall.",
            "He designed a poster for the event.",
            "They saw a movie poster."
        ]
    },
    {
        korean: "감자",
        english: "Potato",
        pronunciation: "[pəˈteɪtoʊ]",
        examples: [
            "She baked a potato.",
            "He made mashed potatoes.",
            "They harvested potatoes from the garden."
        ]
    },
    {
        korean: "연습, 습관",
        english: "Practice",
        pronunciation: "[ˈpræktɪs]",
        examples: [
            "She practices the piano every day.",
            "He has a practice session at 5 PM.",
            "They believe that practice makes perfect."
        ]
    },
    {
        korean: "현재, 선물",
        english: "Present",
        pronunciation: "[ˈprɛzənt]",
        examples: [
            "She received a present.",
            "He is present at the meeting.",
            "They are living in the present."
        ]
    },
    {
        korean: "예쁜",
        english: "Pretty",
        pronunciation: "[ˈprɪti]",
        examples: [
            "She has a pretty smile.",
            "He thinks the flowers are pretty.",
            "They live in a pretty house."
        ]
    },
    {
        korean: "인쇄하다",
        english: "Print",
        pronunciation: "[prɪnt]",
        examples: [
            "She printed the document.",
            "He works at a print shop.",
            "They saw their picture in print."
        ]
    },
    {
        korean: "문제",
        english: "Problem",
        pronunciation: "[ˈprɑbləm]",
        examples: [
            "She solved the math problem.",
            "He has a problem with his car.",
            "They discussed the problem together."
        ]
    },
    {
        korean: "끌다",
        english: "Pull",
        pronunciation: "[pʊl]",
        examples: [
            "She pulled the door open.",
            "He pulled a muscle during the game.",
            "They pulled the rope together."
        ]
    },
    {
        korean: "밀다",
        english: "Push",
        pronunciation: "[pʊʃ]",
        examples: [
            "She pushed the shopping cart.",
            "He pushed the door closed.",
            "They pushed the car up the hill."
        ]
    },
    {
        korean: "놓다",
        english: "Put",
        pronunciation: "[pʊt]",
        examples: [
            "She put the book on the table.",
            "He put on his coat.",
            "They put away their toys."
        ]
    },
    {
        korean: "여왕",
        english: "Queen",
        pronunciation: "[kwin]",
        examples: [
            "She dressed as a queen for Halloween.",
            "He read about the queen in history class.",
            "They watched a movie about a queen."
        ]
    },
    {
        korean: "질문",
        english: "Question",
        pronunciation: "[ˈkwɛsʧən]",
        examples: [
            "She asked a question.",
            "He answered the question correctly.",
            "They had a question about the project."
        ]
    },
    {
        korean: "빠른",
        english: "Quick",
        pronunciation: "[kwɪk]",
        examples: [
            "She gave a quick response.",
            "He took a quick shower.",
            "They had a quick meeting."
        ]
    },
    {
        korean: "조용한",
        english: "Quiet",
        pronunciation: "[ˈkwaɪət]",
        examples: [
            "She enjoys the quiet mornings.",
            "He asked them to be quiet.",
            "They found a quiet place to study."
        ]
    },
    {
        korean: "라디오",
        english: "Radio",
        pronunciation: "[ˈreɪdiˌoʊ]",
        examples: [
            "She listens to the radio every morning.",
            "He bought a new radio.",
            "They heard the news on the radio."
        ]
    },
    {
        korean: "비",
        english: "Rain",
        pronunciation: "[reɪn]",
        examples: [
            "She loves the sound of rain.",
            "He got caught in the rain.",
            "They canceled the event due to rain."
        ]
    },
    {
        korean: "무지개",
        english: "Rainbow",
        pronunciation: "[ˈreɪnˌboʊ]",
        examples: [
            "She saw a rainbow after the storm.",
            "He painted a picture of a rainbow.",
            "They took a photo of the rainbow."
        ]
    },
    {
        korean: "읽다",
        english: "Read",
        pronunciation: "[rid]",
        examples: [
            "She likes to read books.",
            "He read the article online.",
            "They read a story to the children."
        ]
    },
    {
        korean: "준비가 된",
        english: "Ready",
        pronunciation: "[ˈrɛdi]",
        examples: [
            "She is ready for the trip.",
            "He got ready for work.",
            "They are ready to start the meeting."
        ]
    },
    {
        korean: "실제하는",
        english: "Real",
        pronunciation: "[ril]",
        examples: [
            "She saw a real panda at the zoo.",
            "He couldn't believe it was real.",
            "They are discussing real issues."
        ]
    },
    {
        korean: "기록하다",
        english: "Record",
        pronunciation: "[ˈrɛkərd]",
        examples: [
            "She broke the record.",
            "He recorded the meeting.",
            "They keep a record of their expenses."
        ]
    },
    {
        korean: "빨강",
        english: "Red",
        pronunciation: "[rɛd]",
        examples: [
            "She wore a red dress.",
            "He painted the door red.",
            "They bought a red car."
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