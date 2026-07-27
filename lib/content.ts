// ============================================================
// TEP 網站全站文案 — 修改文字內容只需編輯此檔案
// ============================================================

export const motto = ["Talent.", "Elite.", "Professional."];

export const slogan = "於時代轉折處，重塑金融精英的職涯路徑";

export const navLinks = [
  { href: "/", label: "主頁" },
  { href: "/about", label: "關於我們" },
  { href: "/services", label: "服務" },
  { href: "/stories", label: "學生分享" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "聯繫我們" },
];

// ---------- 服務體系（主頁概念圖） ----------

export type Tier = {
  id: string;
  metal: string;
  metalColor: string; // Tailwind color token
  planName: string;
  planEn: string;
  baseLabel: "內容" | "疊加內容";
  items: string[];
};

export const tiers: Tier[] = [
  {
    id: "foundation",
    metal: "青銅",
    metalColor: "bronze",
    planName: "啟航計畫",
    planEn: "Foundation",
    baseLabel: "內容",
    items: ["金融行業深度分析", "職涯諮詢", "簡歷精修", "線下面試技巧打磨"],
  },
  {
    id: "premier",
    metal: "白銀",
    metalColor: "silver",
    planName: "尊享計畫",
    planEn: "Premier",
    baseLabel: "疊加內容",
    items: ["優先終面機會", "系統智能內推", "錄像面試準備"],
  },
  {
    id: "private",
    metal: "黃金",
    metalColor: "gold",
    planName: "私享計畫",
    planEn: "Private",
    baseLabel: "疊加內容",
    items: ["在職導師內推", "實習機會保障", "錄像面試準備"],
  },
  {
    id: "sovereign",
    metal: "鉑金",
    metalColor: "platinum",
    planName: "卓越計畫",
    planEn: "Sovereign",
    baseLabel: "疊加內容",
    items: ["專業資格賦能"],
  },
  {
    id: "apex",
    metal: "鑽石",
    metalColor: "diamond",
    planName: "至尊計畫",
    planEn: "Apex",
    baseLabel: "疊加內容",
    items: ["20年+資歷銀行家親授"],
  },
];

export const flowRibbons = ["1v1求職顧問全程跟進", "實時掌握招聘動態"];

// ---------- 服務頁：深度介紹 ----------

export type PlanDetail = {
  tierId: string;
  heading: string;
  headingEn: string;
  overlay: boolean; // 疊加服務
  intro?: string;
  rows: { title: string; body: string }[];
  referralNote?: string;
  stats?: { value: string; label: string; note?: string }[];
  quals?: { code: string; desc: string }[];
  qualsQuote?: string;
  modules?: { no: string; title: string; body: string }[];
  careerArrow?: string[];
  arrowQuote?: string;
  arrowNote?: string;
};

