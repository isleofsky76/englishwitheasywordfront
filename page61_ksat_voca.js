let currentWordIndex = 0;
let pronounceInterval;
let synth = window.speechSynthesis;
let autoPlayInterval;

const words = [
    {
        "korean": "재미있는, 매력적인",
        "english": "engaging",
        "pronunciation": "[ɪnˈɡeɪdʒɪŋ]",
        "hangul_pronunciation": "[인게이징]",
        "sample_sentence": "The movie was so engaging that I didn't want it to end.",
        "korean_sentence": "그 영화는 너무 재미있어서 끝나지 않았으면 좋겠다고 생각했어요."
    },
    {
        "korean": "제약, 제한",
        "english": "constraint",
        "pronunciation": "[kənˈstreɪnt]",
        "hangul_pronunciation": "[컨스트레인트]",
        "sample_sentence": "The budget constraints made it difficult to complete the project on time.",
        "korean_sentence": "예산 제약으로 인해 프로젝트를 제시간에 완료하기 어려웠어요."
    },
    {
        "korean": "일반적인, 전형적인",
        "english": "typical",
        "pronunciation": "[ˈtɪpɪkəl]",
        "hangul_pronunciation": "[티피컬]",
        "sample_sentence": "It's typical of him to be late for meetings.",
        "korean_sentence": "그가 회의에 늦는 것은 흔한 일이에요."
    },
    {
        "korean": "낙담, 실망",
        "english": "letdown",
        "pronunciation": "[ˈlɛtdaʊn]",
        "hangul_pronunciation": "[렛다운]",
        "sample_sentence": "The ending of the book was a letdown.",
        "korean_sentence": "그 책의 결말은 실망스러웠어요."
    },
    {
        "korean": "(몸을) 떨다, 전율",
        "english": "shiver",
        "pronunciation": "[ˈʃɪvər]",
        "hangul_pronunciation": "[쉬버]",
        "sample_sentence": "He began to shiver in the cold wind.",
        "korean_sentence": "그는 차가운 바람에 몸을 떨기 시작했어요."
    },
    {
        "korean": "존경[존중]하다, 존경, 존중, (측)면, 점",
        "english": "respect",
        "pronunciation": "[rɪˈspɛkt]",
        "hangul_pronunciation": "[리스펙트]",
        "sample_sentence": "You should always respect other people's opinions.",
        "korean_sentence": "항상 다른 사람들의 의견을 존중해야 해요."
    },
    {
        "korean": "협력하다, 협조하다",
        "english": "cooperate",
        "pronunciation": "[koʊˈɑːpəˌreɪt]",
        "hangul_pronunciation": "[코아퍼레이트]",
        "sample_sentence": "We need to cooperate to finish the project successfully.",
        "korean_sentence": "프로젝트를 성공적으로 완료하려면 협력해야 해요."
    },
    {
        "korean": "가리키다, 보여 주다, 나타내다",
        "english": "indicate",
        "pronunciation": "[ˈɪndɪˌkeɪt]",
        "hangul_pronunciation": "[인디케이트]",
        "sample_sentence": "The results indicate a significant improvement in performance.",
        "korean_sentence": "결과는 성능의 큰 향상을 나타냅니다."
    },
    {
        "korean": "독특한, 이상한",
        "english": "unusual",
        "pronunciation": "[ʌnˈjuːʒuəl]",
        "hangul_pronunciation": "[언유주얼]",
        "sample_sentence": "She has an unusual talent for painting.",
        "korean_sentence": "그녀는 그림에 대한 독특한 재능을 가지고 있어요."
    },
    {
        "korean": "기준",
        "english": "criterion",
        "pronunciation": "[kraɪˈtɪəriən]",
        "hangul_pronunciation": "[크라이테리언]",
        "sample_sentence": "The main criterion for selection is experience.",
        "korean_sentence": "선정의 주요 기준은 경험입니다."
    },
    {
        "korean": "편견에 찬, 편견이 있는",
        "english": "prejudiced",
        "pronunciation": "[ˈprɛdʒədɪst]",
        "hangul_pronunciation": "[프레저디스트]",
        "sample_sentence": "She is prejudiced against people from certain backgrounds.",
        "korean_sentence": "그녀는 특정 배경을 가진 사람들에 대해 편견을 가지고 있어요."
    },
    {
        "korean": "무시하다",
        "english": "ignore",
        "pronunciation": "[ɪɡˈnɔr]",
        "hangul_pronunciation": "[이그노어]",
        "sample_sentence": "It's not wise to ignore the advice of experts.",
        "korean_sentence": "전문가들의 조언을 무시하는 것은 현명하지 않아요."
    },
    {
        "korean": "반대자, 반대편, 상대(방)",
        "english": "opponent",
        "pronunciation": "[əˈpoʊnənt]",
        "hangul_pronunciation": "[어포넌트]",
        "sample_sentence": "He defeated his opponent in the final match.",
        "korean_sentence": "그는 결승전에서 상대를 물리쳤어요."
    },
    {
        "korean": "결과, 성과",
        "english": "outcome",
        "pronunciation": "[ˈaʊtˌkʌm]",
        "hangul_pronunciation": "[아웃컴]",
        "sample_sentence": "We are eagerly waiting for the outcome of the election.",
        "korean_sentence": "우리는 선거 결과를 간절히 기다리고 있어요."
    },
    {
        "korean": "채취하다, 추출하다",
        "english": "extract",
        "pronunciation": "[ˈɛkˌstrækt]",
        "hangul_pronunciation": "[엑스트랙트]",
        "sample_sentence": "They extract essential oils from various plants.",
        "korean_sentence": "그들은 다양한 식물에서 에센셜 오일을 추출합니다."
    },
    {
        "korean": "타협, 절충, 굽히다, 양보하다, 타협하다",
        "english": "compromise",
        "pronunciation": "[ˈkɑːmprəˌmaɪz]",
        "hangul_pronunciation": "[컴프러마이즈]",
        "sample_sentence": "They had to compromise to reach an agreement.",
        "korean_sentence": "그들은 합의에 도달하기 위해 타협해야 했어요."
    },
    {
        "korean": "부정하다, 부인하다",
        "english": "deny",
        "pronunciation": "[dɪˈnaɪ]",
        "hangul_pronunciation": "[디나이]",
        "sample_sentence": "He denied any involvement in the crime.",
        "korean_sentence": "그는 범죄에 연루된 것을 부인했어요."
    },
    {
        "korean": "신분, 지위, 상태",
        "english": "status",
        "pronunciation": "[ˈsteɪtəs]",
        "hangul_pronunciation": "[스테이투스]",
        "sample_sentence": "She checked her application status online.",
        "korean_sentence": "그녀는 온라인으로 자신의 신청 상태를 확인했어요."
    },
    {
        "korean": "순환하다, 순회하다",
        "english": "circulate",
        "pronunciation": "[ˈsɜːrkjəˌleɪt]",
        "hangul_pronunciation": "[서큘레이트]",
        "sample_sentence": "Blood circulates through the body.",
        "korean_sentence": "혈액은 몸을 순환합니다."
    },
    {
        "korean": "즉각적인, 당장의, 당면한",
        "english": "immediate",
        "pronunciation": "[ɪˈmiːdiət]",
        "hangul_pronunciation": "[이미디엇]",
        "sample_sentence": "We need an immediate solution to the problem.",
        "korean_sentence": "우리는 그 문제에 대한 즉각적인 해결책이 필요합니다."
    },
    {
        "korean": "평가하다",
        "english": "evaluate",
        "pronunciation": "[ɪˈvæljueɪt]",
        "hangul_pronunciation": "[이밸류에이트]",
        "sample_sentence": "The teacher will evaluate the students' progress.",
        "korean_sentence": "선생님은 학생들의 진도를 평가할 것입니다."
    },
    {
        "korean": "포함하다, 통합하다",
        "english": "incorporate",
        "pronunciation": "[ɪnˈkɔːrpəˌreɪt]",
        "hangul_pronunciation": "[인코포레이트]",
        "sample_sentence": "We need to incorporate more diverse ideas.",
        "korean_sentence": "우리는 더 다양한 아이디어를 포함할 필요가 있습니다."
    },
    {
        "korean": "보여 주다, 드러내다, 밝히다",
        "english": "reveal",
        "pronunciation": "[rɪˈviːl]",
        "hangul_pronunciation": "[리빌]",
        "sample_sentence": "The survey revealed some surprising results.",
        "korean_sentence": "설문 조사 결과는 몇 가지 놀라운 사실을 드러냈습니다."
    },
    {
        "korean": "금지하다",
        "english": "prohibit",
        "pronunciation": "[prəˈhɪbɪt]",
        "hangul_pronunciation": "[프러히빗]",
        "sample_sentence": "Smoking is prohibited in this building.",
        "korean_sentence": "이 건물에서는 흡연이 금지되어 있습니다."
    },
    {
        "korean": "걸림돌, 장애(물)",
        "english": "obstacle",
        "pronunciation": "[ˈɑːbstəkəl]",
        "hangul_pronunciation": "[옵스터클]",
        "sample_sentence": "The biggest obstacle to success is fear of failure.",
        "korean_sentence": "성공에 대한 가장 큰 장애물은 실패에 대한 두려움입니다."
    },
    {
        "korean": "(주로 복수로) 남은 음식, (먹다) 남은",
        "english": "leftover",
        "pronunciation": "[ˈlɛftˌoʊvər]",
        "hangul_pronunciation": "[레프트오버]",
        "sample_sentence": "We had leftovers for dinner.",
        "korean_sentence": "우리는 저녁으로 남은 음식을 먹었습니다."
    },
    {
        "korean": "부분적인, 불완전한, 편파적인",
        "english": "partial",
        "pronunciation": "[ˈpɑːrʃəl]",
        "hangul_pronunciation": "[파셜]",
        "sample_sentence": "She made a partial payment for the car.",
        "korean_sentence": "그녀는 차에 대한 부분적인 지불을 했습니다."
    },
    {
        "korean": "검증하다, 입증하다, 승인하다",
        "english": "validate",
        "pronunciation": "[ˈvæləˌdeɪt]",
        "hangul_pronunciation": "[밸리데이트]",
        "sample_sentence": "The data must be validated before use.",
        "korean_sentence": "데이터는 사용 전에 검증되어야 합니다."
    },
    {
        "korean": "산출하다, 계산하다",
        "english": "compute",
        "pronunciation": "[kəmˈpjuːt]",
        "hangul_pronunciation": "[컴퓨트]",
        "sample_sentence": "The software can compute the total cost.",
        "korean_sentence": "이 소프트웨어는 총 비용을 계산할 수 있습니다."
    },
    {
        "korean": "국내의, 가사[가정]의",
        "english": "domestic",
        "pronunciation": "[dəˈmɛstɪk]",
        "hangul_pronunciation": "[도메스틱]",
        "sample_sentence": "Domestic flights are cheaper than international ones.",
        "korean_sentence": "국내 항공편이 국제 항공편보다 저렴합니다."
    },
    {
        "korean": "분포, 분배, 배급",
        "english": "distribution",
        "pronunciation": "[ˌdɪstrəˈbjuːʃən]",
        "hangul_pronunciation": "[디스트리뷰션]",
        "sample_sentence": "The distribution of resources must be fair.",
        "korean_sentence": "자원의 분배는 공정해야 합니다."
    },
    {
        "korean": "이루다, 얻다, 도달하다",
        "english": "attain",
        "pronunciation": "[əˈteɪn]",
        "hangul_pronunciation": "[어테인]",
        "sample_sentence": "She has attained a high level of skill.",
        "korean_sentence": "그녀는 높은 수준의 기술을 얻었습니다."
    },
    {
        "korean": "구역, 지역, 지구",
        "english": "district",
        "pronunciation": "[ˈdɪstrɪkt]",
        "hangul_pronunciation": "[디스트릭트]",
        "sample_sentence": "They live in a quiet district of the city.",
        "korean_sentence": "그들은 도시의 조용한 지역에 살고 있습니다."
    },
    {
        "korean": "번성하다, 번영하다",
        "english": "flourish",
        "pronunciation": "[ˈflɜːrɪʃ]",
        "hangul_pronunciation": "[플러리쉬]",
        "sample_sentence": "Plants flourish in the rich soil.",
        "korean_sentence": "식물들은 비옥한 토양에서 번성합니다."
    },
    {
        "korean": "유명한, 저명한, 중요한",
        "english": "prominent",
        "pronunciation": "[ˈprɑːmɪnənt]",
        "hangul_pronunciation": "[프라미넌트]",
        "sample_sentence": "She is a prominent figure in the field of medicine.",
        "korean_sentence": "그녀는 의학 분야에서 저명한 인물입니다."
    },
    {
        "korean": "산업의, 공업의",
        "english": "industrial",
        "pronunciation": "[ɪnˈdʌstriəl]",
        "hangul_pronunciation": "[인더스트리얼]",
        "sample_sentence": "The city has a large industrial area.",
        "korean_sentence": "그 도시는 큰 산업 지역을 가지고 있습니다."
    },
    {
        "korean": "보수 공사",
        "english": "renovation",
        "pronunciation": "[ˌrɛnəˈveɪʃən]",
        "hangul_pronunciation": "[레노베이션]",
        "sample_sentence": "The building is closed for renovation.",
        "korean_sentence": "건물은 보수 공사로 인해 폐쇄되었습니다."
    },
    {
        "korean": "유효한, 타당한",
        "english": "valid",
        "pronunciation": "[ˈvælɪd]",
        "hangul_pronunciation": "[밸리드]",
        "sample_sentence": "You need a valid ID to enter.",
        "korean_sentence": "입장하려면 유효한 신분증이 필요합니다."
    },
    {
        "korean": "등록",
        "english": "registration",
        "pronunciation": "[ˌrɛdʒɪˈstreɪʃən]",
        "hangul_pronunciation": "[레지스트레이션]",
        "sample_sentence": "Registration for the course starts next week.",
        "korean_sentence": "강좌 등록은 다음 주에 시작됩니다."
    },
    {
        "korean": "은유, 비유",
        "english": "metaphor",
        "pronunciation": "[ˈmɛtəˌfɔr]",
        "hangul_pronunciation": "[메터포어]",
        "sample_sentence": "The author uses a lot of metaphors in his writing.",
        "korean_sentence": "저자는 글에서 많은 은유를 사용합니다."
    },
    {
        "korean": "게을리하다, 소홀히 다루다, 무시하다, 태만, 무시",
        "english": "neglect",
        "pronunciation": "[nɪˈɡlɛkt]",
        "hangul_pronunciation": "[니글렉트]",
        "sample_sentence": "He tends to neglect his homework.",
        "korean_sentence": "그는 숙제를 소홀히 하는 경향이 있어요."
    },
    {
        "korean": "성향, 소인, 기질",
        "english": "predisposition",
        "pronunciation": "[ˌpriːdɪspəˈzɪʃən]",
        "hangul_pronunciation": "[프리디스포지션]",
        "sample_sentence": "She has a predisposition to catch colds easily.",
        "korean_sentence": "그녀는 감기에 잘 걸리는 성향이 있어요."
    },
    {
        "korean": "복잡한",
        "english": "intricate",
        "pronunciation": "[ˈɪntrɪkɪt]",
        "hangul_pronunciation": "[인트리킷]",
        "sample_sentence": "The puzzle is quite intricate.",
        "korean_sentence": "그 퍼즐은 꽤 복잡해요."
    },
    {
        "korean": "결정하다, 결심하게 하다",
        "english": "determine",
        "pronunciation": "[dɪˈtɜːrmɪn]",
        "hangul_pronunciation": "[디터민]",
        "sample_sentence": "They will determine the winner tomorrow.",
        "korean_sentence": "그들은 내일 승자를 결정할 것입니다."
    },
    {
        "korean": "이용하다, 착취하다, 개발하다",
        "english": "exploit",
        "pronunciation": "[ɪkˈsplɔɪt]",
        "hangul_pronunciation": "[익스플로이트]",
        "sample_sentence": "We should exploit renewable energy sources.",
        "korean_sentence": "우리는 재생 가능 에너지를 개발해야 합니다."
    },
    {
        "korean": "왜곡하다",
        "english": "distort",
        "pronunciation": "[dɪˈstɔrt]",
        "hangul_pronunciation": "[디스토트]",
        "sample_sentence": "The media can distort the truth.",
        "korean_sentence": "언론은 진실을 왜곡할 수 있습니다."
    },
    {
        "korean": "우연(의 일치)",
        "english": "coincidence",
        "pronunciation": "[koʊˈɪnsɪdəns]",
        "hangul_pronunciation": "[코인시던스]",
        "sample_sentence": "It was a coincidence that we met at the airport.",
        "korean_sentence": "공항에서 만난 것은 우연의 일치였습니다."
    },
    {
        "korean": "(비친) 상, 성찰, 반사, 반영",
        "english": "reflection",
        "pronunciation": "[rɪˈflɛkʃən]",
        "hangul_pronunciation": "[리플렉션]",
        "sample_sentence": "She stared at her reflection in the mirror.",
        "korean_sentence": "그녀는 거울에 비친 자신의 모습을 바라보았습니다."
    },
    {
        "korean": "부분, 일부, 비율",
        "english": "portion",
        "pronunciation": "[ˈpɔrʃən]",
        "hangul_pronunciation": "[포션]",
        "sample_sentence": "He only ate a small portion of his meal.",
        "korean_sentence": "그는 식사의 일부만 먹었습니다."
    },
    {
        "korean": "묘사",
        "english": "portrayal",
        "pronunciation": "[pɔrˈtreɪəl]",
        "hangul_pronunciation": "[포트레이얼]",
        "sample_sentence": "The portrayal of the character was very realistic.",
        "korean_sentence": "그 캐릭터의 묘사는 매우 현실적이었어요."
    },
    {
        "korean": "지속(성)",
        "english": "persistence",
        "pronunciation": "[pərˈsɪstəns]",
        "hangul_pronunciation": "[퍼시스턴스]",
        "sample_sentence": "His persistence finally paid off.",
        "korean_sentence": "그의 지속성이 결국 결실을 맺었습니다."
    },
    {
        "korean": "수직의, 세로의",
        "english": "vertical",
        "pronunciation": "[ˈvɜrtɪkəl]",
        "hangul_pronunciation": "[버티컬]",
        "sample_sentence": "The building has a vertical structure.",
        "korean_sentence": "그 건물은 수직 구조를 가지고 있습니다."
    },
    {
        "korean": "현상 (pl. phenomena)",
        "english": "phenomenon",
        "pronunciation": "[fəˈnɑːmɪnən]",
        "hangul_pronunciation": "[퍼나미넌]",
        "sample_sentence": "Global warming is a phenomenon affecting the whole world.",
        "korean_sentence": "지구 온난화는 전 세계에 영향을 미치는 현상입니다."
    },
    {
        "korean": "대두하다, 드러나다, 출현하다",
        "english": "emerge",
        "pronunciation": "[ɪˈmɜrdʒ]",
        "hangul_pronunciation": "[이머지]",
        "sample_sentence": "New leaders will emerge from the election.",
        "korean_sentence": "새로운 지도자들이 선거에서 대두할 것입니다."
    },
    {
        "korean": "가정, 추정",
        "english": "assumption",
        "pronunciation": "[əˈsʌmpʃən]",
        "hangul_pronunciation": "[어섬션]",
        "sample_sentence": "His assumption was proven to be correct.",
        "korean_sentence": "그의 가정은 올바른 것으로 입증되었습니다."
    },
    {
        "korean": "구성하다, 만들다, 건축하다",
        "english": "construct",
        "pronunciation": "[kənˈstrʌkt]",
        "hangul_pronunciation": "[컨스트럭트]",
        "sample_sentence": "They plan to construct a new bridge.",
        "korean_sentence": "그들은 새 다리를 건설할 계획입니다."
    },
    {
        "korean": "분석",
        "english": "analysis",
        "pronunciation": "[əˈnælɪsɪs]",
        "hangul_pronunciation": "[어낼러시스]",
        "sample_sentence": "The analysis of the data took several hours.",
        "korean_sentence": "데이터 분석은 몇 시간 걸렸습니다."
    },
    {
        "korean": "해석하다, 통역하다, 이해하다",
        "english": "interpret",
        "pronunciation": "[ɪnˈtɜrprɪt]",
        "hangul_pronunciation": "[인터프릿]",
        "sample_sentence": "Can you interpret this sentence for me?",
        "korean_sentence": "이 문장을 저에게 해석해 주실 수 있나요?"
    },
    {
        "korean": "파악하다, 발견하다, 확인하다, 식별하다",
        "english": "identify",
        "pronunciation": "[aɪˈdɛntɪˌfaɪ]",
        "hangul_pronunciation": "[아이덴티파이]",
        "sample_sentence": "She can identify all the plants in the garden.",
        "korean_sentence": "그녀는 정원의 모든 식물을 식별할 수 있습니다."
    },
    {
        "korean": "불가피한, 필연적인",
        "english": "inevitable",
        "pronunciation": "[ɪˈnɛvɪtəbəl]",
        "hangul_pronunciation": "[이네비터블]",
        "sample_sentence": "Death is an inevitable part of life.",
        "korean_sentence": "죽음은 삶의 불가피한 부분입니다."
    },
    {
        "korean": "짐작하다, 추측하다",
        "english": "speculate",
        "pronunciation": "[ˈspɛkjəˌleɪt]",
        "hangul_pronunciation": "[스페큘레이트]",
        "sample_sentence": "It's fun to speculate about what might happen.",
        "korean_sentence": "무슨 일이 일어날지 짐작하는 것은 재미있어요."
    },
    {
        "korean": "자율성",
        "english": "autonomy",
        "pronunciation": "[ɔːˈtɒnəmi]",
        "hangul_pronunciation": "[오토노미]",
        "sample_sentence": "The university has a high degree of autonomy.",
        "korean_sentence": "그 대학은 높은 자율성을 가지고 있습니다."
    },
    {
        "korean": "분야, 학문, 규율, 단련[훈련]시키다",
        "english": "discipline",
        "pronunciation": "[ˈdɪsəplɪn]",
        "hangul_pronunciation": "[디서플린]",
        "sample_sentence": "He studied several scientific disciplines.",
        "korean_sentence": "그는 여러 과학 분야를 공부했습니다."
    },
    {
        "korean": "배정하다, 부여하다, 할당하다",
        "english": "assign",
        "pronunciation": "[əˈsaɪn]",
        "hangul_pronunciation": "[어사인]",
        "sample_sentence": "The teacher will assign homework to the students.",
        "korean_sentence": "선생님이 학생들에게 숙제를 배정할 것입니다."
    },
    {
        "korean": "차이, 변화, 변형",
        "english": "variation",
        "pronunciation": "[ˌvɛriˈeɪʃən]",
        "hangul_pronunciation": "[베리에이션]",
        "sample_sentence": "There is a variation in temperature throughout the day.",
        "korean_sentence": "하루 동안 온도에 변화가 있습니다."
    },
    {
        "korean": "타고난",
        "english": "innate",
        "pronunciation": "[ɪˈneɪt]",
        "hangul_pronunciation": "[이네이트]",
        "sample_sentence": "He has an innate ability to learn languages.",
        "korean_sentence": "그는 언어를 배우는 타고난 능력을 가지고 있습니다."
    },
    {
        "korean": "선천적인, 타고난",
        "english": "inborn",
        "pronunciation": "[ˈɪnˌbɔrn]",
        "hangul_pronunciation": "[인본]",
        "sample_sentence": "Her musical talent is inborn.",
        "korean_sentence": "그녀의 음악적 재능은 선천적입니다."
    },
    {
        "korean": "먹을 수 있는, 식용의",
        "english": "edible",
        "pronunciation": "[ˈɛdɪbəl]",
        "hangul_pronunciation": "[에더블]",
        "sample_sentence": "These berries are edible.",
        "korean_sentence": "이 열매들은 먹을 수 있습니다."
    },
    {
        "korean": "전달하다, 배출하다, 배달하다",
        "english": "deliver",
        "pronunciation": "[dɪˈlɪvər]",
        "hangul_pronunciation": "[딜리버]",
        "sample_sentence": "The mailman delivers letters every morning.",
        "korean_sentence": "우체부는 매일 아침 편지를 배달합니다."
    },
    {
        "korean": "가상의, 사실상의",
        "english": "virtual",
        "pronunciation": "[ˈvɜrˌtʃuəl]",
        "hangul_pronunciation": "[버추얼]",
        "sample_sentence": "The meeting was held in a virtual environment.",
        "korean_sentence": "회의는 가상 환경에서 열렸습니다."
    },
    {
        "korean": "담다, 실현하다, 구현하다",
        "english": "embody",
        "pronunciation": "[ɪmˈbɑdi]",
        "hangul_pronunciation": "[임바디]",
        "sample_sentence": "The artist's work embodies the spirit of the era.",
        "korean_sentence": "그 예술가의 작품은 시대의 정신을 구현하고 있습니다."
    },
    {
        "korean": "자율권, 권한 부여",
        "english": "empowerment",
        "pronunciation": "[ɪmˈpaʊərmənt]",
        "hangul_pronunciation": "[임파워먼트]",
        "sample_sentence": "The program focuses on the empowerment of women.",
        "korean_sentence": "그 프로그램은 여성의 자율권을 중점으로 합니다."
    },
    {
        "korean": "열망하는, 열성적인, 열심인",
        "english": "keen",
        "pronunciation": "[kin]",
        "hangul_pronunciation": "[킨]",
        "sample_sentence": "She is keen on learning new languages.",
        "korean_sentence": "그녀는 새로운 언어를 배우는 데 열성적입니다."
    },
    {
        "korean": "관대한, 후한",
        "english": "generous",
        "pronunciation": "[ˈdʒɛnərəs]",
        "hangul_pronunciation": "[제너러스]",
        "sample_sentence": "He is known for his generous donations.",
        "korean_sentence": "그는 후한 기부로 유명합니다."
    },
    {
        "korean": "목적이 있는, 목적을 가진",
        "english": "purposeful",
        "pronunciation": "[ˈpɜrpəsfəl]",
        "hangul_pronunciation": "[퍼퍼스풀]",
        "sample_sentence": "She has a purposeful approach to her studies.",
        "korean_sentence": "그녀는 학업에 목적이 있는 접근 방식을 가지고 있습니다."
    },
    {
        "korean": "성향, 기질",
        "english": "disposition",
        "pronunciation": "[ˌdɪspəˈzɪʃən]",
        "hangul_pronunciation": "[디스포지션]",
        "sample_sentence": "He has a cheerful disposition.",
        "korean_sentence": "그는 명랑한 성격을 가지고 있습니다."
    },
    {
        "korean": "(구성) 요소, 성분, 부품",
        "english": "component",
        "pronunciation": "[kəmˈpoʊnənt]",
        "hangul_pronunciation": "[컴포넌트]",
        "sample_sentence": "The engine is a critical component of the car.",
        "korean_sentence": "엔진은 자동차의 중요한 부품입니다."
    },
    {
        "korean": "명백한, 뚜렷한",
        "english": "obvious",
        "pronunciation": "[ˈɑbvɪəs]",
        "hangul_pronunciation": "[오비어스]",
        "sample_sentence": "It is obvious that he is not interested.",
        "korean_sentence": "그가 관심이 없다는 것은 명백합니다."
    },
    {
        "korean": "확신시키다, 안심시키다, 장담하다",
        "english": "assure",
        "pronunciation": "[əˈʃʊr]",
        "hangul_pronunciation": "[어슈어]",
        "sample_sentence": "I assure you that everything will be fine.",
        "korean_sentence": "모든 것이 잘 될 것이라고 장담합니다."
    },
    {
        "korean": "적절한, 알맞은",
        "english": "appropriate",
        "pronunciation": "[əˈproʊpriət]",
        "hangul_pronunciation": "[어프로프리엇]",
        "sample_sentence": "This dress is appropriate for the occasion.",
        "korean_sentence": "이 드레스는 그 행사에 적절합니다."
    },
    {
        "korean": "짐작하다, 추측하다",
        "english": "speculate",
        "pronunciation": "[ˈspɛkjəˌleɪt]",
        "hangul_pronunciation": "[스페큘레이트]",
        "sample_sentence": "It's fun to speculate about what might happen.",
        "korean_sentence": "무슨 일이 일어날지 짐작하는 것은 재미있어요."
    },
    {
        "korean": "자율성",
        "english": "autonomy",
        "pronunciation": "[ɔːˈtɒnəmi]",
        "hangul_pronunciation": "[오토노미]",
        "sample_sentence": "The university has a high degree of autonomy.",
        "korean_sentence": "그 대학은 높은 자율성을 가지고 있습니다."
    },
    {
        "korean": "분야, 학문, 규율, 단련[훈련]시키다",
        "english": "discipline",
        "pronunciation": "[ˈdɪsəplɪn]",
        "hangul_pronunciation": "[디서플린]",
        "sample_sentence": "He studied several scientific disciplines.",
        "korean_sentence": "그는 여러 과학 분야를 공부했습니다."
    },
    {
        "korean": "배정하다, 부여하다, 할당하다",
        "english": "assign",
        "pronunciation": "[əˈsaɪn]",
        "hangul_pronunciation": "[어사인]",
        "sample_sentence": "The teacher will assign homework to the students.",
        "korean_sentence": "선생님이 학생들에게 숙제를 배정할 것입니다."
    },
    {
        "korean": "차이, 변화, 변형",
        "english": "variation",
        "pronunciation": "[ˌvɛriˈeɪʃən]",
        "hangul_pronunciation": "[베리에이션]",
        "sample_sentence": "There is a variation in temperature throughout the day.",
        "korean_sentence": "하루 동안 온도에 변화가 있습니다."
    },
    {
        "korean": "타고난",
        "english": "innate",
        "pronunciation": "[ɪˈneɪt]",
        "hangul_pronunciation": "[이네이트]",
        "sample_sentence": "He has an innate ability to learn languages.",
        "korean_sentence": "그는 언어를 배우는 타고난 능력을 가지고 있습니다."
    },
    {
        "korean": "선천적인, 타고난",
        "english": "inborn",
        "pronunciation": "[ˈɪnˌbɔrn]",
        "hangul_pronunciation": "[인본]",
        "sample_sentence": "Her musical talent is inborn.",
        "korean_sentence": "그녀의 음악적 재능은 선천적입니다."
    },
    {
        "korean": "먹을 수 있는, 식용의",
        "english": "edible",
        "pronunciation": "[ˈɛdɪbəl]",
        "hangul_pronunciation": "[에더블]",
        "sample_sentence": "These berries are edible.",
        "korean_sentence": "이 열매들은 먹을 수 있습니다."
    },
    {
        "korean": "전달하다, 배출하다, 배달하다",
        "english": "deliver",
        "pronunciation": "[dɪˈlɪvər]",
        "hangul_pronunciation": "[딜리버]",
        "sample_sentence": "The mailman delivers letters every morning.",
        "korean_sentence": "우체부는 매일 아침 편지를 배달합니다."
    },
    {
        "korean": "가상의, 사실상의",
        "english": "virtual",
        "pronunciation": "[ˈvɜrˌtʃuəl]",
        "hangul_pronunciation": "[버추얼]",
        "sample_sentence": "The meeting was held in a virtual environment.",
        "korean_sentence": "회의는 가상 환경에서 열렸습니다."
    },
    {
        "korean": "담다, 실현하다, 구현하다",
        "english": "embody",
        "pronunciation": "[ɪmˈbɑdi]",
        "hangul_pronunciation": "[임바디]",
        "sample_sentence": "The artist's work embodies the spirit of the era.",
        "korean_sentence": "그 예술가의 작품은 시대의 정신을 구현하고 있습니다."
    },
    {
        "korean": "자율권, 권한 부여",
        "english": "empowerment",
        "pronunciation": "[ɪmˈpaʊərmənt]",
        "hangul_pronunciation": "[임파워먼트]",
        "sample_sentence": "The program focuses on the empowerment of women.",
        "korean_sentence": "그 프로그램은 여성의 자율권을 중점으로 합니다."
    },
    {
        "korean": "열망하는, 열성적인, 열심인",
        "english": "keen",
        "pronunciation": "[kin]",
        "hangul_pronunciation": "[킨]",
        "sample_sentence": "She is keen on learning new languages.",
        "korean_sentence": "그녀는 새로운 언어를 배우는 데 열성적입니다."
    },
    {
        "korean": "관대한, 후한",
        "english": "generous",
        "pronunciation": "[ˈdʒɛnərəs]",
        "hangul_pronunciation": "[제너러스]",
        "sample_sentence": "He is known for his generous donations.",
        "korean_sentence": "그는 후한 기부로 유명합니다."
    },
    {
        "korean": "목적이 있는, 목적을 가진",
        "english": "purposeful",
        "pronunciation": "[ˈpɜrpəsfəl]",
        "hangul_pronunciation": "[퍼퍼스풀]",
        "sample_sentence": "She has a purposeful approach to her studies.",
        "korean_sentence": "그녀는 학업에 목적이 있는 접근 방식을 가지고 있습니다."
    },
    {
        "korean": "성향, 기질",
        "english": "disposition",
        "pronunciation": "[ˌdɪspəˈzɪʃən]",
        "hangul_pronunciation": "[디스포지션]",
        "sample_sentence": "He has a cheerful disposition.",
        "korean_sentence": "그는 명랑한 성격을 가지고 있습니다."
    },
    {
        "korean": "(구성) 요소, 성분, 부품",
        "english": "component",
        "pronunciation": "[kəmˈpoʊnənt]",
        "hangul_pronunciation": "[컴포넌트]",
        "sample_sentence": "The engine is a critical component of the car.",
        "korean_sentence": "엔진은 자동차의 중요한 부품입니다."
    },
    {
        "korean": "명백한, 뚜렷한",
        "english": "obvious",
        "pronunciation": "[ˈɑbvɪəs]",
        "hangul_pronunciation": "[오비어스]",
        "sample_sentence": "It is obvious that he is not interested.",
        "korean_sentence": "그가 관심이 없다는 것은 명백합니다."
    },
    {
        "korean": "확신시키다, 안심시키다, 장담하다",
        "english": "assure",
        "pronunciation": "[əˈʃʊr]",
        "hangul_pronunciation": "[어슈어]",
        "sample_sentence": "I assure you that everything will be fine.",
        "korean_sentence": "모든 것이 잘 될 것이라고 장담합니다."
    },
    {
        "korean": "적절한, 알맞은",
        "english": "appropriate",
        "pronunciation": "[əˈproʊpriət]",
        "hangul_pronunciation": "[어프로프리엇]",
        "sample_sentence": "This dress is appropriate for the occasion.",
        "korean_sentence": "이 드레스는 그 행사에 적절합니다."
    },
    {
        "korean": "크게 하다, 확대하다",
        "english": "magnify",
        "pronunciation": "[ˈmæɡnɪˌfaɪ]",
        "hangul_pronunciation": "[매그니파이]",
        "sample_sentence": "A microscope can magnify tiny objects.",
        "korean_sentence": "현미경은 작은 물체를 확대할 수 있습니다."
    },
    {
        "korean": "(다른 문화에) 동화시키다, 동화되다",
        "english": "acculturate",
        "pronunciation": "[əˈkʌltʃəˌreɪt]",
        "hangul_pronunciation": "[어컬쳐레이트]",
        "sample_sentence": "Immigrants often acculturate to the new society.",
        "korean_sentence": "이민자들은 종종 새로운 사회에 동화됩니다."
    },
    {
        "korean": "올바른, 적절한",
        "english": "proper",
        "pronunciation": "[ˈprɑpər]",
        "hangul_pronunciation": "[프라퍼]",
        "sample_sentence": "You need the proper tools for the job.",
        "korean_sentence": "그 일을 위해서는 적절한 도구가 필요합니다."
    },
    {
        "korean": "예방 조치, 주의 사항",
        "english": "precaution",
        "pronunciation": "[prɪˈkɔʃən]",
        "hangul_pronunciation": "[프리코션]",
        "sample_sentence": "Safety precautions are essential in the lab.",
        "korean_sentence": "실험실에서는 안전 예방 조치가 필수적입니다."
    },
    {
        "korean": "적절한, 마땅한, 때문인, 예정인, 마감인",
        "english": "due",
        "pronunciation": "[du]",
        "hangul_pronunciation": "[듀]",
        "sample_sentence": "The project is due next week.",
        "korean_sentence": "프로젝트는 다음 주가 마감입니다."
    },
    {
        "korean": "주저하는, 꺼리는, 마지못한",
        "english": "reluctant",
        "pronunciation": "[rɪˈlʌktənt]",
        "hangul_pronunciation": "[릴럭턴트]",
        "sample_sentence": "She was reluctant to leave.",
        "korean_sentence": "그녀는 떠나기를 주저했습니다."
    },
    {
        "korean": "치열한, 사나운, 맹렬한",
        "english": "fierce",
        "pronunciation": "[fɪrs]",
        "hangul_pronunciation": "[피어스]",
        "sample_sentence": "The competition was fierce.",
        "korean_sentence": "경쟁은 치열했습니다."
    },
    {
        "korean": "충실한",
        "english": "faithful",
        "pronunciation": "[ˈfeɪθfəl]",
        "hangul_pronunciation": "[페이스풀]",
        "sample_sentence": "He is a faithful friend.",
        "korean_sentence": "그는 충실한 친구입니다."
    },
    {
        "korean": "놀라운",
        "english": "marvelous",
        "pronunciation": "[ˈmɑrvələs]",
        "hangul_pronunciation": "[마블러스]",
        "sample_sentence": "The view from the top is marvelous.",
        "korean_sentence": "꼭대기에서 보는 경치는 놀랍습니다."
    },
    {
        "korean": "저항 운동, 저항, 반항, 저항력",
        "english": "resistance",
        "pronunciation": "[rɪˈzɪstəns]",
        "hangul_pronunciation": "[리지스턴스]",
        "sample_sentence": "There was strong resistance to the new policy.",
        "korean_sentence": "새 정책에 대한 강한 저항이 있었습니다."
    },
    {
        "korean": "연민, 동정심",
        "english": "sympathy",
        "pronunciation": "[ˈsɪmpəθi]",
        "hangul_pronunciation": "[심퍼시]",
        "sample_sentence": "She felt great sympathy for the homeless.",
        "korean_sentence": "그녀는 노숙자들에 대한 큰 연민을 느꼈습니다."
    },
    {
        "korean": "양자[양녀]로 삼다, 채택하다",
        "english": "adopt",
        "pronunciation": "[əˈdɑpt]",
        "hangul_pronunciation": "[어답트]",
        "sample_sentence": "They decided to adopt a child.",
        "korean_sentence": "그들은 아이를 입양하기로 결정했습니다."
    },
    {
        "korean": "절망적인, 필사적인",
        "english": "desperate",
        "pronunciation": "[ˈdɛspərɪt]",
        "hangul_pronunciation": "[데스퍼릿]",
        "sample_sentence": "He made a desperate attempt to save her.",
        "korean_sentence": "그는 그녀를 구하기 위해 필사적인 시도를 했습니다."
    },
    {
        "korean": "내재적인, 내재된",
        "english": "intrinsic",
        "pronunciation": "[ɪnˈtrɪnsɪk]",
        "hangul_pronunciation": "[인트린식]",
        "sample_sentence": "Art is an intrinsic part of human culture.",
        "korean_sentence": "예술은 인간 문화의 내재적 부분입니다."
    },
    {
        "korean": "초등학교의, 주요한",
        "english": "primary",
        "pronunciation": "[ˈpraɪˌmɛri]",
        "hangul_pronunciation": "[프라이메리]",
        "sample_sentence": "Primary education is crucial for children.",
        "korean_sentence": "초등 교육은 어린이에게 매우 중요합니다."
    },
    {
        "korean": "어마어마한, 엄청난",
        "english": "enormous",
        "pronunciation": "[ɪˈnɔrməs]",
        "hangul_pronunciation": "[이너머스]",
        "sample_sentence": "The task requires an enormous amount of effort.",
        "korean_sentence": "그 일은 엄청난 양의 노력을 필요로 합니다."
    },
    {
        "korean": "구하다, 얻다",
        "english": "obtain",
        "pronunciation": "[əbˈteɪn]",
        "hangul_pronunciation": "[업테인]",
        "sample_sentence": "You need to obtain permission before entering.",
        "korean_sentence": "들어가기 전에 허가를 받아야 합니다."
    },
    {
        "korean": "유전, 유전적 특징",
        "english": "heredity",
        "pronunciation": "[həˈrɛdəti]",
        "hangul_pronunciation": "[허레디티]",
        "sample_sentence": "Heredity plays a role in many diseases.",
        "korean_sentence": "유전은 많은 질병에 영향을 미칩니다."
    },
    {
        "korean": "진을 빼는, 고단한, 지치게 하는",
        "english": "exhausting",
        "pronunciation": "[ɪɡˈzɔstɪŋ]",
        "hangul_pronunciation": "[이그조스팅]",
        "sample_sentence": "The hike was exhausting.",
        "korean_sentence": "그 하이킹은 고단했습니다."
    },
    {
        "korean": "합의",
        "english": "consensus",
        "pronunciation": "[kənˈsɛnsəs]",
        "hangul_pronunciation": "[컨센서스]",
        "sample_sentence": "The team reached a consensus on the project.",
        "korean_sentence": "팀은 프로젝트에 대해 합의에 도달했습니다."
    },
    {
        "korean": "짐작하다, 추측하다",
        "english": "speculate",
        "pronunciation": "[ˈspɛkjəˌleɪt]",
        "hangul_pronunciation": "[스페큘레이트]",
        "sample_sentence": "It's fun to speculate about what might happen.",
        "korean_sentence": "무슨 일이 일어날지 짐작하는 것은 재미있어요."
    },
    {
        "korean": "자율성",
        "english": "autonomy",
        "pronunciation": "[ɔːˈtɒnəmi]",
        "hangul_pronunciation": "[오토노미]",
        "sample_sentence": "The university has a high degree of autonomy.",
        "korean_sentence": "그 대학은 높은 자율성을 가지고 있습니다."
    },
    {
        "korean": "분야, 학문, 규율, 단련[훈련]시키다",
        "english": "discipline",
        "pronunciation": "[ˈdɪsəplɪn]",
        "hangul_pronunciation": "[디서플린]",
        "sample_sentence": "He studied several scientific disciplines.",
        "korean_sentence": "그는 여러 과학 분야를 공부했습니다."
    },
    {
        "korean": "배정하다, 부여하다, 할당하다",
        "english": "assign",
        "pronunciation": "[əˈsaɪn]",
        "hangul_pronunciation": "[어사인]",
        "sample_sentence": "The teacher will assign homework to the students.",
        "korean_sentence": "선생님이 학생들에게 숙제를 배정할 것입니다."
    },
    {
        "korean": "차이, 변화, 변형",
        "english": "variation",
        "pronunciation": "[ˌvɛriˈeɪʃən]",
        "hangul_pronunciation": "[베리에이션]",
        "sample_sentence": "There is a variation in temperature throughout the day.",
        "korean_sentence": "하루 동안 온도에 변화가 있습니다."
    },
    {
        "korean": "타고난",
        "english": "innate",
        "pronunciation": "[ɪˈneɪt]",
        "hangul_pronunciation": "[이네이트]",
        "sample_sentence": "He has an innate ability to learn languages.",
        "korean_sentence": "그는 언어를 배우는 타고난 능력을 가지고 있습니다."
    },
    {
        "korean": "선천적인, 타고난",
        "english": "inborn",
        "pronunciation": "[ˈɪnˌbɔrn]",
        "hangul_pronunciation": "[인본]",
        "sample_sentence": "Her musical talent is inborn.",
        "korean_sentence": "그녀의 음악적 재능은 선천적입니다."
    },
    {
        "korean": "먹을 수 있는, 식용의",
        "english": "edible",
        "pronunciation": "[ˈɛdɪbəl]",
        "hangul_pronunciation": "[에더블]",
        "sample_sentence": "These berries are edible.",
        "korean_sentence": "이 열매들은 먹을 수 있습니다."
    },
    {
        "korean": "전달하다, 배출하다, 배달하다",
        "english": "deliver",
        "pronunciation": "[dɪˈlɪvər]",
        "hangul_pronunciation": "[딜리버]",
        "sample_sentence": "The mailman delivers letters every morning.",
        "korean_sentence": "우체부는 매일 아침 편지를 배달합니다."
    },
    {
        "korean": "가상의, 사실상의",
        "english": "virtual",
        "pronunciation": "[ˈvɜrˌtʃuəl]",
        "hangul_pronunciation": "[버추얼]",
        "sample_sentence": "The meeting was held in a virtual environment.",
        "korean_sentence": "회의는 가상 환경에서 열렸습니다."
    },
    {
        "korean": "담다, 실현하다, 구현하다",
        "english": "embody",
        "pronunciation": "[ɪmˈbɑdi]",
        "hangul_pronunciation": "[임바디]",
        "sample_sentence": "The artist's work embodies the spirit of the era.",
        "korean_sentence": "그 예술가의 작품은 시대의 정신을 구현하고 있습니다."
    },
    {
        "korean": "자율권, 권한 부여",
        "english": "empowerment",
        "pronunciation": "[ɪmˈpaʊərmənt]",
        "hangul_pronunciation": "[임파워먼트]",
        "sample_sentence": "The program focuses on the empowerment of women.",
        "korean_sentence": "그 프로그램은 여성의 자율권을 중점으로 합니다."
    },
    {
        "korean": "열망하는, 열성적인, 열심인",
        "english": "keen",
        "pronunciation": "[kin]",
        "hangul_pronunciation": "[킨]",
        "sample_sentence": "She is keen on learning new languages.",
        "korean_sentence": "그녀는 새로운 언어를 배우는 데 열성적입니다."
    },
    {
        "korean": "관대한, 후한",
        "english": "generous",
        "pronunciation": "[ˈdʒɛnərəs]",
        "hangul_pronunciation": "[제너러스]",
        "sample_sentence": "He is known for his generous donations.",
        "korean_sentence": "그는 후한 기부로 유명합니다."
    },
    {
        "korean": "목적이 있는, 목적을 가진",
        "english": "purposeful",
        "pronunciation": "[ˈpɜrpəsfəl]",
        "hangul_pronunciation": "[퍼퍼스풀]",
        "sample_sentence": "She has a purposeful approach to her studies.",
        "korean_sentence": "그녀는 학업에 목적이 있는 접근 방식을 가지고 있습니다."
    },
    {
        "korean": "성향, 기질",
        "english": "disposition",
        "pronunciation": "[ˌdɪspəˈzɪʃən]",
        "hangul_pronunciation": "[디스포지션]",
        "sample_sentence": "He has a cheerful disposition.",
        "korean_sentence": "그는 명랑한 성격을 가지고 있습니다."
    },
    {
        "korean": "(구성) 요소, 성분, 부품",
        "english": "component",
        "pronunciation": "[kəmˈpoʊnənt]",
        "hangul_pronunciation": "[컴포넌트]",
        "sample_sentence": "The engine is a critical component of the car.",
        "korean_sentence": "엔진은 자동차의 중요한 부품입니다."
    },
    {
        "korean": "명백한, 뚜렷한",
        "english": "obvious",
        "pronunciation": "[ˈɑbvɪəs]",
        "hangul_pronunciation": "[오비어스]",
        "sample_sentence": "It is obvious that he is not interested.",
        "korean_sentence": "그가 관심이 없다는 것은 명백합니다."
    },
    {
        "korean": "확신시키다, 안심시키다, 장담하다",
        "english": "assure",
        "pronunciation": "[əˈʃʊr]",
        "hangul_pronunciation": "[어슈어]",
        "sample_sentence": "I assure you that everything will be fine.",
        "korean_sentence": "모든 것이 잘 될 것이라고 장담합니다."
    },
    {
        "korean": "적절한, 알맞은",
        "english": "appropriate",
        "pronunciation": "[əˈproʊpriət]",
        "hangul_pronunciation": "[어프로프리엇]",
        "sample_sentence": "This dress is appropriate for the occasion.",
        "korean_sentence": "이 드레스는 그 행사에 적절합니다."
    },
    {
        "korean": "크게 하다, 확대하다",
        "english": "magnify",
        "pronunciation": "[ˈmæɡnɪˌfaɪ]",
        "hangul_pronunciation": "[매그니파이]",
        "sample_sentence": "A microscope can magnify tiny objects.",
        "korean_sentence": "현미경은 작은 물체를 확대할 수 있습니다."
    },
    {
        "korean": "(다른 문화에) 동화시키다, 동화되다",
        "english": "acculturate",
        "pronunciation": "[əˈkʌltʃəˌreɪt]",
        "hangul_pronunciation": "[어컬쳐레이트]",
        "sample_sentence": "Immigrants often acculturate to the new society.",
        "korean_sentence": "이민자들은 종종 새로운 사회에 동화됩니다."
    },
    {
        "korean": "올바른, 적절한",
        "english": "proper",
        "pronunciation": "[ˈprɑpər]",
        "hangul_pronunciation": "[프라퍼]",
        "sample_sentence": "You need the proper tools for the job.",
        "korean_sentence": "그 일을 위해서는 적절한 도구가 필요합니다."
    },
    {
        "korean": "예방 조치, 주의 사항",
        "english": "precaution",
        "pronunciation": "[prɪˈkɔʃən]",
        "hangul_pronunciation": "[프리코션]",
        "sample_sentence": "Safety precautions are essential in the lab.",
        "korean_sentence": "실험실에서는 안전 예방 조치가 필수적입니다."
    },
    {
        "korean": "적절한, 마땅한, 때문인, 예정인, 마감인",
        "english": "due",
        "pronunciation": "[du]",
        "hangul_pronunciation": "[듀]",
        "sample_sentence": "The project is due next week.",
        "korean_sentence": "프로젝트는 다음 주가 마감입니다."
    },
    {
        "korean": "주저하는, 꺼리는, 마지못한",
        "english": "reluctant",
        "pronunciation": "[rɪˈlʌktənt]",
        "hangul_pronunciation": "[릴럭턴트]",
        "sample_sentence": "She was reluctant to leave.",
        "korean_sentence": "그녀는 떠나기를 주저했습니다."
    },
    {
        "korean": "치열한, 사나운, 맹렬한",
        "english": "fierce",
        "pronunciation": "[fɪrs]",
        "hangul_pronunciation": "[피어스]",
        "sample_sentence": "The competition was fierce.",
        "korean_sentence": "경쟁은 치열했습니다."
    },
    {
        "korean": "충실한",
        "english": "faithful",
        "pronunciation": "[ˈfeɪθfəl]",
        "hangul_pronunciation": "[페이스풀]",
        "sample_sentence": "He is a faithful friend.",
        "korean_sentence": "그는 충실한 친구입니다."
    },
    {
        "korean": "놀라운",
        "english": "marvelous",
        "pronunciation": "[ˈmɑrvələs]",
        "hangul_pronunciation": "[마블러스]",
        "sample_sentence": "The view from the top is marvelous.",
        "korean_sentence": "꼭대기에서 보는 경치는 놀랍습니다."
    },
    {
        "korean": "저항 운동, 저항, 반항, 저항력",
        "english": "resistance",
        "pronunciation": "[rɪˈzɪstəns]",
        "hangul_pronunciation": "[리지스턴스]",
        "sample_sentence": "There was strong resistance to the new policy.",
        "korean_sentence": "새 정책에 대한 강한 저항이 있었습니다."
    },
    {
        "korean": "연민, 동정심",
        "english": "sympathy",
        "pronunciation": "[ˈsɪmpəθi]",
        "hangul_pronunciation": "[심퍼시]",
        "sample_sentence": "She felt great sympathy for the homeless.",
        "korean_sentence": "그녀는 노숙자들에 대한 큰 연민을 느꼈습니다."
    },
    {
        "korean": "양자[양녀]로 삼다, 채택하다",
        "english": "adopt",
        "pronunciation": "[əˈdɑpt]",
        "hangul_pronunciation": "[어답트]",
        "sample_sentence": "They decided to adopt a child.",
        "korean_sentence": "그들은 아이를 입양하기로 결정했습니다."
    },
    {
        "korean": "절망적인, 필사적인",
        "english": "desperate",
        "pronunciation": "[ˈdɛspərɪt]",
        "hangul_pronunciation": "[데스퍼릿]",
        "sample_sentence": "He made a desperate attempt to save her.",
        "korean_sentence": "그는 그녀를 구하기 위해 필사적인 시도를 했습니다."
    },
    {
        "korean": "내재적인, 내재된",
        "english": "intrinsic",
        "pronunciation": "[ɪnˈtrɪnsɪk]",
        "hangul_pronunciation": "[인트린식]",
        "sample_sentence": "Art is an intrinsic part of human culture.",
        "korean_sentence": "예술은 인간 문화의 내재적 부분입니다."
    },
    {
        "korean": "초등학교의, 주요한",
        "english": "primary",
        "pronunciation": "[ˈpraɪˌmɛri]",
        "hangul_pronunciation": "[프라이메리]",
        "sample_sentence": "Primary education is crucial for children.",
        "korean_sentence": "초등 교육은 어린이에게 매우 중요합니다."
    },
    {
        "korean": "어마어마한, 엄청난",
        "english": "enormous",
        "pronunciation": "[ɪˈnɔrməs]",
        "hangul_pronunciation": "[이너머스]",
        "sample_sentence": "The task requires an enormous amount of effort.",
        "korean_sentence": "그 일은 엄청난 양의 노력을 필요로 합니다."
    },
    {
        "korean": "구하다, 얻다",
        "english": "obtain",
        "pronunciation": "[əbˈteɪn]",
        "hangul_pronunciation": "[업테인]",
        "sample_sentence": "You need to obtain permission before entering.",
        "korean_sentence": "들어가기 전에 허가를 받아야 합니다."
    },
    {
        "korean": "유전, 유전적 특징",
        "english": "heredity",
        "pronunciation": "[həˈrɛdəti]",
        "hangul_pronunciation": "[허레디티]",
        "sample_sentence": "Heredity plays a role in many diseases.",
        "korean_sentence": "유전은 많은 질병에 영향을 미칩니다."
    },
    {
        "korean": "진을 빼는, 고단한, 지치게 하는",
        "english": "exhausting",
        "pronunciation": "[ɪɡˈzɔstɪŋ]",
        "hangul_pronunciation": "[이그조스팅]",
        "sample_sentence": "The hike was exhausting.",
        "korean_sentence": "그 하이킹은 고단했습니다."
    },
    {
        "korean": "합의",
        "english": "consensus",
        "pronunciation": "[kənˈsɛnsəs]",
        "hangul_pronunciation": "[컨센서스]",
        "sample_sentence": "The team reached a consensus on the project.",
        "korean_sentence": "팀은 프로젝트에 대해 합의에 도달했습니다."
    },
    {
        "korean": "상당한",
        "english": "considerable",
        "pronunciation": "[kənˈsɪdərəbəl]",
        "hangul_pronunciation": "[컨시더러블]",
        "sample_sentence": "She has considerable influence in the company.",
        "korean_sentence": "그녀는 회사 내에서 상당한 영향력을 가지고 있습니다."
    },
    {
        "korean": "설명, 기록, 기술, 묘사",
        "english": "description",
        "pronunciation": "[dɪˈskrɪpʃən]",
        "hangul_pronunciation": "[디스크립션]",
        "sample_sentence": "The description of the event was detailed.",
        "korean_sentence": "그 사건에 대한 설명은 자세했습니다."
    },
    {
        "korean": "지형, 지리(학)",
        "english": "geography",
        "pronunciation": "[dʒiˈɑɡrəfi]",
        "hangul_pronunciation": "[지아그러피]",
        "sample_sentence": "Geography helps us understand the world.",
        "korean_sentence": "지리는 우리가 세상을 이해하는 데 도움을 줍니다."
    },
    {
        "korean": "지역, 영역, 영토",
        "english": "territory",
        "pronunciation": "[ˈtɛrɪˌtɔri]",
        "hangul_pronunciation": "[테리토리]",
        "sample_sentence": "The cat marked its territory.",
        "korean_sentence": "고양이는 자신의 영역을 표시했습니다."
    },
    {
        "korean": "연장, 확장, 구내전화",
        "english": "extension",
        "pronunciation": "[ɪkˈstɛnʃən]",
        "hangul_pronunciation": "[익스텐션]",
        "sample_sentence": "The deadline was given an extension.",
        "korean_sentence": "마감일이 연장되었습니다."
    },
    {
        "korean": "비옥한, 새끼를 가질 수 있는",
        "english": "fertile",
        "pronunciation": "[ˈfɜrˌtaɪl]",
        "hangul_pronunciation": "[퍼틸]",
        "sample_sentence": "The soil in this region is very fertile.",
        "korean_sentence": "이 지역의 토양은 매우 비옥합니다."
    },
    {
        "korean": "창출하다, 만들어 내다, 발생시키다",
        "english": "generate",
        "pronunciation": "[ˈdʒɛnəˌreɪt]",
        "hangul_pronunciation": "[제너레이트]",
        "sample_sentence": "Solar panels generate electricity.",
        "korean_sentence": "태양광 패널은 전기를 발생시킵니다."
    },
    {
        "korean": "깨달음, 실현",
        "english": "realization",
        "pronunciation": "[ˌriəˌlaɪˈzeɪʃən]",
        "hangul_pronunciation": "[리얼라이제이션]",
        "sample_sentence": "The realization of her dream took years.",
        "korean_sentence": "그녀의 꿈을 실현하는 데는 몇 년이 걸렸습니다."
    },
    {
        "korean": "구조, 구성",
        "english": "structure",
        "pronunciation": "[ˈstrʌktʃər]",
        "hangul_pronunciation": "[스트럭쳐]",
        "sample_sentence": "The structure of the building is unique.",
        "korean_sentence": "그 건물의 구조는 독특합니다."
    },
    {
        "korean": "응답자, 반응하는, 응하는",
        "english": "respondent",
        "pronunciation": "[rɪˈspɑndənt]",
        "hangul_pronunciation": "[리스폰던트]",
        "sample_sentence": "Most respondents agreed with the survey.",
        "korean_sentence": "대부분의 응답자들이 설문에 동의했습니다."
    },
    {
        "korean": "경관, 풍경(화), 조경을 하다",
        "english": "landscape",
        "pronunciation": "[ˈlændˌskeɪp]",
        "hangul_pronunciation": "[랜드스케이프]",
        "sample_sentence": "The landscape painting was beautiful.",
        "korean_sentence": "그 풍경화는 아름다웠습니다."
    },
    {
        "korean": "근본적인, 기저에 깔린",
        "english": "underlying",
        "pronunciation": "[ˌʌndərˈlaɪɪŋ]",
        "hangul_pronunciation": "[언더라잉]",
        "sample_sentence": "The underlying cause of the problem was identified.",
        "korean_sentence": "문제의 근본 원인이 확인되었습니다."
    },
    {
        "korean": "초점, 강조",
        "english": "emphasis",
        "pronunciation": "[ˈɛmfəsɪs]",
        "hangul_pronunciation": "[엠퍼시스]",
        "sample_sentence": "The emphasis was on quality, not quantity.",
        "korean_sentence": "초점은 양이 아니라 질에 있었습니다."
    },
    {
        "korean": "반대하다, 대비[대조]시키다, 맞서다",
        "english": "oppose",
        "pronunciation": "[əˈpoʊz]",
        "hangul_pronunciation": "[어포즈]",
        "sample_sentence": "They oppose the new policy.",
        "korean_sentence": "그들은 새 정책에 반대합니다."
    },
    {
        "korean": "채취하다, 수확하다",
        "english": "harvest",
        "pronunciation": "[ˈhɑrvəst]",
        "hangul_pronunciation": "[하베스트]",
        "sample_sentence": "Farmers harvest crops in the fall.",
        "korean_sentence": "농부들은 가을에 작물을 수확합니다."
    },
    {
        "korean": "의식하는, 의식적인",
        "english": "conscious",
        "pronunciation": "[ˈkɑnʃəs]",
        "hangul_pronunciation": "[컨셔스]",
        "sample_sentence": "She is very conscious of her appearance.",
        "korean_sentence": "그녀는 자신의 외모에 대해 매우 의식적입니다."
    },
    {
        "korean": "보존, 보호, 보호지구",
        "english": "conservation",
        "pronunciation": "[ˌkɑnsərˈveɪʃən]",
        "hangul_pronunciation": "[컨서베이션]",
        "sample_sentence": "Wildlife conservation is important.",
        "korean_sentence": "야생 동물 보호는 중요합니다."
    },
    {
        "korean": "포식자, 약탈자",
        "english": "predator",
        "pronunciation": "[ˈprɛdətər]",
        "hangul_pronunciation": "[프레더터]",
        "sample_sentence": "Lions are natural predators.",
        "korean_sentence": "사자는 천연 포식자입니다."
    },
    {
        "korean": "다양한",
        "english": "diverse",
        "pronunciation": "[daɪˈvɜrs]",
        "hangul_pronunciation": "[다이버스]",
        "sample_sentence": "The city has a diverse population.",
        "korean_sentence": "그 도시는 다양한 인구를 가지고 있습니다."
    },
    {
        "korean": "방향, 지도, 감독",
        "english": "direction",
        "pronunciation": "[dəˈrɛkʃən]",
        "hangul_pronunciation": "[디렉션]",
        "sample_sentence": "She gave me directions to her house.",
        "korean_sentence": "그녀는 나에게 집으로 가는 길을 알려주었습니다."
    },

    {
        "korean": "각성, 환기",
        "english": "arousal",
        "pronunciation": "[əˈraʊzl]",
        "hangul_pronunciation": "[어라우즐]",
        "sample_sentence": "The loud noise caused arousal among the crowd.",
        "korean_sentence": "큰 소음이 군중 사이에서 각성을 일으켰습니다."
    },
    {
        "korean": "용이하게 하다, 촉진하다",
        "english": "facilitate",
        "pronunciation": "[fəˈsɪlɪˌteɪt]",
        "hangul_pronunciation": "[퍼실리테이트]",
        "sample_sentence": "The new software will facilitate the project management.",
        "korean_sentence": "새 소프트웨어는 프로젝트 관리를 용이하게 할 것입니다."
    },
    {
        "korean": "농도, 집중",
        "english": "concentration",
        "pronunciation": "[ˌkɑnsənˈtreɪʃən]",
        "hangul_pronunciation": "[콘센트레이션]",
        "sample_sentence": "High concentration is needed to solve this problem.",
        "korean_sentence": "이 문제를 해결하려면 높은 집중이 필요합니다."
    },
    {
        "korean": "과정, 공정, 진행",
        "english": "process",
        "pronunciation": "[ˈprɑsɛs]",
        "hangul_pronunciation": "[프로세스]",
        "sample_sentence": "The process of making wine is quite complex.",
        "korean_sentence": "와인을 만드는 과정은 꽤 복잡합니다."
    },
    {
        "korean": "피할[무시할] 수 없는",
        "english": "inescapable",
        "pronunciation": "[ˌɪnɪˈskeɪpəbl]",
        "hangul_pronunciation": "[이네스케이퍼블]",
        "sample_sentence": "Death is an inescapable part of life.",
        "korean_sentence": "죽음은 삶의 피할 수 없는 부분입니다."
    },
    {
        "korean": "고통, 불편",
        "english": "discomfort",
        "pronunciation": "[dɪsˈkʌmfərt]",
        "hangul_pronunciation": "[디스컴퍼트]",
        "sample_sentence": "She felt discomfort after eating too much.",
        "korean_sentence": "그녀는 과식 후에 불편함을 느꼈습니다."
    },
    {
        "korean": "고통, 고민, 곤경",
        "english": "distress",
        "pronunciation": "[dɪˈstrɛs]",
        "hangul_pronunciation": "[디스트레스]",
        "sample_sentence": "The news caused her great distress.",
        "korean_sentence": "그 뉴스는 그녀에게 큰 고통을 주었습니다."
    },
    {
        "korean": "상상력이 풍부한",
        "english": "imaginative",
        "pronunciation": "[ɪˈmædʒɪnətɪv]",
        "hangul_pronunciation": "[이매지너티브]",
        "sample_sentence": "She has a very imaginative mind.",
        "korean_sentence": "그녀는 매우 상상력이 풍부한 마음을 가지고 있습니다."
    },
    {
        "korean": "우선 (사항), 우선권",
        "english": "priority",
        "pronunciation": "[praɪˈɔrɪti]",
        "hangul_pronunciation": "[프라이오리티]",
        "sample_sentence": "Safety is our top priority.",
        "korean_sentence": "안전이 우리의 최우선 사항입니다."
    },
    {
        "korean": "적성, 소질",
        "english": "aptitude",
        "pronunciation": "[ˈæptɪˌtud]",
        "hangul_pronunciation": "[앱티튜드]",
        "sample_sentence": "He has a natural aptitude for music.",
        "korean_sentence": "그는 음악에 대한 타고난 적성을 가지고 있습니다."
    },
    {
        "korean": "함의, 함축, 영향",
        "english": "implication",
        "pronunciation": "[ˌɪmplɪˈkeɪʃən]",
        "hangul_pronunciation": "[임플리케이션]",
        "sample_sentence": "The implication of his statement was clear.",
        "korean_sentence": "그의 발언의 함의는 명확했습니다."
    },
    {
        "korean": "뛰어넘다, 넘어서다, 초과하다",
        "english": "exceed",
        "pronunciation": "[ɪkˈsid]",
        "hangul_pronunciation": "[익시드]",
        "sample_sentence": "The final cost should not exceed $500.",
        "korean_sentence": "최종 비용은 500달러를 넘지 않아야 합니다."
    },
    {
        "korean": "정체성, 일치, 동일성",
        "english": "identity",
        "pronunciation": "[aɪˈdɛntɪti]",
        "hangul_pronunciation": "[아이덴티티]",
        "sample_sentence": "He struggled with his identity.",
        "korean_sentence": "그는 자신의 정체성에 대해 고민했습니다."
    },
    {
        "korean": "혼란, 혼동",
        "english": "confusion",
        "pronunciation": "[kənˈfjuʒən]",
        "hangul_pronunciation": "[컨퓨전]",
        "sample_sentence": "The changes caused a lot of confusion.",
        "korean_sentence": "변경 사항들이 많은 혼란을 초래했습니다."
    },
    {
        "korean": "신중한, 의도적인",
        "english": "deliberate",
        "pronunciation": "[dɪˈlɪbərɪt]",
        "hangul_pronunciation": "[딜리버릿]",
        "sample_sentence": "It was a deliberate attempt to deceive.",
        "korean_sentence": "그것은 속이기 위한 의도적인 시도였습니다."
    },
    {
        "korean": "해당하다, 편지를 주고받다, 일치하다",
        "english": "correspond",
        "pronunciation": "[ˌkɔrəˈspɑnd]",
        "hangul_pronunciation": "[코러스판드]",
        "sample_sentence": "The results correspond to our expectations.",
        "korean_sentence": "결과는 우리의 기대에 부합합니다."
    },
    {
        "korean": "모순된, 상반된",
        "english": "contradictory",
        "pronunciation": "[ˌkɑntrəˈdɪktəri]",
        "hangul_pronunciation": "[컨트러딕터리]",
        "sample_sentence": "The reports were contradictory.",
        "korean_sentence": "보고서들이 서로 모순되었습니다."
    },
    {
        "korean": "암묵적인, 암시적인",
        "english": "implicit",
        "pronunciation": "[ɪmˈplɪsɪt]",
        "hangul_pronunciation": "[임플리싯]",
        "sample_sentence": "There was an implicit agreement between them.",
        "korean_sentence": "그들 사이에는 암묵적인 합의가 있었습니다."
    },
    {
        "korean": "인상, 느낌, 기분",
        "english": "impression",
        "pronunciation": "[ɪmˈprɛʃən]",
        "hangul_pronunciation": "[임프레션]",
        "sample_sentence": "She made a good impression on her boss.",
        "korean_sentence": "그녀는 상사에게 좋은 인상을 주었습니다."
    },
    {
        "korean": "편견, 편향",
        "english": "bias",
        "pronunciation": "[ˈbaɪəs]",
        "hangul_pronunciation": "[바이어스]",
        "sample_sentence": "There is a bias against women in the workplace.",
        "korean_sentence": "직장 내에는 여성에 대한 편견이 있습니다."
    },
    {
        "korean": "전환",
        "english": "transition",
        "pronunciation": "[trænˈzɪʃən]",
        "hangul_pronunciation": "[트랜지션]",
        "sample_sentence": "The company is in a period of transition.",
        "korean_sentence": "회사는 전환기의 한가운데 있습니다."
    },
    {
        "korean": "존재, 생존",
        "english": "existence",
        "pronunciation": "[ɪɡˈzɪstəns]",
        "hangul_pronunciation": "[이그지스턴스]",
        "sample_sentence": "The existence of life on other planets is still unproven.",
        "korean_sentence": "다른 행성에서의 생명 존재는 아직 입증되지 않았습니다."
    },
    {
        "korean": "수행하다, 행하다, 공연하다, 연주하다",
        "english": "perform",
        "pronunciation": "[pərˈfɔrm]",
        "hangul_pronunciation": "[퍼폼]",
        "sample_sentence": "The band will perform live on stage tonight.",
        "korean_sentence": "그 밴드는 오늘 밤 무대에서 라이브 공연을 할 것입니다."
    },
    {
        "korean": "버리다, 처분하다",
        "english": "discard",
        "pronunciation": "[dɪˈskɑrd]",
        "hangul_pronunciation": "[디스카드]",
        "sample_sentence": "Please discard your trash properly.",
        "korean_sentence": "쓰레기를 제대로 버려주세요."
    },
    {
        "korean": "태도",
        "english": "attitude",
        "pronunciation": "[ˈætɪˌtud]",
        "hangul_pronunciation": "[애티튜드]",
        "sample_sentence": "His positive attitude helped him succeed.",
        "korean_sentence": "그의 긍정적인 태도가 성공을 도왔습니다."
    },
    {
        "korean": "기대(치), 예상",
        "english": "expectation",
        "pronunciation": "[ˌɛkspɛkˈteɪʃən]",
        "hangul_pronunciation": "[엑스펙테이션]",
        "sample_sentence": "The project exceeded all our expectations.",
        "korean_sentence": "그 프로젝트는 우리의 모든 기대를 초과했습니다."
    },
    {
        "korean": "놀라운, 두드러진, 인상적인",
        "english": "striking",
        "pronunciation": "[ˈstraɪkɪŋ]",
        "hangul_pronunciation": "[스트라이킹]",
        "sample_sentence": "She wore a striking red dress.",
        "korean_sentence": "그녀는 놀라운 빨간 드레스를 입었습니다."
    },
    {
        "korean": "장려하다, 증진하다, 홍보하다, 승진시키다",
        "english": "promote",
        "pronunciation": "[prəˈmoʊt]",
        "hangul_pronunciation": "[프로모트]",
        "sample_sentence": "The company aims to promote healthy living.",
        "korean_sentence": "회사는 건강한 생활을 장려하는 것을 목표로 합니다."
    },
    {
        "korean": "영리한, 미묘한, 감지하기 힘든",
        "english": "subtle",
        "pronunciation": "[ˈsʌtl]",
        "hangul_pronunciation": "[서틀]",
        "sample_sentence": "The artist's work is known for its subtle details.",
        "korean_sentence": "그 예술가의 작품은 미묘한 디테일로 유명합니다."
    },
    {
        "korean": "와해하다, 방해하다",
        "english": "disrupt",
        "pronunciation": "[dɪsˈrʌpt]",
        "hangul_pronunciation": "[디스럽트]",
        "sample_sentence": "The protest disrupted traffic for several hours.",
        "korean_sentence": "시위는 몇 시간 동안 교통을 방해했습니다."
    },
    {
        "korean": "장애, 이상, 난동, 무질서",
        "english": "disorder",
        "pronunciation": "[dɪsˈɔrdər]",
        "hangul_pronunciation": "[디스오더]",
        "sample_sentence": "He was diagnosed with a mental disorder.",
        "korean_sentence": "그는 정신 장애로 진단받았습니다."
    },
    {
        "korean": "개선, 향상",
        "english": "improvement",
        "pronunciation": "[ɪmˈpruvmənt]",
        "hangul_pronunciation": "[임프루브먼트]",
        "sample_sentence": "There has been a significant improvement in his health.",
        "korean_sentence": "그의 건강 상태가 상당히 개선되었습니다."
    },
    {
        "korean": "생산성",
        "english": "productivity",
        "pronunciation": "[ˌproʊdʌkˈtɪvɪti]",
        "hangul_pronunciation": "[프로덕티비티]",
        "sample_sentence": "The new policy aims to increase productivity.",
        "korean_sentence": "새 정책은 생산성을 높이는 것을 목표로 합니다."
    },
    {
        "korean": "상품화하다",
        "english": "commodify",
        "pronunciation": "[kəˈmɑdəˌfaɪ]",
        "hangul_pronunciation": "[커모디파이]",
        "sample_sentence": "There is a concern that education is being commodified.",
        "korean_sentence": "교육이 상품화되고 있다는 우려가 있습니다."
    },
    {
        "korean": "군집, 지역 사회, 공동체",
        "english": "community",
        "pronunciation": "[kəˈmjunɪti]",
        "hangul_pronunciation": "[커뮤니티]",
        "sample_sentence": "The community came together to celebrate the event.",
        "korean_sentence": "지역 사회는 그 행사를 축하하기 위해 모였습니다."
    },
    {
        "korean": "단순화하다, 간단하게 하다",
        "english": "simplify",
        "pronunciation": "[ˈsɪmplɪˌfaɪ]",
        "hangul_pronunciation": "[심플리파이]",
        "sample_sentence": "We need to simplify the process to make it more efficient.",
        "korean_sentence": "우리는 프로세스를 더 효율적으로 만들기 위해 단순화할 필요가 있습니다."
    },
    {
        "korean": "우아함, 고상함, 정밀함, 정확함",
        "english": "elegance",
        "pronunciation": "[ˈɛlɪɡəns]",
        "hangul_pronunciation": "[엘리건스]",
        "sample_sentence": "Her dress was the epitome of elegance.",
        "korean_sentence": "그녀의 드레스는 우아함의 전형이었습니다."
    },
    {
        "korean": "집단[단체]의, 축적된",
        "english": "collective",
        "pronunciation": "[kəˈlɛktɪv]",
        "hangul_pronunciation": "[컬렉티브]",
        "sample_sentence": "They made a collective decision to support the cause.",
        "korean_sentence": "그들은 그 대의를 지지하기로 집단적인 결정을 내렸습니다."
    },
    {
        "korean": "설득력 있는, 강제적인",
        "english": "compelling",
        "pronunciation": "[kəmˈpɛlɪŋ]",
        "hangul_pronunciation": "[컴펠링]",
        "sample_sentence": "The lawyer presented a compelling argument.",
        "korean_sentence": "변호사는 설득력 있는 주장을 펼쳤습니다."
    },
    {
        "korean": "인공[인조]의, 가짜[거짓]의",
        "english": "artificial",
        "pronunciation": "[ˌɑrtəˈfɪʃəl]",
        "hangul_pronunciation": "[아티피셜]",
        "sample_sentence": "The flowers were made of artificial materials.",
        "korean_sentence": "그 꽃들은 인공 재료로 만들어졌습니다."
    },
    {
        "korean": "결정, 결심",
        "english": "decision",
        "pronunciation": "[dɪˈsɪʒən]",
        "hangul_pronunciation": "[디시전]",
        "sample_sentence": "He made a decision to study abroad.",
        "korean_sentence": "그는 유학을 결심했습니다."
    },
    {
        "korean": "버리다, 포기하다",
        "english": "abandon",
        "pronunciation": "[əˈbændən]",
        "hangul_pronunciation": "[어밴던]",
        "sample_sentence": "They had to abandon their car in the snow.",
        "korean_sentence": "그들은 눈 속에서 차를 버려야 했습니다."
    },
    {
        "korean": "궁핍, 박탈, 부족",
        "english": "deprivation",
        "pronunciation": "[ˌdɛprɪˈveɪʃən]",
        "hangul_pronunciation": "[데프리베이션]",
        "sample_sentence": "Sleep deprivation can lead to serious health issues.",
        "korean_sentence": "수면 부족은 심각한 건강 문제를 초래할 수 있습니다."
    },
    {
        "korean": "예측하다, 예견하다",
        "english": "predict",
        "pronunciation": "[prɪˈdɪkt]",
        "hangul_pronunciation": "[프리딕트]",
        "sample_sentence": "It's hard to predict the weather accurately.",
        "korean_sentence": "날씨를 정확하게 예측하는 것은 어렵습니다."
    },
    {
        "korean": "막다, 예방하다",
        "english": "prevent",
        "pronunciation": "[prɪˈvɛnt]",
        "hangul_pronunciation": "[프리벤트]",
        "sample_sentence": "Regular exercise can help prevent heart disease.",
        "korean_sentence": "규칙적인 운동은 심장병을 예방하는 데 도움이 됩니다."
    },
    {
        "korean": "특성, 특징",
        "english": "trait",
        "pronunciation": "[treɪt]",
        "hangul_pronunciation": "[트레이트]",
        "sample_sentence": "Honesty is a valuable trait in a friend.",
        "korean_sentence": "정직은 친구에게 있어서 소중한 특성입니다."
    },
    {
        "korean": "중요한, 중대한, 결정적인",
        "english": "crucial",
        "pronunciation": "[ˈkruʃəl]",
        "hangul_pronunciation": "[크루셜]",
        "sample_sentence": "It's crucial to follow the safety guidelines.",
        "korean_sentence": "안전 지침을 따르는 것이 중요합니다."
    },
    {
        "korean": "본능, 직감",
        "english": "instinct",
        "pronunciation": "[ˈɪnstɪŋkt]",
        "hangul_pronunciation": "[인스팅트]",
        "sample_sentence": "Birds have an instinct to migrate in winter.",
        "korean_sentence": "새들은 겨울에 이동하는 본능을 가지고 있습니다."
    },
    {
        "korean": "피상[표면]적인, 깊이 없는",
        "english": "superficial",
        "pronunciation": "[ˌsupərˈfɪʃəl]",
        "hangul_pronunciation": "[수퍼피셜]",
        "sample_sentence": "Their understanding of the topic was superficial.",
        "korean_sentence": "그들의 주제에 대한 이해는 피상적이었습니다."
    },
    {
        "korean": "확립하다, 형성하다, 설립하다",
        "english": "establish",
        "pronunciation": "[ɪˈstæblɪʃ]",
        "hangul_pronunciation": "[이스태블리쉬]",
        "sample_sentence": "The company was established in 1990.",
        "korean_sentence": "그 회사는 1990년에 설립되었습니다."
    },
    {
        "korean": "운명",
        "english": "destiny",
        "pronunciation": "[ˈdɛstɪni]",
        "hangul_pronunciation": "[데스티니]",
        "sample_sentence": "She believed it was her destiny to become a writer.",
        "korean_sentence": "그녀는 작가가 되는 것이 자신의 운명이라고 믿었습니다."
    },
    {
        "korean": "요소, 요인",
        "english": "factor",
        "pronunciation": "[ˈfæktər]",
        "hangul_pronunciation": "[팩터]",
        "sample_sentence": "Many factors contributed to his success.",
        "korean_sentence": "많은 요소들이 그의 성공에 기여했습니다."
    },
    {
        "korean": "원인, 인과 관계",
        "english": "causation",
        "pronunciation": "[kɔˈzeɪʃən]",
        "hangul_pronunciation": "[코제이션]",
        "sample_sentence": "The study examines the causation of disease.",
        "korean_sentence": "그 연구는 질병의 원인 관계를 조사합니다."
    },
    {
        "korean": "추론, 추리",
        "english": "reasoning",
        "pronunciation": "[ˈrizənɪŋ]",
        "hangul_pronunciation": "[리즈닝]",
        "sample_sentence": "Her reasoning was clear and logical.",
        "korean_sentence": "그녀의 추론은 명확하고 논리적이었습니다."
    },
    {
        "korean": "일관된, 조리 있게 말하는",
        "english": "coherent",
        "pronunciation": "[koʊˈhɪrənt]",
        "hangul_pronunciation": "[코히런트]",
        "sample_sentence": "He gave a coherent explanation of the problem.",
        "korean_sentence": "그는 문제에 대한 일관된 설명을 했습니다."
    },
    {
        "korean": "정확한",
        "english": "precise",
        "pronunciation": "[prɪˈsaɪs]",
        "hangul_pronunciation": "[프리사이스]",
        "sample_sentence": "We need precise measurements for the project.",
        "korean_sentence": "우리는 프로젝트를 위해 정확한 측정이 필요합니다."
    },
    {
        "korean": "정확(도)",
        "english": "accuracy",
        "pronunciation": "[ˈækjərəsi]",
        "hangul_pronunciation": "[애큐러시]",
        "sample_sentence": "Accuracy is crucial in scientific experiments.",
        "korean_sentence": "정확도는 과학 실험에서 중요합니다."
    },
    {
        "korean": "굶주림, 기아",
        "english": "starvation",
        "pronunciation": "[stɑrˈveɪʃən]",
        "hangul_pronunciation": "[스타베이션]",
        "sample_sentence": "Many people died of starvation during the famine.",
        "korean_sentence": "기근 동안 많은 사람들이 굶주림으로 죽었습니다."
    },
    {
        "korean": "눈부신, 멋진, 장관인",
        "english": "spectacular",
        "pronunciation": "[spɛkˈtækjələr]",
        "hangul_pronunciation": "[스펙타큘러]",
        "sample_sentence": "The view from the top of the mountain was spectacular.",
        "korean_sentence": "산 정상에서의 전망은 장관이었습니다."
    },
    {
        "korean": "탐구, 연구, 조사, 질문",
        "english": "inquiry",
        "pronunciation": "[ˈɪnkwəri]",
        "hangul_pronunciation": "[인콰이어리]",
        "sample_sentence": "The inquiry into the incident is still ongoing.",
        "korean_sentence": "사건에 대한 조사는 아직 진행 중입니다."
    },
    {
        "korean": "구속, 규제",
        "english": "restraint",
        "pronunciation": "[rɪˈstreɪnt]",
        "hangul_pronunciation": "[리스트레인트]",
        "sample_sentence": "He showed great restraint in dealing with the situation.",
        "korean_sentence": "그는 상황을 처리하는 데 있어 큰 자제를 보였습니다."
    },
    {
        "korean": "불이익, 불리, 단점",
        "english": "disadvantage",
        "pronunciation": "[ˌdɪsədˈvæntɪdʒ]",
        "hangul_pronunciation": "[디스어드밴티지]",
        "sample_sentence": "Living in a remote area has its disadvantages.",
        "korean_sentence": "외딴 지역에 사는 것은 단점이 있습니다."
    },
    {
        "korean": "신뢰할 수 있는, 믿을 수 있는",
        "english": "credible",
        "pronunciation": "[ˈkrɛdəbəl]",
        "hangul_pronunciation": "[크레더블]",
        "sample_sentence": "The witness provided credible evidence.",
        "korean_sentence": "목격자는 신뢰할 수 있는 증거를 제공했습니다."
    },
    {
        "korean": "지름, 배율",
        "english": "diameter",
        "pronunciation": "[daɪˈæmɪtər]",
        "hangul_pronunciation": "[다이애미터]",
        "sample_sentence": "The diameter of the circle is 10 cm.",
        "korean_sentence": "원의 지름은 10cm입니다."
    },
    {
        "korean": "예약, 약속",
        "english": "appointment",
        "pronunciation": "[əˈpɔɪntmənt]",
        "hangul_pronunciation": "[어포인트먼트]",
        "sample_sentence": "I have a doctor's appointment tomorrow.",
        "korean_sentence": "내일 병원 예약이 있습니다."
    },
    {
        "korean": "차별, 판별, 분간",
        "english": "discrimination",
        "pronunciation": "[dɪˌskrɪməˈneɪʃən]",
        "hangul_pronunciation": "[디스크리미네이션]",
        "sample_sentence": "Discrimination in the workplace is illegal.",
        "korean_sentence": "직장에서의 차별은 불법입니다."
    },
    {
        "korean": "대체, 교체, 대리인, 교체 선수",
        "english": "substitution",
        "pronunciation": "[ˌsʌbstɪˈtuːʃən]",
        "hangul_pronunciation": "[섭스티튜션]",
        "sample_sentence": "The coach made a substitution in the second half.",
        "korean_sentence": "감독은 후반전에 교체를 했습니다."
    },
    {
        "korean": "장비, 용품",
        "english": "equipment",
        "pronunciation": "[ɪˈkwɪpmənt]",
        "hangul_pronunciation": "[이퀴프먼트]",
        "sample_sentence": "We need to buy new office equipment.",
        "korean_sentence": "우리는 새로운 사무용 장비를 구입해야 합니다."
    },
    {
        "korean": "잠시의, 잠깐의, 찰나의",
        "english": "momentary",
        "pronunciation": "[ˈmoʊmənˌtɛri]",
        "hangul_pronunciation": "[모먼테리]",
        "sample_sentence": "There was a momentary pause before she answered.",
        "korean_sentence": "그녀가 대답하기 전에 잠시 멈춤이 있었습니다."
    },
    {
        "korean": "교차하다, 서로 만나다",
        "english": "intersect",
        "pronunciation": "[ˌɪntərˈsɛkt]",
        "hangul_pronunciation": "[인터섹트]",
        "sample_sentence": "The two roads intersect at the traffic light.",
        "korean_sentence": "두 도로는 신호등에서 교차합니다."
    },
    {
        "korean": "차원, 관점, 영역, 규모",
        "english": "dimension",
        "pronunciation": "[dɪˈmɛnʃən]",
        "hangul_pronunciation": "[다이멘션]",
        "sample_sentence": "We need to consider every dimension of the problem.",
        "korean_sentence": "우리는 문제의 모든 차원을 고려해야 합니다."
    },
    {
        "korean": "직업, 점유",
        "english": "occupation",
        "pronunciation": "[ˌɑkjəˈpeɪʃən]",
        "hangul_pronunciation": "[아큐페이션]",
        "sample_sentence": "He listed his occupation as a teacher.",
        "korean_sentence": "그는 자신의 직업을 교사로 기재했습니다."
    },
    {
        "korean": "경비, 지출, 비용",
        "english": "expenditure",
        "pronunciation": "[ɪkˈspɛndɪʧər]",
        "hangul_pronunciation": "[익스펜디처]",
        "sample_sentence": "Government expenditure on education has increased.",
        "korean_sentence": "교육에 대한 정부 지출이 증가했습니다."
    },
    {
        "korean": "정체된, 코가 막힌, 혼잡한",
        "english": "congested",
        "pronunciation": "[kənˈdʒɛstɪd]",
        "hangul_pronunciation": "[컨제스티드]",
        "sample_sentence": "The city's roads are heavily congested during rush hour.",
        "korean_sentence": "러시아워 동안 도시의 도로는 매우 혼잡합니다."
    },
    {
        "korean": "맞다, 포용하다, 포옹하다",
        "english": "embrace",
        "pronunciation": "[ɪmˈbreɪs]",
        "hangul_pronunciation": "[임브레이스]",
        "sample_sentence": "They were eager to embrace new technologies.",
        "korean_sentence": "그들은 새로운 기술을 기꺼이 받아들였습니다."
    },
    {
        "korean": "절차, 진행",
        "english": "procedure",
        "pronunciation": "[prəˈsiːdʒər]",
        "hangul_pronunciation": "[프로시저]",
        "sample_sentence": "You must follow the correct procedure.",
        "korean_sentence": "당신은 올바른 절차를 따라야 합니다."
    },
    {
        "korean": "지시, 설명",
        "english": "instruction",
        "pronunciation": "[ɪnˈstrʌkʃən]",
        "hangul_pronunciation": "[인스트럭션]",
        "sample_sentence": "Please read the instructions carefully.",
        "korean_sentence": "지시 사항을 주의 깊게 읽어주세요."
    },
    {
        "korean": "풍성한, 풍부한",
        "english": "plentiful",
        "pronunciation": "[ˈplɛntɪfəl]",
        "hangul_pronunciation": "[플렌티풀]",
        "sample_sentence": "The harvest was plentiful this year.",
        "korean_sentence": "올해의 수확은 풍성했습니다."
    },
    {
        "korean": "과도한, 지나친, 심한",
        "english": "excessive",
        "pronunciation": "[ɪkˈsɛsɪv]",
        "hangul_pronunciation": "[익세시브]",
        "sample_sentence": "The excessive noise made it hard to concentrate.",
        "korean_sentence": "과도한 소음 때문에 집중하기 어려웠습니다."
    },
    {
        "korean": "지지자, 제안자",
        "english": "proponent",
        "pronunciation": "[prəˈpoʊnənt]",
        "hangul_pronunciation": "[프로포넌트]",
        "sample_sentence": "She is a strong proponent of renewable energy.",
        "korean_sentence": "그녀는 재생 에너지의 강력한 지지자입니다."
    },
    {
        "korean": "과소평가하다",
        "english": "underestimate",
        "pronunciation": "[ˌʌndərˈɛstəˌmeɪt]",
        "hangul_pronunciation": "[언더레스터메이트]",
        "sample_sentence": "Don't underestimate his abilities.",
        "korean_sentence": "그의 능력을 과소평가하지 마세요."
    },
    {
        "korean": "도입, 소개",
        "english": "introduction",
        "pronunciation": "[ˌɪntrəˈdʌkʃən]",
        "hangul_pronunciation": "[인트러덕션]",
        "sample_sentence": "The introduction of new technology has changed the industry.",
        "korean_sentence": "신기술의 도입이 산업을 변화시켰습니다."
    },
    {
        "korean": "이동(성)",
        "english": "mobility",
        "pronunciation": "[moʊˈbɪləti]",
        "hangul_pronunciation": "[모빌리티]",
        "sample_sentence": "Mobility is important for career advancement.",
        "korean_sentence": "이동성은 경력 발전에 중요합니다."
    },
    {
        "korean": "이주, 이동, 이주자 무리",
        "english": "migration",
        "pronunciation": "[maɪˈɡreɪʃən]",
        "hangul_pronunciation": "[마이그레이션]",
        "sample_sentence": "Bird migration happens every winter.",
        "korean_sentence": "새들의 이주는 매 겨울마다 일어납니다."
    },
    {
        "korean": "원정, 탐험",
        "english": "expedition",
        "pronunciation": "[ˌɛkspəˈdɪʃən]",
        "hangul_pronunciation": "[엑스페디션]",
        "sample_sentence": "They went on an expedition to the Arctic.",
        "korean_sentence": "그들은 북극으로 탐험을 떠났습니다."
    },
    {
        "korean": "고질적인, 만성적인",
        "english": "chronic",
        "pronunciation": "[ˈkrɒnɪk]",
        "hangul_pronunciation": "[크로닉]",
        "sample_sentence": "He suffers from chronic back pain.",
        "korean_sentence": "그는 만성적인 허리 통증에 시달리고 있습니다."
    },
    {
        "korean": "문서",
        "english": "document",
        "pronunciation": "[ˈdɒkjʊmənt]",
        "hangul_pronunciation": "[도큐먼트]",
        "sample_sentence": "Please provide the necessary documents.",
        "korean_sentence": "필요한 문서를 제출해 주세요."
    },
    {
        "korean": "책무, 의무",
        "english": "obligation",
        "pronunciation": "[ˌɒblɪˈɡeɪʃən]",
        "hangul_pronunciation": "[옵리게이션]",
        "sample_sentence": "You have an obligation to complete the project.",
        "korean_sentence": "당신은 프로젝트를 완료할 의무가 있습니다."
    },
    {
        "korean": "적절성, 관련성",
        "english": "relevance",
        "pronunciation": "[ˈrɛlɪvəns]",
        "hangul_pronunciation": "[렐러번스]",
        "sample_sentence": "The relevance of this study to our work is clear.",
        "korean_sentence": "이 연구가 우리의 작업에 관련성이 있다는 것이 분명합니다."
    },
    {
        "korean": "서식지, 거주 환경",
        "english": "habitat",
        "pronunciation": "[ˈhæbɪtæt]",
        "hangul_pronunciation": "[해비탯]",
        "sample_sentence": "The forest is the natural habitat of many animals.",
        "korean_sentence": "숲은 많은 동물들의 자연 서식지입니다."
    },
    {
        "korean": "지질학(적 특징)",
        "english": "geology",
        "pronunciation": "[dʒiˈɒlədʒi]",
        "hangul_pronunciation": "[지올러지]",
        "sample_sentence": "He is studying the geology of the area.",
        "korean_sentence": "그는 그 지역의 지질학을 연구하고 있습니다."
    },
    {
        "korean": "자극하다, 유도하다 / 신속한, 기민한",
        "english": "prompt",
        "pronunciation": "[prɒmpt]",
        "hangul_pronunciation": "[프롬프트]",
        "sample_sentence": "His speech prompted a lot of questions.",
        "korean_sentence": "그의 연설은 많은 질문을 유도했습니다."
    },
    {
        "korean": "모집하다 / 신병, 신입 회원",
        "english": "recruit",
        "pronunciation": "[rɪˈkruːt]",
        "hangul_pronunciation": "[리크루트]",
        "sample_sentence": "The company is recruiting new employees.",
        "korean_sentence": "회사는 신입 직원을 모집하고 있습니다."
    },
    {
        "korean": "순종, 복종",
        "english": "obedience",
        "pronunciation": "[əˈbiːdiəns]",
        "hangul_pronunciation": "[오비디언스]",
        "sample_sentence": "The dog showed perfect obedience to its owner.",
        "korean_sentence": "그 개는 주인에게 완벽한 복종을 보였습니다."
    },
    {
        "korean": "고도",
        "english": "altitude",
        "pronunciation": "[ˈæltɪtjuːd]",
        "hangul_pronunciation": "[앨티튜드]",
        "sample_sentence": "The plane is flying at an altitude of 30,000 feet.",
        "korean_sentence": "비행기는 30,000피트의 고도로 비행하고 있습니다."
    },
    {
        "korean": "경계, 국경",
        "english": "border",
        "pronunciation": "[ˈbɔːdə]",
        "hangul_pronunciation": "[보더]",
        "sample_sentence": "They crossed the border into Canada.",
        "korean_sentence": "그들은 캐나다로 국경을 넘었습니다."
    },
    {
        "korean": "경탄하다 / 경이로움",
        "english": "marvel",
        "pronunciation": "[ˈmɑːvəl]",
        "hangul_pronunciation": "[마블]",
        "sample_sentence": "Tourists marvel at the ancient ruins.",
        "korean_sentence": "관광객들은 고대 유적에 경탄합니다."
    },
    {
        "korean": "성향, 의향, 기울기, 경사",
        "english": "inclination",
        "pronunciation": "[ˌɪnklɪˈneɪʃən]",
        "hangul_pronunciation": "[인클리네이션]",
        "sample_sentence": "She has an inclination to read before bed.",
        "korean_sentence": "그녀는 자기 전에 책을 읽는 성향이 있습니다."
    },
    {
        "korean": "증명하다, 보여 주다",
        "english": "demonstrate",
        "pronunciation": "[ˈdɛmənˌstreɪt]",
        "hangul_pronunciation": "[데먼스트레이트]",
        "sample_sentence": "He demonstrated how to use the new software.",
        "korean_sentence": "그는 새 소프트웨어 사용법을 보여주었습니다."
    },
    {
        "korean": "상품",
        "english": "commodity",
        "pronunciation": "[kəˈmɒdɪti]",
        "hangul_pronunciation": "[커모디티]",
        "sample_sentence": "Oil is a valuable commodity.",
        "korean_sentence": "석유는 귀중한 상품입니다."
    },
    {
        "korean": "밀도",
        "english": "density",
        "pronunciation": "[ˈdɛnsɪti]",
        "hangul_pronunciation": "[덴시티]",
        "sample_sentence": "The density of the material affects its strength.",
        "korean_sentence": "재료의 밀도는 그 강도에 영향을 미칩니다."
    },
    {
        "korean": "출현",
        "english": "emergence",
        "pronunciation": "[ɪˈmɜːdʒəns]",
        "hangul_pronunciation": "[이머전스]",
        "sample_sentence": "The emergence of new technologies has transformed industries.",
        "korean_sentence": "신기술의 출현이 산업을 변화시켰습니다."
    },
    {
        "korean": "권위, 권한",
        "english": "authority",
        "pronunciation": "[ɔːˈθɒrɪti]",
        "hangul_pronunciation": "[어쏘러티]",
        "sample_sentence": "The teacher has authority in the classroom.",
        "korean_sentence": "선생님은 교실에서 권위를 가지고 있습니다."
    },
    {
        "korean": "사라지다, 증발하다",
        "english": "evaporate",
        "pronunciation": "[ɪˈvæpəˌreɪt]",
        "hangul_pronunciation": "[이배퍼레이트]",
        "sample_sentence": "The water will evaporate if you leave it out in the sun.",
        "korean_sentence": "물을 햇볕에 내놓으면 증발할 것입니다."
    },
    {
        "korean": "다양해지다, 다양화하다",
        "english": "diversify",
        "pronunciation": "[daɪˈvɜːsɪfaɪ]",
        "hangul_pronunciation": "[다이버시파이]",
        "sample_sentence": "The company plans to diversify its products.",
        "korean_sentence": "회사는 제품을 다양화할 계획입니다."
    },
    {
        "korean": "서술하다, 묘사하다",
        "english": "depict",
        "pronunciation": "[dɪˈpɪkt]",
        "hangul_pronunciation": "[디픽트]",
        "sample_sentence": "The artist used bright colors to depict the landscape.",
        "korean_sentence": "화가는 밝은 색을 사용하여 풍경을 묘사했습니다."
    },
    {
        "korean": "영양(분) 공급, 영양(분)",
        "english": "nourishment",
        "pronunciation": "[ˈnʌrɪʃmənt]",
        "hangul_pronunciation": "[너리쉬먼트]",
        "sample_sentence": "Proper nourishment is essential for good health.",
        "korean_sentence": "적절한 영양 공급은 건강에 필수적입니다."
    },
    {
        "korean": "감염",
        "english": "infection",
        "pronunciation": "[ɪnˈfɛkʃən]",
        "hangul_pronunciation": "[인펙션]",
        "sample_sentence": "The doctor prescribed antibiotics for the infection.",
        "korean_sentence": "의사는 감염 치료를 위해 항생제를 처방했습니다."
    },
    {
        "korean": "충성(심), 충실",
        "english": "loyalty",
        "pronunciation": "[ˈlɔɪəlti]",
        "hangul_pronunciation": "[로열티]",
        "sample_sentence": "Her loyalty to the company was commendable.",
        "korean_sentence": "회사를 향한 그녀의 충성심은 칭찬할 만했습니다."
    },
    {
        "korean": "주파수, 빈도",
        "english": "frequency",
        "pronunciation": "[ˈfriːkwənsi]",
        "hangul_pronunciation": "[프리퀀시]",
        "sample_sentence": "The frequency of the meetings has increased.",
        "korean_sentence": "회의의 빈도가 증가했습니다."
    },
    {
        "korean": "수의사",
        "english": "veterinarian",
        "pronunciation": "[ˌvɛtərɪˈnɛriən]",
        "hangul_pronunciation": "[베터리네리언]",
        "sample_sentence": "The veterinarian examined the sick dog.",
        "korean_sentence": "수의사는 아픈 개를 진찰했습니다."
    },
    {
        "korean": "전달하다, 주다",
        "english": "impart",
        "pronunciation": "[ɪmˈpɑrt]",
        "hangul_pronunciation": "[임파트]",
        "sample_sentence": "The teacher imparts knowledge to her students.",
        "korean_sentence": "선생님은 학생들에게 지식을 전달합니다."
    },
    {
        "korean": "구분, 차이",
        "english": "distinction",
        "pronunciation": "[dɪˈstɪŋkʃən]",
        "hangul_pronunciation": "[디스팅션]",
        "sample_sentence": "There is a clear distinction between the two theories.",
        "korean_sentence": "그 두 이론 사이에는 명확한 구분이 있습니다."
    },
    {
        "korean": "이루다, 구성하다",
        "english": "constitute",
        "pronunciation": "[ˈkɒnstɪˌtjuːt]",
        "hangul_pronunciation": "[콘스티튜트]",
        "sample_sentence": "Women constitute the majority of the workforce.",
        "korean_sentence": "여성들은 노동력의 대다수를 구성합니다."
    },
    {
        "korean": "통찰력",
        "english": "insight",
        "pronunciation": "[ˈɪnˌsaɪt]",
        "hangul_pronunciation": "[인사이트]",
        "sample_sentence": "Her insight into the problem was invaluable.",
        "korean_sentence": "그 문제에 대한 그녀의 통찰력은 매우 귀중했습니다."
    },
    {
        "korean": "충돌하다 / 충돌, 격돌, 불일치",
        "english": "clash",
        "pronunciation": "[klæʃ]",
        "hangul_pronunciation": "[클래쉬]",
        "sample_sentence": "The two sides clashed over the issue.",
        "korean_sentence": "양측은 그 문제로 충돌했습니다."
    },
    {
        "korean": "유산",
        "english": "legacy",
        "pronunciation": "[ˈlɛɡəsi]",
        "hangul_pronunciation": "[레거시]",
        "sample_sentence": "He left a lasting legacy to his children.",
        "korean_sentence": "그는 자녀들에게 오래도록 남을 유산을 남겼습니다."
    },
    {
        "korean": "독성이 있는, (유)독성의",
        "english": "toxic",
        "pronunciation": "[ˈtɒksɪk]",
        "hangul_pronunciation": "[톡식]",
        "sample_sentence": "The chemicals in the factory are highly toxic.",
        "korean_sentence": "공장의 화학 물질은 매우 독성이 있습니다."
    },
    {
        "korean": "결사, 연관, 협회",
        "english": "association",
        "pronunciation": "[əˌsoʊsiˈeɪʃən]",
        "hangul_pronunciation": "[어쏘시에이션]",
        "sample_sentence": "She has a close association with the organization.",
        "korean_sentence": "그녀는 그 조직과 긴밀한 연관이 있습니다."
    },
    {
        "korean": "내재하는, 본래의",
        "english": "inherent",
        "pronunciation": "[ɪnˈhɪərənt]",
        "hangul_pronunciation": "[인히어런트]",
        "sample_sentence": "There are inherent risks in the procedure.",
        "korean_sentence": "그 절차에는 내재하는 위험이 있습니다."
    },
    {
        "korean": "음모",
        "english": "conspiracy",
        "pronunciation": "[kənˈspɪrəsi]",
        "hangul_pronunciation": "[컨스피러시]",
        "sample_sentence": "They were accused of conspiracy to commit fraud.",
        "korean_sentence": "그들은 사기를 저지르려는 음모로 기소되었습니다."
    },
    {
        "korean": "(상호) 보완적인, 보색 관계의",
        "english": "complementary",
        "pronunciation": "[ˌkɒmplɪˈmɛntəri]",
        "hangul_pronunciation": "[콤플리멘터리]",
        "sample_sentence": "The complementary colors enhanced the design.",
        "korean_sentence": "보색 관계의 색상들이 디자인을 향상시켰습니다."
    },
    {
        "korean": "조정하다",
        "english": "coordinate",
        "pronunciation": "[kəʊˈɔːdɪneɪt]",
        "hangul_pronunciation": "[코오디네이트]",
        "sample_sentence": "We need to coordinate our efforts to succeed.",
        "korean_sentence": "우리는 성공하기 위해 우리의 노력을 조정할 필요가 있습니다."
    },
    {
        "korean": "촉발하다, (감정을) 일으키다",
        "english": "ignite",
        "pronunciation": "[ɪɡˈnaɪt]",
        "hangul_pronunciation": "[이그나이트]",
        "sample_sentence": "His words ignited a debate among the audience.",
        "korean_sentence": "그의 말은 청중 사이에 논쟁을 촉발했습니다."
    },
    {
        "korean": "끝내다, 종료하다",
        "english": "terminate",
        "pronunciation": "[ˈtɜːmɪneɪt]",
        "hangul_pronunciation": "[터미네이트]",
        "sample_sentence": "The contract was terminated early.",
        "korean_sentence": "계약이 조기에 종료되었습니다."
    },
    {
        "korean": "번식, 복제",
        "english": "reproduction",
        "pronunciation": "[ˌriːprəˈdʌkʃən]",
        "hangul_pronunciation": "[리프로덕션]",
        "sample_sentence": "The reproduction of cells is a fundamental biological process.",
        "korean_sentence": "세포의 번식은 기본적인 생물학적 과정입니다."
    },
    {
        "korean": "수입, 수익",
        "english": "revenue",
        "pronunciation": "[ˈrɛvəˌnjuː]",
        "hangul_pronunciation": "[레버뉴]",
        "sample_sentence": "The company's revenue increased by 20% last year.",
        "korean_sentence": "작년에 회사의 수익이 20% 증가했습니다."
    },
    {
        "korean": "불의, 불평등",
        "english": "injustice",
        "pronunciation": "[ɪnˈdʒʌstɪs]",
        "hangul_pronunciation": "[인저스티스]",
        "sample_sentence": "They protested against the injustice of the legal system.",
        "korean_sentence": "그들은 법률 시스템의 불의에 대해 항의했습니다."
    },
    {
        "korean": "관례적인, 전통적인",
        "english": "conventional",
        "pronunciation": "[kənˈvɛnʃənəl]",
        "hangul_pronunciation": "[컨벤셔널]",
        "sample_sentence": "He prefers conventional methods of teaching.",
        "korean_sentence": "그는 전통적인 교육 방식을 선호합니다."
    },
    {
        "korean": "특성, 부동산",
        "english": "property",
        "pronunciation": "[ˈprɒpəti]",
        "hangul_pronunciation": "[프라퍼티]",
        "sample_sentence": "The chemical properties of the substance are well known.",
        "korean_sentence": "그 물질의 화학적 특성은 잘 알려져 있습니다."
    },
    {
        "korean": "헌신, 전념, 약속",
        "english": "commitment",
        "pronunciation": "[kəˈmɪtmənt]",
        "hangul_pronunciation": "[커밋먼트]",
        "sample_sentence": "Her commitment to the project is admirable.",
        "korean_sentence": "프로젝트에 대한 그녀의 헌신은 존경할 만합니다."
    },
    {
        "korean": "문헌, 문학",
        "english": "literature",
        "pronunciation": "[ˈlɪtərɪʧər]",
        "hangul_pronunciation": "[리터러쳐]",
        "sample_sentence": "She studied English literature at university.",
        "korean_sentence": "그녀는 대학에서 영문학을 공부했습니다."
    },
    {
        "korean": "사소한, 하찮은",
        "english": "trivial",
        "pronunciation": "[ˈtrɪviəl]",
        "hangul_pronunciation": "[트리비얼]",
        "sample_sentence": "Don't waste your time on trivial matters.",
        "korean_sentence": "사소한 일에 시간을 낭비하지 마세요."
    },
    {
        "korean": "(어떤 상태가 되게) 만들다, 제시하다",
        "english": "render",
        "pronunciation": "[ˈrɛndər]",
        "hangul_pronunciation": "[렌더]",
        "sample_sentence": "The new software rendered the old system obsolete.",
        "korean_sentence": "새로운 소프트웨어는 구 시스템을 쓸모없게 만들었습니다."
    },
    {
        "korean": "구성하다",
        "english": "comprise",
        "pronunciation": "[kəmˈpraɪz]",
        "hangul_pronunciation": "[컴프라이즈]",
        "sample_sentence": "The committee comprises ten members.",
        "korean_sentence": "위원회는 열 명의 구성원으로 이루어져 있습니다."
    },
    {
        "korean": "가뭄",
        "english": "drought",
        "pronunciation": "[draʊt]",
        "hangul_pronunciation": "[드라우트]",
        "sample_sentence": "The region is suffering from a severe drought.",
        "korean_sentence": "그 지역은 심각한 가뭄으로 고통받고 있습니다."
    },
    {
        "korean": "묘사하다, 그리다",
        "english": "portray",
        "pronunciation": "[pɔːrˈtreɪ]",
        "hangul_pronunciation": "[포트레이]",
        "sample_sentence": "The artist portrays the beauty of nature in his paintings.",
        "korean_sentence": "그 예술가는 그의 그림에서 자연의 아름다움을 묘사합니다."
    },
    {
        "korean": "길들이다, 다스리다",
        "english": "tame",
        "pronunciation": "[teɪm]",
        "hangul_pronunciation": "[테임]",
        "sample_sentence": "It is not easy to tame wild animals.",
        "korean_sentence": "야생 동물을 길들이는 것은 쉽지 않습니다."
    },
    {
        "korean": "번영, 번성",
        "english": "prosperity",
        "pronunciation": "[prɒsˈpɛrɪti]",
        "hangul_pronunciation": "[프라스페리티]",
        "sample_sentence": "Economic prosperity is important for the country's development.",
        "korean_sentence": "경제적 번영은 국가 발전에 중요합니다."
    },
    {
        "korean": "방해하다",
        "english": "hinder",
        "pronunciation": "[ˈhɪndər]",
        "hangul_pronunciation": "[힌더]",
        "sample_sentence": "His injuries hindered him from playing in the final match.",
        "korean_sentence": "그의 부상은 그가 결승전에 출전하는 것을 방해했습니다."
    },
    {
        "korean": "상응하는 것, 대응 관계에 있는 사람[것]",
        "english": "counterpart",
        "pronunciation": "[ˈkaʊntərˌpɑrt]",
        "hangul_pronunciation": "[카운터파트]",
        "sample_sentence": "The CEO met with his Japanese counterpart.",
        "korean_sentence": "CEO는 그의 일본 측 상대와 만났습니다."
    },
    {
        "korean": "국한하다, 가두다",
        "english": "confine",
        "pronunciation": "[kənˈfaɪn]",
        "hangul_pronunciation": "[컨파인]",
        "sample_sentence": "The illness confined him to bed for several weeks.",
        "korean_sentence": "병은 그를 몇 주 동안 침대에 가두었습니다."
    },
    {
        "korean": "이야기, 서술",
        "english": "narrative",
        "pronunciation": "[ˈnærətɪv]",
        "hangul_pronunciation": "[내러티브]",
        "sample_sentence": "The book provides a compelling narrative of the events.",
        "korean_sentence": "그 책은 사건들에 대한 설득력 있는 이야기를 제공합니다."
    },
    {
        "korean": "벗어남, 떠남",
        "english": "departure",
        "pronunciation": "[dɪˈpɑrtʃər]",
        "hangul_pronunciation": "[디파처]",
        "sample_sentence": "His departure from the company was unexpected.",
        "korean_sentence": "그의 회사 떠남은 예상치 못한 일이었습니다."
    },
    {
        "korean": "전하다, 전파하다",
        "english": "transmit",
        "pronunciation": "[trænsˈmɪt]",
        "hangul_pronunciation": "[트랜스밋]",
        "sample_sentence": "The virus can be transmitted through close contact.",
        "korean_sentence": "바이러스는 가까운 접촉을 통해 전파될 수 있습니다."
    },
    {
        "korean": "편찬하다, 정리하다, 편집하다",
        "english": "compile",
        "pronunciation": "[kəmˈpaɪl]",
        "hangul_pronunciation": "[컴파일]",
        "sample_sentence": "She compiled a list of all the references.",
        "korean_sentence": "그녀는 모든 참고 문헌 목록을 편찬했습니다."
    },
    {
        "korean": "분화, 차이",
        "english": "divergence",
        "pronunciation": "[daɪˈvɜːdʒəns]",
        "hangul_pronunciation": "[다이버전스]",
        "sample_sentence": "The divergence of the two paths was evident.",
        "korean_sentence": "두 길의 분화는 명백했습니다."
    },
    {
        "korean": "수반하다",
        "english": "entail",
        "pronunciation": "[ɪnˈteɪl]",
        "hangul_pronunciation": "[엔테일]",
        "sample_sentence": "This project will entail a lot of work.",
        "korean_sentence": "이 프로젝트는 많은 작업을 수반할 것입니다."
    },
    {
        "korean": "그릇, 배, 선박, 혈관",
        "english": "vessel",
        "pronunciation": "[ˈvɛsəl]",
        "hangul_pronunciation": "[베슬]",
        "sample_sentence": "The blood vessel was blocked.",
        "korean_sentence": "혈관이 막혔습니다."
    },
    {
        "korean": "(분명히) 보여 주다, 예증하다, 설명하다",
        "english": "illustrate",
        "pronunciation": "[ˈɪləstreɪt]",
        "hangul_pronunciation": "[일러스트레이트]",
        "sample_sentence": "The professor illustrated the concept with an example.",
        "korean_sentence": "교수님은 예시를 통해 개념을 설명했습니다."
    },
    {
        "korean": "개입하다, 끼어들다",
        "english": "intervene",
        "pronunciation": "[ˌɪntərˈviːn]",
        "hangul_pronunciation": "[인터빈]",
        "sample_sentence": "The teacher had to intervene in the argument.",
        "korean_sentence": "선생님은 논쟁에 개입해야 했습니다."
    },
    {
        "korean": "제한하다, 한정하다",
        "english": "restrict",
        "pronunciation": "[rɪˈstrɪkt]",
        "hangul_pronunciation": "[리스트릭트]",
        "sample_sentence": "The new law restricts smoking in public places.",
        "korean_sentence": "새 법은 공공장소에서의 흡연을 제한합니다."
    },
    {
        "korean": "유발하다, 유도하다",
        "english": "induce",
        "pronunciation": "[ɪnˈdjuːs]",
        "hangul_pronunciation": "[인듀스]",
        "sample_sentence": "The drug may induce sleepiness.",
        "korean_sentence": "그 약물은 졸음을 유발할 수 있습니다."
    },
    {
        "korean": "(후보로) 지명하다, 지목하다",
        "english": "nominate",
        "pronunciation": "[ˈnɒmɪneɪt]",
        "hangul_pronunciation": "[노미네이트]",
        "sample_sentence": "She was nominated for the award.",
        "korean_sentence": "그녀는 상 후보로 지명되었습니다."
    },
    {
        "korean": "유산",
        "english": "heritage",
        "pronunciation": "[ˈhɛrɪtɪdʒ]",
        "hangul_pronunciation": "[헤리티지]",
        "sample_sentence": "The country's cultural heritage is rich and diverse.",
        "korean_sentence": "그 나라의 문화 유산은 풍부하고 다양합니다."
    },
    {
        "korean": "분자",
        "english": "molecule",
        "pronunciation": "[ˈmɒlɪkjuːl]",
        "hangul_pronunciation": "[몰리큘]",
        "sample_sentence": "Water is made up of two hydrogen molecules and one oxygen molecule.",
        "korean_sentence": "물은 두 개의 수소 분자와 하나의 산소 분자로 이루어져 있습니다."
    },
    {
        "korean": "내성, 관용, 용인",
        "english": "tolerance",
        "pronunciation": "[ˈtɒlərəns]",
        "hangul_pronunciation": "[톨러런스]",
        "sample_sentence": "Tolerance of different opinions is essential in a democracy.",
        "korean_sentence": "다른 의견에 대한 관용은 민주주의에서 필수적입니다."
    },
    {
        "korean": "철없는, 미성숙한",
        "english": "immature",
        "pronunciation": "[ˌɪməˈtjʊər]",
        "hangul_pronunciation": "[이머튜어]",
        "sample_sentence": "His behavior is very immature for his age.",
        "korean_sentence": "그의 행동은 나이에 비해 매우 미성숙합니다."
    },
    {
        "korean": "격상시키다, 높이다",
        "english": "elevate",
        "pronunciation": "[ˈɛlɪveɪt]",
        "hangul_pronunciation": "[엘리베이트]",
        "sample_sentence": "The new policy aims to elevate the standard of living.",
        "korean_sentence": "새로운 정책은 생활 수준을 높이는 것을 목표로 합니다."
    },
    {
        "korean": "축적하다",
        "english": "accumulate",
        "pronunciation": "[əˈkjuːmjʊleɪt]",
        "hangul_pronunciation": "[어큘뮬레이트]",
        "sample_sentence": "Over the years, he accumulated a large collection of books.",
        "korean_sentence": "수년간 그는 많은 책을 축적했습니다."
    },
    {
        "korean": "주사, 주입",
        "english": "injection",
        "pronunciation": "[ɪnˈdʒɛkʃən]",
        "hangul_pronunciation": "[인젝션]",
        "sample_sentence": "The patient received an injection of the medication.",
        "korean_sentence": "환자는 약물 주사를 받았습니다."
    },
    {
        "korean": "접함, 노출",
        "english": "exposure",
        "pronunciation": "[ɪkˈspəʊʒər]",
        "hangul_pronunciation": "[익스포저]",
        "sample_sentence": "Exposure to sunlight can improve your mood.",
        "korean_sentence": "햇빛에 노출되면 기분이 좋아질 수 있습니다."
    },
    {
        "korean": "정서, 감정",
        "english": "sentiment",
        "pronunciation": "[ˈsɛntɪmənt]",
        "hangul_pronunciation": "[센티먼트]",
        "sample_sentence": "There was a lot of sentimental value attached to the old house.",
        "korean_sentence": "그 오래된 집에는 많은 정서적 가치가 붙어 있었습니다."
    },
    {
        "korean": "은퇴, 퇴직",
        "english": "retirement",
        "pronunciation": "[rɪˈtaɪəmənt]",
        "hangul_pronunciation": "[리타이어먼트]",
        "sample_sentence": "She is looking forward to her retirement next year.",
        "korean_sentence": "그녀는 내년 은퇴를 기대하고 있습니다."
    },
    {
        "korean": "이기다, 물리치다; 패배",
        "english": "defeat",
        "pronunciation": "[dɪˈfiːt]",
        "hangul_pronunciation": "[디피트]",
        "sample_sentence": "They managed to defeat their opponents in the final match.",
        "korean_sentence": "그들은 결승전에서 상대를 물리치는 데 성공했습니다."
    },
    {
        "korean": "형성하다, 조성하다",
        "english": "foster",
        "pronunciation": "[ˈfɒstər]",
        "hangul_pronunciation": "[포스터]",
        "sample_sentence": "The teacher's role is to foster learning.",
        "korean_sentence": "교사의 역할은 학습을 형성하는 것입니다."
    },
    {
        "korean": "명시적인, 명확한",
        "english": "explicit",
        "pronunciation": "[ɪkˈsplɪsɪt]",
        "hangul_pronunciation": "[익스플리싯]",
        "sample_sentence": "She gave explicit instructions.",
        "korean_sentence": "그녀는 명확한 지시를 내렸습니다."
    },
    {
        "korean": "불리한, 해로운",
        "english": "adverse",
        "pronunciation": "[ˈædvɜːrs]",
        "hangul_pronunciation": "[애드버스]",
        "sample_sentence": "The adverse effects of the drug are severe.",
        "korean_sentence": "그 약물의 불리한 효과는 심각합니다."
    },
    {
        "korean": "터무니없는, 너무나 충격적인",
        "english": "outrageous",
        "pronunciation": "[aʊtˈreɪdʒəs]",
        "hangul_pronunciation": "[아웃레이지어스]",
        "sample_sentence": "His behavior was simply outrageous.",
        "korean_sentence": "그의 행동은 그저 터무니없었습니다."
    },
    {
        "korean": "거래, 교류",
        "english": "transaction",
        "pronunciation": "[trænˈzækʃən]",
        "hangul_pronunciation": "[트랜잭션]",
        "sample_sentence": "The transaction was completed successfully.",
        "korean_sentence": "거래는 성공적으로 완료되었습니다."
    },
    {
        "korean": "재개발, 갱신",
        "english": "renewal",
        "pronunciation": "[rɪˈnjuːəl]",
        "hangul_pronunciation": "[리뉴얼]",
        "sample_sentence": "The renewal of the contract was unexpected.",
        "korean_sentence": "계약의 갱신은 예상치 못한 일이었습니다."
    },
    {
        "korean": "건축가",
        "english": "architect",
        "pronunciation": "[ˈɑːrkɪtɛkt]",
        "hangul_pronunciation": "[아키텍트]",
        "sample_sentence": "He is a well-known architect.",
        "korean_sentence": "그는 유명한 건축가입니다."
    },
    {
        "korean": "유연성",
        "english": "flexibility",
        "pronunciation": "[ˌflɛksəˈbɪləti]",
        "hangul_pronunciation": "[플렉서빌러티]",
        "sample_sentence": "Flexibility is crucial in this job.",
        "korean_sentence": "이 직업에서는 유연성이 중요합니다."
    },
    {
        "korean": "위험 (요소)",
        "english": "hazard",
        "pronunciation": "[ˈhæzərd]",
        "hangul_pronunciation": "[해저드]",
        "sample_sentence": "Smoking is a serious health hazard.",
        "korean_sentence": "흡연은 심각한 건강 위험 요소입니다."
    },
    {
        "korean": "은폐하다, 숨기다",
        "english": "conceal",
        "pronunciation": "[kənˈsiːl]",
        "hangul_pronunciation": "[컨실]",
        "sample_sentence": "She tried to conceal her disappointment.",
        "korean_sentence": "그녀는 실망을 숨기려고 했습니다."
    },
    {
        "korean": "자격[자질]을 얻다[갖추다]",
        "english": "qualify",
        "pronunciation": "[ˈkwɒlɪfaɪ]",
        "hangul_pronunciation": "[퀄리파이]",
        "sample_sentence": "He needs to qualify for the competition.",
        "korean_sentence": "그는 대회에 참가할 자격을 갖추어야 합니다."
    },
    {
        "korean": "투자",
        "english": "investment",
        "pronunciation": "[ɪnˈvɛstmənt]",
        "hangul_pronunciation": "[인베스트먼트]",
        "sample_sentence": "Investment in education is essential.",
        "korean_sentence": "교육에 대한 투자는 필수적입니다."
    },
    {
        "korean": "절대적인, 확실한",
        "english": "absolute",
        "pronunciation": "[ˈæbsəluːt]",
        "hangul_pronunciation": "[앱솔루트]",
        "sample_sentence": "He demanded absolute loyalty.",
        "korean_sentence": "그는 절대적인 충성을 요구했습니다."
    },
    {
        "korean": "즐기다, 잘 해내다, 번영하다",
        "english": "thrive",
        "pronunciation": "[θraɪv]",
        "hangul_pronunciation": "[스라이브]",
        "sample_sentence": "The plants thrive in the greenhouse.",
        "korean_sentence": "식물들은 온실에서 잘 자랍니다."
    },
    {
        "korean": "다급함, 긴급함",
        "english": "urgency",
        "pronunciation": "[ˈɜːrdʒənsi]",
        "hangul_pronunciation": "[어전시]",
        "sample_sentence": "There was a sense of urgency in his voice.",
        "korean_sentence": "그의 목소리에는 다급함이 느껴졌습니다."
    },
    {
        "korean": "(운명적으로) 정해 놓다",
        "english": "destine",
        "pronunciation": "[ˈdɛstɪn]",
        "hangul_pronunciation": "[데스틴]",
        "sample_sentence": "She is destined to become a great leader.",
        "korean_sentence": "그녀는 훌륭한 지도자가 될 운명입니다."
    },
    {
        "korean": "(생각 등을) 깊이 감추다, 잠수하다",
        "english": "submerge",
        "pronunciation": "[səbˈmɜːrdʒ]",
        "hangul_pronunciation": "[섭머지]",
        "sample_sentence": "He submerged his feelings.",
        "korean_sentence": "그는 자신의 감정을 깊이 감추었습니다."
    },
    {
        "korean": "익명(성)",
        "english": "anonymity",
        "pronunciation": "[ˌænəˈnɪmɪti]",
        "hangul_pronunciation": "[애너니머티]",
        "sample_sentence": "The donor requested anonymity.",
        "korean_sentence": "기부자는 익명을 요청했습니다."
    },
    {
        "korean": "대처하다, 대응하다",
        "english": "cope",
        "pronunciation": "[koʊp]",
        "hangul_pronunciation": "[코프]",
        "sample_sentence": "She had to cope with a lot of stress.",
        "korean_sentence": "그녀는 많은 스트레스를 대처해야 했습니다."
    },
    {
        "korean": "천문학",
        "english": "astronomy",
        "pronunciation": "[əˈstrɒnəmi]",
        "hangul_pronunciation": "[아스트로노미]",
        "sample_sentence": "He has a keen interest in astronomy.",
        "korean_sentence": "그는 천문학에 깊은 관심이 있습니다."
    },
    {
        "korean": "도난, 절도 (행위)",
        "english": "theft",
        "pronunciation": "[θɛft]",
        "hangul_pronunciation": "[셉트]",
        "sample_sentence": "The police investigated the theft.",
        "korean_sentence": "경찰은 도난 사건을 조사했습니다."
    },
    {
        "korean": "배제하다, 못 하게 하다",
        "english": "exclude",
        "pronunciation": "[ɪkˈskluːd]",
        "hangul_pronunciation": "[익스클루드]",
        "sample_sentence": "They decided to exclude him from the meeting.",
        "korean_sentence": "그들은 그를 회의에서 배제하기로 결정했습니다."
    },
    {
        "korean": "적대감, 적대 행위",
        "english": "hostility",
        "pronunciation": "[hɑːˈstɪlɪti]",
        "hangul_pronunciation": "[호스틸리티]",
        "sample_sentence": "There was clear hostility between the two groups.",
        "korean_sentence": "두 그룹 간에는 분명한 적대감이 있었습니다."
    },
    {
        "korean": "시작하다",
        "english": "initiate",
        "pronunciation": "[ɪˈnɪʃieɪt]",
        "hangul_pronunciation": "[이니시에이트]",
        "sample_sentence": "They plan to initiate a new project next month.",
        "korean_sentence": "그들은 다음 달에 새로운 프로젝트를 시작할 계획입니다."
    },
    {
        "korean": "구성, 작문, 작곡",
        "english": "composition",
        "pronunciation": "[ˌkɒmpəˈzɪʃən]",
        "hangul_pronunciation": "[콤포지션]",
        "sample_sentence": "She studied musical composition.",
        "korean_sentence": "그녀는 작곡을 공부했습니다."
    },
    {
        "korean": "조각",
        "english": "fragment",
        "pronunciation": "[ˈfræɡmənt]",
        "hangul_pronunciation": "[프래그먼트]",
        "sample_sentence": "The glass broke into tiny fragments.",
        "korean_sentence": "유리는 작은 조각으로 깨졌습니다."
    },
    {
        "korean": "유지하다, 지속하다, 떠받치다",
        "english": "sustain",
        "pronunciation": "[səˈsteɪn]",
        "hangul_pronunciation": "[서스테인]",
        "sample_sentence": "They need to sustain the effort to improve.",
        "korean_sentence": "그들은 개선하기 위한 노력을 지속해야 합니다."
    },
    {
        "korean": "같이 넣음, 포함(시킴)",
        "english": "inclusion",
        "pronunciation": "[ɪnˈkluːʒən]",
        "hangul_pronunciation": "[인클루전]",
        "sample_sentence": "The inclusion of new members will strengthen the team.",
        "korean_sentence": "새로운 구성원들의 포함은 팀을 강화시킬 것입니다."
    },
    {
        "korean": "어쩔 수 없이 ~하게 하다",
        "english": "oblige",
        "pronunciation": "[əˈblaɪdʒ]",
        "hangul_pronunciation": "[어블라이즈]",
        "sample_sentence": "The law obliges companies to pay taxes.",
        "korean_sentence": "법은 회사들에게 세금을 낼 의무를 지웁니다."
    },
    {
        "korean": "라이벌 (관계), 경쟁 (상대)",
        "english": "rivalry",
        "pronunciation": "[ˈraɪvəlri]",
        "hangul_pronunciation": "[라이벌리]",
        "sample_sentence": "The rivalry between the teams was intense.",
        "korean_sentence": "팀 간의 경쟁은 치열했습니다."
    },
    {
        "korean": "헌신, 전념",
        "english": "dedication",
        "pronunciation": "[ˌdɛdɪˈkeɪʃən]",
        "hangul_pronunciation": "[데디케이션]",
        "sample_sentence": "Her dedication to her work is impressive.",
        "korean_sentence": "그녀의 일에 대한 헌신은 인상적입니다."
    },
    {
        "korean": "책임, 책무",
        "english": "responsibility",
        "pronunciation": "[rɪˌspɒnsəˈbɪləti]",
        "hangul_pronunciation": "[리스폰서빌리티]",
        "sample_sentence": "It is your responsibility to complete the task.",
        "korean_sentence": "과제를 완료하는 것은 당신의 책임입니다."
    },
    {
        "korean": "떨리다, 떨다",
        "english": "quiver",
        "pronunciation": "[ˈkwɪvər]",
        "hangul_pronunciation": "[퀴버]",
        "sample_sentence": "She could feel the quiver in her voice.",
        "korean_sentence": "그녀는 목소리의 떨림을 느낄 수 있었습니다."
    },
    {
        "korean": "감독, 관리",
        "english": "supervision",
        "pronunciation": "[ˌsuːpərˈvɪʒən]",
        "hangul_pronunciation": "[수퍼비전]",
        "sample_sentence": "The project needs close supervision.",
        "korean_sentence": "그 프로젝트는 세심한 관리가 필요합니다."
    },
    {
        "korean": "감각의",
        "english": "sensory",
        "pronunciation": "[ˈsɛnsəri]",
        "hangul_pronunciation": "[센서리]",
        "sample_sentence": "The sensory experience was overwhelming.",
        "korean_sentence": "감각적 경험은 압도적이었습니다."
    },
    {
        "korean": "욕구, 식욕",
        "english": "appetite",
        "pronunciation": "[ˈæpɪˌtaɪt]",
        "hangul_pronunciation": "[애피타이트]",
        "sample_sentence": "He has a big appetite.",
        "korean_sentence": "그는 식욕이 왕성합니다."
    },
    {
        "korean": "기념물, 기념비",
        "english": "monument",
        "pronunciation": "[ˈmɒnjʊmənt]",
        "hangul_pronunciation": "[모뉴먼트]",
        "sample_sentence": "The monument was built to honor the heroes.",
        "korean_sentence": "기념비는 영웅들을 기리기 위해 세워졌습니다."
    },
    {
        "korean": "무모한, 부주의한",
        "english": "reckless",
        "pronunciation": "[ˈrɛkləs]",
        "hangul_pronunciation": "[레클리스]",
        "sample_sentence": "His reckless driving caused an accident.",
        "korean_sentence": "그의 무모한 운전이 사고를 초래했습니다."
    },
    {
        "korean": "군집, 이주 집단, 식민지",
        "english": "colony",
        "pronunciation": "[ˈkɒləni]",
        "hangul_pronunciation": "[컬러니]",
        "sample_sentence": "The colony was founded in the early 19th century.",
        "korean_sentence": "그 식민지는 19세기 초에 설립되었습니다."
    },
    {
        "korean": "관점",
        "english": "perspective",
        "pronunciation": "[pərˈspɛktɪv]",
        "hangul_pronunciation": "[퍼스펙티브]",
        "sample_sentence": "She has a unique perspective on the issue.",
        "korean_sentence": "그녀는 그 문제에 대해 독특한 관점을 가지고 있습니다."
    },
    {
        "korean": "불일치, 차이",
        "english": "discrepancy",
        "pronunciation": "[dɪˈskrɛpənsi]",
        "hangul_pronunciation": "[디스크레펀시]",
        "sample_sentence": "There is a discrepancy between the two reports.",
        "korean_sentence": "두 보고서 사이에 차이가 있습니다."
    },
    {
        "korean": "향, 향기, 향수",
        "english": "fragrance",
        "pronunciation": "[ˈfreɪɡrəns]",
        "hangul_pronunciation": "[프레이그런스]",
        "sample_sentence": "The fragrance of the flowers was delightful.",
        "korean_sentence": "꽃들의 향기가 기분 좋았습니다."
    },
    {
        "korean": "확산시키다, 퍼지다",
        "english": "diffuse",
        "pronunciation": "[dɪˈfjuːz]",
        "hangul_pronunciation": "[디퓨즈]",
        "sample_sentence": "The smell of cooking diffused through the house.",
        "korean_sentence": "요리 냄새가 집 안에 퍼졌습니다."
    },
    {
        "korean": "양, 분량, 복용량",
        "english": "dose",
        "pronunciation": "[doʊs]",
        "hangul_pronunciation": "[도스]",
        "sample_sentence": "Take one dose of the medicine every six hours.",
        "korean_sentence": "6시간마다 약을 한 번씩 복용하세요."
    },
    {
        "korean": "노력",
        "english": "endeavor",
        "pronunciation": "[ɪnˈdɛvər]",
        "hangul_pronunciation": "[인데버]",
        "sample_sentence": "She is engaged in scientific endeavors.",
        "korean_sentence": "그녀는 과학적 노력을 하고 있습니다."
    },
    {
        "korean": "우위, 지배",
        "english": "dominance",
        "pronunciation": "[ˈdɑːmɪnəns]",
        "hangul_pronunciation": "[도미넌스]",
        "sample_sentence": "The company has established its dominance in the market.",
        "korean_sentence": "그 회사는 시장에서의 우위를 확립했습니다."
    },
    {
        "korean": "(한없이) 오랜 시간, 영원",
        "english": "eternity",
        "pronunciation": "[ɪˈtɜrnɪti]",
        "hangul_pronunciation": "[이터니티]",
        "sample_sentence": "They promised to love each other for eternity.",
        "korean_sentence": "그들은 영원히 서로를 사랑할 것을 약속했습니다."
    },
    {
        "korean": "죽음을 피할 수 없음, 필사(必死), 사망",
        "english": "mortality",
        "pronunciation": "[mɔrˈtæləti]",
        "hangul_pronunciation": "[모탈리티]",
        "sample_sentence": "The mortality rate has decreased significantly.",
        "korean_sentence": "사망률이 크게 감소했습니다."
    },
    {
        "korean": "진정한, 합법적인",
        "english": "legitimate",
        "pronunciation": "[lɪˈdʒɪtəmɪt]",
        "hangul_pronunciation": "[레지티밋]",
        "sample_sentence": "He is the legitimate heir to the throne.",
        "korean_sentence": "그는 왕위의 정당한 상속자입니다."
    },
    {
        "korean": "유대, 결합",
        "english": "bonding",
        "pronunciation": "[ˈbɑndɪŋ]",
        "hangul_pronunciation": "[본딩]",
        "sample_sentence": "Team bonding activities help build trust.",
        "korean_sentence": "팀 결속 활동은 신뢰를 쌓는 데 도움이 됩니다."
    },
    {
        "korean": "떠 있게 하다, 유예하다, 매달다, 중단하다",
        "english": "suspend",
        "pronunciation": "[səˈspɛnd]",
        "hangul_pronunciation": "[서스펜드]",
        "sample_sentence": "The bridge was suspended over the river.",
        "korean_sentence": "다리는 강 위에 매달려 있었습니다."
    },
    {
        "korean": "상당한, 실체의, 물질의",
        "english": "substantial",
        "pronunciation": "[səbˈstænʃəl]",
        "hangul_pronunciation": "[섭스탠셜]",
        "sample_sentence": "They made a substantial investment in the project.",
        "korean_sentence": "그들은 그 프로젝트에 상당한 투자를 했습니다."
    },
    {
        "korean": "한계의, 주변부의, 중요하지 않은",
        "english": "marginal",
        "pronunciation": "[ˈmɑrdʒɪnl]",
        "hangul_pronunciation": "[마지널]",
        "sample_sentence": "His influence in the company is marginal.",
        "korean_sentence": "그의 회사에서의 영향력은 미미합니다."
    },
    {
        "korean": "노력하다, 싸우다, 분투하다",
        "english": "strive",
        "pronunciation": "[straɪv]",
        "hangul_pronunciation": "[스트라이브]",
        "sample_sentence": "We strive to improve our services.",
        "korean_sentence": "우리는 서비스를 개선하기 위해 노력합니다."
    },
    {
        "korean": "기능, 능력, 전 교직원",
        "english": "faculty",
        "pronunciation": "[ˈfækəlti]",
        "hangul_pronunciation": "[팩컬티]",
        "sample_sentence": "The faculty at the university is highly qualified.",
        "korean_sentence": "대학교의 교직원들은 매우 자격이 뛰어납니다."
    },
    {
        "korean": "조작",
        "english": "manipulation",
        "pronunciation": "[məˌnɪpjʊˈleɪʃən]",
        "hangul_pronunciation": "[매니퓰레이션]",
        "sample_sentence": "The manipulation of data is strictly prohibited.",
        "korean_sentence": "데이터 조작은 엄격히 금지됩니다."
    },
    {
        "korean": "상충하다, 반박하다, 모순되다",
        "english": "contradict",
        "pronunciation": "[ˌkɒntrəˈdɪkt]",
        "hangul_pronunciation": "[콘트라딕트]",
        "sample_sentence": "His actions contradict his words.",
        "korean_sentence": "그의 행동은 그의 말과 모순됩니다."
    },
    {
        "korean": "어디서나 볼 수 있는, 아주 흔한",
        "english": "ubiquitous",
        "pronunciation": "[juːˈbɪkwɪtəs]",
        "hangul_pronunciation": "[유비쿼터스]",
        "sample_sentence": "Smartphones have become ubiquitous in modern society.",
        "korean_sentence": "스마트폰은 현대 사회에서 어디서나 볼 수 있게 되었습니다."
    },
    {
        "korean": "억제하다, 억누르다",
        "english": "suppress",
        "pronunciation": "[səˈprɛs]",
        "hangul_pronunciation": "[서프레스]",
        "sample_sentence": "The government tried to suppress the protests.",
        "korean_sentence": "정부는 시위를 억제하려 했습니다."
    },
    {
        "korean": "실체",
        "english": "substance",
        "pronunciation": "[ˈsʌbstəns]",
        "hangul_pronunciation": "[섭스턴스]",
        "sample_sentence": "The scientist studied the substance carefully.",
        "korean_sentence": "과학자는 그 물질을 면밀히 연구했습니다."
    },
    {
        "korean": "순수(성)",
        "english": "purity",
        "pronunciation": "[ˈpjʊrɪti]",
        "hangul_pronunciation": "[퓨리티]",
        "sample_sentence": "The purity of the water was tested.",
        "korean_sentence": "물의 순수성을 검사했습니다."
    },
    {
        "korean": "(내과) 의사",
        "english": "physician",
        "pronunciation": "[fɪˈzɪʃən]",
        "hangul_pronunciation": "[피지션]",
        "sample_sentence": "She consulted with her physician about her health.",
        "korean_sentence": "그녀는 건강에 대해 의사와 상담했습니다."
    },
    {
        "korean": "유전자의, 유전학의",
        "english": "genetic",
        "pronunciation": "[dʒɪˈnɛtɪk]",
        "hangul_pronunciation": "[제네틱]",
        "sample_sentence": "Genetic research has advanced rapidly in recent years.",
        "korean_sentence": "최근 몇 년간 유전학 연구가 급속히 발전했습니다."
    },
    {
        "korean": "새기다, 쓰다",
        "english": "inscribe",
        "pronunciation": "[ɪnˈskraɪb]",
        "hangul_pronunciation": "[인스크라이브]",
        "sample_sentence": "They inscribed their names on the tree.",
        "korean_sentence": "그들은 나무에 이름을 새겼습니다."
    },
    {
        "korean": "증상, 징후, 조짐",
        "english": "symptom",
        "pronunciation": "[ˈsɪmptəm]",
        "hangul_pronunciation": "[심텀]",
        "sample_sentence": "He showed symptoms of the flu.",
        "korean_sentence": "그는 독감 증상을 보였습니다."
    },
    {
        "korean": "강화하다",
        "english": "reinforce",
        "pronunciation": "[ˌriːɪnˈfɔːrs]",
        "hangul_pronunciation": "[리인포스]",
        "sample_sentence": "The wall was reinforced with steel beams.",
        "korean_sentence": "벽은 강철 빔으로 강화되었습니다."
    },
    {
        "korean": "인종적인, 종족의",
        "english": "racial",
        "pronunciation": "[ˈreɪʃəl]",
        "hangul_pronunciation": "[레이셜]",
        "sample_sentence": "They addressed the issue of racial inequality.",
        "korean_sentence": "그들은 인종적 불평등 문제를 다루었습니다."
    },
    {
        "korean": "일회용의, 처분 가능한",
        "english": "disposable",
        "pronunciation": "[dɪˈspoʊzəbl]",
        "hangul_pronunciation": "[디스포저블]",
        "sample_sentence": "We use disposable cups at the party.",
        "korean_sentence": "우리는 파티에서 일회용 컵을 사용합니다."
    },
    {
        "korean": "부착하다, 붙이다, 첨부하다",
        "english": "attach",
        "pronunciation": "[əˈtætʃ]",
        "hangul_pronunciation": "[어태치]",
        "sample_sentence": "Please attach the document to your email.",
        "korean_sentence": "이메일에 문서를 첨부해 주세요."
    },
    {
        "korean": "조절, 조정",
        "english": "adjustment",
        "pronunciation": "[əˈdʒʌstmənt]",
        "hangul_pronunciation": "[어저스트먼트]",
        "sample_sentence": "He made some adjustments to the settings.",
        "korean_sentence": "그는 설정을 약간 조정했습니다."
    },
    {
        "korean": "일관된, 한결같은",
        "english": "consistent",
        "pronunciation": "[kənˈsɪstənt]",
        "hangul_pronunciation": "[컨시스턴트]",
        "sample_sentence": "Her work has been consistent and reliable.",
        "korean_sentence": "그녀의 작업은 일관되고 신뢰할 수 있었습니다."
    },
    {
        "korean": "자율적인",
        "english": "autonomous",
        "pronunciation": "[ɔːˈtɑːnəməs]",
        "hangul_pronunciation": "[오토노머스]",
        "sample_sentence": "The university is an autonomous institution.",
        "korean_sentence": "그 대학은 자율적인 기관입니다."
    },
    {
        "korean": "감소, 고갈",
        "english": "depletion",
        "pronunciation": "[dɪˈpliːʃən]",
        "hangul_pronunciation": "[디플리션]",
        "sample_sentence": "The depletion of natural resources is a serious issue.",
        "korean_sentence": "천연 자원의 고갈은 심각한 문제입니다."
    },
    {
        "korean": "또렷함, 명료성",
        "english": "clarity",
        "pronunciation": "[ˈklærɪti]",
        "hangul_pronunciation": "[클래리티]",
        "sample_sentence": "The clarity of his speech impressed everyone.",
        "korean_sentence": "그의 연설의 명료성은 모두를 감동시켰습니다."
    },
    {
        "korean": "참조, 참고, 언급",
        "english": "reference",
        "pronunciation": "[ˈrɛfərəns]",
        "hangul_pronunciation": "[레퍼런스]",
        "sample_sentence": "Please include references in your report.",
        "korean_sentence": "보고서에 참조 자료를 포함해 주세요."
    },
    {
        "korean": "시행하다, 구현하다, 실시하다",
        "english": "implement",
        "pronunciation": "[ˈɪmplɪmɛnt]",
        "hangul_pronunciation": "[임플리멘트]",
        "sample_sentence": "The company decided to implement the new policy.",
        "korean_sentence": "회사는 새로운 정책을 시행하기로 결정했습니다."
    },
    {
        "korean": "풍부한, 많은",
        "english": "abundant",
        "pronunciation": "[əˈbʌndənt]",
        "hangul_pronunciation": "[어번던트]",
        "sample_sentence": "The forest is abundant in wildlife.",
        "korean_sentence": "숲에는 야생 동물이 풍부합니다."
    },
    {
        "korean": "가변적인, 변동이 심한",
        "english": "variable",
        "pronunciation": "[ˈvɛriəbl]",
        "hangul_pronunciation": "[베어리어블]",
        "sample_sentence": "The weather is highly variable this time of year.",
        "korean_sentence": "이맘때의 날씨는 매우 변동이 심합니다."
    },
    {
        "korean": "증폭하다, 확대하다",
        "english": "amplify",
        "pronunciation": "[ˈæmplɪfaɪ]",
        "hangul_pronunciation": "[앰플리파이]",
        "sample_sentence": "The speakers amplified the sound.",
        "korean_sentence": "스피커가 소리를 증폭시켰습니다."
    },
    {
        "korean": "강도, 강렬함",
        "english": "intensity",
        "pronunciation": "[ɪnˈtɛnsɪti]",
        "hangul_pronunciation": "[인텐서티]",
        "sample_sentence": "The intensity of the storm was frightening.",
        "korean_sentence": "폭풍의 강도는 두려웠습니다."
    },
    {
        "korean": "진단",
        "english": "diagnosis",
        "pronunciation": "[ˌdaɪəɡˈnoʊsɪs]",
        "hangul_pronunciation": "[다이어그노시스]",
        "sample_sentence": "The doctor's diagnosis was accurate.",
        "korean_sentence": "의사의 진단이 정확했습니다."
    },
    {
        "korean": "접근할 수 있는",
        "english": "accessible",
        "pronunciation": "[ækˈsɛsəbəl]",
        "hangul_pronunciation": "[액세서블]",
        "sample_sentence": "The library is easily accessible to all students.",
        "korean_sentence": "도서관은 모든 학생이 쉽게 접근할 수 있습니다."
    },
    {
        "korean": "상상하다, 마음속에 그리다",
        "english": "envision",
        "pronunciation": "[ɪnˈvɪʒən]",
        "hangul_pronunciation": "[인비전]",
        "sample_sentence": "She envisions a future with advanced technology.",
        "korean_sentence": "그녀는 첨단 기술이 발전한 미래를 상상합니다."
    },
    {
        "korean": "충돌, 대립",
        "english": "collision",
        "pronunciation": "[kəˈlɪʒən]",
        "hangul_pronunciation": "[컬리전]",
        "sample_sentence": "The collision of the two cars caused a traffic jam.",
        "korean_sentence": "두 차의 충돌로 인해 교통 체증이 발생했습니다."
    },
    {
        "korean": "속도",
        "english": "velocity",
        "pronunciation": "[vəˈlɑsɪti]",
        "hangul_pronunciation": "[벨로서티]",
        "sample_sentence": "The velocity of the rocket was astonishing.",
        "korean_sentence": "로켓의 속도는 놀라웠습니다."
    },
    {
        "korean": "~이 있다고 생각하다, ~의 탓으로 하다; 속성, 자질",
        "english": "attribute",
        "pronunciation": "[əˈtrɪbjut]",
        "hangul_pronunciation": "[어트리뷰트]",
        "sample_sentence": "She attributes her success to hard work and dedication.",
        "korean_sentence": "그녀는 자신의 성공을 노력과 헌신 덕분으로 생각합니다."
    },
    {
        "korean": "속이다, 기만하다",
        "english": "deceive",
        "pronunciation": "[dɪˈsiv]",
        "hangul_pronunciation": "[디시브]",
        "sample_sentence": "He tried to deceive everyone with his lies.",
        "korean_sentence": "그는 자신의 거짓말로 모든 사람을 속이려고 했습니다."
    },
    {
        "korean": "상호 작용",
        "english": "interaction",
        "pronunciation": "[ˌɪntərˈækʃən]",
        "hangul_pronunciation": "[인터랙션]",
        "sample_sentence": "The interaction between the teacher and students was engaging.",
        "korean_sentence": "선생님과 학생들 간의 상호 작용은 흥미로웠습니다."
    },
    {
        "korean": "필사적임, 절망",
        "english": "desperation",
        "pronunciation": "[ˌdɛspəˈreɪʃən]",
        "hangul_pronunciation": "[데스퍼레이션]",
        "sample_sentence": "In a moment of desperation, he called for help.",
        "korean_sentence": "절망의 순간에 그는 도움을 요청했습니다."
    },
    {
        "korean": "어찌할 바를 모르게 하다, 당황시키다",
        "english": "perplex",
        "pronunciation": "[pərˈplɛks]",
        "hangul_pronunciation": "[퍼플렉스]",
        "sample_sentence": "The complex problem perplexed the students.",
        "korean_sentence": "복잡한 문제는 학생들을 당황하게 했습니다."
    },
    {
        "korean": "알리다, 공지하다",
        "english": "notify",
        "pronunciation": "[ˈnoʊtɪˌfaɪ]",
        "hangul_pronunciation": "[노티파이]",
        "sample_sentence": "Please notify me of any changes.",
        "korean_sentence": "변경 사항이 있으면 알려주세요."
    },
    {
        "korean": "복원하다",
        "english": "restore",
        "pronunciation": "[rɪˈstɔr]",
        "hangul_pronunciation": "[리스토어]",
        "sample_sentence": "The painting was restored to its original condition.",
        "korean_sentence": "그 그림은 원래 상태로 복원되었습니다."
    },
    {
        "korean": "진행 중인, 지속적인",
        "english": "ongoing",
        "pronunciation": "[ˈɑnˌɡoʊɪŋ]",
        "hangul_pronunciation": "[온고잉]",
        "sample_sentence": "The project is still ongoing.",
        "korean_sentence": "그 프로젝트는 아직 진행 중입니다."
    },
    {
        "korean": "소중한, 귀중한",
        "english": "precious",
        "pronunciation": "[ˈprɛʃəs]",
        "hangul_pronunciation": "[프레셔스]",
        "sample_sentence": "She wore a precious necklace.",
        "korean_sentence": "그녀는 귀중한 목걸이를 착용했습니다."
    },
    {
        "korean": "끝없는",
        "english": "boundless",
        "pronunciation": "[ˈbaʊndlɪs]",
        "hangul_pronunciation": "[바운드리스]",
        "sample_sentence": "The sky seemed boundless.",
        "korean_sentence": "하늘은 끝없이 펼쳐져 있는 것 같았습니다."
    },
    {
        "korean": "인정하다, 승인하다",
        "english": "acknowledge",
        "pronunciation": "[əkˈnɑlɪdʒ]",
        "hangul_pronunciation": "[어크놀리지]",
        "sample_sentence": "He acknowledged his mistakes.",
        "korean_sentence": "그는 자신의 실수를 인정했습니다."
    },
    {
        "korean": "이루다, 완수하다",
        "english": "accomplish",
        "pronunciation": "[əˈkɑmplɪʃ]",
        "hangul_pronunciation": "[어캄플리쉬]",
        "sample_sentence": "She accomplished all her goals.",
        "korean_sentence": "그녀는 모든 목표를 이루었습니다."
    },
    {
        "korean": "윤리(학)",
        "english": "ethics",
        "pronunciation": "[ˈɛθɪks]",
        "hangul_pronunciation": "[에틱스]",
        "sample_sentence": "The company is known for its strong ethics.",
        "korean_sentence": "그 회사는 강한 윤리로 알려져 있습니다."
    },
    {
        "korean": "개념, 관념",
        "english": "notion",
        "pronunciation": "[ˈnoʊʃən]",
        "hangul_pronunciation": "[노션]",
        "sample_sentence": "She has a clear notion of what she wants.",
        "korean_sentence": "그녀는 자신이 원하는 것에 대한 명확한 개념을 가지고 있습니다."
    },
    {
        "korean": "보조금, 장려금",
        "english": "subsidy",
        "pronunciation": "[ˈsʌbsɪdi]",
        "hangul_pronunciation": "[섭시디]",
        "sample_sentence": "The government provides subsidies for farmers.",
        "korean_sentence": "정부는 농부들에게 보조금을 제공합니다."
    },
    {
        "korean": "필수적인, 없어서는 안 될",
        "english": "indispensable",
        "pronunciation": "[ˌɪndɪˈspɛnsəbəl]",
        "hangul_pronunciation": "[인디스펜서블]",
        "sample_sentence": "Water is indispensable for life.",
        "korean_sentence": "물은 생명에 없어서는 안 될 필수적인 것입니다."
    },
    {
        "korean": "보상하다, 보충[벌충]하다",
        "english": "compensate",
        "pronunciation": "[ˈkɑmpənˌseɪt]",
        "hangul_pronunciation": "[컴펀세이트]",
        "sample_sentence": "The company compensated the employees for their overtime.",
        "korean_sentence": "회사는 직원들의 초과 근무에 대해 보상했습니다."
    },
    {
        "korean": "온전함, 완전성, 완전한 상태, 고결",
        "english": "integrity",
        "pronunciation": "[ɪnˈtɛɡrɪti]",
        "hangul_pronunciation": "[인테그리티]",
        "sample_sentence": "He is known for his integrity and honesty.",
        "korean_sentence": "그는 온전함과 정직함으로 알려져 있습니다."
    },
    {
        "korean": "의무를 지우다, 강요하다",
        "english": "obligate",
        "pronunciation": "[ˈɑblɪˌɡeɪt]",
        "hangul_pronunciation": "[어블리게이트]",
        "sample_sentence": "The contract obligates the company to pay within 30 days.",
        "korean_sentence": "계약서는 회사가 30일 이내에 지급해야 한다는 의무를 부과합니다."
    },
    {
        "korean": "예측[예언]하다",
        "english": "foretell",
        "pronunciation": "[fɔrˈtɛl]",
        "hangul_pronunciation": "[포어텔]",
        "sample_sentence": "No one can foretell the future.",
        "korean_sentence": "아무도 미래를 예측할 수 없습니다."
    },
    {
        "korean": "선호(도)",
        "english": "preference",
        "pronunciation": "[ˈprɛfərəns]",
        "hangul_pronunciation": "[프레퍼런스]",
        "sample_sentence": "She has a preference for tea over coffee.",
        "korean_sentence": "그녀는 커피보다 차를 선호합니다."
    },
    {
        "korean": "단점, 결점",
        "english": "shortcoming",
        "pronunciation": "[ˈʃɔrtˌkʌmɪŋ]",
        "hangul_pronunciation": "[쇼트커밍]",
        "sample_sentence": "Everyone has their own shortcomings.",
        "korean_sentence": "모든 사람은 자신의 단점을 가지고 있습니다."
    },
    {
        "korean": "평판이 좋은",
        "english": "reputable",
        "pronunciation": "[ˈrɛpjətəbəl]",
        "hangul_pronunciation": "[레퓨터블]",
        "sample_sentence": "He works for a reputable company.",
        "korean_sentence": "그는 평판이 좋은 회사에서 일합니다."
    },
    {
        "korean": "진정성, 진실성",
        "english": "authenticity",
        "pronunciation": "[ˌɔθənˈtɪsɪti]",
        "hangul_pronunciation": "[어센티시티]",
        "sample_sentence": "The museum verifies the authenticity of the artifacts.",
        "korean_sentence": "박물관은 유물의 진정성을 확인합니다."
    },
    {
        "korean": "토대, 재단, 기초, 창립",
        "english": "foundation",
        "pronunciation": "[faʊnˈdeɪʃən]",
        "hangul_pronunciation": "[파운데이션]",
        "sample_sentence": "The foundation of the building is very strong.",
        "korean_sentence": "건물의 토대는 매우 견고합니다."
    },
    {
        "korean": "극복하다, 정복하다",
        "english": "conquer",
        "pronunciation": "[ˈkɑŋkər]",
        "hangul_pronunciation": "[칸커]",
        "sample_sentence": "He managed to conquer his fears.",
        "korean_sentence": "그는 두려움을 극복하는 데 성공했습니다."
    },
    {
        "korean": "촉진하다, 촉매 작용을 미치다",
        "english": "catalyze",
        "pronunciation": "[ˈkætəˌlaɪz]",
        "hangul_pronunciation": "[캐털라이즈]",
        "sample_sentence": "Enzymes catalyze chemical reactions in the body.",
        "korean_sentence": "효소는 체내 화학 반응을 촉진합니다."
    },
    {
        "korean": "기록[등록]하다",
        "english": "register",
        "pronunciation": "[ˈrɛdʒɪstər]",
        "hangul_pronunciation": "[레지스터]",
        "sample_sentence": "You need to register for the course by Friday.",
        "korean_sentence": "금요일까지 강좌에 등록해야 합니다."
    },
    {
        "korean": "이론의, 이론뿐인",
        "english": "theoretical",
        "pronunciation": "[ˌθiəˈrɛtɪkəl]",
        "hangul_pronunciation": "[씨어레티컬]",
        "sample_sentence": "Her approach is highly theoretical.",
        "korean_sentence": "그녀의 접근법은 매우 이론적입니다."
    },
    {
        "korean": "원인, 이유, 이성; 추론하다",
        "english": "reason",
        "pronunciation": "[ˈrizən]",
        "hangul_pronunciation": "[리즌]",
        "sample_sentence": "The reason for his absence was unclear.",
        "korean_sentence": "그의 결석 이유는 분명하지 않았습니다."
    },
    {
        "korean": "영향력 있는, 영향을 미치는",
        "english": "influential",
        "pronunciation": "[ˌɪnfluˈɛnʃəl]",
        "hangul_pronunciation": "[인플루엔셜]",
        "sample_sentence": "She is one of the most influential artists of her time.",
        "korean_sentence": "그녀는 그녀 시대의 가장 영향력 있는 예술가 중 한 명입니다."
    },
    {
        "korean": "익다, 무르익다, 숙성하다",
        "english": "ripen",
        "pronunciation": "[ˈraɪpən]",
        "hangul_pronunciation": "[라이픈]",
        "sample_sentence": "The fruit needs time to ripen.",
        "korean_sentence": "그 과일은 익는 데 시간이 필요합니다."
    },
    {
        "korean": "둘러싸다, 포위하다",
        "english": "surround",
        "pronunciation": "[səˈraʊnd]",
        "hangul_pronunciation": "[서라운드]",
        "sample_sentence": "The house is surrounded by trees.",
        "korean_sentence": "그 집은 나무로 둘러싸여 있습니다."
    },
    {
        "korean": "자격이 있는, 적임의, 적당한",
        "english": "eligible",
        "pronunciation": "[ˈɛlɪdʒəbəl]",
        "hangul_pronunciation": "[엘리저블]",
        "sample_sentence": "She is eligible for a scholarship.",
        "korean_sentence": "그녀는 장학금을 받을 자격이 있습니다."
    },
    {
        "korean": "변신시키다, 변형하다, 바꾸다",
        "english": "transform",
        "pronunciation": "[trænsˈfɔrm]",
        "hangul_pronunciation": "[트랜스폼]",
        "sample_sentence": "The new policy will transform the education system.",
        "korean_sentence": "새로운 정책은 교육 시스템을 변신시킬 것입니다."
    },
    {
        "korean": "관련, 관계, 영향",
        "english": "bearing",
        "pronunciation": "[ˈbɛrɪŋ]",
        "hangul_pronunciation": "[베어링]",
        "sample_sentence": "His opinion has no bearing on the decision.",
        "korean_sentence": "그의 의견은 결정에 아무런 영향을 미치지 않습니다."
    },
    {
        "korean": "지속 가능한",
        "english": "sustainable",
        "pronunciation": "[səˈsteɪnəbəl]",
        "hangul_pronunciation": "[서스테이너블]",
        "sample_sentence": "We need to find sustainable energy sources.",
        "korean_sentence": "우리는 지속 가능한 에너지원을 찾아야 합니다."
    },
    {
        "korean": "헌법, 구조, 체질",
        "english": "constitution",
        "pronunciation": "[ˌkɑnstɪˈtuʃən]",
        "hangul_pronunciation": "[컨스티튜션]",
        "sample_sentence": "The country's constitution guarantees freedom of speech.",
        "korean_sentence": "그 나라의 헌법은 언론의 자유를 보장합니다."
    },
    {
        "korean": "후보자, 지원자",
        "english": "candidate",
        "pronunciation": "[ˈkændɪˌdeɪt]",
        "hangul_pronunciation": "[캔디데이트]",
        "sample_sentence": "There are three candidates for the position.",
        "korean_sentence": "그 직책에는 세 명의 후보자가 있습니다."
    },
    {
        "korean": "줄어들다, 수축하다",
        "english": "shrink",
        "pronunciation": "[ʃrɪŋk]",
        "hangul_pronunciation": "[슈링크]",
        "sample_sentence": "Wool sweaters can shrink in the wash.",
        "korean_sentence": "울 스웨터는 세탁 시 줄어들 수 있습니다."
    },
    {
        "korean": "담론, 담화, 강연",
        "english": "discourse",
        "pronunciation": "[ˈdɪskɔrs]",
        "hangul_pronunciation": "[디스코스]",
        "sample_sentence": "He delivered a fascinating discourse on politics.",
        "korean_sentence": "그는 정치에 관한 매혹적인 담론을 펼쳤습니다."
    },
    {
        "korean": "일, 과제, 과업",
        "english": "undertaking",
        "pronunciation": "[ˌʌndərˈteɪkɪŋ]",
        "hangul_pronunciation": "[언더테이킹]",
        "sample_sentence": "Building the bridge was a massive undertaking.",
        "korean_sentence": "그 다리를 건설하는 것은 대규모 과제였습니다."
    },
    {
        "korean": "강렬한, 강력한, 강한",
        "english": "intense",
        "pronunciation": "[ɪnˈtɛns]",
        "hangul_pronunciation": "[인텐스]",
        "sample_sentence": "The heat was intense during the summer.",
        "korean_sentence": "여름 동안의 열기는 강렬했습니다."
    },
    {
        "korean": "관습, 관례, 총회, 협의회, 협정",
        "english": "convention",
        "pronunciation": "[kənˈvɛnʃən]",
        "hangul_pronunciation": "[컨벤션]",
        "sample_sentence": "The convention was attended by thousands of people.",
        "korean_sentence": "그 총회에는 수천 명의 사람들이 참석했습니다."
    },
    {
        "korean": "독특한, 뚜렷이 다른",
        "english": "distinct",
        "pronunciation": "[dɪˈstɪŋkt]",
        "hangul_pronunciation": "[디스팅트]",
        "sample_sentence": "The two species are distinct from each other.",
        "korean_sentence": "그 두 종은 서로 뚜렷이 다릅니다."
    },
    {
        "korean": "잘 알려지지 않은, 무명의, 모호한; 보기 어렵게 하다",
        "english": "obscure",
        "pronunciation": "[əbˈskjʊr]",
        "hangul_pronunciation": "[업스큐어]",
        "sample_sentence": "The origins of the tradition are obscure.",
        "korean_sentence": "그 전통의 기원은 잘 알려져 있지 않습니다."
    },
    {
        "korean": "나타내다, 표현하다; 분명한",
        "english": "manifest",
        "pronunciation": "[ˈmænəˌfɛst]",
        "hangul_pronunciation": "[매니페스트]",
        "sample_sentence": "His fear was manifest in his eyes.",
        "korean_sentence": "그의 두려움은 그의 눈에 분명하게 나타나 있었다."
    },
    {
        "korean": "논쟁하다, 반박하다; 분쟁, 논쟁",
        "english": "dispute",
        "pronunciation": "[dɪˈspjut]",
        "hangul_pronunciation": "[디스퓨트]",
        "sample_sentence": "They disputed the results of the election.",
        "korean_sentence": "그들은 선거 결과에 대해 논쟁했다."
    },
    {
        "korean": "비롯되다, 유래하다",
        "english": "originate",
        "pronunciation": "[əˈrɪdʒɪˌneɪt]",
        "hangul_pronunciation": "[오리지네이트]",
        "sample_sentence": "The practice originated in the 19th century.",
        "korean_sentence": "그 관습은 19세기에 비롯되었다."
    },
    {
        "korean": "영원한, 끊임없는",
        "english": "eternal",
        "pronunciation": "[ɪˈtɜrnəl]",
        "hangul_pronunciation": "[이터널]",
        "sample_sentence": "They pledged their eternal love for each other.",
        "korean_sentence": "그들은 서로에게 영원한 사랑을 맹세했다."
    },
    {
        "korean": "집중, 몰두, 전념, 헌신",
        "english": "devotion",
        "pronunciation": "[dɪˈvoʊʃən]",
        "hangul_pronunciation": "[디보션]",
        "sample_sentence": "Her devotion to her work was admirable.",
        "korean_sentence": "그녀의 일에 대한 헌신은 존경스러웠다."
    },
    {
        "korean": "수단, 방법, 재산",
        "english": "means",
        "pronunciation": "[minz]",
        "hangul_pronunciation": "[민즈]",
        "sample_sentence": "They had the means to achieve their goals.",
        "korean_sentence": "그들은 목표를 달성할 수단을 가지고 있었다."
    },
    {
        "korean": "주장하다, 다투다",
        "english": "contend",
        "pronunciation": "[kənˈtɛnd]",
        "hangul_pronunciation": "[컨텐드]",
        "sample_sentence": "He contended that the policy was wrong.",
        "korean_sentence": "그는 그 정책이 잘못되었다고 주장했다."
    },
    {
        "korean": "압도적인, 부담스러운",
        "english": "overwhelming",
        "pronunciation": "[ˌoʊvərˈwɛlmɪŋ]",
        "hangul_pronunciation": "[오버웰밍]",
        "sample_sentence": "The response to the campaign was overwhelming.",
        "korean_sentence": "캠페인에 대한 반응은 압도적이었다."
    },
    {
        "korean": "인정하다, 고백하다",
        "english": "confess",
        "pronunciation": "[kənˈfɛs]",
        "hangul_pronunciation": "[컨페스]",
        "sample_sentence": "She confessed her love for him.",
        "korean_sentence": "그녀는 그에게 사랑을 고백했다."
    },
    {
        "korean": "굉장한, 분명한, 완전한",
        "english": "resounding",
        "pronunciation": "[rɪˈzaʊndɪŋ]",
        "hangul_pronunciation": "[리자운딩]",
        "sample_sentence": "The proposal was met with resounding approval.",
        "korean_sentence": "그 제안은 굉장한 승인으로 받아들여졌다."
    },
    {
        "korean": "시설, 설비",
        "english": "facility",
        "pronunciation": "[fəˈsɪləti]",
        "hangul_pronunciation": "[퍼실리티]",
        "sample_sentence": "The new sports facility is impressive.",
        "korean_sentence": "새로운 스포츠 시설은 인상적이다."
    },
    {
        "korean": "발생하다, 일어나다",
        "english": "arise",
        "pronunciation": "[əˈraɪz]",
        "hangul_pronunciation": "[어라이즈]",
        "sample_sentence": "Problems arose during the project.",
        "korean_sentence": "프로젝트 진행 중에 문제가 발생했다."
    },
    {
        "korean": "시작하다, 시작되다",
        "english": "commence",
        "pronunciation": "[kəˈmɛns]",
        "hangul_pronunciation": "[커멘스]",
        "sample_sentence": "The meeting will commence at 10 AM.",
        "korean_sentence": "회의는 오전 10시에 시작될 것이다."
    },
    {
        "korean": "비영리적인; 비영리 단체",
        "english": "nonprofit",
        "pronunciation": "[ˌnɑnˈprɑfɪt]",
        "hangul_pronunciation": "[난프라핏]",
        "sample_sentence": "She works for a nonprofit organization.",
        "korean_sentence": "그녀는 비영리 단체에서 일한다."
    },
    {
        "korean": "되살리다, 새로운 활력을 주다",
        "english": "revitalize",
        "pronunciation": "[ˌriˈvaɪtəˌlaɪz]",
        "hangul_pronunciation": "[리바이털라이즈]",
        "sample_sentence": "The project aims to revitalize the downtown area.",
        "korean_sentence": "그 프로젝트는 도심 지역을 되살리는 것을 목표로 한다."
    },
    {
        "korean": "직관적인",
        "english": "intuitive",
        "pronunciation": "[ɪnˈtuɪtɪv]",
        "hangul_pronunciation": "[인투이티브]",
        "sample_sentence": "Her intuitive understanding of the problem was remarkable.",
        "korean_sentence": "그 문제에 대한 그녀의 직관적인 이해는 놀라웠다."
    },
    {
        "korean": "(방향을 다른 데로) 돌리다",
        "english": "divert",
        "pronunciation": "[daɪˈvɜrt]",
        "hangul_pronunciation": "[다이벌트]",
        "sample_sentence": "They planned to divert the river to prevent flooding.",
        "korean_sentence": "그들은 홍수를 막기 위해 강의 흐름을 돌릴 계획이었다."
    },
    {
        "korean": "포괄적인, 포용적인",
        "english": "inclusive",
        "pronunciation": "[ɪnˈklusɪv]",
        "hangul_pronunciation": "[인클루시브]",
        "sample_sentence": "The policy is inclusive of all members of society.",
        "korean_sentence": "그 정책은 사회의 모든 구성원을 포괄하고 있다."
    },
    {
        "korean": "수행하다, 시행하다",
        "english": "enact",
        "pronunciation": "[ɪˈnækt]",
        "hangul_pronunciation": "[이낵트]",
        "sample_sentence": "The government plans to enact new laws.",
        "korean_sentence": "정부는 새로운 법을 시행할 계획이다."
    },
    {
        "korean": "주장하다, 단언하다",
        "english": "assert",
        "pronunciation": "[əˈsɜrt]",
        "hangul_pronunciation": "[어설트]",
        "sample_sentence": "He asserted his innocence.",
        "korean_sentence": "그는 자신의 무죄를 주장했다."
    },
    {
        "korean": "활성화하다",
        "english": "activate",
        "pronunciation": "[ˈæktəˌveɪt]",
        "hangul_pronunciation": "[액티베이트]",
        "sample_sentence": "The device is activated by a switch.",
        "korean_sentence": "그 장치는 스위치로 활성화된다."
    },
    {
        "korean": "문제점, 결함, 결점",
        "english": "drawback",
        "pronunciation": "[ˈdrɔˌbæk]",
        "hangul_pronunciation": "[드로우백]",
        "sample_sentence": "The main drawback of the plan is its cost.",
        "korean_sentence": "그 계획의 주요 문제점은 비용이다."
    },
    {
        "korean": "화합물",
        "english": "compound",
        "pronunciation": "[ˈkɒmpaʊnd]",
        "hangul_pronunciation": "[컴파운드]",
        "sample_sentence": "Water is a compound of hydrogen and oxygen.",
        "korean_sentence": "물은 수소와 산소의 화합물이다."
    },
    {
        "korean": "잘못 전하다, 잘못된 정보를 주다",
        "english": "misinform",
        "pronunciation": "[ˌmɪsɪnˈfɔrm]",
        "hangul_pronunciation": "[미스인폼]",
        "sample_sentence": "The public was misinformed about the risks.",
        "korean_sentence": "대중은 위험에 대해 잘못된 정보를 받았다."
    },
    {
        "korean": "환원될 수 있는, 축소될 수 있는",
        "english": "reducible",
        "pronunciation": "[rɪˈdusəbl]",
        "hangul_pronunciation": "[리두서블]",
        "sample_sentence": "The problem is reducible to a single equation.",
        "korean_sentence": "문제는 하나의 방정식으로 환원될 수 있다."
    },
    {
        "korean": "의도",
        "english": "intent",
        "pronunciation": "[ɪnˈtɛnt]",
        "hangul_pronunciation": "[인텐트]",
        "sample_sentence": "His intent is to improve efficiency.",
        "korean_sentence": "그의 의도는 효율성을 높이는 것이다."
    },
    {
        "korean": "반향을 일으키는, 깊이 울리는",
        "english": "resonant",
        "pronunciation": "[ˈrɛzənənt]",
        "hangul_pronunciation": "[레저넌트]",
        "sample_sentence": "His voice was deep and resonant.",
        "korean_sentence": "그의 목소리는 깊고 반향이 있었다."
    },
    {
        "korean": "얕은",
        "english": "shallow",
        "pronunciation": "[ˈʃæloʊ]",
        "hangul_pronunciation": "[쉘로우]",
        "sample_sentence": "The water here is very shallow.",
        "korean_sentence": "이곳의 물은 매우 얕다."
    },
    {
        "korean": "명제적인, 명제의, 제안의",
        "english": "propositional",
        "pronunciation": "[ˌprɒpəˈzɪʃənəl]",
        "hangul_pronunciation": "[프로포지셔널]",
        "sample_sentence": "The argument was based on propositional logic.",
        "korean_sentence": "그 주장은 명제 논리에 기초하고 있었다."
    },
    {
        "korean": "찌르다; 찌르는 듯한 통증, 찌르기",
        "english": "stab",
        "pronunciation": "[stæb]",
        "hangul_pronunciation": "[스탭]",
        "sample_sentence": "He was stabbed in the back.",
        "korean_sentence": "그는 등에 찔렸다."
    },
    {
        "korean": "관련(성)이 없는, 무관한",
        "english": "irrelevant",
        "pronunciation": "[ɪˈrɛləvənt]",
        "hangul_pronunciation": "[이렐러번트]",
        "sample_sentence": "The question was irrelevant to the topic.",
        "korean_sentence": "그 질문은 주제와 무관했다."
    },
    {
        "korean": "의상, 복장",
        "english": "costume",
        "pronunciation": "[ˈkɑstum]",
        "hangul_pronunciation": "[코스튬]",
        "sample_sentence": "She wore a witch costume for Halloween.",
        "korean_sentence": "그녀는 할로윈을 위해 마녀 의상을 입었다."
    },
    {
        "korean": "복사(선), 방사(선)",
        "english": "radiation",
        "pronunciation": "[ˌreɪdiˈeɪʃən]",
        "hangul_pronunciation": "[레이디에이션]",
        "sample_sentence": "Radiation therapy is used to treat cancer.",
        "korean_sentence": "방사선 치료는 암 치료에 사용된다."
    },
    {
        "korean": "장기, 오르간",
        "english": "organ",
        "pronunciation": "[ˈɔrɡən]",
        "hangul_pronunciation": "[오르간]",
        "sample_sentence": "The heart is a vital organ.",
        "korean_sentence": "심장은 중요한 장기이다."
    },
    {
        "korean": "엮다, 밀접하게 관련되다",
        "english": "intertwine",
        "pronunciation": "[ˌɪntərˈtwaɪn]",
        "hangul_pronunciation": "[인터트와인]",
        "sample_sentence": "Their lives intertwined in unexpected ways.",
        "korean_sentence": "그들의 삶은 예상치 못한 방식으로 밀접하게 얽혔다."
    },
    {
        "korean": "구두점, 구두법",
        "english": "punctuation",
        "pronunciation": "[ˌpʌŋktʃuˈeɪʃən]",
        "hangul_pronunciation": "[펑추에이션]",
        "sample_sentence": "Proper punctuation is important in writing.",
        "korean_sentence": "올바른 구두법은 글쓰기에서 중요하다."
    },
    {
        "korean": "모으다, 무리를 이루다; 무리, 송이",
        "english": "cluster",
        "pronunciation": "[ˈklʌstər]",
        "hangul_pronunciation": "[클러스터]",
        "sample_sentence": "The grapes were in a large cluster.",
        "korean_sentence": "포도는 큰 송이로 있었다."
    },
    {
        "korean": "상호 작용",
        "english": "interplay",
        "pronunciation": "[ˈɪntərˌpleɪ]",
        "hangul_pronunciation": "[인터플레이]",
        "sample_sentence": "There is a complex interplay between genes and environment.",
        "korean_sentence": "유전자와 환경 사이에는 복잡한 상호 작용이 있다."
    },
    {
        "korean": "제공하다, (가구를) 비치하다",
        "english": "furnish",
        "pronunciation": "[ˈfɜrnɪʃ]",
        "hangul_pronunciation": "[퍼니쉬]",
        "sample_sentence": "They furnished the house with modern furniture.",
        "korean_sentence": "그들은 집을 현대적인 가구로 비치했다."
    },
    {
        "korean": "대피, 피난",
        "english": "evacuation",
        "pronunciation": "[ɪˌvækjuˈeɪʃən]",
        "hangul_pronunciation": "[이배큐에이션]",
        "sample_sentence": "The evacuation of the building was orderly.",
        "korean_sentence": "건물의 대피는 질서 정연했다."
    },
    {
        "korean": "확실한, 명확한",
        "english": "definite",
        "pronunciation": "[ˈdɛfɪnɪt]",
        "hangul_pronunciation": "[데피닛]",
        "sample_sentence": "We need a definite answer by tomorrow.",
        "korean_sentence": "우리는 내일까지 확실한 답변이 필요하다."
    },
    {
        "korean": "투명한",
        "english": "transparent",
        "pronunciation": "[trænsˈpɛrənt]",
        "hangul_pronunciation": "[트랜스패런트]",
        "sample_sentence": "The glass door is transparent.",
        "korean_sentence": "유리문은 투명하다."
    },
    {
        "korean": "출현, 도래",
        "english": "advent",
        "pronunciation": "[ˈædvɛnt]",
        "hangul_pronunciation": "[애드벤트]",
        "sample_sentence": "The advent of spring brings warmer weather.",
        "korean_sentence": "봄의 도래는 따뜻한 날씨를 가져온다."
    },
    {
        "korean": "미덕, 장점",
        "english": "virtue",
        "pronunciation": "[ˈvɜrtʃu]",
        "hangul_pronunciation": "[버츄]",
        "sample_sentence": "Patience is a virtue.",
        "korean_sentence": "인내는 미덕이다."
    },
    {
        "korean": "~의 탓으로 돌리다, ~에 속하는 것으로 생각하다",
        "english": "ascribe",
        "pronunciation": "[əˈskraɪb]",
        "hangul_pronunciation": "[어스크라이브]",
        "sample_sentence": "They ascribe his success to hard work.",
        "korean_sentence": "그들은 그의 성공을 노력의 탓으로 돌린다."
    },
    {
        "korean": "확대되다, 악화되다",
        "english": "escalate",
        "pronunciation": "[ˈɛskəˌleɪt]",
        "hangul_pronunciation": "[에스컬레이트]",
        "sample_sentence": "The conflict could escalate into a major war.",
        "korean_sentence": "갈등은 대규모 전쟁으로 확대될 수 있다."
    },
    {
        "korean": "격동적인, 격동의, 사나운",
        "english": "turbulent",
        "pronunciation": "[ˈtɜrbjələnt]",
        "hangul_pronunciation": "[터뷸런트]",
        "sample_sentence": "The plane encountered turbulent weather.",
        "korean_sentence": "비행기는 사나운 날씨를 만났다."
    },
    {
        "korean": "결정화",
        "english": "crystallization",
        "pronunciation": "[ˌkrɪstəlaɪˈzeɪʃən]",
        "hangul_pronunciation": "[크리스털라이제이션]",
        "sample_sentence": "The crystallization of the solution took several hours.",
        "korean_sentence": "용액의 결정화는 몇 시간이 걸렸다."
    },
    {
        "korean": "잘 알려진, 유명한",
        "english": "renowned",
        "pronunciation": "[rɪˈnaʊnd]",
        "hangul_pronunciation": "[리나운드]",
        "sample_sentence": "The artist is renowned for her sculptures.",
        "korean_sentence": "그 예술가는 그녀의 조각 작품들로 유명하다."
    },
    {
        "korean": "무심코 드러내다, 배신하다",
        "english": "betray",
        "pronunciation": "[bɪˈtreɪ]",
        "hangul_pronunciation": "[비트레이]",
        "sample_sentence": "She felt he betrayed her trust.",
        "korean_sentence": "그녀는 그가 자신의 신뢰를 배신했다고 느꼈다."
    },
    {
        "korean": "공명이 잘되다, 마음을 울리다",
        "english": "resonate",
        "pronunciation": "[ˈrɛzəˌneɪt]",
        "hangul_pronunciation": "[레저네이트]",
        "sample_sentence": "Her voice resonated through the hall.",
        "korean_sentence": "그녀의 목소리는 홀 전체에 울려 퍼졌다."
    },
    {
        "korean": "예측하는 지표[변수]",
        "english": "predictor",
        "pronunciation": "[prɪˈdɪktər]",
        "hangul_pronunciation": "[프리딕터]",
        "sample_sentence": "Economic indicators are predictors of market trends.",
        "korean_sentence": "경제 지표들은 시장 동향을 예측하는 지표들이다."
    },
    {
        "korean": "이끌다, 조종하다",
        "english": "steer",
        "pronunciation": "[stɪr]",
        "hangul_pronunciation": "[스티어]",
        "sample_sentence": "He steered the conversation towards politics.",
        "korean_sentence": "그는 대화를 정치로 이끌었다."
    },
    {
        "korean": "수가 더 많다, 수적으로 우세하다",
        "english": "outnumber",
        "pronunciation": "[aʊtˈnʌmbər]",
        "hangul_pronunciation": "[아웃넘버]",
        "sample_sentence": "In our team, the women outnumber the men.",
        "korean_sentence": "우리 팀에서는 여성이 남성보다 많다."
    },
    {
        "korean": "정도, 규모, 크기",
        "english": "magnitude",
        "pronunciation": "[ˈmæɡnɪˌtud]",
        "hangul_pronunciation": "[매그니튜드]",
        "sample_sentence": "The earthquake was of great magnitude.",
        "korean_sentence": "그 지진은 큰 규모였다."
    },
    {
        "korean": "동정심, 연민",
        "english": "compassion",
        "pronunciation": "[kəmˈpæʃən]",
        "hangul_pronunciation": "[컴패션]",
        "sample_sentence": "She showed compassion to the homeless man.",
        "korean_sentence": "그녀는 노숙자에게 동정심을 보였다."
    },
    {
        "korean": "잘못된, 오도하는, 오해의 소지가 있는",
        "english": "misleading",
        "pronunciation": "[mɪsˈlidɪŋ]",
        "hangul_pronunciation": "[미스리딩]",
        "sample_sentence": "The advertisement was misleading.",
        "korean_sentence": "그 광고는 오도하고 있었다."
    },
    {
        "korean": "(자주) 나타나다, 출몰하다, 자주 방문하다",
        "english": "haunt",
        "pronunciation": "[hɔnt]",
        "hangul_pronunciation": "[헌트]",
        "sample_sentence": "The ghost is said to haunt this house.",
        "korean_sentence": "그 유령은 이 집에 출몰한다고 한다."
    },
    {
        "korean": "만연한, 널리 퍼져 있는",
        "english": "prevalent",
        "pronunciation": "[ˈprɛvələnt]",
        "hangul_pronunciation": "[프레벌런트]",
        "sample_sentence": "This belief is prevalent among teenagers.",
        "korean_sentence": "이 믿음은 십대들 사이에 널리 퍼져 있다."
    },
    {
        "korean": "지속되다, 계속되다",
        "english": "persist",
        "pronunciation": "[pərˈsɪst]",
        "hangul_pronunciation": "[퍼시스트]",
        "sample_sentence": "If symptoms persist, consult a doctor.",
        "korean_sentence": "증상이 지속되면 의사와 상담하세요."
    },
    {
        "korean": "의류, 옷, 의복",
        "english": "garment",
        "pronunciation": "[ˈɡɑrmənt]",
        "hangul_pronunciation": "[가먼트]",
        "sample_sentence": "She wore a beautiful silk garment.",
        "korean_sentence": "그녀는 아름다운 실크 옷을 입었다."
    },
    {
        "korean": "유지하다, 떠받치다",
        "english": "uphold",
        "pronunciation": "[ʌpˈhoʊld]",
        "hangul_pronunciation": "[업홀드]",
        "sample_sentence": "They uphold traditional values.",
        "korean_sentence": "그들은 전통적인 가치를 유지한다."
    },
    {
        "korean": "투명성",
        "english": "transparency",
        "pronunciation": "[trænsˈpɛrənsi]",
        "hangul_pronunciation": "[트랜스패런시]",
        "sample_sentence": "The company strives for transparency in its operations.",
        "korean_sentence": "회사는 운영의 투명성을 위해 노력한다."
    },
    {
        "korean": "실용적인, 실용주의적인",
        "english": "pragmatic",
        "pronunciation": "[præɡˈmætɪk]",
        "hangul_pronunciation": "[프래그매틱]",
        "sample_sentence": "He took a pragmatic approach to solving the problem.",
        "korean_sentence": "그는 문제를 해결하는 데 실용적인 접근법을 택했다."
    },
    {
        "korean": "정교함, 세련됨",
        "english": "sophistication",
        "pronunciation": "[səˌfɪstɪˈkeɪʃən]",
        "hangul_pronunciation": "[서피스티케이션]",
        "sample_sentence": "The device's sophistication impressed everyone.",
        "korean_sentence": "기기의 정교함이 모두를 놀라게 했다."
    },
    {
        "korean": "포함하다, 둘러싸다",
        "english": "encompass",
        "pronunciation": "[ɪnˈkʌmpəs]",
        "hangul_pronunciation": "[인컴퍼스]",
        "sample_sentence": "The festival will encompass a wide range of activities.",
        "korean_sentence": "축제는 다양한 활동을 포함할 것이다."
    },
    {
        "korean": "걸리게 하다, 얽어매다",
        "english": "entangle",
        "pronunciation": "[ɪnˈtæŋɡəl]",
        "hangul_pronunciation": "[인탱글]",
        "sample_sentence": "The fish got entangled in the net.",
        "korean_sentence": "물고기가 그물에 걸렸다."
    },
    {
        "korean": "거대한, 대규모의",
        "english": "massive",
        "pronunciation": "[ˈmæsɪv]",
        "hangul_pronunciation": "[매시브]",
        "sample_sentence": "The construction of the bridge required massive amounts of steel.",
        "korean_sentence": "다리 건설에는 거대한 양의 철강이 필요했다."
    },
    {
        "korean": "주변적인, 지엽적인",
        "english": "peripheral",
        "pronunciation": "[pəˈrɪfərəl]",
        "hangul_pronunciation": "[퍼리퍼럴]",
        "sample_sentence": "The information was peripheral to the main discussion.",
        "korean_sentence": "그 정보는 주요 논의와는 지엽적인 것이었다."
    },
    {
        "korean": "양립할 수 있는, 화합할 수 있는",
        "english": "compatible",
        "pronunciation": "[kəmˈpætɪbəl]",
        "hangul_pronunciation": "[컴패터블]",
        "sample_sentence": "The new software is compatible with all major operating systems.",
        "korean_sentence": "새 소프트웨어는 모든 주요 운영 체제와 호환된다."
    },
    {
        "korean": "보류하다, 허락하지 않다, 억제하다",
        "english": "withhold",
        "pronunciation": "[wɪðˈhoʊld]",
        "hangul_pronunciation": "[위드홀드]",
        "sample_sentence": "The company decided to withhold the bonus payments.",
        "korean_sentence": "회사는 보너스 지급을 보류하기로 결정했다."
    },
    {
        "korean": "보증하다, 정당화하다",
        "english": "warrant",
        "pronunciation": "[ˈwɔrənt]",
        "hangul_pronunciation": "[워런트]",
        "sample_sentence": "The situation does not warrant such drastic measures.",
        "korean_sentence": "상황이 그런 극단적인 조치를 정당화하지는 않는다."
    },
    {
        "korean": "황무지, 황야",
        "english": "wilderness",
        "pronunciation": "[ˈwɪldərnəs]",
        "hangul_pronunciation": "[윌더니스]",
        "sample_sentence": "They went on an adventure into the wilderness.",
        "korean_sentence": "그들은 황야로 모험을 떠났다."
    },
    {
        "korean": "스미게 하다, 불어넣다",
        "english": "infuse",
        "pronunciation": "[ɪnˈfjuz]",
        "hangul_pronunciation": "[인퓨즈]",
        "sample_sentence": "She tried to infuse new energy into the team.",
        "korean_sentence": "그녀는 팀에 새로운 에너지를 불어넣으려 노력했다."
    },
    {
        "korean": "고수하다, 지키다, 들러붙다 (to)",
        "english": "adhere",
        "pronunciation": "[ədˈhɪr]",
        "hangul_pronunciation": "[애드히어]",
        "sample_sentence": "It's important to adhere to the rules.",
        "korean_sentence": "규칙을 지키는 것이 중요하다."
    },
    {
        "korean": "육식 동물",
        "english": "carnivore",
        "pronunciation": "[ˈkɑrnɪˌvɔr]",
        "hangul_pronunciation": "[카니보어]",
        "sample_sentence": "Lions and tigers are carnivores.",
        "korean_sentence": "사자와 호랑이는 육식 동물이다."
    },
    {
        "korean": "중개, 조정, 매개",
        "english": "mediation",
        "pronunciation": "[ˌmidiˈeɪʃən]",
        "hangul_pronunciation": "[미디에이션]",
        "sample_sentence": "The conflict was resolved through mediation.",
        "korean_sentence": "갈등은 중재를 통해 해결되었다."
    },
    {
        "korean": "균일함, 획일(성)",
        "english": "uniformity",
        "pronunciation": "[ˌjunəˈfɔrmɪti]",
        "hangul_pronunciation": "[유니포미티]",
        "sample_sentence": "The uniformity of the products ensured quality.",
        "korean_sentence": "제품의 균일함이 품질을 보장했다."
    },
    {
        "korean": "미적인, 미학적인",
        "english": "aesthetic",
        "pronunciation": "[ɛsˈθɛtɪk]",
        "hangul_pronunciation": "[에스테틱]",
        "sample_sentence": "The design has great aesthetic value.",
        "korean_sentence": "그 디자인은 미적인 가치가 크다."
    },
    {
        "korean": "처분하다",
        "english": "dispose",
        "pronunciation": "[dɪˈspoʊz]",
        "hangul_pronunciation": "[디스포즈]",
        "sample_sentence": "Please dispose of the trash properly.",
        "korean_sentence": "쓰레기를 제대로 처분하세요."
    },
    {
        "korean": "오염, 더러움",
        "english": "contamination",
        "pronunciation": "[kənˌtæmɪˈneɪʃən]",
        "hangul_pronunciation": "[컨태미네이션]",
        "sample_sentence": "The water contamination is a serious issue.",
        "korean_sentence": "물 오염은 심각한 문제입니다."
    },
    {
        "korean": "강렬한, 활기찬",
        "english": "vibrant",
        "pronunciation": "[ˈvaɪbrənt]",
        "hangul_pronunciation": "[바이브런트]",
        "sample_sentence": "The city is known for its vibrant nightlife.",
        "korean_sentence": "그 도시는 활기찬 야경으로 유명하다."
    },
    {
        "korean": "각성제, 자극제",
        "english": "stimulant",
        "pronunciation": "[ˈstɪmjələnt]",
        "hangul_pronunciation": "[스티뮬런트]",
        "sample_sentence": "Caffeine is a common stimulant.",
        "korean_sentence": "카페인은 흔한 각성제입니다."
    },
    {
        "korean": "안심, 안도(감), 확신",
        "english": "reassurance",
        "pronunciation": "[ˌriəˈʃʊrəns]",
        "hangul_pronunciation": "[리어슈어런스]",
        "sample_sentence": "She gave me reassurance that everything was fine.",
        "korean_sentence": "그녀는 모든 것이 괜찮다고 나를 안심시켰다."
    },
    {
        "korean": "발효시키다, 발효되다",
        "english": "ferment",
        "pronunciation": "[fərˈmɛnt]",
        "hangul_pronunciation": "[퍼멘트]",
        "sample_sentence": "The grapes will ferment and turn into wine.",
        "korean_sentence": "포도는 발효되어 와인이 될 것이다."
    },
    {
        "korean": "자극하다, 짜증 나게 하다",
        "english": "irritate",
        "pronunciation": "[ˈɪrɪˌteɪt]",
        "hangul_pronunciation": "[이리테이트]",
        "sample_sentence": "His constant complaints irritate me.",
        "korean_sentence": "그의 끊임없는 불평이 나를 짜증 나게 한다."
    },
    {
        "korean": "입장(료)",
        "english": "admission",
        "pronunciation": "[ədˈmɪʃən]",
        "hangul_pronunciation": "[어드미션]",
        "sample_sentence": "The museum admission is free on Sundays.",
        "korean_sentence": "박물관 입장은 일요일에 무료입니다."
    },
    {
        "korean": "민감한, 여린, 연약한",
        "english": "delicate",
        "pronunciation": "[ˈdɛlɪkət]",
        "hangul_pronunciation": "[델리컷]",
        "sample_sentence": "Handle the delicate flowers with care.",
        "korean_sentence": "여린 꽃들을 조심히 다루세요."
    },
    {
        "korean": "우수한, 뛰어난",
        "english": "outstanding",
        "pronunciation": "[aʊtˈstændɪŋ]",
        "hangul_pronunciation": "[아웃스탠딩]",
        "sample_sentence": "She received an award for her outstanding performance.",
        "korean_sentence": "그녀는 뛰어난 공연으로 상을 받았다."
    },
    {
        "korean": "기념품",
        "english": "souvenir",
        "pronunciation": "[ˌsuːvəˈnɪr]",
        "hangul_pronunciation": "[수버니어]",
        "sample_sentence": "I bought a souvenir from my trip to Paris.",
        "korean_sentence": "나는 파리 여행에서 기념품을 샀다."
    },
    {
        "korean": "지원(서), 신청(서), 응용, 응용 프로그램",
        "english": "application",
        "pronunciation": "[ˌæplɪˈkeɪʃən]",
        "hangul_pronunciation": "[애플리케이션]",
        "sample_sentence": "Please fill out this application form.",
        "korean_sentence": "이 지원서를 작성해 주세요."
    },
    {
        "korean": "불편(함)",
        "english": "inconvenience",
        "pronunciation": "[ˌɪnkənˈviːnjəns]",
        "hangul_pronunciation": "[인컨비니언스]",
        "sample_sentence": "I apologize for any inconvenience caused.",
        "korean_sentence": "불편을 끼쳐 드려 죄송합니다."
    },
    {
        "korean": "등록하다",
        "english": "enroll",
        "pronunciation": "[ɪnˈroʊl]",
        "hangul_pronunciation": "[인롤]",
        "sample_sentence": "You need to enroll in the course by the end of the week.",
        "korean_sentence": "이번 주말까지 코스에 등록해야 합니다."
    },
    {
        "korean": "계량하다, 측정하다, 조치, 척도",
        "english": "measure",
        "pronunciation": "[ˈmɛʒər]",
        "hangul_pronunciation": "[메저]",
        "sample_sentence": "We need to measure the room before buying furniture.",
        "korean_sentence": "가구를 사기 전에 방의 크기를 측정해야 합니다."
    },
    {
        "korean": "감사, 고마움",
        "english": "gratitude",
        "pronunciation": "[ˈɡrætɪˌtud]",
        "hangul_pronunciation": "[그래티튜드]",
        "sample_sentence": "She expressed her gratitude for the help.",
        "korean_sentence": "그녀는 도움에 대한 감사를 표현했다."
    },
    {
        "korean": "자선 단체, 자선 행위",
        "english": "charity",
        "pronunciation": "[ˈʧærɪti]",
        "hangul_pronunciation": "[채러티]",
        "sample_sentence": "They donated a lot of money to charity.",
        "korean_sentence": "그들은 자선 단체에 많은 돈을 기부했다."
    },
    {
        "korean": "출판하다, 출간하다",
        "english": "publish",
        "pronunciation": "[ˈpʌblɪʃ]",
        "hangul_pronunciation": "[퍼블리쉬]",
        "sample_sentence": "The author will publish her new book next month.",
        "korean_sentence": "그 작가는 다음 달에 새 책을 출간할 것이다."
    },
    {
        "korean": "원고",
        "english": "manuscript",
        "pronunciation": "[ˈmænjəˌskrɪpt]",
        "hangul_pronunciation": "[매뉴스크립트]",
        "sample_sentence": "The editor reviewed the manuscript carefully.",
        "korean_sentence": "편집자는 원고를 신중하게 검토했다."
    },
    {
        "korean": "자서전",
        "english": "autobiography",
        "pronunciation": "[ˌɔːtəʊbaɪˈɒɡrəfi]",
        "hangul_pronunciation": "[오토바이오그래피]",
        "sample_sentence": "He wrote an autobiography about his life.",
        "korean_sentence": "그는 자신의 삶에 대한 자서전을 썼다."
    },
    {
        "korean": "복합의, 합성의",
        "english": "composite",
        "pronunciation": "[kəmˈpɒzɪt]",
        "hangul_pronunciation": "[컴포지트]",
        "sample_sentence": "The building is made of composite materials.",
        "korean_sentence": "그 건물은 합성 재료로 만들어졌다."
    },
    {
        "korean": "확인하다",
        "english": "confirm",
        "pronunciation": "[kənˈfɜːrm]",
        "hangul_pronunciation": "[컨펌]",
        "sample_sentence": "Please confirm your attendance by email.",
        "korean_sentence": "이메일로 참석 여부를 확인해 주세요."
    },
    {
        "korean": "배송, 선적, 해운업",
        "english": "shipping",
        "pronunciation": "[ˈʃɪpɪŋ]",
        "hangul_pronunciation": "[쉬핑]",
        "sample_sentence": "The shipping cost is included in the price.",
        "korean_sentence": "배송비는 가격에 포함되어 있습니다."
    },
    {
        "korean": "(가격이) 적정한, 합리적인, 타당한",
        "english": "reasonable",
        "pronunciation": "[ˈriːzənəbl]",
        "hangul_pronunciation": "[리저너블]",
        "sample_sentence": "The hotel offers reasonable rates for families.",
        "korean_sentence": "그 호텔은 가족들에게 적정한 요금을 제공합니다."
    },
    {
        "korean": "(팔목·발목을) 삐다, 삠, 염좌",
        "english": "sprain",
        "pronunciation": "[spreɪn]",
        "hangul_pronunciation": "[스프레인]",
        "sample_sentence": "I sprained my ankle while running.",
        "korean_sentence": "뛰다가 발목을 삐었어요."
    },
    {
        "korean": "중세의",
        "english": "medieval",
        "pronunciation": "[ˌmɛdˈiːvl]",
        "hangul_pronunciation": "[메디이벌]",
        "sample_sentence": "We visited a medieval castle during our trip.",
        "korean_sentence": "여행 중에 중세 성을 방문했습니다."
    },
    {
        "korean": "유지 보수, 정비, 보존",
        "english": "maintenance",
        "pronunciation": "[ˈmeɪntənəns]",
        "hangul_pronunciation": "[메인터넌스]",
        "sample_sentence": "The car requires regular maintenance.",
        "korean_sentence": "그 차는 정기적인 정비가 필요합니다."
    },
    {
        "korean": "광범위한",
        "english": "extensive",
        "pronunciation": "[ɪkˈstɛnsɪv]",
        "hangul_pronunciation": "[익스텐시브]",
        "sample_sentence": "The hurricane caused extensive damage.",
        "korean_sentence": "허리케인은 광범위한 피해를 일으켰다."
    },
    {
        "korean": "담아내다, 붙잡다, 포착하다, 사로잡다",
        "english": "capture",
        "pronunciation": "[ˈkæpʧər]",
        "hangul_pronunciation": "[캡처]",
        "sample_sentence": "The artist captured the beauty of the landscape.",
        "korean_sentence": "그 예술가는 풍경의 아름다움을 담아냈다."
    },
    {
        "korean": "전달하다, 실어 나르다",
        "english": "convey",
        "pronunciation": "[kənˈveɪ]",
        "hangul_pronunciation": "[컨베이]",
        "sample_sentence": "Please convey my best wishes to your family.",
        "korean_sentence": "가족에게 나의 안부를 전해 주세요."
    },
    {
        "korean": "만료되다, 끝나다, 숨을 내쉬다",
        "english": "expire",
        "pronunciation": "[ɪkˈspaɪər]",
        "hangul_pronunciation": "[익스파이어]",
        "sample_sentence": "My driver's license will expire next month.",
        "korean_sentence": "내 운전 면허증은 다음 달에 만료된다."
    },
    {
        "korean": "수업료, 학비",
        "english": "tuition",
        "pronunciation": "[tjuˈɪʃən]",
        "hangul_pronunciation": "[튜이션]",
        "sample_sentence": "The tuition fees have increased this year.",
        "korean_sentence": "올해 수업료가 올랐다."
    },
    {
        "korean": "시간이 있는, 구할 수 있는, 이용 가능한",
        "english": "available",
        "pronunciation": "[əˈveɪləbəl]",
        "hangul_pronunciation": "[어베일러블]",
        "sample_sentence": "The doctor is available on Wednesday afternoons.",
        "korean_sentence": "의사는 수요일 오후에 시간이 있습니다."
    },
    {
        "korean": "중급, 중간에 있는 것, 중급의, 중간의",
        "english": "intermediate",
        "pronunciation": "[ˌɪntərˈmiːdiət]",
        "hangul_pronunciation": "[인터미디어트]",
        "sample_sentence": "This course is for intermediate learners.",
        "korean_sentence": "이 과정은 중급 학습자를 위한 것입니다."
    },
    {
        "korean": "구매, 구입, 구매하다, 구입하다",
        "english": "purchase",
        "pronunciation": "[ˈpɜːrʧəs]",
        "hangul_pronunciation": "[퍼처스]",
        "sample_sentence": "I need to purchase a new laptop.",
        "korean_sentence": "나는 새 노트북을 구매해야 합니다."
    },
    {
        "korean": "습도, 습기",
        "english": "humidity",
        "pronunciation": "[hjuˈmɪdɪti]",
        "hangul_pronunciation": "[휴미디티]",
        "sample_sentence": "The humidity is very high today.",
        "korean_sentence": "오늘 습도가 매우 높습니다."
    },
    {
        "korean": "남아 있는",
        "english": "remaining",
        "pronunciation": "[rɪˈmeɪnɪŋ]",
        "hangul_pronunciation": "[리메이닝]",
        "sample_sentence": "The remaining tickets are sold out.",
        "korean_sentence": "남아 있는 티켓은 매진되었습니다."
    },
    {
        "korean": "외교관",
        "english": "diplomat",
        "pronunciation": "[ˈdɪpləˌmæt]",
        "hangul_pronunciation": "[디플로맷]",
        "sample_sentence": "He works as a diplomat in Germany.",
        "korean_sentence": "그는 독일에서 외교관으로 일하고 있습니다."
    },
    {
        "korean": "장담하다, 보장하다, 보증하는 것, 보증서",
        "english": "guarantee",
        "pronunciation": "[ˌɡærənˈtiː]",
        "hangul_pronunciation": "[개런티]",
        "sample_sentence": "This product comes with a one-year guarantee.",
        "korean_sentence": "이 제품은 1년 보증이 포함되어 있습니다."
    },
    {
        "korean": "우선순위를 두다, 우선시하다",
        "english": "prioritize",
        "pronunciation": "[praɪˈɔːrəˌtaɪz]",
        "hangul_pronunciation": "[프라이오리타이즈]",
        "sample_sentence": "You need to prioritize your tasks.",
        "korean_sentence": "당신은 할 일의 우선순위를 정해야 합니다."
    },
    {
        "korean": "방출, (빛·열·가스 등의) 배출, 배기가스",
        "english": "emission",
        "pronunciation": "[ɪˈmɪʃən]",
        "hangul_pronunciation": "[이미션]",
        "sample_sentence": "The factory is working to reduce emissions.",
        "korean_sentence": "그 공장은 배출을 줄이기 위해 노력하고 있습니다."
    },
    {
        "korean": "비판적인, (매우) 중요한",
        "english": "critical",
        "pronunciation": "[ˈkrɪtɪkəl]",
        "hangul_pronunciation": "[크리티컬]",
        "sample_sentence": "He played a critical role in the project.",
        "korean_sentence": "그는 프로젝트에서 중요한 역할을 했습니다."
    },
    {
        "korean": "믿을 만한, 신뢰할 수 있는",
        "english": "reliable",
        "pronunciation": "[rɪˈlaɪəbl]",
        "hangul_pronunciation": "[릴라이어블]",
        "sample_sentence": "She is known to be a reliable worker.",
        "korean_sentence": "그녀는 믿을 만한 직원으로 알려져 있습니다."
    },
    {
        "korean": "상징하다, 대표하다, 나타내다",
        "english": "represent",
        "pronunciation": "[ˌrɛprɪˈzɛnt]",
        "hangul_pronunciation": "[레프리젠트]",
        "sample_sentence": "This painting represents peace.",
        "korean_sentence": "이 그림은 평화를 상징합니다."
    },
    {
        "korean": "주민, 거주자",
        "english": "resident",
        "pronunciation": "[ˈrɛzɪdənt]",
        "hangul_pronunciation": "[레지던트]",
        "sample_sentence": "The residents of the town are very friendly.",
        "korean_sentence": "그 마을 주민들은 매우 친절합니다."
    },
    {
        "korean": "수많은",
        "english": "numerous",
        "pronunciation": "[ˈnuːmərəs]",
        "hangul_pronunciation": "[누머러스]",
        "sample_sentence": "He has visited numerous countries.",
        "korean_sentence": "그는 수많은 나라를 방문했습니다."
    },
    {
        "korean": "망설이는",
        "english": "hesitant",
        "pronunciation": "[ˈhɛzɪtənt]",
        "hangul_pronunciation": "[헤지턴트]",
        "sample_sentence": "She was hesitant to ask for help.",
        "korean_sentence": "그녀는 도움을 요청하는 데 망설였습니다."
    },
    {
        "korean": "추상적인, 끌어내다, 추출하다, 요약하다",
        "english": "abstract",
        "pronunciation": "[ˈæbstrækt]",
        "hangul_pronunciation": "[앱스트랙트]",
        "sample_sentence": "His ideas are very abstract.",
        "korean_sentence": "그의 아이디어는 매우 추상적입니다."
    },
    {
        "korean": "공감, 감정이입",
        "english": "empathy",
        "pronunciation": "[ˈɛmpəθi]",
        "hangul_pronunciation": "[엠퍼시]",
        "sample_sentence": "She felt empathy for the victims.",
        "korean_sentence": "그녀는 피해자들에게 공감을 느꼈습니다."
    },
    {
        "korean": "우회로, 돌아가는 길, 우회하다, 둘러 가다",
        "english": "detour",
        "pronunciation": "[ˈdiːtʊər]",
        "hangul_pronunciation": "[디투어]",
        "sample_sentence": "We had to take a detour due to the road construction.",
        "korean_sentence": "도로 공사로 인해 우리는 우회해야 했습니다."
    },
    {
        "korean": "확정 짓다, 최종적으로 결정하다, 완료하다",
        "english": "finalize",
        "pronunciation": "[ˈfaɪnəˌlaɪz]",
        "hangul_pronunciation": "[파이널라이즈]",
        "sample_sentence": "We need to finalize the schedule by tomorrow.",
        "korean_sentence": "우리는 내일까지 일정을 확정해야 합니다."
    },
    {
        "korean": "곡, 선율, 음을 맞추다, 채널을 맞추다",
        "english": "tune",
        "pronunciation": "[tuːn]",
        "hangul_pronunciation": "[튠]",
        "sample_sentence": "He played a beautiful tune on the piano.",
        "korean_sentence": "그는 피아노로 아름다운 선율을 연주했다."
    },
    {
        "korean": "전문성, 전문 지식",
        "english": "expertise",
        "pronunciation": "[ˌɛkspərˈtiːz]",
        "hangul_pronunciation": "[엑스퍼티즈]",
        "sample_sentence": "Her expertise in marketing is impressive.",
        "korean_sentence": "그녀의 마케팅 전문성은 인상적입니다."
    },
    {
        "korean": "취약한, 상처 입기 쉬운",
        "english": "vulnerable",
        "pronunciation": "[ˈvʌlnərəbl]",
        "hangul_pronunciation": "[벌너러블]",
        "sample_sentence": "The elderly are more vulnerable to the flu.",
        "korean_sentence": "노인들은 독감에 더 취약합니다."
    },
    {
        "korean": "가입하다, 구독하다",
        "english": "subscribe",
        "pronunciation": "[səbˈskraɪb]",
        "hangul_pronunciation": "[섭스크라이브]",
        "sample_sentence": "I subscribe to several magazines.",
        "korean_sentence": "나는 여러 잡지를 구독하고 있다."
    },
    {
        "korean": "(작은) 입자",
        "english": "particle",
        "pronunciation": "[ˈpɑrtɪkəl]",
        "hangul_pronunciation": "[파티클]",
        "sample_sentence": "Dust particles can cause allergies.",
        "korean_sentence": "먼지 입자는 알레르기를 유발할 수 있습니다."
    },
    {
        "korean": "별미, 진미, 섬세함, 연약함",
        "english": "delicacy",
        "pronunciation": "[ˈdɛlɪkəsi]",
        "hangul_pronunciation": "[델리커시]",
        "sample_sentence": "Caviar is considered a delicacy.",
        "korean_sentence": "캐비아는 별미로 여겨진다."
    },
    {
        "korean": "진동하다, 진동시키다",
        "english": "vibrate",
        "pronunciation": "[ˈvaɪbreɪt]",
        "hangul_pronunciation": "[바이브레이트]",
        "sample_sentence": "The phone vibrated on the table.",
        "korean_sentence": "전화기가 테이블 위에서 진동했다."
    },
    {
        "korean": "무료의, 서비스로 제공되는, 칭찬하는",
        "english": "complimentary",
        "pronunciation": "[ˌkɒmplɪˈmɛntəri]",
        "hangul_pronunciation": "[컴플리멘터리]",
        "sample_sentence": "The hotel offers complimentary breakfast.",
        "korean_sentence": "호텔은 무료 아침 식사를 제공합니다."
    },
    {
        "korean": "개량하다, 다듬다, 정제하다",
        "english": "refine",
        "pronunciation": "[rɪˈfaɪn]",
        "hangul_pronunciation": "[리파인]",
        "sample_sentence": "The artist refined his technique over the years.",
        "korean_sentence": "그 예술가는 수년간 그의 기술을 다듬었다."
    },
    {
        "korean": "만족",
        "english": "contentment",
        "pronunciation": "[kənˈtɛntmənt]",
        "hangul_pronunciation": "[컨텐트먼트]",
        "sample_sentence": "She found contentment in simple pleasures.",
        "korean_sentence": "그녀는 소소한 즐거움에서 만족을 찾았다."
    },
    {
        "korean": "지정된, 관선의",
        "english": "designated",
        "pronunciation": "[ˈdɛzɪɡˌneɪtɪd]",
        "hangul_pronunciation": "[데지그네이티드]",
        "sample_sentence": "This area is a designated smoking zone.",
        "korean_sentence": "이 지역은 지정된 흡연 구역입니다."
    },
    {
        "korean": "수분이 공급된, 수분을 유지한",
        "english": "hydrated",
        "pronunciation": "[ˈhaɪdreɪtɪd]",
        "hangul_pronunciation": "[하이드레이트]",
        "sample_sentence": "It's important to stay hydrated during exercise.",
        "korean_sentence": "운동 중에는 수분을 유지하는 것이 중요합니다."
    },
    {
        "korean": "항산화제, 산화 방지제",
        "english": "antioxidant",
        "pronunciation": "[ˌæntiˈɒksɪdənt]",
        "hangul_pronunciation": "[안티옥시던트]",
        "sample_sentence": "Berries are rich in antioxidants.",
        "korean_sentence": "베리류는 항산화제가 풍부하다."
    },


    // 여기에 나머지 단어를 추가하세요...
];

