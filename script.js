// Interactive Application Logic for UbD + AI HSK1 Lesson 1 App

// 1. Navigation Tab Controller
function switchSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const targetSec = document.getElementById(sectionId);
  if (targetSec) targetSec.classList.add('active');

  const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(
    btn => btn.getAttribute('onclick').includes(sectionId)
  );
  if (activeBtn) activeBtn.classList.add('active');
}

// 2. Restructured UbD Slide Deck Data
const slidesData = [
  {
    id: 1,
    stage: "Giai Đoạn 1",
    stageBadgeClass: "badge-stage1",
    type: "SKILL GAP & CLO",
    title: "Slide 1: Xác Định Chuẩn Đầu Ra (CLO) Từ Dữ Liệu Tuyển Dụng",
    content: `
      <h3>🎯 Mục Tiêu Giao Tiếp Cốt Lõi:</h3>
      <p>Thực hiện giao tiếp chào hỏi, cảm ơn và tạm biệt chuẩn mực trong môi trường doanh nghiệp hiện đại có sự phối hợp giữa Đồng nghiệp, Cấp trên và Trợ lý AI.</p>
      <div style="background: rgba(255,255,255,0.04); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--cyan); margin-top: 1rem;">
        <strong>💡 Essential Question (EQ):</strong><br>
        <em>"Làm thế nào để chọn lựa giữa đại từ '你' (bạn/AI) và '您' (kính ngữ cấp trên) để thể hiện đúng văn hóa tôn trọng và chuyên nghiệp?"</em>
      </div>
    `
  },
  {
    id: 2,
    stage: "Giai Đoạn 2",
    stageBadgeClass: "badge-stage2",
    type: "PERFORMANCE TASK",
    title: "Slide 2: Thách Thức Thực Chiến (GRASPS Performance Task)",
    content: `
      <h3>⚡ Nhiệm Vụ Chinh Phục (Đặt Đánh Giá TRƯỚC KHI Học):</h3>
      <p><strong>Bối cảnh (Situation):</strong> Ngày đầu tiên đi làm tại văn phòng công nghệ, bạn cần tiến hành chào hỏi 2 nhân vật:</p>
      <ul class="feature-list" style="margin: 1rem 0;">
        <li><i class="fa-solid fa-user-tie"></i> <strong>Giám đốc Wang (王老师):</strong> Cần dùng danh xưng kính trọng (您).</li>
        <li><i class="fa-solid fa-robot"></i> <strong>Trợ lý AI Xiaoyu (小语):</strong> Dùng danh xưng chào hỏi thân thiện (你/你好).</li>
      </ul>
      <p><em>Học viên sẽ thực hiện đối thoại thoại trực tiếp tại tab <strong>AI Xiaoyu Bot</strong> để chấm điểm Rubric.</em></p>
    `
  },
  {
    id: 3,
    stage: "Giai Đoạn 2",
    stageBadgeClass: "badge-stage2",
    type: "RUBRIC STANDARDS",
    title: "Slide 3: Tiêu Chí Chấm Điểm Năng Lực (AI Rubric)",
    content: `
      <h3>📊 Thước Đo Đo Lường Năng Lực Đầu Ra:</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
        <div style="background: rgba(99,102,241,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-glow);">
          <h4 style="color: var(--cyan);">1. Đại Từ Xưng Hổ (40%)</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Sử dụng chính xác "您" cho bề trên và "你" cho bạn bè/AI.</p>
        </div>
        <div style="background: rgba(168,85,247,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-glow);">
          <h4 style="color: var(--secondary);">2. Phát Âm & Thanh Điệu (30%)</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Phát âm chuẩn Pinyin (nǐ hǎo, nín hǎo, xièxie, zàijiàn).</p>
        </div>
        <div style="background: rgba(16,185,129,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-glow);">
          <h4 style="color: var(--emerald);">3. Phản Xạ Ngữ Cảnh (30%)</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Đáp lời đáp ứng chính xác khi nhận câu cảm ơn (不客气).</p>
        </div>
      </div>
    `
  },
  {
    id: 4,
    stage: "Giai Đoạn 3",
    stageBadgeClass: "badge-stage3",
    type: "JUST-IN-TIME CONTENT",
    title: "Slide 4: Học Liệu Vừa Đủ 1 - Nhóm Từ Xưng Hổ & Kính Ngữ",
    content: `
      <h3>📚 Nạp Học Liệu Tinh Gọn (Chỉ Từ Cần Cho Task):</h3>
      <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
        <div class="vocab-card" style="flex: 1; min-width: 140px;">
          <div class="vocab-hanzi">你 / 您</div>
          <div class="vocab-pinyin">nǐ / nín</div>
          <div class="vocab-meaning">Bạn / Ngài (Kính ngữ)</div>
          <button class="audio-btn" onclick="speakChinese('您好')"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div class="vocab-card" style="flex: 1; min-width: 140px;">
          <div class="vocab-hanzi">老师 / 大家</div>
          <div class="vocab-pinyin">lǎoshī / dàjiā</div>
          <div class="vocab-meaning">Thầy giáo / Mọi người</div>
          <button class="audio-btn" onclick="speakChinese('老师好')"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
  },
  {
    id: 5,
    stage: "Giai Đoạn 3",
    stageBadgeClass: "badge-stage3",
    type: "JUST-IN-TIME CONTENT",
    title: "Slide 5: Học Liệu Vừa Đủ 2 - Cụm Câu Chào & Cảm Ơn",
    content: `
      <h3>📚 Nạp Học Liệu Tinh Gọn (Mẫu Câu Thực Chiến):</h3>
      <ul class="feature-list" style="font-size: 1rem; margin-top: 1rem;">
        <li><i class="fa-solid fa-message"></i> <strong>你好！ (nǐ hǎo):</strong> Xin chào (thông thường).</li>
        <li><i class="fa-solid fa-message"></i> <strong>王老师，您好！ (Wáng lǎoshī, nín hǎo):</strong> Chào Cô Wang (Lịch sự).</li>
        <li><i class="fa-solid fa-message"></i> <strong>谢谢！ - 不客气！ (xièxie - bú kèqi):</strong> Cảm ơn! - Không có gì!</li>
        <li><i class="fa-solid fa-message"></i> <strong>再见！ (zàijiàn):</strong> Tạm biệt!</li>
      </ul>
    `
  },
  {
    id: 6,
    stage: "Giai Đoạn 3",
    stageBadgeClass: "badge-stage3",
    type: "PHONETICS DRILL",
    title: "Slide 6: Phản Xạ Ngữ Âm & Rao口令 (Tongue Twister)",
    content: `
      <h3>🎙️ Luyện Tập Âm Tiết Giải Quyết Lỗi Ngắt Giọng:</h3>
      <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245,158,11,0.3); padding: 1.5rem; border-radius: 12px; text-align: center; margin-top: 1rem;">
        <h2 style="font-family: 'Noto Sans SC'; color: #fcd34d;">Mā zhòng má, wǒ fàng mǎ. Mǎ chī má, mā mà mǎ.</h2>
        <p style="color: var(--text-muted); margin: 0.8rem 0;">(妈种麻，我放马。马吃麻，妈骂马。)</p>
        <button class="btn btn-primary" onclick="speakChinese('妈种麻，我放马。马吃麻，妈骂马。')">
          <i class="fa-solid fa-play"></i> Nghe Thử Rao口令 (1.0x)
        </button>
      </div>
    `
  }
];

let currentSlideIdx = 0;

function renderSlideList() {
  const sidebar = document.getElementById('slide-sidebar-list');
  if (!sidebar) return;

  sidebar.innerHTML = slidesData.map((s, idx) => `
    <div class="slide-thumb ${idx === currentSlideIdx ? 'active' : ''}" onclick="goToSlide(${idx})">
      <div class="slide-thumb-num">${s.stage}</div>
      <div class="slide-thumb-title">${s.title}</div>
    </div>
  `).join('');
}

function renderActiveSlide() {
  const s = slidesData[currentSlideIdx];
  if (!s) return;

  document.getElementById('active-slide-badge').innerText = s.stage;
  document.getElementById('active-slide-badge').className = `stage-badge ${s.stageBadgeClass}`;
  document.getElementById('active-slide-type').innerText = s.type;

  document.getElementById('active-slide-body').innerHTML = `
    <h2>${s.title}</h2>
    ${s.content}
  `;

  document.getElementById('slide-counter').innerText = `Slide ${currentSlideIdx + 1} / ${slidesData.length}`;
  renderSlideList();
}

function nextSlide() {
  if (currentSlideIdx < slidesData.length - 1) {
    currentSlideIdx++;
    renderActiveSlide();
  }
}

function prevSlide() {
  if (currentSlideIdx > 0) {
    currentSlideIdx--;
    renderActiveSlide();
  }
}

function goToSlide(idx) {
  currentSlideIdx = idx;
  renderActiveSlide();
}

// 3. Web Speech Synthesis (Chinese Pronunciation)
function speakChinese(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Trình duyệt của bạn không hỗ trợ TTS Web Speech API.');
  }
}

// 4. AI Xiaoyu Chat & Rubric Simulator
const aiResponses = [
  { keywords: ['你好', 'hello', 'hi'], reply: '你好！很高兴在办公室见到你！请问您是王老师吗？', pinyin: 'Nǐ hǎo! Hěn gāoxìng zài bàngōngshì jiàndào nǐ!' },
  { keywords: ['王老师', '我是', 'nín'], reply: '王老师好！我是AI助教小语。今后请多关照！', pinyin: 'Wáng lǎoshī hǎo! Wǒ shì AI zhùjiào Xiǎoyǔ.' },
  { keywords: ['谢谢', 'xièxie'], reply: '不客气！这是我应该做的。', pinyin: 'Bú kèqi! Zhè shì wǒ yīnggāi zuò de.' },
  { keywords: ['再见', 'zàijiàn'], reply: '再见！祝您工作愉快！', pinyin: 'Zàijiàn! Zhù nín gōngzuò yúkuài!' }
];

let lastAIMessage = "你好！我是AI助教小语。欢迎来到 office！请问您怎么称呼？";

function speakCurrentAIMessage() {
  speakChinese(lastAIMessage);
}

function sendUserChatMessage() {
  const input = document.getElementById('user-chat-input');
  const msgText = input.value.trim();
  if (!msgText) return;

  const chatContainer = document.getElementById('chat-messages-list');

  // Render User Message
  const userDiv = document.createElement('div');
  userDiv.className = 'msg msg-user';
  userDiv.innerHTML = `<strong>Bạn:</strong> ${msgText}`;
  chatContainer.appendChild(userDiv);

  input.value = '';
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Simulate AI response after 600ms
  setTimeout(() => {
    let replyObj = aiResponses.find(r => r.keywords.some(kw => msgText.toLowerCase().includes(kw))) || {
      reply: '收到！我们一起加油学习中文！(Tôi đã nhận tin! Chúng ta cùng cố gắng nhé!)'
    };

    lastAIMessage = replyObj.reply;

    const aiDiv = document.createElement('div');
    aiDiv.className = 'msg msg-ai';
    aiDiv.innerHTML = `<strong>AI 小语:</strong> ${replyObj.reply}`;
    chatContainer.appendChild(aiDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Automatically speak AI reply
    speakChinese(replyObj.reply);

    // Dynamic Rubric adjustment based on keywords
    if (msgText.includes('您') || msgText.includes('王老师')) {
      const honorificSlider = document.getElementById('slider-honorific');
      if (honorificSlider) {
        honorificSlider.value = Math.min(100, parseInt(honorificSlider.value) + 5);
        updateRubricScore();
      }
    }
  }, 600);
}

function handleChatKeyPress(e) {
  if (e.key === 'Enter') sendUserChatMessage();
}

function updateRubricScore() {
  const honorific = parseInt(document.getElementById('slider-honorific').value);
  const phonetics = parseInt(document.getElementById('slider-phonetics').value);
  const reflex = parseInt(document.getElementById('slider-reflex').value);

  document.getElementById('val-honorific').innerText = `${honorific}%`;
  document.getElementById('val-phonetics').innerText = `${phonetics}%`;
  document.getElementById('val-reflex').innerText = `${reflex}%`;

  const total = Math.round((honorific * 0.4) + (phonetics * 0.3) + (reflex * 0.3));
  const totalElem = document.getElementById('total-rubric-score');
  if (totalElem) totalElem.innerText = `${total} / 100`;

  const badgeElem = document.getElementById('rubric-status-badge');
  if (total >= 80) {
    badgeElem.innerHTML = `<i class="fa-solid fa-certificate"></i> Đạt Chuẩn Micro-Credential`;
    badgeElem.style.color = "var(--emerald)";
  } else {
    badgeElem.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Cần Cải Thiện Thêm`;
    badgeElem.style.color = "var(--amber)";
  }
}

