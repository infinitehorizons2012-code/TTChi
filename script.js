// Interactive Application Logic for UbD + AI HSK1 Lesson 1 App (Kids Bright White Edition)

// 1. Navigation Tab Controller (Bulletproof Cross-Browser Implementation)
function switchSection(sectionId, el) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => {
    sec.classList.remove('active');
    sec.style.display = 'none';
  });

  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  const targetSec = document.getElementById(sectionId);
  if (targetSec) {
    targetSec.style.display = 'block';
    targetSec.classList.add('active');
  }

  if (el && el.classList) {
    el.classList.add('active');
  } else {
    const activeBtn = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. Restructured UbD Slide Deck Data (Refined Kids Bright White Theme)
const slidesData = [
  {
    id: 1,
    stage: "Giai Đoạn 1",
    stageBadgeClass: "badge-stage1",
    type: "CLO & ESSENTIAL QUESTION",
    title: "Slide 1: Kết Quả Mong Muốn (Desired Results)",
    content: `
      <h3>🎯 CLO Cốt Lõi:</h3>
      <p style="font-size: 1.1rem; color: #0f172a; font-weight: 600;">
        Chào hỏi, tạm biệt và cảm ơn trong môi trường trường học (Học sinh, cô giáo & Trợ lý AI).
      </p>

      <h3 style="margin-top: 1.2rem;">🌸 Nét Văn Hóa Xưng Hô:</h3>
      <p style="color: #0284c7; font-weight: 700;">
        Phân biệt chính xác quy tắc xưng hô <code>你</code> (bạn/AI) vs <code>您</code> (cấp trên/kính trọng) & <code>你们</code> (các bạn).
      </p>

      <div style="background: #eef2ff; padding: 1.2rem; border-radius: 16px; border-left: 5px solid #6366f1; margin-top: 1.2rem;">
        <strong style="color: #4338ca;">💡 Essential Question (EQ):</strong><br>
        <em style="font-size: 1.05rem; color: #3730a3;">
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
      <p style="font-size: 1.1rem; color: #0f172a; font-weight: 600; line-height: 1.5;">
        Đóng vai chào hỏi, tạm biệt và cảm ơn Giáo sư Wang, Trợ lý AI Xiaoyu và các bạn học sinh (学生) trong phạm vi mẫu câu Bài 1 (开学第一天).
      </p>

      <div style="margin-top: 1.2rem; background: #ffffff; padding: 1.2rem; border-radius: 16px; border: 2px solid #e2e8f0;">
        <h4 style="color: #d97706; margin-bottom: 0.5rem;"><i class="fa-solid fa-users-viewfinder"></i> Phạm Vi Mẫu Câu Bài 1 (Không dùng ngữ pháp chưa học):</h4>
        <ul class="feature-list">
          <li><i class="fa-solid fa-user-graduate"></i> <strong>Chào Giáo sư/Cô Wang:</strong> <code>王老师，您好！</code> (Wáng lǎoshī, nín hǎo!).</li>
          <li><i class="fa-solid fa-robot"></i> <strong>Chào Trợ lý AI Xiaoyu:</strong> <code>你好！ / 小语，你好！</code> (nǐ hǎo!).</li>
          <li><i class="fa-solid fa-school"></i> <strong>Chào Học sinh & Tập thể:</strong> <code>同学们好！ / 大家好！ / 你们好！</code></li>
          <li><i class="fa-solid fa-heart"></i> <strong>Cảm ơn & Tạm biệt:</strong> <code>谢谢！ - 不客气！ / 再见！</code></li>
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
      <h3>📊 AI Rubric 3 Trục Đo Lường Năng Lực (Bài 1 Scope):</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
        <div style="background: #ecfeff; padding: 1rem; border-radius: 16px; border: 2px solid #a5f3fc;">
          <h4 style="color: #0891b2;">(1) Đại từ kính ngữ 您 / 你们</h4>
          <p style="font-size: 0.88rem; color: #334155;">Chọn đúng <code>您</code> cho Giáo sư Wang và <code>你们</code> / <code>你</code> cho AI/bạn học.</p>
        </div>
        <div style="background: #f3e8ff; padding: 1rem; border-radius: 16px; border: 2px solid #e9d5ff;">
          <h4 style="color: #7e22ce;">(2) Thanh điệu chuẩn (3+3 & Biến điệu 不)</h4>
          <p style="font-size: 0.88rem; color: #334155;">Biến điệu 3+3 (nǐ hǎo → ní hǎo) & Biến điệu 不 (bù kèqi → bú kèqi).</p>
        </div>
        <div style="background: #ecfdf5; padding: 1rem; border-radius: 16px; border: 2px solid #a7f3d0;">
          <h4 style="color: #059669;">(3) Phản xạ 3 chức năng Bài 1</h4>
          <p style="font-size: 0.88rem; color: #334155;">Chào hỏi, Cảm ơn (不客气) và Tạm biệt (再见) chuẩn mẫu câu Bài 1.</p>
        </div>
      </div>

      <div style="margin-top: 1.5rem; text-align: center; background: #fffbeb; border: 2px solid #fde68a; padding: 1rem; border-radius: 16px;">
        <strong style="color: #b45309; font-size: 1.1rem;"><i class="fa-solid fa-award"></i> Ngưỡng Đo Lường:</strong>
        <span style="color: #1e293b;"> Học viên phải đạt <strong>≥ 80% điểm Rubric</strong> để được cấp Micro-Credential.</span>
      </div>
    `
  },
  {
    id: 4,
    stage: "Giai Đoạn 3",
    stageBadgeClass: "badge-stage3",
    type: "JIT VOCAB & PATTERNS",
    title: "Slide 4: Từ Vựng & Mẫu Câu Vừa Đủ Chuẩn Bài 1",
    content: `
      <h3>📚 Học Liệu JIT Chuẩn Bài 1 (Không dùng từ chưa học):</h3>
      <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
        <div style="background: #ecfeff; border: 2px solid #a5f3fc; padding: 1rem; border-radius: 14px;">
          <h4 style="color: #0891b2;"><i class="fa-solid fa-user-tie"></i> 1. Với Bề Trên (Giáo sư Wang - 王老师):</h4>
          <p style="color: #0f172a; font-size: 0.95rem;">• Chào: <strong>王老师，您好！</strong> (Wáng lǎoshī, nín hǎo!)</p>
          <p style="color: #0f172a; font-size: 0.95rem;">• Cảm ơn: <strong>谢谢您，王老师！</strong> (Xièxie nín, Wáng lǎoshī!)</p>
          <p style="color: #0f172a; font-size: 0.95rem;">• Tạm biệt: <strong>王老师，再见！</strong> (Wáng lǎoshī, zàijiàn!)</p>
        </div>
        <div style="background: #eef2ff; border: 2px solid #c7d2fe; padding: 1rem; border-radius: 14px;">
          <h4 style="color: #4338ca;"><i class="fa-solid fa-robot"></i> 2. Với AI & Bạn Bè (Trợ lý AI Xiaoyu - 小语):</h4>
          <p style="color: #0f172a; font-size: 0.95rem;">• Chào: <strong>你好！ / 小语，你好！</strong> (nǐ hǎo!)</p>
          <p style="color: #0f172a; font-size: 0.95rem;">• Cảm ơn & Đáp: <strong>谢谢！ - 不客气！</strong> (Xièxie! - Bú kèqi!)</p>
          <p style="color: #0f172a; font-size: 0.95rem;">• Tạm biệt: <strong>再见！</strong> (Zàijiàn!)</p>
        </div>
        <div style="background: #f3e8ff; border: 2px solid #e9d5ff; padding: 1rem; border-radius: 14px;">
          <h4 style="color: #7e22ce;"><i class="fa-solid fa-users"></i> 3. Với Học Sinh & Tập Thể (学生, 你们, 同学, 大家):</h4>
          <p style="color: #0f172a; font-size: 0.95rem;">• Chào tập thể: <strong>你们好！ / 同学们好！ / 大家好！</strong> (Nǐmen hǎo! / Tóngxuémen hǎo! / Dàjiā hǎo!)</p>
          <p style="color: #0f172a; font-size: 0.95rem;">• Cảm ơn tập thể: <strong>谢谢大家！ / 谢谢你们！</strong> (Xièxie dàjiā! / Xièxie nǐmen!)</p>
        </div>
      </div>
    `
  },
  {
    id: 5,
    stage: "Giai Đoạn 3",
    stageBadgeClass: "badge-stage3",
    type: "TONE SANDHI 3+3 & BU",
    title: "Slide 5: Quy Tắc Biến Điệu Thanh Điệu (3+3 & Biến Điệu chữ 不)",
    content: `
      <h3>🎶 Quy Tắc Phối Âm & Biến Điệu Cốt Lõi:</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
        <div style="background: #fffbeb; border: 2px solid #fde68a; padding: 1.2rem; border-radius: 16px;">
          <h4 style="color: #b45309;"><i class="fa-solid fa-wave-square"></i> 1. Biến Điệu 3+3 (Tone Sandhi 3+3)</h4>
          <p style="font-size: 0.9rem; color: #334155; margin-top: 0.5rem;">
            Khi 2 thanh 3 đi liền nhau: <strong>Thanh 3 thứ nhất chuyển thành Thanh 2</strong> (hướng lên).
          </p>
          <div style="background: #ffffff; border: 1px solid #fcd34d; padding: 0.8rem; border-radius: 10px; margin-top: 0.8rem; text-align: center;">
            <strong style="color: #0891b2; font-size: 1.1rem;">你 (nǐ) + 好 (hǎo) → <code>ní hǎo</code> (你好)</strong>
          </div>
          <button type="button" class="btn btn-secondary" style="margin-top: 0.8rem; width: 100%; justify-content: center;" onclick="speakChinese('你好')">
            <i class="fa-solid fa-volume-high"></i> Nghe Biến Điệu ní hǎo
          </button>
        </div>

        <div style="background: #ecfdf5; border: 2px solid #a7f3d0; padding: 1.2rem; border-radius: 16px;">
          <h4 style="color: #047857;"><i class="fa-solid fa-bolt"></i> 2. Biến Điệu Chữ 不 (Tone Sandhi of 不)</h4>
          <p style="font-size: 0.9rem; color: #334155; margin-top: 0.5rem;">
            Chữ <strong>不 (bù)</strong> mang thanh 4 gốc. Khi đi trước âm mang <strong>Thanh 4 (như 客 kè)</strong>, <strong>不</strong> biến thành <strong>Thanh 2 (bú)</strong>!
          </p>
          <div style="background: #ffffff; border: 1px solid #6ee7b7; padding: 0.8rem; border-radius: 10px; margin-top: 0.8rem; text-align: center;">
            <strong style="color: #059669; font-size: 1.1rem;">不 (bù) + 客气 (kèqi) → <code>bú kèqi</code> (不客气)</strong>
          </div>
          <button type="button" class="btn btn-secondary" style="margin-top: 0.8rem; width: 100%; justify-content: center;" onclick="speakChinese('不客气')">
            <i class="fa-solid fa-volume-high"></i> Nghe Biến Điệu bú kèqi
          </button>
        </div>
      </div>
    `
  },
  {
    id: 6,
    stage: "Giai Đoạn 3",
    stageBadgeClass: "badge-stage3",
    type: "PHONETICS DRILL",
    title: "Slide 6: Luyện Âm Tiết Rao口令 (Tongue Twister)",
    content: `
      <h3>🎙️ Luyện Âm Tiết & Thanh Điệu Phản Xạ:</h3>
      <div style="background: #fffbeb; border: 2px solid #fde68a; padding: 1.5rem; border-radius: 16px; text-align: center; margin-top: 1rem;">
        <h2 style="font-family: 'Noto Sans SC'; color: #d97706;">Mā zhòng má, wǒ fàng mǎ. Mǎ chī má, mā mà mǎ.</h2>
        <p style="color: #64748b; margin: 0.8rem 0;">(妈种麻，我放马。马吃麻，妈骂马。)</p>
        <button type="button" class="btn btn-primary" onclick="speakChinese('妈种麻，我放马。马吃麻，妈骂马。')">
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

// 4. AI Xiaoyu Chat & Rubric Simulator (School Context - Strict Lesson 1 Scope)
const aiResponses = [
  { keywords: ['你好', 'hello', 'hi'], reply: '你好！王老师好！同学们好！我是AI助教小语。', pinyin: 'Nǐ hǎo! Wáng lǎoshī hǎo! Tóngxuémen hǎo!' },
  { keywords: ['王老师', '老师', 'nín', '您'], reply: '王老师，您好！同学们好！', pinyin: 'Wáng lǎoshī, nín hǎo! Tóngxuémen hǎo!' },
  { keywords: ['谢谢', 'xièxie'], reply: '不客气！', pinyin: 'Bú kèqi!' },
  { keywords: ['再见', 'zàijiàn'], reply: '再见！同学们再见！', pinyin: 'Zàijiàn! Tóngxuémen zàijiàn!' }
];

let lastAIMessage = "你好！王老师好！同学们好！我是AI助教小语。";

function speakCurrentAIMessage() {
  speakChinese(lastAIMessage);
}

function sendUserChatMessage() {
  const input = document.getElementById('user-chat-input');
  if (!input) return;
  const msgText = input.value.trim();
  if (!msgText) return;

  const chatContainer = document.getElementById('chat-messages-list');
  if (!chatContainer) return;

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
      reply: '你好！ (Xin chào! Hãy dùng các mẫu câu Chào, Cảm ơn, Tạm biệt của Bài 1 nhé!)'
    };

    lastAIMessage = replyObj.reply;

    const aiDiv = document.createElement('div');
    aiDiv.className = 'msg msg-ai';
    aiDiv.innerHTML = `<strong>AI 小语:</strong> ${replyObj.reply}`;
    chatContainer.appendChild(aiDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    speakChinese(replyObj.reply);

    // Dynamic Rubric adjustment
    if (msgText.includes('您') || msgText.includes('王老师') || msgText.includes('你们')) {
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
  const honorificElem = document.getElementById('slider-honorific');
  const phoneticsElem = document.getElementById('slider-phonetics');
  const reflexElem = document.getElementById('slider-reflex');
  if (!honorificElem || !phoneticsElem || !reflexElem) return;

  const honorific = parseInt(honorificElem.value);
  const phonetics = parseInt(phoneticsElem.value);
  const reflex = parseInt(reflexElem.value);

  document.getElementById('val-honorific').innerText = `${honorific}%`;
  document.getElementById('val-phonetics').innerText = `${phonetics}%`;
  document.getElementById('val-reflex').innerText = `${reflex}%`;

  const total = Math.round((honorific * 0.4) + (phonetics * 0.3) + (reflex * 0.3));
  const totalElem = document.getElementById('total-rubric-score');
  if (totalElem) totalElem.innerText = `${total} / 100`;

  const badgeElem = document.getElementById('rubric-status-badge');
  if (badgeElem) {
    if (total >= 80) {
      badgeElem.innerHTML = `<i class="fa-solid fa-certificate"></i> Đạt Ngưỡng ${total}% (Cấp Micro-Credential)`;
      badgeElem.style.color = "#059669";
    } else {
      badgeElem.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Chưa Đạt Ngưỡng 80% (Cần Cải Thiện)`;
      badgeElem.style.color = "#d97706";
    }
  }
}

