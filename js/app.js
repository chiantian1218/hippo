// ============================================================
// 泰山河馬棒球分析系統 - 前端邏輯
// 版本: 2.0.0 - 專業深色科技風格 + 多圖表 + Mobile-first RWD
// ============================================================

// API 基礎 URL
const API_BASE = 'https://green-rain-9aba.chiantian.workers.dev';

// ============================================================
// SVG Icon 系統
// ============================================================
const Icons = {
  baseball: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93c4.08 4.08 4.08 10.06 0 14.14"/><path d="M19.07 4.93c-4.08 4.08-4.08 10.06 0 14.14"/></svg>`,

  refresh: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,

  logout: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,

  lock: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,

  user: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,

  users: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,

  chartBar: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,

  trendingUp: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,

  cpu: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,

  trophy: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,

  target: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,

  send: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,

  message: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,

  calendar: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,

  xCircle: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,

  shield: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,

  stadium: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="8" rx="10" ry="4"/><path d="M2 8v8c0 2.21 4.48 4 10 4s10-1.79 10-4V8"/><path d="M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4"/></svg>`,

  glove: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v6"/><path d="M10 10V5a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v9"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V7a2 2 0 1 1 4 0"/></svg>`,

  spinner: `<svg class="icon icon-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/></svg>`,

  chevronDown: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`,

  x: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,

  sun: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,

  moon: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
};

/**
 * 取得 icon HTML
 * @param {string} name - icon 名稱
 * @param {string} extraClass - 額外的 CSS class
 * @returns {string} SVG HTML
 */
function getIcon(name, extraClass = '') {
  const icon = Icons[name];
  if (!icon) return '';
  if (extraClass) {
    return icon.replace('class="icon"', `class="icon ${extraClass}"`);
  }
  return icon;
}

// ============================================================
// 骨架屏載入系統
// ============================================================
const Skeleton = {
  /**
   * 生成球員列表骨架屏
   * @param {number} count - 數量
   */
  playerList(count = 8) {
    return Array(count).fill(0).map(() => `
      <div class="flex items-center gap-3 p-3 bg-dark-surface-hover rounded-lg animate-pulse">
        <div class="skeleton skeleton-circle w-10 h-10"></div>
        <div class="flex-1">
          <div class="skeleton skeleton-text w-24 h-4 mb-2"></div>
          <div class="skeleton skeleton-text w-16 h-3"></div>
        </div>
      </div>
    `).join('');
  },

  /**
   * 生成團隊統計骨架屏
   * @param {number} count - 數量
   */
  teamStats(count = 6) {
    return Array(count).fill(0).map(() => `
      <div class="text-center p-3 bg-dark-surface-hover rounded-lg border border-dark-border">
        <div class="skeleton skeleton-circle w-8 h-8 mx-auto mb-2"></div>
        <div class="skeleton skeleton-text w-12 h-5 mx-auto mb-1"></div>
        <div class="skeleton skeleton-text w-16 h-3 mx-auto"></div>
      </div>
    `).join('');
  },

  /**
   * 生成圖表骨架屏
   */
  chart() {
    return `
      <div class="flex items-center justify-center h-64 bg-dark-surface-hover rounded-lg">
        <div class="text-center">
          <div class="skeleton skeleton-circle w-12 h-12 mx-auto mb-3"></div>
          <div class="skeleton skeleton-text w-24 h-4 mx-auto"></div>
        </div>
      </div>
    `;
  }
};

/**
 * 顯示所有骨架屏
 */
function showSkeletons() {
  if (DOM.playerList) {
    DOM.playerList.innerHTML = Skeleton.playerList(8);
  }
  if (DOM.teamStats) {
    DOM.teamStats.innerHTML = Skeleton.teamStats(6);
  }
}

// ============================================================
// 主題切換系統
// ============================================================
const THEME_STORAGE_KEY = 'baseball_theme';

/**
 * 初始化主題
 * 優先載入 localStorage，否則根據系統偏好設定
 */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    // 檢查系統偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  // 監聽系統主題變化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * 切換主題
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);

  // 更新 Chart.js 圖表主題
  updateChartsTheme(newTheme);
}

/**
 * 更新圖表主題色
 * @param {string} theme - 'dark' 或 'light'
 */
function updateChartsTheme(theme) {
  const textColor = theme === 'light' ? '#1e293b' : '#f3f4f6';
  const gridColor = theme === 'light' ? '#e2e8f0' : '#374151';

  // 更新全域預設值
  if (window.Chart) {
    Chart.defaults.color = textColor;
    Chart.defaults.borderColor = gridColor;
  }

  // 重新渲染現有圖表
  Object.values(Charts).forEach(chart => {
    if (chart) {
      chart.options.scales = chart.options.scales || {};
      Object.values(chart.options.scales).forEach(scale => {
        scale.ticks = scale.ticks || {};
        scale.ticks.color = textColor;
        scale.grid = scale.grid || {};
        scale.grid.color = gridColor;
      });
      if (chart.options.plugins && chart.options.plugins.legend) {
        chart.options.plugins.legend.labels = chart.options.plugins.legend.labels || {};
        chart.options.plugins.legend.labels.color = textColor;
      }
      chart.update();
    }
  });
}

// 單一對話最大來回次數
const MAX_CONVERSATION_TURNS = 100;

// ============================================================
// 圖表實例管理
// ============================================================
const Charts = {
  battingOBP: null,
  extraBase: null,
  era: null,
  kbb: null,
  fieldingPct: null,
  errors: null,
  radar: null,
  winLoss: null
};

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
  isLoggedIn: false,       // 登入狀態
  selectedPlayer: null     // 當前選取的球員 (用於 Modal)
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
  btnRefresh: null,
  btnThemeToggle: null
};

// ============================================================
// 初始化
// ============================================================
function init() {
  // 初始化主題 (儘早執行以避免閃爍)
  initTheme();

  // 快取 DOM 元素
  cacheDOMElements();

  // 初始化 SVG Icons
  initIcons();

  // 初始化 Chart.js 深色主題
  initChartDefaults();

  // 初始化圖表 Tab 切換
  initChartTabs();

  // 初始化手機版導航
  initMobileNav();

  // 綁定事件
  bindEvents();

  // 檢查是否已登入
  checkExistingToken();
}

/**
 * 初始化 SVG Icons - 將 icon 注入到所有預留位置
 */
function initIcons() {
  // Header icons
  const headerLogo = document.getElementById('header-logo');
  if (headerLogo) headerLogo.innerHTML = Icons.baseball;

  const refreshIcon = document.getElementById('refresh-icon');
  if (refreshIcon) refreshIcon.innerHTML = Icons.refresh;

  const logoutIcon = document.getElementById('logout-icon');
  if (logoutIcon) logoutIcon.innerHTML = Icons.logout;

  // Theme toggle icons
  const themeToggle = document.getElementById('btn-theme-toggle');
  if (themeToggle) {
    const sunIcon = themeToggle.querySelector('.icon-sun');
    const moonIcon = themeToggle.querySelector('.icon-moon');
    if (sunIcon) sunIcon.innerHTML = Icons.sun;
    if (moonIcon) moonIcon.innerHTML = Icons.moon;
  }

  // Login section icons
  const loginLogo = document.getElementById('login-logo');
  if (loginLogo) loginLogo.innerHTML = Icons.baseball;

  const loginBtnIcon = document.getElementById('login-btn-icon');
  if (loginBtnIcon) loginBtnIcon.innerHTML = Icons.lock;

  // Error icon
  const errorIcon = document.getElementById('error-icon');
  if (errorIcon) errorIcon.innerHTML = Icons.xCircle;

  // Section icons
  const playersIcon = document.getElementById('players-icon');
  if (playersIcon) playersIcon.innerHTML = Icons.users;

  const statsIcon = document.getElementById('stats-icon');
  if (statsIcon) statsIcon.innerHTML = Icons.chartBar;

  // Chart tab icons
  const tabBattingIcon = document.getElementById('tab-batting-icon');
  if (tabBattingIcon) tabBattingIcon.innerHTML = Icons.baseball;

  const tabPitchingIcon = document.getElementById('tab-pitching-icon');
  if (tabPitchingIcon) tabPitchingIcon.innerHTML = Icons.target;

  const tabFieldingIcon = document.getElementById('tab-fielding-icon');
  if (tabFieldingIcon) tabFieldingIcon.innerHTML = Icons.glove;

  const tabOverallIcon = document.getElementById('tab-overall-icon');
  if (tabOverallIcon) tabOverallIcon.innerHTML = Icons.trendingUp;

  // AI section icons
  const aiIcon = document.getElementById('ai-icon');
  if (aiIcon) aiIcon.innerHTML = Icons.cpu;

  const newConvIcon = document.getElementById('new-conv-icon');
  if (newConvIcon) newConvIcon.innerHTML = Icons.message;

  const submitIcon = document.getElementById('submit-icon');
  if (submitIcon) submitIcon.innerHTML = Icons.send;

  const chatIcon = document.getElementById('chat-icon');
  if (chatIcon) chatIcon.innerHTML = Icons.message;

  // Quick analyze button icons
  document.querySelectorAll('.qa-icon').forEach(span => {
    const iconName = span.getAttribute('data-icon');
    if (iconName && Icons[iconName]) {
      span.innerHTML = Icons[iconName];
    }
  });

  // Footer icons
  const footerCalendarIcon = document.getElementById('footer-calendar-icon');
  if (footerCalendarIcon) footerCalendarIcon.innerHTML = Icons.calendar;

  // Modal icons
  const modalUserIcon = document.getElementById('modal-user-icon');
  if (modalUserIcon) modalUserIcon.innerHTML = Icons.user;

  const modalBattingIcon = document.getElementById('modal-batting-icon');
  if (modalBattingIcon) modalBattingIcon.innerHTML = Icons.baseball;

  const modalPitchingIcon = document.getElementById('modal-pitching-icon');
  if (modalPitchingIcon) modalPitchingIcon.innerHTML = Icons.target;

  const modalFieldingIcon = document.getElementById('modal-fielding-icon');
  if (modalFieldingIcon) modalFieldingIcon.innerHTML = Icons.glove;

  const modalAiIcon = document.getElementById('modal-ai-icon');
  if (modalAiIcon) modalAiIcon.innerHTML = Icons.cpu;

  // Mobile nav icons
  const mobPlayersIcon = document.getElementById('mob-players-icon');
  if (mobPlayersIcon) mobPlayersIcon.innerHTML = Icons.users;

  const mobStatsIcon = document.getElementById('mob-stats-icon');
  if (mobStatsIcon) mobStatsIcon.innerHTML = Icons.chartBar;

  const mobChartsIcon = document.getElementById('mob-charts-icon');
  if (mobChartsIcon) mobChartsIcon.innerHTML = Icons.trendingUp;

  const mobAiIcon = document.getElementById('mob-ai-icon');
  if (mobAiIcon) mobAiIcon.innerHTML = Icons.cpu;
}

/**
 * 初始化 Chart.js 深色主題全域設定
 */
function initChartDefaults() {
  Chart.defaults.color = '#9ca3af';  // text-secondary
  Chart.defaults.borderColor = '#374151';  // dark-border
  Chart.defaults.font.family = 'system-ui, sans-serif';

  // 深色主題網格線
  Chart.defaults.scale.grid = {
    color: 'rgba(55, 65, 81, 0.5)'
  };

  // 註冊 zoom plugin (如果可用)
  if (window.Chart && window.ChartZoom) {
    Chart.register(window.ChartZoom);
  }
}

/**
 * 取得圖表縮放設定 (用於手機版 pinch-to-zoom)
 * @param {boolean} enableZoom - 是否啟用縮放
 * @returns {object} zoom plugin 配置
 */
function getChartZoomConfig(enableZoom = true) {
  if (!enableZoom) return {};

  return {
    zoom: {
      zoom: {
        wheel: {
          enabled: false  // 桌面版禁用滾輪縮放
        },
        pinch: {
          enabled: true   // 手機版啟用雙指縮放
        },
        mode: 'xy',
        onZoomComplete: function({ chart }) {
          // 縮放後顯示重置按鈕提示
          chart.options.plugins.title = chart.options.plugins.title || {};
          chart.options.plugins.title.display = true;
          chart.options.plugins.title.text = '雙擊重置縮放';
          chart.options.plugins.title.color = '#9ca3af';
          chart.options.plugins.title.font = { size: 10 };
          chart.update('none');
        }
      },
      pan: {
        enabled: true,
        mode: 'xy',
        threshold: 10
      },
      limits: {
        x: { min: 'original', max: 'original' },
        y: { min: 'original', max: 'original' }
      }
    }
  };
}

/**
 * 重置圖表縮放
 * @param {Chart} chart - Chart.js 實例
 */
function resetChartZoom(chart) {
  if (chart && chart.resetZoom) {
    chart.resetZoom();
    // 隱藏重置提示
    if (chart.options.plugins.title) {
      chart.options.plugins.title.display = false;
      chart.update('none');
    }
  }
}

/**
 * 初始化圖表 Tab 切換
 */
function initChartTabs() {
  const tabs = document.querySelectorAll('.chart-tab');
  const panels = document.querySelectorAll('.chart-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // 更新 tab 狀態
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 切換面板
      panels.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * 初始化手機版底部導航
 */
function initMobileNav() {
  const mobileNav = document.getElementById('mobile-tab-nav');
  const mobileTabs = document.querySelectorAll('.mobile-tab');
  const sections = document.querySelectorAll('.mobile-section');
  const sectionOrder = ['players', 'stats', 'charts', 'ai'];
  let currentSectionIndex = 0;

  // 檢查是否為手機版
  function checkMobileView() {
    const isMobile = window.innerWidth < 640;  // sm breakpoint

    if (isMobile) {
      mobileNav.classList.remove('hidden');
      // 手機版預設只顯示第一個區塊
      sections.forEach((section, index) => {
        if (index === 0) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });
      currentSectionIndex = 0;
      updateActiveTab(sectionOrder[0]);
    } else {
      mobileNav.classList.add('hidden');
      // 桌面版顯示所有區塊
      sections.forEach(section => {
        section.classList.remove('hidden');
      });
    }
  }

  // 更新 active tab
  function updateActiveTab(sectionName) {
    mobileTabs.forEach(t => {
      if (t.getAttribute('data-section') === sectionName) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
  }

  // 切換到指定區塊
  function switchToSection(sectionName) {
    sections.forEach(section => {
      const name = section.getAttribute('data-mobile-section');
      if (name === sectionName) {
        section.classList.remove('hidden');
        // 加入滑入動畫
        section.style.animation = 'fadeIn 0.25s ease-out';
      } else {
        section.classList.add('hidden');
      }
    });
    updateActiveTab(sectionName);
    currentSectionIndex = sectionOrder.indexOf(sectionName);
  }

  // Tab 切換事件
  mobileTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetSection = tab.getAttribute('data-section');
      switchToSection(targetSection);
    });
  });

  // ===== 滑動手勢支援 =====
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const minSwipeDistance = 50;  // 最小滑動距離
  const maxVerticalDistance = 100;  // 垂直容忍距離

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = Math.abs(touchEndY - touchStartY);

    // 只有在手機版且水平滑動距離足夠、垂直滑動不過大時觸發
    if (window.innerWidth >= 640) return;
    if (Math.abs(deltaX) < minSwipeDistance) return;
    if (deltaY > maxVerticalDistance) return;

    if (deltaX > 0) {
      // 向右滑 → 上一個 Tab
      if (currentSectionIndex > 0) {
        switchToSection(sectionOrder[currentSectionIndex - 1]);
      }
    } else {
      // 向左滑 → 下一個 Tab
      if (currentSectionIndex < sectionOrder.length - 1) {
        switchToSection(sectionOrder[currentSectionIndex + 1]);
      }
    }
  }

  // 綁定觸控事件到主內容區
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.addEventListener('touchstart', handleTouchStart, { passive: true });
    mainContent.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // 監聽視窗大小變化
  window.addEventListener('resize', checkMobileView);

  // 初始檢查
  checkMobileView();
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
  DOM.btnThemeToggle = document.getElementById('btn-theme-toggle');

  // 球員 Modal
  DOM.playerModal = document.getElementById('player-modal');
  DOM.btnCloseModal = document.getElementById('btn-close-modal');
  DOM.modalPlayerNumber = document.getElementById('modal-player-number');
  DOM.modalPlayerName = document.getElementById('modal-player-name');
  DOM.modalBasicInfo = document.getElementById('modal-basic-info');
  DOM.modalBattingStats = document.getElementById('modal-batting-stats');
  DOM.modalPitchingSection = document.getElementById('modal-pitching-section');
  DOM.modalPitchingStats = document.getElementById('modal-pitching-stats');
  DOM.modalFieldingSection = document.getElementById('modal-fielding-section');
  DOM.modalFieldingStats = document.getElementById('modal-fielding-stats');
  DOM.btnModalAskAI = document.getElementById('btn-modal-ask-ai');
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

  // 主題切換按鈕
  if (DOM.btnThemeToggle) {
    DOM.btnThemeToggle.addEventListener('click', toggleTheme);
  }

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

  // Modal 關閉按鈕
  DOM.btnCloseModal.addEventListener('click', hidePlayerModal);

  // 點擊 Modal 背景關閉
  DOM.playerModal.addEventListener('click', (e) => {
    if (e.target === DOM.playerModal) {
      hidePlayerModal();
    }
  });

  // Modal 內的 AI 分析按鈕
  DOM.btnModalAskAI.addEventListener('click', onModalAskAI);
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
  DOM.btnLogin.innerHTML = `<span class="icon-md">${Icons.spinner}</span> 登入中...`;

  try {
    await login(username, password);
  } catch (error) {
    // 錯誤已在 login() 中處理
  } finally {
    DOM.btnLogin.disabled = false;
    DOM.btnLogin.innerHTML = `<span id="login-btn-icon" class="icon-md">${Icons.lock}</span><span>登入</span>`;
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
  // 顯示骨架屏載入狀態
  showSkeletons();
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
    renderAllCharts();

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
    DOM.playerList.innerHTML = '<p class="text-text-muted text-center py-4">沒有球員數據</p>';
    return;
  }

  const html = players.map((player, index) => {
    const number = player['背號'] || '--';
    const name = player['姓名'] || '未知';
    const position = player['守位'] || '';

    return `
      <div class="player-item player-item-hover flex items-center gap-3 p-3 bg-dark-surface-hover rounded-lg cursor-pointer" data-player-index="${index}">
        <span class="bg-gradient-to-br from-tech-blue to-tech-purple text-dark-bg text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center">
          ${number}
        </span>
        <div>
          <p class="font-medium text-text-primary">${name}</p>
          <p class="text-xs text-text-muted">${position}</p>
        </div>
      </div>
    `;
  }).join('');

  DOM.playerList.innerHTML = html;

  // 綁定球員點擊事件
  document.querySelectorAll('.player-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-player-index'));
      showPlayerModal(index);
    });
  });

  // 填充雷達圖球員選擇下拉
  populateRadarPlayerSelect();
}

/**
 * 填充雷達圖球員選擇下拉
 */
function populateRadarPlayerSelect() {
  const select = document.getElementById('radar-player-select');
  if (!select) return;

  const players = appState.data?.sheets?.players?.data || [];

  select.innerHTML = players.map((player, index) => {
    const name = player['姓名'] || '未知';
    const number = player['背號'] || '--';
    return `<option value="${index}">#${number} ${name}</option>`;
  }).join('');

  // 綁定變更事件
  select.addEventListener('change', () => {
    const playerIndex = parseInt(select.value);
    renderRadarChart(playerIndex);
  });
}

