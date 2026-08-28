// Pure JavaScript Self-Contained Educational Engine (Question Bank, Real-Time Timer & 4 Root Causes)

// 1. Tab Switcher & Timer Manager
let timerInterval = null;
let timerSeconds = 0;

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

  // Start Real-Time Timer when entering Test Tab
  if (tabId === 'test-tab') {
    startTestTimer();
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

// 4. Expanded Question Bank (Ngân Hàng Bài Tập 4 Kỹ Năng & 4 Nhóm Lỗi Root Cause)
const questionMeta = {
  1: {
    skill: "Nghe (Listening)",
    correct: "B",
    causeType: "Distractor Trap (Bẫy nhầm biến điệu chữ 不 / 3+3)",
    action: "Ghi nhớ quy tắc: Chữ 不 (bù) mang thanh 4 gốc. Khi đứng trước một âm tiết mang thanh 4 (như chữ 客 kè trong 客气), 不 bắt buộc phải biến điệu đọc thành thanh 2 (bú kèqi).",
    rule: "不 (bù) + Thanh 4 ⟶ bú + Thanh 4",
    transferQuizzes: [
      {
        title: "Biến thể 1.1: Chọn âm biến điệu đúng khi Học sinh 2 đáp lời 'Cảm ơn':",
        options: ["A. bù kèqi", "B. bú kèqi"],
        correctIdx: 1,
        explain: "Chính xác! Học sinh 1: 谢谢你！ ⟶ Học sinh 2: 不客气！ (bú kèqi - biến điệu thanh 2 bú)."
      },
      {
        title: "Biến thể 1.2: Chọn âm biến điệu đúng cho chữ 不 trong '不是' (bú shì - không phải):",
        options: ["A. bù shì", "B. bú shì"],
        correctIdx: 1,
        explain: "Chính xác! Chữ 是 (shì) mang thanh 4 ⟶ 不 biến thành bú (bú shì)."
      }
    ]
  },
  2: {
    skill: "Nói (Speaking Etiquette)",
    correct: "B",
    causeType: "Grammar & Honorific Deficit (Gãy kính ngữ 您)",
    action: "Phân biệt đối tượng: Dùng kính ngữ 您 (nín) khi chào người bề trên/Giáo sư Wang; Dùng 你 (nǐ) cho AI Xiaoyu hoặc bạn học.",
    rule: "Bề trên (王老师) + 您好 (nín hǎo)",
    transferQuizzes: [
      {
        title: "Biến thể 2.1: Chọn câu chào thể hiện thái độ tôn kính nhất với Cô giáo (老师):",
        options: ["A. 老师，你好！", "B. 老师，您好！"],
        correctIdx: 1,
        explain: "Chính xác! Dùng kính ngữ 您 (nín) cho Thầy/Cô giáo (老师，您好！)."
      },
      {
        title: "Biến thể 2.2: Chọn câu cảm ơn đúng lịch sự với Giáo sư Wang:",
        options: ["A. 谢谢你，王老师！", "B. 谢谢您，王老师！"],
        correctIdx: 1,
        explain: "Chính xác! 谢谢您，王老师！ (Xièxie nín, Wáng lǎoshī!)."
      }
    ]
  },
  3: {
    skill: "Đọc (Reading Etiquette & Vocabulary Gap)",
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
  4: {
    skill: "Viết (Writing Word Order)",
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
};

// Interactive Option Checker for Generated Transfer Practice Questions
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

// Evaluator Execution Function (Pure JS with Timer & Speed Analysis)
function runPureJSEvaluator() {
  stopTestTimer(); // Stop timer when submitting

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

  // Check if average response time > 8 seconds per question (32s total for 4 questions)
  const isTimeConstrained = timerSeconds > 32;

  for (let i = 1; i <= 4; i++) {
    const meta = questionMeta[i];
    const userChoice = userAnswers[i];
    const calib = jsCalibData[i] || '?';
    const isCorrectChoice = userChoice === meta.correct;
    const isCalibV = calib === 'V';
    
    // Remediate if wrong answer OR tagged [?] or [X] OR time constraint exceeded
    const needsRemediation = !isCorrectChoice || !isCalibV || isTimeConstrained;

    if (!needsRemediation) {
      correctCount++;
    } else {
      errorCount++;
      missedQuestionsList.push(i);

      let statusText = "";
      if (!isCorrectChoice) statusText = "LÀM SAI ĐÁP ÁN";
      else if (!isCalibV) statusText = `ĐOÁN TRÚNG (Calibration [${calib}])`;
      else if (isTimeConstrained) statusText = `PHẢN XẠ CHẬM (Time Constraint ${timerSeconds}s > 32s)`;

      let causeDisplay = meta.causeType;
      if (isTimeConstrained && isCorrectChoice) {
        causeDisplay = "Time Constraint (Áp lực tốc độ: Làm đúng nhưng mất quá 8s/câu)";
      }
      
      // Build 4-line Active Error Log Card
      errorLogCardsHTML += `
        <div style="background: #fffbeb; border-left: 5px solid #d97706; padding: 1.2rem; border-radius: 16px; margin-bottom: 1.2rem; border: 1px solid #fde68a;">
          <h4 style="color: #b45309; font-size: 1.1rem; margin-bottom: 0.5rem;">
            ❌ Câu ${i} [${meta.skill}] - Trạng Thái: <span style="color: #dc2626;">${statusText}</span>
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

      // Build Interactive Transfer Practice Quizzes for this question
      meta.transferQuizzes.forEach((tz, quizIdx) => {
        transferPracticeHTML += `
          <div class="transfer-quiz-card">
            <div class="transfer-quiz-title">
              <i class="fa-solid fa-pen-clip"></i> BÀI TẬP BIẾN THỂ TƯƠNG TÁC ${i}.${quizIdx + 1}: ${tz.title}
            </div>
            <div class="transfer-opts">
              ${tz.options.map((optText, optIdx) => `
                <button type="button" class="transfer-opt-btn" onclick="checkTransferAnswer(${i}, ${quizIdx}, ${optIdx}, ${tz.correctIdx}, this, '${tz.explain}')">
                  ${optText}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      });
    }
  }

  // Save Spaced Retrieval Schedule to LocalStorage for Automatic Daily Reviews
  const todayStr = new Date().toISOString().split('T')[0];
  const storageData = {
    lastTestDate: todayStr,
    missedQuestions: missedQuestionsList
  };
  try {
    localStorage.setItem('hsk1_ubd_spaced_db', JSON.stringify(storageData));
  } catch (e) {}

  // Generate Spaced Retrieval Dates
  const today = new Date();
  const day1 = new Date(today); day1.setDate(today.getDate() + 1);
  const day3 = new Date(today); day3.setDate(today.getDate() + 3);
  const day7 = new Date(today); day7.setDate(today.getDate() + 7);
  const formatDate = (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  let timeWarningNote = isTimeConstrained ? `<p style="color: #dc2626; font-weight: 700; margin-top: 4px;">⏱️ Cảnh báo tốc độ: Tổng thời gian làm bài là ${timerSeconds} giây (> 32s cho 4 câu). Đã kích hoạt bài tập rèn phản xạ tốc độ (Time Constraint)!</p>` : `<p style="color: #047857; font-weight: 700; margin-top: 4px;">⚡ Tốc độ tuyệt vời: Làm xong trong ${timerSeconds} giây (Đạt chuẩn < 8s/câu)!</p>`;

  let summaryHTML = `
    <div style="background: #eef2ff; border: 2px solid #c7d2fe; padding: 1.2rem; border-radius: 16px; margin-bottom: 1.4rem;">
      <h4 style="color: #4338ca; font-size: 1.2rem; margin-bottom: 0.4rem;">
        📊 KẾT QUẢ ĐÁNH GIÁ CẢI THIỆN:
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
          Bé đã trả lời chính xác 100% các câu hỏi trong ${timerSeconds}s và tự tin gắn nhãn [V] Chắc chắn 100%. Năng lực đã đạt mức độ làm chủ hoàn toàn HSK 1 Bài 1!
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

// 5. Dynamic Question Bank Shuffle Generator
function shuffleAndGenerateNewTestSet() {
  alert("🔄 Đã sinh Bộ Đề Biến Thể Mới từ Ngân Hàng Bài Tập!\n\nThời gian đếm ngược đếm lại từ 0s. Chúc bé làm bài tốt!");
  startTestTimer();
  
  // Uncheck radios & reset calibration badges to default
  document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
  const logBox = document.getElementById('js-error-log-box');
  if (logBox) logBox.style.display = 'none';
}

// 6. Automatic Daily Scheduler via LocalStorage (Tự Động Nhắc Bài Tập Ôn Hàng Ngày)
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

    // If student accessed on Day 1, Day 3, or Day 7 after the last test
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
  // Switch to test tab
  const testTabBtn = document.querySelectorAll('.tab-btn')[1];
  if (testTabBtn) switchPageTab('test-tab', testTabBtn);
}

// Explicit Event Binding setup
document.addEventListener('DOMContentLoaded', () => {
  // Select first tab default
  const defaultTabBtn = document.querySelector('.tab-btn');
  if (defaultTabBtn) switchPageTab('theory-tab', defaultTabBtn);

  // Check Daily Automatic Review Schedule
  checkDailyScheduleOnLoad();
});