export const planDetails: PlanDetail[] = [
  {
    tierId: "foundation",
    heading: "青銅：Foundation 啟航計畫",
    headingEn: "Foundation",
    overlay: false,
    rows: [
      {
        title: "金融行業深度分析",
        body: "2日線下培訓：分析全球金融體系架構與前沿發展趨勢，理解金融核心知識。",
      },
      {
        title: "職涯諮詢",
        body: "1-1導師解讀金融各細分賽道（投行、資管、私募股權、管理諮詢等）的職業路徑差異。",
      },
      {
        title: "簡歷精修",
        body: "深度梳理個人經歷，行業精英定製對口簡歷。",
      },
      {
        title: "線下面試技巧打磨",
        body: "首席面試官親擬完整模擬面試，透過實戰完善面試技巧；深度復盤與反饋，強化臨場表現與溝通邏輯，全面提升面試勝率。",
      },
    ],
  },
  {
    tierId: "premier",
    heading: "白銀：Premier 尊享計畫",
    headingEn: "Premier",
    overlay: true,
    rows: [
      {
        title: "優先終面機會",
        body: "精準篩選高契合度職位，優先推薦至終面環節，提升曝光率與錄用機會；行業包括四大、資產管理、顧問公司、家族辦公室、券商、投行、私人銀行等。",
      },
      {
        title: "系統智能內推",
        body: "依託算法系統，精準匹配職位與個人優勢，實現高效智能內推；避免簡歷沉沒，顯著提升通過率。",
      },
      {
        title: "錄像面試準備",
        body: "針對企業錄像面試要求，協助梳理回答內容、打磨表達技巧與鏡頭表現，並提供專業錄影及後期剪輯。",
      },
    ],
  },
  {
    tierId: "private",
    heading: "黃金：Private 私享計畫",
    headingEn: "Private",
    overlay: true,
    rows: [
      {
        title: "在職導師內推",
        body: "由現職導師親自推薦，進入企業核心招聘渠道。",
      },
      {
        title: "實習機會保障",
        body: "親選實習行業和實習時期，行業包括四大、資產管理、家族辦公室、券商。",
      },
      {
        title: "錄像面試準備",
        body: "針對企業錄像面試要求，協助梳理回答內容、打磨表達技巧與鏡頭表現，並提供專業錄影及後期剪輯；涵蓋背調｜預期問答、自我介紹｜邏輯框架、企業文化｜行為面試。",
      },
    ],
    referralNote:
      "導師網絡覆蓋 Goldman Sachs、BlackRock、J.P. Morgan、UBS、Citi、中金公司 CICC、Barclays、中國銀行、Morgan Stanley、大華銀行 UOB、Daiwa 等機構。",
    stats: [
      { value: "≤1%", label: "投行・頂級資產管理", note: "一般錄取率" },
      { value: "≤5%", label: "外資商業銀行", note: "一般錄取率" },
      { value: "15%", label: "四大會計事務所", note: "一般錄取率" },
      { value: "100%", label: "錄取率", note: "錄像面試準備" },
    ],
  },
  {
    tierId: "sovereign",
    heading: "鉑金：Sovereign 卓越計畫",
    headingEn: "Sovereign",
    overlay: true,
    intro: "專業資格賦能",
    rows: [],
    quals: [
      { code: "HKSI (Paper 1/7/8/12)", desc: "銀行及財富管理前台入門資格" },
      { code: "SFC Type 1, 4, 9", desc: "資產管理與顧問業務進階認證" },
      { code: "IIQE (Paper 1-5)", desc: "理財策劃與保險領域合規要求" },
      { code: "IQE", desc: "退休金及強積金業務必備" },
    ],
    qualsQuote: "完成資格認證，實現合規掛牌",
  },
  {
    tierId: "apex",
    heading: "鑽石：Apex 至尊計畫",
    headingEn: "Apex",
    overlay: true,
    intro: "20年+資歷銀行家親傳，全維度賦能",
    rows: [],
    modules: [
      {
        no: "1",
        title: "交易",
        body: "多資產類別、技術面分析。",
      },
      {
        no: "2",
        title: "家族治理",
        body: "家族治理（家族憲章擬定）、頂層傳承（跨代傳承、頂層政商脈絡）。",
      },
      {
        no: "3",
        title: "信託",
        body: "資產保護與信託架構（家族信託、婚前財產規劃）。",
      },
      {
        no: "4",
        title: "家族聯盟",
        body: "建立家族聯盟，共享資源，拓展業界商業精英人脈。",
      },
    ],
    careerArrow: ["分析師", "經理", "助理副總裁", "副總裁"],
    arrowQuote: "能用1年時間斬獲12年投行學習成果",
    arrowNote: "TEP透過實戰累積、高強度學習",
  },
];

// ---------- 項目比對表 ----------

export type ComparisonPlan = {
  name: string;
  en: string;
  metal: string;
  price: string;
  crowned?: boolean;
  dots: boolean[];
};

export const comparison: {
  features: string[];
  plans: ComparisonPlan[];
} = {
  features: [
    "1對1就業咨詢",
    "簡歷精修",
    "錄像面試技巧準備",
    "優先終面機會",
    "系統智能內推",
    "線下面試技巧打磨",
    "在職導師內推",
    "實習機會保障",
    "專業資格賦能",
    "20+年資行家親授",
  ],
  plans: [
    {
      name: "啟航計畫",
      en: "Foundation",
      metal: "青銅",
      price: "HKD20,000",
      dots: [true, true, true, false, false, false, false, false, false, false],
    },
    {
      name: "尊享計畫",
      en: "Premier",
      metal: "白銀",
      price: "HKD50,000",
      dots: [true, true, true, true, true, true, false, false, false, false],
    },
    {
      name: "私享計畫",
      en: "Private",
      metal: "黃金",
      price: "HKD200,000",
      dots: [true, true, true, true, true, true, true, true, false, false],
    },
    {
      name: "卓越計畫",
      en: "Sovereign",
      metal: "鉑金",
      price: "HKD500,000",
      dots: [true, true, true, true, true, true, true, true, true, false],
    },
    {
      name: "至尊計畫",
      en: "Apex",
      metal: "鑽石",
      price: "HKD2,000,000",
      crowned: true,
      dots: [true, true, true, true, true, true, true, true, true, true],
    },
  ],
};

