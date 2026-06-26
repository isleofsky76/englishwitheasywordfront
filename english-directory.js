(function () {
  'use strict';

  var CATEGORIES = [
  'News',
  'Business',
  'Tech',
  'Politics',
  'Science',
  'Culture',
  'Magazines',
  'Broadcasting',
  'Sports',
  'YouTube / Broadcasters',
  'Documentary',
  'English Learning',
  'Podcasts',
  'Kids / Easy English'
];

  var SITES = [
  // News
   { name: 'AllSides', category: 'News', level: 'Intermediate–Advanced', type: 'News / Perspectives', url: 'https://www.allsides.com/unbiased-balanced-news', desc: '좌·중·우 성향 언론을 균형 있게 모은 뉴스. 같은 이슈의 다양한 관점과 영어 표현을 비교하며 읽을 수 있습니다.' },
  { name: 'BBC News', category: 'News', level: 'Intermediate–Advanced', type: 'News / Text / Video', url: 'https://www.bbc.com/news', desc: '영국 BBC의 글로벌 뉴스. 명확한 문장과 다양한 주제로 읽기·청취 연습에 좋습니다.' },
  { name: 'CNN', category: 'News', level: 'Intermediate–Advanced', type: 'News / Text / Video', url: 'https://www.cnn.com/', desc: '미국 중심의 국제 뉴스. 속보부터 심층 분석까지 실시간 영어 뉴스를 접할 수 있습니다.' },
  { name: 'Reuters', category: 'News', level: 'Advanced', type: 'News / Text', url: 'https://www.reuters.com/', desc: '전 세계 통신사 뉴스. 간결하고 객관적인 문체로 고급 독해에 적합합니다.' },
  { name: 'AP News', category: 'News', level: 'Intermediate–Advanced', type: 'News / Text / Photo', url: 'https://apnews.com/', desc: '미국 AP통신 뉴스. 짧고 정확한 기사로 뉴스 영어 표현을 익히기 좋습니다.' },
  { name: 'The Guardian', category: 'News', level: 'Intermediate–Advanced', type: 'News / Opinion / Culture', url: 'https://www.theguardian.com/international', desc: '영국 일간지. 사회·문화·정치 등 다양한 시각의 기사와 칼럼을 읽을 수 있습니다.' },
  { name: 'NPR News', category: 'News', level: 'Intermediate', type: 'News / Audio / Text', url: 'https://www.npr.org/sections/news/', desc: '미국 공영 라디오 뉴스. 청취와 읽기를 함께 하며 자연스러운 미국 영어를 배울 수 있습니다.' },
  { name: 'Al Jazeera English', category: 'News', level: 'Intermediate–Advanced', type: 'News / Video', url: 'https://www.aljazeera.com/', desc: '중동·국제 시각의 영어 뉴스. 글로벌 이슈를 다른 관점에서 접할 수 있습니다.' },
  { name: 'USA Today', category: 'News', level: 'Intermediate', type: 'News / Text', url: 'https://www.usatoday.com/', desc: '미국 대중지. 비교적 쉬운 문장으로 미국 사회 뉴스를 읽기 좋습니다.' },
  { name: 'The New York Times', category: 'News', level: 'Advanced', type: 'News / Analysis', url: 'https://www.nytimes.com/', desc: '미국 대표 일간지. 심층 기사와 분석으로 고급 독해 실력을 키울 수 있습니다.' },
  { name: 'The Washington Post', category: 'News', level: 'Advanced', type: 'News / Politics', url: 'https://www.washingtonpost.com/', desc: '미국 정치·사회 뉴스 중심. 정치 영어와 분석 문체 학습에 유용합니다.' },
  { name: 'Sky News', category: 'News', level: 'Intermediate', type: 'News / Video', url: 'https://news.sky.com/', desc: '영국 스카이 뉴스. 영국식 발음과 표현으로 뉴스 영어를 들을 수 있습니다.' },
  { name: 'France 24 English', category: 'News', level: 'Intermediate', type: 'News / Video', url: 'https://www.france24.com/en/', desc: '유럽 시각의 영어 뉴스. 국제 이슈를 영어로 접하는 데 도움이 됩니다.' },

  // Business
  { name: 'CNBC', category: 'Business', level: 'Intermediate–Advanced', type: 'Business / Video / News', url: 'https://www.cnbc.com/', desc: '미국 경제·주식 뉴스. 비즈니스 영어와 경제 용어를 함께 익힐 수 있습니다.' },
  { name: 'Bloomberg', category: 'Business', level: 'Advanced', type: 'Business / Finance / News', url: 'https://www.bloomberg.com/', desc: '글로벌 금융·경제 뉴스. 전문적인 비즈니스 영어 독해에 적합합니다.' },
  { name: 'Financial Times', category: 'Business', level: 'Advanced', type: 'Business / Analysis', url: 'https://www.ft.com/', desc: '영국 경제 일간지. 정교한 문체로 고급 비즈니스 영어를 배울 수 있습니다.' },
  { name: 'Wall Street Journal', category: 'Business', level: 'Advanced', type: 'Business / News', url: 'https://www.wsj.com/', desc: '미국 경제·금융 대표 매체. 실무 비즈니스 영어 표현이 풍부합니다.' },
  { name: 'Forbes', category: 'Business', level: 'Intermediate–Advanced', type: 'Business / Magazine', url: 'https://www.forbes.com/', desc: '기업·스타트업·리더십 기사. 비즈니스 트렌드와 영어를 함께 학습합니다.' },
  { name: 'Business Insider', category: 'Business', level: 'Intermediate', type: 'Business / News', url: 'https://www.businessinsider.com/', desc: '경제·테크·라이프 비즈니스 뉴스. 비교적 읽기 쉬운 비즈니스 영어입니다.' },
  { name: 'MarketWatch', category: 'Business', level: 'Intermediate–Advanced', type: 'Finance / News', url: 'https://www.marketwatch.com/', desc: '주식·시장 뉴스. 금융 영어와 경제 표현을 익히기 좋습니다.' },
  { name: 'Harvard Business Review', category: 'Business', level: 'Advanced', type: 'Business / Management', url: 'https://hbr.org/', desc: '경영·리더십 전문 매체. 고급 비즈니스 영어와 사고력을 함께 키웁니다.' },
  { name: 'The Economist', category: 'Business', level: 'Advanced', type: 'Business / Politics / Analysis', url: 'https://www.economist.com/', desc: '국제 경제·정치 분석지. 고급 영어와 비판적 사고를 동시에 연습합니다.' },
  { name: 'Investopedia', category: 'Business', level: 'Intermediate', type: 'Finance / Learning', url: 'https://www.investopedia.com/', desc: '금융·투자 용어 사전형 사이트. 경제 영어 단어를 체계적으로 배웁니다.' },

  // Tech
  { name: 'The Verge', category: 'Tech', level: 'Intermediate', type: 'Tech / News / Reviews', url: 'https://www.theverge.com/', desc: '테크 제품·문화 뉴스. 일상적인 테크 영어 표현을 익히기 좋습니다.' },
  { name: 'Wired', category: 'Tech', level: 'Intermediate–Advanced', type: 'Tech / Science / Culture', url: 'https://www.wired.com/', desc: '기술·과학·문화 매거진. 흥미로운 주제로 중급 이상 영어를 읽습니다.' },
  { name: 'TechCrunch', category: 'Tech', level: 'Intermediate', type: 'Tech / Startups', url: 'https://techcrunch.com/', desc: '스타트업·IT 뉴스. 실리콘밸리 영어와 비즈니스 테크 용어를 접합니다.' },
  { name: 'Ars Technica', category: 'Tech', level: 'Intermediate–Advanced', type: 'Tech / Deep Dive', url: 'https://arstechnica.com/', desc: '심층 기술 분석 기사. IT 전문 영어 독해에 적합합니다.' },
  { name: 'Engadget', category: 'Tech', level: 'Intermediate', type: 'Tech / Gadgets', url: 'https://www.engadget.com/', desc: '가젯·테크 리뷰. 제품 관련 영어 표현을 쉽게 익힐 수 있습니다.' },
  { name: 'CNET', category: 'Tech', level: 'Intermediate', type: 'Tech / Reviews', url: 'https://www.cnet.com/', desc: '기술 제품 리뷰와 뉴스. 실용적인 테크 영어를 배웁니다.' },
  { name: 'MIT Technology Review', category: 'Tech', level: 'Advanced', type: 'Tech / Science', url: 'https://www.technologyreview.com/', desc: 'MIT 발행 기술 매거진. 첨단 기술 주제의 고급 영어를 읽습니다.' },
  { name: 'Gizmodo', category: 'Tech', level: 'Intermediate', type: 'Tech / News', url: 'https://gizmodo.com/', desc: '테크·과학 뉴스. 가벼운 톤의 영어 기사로 흥미를 유지하며 읽습니다.' },
  { name: 'Tom\'s Hardware', category: 'Tech', level: 'Intermediate–Advanced', type: 'Tech / Hardware', url: 'https://www.tomshardware.com/', desc: 'PC·하드웨어 전문 사이트. 컴퓨터 관련 전문 영어를 학습합니다.' },
  { name: 'The Register', category: 'Tech', level: 'Advanced', type: 'Tech / IT News', url: 'https://www.theregister.com/', desc: '영국 IT 뉴스. 위트 있는 영국식 테크 영어를 접할 수 있습니다.' },

  // Politics
  { name: 'Politico', category: 'Politics', level: 'Advanced', type: 'Politics / News', url: 'https://www.politico.com/', desc: '미국·유럽 정치 뉴스. 정치 영어와 정책 용어를 집중적으로 배웁니다.' },
  { name: 'The Hill', category: 'Politics', level: 'Intermediate–Advanced', type: 'Politics / News', url: 'https://thehill.com/', desc: '미국 의회·정치 뉴스. 정치 현안을 영어로 따라가기 좋습니다.' },
  { name: 'Foreign Policy', category: 'Politics', level: 'Advanced', type: 'Politics / International', url: 'https://foreignpolicy.com/', desc: '국제 정치·외교 분석. 고급 정치·외교 영어를 익힙니다.' },
  { name: 'BBC Politics', category: 'Politics', level: 'Intermediate–Advanced', type: 'Politics / News', url: 'https://www.bbc.com/news/politics', desc: '영국·세계 정치 뉴스. 영국식 정치 영어 표현을 학습합니다.' },
  { name: 'NPR Politics', category: 'Politics', level: 'Intermediate', type: 'Politics / Audio', url: 'https://www.npr.org/sections/politics/', desc: '미국 정치 뉴스와 팟캐스트. 청취하며 정치 영어를 익힙니다.' },
  { name: 'Axios', category: 'Politics', level: 'Intermediate', type: 'Politics / News', url: 'https://www.axios.com/', desc: '짧고 핵심적인 정치·비즈니스 뉴스. 간결한 영어 문체 학습에 좋습니다.' },
  { name: 'Council on Foreign Relations', category: 'Politics', level: 'Advanced', type: 'Politics / Analysis', url: 'https://www.cfr.org/', desc: '국제관계 심층 분석. 외교·정책 분야 고급 영어를 배웁니다.' },

  // Science
  { name: 'NASA', category: 'Science', level: 'Intermediate', type: 'Science / Space', url: 'https://www.nasa.gov/', desc: '미항공우주국 공식 사이트. 우주·과학 영어를 흥미롭게 학습합니다.' },
  { name: 'Scientific American', category: 'Science', level: 'Intermediate–Advanced', type: 'Science / Magazine', url: 'https://www.scientificamerican.com/', desc: '대중 과학 매거진. 과학 주제의 중급 이상 영어를 읽습니다.' },
  { name: 'Nature', category: 'Science', level: 'Advanced', type: 'Science / Research', url: 'https://www.nature.com/', desc: '세계적 과학 저널. 학술적 과학 영어 독해에 적합합니다.' },
  { name: 'ScienceDaily', category: 'Science', level: 'Intermediate', type: 'Science / News', url: 'https://www.sciencedaily.com/', desc: '최신 과학 뉴스 요약. 비교적 쉬운 과학 영어 기사를 제공합니다.' },
  { name: 'New Scientist', category: 'Science', level: 'Intermediate–Advanced', type: 'Science / News', url: 'https://www.newscientist.com/', desc: '영국 과학 뉴스 매거진. 다양한 과학 분야 영어를 접합니다.' },
  { name: 'National Geographic Science', category: 'Science', level: 'Intermediate', type: 'Science / Nature', url: 'https://www.nationalgeographic.com/science', desc: '자연·과학 기사. 아름다운 사진과 함께 과학 영어를 읽습니다.' },
  { name: 'Smithsonian Magazine', category: 'Science', level: 'Intermediate', type: 'Science / History / Culture', url: 'https://www.smithsonianmag.com/', desc: '과학·역사·문화 매거진. 흥미로운 주제로 영어 독해를 합니다.' },
  { name: 'Live Science', category: 'Science', level: 'Intermediate', type: 'Science / News', url: 'https://www.livescience.com/', desc: '일상 과학 뉴스. 이해하기 쉬운 과학 영어 표현을 배웁니다.' },
  { name: 'Phys.org', category: 'Science', level: 'Intermediate–Advanced', type: 'Science / Research News', url: 'https://phys.org/', desc: '물리·과학 연구 뉴스. 학술 뉴스 스타일의 영어를 익힙니다.' },

  // Culture
  { name: 'BBC Culture', category: 'Culture', level: 'Intermediate', type: 'Culture / Arts', url: 'https://www.bbc.com/culture', desc: '영화·음악·예술 문화 기사. 문화 영어와 비평 문체를 배웁니다.' },
  { name: 'The Atlantic', category: 'Culture', level: 'Advanced', type: 'Culture / Essays', url: 'https://www.theatlantic.com/', desc: '사회·문화 에세이. 깊이 있는 영어 글쓰기와 논증을 읽습니다.' },
  { name: 'Vox', category: 'Culture', level: 'Intermediate', type: 'Culture / Explainers', url: 'https://www.vox.com/', desc: '이슈 설명형 기사. 복잡한 주제를 쉬운 영어로 풀어 읽습니다.' },
  { name: 'NPR Arts & Life', category: 'Culture', level: 'Intermediate', type: 'Culture / Audio', url: 'https://www.npr.org/sections/arts/', desc: '예술·라이프스타일 콘텐츠. 문화 영어를 청취와 읽기로 학습합니다.' },
  { name: 'Pitchfork', category: 'Culture', level: 'Intermediate', type: 'Music / Culture', url: 'https://pitchfork.com/', desc: '음악 리뷰·뉴스. 음악·팝컬처 영어 표현을 익힙니다.' },
  { name: 'Rolling Stone', category: 'Culture', level: 'Intermediate', type: 'Music / Culture', url: 'https://www.rollingstone.com/', desc: '음악·엔터테인먼트 매거진. 대중문화 영어를 접합니다.' },
  { name: 'Artnet News', category: 'Culture', level: 'Intermediate–Advanced', type: 'Art / Culture', url: 'https://news.artnet.com/', desc: '미술·예술 뉴스. 예술 분야 전문 영어를 배웁니다.' },
  { name: 'Literary Hub', category: 'Culture', level: 'Advanced', type: 'Literature / Culture', url: 'https://lithub.com/', desc: '문학·저술 문화 사이트. 문학적 영어와 비평을 읽습니다.' },

  // Magazines
  { name: 'TIME', category: 'Magazines', level: 'Intermediate–Advanced', type: 'Magazine / News', url: 'https://time.com/', desc: '미국 대표 뉴스 매거진. 시사·인물 기사로 영어를 읽습니다.' },
  { name: 'The Atlantic Magazine', category: 'Magazines', level: 'Advanced', type: 'Magazine / Essays', url: 'https://www.theatlantic.com/magazine/', desc: '장문 에세이와 분석. 고급 영어 독해와 논리 구조 학습에 좋습니다.' },
  { name: 'National Geographic', category: 'Magazines', level: 'Intermediate', type: 'Magazine / Nature', url: 'https://www.nationalgeographic.com/', desc: '자연·지리·문화 매거진. 아름다운 사진과 함께 영어를 읽습니다.' },
  { name: 'The New Yorker', category: 'Magazines', level: 'Advanced', type: 'Magazine / Literature', url: 'https://www.newyorker.com/', desc: '문학·시사 명품 매거진. 최고 수준의 영어 문체를 경험합니다.' },
  { name: 'Newsweek', category: 'Magazines', level: 'Intermediate', type: 'Magazine / News', url: 'https://www.newsweek.com/', desc: '미국 뉴스 매거진. 시사 영어를 정기적으로 읽기 좋습니다.' },
  { name: 'Reader\'s Digest', category: 'Magazines', level: 'Beginner–Intermediate', type: 'Magazine / Stories', url: 'https://www.rd.com/', desc: '짧고 따뜻한 이야기. 비교적 쉬운 영어로 매거진 독해를 시작합니다.' },
  { name: 'Smithsonian', category: 'Magazines', level: 'Intermediate', type: 'Magazine / History', url: 'https://www.smithsonianmag.com/', desc: '역사·과학·문화 매거진. 흥미로운 주제로 영어 독해를 합니다.' },
  { name: 'Wired Magazine', category: 'Magazines', level: 'Intermediate–Advanced', type: 'Magazine / Tech', url: 'https://www.wired.com/', desc: '테크·미래 문화 매거진. 트렌디한 영어 표현을 익힙니다.' },
  { name: 'Vanity Fair', category: 'Magazines', level: 'Advanced', type: 'Magazine / Culture', url: 'https://www.vanityfair.com/', desc: '문화·정치·사회 매거진. 세련된 영어 문체를 배웁니다.' },

  // Broadcasting
  { name: 'BBC', category: 'Broadcasting', level: 'Intermediate', type: 'Broadcast / Video / Audio', url: 'https://www.bbc.com/', desc: '영국 공영방송. 뉴스·다큐·드라마로 영국 영어를 들을 수 있습니다.' },
  { name: 'NPR', category: 'Broadcasting', level: 'Intermediate', type: 'Radio / Podcast / News', url: 'https://www.npr.org/', desc: '미국 공영 라디오. 느린 속도의 뉴스와 팟캐스트로 청취 연습합니다.' },
  { name: 'PBS', category: 'Broadcasting', level: 'Intermediate', type: 'TV / Documentary', url: 'https://www.pbs.org/', desc: '미국 공영 TV. 다큐멘터리와 교육 프로그램으로 영어를 학습합니다.' },
  { name: 'VOA News', category: 'Broadcasting', level: 'Beginner–Intermediate', type: 'Broadcast / News', url: 'https://www.voanews.com/', desc: '미국 정부 산하 국제방송. 학습자를 위한 명확한 영어 뉴스를 제공합니다.' },
  { name: 'ABC News', category: 'Broadcasting', level: 'Intermediate', type: 'TV / News / Video', url: 'https://abcnews.go.com/', desc: '미국 ABC 뉴스. 영상 뉴스로 실생활 미국 영어를 들을 수 있습니다.' },
  { name: 'CBS News', category: 'Broadcasting', level: 'Intermediate', type: 'TV / News', url: 'https://www.cbsnews.com/', desc: '미국 CBS 뉴스. 뉴스 영상과 기사로 청취·독해를 병행합니다.' },
  { name: 'NBC News', category: 'Broadcasting', level: 'Intermediate', type: 'TV / News', url: 'https://www.nbcnews.com/', desc: '미국 NBC 뉴스. 다양한 뉴스 영상으로 미국 영어를 접합니다.' },
  { name: 'BBC iPlayer', category: 'Broadcasting', level: 'Intermediate–Advanced', type: 'Streaming / TV', url: 'https://www.bbc.co.uk/iplayer', desc: 'BBC 프로그램 스트리밍. 영국 드라마·뉴스로 영국 영어를 학습합니다.' },
  { name: 'TED Talks', category: 'Broadcasting', level: 'Intermediate–Advanced', type: 'Video / Talks', url: 'https://www.ted.com/', desc: '전문가 강연 영상. 자막과 함께 다양한 주제의 영어를 들을 수 있습니다.' },

  // Sports
  { name: 'ESPN', category: 'Sports', level: 'Intermediate', type: 'Sports / News / Video', url: 'https://www.espn.com/', desc: '미국 대표 스포츠 미디어. 경기 뉴스와 해설로 스포츠 영어를 익힙니다.' },
  { name: 'BBC Sport', category: 'Sports', level: 'Intermediate', type: 'Sports / News / Video', url: 'https://www.bbc.com/sport', desc: '영국 BBC 스포츠 뉴스. 축구·테니스 등 글로벌 스포츠 영어를 접합니다.' },
  { name: 'Sky Sports', category: 'Sports', level: 'Intermediate–Advanced', type: 'Sports / News / Video', url: 'https://www.skysports.com/', desc: '영국 스카이 스포츠. 프리미어리그 중심 스포츠 뉴스와 영상을 제공합니다.' },
  { name: 'The Athletic', category: 'Sports', level: 'Intermediate–Advanced', type: 'Sports / Analysis', url: 'https://www.nytimes.com/athletic/', desc: '심층 스포츠 분석 기사. 전문적인 스포츠 영어 독해에 좋습니다.' },
  { name: 'Sports Illustrated', category: 'Sports', level: 'Intermediate', type: 'Sports / Magazine', url: 'https://www.si.com/', desc: '미국 스포츠 매거진. 선수 인터뷰와 스포츠 문화 기사를 읽습니다.' },
  { name: 'Bleacher Report', category: 'Sports', level: 'Intermediate', type: 'Sports / News', url: 'https://bleacherreport.com/', desc: '팬 중심 스포츠 뉴스. 캐주얼한 스포츠 영어 표현을 배웁니다.' },
  { name: 'NBA.com', category: 'Sports', level: 'Intermediate', type: 'Sports / Basketball', url: 'https://www.nba.com/', desc: 'NBA 공식 사이트. 농구 뉴스·하이라이트로 미국 스포츠 영어를 들을 수 있습니다.' },
  { name: 'NFL.com', category: 'Sports', level: 'Intermediate', type: 'Sports / American Football', url: 'https://www.nfl.com/', desc: 'NFL 공식 사이트. 미식축구 용어와 스포츠 해설 영어를 학습합니다.' },
  { name: 'MLB.com', category: 'Sports', level: 'Intermediate', type: 'Sports / Baseball', url: 'https://www.mlb.com/', desc: 'MLB 공식 사이트. 야구 뉴스와 경기 영상으로 스포츠 영어를 익힙니다.' },
  { name: 'FIFA', category: 'Sports', level: 'Intermediate', type: 'Sports / Football', url: 'https://www.fifa.com/', desc: '국제축구연맹 공식 사이트. 글로벌 축구 뉴스와 영어 기사를 읽습니다.' },
  { name: 'Formula 1', category: 'Sports', level: 'Intermediate–Advanced', type: 'Sports / Motorsport', url: 'https://www.formula1.com/', desc: 'F1 공식 사이트. 모터스포츠 뉴스와 인터뷰로 영국·국제 영어를 접합니다.' },
  { name: 'Olympics.com', category: 'Sports', level: 'Intermediate', type: 'Sports / News', url: 'https://olympics.com/en/', desc: '올림픽 공식 사이트. 다양한 종목 뉴스로 국제 스포츠 영어를 배웁니다.' },

  // YouTube / Broadcasters
  { name: 'BBC News (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@BBCNews', desc: 'BBC 뉴스 공식 유튜브. 영국식 뉴스 영어를 영상으로 들을 수 있습니다.' },
  { name: 'CNN (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@CNN', desc: 'CNN 공식 유튜브. 글로벌 속보와 뉴스 클립으로 미국 영어를 연습합니다.' },
  { name: 'NBC News (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@NBCNews', desc: 'NBC 뉴스 공식 채널. 미국 뉴스 영상으로 청취 실력을 키웁니다.' },
  { name: 'CBS News (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@CBSNews', desc: 'CBS 뉴스 공식 유튜브. 미국 저녁 뉴스 스타일 영어를 들을 수 있습니다.' },
  { name: 'ABC News (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@ABCNews', desc: 'ABC 뉴스 공식 채널. 미국 뉴스·시사 영상으로 영어를 학습합니다.' },
  { name: 'Sky News (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@SkyNews', desc: '스카이 뉴스 유튜브. 영국식 뉴스 발음과 표현을 들을 수 있습니다.' },
  { name: 'FRANCE 24 English (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@France24_en', desc: '프랑스 24 영어 방송 유튜브. 유럽 시각의 국제 뉴스 영어를 접합니다.' },
  { name: 'DW News (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@dwnews', desc: '독일 DW 뉴스 채널. 명확한 독일 영어 방송으로 뉴스 청취에 좋습니다.' },
  { name: 'Al Jazeera English (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@AlJazeeraEnglish', desc: '알자지라 영어 뉴스 유튜브. 중동·국제 이슈를 영어로 들을 수 있습니다.' },
  { name: 'The Guardian (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate', type: 'YouTube / News', url: 'https://www.youtube.com/@theguardian', desc: '가디언 뉴스 유튜브. 영국 언론의 뉴스·분석 영상을 시청합니다.' },
  { name: 'VOA Learning English (YouTube)', category: 'YouTube / Broadcasters', level: 'Beginner–Intermediate', type: 'YouTube / Learning', url: 'https://www.youtube.com/@voalearningenglish', desc: 'VOA 학습 영어 유튜브. 천천히 말하는 뉴스로 초·중급 청취에 적합합니다.' },
  { name: 'BBC Learning English (YouTube)', category: 'YouTube / Broadcasters', level: 'Beginner–Intermediate', type: 'YouTube / Learning', url: 'https://www.youtube.com/@bbclearningenglish', desc: 'BBC 학습 영어 공식 채널. 문법·발음·표현 강의 영상을 무료로 봅니다.' },
  { name: '60 Minutes (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate–Advanced', type: 'YouTube / Magazine', url: 'https://www.youtube.com/@60minutes', desc: 'CBS 60 Minutes 공식 채널. 심층 인터뷰와 탐사 보도 영어를 들을 수 있습니다.' },
  { name: 'Reuters (YouTube)', category: 'YouTube / Broadcasters', level: 'Intermediate–Advanced', type: 'YouTube / News', url: 'https://www.youtube.com/@Reuters', desc: '로이터 통신 유튜브. 짧은 국제 뉴스 클립으로 뉴스 영어를 연습합니다.' },

  // Documentary
  { name: 'PBS NOVA', category: 'Documentary', level: 'Intermediate–Advanced', type: 'Documentary / Science', url: 'https://www.pbs.org/wgbh/nova/', desc: 'PBS 과학 다큐멘터리. 과학 주제의 명확한 영어 내레이션을 들을 수 있습니다.' },
  { name: 'BBC Earth (YouTube)', category: 'Documentary', level: 'Intermediate', type: 'Documentary / Nature', url: 'https://www.youtube.com/@bbcearth', desc: 'BBC Earth 공식 유튜브. 자연·동물 다큐로 영국 영어를 들으며 학습합니다.' },
  { name: 'National Geographic (YouTube)', category: 'Documentary', level: 'Intermediate', type: 'Documentary / Nature', url: 'https://www.youtube.com/@NatGeo', desc: '내셔널지오그래픽 유튜브. 자연·탐험 다큐로 흥미롭게 영어를 익힙니다.' },
  { name: 'DW Documentary (YouTube)', category: 'Documentary', level: 'Intermediate–Advanced', type: 'Documentary / News', url: 'https://www.youtube.com/@DWDocumentary', desc: '독일 DW 다큐 채널. 사회·역사·국제 이슈 다큐로 영어 청취를 합니다.' },
  { name: 'Free Documentary (YouTube)', category: 'Documentary', level: 'Intermediate', type: 'Documentary / General', url: 'https://www.youtube.com/@FreeDocumentary', desc: '무료 다큐멘터리 채널. 다양한 주제의 영어 다큐를 꾸준히 볼 수 있습니다.' },
  { name: 'Real Stories (YouTube)', category: 'Documentary', level: 'Intermediate', type: 'Documentary / Stories', url: 'https://www.youtube.com/@RealStories', desc: '실화·인물 중심 다큐 채널. 스토리텔링 영어를 들으며 흥미를 유지합니다.' },
  { name: 'Timeline (YouTube)', category: 'Documentary', level: 'Intermediate–Advanced', type: 'Documentary / History', url: 'https://www.youtube.com/@TimelineChannel', desc: '역사 다큐멘터리 채널. 역사 주제와 함께 영어 표현을 익힙니다.' },
  { name: 'Smithsonian Channel', category: 'Documentary', level: 'Intermediate', type: 'Documentary / History', url: 'https://www.smithsonianchannel.com/', desc: '스미소니언 다큐 채널. 역사·과학·문화 다큐로 영어를 학습합니다.' },
  { name: 'Top Documentary Films', category: 'Documentary', level: 'Intermediate', type: 'Documentary / Archive', url: 'https://topdocumentaryfilms.com/', desc: '무료 다큐 모음 사이트. 주제별 영어 다큐멘터리를 찾아볼 수 있습니다.' },
  { name: 'NASA+', category: 'Documentary', level: 'Intermediate', type: 'Documentary / Space', url: 'https://plus.nasa.gov/', desc: 'NASA 공식 스트리밍. 우주·과학 다큐로 전문 영어를 접합니다.' },
  { name: 'TED-Ed (YouTube)', category: 'Documentary', level: 'Intermediate', type: 'Documentary / Education', url: 'https://www.youtube.com/@TEDEd', desc: 'TED 교육 애니메이션 채널. 짧은 영상으로 다양한 주제 영어를 배웁니다.' },

  // English Learning
  { name: 'BBC Learning English', category: 'English Learning', level: 'Beginner–Intermediate', type: 'Learning / Audio / Video', url: 'https://www.bbc.co.uk/learningenglish', desc: '무료 발음·문법·뉴스 기반 영어 학습. 레벨별 콘텐츠가 풍부합니다.' },
  { name: 'VOA Learning English', category: 'English Learning', level: 'Beginner–Intermediate', type: 'Learning / News / Audio', url: 'https://learningenglish.voanews.com/', desc: '천천히 읽는 뉴스와 학습 자료. 초·중급 학습자에게 최적입니다.' },
  { name: 'Breaking News English', category: 'English Learning', level: 'Beginner–Advanced', type: 'Learning / News / Worksheets', url: 'https://breakingnewsenglish.com/', desc: '뉴스 기반 영어 학습. 레벨별 기사와 활동지로 공부할 수 있습니다.' },
  { name: 'Engoo Daily News', category: 'English Learning', level: 'Beginner–Intermediate', type: 'Learning / News', url: 'https://engoo.com/app/daily-news', desc: '매일 업데이트되는 쉬운 뉴스 영어. 짧은 기사로 꾸준히 읽기 좋습니다.' },
  { name: 'British Council LearnEnglish', category: 'English Learning', level: 'Beginner–Advanced', type: 'Learning / Grammar / Skills', url: 'https://learnenglish.britishcouncil.org/', desc: '영국문화원 공식 학습 사이트. 문법·어휘·스킬별 연습이 가능합니다.' },
  { name: 'Cambridge English', category: 'English Learning', level: 'All Levels', type: 'Learning / Exams', url: 'https://www.cambridgeenglish.org/learning-english/', desc: '케임브리지 공식 학습 자료. 시험 준비와 실력 향상에 도움이 됩니다.' },
  { name: 'Duolingo', category: 'English Learning', level: 'Beginner–Intermediate', type: 'Learning / App', url: 'https://www.duolingo.com/', desc: '게임형 영어 학습 앱. 매일 짧게 꾸준히 단어와 문장을 연습합니다.' },
  { name: 'Grammarly Blog', category: 'English Learning', level: 'Intermediate–Advanced', type: 'Learning / Writing', url: 'https://www.grammarly.com/blog/', desc: '영어 문법·쓰기 팁 블로그. 실용적인 문법과 표현을 익힙니다.' },
  { name: 'engVid', category: 'English Learning', level: 'Beginner–Advanced', type: 'Learning / Video', url: 'https://www.engvid.com/', desc: '무료 영어 강의 영상. 문법·회화·시험 준비 강의가 다양합니다.' },
  { name: 'ELLLO', category: 'English Learning', level: 'Beginner–Intermediate', type: 'Learning / Listening', url: 'https://www.elllo.org/', desc: '영어 듣기 연습 사이트. 다양한 악센트의 짧은 대화를 들을 수 있습니다.' },
  { name: 'News in Levels', category: 'English Learning', level: 'Beginner–Intermediate', type: 'Learning / News', url: 'https://www.newsinlevels.com/', desc: '같은 뉴스를 3단계 난이도로 제공. 단계별 뉴스 영어 학습에 좋습니다.' },
  { name: 'Randall\'s ESL Cyber Listening Lab', category: 'English Learning', level: 'Beginner–Advanced', type: 'Learning / Listening', url: 'https://www.esl-lab.com/', desc: '체계적인 듣기 연습. 퀴즈와 함께 리스닝 실력을 키웁니다.' },
  { name: 'Purdue OWL', category: 'English Learning', level: 'Intermediate–Advanced', type: 'Learning / Writing', url: 'https://owl.purdue.edu/owl/purdue_owl.html', desc: '학술 영어 쓰기 가이드. 에세이·논문 작성 영어를 배웁니다.' },

  // Podcasts
  { name: 'BBC Global News Podcast', category: 'Podcasts', level: 'Intermediate', type: 'Podcast / News', url: 'https://www.bbc.co.uk/programmes/p02nq0gn', desc: 'BBC 글로벌 뉴스 팟캐스트. 매일 30분 뉴스 영어 청취에 좋습니다.' },
  { name: 'The Daily (NYT)', category: 'Podcasts', level: 'Intermediate–Advanced', type: 'Podcast / News', url: 'https://www.nytimes.com/column/the-daily', desc: '뉴욕타임스 일일 뉴스 팟캐스트. 심층 이슈를 영어로 들을 수 있습니다.' },
  { name: 'NPR Up First', category: 'Podcasts', level: 'Intermediate', type: 'Podcast / News', url: 'https://www.npr.org/podcasts/510318/up-first', desc: '아침 뉴스 요약 팟캐스트. 짧게 오늘의 이슈 영어를 들을 수 있습니다.' },
  { name: '6 Minute English (BBC)', category: 'Podcasts', level: 'Beginner–Intermediate', type: 'Podcast / Learning', url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english', desc: '6분 영어 학습 팟캐스트. 주제별 어휘와 표현을 배웁니다.' },
  { name: 'All Ears English', category: 'Podcasts', level: 'Intermediate', type: 'Podcast / Learning', url: 'https://www.allearsenglish.com/', desc: '미국 영어 회화 팟캐스트. 자연스러운 일상 표현을 익힙니다.' },
  { name: 'Luke\'s English Podcast', category: 'Podcasts', level: 'Intermediate–Advanced', type: 'Podcast / Learning', url: 'https://teacherluke.co.uk/', desc: '영국 영어 교사의 팟캐스트. 유머와 함께 영국 영어를 배웁니다.' },
  { name: 'Stuff You Should Know', category: 'Podcasts', level: 'Intermediate', type: 'Podcast / General', url: 'https://www.iheart.com/podcast/105-stuff-you-should-know-26940277/', desc: '다양한 주제 설명 팟캐스트. 흥미로운 주제로 영어 청취를 합니다.' },
    { name: 'The English We Speak (BBC)', category: 'Podcasts', level: 'Beginner–Intermediate', type: 'Podcast / Idioms', url: 'https://www.bbc.co.uk/learningenglish/english/features/the-english-we-speak', desc: '짧은 관용표현 팟캐스트. 실생활 영어 표현을 빠르게 익힙니다.' },
  { name: 'Podcast in English', category: 'Podcasts', level: 'Beginner–Advanced', type: 'Podcast / Learning', url: 'https://www.podcastsinenglish.com/', desc: '레벨별 영어 팟캐스트. 단계에 맞는 청취 연습이 가능합니다.' },
  { name: 'Culips ESL Podcast', category: 'Podcasts', level: 'Intermediate–Advanced', type: 'Podcast / Learning', url: 'https://esl.culips.com/', desc: '캐나다 영어 학습 팟캐스트. 자연스러운 회화 표현을 배웁니다.' },

  // Kids / Easy English
  { name: 'British Council LearnEnglish Kids', category: 'Kids / Easy English', level: 'Beginner', type: 'Kids / Games / Stories', url: 'https://learnenglishkids.britishcouncil.org/', desc: '어린이 영어 학습. 게임·동화·노래로 기초 영어를 재미있게 배웁니다.' },
  { name: 'Starfall', category: 'Kids / Easy English', level: 'Beginner', type: 'Kids / Phonics', url: 'https://www.starfall.com/', desc: '파닉스·읽기 학습. 유아·초등생을 위한 인터랙티브 영어 사이트입니다.' },
  { name: 'PBS Kids', category: 'Kids / Easy English', level: 'Beginner', type: 'Kids / Video / Games', url: 'https://pbskids.org/', desc: '미국 공영 어린이 프로그램. 동영상과 게임으로 쉬운 영어를 접합니다.' },
  { name: 'National Geographic Kids', category: 'Kids / Easy English', level: 'Beginner–Intermediate', type: 'Kids / Science', url: 'https://kids.nationalgeographic.com/', desc: '어린이용 자연·과학 콘텐츠. 흥미로운 주제로 쉬운 영어를 읽습니다.' },
  { name: 'Storyline Online', category: 'Kids / Easy English', level: 'Beginner', type: 'Kids / Stories / Video', url: 'https://storylineonline.net/', desc: '유명 배우가 읽어주는 동화. 듣기와 읽기로 기초 영어를 학습합니다.' },
  { name: 'Fun English Games', category: 'Kids / Easy English', level: 'Beginner', type: 'Kids / Games', url: 'https://www.funenglishgames.com/', desc: '영어 단어·문법 게임. 어린이와 초보자가 놀이로 영어를 익힙니다.' },
  { name: 'Dream English', category: 'Kids / Easy English', level: 'Beginner', type: 'Kids / Songs', url: 'https://www.dreamenglish.com/', desc: '어린이 영어 노래. 동요로 기초 단어와 표현을 쉽게 외웁니다.' },
  { name: 'Simple English Wikipedia', category: 'Kids / Easy English', level: 'Beginner–Intermediate', type: 'Easy English / Reference', url: 'https://simple.wikipedia.org/', desc: '쉬운 영어 위키백과. 짧은 문장으로 다양한 주제를 읽을 수 있습니다.' },
  { name: 'Dogo News', category: 'Kids / Easy English', level: 'Beginner–Intermediate', type: 'Kids / News', url: 'https://www.dogonews.com/', desc: '어린이·청소년 뉴스. 쉬운 영어로 시사를 읽으며 어휘를 늘립니다.' },
  { name: 'English Central', category: 'Kids / Easy English', level: 'Beginner–Intermediate', type: 'Learning / Video', url: 'https://www.englishcentral.com/', desc: '영상 기반 영어 학습. 따라 말하기로 발음과 리스닝을 연습합니다.' }
];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildCard(site) {
    return (
      '<article class="dir-card" data-category="' + escapeHtml(site.category) + '">' +
        '<h3 class="dir-card-title">' + escapeHtml(site.name) + '</h3>' +
        '<p class="dir-card-desc">' + escapeHtml(site.desc) + '</p>' +
        '<a class="dir-card-link" href="' + escapeHtml(site.url) + '" target="_blank" rel="noopener noreferrer">Visit site</a>' +
      '</article>'
    );
  }

  var PREVIEW_ROWS = [
    { title: 'News · BBC, CNN, Reuters, AP News', href: 'english-directory.html#cat-news' },
    { title: 'Business · CNBC, Bloomberg, Financial Times', href: 'english-directory.html#cat-business' },
    { title: 'Tech · The Verge, Wired, TechCrunch', href: 'english-directory.html#cat-tech' },
    { title: 'Sports · ESPN, BBC Sport, NBA, FIFA', href: 'english-directory.html#cat-sports' },
    { title: 'YouTube / Broadcasters · BBC News, CNN, DW News', href: 'english-directory.html#cat-youtube-broadcasters' },
    { title: 'Documentary · BBC Earth, PBS NOVA, Nat Geo', href: 'english-directory.html#cat-documentary' },
    { title: 'English Learning · BBC Learning English, VOA, Breaking News English', href: 'english-directory.html#cat-english-learning' },
    { title: 'Podcasts · BBC 6 Minute English, NPR Up First', href: 'english-directory.html#cat-podcasts' },
    { title: 'Kids / Easy English · Starfall, PBS Kids, Simple Wikipedia', href: 'english-directory.html#cat-kids-easy-english' }
  ];

  function buildPreviewListRow(number, title, href) {
    return (
      '<li><a href="' + escapeHtml(href) + '">' +
        '<span class="preview-num">' + number + '</span>' +
        '<span class="preview-title">' + escapeHtml(title) + '</span>' +
      '</a></li>'
    );
  }

  function renderDirectory(root) {
    if (!root) return;

    var filtersEl = root.querySelector('[data-dir-filters]');
    var contentEl = root.querySelector('[data-dir-content]');
    var countEl = root.querySelector('[data-dir-count]');
    var activeCategory = 'all';

    function getFilteredSites() {
      return SITES.filter(function (site) {
        return activeCategory === 'all' || site.category === activeCategory;
      });
    }

    function renderFilters() {
      if (!filtersEl) return;
      var buttons = ['<button type="button" class="dir-filter-btn is-active" data-cat="all">All</button>'];
      CATEGORIES.forEach(function (cat) {
        buttons.push(
          '<button type="button" class="dir-filter-btn" data-cat="' + escapeHtml(cat) + '">' + escapeHtml(cat) + '</button>'
        );
      });
      filtersEl.innerHTML = buttons.join('');
    }

    function renderContent() {
      if (!contentEl) return;
      var filtered = getFilteredSites();

      if (countEl) {
        countEl.textContent = filtered.length + ' site' + (filtered.length === 1 ? '' : 's');
      }

      if (!filtered.length) {
        contentEl.innerHTML = '<p class="dir-empty">이 카테고리에 등록된 사이트가 없습니다.</p>';
        return;
      }

      if (activeCategory !== 'all') {
        contentEl.innerHTML = '<div class="dir-grid">' + filtered.map(buildCard).join('') + '</div>';
        return;
      }

      var html = '';
      CATEGORIES.forEach(function (cat) {
        var catSites = SITES.filter(function (s) { return s.category === cat; });
        if (!catSites.length) return;
        html +=
          '<section class="dir-category" id="cat-' + cat.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '">' +
            '<h2 class="dir-category-title">' + escapeHtml(cat) + '</h2>' +
            '<div class="dir-grid">' + catSites.map(buildCard).join('') + '</div>' +
          '</section>';
      });
      contentEl.innerHTML = html;
    }

    function setActiveFilter(btn) {
      if (!filtersEl) return;
      filtersEl.querySelectorAll('.dir-filter-btn').forEach(function (el) {
        el.classList.toggle('is-active', el === btn);
      });
    }

    renderFilters();
    renderContent();

    if (filtersEl) {
      filtersEl.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-cat]');
        if (!btn) return;
        activeCategory = btn.getAttribute('data-cat');
        setActiveFilter(btn);
        renderContent();
      });
    }
  }

  function renderPreview(container) {
    if (!container) return;
    var rows = PREVIEW_ROWS.map(function (row, idx) {
      return buildPreviewListRow(idx + 1, row.title, row.href);
    });
    container.innerHTML = '<ul class="preview-list">' + rows.join('') + '</ul>';
  }

  window.EnglishDirectory = {
    CATEGORIES: CATEGORIES,
    SITES: SITES,
    renderDirectory: renderDirectory,
    renderPreview: renderPreview
  };

  document.addEventListener('DOMContentLoaded', function () {
    var pageRoot = document.querySelector('[data-english-directory]');
    if (pageRoot) {
      renderDirectory(pageRoot);
    }

    var previewRoot = document.getElementById('english-directory-preview-list');
    if (previewRoot) {
      renderPreview(previewRoot);
    }
  });
})();