function generateCertificateModal() {
  const totalElem = document.getElementById('total-rubric-score');
  const total = totalElem ? totalElem.innerText : '85 / 100';
  alert(`🏆 CHỨNG CHỈ MICRO-CREDENTIAL\n\nBài Học: HSK 1 Bài 1 (AI小语，你好！)\nBối Cảnh: Mẫu câu chuẩn Bài 1 (Giáo sư Wang, Học sinh 学生, 你们 & AI Xiaoyu)\nKỹ Năng: Giao tiếp vai vế + Biến điệu 3+3 (ní hǎo) & Biến điệu chữ 不 (bú kèqi)\nĐiểm AI Rubric: ${total}\nTrạng Thái: ĐÃ ĐẠT CHUẨN ĐẦU RA UBD (≥80%)\n\nChúc mừng bạn đã chinh phục thành công Performance Task trong ngày học đầu tiên!`);
}

// 5. Calibration & Error-Driven Engine Implementation
const calibState = { 1: '?', 2: '?', 3: '?' };

function setCalibration(qNum, state) {
  calibState[qNum] = state;
  const label = document.getElementById(`calib-label-${qNum}`);
  if (label) {
    if (state === 'V') {
      label.innerText = '[V] Chắc chắn 100%';
      label.style.color = '#059669';
    } else if (state === '?') {
      label.innerText = '[?] Phân vân 50/50';
      label.style.color = '#d97706';
    } else if (state === 'X') {
      label.innerText = '[X] Đoán mò 100%';
      label.style.color = '#dc2626';
    }
  }
}