// ---------- 關於我們 ----------

export const background = {
  slogan,
  sections: [
    {
      heading: "失業風險浮現，畢業生首當其衝",
      body: "2026年，內地青年失業率高達約19%；全球青年失業率仍高達12.4%，求職人數攀升，職位供給收縮，就業競爭持續升溫，此乃結構性斷層之徵兆。",
    },
    {
      heading: "職位空缺急劇收縮",
      body: "畢業生全職職位空缺由 2022 年約 8 萬個，銳減至 2025 年約 3.1 萬個，2026 年首季再跌至約 6,800 個，按年跌 14.1%。官方證實 AI 自動化為主因，入行階梯加速瓦解。",
    },
    {
      heading: "AI 重塑就業架構",
      body: "企業部署 AI 比例一年躍升三倍，首當其衝為畢業生賴以立足之支援性職能。國際大型銀行更擬三至五年內裁減一成職位，以 AI 接管中後台運作。",
    },
    {
      heading: "招聘邏輯轉向，門檻大幅提高",
      body: "企業由「廣納人才」轉向「精準擇才」，資源集中投向即時創造效益之崗位，入門職位大幅削減。市場已自賣方全面轉向買方，競爭遠甚以往。",
    },
  ],
  closing:
    "在就業市場劇烈變動的時代，我們期許 TEP 成為學生最務實、最可信賴的夥伴，將方向轉化為路徑，將努力轉化為成果。",
  signedBy: "Bruce Cheung",
};

export const founder = {
  name: "張兆愷",
  nameEn: "Bruce Cheung",
  role: "創始人",
  tagline: "從私人銀行起點到資產管理公司創始人",
  quote:
    "職涯發展不是依靠運氣或際遇，而是對自身價值與市場趨勢的精準錨定與持續掌控。",
  chapters: [
    {
      title: "核心起點",
      bullets: [
        "畢業即加入花旗銀行財富管理部，於投行黃金時代在核心業務團隊接受系統性培訓，奠定跨境資本市場與投行實務的堅實基礎。",
        "歷經逾 30 年金融市場周期淬鍊，形成兼具宏觀洞察與前瞻視野的專業判斷力，能精準把握全球資本流動與未來趨勢。",
      ],
    },
    {
      title: "20年+頂級外資私行中堅要職",
      bullets: [
        "曾任職於 Citibank、匯豐瑞士私人銀行、德意志銀行及瑞士信貸等國際頂級金融機構，累積逾 30 年資產管理及家族辦公室實戰經驗。",
        "歷任交易台主管、結構性產品專家及諮詢團隊負責人，橫跨前中後台關鍵職能，具備從投資策略到執行落地的全鏈條專業能力。",
      ],
    },
    {
      title: "金融精英與稀缺內推圈層",
      bullets: [
        "目前作為資產管理公司與聯合家族辦公室的創始人，直接對接大中華區超高淨值（UHNW）客戶及單一家族辦公室。",
        "生態圈覆蓋買方、賣方、私人銀行、投資銀行、信託公司、律師行、四大，能為學員提供契合真實用人標準的實戰帶教，並提供高價值的稀缺內推通道。",
      ],
    },
  ],
};

// 導師團隊（首席培訓師領銜，其餘席位陸續公布）
export const mentors = [
  {
    name: "Szey Wong",
    role: "首席培訓師",
    photo: "/team/szzy-wong.jpg",
    bullets: [
      "20 餘年亞太金融行業資深資歷。",
      "風控諮詢：為跨國公司構建並執行商業、信貸與合規風控框架。",
      "資產管理：管理東南亞機構及超高淨值（U/HNW）客戶戰略資產組合。",
      "基金架構：精通匹配跨境投資目標的私募基金及離岸載體設計。",
    ],
  },
  {
    name: "即將公布",
    role: "「賽道」導師",
    bullets: ["更多香港行內頂尖在職導師陸續加入，敬請期待。"],
    upcoming: true,
  },
  {
    name: "即將公布",
    role: "「賽道」導師",
    bullets: ["更多香港行內頂尖在職導師陸續加入，敬請期待。"],
    upcoming: true,
  },
];

