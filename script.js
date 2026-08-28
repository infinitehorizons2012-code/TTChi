// Pure JavaScript Educational Engine for HSK 1 Lesson 1 (Vocab Learning Module & Start Button Timer)

let timerInterval = null;
let timerSeconds = 0;
let currentBankSetIndex = 0;
let currentWriter = null;
let isTestStarted = false;

// 1. Vocabulary Database for HSK 1 Lesson 1 (11 Nòng cốt từ vựng & Chiết Tự)
const vocabDatabase = [
  {
    hz: "你",
    py: "nǐ",
    vi: "Bạn, cậu, anh, chị (ngôi thứ 2 số ít)",
    etymology: "Bộ Nhân đứng (亻: người) + Chữ Nhĩ (尔: đối diện). ⟶ Người đứng đối diện nói chuyện chính là 'Bạn/Cậu'.",
    example: "你好！ (nǐ hǎo!) - Chào bạn!",
    singleChar: "你"
  },
  {
    hz: "您",
    py: "nín",
    vi: "Ngài, ông, bà, cô, thầy (kính ngữ tôn trọng)",
    etymology: "Chữ 你 (bạn) ở trên + Bộ Tâm (心: trái tim) ở dưới. ⟶ Đặt người đối diện ở trong tim để thể hiện lòng kính trọng.",
    example: "王老师，您好！ (Wáng lǎoshī, nín hǎo!) - Chào Giáo sư Wang!",
    singleChar: "您"
  },
  {
    hz: "你们",
    py: "nǐmen",
    vi: "Các bạn, các anh, các chị (ngôi thứ 2 số nhiều)",
    etymology: "Chữ 你 (bạn) + Chữ 们 (hậu tố số nhiều: Bộ Nhân 亻 + chữ 门). ⟶ Nhiều người bạn gộp lại = Các bạn.",
    example: "你们好！ (Nǐmen hǎo!) - Chào các bạn!",
    singleChar: "你"
  },
  {
    hz: "王老师",
    py: "Wáng lǎoshī",
    vi: "Giáo sư Wang / Thầy Wang / Cô Wang",
    etymology: "Chữ 王 (Họ Vương/Vua: 3 nét ngang nối nét dọc) + 老师 (Thầy cô giáo). ⟶ Chức danh tôn xưng thầy cô giáo.",
    example: "谢谢您，王老师！ - Cảm ơn Giáo sư Wang!",
    singleChar: "王"
  },
  {
    hz: "学生",
    py: "xuéshēng",
    vi: "Học sinh, sinh viên",
    etymology: "Chữ 学 (Học: mái trường) + Chữ 生 (Sinh: mầm cây sinh trưởng). ⟶ Mầm cây nhỏ sinh trưởng dưới mái trường = Học sinh.",
    example: "我是学生。 - Tôi là học sinh.",
    singleChar: "学"
  },
  {
    hz: "同学",
    py: "tóngxué",
    vi: "Bạn học, bạn cùng lớp",
    etymology: "Chữ 同 (Cùng nhau: Bộ Đồng) + Chữ 学 (Học). ⟶ Những người học cùng một lớp với nhau = Bạn học.",
    example: "同学们好！ (Tóngxuémen hǎo!) - Chào các em học sinh!",
    singleChar: "同"
  },
  {
    hz: "大家",
    py: "dàjiā",
    vi: "Mọi người, tất cả mọi người",
    etymology: "Chữ 大 (To lớn: người dang tay) + Chữ 家 (Mái nhà/Gia đình: mái nhà 宀 che chở). ⟶ Mọi người trong một mái nhà lớn.",
    example: "大家好！ (Dàjiā hǎo!) - Chào mọi người!",
    singleChar: "大"
  },
  {
    hz: "好",
    py: "hǎo",
    vi: "Tốt, đẹp, hay, khỏe",
    etymology: "Bộ Nữ (女: người mẹ/con gái) + Bộ Tử (子: đứa con). ⟶ Người mẹ bế đứa con nhỏ trên tay là hình ảnh tốt đẹp nhất.",
    example: "你好！ (nǐ hǎo!) - Chào bạn!",
    singleChar: "好"
  },
  {
    hz: "谢谢",
    py: "xièxie",
    vi: "Cảm ơn",
    etymology: "Bộ Ngôn (讠: lời nói) + Chữ Thân (身: thân thể) + Bộ Thốn (寸: lễ độ). ⟶ Cúi mình thốt ra lời nói có lễ độ = Cảm ơn.",
    example: "谢谢大家！ (Xièxie dàjiā!) - Cảm ơn mọi người!",
    singleChar: "谢"
  },
  {
    hz: "不客气",
    py: "bú kèqi",
    vi: "Không có gì, đừng khách khí (đáp lại lời cảm ơn)",
    etymology: "Chữ 不 (Khống/Không) + 客 (Khách: mái nhà 宀 + chữ 各) + 气 (Khí/Khí chất). ⟶ Đừng coi nhau là khách sáo.",
    example: "谢谢你！ ⟶ 不客气！ - Cảm ơn! ⟶ Không có gì!",
    singleChar: "客"
  },
  {
    hz: "再见",
    py: "zàijiàn",
    vi: "Tạm biệt, hẹn gặp lại",
    etymology: "Chữ 再 (Lần nữa/Lặp lại: giàn hoa) + Chữ 见 (Thấy/Gặp: mắt 目 + chân 儿 đi). ⟶ Đi bằng chân gặp lại bằng mắt = Hẹn gặp lại!",
    example: "再见！ (Zàijiàn!) - Tạm biệt!",
    singleChar: "见"
  }
];

