const words = [
    {
        "korean": "그의 행동은 / 테이블에 있던 대부분의 사람들을 / 움찔하게 만들었다.",
        "explanation": "1. 그의 행동은 (His actions) / 2. 테이블에 있던 대부분의 사람들을 (most at the table) / 3. 움찔하게 만들었다 (made flinch).",
        "english": "His actions made most at the table flinch. / (His behavior caused most people at the table to react with surprise.)",
        "key_words": ["made flinch", "움찔하게 만들었다"]
    },
    
    
    {
        "korean": "나는 / 그에게 / 전략을 짜라고 / 맡겼다.",
        "explanation": "1. 나는 (I) / 2. 그에게 (him) / 3. 전략을 짜라고 (to develop a strategy) / 4. 맡겼다 (tasked).",
        "english": "I tasked him to develop a strategy. / (I assigned him the task of creating a strategy.)",
        "key_words": ["tasked", "맡기다"]
    },
    {
        "korean": "뭔가 / 깊이 / 잘못되었다.",
        "explanation": "1. 뭔가 (Something) / 2. 깊이 (deeply) / 3. 잘못되었다 (amiss).",
        "english": "Something is deeply amiss. / (Something is seriously wrong.)",
        "key_words": ["amiss", "잘못되었다"]
    },
        {
            "korean": "연기 구름이 / 그의 머리 주위를 / 떠다녔다.",
            "explanation": "1. 연기 구름이 (A cloud of smoke) / 2. 그의 머리 주위를 (around his head) / 3. 떠다녔다 (was wafting).",
            "english": "A cloud of smoke was wafting around his head. / (Smoke drifted gently around his head.)",
            "key_words": ["wafting", "떠다녔다"]
        }
 
,    
    {
        "korean": "그는 / 논란을 / 일으키고 있다.",
        "explanation": "1. 그는 (He) / 2. 논란을 (controversy) / 3. 일으키고 있다 (is courting).",
        "english": "He is courting controversy. / (He is stirring up controversy.)",
        "key_words": ["courting", "일으키고 있다"]
    }
,    
    {
        "korean": "그는 / 그의 손님들이 / 장황하게 이야기하도록 / 내버려 둔다.",
        "explanation": "1. 그는 (He) / 2. 그의 손님들이 (his guests) / 3. 장황하게 이야기하도록 (ramble on) / 4. 내버려 둔다 (lets).",
        "english": "He lets his guests ramble on. / (He allows his guests to talk at length.)",
        "key_words": ["ramble on", "장황하게 이야기하도록"]
    },
    {
        "korean": "그는 / 추측을 / 잠재웠다.",
        "explanation": "1. 그는 (He) / 2. 추측을 (the speculations) / 3. 잠재웠다 (quashed).",
        "english": "He quashed the speculations. / (He put an end to the rumors.)",
        "key_words": ["quash", "잠재우다"]
    },
    {
        "korean": "그는 / 스트레스가 많은 상황에서도 / 침착함을 유지했다.",
        "explanation": "1. 그는 (He) / 2. 스트레스가 많은 상황에서도 (during the stressful situation) / 3. 침착함을 유지했다 (maintained his composure).",
        "english": "He maintained his composure during the stressful situation. / (He stayed calm under pressure.)",
        "key_words": ["composure", "침착"]
    }
,    

    {
        "korean": "그는 / 감정에 북받쳐 / 한참 동안 멈춰 있었다.",
        "explanation": "1. 그는 (He) / 2. 감정에 북받쳐 (overcome by emotion) / 3. 한참 동안 멈춰 있었다 (paused for a long time).",
        "english": "He paused for a long time, overcome by emotion. / (He stopped for a while, overwhelmed by his feelings.)",
        "key_words": ["paused", "멈추다", "overcome by emotion", "감정에 북받쳐"]
    },
    {
        "korean": "그는 / 그의 결정이 / 정당화되었다고 / 느꼈다.",
        "explanation": "1. 그는 (He) / 2. 그의 결정이 (his decision) / 3. 정당화되었다고 (was vindicated) / 4. 느꼈다 (felt).",
        "english": "He felt his decision was vindicated. / (He believed his choice was justified.)",
        "key_words": ["vindicated", "정당화되었다고"]
    },
    {
        "korean": "그것은 / 어휘 선택이 좋지 않았고 / 깊이 생각되지 않았다.",
        "explanation": "1. 그것은 (It) / 2. 어휘 선택이 좋지 않았고 (was poorly worded) / 3. 깊이 생각되지 않았다 (was poorly thought out).",
        "english": "It was poorly worded and thought out. / (It was clumsily phrased and not well considered.)",
        "key_words": ["poorly worded", "어휘 선택이 좋지 않다", "poorly thought out", "깊이 생각되지 않다"]
    },
    {
        "korean": "그는 / 회사를 비공개로 전환하겠다는 / 제안을 / 철회했다.",
        "explanation": "1. 그는 (He) / 2. 회사를 비공개로 전환하겠다는 (to take the company private) / 3. 제안을 (proposal) / 4. 철회했다 (rescinded).",
        "english": "He rescinded his proposal to take the company private. / (He withdrew his plan to privatize the company.)",
        "key_words": ["rescinded", "철회했다"]
    }
,    
    {
        "korean": "그는 / 갑작스러운 질문에 / 당황했다.",
        "explanation": "1. 그는 (He) / 2. 갑작스러운 질문에 (by the sudden question) / 3. 당황했다 (was caught off guard).",
        "english": "He was caught off guard by the sudden question. / (He was surprised by the unexpected question.)",
        "key_words": ["caught off guard", "당황했다"]
    },
    
    
    {
        "korean": "그는 / 공매도 투자자들에게 / 매력적인 존재이다.",
        "explanation": "1. 그는 (He) / 2. 공매도 투자자들에게 (for short sellers) / 3. 매력적인 존재이다 (is a magnet).",
        "english": "He is a magnet for short sellers. / (He attracts short sellers.)",
        "key_words": ["magnet", "매력적인 존재"]
    },
    
    {
        "korean": "그는 / 감정적으로 / 폭발했다.",
        "explanation": "1. 그는 (He) / 2. 감정적으로 (emotionally) / 3. 폭발했다 (lashed out).",
        "english": "He lashed out emotionally. / (He had an emotional outburst.)",
        "key_words": ["lashed out", "폭발했다", "outburst"]
    }
,    
    {
        "korean": "좋은 시기는 / 그에게 / 불안하다.",
        "explanation": "1. 좋은 시기는 (Good times) / 2. 그에게 (for him) / 3. 불안하다 (are unsettling).",
        "english": "Good times are unsettling for him. / (He feels uneasy during good times.)",
        "key_words": ["unsettling", "불안하다","uneasy"]
    }
    
,    
    {
        "korean": "대통령이 / 무게 있는 목소리로 말할 / 가능성이 있다.",
        "explanation": "1. 대통령이 (the president will) / 2. 무게 있는 목소리로 말할 (intone) / 3. 가능성이 있다 (there is a nontrivial chance).",
        "english": "There is a nontrivial chance that the president will intone. / (There is a significant possibility that the president will speak in a serious tone.)",
        "key_words": ["nontrivial chance", "사소하지 않은 가능성,가능성이 상당히 높다", "intone", "무게 있는 목소리로 말할"]
    }
    
,    
    {
        "korean": "나는 / 이 나라가 / 잘못 관리되는 방식에 / 화가 난다.",
        "explanation": "1. 나는 (I) / 2. 이 나라가 (this country) / 3. 잘못 관리되는 방식에 (at the way, is mismanaged) / 4. 화가 난다 (seethe).",
        "english": "I seethe at the way this country is mismanaged. / (I'm angry at how this country is being mismanaged.)",
        "key_words": ["seethe", "화가 난다"]
    }
,    
    {
        "korean": "나는 / 지속 가능한 에너지에 대한 나의 비전을 / 분명히 밝혔다.",
        "explanation": "1. 나는 (I) / 2. 지속 가능한 에너지에 대한 나의 비전을 (about my vision for sustainable energy) / 3. 분명히 밝혔다 (put a stake in the ground).",
        "english": "I / put a stake in the ground / about my vision for sustainable energy. / (I made a firm stance on my vision for sustainable energy.)",
        "key_words": ["put a stake in the ground", "분명히 밝혔다"]
    },
    
    {
        "korean": "나는 / 지속 가능한 에너지에 대한 / 그의 비전을 분명히 밝혔다.",
        "explanation": "1. 나는 (I) / 2. 지속 가능한 에너지에 대한 (about his vision for sustainable energy) / 3. 그의 비전을 분명히 밝혔다 (put a stake in the ground).",
        "english": "I put a stake in the ground about his vision for sustainable energy. / (I made a firm stance on his vision for sustainable energy.)",
        "key_words": ["put a stake in the ground", "분명히 밝혔다"]
    },
    {
        "korean": "공장의 조립 라인을 / 강화하다.",
        "explanation": "1. 공장의 조립 라인을 (the plant's assembly lines) / 2. 강화하다 (juice).",
        "english": "Juice the plant’s assembly lines. / (Boost the factory's assembly lines.)",
        "key_words": ["juice", "강화하다"]
    },
    {
        "korean": "그는 할인을 제공하여 매출액을 늘리려고 노력했다.",
        "explanation": "1. 그는 (He) / 2. 할인을 제공하여 (by offering discounts) / 3. 매출액을 늘리려고 노력했다 (tried to juice up the sales figures).",
        "english": "He tried to juice up the sales figures by offering discounts. / (He aimed to increase sales by giving discounts.)",
        "key_words": ["juice up", "늘리려고","(급증시키려고/활력을 불어 넣으려고)"]
    }
,    
    {
        "korean": "그 회사는 / 수익 감소와 부채 증가로 인해 / 파산 직전의 악순환에 빠졌다.",
        "explanation": "1. 그 회사는 (The company) / 2. 수익 감소와 부채 증가로 인해 (due to declining revenue and increasing debt) / 3. 파산 직전의 악순환에 빠졌다 (entered a death spiral).",
        "english": "The company entered a death spiral due to declining revenue and increasing debt. / (It fell into a financial death spiral with falling profits and rising debt.)",
        "key_words": ["death spiral", "악순환"]
    },
    {
        "korean": "그 회사는 / 매년 / 수천 대의 자동차를 대량 생산한다.",
        "explanation": "1. 그 회사는 (The company) / 2. 매년 (every year) / 3. 수천 대의 자동차를 대량 생산한다 (churns out thousands of cars).",
        "english": "The company churns out thousands of cars every year. / (They mass-produce thousands of vehicles annually.)",
        "key_words": ["churns out", "대량 생산"]
    },
    {
        "korean": "그는 / 광적으로 / 자신의 일에 몰두한다.",
        "explanation": "1. 그는 (He) / 2. 광적으로 (maniacally) / 3. 자신의 일에 몰두한다 (throws himself into his work).",
        "english": "He throws himself into his work, maniacally. / (He obsessively dedicates himself to his tasks.)",
        "key_words": ["maniacally", "광적으로"]
    }
,    
    {
        "korean": "그는 / 혼수 상태에 빠진 채 / 병원에 입원해 있다.",
        "explanation": "1. 그는 (He) / 2. 혼수 상태에 빠진 채 (in a comatose state) / 3. 병원에 입원해 있다 (is hospitalized).",
        "english": "He / is hospitalized / in a comatose state. / (He / remains / in a coma / at the hospital.)",
        "key_words": ["comatose", "혼수 상태"]
    },
    
    {
        "korean": "기자들이/ 그 배우를/ 끊임없이/ 괴롭힌다.",
        "explanation": "1. 기자들이 (Reporters) / 2. 그 배우를 (the actor) / 3. 끊임없이 (constantly) / 4. 괴롭힌다 (hound).",
        "english": "Reporters hound the actor constantly. / (The press relentlessly pursues the actor.)",
        "key_words": ["hound", "괴롭힌다", "constantly", "끊임없이"]
    }
,    
    {
        "korean": "그는 기자들의 끈질긴 추격에 시달렸다.",
        "explanation": "1. 그는 (He) / 2. 기자들의 (by the reporters') / 3. 끈질긴 추격에 (persistent pursuit) / 4. 시달렸다 (was hounded).",
        "english": "He was hounded by the reporters' persistent pursuit. / (He suffered from the relentless hounding of the press.)",
        "key_words": ["hounded", "시달렸다"]
    }
,    
    {
        "korean": "그의 글은 / 재치와 / 존재론적 피로로 가득 차 있다.",
        "explanation": "1. 그의 글은 (His writing) / 2. 재치와 (wit) / 3. 존재론적 피로로 (existential weariness) / 4. 가득 차 있다 (is filled with).",
        "english": "His writing / is filled with / wit and existential weariness. / (His work is a blend of humor and existential fatigue.)",
        "key_words": ["wit", "재치", "existential weariness", "존재론적 피로"]
    },
    
    {
        "korean": "우리의 통찰력은 / 직접적인 경험에서 / 나올 수 있다.",
        "explanation": "1. 우리의 통찰력은 (Our insight) / 2. 직접적인 경험에서 (from firsthand experience) / 3. 나올 수 있다 (can come).",
        "english": "Our insight / can come / from firsthand experience. / (We can gain valuable understanding / through direct experience.)",
        "key_words": ["firsthand experience", "직접적인 경험"]
    },

    {
        "korean": "차가 / 고양이를 피하기 위해 / 갑자기 방향을 바꿨다.",
        "explanation": "1. 차가 (the car) / 2. 고양이를 피하기 위해 (to avoid a cat) / 3. 갑자기 방향을 바꿨다 (swerved out suddenly).",
        "english": "The car / swerved out suddenly / to avoid a cat. / (The vehicle / made a sudden swerve / to dodge a cat.)",
        "key_words": ["swerve out", "방향을 바꿨다"]
    }
    
    
,    
    {
        "korean": "레이다는 '빛 탐지 및 거리 측정'의 약어이다.",
        "explanation": "1. 레이다는 (Lidar is) / 2. '빛 탐지 및 거리 측정'의 (for light detection and ranging) / 3. 약어이다 (an acronym).",
        "english": "Lidar is an acronym for light detection and ranging. / (Lidar stands for light detection and ranging.)",
        "key_words": ["Lidar", "acronym", "light detection and ranging"]
    },

{
    "korean": "그는 / 사람을 / 기계와 경쟁시키려고 했다.",
    "explanation": "1. 그는 (He) / 2. 사람을 (a human) / 3. 기계와 경쟁시키려고 했다 (pitted against a machine).",
    "english": "He tried to pit a human against a machine. / (He attempted to set a human in competition with a machine.)",
    "key_words": ["pit", "against", "경쟁시키려고"]
},




    //////
    {
        "korean": "불쾌한 이메일과 문자 / 그가 받은 / 신경을 거슬리게 했다.",
        "explanation": "1. 불쾌한 이메일과 문자 (off-putting emails and texts) / 2. 그가 받은 (he received) / 3. 신경을 거슬리게 했다 (were irritating).",
        "english": "The off-putting emails and texts he received were irritating. / (The unsettling messages he got were quite bothersome.)",
        "key_words": ["off-putting", "불쾌한"]
    },
    {
        "korean": "그는 / 자신의 라이브 공연 영상을 / 모아서 발표했다.",
        "explanation": "1. 자신의 (his own) / 2. 라이브 공연 영상 (reel of his live performances) / 3. 모아서 발표했다 (released).",
        "english": "He / released / a reel of his live performances. / (He / put out / a collection of his live shows.)",
        "key_words": ["reel", "영상"]
    },
    
    {
        "korean": "이 제품은 / 의료와 로봇 공학과 같은 / 특정 산업의 요구에 맞춘 / 소프트웨어와 하드웨어 구성을 / 제공한다.",
        "explanation": "1. 의료와 로봇 공학과 같은 (such as healthcare and robotics) / 2. 특정 산업의 요구에 맞춘 (catered to the needs of specific industries) / 3. 프트웨어와 하드웨어 구성을(software and hardware setups).",
        "english": "It / offers / software and hardware setups / catered to the needs / of specific industries / such as healthcare and robotics.",
        "key_words": ["catered to the needs", "요구에 맞춘"]
    }
,    
    {
        "korean": "새로운 AI PC는 / 새로운 칩을 사용하여 / 게임 호환성 문제를 / 겪고 있다.",
        "explanation": "1. 새로운 칩을 사용하여 (using new chips) / 2. 게임 호환성 문제를 (compatibility issues with games) / 3. 겪고 있다 (are encountering).",
        "english": "New AI PCs / are encountering / compatibility issues / with games / due to using / new chips (are facing game compatibility problems because of using different chips).",
        "key_words": ["encountering", "겪고 있다"]
    }
,    
    {
        "korean": "그들의 / 신생 / 스타트업은 / 빠르게 / 성장하고 있다.",
        "explanation": "1. 그들의 (Their) / 2. 신생 (nascent) / 3. 스타트업은 (startup) / 4. 빠르게 (quickly) / 5. 성장하고 있다 (is growing).",
        "english": "Their / nascent / startup / is growing / quickly (Their / newly founded / startup / is rapidly expanding).",
        "key_words": ["nascent", "신생"]
    },
    {
        "korean": "Z세대는 / 단지 / 자신의 욕구와 필요를 / 더 솔직하게 / 표현할 뿐이다.",
        "explanation": "1. Z세대는 (Gen Z) / 2. 단지 (simply) / 3. 자신의 욕구와 필요를 (their wants and needs) / 4. 더 솔직하게 (more openly) / 5. 표현할 뿐이다 (express).",
        "english": "Gen Z / simply express / their wants and needs / more openly (Gen Z / just communicate / their desires and needs / in a more straightforward way).",
        "key_words": ["express", "표현할 뿐이다"]
    },
    
    
    {
        "korean": "연방정부가 / AT&T의 교착 상태를 / 끝내기 위한 / 중재 절차가 / 결렬되었다.",
        "explanation": "1. 연방정부가 (The federal government) / 2. AT&T의 교착 상태를 (AT&T's standoff) / 3. 끝내기 위한 (to end) / 4. 중재 절차가 (mediation process) / 5. 결렬되었다 (broke down).",
        "english": "A federal mediation process / to end / AT&T's standoff / broke down.",
        "key_words": ["standoff", "교착 상태"]
    }
,    
    {
        "korean": "수퍼마켓들이 / 블루 크랩 시즌을 / 활용하여 / 일련의 공격적인 할인 행사를 / 진행하고 있다.",
        "explanation": "1. 블루 크랩 시즌을 (the blue crab season) / 2. 활용하여 (capitalizing on) / 3. 일련의 공격적인 할인 행사를 (a series of aggressive discount events) / 4. 진행하고 있다 (are conducting).",
        "english": "Supermarkets / are capitalizing on / the blue crab season / with a series of / aggressive discount events (Supermarkets / are leveraging / the blue crab season / to run a series of / bold discount promotions).",
        "key_words": ["capitalizing", "활용하여"]
    }
,    
    {
        "korean": "물가 상승률이 / 지난달 / 2% 목표로 / 완화되었다.",
        "explanation": "1. 물가 상승률이 (the rate of rising prices) / 2. 지난달 (last month) / 3. 2% 목표로 (to the 2 percent target) / 4. 완화되었다 (eased).",
        "english": "The rate of rising prices / eased / to the 2 percent target / last month (The inflation rate / fell / to the 2 percent goal / in the previous month).",
        "key_words": ["eased", "완화되었다"]
    },
    
    
    {
        "korean": "브라질 대법원이 / 엘론 머스크의 X를 / 차단하는 결정을 / 지지했다.",
        "explanation": "1. 브라질 대법원이 (Brazil's Supreme Court) / 2. 엘론 머스크의 X를 (Elon Musk's X) / 3. 차단하는 결정을 (the decision to block) / 4. 지지했다 (upheld).",
        "english": "Brazil's Supreme Court / upheld / the decision / to block / Elon Musk's X (Brazil's Supreme Court / confirmed / the ruling / to ban / Elon Musk's X).",
        "key_words": ["upheld", "지지했다"]
    },

    
    {
        "korean": "영국의 / 소매 판매가 / 8월에 / 따뜻한 날씨 덕분에 / 증가했다.",
        "explanation": "1. 영국의 (U.K.) / 2. 소매 판매가 (retail sales) / 3. 8월에 (in August) / 4. 따뜻한 날씨 덕분에 (on warmer weather) / 5. 증가했다 (climbed).",
        "english": "U.K. / retail sales / climbed / in August / on warmer weather (U.K. / retail sales / increased / in August / due to warmer temperatures).",
        "key_words": ["증가했다", "climbed"]
    },
    {
        "korean": "투자자들은 / 금요일의 / 월간 고용 보고서를 / 앞두고 / 긴장하고 있다.",
        "explanation": "1. 투자자들은 (Investors) / 2. 금요일의 (Friday's) / 3. 월간 고용 보고서를 (monthly jobs report) / 4. 앞두고 (ahead of) / 5. 긴장하고 있다 (are on edge).",
        "english": "Investors / are on edge / ahead of / Friday’s / monthly jobs report (Investors / are anxious / before / Friday’s / employment data).",
        "key_words": ["on edge", "긴장하고 있다"]
    },
    {
        "korean": "그들은 / 금을 / 안전한 / 장소에 / 보관한다.",
        "explanation": "1. 그들은 (They) / 2. 금을 (their hoard of gold) / 3. 안전한 (safe) / 4. 장소에 (place) / 5. 보관한다 (keep).",
        "english": "They / keep / their hoard of gold / in a / safe place (They / store / their gold treasure / in a / secure location).",
        "key_words": ["hoard", "보관한다"]
    },


    ////////////////
    {
        "korean": "준비되면 / 나한테 / 알려줄 수 있어?",
        "explanation": "1. 준비되면 (when you're ready) / 2. 나한테 (to me) / 3. 알려줄 수 있어? (could you give me a heads up?).",
        "english": "Could you / give me a heads up / when you're ready / to go?",
        "key_words": ["heads up", "알려줄 수 있어"]
    },
    {
        "korean": "회사는 / 새로운 제품을 / 통해 / 백만장자를 / 만들어냈다.",
        "explanation": "1. 회사는 (The company) / 2. 새로운 제품을 (a new product) / 3. 통해 (through) / 4. 백만장자를 (millionaires) / 5. 만들어냈다 (has minted).",
        "english": "The company has minted millionaires through a new product(The company has made many people rich through a new product.)",
        "key_words": ["minted", "만들어냈다"]
    },
    {
        "korean": "저기, / 미리 알려주는데, / 회의는 / 내일 / 오전 10시야.",
        "explanation": "1. 저기, (Hey) / 2. 미리 알려주는데, (just a heads up) / 3. 회의는 (the meeting is) / 4. 내일 (tomorrow) / 5. 오전 10시야 (at 10 AM).",
        "english": "Hey, / just a heads up, / the meeting is / tomorrow / at 10 AM.",
        "key_words": ["heads up", "미리 알려주는데"]
    },
    {
        "korean": "빨간 문이/ 열리고,/ 승객들이/ 플랫폼에서/ 내린다.",
        "explanation": "1. 빨간 문이 (The red door) / 2. 열리고 (opens) / 3. 승객들이 (passengers) / 4. 플랫폼에서 (out of the platform) / 5. 내린다 (step out).",
        "english": "The red door opens and passengers step out of the platform (The red door opens, and the passengers exit the platform).",
        "key_words": ["step out", "내린다"]
    },

    {
        "korean": "그는/ 그녀를/ 유심히 쳐다보고,/ 그녀는/ 그를/ 바라본다.",
        "explanation": "1. 그는 (He) / 2. 그녀를 (her) / 3. 유심히 쳐다보고 (eyes her) / 4. 그녀는 (and she) / 5. 그를 (him) / 6. 바라본다 (regards him).",
        "english": "He eyes her and she regards him (He watches her closely, and she looks at him thoughtfully).",
        "key_words": ["eyes", "유심히 쳐다보고", "regards", "바라보다"]
    },    

    {
        "korean": "그는/ 전화기를 집어 들고/ 화면을 읽었다.",
        "explanation": "1. 그는 (He) / 2. 전화기를 집어 들고 (grabbed the phone) / 3. 화면을 읽었다 (read the screen).",
        "english": "He grabbed the phone /and read the screen /(He picked up the phone /and looked at the screen).",
        "key_words": ["grabbed", "집어 들고","picked up"]
    },
    {
        "korean": "그녀를 바라보다가,/ 고개를 돌리자,/ 비둘기들이 날아올랐다.",
        "explanation": "1. 그녀를 바라보다가 (gaze at her) / 2. 고개를 돌리자 (turn away) / 3. 비둘기들이 날아올랐다 (pigeons took off).",
        "english": "He gazed at her, then turned away as the pigeons took off (He looked at her, turned his head away, and the pigeons flew away).",
        "key_words": ["took off", "날아올랐다", "gaze", "바라보다"]
    }
,    
    {
        "korean": "여기에/ 문제가 있다.",
        "explanation": "1. 여기에 (Here is) / 2. 문제가 있다 (the rub: the difficulty or problem).",
        "english": "Here is the rub (Here lies the problem or difficulty).",
        "key_words": ["rub", "문제", "difficulty", "문제점", "problem", "어려움"]
    },
    {
        "korean": "그 옆에 있던 소녀는/ 입술에/ 이빨을 드러내며 웃는/ 표정을 짓고 있었다.",
        "explanation": "1. 그 옆에 있던 소녀는 (The girl beside him) / 2. 입술에 (on her lips) / 3. 이빨을 드러내며 웃는 (had a toothy grin)",
        "english": "The girl beside him had a toothy grin on her lips (The girl next to him was smiling with a toothy grin).",
        "key_words": ["had a toothy grin", "이빨을 드러내며 웃는"]
    }
,    
    {
        "korean": "그가/ 그것을 말해야만/ 효과를 볼 수 있다.",
        "explanation": "1. 그가 (He) / 2. 그것을 말해야만 (to talk for it) / 3. 효과를 볼 수 있다 (to pay off)",
        "english": "He has to talk for it to pay off (He needs to speak up for it to be effective).",
        "key_words": ["pay off", "효과를 볼 수 있다"]
    },

    {
        "korean": "그 계약에는/ 안전장치가/ 들어가져 있다.",
        "explanation": "1. 그 계약에는 (In the contract) / 2. 안전장치가 (a backstop) / 3. 들어가져 있다 (is included).",
        "english": "A backstop is included in the contract (The contract has a safeguard in place).",
        "key_words": ["backstop", "안전장치"]
    },
{
    "korean": "여름 영화 시즌이/ 8월에/ 서서히/ 끝날 것이다.",
    "explanation": "1. 여름 영화 시즌이 (The summer movie season) / 2. 8월에 (in August) / 3. 서서히 끝날 것이다 (will wind down).",
    "english": "The summer movie season will wind down in August (The summer movie season will gradually come to an end in August).",
    "key_words": ["wind down", "끝날 것이다","서서히", "come to an end"]
},
    {
        "korean": "그는/ 긴장을 풀기 위해/ 규칙적으로/ 술을 한잔 한다.",
        "explanation": "1. 그는 (He) / 2. 긴장을 풀기 위해 (to wind down) / 3. 규칙적으로 (regularly) / 4. 술을 한잔 한다 (has a drink).",
        "english": "He regularly has a drink to wind down (He often enjoys a drink to relax).",
        "key_words": ["wind down", "긴장을 풀다","relax"]
    }
,    
    
    {
        "korean": "네가 원하는 대로/ 행동하고/ 다른 사람들이 맞춰야 한다고 생각하나 보군.",
        "explanation": "1. 네가 원하는 대로 행동하고(You play your tune) /2. 다른 사람들이 맞춰야 한다고 생각하나 보군 (and expect everyone else to follow along).",
        "english": "You play your tune and expect everyone else to follow along (You do things your way and assume others will adjust).",
        "key_words": ["play your tune", "원하는 대로","행동하고"]
    },
    {
        "korean": "익명의 제보가/ 경찰에게/ 전달되었다.",
        "explanation": "1. 익명의 제보가 (An anonymous tip-off) / 2. 경찰에게 (to the police) / 3. 전달되었다 (was given).",
        "english": "An anonymous tip-off was given to the police (The police received an anonymous tip-off).",
        "key_words": ["anonymous", "익명", "tip-off", "제보"]
    }
,    
    {
        "korean": "그는/ 책을 대충/ 읽고 있다.",
        "explanation": "1. 그는 (He) / 2. 책을 (the book) / 3. 대충 읽고 있다 (is skimming).",
        "english": "He is skimming the book quickly (He is glancing over the book).",
        "key_words": ["skimming", "대충" ,"읽고 있다", "glancing"]
    },
    
//////////////////////////////////////////////////////    
{
    "korean": "거기에는/ 바텐더 외에 아무도 없고,/ 그녀는 좀 이상하다.",
    "explanation": "1. 거기에는 (There) / 2. 바텐더 외에 아무도 없고 (no one there except the barmaid) / 3. 그녀는 좀 이상하다 (she's a bit off).",
    "english": "There's no one there except the barmaid, and she's a bit off (There's only the barmaid, and she's acting a bit strange).",
    "key_words": ["barmaid", "바텐더", "a bit off", "좀 이상하다", "strange", "이상한"]
},


   ////////////뉴스 
    {
        "korean": "10월 1일이/ 공휴일로 지정이 이뤄지지 않으면서/ 학교 등 현장 혼란이 가중되고 있다.",
        "explanation": "1. 공휴일로 지정이 이뤄지지 않으면서 (has not been designated as a holiday) / 2. 학교 등 현장 혼란이 가중되고 있다 (causing increasing confusion in schools and other places).",
        "english": "October 1st has not been designated as a holiday, causing increasing confusion in schools and other places.",
        "key_words": ["causing increasing confusion","혼란이 가중되고 있다","designated as"]
    }
    
    
    
,    
    {
        "korean": "은행은/ 주택을 한 채라도 소유하고 있으면/ 모든 주택담보대출과 전세대출을 중단할 것이다.",
        "explanation": "1. 은행은 (The bank) / 2. 주택을 한 채라도 소유하고 있으면 (if it owns even one house) / 3. 모든 주택담보대출과 전세대출을 중단할 것이다 (will suspend all mortgage and lease loans).",
        "english": "The bank will suspend(halt) all mortgage and lease loans if it owns even one house.",
        "key_words": ["중단할 것이다", "suspend"]
    },
    
    
    {
        "korean": "한국의 수출은/ 8월에도/ 11개월 연속으로/ 증가세를 이어갔다.",
        "explanation": "1. 한국의 수출은 (South Korea's exports) / 2. 8월에도 (in August) / 3. 11개월 연속으로 (for the 11th consecutive month) / 4. 증가세를 이어갔다 (continued to increase).",
        "english": "South Korea's exports continued to increase for the 11th consecutive month in August.",
        "key_words": ["continued to increase","연속으로","증가세를 이어갔다","consecutive"]
    },
    
    {
        "korean": "올해 초 흥행 영화 '파묘'에서/ 무당 역할로 평단의 찬사를 받은/ 김고은이/ 새로운 영화로 돌아온다.",
        "explanation": "1. 올해 초 흥행 영화 '파묘'에서 (in the hit film 'Exhuma' earlier this year) / 2. 무당 역할로 평단의 찬사를 받은 (who impressed critics as a shaman)",
        "english": "Kim Go-eun, who impressed critics as a shaman in the hit film 'Exhuma' earlier this year, returns with a new movie.",
        "key_words": ["impressed critics","평단의 찬사를 받은"]
    }
    
,    
    {
        "korean": "한국의/ 취업 시장 전망은/ 여전히 불확실하다.",
        "explanation": "1. 취업 시장 전망은 (the job market outlook) / 2. 여전히 불확실하다 (remains uncertain).",
        "english": "The job market outlook in South Korea remains uncertain (The employment prospects in South Korea are still unclear).",
        "key_words": ["불확실하다", "remains uncertain"]
    }
    
,    
    {
        "korean": "전기차 소비자들은/ 배터리 브랜드를 선택할 때/ 더욱 신중해지고 있다.",
        "explanation": "1. 배터리 브랜드를 선택할 때 (when choosing a battery brand) / 2. 더욱 신중해지고 있다 (are becoming more cautious).",
        "english": "Electric car consumers are becoming more cautious when choosing a battery brand (Electric vehicle buyers are being more selective about battery brands).",
        "key_words": ["cautious", "신중해지고","selective"]
    }

,    

    {
        "korean": "그들은/ 상위 계층에 있는 사람들로부터/ 압박을 받고 있다.",
        "explanation": "1. 그들은 (They) / 2. 상위 계층에 있는 사람들로부터 (from people of the high food chain) / 3. 압박을 받고 있다 (are under pressure).",
        "english": "They are under pressure from people of the high food chain (They are being pressured by those in positions of power or influence).",
        "key_words": ["high food chain", "상위 계층","those in positions of power or influence"]
    }
    
,    
    {
        "korean": "그는/ 손가락으로/ 쿡 찔렀다.",
        "explanation": "1. 그는 (He) / 2. 손가락으로 (with his fingers) / 3. 쿡 찔렀다 (jabbed).",
        "english": "He jabbed with his fingers (He poked or prodded using his fingers).",
        "key_words": ["jabbed", "쿡 찔렀다", "poked", "prodded"]
    }
,    
    {
        "korean": "그를/ 명단에서/ 제외하라.",
        "explanation": "1. 그를 (Him) / 2. 명단에서 (from the list) / 3. 제외하라 (cross off).",
        "english": "Cross him off the list (Remove him from the list).",
        "key_words": ["cross off", "제외하라", "remove" ]
    }
,    
    {
        "korean": "우리는/ 그의 자리를/ 대신할 누군가가 필요하다.",
        "explanation": "1. 우리는 (We) / 2. 그의 자리를 (to fill his shoes) / 3. 대신할 누군가가 필요하다 (need someone).",
        "english": "We need someone to fill his shoes (We need someone to take his place or responsibilities).",
        "key_words": ["fill his shoes", "그의 자리를 대신하다","someone to take his place or responsibilities"]
    }

    ////////////////////////////////////////////////////
,    
    {
        "korean": "그들은/ 새로운 유통 계약에 대해/ 합의에 도달할 수 없었다.",
        "explanation": "1. 그들은 (They) / 2. 새로운 유통 계약에 대해 (on a new distribution deal) / 3. 합의에 도달할 수 없었다 (were unable to come to terms).",
        "english": "They were unable to come to terms on a new distribution deal (They couldn't reach an agreement on a new distribution contract).",
        "key_words": ["come to terms", "합의에 도달할 수","reach an agreement"]
    },
    
    {
        "korean": "그들은/ 휴전 협정을 위한/ 거의 11개월간의 캠페인을/ 벌였다.",
        "explanation": "1. 휴전 협정을 위한 (for a cease-fire deal) / 2. 거의 11개월간의 캠페인을 (an almost 11-month campaign) / 3. 벌였다 (waged).",
        "english": "They waged an almost 11-month campaign for a cease-fire deal (They conducted a campaign lasting nearly 11 months to secure a cease-fire agreement).",
        "key_words": ["waged", "벌였다"]
    },
    {
        "korean": "그 사건은/ 나라 전체를/ 슬픔과 분노에/ 휩싸이게 했다.",
        "explanation": "1. 그 사건은 (The event) / 2. 나라 전체를 (the country) / 3. 슬픔과 분노에 (in grief and anger) / 4. 휩싸이게 했다 (engulfed).",
        "english": "The event engulfed the country in grief and anger (The incident caused widespread sorrow and rage across the nation).",
        "key_words": ["engulf", "휩싸이게 했다"]
    }
,    
    {
        "korean": "그 경험은/ 앞으로 다가올 일들의/ 예감을/ 주었다.",
        "explanation": "1. 그 경험은 (The experience) / 2. 앞으로 다가올 일들의 (of what is to come) / 3. 예감을 (a foretaste) / 4. 주었다 (gave).",
        "english": "The experience gave a foretaste of what is to come (The experience provided a glimpse of future events).",
        "key_words": ["foretaste", "예감","glimpse of future events" ]
    },

,    
    {
        "korean": "넥타이가/ 약간 오른쪽으로/ 비뚤어져 있다.",
        "explanation": "1. 넥타이가 (The tie) / 2. 약간 오른쪽으로 (slightly to the right) / 3. 비뚤어져 있다 (is askew).",
        "english": "The tie is slightly askew to the right (The tie is a bit crooked towards the right).",
        "key_words": ["비뚤어져","crooked","askew"]
    }
,    
    {
        "korean": "상황이/ 잘못된 것 같다,/ 그래서 우리는 계획을 다시 검토해야 할 것 같다.",
        "explanation": "1. 상황이 (Things) / 2. 잘못된 것 같다 (seem to have gone awry) / 3.계획을 다시 검토해야 할 것 같다 (might need to review our plans).",
        "english": "Things seem to have gone awry, so we might need to review our plans (It looks like something has gone wrong, so we should probably reassess our strategy).",
        "key_words": ["awry", "잘못된","wrong"]
    },
    
    {
        "korean": "사회에서 오랫동안 곪아온 분쟁 중 하나가/ 마침내/ 폭발했다.",
        "explanation": "1. 사회에서 오랫동안 곪아온 분쟁 중 하나가 (One of the long-festering feuds in society) / 2. 마침내 (finally) / 3. 폭발했다 (has flared up).",
        "english": "One of the long-festering feuds in society has finally flared up (A long-standing conflict in society has finally erupted).",
        "key_words": ["long-festering", "오랫동안 곪아온", "feud", "분쟁", "flared up", "폭발하다","erupted"]
    }
,    
    {
        "korean": "그 회사는/ 항상 연결된 문화를/ 해체하기 시작했다.",
        "explanation": "1. 그 회사는 (The company) / 2. 항상 연결된 문화를 (always-on culture) / 3. 해체하기 시작했다 (has started to dismantle).",
        "english": "The company has started to dismantle the always-on culture (The company is working to break down the culture of constant connectivity).",
        "key_words": ["dismantle", "해체하다", "always-on culture", "항상 연결된 문화","constant connectivity","break down"]
    }
,    
    {
        "korean": "내가 도움을 요청했지만/ 아무도 들어주지 않았다(무시되었다).",
        "explanation": "1. 내가 도움을 요청했지만 (I asked for help) / 2. 아무도 들어주지 않았다 (my pleas fell on deaf ears).",
        "english": "I asked for help, but my pleas fell on deaf ears (I asked for assistance, but no one listened).",
        "key_words": ["fell on deaf ears", "아무도 들어주지 않았다", "no one listened"]
    },
    {
        "korean": "그들은/ 메르세데스를 타고/ 1,500마일의 신혼여행을/ 떠났다.",
        "explanation": "1. 메르세데스를 타고 (in the Mercedes) / 2. 1,500마일의 신혼여행을 (on a 1,500-mile honeymoon trip) / 3. 떠났다 (departed).",
        "english": "They departed for their honeymoon on a 1,500-mile road trip in the Mercedes (They set off on their honeymoon, driving a 1,500-mile journey in the Mercedes).",
        "key_words": ["떠났다", "departed", "set off"]
    }
,    
    {
        "korean": "경찰은/ 약 5년 동안/ 그녀가 마약상이 되었다고/ 주장하고 있다.",
        "explanation": "1. 경찰은 (The police) / 2. 5년 동안 (over five years) / 3. 그녀가 마약상이 되었다고 (she had become a drug dealer) / 4. 주장하고 있다 (allege).",
        "english": "Federal prosecutors allege that over five years she had become a drug dealer (The police claim that within about five years, she had turned into a drug dealer).",
        "key_words": ["allege", "주장하다","claim","주장하고 있다"]
    },
    
        
    {
        "korean": "그의/ 끊임없는 시선이/ 나를/ 불안하게 만들었다.",
        "explanation": "1. 그의 (His) / 2. 끊임없는 시선이 (constant gaze) / 3. 나를 (me) / 4. 불안하게 만들었다 (was unnerving).",
        "english": "His constant gaze was unnerving (His relentless staring made me uncomfortable).",
        "key_words": ["unnerving", "불안하게 만들었다", "made me uncomfortable"]
    }
,    
    {
        "korean": "우리는/ 친구 집에 가서/ 장난을 치곤 했다.",
        "explanation": "1. 우리는 (We) / 2. 친구 집에 가서 (go to a friend's house) / 3. 장난을 치곤 했다 (do our mischief).",
        "english": "We would go to a friend's house and do our mischief (We used to go to a friend's place and cause trouble).",
        "key_words": ["mischief", "장난","cause trouble"]
    }
,    
    {
        "korean": "모임의 총무로서/ 나는 그들이 저렴한 숙소에/ 머물도록 했다.",
        "explanation": "1. 모임의 총무로서 (As the treasurer of the group) / 2. 그들이 (them) / 3. 저렴한 숙소에 (in budget inns) / 4. 머물도록 했다 (made them stay).",
        "english": "As the treasurer of the group, I made them stay in budget inns (As the group’s treasurer, I ensured they stayed in affordable accommodations).",
        "key_words": ["budget inns", "저렴한 숙소"]
    }
,    
    {
        "korean": "그는/ 갑자기 앞으로/ 돌진했다.",
        "explanation": "1. 그는 (He) / 2. 갑자기 앞으로 (suddenly forward) / 3. 돌진했다 (lunged).",
        "english": "He lunged suddenly forward (He made a sudden forward movement).",
        "key_words": ["lunge", "돌진했다"]
    }
,    
    {
        "korean": "그녀는/ 그들을/ 애지중지하지 않았다.",
        "explanation": "1. 그녀는 (She) / 2. 그들을 (them) / 3. 애지중지하지 않았다 (didn't coddle).",
        "english": "She didn’t coddle them (She didn’t pamper or spoil them).",
        "key_words": ["coddle", "애지중지", "pamper"]
    }
,    
    {
        "korean": "그들은/ 그것을/ 비밀스럽고 음모적인 일로/ 처리했다.",
        "explanation": "1. 그들은 (They) / 2. 그것을 (it) / 3. 비밀스럽고 음모적인 일로 (as a cloak-and-dagger thing) / 4. 처리했다 (handled).",
        "english": "They handled it as a cloak-and-dagger thing (They dealt with it in a secretive and mysterious manner).",
        "key_words": ["cloak-and-dagger", "비밀스럽고 음모적인", "in a secretive and mysterious manner"]
    },
    
    {
        "korean": "그는/ 가끔씩 만나는 친구가 있다.",
        "explanation": "1. 그는 (He) / 2. 가끔씩 만나는 (occasional) / 3. 친구가 있다 (has a friend).",
        "english": "He has an occasional friend (He has a friend he sees from time to time).",
        "key_words": ["occasional", "가끔씩", "만나는","from time to time"]
    }
,    
    {
        "korean": "그는/ 비록 느리지만/ 꾸준히/ 나아가고 있다.",
        "explanation": "1. 그는 (He) / 2. 느리지만 (albeit slowly) / 3. 꾸준히 (steadily) / 4. 나아가고 있다 (is making progress).",
        "english": "He is making progress, albeit slowly (He is advancing, though at a slow pace).",
        "key_words": ["albeit","만","비록","though"]
    }
,    
    {
        "korean": "부모님은/ 그에게/ 올바른 가치를/ 심어주었다.",
        "explanation": "1. 부모님은 (His parents) / 2. 그에게 (in him) / 3. 올바른 가치를 (the right values) / 4. 심어주었다 (instilled).",
        "english": "His parents instilled the right values in him (His parents taught him important principles).",
        "key_words": ["instilled", "심어주었다"]
    },
    {
        "korean": "그들은/ 서로 간에/ 강한 친밀감을/ 느꼈다.",
        "explanation": "1. 그들은 (They) / 2. 서로 간에 (with each other) / 3. 강한 친밀감을 (a strong kinship) / 4. 느꼈다 (felt).",
        "english": "They felt a strong kinship with each other (They shared a deep bond).",
        "key_words": ["kinship", "유대감","a deep bond"]
    }
,    
    {
        "korean": "그들은/ 대서사적 여정을/ 떠났다.",
        "explanation": "1. 그들은 (They) / 2. 대서사적 여정을 (epic quest) / 3. 떠났다 (set out on).",
        "english": "They set out on an epic quest (They embarked on a grand adventure).",
        "key_words": ["epic quest", "대서사적 여정", "grand adventure", ]
    }
,    
    {
        "korean": "그는/ 특정 상황에/ 반응하도록/ 조건화되었다.",
        "explanation": "1. 그는 (He) / 2. 특정 상황에 (to certain situations) / 3. 반응하도록 (to react) / 4. 조건화되었다 (was conditioned).",
        "english": "He was conditioned to react to certain situations (He was trained to respond in specific ways).",
        "key_words": ["conditioned", "조건화되었다", "trained"]
    }
,    



/////////////////노인과바다
    {
        "korean": "그는/ 아침이/ 다가오는 것을/ 느낄 수 있었다.",
        "explanation": "1. 그는 (He) / 2. 아침이 (the morning) / 3. 다가오는 것을 (coming) / 4. 느낄 수 있었다 (could feel).",
        "english": "He could feel the morning coming (He sensed the approach of dawn).",
        "key_words": ["could feel", "coming", "sensed","approach"]
    }
,    
    {
        "korean": "그들은/ 숲을/ 벗어난 후/ 흩어졌다.",
        "explanation": "1. 그들은 (They) / 2. 숲을 (the forest) / 3. 벗어난 후 (after they were out) / 4. 흩어졌다 (spread apart).",
        "english": "They spread apart after they were out of the forest (They dispersed after leaving the forest).",
        "key_words": ["spread apart", "dispersed","흩어졌다"]
    }
,    

    {
        "korean": "그들은/ 테이블에/ 불을 켜지 않고/ 식사했다.",
        "explanation": "1. 그들은 (They) / 2. 테이블에 (on the table) / 3. 불을 켜지 않고 (with no light on) / 4. 식사했다 (had eaten).",
        "english": "They had eaten with no light on the table (They ate without any light on the table).",
        "key_words": ["with no light on", "불을 켜지", "않고", "without any light"]
    },
    
    


    {
        "korean": "기회가 오면 그 기회를 놓치지 마라.",
        "explanation": "1. 기회가 오면 (when an opportunity comes along) / 2. 그 기회를 놓치지 마라 (don’t miss it).",
        "english": "When an opportunity comes along, don’t miss it (When a chance presents itself, don’t let it slip away).",
        "key_words": ["comes along", "오면","slip away"]
    }
,    
    {
        "korean": "그 남자는 / 일어나서 /신문을 집어 / 접으며 말했다.",
        "explanation": "1. 일어나서 (getting up) / 2. 신문을 집어 (taking the newspaper) / 3. 접으며 말했다 (and folding it, said).",
        "english": "The man said, getting up and taking the newspaper and folding it.(The man spoke as he stood up, picked up the newspaper, and folded it)",
        "key_words": ["getting up", "folding", "일어나서", "접으며"]
    }
,    
    {
        "korean": "우리는/ 나중에/ 다른 도시로/ 이사할 수도 있다.",
        "explanation": "1. 우리는 (We) / 2. 나중에 (down the road) / 3. 다른 도시로(to another city) / 4.이사할 수도 있다 (might move).",
        "english": "We might move to another city down the road (We may relocate to another city in the future).",
        "key_words": ["down the road", "나중에", "in the future"]
    },

    {
        "korean": "저소득 소비자들 사이의 /지출 감소가/ Dollar General을 /뒤처지게 만드는 /주요 기여 요인이다.",
        "explanation": "1. Dollar General을 뒤처지게 만드는 (making Dollar General a laggard) / 2. 주요 기여 요인이다 (is a major contributing factor)",
        "english": "The decline in spending among low-income consumers is a major contributing factor making Dollar General a laggard (causing Dollar General to fall behind).",
        "key_words": ["뒤처지게 만드는","making","laggard","fall behind"]
    }
    
,    
    {
        "korean": "불경기로/ 고객들은/ 필수품 지출을 줄이고 있다.",
        "explanation": "1. 불경기로 (due to the economic downturn) / 2. 고객들은 (customers) / 3. 필수품 지출을(necessities) / 4.줄이고 있다 (are cutting back on).",
        "english": "Due to the economic downturn, customers are cutting back on necessities (reducing spending on essentials).",
        "key_words": ["cutting back", "reducing spending","줄이고 있다"]
    }
,    
    {
        "korean": "인플레이션 둔화, / 가솔린 가격 하락, / 주택 담보 대출 금리 인하 등이 / 소비자 심리를 / 개선하는 데 기여하고 있습니다.",
        "explanation": "1. 소비자 심리를 (consumer sentiment) / 2. 개선하는 데 기여하고 있습니다 (are contributing to improving).",
        "english": "The inflation slowdown, / falling gasoline prices, / and mortgage rate cuts / are contributing to improving / consumer sentiment.",
        "key_words": ["contributing to improving","기여하고 있습니다"]
    }
    
,    


    /////////////////////////house of cards
    {
        "korean": "그는/ 일부 잘못된 정보를/ 퍼뜨리고 있습니다.",
        "explanation": "1. 그는 (He). / 2. 일부 잘못된 정보를 (some misinformation). / 3. 퍼뜨리고 있습니다 (is disseminating).",
        "english": "He is disseminating some misinformation. (He is spreading some false information.)",
        "key_words": ["disseminating", "퍼뜨리다","퍼뜨리고 있습니다","spreading"]
    }
,    
    {
        "korean": "그는/ 상사에게/ 아첨 했습니다.",
        "explanation": "1. 그는 (He). / 2. 상사에게 (to his boss). / 3. 아첨했습니다 (cozied up).",
        "english": "He cozied up to his boss. (He approached his boss to flatter him.)",
        "key_words": ["cozied up", "flatter", "아첨하다", "아첨 했습니다"]
    },
    
    {
        "korean": "그는/ 문을 열고/ 친구를 들여보냅니다.",
        "explanation": "1. 그는 (He). / 2. 문을 열고 (opens the door). / 3. 친구를 들여보냅니다 (admitting his friend).",
        "english": "He opens the door, admitting his friend. (He opens the door, welcoming his friend.)",
        "key_words": ["admitting", "welcoming", "들여보냅니다"]
    }
,    
    {
        "korean": "당신은/ 다른 그룹과/ 공모하고 싶습니까?",
        "explanation": "1. 당신은 (You). / 2. 다른 그룹과 (with another group). / 3. 공모하고 싶습니까? (want to collude?).",
        "english": "You want to collude with another group? (You want to conspire with another group?)",
        "key_words": ["collude", "conspire", "공모"]
    }
,    
    {
        "korean": "국무총리는/ 장관보다는/ 한 단계 위에 있고/ 대통령보다는/ 한 단계 낮다.",
        "explanation": "1. 국무총리는 (The Prime Minister is). / 2. 한 단계 위에 있고 (one step above). / 3. 한 단계 낮다 (one step below).",
        "english": "The Prime Minister is one step above ministers and one step below the president. (The Prime Minister is ranked higher than ministers but lower than the president.)",
        "key_words": ["one step above", "one step below", "한 단계 위에", "한 단계 낮다"]
    }
,    
    {
        "korean": "제가/ 할 일이/ 너무 많습니다.(on my plate는 할 일이 많아 마치 접시에 음식이 가득 쌓여 있는 것처럼 표현하는 비유적인 표현)",
        "explanation": "1. 제가 (I have). / 2. 할일이 너무 많습니다 (too much on my plate).",
        "english": "I have too much on my plate. (I am too busy.)",
        "key_words": ["too much", "on my plate", "할 일이 많다", " busy"]
    },
    
    {
        "korean": "당신은/ 많은 다리를/ 불태울 것입니다. (많은 관계를 끊게 될 것입니다.)",
        "explanation": "1. 당신은 (You are). / 2. 많은 다리를 (a lot of bridges). / 3. 불태울 것입니다 (going to burn)",
        "english": "You are going to burn a lot of bridges. (You are going to sever a lot of relationships.)",
        "key_words": ["burn", "bridges", "relationships", "많은 다리", "불태울","관계","끊게","sever"]
    }
,    
    {
        "korean": "우리는/ 단체 교섭에/ 손대지 않을 것입니다.",
        "explanation": "1. 우리는 (We). / 2. 단체 교섭에 (on collective bargaining). / 3. 손대지 않을 것입니다 (won't touch).",
        "english": "We won't touch collective bargaining.(We won't interfere with collective bargaining.)",
        "key_words": ["won't touch", "won't interfere", "collective bargaining", "단체 교섭"]
    }
,    
    {
        "korean": "당신이 / 다시 회복하면(다시 일어서면), / 언제든지 / 저를 찾아오세요.",
        "explanation": "1. 당신이(If you are). / 2. 다시 회복하면(back on your feet). / 3. 언제든지(anytime). / 4. 저를 찾아오세요(visit me).",
        "english": "If you are back on your feet, visit me anytime. (Once you recover, feel free to visit me.)",
        "key_words": ["back on your feet", "회복하면","recover"]
    },
    //house of cards episode 4
    {
        "korean": "우리는 지금 / 어려운 도전에 직면하고 있지만, / 이 고비를 / 넘길 수 있다고 믿습니다.",
        "explanation": "1. 어려운 도전에 직면하고 있지만(facing a tough challenge). /2. 넘길 수 있다고 믿습니다(I believe we can get through).",
        "english": "We're facing a tough challenge right now, but I believe we can get through this hump. (We're dealing with a difficult situation, but I think we can overcome this obstacle.)",
        "key_words": ["get through this hump","고비를", "넘길 수 있다","get through","overcome this obstacle"]
    }
,    
    {
        "korean": "세부 사항을 다뤄봅시다. / 그것을 / 설명해 주시겠어요?",
        "explanation": "1. 세부 사항을 다뤄봅시다(Let us deal with specifics). / 2. 설명해 주시겠어요?(can you walk us through it)?",
        "english": "Let us deal with specifics, can you walk us through it? (Let's focus on the details, can you guide us through it?)",
        "key_words": ["walk us through", "설명해 주시겠어요"]
    }
,    
    {
        "korean": "나는 / 미술계에 대해 / 최신 정보를 알고 있지 않아.",
        "explanation": "1. 나는(I am). / 2. 미술계에 대해(on the art world). / 3. 최신 정보를 알고 있지 않아(not up to date).",
        "english": "I am not up to date on the art world. (I'm not current with what's happening in the art world.)",
        "key_words": ["not up to date", "최신 정보를 알고 있지 않아","not current with what's happening"]
    }
,    
    {
        "korean": "회의에 늦어서 정말 미안해. / 좀 봐줘(좀 너그럽게 봐줘); / 내 차가 고장났어.",
        "explanation": "1. 회의에 늦어서 정말 미안해(I'm so sorry I'm late for the meeting). / 2. 좀 봐줘(Cut me a little slack here). / 3. 내 차가 고장났어(my car broke down).",
        "english": "I'm so sorry I'm late for the meeting. Cut me a little slack here; my car broke down. (Please understand; my car broke down.)",
        "key_words": ["a little slack", "좀 봐줘"]
    }
,    
    {
        "korean": "내 전화가 / 끊임없이(쉴새없이/옛날 전화기의 수화기가 내려져있거나, 잘못 놓여 끊임없이 울리는 모습을 연상시키는 표현), / 울리고 있어.",
        "explanation": "1. 내 전화가(My phone). / 2. 끊임없이(off the hook). / 3. 울리고 있어(is ringing).",
        "english": "My phone is ringing off the hook. (My phone is ringing non-stop.)",
        "key_words": ["off the hook", "non-stop"]
    },
    {
        "korean": "그는 완전히 / 미쳤어(미친사람이야). / 그가 날 수 있다고 / 생각해.",
        "explanation": "1. 그는 완전히(He's a total). / 2. 미쳤어(crackpot). / 3. 그가 날 수 있다고(he can fly). / 4. 생각해(thinks).",
        "english": "He's a total crackpot. He thinks he can fly. (He's completely crazy. He believes he can fly.)",
        "key_words": ["crackpot", "crazy"]
    }
    
,    
    {
        "korean": "나는 / 그것을 / 신경 쓰지 않았다.",
        "explanation": "1. 나는(I). / 2. 그것을(it). / 3. 신경 쓰지 않았다(did not pay it no mind).",
        "english": "I did not pay it no mind(I did not pay any attention to it)",
        "key_words": ["pay", "mind","attention","not","no"]
    },
    {
        "korean": "그들은 / 깨지기 쉬운 물건을 보호하기 위해 / 상자에 / 스펀지를 / 채웠다.",
        "explanation": "1. 그들은(They). / 2. 깨지기 쉬운 물건을 보호하기 위해(to protect the fragile items). / 3. 상자에(the box). / 4. 스펀지를(foam). / 5. 채웠다(padded).",
        "english": "They padded the box with foam to protect the fragile items.(They filled the box with foam to protect the fragile items.)",
        "key_words": ["padded", "filled"]
    }
,    
    {
        "korean": "그것은 / 당신의 체형에도 불구하고 / 모든 잘못된 부분을 / 강조할 것입니다.",
        "explanation": "1. 그것은(It). / 2. 당신의 체형에도 불구하고(even with your figure). / 3. 모든 잘못된 부분을(all the wrong places). / 4. 강조할 것입니다(will accentuate).",
        "english": "It will accentuate all the wrong places even with your figure.(It will emphasize your weaknesses.It will draw attention to the wrong parts)",
        "key_words": ["figure", "불구하고", "even","체형","accentuate","강조할","emphasize","draw attention"]
    }
,    
    {
        "korean": "저는 이미 / 그 일에 / 대해 / 파악하고 있습니다.",
        "explanation": "1. 저는(I am). / 2. 이미(already). / 3. 파악하고 있습니다(on top of it).",
        "english": "I am already on top of it. (I am handling it, It is under my control)",
        "key_words": ["already", "on top of it"]
    },
    {
        "korean": "그가 / 겁을 먹으면 / 우리는 / 그에게 / 선택의 여지를 / 남겨둘 수 없습니다.",
        "explanation": "1. 그가(If he). / 2. 겁을 먹으면(gets cold feet). / 3. 우리는(we). / 4. 그에게(him). / 5. 선택의 여지를(any choice). / 6. 남겨둘 수 없습니다(can't leave).",
        "english": "If he gets cold feet, we can't leave him any choice.",
        "key_words": ["cold feet", "겁을 먹으면"]
    }
,    
    {
        "korean": "저는 / 십자포화를 / 맞고 싶지 않습니다.(논쟁에 휘말리고 싶지 않습니다)",
        "explanation": "1. 저는(I). / 2. 십자포화를(crossfire). / 3. 맞고 싶지 않습니다(do not want to be).",
        "english": "I do not want to be in a crossfire.",
        "key_words": ["be in a crossfire"]
    },
    
    {
        "korean": "그것은 / 트위터 팔로워 수를 늘리기 위한 / 화려한 헤드라인을 가진 / 이야기일 뿐이다.",
        "explanation": "1. 그것은(It is). / 2. 트위터 팔로워 수를 늘리기 위한(to give you a bump in Twitter followers). / 3. 화려한 헤드라인을 가진(with flashy headlines). ",
        "english": "It is just a story with flashy headlines to give you a bump in Twitter followers.",
        "key_words": ["늘리기 위한","give you a bump"]
    }
    
,    
    {
        "korean": "그는 / 몇몇 후보들을 / 홍보하고 있었다. / 몇몇 후보들을 적극적으로 선전하고 있었다.",
        "explanation": "1. 홍보하고 있었다(was peddling). / 2. 적극적으로 선전하고 있었다(was actively promoting).",
        "english": "He was peddling some candidates. / He was actively promoting some candidates.",
        "key_words": ["he", "peddling", "promoting", "candidates"]
    },
    
    
    {
        "korean": "그녀는 / 직설적으로 말하는 것으로 / 유명하다.",
        "explanation": "1. 그녀는(She). / 2. 직설적으로 말하는 것으로(blunt speaking). / 3. 유명하다(has a reputation). / 4. 'Blunt'는('Blunt' means). ",
        "english": "She has a reputation for blunt speaking.",
        "key_words": ["blunt", "직설적으로"]
    },
    
    
    
    
];


