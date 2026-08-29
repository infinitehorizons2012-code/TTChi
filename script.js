// Pure JavaScript Educational Engine for HSK 1 Lesson 1 (Multi-Color Hanzi Component Animator & APP_MNEMONIC Etymology Engine)

let timerInterval = null;
let timerSeconds = 0;
let currentBankSetIndex = 0;
let currentWriters = [];
let isTestStarted = false;

// Student Account & Authentication System Data
let activeStudentName = "Vương Nhất Phi";
let activeUsername = "vuongnhatphi";

// Default Seed Account
const defaultAccounts = {
  "vuongnhatphi": {
    fullName: "Vương Nhất Phi",
    username: "vuongnhatphi",
    password: "123",
    rank: "🌱 Học viên chính thức"
  }
};

// 1. HANZI COMPONENT DATABASE (COLOR OVERRIDE STROKES & APP_MNEMONIC)
const hanziComponentDb = {
  '你': {
    char: '你',
    mnemonic: 'Người (亻) đứng đối diện (尔) trò chuyện cùng bạn chính là "Bạn/Cậu" (你).',
    components: [
      { name: 'Bộ Nhân (亻)', color: '#0284c7', strokes: [0, 1] },
      { name: 'Bộ Nhĩ (尔)', color: '#e11d48', strokes: [2, 3, 4, 5, 6] }
    ]
  },
  '您': {
    char: '您',
    mnemonic: 'Đặt người bạn (你) ở trong tim (心) để thể hiện lòng kính trọng tối cao với thầy cô/bề trên ⟶ "Ngài/Thầy/Cô" (您).',
    components: [
      { name: 'Chữ 你 (Bạn)', color: '#0284c7', strokes: [0, 1, 2, 3, 4, 5, 6] },
      { name: 'Bộ Tâm (心)', color: '#e11d48', strokes: [7, 8, 9, 10] }
    ]
  },
  '们': {
    char: '们',
    mnemonic: 'Nhiều người (亻) đứng tụ họp trước cánh cửa (门) ⟶ Hậu tố số nhiều "Các/Những" (们).',
    components: [
      { name: 'Bộ Nhân (亻)', color: '#0284c7', strokes: [0, 1] },
      { name: 'Chữ 门 (Door)', color: '#7e22ce', strokes: [2, 3, 4] }
    ]
  },
  '老': {
    char: '老',
    mnemonic: 'Hình ảnh người cao tuổi chống gậy tay cầm thìa ăn ⟶ "Già/Lão làng/Thầy" (老).',
    components: [
      { name: 'Bộ Lão (耂)', color: '#d97706', strokes: [0, 1, 2, 3] },
      { name: 'Bộ Chủy (匕)', color: '#059669', strokes: [4, 5] }
    ]
  },
  '师': {
    char: '师',
    mnemonic: 'Người dẫn dắt đội quân (𠂤) cầm khăn gấm (巾) truyền dạy trí thức ⟶ "Thầy giáo/Bậc thầy" (师).',
    components: [
      { name: 'Bộ Đôi (𠂤)', color: '#7e22ce', strokes: [0, 1, 2] },
      { name: 'Bộ Cân (巾)', color: '#0284c7', strokes: [3, 4, 5] }
    ]
  },
  '王': {
    char: '王',
    mnemonic: '3 nét ngang chỉ Thiên - Địa - Nhân (Trời - Đất - Người); Nét dọc nối cả 3 thành vị Vua làm chủ ⟶ "Họ Vương/Vua" (王).',
    components: [
      { name: 'Tam Tài (Thiên-Địa-Nhân)', color: '#d97706', strokes: [0, 1, 2] },
      { name: 'Trục Trục Trụ', color: '#dc2626', strokes: [3] }
    ]
  },
  '学': {
    char: '学',
    mnemonic: 'Đứa trẻ (子) tiếp thu các nốt tri thức (𛅦) dưới mái trường (宀) ⟶ "Học tập/Học sinh" (学).',
    components: [
      { name: 'Hạt Tri Thức (𛅦)', color: '#0284c7', strokes: [0, 1, 2] },
      { name: 'Mái Trường (宀)', color: '#d97706', strokes: [3, 4] },
      { name: 'Đứa Trẻ (子)', color: '#059669', strokes: [5, 6, 7] }
    ]
  },
  '生': {
    char: '生',
    mnemonic: 'Mầm cây xanh chồi nhô lên phát triển từ lòng đất (土) ⟶ "Sinh sống/Sinh ra/Học sinh" (生).',
    components: [
      { name: 'Mầm Chồi xanh', color: '#10b981', strokes: [0, 1, 2] },
      { name: 'Bộ Thổ (土)', color: '#b45309', strokes: [3, 4] }
    ]
  },
  '同': {
    char: '同',
    mnemonic: 'Mọi người cùng sống chung dưới khung mái nhà (冂) và phát ra chung lời nói (口) ⟶ "Cùng nhau/Đồng lòng" (同).',
    components: [
      { name: 'Khung Nhà (冂)', color: '#0284c7', strokes: [0, 1] },
      { name: 'Ngang & Khẩu (口)', color: '#7e22ce', strokes: [2, 3, 4, 5] }
    ]
  },
  '大': {
    char: '大',
    mnemonic: 'Hình ảnh một con người (人) dang rộng hai tay hai chân hết cỡ ⟶ "To lớn/Đại" (大).',
    components: [
      { name: 'Nét Ngang (Giới hạn)', color: '#0284c7', strokes: [0] },
      { name: 'Người dang tay (人)', color: '#e11d48', strokes: [1, 2] }
    ]
  },
  '家': {
    char: '家',
    mnemonic: 'Dưới mái nhà (宀) che chở có đàn gia súc gia tài (豕) sung túc ⟶ "Mái nhà/Gia đình" (家).',
    components: [
      { name: 'Mái Nhà (宀)', color: '#d97706', strokes: [0, 1, 2] },
      { name: 'Bộ Thỉ - Gia súc (豕)', color: '#059669', strokes: [3, 4, 5, 6, 7, 8, 9] }
    ]
  },
  '好': {
    char: '好',
    mnemonic: 'Người mẹ (女) bế đứa con nhỏ (子) trên tay là hình ảnh ấm áp tốt đẹp nhất ⟶ "Tốt/Đẹp/Hay/Khỏe" (好).',
    components: [
      { name: 'Bộ Nữ (女)', color: '#ec4899', strokes: [0, 1, 2] },
      { name: 'Bộ Tử (子)', color: '#0284c7', strokes: [3, 4, 5] }
    ]
  },
  '谢': {
    char: '谢',
    mnemonic: 'Dùng lời nói (讠) cúi gập thân thể (身) một cách chừng mực lễ độ (寸) ⟶ "Cảm ơn/Tạ ơn" (谢).',
    components: [
      { name: 'Bộ Ngôn (讠)', color: '#0284c7', strokes: [0, 1] },
      { name: 'Bộ Thân (身)', color: '#7e22ce', strokes: [2, 3, 4, 5, 6, 7, 8] },
      { name: 'Bộ Thốn (寸)', color: '#dc2626', strokes: [9, 10, 11] }
    ]
  },
  '不': {
    char: '不',
    mnemonic: 'Con chim bay vút lên bầu trời không chịu hạ cánh xuống đất (一) ⟶ "Không/Bất" (不).',
    components: [
      { name: 'Nét Ngang (Mặt đất)', color: '#0284c7', strokes: [0] },
      { name: 'Cánh chim bay', color: '#dc2626', strokes: [1, 2, 3] }
    ]
  },
  '客': {
    char: '客',
    mnemonic: 'Người phương xa (各) ghé thăm bước vào dưới mái nhà (宀) ⟶ "Khách sáo/Khách khứa" (客).',
    components: [
      { name: 'Mái Nhà (宀)', color: '#d97706', strokes: [0, 1, 2] },
      { name: 'Chữ Các (各)', color: '#0284c7', strokes: [3, 4, 5, 6, 7, 8] }
    ]
  },
  '气': {
    char: '气',
    mnemonic: 'Luồng mây trời hơi nước bốc lên uốn lượn nhẹ nhàng ⟶ "Khí chất/Không khí" (气).',
    components: [
      { name: 'Mây trời bay', color: '#0284c7', strokes: [0, 1, 2] },
      { name: 'Luồng Khí lượn', color: '#7e22ce', strokes: [3] }
    ]
  },
  '再': {
    char: '再',
    mnemonic: 'Mầm cây mọc trên giàn lại nảy mầm kết trái lần nữa ⟶ "Lặp lại/Một lần nữa" (再).',
    components: [
      { name: 'Khung Giàn hoa', color: '#d97706', strokes: [0, 1, 2, 3] },
      { name: 'Bộ Thổ (土)', color: '#059669', strokes: [4, 5] }
    ]
  },
  '见': {
    char: '见',
    mnemonic: 'Đôi chân (儿) bước đi tới gặp mặt và đôi mắt (目) nhìn thấy ⟶ "Gặp mặt/Thấy" (见).',
    components: [
      { name: 'Bộ Mục (目)', color: '#0284c7', strokes: [0, 1] },
      { name: 'Bộ Nhân (儿)', color: '#e11d48', strokes: [2, 3] }
    ]
  }
};

