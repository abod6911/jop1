/* =========================================================
   إعدادات عامة وثوابت
   ========================================================= */

const WHATSAPP_NUMBER = "966572563602";

// رابط تطبيق جوجل سكريبت لربط البيانات مباشرة بشيتات جوجل (Google Sheet Sync URL)
const webAppUrl = "https://script.google.com/macros/s/AKfycbyGKKCoyppmGfmDxk0EQe-Ftn77mtZUSvLAkcrQ-x4kfXehM1SvS31GaoqHj__9xlSdKw/exec";


const STORAGE_KEYS = {
  USERS: "muhab_users",
  SESSION: "muhab_session",
  ORDERS: "muhab_orders",
  LANG: "muhab_lang",
  THEME: "muhab_theme"
};

let isSyncingToGoogle = false; // لمنع التكرار والإرسال المزدوج (Single Send Lock)
let clockIntervalId = null; // مرجع للساعة الحية
let pendingDeleteId = null; // معرف الطلب المراد حذفه (تأكيد مسبق)
let currentSort = "newest"; // ترتيب الطلبات الافتراضي

/* =========================================================
   قاموس الترجمات الشامل (Arabic & English Translations)
   ========================================================= */
const TRANSLATIONS = {
  ar: {
    page_title: "مهاب | نظام الطلبات المحترف",
    brand_name: "مهاب",
    brand_subtitle: "نظام تسجيل وإدارة الطلبات",
    brand_tagline: "نظام تسجيل الطلبات وإرسالها مباشرة عبر واتساب",
    brand_point_1: "تسجيل بيانات العملاء والشركات بسهولة",
    brand_point_2: "حفظ الطلبات وإدارتها تلقائياً على جهازك",
    brand_point_3: "إرسال الطلب بضغطة واحدة عبر واتساب",
    tab_login: "تسجيل الدخول",
    tab_signup: "حساب جديد",
    form_login_title: "أهلاً بعودتك",
    form_login_subtitle: "سجّل الدخول لمتابعة إدارة طلباتك",
    label_username: "اسم المستخدم",
    placeholder_username_login: "اكتب اسم المستخدم",
    placeholder_username_signup: "اختر اسم مستخدم",
    label_password: "كلمة المرور",
    placeholder_password_login: "اكتب كلمة المرور",
    placeholder_password_signup: "اختر كلمة مرور",
    label_confirm_password: "تأكيد كلمة المرور",
    placeholder_confirm_password: "أعد كتابة كلمة المرور",
    btn_login: "دخول",
    btn_signup: "إنشاء الحساب",
    form_signup_title: "إنشاء حساب جديد",
    form_signup_subtitle: "أنشئ حسابك لتبدأ باستخدام النظام",
    err_fill_all: "الرجاء تعبئة جميع الحقول.",
    err_password_len: "يجب أن تتكون كلمة المرور من 4 أحرف على الأقل.",
    err_password_match: "كلمتا المرور غير متطابقتين.",
    err_user_exists: "اسم المستخدم هذا مستخدم بالفعل، جرّب اسماً آخر.",
    success_signup: "تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.",
    err_login_invalid: "اسم المستخدم أو كلمة المرور غير صحيحة.",
    err_login_empty: "الرجاء إدخال اسم المستخدم وكلمة المرور.",
    welcome_user: "مرحباً، ",
    logout: "تسجيل الخروج",
    stat_total: "إجمالي الطلبات",
    stat_interested: "عملاء مهتمين",
    stat_morning: "تواجد المدير صباحاً",
    stat_send_manager: "إرسال للمدير",
    stat_followup: "تذكير ومتابعة",
    stat_vip: "طلبات VIP عاجلة",
    new_order_title: "طلب جديد",
    label_customer_name: "اسم العميل",
    placeholder_customer_name: "مثال: أحمد محمد",
    label_company_name: "اسم الشركة",
    placeholder_company_name: "مثال: شركة الأمل للتجارة",
    label_customer_phone: "رقم الجوال",
    placeholder_customer_phone: "مثال: 05xxxxxxxx",
    label_location: "الموقع / العنوان",
    placeholder_location: "الحي، الشارع، أقرب معلم",
    label_order_category: "فئة وتصنيف الأولوية",
    category_vip: "🔴 VIP / عاجل جداً",
    category_new: "🟢 عميل جديد",
    category_service: "🔵 تركيب وصيانة",
    category_inquiry: "🟡 استفسار ومتابعة",
    label_followup_date: "موعد وتاريخ المتابعة",
    label_wa_template: "قالب رسالة الواتساب",
    template_full: "📌 طلب جديد شامل",
    template_manager: "☀️ موعد المدير الصباحي",
    template_followup: "🔄 رسالة متابعة للعميل",
    label_order_details: "تفاصيل الطلب",
    placeholder_order_details: "اكتب تفاصيل الطلب هنا...",
    classification_title: "تصنيف ونوعية العميل",
    opt_interested: "هل العميل متحمس أو مهتم للفكرة؟",
    opt_manager_morning: "المدير موجود في الفترة الصباحية",
    opt_send_to_manager: "إرسال التفاصيل إلى المدير",
    btn_save_order: "حفظ الطلب",
    btn_send_whatsapp: "إرسال الطلب عبر واتساب",
    saved_orders_title: "الطلبات المحفوظة",
    btn_export_csv: "تصدير Excel",
    btn_export_report: "تصدير تقرير رسمي",
    placeholder_search: "🔍 بحث في الطلبات (الاسم، الشركة، الجوال)...",
    filter_all: "الكل",
    filter_vip: "🔴 VIP",
    filter_interested: "🔥 مهتم",
    filter_morning: "☀️ صباحاً",
    filter_manager: "📩 للمدير",
    filter_followup: "📅 متابعة",
    orders_empty_text: "لا توجد طلبات محفوظة بعد.",
    orders_empty_hint: "أضف طلبك الأول من النموذج المجاور.",
    err_order_fill: "الرجاء تعبئة جميع حقول الطلب (الاسم، الشركة، الجوال، الموقع، التفاصيل).",
    lbl_phone: "الجوال:",
    lbl_location: "الموقع:",
    lbl_company: "الشركة:",
    lbl_followup: "المتابعة:",
    lbl_copy: "نسخ",
    lbl_print: "طباعة الفاتورة",
    btn_delete: "حذف",
    btn_whatsapp_mini: "إرسال عبر واتساب",
    toast_copied: "📋 تم نسخ نص رسالة الواتساب بنجاح!",
    toast_exported: "📥 تم تصدير الطلبات إلى ملف Excel بنجاح!",
    yes: "نعم",
    no: "لا",
    wa_title: "*طلب جديد - مهاب*",
    wa_name: "👤 *اسم العميل:*",
    wa_company: "🏢 *اسم الشركة:*",
    wa_phone: "📞 *رقم الجوال:*",
    wa_location: "📍 *الموقع/العنوان:*",
    wa_details: "📝 *تفاصيل الطلب:*",
    wa_classification: "📊 *تصنيف ومعلومات العميل:*",
    wa_interested: "• متحمس/مهتم للفكرة:",
    wa_manager_morning: "• المدير موجود صباحاً:",
    wa_send_to_manager: "• إرسال التفاصيل للمدير:",
    wa_followup_label: "📅 *تاريخ موعد المتابعة:*",
    wa_category_label: "🏷️ *فئة الأولوية:*",
    tag_interested: "متحمس للفكرة",
    tag_manager_morning: "المدير صباحاً",
    tag_send_manager: "إرسال للمدير"
  },
  en: {
    page_title: "Muhab | Pro Order System",
    brand_name: "Muhab",
    brand_subtitle: "Order Management System",
    brand_tagline: "Log customer orders and send them directly via WhatsApp",
    brand_point_1: "Easily register customer and company data",
    brand_point_2: "Auto-save and manage orders locally on your device",
    brand_point_3: "One-click order sending via WhatsApp",
    tab_login: "Log In",
    tab_signup: "New Account",
    form_login_title: "Welcome Back",
    form_login_subtitle: "Log in to continue managing your orders",
    label_username: "Username",
    placeholder_username_login: "Enter username",
    placeholder_username_signup: "Choose username",
    label_password: "Password",
    placeholder_password_login: "Enter password",
    placeholder_password_signup: "Choose password",
    label_confirm_password: "Confirm Password",
    placeholder_confirm_password: "Re-enter password",
    btn_login: "Login",
    btn_signup: "Create Account",
    form_signup_title: "Create New Account",
    form_signup_subtitle: "Create your account to start using the system",
    err_fill_all: "Please fill in all fields.",
    err_password_len: "Password must be at least 4 characters long.",
    err_password_match: "Passwords do not match.",
    err_user_exists: "Username already exists, try another.",
    success_signup: "Account created successfully! You can now log in.",
    err_login_invalid: "Invalid username or password.",
    err_login_empty: "Please enter username and password.",
    welcome_user: "Welcome, ",
    logout: "Logout",
    stat_total: "Total Orders",
    stat_interested: "Interested Clients",
    stat_morning: "Morning Manager",
    stat_send_manager: "Send to Manager",
    stat_followup: "Reminders & Follow-ups",
    stat_vip: "Urgent VIP Orders",
    new_order_title: "New Order",
    label_customer_name: "Customer Name",
    placeholder_customer_name: "e.g. John Doe",
    label_company_name: "Company Name",
    placeholder_company_name: "e.g. Hope Trading Co.",
    label_customer_phone: "Phone Number",
    placeholder_customer_phone: "e.g. 05xxxxxxxx",
    label_location: "Location / Address",
    placeholder_location: "District, street, nearest landmark",
    label_order_category: "Priority Category",
    category_vip: "🔴 VIP / Urgent",
    category_new: "🟢 New Lead",
    category_service: "🔵 Service & Install",
    category_inquiry: "🟡 General Inquiry",
    label_followup_date: "Follow-up Date & Time",
    label_wa_template: "WhatsApp Message Template",
    template_full: "📌 Full New Order",
    template_manager: "☀️ Morning Manager Meeting",
    template_followup: "🔄 Client Follow-up Reminder",
    label_order_details: "Order Details",
    placeholder_order_details: "Enter order details here...",
    classification_title: "Customer Classification",
    opt_interested: "Is customer excited / interested in idea?",
    opt_manager_morning: "Manager present in morning period",
    opt_send_to_manager: "Send details to manager",
    btn_save_order: "Save Order",
    btn_send_whatsapp: "Send via WhatsApp",
    saved_orders_title: "Saved Orders",
    btn_export_csv: "Export Excel",
    btn_export_report: "Export Report",
    placeholder_search: "🔍 Search orders (Name, Company, Phone)...",
    filter_all: "All",
    filter_vip: "🔴 VIP",
    filter_interested: "🔥 Interested",
    filter_morning: "☀️ Morning",
    filter_manager: "📩 To Manager",
    filter_followup: "📅 Follow-up",
    orders_empty_text: "No saved orders yet.",
    orders_empty_hint: "Add your first order using the adjacent form.",
    err_order_fill: "Please fill in all order fields (Name, Company, Phone, Location, Details).",
    lbl_phone: "Phone:",
    lbl_location: "Location:",
    lbl_company: "Company:",
    lbl_followup: "Follow-up:",
    lbl_copy: "Copy",
    lbl_print: "Print Receipt",
    btn_delete: "Delete",
    btn_whatsapp_mini: "Send via WhatsApp",
    toast_copied: "📋 WhatsApp message copied successfully!",
    toast_exported: "📥 Orders exported to Excel file successfully!",
    yes: "Yes",
    no: "No",
    wa_title: "*New Order - Muhab*",
    wa_name: "👤 *Customer Name:*",
    wa_company: "🏢 *Company Name:*",
    wa_phone: "📞 *Phone:*",
    wa_location: "📍 *Location/Address:*",
    wa_details: "📝 *Order Details:*",
    wa_classification: "📊 *Customer Classification:*",
    wa_interested: "• Interested in idea:",
    wa_manager_morning: "• Manager present morning:",
    wa_send_to_manager: "• Send details to manager:",
    wa_followup_label: "📅 *Follow-up Date:*",
    wa_category_label: "🏷️ *Priority Category:*",
    tag_interested: "Interested in Idea",
    tag_manager_morning: "Manager Morning",
    tag_send_manager: "Send to Manager"
  }
};

