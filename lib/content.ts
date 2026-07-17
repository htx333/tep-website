// ============================================================
// TEP 網站全站文案 — 修改文字內容只需編輯此檔案
// ============================================================

export const motto = ["Talent.", "Elite.", "Professional."];

export const slogan = "於時代轉折處，重塑金融精英的職涯路徑";

export const navLinks = [
  { href: "/", label: "主頁" },
  { href: "/about", label: "關於我們" },
  { href: "/services", label: "服務" },
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
    items: ["金融行業簡介", "職涯諮詢", "簡歷精修", "錄像面試技巧打磨"],
  },
  {
    id: "premier",
    metal: "白銀",
    metalColor: "silver",
    planName: "尊享計畫",
    planEn: "Premier",
    baseLabel: "疊加內容",
    items: ["優先終面機會", "系統智能內推", "線下面試技巧打磨"],
  },
  {
    id: "private",
    metal: "黃金",
    metalColor: "gold",
    planName: "私享計畫",
    planEn: "Private",
    baseLabel: "疊加內容",
    items: ["在職導師內推", "實習機會保障", "線下面試技巧打磨"],
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
        title: "金融行業簡介",
        body: "解析全球金融體系架構與前沿發展趨勢，理解金融核心知識。",
      },
      {
        title: "職涯諮詢",
        body: "1-1顧問解讀金融各細分賽道（投行、資管、私募股權、管理諮詢等）的職業路徑差異。",
      },
      {
        title: "簡歷精修",
        body: "深度梳理個人經歷，定製對口簡歷。",
      },
      {
        title: "錄像面試技巧打磨",
        body: "實戰錄像指導，打磨表達與應答能力。",
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
        body: "行業包括四大、資產管理、顧問公司、家族辦公室、券商、投行、私人銀行等。",
      },
      {
        title: "系統智能內推",
        body: "依託算法系統精準匹配崗位資源，內推企業面試。",
      },
      {
        title: "線下面試技巧打磨",
        body: "行業在職導師親擬模擬面試1-1實戰教學。",
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
        title: "線下面試技巧打磨",
        body: "行業在職導師親擬模擬面試1-1實戰教學：背調｜預期問答、自我介紹｜邏輯框架、企業文化｜行為面試。",
      },
    ],
    referralNote:
      "導師網絡覆蓋 Goldman Sachs、BlackRock、J.P. Morgan、UBS、Citi、中金公司 CICC、Barclays、中國銀行、Morgan Stanley、大華銀行 UOB、Daiwa 等機構。",
    stats: [
      { value: "≤1%", label: "投行・頂級資產管理", note: "一般錄取率" },
      { value: "≤5%", label: "外資商業銀行", note: "一般錄取率" },
      { value: "15%", label: "四大會計事務所", note: "一般錄取率" },
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
      { code: "HKSI 1/7/8/12", desc: "銀行及財富管理前台入門資格" },
      { code: "SFC Type 4, 9", desc: "資產管理與顧問業務進階認證" },
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
        body: "多資產類別、技術分析（RSI、MACD、VCP、K線、趨勢分析、量價分析）、戰略資產配置（SAA）、戰術資產配置（TAA）、客戶投資組合管理。",
      },
      {
        no: "2",
        title: "家族治理",
        body: "家族治理與頂層傳承（家族憲章擬定、跨代傳承、頂層政商脈絡）。",
      },
      {
        no: "3",
        title: "信託",
        body: "資產保護與信託架構（家族信託、婚前財產規劃）。",
      },
      {
        no: "4",
        title: "家族聯盟",
        body: "與其他家族學生共同成長，並拓展業界商業精英人脈。",
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
      dots: [true, true, true, false, false, false, false, false, false, false],
    },
    {
      name: "尊享計畫",
      en: "Premier",
      dots: [true, true, true, true, true, true, false, false, false, false],
    },
    {
      name: "私享計畫",
      en: "Private",
      dots: [true, true, true, true, true, true, true, true, false, false],
    },
    {
      name: "卓越計畫",
      en: "Sovereign",
      dots: [true, true, true, true, true, true, true, true, true, false],
    },
    {
      name: "至尊計畫",
      en: "Apex",
      crowned: true,
      dots: [true, true, true, true, true, true, true, true, true, true],
    },
  ],
};

// ---------- 關於我們 ----------