/**
 * 渲染團隊統計
 */
function renderTeamStats() {
  const rawGames = appState.data?.sheets?.games?.data || [];
  const batting = appState.data?.sheets?.batting?.data || [];

  // 過濾空白比賽紀錄（只保留有對手資料的紀錄）
  const games = rawGames.filter(g => g['對手'] && g['對手'].trim() !== '');

  // 計算統計
  const totalGames = games.length;
  const wins = games.filter(g => g['結果'] === '勝').length;
  const losses = games.filter(g => g['結果'] === '敗').length;
  const ties = games.filter(g => g['結果'] === '和').length;

  // 總得分/失分
  const totalRuns = games.reduce((sum, g) => sum + (parseInt(g['我方得分']) || 0), 0);
  const totalRunsAgainst = games.reduce((sum, g) => sum + (parseInt(g['對方得分']) || 0), 0);

  // 團隊打擊率（所有球員平均）
  const avgList = batting.map(b => parseFloat(b['打擊率']) || 0).filter(v => v > 0);
  const teamAvg = avgList.length > 0
    ? (avgList.reduce((a, b) => a + b, 0) / avgList.length).toFixed(3)
    : '---';

  const stats = [
    { label: '比賽場數', value: totalGames, icon: 'stadium', color: 'text-tech-blue' },
    { label: '勝-敗-和', value: `${wins}-${losses}-${ties}`, icon: 'trophy', color: 'text-warning' },
    { label: '總得分', value: totalRuns, icon: 'baseball', color: 'text-success' },
    { label: '總失分', value: totalRunsAgainst, icon: 'shield', color: 'text-danger' },
    { label: '團隊打擊率', value: teamAvg, icon: 'chartBar', color: 'text-tech-purple' },
    { label: '球員人數', value: batting.length, icon: 'users', color: 'text-tech-blue' }
  ];

  const html = stats.map(stat => `
    <div class="text-center p-3 bg-dark-surface-hover rounded-lg border border-dark-border hover:border-tech-blue/50 transition">
      <div class="icon-xl ${stat.color} mx-auto mb-2">${Icons[stat.icon]}</div>
      <p class="text-xl font-bold text-text-primary">${stat.value}</p>
      <p class="text-xs text-text-muted">${stat.label}</p>
    </div>
  `).join('');

  DOM.teamStats.innerHTML = html;
}