let currentLang = localStorage.getItem(STORAGE_KEYS.LANG) || "ar";
let currentTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
let activeFilter = "all";
let searchQuery = "";

/* =========================================================
   تأثيرات الجمالية والترحيب والتوقيت الحي
   ========================================================= */
function updateLiveClock() {
  const clockTextEl = document.getElementById("clock-text");
  if (!clockTextEl) return;

  const now = new Date();
  const options = {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  
  clockTextEl.textContent = now.toLocaleDateString(currentLang === "ar" ? "ar-SA" : "en-US", options);
}

// الساعة الحية تبدأ فقط عند عرض لوحة التحكم (تُدار في showDashboard/showLoginPage)

function updateWelcomeBanner(username) {
  const isAr = currentLang === "ar";
  const now = new Date();
  const hour = now.getHours();

  let timeGreeting = isAr ? "مرحباً بك مجدداً | لوحة التحكم التنفيذية" : "Welcome Back | Executive Dashboard";
  if (hour >= 5 && hour < 12) {
    timeGreeting = isAr ? "☀️ صباح الخير والنشاط | لوحة التحكم التنفيذية" : "☀️ Good Morning | Executive Dashboard";
  } else if (hour >= 12 && hour < 17) {
    timeGreeting = isAr ? "🌤️ مساء الخير والبركة | لوحة التحكم التنفيذية" : "🌤️ Good Afternoon | Executive Dashboard";
  } else {
    timeGreeting = isAr ? "🌙 مساء الخير والتميّز | لوحة التحكم التنفيذية" : "🌙 Good Evening | Executive Dashboard";
  }

  const greetingLabelEl = document.getElementById("welcome-greeting-label");
  const displayUsernameEl = document.getElementById("display-username");
  const welcomeSubtextEl = document.getElementById("welcome-subtext");

  if (greetingLabelEl) greetingLabelEl.textContent = timeGreeting;
  if (displayUsernameEl) displayUsernameEl.textContent = username || (isAr ? "عابد" : "User");
  if (welcomeSubtextEl) {
    welcomeSubtextEl.textContent = isAr 
      ? "أهلاً بك في منصة مهاب – نتمنى لك يوماً حافلاً بالتوفيق والطلبات المُنجزة بكل سهولة ودقة."
      : "Welcome to Muhab Platform – Wishing you a productive day managing your orders smoothly.";
  }
}

function triggerCelebration() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#C6952E', '#0E3D3B', '#22A85C', '#E7C877']
    });
  }
}

