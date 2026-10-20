/**
 * 목록·상세 리디자인 카테고리 설정
 * 제목·영문 라벨·설명·탭만 여기서 수정하면 됩니다.
 */
(function (global) {
  'use strict';

  var NEWS_TABS = [
    { key: 'news-voca', label: '국제', href: 'news-voca-list.html' },
    { key: 'korea-news', label: '한국', href: 'korea-news-list.html' },
    { key: 'defense-news', label: '국방', href: 'defense-news-list.html' },
    { key: 'culture-voca', label: '컬쳐', href: 'culture-voca-list.html' },
    { key: 'ranking-news', label: '랭킹', href: 'ranking-news-list.html' }
  ];

  var BOARDS = {
    'news-voca': {
      key: 'news-voca',
      labelEn: 'NEWS VOCABULARY',
      title: '뉴스 영어',
      description: 'WSJ, Economist, CNN, Korea Herald 기사 속 핵심 어휘를 원문 문장과 함께 읽습니다.',
      tabLabel: '국제',
      categoryLabel: '국제',
      listPage: 'news-voca-list.html',
      postPage: 'news-voca.html',
      postPath: 'news-voca',
      board: 'guestbook',
      apiPath: '/guestbook',
      navGroup: 'news',
      tabs: NEWS_TABS,
      /* auto: nv-narrative(staggered) 구조일 때만 카드형 redesign */
      articleLayout: 'auto',
      breadcrumbParent: { label: '뉴스 영어', href: 'news-voca-list.html' }
    },
    'korea-news': {
      key: 'korea-news',
      labelEn: 'KOREA NEWS',
      title: '한국 뉴스',
      description: '한국 관련 영문 기사에서 뽑은 시사 어휘를 문장과 함께 익힙니다.',
      tabLabel: '한국',
      categoryLabel: '한국',
      listPage: 'korea-news-list.html',
      postPage: 'korea-news.html',
      postPath: 'korea-news',
      board: 'korea-news',
      apiPath: '/korea-news',
      navGroup: 'news',
      tabs: NEWS_TABS,
      articleLayout: 'auto',
      breadcrumbParent: { label: '뉴스 영어', href: 'news-voca-list.html' }
    },
    'defense-news': {
      key: 'defense-news',
      labelEn: 'DEFENSE NEWS',
      title: '국방 뉴스',
      description: '국방·안보 관련 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
      tabLabel: '국방',
      categoryLabel: '국방',
      listPage: 'defense-news-list.html',
      postPage: 'defense-news.html',
      postPath: 'defense-news',
      board: 'defense-news',
      apiPath: '/defense-news',
      navGroup: 'news',
      tabs: NEWS_TABS,
      articleLayout: 'auto',
      breadcrumbParent: { label: '뉴스 영어', href: 'news-voca-list.html' }
    },
    'culture-voca': {
      key: 'culture-voca',
      labelEn: 'CULTURE',
      title: '컬쳐',
      description: '문화·예술·라이프스타일 기사 속 영어 표현을 모았습니다.',
      tabLabel: '컬쳐',
      categoryLabel: '컬쳐',
      listPage: 'culture-voca-list.html',
      postPage: 'culture-voca.html',
      postPath: 'culture-voca',
      board: 'culture-voca',
      apiPath: '/culture-voca',
      navGroup: 'news',
      tabs: NEWS_TABS,
      articleLayout: 'auto',
      breadcrumbParent: { label: '뉴스 영어', href: 'news-voca-list.html' }
    },
    'ranking-news': {
      key: 'ranking-news',
      labelEn: 'RANKING',
      title: '랭킹',
      description: '이슈와 순위로 정리한 영문 기사 어휘를 읽습니다.',
      tabLabel: '랭킹',
      categoryLabel: '랭킹',
      listPage: 'ranking-news-list.html',
      postPage: 'ranking-news.html',
      postPath: 'ranking-news',
      board: 'ranking-news',
      apiPath: '/ranking-news',
      navGroup: 'news',
      tabs: NEWS_TABS,
      articleLayout: 'auto',
      breadcrumbParent: { label: '뉴스 영어', href: 'news-voca-list.html' }
    },
    'english-opinions': {
      key: 'english-opinions',
      labelEn: 'OPINION',
      title: '오피니언',
      description: '시사 오피니언 글의 핵심 표현을 천천히 읽습니다.',
      tabLabel: '오피니언',
      categoryLabel: '오피니언',
      listPage: 'english-opinions-list.html',
      postPage: 'english-opinions.html',
      postPath: 'english-opinions',
      board: 'opinions',
      apiPath: '/opinions',
      navGroup: 'read',
      tabs: null,
      articleLayout: 'auto',
      breadcrumbParent: { label: '읽을거리', href: 'english-opinions-list.html' }
    },
    'english-synonym': {
      key: 'english-synonym',
      labelEn: 'RELATED WORDS',
      title: '연관단어',
      description: '비슷한 말과 함께 어휘 네트워크를 넓힙니다.',
      tabLabel: '연관단어',
      categoryLabel: '연관단어',
      listPage: 'english-synonym-list.html',
      postPage: 'english-synonym.html',
      postPath: 'english-synonym',
      board: 'vocabulary',
      apiPath: '/vocabulary',
      navGroup: 'vocab',
      tabs: null,
      articleLayout: 'auto',
      breadcrumbParent: { label: '연관단어', href: 'english-synonym-list.html' }
    },
    'word-of-the-day': {
      key: 'word-of-the-day',
      labelEn: 'WORD OF THE DAY',
      title: '단어장',
      description: '매일 한 단어, 뜻과 예문으로 확실히 내 것으로 만듭니다.',
      tabLabel: '단어장',
      categoryLabel: '단어장',
      listPage: 'word-of-the-day-list.html',
      postPage: 'word-of-the-day.html',
      postPath: 'word-of-the-day',
      board: 'wordofday',
      apiPath: '/wordofday',
      navGroup: 'wotd',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '단어장', href: 'word-of-the-day-list.html?api=prod' }
    },
    'popular-voca': {
      key: 'popular-voca',
      labelEn: 'SAY IT IN ENGLISH',
      title: '이럴 땐 영어로?',
      description: '일상 상황에서 바로 쓰는 영어 표현을 모았습니다.',
      tabLabel: '표현',
      categoryLabel: '표현',
      listPage: 'popular-voca-list.html',
      postPage: 'popular-voca.html',
      postPath: 'popular-voca',
      board: 'easy-voca',
      apiPath: '/easy-voca',
      navGroup: 'express',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '표현', href: 'popular-voca-list.html' }
    },
    'situational-english': {
      key: 'situational-english',
      labelEn: 'SITUATIONS',
      title: '상황',
      description: '상황별로 정리한 영어 표현을 익힙니다.',
      tabLabel: '상황',
      categoryLabel: '상황',
      listPage: 'situational-english-list.html',
      postPage: 'situational-english.html',
      postPath: 'situational-english',
      board: 'situational-english',
      apiPath: '/situational-english',
      navGroup: 'express',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '표현', href: 'popular-voca-list.html' }
    },
    'pros-cons': {
      key: 'pros-cons',
      labelEn: 'PROS & CONS',
      title: 'Pros & Cons',
      description: '찬반 논점으로 영어 표현을 정리합니다.',
      tabLabel: 'Pros & Cons',
      categoryLabel: 'Pros & Cons',
      listPage: 'pros-cons-list.html',
      postPage: 'pros-cons.html',
      postPath: 'pros-cons',
      board: 'pros-cons',
      apiPath: '/pros-cons',
      navGroup: 'express',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '표현', href: 'popular-voca-list.html' }
    },
    'photo-english': {
      key: 'photo-english',
      labelEn: 'PHOTO ENGLISH',
      title: '포토',
      description: '사진과 함께 보는 영어 표현입니다.',
      tabLabel: '포토',
      categoryLabel: '포토',
      listPage: 'photo-english-list.html',
      postPage: 'photo-english.html',
      postPath: 'photo-english',
      board: 'photo-english',
      apiPath: '/photo-english',
      navGroup: 'express',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '포토', href: 'photo-english-list.html' }
    },
    'calm-mind': {
      key: 'calm-mind',
      labelEn: 'CALM MIND',
      title: '마음글',
      description: '마음을 다스리는 짧은 글을 영어로 읽습니다.',
      tabLabel: '마음글',
      categoryLabel: '마음글',
      listPage: 'calm-mind-list.html',
      postPage: 'calm-mind.html',
      postPath: 'calm-mind',
      board: 'calm-mind',
      apiPath: '/calm-mind',
      navGroup: 'read',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '읽을거리', href: 'english-opinions-list.html' }
    },
    'english-quotes': {
      key: 'english-quotes',
      labelEn: 'QUOTES',
      title: '영어 명언',
      description: '짧고 강한 영어 명언을 모았습니다.',
      tabLabel: '영어 명언',
      categoryLabel: '영어 명언',
      listPage: 'english-quotes-list.html',
      postPage: 'english-quotes.html',
      postPath: 'english-quotes',
      board: 'english-quotes',
      apiPath: '/english-quotes',
      navGroup: 'read',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '읽을거리', href: 'english-opinions-list.html' }
    },
    'vocabulary-quiz': {
      key: 'vocabulary-quiz',
      labelEn: 'VOCABULARY QUIZ',
      title: '퀴즈',
      description: '핵심 표현을 클릭해 뜻을 확인하고, 객관식으로 복습합니다.',
      tabLabel: '퀴즈',
      categoryLabel: '퀴즈',
      listPage: 'vocabulary-quiz-list.html',
      postPage: 'vocabulary-quiz.html',
      postPath: 'vocabulary-quiz',
      board: 'vocabulary-quiz',
      apiPath: '/vocabulary-quiz',
      navGroup: 'quiz',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '퀴즈', href: 'vocabulary-quiz-list.html' }
    },
    'shorts-bg-image': {
      key: 'shorts-bg-image',
      labelEn: 'SHORTS BACKDROP',
      title: '신문읽는 이미지',
      description: '유튜브 쇼츠·영어 학습 영상용 배경 이미지와 장면 속 표현을 모았습니다.',
      tabLabel: '신문읽는 이미지',
      categoryLabel: '신문읽는 이미지',
      listPage: 'shorts-bg-image-list.html',
      postPage: 'shorts-bg-image.html',
      postPath: 'shorts-bg-image',
      board: 'shorts-bg-image',
      apiPath: '/shorts-bg-image',
      navGroup: 'express',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '신문읽는 이미지', href: 'shorts-bg-image-list.html' }
    },
    'cooking-voca': {
      key: 'cooking-voca',
      labelEn: 'COOKING VOCABULARY',
      title: '요리 영어',
      description: '요리·레시피 속 영어 표현을 뜻과 함께 정리했습니다. 영어 : 뜻으로 빠르게 훑어보세요.',
      tabLabel: '요리',
      categoryLabel: '요리',
      listPage: 'cooking-voca-list.html',
      postPage: 'cooking-voca.html',
      postPath: 'cooking-voca',
      board: 'cooking-voca',
      apiPath: '/cooking-voca',
      navGroup: 'express',
      tabs: null,
      articleLayout: 'header-only',
      breadcrumbParent: { label: '요리', href: 'cooking-voca-list.html' }
    }
  };

  var SOURCE_FROM_SLUG = [
    { re: /-wsj$/i, label: 'WSJ' },
    { re: /-cnn$/i, label: 'CNN' },
    { re: /-economist$/i, label: 'Economist' },
    { re: /-koreaherald$/i, label: 'Korea Herald' },
    { re: /-koreatimes$/i, label: 'Korea Times' },
    { re: /-bbc$/i, label: 'BBC' },
    { re: /-nytimes$/i, label: 'NYT' },
    { re: /-reuters$/i, label: 'Reuters' }
  ];

  function getBoardConfig(key) {
    return BOARDS[key] || null;
  }

  function resolveSource(entry) {
    if (!entry) return '';
    if (entry.source) return String(entry.source).trim();
    var title = String(entry.title || '');
    var bracket = title.match(/^\[([^\]]+)\]\s*/);
    if (bracket) return bracket[1].trim();
    var slug = String(entry.slug || '');
    for (var i = 0; i < SOURCE_FROM_SLUG.length; i += 1) {
      if (SOURCE_FROM_SLUG[i].re.test(slug)) return SOURCE_FROM_SLUG[i].label;
    }
    return '';
  }

  function cleanTitle(entry) {
    var title = String((entry && entry.title) || '제목 없음');
    return title.replace(/^\[([^\]]+)\]\s*/, '').trim() || title;
  }

  /** "한글 | English" / "English | 한글" → { en, ko, display: "English : 한글" } */
  function splitBilingualTitle(title) {
    var t = String(title || '').trim();
    var m = t.match(/^(.+?)\s*[|｜]\s*(.+)$/);
    if (!m) return { display: t, en: '', ko: '', bilingual: false };
    var a = m[1].trim();
    var b = m[2].trim();
    var aKo = /[가-힣]/.test(a);
    var bKo = /[가-힣]/.test(b);
    var aEn = /[A-Za-z]/.test(a);
    var bEn = /[A-Za-z]/.test(b);
    var en = '';
    var ko = '';
    if (aKo && bEn) {
      ko = a;
      en = b;
    } else if (aEn && bKo) {
      en = a;
      ko = b;
    } else {
      return { display: t, en: '', ko: '', bilingual: false };
    }
    return { display: en + ' : ' + ko, en: en, ko: ko, bilingual: true };
  }

  global.BoardListConfig = {
    BOARDS: BOARDS,
    NEWS_TABS: NEWS_TABS,
    get: getBoardConfig,
    resolveSource: resolveSource,
    cleanTitle: cleanTitle,
    splitBilingualTitle: splitBilingualTitle
  };
})(typeof window !== 'undefined' ? window : globalThis);
