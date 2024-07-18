const words = [
    { korean: "여기서 거기까지 어떻게 가나요?", english: "How do I get there from here?", pronunciation: "[haʊ du aɪ ɡɛt ðɛr frʌm hɪr]" },
    { korean: "가장 빠른 길은 무엇인가요?", english: "What is the fastest way?", pronunciation: "[wʌt ɪz ðə ˈfæstɪst weɪ]" },
    { korean: "지도를 보여주시겠어요?", english: "Can you show me the map?", pronunciation: "[kæn ju ʃoʊ mi ðə mæp]" },
    { korean: "이 장소에 가는 버스가 있나요?", english: "Is there a bus to this place?", pronunciation: "[ɪz ðɛr ə bʌs tu ðɪs pleɪs]" },
    { korean: "기차역은 어디에 있나요?", english: "Where is the train station?", pronunciation: "[wɛr ɪz ðə treɪn ˈsteɪʃən]" },
    { korean: "이 지역의 관광 지도를 구할 수 있나요?", english: "Can I get a tourist map of this area?", pronunciation: "[kæn aɪ ɡɛt ə ˈtʊrɪst mæp ʌv ðɪs ˈɛriə]" },
    { korean: "가장 가까운 지하철역은 어디인가요?", english: "Where is the nearest subway station?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst ˈsʌbˌweɪ ˈsteɪʃən]" },
    { korean: "이 길이 맞나요?", english: "Is this the right way?", pronunciation: "[ɪz ðɪs ðə raɪt weɪ]" },
    { korean: "여기서부터 몇 블록인가요?", english: "How many blocks from here?", pronunciation: "[haʊ ˈmɛni blɑks frʌm hɪr]" },
    { korean: "다른 길을 추천해 주시겠어요?", english: "Can you recommend another route?", pronunciation: "[kæn ju ˌrɛkəˈmɛnd əˈnʌðər rut]" },

    { korean: "버스표 한 장 주세요.", english: "One bus ticket, please.", pronunciation: "[wʌn bʌs ˈtɪkɪt pliz]" },
    { korean: "왕복 티켓을 구매할 수 있나요?", english: "Can I buy a round trip ticket?", pronunciation: "[kæn aɪ baɪ ə raʊnd trɪp ˈtɪkɪt]" },
    { korean: "이 버스는 어디로 가나요?", english: "Where does this bus go?", pronunciation: "[wɛr dʌz ðɪs bʌs ɡoʊ]" },
    { korean: "버스표는 얼마인가요?", english: "How much is the bus ticket?", pronunciation: "[haʊ mʌʧ ɪz ðə bʌs ˈtɪkɪt]" },
    { korean: "학생 할인이 있나요?", english: "Is there a student discount?", pronunciation: "[ɪz ðɛr ə ˈstudənt ˈdɪskaʊnt]" },
    { korean: "일일 패스를 구매할 수 있나요?", english: "Can I buy a day pass?", pronunciation: "[kæn aɪ baɪ ə deɪ pæs]" },
    { korean: "버스표 자동 판매기는 어디에 있나요?", english: "Where is the bus ticket vending machine?", pronunciation: "[wɛr ɪz ðə bʌs ˈtɪkɪt ˈvɛndɪŋ məˈʃin]" },
    { korean: "버스표를 환불할 수 있나요?", english: "Can I refund the bus ticket?", pronunciation: "[kæn aɪ ˈriˌfʌnd ðə bʌs ˈtɪkɪt]" },
    { korean: "온라인으로 버스표를 구매할 수 있나요?", english: "Can I buy bus tickets online?", pronunciation: "[kæn aɪ baɪ bʌs ˈtɪkɪts ˈɒnˌlaɪn]" },
    { korean: "가장 저렴한 버스표는 무엇인가요?", english: "What is the cheapest bus ticket?", pronunciation: "[wʌt ɪz ðə ˈʧipɪst bʌs ˈtɪkɪt]" },

    { korean: "이 버스는 몇 시에 출발하나요?", english: "What time does this bus leave?", pronunciation: "[wʌt taɪm dʌz ðɪs bʌs liv]" },
    { korean: "어디에서 내려야 하나요?", english: "Where should I get off?", pronunciation: "[wɛr ʃʊd aɪ ɡɛt ɔf]" },
    { korean: "다음 정류장은 어디인가요?", english: "What is the next stop?", pronunciation: "[wʌt ɪz ðə nɛkst stɑp]" },
    { korean: "이 버스는 시내에 가나요?", english: "Does this bus go downtown?", pronunciation: "[dʌz ðɪs bʌs ɡoʊ daʊnˈtaʊn]" },
    { korean: "버스가 언제 도착하나요?", english: "When does the bus arrive?", pronunciation: "[wɛn dʌz ðə bʌs əˈraɪv]" },
    { korean: "이 버스는 종점이 어디인가요?", english: "What is the final destination of this bus?", pronunciation: "[wʌt ɪz ðə ˈfaɪnəl ˌdɛstəˈneɪʃən ʌv ðɪs bʌs]" },
    { korean: "버스가 중간에 멈추나요?", english: "Does the bus make stops along the way?", pronunciation: "[dʌz ðə bʌs meɪk stɑps əˈlɔŋ ðə weɪ]" },
    { korean: "이 버스는 공항에 가나요?", english: "Does this bus go to the airport?", pronunciation: "[dʌz ðɪs bʌs ɡoʊ tu ði ˈɛrˌpɔrt]" },
    { korean: "버스가 늦으면 어떻게 하나요?", english: "What if the bus is late?", pronunciation: "[wʌt ɪf ðə bʌs ɪz leɪt]" },
    { korean: "이 버스는 어느 방향으로 가나요?", english: "Which direction is this bus heading?", pronunciation: "[wɪʧ dəˈrɛkʃən ɪz ðɪs bʌs ˈhɛdɪŋ]" },

    { korean: "기차표 한 장 주세요.", english: "One train ticket, please.", pronunciation: "[wʌn treɪn ˈtɪkɪt pliz]" },
    { korean: "전철표는 얼마인가요?", english: "How much is the subway ticket?", pronunciation: "[haʊ mʌʧ ɪz ðə ˈsʌbˌweɪ ˈtɪkɪt]" },
    { korean: "첫 기차는 몇 시에 출발하나요?", english: "What time does the first train leave?", pronunciation: "[wʌt taɪm dʌz ðə fɜrst treɪn liv]" },
    { korean: "기차표를 어디서 살 수 있나요?", english: "Where can I buy a train ticket?", pronunciation: "[wɛr kæn aɪ baɪ ə treɪn ˈtɪkɪt]" },
    { korean: "이 기차는 몇 시에 도착하나요?", english: "What time does this train arrive?", pronunciation: "[wʌt taɪm dʌz ðɪs treɪn əˈraɪv]" },
    { korean: "기차표를 예약할 수 있나요?", english: "Can I reserve a train ticket?", pronunciation: "[kæn aɪ rɪˈzɜrv ə treɪn ˈtɪkɪt]" },
    { korean: "할인 기차표가 있나요?", english: "Are there any discount train tickets?", pronunciation: "[ɑr ðɛr ˈɛni ˈdɪsˌkaʊnt treɪn ˈtɪkɪts]" },
    { korean: "표를 몇 시까지 구매할 수 있나요?", english: "Until what time can I buy tickets?", pronunciation: "[ənˈtɪl wʌt taɪm kæn aɪ baɪ ˈtɪkɪts]" },
    { korean: "기차표를 교환할 수 있나요?", english: "Can I exchange my train ticket?", pronunciation: "[kæn aɪ ɪksˈʧeɪndʒ maɪ treɪn ˈtɪkɪt]" },
    { korean: "아이들 기차표 요금은 얼마인가요?", english: "How much is the fare for children's train tickets?", pronunciation: "[haʊ mʌʧ ɪz ðə fɛr fɔr ˈʧɪldrənz treɪn ˈtɪkɪts]" },

    { korean: "기차는 어디에서 타나요?", english: "Where do I get on the train?", pronunciation: "[wɛr du aɪ ɡɛt ɑn ðə treɪn]" },
    { korean: "이 전철은 시내로 가나요?", english: "Does this subway go downtown?", pronunciation: "[dʌz ðɪs ˈsʌbˌweɪ ɡoʊ daʊnˈtaʊn]" },
    { korean: "기차역은 어디인가요?", english: "Where is the train station?", pronunciation: "[wɛr ɪz ðə treɪn ˈsteɪʃən]" },
    { korean: "이 기차는 어디로 가나요?", english: "Where does this train go?", pronunciation: "[wɛr dʌz ðɪs treɪn ɡoʊ]" },
    { korean: "전철은 언제 도착하나요?", english: "When does the subway arrive?", pronunciation: "[wɛn dʌz ðə ˈsʌbˌweɪ əˈraɪv]" },
    { korean: "기차를 어디서 타야 하나요?", english: "Where do I board the train?", pronunciation: "[wɛr du aɪ bɔrd ðə treɪn]" },
    { korean: "이 기차는 몇 번 플랫폼에서 출발하나요?", english: "Which platform does this train leave from?", pronunciation: "[wɪʧ ˈplætfɔrm dʌz ðɪs treɪn liv frʌm]" },
    { korean: "이 전철은 얼마나 자주 다니나요?", english: "How frequently does the subway run?", pronunciation: "[haʊ ˈfrikwəntli dʌz ðə ˈsʌbˌweɪ rʌn]" },
    { korean: "다음 기차는 언제 출발하나요?", english: "When does the next train leave?", pronunciation: "[wɛn dʌz ðə nɛkst treɪn liv]" },
    { korean: "이 기차는 직행인가요?", english: "Is this train direct?", pronunciation: "[ɪz ðɪs treɪn dəˈrɛkt]" },

    { korean: "택시를 타고 싶어요.", english: "I want to take a taxi.", pronunciation: "[aɪ wɑnt tu teɪk ə ˈtæksi]" },
    { korean: "가장 가까운 택시 정류장은 어디인가요?", english: "Where is the nearest taxi stand?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst ˈtæksi stænd]" },
    { korean: "여기에서 택시를 잡을 수 있나요?", english: "Can I get a taxi here?", pronunciation: "[kæn aɪ ɡɛt ə ˈtæksi hɪr]" },
    { korean: "시내까지 가는 데 얼마나 걸리나요?", english: "How long does it take to get downtown?", pronunciation: "[haʊ lɔŋ dʌz ɪt teɪk tu ɡɛt daʊnˈtaʊn]" },
    { korean: "택시를 부를 수 있나요?", english: "Can you call a taxi?", pronunciation: "[kæn ju kɔl ə ˈtæksi]" },
    { korean: "목적지까지 얼마나 걸리나요?", english: "How long does it take to get to the destination?", pronunciation: "[haʊ lɔŋ dʌz ɪt teɪk tu ɡɛt tu ðə ˌdɛstəˈneɪʃən]" },
    { korean: "이 주소로 가주세요.", english: "Please take me to this address.", pronunciation: "[pliz teɪk mi tu ðɪs ˈæˌdrɛs]" },
    { korean: "택시를 어디서 탈 수 있나요?", english: "Where can I get a taxi?", pronunciation: "[wɛr kæn aɪ ɡɛt ə ˈtæksi]" },
    { korean: "미터기를 켜 주세요.", english: "Please turn on the meter.", pronunciation: "[pliz tɜrn ɑn ðə ˈmitər]" },
    { korean: "택시를 미리 예약할 수 있나요?", english: "Can I book a taxi in advance?", pronunciation: "[kæn aɪ bʊk ə ˈtæksi ɪn ædˈvæns]" },

    { korean: "여기서 내릴게요.", english: "I will get off here.", pronunciation: "[aɪ wɪl ɡɛt ɔf hɪr]" },
    { korean: "얼마인가요?", english: "How much is it?", pronunciation: "[haʊ mʌʧ ɪz ɪt]" },
    { korean: "거스름돈 주세요.", english: "Please give me the change.", pronunciation: "[pliz ɡɪv mi ðə ʧeɪnʤ]" },
    { korean: "카드로 결제할 수 있나요?", english: "Can I pay by card?", pronunciation: "[kæn aɪ peɪ baɪ kɑrd]" },
    { korean: "영수증 주세요.", english: "Please give me a receipt.", pronunciation: "[pliz ɡɪv mi ə rəˈsit]" },
    { korean: "여기서 오른쪽으로 돌아주세요.", english: "Please turn right here.", pronunciation: "[pliz tɜrn raɪt hɪr]" },
    { korean: "저기서 좌회전 해주세요.", english: "Please turn left over there.", pronunciation: "[pliz tɜrn lɛft ˈoʊvər ðɛr]" },
    { korean: "여기서 멈춰 주세요.", english: "Please stop here.", pronunciation: "[pliz stɑp hɪr]" },
    { korean: "도착 시간이 얼마나 남았나요?", english: "How much time is left to arrive?", pronunciation: "[haʊ mʌʧ taɪm ɪz lɛft tu əˈraɪv]" },
    { korean: "주차비는 얼마인가요?", english: "How much is the parking fee?", pronunciation: "[haʊ mʌʧ ɪz ðə ˈpɑrkɪŋ fi]" },

    { korean: "차를 렌트하고 싶어요.", english: "I want to rent a car.", pronunciation: "[aɪ wɑnt tu rɛnt ə kɑr]" },
    { korean: "렌터카 비용은 얼마인가요?", english: "How much is the rental car?", pronunciation: "[haʊ mʌʧ ɪz ðə ˈrɛntəl kɑr]" },
    { korean: "운전 면허증을 보여드려야 하나요?", english: "Do I need to show my driver's license?", pronunciation: "[du aɪ nid tu ʃoʊ maɪ ˈdraɪvərz ˈlaɪsəns]" },
    { korean: "보험이 포함되어 있나요?", english: "Is insurance included?", pronunciation: "[ɪz ɪnˈʃʊrəns ɪnˈkludɪd]" },
    { korean: "자동차를 어디서 픽업하나요?", english: "Where do I pick up the car?", pronunciation: "[wɛr du aɪ pɪk ʌp ðə kɑr]" },
    { korean: "어떤 차종이 있나요?", english: "What types of cars are available?", pronunciation: "[wʌt taɪps ʌv kɑrz ɑr əˈveɪləbəl]" },
    { korean: "자동차를 반납하는 절차는 무엇인가요?", english: "What is the procedure to return the car?", pronunciation: "[wʌt ɪz ðə prəˈsiʤər tu rɪˈtɜrn ðə kɑr]" },
    { korean: "주유소는 어디에 있나요?", english: "Where is the nearest gas station?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst ɡæs ˈsteɪʃən]" },
    { korean: "차량을 연장할 수 있나요?", english: "Can I extend the rental period?", pronunciation: "[kæn aɪ ɪkˈstɛnd ðə ˈrɛntəl ˈpɪriəd]" },
    { korean: "네비게이션이 포함되어 있나요?", english: "Is a navigation system included?", pronunciation: "[ɪz ə ˌnævɪˈɡeɪʃən ˈsɪstəm ɪnˈkludɪd]" },

    { korean: "주차 공간이 있나요?", english: "Is there parking space available?", pronunciation: "[ɪz ðɛr ˈpɑrkɪŋ speɪs əˈveɪləbəl]" },
    { korean: "도시 교통은 어떤가요?", english: "How is the city traffic?", pronunciation: "[haʊ ɪz ðə ˈsɪti ˈtræfɪk]" },
    { korean: "교통 카드가 필요하나요?", english: "Do I need a transportation card?", pronunciation: "[du aɪ nid ə ˌtrænspərˈteɪʃən kɑrd]" },
    { korean: "현금만 받나요?", english: "Do you accept cash only?", pronunciation: "[du ju ækˈsɛpt kæʃ ˈoʊnli]" },
    { korean: "인터넷으로 예약할 수 있나요?", english: "Can I make a reservation online?", pronunciation: "[kæn aɪ meɪk ə ˌrɛzərˈveɪʃən ˈɒnˌlaɪn]" },
    { korean: "걸어서 얼마나 걸리나요?", english: "How long does it take to walk?", pronunciation: "[haʊ lɔŋ dʌz ɪt teɪk tu wɔk]" },
    { korean: "택시를 타는 게 빠를까요?", english: "Is it faster to take a taxi?", pronunciation: "[ɪz ɪt ˈfæstər tu teɪk ə ˈtæksi]" },
    { korean: "지하철 노선을 알려주시겠어요?", english: "Can you tell me the subway line?", pronunciation: "[kæn ju tɛl mi ðə ˈsʌbˌweɪ laɪn]" },
    { korean: "이 길로 가도 되나요?", english: "Is it okay to go this way?", pronunciation: "[ɪz ɪt ˈoʊˌkeɪ tu ɡoʊ ðɪs weɪ]" },
    { korean: "대중교통으로 얼마나 걸리나요?", english: "How long does it take by public transportation?", pronunciation: "[haʊ lɔŋ dʌz ɪt teɪk baɪ ˈpʌblɪk ˌtrænspərˈteɪʃən]" },
    { korean: "기차표를 어떻게 구매하나요?", english: "How do I buy train tickets?", pronunciation: "[haʊ du aɪ baɪ treɪn ˈtɪkɪts]" },
    { korean: "인터넷으로 기차표를 살 수 있나요?", english: "Can I buy train tickets online?", pronunciation: "[kæn aɪ baɪ treɪn ˈtɪkɪts ˈɒnˌlaɪn]" },
    { korean: "기차표 자동판매기는 어디에 있나요?", english: "Where is the train ticket vending machine?", pronunciation: "[wɛr ɪz ðə treɪn ˈtɪkɪt ˈvɛndɪŋ məˈʃin]" },
    { korean: "왕복 기차표를 구매할 수 있나요?", english: "Can I buy a round trip train ticket?", pronunciation: "[kæn aɪ baɪ ə raʊnd trɪp treɪn ˈtɪkɪt]" },
    { korean: "기차표를 환불할 수 있나요?", english: "Can I refund the train ticket?", pronunciation: "[kæn aɪ ˈriˌfʌnd ðə treɪn ˈtɪkɪt]" },
    { korean: "이 기차는 어디로 가나요?", english: "Where does this train go?", pronunciation: "[wɛr dʌz ðɪs treɪn ɡoʊ]" },
    { korean: "다음 기차는 언제 출발하나요?", english: "When does the next train leave?", pronunciation: "[wɛn dʌz ðə nɛkst treɪn liv]" },
    { korean: "기차 좌석은 예약되어 있나요?", english: "Are the train seats reserved?", pronunciation: "[ɑr ðə treɪn sits rɪˈzɜrvd]" },
    { korean: "기차에 와이파이가 있나요?", english: "Is there Wi-Fi on the train?", pronunciation: "[ɪz ðɛr ˈwaɪˌfaɪ ɑn ðə treɪn]" },
    { korean: "전철은 몇 시에 출발하나요?", english: "What time does the subway leave?", pronunciation: "[wʌt taɪm dʌz ðə ˈsʌbˌweɪ liv]" },
    { korean: "택시를 불러주시겠어요?", english: "Can you call a taxi for me?", pronunciation: "[kæn ju kɔl ə ˈtæksi fɔr mi]" },
    { korean: "공항까지 얼마나 걸리나요?", english: "How long does it take to get to the airport?", pronunciation: "[haʊ lɔŋ dʌz ɪt teɪk tu ɡɛt tu ði ˈɛrˌpɔrt]" },
    { korean: "택시비는 얼마인가요?", english: "How much is the taxi fare?", pronunciation: "[haʊ mʌʧ ɪz ðə ˈtæksi fɛr]" },
    { korean: "신용카드로 결제할 수 있나요?", english: "Can I pay by credit card?", pronunciation: "[kæn aɪ peɪ baɪ ˈkrɛdɪt kɑrd]" },
    { korean: "이 주소로 가주세요.", english: "Please take me to this address.", pronunciation: "[pliz teɪk mi tu ðɪs ˈæˌdrɛs]" },
    { korean: "목적지에 도착하면 알려주세요.", english: "Please let me know when we arrive.", pronunciation: "[pliz lɛt mi noʊ wɛn wi əˈraɪv]" },
    { korean: "거스름돈을 받을 수 있나요?", english: "Can I get the change?", pronunciation: "[kæn aɪ ɡɛt ðə ʧeɪnʤ]" },
    { korean: "여기서 내려주세요.", english: "Please drop me off here.", pronunciation: "[pliz drɑp mi ɔf hɪr]" },
    { korean: "영수증을 받을 수 있나요?", english: "Can I get a receipt?", pronunciation: "[kæn aɪ ɡɛt ə rəˈsit]" },
    { korean: "얼마인가요?", english: "How much is it?", pronunciation: "[haʊ mʌʧ ɪz ɪt]" },
    { korean: "렌터카 예약을 했습니다.", english: "I have a car rental reservation.", pronunciation: "[aɪ hæv ə kɑr ˈrɛntəl ˌrɛzərˈveɪʃən]" },
    { korean: "운전 면허증을 제시해야 하나요?", english: "Do I need to show my driver's license?", pronunciation: "[du aɪ nid tu ʃoʊ maɪ ˈdraɪvərz ˈlaɪsəns]" },
    { korean: "보험이 포함되어 있나요?", english: "Is insurance included?", pronunciation: "[ɪz ɪnˈʃʊrəns ɪnˈkludɪd]" },
    { korean: "차량을 어디서 반납하나요?", english: "Where do I return the car?", pronunciation: "[wɛr du aɪ rɪˈtɜrn ðə kɑr]" },
    { korean: "차량 픽업 장소는 어디인가요?", english: "Where is the car pick-up location?", pronunciation: "[wɛr ɪz ðə kɑr ˈpɪk-ʌp loʊˈkeɪʃən]" },
    { korean: "근처에 주차장이 있나요?", english: "Is there a parking lot nearby?", pronunciation: "[ɪz ðɛr ə ˈpɑrkɪŋ lɑt ˈnɪərˌbaɪ]" },
    { korean: "근처에 화장실이 있나요?", english: "Is there a restroom nearby?", pronunciation: "[ɪz ðɛr ə ˈrɛstˌrum ˈnɪərˌbaɪ]" },
    { korean: "가장 가까운 편의점은 어디인가요?", english: "Where is the nearest convenience store?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst kənˈvinjəns stɔr]" },
    { korean: "관광 안내 책자를 얻을 수 있나요?", english: "Can I get a tourist information booklet?", pronunciation: "[kæn aɪ ɡɛt ə ˈtʊrɪst ˌɪnfərˈmeɪʃən ˈbʊklɪt]" },
    { korean: "여기에서 시내 중심가로 가는 방법은?", english: "How do I get to the city center from here?", pronunciation: "[haʊ du aɪ ɡɛt tu ðə ˈsɪti ˈsɛntər frʌm hɪr]" },
    { korean: "길을 잃었어요. 도와주실 수 있나요?", english: "I'm lost. Can you help me?", pronunciation: "[aɪm lɔst. kæn ju hɛlp mi]" },
    { korean: "이 주소는 어디인가요?", english: "Where is this address?", pronunciation: "[wɛr ɪz ðɪs ˈæˌdrɛs]" },
    { korean: "여기서 가까운 호텔은 어디인가요?", english: "Where is the nearest hotel from here?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst hoʊˈtɛl frʌm hɪr]" },
    { korean: "지하철역으로 가는 길을 알려주세요.", english: "Please tell me how to get to the subway station.", pronunciation: "[pliz tɛl mi haʊ tu ɡɛt tu ðə ˈsʌbˌweɪ ˈsteɪʃən]" },
    { korean: "이 지역에서 가장 유명한 관광지는 무엇인가요?", english: "What are the most famous tourist spots in this area?", pronunciation: "[wʌt ɑr ðə moʊst ˈfeɪməs ˈtʊrɪst spɑts ɪn ðɪs ˈɛriə]" },
    { korean: "이 도시에서 가장 유명한 음식은 무엇인가요?", english: "What is the most famous food in this city?", pronunciation: "[wʌt ɪz ðə moʊst ˈfeɪməs fud ɪn ðɪs ˈsɪti]" },
    { korean: "이곳에서 가장 좋은 레스토랑은 어디인가요?", english: "Where is the best restaurant here?", pronunciation: "[wɛr ɪz ðə bɛst ˈrɛstərənt hɪr]" },
    { korean: "관광 정보 센터는 어디에 있나요?", english: "Where is the tourist information center?", pronunciation: "[wɛr ɪz ðə ˈtʊrɪst ˌɪnfərˈmeɪʃən ˈsɛntər]" },
    { korean: "이 지역에서 무엇을 할 수 있나요?", english: "What can I do in this area?", pronunciation: "[wʌt kæn aɪ du ɪn ðɪs ˈɛriə]" },   
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
        playNextWord();
    }, 12000); // 8초 간격으로 다음 단어 재생
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