// 2. Full Question Bank Database (3 Complete Sets of 4-Skill Questions)
const testBankSets = [
  // --- BỘ ĐỀ 1 (SET A) ---
  {
    setName: "Bộ Đề Biến Thể 1",
    questions: [
      {
        id: 1,
        skill: "Nghe (Listening)",
        badgeClass: "badge-cyan",
        prompt: "🔊 <strong>Câu 1 (Nghe):</strong> Bấm nghe âm thanh và chọn cụm từ có chứa <strong>Biến điệu chữ 不 (bú kèqi)</strong>:",
        audioText: "不客气",
        options: [
          { val: "A", text: "A. bù kèqi (giữ nguyên thanh 4 bù)" },
          { val: "B", text: "B. bú kèqi (chữ 不 biến thành thanh 2 bú)" }
        ],
        correct: "B",
        causeType: "Distractor Trap (Bẫy nhầm biến điệu chữ 不)",
        action: "Ghi nhớ quy tắc: Chữ 不 (bù) mang thanh 4 gốc. Khi đứng trước một âm tiết mang thanh 4 (như chữ 客 kè trong 客气), 不 bắt buộc phải biến điệu đọc thành thanh 2 (bú kèqi).",
        rule: "不 (bù) + Thanh 4 ⟶ bú + Thanh 4",
        transferQuizzes: [
          {
            title: "Biến thể 1.1: Chọn âm biến điệu đúng khi Học sinh 2 đáp lời 'Cảm ơn':",
            options: ["A. bù kèqi", "B. bú kèqi"],
            correctIdx: 1,
            explain: "Chính xác! Học sinh 1: 谢谢你！ ⟶ Học sinh 2: 不客气！ (bú kèqi - biến điệu thanh 2 bú)."
          }
        ]
      },
      {
        id: 2,
        skill: "Nói (Speaking Etiquette)",
        badgeClass: "badge-purple",
        prompt: "🎙️ <strong>Câu 2 (Nói):</strong> Trong ngày khai trường, để thể hiện thái độ tôn trọng khi chào Giáo sư Wang (王老师), em nên thốt ra câu nào?",
        audioText: null,
        options: [
          { val: "A", text: "A. 王老师，你好！ (Wáng lǎoshī, nǐ hǎo!)" },
          { val: "B", text: "B. 王老师，您好！ (Wáng lǎoshī, nín hǎo!)" },
          { val: "C", text: "C. 王老师，你们好！ (Wáng lǎoshī, nǐmen hǎo!)" }
        ],
        correct: "B",
        causeType: "Grammar & Honorific Deficit (Gãy kính ngữ 您)",
        action: "Phân biệt đối tượng: Dùng kính ngữ 您 (nín) khi chào người bề trên/Giáo sư Wang; Dùng 你 (nǐ) cho AI Xiaoyu hoặc bạn học.",
        rule: "Bề trên (王老师) + 您好 (nín hǎo)",
        transferQuizzes: [
          {
            title: "Biến thể 2.1: Chọn câu chào thể hiện thái độ tôn kính nhất với Giáo sư Wang:",
            options: ["A. 王老师，你好！", "B. 王老师，您好！"],
            correctIdx: 1,
            explain: "Chính xác! Dùng kính ngữ 您 (nín) cho Giáo sư Wang (王老师，您好！)."
          }
        ]
      },
      {
        id: 3,
        skill: "Đọc (Reading Etiquette & Vocabulary Gap)",
        badgeClass: "badge-amber",
        prompt: "📖 <strong>Câu 3 (Đọc):</strong> Đọc hội thoại sau và điền từ thích hợp vào chỗ trống: <br><code>Học sinh 1: 谢谢你！ (Xièxie nǐ!) ⟶ Học sinh 2: _____！</code>",
        audioText: null,
        options: [
          { val: "A", text: "A. 再见！ (Zàijiàn!)" },
          { val: "B", text: "B. 不客气！ (Bú kèqi!)" },
          { val: "C", text: "C. 您好！ (Nín hǎo!)" }
        ],
        correct: "B",
        causeType: "Vocabulary Gap (Lỗ hổng từ vựng đáp lời phản xạ)",
        action: "Học cặp câu phản xạ chuẩn: Khi người khác cảm ơn '谢谢你！' (Xièxie nǐ!), câu đáp lại lịch sự bắt buộc là '不客气！' (Bú kèqi!).",
        rule: "谢谢！ ⟶ Đáp lại: 不客气！",
        transferQuizzes: [
          {
            title: "Biến thể 3.1: Học sinh 2 đáp lại lời cảm ơn của Học sinh 1 '谢谢大家！':",
            options: ["A. 再见！", "B. 不客气！"],
            correctIdx: 1,
            explain: "Chính xác! Học sinh 1: 谢谢大家！ ⟶ Học sinh 2 đáp lại: 不客气！ (Bú kèqi!)."
          }
        ]
      },
      {
        id: 4,
        skill: "Viết (Writing Word Order)",
        badgeClass: "badge-emerald",
        prompt: "✍️ <strong>Câu 4 (Viết):</strong> Sắp xếp các khối từ sau thành câu chào tập thể các bạn học sinh đúng trật tự:",
        audioText: null,
        options: [
          { val: "A", text: "A. 同学们 (1) + 好 (2) ⟶ 同学们好！" },
          { val: "B", text: "B. 好 (2) + 同学们 (1) ⟶ 好同学们！" }
        ],
        correct: "A",
        causeType: "Time Constraint & Word Order (Trật tự từ & Phản xạ tốc độ)",
        action: "Quy tắc trật tự từ tiếng Trung: Danh từ chỉ tập thể (同学们 / 大家 / 你们) phải đứng TRƯỚC từ '好'.",
        rule: "[Tập thể: 同学们 / 大家 / 你们] + 好",
        transferQuizzes: [
          {
            title: "Biến thể 4.1: Chọn trật tự từ đúng để chào toàn thể mọi người (dùng từ 大家):",
            options: ["A. 大家好！ (Dàjiā hǎo!)", "B. 好大家！ (Hǎo dàjiā!)"],
            correctIdx: 0,
            explain: "Chính xác! 大家好！ (Dàjiā hǎo!)."
          }
        ]
      }
    ]
  },

  // --- BỘ ĐỀ 2 (SET B) ---
  {
    setName: "Bộ Đề Biến Thể 2",
    questions: [
      {
        id: 1,
        skill: "Nghe (Listening)",
        badgeClass: "badge-cyan",
        prompt: "🔊 <strong>Câu 1 (Nghe):</strong> Bấm nghe âm thanh và chọn âm biến điệu 3+3 đúng cho từ <strong>你好 (ní hǎo)</strong>:",
        audioText: "你好",
        options: [
          { val: "A", text: "A. nǐ hǎo (giữ nguyên hai thanh 3)" },
          { val: "B", text: "B. ní hǎo (thanh 3 thứ nhất biến thành thanh 2 ní)" }
        ],
        correct: "B",
        causeType: "Distractor Trap (Bẫy biến điệu thanh điệu 3+3)",
        action: "Quy tắc biến điệu 3+3: Khi 2 thanh 3 đứng liền nhau, thanh 3 đầu tiên biến thành thanh 2 (ní hǎo).",
        rule: "Thanh 3 + Thanh 3 ⟶ Thanh 2 + Thanh 3",
        transferQuizzes: [
          {
            title: "Biến thể 1.1: Chọn cách đọc đúng của chữ 你 khi ghép với 好:",
            options: ["A. nǐ hǎo", "B. ní hǎo"],
            correctIdx: 1,
            explain: "Chính xác! nǐ + hǎo đọc biến điệu thành ní hǎo."
          }
        ]
      },
      {
        id: 2,
        skill: "Nói (Speaking Etiquette)",
        badgeClass: "badge-purple",
        prompt: "🎙️ <strong>Câu 2 (Nói):</strong> Để chào Trợ lý AI Tiểu Ngữ (小语) hoặc bạn học cùng lứa tuổi, em dùng câu nào đúng nhất?",
        audioText: null,
        options: [
          { val: "A", text: "A. 小语，你好！ (Xiǎoyǔ, nǐ hǎo!)" },
          { val: "B", text: "B. 小语，您好！ (Xiǎoyǔ, nín hǎo!)" }
        ],
        correct: "A",
        causeType: "Grammar & Honorific Deficit (Phân biệt 你 vs 您)",
        action: "Quy tắc xưng hô: Dùng 你 (nǐ) cho AI Xiaoyu, bạn bè cùng lứa tuổi; Chỉ dùng 您 (nín) cho người bề trên.",
        rule: "Bạn bè / AI ⟶ 你好 (nǐ hǎo)",
        transferQuizzes: [
          {
            title: "Biến thể 2.1: Chào bạn học sinh mới gặp lần đầu:",
            options: ["A. 你好！", "B. 您好！"],
            correctIdx: 0,
            explain: "Chính xác! Bạn học dùng 你好！ (nǐ hǎo!)."
          }
        ]
      },
      {
        id: 3,
        skill: "Đọc (Reading Etiquette)",
        badgeClass: "badge-amber",
        prompt: "📖 <strong>Câu 3 (Đọc):</strong> Đọc hội thoại sau và chọn từ điền vào chỗ trống: <br><code>Học sinh 1: 谢谢大家！ (Xièxie dàjiā!) ⟶ Học sinh 2: _____！</code>",
        audioText: null,
        options: [
          { val: "A", text: "A. 不客气！ (Bú kèqi!)" },
          { val: "B", text: "B. 再见！ (Zàijiàn!)" }
        ],
        correct: "A",
        causeType: "Vocabulary Gap (Lỗ hổng từ vựng đáp lời)",
        action: "Học cặp câu phản xạ: 谢谢大家！ ⟶ Đáp lại lịch sự: 不客气！",
        rule: "Cảm ơn (谢谢) ⟶ Đáp lại (不客气)",
        transferQuizzes: [
          {
            title: "Biến thể 3.1: Đáp lại lời cảm ơn 谢谢你们！:",
            options: ["A. 不客气！", "B. 你好！"],
            correctIdx: 0,
            explain: "Chính xác! Đáp lại 谢谢 là 不客气！."
          }
        ]
      },
      {
        id: 4,
        skill: "Viết (Writing Word Order)",
        badgeClass: "badge-emerald",
        prompt: "✍️ <strong>Câu 4 (Viết):</strong> Chọn trật tự từ đúng để chào toàn thể mọi người (dùng từ 大家):",
        audioText: null,
        options: [
          { val: "A", text: "A. 大家好！ (Dàjiā hǎo!)" },
          { val: "B", text: "B. 好大家！ (Hǎo dàjiā!)" }
        ],
        correct: "A",
        causeType: "Time Constraint & Word Order (Trật tự từ chào tập thể)",
        action: "Trật tự từ tiếng Trung: Danh từ tập thể 大家 đứng trước từ 好 ⟶ 大家好！",
        rule: "大家 + 好 ⟶ 大家好！",
        transferQuizzes: [
          {
            title: "Biến thể 4.1: Chọn trật tự chào các bạn (你们):",
            options: ["A. 你们好！", "B. 好你们！"],
            correctIdx: 0,
            explain: "Chính xác! 你们好！ (Nǐmen hǎo!)."
          }
        ]
      }
    ]
  },

  // --- BỘ ĐỀ 3 (SET C) ---
  {
    setName: "Bộ Đề Biến Thể 3",
    questions: [
      {
        id: 1,
        skill: "Nghe (Listening)",
        badgeClass: "badge-cyan",
        prompt: "🔊 <strong>Câu 1 (Nghe):</strong> Bấm nghe âm thanh và xác định biến điệu của chữ 不 khi đáp lời cảm ơn <strong>不客气 (bú kèqi)</strong>:",
        audioText: "不客气",
        options: [
          { val: "A", text: "A. bù kèqi (đọc thanh 4 bù)" },
          { val: "B", text: "B. bú kèqi (đọc biến điệu thanh 2 bú)" }
        ],
        correct: "B",
        causeType: "Distractor Trap (Bẫy biến điệu chữ 不 trước 客 kè)",
        action: "Chữ 客 (kè) mang thanh 4 ⟶ Chữ 不 (bù) phải biến điệu đọc thành bú (bú kèqi).",
        rule: "不 (bù) + 客 (kè) ⟶ bú kèqi",
        transferQuizzes: [
          {
            title: "Biến thể 1.1: Âm đọc đúng của chữ 不 trong 不客气:",
            options: ["A. bù", "B. bú"],
            correctIdx: 1,
            explain: "Chính xác! bú kèqi."
          }
        ]
      },
      {
        id: 2,
        skill: "Nói (Speaking Etiquette)",
        badgeClass: "badge-purple",
        prompt: "🎙️ <strong>Câu 2 (Nói):</strong> Khi tan học, để chào tạm biệt Giáo sư Wang (王老师), em thốt ra câu nào đúng chuẩn?",
        audioText: null,
        options: [
          { val: "A", text: "A. 王老师，再见！ (Wáng lǎoshī, zàijiàn!)" },
          { val: "B", text: "B. 王老师，你好！ (Wáng lǎoshī, nǐ hǎo!)" }
        ],
        correct: "A",
        causeType: "Grammar Deficit (Chức năng chào tạm biệt)",
        action: "Tạm biệt bề trên: Tên/Chức danh + 再见 ⟶ 王老师，再见！",
        rule: "Chức danh (王老师) + 再见 (zàijiàn)",
        transferQuizzes: [
          {
            title: "Biến thể 2.1: Tạm biệt trợ lý AI Xiaoyu:",
            options: ["A. 再见！", "B. 您好！"],
            correctIdx: 0,
            explain: "Chính xác! 再见！ (Zàijiàn!)."
          }
        ]
      },
      {
        id: 3,
        skill: "Đọc (Reading Etiquette)",
        badgeClass: "badge-amber",
        prompt: "📖 <strong>Câu 3 (Đọc):</strong> Đọc hội thoại sau và điền từ thích hợp: <br><code>Học sinh 1: 谢谢大家！ (Xièxie dàjiā!) ⟶ Học sinh 2: _____！</code>",
        audioText: null,
        options: [
          { val: "A", text: "A. 不客气！ (Bú kèqi!)" },
          { val: "B", text: "B. 再见！ (Zàijiàn!)" }
        ],
        correct: "A",
        causeType: "Vocabulary Gap (Lỗ hổng từ vựng phản xạ xưng hô)",
        action: "Khi ai đó cảm ơn '谢谢大家！', câu đáp lại chuẩn mực là '不客气！'.",
        rule: "谢谢大家！ ⟶ Đáp lại: 不客气！",
        transferQuizzes: [
          {
            title: "Biến thể 3.1: Đáp lại lời chào 王老师，您好！:",
            options: ["A. 你好！", "B. 谢谢！"],
            correctIdx: 0,
            explain: "Chính xác! Giáo sư Wang sẽ chào đáp lại: 你好！."
          }
        ]
      },
      {
        id: 4,
        skill: "Viết (Writing Word Order)",
        badgeClass: "badge-emerald",
        prompt: "✍️ <strong>Câu 4 (Viết):</strong> Sắp xếp cụm từ cảm ơn Giáo sư Wang thể hiện thái độ tôn kính nhất:",
        audioText: null,
        options: [
          { val: "A", text: "A. 谢谢您，王老师！ (Xièxie nín, Wáng lǎoshī!)" },
          { val: "B", text: "B. 王老师，谢谢你！ (Wáng lǎoshī, xièxie nǐ!)" }
        ],
        correct: "A",
        causeType: "Time Constraint & Word Order (Kính ngữ 您 + Cụm cảm ơn)",
        action: "Cảm ơn người bề trên tôn kính: Dùng kính ngữ 您 (Xièxie nín, Wáng lǎoshī!).",
        rule: "谢谢 + 您 + Chức danh",
        transferQuizzes: [
          {
            title: "Biến thể 4.1: Cảm ơn tập thể các bạn học:",
            options: ["A. 谢谢大家！", "B. 大家谢谢！"],
            correctIdx: 0,
            explain: "Chính xác! 谢谢大家！ (Xièxie dàjiā!)."
          }
        ]
      }
    ]
  }
];

