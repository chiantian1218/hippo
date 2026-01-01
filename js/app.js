// ============================================================
// 泰山河馬棒球分析系統 - 前端邏輯
// 版本: 1.5 - 新增認證功能
// ============================================================

// API 基礎 URL
const API_BASE = 'https://green-rain-9aba.chiantian.workers.dev';

// 單一對話最大來回次數
const MAX_CONVERSATION_TURNS = 100;

// Token 儲存鍵名
const TOKEN_STORAGE_KEY = 'baseball_auth_token';

// ============================================================
// 狀態管理
// ============================================================
let appState = {
  data: null,              // API 回傳的數據
  loading: false,          // 載入狀態
  error: null,             // 錯誤訊息
  conversationHistory: [], // 對話歷史 [{role, content}, ...]
  conversationTurn: 0,     // 當前對話次數
  battingChart: null,      // Chart.js 圖表實例
  token: null,             // 認證 Token
  isLoggedIn: false        // 登入狀態
};

// ============================================================
// DOM 元素快取
// ============================================================
const DOM = {
  // 認證相關
  loginSection: null,
  loginUsername: null,
  loginPassword: null,
  btnLogin: null,
  loginError: null,
  loginErrorMessage: null,
  headerButtons: null,
  btnLogout: null,
  mainContent: null,
  mainFooter: null,

  // 載入與錯誤
  loadingOverlay: null,
  loadingText: null,
  errorBanner: null,
  errorMessage: null,
  btnCloseError: null,

  // 資料顯示
  playerList: null,
  teamStats: null,
  battingChart: null,
  lastUpdated: null,

  // AI 對話
  conversationArea: null,
  conversationCounter: null,
  questionInput: null,
  btnSubmitQuestion: null,
  btnNewConversation: null,
  quickAnalyzeBtns: null,

  // 其他
  btnRefresh: null
};

// ============================================================
// 初始化
// ============================================================
function init() {
  // 快取 DOM 元素
  cacheDOMElements();

  // 綁定事件
  bindEvents();

  // 檢查是否已登入
  checkExistingToken();
}

/**
 * 快取 DOM 元素
 */
function cacheDOMElements() {
  // 認證相關
  DOM.loginSection = document.getElementById('login-section');
  DOM.loginUsername = document.getElementById('login-username');
  DOM.loginPassword = document.getElementById('login-password');
  DOM.btnLogin = document.getElementById('btn-login');
  DOM.loginError = document.getElementById('login-error');
  DOM.loginErrorMessage = document.getElementById('login-error-message');
  DOM.headerButtons = document.getElementById('header-buttons');
  DOM.btnLogout = document.getElementById('btn-logout');
  DOM.mainContent = document.getElementById('main-content');
  DOM.mainFooter = document.getElementById('main-footer');

  // 載入與錯誤
  DOM.loadingOverlay = document.getElementById('loading-overlay');
  DOM.loadingText = document.getElementById('loading-text');
  DOM.errorBanner = document.getElementById('error-banner');
  DOM.errorMessage = document.getElementById('error-message');
  DOM.btnCloseError = document.getElementById('btn-close-error');

  // 資料顯示
  DOM.playerList = document.getElementById('player-list');
  DOM.teamStats = document.getElementById('team-stats');
  DOM.battingChart = document.getElementById('batting-chart');
  DOM.lastUpdated = document.getElementById('last-updated');

  // AI 對話
  DOM.conversationArea = document.getElementById('conversation-area');
  DOM.conversationCounter = document.getElementById('conversation-counter');
  DOM.questionInput = document.getElementById('question-input');
  DOM.btnSubmitQuestion = document.getElementById('btn-submit-question');
  DOM.btnNewConversation = document.getElementById('btn-new-conversation');
  DOM.quickAnalyzeBtns = document.querySelectorAll('.quick-analyze-btn');

  // 其他
  DOM.btnRefresh = document.getElementById('btn-refresh');
}

/**
 * 綁定事件監聯器
 */
function bindEvents() {
  // 登入按鈕
  DOM.btnLogin.addEventListener('click', onLogin);

  // Enter 鍵登入
  DOM.loginPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  });

  // 登出按鈕
  DOM.btnLogout.addEventListener('click', onLogout);

  // 重新載入按鈕
  DOM.btnRefresh.addEventListener('click', onRefresh);

  // 關閉錯誤按鈕
  DOM.btnCloseError.addEventListener('click', hideError);

  // 送出問題按鈕
  DOM.btnSubmitQuestion.addEventListener('click', onSubmitQuestion);

  // Enter 鍵送出問題
  DOM.questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      onSubmitQuestion();
    }
  });

  // 開始新話題按鈕
  DOM.btnNewConversation.addEventListener('click', onNewConversation);

  // 快速分析按鈕
  DOM.quickAnalyzeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt');
      onQuickAnalysis(prompt);
    });
  });
}