/* =========================================================
   دالة المزامنة الشاملة والمحترفة مع شيتات جوجل (مرة واحدة فقط)
   ========================================================= */
function sendOrderToGoogleSheets(orderObj) {
  if (isSyncingToGoogle || !orderObj) return; // منع التكرار والإرسال المزدوج
  isSyncingToGoogle = true;

  // تحديد الحالة بدقة
  let status = "interested";
  if (orderObj.optSendToManager) status = "send details";
  else if (orderObj.optManagerMorning) status = "unavailable";
  else if (orderObj.optInterested) status = "interested";

  const categoryText = getCategoryLabel(orderObj.category || "new");

  // حمولة إدارية شاملة ومنظمة لـ Google Sheet
  // نستخدم URLSearchParams بدلاً من JSON لأن no-cors لا يسمح بإرسال JSON headers
  const payload = new URLSearchParams();
  payload.append("customerName", orderObj.name || "");
  payload.append("companyName", orderObj.company || "");
  payload.append("phone", orderObj.phone || "");
  payload.append("location", orderObj.location || "");
  payload.append("orderCategory", categoryText);
  payload.append("followUpDate", orderObj.followupDate || "غير محدد");
  payload.append("orderDetails", orderObj.details || "");
  payload.append("optInterested", orderObj.optInterested ? "نعم" : "لا");
  payload.append("optManagerMorning", orderObj.optManagerMorning ? "نعم" : "لا");
  payload.append("optSendToManager", orderObj.optSendToManager ? "نعم" : "لا");
  payload.append("orderStatus", status);
  payload.append("paymentStatus", "unpaid");
  payload.append("createdAt", orderObj.createdAt || new Date().toLocaleString("ar-SA"));

  fetch(webAppUrl, {
    method: "POST",
    mode: "no-cors",
    body: payload
  })
  .then(() => {
    console.log("Order synced once to Google Sheets successfully!");
    showToast("تم مزامنة وتوثيق الطلب في Google Sheet بنجاح! 🟢");
  })
  .catch((err) => console.error("Error syncing order:", err))
  .finally(() => {
    setTimeout(() => { isSyncingToGoogle = false; }, 1200);
  });
}

/* =========================================================
   إدارة الوضع الليلي/النهاري (Dark Mode / Light Mode)
   ========================================================= */
function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  document.documentElement.setAttribute("data-theme", theme);

  const iconText = theme === "dark" ? "☀️" : "🌙";
  document.querySelectorAll(".btn-theme .theme-icon").forEach(el => {
    el.textContent = iconText;
  });
}

function toggleTheme() {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

/* =========================================================
   دوال مساعدة للتعامل مع التخزين المحلي (localStorage)
   ========================================================= */
function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getOrders() {
  const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return raw ? JSON.parse(raw) : [];
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  updateStats();
}

function setSession(username) {
  localStorage.setItem(STORAGE_KEYS.SESSION, username);
}

function getSession() {
  return localStorage.getItem(STORAGE_KEYS.SESSION);
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

/* =========================================================
   تحديث شريط الإحصائيات (Stats Bar)
   ========================================================= */
function updateStats() {
  const orders = getOrders();
  const total = orders.length;
  const interested = orders.filter(o => o.optInterested).length;
  const morning = orders.filter(o => o.optManagerMorning).length;
  const sendManager = orders.filter(o => o.optSendToManager).length;
  const vipCount = orders.filter(o => o.category === "vip").length;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-interested").textContent = interested;
  document.getElementById("stat-morning").textContent = morning;
  document.getElementById("stat-send-manager").textContent = sendManager;
  document.getElementById("stat-vip").textContent = vipCount;
}

/* =========================================================
   إشعارات التوست (Toast Notification)
   ========================================================= */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}

/* =========================================================
   إدارة اللغة وتنسيق الصفحة (i18n)
   ========================================================= */
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEYS.LANG, lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";

  const t = TRANSLATIONS[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  document.querySelectorAll(".btn-lang .lang-text").forEach(el => {
    el.textContent = lang === "ar" ? "English" : "العربية";
  });

  const username = getSession();
  if (username) {
    welcomeUserEl.textContent = `${t.welcome_user}${username}`;
    updateWelcomeBanner(username);
  }

  if (!pageDashboard.classList.contains("hidden")) {
    renderOrders();
    updateStats();
  }
}

function toggleLanguage() {
  const newLang = currentLang === "ar" ? "en" : "ar";
  setLanguage(newLang);
}

/* =========================================================
   عناصر الصفحة (DOM Elements)
   ========================================================= */
const pageLogin = document.getElementById("page-login");
const pageDashboard = document.getElementById("page-dashboard");

const tabLoginBtn = document.getElementById("tab-login-btn");
const tabSignupBtn = document.getElementById("tab-signup-btn");
const formLogin = document.getElementById("form-login");
const formSignup = document.getElementById("form-signup");

const loginError = document.getElementById("login-error");
const signupError = document.getElementById("signup-error");
const signupSuccess = document.getElementById("signup-success");

const welcomeUserEl = document.getElementById("welcome-user");
const logoutBtn = document.getElementById("logout-btn");
const langToggleLogin = document.getElementById("lang-toggle-login");
const langToggleDash = document.getElementById("lang-toggle-dash");
const themeToggleLogin = document.getElementById("theme-toggle-login");
const themeToggleDash = document.getElementById("theme-toggle-dash");

const orderForm = document.getElementById("order-form");
const orderError = document.getElementById("order-error");
const sendWhatsappBtn = document.getElementById("send-whatsapp-btn");

const ordersListEl = document.getElementById("orders-list");
const ordersEmptyEl = document.getElementById("orders-empty");
const orderItemTemplate = document.getElementById("order-item-template");
const printAreaEl = document.getElementById("print-area");

const searchOrdersInput = document.getElementById("search-orders");
const exportCsvBtn = document.getElementById("export-csv-btn");
const exportReportBtn = document.getElementById("export-report-btn");

if (langToggleLogin) langToggleLogin.addEventListener("click", toggleLanguage);
if (langToggleDash) langToggleDash.addEventListener("click", toggleLanguage);
if (themeToggleLogin) themeToggleLogin.addEventListener("click", toggleTheme);
if (themeToggleDash) themeToggleDash.addEventListener("click", toggleTheme);

/* =========================================================
   التبديل بين تبويبَي "تسجيل الدخول" و"حساب جديد"
   ========================================================= */
function switchTab(targetId) {
  const isLogin = targetId === "form-login";

  tabLoginBtn.classList.toggle("active", isLogin);
  tabSignupBtn.classList.toggle("active", !isLogin);

  formLogin.classList.toggle("hidden", !isLogin);
  formSignup.classList.toggle("hidden", isLogin);

  loginError.textContent = "";
  signupError.textContent = "";
  signupSuccess.textContent = "";
}

tabLoginBtn.addEventListener("click", () => switchTab("form-login"));
tabSignupBtn.addEventListener("click", () => switchTab("form-signup"));

/* =========================================================
   إنشاء حساب جديد (Sign up)
   ========================================================= */
formSignup.addEventListener("submit", function (e) {
  e.preventDefault();
  const t = TRANSLATIONS[currentLang];

  signupError.textContent = "";
  signupSuccess.textContent = "";

  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-password-confirm").value;

  if (!username || !password || !confirmPassword) {
    signupError.textContent = t.err_fill_all;
    return;
  }
  if (password.length < 4) {
    signupError.textContent = t.err_password_len;
    return;
  }
  if (password !== confirmPassword) {
    signupError.textContent = t.err_password_match;
    return;
  }

  const users = getUsers();
  const usernameExists = users.some(u => u.username === username);
  if (usernameExists) {
    signupError.textContent = t.err_user_exists;
    return;
  }

  users.push({ username, password });
  saveUsers(users);

  signupSuccess.textContent = t.success_signup;
  formSignup.reset();

  setTimeout(() => switchTab("form-login"), 1200);
});

/* =========================================================
   تسجيل الدخول (Login)
   ========================================================= */
formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  const t = TRANSLATIONS[currentLang];
  loginError.textContent = "";

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    loginError.textContent = t.err_login_empty;
    return;
  }

  const users = getUsers();
  const matchedUser = users.find(u => u.username === username && u.password === password);

  if (!matchedUser) {
    loginError.textContent = t.err_login_invalid;
    return;
  }

  setSession(username);
  formLogin.reset();
  showDashboard(username);
});