// 3. Render 11 Vocabulary Selector Grid
function renderVocabGridList() {
  const container = document.getElementById('vocab-words-grid');
  if (!container) return;

  let html = '';
  vocabDatabase.forEach((item, index) => {
    html += `
      <div class="vocab-word-item ${index === 0 ? 'active' : ''}" onclick="selectVocabWord(${index}, this)">
        <div>
          <span class="vw-hz">${item.hz}</span>
          <span class="vw-py">(${item.py})</span>
        </div>
        <span class="vw-vi">${item.vi}</span>
      </div>
    `;
  });

  container.innerHTML = html;
  selectVocabWord(0);
}

// 4. Select & Render Active Vocab Learning Card (Nghe - Viết - Chiết Tự)
function selectVocabWord(index, el) {
  if (el) {
    document.querySelectorAll('.vocab-word-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
  }

  const item = vocabDatabase[index];
  if (!item) return;

  const placeholder = document.getElementById('vocab-detail-placeholder');
  const contentBox = document.getElementById('vocab-detail-content');

  if (placeholder) placeholder.style.display = 'none';
  if (contentBox) {
    contentBox.style.display = 'block';

    contentBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px;">
        <div>
          <h2 style="font-size: 2.2rem; font-family: 'Noto Sans SC', sans-serif; color: #0f172a; margin-bottom: 2px;">
            ${item.hz} <span style="font-size: 1.3rem; color: #6366f1; font-family: 'Plus Jakarta Sans', sans-serif;">(${item.py})</span>
          </h2>
          <p style="font-size: 1.1rem; color: #059669; font-weight: 700; margin-bottom: 0.8rem;">
            💡 Nghĩa: ${item.vi}
          </p>
          <p style="font-size: 0.95rem; color: #334155; background: #f1f5f9; padding: 6px 12px; border-radius: 10px; display: inline-block;">
            📌 Ví dụ: <strong>${item.example}</strong>
          </p>
        </div>

        <button type="button" class="btn-daily-action" style="background: #0284c7;" onclick="speakText('${item.hz}')">
          <i class="fa-solid fa-volume-high"></i> 🔊 Nghe Đọc Từ '${item.hz}'
        </button>
      </div>

      <!-- HANZI WRITER & ETYMOLOGY BOX -->
      <div style="margin-top: 1.5rem; display: grid; grid-template-columns: 180px 1fr; gap: 1.5rem; align-items: flex-start;">
        <div>
          <div id="hanzi-writer-target" class="hanzi-writer-box"></div>
          <button type="button" class="calib-btn" style="width: 100%; margin-top: 8px; font-size: 0.85rem;" onclick="animateActiveHanzi()">
            <i class="fa-solid fa-pen-nib"></i> Xem Nét Viết
          </button>
        </div>

        <div class="etym-box">
          <div class="etym-header">
            <i class="fa-solid fa-puzzle-piece"></i> 🧩 CHIẾT TỰ & MẸO GHI NHỚ (Etymology):
          </div>
          <div class="etym-body">
            ${item.etymology}
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      renderHanziAnimation(item.singleChar);
    }, 50);
  }
}

