const words = [
    {
        "korean": "알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the answer (그녀는 답을 알고 있습니다).",
            "He knows the way to the park (그는 공원으로 가는 길을 알고 있습니다).",
            "They know each other very well (그들은 서로를 아주 잘 알고 있습니다)."
        ]
    },
    {
        "korean": "깨닫다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knew she was wrong (그녀는 자신이 틀렸다는 것을 깨달았습니다).",
            "He knew he had to apologize (그는 사과해야 한다는 것을 깨달았습니다).",
            "They knew the truth all along (그들은 처음부터 진실을 알고 있었습니다)."
        ]
    },
    {
        "korean": "경험하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows what it's like to be alone (그녀는 혼자인 것이 어떤 것인지 경험했습니다).",
            "He knows the feeling of success (그는 성공의 느낌을 경험했습니다).",
            "They know the hardships of life (그들은 인생의 어려움을 경험했습니다)."
        ]
    },
    {
        "korean": "확신하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows that he will succeed (그녀는 그가 성공할 것이라고 확신합니다).",
            "He knows he can trust her (그는 그녀를 신뢰할 수 있다고 확신합니다).",
            "They know it will be worth it (그들은 그것이 가치 있을 것이라고 확신합니다)."
        ]
    },
    {
        "korean": "알아보다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows his face from somewhere (그녀는 그의 얼굴을 어디선가 알아봅니다).",
            "He knew her voice immediately (그는 그녀의 목소리를 즉시 알아차렸습니다).",
            "They knew the song as soon as it started (그들은 노래가 시작되자마자 알아차렸습니다)."
        ]
    },
    {
        "korean": "이해하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how the system works (그녀는 시스템이 어떻게 작동하는지 이해합니다).",
            "He knows the rules of the game (그는 게임의 규칙을 이해합니다).",
            "They know the importance of hard work (그들은 열심히 일하는 것의 중요성을 이해합니다)."
        ]
    },
    {
        "korean": "인지하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the dangers involved (그녀는 관련된 위험을 인지하고 있습니다).",
            "He knows the benefits of exercise (그는 운동의 이점을 인지하고 있습니다).",
            "They know the risks of the decision (그들은 그 결정의 위험을 인지하고 있습니다)."
        ]
    },
    {
        "korean": "확인하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows for sure that he is coming (그녀는 그가 올 것임을 확실히 알고 있습니다).",
            "He knows without a doubt that she is right (그는 그녀가 옳다는 것을 의심의 여지 없이 알고 있습니다).",
            "They know that this is the best choice (그들은 이것이 최선의 선택이라는 것을 알고 있습니다)."
        ]
    },
    {
        "korean": "친숙하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the neighborhood well (그녀는 이웃을 잘 알고 있습니다).",
            "He knows the company's history (그는 회사의 역사를 잘 알고 있습니다).",
            "They know the best places to eat (그들은 가장 좋은 식당을 잘 알고 있습니다)."
        ]
    },
    {
        "korean": "학습하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to play the piano (그녀는 피아노 치는 법을 배웠습니다).",
            "He knows how to fix cars (그는 자동차 수리하는 법을 배웠습니다).",
            "They know how to speak multiple languages (그들은 여러 언어를 말하는 법을 배웠습니다)."
        ]
    },
    {
        "korean": "의식하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows she's being watched (그녀는 자신이 감시받고 있다는 것을 알고 있습니다).",
            "He knows that they are listening (그는 그들이 듣고 있다는 것을 알고 있습니다).",
            "They know that everyone is watching (그들은 모두가 보고 있다는 것을 알고 있습니다)."
        ]
    },
    {
        "korean": "비밀을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the secret recipe (그녀는 비밀 레시피를 알고 있습니다).",
            "He knows the hidden truth (그는 숨겨진 진실을 알고 있습니다).",
            "They know the password (그들은 비밀번호를 알고 있습니다)."
        ]
    },
    {
        "korean": "경험으로 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the city like the back of her hand (그녀는 그 도시를 손바닥처럼 잘 압니다).",
            "He knows the challenges of raising children (그는 아이를 키우는 어려움을 경험으로 알고 있습니다).",
            "They know the joy of victory (그들은 승리의 기쁨을 경험으로 알고 있습니다)."
        ]
    },
    {
        "korean": "확실하게 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows that he will arrive on time (그녀는 그가 제시간에 도착할 것을 확실히 알고 있습니다).",
            "He knows that the project will succeed (그는 프로젝트가 성공할 것을 확실히 알고 있습니다).",
            "They know that the event will be a success (그들은 행사가 성공할 것을 확실히 알고 있습니다)."
        ]
    },
    {
        "korean": "알아챘다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knew something was wrong (그녀는 뭔가 잘못됐다는 것을 알아챘습니다).",
            "He knew they were hiding something (그는 그들이 뭔가를 숨기고 있다는 것을 알아챘습니다).",
            "They knew it was a mistake (그들은 그것이 실수였다는 것을 알아챘습니다)."
        ]
    },
    {
        "korean": "사실을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the facts about the case (그녀는 사건에 대한 사실을 알고 있습니다).",
            "He knows the truth about the accident (그는 사고에 대한 진실을 알고 있습니다).",
            "They know the details of the plan (그들은 계획의 세부 사항을 알고 있습니다)."
        ]
    },
    {
        "korean": "누구인지 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows who he is (그녀는 그가 누구인지 알고 있습니다).",
            "He knows who called him (그는 누가 그에게 전화했는지 알고 있습니다).",
            "They know who to ask for help (그들은 누구에게 도움을 요청해야 하는지 알고 있습니다)."
        ]
    },
    {
        "korean": "의미를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows what it means (그녀는 그것이 무엇을 의미하는지 알고 있습니다).",
            "He knows the significance of the event (그는 그 사건의 의미를 알고 있습니다).",
            "They know the meaning behind the words (그들은 그 말 뒤에 숨겨진 의미를 알고 있습니다)."
        ]
    },
    {
        "korean": "알림을 받다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knew about the meeting in advance (그녀는 회의에 대해 미리 알았습니다).",
            "He knew the schedule ahead of time (그는 일정을 미리 알았습니다).",
            "They knew the details before anyone else (그들은 누구보다도 먼저 세부 사항을 알았습니다)."
        ]
    },
    {
        "korean": "이해하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the importance of teamwork (그녀는 팀워크의 중요성을 이해합니다).",
            "He knows the value of education (그는 교육의 가치를 이해합니다).",
            "They know the necessity of hard work (그들은 열심히 일하는 것의 필요성을 이해합니다)."
        ]
    },
    {
        "korean": "이해력을 갖다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to manage people (그녀는 사람들을 관리하는 방법을 이해합니다).",
            "He knows how to solve complex problems (그는 복잡한 문제를 해결하는 방법을 이해합니다).",
            "They know how to communicate effectively (그들은 효과적으로 소통하는 방법을 이해합니다)."
        ]
    },
    {
        "korean": "경험을 통해 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the feeling of loss (그녀는 상실의 느낌을 경험으로 알고 있습니다).",
            "He knows the joy of success (그는 성공의 기쁨을 경험으로 알고 있습니다).",
            "They know the struggles of life (그들은 인생의 고난을 경험으로 알고 있습니다)."
        ]
    },
    {
        "korean": "무엇을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows what to do in an emergency (그녀는 비상 시에 무엇을 해야 할지 알고 있습니다).",
            "He knows what is expected of him (그는 자신에게 기대되는 것이 무엇인지 알고 있습니다).",
            "They know what the problem is (그들은 문제를 알고 있습니다)."
        ]
    },
    {
        "korean": "위치를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows where the keys are (그녀는 열쇠가 어디에 있는지 알고 있습니다).",
            "He knows where to find the information (그는 정보를 어디에서 찾을 수 있는지 알고 있습니다).",
            "They know where the meeting is held (그들은 회의가 어디에서 열리는지 알고 있습니다)."
        ]
    },
    {
        "korean": "시간을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows when to speak up (그녀는 언제 나서야 할지 알고 있습니다).",
            "He knows when to take a break (그는 언제 휴식을 취해야 할지 알고 있습니다).",
            "They know when the deadline is (그들은 마감 기한이 언제인지 알고 있습니다)."
        ]
    },
    {
        "korean": "이유를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows why it's important (그녀는 그것이 왜 중요한지 알고 있습니다).",
            "He knows why they are upset (그는 그들이 왜 화가 났는지 알고 있습니다).",
            "They know why the project failed (그들은 프로젝트가 왜 실패했는지 알고 있습니다)."
        ]
    },
    {
        "korean": "방법을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to fix it (그녀는 그것을 고치는 방법을 알고 있습니다).",
            "He knows how to make it work (그는 그것을 작동시키는 방법을 알고 있습니다).",
            "They know how to get there (그들은 그곳에 가는 방법을 알고 있습니다)."
        ]
    },
    {
        "korean": "가치를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the value of honesty (그녀는 정직의 가치를 알고 있습니다).",
            "He knows the worth of hard work (그는 열심히 일하는 것의 가치를 알고 있습니다).",
            "They know the price of success (그들은 성공의 대가를 알고 있습니다)."
        ]
    },
    {
        "korean": "사람을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows a lot of influential people (그녀는 많은 영향력 있는 사람들을 알고 있습니다).",
            "He knows the CEO personally (그는 CEO를 개인적으로 알고 있습니다).",
            "They know their neighbors well (그들은 이웃을 잘 알고 있습니다)."
        ]
    },
    {
        "korean": "지역을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the area very well (그녀는 그 지역을 매우 잘 알고 있습니다).",
            "He knows the city inside out (그는 그 도시를 속속들이 알고 있습니다).",
            "They know the neighborhood (그들은 동네를 알고 있습니다)."
        ]
    },
    {
        "korean": "문화적 이해를 갖다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the customs of the country (그녀는 그 나라의 풍습을 알고 있습니다).",
            "He knows the traditions of his ancestors (그는 조상의 전통을 알고 있습니다).",
            "They know the etiquette of the society (그들은 사회의 예절을 알고 있습니다)."
        ]
    },
    {
        "korean": "지혜를 갖다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the wisdom of patience (그녀는 인내의 지혜를 알고 있습니다).",
            "He knows the value of silence (그는 침묵의 가치를 알고 있습니다).",
            "They know the power of words (그들은 말의 힘을 알고 있습니다)."
        ]
    },
    {
        "korean": "과거를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the history of the place (그녀는 그 장소의 역사를 알고 있습니다).",
            "He knows the story behind the monument (그는 그 기념물 뒤에 숨겨진 이야기를 알고 있습니다).",
            "They know the background of the event (그들은 그 사건의 배경을 알고 있습니다)."
        ]
    },
    {
        "korean": "미래를 예측하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows what will happen next (그녀는 다음에 무슨 일이 일어날지 알고 있습니다).",
            "He knows the outcome of the decision (그는 그 결정의 결과를 알고 있습니다).",
            "They know the future of the company (그들은 회사의 미래를 알고 있습니다)."
        ]
    },
    {
        "korean": "소문을 듣다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the latest gossip (그녀는 최신 소문을 알고 있습니다).",
            "He knows what people are saying (그는 사람들이 무슨 말을 하는지 알고 있습니다).",
            "They know the rumors about the new manager (그들은 새 관리자에 대한 소문을 알고 있습니다)."
        ]
    },
    {
        "korean": "언어를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows three languages (그녀는 세 개의 언어를 알고 있습니다).",
            "He knows how to speak French (그는 프랑스어를 할 줄 압니다).",
            "They know the local dialect (그들은 지역 방언을 알고 있습니다)."
        ]
    },
    {
        "korean": "기술을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to code (그녀는 코딩하는 방법을 알고 있습니다).",
            "He knows how to repair electronics (그는 전자기기를 수리하는 방법을 알고 있습니다).",
            "They know how to operate the machinery (그들은 기계를 작동하는 방법을 알고 있습니다)."
        ]
    },
    {
        "korean": "필요를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows what she needs to succeed (그녀는 성공하기 위해 무엇이 필요한지 알고 있습니다).",
            "He knows what is required for the job (그는 그 일에 무엇이 필요한지 알고 있습니다).",
            "They know the necessary steps to take (그들은 필요한 조치를 알고 있습니다)."
        ]
    },
    {
        "korean": "통찰력을 갖다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the hidden meaning behind the words (그녀는 그 말 뒤에 숨겨진 의미를 알고 있습니다).",
            "He knows the underlying causes of the problem (그는 문제의 근본 원인을 알고 있습니다).",
            "They know the deeper truth of the situation (그들은 상황의 더 깊은 진실을 알고 있습니다)."
        ]
    },
    {
        "korean": "직관을 갖다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows intuitively what to do (그녀는 직관적으로 무엇을 해야 할지 알고 있습니다).",
            "He knows by instinct how to react (그는 본능적으로 어떻게 반응해야 할지 알고 있습니다).",
            "They know without thinking what is right (그들은 생각하지 않고도 무엇이 옳은지 알고 있습니다)."
        ]
    },
    {
        "korean": "직업을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows her job inside and out (그녀는 자신의 일을 속속들이 알고 있습니다).",
            "He knows the industry standards (그는 업계 표준을 알고 있습니다).",
            "They know the requirements of their profession (그들은 직업의 요구 사항을 알고 있습니다)."
        ]
    },
    {
        "korean": "상황을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the gravity of the situation (그녀는 상황의 중대성을 알고 있습니다).",
            "He knows the urgency of the matter (그는 그 문제의 긴급성을 알고 있습니다).",
            "They know the complexity of the issue (그들은 그 문제의 복잡성을 알고 있습니다)."
        ]
    },
    {
        "korean": "감정을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the pain of losing a loved one (그녀는 사랑하는 사람을 잃은 고통을 알고 있습니다).",
            "He knows the joy of reuniting with family (그는 가족과 재회하는 기쁨을 알고 있습니다).",
            "They know the fear of failure (그들은 실패의 두려움을 알고 있습니다)."
        ]
    },
    {
        "korean": "방법을 터득하다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to negotiate (그녀는 협상하는 방법을 터득했습니다).",
            "He knows how to lead a team (그는 팀을 이끄는 방법을 터득했습니다).",
            "They know how to solve conflicts (그들은 갈등을 해결하는 방법을 터득했습니다)."
        ]
    },
    {
        "korean": "가르칠 수 있다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to teach math (그녀는 수학을 가르칠 수 있습니다).",
            "He knows how to train new employees (그는 신입 사원을 훈련시킬 수 있습니다).",
            "They know how to mentor others (그들은 다른 사람들을 멘토링할 수 있습니다)."
        ]
    },
    {
        "korean": "책임감을 갖다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows her responsibilities (그녀는 자신의 책임을 알고 있습니다).",
            "He knows what is expected of him (그는 자신에게 기대되는 것을 알고 있습니다).",
            "They know their duties (그들은 자신의 의무를 알고 있습니다)."
        ]
    },
    {
        "korean": "전문성을 갖다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the science behind the process (그녀는 그 과정의 과학을 알고 있습니다).",
            "He knows the technical details (그는 기술적인 세부 사항을 알고 있습니다).",
            "They know the best practices in the field (그들은 그 분야의 모범 사례를 알고 있습니다)."
        ]
    },
    {
        "korean": "연결을 갖다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the right people (그녀는 적절한 사람들을 알고 있습니다).",
            "He knows the network (그는 네트워크를 알고 있습니다).",
            "They know the community leaders (그들은 지역 사회의 지도자들을 알고 있습니다)."
        ]
    },
    {
        "korean": "물건을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the best tools for the job (그녀는 그 일에 가장 적합한 도구를 알고 있습니다).",
            "He knows the right equipment to use (그는 사용할 올바른 장비를 알고 있습니다).",
            "They know the materials needed (그들은 필요한 자재를 알고 있습니다)."
        ]
    },
    {
        "korean": "대처 방법을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to handle stress (그녀는 스트레스를 다루는 방법을 알고 있습니다).",
            "He knows how to manage crisis (그는 위기를 관리하는 방법을 알고 있습니다).",
            "They know how to overcome obstacles (그들은 장애를 극복하는 방법을 알고 있습니다)."
        ]
    },
    {
        "korean": "가족을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows her relatives well (그녀는 친척들을 잘 알고 있습니다).",
            "He knows his family tree (그는 그의 가계도를 알고 있습니다).",
            "They know their ancestors' stories (그들은 조상들의 이야기를 알고 있습니다)."
        ]
    },
    {
        "korean": "예술을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the history of art (그녀는 예술의 역사를 알고 있습니다).",
            "He knows the techniques of painting (그는 그림 기법을 알고 있습니다).",
            "They know the famous artists (그들은 유명한 예술가들을 알고 있습니다)."
        ]
    },
    {
        "korean": "음악을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to play the guitar (그녀는 기타를 치는 방법을 알고 있습니다).",
            "He knows the theory of music (그는 음악 이론을 알고 있습니다).",
            "They know the popular songs (그들은 인기 있는 노래를 알고 있습니다)."
        ]
    },
    {
        "korean": "건강을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the importance of nutrition (그녀는 영양의 중요성을 알고 있습니다).",
            "He knows how to maintain fitness (그는 체력을 유지하는 방법을 알고 있습니다).",
            "They know the benefits of regular check-ups (그들은 정기 검진의 이점을 알고 있습니다)."
        ]
    },
    {
        "korean": "경제를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the principles of economics (그녀는 경제의 원칙을 알고 있습니다).",
            "He knows the stock market (그는 주식 시장을 알고 있습니다).",
            "They know how to invest wisely (그들은 현명하게 투자하는 방법을 알고 있습니다)."
        ]
    },
    {
        "korean": "정치를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the political landscape (그녀는 정치 지형을 알고 있습니다).",
            "He knows the candidates (그는 후보자들을 알고 있습니다).",
            "They know the policies (그들은 정책을 알고 있습니다)."
        ]
    },
    {
        "korean": "과학을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the scientific method (그녀는 과학적 방법을 알고 있습니다).",
            "He knows the laws of physics (그는 물리 법칙을 알고 있습니다).",
            "They know the recent discoveries (그들은 최근의 발견을 알고 있습니다)."
        ]
    },
    {
        "korean": "기술을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the latest technology (그녀는 최신 기술을 알고 있습니다).",
            "He knows how to use software (그는 소프트웨어를 사용하는 방법을 알고 있습니다).",
            "They know the advancements in the field (그들은 그 분야의 발전을 알고 있습니다)."
        ]
    },
    {
        "korean": "요리를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to bake a cake (그녀는 케이크를 굽는 방법을 알고 있습니다).",
            "He knows the recipes by heart (그는 레시피를 외우고 있습니다).",
            "They know the culinary techniques (그들은 요리 기법을 알고 있습니다)."
        ]
    },
    {
        "korean": "동물을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the habits of cats (그녀는 고양이의 습관을 알고 있습니다).",
            "He knows how to train dogs (그는 개를 훈련시키는 방법을 알고 있습니다).",
            "They know the wildlife in the area (그들은 그 지역의 야생 동물을 알고 있습니다)."
        ]
    },
    {
        "korean": "식물을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to grow vegetables (그녀는 채소를 기르는 방법을 알고 있습니다).",
            "He knows the names of flowers (그는 꽃의 이름을 알고 있습니다).",
            "They know the uses of herbs (그들은 허브의 용도를 알고 있습니다)."
        ]
    },
    {
        "korean": "역사를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the history of the country (그녀는 그 나라의 역사를 알고 있습니다).",
            "He knows the events that shaped the world (그는 세상을 형성한 사건들을 알고 있습니다).",
            "They know the significant dates (그들은 중요한 날짜를 알고 있습니다)."
        ]
    },
    {
        "korean": "스포츠를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the rules of soccer (그녀는 축구의 규칙을 알고 있습니다).",
            "He knows how to play basketball (그는 농구를 하는 방법을 알고 있습니다).",
            "They know the famous athletes (그들은 유명한 운동선수들을 알고 있습니다)."
        ]
    },
    {
        "korean": "여행지를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the best tourist spots (그녀는 최고의 관광지를 알고 있습니다).",
            "He knows the hidden gems of the city (그는 도시의 숨겨진 보석들을 알고 있습니다).",
            "They know the local culture (그들은 지역 문화를 알고 있습니다)."
        ]
    },
    {
        "korean": "명소를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the famous landmarks (그녀는 유명한 명소를 알고 있습니다).",
            "He knows the historical sites (그는 역사적인 장소를 알고 있습니다).",
            "They know the natural wonders (그들은 자연의 경이로움을 알고 있습니다)."
        ]
    },
    {
        "korean": "휴식을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the importance of relaxation (그녀는 휴식의 중요성을 알고 있습니다).",
            "He knows how to unwind after work (그는 일 후에 어떻게 휴식을 취하는지 알고 있습니다).",
            "They know the benefits of taking breaks (그들은 휴식의 이점을 알고 있습니다)."
        ]
    },
    {
        "korean": "정신건강을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the signs of stress (그녀는 스트레스의 징후를 알고 있습니다).",
            "He knows how to manage anxiety (그는 불안을 관리하는 방법을 알고 있습니다).",
            "They know the techniques for mindfulness (그들은 마음챙김 기법을 알고 있습니다)."
        ]
    },
    {
        "korean": "사회 문제를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the issues facing the community (그녀는 지역 사회가 직면한 문제를 알고 있습니다).",
            "He knows the solutions to reduce poverty (그는 빈곤을 줄이는 해결책을 알고 있습니다).",
            "They know the impact of climate change (그들은 기후 변화의 영향을 알고 있습니다)."
        ]
    },
    {
        "korean": "재정 관리를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to budget effectively (그녀는 효과적으로 예산을 관리하는 방법을 알고 있습니다).",
            "He knows the importance of saving (그는 저축의 중요성을 알고 있습니다).",
            "They know how to invest wisely (그들은 현명하게 투자하는 방법을 알고 있습니다)."
        ]
    },
    {
        "korean": "교육을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the best teaching methods (그녀는 최고의 교수법을 알고 있습니다).",
            "He knows how to motivate students (그는 학생들을 동기 부여하는 방법을 알고 있습니다).",
            "They know the curriculum well (그들은 교육 과정을 잘 알고 있습니다)."
        ]
    },
    {
        "korean": "친구를 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows her best friend's secrets (그녀는 그녀의 절친의 비밀을 알고 있습니다).",
            "He knows his friends' preferences (그는 그의 친구들의 선호를 알고 있습니다).",
            "They know how to support each other (그들은 서로를 지지하는 방법을 알고 있습니다)."
        ]
    },
    {
        "korean": "안전 수칙을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows the fire escape routes (그녀는 화재 대피 경로를 알고 있습니다).",
            "He knows how to perform CPR (그는 심폐소생술을 수행하는 방법을 알고 있습니다).",
            "They know the emergency procedures (그들은 비상 절차를 알고 있습니다)."
        ]
    },
    {
        "korean": "리더십을 알다",
        "english": "know",
        "pronunciation": "[noʊ]",
        "examples": [
            "She knows how to lead by example (그녀는 모범을 보이며 이끄는 방법을 알고 있습니다).",
            "He knows how to inspire his team (그는 그의 팀을 고무하는 방법을 알고 있습니다).",
            "They know how to make strategic decisions (그들은 전략적 결정을 내리는 방법을 알고 있습니다)."
        ]
    }
];