/**
 * 渲染所有圖表
 */
function renderAllCharts() {
  // 打擊分析圖表
  renderBattingOBPChart();
  renderExtraBaseChart();

  // 投手分析圖表
  renderERAChart();
  renderKBBChart();

  // 守備分析圖表
  renderFieldingPctChart();
  renderErrorsChart();

  // 綜合分析圖表
  renderRadarChart(0);  // 預設第一位球員
  renderWinLossChart();
}

/**
 * 銷毀指定圖表
 */
function destroyChart(chartName) {
  if (Charts[chartName]) {
    Charts[chartName].destroy();
    Charts[chartName] = null;
  }
}

/**
 * 打擊率 vs 上壘率圖表
 */
function renderBattingOBPChart() {
  const batting = appState.data?.sheets?.batting?.data || [];
  if (batting.length === 0) return;

  // 取前 8 名有打擊率的球員
  const sorted = [...batting]
    .filter(b => parseFloat(b['打擊率']) > 0)
    .sort((a, b) => parseFloat(b['打擊率']) - parseFloat(a['打擊率']))
    .slice(0, 8);

  const labels = sorted.map(b => b['姓名'] || '未知');
  const avgData = sorted.map(b => parseFloat(b['打擊率']) || 0);
  const obpData = sorted.map(b => parseFloat(b['上壘率']) || 0);

  destroyChart('battingOBP');

  const ctx = document.getElementById('chart-batting-obp');
  if (!ctx) return;

  Charts.battingOBP = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '打擊率 AVG',
          data: avgData,
          backgroundColor: 'rgba(0, 212, 255, 0.7)',
          borderColor: '#00d4ff',
          borderWidth: 1
        },
        {
          label: '上壘率 OBP',
          data: obpData,
          backgroundColor: 'rgba(139, 92, 246, 0.7)',
          borderColor: '#8b5cf6',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#9ca3af' }
        },
        ...getChartZoomConfig()
      },
      scales: {
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        },
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            color: '#9ca3af',
            callback: v => v.toFixed(2)
          },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        }
      }
    }
  });

  // 雙擊重置縮放
  ctx.ondblclick = () => resetChartZoom(Charts.battingOBP);
}