let currentWordIndex = 0;
let currentAudioSource = null;
let isStopped = false;
let speakTimeouts = [];
let autoPlayInterval;

document.addEventListener('DOMContentLoaded', () => {
    updateWord();  // Update the word when the page loads

    // Add event listeners for pronunciation and controls
    document.getElementById('pronounce-1').addEventListener('click', () => {
        handlePronunciation();
    });

    document.getElementById('stop-pronouncing').addEventListener('click', stopPronouncing);
    document.getElementById('next-word').addEventListener('click', handleNextWord);
    document.getElementById('auto-play').addEventListener('click', autoPlay);

    // Populate the word list
    const wordsListContainer = document.getElementById('words-list');
    words.forEach(word => {
        const wordItem = document.createElement('p');
        wordItem.textContent = word.english;
        wordsListContainer.appendChild(wordItem);
    });
});

function updateWord() {
    const word = words[currentWordIndex];
    document.getElementById('word-definition').innerHTML = highlightKeywords(word.korean, word.key_words);
    document.getElementById('word-explanation').innerHTML = "";
    document.getElementById('word-pronunciation').innerHTML = "";
    console.log("Updating word:", word);
}

function highlightKeywords(text, keywords) {
    keywords.forEach(keyword => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        text = text.replace(regex, '<span style="color: orange;">$1</span>'); // Highlight key words
    });
    return text;
}