function renderHanziAnimation(char) {
  const target = document.getElementById('hanzi-writer-target');
  if (!target) return;
  target.innerHTML = '';

  if (typeof HanziWriter !== 'undefined') {
    try {
      currentWriter = HanziWriter.create('hanzi-writer-target', char, {
        width: 150,
        height: 150,
        padding: 5,
        strokeColor: '#4338ca',
        radialColor: '#f43f5e',
        showOutline: true
      });
      currentWriter.animateCharacter();
    } catch (e) {
      target.innerHTML = `<span style="font-size: 4rem; font-family: 'Noto Sans SC'; color: #4338ca;">${char}</span>`;
    }
  } else {
    target.innerHTML = `<span style="font-size: 4rem; font-family: 'Noto Sans SC'; color: #4338ca;">${char}</span>`;
  }
}

function animateActiveHanzi() {
  if (currentWriter) {
    currentWriter.animateCharacter();
  }
}

// 5. Subtab Switcher for Vocab Module
function switchVocabSubtab(subtabId, el) {
  const subtabs = document.querySelectorAll('.vocab-subtab-content');
  subtabs.forEach(s => s.style.display = 'none');

  const btns = document.querySelectorAll('.vocab-subtab-btn');
  btns.forEach(b => b.classList.remove('active'));

  const target = document.getElementById(subtabId);
  if (target) target.style.display = 'block';
  if (el) el.classList.add('active');

  if (subtabId === 'vocab-quiz-subtab') {
    renderVocabQuiz();
  }
}