/**
 * 長打分布圖表（堆疊柱狀圖）
 */
function renderExtraBaseChart() {
  const batting = appState.data?.sheets?.batting?.data || [];
  if (batting.length === 0) return;

  // 取有長打的球員（前 8 名依安打數排序）
  const sorted = [...batting]
    .filter(b => parseInt(b['安打']) > 0)
    .sort((a, b) => parseInt(b['安打']) - parseInt(a['安打']))
    .slice(0, 8);

  const labels = sorted.map(b => b['姓名'] || '未知');
  const singlesData = sorted.map(b => {
    const hits = parseInt(b['安打']) || 0;
    const doubles = parseInt(b['二壘打']) || 0;
    const triples = parseInt(b['三壘打']) || 0;
    const homers = parseInt(b['全壘打']) || 0;
    return hits - doubles - triples - homers;  // 一壘打
  });
  const doublesData = sorted.map(b => parseInt(b['二壘打']) || 0);
  const triplesData = sorted.map(b => parseInt(b['三壘打']) || 0);
  const homersData = sorted.map(b => parseInt(b['全壘打']) || 0);

  destroyChart('extraBase');

  const ctx = document.getElementById('chart-extra-base');
  if (!ctx) return;

  Charts.extraBase = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '一壘打',
          data: singlesData,
          backgroundColor: 'rgba(156, 163, 175, 0.7)',
          borderColor: '#9ca3af',
          borderWidth: 1
        },
        {
          label: '二壘打',
          data: doublesData,
          backgroundColor: 'rgba(0, 212, 255, 0.7)',
          borderColor: '#00d4ff',
          borderWidth: 1
        },
        {
          label: '三壘打',
          data: triplesData,
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderColor: '#10b981',
          borderWidth: 1
        },
        {
          label: '全壘打',
          data: homersData,
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderColor: '#ef4444',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#9ca3af' }
        },
        ...getChartZoomConfig()
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        }
      }
    }
  });

  // 雙擊重置縮放
  ctx.ondblclick = () => resetChartZoom(Charts.extraBase);
}

