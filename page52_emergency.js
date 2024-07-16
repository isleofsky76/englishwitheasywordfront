const words = [
    { korean: "응급 상황", english: "emergency situation", pronunciation: "[ɪˈmɜrdʒənsi ˌsɪʧuˈeɪʃən]" },
    { korean: "응급처치 키트", english: "first aid kit", pronunciation: "[fɜrst eɪd kɪt]" },
    { korean: "119에 전화하다", english: "call 119", pronunciation: "[kɔl wʌn wʌn naɪn]" },
    { korean: "구급차를 부르다", english: "call an ambulance", pronunciation: "[kɔl ən ˈæmbjələns]" },
    { korean: "응급실에 가다", english: "go to the emergency room", pronunciation: "[ɡoʊ tu ði ɪˈmɜrdʒənsi rum]" },
    { korean: "화재 경보를 울리다", english: "sound the fire alarm", pronunciation: "[saʊnd ðə ˈfaɪər əˈlɑrm]" },
    { korean: "비상구를 찾다", english: "find the emergency exit", pronunciation: "[faɪnd ði ɪˈmɜrdʒənsi ˈɛɡzɪt]" },
    { korean: "도움이 필요하다", english: "need help", pronunciation: "[nid hɛlp]" },
    { korean: "경찰에 신고하다", english: "report to the police", pronunciation: "[rɪˈpɔrt tu ðə pəˈlis]" },
    { korean: "소방서에 전화하다", english: "call the fire department", pronunciation: "[kɔl ðə ˈfaɪər dɪˈpɑrtmənt]" },
    { korean: "화재를 피하다", english: "avoid the fire", pronunciation: "[əˈvɔɪd ðə ˈfaɪər]" },
    { korean: "안전한 장소로 대피하다", english: "evacuate to a safe place", pronunciation: "[ɪˈvækjueɪt tu ə seɪf pleɪs]" },
    { korean: "소화기를 사용하다", english: "use a fire extinguisher", pronunciation: "[juz ə ˈfaɪər ɪkˈstɪŋɡwɪʃər]" },
    { korean: "응급처치를 하다", english: "perform first aid", pronunciation: "[pərˈfɔrm fɜrst eɪd]" },
    { korean: "심폐소생술을 하다", english: "perform CPR", pronunciation: "[pərˈfɔrm si pi ɑr]" },
    { korean: "가스 누출을 신고하다", english: "report a gas leak", pronunciation: "[rɪˈpɔrt ə ɡæs lik]" },
    { korean: "도움을 요청하다", english: "ask for help", pronunciation: "[æsk fɔr hɛlp]" },
    { korean: "부상을 입다", english: "sustain an injury", pronunciation: "[səˈsteɪn ən ˈɪnʤəri]" },
    { korean: "응급 구조대를 기다리다", english: "wait for emergency responders", pronunciation: "[weɪt fɔr ɪˈmɜrdʒənsi rɪˈspɑndərz]" },
    { korean: "소화기를 가져오다", english: "bring a fire extinguisher", pronunciation: "[brɪŋ ə ˈfaɪər ɪkˈstɪŋɡwɪʃər]" },
    { korean: "구조 요청을 보내다", english: "send a distress signal", pronunciation: "[sɛnd ə dɪˈstrɛs ˈsɪɡnəl]" },
    { korean: "대피소를 찾다", english: "find a shelter", pronunciation: "[faɪnd ə ˈʃɛltər]" },
    { korean: "비상 대피 계획을 따르다", english: "follow the emergency evacuation plan", pronunciation: "[ˈfɑloʊ ði ɪˈmɜrdʒənsi ɪˌvækjueɪʃən plæn]" },
    { korean: "위험 구역을 피하다", english: "avoid the danger zone", pronunciation: "[əˈvɔɪd ðə ˈdeɪndʒər zoʊn]" },
    { korean: "의료 도움을 요청하다", english: "request medical assistance", pronunciation: "[rɪˈkwɛst ˈmɛdɪkəl əˈsɪstəns]" },
    { korean: "사고를 신고하다", english: "report an accident", pronunciation: "[rɪˈpɔrt ən ˈæksɪdənt]" },
    { korean: "비상 연락처를 확인하다", english: "check emergency contacts", pronunciation: "[ʧɛk ɪˈmɜrdʒənsi ˈkɑnˌtækts]" },
    { korean: "연기를 피하다", english: "avoid the smoke", pronunciation: "[əˈvɔɪd ðə smoʊk]" },
    { korean: "손전등을 사용하다", english: "use a flashlight", pronunciation: "[juz ə ˈflæʃˌlaɪt]" },
    { korean: "비상 식량을 준비하다", english: "prepare emergency food", pronunciation: "[prɪˈpɛr ɪˈmɜrdʒənsi fud]" },
    { korean: "비상 약품을 준비하다", english: "prepare emergency medicine", pronunciation: "[prɪˈpɛr ɪˈmɜrdʒənsi ˈmɛdɪsɪn]" },
    { korean: "화재 경보를 확인하다", english: "check the fire alarm", pronunciation: "[ʧɛk ðə ˈfaɪər əˈlɑrm]" },
    { korean: "비상구를 잠그지 마세요", english: "do not lock emergency exits", pronunciation: "[du nɑt lɑk ɪˈmɜrdʒənsi ˈɛɡzɪts]" },
    { korean: "비상 훈련에 참여하다", english: "participate in emergency drills", pronunciation: "[pɑrˈtɪsəˌpeɪt ɪn ɪˈmɜrdʒənsi drɪlz]" },
    { korean: "안전벨트를 매다", english: "fasten your seatbelt", pronunciation: "[ˈfæsən jʊər ˈsitˌbɛlt]" },
    { korean: "비상 대피 경로를 따르다", english: "follow the emergency evacuation route", pronunciation: "[ˈfɑloʊ ði ɪˈmɜrdʒənsi ɪˌvækjueɪʃən rut]" },
    { korean: "구조 요청을 외치다", english: "shout for rescue", pronunciation: "[ʃaʊt fɔr ˈrɛskju]" },
    { korean: "안전 지대를 찾다", english: "find a safe zone", pronunciation: "[faɪnd ə seɪf zoʊn]" },
    { korean: "비상 비품을 점검하다", english: "inspect emergency supplies", pronunciation: "[ɪnˈspɛkt ɪˈmɜrdʒənsi səˈplaɪz]" },
    { korean: "응급처치법을 배우다", english: "learn first aid", pronunciation: "[lɜrn fɜrst eɪd]" },
    { korean: "119에 전화 걸기", english: "dial 119", pronunciation: "[ˈdaɪəl wʌn wʌn naɪn]" },
    { korean: "대피를 요청하다", english: "request an evacuation", pronunciation: "[rɪˈkwɛst ən ɪˌvækjueɪʃən]" },
    { korean: "가스 누출을 피하다", english: "avoid a gas leak", pronunciation: "[əˈvɔɪd ə ɡæs lik]" },
    { korean: "비상구를 잠그다", english: "lock the emergency exit", pronunciation: "[lɑk ði ɪˈmɜrdʒənsi ˈɛɡzɪt]" },
    { korean: "구급차가 도착할 때까지 기다리다", english: "wait for the ambulance to arrive", pronunciation: "[weɪt fɔr ði ˈæmbjələns tu əˈraɪv]" },
    { korean: "비상시에 대비하다", english: "prepare for an emergency", pronunciation: "[prɪˈpɛr fɔr ən ɪˈmɜrdʒənsi]" },
    { korean: "사고 현장을 피하다", english: "avoid the accident scene", pronunciation: "[əˈvɔɪd ði ˈæksɪdənt sin]" },
    { korean: "응급 의료 서비스를 제공하다", english: "provide emergency medical services", pronunciation: "[prəˈvaɪd ɪˈmɜrdʒənsi ˈmɛdɪkəl ˈsɜrvɪsɪz]" },
    { korean: "비상 전화번호를 외우다", english: "memorize emergency phone numbers", pronunciation: "[ˈmɛməˌraɪz ɪˈmɜrdʒənsi foʊn ˈnʌmbərz]" },
    { korean: "구급 상자를 확인하다", english: "check the first aid box", pronunciation: "[ʧɛk ðə fɜrst eɪd bɑks]" },
    { korean: "비상 상황에서 냉정을 유지하다", english: "stay calm in an emergency", pronunciation: "[steɪ kɑm ɪn ən ɪˈmɜrdʒənsi]" },
    { korean: "부상을 입은 사람을 돕다", english: "help the injured", pronunciation: "[hɛlp ði ˈɪnʤərd]" },
    { korean: "비상 경보를 듣다", english: "hear the emergency alarm", pronunciation: "[hɪr ði ɪˈmɜrdʒənsi əˈlɑrm]" },
    { korean: "비상 대피 절차를 따르다", english: "follow emergency evacuation procedures", pronunciation: "[ˈfɑloʊ ɪˈmɜrdʒənsi ɪˌvækjueɪʃən prəˈsiʤərz]" },
    { korean: "구급차를 불러주세요", english: "please call an ambulance", pronunciation: "[pliz kɔl ən ˈæmbjələns]" },
    { korean: "의료진을 부르다", english: "call for medical staff", pronunciation: "[kɔl fɔr ˈmɛdɪkəl stæf]" },
    { korean: "연기 흡입을 피하다", english: "avoid smoke inhalation", pronunciation: "[əˈvɔɪd smoʊk ˌɪnhəˈleɪʃən]" },
    { korean: "응급처치 요령을 배우다", english: "learn first aid techniques", pronunciation: "[lɜrn fɜrst eɪd tɛkˈniks]" },
    { korean: "가족과 비상 연락을 유지하다", english: "maintain emergency contact with family", pronunciation: "[meɪnˈteɪn ɪˈmɜrdʒənsi ˈkɑnˌtækt wɪð ˈfæmɪli]" },
    { korean: "비상약품을 갖추다", english: "keep emergency medicine", pronunciation: "[kip ɪˈmɜrdʒənsi ˈmɛdɪsɪn]" },
    { korean: "비상시 물품을 준비하다", english: "prepare emergency supplies", pronunciation: "[prɪˈpɛr ɪˈmɜrdʒənsi səˈplaɪz]" },
    { korean: "도움이 필요하면 알리다", english: "alert others if you need help", pronunciation: "[əˈlɜrt ˈʌðərz ɪf ju nid hɛlp]" },
    { korean: "비상 훈련에 참석하다", english: "attend emergency drills", pronunciation: "[əˈtɛnd ɪˈmɜrdʒənsi drɪlz]" },
    { korean: "비상시에 대처하다", english: "handle emergency situations", pronunciation: "[ˈhændl ɪˈmɜrdʒənsi ˌsɪʧuˈeɪʃənz]" },
    { korean: "피난경로를 계획하다", english: "plan escape routes", pronunciation: "[plæn ɪˈskeɪp ruts]" },
    { korean: "소방차에 길을 양보하다", english: "yield to fire trucks", pronunciation: "[jild tu ˈfaɪər trʌks]" },
    { korean: "구급차에 타다", english: "ride in the ambulance", pronunciation: "[raɪd ɪn ði ˈæmbjələns]" },
    { korean: "도움을 요청하는 신호를 보내다", english: "send a signal for help", pronunciation: "[sɛnd ə ˈsɪɡnəl fɔr hɛlp]" },
    { korean: "소화기를 찾다", english: "find the fire extinguisher", pronunciation: "[faɪnd ðə ˈfaɪər ɪkˈstɪŋɡwɪʃər]" },
    { korean: "구조대에 연락하다", english: "contact the rescue team", pronunciation: "[ˈkɒntækt ðə ˈrɛskju tim]" },
    { korean: "피난소를 찾다", english: "find a refuge", pronunciation: "[faɪnd ə ˈrɛfjuʤ]" },
    { korean: "비상시에 가족을 찾다", english: "locate family members in an emergency", pronunciation: "[loʊˈkeɪt ˈfæmɪli ˈmɛmbərz ɪn ən ɪˈmɜrdʒənsi]" },
    { korean: "대피소를 찾다", english: "locate a shelter", pronunciation: "[loʊˈkeɪt ə ˈʃɛltər]" },
    { korean: "도움을 줄 수 있는 사람을 찾다", english: "find someone who can help", pronunciation: "[faɪnd ˈsʌmˌwʌn hu kæn hɛlp]" },
    { korean: "비상시 대피할 장소를 정하다", english: "designate an emergency meeting spot", pronunciation: "[ˈdɛzɪɡˌneɪt ən ɪˈmɜrdʒənsi ˈmitɪŋ spɑt]" },
    { korean: "구급차에 탑승하다", english: "board the ambulance", pronunciation: "[bɔrd ði ˈæmbjələns]" },
    { korean: "구조를 요청하다", english: "request rescue", pronunciation: "[rɪˈkwɛst ˈrɛskju]" },
    { korean: "대피용 출구를 확인하다", english: "identify evacuation exits", pronunciation: "[aɪˈdɛntɪˌfaɪ ɪˌvækjueɪʃən ˈɛɡzɪts]" },
    { korean: "비상구로 대피하다", english: "evacuate through emergency exits", pronunciation: "[ɪˈvækjueɪt θru ɪˈmɜrdʒənsi ˈɛɡzɪts]" },
    { korean: "구급차의 사이렌을 듣다", english: "hear the ambulance siren", pronunciation: "[hɪr ði ˈæmbjələns ˈsaɪrən]" },
    { korean: "비상시 연기 경로를 피하다", english: "avoid smoke routes in an emergency", pronunciation: "[əˈvɔɪd smoʊk ruts ɪn ən ɪˈmɜrdʒənsi]" },
    { korean: "부상자를 돕다", english: "assist the injured", pronunciation: "[əˈsɪst ði ˈɪnʤərd]" },
    { korean: "구조팀에 신호를 보내다", english: "signal the rescue team", pronunciation: "[ˈsɪɡnəl ðə ˈrɛskju tim]" },
    { korean: "비상 상황을 알리다", english: "alert about the emergency", pronunciation: "[əˈlɜrt əˈbaʊt ði ɪˈmɜrdʒənsi]" },
    { korean: "구명조끼를 착용하다", english: "wear a life jacket", pronunciation: "[wɛr ə laɪf ˈʤækɪt]" },
    { korean: "구조 요청을 외치다", english: "shout for help", pronunciation: "[ʃaʊt fɔr hɛlp]" },
    { korean: "비상 식량을 비축하다", english: "stock up on emergency food", pronunciation: "[stɑk ʌp ɑn ɪˈmɜrdʒənsi fud]" },
    { korean: "심폐소생술을 배우다", english: "learn CPR", pronunciation: "[lɜrn si-pi-ɑr]" },
    { korean: "구명보트를 타다", english: "get on a lifeboat", pronunciation: "[ɡɛt ɑn ə ˈlaɪfˌboʊt]" },
    { korean: "재난 대비 계획을 세우다", english: "create a disaster plan", pronunciation: "[kriˈeɪt ə dɪˈzæstər plæn]" },
    { korean: "화재 대피 훈련을 하다", english: "conduct fire drills", pronunciation: "[ˈkɑndʌkt ˈfaɪər drɪlz]" },
    { korean: "연기 흡입을 방지하다", english: "prevent smoke inhalation", pronunciation: "[priˈvɛnt smoʊk ˌɪnhəˈleɪʃən]" },
    { korean: "비상 사다리를 사용하다", english: "use an emergency ladder", pronunciation: "[juz ən ɪˈmɜrdʒənsi ˈlædər]" },
    { korean: "재난 대비 키트를 준비하다", english: "prepare a disaster kit", pronunciation: "[prɪˈpɛr ə dɪˈzæstər kɪt]" },
    { korean: "비상시 구급약을 챙기다", english: "carry emergency medication", pronunciation: "[ˈkæri ɪˈmɜrdʒənsi ˌmɛdɪˈkeɪʃən]" },
    { korean: "비상시 연락할 사람을 정하다", english: "designate an emergency contact", pronunciation: "[ˈdɛzɪɡˌneɪt ən ɪˈmɜrdʒənsi ˈkɑntækt]" },
    { korean: "위급한 상황에서 대응하다", english: "respond to an emergency", pronunciation: "[rɪˈspɑnd tu ən ɪˈmɜrdʒənsi]" },
    { korean: "구조 요청 신호를 보내다", english: "send out a distress call", pronunciation: "[sɛnd aʊt ə dɪˈstrɛs kɔl]" },
    { korean: "비상시 대피 방법을 익히다", english: "learn evacuation procedures", pronunciation: "[lɜrn ɪˌvækjueɪʃən prəˈsiʤərz]" },
    { korean: "구급용품을 점검하다", english: "inspect emergency equipment", pronunciation: "[ɪnˈspɛkt ɪˈmɜrdʒənsi ɪˈkwɪpmənt]" },
    { korean: "긴급상황에서 대처하다", english: "handle a critical situation", pronunciation: "[ˈhændl ə ˈkrɪtɪkəl ˌsɪʧuˈeɪʃən]" },
    { korean: "비상 대피소를 찾다", english: "locate an emergency shelter", pronunciation: "[loʊˈkeɪt ən ɪˈmɜrdʒənsi ˈʃɛltər]" },
    { korean: "위급 상황을 신속히 처리하다", english: "deal with emergencies promptly", pronunciation: "[dil wɪð ɪˈmɜrdʒənsiz ˈprɑmptli]" },
    { korean: "비상 연락망을 구축하다", english: "set up an emergency communication network", pronunciation: "[sɛt ʌp ən ɪˈmɜrdʒənsi kəˌmjunɪˈkeɪʃən ˈnɛtwɜrk]" },
    { korean: "위급한 환자를 돕다", english: "aid a critical patient", pronunciation: "[eɪd ə ˈkrɪtɪkəl ˈpeɪʃənt]" },
    { korean: "구조 요청을 알리다", english: "announce a call for help", pronunciation: "[əˈnaʊns ə kɔl fɔr hɛlp]" },
    { korean: "비상시 필요한 물품을 준비하다", english: "prepare necessary items for emergencies", pronunciation: "[prɪˈpɛr ˈnɛsəˌsɛri ˈaɪtəmz fɔr ɪˈmɜrdʒənsiz]" },
    { korean: "구조 신호를 보내다", english: "send a rescue signal", pronunciation: "[sɛnd ə ˈrɛskju ˈsɪɡnəl]" },
    { korean: "위급 상황에서 대피하다", english: "evacuate in a crisis", pronunciation: "[ɪˈvækjueɪt ɪn ə ˈkraɪsɪs]" },
    { korean: "비상시에 사용할 장비를 점검하다", english: "check equipment for emergencies", pronunciation: "[ʧɛk ɪˈkwɪpmənt fɔr ɪˈmɜrdʒənsiz]" },
    { korean: "긴급한 상황에서 지원하다", english: "support in a critical situation", pronunciation: "[səˈpɔrt ɪn ə ˈkrɪtɪkəl ˌsɪʧuˈeɪʃən]" },
    { korean: "위급한 상황에 대비하다", english: "be prepared for a critical situation", pronunciation: "[bi prɪˈpɛrd fɔr ə ˈkrɪtɪkəl ˌsɪʧuˈeɪʃən]" },
    { korean: "긴급상황에서 대처 요령을 배우다", english: "learn how to handle emergencies", pronunciation: "[lɜrn haʊ tu ˈhændl ɪˈmɜrdʒənsiz]" },
    { korean: "구급 장비를 사용하다", english: "use emergency gear", pronunciation: "[juz ɪˈmɜrdʒənsi ɡɪr]" },
    { korean: "비상시에 대처법을 훈련하다", english: "train for emergency response", pronunciation: "[treɪn fɔr ɪˈmɜrdʒənsi rɪˈspɑns]" },
    { korean: "구조 요청을 보내다", english: "send a request for rescue", pronunciation: "[sɛnd ə rɪˈkwɛst fɔr ˈrɛskju]" },
    { korean: "구명 기구를 착용하다", english: "wear rescue equipment", pronunciation: "[wɛr ˈrɛskju ɪˈkwɪpmənt]" },
    { korean: "긴급 상황에서 안전을 유지하다", english: "maintain safety in an emergency", pronunciation: "[meɪnˈteɪn ˈseɪfti ɪn ən ɪˈmɜrdʒənsi]" },
    { korean: "위급한 상황에서 구조를 요청하다", english: "call for rescue in a critical situation", pronunciation: "[kɔl fɔr ˈrɛskju ɪn ə ˈkrɪtɪkəl ˌsɪʧuˈeɪʃən]" },
    { korean: "구명 밧줄을 사용하다", english: "use a rescue rope", pronunciation: "[juz ə ˈrɛskju roʊp]" },
    { korean: "구조 헬리콥터를 요청하다", english: "request a rescue helicopter", pronunciation: "[rɪˈkwɛst ə ˈrɛskju ˈhɛlɪˌkɑptər]" },
    { korean: "구조 신호를 보이다", english: "display a distress signal", pronunciation: "[dɪˈspleɪ ə dɪˈstrɛs ˈsɪɡnəl]" },
    { korean: "긴급구조팀을 기다리다", english: "wait for the emergency rescue team", pronunciation: "[weɪt fɔr ði ɪˈmɜrdʒənsi ˈrɛskju tim]" },
    { korean: "비상용 배터리를 준비하다", english: "prepare emergency batteries", pronunciation: "[prɪˈpɛr ɪˈmɜrdʒənsi ˈbætəriz]" },
    { korean: "위급한 상황에서 대피 경로를 따르다", english: "follow the evacuation route in a crisis", pronunciation: "[ˈfɑloʊ ði ɪˌvækjueɪʃən rut ɪn ə ˈkraɪsɪs]" },
    { korean: "비상용 발전기를 점검하다", english: "check the emergency generator", pronunciation: "[ʧɛk ði ɪˈmɜrdʒənsi ˈʤɛnəˌreɪtər]" },
    { korean: "구조 요청 깃발을 흔들다", english: "wave a rescue flag", pronunciation: "[weɪv ə ˈrɛskju flæɡ]" },
    { korean: "긴급 구조 신호를 보내다", english: "send an emergency signal", pronunciation: "[sɛnd ən ɪˈmɜrdʒənsi ˈsɪɡnəl]" },
    { korean: "응급처치 수업에 참여하다", english: "attend a first aid class", pronunciation: "[əˈtɛnd ə fɜrst eɪd klæs]" },
    { korean: "비상 상황 시 피난 계획을 세우다", english: "create an evacuation plan for emergencies", pronunciation: "[kriˈeɪt ən ɪˌvækjueɪʃən plæn fɔr ɪˈmɜrdʒənsiz]" },
    { korean: "위험 물질을 피하다", english: "avoid hazardous materials", pronunciation: "[əˈvɔɪd ˈhæzərdəs məˈtɪriəlz]" },
    { korean: "안전 벨트를 풀다", english: "unfasten your seatbelt", pronunciation: "[ʌnˈfæsən jʊər ˈsitˌbɛlt]" },
    { korean: "응급 구조 훈련을 받다", english: "receive emergency rescue training", pronunciation: "[rɪˈsiv ɪˈmɜrdʒənsi ˈrɛskju ˈtreɪnɪŋ]" },
    { korean: "긴급 탈출 장치를 사용하다", english: "use an emergency escape device", pronunciation: "[juz ən ɪˈmɜrdʒənsi ɪˈskeɪp dɪˈvaɪs]" },
    { korean: "비상 상황에서 심리적 지원을 받다", english: "receive psychological support during emergencies", pronunciation: "[rɪˈsiv ˌsaɪkəˈlɑʤɪkəl səˈpɔrt ˈdjʊrɪŋ ɪˈmɜrdʒənsiz]" },
    { korean: "안전 장비를 착용하다", english: "wear safety equipment", pronunciation: "[wɛr ˈseɪfti ɪˈkwɪpmənt]" },
    { korean: "비상구를 사용하지 마세요", english: "do not use the emergency exit", pronunciation: "[du nɑt juz ði ɪˈmɜrdʒənsi ˈɛɡzɪt]" },
    { korean: "응급처치 방법을 익히다", english: "familiarize yourself with first aid techniques", pronunciation: "[fəˈmɪljəˌraɪz jʊərˈsɛlf wɪð fɜrst eɪd tɛkˈniks]" },
    { korean: "위급한 상황에서 사람들을 대피시키다", english: "evacuate people in a critical situation", pronunciation: "[ɪˈvækjueɪt ˈpipəl ɪn ə ˈkrɪtɪkəl ˌsɪʧuˈeɪʃən]" },
    { korean: "재난 대응팀에 연락하다", english: "contact the disaster response team", pronunciation: "[ˈkɑntækt ðə dɪˈzæstər rɪˈspɑns tim]" },
    { korean: "비상 사다리를 준비하다", english: "prepare an emergency ladder", pronunciation: "[prɪˈpɛr ən ɪˈmɜrdʒənsi ˈlædər]" },
    { korean: "비상시 사용 지침을 읽다", english: "read emergency usage instructions", pronunciation: "[rid ɪˈmɜrdʒənsi ˈjusɪdʒ ɪnˈstrʌkʃənz]" },
    { korean: "비상시에 연기 흡입을 피하다", english: "avoid smoke inhalation during emergencies", pronunciation: "[əˈvɔɪd smoʊk ˌɪnhəˈleɪʃən ˈdjʊrɪŋ ɪˈmɜrdʒənsiz]" },
    { korean: "비상 조명등을 사용하다", english: "use an emergency light", pronunciation: "[juz ən ɪˈmɜrdʒənsi laɪt]" },
    { korean: "위급한 상황에서 탈출하다", english: "escape in a critical situation", pronunciation: "[ɪˈskeɪp ɪn ə ˈkrɪtɪkəl ˌsɪʧuˈeɪʃən]" },
    { korean: "긴급 탈출 계획을 세우다", english: "create an emergency escape plan", pronunciation: "[kriˈeɪt ən ɪˈmɜrdʒənsi ɪˈskeɪp plæn]" },
    { korean: "비상 훈련을 받다", english: "undergo emergency training", pronunciation: "[ˌʌndərˈɡoʊ ɪˈmɜrdʒənsi ˈtreɪnɪŋ]" },
    { korean: "응급 구조 차량을 준비하다", english: "prepare an emergency response vehicle", pronunciation: "[prɪˈpɛr ən ɪˈmɜrdʒənsi rɪˈspɑns ˈviɪkəl]" },
    { korean: "비상용 발전기를 사용하다", english: "use an emergency generator", pronunciation: "[juz ən ɪˈmɜrdʒənsi ˈʤɛnəˌreɪtər]" },
    { korean: "위급한 상황에서 안전지대를 찾다", english: "find a safe area in a critical situation", pronunciation: "[faɪnd ə seɪf ˈɛriə ɪn ə ˈkrɪtɪkəl ˌsɪʧuˈeɪʃən]" },
    { korean: "비상 대피 훈련을 받다", english: "participate in evacuation drills", pronunciation: "[pɑrˈtɪsəˌpeɪt ɪn ɪˌvækjueɪʃən drɪlz]" },
    { korean: "위급 상황에서 비상 버튼을 누르다", english: "press the emergency button in a crisis", pronunciation: "[prɛs ði ɪˈmɜrdʒənsi ˈbʌtən ɪn ə ˈkraɪsɪs]" },
    { korean: "비상 연락처를 기록하다", english: "record emergency contacts", pronunciation: "[ˈrɛkɔrd ɪˈmɜrdʒənsi ˈkɑnˌtækts]" },
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
