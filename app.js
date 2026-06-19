const state = {
  lesson: "all",
  mode: "jp-bn",
  pool: [],
  order: [],
  currentIndex: 0,
  current: null,
  selectedValue: null,
  locked: false,
  score: 0,
  answered: 0,
  startedAt: null,
  questionStartedAt: null,
  totalAnswerMs: 0,
  timerHandle: null,
};

// English display helper. Add more meanings here or add an `english` field in data.js.
const ENGLISH_BY_KANA = {
  "わたし":"Me / Myself", "あなた":"You", "あのひと":"That person", "せんせい":"Teacher", "がくせい":"Student",
  "かいしゃいん":"Company employee", "いしゃ":"Doctor", "ぎんこういん":"Bank employee", "だいがく":"University", "びょういん":"Hospital", "だれ":"Who", "なんさい":"How old", "くに":"Country", "にほん":"Japan",
  "これ":"This", "それ":"That / It", "あれ":"That over there", "この":"This", "その":"That", "あの":"That over there", "ほん":"Book", "じしょ":"Dictionary", "ざっし":"Magazine", "しんぶん":"Newspaper", "のーと":"Notebook", "てちょう":"Pocket notebook", "めいし":"Business card", "かぎ":"Key", "とけい":"Clock / Watch", "かばん":"Bag", "しゃしん":"Photo", "えんぴつ":"Pencil",
  "ここ":"Here", "そこ":"There", "あそこ":"Over there", "こちら":"This way / This person", "そちら":"That way", "あちら":"That way over there", "きょうしつ":"Classroom", "しょくどう":"Dining hall", "じむしょ":"Office", "かいぎしつ":"Meeting room", "うけつけ":"Reception", "へや":"Room", "おてあらい":"Restroom", "うち":"Home", "かいしゃ":"Company", "くつ":"Shoes", "うりば":"Sales counter", "ちか":"Basement",
  "おきます":"Wake up / Get up", "ねます":"Sleep", "はたらきます":"Work", "やすみます":"Rest / Take a day off", "べんきょうします":"Study", "おわります":"Finish", "いま":"Now", "なんじ":"What time", "なんぷん":"How many minutes", "ごぜん":"A.M.", "ごご":"P.M.", "あさ":"Morning", "ひる":"Noon", "ばん":"Night", "きょう":"Today", "あした":"Tomorrow", "きのう":"Yesterday", "まいにち":"Every day",
  "いきます":"Go", "きます":"Come / Wear", "かえります":"Return", "がっこう":"School", "えき":"Station", "ひこうき":"Airplane", "ふね":"Ship", "でんしゃ":"Train", "ちかてつ":"Subway", "しんかんせん":"Bullet train", "ばす":"Bus", "たくしー":"Taxi", "じてんしゃ":"Bicycle", "あるいて":"On foot", "ともだち":"Friend", "かぞく":"Family", "ひとりで":"Alone", "いつ":"When",
  "たべます":"Eat", "のみます":"Drink", "みます":"See / Check", "ききます":"Listen / Ask", "よみます":"Read", "かきます":"Write", "かいます":"Buy / Keep a pet", "とります":"Take", "します":"Do", "あいます":"Meet", "ごはん":"Rice / Meal", "あさごはん":"Breakfast", "ひるごはん":"Lunch", "ばんごはん":"Dinner", "たまご":"Egg", "にく":"Meat", "さかな":"Fish", "やさい":"Vegetables", "くだもの":"Fruit", "みず":"Water", "おちゃ":"Tea", "こーひー":"Coffee", "じゅーす":"Juice",
  "きります":"Cut", "おくります":"Send", "あげます":"Give", "もらいます":"Receive", "かします":"Lend", "かります":"Borrow", "おしえます":"Teach / Tell", "ならいます":"Learn", "かけます":"Make a phone call / Hang", "て":"Hand", "はし":"Chopsticks", "すぷーん":"Spoon", "ないふ":"Knife", "ふぉーく":"Fork", "はさみ":"Scissors", "ぱそこん":"Computer", "けいたい":"Mobile phone", "めーる":"Email", "ぷれぜんと":"Present", "おかね":"Money", "ちち":"My father", "はは":"My mother",
  "きれい":"Beautiful / Clean", "しずか":"Quiet", "にぎやか":"Lively", "ゆうめい":"Famous", "しんせつ":"Kind", "げんき":"Healthy / Energetic", "ひま":"Free time", "べんり":"Convenient", "おおきい":"Big", "ちいさい":"Small", "あたらしい":"New", "ふるい":"Old", "いい":"Good", "わるい":"Bad", "あつい":"Hot / Thick", "さむい":"Cold", "つめたい":"Cold to touch", "むずかしい":"Difficult", "やさしい":"Easy / Kind", "たかい":"Expensive / High", "やすい":"Cheap", "おいしい":"Delicious", "いそがしい":"Busy", "たのしい":"Fun", "あかい":"Red", "あおい":"Blue",
  "わかります":"Understand", "あります":"There is / Have", "すき":"Like", "きらい":"Dislike", "じょうず":"Good at", "へた":"Bad at", "りょうり":"Cooking", "のみもの":"Drink", "すぽーつ":"Sports", "やきゅう":"Baseball", "さっかー":"Soccer", "おんがく":"Music", "うた":"Song", "えいが":"Movie", "てがみ":"Letter", "やくそく":"Promise / Appointment", "ようじ":"Errand", "じかん":"Time", "よく":"Often / Well", "たくさん":"A lot", "すこし":"A little", "ぜんぜん":"Not at all",
  "います":"There is / Stay", "いろいろ":"Various", "おとこのひと":"Man", "おんなのひと":"Woman", "おとこのこ":"Boy", "おんなのこ":"Girl", "いぬ":"Dog", "ねこ":"Cat", "き":"Tree", "もの":"Thing", "はこ":"Box", "すいっち":"Switch", "れいぞうこ":"Refrigerator", "てーぶる":"Table", "べっど":"Bed", "たな":"Shelf", "どあ":"Door", "まど":"Window", "ぽすと":"Mailbox", "こうえん":"Park", "ほんや":"Bookstore",
  "ひとつ":"One item", "ふたつ":"Two items", "みっつ":"Three items", "よっつ":"Four items", "いつつ":"Five items", "むっつ":"Six items", "ななつ":"Seven items", "やっつ":"Eight items", "ここのつ":"Nine items", "とお":"Ten items", "なんこ":"How many small items", "なんにん":"How many people", "なんだい":"How many machines/cars", "なんまい":"How many flat things", "なんかい":"How many times", "りんご":"Apple", "みかん":"Mandarin orange", "きって":"Stamp", "はがき":"Postcard", "ふうとう":"Envelope", "そくたつ":"Express delivery", "ふなびん":"Sea mail",
  "かんたん":"Easy", "ちかい":"Near", "とおい":"Far", "はやい":"Fast / Early", "おそい":"Slow / Late", "おおい":"Many", "すくない":"Few", "あたたかい":"Warm", "すずしい":"Cool", "あまい":"Sweet", "からい":"Spicy", "おもい":"Heavy", "かるい":"Light", "てんき":"Weather", "あめ":"Rain", "ゆき":"Snow", "くもり":"Cloudy", "ほてる":"Hotel", "くうこう":"Airport", "うみ":"Sea", "せかい":"World", "おまつり":"Festival",
  "あそびます":"Play / Hang out", "およぎます":"Swim", "むかえます":"Go to pick up / Welcome", "つかれます":"Get tired", "けっこんします":"Get married", "かいものします":"Shop", "しょくじします":"Have a meal", "さんぽします":"Take a walk", "たいへん":"Hard / Very", "ほしい":"Want", "ひろい":"Spacious", "せまい":"Narrow", "しやくしょ":"City office", "ぷーる":"Swimming pool", "かわ":"River", "びじゅつ":"Art", "つり":"Fishing", "すきー":"Skiing", "かいぎ":"Meeting", "とうろく":"Registration", "しゅうまつ":"Weekend", "なにか":"Something", "どこか":"Somewhere",
  "つけます":"Turn on / Attach", "けします":"Turn off / Erase", "あけます":"Open", "しめます":"Close", "いそぎます":"Hurry", "まちます":"Wait", "とめます":"Stop", "まがります":"Turn", "もちます":"Hold / Carry", "てつだいます":"Help", "よびます":"Call", "はなします":"Speak", "みせます":"Show", "じゅうしょ":"Address", "ちず":"Map", "しお":"Salt", "さとう":"Sugar",
  "たちます":"Stand", "すわります":"Sit", "つかいます":"Use", "つくります":"Make", "うります":"Sell", "しります":"Know", "すみます":"Live", "けんきゅうします":"Research", "しりょう":"Materials / Data", "かたろぐ":"Catalog", "じこくひょう":"Timetable", "ふく":"Clothes", "せいひん":"Product", "そふとうぇあ":"Software",
  "のります":"Ride", "おります":"Get off / Be", "のりかえます":"Transfer", "あびます":"Take a shower", "いれます":"Put in", "だします":"Take out / Submit", "はいります":"Enter", "でます":"Leave / Appear", "おします":"Push", "わかい":"Young", "ながい":"Long", "みじかい":"Short", "あかるい":"Bright", "くらい":"Dark", "からだ":"Body",
  "おぼえます":"Memorize", "わすれます":"Forget", "なくします":"Lose", "はらいます":"Pay", "かえします":"Return something", "でかけます":"Go out", "ぬぎます":"Take off clothes", "もっていきます":"Take with", "もってきます":"Bring", "しんぱいします":"Worry", "ざんぎょうします":"Work overtime", "しゅっちょうします":"Go on a business trip", "くすり":"Medicine", "おふろ":"Bath", "たいせつ":"Important",
  "できます":"Can / Possible", "あらいます":"Wash", "ひきます":"Play an instrument", "うたいます":"Sing", "あつめます":"Collect", "すてます":"Throw away", "かえます":"Change", "うんてんします":"Drive", "よやくします":"Reserve", "しゅみ":"Hobby", "にっき":"Diary", "いのります":"Pray", "かちょう":"Section chief", "どうぶつ":"Animal",
  "のぼります":"Climb", "とまります":"Stay overnight", "そうじします":"Clean", "せんたくします":"Do laundry", "れんしゅうします":"Practice", "なります":"Become", "ねむい":"Sleepy", "つよい":"Strong", "よわい":"Weak", "ちょうし":"Condition", "ごるふ":"Golf", "すもう":"Sumo", "ぱちんこ":"Pachinko",
  "いります":"Need", "しらべます":"Look up / Investigate", "しゅうりします":"Repair", "ぼく":"I / Me (male casual)", "きみ":"You (casual)", "うん":"Yes (casual)", "ううん":"No (casual)", "さらりーまん":"Office worker", "ことば":"Word / Language", "ぶっか":"Prices", "きもの":"Kimono", "びざ":"Visa", "はじめ":"Start", "おわり":"End", "こっち":"This way", "そっち":"That way",
  "おもいます":"Think", "いいます":"Say", "かちます":"Win", "まけます":"Lose", "やくにたちます":"Be useful", "むだ":"Waste", "ふべん":"Inconvenient", "おなじ":"Same", "すごい":"Amazing", "しゅしょう":"Prime minister", "にゅーす":"News", "しあい":"Match", "いけん":"Opinion", "はなし":"Story / Talk",
  "はきます":"Wear shoes/pants", "かぶります":"Wear a hat", "うまれます":"Be born", "せーたー":"Sweater", "ぼうし":"Hat", "めがね":"Glasses", "やちん":"Rent", "わしつ":"Japanese-style room", "おしいれ":"Closet", "ふとん":"Futon", "あぱーと":"Apartment",
  "まわします":"Turn / Rotate", "ひきます":"Pull / Play", "さわります":"Touch", "あるきます":"Walk", "わたります":"Cross", "さびしい":"Lonely", "おゆ":"Hot water", "おと":"Sound", "さいず":"Size", "こしょう":"Breakdown", "みち":"Road", "こうさてん":"Intersection",
  "くれます":"Give me", "つれていきます":"Take someone", "つれてきます":"Bring someone", "しょうかいします":"Introduce", "あんないします":"Guide", "せつめいします":"Explain", "おじいさん":"Grandfather / Old man", "おばあさん":"Grandmother / Old woman", "じゅんび":"Preparation", "ひっこし":"Moving house", "おかし":"Sweets / Snacks",
  "かんがえます":"Think", "りゅうがくします":"Study abroad", "いなか":"Countryside", "たいしかん":"Embassy", "ぐるーぷ":"Group", "ちゃんす":"Chance", "おく":"One hundred million", "もし":"If", "いくら":"How much / However much",
  "かじ":"Housework", "せんたくもの":"Laundry", "そうじき":"Vacuum cleaner", "けいかく":"Plan", "きゅうこう":"Express train", "ていきけん":"Commuter pass", "じゅうたい":"Traffic jam", "きゅうじつ":"Day off", "はくぶつかん":"Museum", "てんらんかい":"Exhibition", "やくしょ":"Government office", "まどぐち":"Service counter", "しょるい":"Documents", "ねだん":"Price", "わりびき":"Discount", "しょうひん":"Product", "ちゅうもん":"Order", "はいそう":"Delivery", "しはらい":"Payment", "しょうじょう":"Symptoms", "たいちょう":"Physical condition", "けんこう":"Health", "けんさ":"Examination", "こうか":"Effect", "せき":"Cough / Seat", "けが":"Injury", "ちりょう":"Treatment", "せいかく":"Personality", "しょうじき":"Honest", "ゆうき":"Courage", "ふあん":"Anxiety", "あんしん":"Relief", "しょくば":"Workplace", "ほうこく":"Report", "そうだん":"Consultation", "しめきり":"Deadline", "きゅうりょう":"Salary", "けいやく":"Contract", "じゅぎょう":"Class", "しゅくだい":"Homework", "しけん":"Exam", "ごうかく":"Pass", "せいせき":"Grades", "こうぎ":"Lecture", "かいわ":"Conversation", "はつおん":"Pronunciation", "ひょうげん":"Expression", "かんじ":"Kanji", "ぶんぽう":"Grammar", "しりあい":"Acquaintance", "どうりょう":"Coworker", "せんぱい":"Senior", "こうはい":"Junior", "けんか":"Fight", "れいぎ":"Manners", "きょり":"Distance", "よほう":"Forecast", "きおん":"Temperature", "しつど":"Humidity", "たいふう":"Typhoon", "じしん":"Earthquake", "こうずい":"Flood", "しぜん":"Nature", "ざいりょう":"Ingredients", "ちょうみりょう":"Seasoning", "あじ":"Taste", "えいよう":"Nutrition", "もんだい":"Problem", "げんいん":"Cause", "けっか":"Result", "えいきょう":"Influence", "かいけつ":"Solution", "きじ":"Article", "ほうそう":"Broadcast", "ばんぐみ":"Program", "じょうほう":"Information", "こうこく":"Advertisement", "けんさく":"Search", "がぞう":"Image", "どうが":"Video", "ぎょうじ":"Event", "まつり":"Festival", "しゅうかん":"Custom / Habit", "でんとう":"Tradition", "れきし":"History", "ぶんか":"Culture", "こくさい":"International", "こうりゅう":"Exchange", "かんこう":"Tourism", "りゆう":"Reason", "もくてき":"Purpose", "ほうほう":"Method", "ばあい":"Case", "じょうたい":"State", "へんか":"Change", "かんけい":"Relationship", "ひつよう":"Necessary", "かのう":"Possible", "ふかのう":"Impossible", "だんだん":"Gradually", "だいたい":"Generally", "ほとんど":"Almost all", "かなり":"Quite", "けっこう":"Rather / Pretty", "ぜったいに":"Definitely", "とくに":"Especially", "ちゃんと":"Properly", "つまり":"In other words", "たとえば":"For example", "それに":"Besides", "しかし":"However", "だから":"So", "ところで":"By the way", "それとも":"Or", "いっぽう":"On the other hand", "けっきょく":"After all", "ちしき":"Knowledge", "ぎじゅつ":"Technology", "せいど":"System", "しゃかい":"Society", "けいざい":"Economy", "さんぎょう":"Industry", "じんこう":"Population", "せいかつ":"Life", "しょうらい":"Future"
};

