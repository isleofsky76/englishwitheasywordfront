const words = [
    { korean: "체크인하다", english: "check in", pronunciation: "[ʧɛk ɪn]" },
    { korean: "체크아웃하다", english: "check out", pronunciation: "[ʧɛk aʊt]" },
    { korean: "방을 예약하다", english: "reserve a room", pronunciation: "[rɪˈzɜrv ə rum]" },
    { korean: "열쇠를 받다", english: "get a key", pronunciation: "[ɡɛt ə ki]" },
    { korean: "프런트 데스크에 문의하다", english: "inquire at the front desk", pronunciation: "[ɪnˈkwaɪər æt ðə frʌnt dɛsk]" },
    { korean: "룸서비스를 주문하다", english: "order room service", pronunciation: "[ˈɔrdər rum ˈsɜrvɪs]" },
    { korean: "방을 청소하다", english: "clean the room", pronunciation: "[klin ðə rum]" },
    { korean: "수건을 요청하다", english: "request towels", pronunciation: "[rɪˈkwɛst ˈtaʊəlz]" },
    { korean: "짐을 맡기다", english: "store luggage", pronunciation: "[stɔr ˈlʌɡɪdʒ]" },
    { korean: "조식을 먹다", english: "have breakfast", pronunciation: "[hæv ˈbrɛkfəst]" },
    { korean: "와이파이를 사용하다", english: "use Wi-Fi", pronunciation: "[juz ˈwaɪˌfaɪ]" },
    { korean: "추가 침대를 요청하다", english: "request an extra bed", pronunciation: "[rɪˈkwɛst æn ˈɛkstrə bɛd]" },
    { korean: "방을 바꾸다", english: "change rooms", pronunciation: "[ʧeɪndʒ rumz]" },
    { korean: "미니바를 이용하다", english: "use the minibar", pronunciation: "[juz ðə ˈmɪniˌbɑr]" },
    { korean: "에어컨을 켜다", english: "turn on the air conditioner", pronunciation: "[tɜrn ɑn ði ɛr kənˈdɪʃənər]" },
    { korean: "체크아웃 시간을 확인하다", english: "check the check-out time", pronunciation: "[ʧɛk ðə ʧɛk-aʊt taɪm]" },
    { korean: "짐을 옮기다", english: "move luggage", pronunciation: "[muv ˈlʌɡɪdʒ]" },
    { korean: "방에서 쉬다", english: "rest in the room", pronunciation: "[rɛst ɪn ðə rum]" },
    { korean: "룸서비스 메뉴를 보다", english: "look at the room service menu", pronunciation: "[lʊk æt ðə rum ˈsɜrvɪs ˈmɛnju]" },
    { korean: "수영장을 이용하다", english: "use the swimming pool", pronunciation: "[juz ðə ˈswɪmɪŋ pul]" },
    { korean: "피트니스 센터를 이용하다", english: "use the fitness center", pronunciation: "[juz ðə ˈfɪtnəs ˈsɛntər]" },
    { korean: "로비에서 기다리다", english: "wait in the lobby", pronunciation: "[weɪt ɪn ðə ˈlɑbi]" },
    { korean: "컨시어지 서비스에 문의하다", english: "inquire at the concierge service", pronunciation: "[ɪnˈkwaɪər æt ðə ˌkɑnsiˈɜrʤ ˈsɜrvɪs]" },
    { korean: "룸키를 반납하다", english: "return the room key", pronunciation: "[rɪˈtɜrn ðə rum ki]" },
    { korean: "방을 업그레이드하다", english: "upgrade the room", pronunciation: "[ʌpˈɡreɪd ðə rum]" },
    { korean: "안내 데스크에 문의하다", english: "ask at the information desk", pronunciation: "[æsk æt ði ˌɪnfərˈmeɪʃən dɛsk]" },
    { korean: "세탁 서비스를 이용하다", english: "use the laundry service", pronunciation: "[juz ðə ˈlɔndri ˈsɜrvɪs]" },
    { korean: "주차장을 이용하다", english: "use the parking lot", pronunciation: "[juz ðə ˈpɑrkɪŋ lɑt]" },
    { korean: "숙박 요금을 지불하다", english: "pay for the accommodation", pronunciation: "[peɪ fɔr ði əˌkɑməˈdeɪʃən]" },
    { korean: "방을 예약 확인하다", english: "confirm the room reservation", pronunciation: "[kənˈfɜrm ðə rum ˌrɛzərˈveɪʃən]" },
    { korean: "어메니티를 요청하다", english: "request amenities", pronunciation: "[rɪˈkwɛst əˈmɛnɪtiz]" },
    { korean: "객실 번호를 확인하다", english: "check the room number", pronunciation: "[ʧɛk ðə rum ˈnʌmbər]" },
    { korean: "룸서비스를 취소하다", english: "cancel room service", pronunciation: "[ˈkænsəl rum ˈsɜrvɪs]" },
    { korean: "방에 문제가 있다", english: "have an issue with the room", pronunciation: "[hæv ən ˈɪʃu wɪð ðə rum]" },
    { korean: "화장실을 이용하다", english: "use the bathroom", pronunciation: "[juz ðə ˈbæθˌrum]" },
    { korean: "엘리베이터를 타다", english: "take the elevator", pronunciation: "[teɪk ði ˈɛləˌveɪtər]" },
    { korean: "계단을 이용하다", english: "use the stairs", pronunciation: "[juz ðə stɛrz]" },
    { korean: "복도를 걷다", english: "walk down the hallway", pronunciation: "[wɔk daʊn ðə ˈhɔlˌweɪ]" },
    { korean: "짐을 챙기다", english: "pack your luggage", pronunciation: "[pæk jʊər ˈlʌɡɪdʒ]" },
    { korean: "침대를 정리하다", english: "make the bed", pronunciation: "[meɪk ðə bɛd]" },
    { korean: "방 청소를 요청하다", english: "request room cleaning", pronunciation: "[rɪˈkwɛst rum ˈklinɪŋ]" },
    { korean: "객실 서비스에 전화하다", english: "call room service", pronunciation: "[kɔl rum ˈsɜrvɪs]" },
    { korean: "난방을 켜다", english: "turn on the heater", pronunciation: "[tɜrn ɑn ðə ˈhitər]" },
    { korean: "침구를 교체하다", english: "change the bedding", pronunciation: "[ʧeɪndʒ ðə ˈbɛdɪŋ]" },
    { korean: "조용한 방을 요청하다", english: "request a quiet room", pronunciation: "[rɪˈkwɛst ə ˈkwaɪət rum]" },
    { korean: "목욕 가운을 요청하다", english: "request a bathrobe", pronunciation: "[rɪˈkwɛst ə ˈbæθˌroʊb]" },
    { korean: "베개를 추가로 요청하다", english: "request extra pillows", pronunciation: "[rɪˈkwɛst ˈɛkstrə ˈpɪloʊz]" },
    { korean: "인터넷에 접속하다", english: "access the internet", pronunciation: "[ˈæksɛs ði ˈɪntərˌnɛt]" },
    { korean: "호텔 레스토랑을 이용하다", english: "use the hotel restaurant", pronunciation: "[juz ðə hoʊˈtɛl ˈrɛstəˌrɑnt]" },
    { korean: "룸 서비스로 커피를 주문하다", english: "order coffee through room service", pronunciation: "[ˈɔrdər ˈkɑfi θru rum ˈsɜrvɪs]" },
    { korean: "미니바를 재고 요청하다", english: "request minibar restock", pronunciation: "[rɪˈkwɛst ˈmɪniˌbɑr ˈriˌstɑk]" },
    { korean: "아기 침대를 요청하다", english: "request a crib", pronunciation: "[rɪˈkwɛst ə krɪb]" },
    { korean: "객실 온도를 조절하다", english: "adjust the room temperature", pronunciation: "[əˈʤʌst ðə rum ˈtɛmprəʧər]" },
    { korean: "모닝콜을 요청하다", english: "request a wake-up call", pronunciation: "[rɪˈkwɛst ə ˈweɪk-ʌp kɔl]" },
    { korean: "시트 교체를 요청하다", english: "request a sheet change", pronunciation: "[rɪˈkwɛst ə ʃit ʧeɪndʒ]" },
    { korean: "룸서비스로 아침 식사를 주문하다", english: "order breakfast through room service", pronunciation: "[ˈɔrdər ˈbrɛkfəst θru rum ˈsɜrvɪs]" },
    { korean: "레스토랑 예약을 하다", english: "make a restaurant reservation", pronunciation: "[meɪk ə ˈrɛstəˌrɑnt ˌrɛzərˈveɪʃən]" },
    { korean: "방문 카드 키를 받다", english: "get a room card key", pronunciation: "[ɡɛt ə rum kɑrd ki]" },
    { korean: "짐을 방으로 옮기다", english: "have luggage brought to the room", pronunciation: "[hæv ˈlʌɡɪdʒ brɔt tu ðə rum]" },
    { korean: "객실 안전 금고를 사용하다", english: "use the room safe", pronunciation: "[juz ðə rum seɪf]" },
    { korean: "룸서비스 메뉴를 요청하다", english: "request the room service menu", pronunciation: "[rɪˈkwɛst ðə rum ˈsɜrvɪs ˈmɛnju]" },
    { korean: "방에 커피 메이커가 있는지 확인하다", english: "check if the room has a coffee maker", pronunciation: "[ʧɛk ɪf ðə rum hæz ə ˈkɔfi ˈmeɪkər]" },
    { korean: "회의실을 예약하다", english: "reserve a conference room", pronunciation: "[rɪˈzɜrv ə ˈkɑnfrəns rum]" },
    { korean: "호텔 지도와 안내 책자를 받다", english: "get a hotel map and guide", pronunciation: "[ɡɛt ə hoʊˈtɛl mæp ənd ɡaɪd]" },
    { korean: "세탁물 수거를 요청하다", english: "request laundry pickup", pronunciation: "[rɪˈkwɛst ˈlɔndri ˈpɪkʌp]" },
    { korean: "수건 교체를 요청하다", english: "request towel replacement", pronunciation: "[rɪˈkwɛst ˈtaʊəl rɪˈpleɪsmənt]" },
    { korean: "호텔 편의시설을 이용하다", english: "use hotel amenities", pronunciation: "[juz hoʊˈtɛl əˈmɛnɪtiz]" },
    { korean: "미니바 가격표를 확인하다", english: "check the minibar price list", pronunciation: "[ʧɛk ðə ˈmɪniˌbɑr praɪs lɪst]" },
    { korean: "얼음을 요청하다", english: "request ice", pronunciation: "[rɪˈkwɛst aɪs]" },
    { korean: "도시 전망이 있는 방을 요청하다", english: "request a room with a city view", pronunciation: "[rɪˈkwɛst ə rum wɪð ə ˈsɪti vju]" },
    { korean: "객실 키를 분실하다", english: "lose the room key", pronunciation: "[luz ðə rum ki]" },
    { korean: "객실 정보를 문의하다", english: "ask about room details", pronunciation: "[æsk əˈbaʊt rum dɪˈteɪlz]" },
    { korean: "방문 카드를 복사하다", english: "duplicate the room card", pronunciation: "[ˈduplɪˌkeɪt ðə rum kɑrd]" },
    { korean: "침대 유형을 선택하다", english: "choose bed type", pronunciation: "[ʧuz bɛd taɪp]" },
    { korean: "테라스가 있는 방을 요청하다", english: "request a room with a terrace", pronunciation: "[rɪˈkwɛst ə rum wɪð ə ˈtɛrəs]" },
    { korean: "기억에 남는 경험을 남기다", english: "leave a memorable experience", pronunciation: "[liv ə ˈmɛmərəbəl ɪkˈspɪriəns]" },
    { korean: "콘센트를 사용하다", english: "use the power outlet", pronunciation: "[juz ðə ˈpaʊər ˈaʊtˌlɛt]" },
    { korean: "수영장을 예약하다", english: "book the swimming pool", pronunciation: "[bʊk ðə ˈswɪmɪŋ pul]" },
    { korean: "룸서비스로 저녁을 주문하다", english: "order dinner through room service", pronunciation: "[ˈɔrdər ˈdɪnər θru rum ˈsɜrvɪs]" },
    { korean: "객실의 난방 문제를 해결하다", english: "fix the room heating issue", pronunciation: "[fɪks ðə rum ˈhitɪŋ ˈɪʃu]" },
    { korean: "비즈니스 센터를 이용하다", english: "use the business center", pronunciation: "[juz ðə ˈbɪznɪs ˈsɛntər]" },
    { korean: "호텔 시설을 평가하다", english: "evaluate hotel facilities", pronunciation: "[ɪˈvæljueɪt hoʊˈtɛl fəˈsɪlɪtiz]" },
    { korean: "방에서 일하다", english: "work from the room", pronunciation: "[wɜrk frʌm ðə rum]" },
    { korean: "호텔 내 레크리에이션을 즐기다", english: "enjoy hotel recreation", pronunciation: "[ɛnˈʤɔɪ hoʊˈtɛl ˌrɛkriˈeɪʃən]" },
    { korean: "짐을 보관하다", english: "store luggage", pronunciation: "[stɔr ˈlʌɡɪdʒ]" },
    { korean: "호텔 전용 주차장을 이용하다", english: "use hotel parking", pronunciation: "[juz hoʊˈtɛl ˈpɑrkɪŋ]" },
    { korean: "체크인 절차를 밟다", english: "complete check-in process", pronunciation: "[kəmˈplit ˈʧɛk-ɪn ˈprɑsɛs]" },
    { korean: "체크아웃을 연장하다", english: "extend check-out time", pronunciation: "[ɪkˈstɛnd ˈʧɛk-aʊt taɪm]" },
    { korean: "발코니가 있는 방을 요청하다", english: "request a room with a balcony", pronunciation: "[rɪˈkwɛst ə rum wɪð ə ˈbælkəni]" },
    { korean: "객실 청구서를 검토하다", english: "review the room bill", pronunciation: "[rɪˈvju ðə rum bɪl]" },
    { korean: "호텔 셔틀 서비스를 이용하다", english: "use the hotel shuttle service", pronunciation: "[juz ðə hoʊˈtɛl ˈʃʌtəl ˈsɜrvɪs]" },
    { korean: "프론트 데스크에 문의하다", english: "inquire at the front desk", pronunciation: "[ɪnˈkwaɪər æt ðə frʌnt dɛsk]" },
    { korean: "호텔 바에서 음료를 주문하다", english: "order a drink at the hotel bar", pronunciation: "[ˈɔrdər ə drɪŋk æt ðə hoʊˈtɛl bɑr]" },
    { korean: "미니바를 확인하다", english: "check the minibar", pronunciation: "[ʧɛk ðə ˈmɪniˌbɑr]" },
    { korean: "호텔 스파를 예약하다", english: "book a session at the hotel spa", pronunciation: "[bʊk ə ˈsɛʃən æt ðə hoʊˈtɛl spɑ]" },
    { korean: "수영장 이용 시간을 확인하다", english: "check the swimming pool hours", pronunciation: "[ʧɛk ðə ˈswɪmɪŋ pul aʊrz]" },
    { korean: "조식 뷔페를 이용하다", english: "use the breakfast buffet", pronunciation: "[juz ðə ˈbrɛkfəst bʌˈfeɪ]" },
    { korean: "유아용 침대를 요청하다", english: "request a baby cot", pronunciation: "[rɪˈkwɛst ə ˈbeɪbi kɑt]" },
    { korean: "객실 내 다리미를 사용하다", english: "use the in-room iron", pronunciation: "[juz ði ɪn-rum ˈaɪərn]" },
    { korean: "호텔 피트니스 센터를 이용하다", english: "use the hotel fitness center", pronunciation: "[juz ðə hoʊˈtɛl ˈfɪtnɪs ˈsɛntər]" },
    { korean: "회의 시설을 예약하다", english: "reserve meeting facilities", pronunciation: "[rɪˈzɜrv ˈmitɪŋ fəˈsɪlɪtiz]" },
    { korean: "조식 룸서비스를 주문하다", english: "order breakfast room service", pronunciation: "[ˈɔrdər ˈbrɛkfəst rum ˈsɜrvɪs]" },
    { korean: "객실 내 커피 머신을 사용하다", english: "use the in-room coffee maker", pronunciation: "[juz ði ɪn-rum ˈkɔfi ˈmeɪkər]" },
    { korean: "침구의 품질을 평가하다", english: "evaluate the quality of bedding", pronunciation: "[ɪˈvæljueɪt ðə ˈkwɑləti ʌv ˈbɛdɪŋ]" },
    { korean: "여행 가이드를 요청하다", english: "request a travel guide", pronunciation: "[rɪˈkwɛst ə ˈtrævəl ɡaɪd]" },
    { korean: "호텔의 이벤트 일정을 확인하다", english: "check the hotel's event schedule", pronunciation: "[ʧɛk ðə hoʊˈtɛlz ɪˈvɛnt ˈskɛʤuəl]" },
    { korean: "흡연 구역을 요청하다", english: "request a smoking area", pronunciation: "[rɪˈkwɛst ə ˈsmoʊkɪŋ ˈɛriə]" },
    { korean: "애완동물 친화적인 방을 요청하다", english: "request a pet-friendly room", pronunciation: "[rɪˈkwɛst ə pɛt-ˈfrɛndli rum]" },
    { korean: "장애인용 객실을 요청하다", english: "request an accessible room", pronunciation: "[rɪˈkwɛst ən ækˈsɛsəbəl rum]" },
    { korean: "룸서비스로 간식을 주문하다", english: "order snacks through room service", pronunciation: "[ˈɔrdər snæks θru rum ˈsɜrvɪs]" },
    { korean: "객실에서 체크아웃하다", english: "check out from the room", pronunciation: "[ʧɛk aʊt frʌm ðə rum]" },
    { korean: "관광 정보를 문의하다", english: "ask for tourist information", pronunciation: "[æsk fɔr ˈtʊrɪst ˌɪnfərˈmeɪʃən]" },
    { korean: "호텔 내 ATM을 찾다", english: "find the hotel ATM", pronunciation: "[faɪnd ðə hoʊˈtɛl eɪ-ti-ɛm]" },
    { korean: "호텔 지도에서 위치를 확인하다", english: "locate on the hotel map", pronunciation: "[loʊˈkeɪt ɑn ðə hoʊˈtɛl mæp]" },
    { korean: "전기 콘센트를 사용하다", english: "use the electric outlet", pronunciation: "[juz ði ɪˈlɛktrɪk ˈaʊtˌlɛt]" },
    { korean: "객실에서 점심을 주문하다", english: "order lunch in the room", pronunciation: "[ˈɔrdər lʌntʃ ɪn ðə rum]" },
    { korean: "호텔 헬스클럽을 이용하다", english: "use the hotel health club", pronunciation: "[juz ðə hoʊˈtɛl hɛlθ klʌb]" },
    { korean: "룸서비스로 차를 주문하다", english: "order tea through room service", pronunciation: "[ˈɔrdər ti θru rum ˈsɜrvɪs]" },
    { korean: "객실 내 비즈니스 센터를 사용하다", english: "use the in-room business center", pronunciation: "[juz ði ɪn-rum ˈbɪznɪs ˈsɛntər]" },
    { korean: "자전거 대여를 요청하다", english: "request bicycle rental", pronunciation: "[rɪˈkwɛst ˈbaɪsɪkəl ˈrɛntəl]" },
    { korean: "객실 전망을 선택하다", english: "choose the room view", pronunciation: "[ʧuz ðə rum vju]" },
    { korean: "미니바의 음료를 확인하다", english: "check the minibar drinks", pronunciation: "[ʧɛk ðə ˈmɪniˌbɑr drɪŋks]" },
    { korean: "객실 상태를 점검하다", english: "inspect the room condition", pronunciation: "[ɪnˈspɛkt ðə rum kənˈdɪʃən]" },
    { korean: "방의 조명을 조절하다", english: "adjust the room lighting", pronunciation: "[əˈʤʌst ðə rum ˈlaɪtɪŋ]" },
    { korean: "객실 내 전화기를 사용하다", english: "use the in-room phone", pronunciation: "[juz ði ɪn-rum foʊn]" },
    { korean: "방 청소를 요청하다", english: "request room cleaning", pronunciation: "[rɪˈkwɛst rum ˈklinɪŋ]" },
    { korean: "객실 서비스에 전화하다", english: "call room service", pronunciation: "[kɔl rum ˈsɜrvɪs]" },
    { korean: "난방을 켜다", english: "turn on the heater", pronunciation: "[tɜrn ɑn ðə ˈhitər]" },
    { korean: "침구를 교체하다", english: "change the bedding", pronunciation: "[ʧeɪndʒ ðə ˈbɛdɪŋ]" },
    { korean: "조용한 방을 요청하다", english: "request a quiet room", pronunciation: "[rɪˈkwɛst ə ˈkwaɪət rum]" },
    { korean: "목욕 가운을 요청하다", english: "request a bathrobe", pronunciation: "[rɪˈkwɛst ə ˈbæθˌroʊb]" },
    { korean: "베개를 추가로 요청하다", english: "request extra pillows", pronunciation: "[rɪˈkwɛst ˈɛkstrə ˈpɪloʊz]" },
    { korean: "인터넷에 접속하다", english: "access the internet", pronunciation: "[ˈæksɛs ði ˈɪntərˌnɛt]" },
    { korean: "호텔 레스토랑을 이용하다", english: "use the hotel restaurant", pronunciation: "[juz ðə hoʊˈtɛl ˈrɛstəˌrɑnt]" },
    { korean: "룸 서비스로 커피를 주문하다", english: "order coffee through room service", pronunciation: "[ˈɔrdər ˈkɑfi θru rum ˈsɜrvɪs]" },
    { korean: "미니바를 재고 요청하다", english: "request minibar restock", pronunciation: "[rɪˈkwɛst ˈmɪniˌbɑr ˈriˌstɑk]" },
    { korean: "아기 침대를 요청하다", english: "request a crib", pronunciation: "[rɪˈkwɛst ə krɪb]" },
    { korean: "객실 온도를 조절하다", english: "adjust the room temperature", pronunciation: "[əˈʤʌst ðə rum ˈtɛmprəʧər]" },
    { korean: "모닝콜을 요청하다", english: "request a wake-up call", pronunciation: "[rɪˈkwɛst ə ˈweɪk-ʌp kɔl]" },
    { korean: "시트 교체를 요청하다", english: "request a sheet change", pronunciation: "[rɪˈkwɛst ə ʃit ʧeɪndʒ]" },
    { korean: "룸서비스로 아침 식사를 주문하다", english: "order breakfast through room service", pronunciation: "[ˈɔrdər ˈbrɛkfəst θru rum ˈsɜrvɪs]" },
    { korean: "레스토랑 예약을 하다", english: "make a restaurant reservation", pronunciation: "[meɪk ə ˈrɛstəˌrɑnt ˌrɛzərˈveɪʃən]" },
    { korean: "방문 카드 키를 받다", english: "get a room card key", pronunciation: "[ɡɛt ə rum kɑrd ki]" },
    { korean: "짐을 방으로 옮기다", english: "have luggage brought to the room", pronunciation: "[hæv ˈlʌɡɪdʒ brɔt tu ðə rum]" },
    { korean: "객실 안전 금고를 사용하다", english: "use the room safe", pronunciation: "[juz ðə rum seɪf]" },
    { korean: "룸서비스 메뉴를 요청하다", english: "request the room service menu", pronunciation: "[rɪˈkwɛst ðə rum ˈsɜrvɪs ˈmɛnju]" },
    { korean: "방에 커피 메이커가 있는지 확인하다", english: "check if the room has a coffee maker", pronunciation: "[ʧɛk ɪf ðə rum hæz ə ˈkɔfi ˈmeɪkər]" },
    { korean: "회의실을 예약하다", english: "reserve a conference room", pronunciation: "[rɪˈzɜrv ə ˈkɑnfrəns rum]" },
    { korean: "호텔 지도와 안내 책자를 받다", english: "get a hotel map and guide", pronunciation: "[ɡɛt ə hoʊˈtɛl mæp ənd ɡaɪd]" },
    { korean: "세탁물 수거를 요청하다", english: "request laundry pickup", pronunciation: "[rɪˈkwɛst ˈlɔndri ˈpɪkʌp]" },
    { korean: "수건 교체를 요청하다", english: "request towel replacement", pronunciation: "[rɪˈkwɛst ˈtaʊəl rɪˈpleɪsmənt]" },
    { korean: "호텔 편의시설을 이용하다", english: "use hotel amenities", pronunciation: "[juz hoʊˈtɛl əˈmɛnɪtiz]" },
    { korean: "미니바 가격표를 확인하다", english: "check the minibar price list", pronunciation: "[ʧɛk ðə ˈmɪniˌbɑr praɪs lɪst]" },
    { korean: "얼음을 요청하다", english: "request ice", pronunciation: "[rɪˈkwɛst aɪs]" },
    { korean: "도시 전망이 있는 방을 요청하다", english: "request a room with a city view", pronunciation: "[rɪˈkwɛst ə rum wɪð ə ˈsɪti vju]" },
    { korean: "객실 키를 분실하다", english: "lose the room key", pronunciation: "[luz ðə rum ki]" },
    { korean: "객실 정보를 문의하다", english: "ask about room details", pronunciation: "[æsk əˈbaʊt rum dɪˈteɪlz]" },
    { korean: "방문 카드를 복사하다", english: "duplicate the room card", pronunciation: "[ˈduplɪˌkeɪt ðə rum kɑrd]" },
    { korean: "침대 유형을 선택하다", english: "choose bed type", pronunciation: "[ʧuz bɛd taɪp]" },
    { korean: "테라스가 있는 방을 요청하다", english: "request a room with a terrace", pronunciation: "[rɪˈkwɛst ə rum wɪð ə ˈtɛrəs]" },
    { korean: "기억에 남는 경험을 남기다", english: "leave a memorable experience", pronunciation: "[liv ə ˈmɛmərəbəl ɪkˈspɪriəns]" },
    { korean: "콘센트를 사용하다", english: "use the power outlet", pronunciation: "[juz ðə ˈpaʊər ˈaʊtˌlɛt]" },
    { korean: "수영장을 예약하다", english: "book the swimming pool", pronunciation: "[bʊk ðə ˈswɪmɪŋ pul]" },
    { korean: "룸서비스로 저녁을 주문하다", english: "order dinner through room service", pronunciation: "[ˈɔrdər ˈdɪnər θru rum ˈsɜrvɪs]" },
    { korean: "객실의 난방 문제를 해결하다", english: "fix the room heating issue", pronunciation: "[fɪks ðə rum ˈhitɪŋ ˈɪʃu]" },
    { korean: "비즈니스 센터를 이용하다", english: "use the business center", pronunciation: "[juz ðə ˈbɪznɪs ˈsɛntər]" },
    { korean: "호텔 시설을 평가하다", english: "evaluate hotel facilities", pronunciation: "[ɪˈvæljueɪt hoʊˈtɛl fəˈsɪlɪtiz]" },
    { korean: "방에서 일하다", english: "work from the room", pronunciation: "[wɜrk frʌm ðə rum]" },
    { korean: "호텔 내 레크리에이션을 즐기다", english: "enjoy hotel recreation", pronunciation: "[ɛnˈʤɔɪ hoʊˈtɛl ˌrɛkriˈeɪʃən]" }
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
