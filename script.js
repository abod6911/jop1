/* =========================================================
   إعدادات عامة وثوابت
   ========================================================= */

// رقم واتساب الشركة الذي سيتم إرسال الطلبات إليه (بصيغة دولية بدون + أو أصفار)
const WHATSAPP_NUMBER = "966572563602";

// أسماء المفاتيح المستخدمة في التخزين المحلي (localStorage)
const STORAGE_KEYS = {
  USERS: "muhab_users",       // قائمة الحسابات المسجّلة
  SESSION: "muhab_session",   // المستخدم الحالي المسجّل دخوله
  ORDERS: "muhab_orders",     // الطلبات المحفوظة
  LANG: "muhab_lang"          // اللغة المختارة
};

/* =========================================================
   قاموس الترجمات (Arabic & English Translations)
   ========================================================= */
const TRANSLATIONS = {
  ar: {
    page_title: "مهاب | نظام الطلبات",
    brand_name: "مهاب",
    brand_subtitle: "نظام تسجيل الطلبات",
    brand_tagline: "نظام تسجيل الطلبات وإرسالها مباشرة عبر واتساب",
    brand_point_1: "تسجيل بيانات العملاء بسهولة",
    brand_point_2: "حفظ الطلبات تلقائياً على جهازك",
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
    new_order_title: "طلب جديد",
    label_customer_name: "اسم العميل",
    placeholder_customer_name: "مثال: أحمد محمد",
    label_customer_phone: "رقم الجوال",
    placeholder_customer_phone: "مثال: 05xxxxxxxx",
    label_location: "الموقع / العنوان",
    placeholder_location: "الحي، الشارع، أقرب معلم",
    label_order_details: "تفاصيل الطلب",
    placeholder_order_details: "اكتب تفاصيل الطلب هنا...",
    classification_title: "تصنيف ونوعية العميل",
    opt_interested: "هل العميل متحمس أو مهتم للفكرة؟",
    opt_manager_morning: "المدير موجود في الفترة الصباحية",
    opt_send_to_manager: "إرسال التفاصيل إلى المدير",
    btn_save_order: "حفظ الطلب",
    btn_send_whatsapp: "إرسال الطلب عبر واتساب",
    saved_orders_title: "الطلبات المحفوظة",
    orders_empty_text: "لا توجد طلبات محفوظة بعد.",
    orders_empty_hint: "أضف طلبك الأول من النموذج المجاور.",
    err_order_fill: "الرجاء تعبئة جميع حقول الطلب قبل المتابعة.",
    lbl_phone: "الجوال:",
    lbl_location: "الموقع:",
    btn_delete: "حذف",
    btn_whatsapp_mini: "إرسال عبر واتساب",
    yes: "نعم",
    no: "لا",
    wa_title: "*طلب جديد - مهاب*",
    wa_name: "👤 *اسم العميل:*",
    wa_phone: "📞 *رقم الجوال:*",
    wa_location: "📍 *الموقع/العنوان:*",
    wa_details: "📝 *تفاصيل الطلب:*",
    wa_classification: "📊 *تصنيف ومعلومات العميل:*",
    wa_interested: "• متحمس/مهتم للفكرة:",
    wa_manager_morning: "• المدير موجود صباحاً:",
    wa_send_to_manager: "• إرسال التفاصيل للمدير:",
    tag_interested: "متحمس للفكرة",
    tag_manager_morning: "المدير صباحاً",
    tag_send_manager: "إرسال للمدير"
  },
  en: {
    page_title: "Muhab | Order System",
    brand_name: "Muhab",
    brand_subtitle: "Order Management System",
    brand_tagline: "Log customer orders and send them directly via WhatsApp",
    brand_point_1: "Easy customer data registration",
    brand_point_2: "Auto-save orders locally on your device",
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
    new_order_title: "New Order",
    label_customer_name: "Customer Name",
    placeholder_customer_name: "e.g. John Doe",
    label_customer_phone: "Phone Number",
    placeholder_customer_phone: "e.g. 05xxxxxxxx",
    label_location: "Location / Address",
    placeholder_location: "District, street, nearest landmark",
    label_order_details: "Order Details",
    placeholder_order_details: "Enter order details here...",
    classification_title: "Customer Classification",
    opt_interested: "Is customer excited / interested in idea?",
    opt_manager_morning: "Manager present in morning period",
    opt_send_to_manager: "Send details to manager",
    btn_save_order: "Save Order",
    btn_send_whatsapp: "Send via WhatsApp",
    saved_orders_title: "Saved Orders",
    orders_empty_text: "No saved orders yet.",
    orders_empty_hint: "Add your first order using the adjacent form.",
    err_order_fill: "Please fill in all order fields before proceeding.",
    lbl_phone: "Phone:",
    lbl_location: "Location:",
    btn_delete: "Delete",
    btn_whatsapp_mini: "Send via WhatsApp",
    yes: "Yes",
    no: "No",
    wa_title: "*New Order - Muhab*",
    wa_name: "👤 *Customer Name:*",
    wa_phone: "📞 *Phone:*",
    wa_location: "📍 *Location/Address:*",
    wa_details: "📝 *Order Details:*",
    wa_classification: "📊 *Customer Classification:*",
    wa_interested: "• Interested in idea:",
    wa_manager_morning: "• Manager present morning:",
    wa_send_to_manager: "• Send details to manager:",
    tag_interested: "Interested in Idea",
    tag_manager_morning: "Manager Morning",
    tag_send_manager: "Send to Manager"
  }
};