// ============================================================
// 認證功能
// ============================================================

/**
 * 檢查是否有已存在的 Token
 */
async function checkExistingToken() {
  const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (savedToken) {
    // 嘗試用現有 Token 取得數據，驗證 Token 是否有效
    appState.token = savedToken;

    try {
      const response = await fetch(`${API_BASE}/data`, {
        headers: getAuthHeaders()
      });

      if (response.ok) {
        // Token 有效，進入主畫面
        appState.isLoggedIn = true;
        showMainContent();
        fetchData();
        return;
      }
    } catch (error) {
      console.error('Token 驗證失敗:', error);
    }

    // Token 無效，清除並顯示登入頁
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    appState.token = null;
  }

  // 顯示登入頁
  showLoginSection();
}

/**
 * 登入
 * @param {string} username - 帳號
 * @param {string} password - 密碼
 */
async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || '登入失敗');
    }

    // 儲存 Token
    appState.token = result.token;
    appState.isLoggedIn = true;
    localStorage.setItem(TOKEN_STORAGE_KEY, result.token);

    // 隱藏登入錯誤
    hideLoginError();

    // 顯示主畫面並載入數據
    showMainContent();
    fetchData();

  } catch (error) {
    showLoginError(error.message);
    throw error;
  }
}

/**
 * 登出
 */
function logout() {
  // 清除狀態
  appState.token = null;
  appState.isLoggedIn = false;
  appState.data = null;
  appState.conversationHistory = [];
  appState.conversationTurn = 0;

  // 清除儲存的 Token
  localStorage.removeItem(TOKEN_STORAGE_KEY);

  // 銷毀圖表
  if (appState.battingChart) {
    appState.battingChart.destroy();
    appState.battingChart = null;
  }

  // 顯示登入頁
  showLoginSection();
}

/**
 * 取得認證標頭
 * @returns {Object}
 */
function getAuthHeaders() {
  const headers = {};
  if (appState.token) {
    headers['Authorization'] = `Bearer ${appState.token}`;
  }
  return headers;
}

/**
 * 顯示主畫面
 */
function showMainContent() {
  DOM.loginSection.classList.add('hidden');
  DOM.mainContent.classList.remove('hidden');
  DOM.mainFooter.classList.remove('hidden');
  DOM.headerButtons.classList.remove('hidden');
}

/**
 * 顯示登入頁
 */
function showLoginSection() {
  DOM.loginSection.classList.remove('hidden');
  DOM.mainContent.classList.add('hidden');
  DOM.mainFooter.classList.add('hidden');
  DOM.headerButtons.classList.add('hidden');

  // 清空輸入框
  DOM.loginUsername.value = '';
  DOM.loginPassword.value = '';
  hideLoginError();
}

/**
 * 顯示登入錯誤
 * @param {string} message - 錯誤訊息
 */
function showLoginError(message) {
  DOM.loginErrorMessage.textContent = message;
  DOM.loginError.classList.remove('hidden');
}

/**
 * 隱藏登入錯誤
 */
function hideLoginError() {
  DOM.loginError.classList.add('hidden');
}

/**
 * 登入按鈕點擊事件
 */
async function onLogin() {
  const username = DOM.loginUsername.value.trim();
  const password = DOM.loginPassword.value;

  if (!username || !password) {
    showLoginError('請輸入帳號和密碼');
    return;
  }

  // 禁用按鈕避免重複點擊
  DOM.btnLogin.disabled = true;
  DOM.btnLogin.innerHTML = '<span class="animate-spin">⏳</span> 登入中...';

  try {
    await login(username, password);
  } catch (error) {
    // 錯誤已在 login() 中處理
  } finally {
    DOM.btnLogin.disabled = false;
    DOM.btnLogin.innerHTML = '<span>🔐</span><span>登入</span>';
  }
}

/**
 * 登出按鈕點擊事件
 */
function onLogout() {
  logout();
}

// ============================================================
// API 呼叫
// ============================================================

/**
 * 取得所有數據
 */
async function fetchData() {
  showLoading('正在載入球隊數據...');

  try {
    const response = await fetch(`${API_BASE}/data`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      // 401 表示未授權，重新導向登入頁
      if (response.status === 401) {
        logout();
        return;
      }
      throw new Error(`HTTP 錯誤: ${response.status}`);
    }

    const data = await response.json();
    appState.data = data;

    // 渲染各區塊
    renderPlayerList();
    renderTeamStats();
    renderBattingChart();

    // 更新時間
    if (data.fetchedAt) {
      const date = new Date(data.fetchedAt);
      DOM.lastUpdated.textContent = date.toLocaleString('zh-TW');
    }

    hideLoading();

  } catch (error) {
    hideLoading();
    showError(`無法載入數據: ${error.message}`);
    console.error('fetchData error:', error);
  }
}

