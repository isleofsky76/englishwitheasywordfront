const words = [
    { korean: "일어나다", english: "wake up", pronunciation: "[weɪk ʌp]" },
    { korean: "양치하다", english: "brush teeth", pronunciation: "[brʌʃ tiːθ]" },
    { korean: "샤워하다", english: "take a shower", pronunciation: "[teɪk ə ˈʃaʊər]" },
    { korean: "아침 먹다", english: "eat breakfast", pronunciation: "[iːt ˈbrɛkfəst]" },
    { korean: "출근하다", english: "go to work", pronunciation: "[ɡoʊ tu wɜrk]" },
    { korean: "점심 먹다", english: "have lunch", pronunciation: "[hæv lʌntʃ]" },
    { korean: "퇴근하다", english: "finish work", pronunciation: "[ˈfɪnɪʃ wɜrk]" },
    { korean: "저녁 먹다", english: "have dinner", pronunciation: "[hæv ˈdɪnər]" },
    { korean: "텔레비전 보다", english: "watch TV", pronunciation: "[wɑtʃ ˌtiːˈviː]" },
    { korean: "책 읽다", english: "read a book", pronunciation: "[riːd ə bʊk]" },
    { korean: "운동하다", english: "exercise", pronunciation: "[ˈɛksərˌsaɪz]" },
    { korean: "잠자리에 들다", english: "go to bed", pronunciation: "[ɡoʊ tu bɛd]" },
    { korean: "통근하다", english: "commute", pronunciation: "[kəˈmjuːt]" },
    { korean: "공부하다", english: "study", pronunciation: "[ˈstʌdi]" },
    { korean: "집 청소하다", english: "clean the house", pronunciation: "[kliːn ðə haʊs]" },
    { korean: "빨래하다", english: "do laundry", pronunciation: "[du ˈlɔːndri]" },
    { korean: "저녁 요리하다", english: "cook dinner", pronunciation: "[kʊk ˈdɪnər]" },
    { korean: "개 산책시키다", english: "walk the dog", pronunciation: "[wɔk ðə dɔɡ]" },
    { korean: "고양이 밥 주다", english: "feed the cat", pronunciation: "[fiːd ðə kæt]" },
    { korean: "식물에 물 주다", english: "water the plants", pronunciation: "[ˈwɔːtər ðə plænts]" },
    { korean: "이메일 확인하다", english: "check email", pronunciation: "[ʧɛk ˈiːmeɪl]" },
    { korean: "달리기 하다", english: "go for a run", pronunciation: "[ɡoʊ fɔr ə rʌn]" },
    { korean: "쓰레기 버리다", english: "take out the trash", pronunciation: "[teɪk aʊt ðə træʃ]" },
    { korean: "침대 정리하다", english: "make the bed", pronunciation: "[meɪk ðə bɛd]" },
    { korean: "설거지하다", english: "wash dishes", pronunciation: "[wɑʃ ˈdɪʃəz]" },
    { korean: "바닥 청소기 돌리다", english: "vacuum the floor", pronunciation: "[ˈvækjuːm ðə flɔr]" },
    { korean: "옷 다림질하다", english: "iron clothes", pronunciation: "[ˈaɪərn kloʊðz]" },
    { korean: "점심 준비하다", english: "prepare lunch", pronunciation: "[prɪˈpɛr lʌntʃ]" },
    { korean: "점심 싸다", english: "pack lunch", pronunciation: "[pæk lʌntʃ]" },
    { korean: "회의에 참석하다", english: "attend a meeting", pronunciation: "[əˈtɛnd ə ˈmitɪŋ]" },
    { korean: "전화 받다", english: "answer phone calls", pronunciation: "[ˈænsər foʊn kɔlz]" },
    { korean: "보고서 작성하다", english: "write a report", pronunciation: "[raɪt ə rɪˈpɔrt]" },
    { korean: "이메일 보내다", english: "send an email", pronunciation: "[sɛnd ən ˈiːmeɪl]" },
    { korean: "식료품 사다", english: "pick up groceries", pronunciation: "[pɪk ʌp ˈɡroʊsəriz]" },
    { korean: "식료품 쇼핑하다", english: "go grocery shopping", pronunciation: "[ɡoʊ ˈɡroʊsəri ˈʃɑpɪŋ]" },
    { korean: "청구서 납부하다", english: "pay bills", pronunciation: "[peɪ bɪlz]" },
    { korean: "직장까지 걷다", english: "walk to work", pronunciation: "[wɔk tu wɜrk]" },
    { korean: "낮잠 자다", english: "take a nap", pronunciation: "[teɪk ə næp]" },
    { korean: "간식 먹다", english: "have a snack", pronunciation: "[hæv ə snæk]" },
    { korean: "인터넷 검색하다", english: "browse the internet", pronunciation: "[braʊz ði ˈɪntərˌnɛt]" },
    { korean: "음악 듣다", english: "listen to music", pronunciation: "[ˈlɪsən tu ˈmjuzɪk]" },
    { korean: "명상하다", english: "meditate", pronunciation: "[ˈmɛdəˌteɪt]" },
    { korean: "요가하다", english: "do yoga", pronunciation: "[du ˈjoʊɡə]" },
    { korean: "스트레칭하다", english: "stretch", pronunciation: "[strɛʧ]" },
    { korean: "휴식하다", english: "take a break", pronunciation: "[teɪk ə breɪk]" },
    { korean: "친구에게 전화하다", english: "call a friend", pronunciation: "[kɔl ə frɛnd]" },
    { korean: "문자 보내다", english: "text someone", pronunciation: "[tɛkst ˈsʌmwʌn]" },
    { korean: "게임하다", english: "play a game", pronunciation: "[pleɪ ə ɡeɪm]" },
    { korean: "차 세차하다", english: "wash the car", pronunciation: "[wɑʃ ðə kɑr]" },
    { korean: "잔디 깎다", english: "mow the lawn", pronunciation: "[moʊ ðə lɔn]" },
    { korean: "낙엽을 긁다", english: "rake leaves", pronunciation: "[reɪk livz]" },
    { korean: "눈 치우다", english: "shovel snow", pronunciation: "[ˈʃʌvəl snoʊ]" },
    { korean: "산책하다", english: "go for a walk", pronunciation: "[ɡoʊ fɔr ə wɔk]" },
    { korean: "자전거 타다", english: "ride a bike", pronunciation: "[raɪd ə baɪk]" },
    { korean: "친구를 방문하다", english: "visit a friend", pronunciation: "[ˈvɪzɪt ə frɛnd]" },
    { korean: "체육관에 가다", english: "go to the gym", pronunciation: "[ɡoʊ tu ðə ʤɪm]" },
    { korean: "목욕하다", english: "take a bath", pronunciation: "[teɪk ə bæθ]" },
    { korean: "머리 빗다", english: "brush hair", pronunciation: "[brʌʃ hɛr]" },
    { korean: "면도하다", english: "shave", pronunciation: "[ʃeɪv]" },
    { korean: "화장하다", english: "put on makeup", pronunciation: "[pʊt ɒn ˈmeɪkʌp]" },
    { korean: "옷 입다", english: "get dressed", pronunciation: "[ɡɛt drɛst]" },
    { korean: "옷 벗다", english: "get undressed", pronunciation: "[ɡɛt ʌnˈdrɛst]" },
    { korean: "숙제하다", english: "do homework", pronunciation: "[du ˈhoʊmˌwɜrk]" },
    { korean: "아침 준비하다", english: "prepare breakfast", pronunciation: "[prɪˈpɛr ˈbrɛkfəst]" },
    { korean: "정리정돈하다", english: "tidy up", pronunciation: "[ˈtaɪdi ʌp]" },
    { korean: "식탁 차리다", english: "set the table", pronunciation: "[sɛt ðə ˈteɪbəl]" },
    { korean: "식탁 치우다", english: "clear the table", pronunciation: "[klɪr ðə ˈteɪbəl]" },
    { korean: "가구 먼지 털다", english: "dust the furniture", pronunciation: "[dʌst ðə ˈfɜrnɪtʃər]" },
    { korean: "바닥 쓸다", english: "sweep the floor", pronunciation: "[swip ðə flɔr]" },
    { korean: "바닥 닦다", english: "mop the floor", pronunciation: "[mɑp ðə flɔr]" },
    { korean: "옷장 정리하다", english: "organize the closet", pronunciation: "[ˈɔrgəˌnaɪz ðə ˈklɑzɪt]" },
    { korean: "빨래 개다", english: "fold laundry", pronunciation: "[foʊld ˈlɔndri]" },
    { korean: "옷 걸다", english: "hang up clothes", pronunciation: "[hæŋ ʌp kloʊðz]" },
    { korean: "정원에 물 주다", english: "water the garden", pronunciation: "[ˈwɔtər ðə ˈɡɑrdən]" },
    { korean: "물고기 먹이 주다", english: "feed the fish", pronunciation: "[fid ðə fɪʃ]" },
    { korean: "학교 가다", english: "go to school", pronunciation: "[ɡoʊ tu skul]" },
    { korean: "출근하다", english: "leave for work", pronunciation: "[liv fɔr wɜrk]" },
    { korean: "버스 타다", english: "catch the bus", pronunciation: "[kæʧ ðə bʌs]" },
    { korean: "기차 타다", english: "take the train", pronunciation: "[teɪk ðə treɪn]" },
    { korean: "운전해서 출근하다", english: "drive to work", pronunciation: "[draɪv tu wɜrk]" },
    { korean: "차 주차하다", english: "park the car", pronunciation: "[pɑrk ðə kɑr]" },
    { korean: "식료품 사다", english: "buy groceries", pronunciation: "[baɪ ˈɡroʊsəriz]" },
    { korean: "아이들 데리러 가다", english: "pick up the kids", pronunciation: "[pɪk ʌp ðə kɪdz]" },
    { korean: "아이들 내려주다", english: "drop off the kids", pronunciation: "[drɑp ɔf ðə kɪdz]" },
    { korean: "커피 마시다", english: "have coffee", pronunciation: "[hæv ˈkɔfi]" },
    { korean: "물 마시다", english: "drink water", pronunciation: "[drɪŋk ˈwɔtər]" },
    { korean: "저녁 먹다", english: "eat dinner", pronunciation: "[it ˈdɪnər]" },
    { korean: "비타민 먹다", english: "take vitamins", pronunciation: "[teɪk ˈvaɪtəmɪnz]" },
    { korean: "신문 읽다", english: "read the newspaper", pronunciation: "[rid ðə ˈnuˌzpeɪpər]" },
    { korean: "뉴스 확인하다", english: "check the news", pronunciation: "[ʧɛk ðə nuz]" },
    { korean: "하루 계획하다", english: "plan the day", pronunciation: "[plæn ðə deɪ]" },
    { korean: "일기 쓰다", english: "write in a journal", pronunciation: "[raɪt ɪn ə ˈʤɜrnəl]" },
    { korean: "프로젝트 작업하다", english: "work on a project", pronunciation: "[wɜrk ɑn ə ˈprɑʤɛkt]" },
    { korean: "수업에 참석하다", english: "attend a class", pronunciation: "[əˈtɛnd ə klæs]" },
    { korean: "시험 공부하다", english: "study for a test", pronunciation: "[ˈstʌdi fɔr ə tɛst]" },
    { korean: "노트 복습하다", english: "review notes", pronunciation: "[rɪˈvju noʊts]" },
    { korean: "취미 활동하다", english: "practice a hobby", pronunciation: "[ˈpræktɪs ə ˈhɑbi]" },
    { korean: "바느질하다", english: "sew", pronunciation: "[soʊ]" },
    { korean: "뜨개질하다", english: "knit", pronunciation: "[nɪt]" },
    { korean: "그림 그리다", english: "paint", pronunciation: "[peɪnt]" },
    { korean: "그리다", english: "draw", pronunciation: "[drɔ]" },
    { korean: "쓰기", english: "write", pronunciation: "[raɪt]" },
    { korean: "읽기", english: "read", pronunciation: "[rid]" },
    { korean: "악기 연주하다", english: "play an instrument", pronunciation: "[pleɪ ən ˈɪnstrəmənt]" },
    { korean: "영화 보다", english: "watch a movie", pronunciation: "[wɑʧ ə ˈmuvi]" },
    { korean: "영화관에 가다", english: "go to the movies", pronunciation: "[ɡoʊ tu ðə ˈmuviz]" },
    { korean: "박물관을 방문하다", english: "visit a museum", pronunciation: "[ˈvɪzɪt ə mjuˈziəm]" },
    { korean: "콘서트에 참석하다", english: "attend a concert", pronunciation: "[əˈtɛnd ə ˈkɑnsɜrt]" },
    { korean: "레스토랑에 가다", english: "go to a restaurant", pronunciation: "[ɡoʊ tu ə ˈrɛstərɑnt]" },
    { korean: "음식 요리하다", english: "cook a meal", pronunciation: "[kʊk ə mil]" },
    { korean: "쿠키 굽다", english: "bake cookies", pronunciation: "[beɪk ˈkʊkiz]" },
    { korean: "커피 만들다", english: "make coffee", pronunciation: "[meɪk ˈkɔfi]" },
    { korean: "차 끓이다", english: "brew tea", pronunciation: "[bru ti]" },
    { korean: "아기에게 먹이다", english: "feed a baby", pronunciation: "[fid ə ˈbeɪbi]" },
    { korean: "기저귀 갈다", english: "change a diaper", pronunciation: "[ʧeɪndʒ ə ˈdaɪpər]" },
    { korean: "아기 목욕시키다", english: "bathe a baby", pronunciation: "[beɪð ə ˈbeɪbi]" },
    { korean: "이야기 읽다", english: "read a story", pronunciation: "[rid ə ˈstɔri]" },
    { korean: "아기 재우다", english: "put a baby to bed", pronunciation: "[pʊt ə ˈbeɪbi tu bɛd]" },
    { korean: "자장가 부르다", english: "sing a lullaby", pronunciation: "[sɪŋ ə ˈlʌləˌbaɪ]" },
    { korean: "우는 아기를 달래다", english: "comfort a crying baby", pronunciation: "[ˈkʌmfərt ə ˈkraɪɪŋ ˈbeɪbi]" },
    { korean: "아기를 흔들다", english: "rock a baby", pronunciation: "[rɑk ə ˈbeɪbi]" },
    { korean: "아이와 놀다", english: "play with a child", pronunciation: "[pleɪ wɪð ə ʧaɪld]" },
    { korean: "아이를 가르치다", english: "teach a child", pronunciation: "[tiʧ ə ʧaɪld]" },
    { korean: "숙제를 도와주다", english: "help with homework", pronunciation: "[hɛlp wɪð ˈhoʊmˌwɜrk]" },
    { korean: "잠자리 준비하다", english: "prepare for bed", pronunciation: "[prɪˈpɛr fɔr bɛd]" },
    { korean: "잘 자라고 말하다", english: "say goodnight", pronunciation: "[seɪ ɡʊdˈnaɪt]" },
    { korean: "불 끄다", english: "turn off the lights", pronunciation: "[tɜrn ɔf ðə laɪts]" },
    { korean: "문 잠그다", english: "lock the door", pronunciation: "[lɑk ðə dɔr]" },
    { korean: "알람 설정하다", english: "set an alarm", pronunciation: "[sɛt ən əˈlɑrm]" },
    { korean: "알람 켜다", english: "turn on the alarm", pronunciation: "[tɜrn ɑn ði əˈlɑrm]" },
    { korean: "소셜 미디어 확인하다", english: "check social media", pronunciation: "[ʧɛk ˈsoʊʃəl ˈmidiə]" },
    { korean: "소셜 미디어 업데이트하다", english: "update social media", pronunciation: "[ʌpˈdeɪt ˈsoʊʃəl ˈmidiə]" },
    { korean: "사진 올리다", english: "post a photo", pronunciation: "[poʊst ə ˈfoʊtoʊ]" },
    { korean: "게시물 좋아요 누르다", english: "like a post", pronunciation: "[laɪk ə poʊst]" },
    { korean: "게시물에 댓글 달다", english: "comment on a post", pronunciation: "[ˈkɑmɛnt ɑn ə poʊst]" },
    { korean: "게시물 공유하다", english: "share a post", pronunciation: "[ʃɛr ə poʊst]" },
    { korean: "누군가를 팔로우하다", english: "follow someone", pronunciation: "[ˈfɑloʊ ˈsʌmwʌn]" },
    { korean: "누군가를 언팔로우하다", english: "unfollow someone", pronunciation: "[ənˈfɑloʊ ˈsʌmwʌn]" },
    { korean: "사진을 둘러보다", english: "browse photos", pronunciation: "[braʊz ˈfoʊtoʊz]" },
    { korean: "비디오를 보다", english: "watch videos", pronunciation: "[wɑʧ ˈvɪdioʊz]" },
    { korean: "그룹에 가입하다", english: "join a group", pronunciation: "[ʤɔɪn ə ɡrup]" },
    { korean: "그룹을 만들다", english: "create a group", pronunciation: "[kriˈeɪt ə ɡrup]" },
    { korean: "메시지 보내다", english: "send a message", pronunciation: "[sɛnd ə ˈmɛsɪdʒ]" },
    { korean: "메시지에 답장하다", english: "reply to a message", pronunciation: "[rɪˈplaɪ tu ə ˈmɛsɪdʒ]" },
    { korean: "메시지 삭제하다", english: "delete a message", pronunciation: "[dɪˈlit ə ˈmɛsɪdʒ]" },
    { korean: "누군가를 차단하다", english: "block someone", pronunciation: "[blɑk ˈsʌmwʌn]" },
    { korean: "누군가를 차단 해제하다", english: "unblock someone", pronunciation: "[ənˈblɑk ˈsʌmwʌn]" },
    { korean: "알림 읽다", english: "read notifications", pronunciation: "[rid ˌnoʊtɪfɪˈkeɪʃənz]" },
    { korean: "알림 삭제하다", english: "clear notifications", pronunciation: "[klɪr ˌnoʊtɪfɪˈkeɪʃənz]" },
    { korean: "달력 확인하다", english: "check calendar", pronunciation: "[ʧɛk ˈkæləndər]" },
    { korean: "약속을 잡다", english: "schedule an appointment", pronunciation: "[ˈskɛʤʊl ən əˈpɔɪntmənt]" },
    { korean: "약속을 변경하다", english: "reschedule an appointment", pronunciation: "[riˈskɛʤʊl ən əˈpɔɪntmənt]" },
    { korean: "약속을 취소하다", english: "cancel an appointment", pronunciation: "[ˈkænsəl ən əˈpɔɪntmənt]" },
    { korean: "행사에 참석하다", english: "attend an event", pronunciation: "[əˈtɛnd ən ɪˈvɛnt]" },
    { korean: "행사를 주최하다", english: "host an event", pronunciation: "[hoʊst ən ɪˈvɛnt]" },
    { korean: "친구를 초대하다", english: "invite friends", pronunciation: "[ɪnˈvaɪt frɛndz]" },
    { korean: "행사에 응답하다", english: "RSVP to an event", pronunciation: "[ˌɑrɛsˈviːpi tu ən ɪˈvɛnt]" },
    { korean: "온라인 쇼핑하다", english: "shop online", pronunciation: "[ʃɑp ˈɔnˌlaɪn]" },
    { korean: "장바구니에 항목 추가하다", english: "add items to cart", pronunciation: "[æd ˈaɪtəmz tu kɑrt]" },
    { korean: "결제하다", english: "checkout", pronunciation: "[ˈʧɛkˌaʊt]" },
    { korean: "배송 정보 입력하다", english: "enter shipping information", pronunciation: "[ˈɛntər ˈʃɪpɪŋ ˌɪnfərˈmeɪʃən]" },
    { korean: "주문을 추적하다", english: "track an order", pronunciation: "[træk ən ˈɔrdər]" },
    { korean: "리뷰를 쓰다", english: "write a review", pronunciation: "[raɪt ə rɪˈvju]" },
    { korean: "상품을 반품하다", english: "return an item", pronunciation: "[rɪˈtɜrn ən ˈaɪtəm]" },
    { korean: "상품을 교환하다", english: "exchange an item", pronunciation: "[ɪksˈʧeɪndʒ ən ˈaɪtəm]" },
    { korean: "선물을 사다", english: "buy a gift", pronunciation: "[baɪ ə ɡɪft]" },
    { korean: "선물을 포장하다", english: "wrap a gift", pronunciation: "[ræp ə ɡɪft]" },
    { korean: "선물을 보내다", english: "send a gift", pronunciation: "[sɛnd ə ɡɪft]" },
    { korean: "선물을 받다", english: "receive a gift", pronunciation: "[rɪˈsiv ə ɡɪft]" },
    { korean: "감사 편지를 쓰다", english: "write a thank you note", pronunciation: "[raɪt ə θæŋk ju noʊt]" },
    { korean: "자선 단체에 기부하다", english: "donate to charity", pronunciation: "[ˈdoʊˌneɪt tu ˈʧærɪti]" },
    { korean: "자원봉사하다", english: "volunteer", pronunciation: "[ˌvɑlənˈtɪr]" },
    { korean: "차고 청소하다", english: "clean the garage", pronunciation: "[klin ðə ɡəˈrɑʒ]" },
    { korean: "다락방 정리하다", english: "organize the attic", pronunciation: "[ˈɔrgəˌnaɪz ði ˈætɪk]" },
    { korean: "집 정리하다", english: "declutter the house", pronunciation: "[diˈklʌtər ðə haʊs]" },
    { korean: "헌 옷 기부하다", english: "donate old clothes", pronunciation: "[ˈdoʊneɪt oʊld kloʊðz]" },
    { korean: "재활용하다", english: "recycle", pronunciation: "[riˈsaɪkəl]" },
    { korean: "퇴비화하다", english: "compost", pronunciation: "[ˈkɒmpɒst]" },
    { korean: "나무 심다", english: "plant a tree", pronunciation: "[plænt ə tri]" },
    { korean: "정원을 시작하다", english: "start a garden", pronunciation: "[stɑrt ə ˈɡɑrdən]" },
    { korean: "잔디에 물 주다", english: "water the lawn", pronunciation: "[ˈwɔtər ðə lɔn]" },
    { korean: "잔디에 비료 주다", english: "fertilize the lawn", pronunciation: "[ˈfɜrtəˌlaɪz ðə lɔn]" },
    { korean: "생울타리를 다듬다", english: "trim the hedges", pronunciation: "[trɪm ðə ˈhɛdʒɪz]" },
    { korean: "나무를 가지치기하다", english: "prune the trees", pronunciation: "[prun ðə triz]" },
    { korean: "채소를 수확하다", english: "harvest vegetables", pronunciation: "[ˈhɑrvəst ˈvɛdʒtəbəlz]" },
    { korean: "과일을 따다", english: "pick fruits", pronunciation: "[pɪk fruts]" },
    { korean: "정원을 갈퀴질하다", english: "rake the garden", pronunciation: "[reɪk ðə ˈɡɑrdən]" },
    { korean: "현관을 쓸다", english: "sweep the porch", pronunciation: "[swip ðə pɔrʧ]" },
    { korean: "창문을 닦다", english: "wash windows", pronunciation: "[wɑʃ ˈwɪndoʊz]" },
    { korean: "홈통을 청소하다", english: "clean the gutters", pronunciation: "[klin ðə ˈɡʌtərz]" },
    { korean: "울타리를 페인트칠하다", english: "paint the fence", pronunciation: "[peɪnt ðə fɛns]" },
    { korean: "데크를 착색하다", english: "stain the deck", pronunciation: "[steɪn ðə dɛk]" },
    { korean: "새는 수도꼭지를 고치다", english: "repair a leaky faucet", pronunciation: "[rɪˈpɛr ə ˈliki ˈfɔsɪt]" },
    { korean: "고장난 문을 고치다", english: "fix a broken door", pronunciation: "[fɪks ə ˈbroʊkən dɔr]" },
    { korean: "벽의 구멍을 메우다", english: "patch a hole in the wall", pronunciation: "[pæʧ ə hoʊl ɪn ðə wɔl]" },
    { korean: "새 조명 기구를 설치하다", english: "install a new light fixture", pronunciation: "[ɪnˈstɔl ə nu laɪt ˈfɪkʧər]" },
    { korean: "전구를 갈다", english: "change a light bulb", pronunciation: "[ʧeɪndʒ ə laɪt bʌlb]" },
    { korean: "라우터를 리셋하다", english: "reset the router", pronunciation: "[riˈsɛt ðə ˈraʊtər]" },
    { korean: "소프트웨어를 업그레이드하다", english: "upgrade the software", pronunciation: "[ˈʌpˌɡreɪd ðə ˈsɔftˌwɛr]" },
    { korean: "펌웨어를 업데이트하다", english: "update the firmware", pronunciation: "[ʌpˈdeɪt ðə ˈfɜrmˌwɛr]" },
    { korean: "문서를 스캔하다", english: "scan documents", pronunciation: "[skæn ˈdɒkjʊmənts]" },
    { korean: "문서를 인쇄하다", english: "print documents", pronunciation: "[prɪnt ˈdɒkjʊmənts]" },
    { korean: "팩스를 보내다", english: "send a fax", pronunciation: "[sɛnd ə fæks]" },
    { korean: "복사하다", english: "make photocopies", pronunciation: "[meɪk ˈfoʊtoʊˌkɑpiz]" },
    { korean: "문서를 파일하다", english: "file documents", pronunciation: "[faɪl ˈdɒkjʊmənts]" },
    { korean: "문서를 파쇄하다", english: "shred documents", pronunciation: "[ʃrɛd ˈdɒkjʊmənts]" },
    { korean: "데이터를 백업하다", english: "backup data", pronunciation: "[ˈbækˌʌp ˈdeɪtə]" },
    { korean: "데이터를 복원하다", english: "restore data", pronunciation: "[rɪˈstɔr ˈdeɪtə]" },
    { korean: "하드 드라이브를 포맷하다", english: "format a hard drive", pronunciation: "[ˈfɔrmæt ə hɑrd draɪv]" },
    { korean: "하드 드라이브를 조각 모음하다", english: "defragment the hard drive", pronunciation: "[diˈfræɡˌmɛnt ðə hɑrd draɪv]" },
    { korean: "데스크탑을 정리하다", english: "clean up the desktop", pronunciation: "[klin ʌp ðə ˈdɛskˌtɑp]" },
    { korean: "파일을 정리하다", english: "organize files", pronunciation: "[ˈɔrgəˌnaɪz faɪlz]" },
    { korean: "오래된 파일을 삭제하다", english: "delete old files", pronunciation: "[dɪˈlit oʊld faɪlz]" },
    { korean: "휴지통을 비우다", english: "empty the recycle bin", pronunciation: "[ˈɛmpti ðə ˈriˌsaɪkəl bɪn]" },
    { korean: "바이러스를 스캔하다", english: "scan for viruses", pronunciation: "[skæn fɔr ˈvaɪrəsɪz]" },
    { korean: "바이러스 백신 소프트웨어를 업데이트하다", english: "update antivirus software", pronunciation: "[ʌpˈdeɪt ˈæntivaɪrəs ˈsɔftˌwɛr]" },
    { korean: "시스템 검사를 예약하다", english: "schedule a system scan", pronunciation: "[ˈskɛʤʊl ə ˈsɪstəm skæn]" },
    { korean: "진단을 실행하다", english: "run a diagnostic", pronunciation: "[rʌn ə ˌdaɪəɡˈnɒstɪk]" },
    { korean: "문제를 해결하다", english: "troubleshoot problems", pronunciation: "[ˈtrʌbəlˌʃut ˈprɑbləmz]" },
    { korean: "기술 지원에 전화하다", english: "call tech support", pronunciation: "[kɔl tɛk səˈpɔrt]" },
    { korean: "고객 서비스와 채팅하다", english: "chat with customer service", pronunciation: "[ʧæt wɪð ˈkʌstəmər ˈsɜrvɪs]" },
    { korean: "지원 이메일을 보내다", english: "email support", pronunciation: "[ˈimeɪl səˈpɔrt]" }
];