function evaluateErrorDrivenTest() {
  const q1Ans = document.querySelector('input[name="q1"]:checked')?.value;
  const q2Ans = document.querySelector('input[name="q2"]:checked')?.value;
  const q3Ans = document.querySelector('input[name="q3"]:checked')?.value;

  const correctAnswers = { 1: 'B', 2: 'B', 3: 'A' };
  const userAnswers = { 1: q1Ans, 2: q2Ans, 3: q3Ans };

  let errorLogsHTML = '';

  for (let i = 1; i <= 3; i++) {
    const isCorrectChoice = userAnswers[i] === correctAnswers[i];
    const isCalibV = calibState[i] === 'V';
    const isErrorOrGuess = !isCorrectChoice || !isCalibV;

    if (isErrorOrGuess) {
      let cause = '';
      let action = '';
      let rule = '';
      let sample = '';

      if (i === 1) {
        cause = 'Distractor Trap (Bẫy nhầm thanh điệu chữ 不)';
        action = 'Ôn lại quy tắc: 不 (bù) đi trước thanh 4 (kèqi) biến thành bú (bú kèqi).';
        rule = '不 (bù) + Thanh 4 ⟶ bú + Thanh 4';
        sample = 'A: 谢谢你！ - B: 不客气！(bú kèqi)';
      } else if (i === 2) {
        cause = 'Grammar & Etiquette Deficit (Gãy quy tắc kính ngữ 您)';
        action = 'Phân biệt: 你 cho bạn bè/AI; 您 cho bề trên/Giáo sư Wang.';
        rule = 'Bề trên (王老师) + 您好 (nín hǎo)';
        sample = '王老师，您好！ (Wáng lǎoshī, nín hǎo!)';
      } else if (i === 3) {
        cause = 'Time & Word Order Constraint (Trật tự từ xưng hô tập thể)';
        action = 'Trật tự câu chào tập thể: [Danh từ tập thể] + 好';
        rule = '同学们 / 大家 / 你们 + 好';
        sample = '同学们好！ / 大家好！';
      }

      errorLogsHTML += `
        <div style="background: #fffbeb; border-left: 5px solid #d97706; padding: 1rem; border-radius: 12px; margin-bottom: 1rem;">
          <h4 style="color: #b45309;">❌ Câu ${i} [Trạng thái: ${calibState[i]}] - Root Cause: ${cause}</h4>
          <p style="font-size: 0.9rem; color: #0f172a; margin-top: 4px;">• <strong>Hành động xử lý:</strong> ${action}</p>
          <p style="font-size: 0.9rem; color: #0891b2; margin-top: 2px;">• <strong>Quy tắc cốt lõi:</strong> <code>${rule}</code></p>
          <p style="font-size: 0.9rem; color: #059669; margin-top: 2px;">• <strong>Đề biến thể AI (Transfer Test):</strong> <em>${sample}</em></p>
        </div>
      `;
    }
  }

  if (!errorLogsHTML) {
    errorLogsHTML = `<p style="color: #059669; font-weight: 700;">🎉 Xuất sắc! Bạn làm đúng 100% tất cả các câu và gắn nhãn [V] Chắc chắn. Đã đạt mức độ làm chủ kiến thức Bài 1!</p>`;
  }

  const logBox = document.getElementById('active-error-log-box');
  const logContent = document.getElementById('error-log-content');
  if (logBox && logContent) {
    logContent.innerHTML = errorLogsHTML;
    logBox.style.display = 'block';
    logBox.scrollIntoView({ behavior: 'smooth' });
  }
}