const els = {
  lessonSelect: document.getElementById("lessonSelect"),
  modeSelect: document.getElementById("modeSelect"),
  autoAudio: document.getElementById("autoAudio"),
  restartBtn: document.getElementById("restartBtn"),
  lessonTitle: document.getElementById("lessonTitle"),
  questionCount: document.getElementById("questionCount"),
  progressFill: document.getElementById("progressFill"),
  promptText: document.getElementById("promptText"),
  questionWord: document.getElementById("questionWord"),
  questionWordText: document.getElementById("questionWordText"),
  audioBtn: document.getElementById("audioBtn"),
  hintText: document.getElementById("hintText"),
  optionsForm: document.getElementById("optionsForm"),
  feedback: document.getElementById("feedback"),
  checkBtn: document.getElementById("checkBtn"),
  nextBtn: document.getElementById("nextBtn"),
  scoreText: document.getElementById("scoreText"),
  answerText: document.getElementById("answerText"),
  correctText: document.getElementById("correctText"),
  mistakeText: document.getElementById("mistakeText"),
  timerText: document.getElementById("timerText"),
  avgTimeText: document.getElementById("avgTimeText"),
  toggleStudy: document.getElementById("toggleStudy"),
  studyList: document.getElementById("studyList"),
};

function flattenData() {
  return window.VOCAB_DATA.flatMap(lesson =>
    lesson.words.map(word => ({
      ...word,
      id: lesson.id || String(lesson.lesson),
      level: lesson.level || "",
      lesson: lesson.lesson,
      lessonTitle: lesson.title
    }))
  );
}