let currentLang = localStorage.getItem(STORAGE_KEYS.LANG) || "ar";

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
   إدارة اللغة وتنسيق الصفحة (i18n & Direction)
   ========================================================= */

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEYS.LANG, lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";

  const t = TRANSLATIONS[lang];

  // تحديث نصوص العناصر ذات data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // تحديث النصوص التوضيحية placeholders
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // تحديث زر تبديل اللغة
  document.querySelectorAll(".btn-lang .lang-text").forEach(el => {
    el.textContent = lang === "ar" ? "English" : "العربية";
  });

  // تحديث اسم المستخدم الترحيبي
  const username = getSession();
  if (username) {
    welcomeUserEl.textContent = `${t.welcome_user}${username}`;
  }

  // إعادة عرض الطلبات لتحديث لغة العناوين والتصنيفات
  if (!pageDashboard.classList.contains("hidden")) {
    renderOrders();
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

const orderForm = document.getElementById("order-form");
const orderError = document.getElementById("order-error");
const sendWhatsappBtn = document.getElementById("send-whatsapp-btn");

const ordersListEl = document.getElementById("orders-list");
const ordersEmptyEl = document.getElementById("orders-empty");
const orderItemTemplate = document.getElementById("order-item-template");

// ربط أحداث زر تغيير اللغة
if (langToggleLogin) langToggleLogin.addEventListener("click", toggleLanguage);
if (langToggleDash) langToggleDash.addEventListener("click", toggleLanguage);

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
  renderOrders();
}

function showLoginPage() {
  pageDashboard.classList.add("hidden");
  pageLogin.classList.remove("hidden");
  switchTab("form-login");
}

/* =========================================================
   قراءة بيانات نموذج الطلب الحالي شاملاً الخيارات الثلاثة
   ========================================================= */
function readOrderFormData() {
  return {
    name: document.getElementById("customer-name").value.trim(),
    phone: document.getElementById("customer-phone").value.trim(),
    location: document.getElementById("customer-location").value.trim(),
    details: document.getElementById("order-details").value.trim(),
    optInterested: document.getElementById("opt-interested").checked,
    optManagerMorning: document.getElementById("opt-manager-morning").checked,
    optSendToManager: document.getElementById("opt-send-to-manager").checked
  };
}