/**
 * AI 分析（支援多輪對話）
 * @param {string} question - 用戶問題
 * @param {boolean} isNewTopic - 是否開始新話題
 */
async function analyzeWithAI(question, isNewTopic = false) {
  // 如果是新話題，先清除歷史
  if (isNewTopic) {
    startNewConversation();
  }

  // 檢查對話限制
  if (!checkConversationLimit()) {
    return;
  }

  // 先將用戶問題加入歷史並渲染
  addToHistory('user', question);
  renderConversation();

  // 清空輸入框
  DOM.questionInput.value = '';

  showLoading('AI 正在分析中...');

  try {
    // 準備歷史（不含當前問題）
    const historyToSend = appState.conversationHistory.slice(0, -1);

    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({
        playerData: appState.data,
        question: question,
        history: historyToSend
      })
    });

    if (!response.ok) {
      // 401 表示未授權，重新導向登入頁
      if (response.status === 401) {
        logout();
        return;
      }
      throw new Error(`HTTP 錯誤: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'AI 分析失敗');
    }

    // 將 AI 回應加入歷史
    addToHistory('assistant', result.response);
    renderConversation();

    hideLoading();

  } catch (error) {
    hideLoading();
    // 移除剛才加入的用戶問題（因為失敗了）
    appState.conversationHistory.pop();
    appState.conversationTurn--;
    renderConversation();

    showError(`AI 分析失敗: ${error.message}`);
    console.error('analyzeWithAI error:', error);
  }
}

// ============================================================
// 渲染函數
// ============================================================

/**
 * 渲染球員列表
 */
function renderPlayerList() {
  const players = appState.data?.sheets?.players?.data || [];

  if (players.length === 0) {
    DOM.playerList.innerHTML = '<p class="text-gray-500 text-center py-4">沒有球員數據</p>';
    return;
  }

  const html = players.map(player => {
    const number = player['背號'] || '--';
    const name = player['姓名'] || '未知';
    const position = player['守備位置'] || '';

    return `
      <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
        <span class="bg-primary text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
          ${number}
        </span>
        <div>
          <p class="font-medium text-gray-800">${name}</p>
          <p class="text-xs text-gray-500">${position}</p>
        </div>
      </div>
    `;
  }).join('');

  DOM.playerList.innerHTML = html;
}

/**
 * 渲染團隊統計
 */
function renderTeamStats() {
  const games = appState.data?.sheets?.games?.data || [];
  const batting = appState.data?.sheets?.batting?.data || [];

  // 計算統計
  const totalGames = games.length;
  const wins = games.filter(g => g['勝敗'] === '勝').length;
  const losses = games.filter(g => g['勝敗'] === '敗').length;
  const ties = games.filter(g => g['勝敗'] === '和').length;

  // 總得分/失分
  const totalRuns = games.reduce((sum, g) => sum + (parseInt(g['我方得分']) || 0), 0);
  const totalRunsAgainst = games.reduce((sum, g) => sum + (parseInt(g['對手得分']) || 0), 0);

  // 團隊打擊率（所有球員平均）
  const avgList = batting.map(b => parseFloat(b['打擊率']) || 0).filter(v => v > 0);
  const teamAvg = avgList.length > 0
    ? (avgList.reduce((a, b) => a + b, 0) / avgList.length).toFixed(3)
    : '---';

  const stats = [
    { label: '比賽場數', value: totalGames, icon: '🏟️' },
    { label: '勝-敗-和', value: `${wins}-${losses}-${ties}`, icon: '🏆' },
    { label: '總得分', value: totalRuns, icon: '⚾' },
    { label: '總失分', value: totalRunsAgainst, icon: '🛡️' },
    { label: '團隊打擊率', value: teamAvg, icon: '📊' },
    { label: '球員人數', value: batting.length, icon: '👥' }
  ];

  const html = stats.map(stat => `
    <div class="text-center p-3 bg-gray-50 rounded-lg">
      <p class="text-2xl mb-1">${stat.icon}</p>
      <p class="text-xl font-bold text-primary">${stat.value}</p>
      <p class="text-xs text-gray-500">${stat.label}</p>
    </div>
  `).join('');

  DOM.teamStats.innerHTML = html;
}

/**
 * 渲染打擊率排行圖表
 */
function renderBattingChart() {
  const batting = appState.data?.sheets?.batting?.data || [];

  if (batting.length === 0) {
    return;
  }

  // 依打擊率排序（取前 10 名）
  const sorted = [...batting]
    .map(b => ({
      name: b['姓名'] || '未知',
      avg: parseFloat(b['打擊率']) || 0
    }))
    .filter(b => b.avg > 0)
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 10);

  const labels = sorted.map(b => b.name);
  const data = sorted.map(b => b.avg);

  // 銷毀舊圖表
  if (appState.battingChart) {
    appState.battingChart.destroy();
  }

  // 建立新圖表
  const ctx = DOM.battingChart.getContext('2d');
  appState.battingChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '打擊率',
        data: data,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',  // 橫條圖
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 1,
          ticks: {
            callback: (value) => value.toFixed(3)
          }
        }
      }
    }
  });
}

/**
 * 渲染對話紀錄
 */
function renderConversation() {
  // 更新對話計數器
  DOM.conversationCounter.textContent = `(${appState.conversationTurn}/${MAX_CONVERSATION_TURNS})`;

  if (appState.conversationHistory.length === 0) {
    DOM.conversationArea.innerHTML = '<p class="text-gray-400 text-center py-8">點擊快速分析按鈕或輸入問題開始對話</p>';
    return;
  }

  const html = appState.conversationHistory.map(msg => {
    const isUser = msg.role === 'user';
    const icon = isUser ? '👤' : '🤖';
    const bgColor = isUser ? 'bg-blue-50' : 'bg-green-50';
    const borderColor = isUser ? 'border-blue-200' : 'border-green-200';

    // 處理換行
    const content = msg.content.replace(/\n/g, '<br>');

    return `
      <div class="${bgColor} ${borderColor} border rounded-lg p-3">
        <div class="flex items-start gap-2">
          <span class="text-lg">${icon}</span>
          <div class="flex-1 text-sm text-gray-700">${content}</div>
        </div>
      </div>
    `;
  }).join('');

  DOM.conversationArea.innerHTML = html;

  // 捲動到底部
  DOM.conversationArea.scrollTop = DOM.conversationArea.scrollHeight;
}

// ============================================================
// 對話管理
// ============================================================

/**
 * 開始新話題（清除對話歷史）
 */
function startNewConversation() {
  appState.conversationHistory = [];
  appState.conversationTurn = 0;
  renderConversation();
}

/**
 * 新增到對話歷史
 * @param {string} role - 'user' 或 'assistant'
 * @param {string} content - 對話內容
 */
function addToHistory(role, content) {
  appState.conversationHistory.push({ role, content });
  if (role === 'user') {
    appState.conversationTurn++;
  }
}

/**
 * 檢查對話限制
 * @returns {boolean} 是否可以繼續對話
 */
function checkConversationLimit() {
  if (appState.conversationTurn >= MAX_CONVERSATION_TURNS) {
    showError(`已達到 ${MAX_CONVERSATION_TURNS} 次對話上限，請點擊「開始新話題」繼續使用`);
    return false;
  }
  return true;
}

// ============================================================
// 事件處理
// ============================================================

/**
 * 快速分析按鈕點擊（開始新話題）
 * @param {string} prompt - 預設問題
 */
function onQuickAnalysis(prompt) {
  analyzeWithAI(prompt, true);  // true = 新話題
}

/**
 * 送出自訂問題（延續對話）
 */
function onSubmitQuestion() {
  const question = DOM.questionInput.value.trim();
  if (!question) {
    return;
  }
  analyzeWithAI(question, false);  // false = 延續對話
}

/**
 * 開始新話題按鈕點擊
 */
function onNewConversation() {
  startNewConversation();
}

/**
 * 重新載入數據
 */
function onRefresh() {
  fetchData();
}

// ============================================================
// 輔助函數
// ============================================================

/**
 * 顯示載入中
 * @param {string} text - 載入提示文字
 */
function showLoading(text = '載入中...') {
  appState.loading = true;
  DOM.loadingText.textContent = text;
  DOM.loadingOverlay.classList.remove('hidden');
}

/**
 * 隱藏載入中
 */
function hideLoading() {
  appState.loading = false;
  DOM.loadingOverlay.classList.add('hidden');
}

/**
 * 顯示錯誤
 * @param {string} message - 錯誤訊息
 */
function showError(message) {
  appState.error = message;
  DOM.errorMessage.textContent = message;
  DOM.errorBanner.classList.remove('hidden');
}

/**
 * 隱藏錯誤
 */
function hideError() {
  appState.error = null;
  DOM.errorBanner.classList.add('hidden');
}

// ============================================================
// 啟動應用
// ============================================================
document.addEventListener('DOMContentLoaded', init);