const ALL_WORDS = flattenData();

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sampleDistractors(correct, key, count = 3) {
  const levelPool = ALL_WORDS.filter(item => item.level === correct.level && item[key] !== correct[key]);
  const widerPool = ALL_WORDS.filter(item => item[key] !== correct[key]);
  const candidates = shuffle(levelPool.length >= count ? levelPool : widerPool);
  const unique = [];
  const seen = new Set([correct[key]]);
  for (const item of candidates) {
    if (!seen.has(item[key])) {
      unique.push(item);
      seen.add(item[key]);
    }
    if (unique.length === count) break;
  }
  return unique;
}

function addOption(value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  els.lessonSelect.appendChild(option);
}

function populateLessons() {
  addOption("all", "All N5 + N4 + N3");
  addOption("n5", "N5 All Lessons 1-25");
  addOption("n4", "N4 All Lessons 26-50");
  addOption("n3", "N3 Sou Matome Vocabulary");

  const groups = [
    ["N5 - Minna no Nihongo I", "N5"],
    ["N4 - Minna no Nihongo II", "N4"],
    ["N3 - Sou Matome Vocabulary", "N3"],
  ];

  groups.forEach(([label, level]) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = label;
    window.VOCAB_DATA.filter(lesson => lesson.level === level).forEach(lesson => {
      const option = document.createElement("option");
      option.value = lesson.id || String(lesson.lesson);
      option.textContent = lesson.title;
      optgroup.appendChild(option);
    });
    els.lessonSelect.appendChild(optgroup);
  });
}