function stripNumbers(text) {
    return text.replace(/\d+\.\s*/g, '');
}

async function fetchAudio(text, language) {
    console.log('Requesting Audio for:', text, 'in', language);

    try {
        const response = await fetch(`http://localhost:3000/generate-audio?text=${encodeURIComponent(text)}&language=${language}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch audio data:', response.statusText);
            return null;
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioContext = getAudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.onended = () => currentAudioSource = null;
        return source;
    } catch (error) {
        console.error('Error fetching audio data:', error);
        return null;
    }
}

function getAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
}

async function pronounceWord() {
    // Make sure to resume AudioContext first, especially for mobile devices
    resumeAudioContext();

    if (!isStopped) {
        if (currentAudioSource) {
            currentAudioSource.stop();
        }

        const word = words[currentWordIndex];
        console.log("Pronouncing word:", word);

        // Play Korean sentence first
        const koreanAudio = await fetchAudio(word.korean, 'ko-KR');
        if (!koreanAudio) return;
        currentAudioSource = koreanAudio;
        koreanAudio.start();

        koreanAudio.onended = async () => {
            if (isStopped) return;

            // Play explanation after Korean
            await handleExplanationParts(word);
        };
    }
}

function resumeAudioContext() {
    const audioContext = getAudioContext();
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('Audio context resumed.');
        });
    }
}

async function handleExplanationParts(word) {
    const explanationParts = word.explanation.split('/');
    let currentPartIndex = 0;

    async function showNextPart() {
        if (currentPartIndex < explanationParts.length) {
            const part = explanationParts[currentPartIndex].trim();

            // Extract Korean and English parts
            const koreanPart = part.split('(')[0].trim();
            const englishPart = part.match(/\(([^)]+)\)/)[1];

            // Display explanation part
            const explanationElement = document.createElement('p');
            explanationElement.innerHTML = `${highlightKeywords(koreanPart, word.key_words)} <span>(${highlightKeywords(englishPart, word.key_words)})</span>`;
            document.getElementById('word-explanation').appendChild(explanationElement);

            // Play Korean audio first
            const koreanPartAudio = await fetchAudio(stripNumbers(koreanPart), 'ko-KR');
            if (koreanPartAudio) {
                koreanPartAudio.start();
                koreanPartAudio.onended = async () => {
                    if (isStopped) return;

                    // Play English audio after Korean part ends
                    const englishPartAudio = await fetchAudio(stripNumbers(englishPart), 'en-GB');
                    if (englishPartAudio) {
                        englishPartAudio.start();
                        englishPartAudio.onended = async () => {
                            currentPartIndex++;
                            await showNextPart();
                        };
                    }
                };
            }
        } else {
            await handleEnglishPronunciation(word);
        }
    }

    await showNextPart();
}

async function handleEnglishPronunciation(word) {
    const englishText = word.english;
    const element = document.getElementById('word-pronunciation');
    element.innerHTML = ""; // Clear previous pronunciation

    let charArray = [...englishText]; // Convert text to character array
    let index = 0;

    function typeWriter() {
        if (index < charArray.length) {
            element.innerHTML += charArray[index];
            index++;
            setTimeout(typeWriter, 100); // 100ms per character
        } else {
            // Highlight key words once all characters are displayed
            element.innerHTML = highlightKeywords(englishText, word.key_words);

            // Play English audio
            fetchAudio(englishText, 'en-GB').then(englishAudio => {
                if (englishAudio) {
                    currentAudioSource = englishAudio;
                    englishAudio.start();
                    englishAudio.onended = () => {
                        if (!isStopped) {
                            const nextWordTimeout = setTimeout(() => {
                                nextWord();
                            }, 2000);
                            speakTimeouts.push(nextWordTimeout);
                        }
                    };
                }
            });
        }
    }

    typeWriter();
}

function handlePronunciation() {
    stopPronouncing();
    pronounceWord();
}

function handleNextWord() {
    stopPronouncing();
    nextWord();
}

function stopPronouncing() {
    isStopped = true;
    if (currentAudioSource) {
        currentAudioSource.stop();
    }
    currentAudioSource = null;
    speakTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    speakTimeouts = [];
    clearTimeout(autoPlayInterval);
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
    setTimeout(() => pronounceWord(), 500);
}

function autoPlay() {
    stopPronouncing();
    isStopped = false;

    function playNextWord() {
        if (isStopped) return;
        updateWord();
        pronounceWord(() => {
            currentWordIndex++;
            if (currentWordIndex >= words.length) {
                currentWordIndex = 0;
            }
            autoPlayInterval = setTimeout(playNextWord, 500);
        });
    }

    autoPlayInterval = setTimeout(playNextWord, 500);
}
