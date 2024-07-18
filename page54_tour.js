const words = [
        {korean: "이곳의 문화 행사는 무엇이 있나요?", english: "What cultural events are held here?", pronunciation: "[wʌt ˈkʌlʧərəl ɪˈvɛnts ɑr hɛld hɪr]" },
        { korean: "이곳의 전통 공연은 어디에서 볼 수 있나요?", english: "Where can I see traditional performances here?", pronunciation: "[wɛr kæn aɪ si trəˈdɪʃənəl pərˈfɔrmənsɪz hɪr]" },
        { korean: "이곳의 전통 음식을 어디서 맛볼 수 있나요?", english: "Where can I try traditional food here?", pronunciation: "[wɛr kæn aɪ traɪ trəˈdɪʃənəl fud hɪr]" },
        { korean: "이곳의 역사적인 건물은 무엇이 있나요?", english: "What are the historical buildings here?", pronunciation: "[wʌt ɑr ðə hɪˈstɔrɪkəl ˈbɪldɪŋz hɪr]" },
        { korean: "이곳의 자연 보호 구역은 어디에 있나요?", english: "Where are the nature reserves here?", pronunciation: "[wɛr ɑr ðə ˈneɪʧər rɪˈzɜrvz hɪr]" },
        { korean: "이곳의 유명한 예술가는 누구인가요?", english: "Who are the famous artists here?", pronunciation: "[hu ɑr ðə ˈfeɪməs ˈɑrtɪsts hɪr]" },
        { korean: "이곳의 박물관에는 어떤 전시물이 있나요?", english: "What exhibits are in the museum here?", pronunciation: "[wʌt ɛɡˈzɪbəts ɑr ɪn ðə mjuˈziəm hɪr]" },
        { korean: "이곳의 미술관은 어디에 있나요?", english: "Where is the art gallery here?", pronunciation: "[wɛr ɪz ði ɑrt ˈɡæləri hɪr]" },
        { korean: "이곳의 건축 양식은 무엇인가요?", english: "What is the architectural style here?", pronunciation: "[wʌt ɪz ði ˌɑrkəˈtɛkʧərəl staɪl hɪr]" },
        { korean: "이곳의 유명한 시장은 어디인가요?", english: "Where is the famous market here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈmɑrkɪt hɪr]" },
        { korean: "이곳에서 야경을 잘 볼 수 있는 곳은 어디인가요?", english: "Where is the best place to see the night view here?", pronunciation: "[wɛr ɪz ðə bɛst pleɪs tu si ðə naɪt vju hɪr]" },
        { korean: "이곳의 공원은 몇 시에 문을 닫나요?", english: "What time does the park close here?", pronunciation: "[wʌt taɪm dʌz ðə pɑrk kloʊz hɪr]" },
        { korean: "이곳의 유명한 축제는 언제 열리나요?", english: "When is the famous festival held here?", pronunciation: "[wɛn ɪz ðə ˈfeɪməs ˈfɛstəvəl hɛld hɪr]" },
        { korean: "이곳에서 사파리는 어디에서 탈 수 있나요?", english: "Where can I take a safari here?", pronunciation: "[wɛr kæn aɪ teɪk ə səˈfɑri hɪr]" },
        { korean: "이곳의 인기 있는 드라이브 코스는 어디인가요?", english: "Where is the popular driving route here?", pronunciation: "[wɛr ɪz ðə ˈpɑpjələr ˈdraɪvɪŋ rut hɪr]" },
        { korean: "이곳의 야경 투어는 어디에서 출발하나요?", english: "Where does the night tour start here?", pronunciation: "[wɛr dʌz ðə naɪt tʊr stɑrt hɪr]" },
        { korean: "이곳의 유명한 동물원은 어디에 있나요?", english: "Where is the famous zoo here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs zu hɪr]" },
        { korean: "이곳의 수족관은 어디에 있나요?", english: "Where is the aquarium here?", pronunciation: "[wɛr ɪz ði əˈkwɛriəm hɪr]" },
        { korean: "이곳의 놀이공원은 어디에 있나요?", english: "Where is the amusement park here?", pronunciation: "[wɛr ɪz ði əˈmjuzmənt pɑrk hɪr]" },
        { korean: "이곳의 유명한 해산물 시장은 어디에 있나요?", english: "Where is the famous seafood market here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈsiˌfud ˈmɑrkɪt hɪr]" },
        { korean: "이곳에서 가장 오래된 다리는 무엇인가요?", english: "What is the oldest bridge here?", pronunciation: "[wʌt ɪz ði ˈoʊldɪst brɪdʒ hɪr]" },
        { korean: "이곳의 야시장에서는 무엇을 팔고 있나요?", english: "What is sold at the night market here?", pronunciation: "[wʌt ɪz soʊld æt ðə naɪt ˈmɑrkɪt hɪr]" },
        { korean: "이곳에서 자전거 투어를 할 수 있나요?", english: "Can I take a bicycle tour here?", pronunciation: "[kæn aɪ teɪk ə ˈbaɪsɪkəl tʊr hɪr]" },
        { korean: "이곳에서 하이킹을 즐길 수 있나요?", english: "Can I enjoy hiking here?", pronunciation: "[kæn aɪ ɛnˈʤɔɪ ˈhaɪkɪŋ hɪr]" },
        { korean: "이곳의 유명한 등산 코스는 어디에 있나요?", english: "Where is the famous hiking trail here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈhaɪkɪŋ treɪl hɪr]" },
        { korean: "이곳에서 카약을 탈 수 있나요?", english: "Can I go kayaking here?", pronunciation: "[kæn aɪ ɡoʊ ˈkaɪækɪŋ hɪr]" },
        { korean: "이곳에서 스쿠버 다이빙을 할 수 있나요?", english: "Can I go scuba diving here?", pronunciation: "[kæn aɪ ɡoʊ ˈskuːbə ˈdaɪvɪŋ hɪr]" },
        { korean: "이곳의 유명한 야경 명소는 어디에 있나요?", english: "Where are the famous night spots here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs naɪt spɑts hɪr]" },
        { korean: "이곳의 미술관 입장료는 얼마인가요?", english: "How much is the admission fee for the art gallery here?", pronunciation: "[haʊ mʌʧ ɪz ði ədˈmɪʃən fi fɔr ði ɑrt ˈɡæləri hɪr]" },
        { korean: "이곳에서 트레킹을 즐길 수 있나요?", english: "Can I enjoy trekking here?", pronunciation: "[kæn aɪ ɛnˈʤɔɪ ˈtrɛkɪŋ hɪr]" },
        { korean: "이곳에서 패러글라이딩을 할 수 있나요?", english: "Can I go paragliding here?", pronunciation: "[kæn aɪ ɡoʊ ˈpɛrəˌɡlaɪdɪŋ hɪr]" },
        { korean: "이곳에서 캠핑을 즐길 수 있나요?", english: "Can I go camping here?", pronunciation: "[kæn aɪ ɡoʊ ˈkæmpɪŋ hɪr]" },
        { korean: "이곳의 유명한 쇼핑 거리는 어디에 있나요?", english: "Where is the famous shopping street here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈʃɑpɪŋ strit hɪr]" },
        { korean: "이곳에서 먹을 수 있는 전통 간식은 무엇인가요?", english: "What traditional snacks can I try here?", pronunciation: "[wʌt trəˈdɪʃənəl snæks kæn aɪ traɪ hɪr]" },
        { korean: "이곳의 유명한 농산물 시장은 어디에 있나요?", english: "Where is the famous farmers market here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈfɑrmərz ˈmɑrkɪt hɪr]" },
        { korean: "이곳에서 유람선을 탈 수 있나요?", english: "Can I take a cruise here?", pronunciation: "[kæn aɪ teɪk ə kruz hɪr]" },
        { korean: "이곳의 유명한 골프장은 어디에 있나요?", english: "Where is the famous golf course here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ɡɑlf kɔrs hɪr]" },
        { korean: "이곳에서 열기구 체험을 할 수 있나요?", english: "Can I go on a hot air balloon ride here?", pronunciation: "[kæn aɪ ɡoʊ ɑn ə hɑt ɛr bəˈlun raɪd hɪr]" },
        { korean: "이곳의 유명한 공연장은 어디에 있나요?", english: "Where is the famous theater here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈθiətər hɪr]" },
        { korean: "이곳에서 세그웨이를 탈 수 있나요?", english: "Can I ride a Segway here?", pronunciation: "[kæn aɪ raɪd ə ˈsɛɡweɪ hɪr]" },
        { korean: "이곳의 유명한 전시회는 무엇인가요?", english: "What are the famous exhibitions here?", pronunciation: "[wʌt ɑr ðə ˈfeɪməs ˌɛksəˈbɪʃənz hɪr]" },
        { korean: "이곳에서 수상 스포츠를 즐길 수 있나요?", english: "Can I enjoy water sports here?", pronunciation: "[kæn aɪ ɛnˈʤɔɪ ˈwɔtər spɔrts hɪr]" },
        { korean: "이곳의 유명한 자연 온천은 어디에 있나요?", english: "Where are the famous natural hot springs here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs ˈnæʧərəl hɑt sprɪŋz hɪr]" },
        { korean: "이곳에서 별을 잘 볼 수 있는 곳은 어디인가요?", english: "Where is the best place to see stars here?", pronunciation: "[wɛr ɪz ðə bɛst pleɪs tu si stɑrz hɪr]" },
        { korean: "이곳의 유명한 와이너리는 어디에 있나요?", english: "Where is the famous winery here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈwaɪnəri hɪr]" },
        { korean: "이곳에서 승마를 즐길 수 있나요?", english: "Can I go horseback riding here?", pronunciation: "[kæn aɪ ɡoʊ ˈhɔrsˌbæk ˈraɪdɪŋ hɪr]" },
        { korean: "이곳에서 서핑을 즐길 수 있나요?", english: "Can I go surfing here?", pronunciation: "[kæn aɪ ɡoʊ ˈsɜrfɪŋ hɪr]" },
        { korean: "이곳에서 유명한 관광 가이드는 누구인가요?", english: "Who are the famous tour guides here?", pronunciation: "[hu ɑr ðə ˈfeɪməs tʊr ɡaɪdz hɪr]" },
        { korean: "이곳의 유명한 사진 촬영 명소는 어디에 있나요?", english: "Where are the famous photo spots here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs ˈfoʊtoʊ spɑts hɪr]" },
        { korean: "이곳의 유명한 전통 공예품은 무엇인가요?", english: "What are the famous traditional crafts here?", pronunciation: "[wʌt ɑr ðə ˈfeɪməs trəˈdɪʃənəl kræfts hɪr]" },
        {korean: "가장 유명한 관광지는 어디인가요?", english: "Where is the most famous tourist spot?", pronunciation: "[wɛr ɪz ðə moʊst ˈfeɪməs ˈtʊrɪst spɑt]" },
        { korean: "이곳의 주요 명소는 무엇인가요?", english: "What are the main attractions here?", pronunciation: "[wʌt ɑr ðə meɪn əˈtrækʃənz hɪr]" },
        { korean: "여기에서 투어를 예약할 수 있나요?", english: "Can I book a tour here?", pronunciation: "[kæn aɪ bʊk ə tʊr hɪr]" },
        { korean: "도시 투어 버스는 어디서 타나요?", english: "Where can I catch the city tour bus?", pronunciation: "[wɛr kæn aɪ kæʧ ðə ˈsɪti tʊr bʌs]" },
        { korean: "이곳의 가이드북을 받을 수 있나요?", english: "Can I get a guidebook for this place?", pronunciation: "[kæn aɪ ɡɛt ə ˈɡaɪdˌbʊk fɔr ðɪs pleɪs]" },
        { korean: "가장 좋은 관광 시즌은 언제인가요?", english: "When is the best season to visit?", pronunciation: "[wɛn ɪz ðə bɛst ˈsizən tu ˈvɪzɪt]" },
        { korean: "여기서 가장 가까운 지하철역은 어디인가요?", english: "Where is the nearest subway station?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst ˈsʌbˌweɪ ˈsteɪʃən]" },
        { korean: "이곳에서 가장 가까운 버스 정류장은 어디인가요?", english: "Where is the nearest bus stop?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst bʌs stɑp]" },
        { korean: "가이드 투어는 몇 시에 출발하나요?", english: "What time does the guided tour depart?", pronunciation: "[wʌt taɪm dʌz ðə ˈɡaɪdɪd tʊr dɪˈpɑrt]" },
        { korean: "이곳에서 가장 아름다운 풍경은 어디에서 볼 수 있나요?", english: "Where can I see the most beautiful scenery here?", pronunciation: "[wɛr kæn aɪ si ðə moʊst ˈbjutɪfəl ˈsinəri hɪr]" },
        { korean: "이곳의 추천 투어 코스는 무엇인가요?", english: "What tour course do you recommend here?", pronunciation: "[wʌt tʊr kɔrs du ju ˌrɛkəˈmɛnd hɪr]" },
        { korean: "이곳의 유명한 박물관은 어디에 있나요?", english: "Where is the famous museum here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs mjuˈziəm hɪr]" },
        { korean: "이곳에서 가장 인기 있는 투어는 무엇인가요?", english: "What is the most popular tour here?", pronunciation: "[wʌt ɪz ðə moʊst ˈpɑpjələr tʊr hɪr]" },
        { korean: "가장 가까운 관광 정보 센터는 어디인가요?", english: "Where is the nearest tourist information center?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst ˈtʊrɪst ˌɪnfərˈmeɪʃən ˈsɛntər]" },
        { korean: "이곳의 역사 투어는 어디에서 출발하나요?", english: "Where does the historical tour start?", pronunciation: "[wɛr dʌz ðə hɪˈstɔrɪkəl tʊr stɑrt]" },
        { korean: "이곳의 자연 경관 투어는 어디에서 시작하나요?", english: "Where does the nature scenery tour start?", pronunciation: "[wɛr dʌz ðə ˈneɪʧər ˈsinəri tʊr stɑrt]" },
        { korean: "여기서 가까운 유적지는 어디에 있나요?", english: "Where is the nearest historical site?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst hɪˈstɔrɪkəl saɪt]" },
        { korean: "이곳에서 가이드 서비스를 제공하나요?", english: "Do you offer guide services here?", pronunciation: "[du ju ˈɔfər ɡaɪd ˈsɜrvɪsɪz hɪr]" },
        { korean: "이곳의 유명한 전망대는 어디에 있나요?", english: "Where is the famous observation deck here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˌɑbzərˈveɪʃən dɛk hɪr]" },
        { korean: "이곳의 역사적인 투어 코스는 무엇인가요?", english: "What is the historical tour course here?", pronunciation: "[wʌt ɪz ðə hɪˈstɔrɪkəl tʊr kɔrs hɪr]" },
        { korean: "이곳에서 자전거를 빌릴 수 있나요?", english: "Can I rent a bike here?", pronunciation: "[kæn aɪ rɛnt ə baɪk hɪr]" },
        { korean: "이곳에서 카약 투어가 가능한가요?", english: "Is a kayak tour available here?", pronunciation: "[ɪz ə ˈkaɪæk tʊr əˈveɪləbəl hɪr]" },
        { korean: "이곳에서 가이드 투어를 예약할 수 있나요?", english: "Can I book a guided tour here?", pronunciation: "[kæn aɪ bʊk ə ˈɡaɪdɪd tʊr hɪr]" },
        { korean: "이곳의 추천 관광지는 어디인가요?", english: "What are the recommended tourist spots here?", pronunciation: "[wʌt ɑr ðə ˌrɛkəˈmɛndəd ˈtʊrɪst spɑts hɪr]" },
        { korean: "이곳의 유명한 산책로는 어디에 있나요?", english: "Where is the famous walking trail here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈwɔkɪŋ treɪl hɪr]" },
        { korean: "이곳의 자연 투어는 어디에서 출발하나요?", english: "Where does the nature tour start?", pronunciation: "[wɛr dʌz ðə ˈneɪʧər tʊr stɑrt]" },
        { korean: "이곳의 야경을 잘 볼 수 있는 곳은 어디인가요?", english: "Where is the best place to see the night view?", pronunciation: "[wɛr ɪz ðə bɛst pleɪs tu si ðə naɪt vju]" },
        { korean: "이곳의 유명한 예술가는 누구인가요?", english: "Who is the famous artist here?", pronunciation: "[hu ɪz ðə ˈfeɪməs ˈɑrtɪst hɪr]" },
        { korean: "이곳에서 인기 있는 기념품은 무엇인가요?", english: "What are the popular souvenirs here?", pronunciation: "[wʌt ɑr ðə ˈpɑpjələr ˈsuvənɪrz hɪr]" },
        { korean: "이곳의 문화 투어는 어디에서 출발하나요?", english: "Where does the cultural tour start?", pronunciation: "[wɛr dʌz ðə ˈkʌlʧərəl tʊr stɑrt]" },
        { korean: "여기서 가장 가까운 ATM은 어디에 있나요?", english: "Where is the nearest ATM?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst ˌeɪtiˈɛm]" },
        { korean: "이곳에서 도시 투어 버스를 탈 수 있나요?", english: "Can I catch a city tour bus here?", pronunciation: "[kæn aɪ kæʧ ə ˈsɪti tʊr bʌs hɪr]" },
        { korean: "이곳의 대표 음식은 무엇인가요?", english: "What is the signature dish here?", pronunciation: "[wʌt ɪz ðə ˈsɪɡnəʧər dɪʃ hɪr]" },
        { korean: "이곳의 추천 여행 코스는 무엇인가요?", english: "What is the recommended travel course here?", pronunciation: "[wʌt ɪz ðə ˌrɛkəˈmɛndəd ˈtrævəl kɔrs hɪr]" },
        { korean: "이곳에서 도시 투어 가이드를 제공하나요?", english: "Do you provide city tour guides here?", pronunciation: "[du ju prəˈvaɪd ˈsɪti tʊr ɡaɪdz hɪr]" },
        { korean: "이곳의 유명한 랜드마크는 무엇인가요?", english: "What is the famous landmark here?", pronunciation: "[wʌt ɪz ðə ˈfeɪməs ˈlændˌmɑrk hɪr]" },
        { korean: "여기서 가장 인기 있는 쇼핑 거리는 어디인가요?", english: "Where is the most popular shopping street?", pronunciation: "[wɛr ɪz ðə moʊst ˈpɑpjələr ˈʃɑpɪŋ strit]" },
        { korean: "이곳의 유명한 축제는 언제 열리나요?", english: "When is the famous festival held here?", pronunciation: "[wɛn ɪz ðə ˈfeɪməs ˈfɛstəvəl hɛld]" },
        { korean: "이곳의 전통 공연은 어디에서 볼 수 있나요?", english: "Where can I see traditional performances?", pronunciation: "[wɛr kæn aɪ si trəˈdɪʃənəl pərˈfɔrmənsɪz]" },
        { korean: "이곳의 유명한 해변은 어디에 있나요?", english: "Where is the famous beach here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs biʧ]" },
        { korean: "여기서 기념품 가게는 어디에 있나요?", english: "Where is the souvenir shop here?", pronunciation: "[wɛr ɪz ðə ˌsuvəˈnɪr ʃɑp]" },
        { korean: "이곳에서 인기 있는 레스토랑은 무엇인가요?", english: "What are the popular restaurants here?", pronunciation: "[wʌt ɑr ðə ˈpɑpjələr ˈrɛstərənts]" },
        { korean: "여기서 가장 유명한 박물관은 어디에 있나요?", english: "Where is the most famous museum here?", pronunciation: "[wɛr ɪz ðə moʊst ˈfeɪməs mjuˈziəm]" },
        { korean: "이곳에서 가장 오래된 건축물은 무엇인가요?", english: "What is the oldest building here?", pronunciation: "[wʌt ɪz ði ˈoʊldɪst ˈbɪldɪŋ]" },
        { korean: "여기서 가장 큰 공원은 어디에 있나요?", english: "Where is the largest park here?", pronunciation: "[wɛr ɪz ðə ˈlɑrdʒəst pɑrk]" },
        { korean: "이곳의 대표적인 예술 작품은 무엇인가요?", english: "What are the representative art pieces here?", pronunciation: "[wʌt ɑr ðə ˌrɛprɪˈzɛntətɪv ɑrt ˈpisəz]" },
        { korean: "이곳의 유명한 축제는 무엇인가요?", english: "What is the famous festival here?", pronunciation: "[wʌt ɪz ðə ˈfeɪməs ˈfɛstəvəl]" },
        { korean: "이곳에서 추천할 만한 기념품은 무엇인가요?", english: "What souvenirs do you recommend from here?", pronunciation: "[wʌt ˈsuvənɪrz du ju ˌrɛkəˈmɛnd frʌm]" },
        { korean: "이곳의 자연 경관은 어디에서 볼 수 있나요?", english: "Where can I see the natural scenery here?", pronunciation: "[wɛr kæn aɪ si ðə ˈnæʧərəl ˈsinəri]" },
        {korean: "이곳의 유명한 관광지는 어디인가요?", english: "Where are the famous tourist spots here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs ˈtʊrɪst spɑts hɪr]" },
        { korean: "여기서 가장 좋은 경치를 볼 수 있는 곳은 어디인가요?", english: "Where is the best place to see the scenery here?", pronunciation: "[wɛr ɪz ðə bɛst pleɪs tu si ðə ˈsinəri hɪr]" },
        { korean: "이곳에서 추천하는 투어는 무엇인가요?", english: "What tours do you recommend here?", pronunciation: "[wʌt tʊrz du ju ˌrɛkəˈmɛnd hɪr]" },
        { korean: "이곳의 역사는 무엇인가요?", english: "What is the history of this place?", pronunciation: "[wʌt ɪz ðə ˈhɪstəri ʌv ðɪs pleɪs]" },
        { korean: "이곳에서 꼭 봐야 할 명소는 무엇인가요?", english: "What are the must-see attractions here?", pronunciation: "[wʌt ɑr ðə mʌst-si əˈtrækʃənz hɪr]" },
        { korean: "이곳의 주요 랜드마크는 무엇인가요?", english: "What are the major landmarks here?", pronunciation: "[wʌt ɑr ðə ˈmeɪdʒər ˈlændˌmɑrks hɪr]" },
        { korean: "가장 가까운 관광 안내소는 어디에 있나요?", english: "Where is the nearest tourist information office?", pronunciation: "[wɛr ɪz ðə ˈnɪərɪst ˈtʊrɪst ˌɪnfərˈmeɪʃən ˈɔfəs]" },
        { korean: "이곳에서 사진을 찍어도 되나요?", english: "Can I take photos here?", pronunciation: "[kæn aɪ teɪk ˈfoʊtoʊz hɪr]" },
        { korean: "이곳에서 가장 좋은 식당은 어디인가요?", english: "Where is the best restaurant here?", pronunciation: "[wɛr ɪz ðə bɛst ˈrɛstərənt hɪr]" },
        { korean: "이곳의 기념품 가게는 어디에 있나요?", english: "Where is the souvenir shop here?", pronunciation: "[wɛr ɪz ðə ˌsuvəˈnɪr ʃɑp hɪr]" },
        { korean: "이곳의 주요 명소는 어디에 있나요?", english: "Where are the main attractions here?", pronunciation: "[wɛr ɑr ðə meɪn əˈtrækʃənz hɪr]" },
        { korean: "이곳의 야경은 어디에서 볼 수 있나요?", english: "Where can I see the night view here?", pronunciation: "[wɛr kæn aɪ si ðə naɪt vju hɪr]" },
        { korean: "이곳에서 도보 투어를 할 수 있나요?", english: "Can I take a walking tour here?", pronunciation: "[kæn aɪ teɪk ə ˈwɔkɪŋ tʊr hɪr]" },
        { korean: "이곳에서 가이드 투어를 예약할 수 있나요?", english: "Can I book a guided tour here?", pronunciation: "[kæn aɪ bʊk ə ˈɡaɪdɪd tʊr hɪr]" },
        { korean: "이곳의 자연 경관 투어는 어디에서 출발하나요?", english: "Where does the nature scenery tour start?", pronunciation: "[wɛr dʌz ðə ˈneɪʧər ˈsinəri tʊr stɑrt]" },
        { korean: "이곳의 박물관은 어디에 있나요?", english: "Where is the museum here?", pronunciation: "[wɛr ɪz ðə mjuˈziəm hɪr]" },
        { korean: "이곳에서 유명한 기념물은 무엇인가요?", english: "What are the famous monuments here?", pronunciation: "[wʌt ɑr ðə ˈfeɪməs ˈmɑnjumənts hɪr]" },
        { korean: "이곳의 유명한 명소는 어디에 있나요?", english: "Where are the famous landmarks here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs ˈlændˌmɑrks hɪr]" },
        { korean: "이곳의 자연 보호 구역은 어디에 있나요?", english: "Where are the nature reserves here?", pronunciation: "[wɛr ɑr ðə ˈneɪʧər rɪˈzɜrvz hɪr]" },
        { korean: "이곳의 유명한 미술관은 어디에 있나요?", english: "Where is the famous art gallery here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ɑrt ˈɡæləri hɪr]" },
        { korean: "이곳의 추천 관광지는 무엇인가요?", english: "What are the recommended tourist spots here?", pronunciation: "[wʌt ɑr ðə ˌrɛkəˈmɛndəd ˈtʊrɪst spɑts hɪr]" },
        { korean: "이곳의 유명한 해변은 어디에 있나요?", english: "Where is the famous beach here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs biʧ hɪr]" },
        { korean: "이곳의 유명한 산책로는 어디에 있나요?", english: "Where is the famous walking trail here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈwɔkɪŋ treɪl hɪr]" },
        { korean: "이곳에서 가장 유명한 음식점은 어디인가요?", english: "Where is the most famous restaurant here?", pronunciation: "[wɛr ɪz ðə moʊst ˈfeɪməs ˈrɛstərənt hɪr]" },
        { korean: "이곳의 유명한 카페는 어디에 있나요?", english: "Where is the famous cafe here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs kæˈfeɪ hɪr]" },
        { korean: "이곳에서 가장 인기 있는 음식은 무엇인가요?", english: "What is the most popular food here?", pronunciation: "[wʌt ɪz ðə moʊst ˈpɑpjələr fud hɪr]" },
        { korean: "이곳의 유명한 바는 어디에 있나요?", english: "Where is the famous bar here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs bɑr hɪr]" },
        { korean: "이곳의 자연 경관을 즐길 수 있는 곳은 어디인가요?", english: "Where can I enjoy the natural scenery here?", pronunciation: "[wɛr kæn aɪ ɛnˈʤɔɪ ðə ˈnæʧərəl ˈsinəri hɪr]" },
        { korean: "이곳의 추천 투어 코스는 무엇인가요?", english: "What is the recommended tour course here?", pronunciation: "[wʌt ɪz ðə ˌrɛkəˈmɛndəd tʊr kɔrs hɪr]" },
        { korean: "이곳의 유명한 시장은 어디에 있나요?", english: "Where is the famous market here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈmɑrkɪt hɪr]" },
        { korean: "이곳에서 가장 좋은 쇼핑 장소는 어디인가요?", english: "Where is the best place to shop here?", pronunciation: "[wɛr ɪz ðə bɛst pleɪs tu ʃɑp hɪr]" },
        { korean: "이곳의 전통 음식을 어디서 맛볼 수 있나요?", english: "Where can I try traditional food here?", pronunciation: "[wɛr kæn aɪ traɪ trəˈdɪʃənəl fud hɪr]" },
        { korean: "이곳의 유명한 극장은 어디에 있나요?", english: "Where is the famous theater here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈθiətər hɪr]" },
        { korean: "이곳에서 유명한 예술가는 누구인가요?", english: "Who is the famous artist here?", pronunciation: "[hu ɪz ðə ˈfeɪməs ˈɑrtɪst hɪr]" },
        { korean: "이곳의 유명한 예술 작품은 어디에 있나요?", english: "Where are the famous art pieces here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs ɑrt pisəz hɪr]" },
        { korean: "이곳의 자연 경관을 즐길 수 있는 최고의 장소는 어디인가요?", english: "Where is the best place to enjoy the natural scenery here?", pronunciation: "[wɛr ɪz ðə bɛst pleɪs tu ɛnˈʤɔɪ ðə ˈnæʧərəl ˈsinəri hɪr]" },
        { korean: "이곳에서 자전거 투어를 할 수 있나요?", english: "Can I take a bicycle tour here?", pronunciation: "[kæn aɪ teɪk ə ˈbaɪsɪkəl tʊr hɪr]" },
        { korean: "이곳에서 하이킹을 즐길 수 있나요?", english: "Can I enjoy hiking here?", pronunciation: "[kæn aɪ ɛnˈʤɔɪ ˈhaɪkɪŋ hɪr]" },
        { korean: "이곳의 유명한 등산 코스는 어디에 있나요?", english: "Where is the famous hiking trail here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈhaɪkɪŋ treɪl hɪr]" },
        { korean: "이곳에서 카약을 탈 수 있나요?", english: "Can I go kayaking here?", pronunciation: "[kæn aɪ ɡoʊ ˈkaɪækɪŋ hɪr]" },
        { korean: "이곳에서 스쿠버 다이빙을 할 수 있나요?", english: "Can I go scuba diving here?", pronunciation: "[kæn aɪ ɡoʊ ˈskuːbə ˈdaɪvɪŋ hɪr]" },
        { korean: "이곳의 유명한 야경 명소는 어디에 있나요?", english: "Where are the famous night spots here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs naɪt spɑts hɪr]" },
        { korean: "이곳의 미술관 입장료는 얼마인가요?", english: "How much is the admission fee for the art gallery here?", pronunciation: "[haʊ mʌʧ ɪz ði ədˈmɪʃən fi fɔr ði ɑrt ˈɡæləri hɪr]" },
        { korean: "이곳에서 트레킹을 즐길 수 있나요?", english: "Can I enjoy trekking here?", pronunciation: "[kæn aɪ ɛnˈʤɔɪ ˈtrɛkɪŋ hɪr]" },
        { korean: "이곳에서 패러글라이딩을 할 수 있나요?", english: "Can I go paragliding here?", pronunciation: "[kæn aɪ ɡoʊ ˈpɛrəˌɡlaɪdɪŋ hɪr]" },
        { korean: "이곳에서 캠핑을 즐길 수 있나요?", english: "Can I go camping here?", pronunciation: "[kæn aɪ ɡoʊ ˈkæmpɪŋ hɪr]" },
        { korean: "이곳의 유명한 쇼핑 거리는 어디에 있나요?", english: "Where is the famous shopping street here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈʃɑpɪŋ strit hɪr]" },
        {korean: "이곳에서 볼 수 있는 야생 동물은 무엇인가요?", english: "What wildlife can I see here?", pronunciation: "[wʌt ˈwaɪldˌlaɪf kæn aɪ si hɪr]" },
        { korean: "가장 인기 있는 관광 시즌은 언제인가요?", english: "When is the peak tourist season?", pronunciation: "[wɛn ɪz ðə pik ˈtʊrɪst ˈsizən]" },
        { korean: "이곳에서 가장 유명한 기념품은 무엇인가요?", english: "What is the most famous souvenir here?", pronunciation: "[wʌt ɪz ðə moʊst ˈfeɪməs ˌsuvəˈnɪr hɪr]" },
        { korean: "이곳의 해변에서 수영을 할 수 있나요?", english: "Can I swim at the beach here?", pronunciation: "[kæn aɪ swɪm æt ðə biʧ hɪr]" },
        { korean: "이곳의 관광 패키지는 무엇이 있나요?", english: "What are the tourist packages available here?", pronunciation: "[wʌt ɑr ðə ˈtʊrɪst ˈpækɪdʒɪz əˈveɪləbəl hɪr]" },
        { korean: "이곳에서 패러세일링을 할 수 있나요?", english: "Can I go parasailing here?", pronunciation: "[kæn aɪ ɡoʊ ˈpɛrəˌseɪlɪŋ hɪr]" },
        { korean: "이곳의 유명한 전망대는 어디에 있나요?", english: "Where is the famous observation deck here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˌɑbzərˈveɪʃən dɛk hɪr]" },
        { korean: "이곳에서 헬리콥터 투어를 할 수 있나요?", english: "Can I take a helicopter tour here?", pronunciation: "[kæn aɪ teɪk ə ˈhɛlɪˌkɑptər tʊr hɪr]" },
        { korean: "이곳에서 스키를 탈 수 있나요?", english: "Can I go skiing here?", pronunciation: "[kæn aɪ ɡoʊ ˈskiɪŋ hɪr]" },
        { korean: "이곳의 관광 명소는 무엇인가요?", english: "What are the tourist attractions here?", pronunciation: "[wʌt ɑr ðə ˈtʊrɪst əˈtrækʃənz hɪr]" },
        { korean: "이곳에서 스노클링을 할 수 있나요?", english: "Can I go snorkeling here?", pronunciation: "[kæn aɪ ɡoʊ ˈsnɔrkəlɪŋ hɪr]" },
        { korean: "이곳의 유명한 강은 어디에 있나요?", english: "Where is the famous river here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈrɪvər hɪr]" },
        { korean: "이곳의 전통 축제는 언제 열리나요?", english: "When is the traditional festival held here?", pronunciation: "[wɛn ɪz ðə trəˈdɪʃənəl ˈfɛstəvəl hɛld hɪr]" },
        { korean: "이곳에서 유명한 하이킹 코스는 어디에 있나요?", english: "Where is the famous hiking course here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈhaɪkɪŋ kɔrs hɪr]" },
        { korean: "이곳에서 일몰을 잘 볼 수 있는 곳은 어디인가요?", english: "Where is the best place to see the sunset here?", pronunciation: "[wɛr ɪz ðə bɛst pleɪs tu si ðə ˈsʌnˌsɛt hɪr]" },
        { korean: "이곳의 역사적인 랜드마크는 무엇인가요?", english: "What are the historical landmarks here?", pronunciation: "[wʌt ɑr ðə hɪˈstɔrɪkəl ˈlændˌmɑrks hɪr]" },
        { korean: "이곳에서 추천하는 액티비티는 무엇인가요?", english: "What activities do you recommend here?", pronunciation: "[wʌt ækˈtɪvətiz du ju ˌrɛkəˈmɛnd hɪr]" },
        { korean: "이곳의 전통 공예품은 어디에서 살 수 있나요?", english: "Where can I buy traditional crafts here?", pronunciation: "[wɛr kæn aɪ baɪ trəˈdɪʃənəl kræfts hɪr]" },
        { korean: "이곳에서 유명한 전망 포인트는 어디에 있나요?", english: "Where is the famous viewpoint here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈvjuˌpɔɪnt hɪr]" },
        { korean: "이곳에서 유명한 명소를 어떻게 갈 수 있나요?", english: "How can I get to the famous landmarks here?", pronunciation: "[haʊ kæn aɪ ɡɛt tu ðə ˈfeɪməs ˈlændˌmɑrks hɪr]" },
        { korean: "이곳에서 인기 있는 투어는 무엇인가요?", english: "What are the popular tours here?", pronunciation: "[wʌt ɑr ðə ˈpɑpjələr tʊrz hɪr]" },
        { korean: "이곳에서 가장 인기 있는 레스토랑은 어디인가요?", english: "Where is the most popular restaurant here?", pronunciation: "[wɛr ɪz ðə moʊst ˈpɑpjələr ˈrɛstərənt hɪr]" },
        { korean: "이곳에서 유명한 온천은 어디에 있나요?", english: "Where is the famous hot spring here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs hɑt sprɪŋ hɪr]" },
        { korean: "이곳에서 시티 투어를 예약할 수 있나요?", english: "Can I book a city tour here?", pronunciation: "[kæn aɪ bʊk ə ˈsɪti tʊr hɪr]" },
        { korean: "이곳에서 와이너리를 방문할 수 있나요?", english: "Can I visit a winery here?", pronunciation: "[kæn aɪ ˈvɪzɪt ə ˈwaɪnəri hɪr]" },
        { korean: "이곳의 유명한 국립공원은 어디에 있나요?", english: "Where is the famous national park here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈnæʃənəl pɑrk hɪr]" },
        { korean: "이곳에서 스파를 이용할 수 있나요?", english: "Can I use the spa here?", pronunciation: "[kæn aɪ juz ðə spɑ hɪr]" },
        { korean: "이곳에서 승마를 할 수 있나요?", english: "Can I go horseback riding here?", pronunciation: "[kæn aɪ ɡoʊ ˈhɔrsˌbæk ˈraɪdɪŋ hɪr]" },
        { korean: "이곳의 유명한 벼룩시장은 어디에 있나요?", english: "Where is the famous flea market here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs fli ˈmɑrkɪt hɪr]" },
        { korean: "이곳의 추천 맛집은 어디인가요?", english: "Where are the recommended eateries here?", pronunciation: "[wɛr ɑr ðə ˌrɛkəˈmɛndəd ˈitəriz hɪr]" },
        { korean: "이곳에서 유명한 수상 스포츠는 무엇인가요?", english: "What are the famous water sports here?", pronunciation: "[wʌt ɑr ðə ˈfeɪməs ˈwɔtər spɔrts hɪr]" },
        { korean: "이곳의 유명한 박물관은 어디에 있나요?", english: "Where is the famous museum here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs mjuˈziəm hɪr]" },
        { korean: "이곳의 전통 음식 축제는 언제 열리나요?", english: "When is the traditional food festival held here?", pronunciation: "[wɛn ɪz ðə trəˈdɪʃənəl fud ˈfɛstəvəl hɛld hɪr]" },
        { korean: "이곳에서 열리는 음악 축제는 언제인가요?", english: "When is the music festival held here?", pronunciation: "[wɛn ɪz ðə ˈmjuzɪk ˈfɛstəvəl hɛld hɪr]" },
        { korean: "이곳에서 유명한 유적지는 어디에 있나요?", english: "Where is the famous historical site here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs hɪˈstɔrɪkəl saɪt hɪr]" },
        { korean: "이곳에서 유람선을 탈 수 있나요?", english: "Can I take a cruise here?", pronunciation: "[kæn aɪ teɪk ə kruz hɪr]" },
        { korean: "이곳에서 캠핑을 할 수 있는 장소는 어디인가요?", english: "Where can I camp here?", pronunciation: "[wɛr kæn aɪ kæmp hɪr]" },
        { korean: "이곳의 유명한 트레일은 어디에 있나요?", english: "Where is the famous trail here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs treɪl hɪr]" },
        { korean: "이곳에서 열기구를 탈 수 있나요?", english: "Can I ride a hot air balloon here?", pronunciation: "[kæn aɪ raɪd ə hɑt ɛr bəˈlun hɪr]" },
        { korean: "이곳에서 가장 인기 있는 관광 명소는 무엇인가요?", english: "What are the most popular tourist spots here?", pronunciation: "[wʌt ɑr ðə moʊst ˈpɑpjələr ˈtʊrɪst spɑts hɪr]" },
        { korean: "이곳에서 유명한 맛집 투어를 할 수 있나요?", english: "Can I go on a food tour here?", pronunciation: "[kæn aɪ ɡoʊ ɑn ə fud tʊr hɪr]" },
        { korean: "이곳의 유명한 골프장은 어디에 있나요?", english: "Where is the famous golf course here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ɡɑlf kɔrs hɪr]" },
        { korean: "이곳에서 서핑을 할 수 있나요?", english: "Can I go surfing here?", pronunciation: "[kæn aɪ ɡoʊ ˈsɜrfɪŋ hɪr]" },
        { korean: "이곳의 인기 있는 야경 명소는 어디에 있나요?", english: "Where are the popular night spots here?", pronunciation: "[wɛr ɑr ðə ˈpɑpjələr naɪt spɑts hɪr]" },
        { korean: "이곳에서 유명한 축제는 언제 열리나요?", english: "When is the famous festival held here?", pronunciation: "[wɛn ɪz ðə ˈfeɪməs ˈfɛstəvəl hɛld hɪr]" },
        { korean: "이곳에서 별을 볼 수 있는 가장 좋은 장소는 어디인가요?", english: "Where is the best place to see stars here?", pronunciation: "[wɛr ɪz ðə bɛst pleɪs tu si stɑrz hɪr]" },
        {korean: "이곳에서 자전거를 대여할 수 있나요?", english: "Can I rent a bicycle here?", pronunciation: "[kæn aɪ rɛnt ə ˈbaɪsɪkəl hɪr]" },
        { korean: "이곳의 유명한 광장은 어디에 있나요?", english: "Where is the famous square here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs skwɛr hɪr]" },
        { korean: "이곳의 유명한 카페는 어디에 있나요?", english: "Where is the famous cafe here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs kæˈfeɪ hɪr]" },
        { korean: "이곳에서 사진을 찍어도 되나요?", english: "Can I take pictures here?", pronunciation: "[kæn aɪ teɪk ˈpɪkʧərz hɪr]" },
        { korean: "이곳의 가장 큰 호수는 어디에 있나요?", english: "Where is the largest lake here?", pronunciation: "[wɛr ɪz ðə ˈlɑrdʒəst leɪk hɪr]" },
        { korean: "이곳에서 유명한 다리는 무엇인가요?", english: "What is the famous bridge here?", pronunciation: "[wʌt ɪz ðə ˈfeɪməs brɪdʒ hɪr]" },
        { korean: "이곳에서 도시 투어를 예약할 수 있나요?", english: "Can I book a city tour here?", pronunciation: "[kæn aɪ bʊk ə ˈsɪti tʊr hɪr]" },
        { korean: "이곳의 주요 관광 명소는 어디에 있나요?", english: "Where are the main tourist attractions here?", pronunciation: "[wɛr ɑr ðə meɪn ˈtʊrɪst əˈtrækʃənz hɪr]" },
        { korean: "이곳에서 역사적인 장소는 어디에 있나요?", english: "Where are the historical sites here?", pronunciation: "[wɛr ɑr ðə hɪˈstɔrɪkəl saɪts hɪr]" },
        { korean: "이곳의 유명한 공원은 어디에 있나요?", english: "Where is the famous park here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs pɑrk hɪr]" },
        { korean: "이곳에서 박물관 입장료는 얼마인가요?", english: "How much is the museum admission fee?", pronunciation: "[haʊ mʌʧ ɪz ðə mjuˈziəm ədˈmɪʃən fi]" },
        { korean: "이곳의 인기 있는 레스토랑은 어디인가요?", english: "Where is the popular restaurant here?", pronunciation: "[wɛr ɪz ðə ˈpɑpjələr ˈrɛstərənt hɪr]" },
        { korean: "이곳에서 가장 유명한 비치는 어디인가요?", english: "Where is the most famous beach here?", pronunciation: "[wɛr ɪz ðə moʊst ˈfeɪməs biʧ hɪr]" },
        { korean: "이곳의 주요 명소는 무엇인가요?", english: "What are the main attractions here?", pronunciation: "[wʌt ɑr ðə meɪn əˈtrækʃənz hɪr]" },
        { korean: "이곳에서 유명한 하이킹 트레일은 어디에 있나요?", english: "Where is the famous hiking trail here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˈhaɪkɪŋ treɪl hɪr]" },
        { korean: "이곳의 전통 시장은 어디에 있나요?", english: "Where is the traditional market here?", pronunciation: "[wɛr ɪz ðə trəˈdɪʃənəl ˈmɑrkɪt hɪr]" },
        { korean: "이곳에서 가장 인기 있는 바는 어디인가요?", english: "Where is the most popular bar here?", pronunciation: "[wɛr ɪz ðə moʊst ˈpɑpjələr bɑr hɪr]" },
        { korean: "이곳에서 패러글라이딩을 할 수 있나요?", english: "Can I go paragliding here?", pronunciation: "[kæn aɪ ɡoʊ ˈpɛrəˌɡlaɪdɪŋ hɪr]" },
        { korean: "이곳에서 유명한 전망대는 어디에 있나요?", english: "Where is the famous observation deck here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˌɑbzərˈveɪʃən dɛk hɪr]" },
        { korean: "이곳의 유명한 유적지는 어디에 있나요?", english: "Where is the famous historical site here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs hɪˈstɔrɪkəl saɪt hɪr]" },
        { korean: "이곳의 유명한 동물원은 어디에 있나요?", english: "Where is the famous zoo here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs zu hɪr]" },
        { korean: "이곳에서 유명한 박물관은 어디에 있나요?", english: "Where is the famous museum here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs mjuˈziəm hɪr]" },
        { korean: "이곳의 유명한 공원은 어디에 있나요?", english: "Where is the famous park here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs pɑrk hɪr]" },
        { korean: "이곳에서 유명한 명소는 어디에 있나요?", english: "Where are the famous spots here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs spɑts hɪr]" },
        { korean: "이곳의 주요 명소는 무엇인가요?", english: "What are the main attractions here?", pronunciation: "[wʌt ɑr ðə meɪn əˈtrækʃənz hɪr]" },
        { korean: "이곳에서 가장 인기 있는 비치는 어디인가요?", english: "Where is the most popular beach here?", pronunciation: "[wɛr ɪz ðə moʊst ˈpɑpjələr biʧ hɪr]" },
        { korean: "이곳에서 하이킹을 즐길 수 있나요?", english: "Can I go hiking here?", pronunciation: "[kæn aɪ ɡoʊ ˈhaɪkɪŋ hɪr]" },
        { korean: "이곳의 유명한 유적지는 어디에 있나요?", english: "Where are the famous historical sites here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs hɪˈstɔrɪkəl saɪts hɪr]" },
        { korean: "이곳에서 자전거 투어를 할 수 있나요?", english: "Can I take a bicycle tour here?", pronunciation: "[kæn aɪ teɪk ə ˈbaɪsɪkəl tʊr hɪr]" },
        { korean: "이곳의 전통 시장은 어디에 있나요?", english: "Where is the traditional market here?", pronunciation: "[wɛr ɪz ðə trəˈdɪʃənəl ˈmɑrkɪt hɪr]" },
        { korean: "이곳에서 유명한 박물관은 어디에 있나요?", english: "Where is the famous museum here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs mjuˈziəm hɪr]" },
        { korean: "이곳에서 하이킹을 즐길 수 있나요?", english: "Can I go hiking here?", pronunciation: "[kæn aɪ ɡoʊ ˈhaɪkɪŋ hɪr]" },
        { korean: "이곳에서 유명한 전망대는 어디에 있나요?", english: "Where is the famous observation deck here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs ˌɑbzərˈveɪʃən dɛk hɪr]" },
        { korean: "이곳에서 패러글라이딩을 할 수 있나요?", english: "Can I go paragliding here?", pronunciation: "[kæn aɪ ɡoʊ ˈpɛrəˌɡlaɪdɪŋ hɪr]" },
        { korean: "이곳에서 가장 유명한 다리는 무엇인가요?", english: "What is the most famous bridge here?", pronunciation: "[wʌt ɪz ðə moʊst ˈfeɪməs brɪdʒ hɪr]" },
        { korean: "이곳의 주요 명소는 무엇인가요?", english: "What are the main attractions here?", pronunciation: "[wʌt ɑr ðə meɪn əˈtrækʃənz hɪr]" },
        { korean: "이곳에서 자전거 투어를 할 수 있나요?", english: "Can I take a bicycle tour here?", pronunciation: "[kæn aɪ teɪk ə ˈbaɪsɪkəl tʊr hɪr]" },
        { korean: "이곳에서 유명한 유적지는 어디에 있나요?", english: "Where are the famous historical sites here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs hɪˈstɔrɪkəl saɪts hɪr]" },
        { korean: "이곳에서 서핑을 할 수 있나요?", english: "Can I go surfing here?", pronunciation: "[kæn aɪ ɡoʊ ˈsɜrfɪŋ hɪr]" },
        { korean: "이곳에서 하이킹을 즐길 수 있나요?", english: "Can I go hiking here?", pronunciation: "[kæn aɪ ɡoʊ ˈhaɪkɪŋ hɪr]" },
        { korean: "이곳에서 유명한 다리는 무엇인가요?", english: "What is the famous bridge here?", pronunciation: "[wʌt ɪz ðə ˈfeɪməs brɪdʒ hɪr]" },
        { korean: "이곳의 유명한 유적지는 어디에 있나요?", english: "Where is the famous historical site here?", pronunciation: "[wɛr ɪz ðə ˈfeɪməs hɪˈstɔrɪkəl saɪt hɪr]" },
        { korean: "이곳에서 자전거를 대여할 수 있나요?", english: "Can I rent a bicycle here?", pronunciation: "[kæn aɪ rɛnt ə ˈbaɪsɪkəl hɪr]" },
        { korean: "이곳에서 하이킹을 즐길 수 있나요?", english: "Can I go hiking here?", pronunciation: "[kæn aɪ ɡoʊ ˈhaɪkɪŋ hɪr]" },
        { korean: "이곳에서 패러글라이딩을 할 수 있나요?", english: "Can I go paragliding here?", pronunciation: "[kæn aɪ ɡoʊ ˈpɛrəˌɡlaɪdɪŋ hɪr]" },
        { korean: "이곳에서 유명한 명소는 어디에 있나요?", english: "Where are the famous spots here?", pronunciation: "[wɛr ɑr ðə ˈfeɪməs spɑts hɪr]" },

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
                setTimeout(() => {
                    synth.speak(englishUtterance);
                }, 1000); // 1초 지연
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
        playNextWord(); // 8초 간격으로 다음 단어 재생
    }, 8000);
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