function buildPool() {
  if (state.lesson === "all") {
    state.pool = [...ALL_WORDS];
  } else if (["n5", "n4", "n3"].includes(state.lesson)) {
    state.pool = ALL_WORDS.filter(item => item.level.toLowerCase() === state.lesson);
  } else {
    state.pool = ALL_WORDS.filter(item => item.id === state.lesson || String(item.lesson) === state.lesson);
  }
  state.order = shuffle(state.pool);
}

function startQuiz() {
  state.currentIndex = 0;
  state.score = 0;
  state.answered = 0;
  state.totalAnswerMs = 0;
  state.startedAt = Date.now();
  buildPool();
  renderStudyList();
  renderQuestion();
  updateScore();
  if (!state.timerHandle) {
    state.timerHandle = setInterval(updateScore, 1000);
  }
}

function currentPrompt() {
  if (state.mode === "bn-jp") return "Bangla meaning দেখে Hiragana choose করো";
  if (state.mode === "audio-bn") return "Audio শুনে Bangla meaning choose করো";
  return "Hiragana দেখে Bangla meaning choose করো";
}

function answerKey() {
  return state.mode === "bn-jp" ? "kana" : "bangla";
}

function englishText(item) {
  return item.english || ENGLISH_BY_KANA[item.kana] || "";
}

