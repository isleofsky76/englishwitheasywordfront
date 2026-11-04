import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const samples = [
  ['말이 쉽지', 'Easier said than done.', 'Losing weight is easier said than done.', '살을 빼는 건 말처럼 쉽지 않아.'],
  ['내 말이 그 말이야', "That's what I'm saying!", "That's what I'm saying! We need more time.", '내 말이 그 말이야! 시간이 더 필요하다니까.'],
  ['그럴 줄 알았어', 'I knew it.', 'I knew it! He was lying.', '그럴 줄 알았어! 그가 거짓말하고 있었어.'],
  ['너무 무리하지 마', "Don't push yourself too hard.", "Don't push yourself too hard. You need rest.", '너무 무리하지 마. 쉬어야 해.'],
  ['별말씀을요', "You're welcome. / Don't mention it.", "Don't mention it. Happy to help.", '별말씀을요. 도움이 되어서 좋아요.'],
  ['괜찮아요', "It's okay. / I'm fine.", "It's okay. Don't worry about it.", '괜찮아요. 걱정하지 마세요.'],
  ['잠깐만요', 'Hold on. / Just a second.', "Hold on a second. I'll be right there.", '잠깐만요. 금방 갈게요.'],
  ['무슨 일이야?', "What's up? / What's going on?", "What's going on? You look upset.", '무슨 일이야? 표정이 안 좋아.'],
  ['잘 지냈어요?', 'How have you been?', 'How have you been? Long time no see.', '잘 지냈어요? 오랜만이에요.'],
  ['나중에 보자', 'See you later.', 'See you later. Text me when you get home.', '나중에 보자. 집에 가면 문자해.'],
  ['조심해서 가요', 'Take care.', 'Take care on your way home.', '집에 조심해서 가요.'],
  ['화이팅', 'You got this. / Good luck.', 'You got this. I believe in you.', '할 수 있어. 난 너를 믿어.'],
  ['실례합니다', 'Excuse me.', 'Excuse me, is this seat taken?', '실례합니다, 이 자리 비었나요?'],
  ['죄송해요', "I'm sorry.", "I'm sorry I'm late.", '늦어서 죄송해요.'],
  ['고마워요', 'Thank you.', 'Thank you for everything.', '모든 것에 고마워요.'],
  ['천만에요', "You're welcome.", "You're welcome. Anytime.", '천만에요. 언제든요.'],
  ['알겠어요', 'Got it. / I see.', "Got it. I'll handle it.", '알겠어요. 제가 처리할게요.'],
  ['모르겠어요', "I'm not sure. / I don't know.", "I'm not sure. Let me check.", '모르겠어요. 확인해볼게요.'],
  ['상관없어요', "I don't mind. / It doesn't matter.", "I don't mind. Either is fine.", '상관없어요. 둘 다 괜찮아요.'],
  ['당연히', 'Of course. / Absolutely.', 'Of course. Count me in.', '당연히. 나도 끼워 줘.'],
  ['절대 안 돼', 'No way. / Absolutely not.', "No way. That's too risky.", '절대 안 돼. 너무 위험해.'],
  ['대단하다', "That's amazing.", "That's amazing. How did you do that?", '대단하다. 어떻게 한 거야?'],
  ['웃기다', "That's funny.", "That's so funny. I can't stop laughing.", '너무 웃겨. 웃음이 안 멈춰.'],
  ['짜증 나', 'This is so annoying.', 'This is so annoying. The Wi-Fi keeps dropping.', '짜증 나. 와이파이가 자꾸 끊겨.'],
  ['피곤해', "I'm exhausted.", "I'm exhausted. I need a break.", '피곤해. 좀 쉬어야겠어.'],
  ['배고파', "I'm starving.", "I'm starving. Let's grab a bite.", '배고파. 뭐 좀 먹자.'],
  ['목말라', "I'm thirsty.", "I'm thirsty. Can I get some water?", '목말라. 물 좀 줄래?'],
  ['추워', "It's freezing.", "It's freezing out here.", '여기 밖이 너무 추워.'],
  ['더워', "It's boiling.", "It's boiling in this room.", '이 방 너무 더워.'],
  ['비 온다', "It's raining.", "It's raining. Grab an umbrella.", '비 온다. 우산 챙겨.'],
  ['정신없어', "I'm swamped.", "I'm swamped with work today.", '오늘 일 때문에 정신없어.'],
  ['바쁜가 봐', 'You seem busy.', 'You seem busy. Want me to come back later?', '바쁜가 봐. 나중에 올까?'],
  ['천천히 해', 'Take your time.', "Take your time. There's no rush.", '천천히 해. 서두를 필요 없어.'],
  ['서두르자', "Let's hurry.", "Let's hurry. We're running late.", '서두르자. 늦겠어.'],
  ['길 잃었어', "I'm lost.", "I'm lost. Can you help me find the station?", '길 잃었어. 역 찾는 것 좀 도와주실래요?'],
  ['맞아', "Exactly. / That's right.", "Exactly. That's what I meant.", '맞아. 그게 내 말이었어.'],
  ['아니야', "No, that's not it.", "No, that's not what I meant.", '아니야. 그게 내 뜻이 아니었어.'],
  ['진짜?', 'Really? / Are you serious?', "Really? I can't believe it.", '진짜? 믿기지가 않아.'],
  ['설마', "No way. / You've got to be kidding.", "You've got to be kidding me.", '설마. 농담이지?'],
  ['그럼 그렇지', 'That figures.', 'That figures. He always does that.', '그럼 그렇지. 맨날 저러더라.'],
  ['어쩔 수 없지', "It can't be helped.", "It can't be helped. We'll try again tomorrow.", '어쩔 수 없지. 내일 다시 해보자.'],
  ['다음에 하자', "Let's do it next time.", "Let's do it next time. I'm wiped out.", '다음에 하자. 나 지쳤어.'],
  ['나한테 맡겨', 'Leave it to me.', "Leave it to me. I've got this.", '나한테 맡겨. 내가 할게.'],
  ['도와줄게', "I'll help you out.", "I'll help you out with that.", '그거 도와줄게.'],
  ['신경 쓰지 마', "Don't worry about it.", "Don't worry about it. It's nothing.", '신경 쓰지 마. 별거 아니야.'],
  ['잊어버려', 'Just forget it.', "Just forget it. It's not worth it.", '잊어버려. 그럴 가치 없어.'],
  ['잘했어', 'Well done. / Nice job.', 'Nice job. You nailed it.', '잘했어. 완벽했어.'],
  ['수고했어', 'Good work. / You did great.', 'Good work today. Go get some rest.', '오늘 수고했어. 좀 쉬어.'],
  ['조심해', 'Be careful.', 'Be careful crossing the street.', '길 건널 때 조심해.'],
  ['믿어', 'Trust me.', "Trust me. I wouldn't lie to you.", '믿어. 너한테 거짓말 안 해.'],
  ['약속해', 'Promise me.', "Promise me you'll call.", '전화하겠다고 약속해.'],
  ['웃지 마', "Don't laugh.", "Don't laugh. I'm serious.", '웃지 마. 진지해.'],
  ['울지 마', "Don't cry.", "Don't cry. Everything will be okay.", '울지 마. 다 괜찮아질 거야.'],
  ['화내지 마', "Don't get mad.", "Don't get mad. Hear me out.", '화내지 마. 내 말 좀 들어 봐.'],
  ['걱정 마', "Don't worry.", "Don't worry. I'll take care of it.", '걱정 마. 내가 처리할게.'],
  ['기다려', 'Hang on. / Wait up.', "Wait up! I'm coming.", '기다려! 나도 갈게.'],
  ['들어와', 'Come in.', 'Come in. Make yourself at home.', '들어와. 편하게 있어.'],
  ['앉아', 'Have a seat.', "Have a seat. I'll be right with you.", '앉아. 금방 갈게.'],
  ['먹어 봐', 'Try it.', "Try it. It's really good.", '먹어 봐. 진짜 맛있어.'],
  ['마셔 봐', 'Give it a taste.', "Give it a taste. You'll like it.", '마셔 봐. 마음에 들 거야.'],
  ['찍어 봐', 'Take a picture.', 'Take a picture. The view is perfect.', '찍어 봐. 경치가 끝내줘.'],
  ['말해 봐', 'Spit it out. / Tell me.', "Spit it out. What's on your mind?", '말해 봐. 무슨 생각이야?'],
  ['들어 봐', 'Listen up.', 'Listen up. This is important.', '들어 봐. 중요한 거야.'],
  ['생각해 봐', 'Think about it.', "Think about it. You'll see my point.", '생각해 봐. 내 말 이해될 거야.'],
  ['다시 해 봐', 'Try again.', "Try again. You're almost there.", '다시 해 봐. 거의 다 왔어.'],
  ['포기하지 마', "Don't give up.", "Don't give up. You're so close.", '포기하지 마. 거의 다 됐어.'],
  ['힘내', 'Chin up. / Hang in there.', 'Hang in there. Better days are coming.', '힘내. 좋은 날이 올 거야.'],
  ['행운을 빌어', 'Fingers crossed. / Good luck.', 'Fingers crossed for your interview.', '면접 잘되기를 행운을 빌게.'],
  ['축하해', 'Congratulations.', 'Congratulations on your promotion!', '승진 축하해!'],
  ['생일 축하해', 'Happy birthday!', 'Happy birthday! Make a wish.', '생일 축하해! 소원 빌어.'],
  ['새해 복 많이 받아', 'Happy New Year!', 'Happy New Year! All the best.', '새해 복 많이 받아!'],
  ['메리 크리스마스', 'Merry Christmas!', 'Merry Christmas! Enjoy the holidays.', '메리 크리스마스! 연휴 잘 보내.'],
  ['오래간만이야', 'Long time no see.', 'Long time no see. How have you been?', '오래간만이야. 잘 지냈어?'],
  ['처음 뵙겠습니다', 'Nice to meet you.', "Nice to meet you. I've heard a lot about you.", '처음 뵙겠습니다. 많이 들었어요.'],
  ['잘 부탁해', 'Looking forward to working with you.', 'Looking forward to working with you.', '앞으로 잘 부탁드려요.'],
  ['또 봐요', 'See you around.', 'See you around. Take care.', '또 봐요. 건강하세요.'],
  ['연락할게', "I'll keep in touch.", "I'll keep in touch. Don't be a stranger.", '연락할게. 소원하게 지내지 마.'],
  ['문자해', 'Text me.', 'Text me when you arrive.', '도착하면 문자해.'],
  ['전화해', 'Give me a call.', 'Give me a call tonight.', '오늘 밤 전화해.'],
  ['카톡해', 'Message me on KakaoTalk.', 'Message me on KakaoTalk later.', '나중에 카톡해.'],
  ['공유해 줘', 'Share it with me.', 'Share the link with me.', '링크 공유해 줘.'],
  ['저장해 둬', 'Save it for later.', 'Save it for later. You might need it.', '나중에 쓰게 저장해 둬.'],
  ['보내 줄게', "I'll send it over.", "I'll send it over in a minute.", '금방 보내 줄게.'],
  ['확인해 볼게', "I'll look into it.", "I'll look into it and get back to you.", '확인해 보고 연락할게.'],
  ['생각해 볼게', "I'll think about it.", "I'll think about it and let you know.", '생각해 보고 알려줄게.'],
  ['결정했어', "I've made up my mind.", "I've made up my mind. I'm going.", '결정했어. 나 갈게.'],
  ['마음이 바뀌었어', 'I changed my mind.', "I changed my mind. Let's stay in.", '마음이 바뀌었어. 집에 있자.'],
  ['기분이 좋아', "I'm in a good mood.", "I'm in a good mood today.", '오늘 기분이 좋아.'],
  ['기분이 안 좋아', "I'm in a bad mood.", "I'm in a bad mood. Give me a minute.", '기분이 안 좋아. 잠깐만.'],
  ['스트레스 받아', "I'm stressed out.", "I'm stressed out about the deadline.", '마감 때문에 스트레스 받아.'],
  ['안심이야', 'What a relief.', 'What a relief. Everything worked out.', '안심이야. 다 잘 됐어.'],
  ['실망이야', "I'm disappointed.", "I'm disappointed in the result.", '결과에 실망이야.'],
  ['기대돼', "I'm looking forward to it.", "I'm looking forward to the trip.", '여행이 기대돼.'],
  ['설레', "I'm so excited.", "I'm so excited for tonight.", '오늘 밤이 너무 설레.'],
  ['심심해', "I'm bored.", "I'm bored. Want to hang out?", '심심해. 놀러 갈래?'],
  ['외로워', 'I feel lonely.', 'I feel lonely these days.', '요즘 외로워.'],
  ['그립다', 'I miss you.', 'I miss you. When can we meet?', '보고 싶어. 언제 만날 수 있어?'],
  ['사랑해', 'I love you.', 'I love you more than words can say.', '말로 다 못 할 만큼 사랑해.'],
  ['미안해', 'My bad. / Sorry about that.', "My bad. I should've told you sooner.", '미안해. 더 일찍 말했어야 했는데.'],
  ['괜찮아질 거야', "It'll be alright.", "It'll be alright. Hang in there.", '괜찮아질 거야. 조금만 참아.'],
];