// System Prompt Copier for ChatGPT/Gemini Evaluator (Strict Lesson 1 Scope Constraint)
function copyAIEvaluatorPrompt() {
  const systemPrompt = `[SYSTEM PROMPT: AI EVALUATOR & ROLEPLAY BOT - HSK 1 LESSON 1 STRICT SCOPE]

You are "AI助教小语" (AI Xiaoyu Assistant) at a Chinese Language School on the First Day of School (开学第一天).
You act as an interactive conversation partner and a strict Pedagogical AI Evaluator based on Backward Design (UbD) Stage 2 Rubric.

STRICT LESSON 1 SCOPE CONSTRAINTS:
The student is a COMPLETE BEGINNER (0% previous knowledge) currently learning HSK 1 Lesson 1 ONLY.
Target Vocabulary Available: 你, 您, 你们, 王老师, 学生, 同学, 大家, 好, 谢谢, 不客气, 再见.
UN-TAUGHT GRAMMAR NOT ALLOWED TO EXPECT: Do NOT ask the student to introduce themselves using un-taught verbs like "是" (shì - to be) or "叫" (jiào - to be named), such as "我是..." or "我叫...".
Only expect and prompt for the exact 3 functional sentence patterns taught in Lesson 1:
1. Greetings: "王老师，您好！" / "你好！" / "大家好！" / "同学们好！" / "你们好！"
2. Thanking: "谢谢！" / "谢谢您！" / "谢谢大家！" ⟶ Response: "不客气！"
3. Farewells: "再见！" / "王老师，再见！"

YOUR DUAL ROLE:
1. INTERACTIVE MODE: Start by greeting the user strictly within Lesson 1 scope:
   "你好！王老师好！同学们好！我是AI助教小语。"
2. EVALUATOR MODE: Track and grade the student across 3 Rubric Axes (Max 100 pts):
   - Axis 1: Honorific Choice & Role Honorifics (40 pts) [Proper use of 您 vs 你 vs 你们]
   - Axis 2: Phonetic Tone Sandhi Rules (30 pts) [3+3 tone sandhi 'ní hǎo' & '不' tone sandhi 'bú kèqi']
   - Axis 3: Functional Reflex Across 3 Tasks (30 pts) [Greetings, Thanking (不客气), Farewell (再见)]

END OF EVALUATION:
When the student says "再见" or ends the dialogue, output a formatted Rubric Report:
--------------------------------------------------
📊 AI RUBRIC ASSESSMENT REPORT (UbD Stage 2)
- Honorifics (您/你/你们): [Score]/40
- Phonetics (3+3 & bú kèqi): [Score]/30
- Functional Reflex (Chào/Cảm ơn/Tạm biệt): [Score]/30
TOTAL SCORE: [Total]/100
STATUS: [PASS (≥80) - Micro-Credential Badge Issued / RETRY (<80)]
💡 Feedback & Correction: [Detailed guidance]
--------------------------------------------------

Please confirm you are ready by initiating the first greeting in character!`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(systemPrompt).then(() => {
      alert("✅ Đã sao chép System Prompt Chấm Điểm AI (Chuẩn Bài 1)!\n\nBạn có thể dán (Ctrl+V) vào ChatGPT, Gemini hoặc Claude để test ngay!");
    }).catch(err => {
      prompt("Sao chép System Prompt dưới đây:", systemPrompt);
    });
  } else {
    prompt("Sao chép System Prompt dưới đây:", systemPrompt);
  }
}

