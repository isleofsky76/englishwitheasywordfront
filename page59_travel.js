const words = [
    {
        "korean": "공항에 가주세요.",
        "english": "Please take me to the airport.",
        "pronunciation": "[pliːz teɪk miː tuː ðiː ˈɛrˌpɔrt]",
        "hangul_pronunciation": "[플리즈 테익 미 투 디 에어포트]"
        },
        {
        "korean": "대한항공 카운터가 어디인가요?",
        "english": "Where is the Korean Air counter?",
        "pronunciation": "[wɛər ɪz ðə ˈkɔːriən ɛr ˈkaʊntər]",
        "hangul_pronunciation": "[웨어 이즈 더 코리언 에어 카운터]"
        },
        {
        "korean": "보안 검색대는 어디인가요?",
        "english": "Where is the security checkpoint?",
        "pronunciation": "[wɛər ɪz ðə sɪˈkjʊərɪti ˈtʃɛkˌpɔɪnt]",
        "hangul_pronunciation": "[웨어 이즈 더 시큐리티 첵포인트]"
        },
        {
        "korean": "이 액체를 반입해도 되나요?",
        "english": "Can I bring this liquid on board?",
        "pronunciation": "[kæn aɪ brɪŋ ðɪs ˈlɪkwɪd ɑn bɔrd]",
        "hangul_pronunciation": "[캔 아이 브링 디스 리퀴드 온 보드]"
        },
        {
        "korean": "이 게이트에서 탑승하나요?",
        "english": "Is this the gate for boarding?",
        "pronunciation": "[ɪz ðɪs ðə geɪt fɔr ˈbɔrdɪŋ]",
        "hangul_pronunciation": "[이즈 디스 더 게이트 포 보딩]"
        },
        {
        "korean": "제 좌석이 어디인가요?",
        "english": "Where is my seat?",
        "pronunciation": "[wɛər ɪz maɪ sit]",
        "hangul_pronunciation": "[웨어 이즈 마이 싯]"
        },
        {
        "korean": "물을 주시겠어요?",
        "english": "Could I have some water, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm ˈwɔtər, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 워터, 플리즈]"
        },
        {
        "korean": "짐은 어디에서 찾을 수 있나요?",
        "english": "Where can I find my luggage?",
        "pronunciation": "[wɛər kæn aɪ faɪnd maɪ ˈlʌgɪdʒ]",
        "hangul_pronunciation": "[웨어 캔 아이 파인드 마이 러기지]"
        },
        {
        "korean": "수하물 검사는 어디에서 하나요?",
        "english": "Where do I check my luggage?",
        "pronunciation": "[wɛər du aɪ tʃɛk maɪ ˈlʌgɪdʒ]",
        "hangul_pronunciation": "[웨어 두 아이 첵 마이 러기지]"
        },
        {
        "korean": "출국 심사는 어디에서 하나요?",
        "english": "Where is the immigration check?",
        "pronunciation": "[wɛər ɪz ði ˌɪmɪˈgreɪʃən tʃɛk]",
        "hangul_pronunciation": "[웨어 이즈 디 이미그레이션 첵]"
        },
        {
        "korean": "탑승권을 보여주실 수 있나요?",
        "english": "Can you show me your boarding pass?",
        "pronunciation": "[kæn ju ʃoʊ mi jʊər ˈbɔrdɪŋ pæs]",
        "hangul_pronunciation": "[캔 유 쇼 미 유어 보딩 패스]"
        },
        {
        "korean": "화장실은 어디에 있나요?",
        "english": "Where is the restroom?",
        "pronunciation": "[wɛər ɪz ðə ˈrɛstˌrum]",
        "hangul_pronunciation": "[웨어 이즈 더 레스트룸]"
        },
        {
        "korean": "연결 항공편의 탑승 수속은 어디서 하나요?",
        "english": "Where do I check in for my connecting flight?",
        "pronunciation": "[wɛər du aɪ ʧɛk ɪn fɔr maɪ kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[웨어 두 아이 체크 인 포 마이 커넥팅 플라잇]"
        },
        {
        "korean": "연결 항공편 수하물은 어디에서 찾나요?",
        "english": "Where do I collect my baggage for the connecting flight?",
        "pronunciation": "[wɛər du aɪ kəˈlɛkt maɪ ˈbæɡɪdʒ fɔr ðə kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[웨어 두 아이 컬렉트 마이 배기지 포 더 커넥팅 플라잇]"
        },
        {
        "korean": "연결 항공편이 지연되었나요?",
        "english": "Is my connecting flight delayed?",
        "pronunciation": "[ɪz maɪ kəˈnɛktɪŋ flaɪt dɪˈleɪd]",
        "hangul_pronunciation": "[이즈 마이 커넥팅 플라잇 딜레이드]"
        },
        {
        "korean": "연결 항공편으로 가는 길을 알려주시겠어요?",
        "english": "Can you show me the way to my connecting flight?",
        "pronunciation": "[kæn ju ʃoʊ mi ðə weɪ tu maɪ kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[캔 유 쇼 미 더 웨이 투 마이 커넥팅 플라잇]"
        },
        {
        "korean": "제 항공편이 예약되었나요?",
        "english": "Is my flight confirmed?",
        "pronunciation": "[ɪz maɪ flaɪt kənˈfɜrmd]",
        "hangul_pronunciation": "[이즈 마이 플라잇 컨펌드]"
        },
        
        {
        "korean": "항공편 번호를 확인할 수 있나요?",
        "english": "Can you confirm the flight number?",
        "pronunciation": "[kæn ju kənˈfɜrm ðə flaɪt ˈnʌmbər]",
        "hangul_pronunciation": "[캔 유 컨펌 더 플라잇 넘버]"
        },
        {
        "korean": "체크인하려고 합니다.",
        "english": "I would like to check in.",
        "pronunciation": "[aɪ wʊd laɪk tu ʧɛk ɪn]",
        "hangul_pronunciation": "[아이 우드 라이크 투 체크 인]"
        },
        
        {
        "korean": "수하물 체크인을 어디서 하나요?",
        "english": "Where do I check in my baggage?",
        "pronunciation": "[wɛər du aɪ ʧɛk ɪn maɪ ˈbæɡɪdʒ]",
        "hangul_pronunciation": "[웨어 두 아이 체크 인 마이 배기지]"
        },
        {
        "korean": "출발 게이트는 몇 번인가요?",
        "english": "What is the departure gate number?",
        "pronunciation": "[wʌt ɪz ðə dɪˈpɑrtʃər ɡeɪt ˈnʌmbər]",
        "hangul_pronunciation": "[왓 이즈 더 디파처 게이트 넘버]"
        },
        
        {
        "korean": "출발 게이트는 어디에 있나요?",
        "english": "Where is the departure gate?",
        "pronunciation": "[wɛər ɪz ðə dɪˈpɑrtʃər ɡeɪt]",
        "hangul_pronunciation": "[웨어 이즈 더 디파처 게이트]"
        },
        {
        "korean": "탑승이 시작되었습니다.",
        "english": "Boarding has begun.",
        "pronunciation": "[ˈbɔrdɪŋ hæz bɪˈɡʌn]",
        "hangul_pronunciation": "[보딩 해즈 비건]"
        },
        
        {
        "korean": "최종 탑승 안내입니다.",
        "english": "This is the final boarding call.",
        "pronunciation": "[ðɪs ɪz ðə ˈfaɪnəl ˈbɔrdɪŋ kɔl]",
        "hangul_pronunciation": "[디스 이즈 더 파이널 보딩 콜]"
        },
        {
        "korean": "탑승이 시작되었습니다.",
        "english": "Boarding has begun.",
        "pronunciation": "[ˈbɔrdɪŋ hæz bɪˈɡʌn]",
        "hangul_pronunciation": "[보딩 해즈 비건]"
        },
        {
        "korean": "최종 탑승 안내입니다.",
        "english": "This is the final boarding call.",
        "pronunciation": "[ðɪs ɪz ðə ˈfaɪnəl ˈbɔrdɪŋ kɔl]",
        "hangul_pronunciation": "[디스 이즈 더 파이널 보딩 콜]"
        },
        {
        "korean": "지금 탑승할 수 있습니다.",
        "english": "You can board now.",
        "pronunciation": "[ju kæn bɔrd naʊ]",
        "hangul_pronunciation": "[유 캔 보드 나우]"
        },
        {
        "korean": "탑승구가 변경되었습니다.",
        "english": "The gate has changed.",
        "pronunciation": "[ðə ɡeɪt hæz tʃeɪndʒd]",
        "hangul_pronunciation": "[더 게이트 해즈 체인지드]"
        },
        {
        "korean": "탑승구 번호는 몇 번인가요?",
        "english": "What is the gate number?",
        "pronunciation": "[wʌt ɪz ðə ɡeɪt ˈnʌmbər]",
        "hangul_pronunciation": "[왓 이즈 더 게이트 넘버]"
        },
        {
        "korean": "탑승권과 여권을 준비하세요.",
        "english": "Please have your boarding pass and passport ready.",
        "pronunciation": "[pliːz hæv jʊər ˈbɔrdɪŋ pæs ænd ˈpæspɔrt ˈrɛdi]",
        "hangul_pronunciation": "[플리즈 해브 유어 보딩 패스 앤 패스포트 레디]"
        },
        {
        "korean": "탑승구가 닫히기 전에 탑승하세요.",
        "english": "Please board before the gate closes.",
        "pronunciation": "[pliːz bɔrd bɪˈfɔr ðə ɡeɪt ˈkloʊzɪz]",
        "hangul_pronunciation": "[플리즈 보드 비포 더 게이트 클로즈즈]"
        },
        {
        "korean": "탑승을 위해 줄을 서 주세요.",
        "english": "Please line up for boarding.",
        "pronunciation": "[pliːz laɪn ʌp fɔr ˈbɔrdɪŋ]",
        "hangul_pronunciation": "[플리즈 라인 업 포 보딩]"
        },
        {
        "korean": "우선 탑승이 시작됩니다.",
        "english": "Priority boarding is now starting.",
        "pronunciation": "[praɪˈɔrɪti ˈbɔrdɪŋ ɪz naʊ ˈstɑrtɪŋ]",
        "hangul_pronunciation": "[프라이오리티 보딩 이즈 나우 스타팅]"
        },
        {
        "korean": "탑승구 앞에서 기다리세요.",
        "english": "Please wait in front of the gate.",
        "pronunciation": "[pliːz weɪt ɪn frʌnt ʌv ðə ɡeɪt]",
        "hangul_pronunciation": "[플리즈 웨잇 인 프런트 오브 더 게이트]"
        },
        {
        "korean": "비상구는 어디인가요?",
        "english": "Where is the emergency exit?",
        "pronunciation": "[wɛər ɪz ði ɪˈmɜrdʒənsi ˈɛgzɪt]",
        "hangul_pronunciation": "[웨어 이즈 디 이머전시 엑싯]"
        },
        {
        "korean": "기내식은 언제 나오나요?",
        "english": "When will the in-flight meal be served?",
        "pronunciation": "[wɛn wɪl ði ɪn-flaɪt mil bi sɜrvd]",
        "hangul_pronunciation": "[웬 윌 디 인-플라잇 밀 비 설브드]"
        },
        {
        "korean": "기내 엔터테인먼트는 어떻게 이용하나요?",
        "english": "How do I use the in-flight entertainment?",
        "pronunciation": "[haʊ du aɪ juz ði ɪn-flaɪt ˌɛntərˈteɪnmənt]",
        "hangul_pronunciation": "[하우 두 아이 유즈 디 인-플라잇 엔터테인먼트]"
        },
        {
        "korean": "기내 담요를 주실 수 있나요?",
        "english": "Could I have a blanket, please?",
        "pronunciation": "[kʊd aɪ hæv ə ˈblæŋkɪt, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 어 블랭킷, 플리즈]"
        },
        {
        "korean": "물을 주실 수 있나요?",
        "english": "Could I have some water, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm ˈwɔtər, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 워터, 플리즈]"
        },
        {
        "korean": "주스를 주실 수 있나요?",
        "english": "Could I have some juice, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm dʒus, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 쥬스, 플리즈]"
        },
        {
        "korean": "커피를 주실 수 있나요?",
        "english": "Could I have some coffee, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm ˈkɔfi, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 커피, 플리즈]"
        },
        {
        "korean": "차를 주실 수 있나요?",
        "english": "Could I have some tea, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm ti, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 티, 플리즈]"
        },
        {
        "korean": "와인을 주실 수 있나요?",
        "english": "Could I have some wine, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm waɪn, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 와인, 플리즈]"
        },
        {
        "korean": "맥주를 주실 수 있나요?",
        "english": "Could I have some beer, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm bɪr, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 비어, 플리즈]"
        },
        {
        "korean": "위스키를 주실 수 있나요?",
        "english": "Could I have some whiskey, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm ˈwɪski, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 위스키, 플리즈]"
        },
        {
        "korean": "얼음을 주실 수 있나요?",
        "english": "Could I have some ice, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm aɪs, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 아이스, 플리즈]"
        },
        {
        "korean": "소화제를 주실 수 있나요?",
        "english": "Could I have some antacid, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm ænˈtæsɪd, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 앤태싯, 플리즈]"
        },
        {
        "korean": "밴드를 주실 수 있나요?",
        "english": "Could I have a bandage, please?",
        "pronunciation": "[kʊd aɪ hæv ə ˈbændɪdʒ, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 어 밴디지, 플리즈]"
        },
        {
        "korean": "진통제를 주실 수 있나요?",
        "english": "Could I have a painkiller, please?",
        "pronunciation": "[kʊd aɪ hæv ə ˈpeɪnˌkɪlər, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 어 페인킬러, 플리즈]"
        },
        {
        "korean": "감기약을 주실 수 있나요?",
        "english": "Could I have some cold medicine, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm koʊld ˈmɛdɪsɪn, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 콜드 메디슨, 플리즈]"
        },
        {
        "korean": "멀미약을 주실 수 있나요?",
        "english": "Could I have some motion sickness medicine, please?",
        "pronunciation": "[kʊd aɪ hæv sʌm ˈmoʊʃən ˈsɪknɪs ˈmɛdɪsɪn, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 썸 모션 시크니스 메디슨, 플리즈]"
        },

        {
        "korean": "도와주실 수 있나요?",
        "english": "Could you help me, please?",
        "pronunciation": "[kʊd ju hɛlp mi, pliːz]",
        "hangul_pronunciation": "[쿧 유 헬프 미, 플리즈]"
        },
        {
        "korean": "베개를 주실 수 있나요?",
        "english": "Could I have a pillow, please?",
        "pronunciation": "[kʊd aɪ hæv ə ˈpɪloʊ, pliːz]",
        "hangul_pronunciation": "[쿧 아이 해브 어 필로우, 플리즈]"
        },
        {
        "korean": "식사는 언제 제공되나요?",
        "english": "When will meals be served?",
        "pronunciation": "[wɛn wɪl milz bi sɜrvd]",
        "hangul_pronunciation": "[웬 윌 밀즈 비 설브드]"
        },
        {
        "korean": "온도를 낮춰 주실 수 있나요?",
        "english": "Could you lower the temperature, please?",
        "pronunciation": "[kʊd ju ˈloʊər ðə ˈtɛmprəˌtʃʊr, pliːz]",
        "hangul_pronunciation": "[쿧 유 로우어 더 템프러쳐, 플리즈]"
        },
        {
        "korean": "화장실은 어디에 있나요?",
        "english": "Where is the restroom?",
        "pronunciation": "[wɛər ɪz ðə ˈrɛstˌrum]",
        "hangul_pronunciation": "[웨어 이즈 더 레스트룸]"
        },
        {
        "korean": "비행 시간은 얼마나 남았나요?",
        "english": "How much time is left in the flight?",
        "pronunciation": "[haʊ mʌtʃ taɪm ɪz lɛft ɪn ðə flaɪt]",
        "hangul_pronunciation": "[하우 머치 타임 이즈 레프트 인 더 플라잇]"
        },
        {
        "korean": "연결 항공편은 어디에서 타나요?",
        "english": "Where do I board my connecting flight?",
        "pronunciation": "[wɛər du aɪ bɔrd maɪ kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[웨어 두 아이 보드 마이 커넥팅 플라잇]"
        },
        {
        "korean": "자리를 바꿀 수 있을까요?",
        "english": "Could I change my seat, please?",
        "pronunciation": "[kʊd aɪ tʃeɪndʒ maɪ sit, pliːz]",
        "hangul_pronunciation": "[쿧 아이 체인지 마이 싯, 플리즈]"
        },
        {
        "korean": "소음이 너무 심한데 조용히 해 주실 수 있나요?",
        "english": "It's too noisy. Could you please keep it down?",
        "pronunciation": "[ɪts tu ˈnɔɪzi. kʊd ju pliːz kip ɪt daʊn]",
        "hangul_pronunciation": "[잇츠 투 노이즈. 쿧 유 플리즈 킵 잇 다운]"
        },
        {
        "korean": "면세품을 구입할 수 있나요?",
        "english": "Can I buy duty-free items?",
        "pronunciation": "[kæn aɪ baɪ ˈdjuːti friː ˈaɪtəmz]",
        "hangul_pronunciation": "[캔 아이 바이 듀티 프리 아이텀즈]"
        },
        {
        "korean": "탑승권을 보여주실 수 있나요?",
        "english": "Can you show me your boarding pass?",
        "pronunciation": "[kæn ju ʃoʊ mi jʊər ˈbɔrdɪŋ pæs]",
        "hangul_pronunciation": "[캔 유 쇼 미 유어 보딩 패스]"
        },
        {
        "korean": "여권을 보여주실 수 있나요?",
        "english": "Can you show me your passport?",
        "pronunciation": "[kæn ju ʃoʊ mi jʊər ˈpæspɔrt]",
        "hangul_pronunciation": "[캔 유 쇼 미 유어 패스포트]"
        },
        {
        "korean": "수하물이 있나요?",
        "english": "Do you have any checked baggage?",
        "pronunciation": "[du ju hæv ˈɛni tʃɛkt ˈbæɡɪdʒ]",
        "hangul_pronunciation": "[두 유 해브 에니 첵트 배기지]"
        },
        {
        "korean": "기내 반입 수하물이 있나요?",
        "english": "Do you have any carry-on luggage?",
        "pronunciation": "[du ju hæv ˈɛni ˈkæri ɑn ˈlʌɡɪdʒ]",
        "hangul_pronunciation": "[두 유 해브 에니 캐리 온 러기지]"
        },
        {
        "korean": "목적지는 어디인가요?",
        "english": "What is your destination?",
        "pronunciation": "[wʌt ɪz jʊər ˌdɛstəˈneɪʃən]",
        "hangul_pronunciation": "[왓 이즈 유어 데스티네이션]"
        },
        {
        "korean": "출발 항공편 번호가 어떻게 되나요?",
        "english": "What is your departure flight number?",
        "pronunciation": "[wʌt ɪz jʊər dɪˈpɑrtʃər flaɪt ˈnʌmbər]",
        "hangul_pronunciation": "[왓 이즈 유어 디파처 플라잇 넘버]"
        },
        {
        "korean": "체크인 카운터는 어디인가요?",
        "english": "Where is the check-in counter?",
        "pronunciation": "[wɛər ɪz ðə tʃɛk ɪn ˈkaʊntər]",
        "hangul_pronunciation": "[웨어 이즈 더 체크 인 카운터]"
        },
        {
        "korean": "수하물 카트를 어디서 찾을 수 있나요?",
        "english": "Where can I find a luggage cart?",
        "pronunciation": "[wɛər kæn aɪ faɪnd ə ˈlʌɡɪdʒ kɑrt]",
        "hangul_pronunciation": "[웨어 캔 아이 파인드 어 러기지 카트]"
        },
        {
        "korean": "터미널은 몇 번인가요?",
        "english": "Which terminal is it?",
        "pronunciation": "[wɪtʃ ˈtɜrmɪnəl ɪz ɪt]",
        "hangul_pronunciation": "[위치 터미널 이즈 잇]"
        },
        {
        "korean": "출발 게이트는 몇 번인가요?",
        "english": "What is the departure gate number?",
        "pronunciation": "[wʌt ɪz ðə dɪˈpɑrtʃər ɡeɪt ˈnʌmbər]",
        "hangul_pronunciation": "[왓 이즈 더 디파처 게이트 넘버]"
        },
        {
        "korean": "탑승 시간이 언제인가요?",
        "english": "What time is boarding?",
        "pronunciation": "[wʌt taɪm ɪz ˈbɔrdɪŋ]",
        "hangul_pronunciation": "[왓 타임 이즈 보딩]"
        },
        {
        "korean": "면세점은 어디인가요?",
        "english": "Where is the duty-free shop?",
        "pronunciation": "[wɛər ɪz ðə ˈdjuːti friː ʃɑp]",
        "hangul_pronunciation": "[웨어 이즈 더 듀티 프리 샵]"
        },
        {
        "korean": "공항 라운지는 어디에 있나요?",
        "english": "Where is the airport lounge?",
        "pronunciation": "[wɛər ɪz ði ˈɛrˌpɔrt laʊndʒ]",
        "hangul_pronunciation": "[웨어 이즈 디 에어포트 라운지]"
        },
        {
        "korean": "환전소는 어디에 있나요?",
        "english": "Where is the currency exchange?",
        "pronunciation": "[wɛər ɪz ðə ˈkɜrənsi ɪksˈtʃeɪndʒ]",
        "hangul_pronunciation": "[웨어 이즈 더 커런시 익스체인지]"
        },
        {
        "korean": "보안 검색대는 어디에 있나요?",
        "english": "Where is the security checkpoint?",
        "pronunciation": "[wɛər ɪz ðə sɪˈkjʊərɪti ˈtʃɛkˌpɔɪnt]",
        "hangul_pronunciation": "[웨어 이즈 더 시큐리티 첵포인트]"
        },
        {
        "korean": "수하물 찾는 곳은 어디인가요?",
        "english": "Where is the baggage claim?",
        "pronunciation": "[wɛər ɪz ðə ˈbæɡɪdʒ kleɪm]",
        "hangul_pronunciation": "[웨어 이즈 더 배기지 클레임]"
        },
        {
        "korean": "연결 항공편은 어디에서 타나요?",
        "english": "Where do I board my connecting flight?",
        "pronunciation": "[wɛər du aɪ bɔrd maɪ kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[웨어 두 아이 보드 마이 커넥팅 플라잇]"
        },
        {
        "korean": "연결 항공편의 게이트 번호는 몇 번인가요?",
        "english": "What is the gate number for my connecting flight?",
        "pronunciation": "[wʌt ɪz ðə geɪt ˈnʌmbər fɔr maɪ kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[왓 이즈 더 게이트 넘버 포 마이 커넥팅 플라잇]"
        },
        {
        "korean": "연결 항공편의 탑승 시간이 언제인가요?",
        "english": "What time is the boarding for my connecting flight?",
        "pronunciation": "[wʌt taɪm ɪz ðə ˈbɔrdɪŋ fɔr maɪ kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[왓 타임 이즈 더 보딩 포 마이 커넥팅 플라잇]"
        },
        {
        "korean": "연결 항공편의 터미널은 어디인가요?",
        "english": "Which terminal is my connecting flight?",
        "pronunciation": "[wɪtʃ ˈtɜrmɪnəl ɪz maɪ kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[위치 터미널 이즈 마이 커넥팅 플라잇]"
        },
        {
        "korean": "연결 항공편으로 가려면 버스를 타야 하나요?",
        "english": "Do I need to take a bus to get to my connecting flight?",
        "pronunciation": "[du aɪ nid tu teɪk ə bʌs tu gɛt tu maɪ kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[두 아이 니드 투 테익 어 버스 투 겟 투 마이 커넥팅 플라잇]"
        },
        {
        "korean": "연결 항공편으로 가는 셔틀은 어디에서 타나요?",
        "english": "Where can I catch the shuttle to my connecting flight?",
        "pronunciation": "[wɛər kæn aɪ kæʧ ðə ˈʃʌtl tu maɪ kəˈnɛktɪŋ flaɪt]",
        "hangul_pronunciation": "[웨어 캔 아이 캐치 더 셔틀 투 마이 커넥팅 플라잇]"
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