while (samples.length < 100) {
  const i = samples.length + 1;
  samples.push([
    `샘플 표현 ${i}`,
    `Sample expression ${i}.`,
    `This is a sample sentence for expression ${i}.`,
    `표현 ${i}을 위한 샘플 예문입니다.`,
  ]);
}

const rows = samples.slice(0, 100).map((s, i) => {
  const id = `EXP${String(i + 1).padStart(6, '0')}`;
  return {
    id,
    ko: s[0],
    en: s[1],
    example: s[2],
    translation: s[3],
    category: '일상 표현',
    tags: ['일상'],
    level: 'B1',
    status: 'draft',
  };
});

const outDir = path.join(__dirname, '..', 'data');
fs.mkdirSync(outDir, { recursive: true });
const jsonPath = path.join(outDir, 'expressions-seed-100.json');
fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2), 'utf8');

const csvHeader = 'id,ko,en,example,translation,category,tags,level,status';
const csvLines = rows.map((r) => {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  return [
    r.id,
    esc(r.ko),
    esc(r.en),
    esc(r.example),
    esc(r.translation),
    esc(r.category),
    esc(JSON.stringify(r.tags)),
    r.level,
    r.status,
  ].join(',');
});
fs.writeFileSync(path.join(outDir, 'expressions-seed-100.csv'), '\uFEFF' + [csvHeader, ...csvLines].join('\n'), 'utf8');

console.log('wrote', rows.length, '→', jsonPath, '(published', rows.filter((r) => r.status === 'published').length + ')');