/**
 * 防禦率排行圖表
 */
function renderERAChart() {
  const pitching = appState.data?.sheets?.pitching?.data || [];
  if (pitching.length === 0) return;

  // 依防禦率排序（取有投球局數的前 8 名，防禦率越低越好）
  const sorted = [...pitching]
    .filter(p => parseFloat(p['投球局數']) > 0)
    .sort((a, b) => parseFloat(a['防禦率']) - parseFloat(b['防禦率']))
    .slice(0, 8);

  const labels = sorted.map(p => p['姓名'] || '未知');
  const eraData = sorted.map(p => parseFloat(p['防禦率']) || 0);

  destroyChart('era');

  const ctx = document.getElementById('chart-era');
  if (!ctx) return;

  Charts.era = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '防禦率 ERA',
        data: eraData,
        backgroundColor: eraData.map(era =>
          era < 2 ? 'rgba(16, 185, 129, 0.7)' :
          era < 4 ? 'rgba(245, 158, 11, 0.7)' :
          'rgba(239, 68, 68, 0.7)'
        ),
        borderColor: eraData.map(era =>
          era < 2 ? '#10b981' :
          era < 4 ? '#f59e0b' :
          '#ef4444'
        ),
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        ...getChartZoomConfig()
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        },
        y: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        }
      }
    }
  });

  // 雙擊重置縮放
  ctx.ondblclick = () => resetChartZoom(Charts.era);
}

/**
 * 三振/保送效率散布圖
 */
