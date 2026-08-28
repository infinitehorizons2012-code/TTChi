// Pure JavaScript Self-Contained Educational Engine for HSK 1 Lesson 1 (NO AI API REQUIRED)

// 1. Tab Switcher
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. Web Speech API (Native Browser Speech Synthesis - No API Key Needed)
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

// 3. Calibration State Manager ([V], [?], [X])
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

// 4. Pure JS Root Cause Analysis & Transfer Test Engine (No AI API Key Required)
const questionMeta = {
  1: {
    skill: "Nghe (Listening)",
    correct: "B",
    causeType: "Distractor Trap (Bẫy nhầm biến điệu chữ 不)",
    action: "Ghi nhớ quy tắc: Chữ 不 (bù) mang thanh 4 gốc. Khi đứng trước một âm tiết mang thanh 4 (như chữ 客 kè trong 客气), 不 bắt buộc phải biến điệu đọc thành thanh 2 (bú kèqi).",
    rule: "不 (bù) + Thanh 4 ⟶ bú + Thanh 4",
    transferVariants: [
      "A: 谢谢你！ - B: 不客气！ (bú kèqi)",
      "A: 你是老师吗？ - B: 不是！ (bú shì)",
      "A: 你去吗？ - B: 不去！ (bú qù)"
    ]
  },
  2: {
    skill: "Nói (Speaking Etiquette)",
    correct: "B",
    causeType: "Grammar & Honorific Deficit (Gãy kính ngữ 您)",
    action: "Phân biệt đối tượng: Dùng kính ngữ 您 (nín) khi chào người bề trên/Giáo sư Wang; Dùng 你 (nǐ) cho AI Xiaoyu hoặc bạn học.",
    rule: "Bề trên (王老师) + 您好 (nín hǎo)",
    transferVariants: [
      "Chào Giáo sư Wang ngày đầu trường học: 王老师，您好！ (Wáng lǎoshī, nín hǎo!)",
      "Chào Cô giáo Tiếng Trung: 老师，您好！ (Lǎoshī, nín hǎo!)",
      "Cảm ơn Giáo sư Wang: 谢谢您，王老师！ (Xièxie nín, Wáng lǎoshī!)"
    ]
  },
  3: {
    skill: "Đọc (Reading Etiquette)",
    correct: "B",
    causeType: "Vocabulary & Functional Reflex Gap (Lỗ hổng từ vựng đáp lời)",
    action: "Học cặp câu phản xạ chuẩn: Khi người khác cảm ơn '谢谢你！' (Xièxie nǐ!), câu đáp lại lịch sự bắt buộc là '不客气！' (Bú kèqi!).",
    rule: "谢谢！ ⟶ Đáp lại: 不客气！",
    transferVariants: [
      "A: 谢谢您，王老师！ ⟶ B: 不客气！ (Bú kèqi!)",
      "A: 谢谢大家！ ⟶ B: 不客气！ (Bú kèqi!)",
      "A: 谢谢你们！ ⟶ B: 不客气！ (Bú kèqi!)"
    ]
  },
  4: {
    skill: "Viết (Writing Word Order)",
    correct: "A",
    causeType: "Time & Word Order Constraint (Trật tự từ câu chào tập thể)",
    action: "Quy tắc trật tự từ tiếng Trung: Danh từ chỉ tập thể (同学们 / 大家 / 你们) phải đứng TRƯỚC từ '好'.",
    rule: "[Tập thể: 同学们 / 大家 / 你们] + 好",
    transferVariants: [
      "Chào tập thể bạn học: 同学们好！ (Tóngxuémen hǎo!)",
      "Chào toàn thể mọi người: 大家好！ (Dàjiā hǎo!)",
      "Chào các bạn: 你们好！ (Nǐmen hǎo!)"
    ]
  }
};

