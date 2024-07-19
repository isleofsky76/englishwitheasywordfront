const words = [
    {
        "korean": "안녕하세요",
        "english": "Hello",
        "pronunciation": "[həˈloʊ]",
        "hangul_pronunciation": "[헬로우]"
    },
    {
        "korean": "감사합니다",
        "english": "Thank you",
        "pronunciation": "[ˈθæŋk ju]",
        "hangul_pronunciation": "[쌩큐]"
    },
    {
        "korean": "도와드릴까요?",
        "english": "Can I help you?",
        "pronunciation": "[kæn aɪ hɛlp ju]",
        "hangul_pronunciation": "[캔 아이 헬프 유]"
    },
    {
        "korean": "얼마에요?",
        "english": "How much is it?",
        "pronunciation": "[haʊ mʌʧ ɪz ɪt]",
        "hangul_pronunciation": "[하우 머치 이즈 잇]"
    },
    {
        "korean": "이것은 뭐에요?",
        "english": "What is this?",
        "pronunciation": "[wʌt ɪz ðɪs]",
        "hangul_pronunciation": "[왓 이즈 디스]"
    },
    {
        "korean": "저것은 뭐에요?",
        "english": "What is that?",
        "pronunciation": "[wʌt ɪz ðæt]",
        "hangul_pronunciation": "[왓 이즈 뎃]"
    },
    {
        "korean": "어디에 있어요?",
        "english": "Where is it?",
        "pronunciation": "[wɛr ɪz ɪt]",
        "hangul_pronunciation": "[웨어 이즈 잇]"
    },
    {
        "korean": "화장실은 어디에 있어요?",
        "english": "Where is the restroom?",
        "pronunciation": "[wɛr ɪz ðə ˈrɛstˌrum]",
        "hangul_pronunciation": "[웨어 이즈 더 레스트룸]"
    },
    {
        "korean": "사이즈 있어요?",
        "english": "Do you have this in my size?",
        "pronunciation": "[du ju hæv ðɪs ɪn maɪ saɪz]",
        "hangul_pronunciation": "[두 유 해브 디스 인 마이 사이즈]"
    },
    {
        "korean": "현금으로 계산할게요",
        "english": "I will pay in cash",
        "pronunciation": "[aɪ wɪl peɪ ɪn kæʃ]",
        "hangul_pronunciation": "[아이 윌 페이 인 캐쉬]"
    },
    {
        "korean": "카드로 계산할게요",
        "english": "I will pay by card",
        "pronunciation": "[aɪ wɪl peɪ baɪ kɑrd]",
        "hangul_pronunciation": "[아이 윌 페이 바이 카드]"
    },
    {
        "korean": "영수증 주세요",
        "english": "Please give me a receipt",
        "pronunciation": "[pliz gɪv mi ə rɪˈsit]",
        "hangul_pronunciation": "[플리즈 기브 미 어 리싯]"
    },
    {
        "korean": "여기 있습니다",
        "english": "Here it is",
        "pronunciation": "[hɪr ɪt ɪz]",
        "hangul_pronunciation": "[히어 잇 이즈]"
    },
    {
        "korean": "다른 색깔 있어요?",
        "english": "Do you have another color?",
        "pronunciation": "[du ju hæv əˈnʌðər ˈkʌlər]",
        "hangul_pronunciation": "[두 유 해브 어나더 컬러]"
    },
    {
        "korean": "좀 더 싸게 해주세요",
        "english": "Can you give me a discount?",
        "pronunciation": "[kæn ju gɪv mi ə ˈdɪskaʊnt]",
        "hangul_pronunciation": "[캔 유 기브 미 어 디스카운트]"
    },
    {
        "korean": "이거 맛있어요",
        "english": "This is delicious",
        "pronunciation": "[ðɪs ɪz dɪˈlɪʃəs]",
        "hangul_pronunciation": "[디스 이즈 딜리셔스]"
    },
    {
        "korean": "추천해 주세요",
        "english": "Please recommend something",
        "pronunciation": "[pliz ˌrɛkəˈmɛnd ˈsʌmθɪŋ]",
        "hangul_pronunciation": "[플리즈 레커멘드 썸띵]"
    },
    {
        "korean": "죄송합니다",
        "english": "I'm sorry",
        "pronunciation": "[aɪm ˈsɑri]",
        "hangul_pronunciation": "[아임 쏘리]"
    },
    {
        "korean": "잠시만 기다려 주세요",
        "english": "Please wait a moment",
        "pronunciation": "[pliz weɪt ə ˈmoʊmənt]",
        "hangul_pronunciation": "[플리즈 웨잇 어 모먼트]"
    },
    {
        "korean": "지금 도와드릴게요",
        "english": "I will help you now",
        "pronunciation": "[aɪ wɪl hɛlp ju naʊ]",
        "hangul_pronunciation": "[아이 윌 헬프 유 나우]"
    },
    {
        "korean": "계산 도와드릴게요",
        "english": "I will assist you with the payment",
        "pronunciation": "[aɪ wɪl əˈsɪst ju wɪð ðə ˈpeɪmənt]",
        "hangul_pronunciation": "[아이 윌 어시스트 유 윗 더 페이먼트]"
    },
    {
        "korean": "곧 준비될게요",
        "english": "It will be ready soon",
        "pronunciation": "[ɪt wɪl bi ˈrɛdi sun]",
        "hangul_pronunciation": "[잇 윌 비 레디 순]"
    },
    {
        "korean": "포장해 드릴까요?",
        "english": "Would you like it packed?",
        "pronunciation": "[wʊd ju laɪk ɪt pækt]",
        "hangul_pronunciation": "[우드 유 라이크 잇 팩트]"
    },
    {
        "korean": "매진되었습니다",
        "english": "It is sold out",
        "pronunciation": "[ɪt ɪz soʊld aʊt]",
        "hangul_pronunciation": "[잇 이즈 솔드 아웃]"
    },
    {
        "korean": "다음에 또 오세요",
        "english": "Please come again",
        "pronunciation": "[pliz kʌm əˈɡɛn]",
        "hangul_pronunciation": "[플리즈 컴 어겐]"
    },
    {
        "korean": "하나 더 드릴까요?",
        "english": "Would you like one more?",
        "pronunciation": "[wʊd ju laɪk wʌn mɔr]",
        "hangul_pronunciation": "[우드 유 라이크 원 모어]"
    },
    {
        "korean": "여기 앉으세요",
        "english": "Please have a seat here",
        "pronunciation": "[pliz hæv ə sit hɪr]",
        "hangul_pronunciation": "[플리즈 해브 어 씻 히어]"
    },
    {
        "korean": "이쪽으로 오세요",
        "english": "Please come this way",
        "pronunciation": "[pliz kʌm ðɪs weɪ]",
        "hangul_pronunciation": "[플리즈 컴 디스 웨이]"
    },
    {
        "korean": "천천히 말씀해 주세요",
        "english": "Please speak slowly",
        "pronunciation": "[pliz spik ˈsloʊli]",
        "hangul_pronunciation": "[플리즈 스픽 슬로울리]"
    },
    {
        "korean": "필요한 것이 있으면 말씀해 주세요",
        "english": "Let me know if you need anything",
        "pronunciation": "[lɛt mi noʊ ɪf ju nid ˈɛniˌθɪŋ]",
        "hangul_pronunciation": "[렛 미 노우 이프 유 니드 애니띵]"
    },
    {
        "korean": "여기 주문하세요",
        "english": "Order here",
        "pronunciation": "[ˈɔrdər hɪr]",
        "hangul_pronunciation": "[오더 히어]"
    },
    {
        "korean": "이쪽으로 오세요",
        "english": "Come this way",
        "pronunciation": "[kʌm ðɪs weɪ]",
        "hangul_pronunciation": "[컴 디스 웨이]"
    },
    {
        "korean": "기다려 주세요",
        "english": "Please wait",
        "pronunciation": "[pliz weɪt]",
        "hangul_pronunciation": "[플리즈 웨잇]"
    },
    {
        "korean": "계산해 드리겠습니다",
        "english": "I'll take care of the bill",
        "pronunciation": "[aɪl teɪk kɛr ʌv ðə bɪl]",
        "hangul_pronunciation": "[아일 테이크 케어 오브 더 빌]"
    },
    {
        "korean": "잘 가세요",
        "english": "Goodbye",
        "pronunciation": "[ɡʊdˈbaɪ]",
        "hangul_pronunciation": "[굿바이]"
    },
    {
        "korean": "내일 다시 오세요",
        "english": "Come again tomorrow",
        "pronunciation": "[kʌm əˈɡɛn təˈmɑroʊ]",
        "hangul_pronunciation": "[컴 어겐 투마로우]"
    },
    {
        "korean": "더 필요하신가요?",
        "english": "Do you need more?",
        "pronunciation": "[du ju nid mɔr]",
        "hangul_pronunciation": "[두 유 니드 모어]"
    },
    {
        "korean": "지금 가세요",
        "english": "You can go now",
        "pronunciation": "[ju kæn ɡoʊ naʊ]",
        "hangul_pronunciation": "[유 캔 고우 나우]"
    },
    {
        "korean": "잠깐만요",
        "english": "Just a moment",
        "pronunciation": "[ʤʌst ə ˈmoʊmənt]",
        "hangul_pronunciation": "[저스트 어 모먼트]"
    },
    {
        "korean": "준비되었어요",
        "english": "It's ready",
        "pronunciation": "[ɪts ˈrɛdi]",
        "hangul_pronunciation": "[잇츠 레디]"
    },
    {
        "korean": "이쪽으로 오세요",
        "english": "This way please",
        "pronunciation": "[ðɪs weɪ pliz]",
        "hangul_pronunciation": "[디스 웨이 플리즈]"
    },
    {
        "korean": "기다리세요",
        "english": "Wait here",
        "pronunciation": "[weɪt hɪr]",
        "hangul_pronunciation": "[웨잇 히어]"
    },
    {
        "korean": "천천히 오세요",
        "english": "Take your time",
        "pronunciation": "[teɪk jʊər taɪm]",
        "hangul_pronunciation": "[테이크 유어 타임]"
    },
    {
        "korean": "카드로 결제하세요",
        "english": "Pay by card",
        "pronunciation": "[peɪ baɪ kɑrd]",
        "hangul_pronunciation": "[페이 바이 카드]"
    },
    {
        "korean": "현금으로 결제하세요",
        "english": "Pay by cash",
        "pronunciation": "[peɪ baɪ kæʃ]",
        "hangul_pronunciation": "[페이 바이 캐쉬]"
    },
    {
        "korean": "음료 필요하세요?",
        "english": "Would you like a drink?",
        "pronunciation": "[wʊd ju laɪk ə drɪŋk]",
        "hangul_pronunciation": "[우드 유 라이크 어 드링크]"
    },
    {
        "korean": "식사 즐기세요",
        "english": "Enjoy your meal",
        "pronunciation": "[ɪnˈʤɔɪ jʊər mil]",
        "hangul_pronunciation": "[인조이 유어 밀]"
    },
    {
        "korean": "맛있게 드세요",
        "english": "Bon appétit",
        "pronunciation": "[boʊn æpəˈtit]",
        "hangul_pronunciation": "[본 애퍼티]"
    },
    {
        "korean": "추천 메뉴 있어요",
        "english": "We have recommended dishes",
        "pronunciation": "[wi hæv ˌrɛkəˈmɛndɪd ˈdɪʃəz]",
        "hangul_pronunciation": "[위 해브 레커멘디드 디쉬즈]"
    },
    {
        "korean": "가져가세요",
        "english": "Take it with you",
        "pronunciation": "[teɪk ɪt wɪð ju]",
        "hangul_pronunciation": "[테이크 잇 윗 유]"
    },
    {
        "korean": "이리로 오세요",
        "english": "Come over here",
        "pronunciation": "[kʌm ˈoʊvər hɪr]",
        "hangul_pronunciation": "[컴 오버 히어]"
    },
    {
        "korean": "테이블 번호가 필요해요",
        "english": "I need your table number",
        "pronunciation": "[aɪ nid jʊər ˈteɪbəl ˈnʌmbər]",
        "hangul_pronunciation": "[아이 니드 유어 테이블 넘버]"
    },
    {
        "korean": "주문 완료됐어요",
        "english": "Your order is complete",
        "pronunciation": "[jʊər ˈɔrdər ɪz kəmˈplit]",
        "hangul_pronunciation": "[유어 오더 이즈 컴플리트]"
    },
    {
        "korean": "테이크아웃 하세요",
        "english": "Take out available",
        "pronunciation": "[teɪk aʊt əˈveɪləbl]",
        "hangul_pronunciation": "[테이크 아웃 어베일러블]"
    },
    {
        "korean": "즐거운 하루 보내세요",
        "english": "Have a pleasant day",
        "pronunciation": "[hæv ə ˈplɛzənt deɪ]",
        "hangul_pronunciation": "[해브 어 플레전트 데이]"
    },
    {
        "korean": "앉으세요",
        "english": "Please sit down",
        "pronunciation": "[pliz sɪt daʊn]",
        "hangul_pronunciation": "[플리즈 싯 다운]"
    },
    {
        "korean": "배달 가능해요",
        "english": "Delivery available",
        "pronunciation": "[dɪˈlɪvəri əˈveɪləbl]",
        "hangul_pronunciation": "[딜리버리 어베일러블]"
    },
    {
        "korean": "이쪽으로 가세요",
        "english": "Go this way",
        "pronunciation": "[ɡoʊ ðɪs weɪ]",
        "hangul_pronunciation": "[고우 디스 웨이]"
    },
    {
        "korean": "수고하세요",
        "english": "Good job",
        "pronunciation": "[ɡʊd ʤɑb]",
        "hangul_pronunciation": "[굿 잡]"
    },
    {
        "korean": "수고하셨습니다",
        "english": "Well done",
        "pronunciation": "[wɛl dʌn]",
        "hangul_pronunciation": "[웰 던]"
    },
    {
        "korean": "가격이 얼마인가요?",
        "english": "How much does it cost?",
        "pronunciation": "[haʊ mʌʧ dʌz ɪt kɔst]",
        "hangul_pronunciation": "[하우 머치 더즈 잇 코스트]"
    },
    {
        "korean": "이것 할인되나요?",
        "english": "Is this on sale?",
        "pronunciation": "[ɪz ðɪs ɑn seɪl]",
        "hangul_pronunciation": "[이즈 디스 온 세일]"
    },
    {
        "korean": "다른 색깔 있나요?",
        "english": "Do you have another color?",
        "pronunciation": "[du ju hæv əˈnʌðər ˈkʌlər]",
        "hangul_pronunciation": "[두 유 해브 어나더 컬러]"
    },
    {
        "korean": "사이즈가 있나요?",
        "english": "Do you have this in my size?",
        "pronunciation": "[du ju hæv ðɪs ɪn maɪ saɪz]",
        "hangul_pronunciation": "[두 유 해브 디스 인 마이 사이즈]"
    },
    {
        "korean": "포장해 주세요",
        "english": "Please wrap it up",
        "pronunciation": "[pliz ræp ɪt ʌp]",
        "hangul_pronunciation": "[플리즈 랩 잇 업]"
    },
    {
        "korean": "환불 가능할까요?",
        "english": "Can I get a refund?",
        "pronunciation": "[kæn aɪ ɡɛt ə ˈriˌfʌnd]",
        "hangul_pronunciation": "[캔 아이 겟 어 리펀드]"
    },
    {
        "korean": "이것 교환할 수 있나요?",
        "english": "Can I exchange this?",
        "pronunciation": "[kæn aɪ ɪksˈʧeɪnʤ ðɪs]",
        "hangul_pronunciation": "[캔 아이 익스체인지 디스]"
    },
    {
        "korean": "영수증 주세요",
        "english": "Please give me a receipt",
        "pronunciation": "[pliz gɪv mi ə rɪˈsit]",
        "hangul_pronunciation": "[플리즈 기브 미 어 리싯]"
    },
    {
        "korean": "카드 결제 가능하나요?",
        "english": "Can I pay by card?",
        "pronunciation": "[kæn aɪ peɪ baɪ kɑrd]",
        "hangul_pronunciation": "[캔 아이 페이 바이 카드]"
    },
    {
        "korean": "현금으로 결제해도 되나요?",
        "english": "Can I pay in cash?",
        "pronunciation": "[kæn aɪ peɪ ɪn kæʃ]",
        "hangul_pronunciation": "[캔 아이 페이 인 캐쉬]"
    },
    {
        "korean": "입어 봐도 되나요?",
        "english": "Can I try this on?",
        "pronunciation": "[kæn aɪ traɪ ðɪs ɑn]",
        "hangul_pronunciation": "[캔 아이 트라이 디스 온]"
    },
    {
        "korean": "더 큰 사이즈 있나요?",
        "english": "Do you have a bigger size?",
        "pronunciation": "[du ju hæv ə ˈbɪgər saɪz]",
        "hangul_pronunciation": "[두 유 해브 어 빅거 사이즈]"
    },
    {
        "korean": "더 작은 사이즈 있나요?",
        "english": "Do you have a smaller size?",
        "pronunciation": "[du ju hæv ə ˈsmɔlər saɪz]",
        "hangul_pronunciation": "[두 유 해브 어 스몰러 사이즈]"
    },
    {
        "korean": "이것 다른 색으로 있나요?",
        "english": "Do you have this in another color?",
        "pronunciation": "[du ju hæv ðɪs ɪn əˈnʌðər ˈkʌlər]",
        "hangul_pronunciation": "[두 유 해브 디스 인 어나더 컬러]"
    },
    {
        "korean": "할인된 가격이 맞나요?",
        "english": "Is the discounted price correct?",
        "pronunciation": "[ɪz ðə dɪsˈkaʊntɪd praɪs kəˈrɛkt]",
        "hangul_pronunciation": "[이즈 더 디스카운티드 프라이스 커렉트]"
    },
    {
        "korean": "포인트 적립되나요?",
        "english": "Can I earn points?",
        "pronunciation": "[kæn aɪ ɜrn pɔɪnts]",
        "hangul_pronunciation": "[캔 아이 언 포인츠]"
    },
    {
        "korean": "포인트 사용 가능하나요?",
        "english": "Can I use my points?",
        "pronunciation": "[kæn aɪ juz maɪ pɔɪnts]",
        "hangul_pronunciation": "[캔 아이 유즈 마이 포인츠]"
    },
    {
        "korean": "이것 배송되나요?",
        "english": "Can this be delivered?",
        "pronunciation": "[kæn ðɪs bi dɪˈlɪvərd]",
        "hangul_pronunciation": "[캔 디스 비 딜리버드]"
    },
    {
        "korean": "무료 배송인가요?",
        "english": "Is the delivery free?",
        "pronunciation": "[ɪz ðə dɪˈlɪvəri fri]",
        "hangul_pronunciation": "[이즈 더 딜리버리 프리]"
    },
    {
        "korean": "언제 받을 수 있나요?",
        "english": "When will I receive it?",
        "pronunciation": "[wɛn wɪl aɪ rɪˈsiv ɪt]",
        "hangul_pronunciation": "[웬 윌 아이 리씨브 잇]"
    },
    {
        "korean": "얼마 동안 걸리나요?",
        "english": "How long will it take?",
        "pronunciation": "[haʊ lɔŋ wɪl ɪt teɪk]",
        "hangul_pronunciation": "[하우 롱 윌 잇 테익]"
    },
    {
        "korean": "재고가 있나요?",
        "english": "Is it in stock?",
        "pronunciation": "[ɪz ɪt ɪn stɑk]",
        "hangul_pronunciation": "[이즈 잇 인 스탁]"
    },
    {
        "korean": "지불 방법은 무엇인가요?",
        "english": "What are the payment options?",
        "pronunciation": "[wʌt ɑr ðə ˈpeɪmənt ˈɑpʃənz]",
        "hangul_pronunciation": "[왓 아 더 페이먼트 옵션즈]"
    },
    {
        "korean": "이것은 어떻게 사용하나요?",
        "english": "How do you use this?",
        "pronunciation": "[haʊ du ju juz ðɪs]",
        "hangul_pronunciation": "[하우 두 유 유즈 디스]"
    },
    {
        "korean": "설명서가 있나요?",
        "english": "Is there a manual?",
        "pronunciation": "[ɪz ðɛr ə ˈmænjuəl]",
        "hangul_pronunciation": "[이즈 데어 어 매뉴얼]"
    },
    {
        "korean": "이것 무료로 받을 수 있나요?",
        "english": "Can I get this for free?",
        "pronunciation": "[kæn aɪ gɛt ðɪs fɔr fri]",
        "hangul_pronunciation": "[캔 아이 겟 디스 포 프리]"
    },
    {
        "korean": "이것 반품할 수 있나요?",
        "english": "Can I return this?",
        "pronunciation": "[kæn aɪ rɪˈtɜrn ðɪs]",
        "hangul_pronunciation": "[캔 아이 리턴 디스]"
    },
    {
        "korean": "보증서가 있나요?",
        "english": "Is there a warranty?",
        "pronunciation": "[ɪz ðɛr ə ˈwɔrənti]",
        "hangul_pronunciation": "[이즈 데어 어 워런티]"
    },
    {
        "korean": "사용해도 되나요?",
        "english": "Can I use it?",
        "pronunciation": "[kæn aɪ juz ɪt]",
        "hangul_pronunciation": "[캔 아이 유즈 잇]"
    },
    {
        "korean": "어디서 찾을 수 있나요?",
        "english": "Where can I find this?",
        "pronunciation": "[wɛr kæn aɪ faɪnd ðɪs]",
        "hangul_pronunciation": "[웨어 캔 아이 파인드 디스]"
    },
    {
        "korean": "매장에서 찾을 수 있나요?",
        "english": "Can I find this in store?",
        "pronunciation": "[kæn aɪ faɪnd ðɪs ɪn stɔr]",
        "hangul_pronunciation": "[캔 아이 파인드 디스 인 스토어]"
    },
    {
        "korean": "가격을 알려주세요",
        "english": "Please tell me the price",
        "pronunciation": "[pliz tɛl mi ðə praɪs]",
        "hangul_pronunciation": "[플리즈 텔 미 더 프라이스]"
    },
    {
        "korean": "재고가 있나요?",
        "english": "Do you have it in stock?",
        "pronunciation": "[du ju hæv ɪt ɪn stɑk]",
        "hangul_pronunciation": "[두 유 해브 잇 인 스탁]"
    },
    {
        "korean": "할인 쿠폰을 사용할 수 있나요?",
        "english": "Can I use a discount coupon?",
        "pronunciation": "[kæn aɪ juz ə dɪsˈkaʊnt ˈkupən]",
        "hangul_pronunciation": "[캔 아이 유즈 어 디스카운트 쿠폰]"
    },
    {
        "korean": "가장 인기 있는 제품은 무엇인가요?",
        "english": "What is the most popular item?",
        "pronunciation": "[wʌt ɪz ðə moʊst ˈpɑpjələr ˈaɪtəm]",
        "hangul_pronunciation": "[왓 이즈 더 모스트 파퓰러 아이템]"
    },
    {
        "korean": "무료 샘플을 받을 수 있나요?",
        "english": "Can I get a free sample?",
        "pronunciation": "[kæn aɪ gɛt ə fri ˈsæmpəl]",
        "hangul_pronunciation": "[캔 아이 겟 어 프리 샘플]"
    },
    {
        "korean": "다른 추천 상품이 있나요?",
        "english": "Do you have any other recommendations?",
        "pronunciation": "[du ju hæv ˈɛni ˈʌðər ˌrɛkəmənˈdeɪʃənz]",
        "hangul_pronunciation": "[두 유 해브 애니 아더 레커멘데이션즈]"
    },
    {
        "korean": "이 상품은 언제 재입고 되나요?",
        "english": "When will this item be restocked?",
        "pronunciation": "[wɛn wɪl ðɪs ˈaɪtəm bi riˈstɑkt]",
        "hangul_pronunciation": "[웬 윌 디스 아이템 비 리스탁트]"
    },
    {
        "korean": "재고 확인해 주세요",
        "english": "Please check the stock",
        "pronunciation": "[pliz ʧɛk ðə stɑk]",
        "hangul_pronunciation": "[플리즈 첵 더 스탁]"
    },
    {
        "korean": "환불 정책을 알려주세요",
        "english": "Please explain the refund policy",
        "pronunciation": "[pliz ɪkˈspleɪn ðə ˈriˌfʌnd ˈpɑləsi]",
        "hangul_pronunciation": "[플리즈 익스플레인 더 리펀드 폴리시]"
    },
    {
        "korean": "이 제품은 어떤 기능이 있나요?",
        "english": "What features does this product have?",
        "pronunciation": "[wʌt ˈfiʧərz dʌz ðɪs ˈprɑdʌkt hæv]",
        "hangul_pronunciation": "[왓 피처즈 더즈 디스 프로덕트 해브]"
    },
    {
        "korean": "이 제품은 보증 기간이 얼마나 되나요?",
        "english": "How long is the warranty for this product?",
        "pronunciation": "[haʊ lɔŋ ɪz ðə ˈwɔrənti fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 롱 이즈 더 워런티 포 디스 프로덕트]"
    },
    {
        "korean": "온라인 주문이 가능한가요?",
        "english": "Can I order this online?",
        "pronunciation": "[kæn aɪ ˈɔrdər ðɪs ɔnˈlaɪn]",
        "hangul_pronunciation": "[캔 아이 오더 디스 온라인]"
    },
    {
        "korean": "배송비가 얼마인가요?",
        "english": "How much is the shipping fee?",
        "pronunciation": "[haʊ mʌʧ ɪz ðə ˈʃɪpɪŋ fi]",
        "hangul_pronunciation": "[하우 머치 이즈 더 쉬핑 피]"
    },
    {
        "korean": "구매한 상품을 교환하고 싶어요",
        "english": "I want to exchange the item I bought",
        "pronunciation": "[aɪ wɑnt tu ɪksˈʧeɪnʤ ði ˈaɪtəm aɪ bɔt]",
        "hangul_pronunciation": "[아이 원트 투 익스체인지 디 아이템 아이 봇]"
    },
    {
        "korean": "이 제품은 세탁이 가능한가요?",
        "english": "Is this product washable?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt ˈwɑʃəbl]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 워셔블]"
    },
    {
        "korean": "이 제품의 원산지는 어디인가요?",
        "english": "Where is this product made?",
        "pronunciation": "[wɛr ɪz ðɪs ˈprɑdʌkt meɪd]",
        "hangul_pronunciation": "[웨어 이즈 디스 프로덕트 메이드]"
    },
    {
        "korean": "이 제품은 어떤 재료로 만들어졌나요?",
        "english": "What material is this product made of?",
        "pronunciation": "[wʌt məˈtɪriəl ɪz ðɪs ˈprɑdʌkt meɪd ʌv]",
        "hangul_pronunciation": "[왓 머테리얼 이즈 디스 프로덕트 메이드 오브]"
    },
    {
        "korean": "신용카드로 결제할 수 있나요?",
        "english": "Can I pay with a credit card?",
        "pronunciation": "[kæn aɪ peɪ wɪð ə ˈkrɛdɪt kɑrd]",
        "hangul_pronunciation": "[캔 아이 페이 윗 어 크레딧 카드]"
    },
    {
        "korean": "이 제품은 환불이 가능한가요?",
        "english": "Is this product refundable?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt rɪˈfʌndəbl]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 리펀더블]"
    },
    {
        "korean": "포장지가 필요 없어요",
        "english": "I don't need a bag",
        "pronunciation": "[aɪ doʊnt nid ə bæg]",
        "hangul_pronunciation": "[아이 돈트 니드 어 백]"
    },
    {
        "korean": "총 금액이 얼마인가요?",
        "english": "What is the total amount?",
        "pronunciation": "[wʌt ɪz ðə ˈtoʊtəl əˈmaʊnt]",
        "hangul_pronunciation": "[왓 이즈 더 토털 어마운트]"
    },
    {
        "korean": "이 제품은 얼마 동안 사용할 수 있나요?",
        "english": "How long can I use this product?",
        "pronunciation": "[haʊ lɔŋ kæn aɪ juz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 롱 캔 아이 유즈 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 유통기한은 언제까지인가요?",
        "english": "What is the expiration date of this product?",
        "pronunciation": "[wʌt ɪz ði ˌɛkspəˈreɪʃən deɪt ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 디 엑스퍼레이션 데이트 오브 디스 프로덕트]"
    },
    {
        "korean": "다른 디자인이 있나요?",
        "english": "Do you have other designs?",
        "pronunciation": "[du ju hæv ˈʌðər dɪˈzaɪnz]",
        "hangul_pronunciation": "[두 유 해브 아더 디자인즈]"
    },
    {
        "korean": "이 제품은 어디에서 제조되었나요?",
        "english": "Where is this product manufactured?",
        "pronunciation": "[wɛr ɪz ðɪs ˈprɑdʌkt ˌmænjəˈfækʧərd]",
        "hangul_pronunciation": "[웨어 이즈 디스 프로덕트 매뉴팩처드]"
    },
    {
        "korean": "이 제품은 재활용 가능한가요?",
        "english": "Is this product recyclable?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt rɪˈsaɪkləbl]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 리사이클러블]"
    },
    {
        "korean": "이 제품은 방수가 되나요?",
        "english": "Is this product waterproof?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt ˈwɔtərˌpruf]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 워터프루프]"
    },
    {
        "korean": "제품 설명서를 받을 수 있나요?",
        "english": "Can I get a product manual?",
        "pronunciation": "[kæn aɪ gɛt ə ˈprɑdʌkt ˈmænjuəl]",
        "hangul_pronunciation": "[캔 아이 겟 어 프로덕트 매뉴얼]"
    },
    {
        "korean": "이 제품은 휴대가 간편한가요?",
        "english": "Is this product easy to carry?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt ˈizi tu ˈkæri]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 이지 투 캐리]"
    },
    {
        "korean": "이 제품을 대량으로 구매할 수 있나요?",
        "english": "Can I buy this product in bulk?",
        "pronunciation": "[kæn aɪ baɪ ðɪs ˈprɑdʌkt ɪn bʌlk]",
        "hangul_pronunciation": "[캔 아이 바이 디스 프로덕트 인 벌크]"
    },
    {
        "korean": "가격표를 보여주세요",
        "english": "Please show me the price tag",
        "pronunciation": "[pliz ʃoʊ mi ðə praɪs tæɡ]",
        "hangul_pronunciation": "[플리즈 쇼우 미 더 프라이스 태그]"
    },
    {
        "korean": "이 제품은 어떤 브랜드인가요?",
        "english": "What brand is this product?",
        "pronunciation": "[wʌt brænd ɪz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 브랜드 이즈 디스 프로덕트]"
    },
    {
        "korean": "할부가 가능한가요?",
        "english": "Can I pay in installments?",
        "pronunciation": "[kæn aɪ peɪ ɪn ɪnˈstɔlmənts]",
        "hangul_pronunciation": "[캔 아이 페이 인 인스톨먼츠]"
    },
    {
        "korean": "이 제품은 유기농인가요?",
        "english": "Is this product organic?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt ɔrˈɡænɪk]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 오가닉]"
    },
    {
        "korean": "시즌 세일은 언제 시작하나요?",
        "english": "When does the seasonal sale start?",
        "pronunciation": "[wɛn dʌz ðə ˈsizənəl seɪl stɑrt]",
        "hangul_pronunciation": "[웬 더즈 더 시즌얼 세일 스타트]"
    },
    {
        "korean": "이 제품은 어디서 만들었나요?",
        "english": "Where was this product made?",
        "pronunciation": "[wɛr wʌz ðɪs ˈprɑdʌkt meɪd]",
        "hangul_pronunciation": "[웨어 워즈 디스 프로덕트 메이드]"
    },
    {
        "korean": "이 제품의 사용법을 알려주세요",
        "english": "Please tell me how to use this product",
        "pronunciation": "[pliz tɛl mi haʊ tu juz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[플리즈 텔 미 하우 투 유즈 디스 프로덕트]"
    },
    {
        "korean": "보증서가 포함되어 있나요?",
        "english": "Is the warranty included?",
        "pronunciation": "[ɪz ðə ˈwɔrənti ɪnˈkludɪd]",
        "hangul_pronunciation": "[이즈 더 워런티 인클루디드]"
    },
    {
        "korean": "이 제품의 특징은 무엇인가요?",
        "english": "What are the features of this product?",
        "pronunciation": "[wʌt ɑr ðə ˈfiʧərz ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 아 더 피처즈 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 언제 생산되었나요?",
        "english": "When was this product manufactured?",
        "pronunciation": "[wɛn wʌz ðɪs ˈprɑdʌkt ˌmænjuˈfæktʃərd]",
        "hangul_pronunciation": "[웬 워즈 디스 프로덕트 매뉴팩처드]"
    },
    {
        "korean": "이 제품은 세탁이 가능한가요?",
        "english": "Is this product machine washable?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt məˈʃin ˈwɑʃəbl]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 머신 워셔블]"
    },
    {
        "korean": "반품 정책은 무엇인가요?",
        "english": "What is the return policy?",
        "pronunciation": "[wʌt ɪz ðə rɪˈtɜrn ˈpɑləsi]",
        "hangul_pronunciation": "[왓 이즈 더 리턴 폴리시]"
    },
    {
        "korean": "교환 정책을 알려주세요",
        "english": "Please tell me the exchange policy",
        "pronunciation": "[pliz tɛl mi ði ɪksˈʧeɪndʒ ˈpɑləsi]",
        "hangul_pronunciation": "[플리즈 텔 미 디 익스체인지 폴리시]"
    },
    {
        "korean": "할인 카드가 있나요?",
        "english": "Do you have a discount card?",
        "pronunciation": "[du ju hæv ə dɪsˈkaʊnt kɑrd]",
        "hangul_pronunciation": "[두 유 해브 어 디스카운트 카드]"
    },
    {
        "korean": "이 제품의 유효기간은 얼마나 되나요?",
        "english": "What is the shelf life of this product?",
        "pronunciation": "[wʌt ɪz ðə ʃɛlf laɪf ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 쉘프 라이프 오브 디스 프로덕트]"
    },
    {
        "korean": "포인트 적립이 되나요?",
        "english": "Can I earn points on this purchase?",
        "pronunciation": "[kæn aɪ ɜrn pɔɪnts ɑn ðɪs ˈpɜrʧəs]",
        "hangul_pronunciation": "[캔 아이 언 포인츠 온 디스 퍼체스]"
    },
    {
        "korean": "가격을 다시 한번 확인해 주세요",
        "english": "Please double-check the price",
        "pronunciation": "[pliz ˈdʌbəl ʧɛk ðə praɪs]",
        "hangul_pronunciation": "[플리즈 더블 첵 더 프라이스]"
    },
    {
        "korean": "이 제품은 사전 예약이 가능한가요?",
        "english": "Is this product available for pre-order?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt əˈveɪləbəl fɔr pri-ˈɔrdər]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 어베일러블 포 프리-오더]"
    },
    {
        "korean": "온라인으로 구매할 수 있나요?",
        "english": "Can I buy this online?",
        "pronunciation": "[kæn aɪ baɪ ðɪs ɔnˈlaɪn]",
        "hangul_pronunciation": "[캔 아이 바이 디스 온라인]"
    },
    {
        "korean": "이 제품은 어디서 구할 수 있나요?",
        "english": "Where can I purchase this product?",
        "pronunciation": "[wɛr kæn aɪ ˈpɜrʧəs ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[웨어 캔 아이 퍼체스 디스 프로덕트]"
    },
    {
        "korean": "무료 배송이 되나요?",
        "english": "Is free shipping available?",
        "pronunciation": "[ɪz fri ˈʃɪpɪŋ əˈveɪləbəl]",
        "hangul_pronunciation": "[이즈 프리 쉬핑 어베일러블]"
    },
    {
        "korean": "이 제품의 배송 기간은 얼마나 되나요?",
        "english": "What is the delivery time for this product?",
        "pronunciation": "[wʌt ɪz ðə dɪˈlɪvəri taɪm fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 딜리버리 타임 포 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어떻게 사용하나요?",
        "english": "How do I use this product?",
        "pronunciation": "[haʊ du aɪ juz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 두 아이 유즈 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 사용 후기는 어떤가요?",
        "english": "What are the reviews for this product?",
        "pronunciation": "[wʌt ɑr ðə rɪˈvjuːz fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 아 더 리뷰즈 포 디스 프로덕트]"
    },
    {
        "korean": "이 제품을 예약 주문할 수 있나요?",
        "english": "Can I reserve this product?",
        "pronunciation": "[kæn aɪ rɪˈzɜrv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[캔 아이 리저브 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 성능은 어떤가요?",
        "english": "How is the performance of this product?",
        "pronunciation": "[haʊ ɪz ðə pərˈfɔrməns ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 이즈 더 퍼포먼스 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 제조사는 어디인가요?",
        "english": "Who is the manufacturer of this product?",
        "pronunciation": "[hu ɪz ðə ˌmænjuˈfæktʃərər ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[후 이즈 더 매뉴팩처러 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어디서 살 수 있나요?",
        "english": "Where can I buy this product?",
        "pronunciation": "[wɛr kæn aɪ baɪ ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[웨어 캔 아이 바이 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 다른 크기가 있나요?",
        "english": "Does this product come in other sizes?",
        "pronunciation": "[dʌz ðɪs ˈprɑdʌkt kʌm ɪn ˈʌðər ˈsaɪzɪz]",
        "hangul_pronunciation": "[더즈 디스 프로덕트 컴 인 아더 사이즈즈]"
    },
    {
        "korean": "이 제품은 어디에서 제조되었나요?",
        "english": "Where was this product manufactured?",
        "pronunciation": "[wɛr wʌz ðɪs ˈprɑdʌkt ˌmænjuˈfæktʃərd]",
        "hangul_pronunciation": "[웨어 워즈 디스 프로덕트 매뉴팩처드]"
    },
    {
        "korean": "이 제품은 유해 물질이 포함되어 있나요?",
        "english": "Does this product contain harmful substances?",
        "pronunciation": "[dʌz ðɪs ˈprɑdʌkt kənˈteɪn ˈhɑrmfəl ˈsʌbstənsɪz]",
        "hangul_pronunciation": "[더즈 디스 프로덕트 컨테인 함풀 섭스턴시즈]"
    },
    {
        "korean": "가격표를 보여주세요",
        "english": "Please show me the price tag",
        "pronunciation": "[pliz ʃoʊ mi ðə praɪs tæɡ]",
        "hangul_pronunciation": "[플리즈 쇼우 미 더 프라이스 태그]"
    },
    {
        "korean": "이 제품은 어떤 브랜드인가요?",
        "english": "What brand is this product?",
        "pronunciation": "[wʌt brænd ɪz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 브랜드 이즈 디스 프로덕트]"
    },
    {
        "korean": "할부가 가능한가요?",
        "english": "Can I pay in installments?",
        "pronunciation": "[kæn aɪ peɪ ɪn ɪnˈstɔlmənts]",
        "hangul_pronunciation": "[캔 아이 페이 인 인스톨먼츠]"
    },
    {
        "korean": "이 제품은 유기농인가요?",
        "english": "Is this product organic?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt ɔrˈɡænɪk]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 오가닉]"
    },
    {
        "korean": "시즌 세일은 언제 시작하나요?",
        "english": "When does the seasonal sale start?",
        "pronunciation": "[wɛn dʌz ðə ˈsizənəl seɪl stɑrt]",
        "hangul_pronunciation": "[웬 더즈 더 시즌얼 세일 스타트]"
    },
    {
        "korean": "이 제품은 어디서 만들었나요?",
        "english": "Where was this product made?",
        "pronunciation": "[wɛr wʌz ðɪs ˈprɑdʌkt meɪd]",
        "hangul_pronunciation": "[웨어 워즈 디스 프로덕트 메이드]"
    },
    {
        "korean": "이 제품의 사용법을 알려주세요",
        "english": "Please tell me how to use this product",
        "pronunciation": "[pliz tɛl mi haʊ tu juz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[플리즈 텔 미 하우 투 유즈 디스 프로덕트]"
    },
    {
        "korean": "보증서가 포함되어 있나요?",
        "english": "Is the warranty included?",
        "pronunciation": "[ɪz ðə ˈwɔrənti ɪnˈkludɪd]",
        "hangul_pronunciation": "[이즈 더 워런티 인클루디드]"
    },
    {
        "korean": "이 제품의 특징은 무엇인가요?",
        "english": "What are the features of this product?",
        "pronunciation": "[wʌt ɑr ðə ˈfiʧərz ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 아 더 피처즈 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 언제 생산되었나요?",
        "english": "When was this product manufactured?",
        "pronunciation": "[wɛn wʌz ðɪs ˈprɑdʌkt ˌmænjuˈfæktʃərd]",
        "hangul_pronunciation": "[웬 워즈 디스 프로덕트 매뉴팩처드]"
    },
    {
        "korean": "이 제품은 세탁이 가능한가요?",
        "english": "Is this product machine washable?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt məˈʃin ˈwɑʃəbl]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 머신 워셔블]"
    },
    {
        "korean": "반품 정책은 무엇인가요?",
        "english": "What is the return policy?",
        "pronunciation": "[wʌt ɪz ðə rɪˈtɜrn ˈpɑləsi]",
        "hangul_pronunciation": "[왓 이즈 더 리턴 폴리시]"
    },
    {
        "korean": "교환 정책을 알려주세요",
        "english": "Please tell me the exchange policy",
        "pronunciation": "[pliz tɛl mi ði ɪksˈʧeɪndʒ ˈpɑləsi]",
        "hangul_pronunciation": "[플리즈 텔 미 디 익스체인지 폴리시]"
    },
    {
        "korean": "할인 카드가 있나요?",
        "english": "Do you have a discount card?",
        "pronunciation": "[du ju hæv ə dɪsˈkaʊnt kɑrd]",
        "hangul_pronunciation": "[두 유 해브 어 디스카운트 카드]"
    },
    {
        "korean": "이 제품의 유효기간은 얼마나 되나요?",
        "english": "What is the shelf life of this product?",
        "pronunciation": "[wʌt ɪz ðə ʃɛlf laɪf ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 쉘프 라이프 오브 디스 프로덕트]"
    },
    {
        "korean": "포인트 적립이 되나요?",
        "english": "Can I earn points on this purchase?",
        "pronunciation": "[kæn aɪ ɜrn pɔɪnts ɑn ðɪs ˈpɜrʧəs]",
        "hangul_pronunciation": "[캔 아이 언 포인츠 온 디스 퍼체스]"
    },
    {
        "korean": "가격을 다시 한번 확인해 주세요",
        "english": "Please double-check the price",
        "pronunciation": "[pliz ˈdʌbəl ʧɛk ðə praɪs]",
        "hangul_pronunciation": "[플리즈 더블 첵 더 프라이스]"
    },
    {
        "korean": "이 제품은 사전 예약이 가능한가요?",
        "english": "Is this product available for pre-order?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt əˈveɪləbəl fɔr pri-ˈɔrdər]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 어베일러블 포 프리-오더]"
    },
    {
        "korean": "온라인으로 구매할 수 있나요?",
        "english": "Can I buy this online?",
        "pronunciation": "[kæn aɪ baɪ ðɪs ɔnˈlaɪn]",
        "hangul_pronunciation": "[캔 아이 바이 디스 온라인]"
    },
    {
        "korean": "이 제품은 어디서 구할 수 있나요?",
        "english": "Where can I purchase this product?",
        "pronunciation": "[wɛr kæn aɪ ˈpɜrʧəs ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[웨어 캔 아이 퍼체스 디스 프로덕트]"
    },
    {
        "korean": "무료 배송이 되나요?",
        "english": "Is free shipping available?",
        "pronunciation": "[ɪz fri ˈʃɪpɪŋ əˈveɪləbəl]",
        "hangul_pronunciation": "[이즈 프리 쉬핑 어베일러블]"
    },
    {
        "korean": "이 제품의 배송 기간은 얼마나 되나요?",
        "english": "What is the delivery time for this product?",
        "pronunciation": "[wʌt ɪz ðə dɪˈlɪvəri taɪm fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 딜리버리 타임 포 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어떻게 사용하나요?",
        "english": "How do I use this product?",
        "pronunciation": "[haʊ du aɪ juz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 두 아이 유즈 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 사용 후기는 어떤가요?",
        "english": "What are the reviews for this product?",
        "pronunciation": "[wʌt ɑr ðə rɪˈvjuːz fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 아 더 리뷰즈 포 디스 프로덕트]"
    },
    {
        "korean": "이 제품을 예약 주문할 수 있나요?",
        "english": "Can I reserve this product?",
        "pronunciation": "[kæn aɪ rɪˈzɜrv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[캔 아이 리저브 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 성능은 어떤가요?",
        "english": "How is the performance of this product?",
        "pronunciation": "[haʊ ɪz ðə pərˈfɔrməns ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 이즈 더 퍼포먼스 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 제조사는 어디인가요?",
        "english": "Who is the manufacturer of this product?",
        "pronunciation": "[hu ɪz ðə ˌmænjuˈfæktʃərər ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[후 이즈 더 매뉴팩처러 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어디서 살 수 있나요?",
        "english": "Where can I buy this product?",
        "pronunciation": "[wɛr kæn aɪ baɪ ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[웨어 캔 아이 바이 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 다른 크기가 있나요?",
        "english": "Does this product come in other sizes?",
        "pronunciation": "[dʌz ðɪs ˈprɑdʌkt kʌm ɪn ˈʌðər ˈsaɪzɪz]",
        "hangul_pronunciation": "[더즈 디스 프로덕트 컴 인 아더 사이즈즈]"
    },
    {
        "korean": "이 제품은 어디에서 제조되었나요?",
        "english": "Where was this product manufactured?",
        "pronunciation": "[wɛr wʌz ðɪs ˈprɑdʌkt ˌmænjuˈfæktʃərd]",
        "hangul_pronunciation": "[웨어 워즈 디스 프로덕트 매뉴팩처드]"
    },
    {
        "korean": "이 제품은 유해 물질이 포함되어 있나요?",
        "english": "Does this product contain harmful substances?",
        "pronunciation": "[dʌz ðɪs ˈprɑdʌkt kənˈteɪn ˈhɑrmfəl ˈsʌbstənsɪz]",
        "hangul_pronunciation": "[더즈 디스 프로덕트 컨테인 함풀 섭스턴시즈]"
    },
    {
        "korean": "계산서를 주시겠어요?",
        "english": "Can I get the bill, please?",
        "pronunciation": "[kæn aɪ gɛt ðə bɪl, pliz]",
        "hangul_pronunciation": "[캔 아이 겟 더 빌, 플리즈]"
    },
    {
        "korean": "구매 내역을 보여주세요",
        "english": "Can I see my purchase history?",
        "pronunciation": "[kæn aɪ si maɪ ˈpɜrʧəs ˈhɪstəri]",
        "hangul_pronunciation": "[캔 아이 씨 마이 퍼체스 히스토리]"
    },
    {
        "korean": "오늘의 특가는 무엇인가요?",
        "english": "What are today's specials?",
        "pronunciation": "[wʌt ɑr təˈdeɪz ˈspɛʃəlz]",
        "hangul_pronunciation": "[왓 아 투데이즈 스페셜즈]"
    },
    {
        "korean": "이 제품을 예약할 수 있나요?",
        "english": "Can I reserve this product?",
        "pronunciation": "[kæn aɪ rɪˈzɜrv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[캔 아이 리저브 디스 프로덕트]"
    },
    {
        "korean": "할인 쿠폰이 있나요?",
        "english": "Do you have any discount coupons?",
        "pronunciation": "[du ju hæv ˈɛni ˈdɪskaʊnt ˈkupənz]",
        "hangul_pronunciation": "[두 유 해브 애니 디스카운트 쿠폰즈]"
    },
    {
        "korean": "선물 포장이 가능한가요?",
        "english": "Can you gift wrap this?",
        "pronunciation": "[kæn ju gɪft ræp ðɪs]",
        "hangul_pronunciation": "[캔 유 기프트 랩 디스]"
    },
    {
        "korean": "회원 할인이 있나요?",
        "english": "Is there a membership discount?",
        "pronunciation": "[ɪz ðɛr ə ˈmɛmbərˌʃɪp ˈdɪskaʊnt]",
        "hangul_pronunciation": "[이즈 데어 어 멤버쉽 디스카운트]"
    },
    {
        "korean": "이 제품은 재입고 되나요?",
        "english": "Will this product be restocked?",
        "pronunciation": "[wɪl ðɪs ˈprɑdʌkt bi riˈstɑkt]",
        "hangul_pronunciation": "[윌 디스 프로덕트 비 리스탁트]"
    },
    {
        "korean": "새로운 제품이 언제 나오나요?",
        "english": "When will new products be available?",
        "pronunciation": "[wɛn wɪl nu ˈprɑdʌkts bi əˈveɪləbəl]",
        "hangul_pronunciation": "[웬 윌 뉴 프로덕츠 비 어베일러블]"
    },
    {
        "korean": "반품하려면 어떻게 하나요?",
        "english": "How do I return this?",
        "pronunciation": "[haʊ du aɪ rɪˈtɜrn ðɪs]",
        "hangul_pronunciation": "[하우 두 아이 리턴 디스]"
    },
    {
        "korean": "상품권을 사용할 수 있나요?",
        "english": "Can I use a gift card?",
        "pronunciation": "[kæn aɪ juz ə gɪft kɑrd]",
        "hangul_pronunciation": "[캔 아이 유즈 어 기프트 카드]"
    },
    {
        "korean": "이 제품은 온라인으로만 구매할 수 있나요?",
        "english": "Is this product available online only?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt əˈveɪləbəl ɔnˈlaɪn ˈoʊnli]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 어베일러블 온라인 온리]"
    },
    {
        "korean": "이 제품은 세일 품목인가요?",
        "english": "Is this item on sale?",
        "pronunciation": "[ɪz ðɪs ˈaɪtəm ɑn seɪl]",
        "hangul_pronunciation": "[이즈 디스 아이템 온 세일]"
    },
    {
        "korean": "세일 기간은 언제까지인가요?",
        "english": "When does the sale end?",
        "pronunciation": "[wɛn dʌz ðə seɪl ɛnd]",
        "hangul_pronunciation": "[웬 더즈 더 세일 엔드]"
    },
    {
        "korean": "이 제품은 어디서 살 수 있나요?",
        "english": "Where can I buy this product?",
        "pronunciation": "[wɛr kæn aɪ baɪ ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[웨어 캔 아이 바이 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 다른 크기가 있나요?",
        "english": "Does this product come in other sizes?",
        "pronunciation": "[dʌz ðɪs ˈprɑdʌkt kʌm ɪn ˈʌðər ˈsaɪzɪz]",
        "hangul_pronunciation": "[더즈 디스 프로덕트 컴 인 아더 사이즈즈]"
    },
    {
        "korean": "이 제품은 어디에서 제조되었나요?",
        "english": "Where was this product manufactured?",
        "pronunciation": "[wɛr wʌz ðɪs ˈprɑdʌkt ˌmænjuˈfæktʃərd]",
        "hangul_pronunciation": "[웨어 워즈 디스 프로덕트 매뉴팩처드]"
    },
    {
        "korean": "이 제품은 유해 물질이 포함되어 있나요?",
        "english": "Does this product contain harmful substances?",
        "pronunciation": "[dʌz ðɪs ˈprɑdʌkt kənˈteɪn ˈhɑrmfəl ˈsʌbstənsɪz]",
        "hangul_pronunciation": "[더즈 디스 프로덕트 컨테인 함풀 섭스턴시즈]"
    },
    {
        "korean": "이 제품은 환경 친화적인가요?",
        "english": "Is this product eco-friendly?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt ˈikoʊ-ˈfrɛndli]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 에코-프렌들리]"
    },
    {
        "korean": "이 제품은 얼마나 오래 사용할 수 있나요?",
        "english": "How long does this product last?",
        "pronunciation": "[haʊ lɔŋ dʌz ðɪs ˈprɑdʌkt læst]",
        "hangul_pronunciation": "[하우 롱 더즈 디스 프로덕트 라스트]"
    },
    {
        "korean": "이 제품은 어디에서 사왔나요?",
        "english": "Where did you buy this product?",
        "pronunciation": "[wɛr dɪd ju baɪ ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[웨어 디드 유 바이 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어디에서 생산되나요?",
        "english": "Where is this product produced?",
        "pronunciation": "[wɛr ɪz ðɪs ˈprɑdʌkt prəˈdust]",
        "hangul_pronunciation": "[웨어 이즈 디스 프로덕트 프로듀스드]"
    },
    {
        "korean": "이 제품은 얼마나 자주 사용하나요?",
        "english": "How often do you use this product?",
        "pronunciation": "[haʊ ˈɔfən du ju juz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 오픈 두 유 유즈 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 몇 가지 색상이 있나요?",
        "english": "How many colors does this product come in?",
        "pronunciation": "[haʊ ˈmɛni ˈkʌlərz dʌz ðɪs ˈprɑdʌkt kʌm ɪn]",
        "hangul_pronunciation": "[하우 매니 컬러즈 더즈 디스 프로덕트 컴 인]"
    },
    {
        "korean": "이 제품의 크기는 어떻게 되나요?",
        "english": "What is the size of this product?",
        "pronunciation": "[wʌt ɪz ðə saɪz ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 사이즈 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 안전한가요?",
        "english": "Is this product safe?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt seɪf]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 세이프]"
    },
    {
        "korean": "이 제품의 가격은 얼마인가요?",
        "english": "What is the price of this product?",
        "pronunciation": "[wʌt ɪz ðə praɪs ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 프라이스 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 유효 기간은 언제까지인가요?",
        "english": "What is the expiration date of this product?",
        "pronunciation": "[wʌt ɪz ði ˌɛkspəˈreɪʃən deɪt ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 디 엑스퍼레이션 데이트 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어디에서 수입했나요?",
        "english": "Where was this product imported from?",
        "pronunciation": "[wɛr wʌz ðɪs ˈprɑdʌkt ɪmˈpɔrtɪd frʌm]",
        "hangul_pronunciation": "[웨어 워즈 디스 프로덕트 임포티드 프롬]"
    },
    {
        "korean": "이 제품은 손으로 만든 건가요?",
        "english": "Is this product handmade?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt hændˈmeɪd]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 핸드메이드]"
    },
    {
        "korean": "이 제품은 어디에서 구입할 수 있나요?",
        "english": "Where can I purchase this product?",
        "pronunciation": "[wɛr kæn aɪ ˈpɜrʧəs ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[웨어 캔 아이 퍼체스 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 포장 상태를 확인할 수 있나요?",
        "english": "Can I check the packaging of this product?",
        "pronunciation": "[kæn aɪ ʧɛk ðə ˈpækəʤɪŋ ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[캔 아이 첵 더 패키징 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어떻게 작동하나요?",
        "english": "How does this product work?",
        "pronunciation": "[haʊ dʌz ðɪs ˈprɑdʌkt wɜrk]",
        "hangul_pronunciation": "[하우 더즈 디스 프로덕트 워크]"
    },
    {
        "korean": "이 제품은 몇 가지 기능이 있나요?",
        "english": "How many features does this product have?",
        "pronunciation": "[haʊ ˈmɛni ˈfiʧərz dʌz ðɪs ˈprɑdʌkt hæv]",
        "hangul_pronunciation": "[하우 매니 피처즈 더즈 디스 프로덕트 해브]"
    },
    {
        "korean": "이 제품의 원료는 무엇인가요?",
        "english": "What are the ingredients of this product?",
        "pronunciation": "[wʌt ɑr ði ɪnˈɡridiənts ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 아 더 인그리디언츠 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 언제 출시되었나요?",
        "english": "When was this product released?",
        "pronunciation": "[wɛn wʌz ðɪs ˈprɑdʌkt rɪˈlist]",
        "hangul_pronunciation": "[웬 워즈 디스 프로덕트 릴리스트]"
    },
    {
        "korean": "이 제품은 어디에서 생산되나요?",
        "english": "Where is this product produced?",
        "pronunciation": "[wɛr ɪz ðɪs ˈprɑdʌkt prəˈdust]",
        "hangul_pronunciation": "[웨어 이즈 디스 프로덕트 프로듀스드]"
    },
    {
        "korean": "이 제품의 배송비는 얼마인가요?",
        "english": "What is the shipping cost for this product?",
        "pronunciation": "[wʌt ɪz ðə ˈʃɪpɪŋ kɔst fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 쉬핑 코스트 포 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 리뷰를 볼 수 있나요?",
        "english": "Can I see the reviews for this product?",
        "pronunciation": "[kæn aɪ si ðə rɪˈvjuz fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[캔 아이 씨 더 리뷰즈 포 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 품질은 어떤가요?",
        "english": "How is the quality of this product?",
        "pronunciation": "[haʊ ɪz ðə ˈkwɑləti ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 이즈 더 퀄리티 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어디서 제조되었나요?",
        "english": "Where was this product manufactured?",
        "pronunciation": "[wɛr wʌz ðɪs ˈprɑdʌkt ˌmænjuˈfæktʃərd]",
        "hangul_pronunciation": "[웨어 워즈 디스 프로덕트 매뉴팩처드]"
    },
    {
        "korean": "이 제품은 사용하기 쉬운가요?",
        "english": "Is this product easy to use?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt ˈizi tu juz]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 이지 투 유즈]"
    },
    {
        "korean": "이 제품은 얼마나 자주 사용하나요?",
        "english": "How often do you use this product?",
        "pronunciation": "[haʊ ˈɔfən du ju juz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 오픈 두 유 유즈 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 몇 가지 색상이 있나요?",
        "english": "How many colors does this product come in?",
        "pronunciation": "[haʊ ˈmɛni ˈkʌlərz dʌz ðɪs ˈprɑdʌkt kʌm ɪn]",
        "hangul_pronunciation": "[하우 매니 컬러즈 더즈 디스 프로덕트 컴 인]"
    },
    {
        "korean": "이 제품의 크기는 어떻게 되나요?",
        "english": "What is the size of this product?",
        "pronunciation": "[wʌt ɪz ðə saɪz ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 사이즈 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 안전한가요?",
        "english": "Is this product safe?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt seɪf]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 세이프]"
    },
    {
        "korean": "이 제품의 가격은 얼마인가요?",
        "english": "What is the price of this product?",
        "pronunciation": "[wʌt ɪz ðə praɪs ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 프라이스 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 유효 기간은 언제까지인가요?",
        "english": "What is the expiration date of this product?",
        "pronunciation": "[wʌt ɪz ði ˌɛkspəˈreɪʃən deɪt ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 디 엑스퍼레이션 데이트 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어디에서 수입했나요?",
        "english": "Where was this product imported from?",
        "pronunciation": "[wɛr wʌz ðɪs ˈprɑdʌkt ɪmˈpɔrtɪd frʌm]",
        "hangul_pronunciation": "[웨어 워즈 디스 프로덕트 임포티드 프롬]"
    },
    {
        "korean": "이 제품은 손으로 만든 건가요?",
        "english": "Is this product handmade?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt hændˈmeɪd]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 핸드메이드]"
    },
    {
        "korean": "이 제품의 색상은 무엇인가요?",
        "english": "What are the colors of this product?",
        "pronunciation": "[wʌt ɑr ðə ˈkʌlərz ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 아 더 컬러즈 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 무게는 얼마나 되나요?",
        "english": "What is the weight of this product?",
        "pronunciation": "[wʌt ɪz ðə weɪt ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 웨이트 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 용량은 어떻게 되나요?",
        "english": "What is the capacity of this product?",
        "pronunciation": "[wʌt ɪz ðə kəˈpæsɪti ʌv ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 캐퍼시티 오브 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 어디에서 구매할 수 있나요?",
        "english": "Where can I buy this product?",
        "pronunciation": "[wɛr kæn aɪ baɪ ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[웨어 캔 아이 바이 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 사용 설명서를 주시겠어요?",
        "english": "Can I get the user manual for this product?",
        "pronunciation": "[kæn aɪ gɛt ðə ˈjuzər ˈmænjuəl fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[캔 아이 겟 더 유저 매뉴얼 포 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 품질 보증 기간은 얼마나 되나요?",
        "english": "What is the warranty period for this product?",
        "pronunciation": "[wʌt ɪz ðə ˈwɔrənti ˈpɪriəd fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 이즈 더 워런티 피리어드 포 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 실내에서만 사용 가능한가요?",
        "english": "Is this product only for indoor use?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt ˈoʊnli fɔr ˈɪnˌdɔr juz]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 온리 포 인도어 유즈]"
    },
    {
        "korean": "이 제품은 세척이 쉬운가요?",
        "english": "Is this product easy to clean?",
        "pronunciation": "[ɪz ðɪs ˈprɑdʌkt ˈizi tu klin]",
        "hangul_pronunciation": "[이즈 디스 프로덕트 이지 투 클린]"
    },
    {
        "korean": "이 제품의 소음은 어느 정도인가요?",
        "english": "How noisy is this product?",
        "pronunciation": "[haʊ ˈnɔɪzi ɪz ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[하우 노이지 이즈 디스 프로덕트]"
    },
    {
        "korean": "이 제품의 유지 비용은 어떻게 되나요?",
        "english": "What are the maintenance costs for this product?",
        "pronunciation": "[wʌt ɑr ðə ˈmeɪntənəns kɔsts fɔr ðɪs ˈprɑdʌkt]",
        "hangul_pronunciation": "[왓 아 더 메인테넌스 코스츠 포 디스 프로덕트]"
    },
    {
        "korean": "이 제품은 얼마나 오래 지속되나요?",
        "english": "How long does this product last?",
        "pronunciation": "[haʊ lɔŋ dʌz ðɪs ˈprɑdʌkt læst]",
        "hangul_pronunciation": "[하우 롱 더즈 디스 프로덕트 라스트]"
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
    document.getElementById('word-hangul-pronunciation').innerText = word.hangul_pronunciation;
}

function pronounceWord(times, callback) {
    let count = 0;
    const word = words[currentWordIndex];
    const { korean, english } = word;

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
    setTimeout(() => pronounceWord(1), 2000); // 1초 지연
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

function showWordList() {
    const wordList = document.getElementById('word-list');
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>${word.korean}</strong><br>${word.english}<em><br>${word.pronunciation}</em><br>${word.hangul_pronunciation}<br><br>`;
        wordList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWord();
    showWordList(); // 페이지 로드 시 단어 목록 표시
    setTimeout(() => pronounceWord(1), 2000); // 페이지 로드 후 1초 지연
});