function renderKBBChart() {
  const pitching = appState.data?.sheets?.pitching?.data || [];
  if (pitching.length === 0) return;

  // 取有投球紀錄的球員
  const validPitchers = pitching.filter(p => parseFloat(p['投球局數']) > 0);

  const scatterData = validPitchers.map(p => ({
    x: parseInt(p['三振']) || 0,
    y: parseInt(p['四壞球']) || 0,
    label: p['姓名'] || '未知'
  }));

  destroyChart('kbb');

  const ctx = document.getElementById('chart-k-bb');
  if (!ctx) return;

  Charts.kbb = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: '球員',
        data: scatterData,
        backgroundColor: 'rgba(0, 212, 255, 0.7)',
        borderColor: '#00d4ff',
        pointRadius: 8,
        pointHoverRadius: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const point = context.raw;
              return `${point.label}: ${point.x}K / ${point.y}BB`;
            }
          }
        },
        ...getChartZoomConfig()
      },
      scales: {
        x: {
          title: {
            display: true,
            text: '三振 (K)',
            color: '#9ca3af'
          },
          beginAtZero: true,
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        },
        y: {
          title: {
            display: true,
            text: '四壞球 (BB)',
            color: '#9ca3af'
          },
          beginAtZero: true,
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        }
      }
    }
  });

  // 雙擊重置縮放
  ctx.ondblclick = () => resetChartZoom(Charts.kbb);
}

/**
 * 守備率排行圖表
 */
function renderFieldingPctChart() {
  const fielding = appState.data?.sheets?.fielding?.data || [];
  if (fielding.length === 0) return;

  // 依守備率排序（取前 8 名）
  const sorted = [...fielding]
    .filter(f => parseFloat(f['守備率']) > 0)
    .sort((a, b) => parseFloat(b['守備率']) - parseFloat(a['守備率']))
    .slice(0, 8);

  const labels = sorted.map(f => `${f['姓名'] || '未知'} (${f['守位'] || '-'})`);
  const pctData = sorted.map(f => parseFloat(f['守備率']) || 0);

  destroyChart('fieldingPct');

  const ctx = document.getElementById('chart-fielding-pct');
  if (!ctx) return;

  Charts.fieldingPct = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '守備率',
        data: pctData,
        backgroundColor: pctData.map(pct =>
          pct >= 0.95 ? 'rgba(16, 185, 129, 0.7)' :
          pct >= 0.90 ? 'rgba(245, 158, 11, 0.7)' :
          'rgba(239, 68, 68, 0.7)'
        ),
        borderColor: pctData.map(pct =>
          pct >= 0.95 ? '#10b981' :
          pct >= 0.90 ? '#f59e0b' :
          '#ef4444'
        ),
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        ...getChartZoomConfig()
      },
      scales: {
        x: {
          min: 0.7,
          max: 1,
          ticks: {
            color: '#9ca3af',
            callback: v => v.toFixed(2)
          },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        },
        y: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        }
      }
    }
  });

  // 雙擊重置縮放
  ctx.ondblclick = () => resetChartZoom(Charts.fieldingPct);
}

/**
 * 失誤分布圓餅圖
 */
function renderErrorsChart() {
  const fielding = appState.data?.sheets?.fielding?.data || [];
  if (fielding.length === 0) return;

  // 統計各球員失誤
  const playersWithErrors = fielding
    .filter(f => parseInt(f['失誤']) > 0)
    .map(f => ({
      name: f['姓名'] || '未知',
      errors: parseInt(f['失誤']) || 0
    }))
    .sort((a, b) => b.errors - a.errors)
    .slice(0, 6);

  // 如果沒有人有失誤
  if (playersWithErrors.length === 0) {
    const ctx = document.getElementById('chart-errors');
    if (ctx) {
      const parent = ctx.parentElement;
      parent.innerHTML = '<p class="text-text-muted text-center py-8">無失誤記錄 - 表現完美！</p>';
    }
    return;
  }

  const labels = playersWithErrors.map(p => p.name);
  const data = playersWithErrors.map(p => p.errors);

  destroyChart('errors');

  const ctx = document.getElementById('chart-errors');
  if (!ctx) return;

  Charts.errors = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(0, 212, 255, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(156, 163, 175, 0.7)'
        ],
        borderColor: '#1f2937',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#9ca3af' }
        }
      }
    }
  });
}

/**
 * 球員能力雷達圖
 */
function renderRadarChart(playerIndex = 0) {
  const players = appState.data?.sheets?.players?.data || [];
  const batting = appState.data?.sheets?.batting?.data || [];
  const pitching = appState.data?.sheets?.pitching?.data || [];
  const fielding = appState.data?.sheets?.fielding?.data || [];

  if (players.length === 0) return;

  const player = players[playerIndex];
  if (!player) return;

  const name = player['姓名'] || '未知';
  const number = player['背號'] || '--';

  // 找到該球員的各項數據
  const playerBatting = batting.find(b => b['背號'] === number || b['姓名'] === name);
  const playerPitching = pitching.find(p => p['背號'] === number || p['姓名'] === name);
  const playerFielding = fielding.find(f => f['背號'] === number || f['姓名'] === name);

  // 計算標準化分數 (0-100)
  const battingScore = playerBatting ? Math.min(100, (parseFloat(playerBatting['打擊率']) || 0) * 200) : 0;
  const powerScore = playerBatting ? Math.min(100, ((parseInt(playerBatting['二壘打']) || 0) + (parseInt(playerBatting['三壘打']) || 0) * 2 + (parseInt(playerBatting['全壘打']) || 0) * 3) * 10) : 0;
  const speedScore = playerBatting ? Math.min(100, (parseInt(playerBatting['盜壘']) || 0) * 15) : 0;
  const pitchingScore = playerPitching ? Math.min(100, Math.max(0, 100 - (parseFloat(playerPitching['防禦率']) || 10) * 10)) : 0;
  const fieldingScore = playerFielding ? Math.min(100, (parseFloat(playerFielding['守備率']) || 0) * 100) : 0;
  const disciplineScore = playerBatting ? Math.min(100, (parseInt(playerBatting['四壞球']) || 0) * 8 - (parseInt(playerBatting['三振']) || 0) * 3 + 50) : 0;

  destroyChart('radar');

  const ctx = document.getElementById('chart-radar');
  if (!ctx) return;

  Charts.radar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['打擊', '長打力', '速度', '投球', '守備', '選球'],
      datasets: [{
        label: name,
        data: [battingScore, powerScore, speedScore, pitchingScore, fieldingScore, Math.max(0, disciplineScore)],
        backgroundColor: 'rgba(0, 212, 255, 0.2)',
        borderColor: '#00d4ff',
        borderWidth: 2,
        pointBackgroundColor: '#00d4ff',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: '#9ca3af',
            backdropColor: 'transparent'
          },
          grid: { color: 'rgba(55, 65, 81, 0.5)' },
          angleLines: { color: 'rgba(55, 65, 81, 0.5)' },
          pointLabels: {
            color: '#f3f4f6',
            font: { size: 12 }
          }
        }
      }
    }
  });
}

