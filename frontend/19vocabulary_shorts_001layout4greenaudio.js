/**
 * layout4green 음성·오디오 카탈로그
 * 파일: 19vocabulary_shorts_001layout4greenaudio.js
 * 사용: 19vocabulary_shorts_001layout4green.html 에서 본 스크립트를 layout4green.js 보다 먼저 로드
 *
 * 변경은 이 파일만 수정하면 됩니다.
 */

// ─── BGM ───────────────────────────────────────────────────────────
/** false=음악 끔 / true=켬 */
const BGM_ENABLED = true;
/** 초 단위. null이면 예문 수 자동 (6개→1:20, 1개 늘면 -10초 / 줄면 +10초) */
const BGM_START_SEC = 70;
const BGM_AUTO_BASE_WORDS = 6;
const BGM_AUTO_BASE_SEC = 75;
const BGM_AUTO_SEC_PER_WORD = 10;
const BGM_SRC = "resources/With You - Everet Almond.mp3";
const BGM_VOLUME = 0.02;

// ─── Review / 카운트다운 틱 ────────────────────────────────────────
// const COUNTDOWN_TICK_SRC = "resources/mixkit-bell-tick-tock-timer-1046.wav";
const COUNTDOWN_TICK_SRC = "resources/mixkit-tick-tock-clock-timer-1045.wav";
// const COUNTDOWN_TICK_SRC = "resources/mixkit-classic-melodic-clock-strike-1058.wav";
const COUNTDOWN_TICK_VOLUME = 0.275;
const COUNTDOWN_TICK_FALLBACK_SRC = "resources/mixkit-tick-tock-clock-timer-1045.wav";

// ─── TTS 속도 ──────────────────────────────────────────────────────
/** 영어 TTS 재생 속도 (1=기본) */
const EN_TTS_RATE = 1;

// ─── 한글 TTS ──────────────────────────────────────────────────────
/** 1~3 = KO_TTS_VOICE_IDS 고정 */
const KO_TTS_VOICE = 1;
const KO_TTS_VOICE_IDS = {
  1: "ko-KR",
  2: "ko-KR-Chirp3-HD-Achird",
  3: "ko-KR-Chirp3-HD-Achernar"
};

/**
 * 영어 TTS
 * EN_TTS_VOICE: "random" = autoplay 시작 시 풀에서 랜덤 · 1~N = EN_TTS_VOICE_IDS 고정
 * 남녀 허스키 톤 6개 (여 3 · 남 3)
 */
const EN_TTS_VOICE = "random";
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp3-HD-Gacrux", // 여 · 허스키
  2: "en-US-Chirp3-HD-Sulafat", // 여 · 낮고 차분
  3: "en-US-Chirp3-HD-Vindemiatrix", // 여 · 성숙
  4: "en-US-Chirp3-HD-Fenrir", // 남 · 낮고 허스키
  5: "en-US-Chirp3-HD-Enceladus", // 남 · 바리톤
  6: "en-US-Chirp3-HD-Algenib", // 남 · 차분 저음
};

/** 한눈에 보기용 메타 (코드에서 필수는 아님) */
const LAYOUT4GREEN_AUDIO_CATALOG = {
  bgm: {
    enabled: BGM_ENABLED,
    src: BGM_SRC,
    volume: BGM_VOLUME,
    startSec: BGM_START_SEC
  },
  tick: {
    src: COUNTDOWN_TICK_SRC,
    fallback: COUNTDOWN_TICK_FALLBACK_SRC,
    volume: COUNTDOWN_TICK_VOLUME
  },
  ko: {
    selected: KO_TTS_VOICE,
    voices: Object.entries(KO_TTS_VOICE_IDS).map(([id, name]) => ({ id: Number(id), name }))
  },
  en: {
    selected: EN_TTS_VOICE,
    rate: EN_TTS_RATE,
    voices: Object.entries(EN_TTS_VOICE_IDS).map(([id, name]) => ({ id: Number(id), name }))
  }
};

if (typeof window !== "undefined") {
  window.LAYOUT4GREEN_AUDIO_CATALOG = LAYOUT4GREEN_AUDIO_CATALOG;
}