function meaningText(item) {
  const english = englishText(item);
  return english ? `${item.bangla} / ${english}` : item.bangla;
}

function optionText(item) {
  return state.mode === "bn-jp" ? item.kana : meaningText(item);
}

function questionText(item) {
  if (state.mode === "bn-jp") return meaningText(item);
  if (state.mode === "audio-bn") return "🔊 Audio only";
  return item.kana;
}

function selectedLessonLabel() {
  if (state.lesson === "all") return "All N5 + N4 + N3";
  if (state.lesson === "n5") return "N5 All Lessons 1-25";
  if (state.lesson === "n4") return "N4 All Lessons 26-50";
  if (state.lesson === "n3") return "N3 Sou Matome Vocabulary";
  return state.current ? state.current.lessonTitle : "Lesson";
}

function renderQuestion() {
  if (state.order.length === 0) {
    els.questionWordText.textContent = "No words";
    els.optionsForm.innerHTML = "";
    return;
  }

  state.locked = false;
  state.selectedValue = null;
  state.current = state.order[state.currentIndex % state.order.length];
  state.questionStartedAt = Date.now();

  const key = answerKey();
  const choices = shuffle([state.current, ...sampleDistractors(state.current, key, 3)]);

  els.promptText.textContent = currentPrompt();
  els.questionWordText.textContent = questionText(state.current);
  els.questionWord.classList.toggle("audio-only", state.mode === "audio-bn");
  els.hintText.textContent = "";
  els.hintText.classList.add("hidden");
  els.feedback.className = "feedback hidden";
  els.feedback.textContent = "";
  if (els.checkBtn) els.checkBtn.classList.add("hidden");
  els.nextBtn.classList.add("hidden");

  els.lessonTitle.textContent = selectedLessonLabel();
  els.questionCount.textContent = `Question ${state.currentIndex + 1} / ${state.order.length}`;
  els.progressFill.style.width = `${((state.currentIndex) / state.order.length) * 100}%`;

  els.optionsForm.innerHTML = "";
  choices.forEach((choice, index) => {
    const id = `opt-${index}`;
    const value = choice.kana;
    const label = document.createElement("label");
    label.className = "option-card";
    label.dataset.value = value;
    label.innerHTML = `
      <input type="checkbox" id="${id}" value="${escapeHtml(value)}" />
      <span>${escapeHtml(optionText(choice))}</span>
    `;
    label.addEventListener("click", event => {
      event.preventDefault();
      if (state.locked) return;
      selectOption(label.dataset.value);
      checkAnswer();
    });
    els.optionsForm.appendChild(label);
  });

  if (els.autoAudio.checked) {
    setTimeout(() => speakJapanese(state.current.kana), 350);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function selectOption(value) {
  state.selectedValue = value;
  document.querySelectorAll(".option-card").forEach(card => {
    const checked = card.dataset.value === value;
    card.classList.toggle("selected", checked);
    const input = card.querySelector("input");
    input.checked = checked;
  });
}

function checkAnswer() {
  if (state.locked) return;
  if (!state.selectedValue) {
    els.feedback.className = "feedback bad";
    els.feedback.textContent = "Please select one option.";
    return;
  }

  const correctValue = state.current.kana;
  const isCorrect = state.selectedValue === correctValue;
  state.locked = true;
  state.answered += 1;
  state.totalAnswerMs += Math.max(0, Date.now() - state.questionStartedAt);

  if (isCorrect) {
    state.score += 1;
    els.feedback.className = "feedback good";
    els.feedback.textContent = `✅ Correct: ${state.current.kana} = ${meaningText(state.current)}`;
  } else {
    els.feedback.className = "feedback bad";
    els.feedback.textContent = `❌ Wrong. Correct: ${state.current.kana} = ${meaningText(state.current)}`;
  }

  document.querySelectorAll(".option-card").forEach(card => {
    if (card.dataset.value === correctValue) card.classList.add("correct");
    if (card.dataset.value === state.selectedValue && !isCorrect) card.classList.add("wrong");
    card.querySelector("input").disabled = true;
  });

  if (els.checkBtn) els.checkBtn.classList.add("hidden");
  els.nextBtn.classList.remove("hidden");
  els.progressFill.style.width = `${((state.currentIndex + 1) / state.order.length) * 100}%`;
  updateScore();
}

function nextQuestion() {
  if (state.currentIndex + 1 >= state.order.length) {
    showFinal();
    return;
  }
  state.currentIndex += 1;
  renderQuestion();
}

function showFinal() {
  const percent = state.answered ? Math.round((state.score / state.answered) * 100) : 0;
  els.questionWordText.textContent = "Done 🎉";
  els.questionWord.classList.add("audio-only");
  els.promptText.textContent = "Quiz finished";
  els.hintText.textContent = "";
  els.hintText.classList.add("hidden");
  els.optionsForm.innerHTML = "";
  els.feedback.className = "feedback good";
  els.feedback.textContent = percent >= 80 ? "Nice! Now try another lesson." : "Review the study list and try again.";
  if (els.checkBtn) els.checkBtn.classList.add("hidden");
  els.nextBtn.classList.add("hidden");
  els.progressFill.style.width = "100%";
  updateScore();
}

function formatDuration(ms) {
  const total = Math.floor(ms / 1000);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateScore() {
  const elapsedMs = state.startedAt ? Date.now() - state.startedAt : 0;
  const avgSeconds = state.answered ? (state.totalAnswerMs / state.answered / 1000).toFixed(1) : "0.0";
  els.scoreText.textContent = `${state.score}/${state.answered}`;
  if (els.answerText) els.answerText.textContent = `${state.answered}`;
  if (els.correctText) els.correctText.textContent = `${state.score}`;
  if (els.mistakeText) els.mistakeText.textContent = `${Math.max(0, state.answered - state.score)}`;
  if (els.timerText) els.timerText.textContent = `${formatDuration(elapsedMs)}`;
  if (els.avgTimeText) els.avgTimeText.textContent = `${avgSeconds}s`;
}

function speakJapanese(text) {
  if (!window.speechSynthesis) {
    els.hintText.textContent = "এই browser-এ speech audio support নেই।";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.82;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("ja"));
  if (jaVoice) utterance.voice = jaVoice;

  window.speechSynthesis.speak(utterance);
}

function renderStudyList() {
  const lessonWords = state.pool.length ? state.pool : ALL_WORDS;
  els.studyList.innerHTML = lessonWords.map((item, index) => `
    <div class="study-item">
      <div>
        <div class="jp">${escapeHtml(item.kana)}</div>
        <div class="bn">${escapeHtml(item.bangla)}</div>
        <div class="en">${escapeHtml(englishText(item))}</div>
      </div>
      <button type="button" data-study-audio="${index}">🔊</button>
    </div>
  `).join("");

  els.studyList.querySelectorAll("button[data-study-audio]").forEach(button => {
    button.addEventListener("click", () => {
      const item = lessonWords[Number(button.dataset.studyAudio)];
      speakJapanese(item.kana);
    });
  });
}

function bindEvents() {
  els.lessonSelect.addEventListener("change", () => {
    state.lesson = els.lessonSelect.value;
    startQuiz();
  });
  els.modeSelect.addEventListener("change", () => {
    state.mode = els.modeSelect.value;
    startQuiz();
  });
  els.restartBtn.addEventListener("click", startQuiz);
  if (els.checkBtn) els.checkBtn.addEventListener("click", checkAnswer);
  els.nextBtn.addEventListener("click", nextQuestion);
  els.audioBtn.addEventListener("click", () => speakJapanese(state.current.kana));
  els.toggleStudy.addEventListener("click", () => els.studyList.classList.toggle("hidden"));

  document.addEventListener("keydown", event => {
    if (event.key >= "1" && event.key <= "4" && !state.locked) {
      const card = document.querySelectorAll(".option-card")[Number(event.key) - 1];
      if (card) {
        selectOption(card.dataset.value);
        checkAnswer();
      }
    }
    if (event.key === "Enter" && !els.nextBtn.classList.contains("hidden")) {
      nextQuestion();
    }
    if (event.key.toLowerCase() === "a" && state.current) speakJapanese(state.current.kana);
  });

  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }
}

populateLessons();
bindEvents();
startQuiz();