/**
 * 勝負趨勢線圖
 */
function renderWinLossChart() {
  const rawGames = appState.data?.sheets?.games?.data || [];

  // 過濾有效比賽並按日期排序
  const games = rawGames
    .filter(g => g['對手'] && g['對手'].trim() !== '' && g['結果'])
    .slice(0, 15);  // 取最近 15 場

  if (games.length === 0) return;

  const labels = games.map((g, i) => `第${i + 1}場`);
  const runsFor = games.map(g => parseInt(g['我方得分']) || 0);
  const runsAgainst = games.map(g => parseInt(g['對方得分']) || 0);
  const results = games.map(g => g['結果']);

  // 計算累計勝場
  let cumulativeWins = 0;
  const winTrend = games.map(g => {
    if (g['結果'] === '勝') cumulativeWins++;
    return cumulativeWins;
  });

  destroyChart('winLoss');

  const ctx = document.getElementById('chart-win-loss');
  if (!ctx) return;

  Charts.winLoss = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '我方得分',
          data: runsFor,
          borderColor: '#00d4ff',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: '對方得分',
          data: runsAgainst,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: '累計勝場',
          data: winTrend,
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.3,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#9ca3af' }
        },
        tooltip: {
          callbacks: {
            afterLabel: (context) => {
              if (context.datasetIndex === 0) {
                return `結果: ${results[context.dataIndex]}`;
              }
              return '';
            }
          }
        },
        ...getChartZoomConfig()
      },
      scales: {
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        },
        y: {
          beginAtZero: true,
          position: 'left',
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(55, 65, 81, 0.5)' }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          ticks: { color: '#10b981' },
          grid: { display: false }
        }
      }
    }
  });

  // 雙擊重置縮放
  ctx.ondblclick = () => resetChartZoom(Charts.winLoss);
}

/**
 * 渲染對話紀錄
 */
function renderConversation() {
  // 更新對話計數器
  DOM.conversationCounter.textContent = `(${appState.conversationTurn}/${MAX_CONVERSATION_TURNS})`;

  if (appState.conversationHistory.length === 0) {
    DOM.conversationArea.innerHTML = '<p class="text-text-muted text-center py-8">點擊快速分析按鈕或輸入問題開始對話</p>';
    return;
  }

  const html = appState.conversationHistory.map(msg => {
    const isUser = msg.role === 'user';
    const icon = isUser ? Icons.user : Icons.cpu;
    const bgColor = isUser ? 'bg-tech-blue/10' : 'bg-tech-purple/10';
    const borderColor = isUser ? 'border-tech-blue/30' : 'border-tech-purple/30';
    const iconColor = isUser ? 'text-tech-blue' : 'text-tech-purple';

    // 使用者訊息：簡單處理換行
    // AI 回應：使用 marked.js 解析 Markdown
    let content;
    if (isUser) {
      content = msg.content.replace(/\n/g, '<br>');
    } else {
      // 使用 marked 解析 Markdown
      content = marked.parse(msg.content);
    }

    return `
      <div class="${bgColor} ${borderColor} border rounded-lg p-3">
        <div class="flex items-start gap-3">
          <div class="icon-lg ${iconColor} flex-shrink-0 mt-0.5">${icon}</div>
          <div class="flex-1 text-sm text-text-primary markdown-content">${content}</div>
        </div>
      </div>
    `;
  }).join('');

  DOM.conversationArea.innerHTML = html;

  // 捲動到底部
  DOM.conversationArea.scrollTop = DOM.conversationArea.scrollHeight;
}

// ============================================================
// 球員 Modal 功能
// ============================================================

/**
 * 顯示球員詳細資料 Modal
 * @param {number} playerIndex - 球員在陣列中的索引
 */
