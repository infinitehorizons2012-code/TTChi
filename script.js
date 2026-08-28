// Interactive Application Logic for UbD + AI HSK1 Lesson 1 App (School Context Refined)

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

// 2. Restructured UbD Slide Deck Data (Refined to User Specs)
const slidesData = [
  {
    id: 1,
    stage: "Giai Đoạn 1",
    stageBadgeClass: "badge-stage1",
    type: "CLO & ESSENTIAL QUESTION",
    title: "Slide 1: Kết Quả Mong Muốn (Desired Results)",
    content: `
      <h3>🎯 CLO Cốt Lõi:</h3>
      <p style="font-size: 1.1rem; color: var(--text-main); font-weight: 600;">
        Chào hỏi, tạm biệt và cảm ơn trong môi trường trường học (Học sinh, cô giáo & Trợ lý AI).
      </p>

      <h3 style="margin-top: 1.2rem;">🌸 Nét Văn Hóa Xưng Hô:</h3>
      <p style="color: var(--cyan); font-weight: 600;">
        Phân biệt chính xác quy tắc xưng hô <code>你</code> (bạn/AI) vs <code>您</code> (cấp trên/kính trọng).
      </p>

      <div style="background: rgba(99, 102, 241, 0.1); padding: 1.2rem; border-radius: 12px; border-left: 4px solid var(--primary); margin-top: 1.2rem;">
        <strong>💡 Essential Question (EQ):</strong><br>
        <em style="font-size: 1.05rem; color: #a5b4fc;">
          "Làm sao để lựa chọn danh xưng vừa lịch sự vừa chuyên nghiệp trong kỷ nguyên số?"
        </em>
      </div>
    `
  },
  {
    id: 2,
    stage: "Giai Đoạn 2",
    stageBadgeClass: "badge-stage2",
    type: "PERFORMANCE TASK (GRASPS)",
    title: "Slide 2: Thách Thức Thực Chiến (GRASPS Performance Task)",
    content: `
      <h3>⚡ Performance Task (GRASPS):</h3>
      <p style="font-size: 1.1rem; color: var(--text-main); font-weight: 600; line-height: 1.5;">
        Đóng vai chào hỏi, tạm biệt và cảm ơn Giáo sư Wang, Trợ lý AI Xiaoyu và các bạn học sinh cũng như toàn trường trong ngày học đầu tiên (开学第一天).
      </p>

      <div style="margin-top: 1.2rem; background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-glass);">
        <h4 style="color: var(--amber); margin-bottom: 0.5rem;"><i class="fa-solid fa-users-viewfinder"></i> Phân Vai Giao Tiếp:</h4>
        <ul class="feature-list">
          <li><i class="fa-solid fa-user-graduate"></i> <strong>Với Giáo sư/Cô Wang (王老师):</strong> Sử dụng đại từ kính ngữ <code>您</code> (nín hǎo).</li>
          <li><i class="fa-solid fa-robot"></i> <strong>Với Trợ lý AI Xiaoyu (小语):</strong> Xưng hô thân thiện <code>你</code> (nǐ hǎo).</li>
          <li><i class="fa-solid fa-school"></i> <strong>Với Bạn học & Toàn trường:</strong> Dùng <code>同学</code>, <code>大家</code> (dàjiā hǎo).</li>
        </ul>
      </div>
    `
  },
  {
    id: 3,
    stage: "Giai Đoạn 2",
    stageBadgeClass: "badge-stage2",
    type: "AI RUBRIC 3 TRỤC",
    title: "Slide 3: Tiêu Chí Chấm Điểm & Micro-Credential",
    content: `
      <h3>📊 AI Rubric 3 Trục Đo Lường Năng Lực:</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
        <div style="background: rgba(99,102,241,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-glow);">
          <h4 style="color: var(--cyan);">(1) Đại từ kính ngữ 您</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Đánh giá việc chọn đúng <code>您</code> cho Giáo sư Wang và <code>你</code> cho AI/bạn học.</p>
        </div>
        <div style="background: rgba(168,85,247,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-glow);">
          <h4 style="color: var(--secondary);">(2) Thanh điệu chuẩn</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Đánh giá độ chính xác thanh điệu (nǐ hǎo, nín hǎo, xièxie, zàijiàn).</p>
        </div>
        <div style="background: rgba(16,185,129,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-glow);">
          <h4 style="color: var(--emerald);">(3) Phản xạ tự nhiên</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Độ nhạy đáp lời chào, câu cảm ơn (不客气) và tạm biệt (再见).</p>
        </div>
      </div>

      <div style="margin-top: 1.5rem; text-align: center; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); padding: 1rem; border-radius: 12px;">
        <strong style="color: #fcd34d; font-size: 1.1rem;"><i class="fa-solid fa-award"></i> Ngưỡng Đo Lường:</strong>
        <span style="color: var(--text-main);"> Học viên phải đạt <strong>≥ 80% điểm Rubric</strong> để được cấp Micro-Credential.</span>
      </div>
    `
  },
  {
    id: 4,
    stage: "Giai Đoạn 3",
    stageBadgeClass: "badge-stage3",
    type: "JUST-IN-TIME CONTENT",
    title: "Slide 4: Học Liệu Vừa Đủ 1 - Xưng Hô Trường Học",
    content: `
      <h3>📚 Học Liệu Tinh Gọn (Từ Vựng Xưng Hô Cốt Lõi):</h3>
      <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
        <div class="vocab-card" style="flex: 1; min-width: 130px;">
          <div class="vocab-hanzi">王老师 / 您</div>
          <div class="vocab-pinyin">Wáng lǎoshī / nín</div>
          <div class="vocab-meaning">Cô Wang / Ngài (Kính ngữ)</div>
          <button class="audio-btn" onclick="speakChinese('王老师，您好')"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div class="vocab-card" style="flex: 1; min-width: 130px;">
          <div class="vocab-hanzi">同学 / 大家</div>
          <div class="vocab-pinyin">tóngxué / dàjiā</div>
          <div class="vocab-meaning">Bạn học / Mọi người</div>
          <button class="audio-btn" onclick="speakChinese('同学们好，大家好')"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
  },
  {
    id: 5,
    stage: "Giai Đoạn 3",
    stageBadgeClass: "badge-stage3",
    type: "JUST-IN-TIME CONTENT",
    title: "Slide 5: Học Liệu Vừa Đủ 2 - Chào Hỏi, Cảm Ơn & Tạm Biệt",
    content: `
      <h3>📚 Nạp Học Liệu Tinh Gọn (Mẫu Câu Giao Tiếp):</h3>
      <ul class="feature-list" style="font-size: 1rem; margin-top: 1rem;">
        <li><i class="fa-solid fa-message"></i> <strong>你好！ (nǐ hǎo):</strong> Chào bạn / Chào Xiaoyu!</li>
        <li><i class="fa-solid fa-message"></i> <strong>王老师，您好！ (Wáng lǎoshī, nín hǎo):</strong> Em chào Giáo sư/Cô Wang!</li>
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
    title: "Slide 6: Luyện Âm Tiết Rao口令 (Tongue Twister)",
    content: `
      <h3>🎙️ Luyện Phát Âm & Thanh Điệu Rõ Ràng:</h3>
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
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Trình duyệt không hỗ trợ Web Speech API.');
  }
}

// 4. AI Xiaoyu Chat & Rubric Simulator (School Context)
const aiResponses = [
  { keywords: ['你好', 'hello', 'hi'], reply: '你好！欢迎来到学校！我是AI助教小语。请问您怎么称呼？', pinyin: 'Nǐ hǎo! Huānyíng lái dào xuéxiào!' },
  { keywords: ['王老师', '老师', 'nín', '您'], reply: '王老师好！同学们好！新学期开学第一天，祝大家学习进步！', pinyin: 'Wáng lǎoshī hǎo! Tóngxuémen hǎo!' },
  { keywords: ['谢谢', 'xièxie'], reply: '不客气！大家一起加油！', pinyin: 'Bú kèqi! Dàjiā yìqǐ jiāyóu!' },
  { keywords: ['再见', 'zàijiàn'], reply: '再见！明天见！', pinyin: 'Zàijiàn! Míngtiān jiàn!' }
];

let lastAIMessage = "你好！我是AI助教小语。欢迎来到学校！开学第一天，请问您怎么称呼？";

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

  // Simulate AI response
  setTimeout(() => {
    let replyObj = aiResponses.find(r => r.keywords.some(kw => msgText.toLowerCase().includes(kw))) || {
      reply: '收到！在学校要互相帮助，礼貌问好哦！(Đã nhận! Ở trường chúng ta cùng hỏi thăm lịch sự nhé!)'
    };

    lastAIMessage = replyObj.reply;

    const aiDiv = document.createElement('div');
    aiDiv.className = 'msg msg-ai';
    aiDiv.innerHTML = `<strong>AI 小语:</strong> ${replyObj.reply}`;
    chatContainer.appendChild(aiDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    speakChinese(replyObj.reply);

    // Dynamic Rubric adjustment
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
    badgeElem.innerHTML = `<i class="fa-solid fa-certificate"></i> Đạt Ngưỡng ${total}% (Cấp Micro-Credential)`;
    badgeElem.style.color = "var(--emerald)";
  } else {
    badgeElem.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Chưa Đạt Ngưỡng 80% (Cần Cải Thiện)`;
    badgeElem.style.color = "var(--amber)";
  }
}

function generateCertificateModal() {
  const total = document.getElementById('total-rubric-score').innerText;
  alert(`🏆 CHỨNG CHỈ MICRO-CREDENTIAL\n\nBài Học: HSK 1 Bài 1 (AI小语，你好！)\nBối Cảnh: Môi trường Trường học (Học sinh, Giáo sư Wang & AI Xiaoyu)\nĐiểm AI Rubric: ${total}\nTrạng Thái: ĐÃ ĐẠT CHUẨN ĐẦU RA UBD (≥80%)\n\nChúc mừng bạn đã chinh phục thành công Performance Task trong ngày học đầu tiên!`);
}

// 5. Vocabulary Cards Vault Generator
const vocabVaultData = [
  { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào (Hello)" },
  { hanzi: "王老师", pinyin: "Wáng lǎoshī", meaning: "Giáo sư / Cô giáo Wang" },
  { hanzi: "请问", pinyin: "qǐngwèn", meaning: "Xin hỏi (Excuse me)" },
  { hanzi: "大家", pinyin: "dàjiā", meaning: "Mọi người / Toàn trường" },
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