// 6. Complete Vocabulary Cards Vault Generator (11 Words)
const vocabVaultData = [
  { hanzi: "你好", pinyin: "nǐ hǎo (ní hǎo)", meaning: "Xin chào (Biến điệu 3+3)" },
  { hanzi: "王老师", pinyin: "Wáng lǎoshī", meaning: "Giáo sư / Cô giáo Wang" },
  { hanzi: "学生", pinyin: "xuéshēng", meaning: "Học sinh (Student)" },
  { hanzi: "你们", pinyin: "nǐmen", meaning: "Các bạn (Số nhiều - Plural You)" },
  { hanzi: "请问", pinyin: "qǐngwèn", meaning: "Xin hỏi (Excuse me)" },
  { hanzi: "大家", pinyin: "dàjiā", meaning: "Mọi người / Toàn trường" },
  { hanzi: "好", pinyin: "hǎo", meaning: "Tốt / Nắng (Good)" },
  { hanzi: "您", pinyin: "nín", meaning: "Ngài / Thầy (Kính ngữ)" },
  { hanzi: "谢谢", pinyin: "xièxie", meaning: "Cảm ơn (Thank you)" },
  { hanzi: "不客气", pinyin: "bú kèqi", meaning: "Không có gì (Biến điệu 不 bù → bú)" },
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
      <button type="button" class="audio-btn" title="Phát âm ${item.hanzi}" onclick="speakChinese('${item.hanzi}')">
        <i class="fa-solid fa-volume-high"></i>
      </button>
    </div>
  `).join('');
}

// Explicit Event Binding setup
document.addEventListener('DOMContentLoaded', () => {
  renderActiveSlide();
  renderVocabVault();
  updateRubricScore();

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      if (sectionId) {
        switchSection(sectionId, this);
      }
    });
  });
});