function showPlayerModal(playerIndex) {
  const players = appState.data?.sheets?.players?.data || [];
  const player = players[playerIndex];

  if (!player) return;

  // 儲存選取的球員
  appState.selectedPlayer = player;

  // 填充基本資料
  const number = player['背號'] || '--';
  const name = player['姓名'] || '未知';

  DOM.modalPlayerNumber.textContent = number;
  DOM.modalPlayerName.textContent = name;

  // 基本資料
  const basicInfoFields = [
    { label: '守位', value: player['守位'] },
    { label: '生日', value: player['生日'] },
    { label: '身高', value: player['身高'] ? `${player['身高']} cm` : null },
    { label: '體重', value: player['體重'] ? `${player['體重']} kg` : null },
    { label: '投打', value: player['投打'] },
    { label: '學校', value: player['就讀學校'] }
  ].filter(f => f.value);

  DOM.modalBasicInfo.innerHTML = basicInfoFields.map(f => `
    <div class="bg-dark-bg p-2 rounded border border-dark-border">
      <p class="text-text-muted text-xs">${f.label}</p>
      <p class="font-medium text-text-primary">${f.value}</p>
    </div>
  `).join('') || '<p class="text-text-muted">無資料</p>';

  // 打擊數據
  const batting = appState.data?.sheets?.batting?.data || [];
  const playerBatting = batting.find(b => b['背號'] === number || b['姓名'] === name);

  if (playerBatting) {
    const battingFields = [
      { label: '打擊率', value: playerBatting['打擊率'] },
      { label: '出賽', value: playerBatting['出賽'] },
      { label: '打席', value: playerBatting['打席'] },
      { label: '打數', value: playerBatting['打數'] },
      { label: '安打', value: playerBatting['安打'] },
      { label: '二壘打', value: playerBatting['二壘打'] },
      { label: '三壘打', value: playerBatting['三壘打'] },
      { label: '全壘打', value: playerBatting['全壘打'] },
      { label: '打點', value: playerBatting['打點'] },
      { label: '得分', value: playerBatting['得分'] },
      { label: '四壞球', value: playerBatting['四壞球'] },
      { label: '三振', value: playerBatting['三振'] },
      { label: '盜壘', value: playerBatting['盜壘'] },
      { label: '上壘率', value: playerBatting['上壘率'] }
    ].filter(f => f.value !== undefined && f.value !== '');

    DOM.modalBattingStats.innerHTML = battingFields.map(f => `
      <div class="bg-dark-bg p-2 rounded text-center border border-dark-border">
        <p class="text-text-muted text-xs">${f.label}</p>
        <p class="font-bold text-tech-blue">${f.value}</p>
      </div>
    `).join('') || '<p class="text-text-muted">無資料</p>';
  } else {
    DOM.modalBattingStats.innerHTML = '<p class="text-text-muted">無打擊資料</p>';
  }

  // 投球數據
  const pitching = appState.data?.sheets?.pitching?.data || [];
  const playerPitching = pitching.find(p => p['背號'] === number || p['姓名'] === name);

  if (playerPitching) {
    DOM.modalPitchingSection.classList.remove('hidden');
    const pitchingFields = [
      { label: '出賽', value: playerPitching['出賽'] },
      { label: '投球局數', value: playerPitching['投球局數'] },
      { label: '勝', value: playerPitching['勝'] },
      { label: '敗', value: playerPitching['敗'] },
      { label: '防禦率', value: playerPitching['防禦率'] },
      { label: '三振', value: playerPitching['三振'] },
      { label: '四壞球', value: playerPitching['四壞球'] },
      { label: '被安打', value: playerPitching['被安打'] },
      { label: '失分', value: playerPitching['失分'] },
      { label: '自責分', value: playerPitching['自責分'] }
    ].filter(f => f.value !== undefined && f.value !== '');

    DOM.modalPitchingStats.innerHTML = pitchingFields.map(f => `
      <div class="bg-dark-bg p-2 rounded text-center border border-dark-border">
        <p class="text-text-muted text-xs">${f.label}</p>
        <p class="font-bold text-success">${f.value}</p>
      </div>
    `).join('') || '<p class="text-text-muted">無資料</p>';
  } else {
    DOM.modalPitchingSection.classList.add('hidden');
  }

  // 守備數據
  const fielding = appState.data?.sheets?.fielding?.data || [];
  const playerFielding = fielding.find(f => f['背號'] === number || f['姓名'] === name);

  if (playerFielding) {
    DOM.modalFieldingSection.classList.remove('hidden');
    const fieldingFields = [
      { label: '守位', value: playerFielding['守位'] },
      { label: '出賽', value: playerFielding['出賽'] },
      { label: '刺殺', value: playerFielding['刺殺'] },
      { label: '助殺', value: playerFielding['助殺'] },
      { label: '失誤', value: playerFielding['失誤'] },
      { label: '守備率', value: playerFielding['守備率'] }
    ].filter(f => f.value !== undefined && f.value !== '');

    DOM.modalFieldingStats.innerHTML = fieldingFields.map(f => `
      <div class="bg-dark-bg p-2 rounded text-center border border-dark-border">
        <p class="text-text-muted text-xs">${f.label}</p>
        <p class="font-bold text-warning">${f.value}</p>
      </div>
    `).join('') || '<p class="text-text-muted">無資料</p>';
  } else {
    DOM.modalFieldingSection.classList.add('hidden');
  }

  // 顯示 Modal
  DOM.playerModal.classList.remove('hidden');
}

/**
 * 隱藏球員詳細資料 Modal
 */
function hidePlayerModal() {
  DOM.playerModal.classList.add('hidden');
  appState.selectedPlayer = null;
}

/**
 * Modal 內的 AI 分析按鈕事件
 */
function onModalAskAI() {
  const player = appState.selectedPlayer;
  if (!player) return;

  const name = player['姓名'] || '此球員';
  const prompt = `請分析 ${name} 的整體表現，包括打擊、投球（如有）和守備能力，並給予訓練建議。`;

  // 關閉 Modal
  hidePlayerModal();

  // 開始新話題並送出分析請求
  startNewConversation();
  DOM.questionInput.value = prompt;
  onSubmitQuestion();
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
 * 快速分析按鈕點擊（延續現有對話）
 * @param {string} prompt - 預設問題
 */
function onQuickAnalysis(prompt) {
  analyzeWithAI(prompt, false);  // false = 延續對話，不清除歷史
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
