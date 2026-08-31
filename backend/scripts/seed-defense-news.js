/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

const article = {
  title: '요격 미사일이 떨어지면 어떻게 될까요? | deplete · attritional · proliferation · formidable',

  slug: 'vulnerable-related-words',

  metaDescription:
    'vulnerable(취약한), boast(성과를 내세우다), plight(곤경), deplete(고갈시키다), attritional(소모전의), proliferation(확산), formidable(만만치 않은) 등 국방 관련 시사 어휘를 정리합니다.',

  password: 'seed_defense_vulnerable-related-words',

  datePublished: '2026-08-31',

  intro: [
    '요격 미사일이 떨어지면 어떻게 될까요? Economist 기사에 나온 어휘들입니다.',

    '**Source:** The Economist, *What happens when interceptor missiles run out?* All rights belong to the original creator.',
  ],

  words: [
    {
      title: '1. vulnerable',
      narrative: [
        'vulnerable(ˈvʌlnərəbəl / 벌너러블)은 **취약한**, **공격받기 쉬운**이라는 뜻입니다.',

        '*Military bases become vulnerable, and even major powers may be forced to limit military operations.*',

        '**Military bases become vulnerable** 군사기지가 취약해지고 / **and even major powers may be forced** 심지어 강대국들도 어쩔 수 없이 / **to limit military operations** 군사작전을 제한해야 할 수 있다.',
      ],
    },

    {
      title: '2. boast',
      narrative: [
        'boast(boʊst / 보우스트)는 **자랑하다**, **성과를 내세우다**라는 뜻입니다.',

        '*In March Ukraine boasted of intercepting about 70% of ballistic missiles.*',

        '**In March** 3월에 / **Ukraine boasted of intercepting** 우크라이나는 요격했다고 성과를 내세웠다 / **about 70% of ballistic missiles** 탄도미사일의 약 70%를.',
      ],
    },

    {
      title: '3. plight',
      narrative: [
        'plight(plaɪt / 플라이트)는 **곤경**, **어려운 처지**라는 뜻입니다.',
      ],
    },

    {
      title: '4. divert',
      narrative: [
        'divert(daɪˈvɜːrt / 다이버트)는 **다른 곳으로 돌리다**, **전용하다**라는 뜻입니다.',

        '*Divert them to other missions.*',

        '**Divert them** 그것들을 돌리다 / **to other missions** 다른 임무로.',
      ],
    },

    {
      title: '5. deplete',
      narrative: [
        'deplete(dɪˈpliːt / 디플리트)는 **고갈시키다**, **소진하다**라는 뜻입니다.',

        '*Depleted its stocks.*',

        '**Depleted** 소진했다 / **its stocks** 보유 비축량을.',
      ],
    },

    {
      title: '6. attritional',
      narrative: [
        'attritional(əˈtrɪʃənəl / 어트리셔널)은 **소모전의**라는 뜻입니다.',

        '*Attritional wars.*',

        '**Attritional wars** 소모전들.',
      ],
    },

    {
      title: '7. proximate',
      narrative: [
        'proximate(ˈprɑːksɪmət / 프락서밋)은 **가장 가까운**이라는 뜻입니다.',

        '*Proximate cause.*',

        '**Proximate cause** 가장 가까운 원인.',
      ],
    },

    {
      title: '8. prodigious',
      narrative: [
        'prodigious(prəˈdɪdʒəs / 프러디저스)는 **막대한**, **엄청난**이라는 뜻입니다.',

        '*Prodigious use.*',

        '**Prodigious use** 막대한 사용.',
      ],
    },

    {
      title: '9. hasten',
      narrative: [
        'hasten(ˈheɪsən / 헤이슨)은 **앞당기다**, **재촉하다**라는 뜻입니다.',

        '*Hastened a reckoning.*',

        '**Hastened** 앞당겼다 / **a reckoning** 현실을 직시해야 하는 순간을.',
      ],
    },

    {
      title: '10. proliferation',
      narrative: [
        'proliferation(prəˌlɪfəˈreɪʃən / 프럴리퍼레이션)은 **확산**이라는 뜻입니다.',

        '*Global proliferation.*',

        '**Global proliferation** 전 세계적인 확산.',
      ],
    },

    {
      title: '11. complacency',
      narrative: [
        'complacency(kəmˈpleɪsənsi / 컴플레이선시)는 **안일함**이라는 뜻입니다.',
      ],
    },

    {
      title: '12. gargantuan',
      narrative: [
        'gargantuan(ɡɑːrˈɡæntʃuən / 가갠추언)은 **엄청나게 거대한**이라는 뜻입니다.',

        '*Gargantuan $1.5trn defence-budget.*',

        '**Gargantuan** 엄청나게 거대한 / **$1.5trn defence-budget** 1조 5천억 달러 규모의 국방예산.',
      ],
    },

    {
      title: '13. hitch',
      narrative: [
        'hitch(hɪtʃ / 히치)는 **문제점**, **예상치 못한 장애**라는 뜻입니다.',

        '*The hitch is...*',

        '**The hitch is** 문제는…',
      ],
    },

    {
      title: '14. improvise',
      narrative: [
        'improvise(ˈɪmprəvaɪz / 임프러바이즈)는 **즉석에서 만들어내다**라는 뜻입니다.',

        '*Improvised a system.*',

        '**Improvised** 즉석에서 만들었다 / **a system** 하나의 체계를.',
      ],
    },

    {
      title: '15. upstage',
      narrative: [
        'upstage(ˌʌpˈsteɪdʒ / 업스테이지)는 **능가하다**, **존재감을 빼앗다**라는 뜻입니다.',

        '*Being upstaged by.*',

        '**Being upstaged by** ~에 의해 능가당하는 것.',
      ],
    },

    {
      title: '16. nimble',
      narrative: [
        'nimble(ˈnɪmbəl / 님블)은 **민첩한**, **빠르게 대응하는**이라는 뜻입니다.',

        '*Nimble defence.*',

        '**Nimble defence** 민첩한 방어.',
      ],
    },

    {
      title: '17. upstart',
      narrative: [
        'upstart(ˈʌpstɑːrt / 업스타트)는 **신생의**라는 뜻입니다.',

        '*Upstart firms.*',

        '**Upstart firms** 신생 기업들.',
      ],
    },

    {
      title: '18. abound',
      narrative: [
        'abound(əˈbaʊnd / 어바운드)는 **많이 존재하다**, **풍부하다**라는 뜻입니다.',

        '*Sceptics abound.*',

        '**Sceptics** 회의론자들이 / **abound** 많이 존재한다.',
      ],
    },

    {
      title: '19. formidable',
      narrative: [
        'formidable(ˈfɔːrmɪdəbəl / 포미더블)은 **만만치 않은**이라는 뜻입니다.',
      ],
    },
  ],

  source:
    'https://www.economist.com/international/2026/08/18/what-happens-when-interceptor-missiles-run-out',

  youtube:
    'https://www.youtube.com/watch?v=A8Vot6kHG_0&list=PLSlq2Lkls6sY&index=5',
};

// ===============================

// ===============================

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