let currentWordIndex = 0;
let pronounceInterval;
let synth = window.speechSynthesis;
let autoPlayInterval;

function updateWord() {
    document.getElementById('word-korean').innerText = words[currentWordIndex].korean;
    document.getElementById('word-english').innerText = words[currentWordIndex].english;
    document.getElementById('word-pronunciation').innerText = words[currentWordIndex].pronunciation;
}

function pronounceWord(times, callback) {
    let count = 0;

    function speak() {
        if (count < times) {
            let koreanUtterance = new SpeechSynthesisUtterance(words[currentWordIndex].korean);
            koreanUtterance.lang = 'ko-KR'; // 한국어 발음 설정
            koreanUtterance.rate = 1; // 발음 속도 설정 (1배 빠르게)

            let englishUtterance = new SpeechSynthesisUtterance(words[currentWordIndex].english);
            englishUtterance.lang = 'en-US'; // 영어 발음 설정
            englishUtterance.rate = 1; // 발음 속도 설정 (1배 빠르게)

            koreanUtterance.onend = () => {
                synth.speak(englishUtterance);
            };

            englishUtterance.onend = () => {
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
    clearInterval(pronounceInterval);
    clearInterval(autoPlayInterval);
    synth.cancel();
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
    pronounceWord(1);
}

function autoPlay() {
    stopPronouncing();
    currentWordIndex = 0; // 처음부터 시작
    autoPlayInterval = setInterval(() => {
        updateWord();
        pronounceWord(1, () => {
            currentWordIndex++;
            if (currentWordIndex >= words.length) {
                currentWordIndex = 0; // 끝에 도달하면 처음으로 돌아가기
            }
        });
    }, 8000); // 6초마다 다음 단어로 넘어가고 발음 (발음 시간 3초 + 대기 시간 3초)
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
});