/* =========================================================
   تسجيل الخروج (Logout)
   ========================================================= */
logoutBtn.addEventListener("click", function () {
  clearSession();
  showLoginPage();
});

/* =========================================================
   التنقل بين صفحة الدخول ولوحة التحكم
   ========================================================= */
function showDashboard(username) {
  pageLogin.classList.add("hidden");
  pageDashboard.classList.remove("hidden");
  const t = TRANSLATIONS[currentLang];
  welcomeUserEl.textContent = `${t.welcome_user}${username}`;
  
  updateWelcomeBanner(username);
  renderOrders();
  updateStats();

  // بدء الساعة الحية فقط عند عرض لوحة التحكم
  updateLiveClock();
  if (clockIntervalId) clearInterval(clockIntervalId);
  clockIntervalId = setInterval(updateLiveClock, 1000);
}

function showLoginPage() {
  pageDashboard.classList.add("hidden");
  pageLogin.classList.remove("hidden");
  switchTab("form-login");

  // إيقاف الساعة عند تسجيل الخروج لتوفير الموارد
  if (clockIntervalId) {
    clearInterval(clockIntervalId);
    clockIntervalId = null;
  }
}

/* =========================================================
   قراءة بيانات نموذج الطلب
   ========================================================= */
function readOrderFormData() {
  return {
    name: (document.getElementById("customer-name")?.value || "").trim(),
    company: (document.getElementById("customer-company")?.value || "").trim(),
    phone: (document.getElementById("customer-phone")?.value || "").trim(),
    location: (document.getElementById("customer-location")?.value || "").trim(),
    category: document.getElementById("order-category")?.value || "new",
    followupDate: document.getElementById("followup-date")?.value || "",
    waTemplate: document.getElementById("wa-template")?.value || "full",
    details: (document.getElementById("order-details")?.value || "").trim(),
    optInterested: Boolean(document.getElementById("opt-interested")?.checked),
    optManagerMorning: Boolean(document.getElementById("opt-manager-morning")?.checked),
    optSendToManager: Boolean(document.getElementById("opt-send-to-manager")?.checked)
  };
}

function validateOrderData(data) {
  if (!data.name || !data.company || !data.phone || !data.location || !data.details) {
    return TRANSLATIONS[currentLang].err_order_fill;
  }
  return null;
}

/* =========================================================
   حفظ الطلب وإرساله مرة واحدة فقط إلى Google Sheet
   ========================================================= */
orderForm.addEventListener("submit", function (e) {
  e.preventDefault();
  orderError.textContent = "";

  const data = readOrderFormData();
  const errorMsg = validateOrderData(data);
  if (errorMsg) {
    orderError.textContent = errorMsg;
    return;
  }

  const newOrder = {
    id: Date.now().toString(),
    name: data.name,
    company: data.company,
    phone: data.phone,
    location: data.location,
    category: data.category || "new",
    followupDate: data.followupDate,
    waTemplate: data.waTemplate,
    details: data.details,
    optInterested: data.optInterested,
    optManagerMorning: data.optManagerMorning,
    optSendToManager: data.optSendToManager,
    createdAt: new Date().toLocaleString(currentLang === "ar" ? "ar-SA" : "en-US")
  };

  const orders = getOrders();
  orders.unshift(newOrder);
  saveOrders(orders);

  // إطلاق تأثير الألعاب النارية الجمالية
  triggerCelebration();

  // إرسال الطلب مرة واحدة فقط ببيانات كاملة
  sendOrderToGoogleSheets(newOrder);

  renderOrders();
  orderForm.reset();
});

/* =========================================================
   تنسيق رسالة واتساب
   ========================================================= */
function getCategoryLabel(catKey) {
  const t = TRANSLATIONS[currentLang];
  if (catKey === "vip") return t.category_vip;
  if (catKey === "service") return t.category_service;
  if (catKey === "inquiry") return t.category_inquiry;
  return t.category_new;
}