export const background = {
  slogan,
  paragraphs: [
    "2025年，香港金融業畢業生職位空缺約80,000個；2026年，此數字降至30,000餘個，跌幅逾六成。疫情影響、簽證政策收緊、企業裁員與招聘凍結多重因素疊加，就業市場顯著萎縮。應屆畢業生失業率雖維持低檔，但求職人數持續增加，崗位供給卻大幅減少，供需失衡加劇。賣方與買方市場結構已然轉變，競爭環境較過往更加嚴峻。",
    "TEP之名，承載著我們對人才培育的階段性願景：Talent（人才）→ Elite（菁英）→ Professional（專業人士）。這不是頭銜的轉換，而是思維層次與職業素養的躍升。",
  ],
  quote:
    "我們重複的行為造就了我們，卓越不是一種行為，而是一種習慣。",
  quoteBy: "古希臘哲學家 亞里斯多德",
  paragraphsAfterQuote: [
    "我們相信，金融專業的養成，正是這種習慣的積累——從扎實的知識基礎、嚴謹的分析思維，到面對市場變動時的沉著判斷，每一步都需要有意識的鍛鍊與引導。",
    "TEP願成就每一位學生的金融職場精英夢，讓懷抱理想的年輕人，不僅能進入理想的行業，更能在其中站穩腳步、持續成長，最終成為具備專業深度與產業影響力的金融人才。",
    "在就業市場劇烈變動的時代，我們期許TEP成為學生最務實、最可信賴的夥伴，將方向轉化為路徑，將努力轉化為成果。",
  ],
};

export const founder = {
  name: "張兆愷",
  nameEn: "Bruce Cheung",
  title: "天恒資產管理有限公司董事長",
  role: "創始人",
  tagline: "從頂尖投行起點到買方公司合伙人",
  quote:
    "職業發展不是一場博彩，而是對自身價值與市場趨勢的精準錨定與持續掌控。",
  chapters: [
    {
      title: "核心起點",
      bullets: [
        "畢業首站斬獲外資頂尖投行 花旗銀行（財富管理部）職位。",
        "於外資投行黃金時代，在該最具指標性的核心業務團隊中受訓，奠定了極其扎實的跨境資本市場及投行實務基本功。",
      ],
    },
    {
      title: "20年+頂級外資私行中堅要職",
      bullets: [
        "先後服務於 Citibank、匯豐瑞士私人銀行、德意志銀行及瑞士信貸等頂奢金融機構。",
        "擔任過交易台主管、結構產品專家及諮詢團隊負責人，跨越前中後台核心業務。",
      ],
    },
    {
      title: "買方合夥人與稀缺內推圈層",
      bullets: [
        "目前作為資產管理公司與多家族辦公室的聯合創始人，直接對接大中華區超高凈值（UHNW）客戶。",
        "兼具買方雇主視野，能為學員提供契合真實買方用人標準的實戰帶教，並提供高價值的稀缺內推通道。",
      ],
    },
  ],
};

// 導師資料（暫用示意內容，之後以真實經歷替換）
export const mentors = [
  {
    name: "Alex Chow",
    role: "「賽道」導師",
    bullets: [
      "（示意）現職國際投資銀行 VP，主理大中華區交易",
      "（示意）曾任職四大會計師事務所金融服務部",
      "（示意）專責投行／券商賽道學員帶教",
    ],
  },
  {
    name: "Xena Chow",
    role: "「賽道」導師",
    bullets: [
      "（示意）現職全球資產管理公司投資分析師",
      "（示意）具跨境資本市場研究與組合管理經驗",
      "（示意）專責資管／買方賽道學員帶教",
    ],
  },
  {
    name: "Oscar Cheung",
    role: "「賽道」導師",
    bullets: [
      "（示意）現職外資私人銀行 Director，服務UHNW客戶",
      "（示意）具結構性產品與財富規劃專長",
      "（示意）專責私行／財富管理賽道學員帶教",
    ],
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
  { name: "Deloitte", logo: "/logos/deloitte.jpeg" },
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
  email: "info@tepcareers.com", // 佔位，之後更新
  phone: "+852 0000 0000", // 佔位，之後更新
  whatsapp: "+852 0000 0000", // 佔位，之後更新
  address: "香港中環（地址待定）", // 佔位，之後更新
  hours: "星期一至五 09:00–18:00",
};