function runPureJSEvaluator() {
  const q1Ans = document.querySelector('input[name="js_q1"]:checked')?.value;
  const q2Ans = document.querySelector('input[name="js_q2"]:checked')?.value;
  const q3Ans = document.querySelector('input[name="js_q3"]:checked')?.value;
  const q4Ans = document.querySelector('input[name="js_q4"]:checked')?.value;

  const userAnswers = { 1: q1Ans, 2: q2Ans, 3: q3Ans, 4: q4Ans };
  let errorLogCardsHTML = '';
  let correctCount = 0;
  let errorCount = 0;

  for (let i = 1; i <= 4; i++) {
    const meta = questionMeta[i];
    const userChoice = userAnswers[i];
    const calib = jsCalibData[i] || '?';
    const isCorrectChoice = userChoice === meta.correct;
    const isCalibV = calib === 'V';
    
    // An item is considered an ERROR or GUESS if choice is wrong OR calibration is [?] or [X]
    const needsRemediation = !isCorrectChoice || !isCalibV;

    if (!needsRemediation) {
      correctCount++;
    } else {
      errorCount++;
      const statusText = !isCorrectChoice ? "LÀM SAI ĐÁP ÁN" : `ĐOÁN TRÚNG (Calibration [${calib}])`;
      
      errorLogCardsHTML += `
        <div style="background: #fffbeb; border-left: 5px solid #d97706; padding: 1.2rem; border-radius: 16px; margin-bottom: 1.2rem; border: 1px solid #fde68a;">
          <h4 style="color: #b45309; font-size: 1.1rem; margin-bottom: 0.5rem;">
            ❌ Câu ${i} [${meta.skill}] - Trạng Thái: <span style="color: #dc2626;">${statusText}</span>
          </h4>
          <p style="font-size: 0.95rem; color: #0f172a; margin-bottom: 0.4rem;">
            • <strong>Root Cause (Nguyên nhân gốc rễ):</strong> ${meta.causeType}
          </p>
          <p style="font-size: 0.95rem; color: #334155; margin-bottom: 0.4rem;">
            • <strong>Hành động xử lý triệt để:</strong> ${meta.action}
          </p>
          <p style="font-size: 0.95rem; color: #0284c7; margin-bottom: 0.6rem;">
            • <strong>Quy tắc phân biệt cốt lõi:</strong> <code>${meta.rule}</code>
          </p>

          <div style="background: #ffffff; border: 1px dashed #cbd5e1; padding: 0.8rem 1rem; border-radius: 12px;">
            <strong style="color: #059669; font-size: 0.9rem;">🔄 3 Câu Biến Thể AI (Transfer Testing):</strong>
            <ul style="margin-left: 1.2rem; font-size: 0.9rem; color: #1e293b; margin-top: 4px;">
              ${meta.transferVariants.map(v => `<li><em>${v}</em></li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }
  }

  // Generate Summary & Spaced Retrieval 1-3-7 Schedule
  const today = new Date();
  const day1 = new Date(today); day1.setDate(today.getDate() + 1);
  const day3 = new Date(today); day3.setDate(today.getDate() + 3);
  const day7 = new Date(today); day7.setDate(today.getDate() + 7);

  const formatDate = (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  let summaryHTML = `
    <div style="background: #eef2ff; border: 2px solid #c7d2fe; padding: 1.2rem; border-radius: 16px; margin-bottom: 1.4rem;">
      <h4 style="color: #4338ca; font-size: 1.2rem; margin-bottom: 0.4rem;">
        📊 KẾT QUẢ ĐÁNH GIÁ CẢI THIỆN:
      </h4>
      <p style="font-size: 1rem; color: #1e293b;">
        • Số câu nòng cốt làm chủ 100% [V]: <strong>${correctCount} / 4 câu</strong><br>
        • Số câu rơi vào lỗ hổng / đoán mò [?][X]: <strong>${errorCount} / 4 câu</strong> (Cần đưa vào Sổ Tay Lỗi Sai)
      </p>

      <div style="margin-top: 0.8rem; background: #ffffff; padding: 0.8rem 1rem; border-radius: 10px; border: 1px solid #a5b4fc;">
        <strong style="color: #6366f1;"><i class="fa-solid fa-calendar-days"></i> Lịch Ôn Tập Lặp Lại Ngắt Quãng (Spaced Retrieval 1-3-7):</strong>
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
          Bé đã trả lời chính xác 100% các câu hỏi và tự tin gắn nhãn [V] Chắc chắn 100%. Năng lực đã đạt mức độ làm chủ hoàn toàn HSK 1 Bài 1!
        </p>
      </div>
    `;
  }

  const box = document.getElementById('js-error-log-box');
  const content = document.getElementById('js-error-log-content');
  if (box && content) {
    content.innerHTML = summaryHTML + errorLogCardsHTML;
    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth' });
  }
}

// Explicit Event Binding setup
document.addEventListener('DOMContentLoaded', () => {
  // Select first tab default
  const defaultTabBtn = document.querySelector('.tab-btn');
  if (defaultTabBtn) switchPageTab('theory-tab', defaultTabBtn);
});