function buildWhatsappMessage(data) {
  const t = TRANSLATIONS[currentLang];
  const yesStr = t.yes;
  const noStr = t.no;

  const interestedStatus = data.optInterested ? yesStr : noStr;
  const managerMorningStatus = data.optManagerMorning ? yesStr : noStr;
  const sendToManagerStatus = data.optSendToManager ? yesStr : noStr;

  const template = data.waTemplate || "full";

  let header = t.wa_title;
  if (template === "manager") {
    header = currentLang === "ar" ? "*تنسيق موعد الفترة الصباحية للمدير - مهاب*" : "*Manager Morning Appointment - Muhab*";
  } else if (template === "followup") {
    header = currentLang === "ar" ? "*تذكير ومتابعة الطلب - مهاب*" : "*Order Follow-up Reminder - Muhab*";
  }

  let followupLine = "";
  if (data.followupDate) {
    const formattedFollowup = new Date(data.followupDate).toLocaleString(currentLang === "ar" ? "ar-SA" : "en-US");
    followupLine = `${t.wa_followup_label} ${formattedFollowup}\n`;
  }

  const categoryText = getCategoryLabel(data.category);

  return (
    `${header}\n` +
    `--------------------------\n` +
    `${t.wa_name} ${data.name}\n` +
    `${t.wa_company} ${data.company || "-"}\n` +
    `${t.wa_phone} ${data.phone}\n` +
    `${t.wa_location} ${data.location}\n` +
    `${t.wa_category_label} ${categoryText}\n` +
    followupLine +
    `${t.wa_details}\n${data.details}\n` +
    `--------------------------\n` +
    `${t.wa_classification}\n` +
    `${t.wa_interested} ${interestedStatus}\n` +
    `${t.wa_manager_morning} ${managerMorningStatus}\n` +
    `${t.wa_send_to_manager} ${sendToManagerStatus}\n` +
    `--------------------------`
  );
}

function sendToWhatsapp(data) {
  const message = buildWhatsappMessage(data);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
}

sendWhatsappBtn.addEventListener("click", function () {
  orderError.textContent = "";

  const data = readOrderFormData();
  const errorMsg = validateOrderData(data);
  if (errorMsg) {
    orderError.textContent = errorMsg;
    return;
  }

  sendToWhatsapp(data);
});

/* =========================================================
   طباعة وتصدير الفاتورة الرسمية الفخمة بالهوية المعتمدة والـ QR
   ========================================================= */