let currentWordIndex = 0;
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
        const [english, korean] = example.split(" (");
        const listItem = document.createElement('li');
        listItem.innerHTML = `${english}<br>(${korean}`;
        exampleList.appendChild(listItem);
    });
}

function pronounceWord(times, callback) {
    let count = 0;
    const word = words[currentWordIndex];
    const { korean, examples } = word;

    function speak() {
        if (count < times) {
            const koreanUtterance = new SpeechSynthesisUtterance(korean);
            koreanUtterance.lang = 'ko-KR';
            koreanUtterance.rate = 1;

            koreanUtterance.onend = () => {
                let exampleIndex = 0;
                function speakExample() {
                    if (exampleIndex < examples.length) {
                        const exampleUtterance = new SpeechSynthesisUtterance(examples[exampleIndex].split(" (")[0]); // 예문의 영어 부분만 발음
                        exampleUtterance.lang = 'en-GB';
                        exampleUtterance.rate = 1;
                        exampleUtterance.onend = () => {
                            exampleIndex++;
                            if (exampleIndex < examples.length) {
                                setTimeout(speakExample, 1000); // 1초 간격
                            } else {
                                count++;
                                if (count < times) {
                                    setTimeout(speak, 1000); // 1초 후 다음 발음 시작
                                } else if (callback) {
                                    callback();
                                }
                            }
                        };
                        synth.speak(exampleUtterance);
                    }
                }
                speakExample();
            };

            setTimeout(() => {
                synth.speak(koreanUtterance);
            }, 500); // 0.5초 지연
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
        playNextWord(); // 17초 간격으로 다음 단어 재생
    }, 17000);
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
    setTimeout(() => pronounceWord(1), 2000); // 페이지 로드 후 2초 지연
});