// 2. Vocabulary Database for HSK 1 Lesson 1 (12 Nòng cốt từ vựng & Chiết Tự)
const vocabDatabase = [
  {
    hz: "你",
    py: "nǐ",
    vi: "Bạn, cậu, anh, chị (ngôi thứ 2 số ít)",
    etymology: "Bộ Nhân đứng (亻: người) + Chữ Nhĩ (尔: đối diện). ⟶ Người đứng đối diện nói chuyện chính là 'Bạn/Cậu'.",
    example: "你好！ (nǐ hǎo!) - Chào bạn!"
  },
  {
    hz: "您",
    py: "nín",
    vi: "Ngài, ông, bà, cô, thầy (kính ngữ tôn trọng)",
    etymology: "Chữ 你 (bạn) ở trên + Bộ Tâm (心: trái tim) ở dưới. ⟶ Đặt người đối diện ở trong tim để thể hiện lòng kính trọng.",
    example: "王老师，您好！ (Wáng lǎoshī, nín hǎo!) - Chào Giáo sư Wang!"
  },
  {
    hz: "你们",
    py: "nǐmen",
    vi: "Các bạn, các anh, các chị (ngôi thứ 2 số nhiều)",
    etymology: "Chữ 你 (bạn) + Chữ 们 (hậu tố số nhiều: Bộ Nhân 亻 + chữ 门). ⟶ Nhiều người bạn gộp lại = Các bạn.",
    example: "你们好！ (Nǐmen hǎo!) - Chào các bạn!"
  },
  {
    hz: "老师",
    py: "lǎoshī",
    vi: "Thầy giáo, cô giáo",
    etymology: "Chữ 老 (Lão: người cao tuổi chống gậy) + Chữ 师 (Sư: người truyền dạy kiến thức). ⟶ Người thầy kính mến truyền dạy học trò.",
    example: "老师好！ (Lǎoshī hǎo!) - Chào thầy/cô giáo!"
  },
  {
    hz: "王老师",
    py: "Wáng lǎoshī",
    vi: "Giáo sư Wang / Thầy Wang / Cô Wang",
    etymology: "Chữ 王 (Họ Vương/Vua: 3 nét ngang nối nét dọc) + 老师 (Thầy cô giáo). ⟶ Chức danh tôn xưng thầy cô giáo.",
    example: "谢谢您，王老师！ - Cảm ơn Giáo sư Wang!"
  },
  {
    hz: "学生",
    py: "xuéshēng",
    vi: "Học sinh, sinh viên",
    etymology: "Chữ 学 (Học: mái trường) + Chữ 生 (Sinh: mầm cây sinh trưởng). ⟶ Mầm cây nhỏ sinh trưởng dưới mái trường = Học sinh.",
    example: "我是学生。 - Tôi là học sinh."
  },
  {
    hz: "同学",
    py: "tóngxué",
    vi: "Bạn học, bạn cùng lớp",
    etymology: "Chữ 同 (Cùng nhau: Bộ Đồng) + Chữ 学 (Học). ⟶ Những người học cùng một lớp với nhau = Bạn học.",
    example: "同学们好！ (Tóngxuémen hǎo!) - Chào các em học sinh!"
  },
  {
    hz: "大家",
    py: "dàjiā",
    vi: "Mọi người, tất cả mọi người",
    etymology: "Chữ 大 (To lớn: người dang tay) + Chữ 家 (Mái nhà/Gia đình: mái nhà 宀 che chở). ⟶ Mọi người trong một mái nhà lớn.",
    example: "大家好！ (Dàjiā hǎo!) - Chào mọi người!"
  },
  {
    hz: "好",
    py: "hǎo",
    vi: "Tốt, đẹp, hay, khỏe",
    etymology: "Bộ Nữ (女: người mẹ/con gái) + Bộ Tử (子: đứa con). ⟶ Người mẹ bế đứa con nhỏ trên tay là hình ảnh tốt đẹp nhất.",
    example: "你好！ (nǐ hǎo!) - Chào bạn!"
  },
  {
    hz: "谢谢",
    py: "xièxie",
    vi: "Cảm ơn",
    etymology: "Bộ Ngôn (讠: lời nói) + Chữ Thân (身: thân thể) + Bộ Thốn (寸: lễ độ). ⟶ Cúi mình thốt ra lời nói có lễ độ = Cảm ơn.",
    example: "谢谢大家！ (Xièxie dàjiā!) - Cảm ơn mọi người!"
  },
  {
    hz: "不客气",
    py: "bú kèqi",
    vi: "Không có gì, đừng khách khí (đáp lại lời cảm ơn)",
    etymology: "Chữ 不 (Khống/Không) + 客 (Khách: mái nhà 宀 + chữ 各) + 气 (Khí/Khí chất). ⟶ Đừng coi nhau là khách sáo.",
    example: "谢谢你！ ⟶ 不客气！ - Cảm ơn! ⟶ Không có gì!"
  },
  {
    hz: "再见",
    py: "zàijiàn",
    vi: "Tạm biệt, hẹn gặp lại",
    etymology: "Chữ 再 (Lần nữa/Lặp lại: giàn hoa) + Chữ 见 (Thấy/Gặp: mắt 目 + chân 儿 đi). ⟶ Đi bằng chân gặp lại bằng mắt = Hẹn gặp lại!",
    example: "再见！ (Zàijiàn!) - Tạm biệt!"
  }
];