function generateCertificateModal() {
  const total = document.getElementById('total-rubric-score').innerText;
  alert(`🏆 CHỨNG CHỈ NĂNG LỰC MICRO-CREDENTIAL\n\nKhóa Học: HSK 1 Bài 1 (AI小语，你好！)\nĐiểm Đánh Giá Rubric: ${total}\nTrạng Thái: ĐÃ XÁC NHẬN CHUẨN ĐẦU RA UBD\n\nChúc mừng bạn đã hoàn thành nhiệm vụ thực chiến Giai đoạn 2!`);
}

// 5. Vocabulary Cards Vault Generator
const vocabVaultData = [
  { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào (Hello)" },
  { hanzi: "王老师", pinyin: "Wáng lǎoshī", meaning: "Cô giáo Wang" },
  { hanzi: "请问", pinyin: "qǐngwèn", meaning: "Xin hỏi (Excuse me)" },
  { hanzi: "大家", pinyin: "dàjiā", meaning: "Mọi người (Everybody)" },
  { hanzi: "好", pinyin: "hǎo", meaning: "Tốt / Nắng (Good)" },
  { hanzi: "学生", pinyin: "xuéshēng", meaning: "Học sinh (Student)" },
  { hanzi: "您", pinyin: "nín", meaning: "Ngài / Thầy (Kính ngữ)" },
  { hanzi: "谢谢", pinyin: "xièxie", meaning: "Cảm ơn (Thank you)" },
  { hanzi: "不客气", pinyin: "bú kèqi", meaning: "Không có gì (You're welcome)" },
  { hanzi: "再见", pinyin: "zàijiàn", meaning: "Tạm biệt (Goodbye)" }
];

function renderVocabVault() {
  const grid = document.getElementById('vocab-cards-grid');
  if (!grid) return;

  grid.innerHTML = vocabVaultData.map(item => `
    <div class="vocab-card">
      <div class="vocab-hanzi">${item.hanzi}</div>
      <div class="vocab-pinyin">${item.pinyin}</div>
      <div class="vocab-meaning">${item.meaning}</div>
      <button class="audio-btn" title="Phát âm ${item.hanzi}" onclick="speakChinese('${item.hanzi}')">
        <i class="fa-solid fa-volume-high"></i>
      </button>
    </div>
  `).join('');
}

// Initialize components on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  renderActiveSlide();
  renderVocabVault();
  updateRubricScore();
});