function validateOrderData(data) {
  if (!data.name || !data.phone || !data.location || !data.details) {
    return TRANSLATIONS[currentLang].err_order_fill;
  }
  return null;
}

/* =========================================================
   حفظ الطلب (Order Form Submit)
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
    phone: data.phone,
    location: data.location,
    details: data.details,
    optInterested: data.optInterested,
    optManagerMorning: data.optManagerMorning,
    optSendToManager: data.optSendToManager,
    createdAt: new Date().toLocaleString(currentLang === "ar" ? "ar-SA" : "en-US")
  };

  const orders = getOrders();
  orders.unshift(newOrder);
  saveOrders(orders);

  renderOrders();
  orderForm.reset();
});

/* =========================================================
   تنسيق رسالة واتساب وإرسالها
   ========================================================= */

function buildWhatsappMessage(data) {
  const t = TRANSLATIONS[currentLang];
  const yesStr = t.yes;
  const noStr = t.no;

  const interestedStatus = data.optInterested ? yesStr : noStr;
  const managerMorningStatus = data.optManagerMorning ? yesStr : noStr;
  const sendToManagerStatus = data.optSendToManager ? yesStr : noStr;

  return (
    `${t.wa_title}\n` +
    `--------------------------\n` +
    `${t.wa_name} ${data.name}\n` +
    `${t.wa_phone} ${data.phone}\n` +
    `${t.wa_location} ${data.location}\n` +
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
   عرض قائمة الطلبات المحفوظة في الصفحة
   ========================================================= */
function renderOrders() {
  const orders = getOrders();
  const t = TRANSLATIONS[currentLang];

  ordersEmptyEl.classList.toggle("hidden", orders.length > 0);
  ordersListEl.innerHTML = "";

  orders.forEach(order => {
    const clone = orderItemTemplate.content.cloneNode(true);

    clone.querySelector(".order-item-name").textContent = order.name;
    clone.querySelector(".order-item-date").textContent = order.createdAt;
    clone.querySelector(".order-item-phone").textContent = order.phone;
    clone.querySelector(".order-item-location").textContent = order.location;
    clone.querySelector(".order-item-details").textContent = order.details;

    const lblPhone = clone.querySelector(".lbl-phone");
    const lblLocation = clone.querySelector(".lbl-location");
    if (lblPhone) lblPhone.textContent = t.lbl_phone;
    if (lblLocation) lblLocation.textContent = t.lbl_location;

    // بناء شارات تصنيف العميل في بطاقة الطلب
    const tagsContainer = clone.querySelector(".order-item-tags");
    if (tagsContainer) {
      tagsContainer.appendChild(createTagBadge(t.tag_interested, order.optInterested));
      tagsContainer.appendChild(createTagBadge(t.tag_manager_morning, order.optManagerMorning));
      tagsContainer.appendChild(createTagBadge(t.tag_send_manager, order.optSendToManager));
    }

    const btnWa = clone.querySelector(".btn-whatsapp-mini");
    const btnDel = clone.querySelector(".btn-delete-mini");

    if (btnWa) {
      btnWa.textContent = t.btn_whatsapp_mini;
      btnWa.addEventListener("click", function () {
        sendToWhatsapp(order);
      });
    }

    if (btnDel) {
      btnDel.textContent = t.btn_delete;
      btnDel.addEventListener("click", function () {
        deleteOrder(order.id);
      });
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

function deleteOrder(orderId) {
  const orders = getOrders().filter(o => o.id !== orderId);
  saveOrders(orders);
  renderOrders();
}

/* =========================================================
   تهيئة الجلسة واللغة عند تحميل الصفحة
   ========================================================= */
(function init() {
  setLanguage(currentLang);

  const currentUser = getSession();
  if (currentUser) {
    showDashboard(currentUser);
  } else {
    showLoginPage();
  }
})();