// 6. Interactive Vocab Matching Quiz
function renderVocabQuiz() {
  const container = document.getElementById('vocab-quiz-container');
  if (!container) return;

  let html = `<div style="display: flex; flex-direction: column; gap: 12px;">`;
  vocabDatabase.slice(0, 5).forEach((item, idx) => {
    html += `
      <div class="sentence-item-row">
        <div class="sentence-main">
          <strong class="hz-large" style="min-width: 80px;">${item.hz}</strong>
          <button type="button" class="audio-btn-inline" onclick="speakText('${item.hz}')">
            <i class="fa-solid fa-volume-high"></i> Nghe
          </button>
        </div>

        <div style="display: flex; gap: 10px; align-items: center;">
          <select id="vquiz_${idx}" style="padding: 8px 12px; border-radius: 10px; border: 1px solid #cbd5e1; font-weight: 700; font-size: 0.95rem;">
            <option value="">-- Chọn nghĩa đúng --</option>
            <option value="${item.py}">${item.py} - ${item.vi}</option>
            <option value="wrong1">nǐmen - Các bạn</option>
            <option value="wrong2">zàijiàn - Tạm biệt</option>
          </select>
          <button type="button" class="calib-btn" onclick="checkVocabQuizItem(${idx}, '${item.py}', this)">Kiểm tra</button>
        </div>
      </div>
    `;
  });
  html += `</div>`;

  container.innerHTML = html;
}