function printOrderReceipt(order) {
  const isAr = currentLang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const followupFormatted = order.followupDate
    ? new Date(order.followupDate).toLocaleString(isAr ? "ar-SA" : "en-US", {
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit"
      })
    : (isAr ? "غير محدد" : "Not specified");

  const categoryText = getCategoryLabel(order.category);
  const receiptNum = `MHB-${order.id.slice(-6).toUpperCase()}`;
  const issueDate = new Date().toLocaleDateString(isAr ? "ar-SA" : "en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  // ألوان التصنيف
  const catColors = {
    vip:     { bg: "#FEE2E2", color: "#DC2626", border: "#FCA5A5" },
    new:     { bg: "#DCFCE7", color: "#15803D", border: "#86EFAC" },
    service: { bg: "#DBEAFE", color: "#1D4ED8", border: "#93C5FD" },
    inquiry: { bg: "#FEF3C7", color: "#B45309", border: "#FDE68A" }
  };
  const cat = catColors[order.category || "new"] || catColors.new;

  const badge = (active, yesLabel, noLabel) => `
    <div style="display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:8px;
      background:${active ? "#F0FDF4" : "#FFF5F5"};
      border:1px solid ${active ? "#86EFAC" : "#FECACA"};
      flex:1;min-width:0;">
      <span style="font-size:1rem;">${active ? "✅" : "❌"}</span>
      <div style="font-size:0.73rem;font-weight:700;color:${active ? "#15803D" : "#DC2626"};
        line-height:1.3;">${active ? yesLabel : noLabel}</div>
    </div>
  `;

  const printHtml = `
    <div style="
      font-family:'Tajawal','Cairo','Segoe UI',sans-serif;
      direction:${dir};
      width:190mm;
      max-height:267mm;
      margin:0 auto;
      background:#fff;
      color:#16302C;
      overflow:hidden;
      box-sizing:border-box;
      font-size:13px;
    ">

      <!-- ====== رأس الفاتورة ====== -->
      <div style="
        background:linear-gradient(135deg,#0E3D3B 0%,#1A5E58 100%);
        color:#fff;
        padding:14px 20px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        border-radius:10px 10px 0 0;
      ">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="
            width:52px;height:52px;border-radius:50%;
            background:rgba(255,255,255,0.1);
            border:2.5px solid #E7C877;
            display:flex;align-items:center;justify-content:center;
            font-size:1.6rem;color:#E7C877;font-weight:900;flex-shrink:0;
          ">م</div>
          <div>
            <div style="font-size:1.15rem;font-weight:900;letter-spacing:0.3px;">
              ${isAr ? "مؤسسة مهاب لإدارة الطلبات" : "Muhab Enterprise – Order Management"}
            </div>
            <div style="font-size:0.7rem;color:rgba(255,255,255,0.8);margin-top:3px;">
              ${isAr ? "نظام إدارة وتوثيق طلبات العملاء" : "Certified Customer Order Management System"}
            </div>
          </div>
        </div>
        <div style="text-align:${isAr ? "left" : "right"};
          background:rgba(0,0,0,0.2);border-radius:8px;padding:10px 16px;">
          <div style="font-size:1.3rem;font-weight:900;color:#E7C877;letter-spacing:1.5px;">${receiptNum}</div>
          <div style="font-size:0.68rem;color:rgba(255,255,255,0.9);margin-top:2px;">
            ${isAr ? "سند تسجيل طلب رسمي" : "Official Order Registration Receipt"}
          </div>
          <div style="font-size:0.65rem;color:rgba(255,255,255,0.7);margin-top:2px;">
            ${isAr ? "تاريخ الإصدار:" : "Date:"} ${issueDate}
          </div>
        </div>
      </div>

      <!-- ====== شريط الحالة ====== -->
      <div style="
        background:#F4F7F5;
        border-inline:2px solid #0E3D3B;
        padding:7px 18px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        font-size:0.75rem;
        color:#52685F;
      ">
        <span>📋 ${isAr ? "رقم الطلب:" : "Order No:"} <strong style="color:#0E3D3B;font-size:0.85rem;">${receiptNum}</strong></span>
        <span style="
          padding:3px 14px;border-radius:999px;font-weight:700;font-size:0.72rem;
          background:${cat.bg};color:${cat.color};border:1px solid ${cat.border};
        ">${categoryText}</span>
        <span>🕒 ${order.createdAt}</span>
      </div>

      <!-- ====== جسم الفاتورة ====== -->
      <div style="border:2px solid #0E3D3B;border-top:none;border-radius:0 0 10px 10px;padding:14px 18px;">

        <!-- بيانات العميل -->
        <div style="
          display:flex;align-items:center;gap:8px;
          margin-bottom:8px;
        ">
          <span style="background:#0E3D3B;color:#E7C877;border-radius:5px;
            padding:3px 10px;font-size:0.72rem;font-weight:900;">
            👤 ${isAr ? "بيانات العميل" : "Client Information"}
          </span>
          <div style="flex:1;height:1px;background:#C6952E;"></div>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:0.8rem;">
          <tr>
            <td style="padding:6px 10px;background:#F4F7F5;font-weight:700;color:#0E3D3B;
              width:18%;border:1px solid #DDE6E1;white-space:nowrap;">
              ${isAr ? "اسم العميل" : "Customer"}
            </td>
            <td style="padding:6px 10px;font-weight:800;color:#0E3D3B;
              width:32%;border:1px solid #DDE6E1;font-size:0.88rem;">
              ${order.name}
            </td>
            <td style="padding:6px 10px;background:#F4F7F5;font-weight:700;color:#0E3D3B;
              width:18%;border:1px solid #DDE6E1;white-space:nowrap;">
              ${isAr ? "اسم الشركة" : "Company"}
            </td>
            <td style="padding:6px 10px;color:#16302C;width:32%;border:1px solid #DDE6E1;">
              ${order.company || "-"}
            </td>
          </tr>
          <tr>
            <td style="padding:6px 10px;background:#F4F7F5;font-weight:700;color:#0E3D3B;
              border:1px solid #DDE6E1;white-space:nowrap;">
              ${isAr ? "رقم الجوال" : "Phone"}
            </td>
            <td style="padding:6px 10px;color:#16302C;border:1px solid #DDE6E1;font-weight:600;">${order.phone}</td>
            <td style="padding:6px 10px;background:#F4F7F5;font-weight:700;color:#0E3D3B;
              border:1px solid #DDE6E1;white-space:nowrap;">
              ${isAr ? "الموقع" : "Location"}
            </td>
            <td style="padding:6px 10px;color:#16302C;border:1px solid #DDE6E1;">${order.location}</td>
          </tr>
          <tr>
            <td style="padding:6px 10px;background:#F4F7F5;font-weight:700;color:#0E3D3B;
              border:1px solid #DDE6E1;white-space:nowrap;">
              ${isAr ? "موعد المتابعة" : "Follow-up"}
            </td>
            <td colspan="3" style="padding:6px 10px;color:#16302C;
              border:1px solid #DDE6E1;font-weight:600;">${followupFormatted}</td>
          </tr>
        </table>

        <!-- تفاصيل الطلب -->
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="background:#0E3D3B;color:#E7C877;border-radius:5px;
            padding:3px 10px;font-size:0.72rem;font-weight:900;">
            📝 ${isAr ? "تفاصيل الطلب" : "Order Details"}
          </span>
          <div style="flex:1;height:1px;background:#C6952E;"></div>
        </div>
        <div style="
          background:#F8FAFB;
          border:1px solid #DDE6E1;
          border-radius:6px;
          padding:10px 14px;
          font-size:0.82rem;
          line-height:1.7;
          color:#16302C;
          margin-bottom:12px;
          min-height:55px;
          max-height:85px;
          overflow:hidden;
          white-space:pre-wrap;
        ">${order.details}</div>

        <!-- تصنيف العميل -->
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="background:#0E3D3B;color:#E7C877;border-radius:5px;
            padding:3px 10px;font-size:0.72rem;font-weight:900;">
            📊 ${isAr ? "تصنيف ومؤشرات العميل" : "Customer Classification"}
          </span>
          <div style="flex:1;height:1px;background:#C6952E;"></div>
        </div>
        <div style="display:flex;gap:8px;margin-bottom:16px;">
          ${badge(
            order.optInterested,
            isAr ? "🔥 مهتم بالفكرة" : "🔥 Interested",
            isAr ? "🔥 غير مهتم" : "🔥 Not Interested"
          )}
          ${badge(
            order.optManagerMorning,
            isAr ? "☀️ مدير متاح صباحاً" : "☀️ Manager Available",
            isAr ? "☀️ مدير غير متاح" : "☀️ Manager Unavailable"
          )}
          ${badge(
            order.optSendToManager,
            isAr ? "📩 مطلوب رفع للمدير" : "📩 Send to Manager",
            isAr ? "📩 لا يتطلب رفع" : "📩 No escalation"
          )}
        </div>

        <!-- تذييل الفاتورة -->
        <div style="
          border-top:2px solid #C6952E;
          padding-top:12px;
          display:flex;
          align-items:flex-end;
          justify-content:space-between;
          position:relative;
        ">
          <div style="text-align:center;font-size:0.72rem;color:#0E3D3B;font-weight:700;">
            <div>${isAr ? "توقيع الموظف المختص" : "Authorized Agent Signature"}</div>
            <div style="width:130px;border-bottom:1.5px dashed #0E3D3B;margin-top:24px;"></div>
          </div>

          <!-- ختم المؤسسة -->
          <div style="
            width:74px;height:74px;border-radius:50%;
            border:2px dashed #C6952E;
            display:flex;flex-direction:column;
            align-items:center;justify-content:center;
            color:#C6952E;transform:rotate(-15deg);
            position:absolute;top:50%;left:50%;
            transform:translate(-50%,-50%) rotate(-15deg);
          ">
            <div style="font-size:0.95rem;font-weight:900;">${isAr ? "مهاب" : "Muhab"}</div>
            <div style="font-size:0.62rem;font-weight:700;">${isAr ? "معتمد ✓" : "Verified ✓"}</div>
          </div>

          <div style="text-align:center;font-size:0.72rem;color:#0E3D3B;font-weight:700;">
            <div>${isAr ? "اعتماد الإدارة والختم" : "Management Approval & Seal"}</div>
            <div style="width:130px;border-bottom:1.5px dashed #0E3D3B;margin-top:24px;"></div>
          </div>
        </div>

      </div>

      <!-- ملاحظة سفلية -->
      <div style="text-align:center;font-size:0.6rem;color:#9BB0AA;margin-top:7px;">
        ${isAr
          ? "صادر إلكترونياً عبر نظام مهاب لإدارة الطلبات | جميع الحقوق محفوظة"
          : "Electronically issued by Muhab Order Management System | All rights reserved"}
      </div>
    </div>
  `;

  printAreaEl.innerHTML = printHtml;
  window.print();
}


/* =========================================================
   تصدير التقرير التنفيذي الشامل لجميع الطلبات كـ PDF/طباعة
   ========================================================= */
function printAllOrdersReport() {
  const orders = getOrders();
  if (orders.length === 0) return;

  const isAr = currentLang === "ar";
  const total = orders.length;
  const interested = orders.filter(o => o.optInterested).length;
  const morning = orders.filter(o => o.optManagerMorning).length;
  const sendManager = orders.filter(o => o.optSendToManager).length;

  let tableRows = "";
  orders.forEach((o, index) => {
    const followupFormatted = o.followupDate
      ? new Date(o.followupDate).toLocaleString(isAr ? "ar-SA" : "en-US")
      : "-";

    const categoryText = getCategoryLabel(o.category);

    const interestedBadge = `<span class="report-badge ${o.optInterested ? 'yes' : 'no'}">🔥 ${o.optInterested ? (isAr ? "نعم" : "Yes") : (isAr ? "لا" : "No")}</span>`;
    const morningBadge = `<span class="report-badge ${o.optManagerMorning ? 'yes' : 'no'}">☀️ ${o.optManagerMorning ? (isAr ? "نعم" : "Yes") : (isAr ? "لا" : "No")}</span>`;
    const managerBadge = `<span class="report-badge ${o.optSendToManager ? 'yes' : 'no'}">📩 ${o.optSendToManager ? (isAr ? "نعم" : "Yes") : (isAr ? "لا" : "No")}</span>`;

    tableRows += `
      <tr>
        <td>#${index + 1}</td>
        <td><strong>${o.name}</strong></td>
        <td>${o.company || "-"}</td>
        <td>${o.phone}</td>
        <td>${o.location}</td>
        <td><strong>${categoryText}</strong></td>
        <td>${followupFormatted}</td>
        <td>${interestedBadge} ${morningBadge} ${managerBadge}</td>
        <td>${o.details}</td>
      </tr>
    `;
  });

  const reportHtml = `
    <div class="report-container">
      <div class="report-header">
        <div class="invoice-brand-block">
          <div class="invoice-seal"><span>م</span></div>
          <div class="invoice-title-text">
            <h1>${isAr ? "مؤسسة مهاب لإدارة الخدمات والطلبات" : "Muhab Enterprise for Order Services"}</h1>
            <p>${isAr ? "تقرير الإدارة التنفيذي لطلبات وسجلات العملاء" : "Executive Management Orders Summary Report"}</p>
          </div>
        </div>
        <div class="invoice-doc-meta">
          <div class="invoice-doc-type">${isAr ? "تقرير الطلبات الشامل" : "Executive Orders Report"}</div>
          <div class="invoice-meta-row">${isAr ? "التاريخ:" : "Date:"} ${new Date().toLocaleString(isAr ? "ar-SA" : "en-US")}</div>
        </div>
      </div>

      <div class="report-summary-bar">
        <div class="report-stat-item">
          <div class="report-stat-num">${total}</div>
          <div class="report-stat-lbl">${isAr ? "إجمالي الطلبات" : "Total Orders"}</div>
        </div>
        <div class="report-stat-item">
          <div class="report-stat-num">${interested}</div>
          <div class="report-stat-lbl">${isAr ? "العملاء المهتمين" : "Interested Clients"}</div>
        </div>
        <div class="report-stat-item">
          <div class="report-stat-num">${morning}</div>
          <div class="report-stat-lbl">${isAr ? "تواجد المدير صباحاً" : "Morning Manager"}</div>
        </div>
        <div class="report-stat-item">
          <div class="report-stat-num">${sendManager}</div>
          <div class="report-stat-lbl">${isAr ? "الرفع للمدير" : "Forward to Manager"}</div>
        </div>
      </div>

      <table class="report-table">
        <thead>
          <tr>
            <th>#</th>
            <th>${isAr ? "اسم العميل" : "Customer"}</th>
            <th>${isAr ? "اسم الشركة" : "Company"}</th>
            <th>${isAr ? "الجوال" : "Phone"}</th>
            <th>${isAr ? "الموقع" : "Location"}</th>
            <th>${isAr ? "الفئة" : "Category"}</th>
            <th>${isAr ? "المتابعة" : "Follow-up"}</th>
            <th>${isAr ? "التصنيفات" : "Tags"}</th>
            <th>${isAr ? "تفاصيل الطلب" : "Details"}</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>

      <div class="invoice-footer-block">
        <div class="invoice-sign-box">
          <div>${isAr ? "توقيع مدير المبيعات والعمليات" : "Sales Manager Signature"}</div>
          <div class="invoice-sign-line"></div>
        </div>
        <div class="invoice-watermark-stamp">
          <div>مؤسسة مهاب</div>
          <div>تقرير معتمد</div>
        </div>
        <div class="invoice-sign-box">
          <div>${isAr ? "اعتماد الإدارة العامة والختم" : "General Management Stamp"}</div>
          <div class="invoice-sign-line"></div>
        </div>
      </div>
    </div>
  `;

  printAreaEl.innerHTML = reportHtml;
  window.print();
}

if (exportReportBtn) {
  exportReportBtn.addEventListener("click", printAllOrdersReport);
}

/* =========================================================
   البحث والتصفية في قائمة الطلبات المحفوظة
   ========================================================= */
if (searchOrdersInput) {
  searchOrdersInput.addEventListener("input", function (e) {
    searchQuery = e.target.value.toLowerCase().trim();
    const clearBtn = document.getElementById("clear-search-btn");
    if (clearBtn) clearBtn.classList.toggle("hidden", !e.target.value);
    renderOrders();
  });
}

// زر مسح البحث
const clearSearchBtn = document.getElementById("clear-search-btn");
if (clearSearchBtn) {
  clearSearchBtn.addEventListener("click", () => {
    searchOrdersInput.value = "";
    searchQuery = "";
    clearSearchBtn.classList.add("hidden");
    renderOrders();
  });
}

// ترتيب الطلبات
const sortSelectEl = document.getElementById("sort-orders-select");
if (sortSelectEl) {
  sortSelectEl.addEventListener("change", function () {
    currentSort = this.value;
    renderOrders();
  });
}

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", function () {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    this.classList.add("active");
    activeFilter = this.getAttribute("data-filter");
    renderOrders();
  });
});

