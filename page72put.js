const words = [
    {
        "korean": "놓다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the book on the table (그녀는 책을 테이블 위에 놓았습니다).",
            "He put the keys in his pocket (그는 열쇠를 주머니에 넣었습니다).",
            "They put their bags in the car (그들은 가방을 차에 넣었습니다)."
        ]
    },
    {
        "korean": "입다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put on her coat (그녀는 코트를 입었습니다).",
            "He put on his shoes (그는 신발을 신었습니다).",
            "They put on their hats (그들은 모자를 썼습니다)."
        ]
    },
    {
        "korean": "두다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her bag on the floor (그녀는 가방을 바닥에 두었습니다).",
            "He put his phone on the desk (그는 휴대폰을 책상 위에 두었습니다).",
            "They put the groceries on the counter (그들은 식료품을 카운터에 두었습니다)."
        ]
    },
    {
        "korean": "말하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put it in a nice way (그녀는 그것을 좋게 말했습니다).",
            "He put it bluntly (그는 직설적으로 말했습니다).",
            "They put their feelings into words (그들은 감정을 말로 표현했습니다)."
        ]
    },
    {
        "korean": "시도하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her plan into action (그녀는 계획을 실행에 옮겼습니다).",
            "He put his idea to the test (그는 아이디어를 시험해 보았습니다).",
            "They put their theory into practice (그들은 이론을 실제로 적용해 보았습니다)."
        ]
    },
    {
        "korean": "투자하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put money into the business (그녀는 사업에 돈을 투자했습니다).",
            "He put his savings into stocks (그는 저축을 주식에 투자했습니다).",
            "They put resources into research (그들은 연구에 자원을 투자했습니다)."
        ]
    },
    {
        "korean": "강요하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put pressure on him to succeed (그녀는 그에게 성공하라고 압박했습니다).",
            "He put the blame on her (그는 그녀에게 책임을 전가했습니다).",
            "They put the burden on their shoulders (그들은 부담을 짊어졌습니다)."
        ]
    },
    {
        "korean": "정하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put a date on the calendar (그녀는 달력에 날짜를 정했습니다).",
            "He put a name on the list (그는 목록에 이름을 올렸습니다).",
            "They put a price on the product (그들은 제품에 가격을 매겼습니다)."
        ]
    },
    {
        "korean": "저축하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put money in the bank (그녀는 은행에 돈을 저축했습니다).",
            "He put aside some savings (그는 저축을 따로 모아 두었습니다).",
            "They put funds into an account (그들은 계좌에 자금을 예치했습니다)."
        ]
    },
    {
        "korean": "위험에 빠뜨리다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put herself in danger (그녀는 자신을 위험에 빠뜨렸습니다).",
            "He put their lives at risk (그는 그들의 생명을 위험에 빠뜨렸습니다).",
            "They put everything on the line (그들은 모든 것을 걸었습니다)."
        ]
    },
    {
        "korean": "처벌하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put him in jail (그녀는 그를 감옥에 보냈습니다).",
            "He put her on probation (그는 그녀를 보호 관찰에 처했습니다).",
            "They put the criminal behind bars (그들은 범죄자를 철창 안에 가두었습니다)."
        ]
    },
    {
        "korean": "제한하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put limits on spending (그녀는 지출에 제한을 두었습니다).",
            "He put a cap on the budget (그는 예산에 상한선을 설정했습니다).",
            "They put restrictions in place (그들은 제한을 도입했습니다)."
        ]
    },
    {
        "korean": "고정하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the picture on the wall (그녀는 벽에 그림을 고정했습니다).",
            "He put the sign in the yard (그는 마당에 표지판을 고정했습니다).",
            "They put the flag on the pole (그들은 깃대를 고정했습니다)."
        ]
    },
    {
        "korean": "설명하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put it simply (그녀는 그것을 간단히 설명했습니다).",
            "He put it in layman's terms (그는 그것을 쉽게 설명했습니다).",
            "They put it in perspective (그들은 그것을 시각적으로 설명했습니다)."
        ]
    },
    {
        "korean": "제출하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put in her resignation (그녀는 사직서를 제출했습니다).",
            "He put in an application (그는 지원서를 제출했습니다).",
            "They put in a request for leave (그들은 휴가 신청서를 제출했습니다)."
        ]
    },
    {
        "korean": "참여하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put in her time at the charity (그녀는 자선 활동에 시간을 보냈습니다).",
            "He put effort into his work (그는 일에 노력을 기울였습니다).",
            "They put energy into the project (그들은 프로젝트에 에너지를 쏟았습니다)."
        ]
    },
    {
        "korean": "중요시하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put value on education (그녀는 교육을 중요시했습니다).",
            "He put emphasis on teamwork (그는 팀워크를 강조했습니다).",
            "They put priority on safety (그들은 안전을 우선시했습니다)."
        ]
    },
    {
        "korean": "저지하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put a stop to the rumors (그녀는 소문을 저지했습니다).",
            "He put an end to the argument (그는 논쟁을 끝냈습니다).",
            "They put a halt to the project (그들은 프로젝트를 중단했습니다)."
        ]
    },
    {
        "korean": "기억하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the memory behind her (그녀는 기억을 잊었습니다).",
            "He put the experience to good use (그는 경험을 잘 활용했습니다).",
            "They put the past in the past (그들은 과거를 잊었습니다)."
        ]
    },
    {
        "korean": "표현하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her thoughts into words (그녀는 생각을 말로 표현했습니다).",
            "He put his feelings on paper (그는 감정을 종이에 적었습니다).",
            "They put their ideas into action (그들은 아이디어를 실행에 옮겼습니다)."
        ]
    },
    {
        "korean": "촉진하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put forth a proposal (그녀는 제안을 내놓았습니다).",
            "He put forward a suggestion (그는 제안을 제시했습니다).",
            "They put out a call for volunteers (그들은 자원봉사자를 모집했습니다)."
        ]
    },
    {
        "korean": "사용하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her skills to work (그녀는 자신의 기술을 사용했습니다).",
            "He put his knowledge to use (그는 자신의 지식을 활용했습니다).",
            "They put their tools to good use (그들은 도구를 잘 활용했습니다)."
        ]
    },
    {
        "korean": "집중하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her mind to the task (그녀는 일에 집중했습니다).",
            "He put his heart into the project (그는 프로젝트에 마음을 쏟았습니다).",
            "They put their efforts into the goal (그들은 목표에 노력했습니다)."
        ]
    },
    {
        "korean": "할애하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put time into her hobbies (그녀는 취미에 시간을 할애했습니다).",
            "He put hours into studying (그는 공부에 시간을 쏟았습니다).",
            "They put years into building their business (그들은 사업을 키우는 데 몇 년을 보냈습니다)."
        ]
    },
    {
        "korean": "모으다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her thoughts together (그녀는 생각을 모았습니다).",
            "He put the pieces of the puzzle together (그는 퍼즐 조각을 맞추었습니다).",
            "They put the team together (그들은 팀을 구성했습니다)."
        ]
    },
    {
        "korean": "정리하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the room in order (그녀는 방을 정리했습니다).",
            "He put his desk in order (그는 책상을 정리했습니다).",
            "They put their house in order (그들은 집을 정리했습니다)."
        ]
    },
    {
        "korean": "기록하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the data in the system (그녀는 데이터를 시스템에 입력했습니다).",
            "He put the details in the report (그는 세부 사항을 보고서에 기록했습니다).",
            "They put the information in the database (그들은 정보를 데이터베이스에 입력했습니다)."
        ]
    },
    {
        "korean": "집어넣다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the groceries away (그녀는 식료품을 집어넣었습니다).",
            "He put the dishes in the cupboard (그는 그릇을 찬장에 넣었습니다).",
            "They put the toys in the box (그들은 장난감을 상자에 넣었습니다)."
        ]
    },
    {
        "korean": "배정하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the students into groups (그녀는 학생들을 그룹으로 나누었습니다).",
            "He put the tasks into categories (그는 작업을 카테고리로 나누었습니다).",
            "They put the items in order of importance (그들은 항목을 중요도 순으로 나열했습니다)."
        ]
    },
    {
        "korean": "낭비하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her money down the drain (그녀는 돈을 낭비했습니다).",
            "He put his time to waste (그는 시간을 낭비했습니다).",
            "They put their efforts to no avail (그들은 노력을 헛되이 했습니다)."
        ]
    },
    {
        "korean": "내놓다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the trash out (그녀는 쓰레기를 내놓았습니다).",
            "He put the recycling out (그는 재활용품을 내놓았습니다).",
            "They put the laundry out to dry (그들은 빨래를 널었습니다)."
        ]
    },
    {
        "korean": "저항하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put up a fight (그녀는 저항했습니다).",
            "He put up resistance (그는 저항했습니다).",
            "They put up a struggle (그들은 저항했습니다)."
        ]
    },
    {
        "korean": "실천하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her plan into action (그녀는 계획을 실천했습니다).",
            "He put his words into deeds (그는 말을 행동으로 옮겼습니다).",
            "They put their ideas into practice (그들은 아이디어를 실천했습니다)."
        ]
    },
    {
        "korean": "기록하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the event on the calendar (그녀는 일정을 달력에 기록했습니다).",
            "He put the appointment in his schedule (그는 약속을 일정에 기록했습니다).",
            "They put the date in their planners (그들은 날짜를 일정표에 기록했습니다)."
        ]
    },
    {
        "korean": "준비하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put together the presentation (그녀는 발표를 준비했습니다).",
            "He put together the proposal (그는 제안을 준비했습니다).",
            "They put together the event (그들은 행사를 준비했습니다)."
        ]
    },
    {
        "korean": "도입하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put in a new system (그녀는 새로운 시스템을 도입했습니다).",
            "He put in new rules (그는 새로운 규칙을 도입했습니다).",
            "They put in a new policy (그들은 새로운 정책을 도입했습니다)."
        ]
    },
    {
        "korean": "소비하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put a lot of time into the project (그녀는 프로젝트에 많은 시간을 쏟았습니다).",
            "He put a lot of effort into his work (그는 일에 많은 노력을 기울였습니다).",
            "They put a lot of resources into the business (그들은 사업에 많은 자원을 쏟았습니다)."
        ]
    },
    {
        "korean": "강조하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put stress on the importance of education (그녀는 교육의 중요성을 강조했습니다).",
            "He put emphasis on punctuality (그는 시간 엄수를 강조했습니다).",
            "They put focus on customer satisfaction (그들은 고객 만족에 중점을 두었습니다)."
        ]
    },
    {
        "korean": "비축하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put aside some money for emergencies (그녀는 비상시를 위해 돈을 비축했습니다).",
            "He put aside time for his family (그는 가족을 위해 시간을 비축했습니다).",
            "They put aside resources for future use (그들은 미래 사용을 위해 자원을 비축했습니다)."
        ]
    },
    {
        "korean": "준비하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the ingredients together (그녀는 재료를 준비했습니다).",
            "He put the tools in place (그는 도구를 준비했습니다).",
            "They put the equipment in order (그들은 장비를 준비했습니다)."
        ]
    },
    {
        "korean": "저장하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the files in the cabinet (그녀는 파일을 캐비닛에 저장했습니다).",
            "He put the documents in the safe (그는 문서를 금고에 저장했습니다).",
            "They put the records in storage (그들은 기록을 보관했습니다)."
        ]
    },
    {
        "korean": "불을 끄다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put out the fire (그녀는 불을 껐습니다).",
            "He put out the cigarette (그는 담배를 껐습니다).",
            "They put out the flames (그들은 불길을 껐습니다)."
        ]
    },
    {
        "korean": "전달하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her thoughts into writing (그녀는 생각을 글로 표현했습니다).",
            "He put his feelings into music (그는 감정을 음악으로 표현했습니다).",
            "They put their message into art (그들은 메시지를 예술로 표현했습니다)."
        ]
    },
    {
        "korean": "문제를 해결하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the pieces together (그녀는 문제를 해결했습니다).",
            "He put the puzzle together (그는 퍼즐을 맞췄습니다).",
            "They put the clues together (그들은 단서를 모았습니다)."
        ]
    },
    {
        "korean": "배치하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the chairs in a circle (그녀는 의자를 원형으로 배치했습니다).",
            "He put the tables in rows (그는 테이블을 줄지어 배치했습니다).",
            "They put the equipment in the right place (그들은 장비를 제자리에 배치했습니다)."
        ]
    },
    {
        "korean": "출판하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put out a new book (그녀는 새 책을 출판했습니다).",
            "He put out a newsletter (그는 뉴스레터를 발행했습니다).",
            "They put out a press release (그들은 보도 자료를 발표했습니다)."
        ]
    },
    {
        "korean": "규칙을 정하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put rules in place (그녀는 규칙을 정했습니다).",
            "He put guidelines in order (그는 지침을 정했습니다).",
            "They put policies in place (그들은 정책을 도입했습니다)."
        ]
    },
    {
        "korean": "문을 잠그다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the lock on the door (그녀는 문에 자물쇠를 걸었습니다).",
            "He put the bolt in place (그는 볼트를 제자리에 고정했습니다).",
            "They put the latch on the gate (그들은 문에 걸쇠를 걸었습니다)."
        ]
    },
    {
        "korean": "청소하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the room in order (그녀는 방을 정리했습니다).",
            "He put his tools away (그는 도구를 정리했습니다).",
            "They put their workspace in order (그들은 작업 공간을 정리했습니다)."
        ]
    },
    {
        "korean": "확립하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her name on the map (그녀는 자신의 이름을 알렸습니다).",
            "He put his stamp on the project (그는 프로젝트에 자신의 영향을 미쳤습니다).",
            "They put their mark on the industry (그들은 업계에 자신들의 흔적을 남겼습니다)."
        ]
    },
    {
        "korean": "휴식을 취하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her feet up after a long day (그녀는 긴 하루 후에 발을 올리고 쉬었습니다).",
            "He put his head down for a nap (그는 잠시 낮잠을 잤습니다).",
            "They put their minds at ease (그들은 마음을 편히 했습니다)."
        ]
    },
    {
        "korean": "잡아두다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the reservations on hold (그녀는 예약을 잡아두었습니다).",
            "He put the meeting on hold (그는 회의를 연기했습니다).",
            "They put the project on hold (그들은 프로젝트를 보류했습니다)."
        ]
    },
    {
        "korean": "설립하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put up a new business (그녀는 새 사업을 설립했습니다).",
            "He put up a new building (그는 새 건물을 지었습니다).",
            "They put up a new website (그들은 새 웹사이트를 만들었습니다)."
        ]
    },
    {
        "korean": "끌다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the audience in stitches (그녀는 관객들을 웃겼습니다).",
            "He put the crowd on their feet (그는 군중을 열광시켰습니다).",
            "They put the listeners in a trance (그들은 청중을 황홀하게 만들었습니다)."
        ]
    },
    {
        "korean": "정돈하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the files in order (그녀는 파일을 정돈했습니다).",
            "He put the documents in a folder (그는 문서를 폴더에 정리했습니다).",
            "They put the books on the shelf (그들은 책을 선반에 정리했습니다)."
        ]
    },
    {
        "korean": "차를 주차하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the car in the garage (그녀는 차를 차고에 주차했습니다).",
            "He put the vehicle in the driveway (그는 차를 진입로에 주차했습니다).",
            "They put the truck in the parking lot (그들은 트럭을 주차장에 주차했습니다)."
        ]
    },
    {
        "korean": "고용하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put him on the payroll (그녀는 그를 고용했습니다).",
            "He put her in charge of the project (그는 그녀를 프로젝트 책임자로 임명했습니다).",
            "They put them on the team (그들은 그들을 팀에 합류시켰습니다)."
        ]
    },
    {
        "korean": "장비를 설치하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the system in place (그녀는 시스템을 설치했습니다).",
            "He put the software on the computer (그는 소프트웨어를 컴퓨터에 설치했습니다).",
            "They put the hardware in the office (그들은 하드웨어를 사무실에 설치했습니다)."
        ]
    },
    {
        "korean": "경고하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put out a warning (그녀는 경고를 발령했습니다).",
            "He put the team on alert (그는 팀을 경계 상태로 만들었습니다).",
            "They put the public on notice (그들은 대중에게 공지했습니다)."
        ]
    },
    {
        "korean": "압력을 넣다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put pressure on the competition (그녀는 경쟁에 압력을 넣었습니다).",
            "He put the squeeze on the market (그는 시장에 압력을 넣었습니다).",
            "They put the heat on the rivals (그들은 경쟁자들에게 압력을 넣었습니다)."
        ]
    },
    {
        "korean": "안전하게 하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put safety first (그녀는 안전을 최우선으로 했습니다).",
            "He put measures in place (그는 안전 조치를 취했습니다).",
            "They put precautions in effect (그들은 예방 조치를 취했습니다)."
        ]
    },
    {
        "korean": "무릎 꿇다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put him on his knees (그녀는 그를 무릎 꿇게 했습니다).",
            "He put the enemy in submission (그는 적을 굴복시켰습니다).",
            "They put the opponents on the ground (그들은 상대를 땅에 눕혔습니다)."
        ]
    },
    {
        "korean": "환영하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put out the welcome mat (그녀는 환영했습니다).",
            "He put out a hand of friendship (그는 우정을 표현했습니다).",
            "They put on a friendly face (그들은 친절한 얼굴을 보였습니다)."
        ]
    },
    {
        "korean": "단체를 조직하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put together a committee (그녀는 위원회를 조직했습니다).",
            "He put together a task force (그는 특별 작업반을 구성했습니다).",
            "They put together a coalition (그들은 연합을 구성했습니다)."
        ]
    },
    {
        "korean": "비교하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her skills up against the best (그녀는 자신의 기술을 최고와 비교했습니다).",
            "He put his knowledge to the test (그는 자신의 지식을 시험했습니다).",
            "They put their theories to the test (그들은 자신의 이론을 시험했습니다)."
        ]
    },
    {
        "korean": "이해하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the concept into context (그녀는 개념을 이해했습니다).",
            "He put the idea into perspective (그는 아이디어를 이해했습니다).",
            "They put the issue in a new light (그들은 문제를 새로운 관점에서 이해했습니다)."
        ]
    },
    {
        "korean": "진정시키다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the baby to sleep (그녀는 아기를 재웠습니다).",
            "He put the dog to rest (그는 개를 재웠습니다).",
            "They put their worries to rest (그들은 걱정을 진정시켰습니다)."
        ]
    },
    {
        "korean": "시스템을 설치하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put in a new alarm system (그녀는 새로운 경보 시스템을 설치했습니다).",
            "He put in a security system (그는 보안 시스템을 설치했습니다).",
            "They put in a monitoring system (그들은 모니터링 시스템을 설치했습니다)."
        ]
    },
    {
        "korean": "실험하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the theory to the test (그녀는 이론을 시험했습니다).",
            "He put the hypothesis into practice (그는 가설을 실험했습니다).",
            "They put the method to the test (그들은 방법을 실험했습니다)."
        ]
    },
    {
        "korean": "일정에 맞추다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the meeting on the calendar (그녀는 회의를 일정에 맞췄습니다).",
            "He put the appointment on his schedule (그는 약속을 일정에 맞췄습니다).",
            "They put the event on the agenda (그들은 행사를 일정에 맞췄습니다)."
        ]
    },
    {
        "korean": "배를 대다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the boat in the water (그녀는 배를 물에 띄웠습니다).",
            "He put the ship in the harbor (그는 배를 항구에 대었습니다).",
            "They put the yacht in the marina (그들은 요트를 마리나에 대었습니다)."
        ]
    },
    {
        "korean": "옷을 입다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put on a jacket (그녀는 재킷을 입었습니다).",
            "He put on a hat (그는 모자를 썼습니다).",
            "They put on gloves (그들은 장갑을 꼈습니다)."
        ]
    },
    {
        "korean": "지식을 적용하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her knowledge to use (그녀는 자신의 지식을 활용했습니다).",
            "He put his skills to work (그는 자신의 기술을 활용했습니다).",
            "They put their expertise to the test (그들은 자신의 전문 지식을 시험했습니다)."
        ]
    },
    {
        "korean": "설득하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put forth a convincing argument (그녀는 설득력 있는 주장을 내놓았습니다).",
            "He put out a persuasive case (그는 설득력 있는 사례를 제시했습니다).",
            "They put forward compelling evidence (그들은 설득력 있는 증거를 제시했습니다)."
        ]
    },
    {
        "korean": "제안하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put forth a proposal (그녀는 제안을 내놓았습니다).",
            "He put out an idea (그는 아이디어를 제시했습니다).",
            "They put forward a suggestion (그들은 제안을 제시했습니다)."
        ]
    },
    {
        "korean": "내기하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put a bet on the race (그녀는 경주에 내기했습니다).",
            "He put money on the game (그는 게임에 돈을 걸었습니다).",
            "They put a wager on the outcome (그들은 결과에 내기했습니다)."
        ]
    },
    {
        "korean": "지적하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put her finger on the problem (그녀는 문제를 지적했습니다).",
            "He put his hand on the issue (그는 문제를 지적했습니다).",
            "They put their attention on the matter (그들은 문제에 주의를 기울였습니다)."
        ]
    },
    {
        "korean": "보호하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put a shield around him (그녀는 그를 보호했습니다).",
            "He put a barrier in place (그는 장벽을 설치했습니다).",
            "They put up defenses (그들은 방어를 준비했습니다)."
        ]
    },
    {
        "korean": "제작하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put together a model (그녀는 모델을 제작했습니다).",
            "He put together a prototype (그는 시제품을 제작했습니다).",
            "They put together a sample (그들은 샘플을 제작했습니다)."
        ]
    },
    {
        "korean": "보관하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the valuables in a safe (그녀는 귀중품을 금고에 보관했습니다).",
            "He put the documents in a secure place (그는 문서를 안전한 곳에 보관했습니다).",
            "They put the funds in a trust (그들은 자금을 신탁에 보관했습니다)."
        ]
    },
    {
        "korean": "요약하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the points in a summary (그녀는 요점을 요약했습니다).",
            "He put the details in a brief (그는 세부 사항을 요약했습니다).",
            "They put the information in a nutshell (그들은 정보를 간략하게 요약했습니다)."
        ]
    },
    {
        "korean": "보관하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the jewelry in a box (그녀는 보석을 상자에 보관했습니다).",
            "He put the cash in a drawer (그는 현금을 서랍에 보관했습니다).",
            "They put the supplies in storage (그들은 물품을 보관했습니다)."
        ]
    },
    {
        "korean": "대신하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put herself in his shoes (그녀는 그의 입장에서 생각했습니다).",
            "He put himself in her position (그는 그녀의 입장에서 생각했습니다).",
            "They put themselves in others' places (그들은 다른 사람의 입장에서 생각했습니다)."
        ]
    },
    {
        "korean": "책임지다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put herself in charge (그녀는 책임을 졌습니다).",
            "He put himself at the helm (그는 지도자가 되었습니다).",
            "They put themselves in control (그들은 통제권을 잡았습니다)."
        ]
    },
    {
        "korean": "발행하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put out a newsletter (그녀는 뉴스레터를 발행했습니다).",
            "He put out a statement (그는 성명을 발표했습니다).",
            "They put out a bulletin (그들은 공지를 발행했습니다)."
        ]
    },
    {
        "korean": "요약하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put the summary in writing (그녀는 요약을 글로 작성했습니다).",
            "He put the brief in a document (그는 요약을 문서로 작성했습니다).",
            "They put the conclusion in a report (그들은 결론을 보고서로 작성했습니다)."
        ]
    },
    {
        "korean": "투자하다",
        "english": "put",
        "pronunciation": "[pʊt]",
        "examples": [
            "She put money into the project (그녀는 프로젝트에 돈을 투자했습니다).",
            "He put resources into development (그는 개발에 자원을 투자했습니다).",
            "They put effort into research (그들은 연구에 노력을 기울였습니다)."
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