// 3. Full Question Bank Database (3 Complete Sets of 4-Skill Questions)
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
            options: ["A. 再见！", "B. Không có gì!"],
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

// 4. Student Account Authentication & Database Functions
function getAllAccounts() {
  try {
    const raw = localStorage.getItem('hsk1_auth_accounts_db');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return defaultAccounts;
}

function saveAllAccounts(db) {
  try {
    localStorage.setItem('hsk1_auth_accounts_db', JSON.stringify(db));
  } catch (e) {}
}

function loadActiveStudentAccount() {
  try {
    const savedUser = localStorage.getItem('hsk1_active_username');
    if (savedUser) {
      const db = getAllAccounts();
      if (db[savedUser]) {
        activeUsername = savedUser;
        activeStudentName = db[savedUser].fullName;
      }
    }
  } catch (e) {}

  const nameEl = document.getElementById('display-student-name');
  if (nameEl) nameEl.innerText = activeStudentName;
}

function openAccountModal() {
  const modal = document.getElementById('account-modal');
  if (modal) modal.style.display = 'flex';
  switchAuthTab('login');
  renderSavedAccountsList();
}

function closeAccountModal() {
  const modal = document.getElementById('account-modal');
  if (modal) modal.style.display = 'none';
  showAuthMsg("", "");
}

function switchAuthTab(type) {
  const loginForm = document.getElementById('auth-login-form');
  const regForm = document.getElementById('auth-register-form');
  const btnLogin = document.getElementById('btn-tab-login');
  const btnReg = document.getElementById('btn-tab-register');

  if (type === 'login') {
    if (loginForm) loginForm.style.display = 'block';
    if (regForm) regForm.style.display = 'none';
    if (btnLogin) btnLogin.classList.add('active');
    if (btnReg) btnReg.classList.remove('active');
  } else {
    if (loginForm) loginForm.style.display = 'none';
    if (regForm) regForm.style.display = 'block';
    if (btnReg) btnReg.classList.add('active');
    if (btnLogin) btnLogin.classList.remove('active');
  }
  showAuthMsg("", "");
}

function showAuthMsg(msg, color) {
  const box = document.getElementById('auth-status-msg');
  if (!box) return;
  if (!msg) {
    box.style.display = 'none';
    return;
  }
  box.style.display = 'block';
  box.innerText = msg;
  if (color === 'red') {
    box.style.background = '#fef2f2';
    box.style.color = '#dc2626';
    box.style.border = '1px solid #fca5a5';
  } else {
    box.style.background = '#ecfdf5';
    box.style.color = '#047857';
    box.style.border = '1px solid #a7f3d0';
  }
}

function handleLoginSubmit() {
  const uInput = document.getElementById('login-username')?.value.trim();
  const pInput = document.getElementById('login-password')?.value.trim();

  if (!uInput || !pInput) {
    showAuthMsg("Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu!", "red");
    return;
  }

  const db = getAllAccounts();
  if (!db[uInput]) {
    showAuthMsg("Tên đăng nhập không tồn tại! Hãy tạo tài khoản mới.", "red");
    return;
  }

  if (db[uInput].password !== pInput) {
    showAuthMsg("Mật khẩu không chính xác! Vui lòng thử lại.", "red");
    return;
  }

  activeUsername = uInput;
  activeStudentName = db[uInput].fullName;
  localStorage.setItem('hsk1_active_username', uInput);

  loadActiveStudentAccount();
  showAuthMsg("🎉 Đăng nhập thành công!", "green");

  setTimeout(() => {
    closeAccountModal();
  }, 600);
}

function handleRegisterSubmit() {
  const fullName = document.getElementById('reg-fullname')?.value.trim();
  const username = document.getElementById('reg-username')?.value.trim().toLowerCase();
  const password = document.getElementById('reg-password')?.value.trim();

  if (!fullName || !username || !password) {
    showAuthMsg("Vui lòng nhập đầy đủ Họ tên, Tên đăng nhập và Mật khẩu!", "red");
    return;
  }

  const db = getAllAccounts();
  if (db[username]) {
    showAuthMsg("Tên đăng nhập này đã có người sử dụng! Vui lòng chọn tên khác.", "red");
    return;
  }

  db[username] = {
    fullName: fullName,
    username: username,
    password: password,
    rank: "🌱 Học viên chính thức"
  };

  saveAllAccounts(db);

  activeUsername = username;
  activeStudentName = fullName;
  localStorage.setItem('hsk1_active_username', username);

  loadActiveStudentAccount();
  showAuthMsg("🎉 Tạo tài khoản và bảo mật mật khẩu thành công!", "green");

  setTimeout(() => {
    closeAccountModal();
  }, 600);
}

function quickSwitchAccount(username) {
  const db = getAllAccounts();
  if (db[username]) {
    activeUsername = username;
    activeStudentName = db[username].fullName;
    localStorage.setItem('hsk1_active_username', username);
    loadActiveStudentAccount();
    closeAccountModal();
  }
}

function renderSavedAccountsList() {
  const container = document.getElementById('saved-accounts-list');
  if (!container) return;

  const db = getAllAccounts();
  let html = '';

  Object.keys(db).forEach(u => {
    const acc = db[u];
    const isCurrent = u === activeUsername;
    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; background: ${isCurrent ? '#eef2ff' : '#ffffff'}; border: 1px solid ${isCurrent ? '#6366f1' : '#cbd5e1'}; padding: 8px 12px; border-radius: 10px; cursor: pointer;" onclick="quickSwitchAccount('${u}')">
        <div>
          <strong style="color: ${isCurrent ? '#4338ca' : '#1e293b'}; font-size: 0.92rem;">👤 ${acc.fullName}</strong>
          <span style="font-size: 0.8rem; color: #64748b; margin-left: 6px;">(@${acc.username})</span>
        </div>
        ${isCurrent ? '<span style="color: #6366f1; font-weight: 800; font-size: 0.8rem;">[Đang đăng nhập]</span>' : '<span style="color: #64748b; font-size: 0.8rem;">Chuyển</span>'}
      </div>
    `;
  });

  container.innerHTML = html;
}

// 5. Render 12 Vocabulary Selector Grid
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

// 6. Select & Render Active Vocab Learning Card with APP_MNEMONIC FIRST then ETYMOLOGY
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

    const charArray = Array.from(item.hz);

    // Collect APP_MNEMONICS for characters in this word (formatted cleanly)
    let mnemonicsHtml = '';
    charArray.forEach(ch => {
      if (hanziComponentDb[ch] && hanziComponentDb[ch].mnemonic) {
        mnemonicsHtml += `<p style="margin-bottom: 6px; font-weight: 700; color: #065f46;">• Chữ <strong>'${ch}'</strong>: ${hanziComponentDb[ch].mnemonic}</p>`;
      }
    });

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

      <!-- HANZI WRITER MULTI-COLOR COMPONENT CONTAINERS -->
      <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1.2rem;">
        <div>
          <div style="margin-bottom: 8px;">
            <span style="font-weight: 800; color: #4338ca; font-size: 0.95rem;">
              🎨 Chiết tự & Tô màu nét bộ thủ cho ${charArray.length} chữ của từ "${item.hz}":
            </span>
          </div>
          <div id="multi-hanzi-container" class="multi-hanzi-wrapper"></div>
        </div>

        <!-- 1. APP_MNEMONIC CARD FIRST (KHOANH 1 ĐẶT LÊN TRƯỚC KHOANH 2) -->
        <div class="app-mnemonic-box">
          <div class="app-mnemonic-header">
            <i class="fa-solid fa-seedling"></i> 🌱 APP_MNEMONIC (Mẹo Nhớ Chiết Tự Sinh Động):
          </div>
          <div class="app-mnemonic-body">
            ${mnemonicsHtml || `<p>Chữ ${item.hz}: Chiết tự ghi nhớ sinh động được lắp ráp từ các bộ thủ tự nhiên.</p>`}
          </div>
        </div>

        <!-- 2. ETYMOLOGY CARD SECOND (KHOANH 2 ĐẶT PHÍA DƯỚI KHOANH 1) -->
        <div class="etym-box">
          <div class="etym-header">
            <i class="fa-solid fa-puzzle-piece"></i> 🧩 CẤU TRÚC CHIẾT TỰ (Etymology):
          </div>
          <div class="etym-body">
            ${item.etymology}
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      renderMultiHanziAnimation(charArray);
    }, 50);
  }
}

// 7. Render Multi-Color Hanzi Animation (CSS Injection Technique from hanzi-chiet-tu-animator skill)
function renderMultiHanziAnimation(charArray) {
  const container = document.getElementById('multi-hanzi-container');
  if (!container) return;
  container.innerHTML = '';
  currentWriters = [];

  charArray.forEach((char, idx) => {
    const boxId = `hw_box_${idx}`;
    const wrapperId = `hw_wrapper_${idx}`;
    const compData = hanziComponentDb[char];

    // Build CSS stroke color injection per skill specification
    let customCss = '';
    let componentBadgesHtml = '';

    if (compData && compData.components) {
      compData.components.forEach(comp => {
        componentBadgesHtml += `<span class="comp-badge" style="background: ${comp.color};">${comp.name}</span>`;
        if (comp.strokes) {
          comp.strokes.forEach(sIdx => {
            customCss += `
              #${wrapperId} svg path:nth-child(${sIdx + 1}) {
                fill: ${comp.color} !important;
                stroke: ${comp.color} !important;
              }
            `;
          });
        }
      });
    }

    const wrapper = document.createElement('div');
    wrapper.id = wrapperId;
    wrapper.className = 'hanzi-writer-box-item custom-hanzi-colors';
    wrapper.innerHTML = `
      <style>${customCss}</style>
      <div id="${boxId}" class="hanzi-writer-box" style="cursor: pointer;" title="Bấm vào để xem viết chữ '${char}'" onclick="window.animateSingleHanzi(${idx})"></div>
      <span class="hw-char-label">Nét chữ '${char}'</span>
      <div class="component-badges-row">
        ${componentBadgesHtml}
      </div>
    `;
    container.appendChild(wrapper);

    if (typeof HanziWriter !== 'undefined') {
      try {
        const writer = HanziWriter.create(boxId, char, {
          width: 130,
          height: 130,
          padding: 5,
          strokeColor: '#64748b',
          radicalColor: null,
          showOutline: true,
          strokeAnimationSpeed: 1.5,
          delayBetweenStrokes: 150,
          onLoadCharDataSuccess: function() {
            // Trigger animation immediately once character SVG data is loaded
            writer.animateCharacter();
          }
        });
        currentWriters.push(writer);
      } catch (e) {
        document.getElementById(boxId).innerHTML = `<span style="font-size: 3.5rem; font-family: 'Noto Sans SC'; color: #4338ca;">${char}</span>`;
      }
    } else {
      document.getElementById(boxId).innerHTML = `<span style="font-size: 3.5rem; font-family: 'Noto Sans SC'; color: #4338ca;">${char}</span>`;
    }
  });
}

function animateActiveHanzi() {
  if (currentWriters && currentWriters.length > 0) {
    currentWriters.forEach((writer, idx) => {
      setTimeout(() => {
        if (writer) {
          if (typeof writer.cancelAnimation === 'function') {
            writer.cancelAnimation();
          }
          if (typeof writer.animateCharacter === 'function') {
            writer.animateCharacter();
          }
        }
      }, idx * 600);
    });
  }
}

function animateSingleHanzi(idx) {
  if (currentWriters && currentWriters[idx]) {
    const writer = currentWriters[idx];
    if (typeof writer.cancelAnimation === 'function') {
      writer.cancelAnimation();
    }
    if (typeof writer.animateCharacter === 'function') {
      writer.animateCharacter();
    }
  }
}

// Expose animation functions globally so inline onclick handler can NEVER fail
window.animateActiveHanzi = animateActiveHanzi;
window.animateSingleHanzi = animateSingleHanzi;

// 8. Subtab Switcher for Vocab Module
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

// 9. Interactive Vocab Matching Quiz
function renderVocabQuiz() {
  const container = document.getElementById('vocab-quiz-container');
  if (!container) return;

  let html = `<div style="display: flex; flex-direction: column; gap: 12px;">`;
  vocabDatabase.slice(0, 6).forEach((item, idx) => {
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

// 10. Render Active Test Question Set to DOM
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

// 11. Start Test Action (Triggers Timer and Reveals Questions)
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

// 12. Render Spaced Retrieval 1-3-7 Dedicated Review Tab (Tab 4)
function renderSpacedReviewTab() {
  const container = document.getElementById('spaced-review-questions-box');
  if (!container) return;

  const formatDate = (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  let lastDate = new Date();
  try {
    const raw = localStorage.getItem(`hsk1_spaced_${activeUsername}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.lastTestDate) lastDate = new Date(parsed.lastTestDate);
    }
  } catch (e) {}

  const d1 = new Date(lastDate); d1.setDate(lastDate.getDate() + 1);
  const d3 = new Date(lastDate); d3.setDate(lastDate.getDate() + 3);
  const d7 = new Date(lastDate); d7.setDate(lastDate.getDate() + 7);

  const d1El = document.getElementById('day1-date-status');
  const d3El = document.getElementById('day3-date-status');
  const d7El = document.getElementById('day7-date-status');

  if (d1El) d1El.innerHTML = `<strong>Lịch: ${formatDate(d1)}</strong>`;
  if (d3El) d3El.innerHTML = `<strong>Lịch: ${formatDate(d3)}</strong>`;
  if (d7El) d7El.innerHTML = `<strong>Lịch: ${formatDate(d7)}</strong>`;

  let html = `
    <p style="color: #475569; font-weight: 600; margin-bottom: 1.2rem;">
      Hệ thống đã tự động lọc ra 3 bài tập rèn phản xạ thanh điệu 3+3, kính ngữ 您 và biến điệu chữ 不 cho học sinh <strong>${activeStudentName}</strong> (@${activeUsername}):
    </p>

    <div class="transfer-quiz-card">
      <div class="transfer-quiz-title">
        <i class="fa-solid fa-bolt" style="color: #f59e0b;"></i> ÔN TẬP 1: Chọn cách đọc biến điệu đúng khi Học sinh 2 đáp '不客气！':
      </div>
      <div class="transfer-opts">
        <button type="button" class="transfer-opt-btn" onclick="checkTransferAnswer(101, 0, 0, 1, this, 'Bú kèqi - chữ 不 biến thành thanh 2 bú!')">
          A. bù kèqi (giữ nguyên thanh 4)
        </button>
        <button type="button" class="transfer-opt-btn" onclick="checkTransferAnswer(101, 0, 1, 1, this, 'Bú kèqi - chữ 不 biến thành thanh 2 bú!')">
          B. bú kèqi (biến điệu thanh 2 bú)
        </button>
      </div>
    </div>

    <div class="transfer-quiz-card">
      <div class="transfer-quiz-title">
        <i class="fa-solid fa-crown" style="color: #6366f1;"></i> ÔN TẬP 2: Kính ngữ chuẩn nhất khi Vương Nhất Phi chào Giáo sư Wang (王老师):
      </div>
      <div class="transfer-opts">
        <button type="button" class="transfer-opt-btn" onclick="checkTransferAnswer(102, 0, 0, 1, this, 'Dùng kính ngữ 您 (nín) cho Giáo sư Wang!')">
          A. 王老师，你好！ (Wáng lǎoshī, nǐ hǎo!)
        </button>
        <button type="button" class="transfer-opt-btn" onclick="checkTransferAnswer(102, 0, 1, 1, this, 'Dùng kính ngữ 您 (nín) cho Giáo sư Wang!')">
          B. 王老师，您好！ (Wáng lǎoshī, nín hǎo!)
        </button>
      </div>
    </div>

    <div class="transfer-quiz-card">
      <div class="transfer-quiz-title">
        <i class="fa-solid fa-wave-square" style="color: #10b981;"></i> ÔN TẬP 3: Cách đọc biến điệu 3+3 của câu '你好':
      </div>
      <div class="transfer-opts">
        <button type="button" class="transfer-opt-btn" onclick="checkTransferAnswer(103, 0, 0, 1, this, 'nǐ + hǎo ⟶ ní hǎo (biến điệu thanh 2 ní)!')">
          A. nǐ hǎo
        </button>
        <button type="button" class="transfer-opt-btn" onclick="checkTransferAnswer(103, 0, 1, 1, this, 'nǐ + hǎo ⟶ ní hǎo (biến điệu thanh 2 ní)!')">
          B. ní hǎo
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function goToReviewTab() {
  const btns = document.querySelectorAll('.tab-btn');
  if (btns && btns[3]) {
    switchPageTab('review-tab', btns[3]);
  }
}

// 13. Tab Switcher & Timer Manager
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
  } else if (tabId === 'review-tab') {
    renderSpacedReviewTab();
    stopTestTimer();
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

// 14. Web Speech API
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

// 15. Calibration State Manager ([V], [?], [X])
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

// 16. Interactive Option Checker for Transfer Practice Questions
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

// 17. Evaluator Execution Function
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

  // Save Spaced Retrieval Schedule per username
  const todayStr = new Date().toISOString().split('T')[0];
  const storageData = {
    lastTestDate: todayStr,
    missedQuestions: missedQuestionsList
  };
  try {
    localStorage.setItem(`hsk1_spaced_${activeUsername}`, JSON.stringify(storageData));
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

// 18. Dynamic Bank Swapper Button Action
function shuffleAndGenerateNewTestSet() {
  currentBankSetIndex = (currentBankSetIndex + 1) % testBankSets.length;
  renderCurrentTestSet();
  startTestNow();

  const logBox = document.getElementById('js-error-log-box');
  if (logBox) logBox.style.display = 'none';

  const testArea = document.getElementById('test-questions-container');
  if (testArea) testArea.scrollIntoView({ behavior: 'smooth' });
}

// 19. Automatic Daily Scheduler via LocalStorage per student account
function checkDailyScheduleOnLoad() {
  try {
    const raw = localStorage.getItem(`hsk1_spaced_${activeUsername}`);
    if (!raw) return;
    const db = JSON.parse(raw);
    if (!db || !db.lastTestDate) return;

    const banner = document.getElementById('daily-task-banner');
    const bannerDesc = document.getElementById('daily-banner-desc');
    if (banner) {
      if (bannerDesc) {
        bannerDesc.innerText = `Hôm nay là mốc ôn tập Spaced Retrieval của ${activeStudentName}! Bạn có các bài tập rèn phản xạ thanh điệu và kính ngữ!`;
      }
      banner.style.display = 'flex';
    }
  } catch (e) {}
}

function startDailyTaskReview() {
  goToReviewTab();
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  loadActiveStudentAccount();
  renderVocabGridList();
  renderCurrentTestSet();
  const defaultTabBtn = document.querySelector('.tab-btn');
  if (defaultTabBtn) switchPageTab('theory-tab', defaultTabBtn);
  checkDailyScheduleOnLoad();
});