// 음성 옵션 설정
function getVoice(lang, name) {
    const voices = synth.getVoices();
    return voices.find(voice => voice.lang === lang && voice.name.includes(name));
}

function updateWord() {
    const word = words[currentWordIndex];
    document.getElementById('word-korean').innerText = word.korean;
    document.getElementById('word-english').innerText = word.english;
    document.getElementById('word-pronunciation').innerText = word.pronunciation;
    document.getElementById('word-hangul-pronunciation').innerText = word.hangul_pronunciation;
    document.getElementById('word-sample-sentence').innerText = word.sample_sentence;
    document.getElementById('word-korean-sentence').innerText = word.korean_sentence;
}

function pronounceWord(times, callback) {
    let count = 0;
    const word = words[currentWordIndex];
    const { korean, english, sample_sentence } = word;

    function speak() {
        if (count < times) {
            // 한국어 음성 설정
            const koreanUtterance = new SpeechSynthesisUtterance(korean);
            koreanUtterance.voice = getVoice('ko-KR', ''); // 한국어 음성 선택 (특정 이름으로 설정 가능)
            koreanUtterance.rate = 1;

            // 영국식 영어 음성 설정
            const englishUtterance = new SpeechSynthesisUtterance(english);
            englishUtterance.voice = getVoice('en-GB', ''); // 영국식 영어 음성 선택 (특정 이름으로 설정 가능)
            englishUtterance.rate = 1;

            // 샘플 문장 음성 설정
            const sampleSentenceUtterance = new SpeechSynthesisUtterance(sample_sentence);
            sampleSentenceUtterance.voice = getVoice('en-GB', ''); // 영국식 영어 음성 선택 (특정 이름으로 설정 가능)
            sampleSentenceUtterance.rate = 1;

            koreanUtterance.onend = () => {
                setTimeout(() => {
                    synth.speak(englishUtterance);
                }, 500);
            };

            englishUtterance.onend = () => {
                setTimeout(() => {
                    synth.speak(sampleSentenceUtterance);
                }, 500);
            };

            sampleSentenceUtterance.onend = () => {
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
    clearInterval(autoPlayInterval);
    synth.cancel();
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
    setTimeout(() => pronounceWord(1), 2000); // 2초 지연
}

function autoPlay() {
    stopPronouncing();

    async function playNextWord() {
        updateWord();
        await new Promise(resolve => pronounceWord(1, resolve)); // 음성 재생이 완료될 때까지 기다림
        currentWordIndex = (currentWordIndex + 1) % words.length;
    }

    playNextWord(); // 첫 단어를 즉시 재생

    autoPlayInterval = setInterval(async () => {
        await playNextWord(); // 15초 간격으로 다음 단어 재생
    }, 15000);
}

function showWordList() {
    const wordList = document.getElementById('word-list');
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>${word.korean}</strong><br>${word.english}<em><br>${word.pronunciation}</em><br>${word.hangul_pronunciation}<br><br>${word.sample_sentence}<br>${word.korean_sentence}<br><br>`;
        wordList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWord();
    showWordList(); // 페이지 로드 시 단어 목록 표시
    setTimeout(() => pronounceWord(1), 2000); // 페이지 로드 후 2초 지연

    // 음성 옵션 로드 대기
    setTimeout(() => {
        const voices = synth.getVoices();
        console.log('Available voices:', voices);
    }, 1000);
});