// 合作夥伴（示意展示，之後以正式名單替換）
// 目標公司 — logo 牆。放入正式 logo 圖檔（例如 public/logos/goldman-sachs.svg）
// 後，於對應項目補上 `logo` 路徑即可自動改以圖片顯示；未提供 logo 前以名稱示意。
export type Partner = { name: string; logo?: string };

export const partners: Partner[] = [
  { name: "Goldman Sachs", logo: "/logos/goldman-sachs.png" },
  { name: "Morgan Stanley", logo: "/logos/morgan-stanley.png" },
  { name: "J.P. Morgan", logo: "/logos/jpmorgan.webp" },
  { name: "UBS", logo: "/logos/ubs.png" },
  { name: "Citi", logo: "/logos/citi.png" },
  { name: "Barclays", logo: "/logos/barclays.webp" },
  { name: "HSBC 滙豐", logo: "/logos/hsbc.png" },
  { name: "BlackRock", logo: "/logos/blackrock.png" },
  { name: "中金公司 CICC", logo: "/logos/cicc.png" },
  { name: "中國銀行", logo: "/logos/bank-of-china.webp" },
  { name: "中信 CITIC", logo: "/logos/citic.png" },
  { name: "華泰證券", logo: "/logos/huatai.webp" },
  { name: "大華銀行 UOB", logo: "/logos/uob.webp" },
  { name: "Daiwa", logo: "/logos/daiwa.png" },
  { name: "ARK", logo: "/logos/ark.jpeg" },
  { name: "泰康", logo: "/logos/taikang.jpeg" },
  { name: "Deloitte", logo: "/logos/deloitte.png" },
  { name: "EY", logo: "/logos/ey.webp" },
  { name: "KPMG", logo: "/logos/kpmg.webp" },
  { name: "PwC", logo: "/logos/pwc.webp" },
];

// ---------- FAQ ----------

export const faq = [
  {
    q: "TEP和其他求職公司的區別？",
    a: "TEP 講求真正量身訂做的客製化服務。我們根據每個學生的個別能力與實際需求，安排香港行內頂級在職導師團隊全程一對一跟進，並承諾提供線下實體服務。",
  },
  {
    q: "項目中內推機會如何獲得？",
    a: "導師均為高盛、黑岩、摩根大通等機構的現職 VP/Director 級別。內推非公開應徵，而是由導師將你的履歷直接遞交給項目負責人（Hiring Manager）或透過內部 MD 引薦，直接進入核心招聘管道。",
  },
  {
    q: "1-1顧問解讀和簡歷精修具體是怎麼實行？時長多久？",
    a: "金融職涯諮詢：採用線下1對1互動形式，側重背景評估與賽道定位，並進行客製化求職時間線規劃。\n履歷精修：無限制次數微調。",
  },
  {
    q: "Apex至尊計畫與其他計畫的區別？",
    a: "我們為學員引薦深耕業界逾 20 年的頂尖資深專家，展開全程 1 對 1 的師徒制頂層輔導。在短短 1 年內，引領學員從零基礎完成跨越式蛻變，淬鍊為具備國際視野的家族金融菁英。",
  },
];

// ---------- 預約諮詢（聯繫我們三大入口） ----------

export type BookingType = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
};

export const bookingTypes: BookingType[] = [
  {
    id: "consult",
    title: "服務諮詢",
    subtitle: "For Students",
    desc: "對服務計畫有興趣？預約 1 對 1 諮詢，由團隊為你解答疑問、評估背景與賽道定位。",
  },
  {
    id: "join",
    title: "加入TEP團隊",
    subtitle: "For Professionals",
    desc: "行內專業人士有志加入我們的導師團隊？預約面談，了解你與 TEP 帶教體系的契合度。",
  },
  {
    id: "partner",
    title: "商業合作",
    subtitle: "For Institutions",
    desc: "歡迎人才招聘機構、升學機構、銀行、券商及四大等機構洽談合作，共建人才通道。",
  },
];

// 可預約時段（示意，之後按實際情況調整）
export const bookingSlots = ["10:00", "11:30", "14:00", "15:30", "17:00"];

// ---------- 聯繫我們 ----------

export const contact = {
  echo: "Tailored. Expert. Prestigious.",
  address: "Unit A2, 4/F., Block A, Po Yip Building, 62-70 Texaco Road, Tsuen Wan, NT",
  phone: "+852 60990937",
  linkedin: "",
  wechat: "blablabla", // 佔位，之後更新
  email: "cs@tepcareers.con", // 佔位，之後更新
  website: "TepCarees.com", // 佔位，之後更新
};