function checkVocabQuizItem(idx, correctPy, btnEl) {
  const sel = document.getElementById(`vquiz_${idx}`);
  if (!sel) return;
  if (sel.value === correctPy) {
    btnEl.style.background = '#d1fae5';
    btnEl.style.color = '#047857';
    btnEl.innerText = "🎉 Chính xác!";
  } else {
    btnEl.style.background = '#fee2e2';
    btnEl.style.color = '#dc2626';
    btnEl.innerText = "❌ Chọn lại!";
  }
}

// 7. Render Active Test Question Set to DOM
function renderCurrentTestSet() {
  const container = document.getElementById('test-questions-container');
  const badgeEl = document.getElementById('bank-set-badge');

  const currentSet = testBankSets[currentBankSetIndex];
  if (!currentSet || !container) return;

  if (badgeEl) {
    badgeEl.innerText = `(Đang làm: ${currentSet.setName} / ${testBankSets.length})`;
  }

  let html = '';
  currentSet.questions.forEach((q, idx) => {
    const qNum = idx + 1;
    const audioBtn = q.audioText ? `<button type="button" class="audio-btn-inline" onclick="speakText('${q.audioText}')"><i class="fa-solid fa-volume-high"></i> Nghe âm mẫu</button>` : '';

    html += `
      <div class="test-item-card">
        <div class="test-header">
          <span class="badge ${q.badgeClass}">${qNum}. Kỹ Năng ${q.skill}</span>
          <div class="calib-btn-group">
            <button type="button" class="calib-btn" onclick="setQuestionCalib(${qNum}, 'V', this)">[V] Chắc chắn</button>
            <button type="button" class="calib-btn active-amber" onclick="setQuestionCalib(${qNum}, '?', this)">[?] Phân vân</button>
            <button type="button" class="calib-btn" onclick="setQuestionCalib(${qNum}, 'X', this)">[X] Đoán mò</button>
          </div>
        </div>
        <p class="test-question">
          ${q.prompt} ${audioBtn}
        </p>
        <div class="options-grid">
          ${q.options.map(opt => `
            <label class="opt-label">
              <input type="radio" name="js_q${qNum}" value="${opt.val}"> ${opt.text}
            </label>
          `).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 8. Start Test Action (Triggers Timer and Reveals Questions)
function startTestNow() {
  isTestStarted = true;
  const overlay = document.getElementById('test-start-overlay');
  const questionsBox = document.getElementById('test-questions-container');
  const submitBtn = document.getElementById('btn-submit-eval');
  const statusSub = document.getElementById('timer-status-sub');

  if (overlay) overlay.style.display = 'none';
  if (questionsBox) questionsBox.style.display = 'block';
  if (submitBtn) submitBtn.style.display = 'flex';
  if (statusSub) statusSub.innerText = '(Bẫy tốc độ > 8s)';

  startTestTimer();
}

// 9. Tab Switcher & Timer Manager
function switchPageTab(tabId, el) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(t => {
    t.classList.remove('active');
    t.style.display = 'none';
  });

  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(b => b.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.style.display = 'block';
    targetTab.classList.add('active');
  }

  if (el) el.classList.add('active');

  if (tabId === 'test-tab') {
    if (!isTestStarted) {
      const overlay = document.getElementById('test-start-overlay');
      const questionsBox = document.getElementById('test-questions-container');
      const submitBtn = document.getElementById('btn-submit-eval');
      const statusSub = document.getElementById('timer-status-sub');

      if (overlay) overlay.style.display = 'block';
      if (questionsBox) questionsBox.style.display = 'none';
      if (submitBtn) submitBtn.style.display = 'none';
      if (statusSub) statusSub.innerText = '(Chưa bấm Bắt Đầu)';
      
      stopTestTimer();
      timerSeconds = 0;
      const countEl = document.getElementById('timer-sec-count');
      if (countEl) countEl.innerText = '0';
    }
  } else {
    stopTestTimer();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startTestTimer() {
  stopTestTimer();
  timerSeconds = 0;
  const countEl = document.getElementById('timer-sec-count');
  if (countEl) countEl.innerText = '0';

  timerInterval = setInterval(() => {
    timerSeconds++;
    if (countEl) countEl.innerText = timerSeconds;
  }, 1000);
}

function stopTestTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// 10. Web Speech API
function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API.');
  }
}

// 11. Calibration State Manager ([V], [?], [X])
const jsCalibData = { 1: '?', 2: '?', 3: '?', 4: '?' };

function setQuestionCalib(qNum, state, btnEl) {
  jsCalibData[qNum] = state;
  const parent = btnEl.parentElement;
  if (!parent) return;

  const btns = parent.querySelectorAll('.calib-btn');
  btns.forEach(b => {
    b.classList.remove('active-emerald', 'active-amber', 'active-red');
  });

  if (state === 'V') btnEl.classList.add('active-emerald');
  else if (state === '?') btnEl.classList.add('active-amber');
  else if (state === 'X') btnEl.classList.add('active-red');
}

// 12. Interactive Option Checker for Transfer Practice Questions
function checkTransferAnswer(qId, quizIdx, selectedOptIdx, correctOptIdx, btnEl, explainText) {
  const container = btnEl.parentElement;
  if (!container) return;

  const buttons = container.querySelectorAll('.transfer-opt-btn');
  buttons.forEach(b => b.classList.remove('correct-selected', 'wrong-selected'));

  if (selectedOptIdx === correctOptIdx) {
    btnEl.classList.add('correct-selected');
    let fb = container.nextElementSibling;
    if (!fb || !fb.classList.contains('transfer-fb')) {
      fb = document.createElement('div');
      fb.className = 'transfer-fb';
      fb.style.cssText = "margin-top: 6px; padding: 8px 12px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; border-radius: 8px; font-size: 0.88rem; font-weight: 700;";
      container.after(fb);
    }
    fb.innerHTML = `🎉 ĐÚNG RỒI! ${explainText}`;
  } else {
    btnEl.classList.add('wrong-selected');
    let fb = container.nextElementSibling;
    if (!fb || !fb.classList.contains('transfer-fb')) {
      fb = document.createElement('div');
      fb.className = 'transfer-fb';
      fb.style.cssText = "margin-top: 6px; padding: 8px 12px; background: #fef2f2; border: 1px solid #fca5a5; color: #b91c1c; border-radius: 8px; font-size: 0.88rem; font-weight: 700;";
      container.after(fb);
    }
    fb.innerHTML = `❌ Thử lại nhé! Gợi ý: Kiểm tra lại quy tắc biến điệu / kính ngữ.`;
  }
}

// 13. Evaluator Execution Function (Evaluates current active set)
function runPureJSEvaluator() {
  stopTestTimer();

  const currentSet = testBankSets[currentBankSetIndex];
  const q1Ans = document.querySelector('input[name="js_q1"]:checked')?.value;
  const q2Ans = document.querySelector('input[name="js_q2"]:checked')?.value;
  const q3Ans = document.querySelector('input[name="js_q3"]:checked')?.value;
  const q4Ans = document.querySelector('input[name="js_q4"]:checked')?.value;

  const userAnswers = { 1: q1Ans, 2: q2Ans, 3: q3Ans, 4: q4Ans };
  let errorLogCardsHTML = '';
  let transferPracticeHTML = '';
  let correctCount = 0;
  let errorCount = 0;
  let missedQuestionsList = [];

  const isTimeConstrained = timerSeconds > 32;

  currentSet.questions.forEach((meta, idx) => {
    const qNum = idx + 1;
    const userChoice = userAnswers[qNum];
    const calib = jsCalibData[qNum] || '?';
    const isCorrectChoice = userChoice === meta.correct;
    const isCalibV = calib === 'V';
    
    const needsRemediation = !isCorrectChoice || !isCalibV || isTimeConstrained;

    if (!needsRemediation) {
      correctCount++;
    } else {
      errorCount++;
      missedQuestionsList.push(qNum);

      let statusText = "";
      if (!isCorrectChoice) statusText = "LÀM SAI ĐÁP ÁN";
      else if (!isCalibV) statusText = `ĐOÁN TRÚNG (Calibration [${calib}])`;
      else if (isTimeConstrained) statusText = `PHẢN XẠ CHẬM (Time Constraint ${timerSeconds}s > 32s)`;

      let causeDisplay = meta.causeType;
      if (isTimeConstrained && isCorrectChoice) {
        causeDisplay = "Time Constraint (Áp lực tốc độ: Làm đúng nhưng mất quá 8s/câu)";
      }
      
      errorLogCardsHTML += `
        <div style="background: #fffbeb; border-left: 5px solid #d97706; padding: 1.2rem; border-radius: 16px; margin-bottom: 1.2rem; border: 1px solid #fde68a;">
          <h4 style="color: #b45309; font-size: 1.1rem; margin-bottom: 0.5rem;">
            ❌ Câu ${qNum} [${meta.skill}] - Trạng Thái: <span style="color: #dc2626;">${statusText}</span>
          </h4>
          <p style="font-size: 0.95rem; color: #0f172a; margin-bottom: 0.4rem;">
            • <strong>Root Cause (Nguyên nhân gốc rễ):</strong> ${causeDisplay}
          </p>
          <p style="font-size: 0.95rem; color: #334155; margin-bottom: 0.4rem;">
            • <strong>Hành động xử lý triệt để:</strong> ${meta.action}
          </p>
          <p style="font-size: 0.95rem; color: #0284c7; margin-bottom: 0.6rem;">
            • <strong>Quy tắc phân biệt cốt lõi:</strong> <code>${meta.rule}</code>
          </p>
        </div>
      `;

      meta.transferQuizzes.forEach((tz, quizIdx) => {
        transferPracticeHTML += `
          <div class="transfer-quiz-card">
            <div class="transfer-quiz-title">
              <i class="fa-solid fa-pen-clip"></i> BÀI TẬP BIẾN THỂ TƯƠNG TÁC ${qNum}.${quizIdx + 1}: ${tz.title}
            </div>
            <div class="transfer-opts">
              ${tz.options.map((optText, optIdx) => `
                <button type="button" class="transfer-opt-btn" onclick="checkTransferAnswer(${qNum}, ${quizIdx}, ${optIdx}, ${tz.correctIdx}, this, '${tz.explain}')">
                  ${optText}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      });
    }
  });

  // Save Spaced Retrieval Schedule
  const todayStr = new Date().toISOString().split('T')[0];
  const storageData = {
    lastTestDate: todayStr,
    missedQuestions: missedQuestionsList
  };
  try {
    localStorage.setItem('hsk1_ubd_spaced_db', JSON.stringify(storageData));
  } catch (e) {}

  const today = new Date();
  const day1 = new Date(today); day1.setDate(today.getDate() + 1);
  const day3 = new Date(today); day3.setDate(today.getDate() + 3);
  const day7 = new Date(today); day7.setDate(today.getDate() + 7);
  const formatDate = (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  let timeWarningNote = isTimeConstrained ? `<p style="color: #dc2626; font-weight: 700; margin-top: 4px;">⏱️ Cảnh báo tốc độ: Tổng thời gian làm bài là ${timerSeconds} giây (> 32s cho 4 câu). Đã kích hoạt bài tập rèn phản xạ tốc độ (Time Constraint)!</p>` : `<p style="color: #047857; font-weight: 700; margin-top: 4px;">⚡ Tốc độ tuyệt vời: Làm xong trong ${timerSeconds} giây (Đạt chuẩn < 8s/câu)!</p>`;

  let summaryHTML = `
    <div style="background: #eef2ff; border: 2px solid #c7d2fe; padding: 1.2rem; border-radius: 16px; margin-bottom: 1.4rem;">
      <h4 style="color: #4338ca; font-size: 1.2rem; margin-bottom: 0.4rem;">
        📊 KẾT QUẢ ĐÁNH GIÁ CẢI THIỆN (${currentSet.setName}):
      </h4>
      <p style="font-size: 1rem; color: #1e293b;">
        • Số câu nòng cốt làm chủ 100% [V]: <strong>${correctCount} / 4 câu</strong><br>
        • Số câu rơi vào lỗ hổng / đoán mò / chậm phản xạ: <strong>${errorCount} / 4 câu</strong> (Đã sinh bài tập biến thể ở dưới)
      </p>

      ${timeWarningNote}

      <div style="margin-top: 0.8rem; background: #ffffff; padding: 0.8rem 1rem; border-radius: 10px; border: 1px solid #a5b4fc;">
        <strong style="color: #6366f1;"><i class="fa-solid fa-calendar-days"></i> Lịch Ôn Tập Hàng Ngày Tự Động (Spaced Retrieval 1-3-7):</strong>
        <p style="font-size: 0.88rem; color: #334155; margin-top: 2px;">
          📅 <strong>Lần 1 (Ngày 1):</strong> ${formatDate(day1)} | 
          📅 <strong>Lần 2 (Ngày 3):</strong> ${formatDate(day3)} | 
          📅 <strong>Lần 3 (Ngày 7):</strong> ${formatDate(day7)}
        </p>
      </div>
    </div>
  `;

  if (errorCount === 0) {
    errorLogCardsHTML = `
      <div style="background: #ecfdf5; border: 2px solid #a7f3d0; padding: 1.5rem; border-radius: 16px; text-align: center;">
        <h3 style="color: #047857; font-size: 1.4rem; margin-bottom: 0.4rem;">🎉 XUẤT SẮC 100%!</h3>
        <p style="color: #065f46; font-size: 1rem;">
          Bé đã trả lời chính xác 100% các câu hỏi của ${currentSet.setName} trong ${timerSeconds}s và tự tin gắn nhãn [V] Chắc chắn 100%. Năng lực đã đạt mức độ làm chủ hoàn toàn!
        </p>
      </div>
    `;
  }

  const box = document.getElementById('js-error-log-box');
  const content = document.getElementById('js-error-log-content');
  const transferArea = document.getElementById('interactive-transfer-questions-area');

  if (box && content) {
    content.innerHTML = summaryHTML + errorLogCardsHTML;
    if (transferArea) {
      transferArea.innerHTML = transferPracticeHTML ? `<h4 style="color: #4338ca; margin-bottom: 1rem;"><i class="fa-solid fa-gamepad"></i> BÀI TẬP BIẾN THỂ TRỰC TIẾP (Thực hành làm bài ngay tại chỗ):</h4>` + transferPracticeHTML : '';
    }
    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth' });
  }
}

// 14. Dynamic Bank Swapper Button Action
function shuffleAndGenerateNewTestSet() {
  currentBankSetIndex = (currentBankSetIndex + 1) % testBankSets.length;
  renderCurrentTestSet();
  startTestNow();

  const logBox = document.getElementById('js-error-log-box');
  if (logBox) logBox.style.display = 'none';

  const testArea = document.getElementById('test-questions-container');
  if (testArea) testArea.scrollIntoView({ behavior: 'smooth' });
}

// 15. Automatic Daily Scheduler via LocalStorage
function checkDailyScheduleOnLoad() {
  try {
    const raw = localStorage.getItem('hsk1_ubd_spaced_db');
    if (!raw) return;
    const db = JSON.parse(raw);
    if (!db || !db.lastTestDate) return;

    const lastDate = new Date(db.lastTestDate);
    const today = new Date();
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1 || diffDays === 3 || diffDays === 7) {
      const banner = document.getElementById('daily-task-banner');
      const bannerDesc = document.getElementById('daily-banner-desc');
      if (banner) {
        if (bannerDesc) {
          bannerDesc.innerText = `Hôm nay là Ngày thứ ${diffDays} sau bài test! Bạn có ${db.missedQuestions.length} nội dung nòng cốt cần ôn tập lại để khắc sâu trí nhớ!`;
        }
        banner.style.display = 'flex';
      }
    }
  } catch (e) {}
}

function startDailyTaskReview() {
  const testTabBtn = document.querySelectorAll('.tab-btn')[2];
  if (testTabBtn) {
    switchPageTab('test-tab', testTabBtn);
    startTestNow();
  }
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  renderVocabGridList();
  renderCurrentTestSet();
  const defaultTabBtn = document.querySelector('.tab-btn');
  if (defaultTabBtn) switchPageTab('theory-tab', defaultTabBtn);
  checkDailyScheduleOnLoad();
});