/* =========================================================
   عرض قائمة الطلبات المحفوظة في الصفحة
   ========================================================= */
function renderOrders() {
  let orders = getOrders();
  const t = TRANSLATIONS[currentLang];
  const today = new Date().toDateString();

  // بحث
  if (searchQuery) {
    orders = orders.filter(o =>
      (o.name && o.name.toLowerCase().includes(searchQuery)) ||
      (o.company && o.company.toLowerCase().includes(searchQuery)) ||
      (o.phone && o.phone.toLowerCase().includes(searchQuery)) ||
      (o.location && o.location.toLowerCase().includes(searchQuery)) ||
      (o.details && o.details.toLowerCase().includes(searchQuery))
    );
  }

  // فلتر
  if (activeFilter === "vip") {
    orders = orders.filter(o => o.category === "vip");
  } else if (activeFilter === "interested") {
    orders = orders.filter(o => o.optInterested);
  } else if (activeFilter === "morning") {
    orders = orders.filter(o => o.optManagerMorning);
  } else if (activeFilter === "manager") {
    orders = orders.filter(o => o.optSendToManager);
  } else if (activeFilter === "followup") {
    orders = orders.filter(o => o.followupDate);
  }

  // ترتيب
  if (currentSort === "oldest") {
    orders = [...orders].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (currentSort === "vip") {
    orders = [...orders].sort((a, b) => (a.category === "vip" ? -1 : 1));
  } else {
    // newest first (default) – keep original reverse order
    orders = [...orders].reverse();
  }

  ordersEmptyEl.classList.toggle("hidden", orders.length > 0);
  ordersListEl.innerHTML = "";

  orders.forEach(order => {
    const clone = orderItemTemplate.content.cloneNode(true);
    const isToday = order.followupDate &&
      new Date(order.followupDate).toDateString() === today;

    clone.querySelector(".order-item-name").textContent = order.name;
    clone.querySelector(".order-item-company").textContent = order.company ? `🏢 ${order.company}` : "";
    clone.querySelector(".order-item-date").textContent = order.createdAt;
    clone.querySelector(".order-item-phone").textContent = order.phone;
    clone.querySelector(".order-item-location").textContent = order.location;

    // شارة المتابعة اليوم
    if (isToday) {
      const todayBadge = document.createElement("span");
      todayBadge.className = "today-followup-badge";
      todayBadge.textContent = "⚡ متابعة اليوم!";
      clone.querySelector(".order-item-date").after(todayBadge);
    }

    // شارة فئة الأولوية
    const catBadge = clone.querySelector(".category-badge");
    const catKey = order.category || "new";
    if (catBadge) {
      catBadge.className = `category-badge ${catKey}`;
      catBadge.textContent = getCategoryLabel(catKey);
    }

    const followupRow = clone.querySelector(".order-item-followup-row");
    if (order.followupDate && followupRow) {
      followupRow.classList.remove("hidden");
      const formattedDate = new Date(order.followupDate).toLocaleString(currentLang === "ar" ? "ar-SA" : "en-US");
      clone.querySelector(".order-item-followup").textContent = formattedDate;
    }

    clone.querySelector(".order-item-details").textContent = order.details;

    const lblPhone = clone.querySelector(".lbl-phone");
    const lblLocation = clone.querySelector(".lbl-location");
    const lblFollowup = clone.querySelector(".lbl-followup");
    if (lblPhone) lblPhone.textContent = t.lbl_phone;
    if (lblLocation) lblLocation.textContent = t.lbl_location;
    if (lblFollowup) lblFollowup.textContent = t.lbl_followup;

    const tagsContainer = clone.querySelector(".order-item-tags");
    if (tagsContainer) {
      tagsContainer.appendChild(createTagBadge(t.tag_interested, order.optInterested));
      tagsContainer.appendChild(createTagBadge(t.tag_manager_morning, order.optManagerMorning));
      tagsContainer.appendChild(createTagBadge(t.tag_send_manager, order.optSendToManager));
    }

    const btnWa = clone.querySelector(".btn-whatsapp-mini");
    const btnCopy = clone.querySelector(".btn-copy-mini");
    const btnPrint = clone.querySelector(".btn-print-mini");
    const btnDel = clone.querySelector(".btn-delete-mini");

    if (btnWa) {
      btnWa.textContent = t.btn_whatsapp_mini;
      btnWa.addEventListener("click", () => sendToWhatsapp(order));
    }

    if (btnCopy) {
      btnCopy.querySelector(".lbl-copy").textContent = t.lbl_copy;
      btnCopy.addEventListener("click", () => {
        const msg = buildWhatsappMessage(order);
        navigator.clipboard.writeText(msg).then(() => {
          showToast(t.toast_copied);
        });
      });
    }

    if (btnPrint) {
      btnPrint.querySelector(".lbl-print").textContent = t.lbl_print;
      btnPrint.addEventListener("click", () => printOrderReceipt(order));
    }

    if (btnDel) {
      btnDel.textContent = t.btn_delete;
      btnDel.addEventListener("click", () => confirmDeleteOrder(order.id, order.name));
    }

    ordersListEl.appendChild(clone);
  });
}

function createTagBadge(text, isActive) {
  const span = document.createElement("span");
  span.className = `tag-badge ${isActive ? "active" : "inactive"}`;
  span.textContent = `${isActive ? "✓" : "✗"} ${text}`;
  return span;
}

/* =========================================================
   حذف الطلب بتأكيد عبر مودال
   ========================================================= */
/* فتح مودال تأكيد الحذف */
const deleteModalEl      = document.getElementById("delete-modal");
const modalOrderNameEl   = document.getElementById("modal-order-name");
const modalCancelBtn     = document.getElementById("modal-cancel-btn");
const modalConfirmBtn    = document.getElementById("modal-confirm-btn");

function confirmDeleteOrder(orderId, orderName) {
  pendingDeleteId = orderId;
  if (modalOrderNameEl) modalOrderNameEl.textContent = orderName;
  if (deleteModalEl) deleteModalEl.classList.remove("hidden");
}

if (modalCancelBtn) {
  modalCancelBtn.addEventListener("click", () => {
    pendingDeleteId = null;
    deleteModalEl.classList.add("hidden");
  });
}

if (modalConfirmBtn) {
  modalConfirmBtn.addEventListener("click", () => {
    if (pendingDeleteId) {
      deleteOrder(pendingDeleteId);
      pendingDeleteId = null;
    }
    deleteModalEl.classList.add("hidden");
  });
}

// إغلاق المودال لما يضغط خارجه
if (deleteModalEl) {
  deleteModalEl.addEventListener("click", (e) => {
    if (e.target === deleteModalEl) {
      pendingDeleteId = null;
      deleteModalEl.classList.add("hidden");
    }
  });
}

function deleteOrder(orderId) {
  const orders = getOrders().filter(o => o.id !== orderId);
  saveOrders(orders);
  renderOrders();
  updateStats();
}

/* =========================================================
   تصدير البيانات إلى ملف CSV / Excel
   ========================================================= */
if (exportCsvBtn) {
  exportCsvBtn.addEventListener("click", function () {
    const orders = getOrders();
    if (orders.length === 0) return;

    let csvContent = "\uFEFF";
    csvContent += "اسم العميل,اسم الشركة,رقم الجوال,الموقع,فئة الأولوية,تاريخ المتابعة,تفاصيل الطلب,مهتم بالفكرة,المدير صباحاً,إرسال للمدير,تاريخ الإنشاء\n";

    orders.forEach(o => {
      const name = `"${(o.name || "").replace(/"/g, '""')}"`;
      const company = `"${(o.company || "").replace(/"/g, '""')}"`;
      const phone = `"${(o.phone || "").replace(/"/g, '""')}"`;
      const location = `"${(o.location || "").replace(/"/g, '""')}"`;
      const category = `"${getCategoryLabel(o.category)}"`;
      const followup = `"${(o.followupDate || "").replace(/"/g, '""')}"`;
      const details = `"${(o.details || "").replace(/"/g, '""')}"`;
      const interested = o.optInterested ? "نعم" : "لا";
      const morning = o.optManagerMorning ? "نعم" : "لا";
      const sendManager = o.optSendToManager ? "نعم" : "لا";
      const date = `"${o.createdAt || ""}"`;

      csvContent += `${name},${company},${phone},${location},${category},${followup},${details},${interested},${morning},${sendManager},${date}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `muhab_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(TRANSLATIONS[currentLang].toast_exported);
  });
}

/* =========================================================
   تهيئة الجلسة واللغة والثيم عند تحميل الصفحة
   ========================================================= */
(function init() {
  setTheme(currentTheme);
  setLanguage(currentLang);

  const currentUser = getSession();
  if (currentUser) {
    showDashboard(currentUser);
  } else {
    showLoginPage();
  }
})();
