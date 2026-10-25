// All text used by the public Dakzin pages lives here, so it can be edited in one place.
// (Named site-content.ts so it can never be confused with the old content.js.)
// Each fact has ONE home page; other pages link to it instead of repeating it.
//   Home .............. short overview only
//   How it works ...... the detect → classify → alert → repel process (incl. SMS/call backup, repellent)
//   Features .......... capabilities that are not part of that process (accuracy aids, data, dashboard)
//   FAQ ............... questions not already answered on another page
//   About ............. mission, partners, team, other joint projects
//   Project milestones  timeline, funding and pilot sites
// Replace any [BRACKETED] placeholder with your real details.

/* ───────────── Types ───────────── */

export interface NavItem { href: string; label: string }
export interface Step { n: string; title: string; text: string }
export interface StepDetail { n: string; title: string; lead: string; body: string[] }
export interface TitledText { title: string; text: string }
export interface FeatureGroup { id: string; title: string; intro: string; items: TitledText[] }
export interface FaqItem { q: string; a: string }
export interface FaqGroup { id: string; title: string; items: FaqItem[] }
export interface PartnerDetail { name: string; role: string }
// photo: a file in /public/team, e.g. "/team/kezang-dema.jpg" (square, about 400 × 400 px)
export interface TeamMember { name: string; role?: string; photo?: string | null }
export interface TeamGroup { title: string; members: TeamMember[] }
export interface Milestone { id: string; when: string; title: string; tag: string; text: string }
export interface PilotSite { place: string; dzongkhag: string }
export interface HeroImage { src: string; alt: string }

export const LOGIN_PATH = "/login";

/* Photo shown in the top band of each inner page (keyed by the page's crumb name). Files are in /public/pages. */
export interface PagePhoto { src: string; caption: string; tag?: string }
export const PAGE_PHOTOS: Record<string, PagePhoto> = {
  "How it works": { src: "/pages/station-community.jpg", caption: "The Dakzin team and local farmers at a repellent station during the system launch" },
  Features: { src: "/pages/monkey-capture.jpg", caption: "A monkey seen at the forest edge of a pilot site", tag: "Monkey detected" },
  News: { src: "/pages/launch-banner.jpg", caption: "Dakzin System Launch · Trongsa & Zhemgang, September 2025" },
  "Project milestones": { src: "/pages/launch-community.jpg", caption: "Launching the system with the local community" },
  FAQ: { src: "/pages/user-training.jpg", caption: "Hands-on user training with farmers" },
  About: { src: "/pages/blessing.jpg", caption: "Blessing the Dakzin station at a pilot site" },
};

export const NAV: NavItem[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/news", label: "News" },
  { href: "/milestones", label: "Project milestones" },
  // { href: "/faq", label: "FAQ" }, // hidden for now — remove the // at the start to show it again
  { href: "/about", label: "About" },
];

/* ───────────── Animals the AI model recognises ───────────── */
// Same order and IDs as the model's classes (services/mqtt.js and lib/data_preprocess.js).
// photo: a square image in /public/animals, e.g. "/animals/bear.jpg". Without one, the first letter is shown.

export interface DetectableAnimal { id: number; name: string; kind: "Wild" | "Livestock"; photo?: string }

export const DETECTABLE_ANIMALS: DetectableAnimal[] = [
  { id: 0, name: "Bear", kind: "Wild", photo: "/animals/bear.jpg" },
  { id: 1, name: "Wild boar", kind: "Wild", photo: "/animals/wild-boar.jpg" },
  { id: 2, name: "Cattle", kind: "Livestock", photo: "/animals/cattle.jpg" },
  { id: 3, name: "Deer", kind: "Wild", photo: "/animals/deer.jpg" },
  { id: 4, name: "Elephant", kind: "Wild", photo: "/animals/elephant.jpg" },
  { id: 5, name: "Horse", kind: "Livestock", photo: "/animals/horse.jpg" },
  { id: 6, name: "Monkey", kind: "Wild", photo: "/animals/monkey.jpg" },
];

/* ───────────── How it works ───────────── */

// Home page summary
export const STEPS: Step[] = [
  { n: "01", title: "Detect", text: "Field units watch the farm and an AI model identifies any animal that enters." },
  { n: "02", title: "Alert", text: "The farm owner is notified on their phone within moments." },
  { n: "03", title: "Repel", text: "Lights, sound and a moving tiger doll drive the animal away without harm." },
];

// Full version on /how-it-works (the only place the process is explained in detail)
export const STEPS_DETAIL: StepDetail[] = [
  {
    n: "01",
    title: "Detect",
    lead: "Field units keep watch over the farm.",
    body: [
      "Each Dakzin field unit is installed at the edge of a farm, facing the places where animals usually enter, and continuously captures images of the area.",
      "[Describe the hardware: camera type, processor (e.g. Raspberry Pi / Jetson), power source, mounting and the area one unit covers.]",
    ],
  },
  {
    n: "02",
    title: "Classify",
    lead: "Artificial Intelligence recognises the animal.",
    body: [
      "A computer-vision model analyses the images to detect and classify animals, so the system knows what has entered the field.",
      "[Name the model (e.g. YOLO), the species it is trained on and how the training data was collected.]",
    ],
  },
  {
    n: "03",
    title: "Alert",
    lead: "The farm owner knows within moments.",
    body: [
      "The detection is sent over the Internet to the Dakzin server, saved in a central database, and pushed as a real-time notification to the farm owner's mobile app.",
      "If the Internet is down, the system sends an SMS and makes a phone call instead, so no alert is missed.",
    ],
  },
  {
    n: "04",
    title: "Repel",
    lead: "Animals are scared away, not harmed.",
    body: [
      "At the same moment the Animal Repellent System switches on lights, moves a tiger doll and plays different sounds to drive the animal away from the crops.",
      "Nothing harmful is used: no traps, poison or electric shocks.",
    ],
  },
];

/* ───────────── Features ───────────── */
// Only what is NOT already described on /how-it-works.

// Home page summary
export const FEATURES: TitledText[] = [
  { title: "Knows each animal", text: "Recognises 7 animals by type, including cattle and horses." },
  { title: "Detection history", text: "Every visit is recorded, so intrusion patterns can be studied." },
  { title: "Admin dashboard", text: "Devices, owners and detections are managed in one place." },
];

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "detection",
    title: "Detection",
    intro: "Making every alert worth acting on.",
    items: [
      { title: "Recognises the animal", text: "Each detection is classified into one of 7 animal types, so farmers know exactly what has entered the field." },
      { title: "Animal categories", text: "Animals are organised into categories that administrators can add to and update from the dashboard." },
    ],
  },
  {
    id: "data",
    title: "Data & dashboard",
    intro: "Turning every detection into useful information.",
    items: [
      { title: "Detection history & analysis", text: "Review where and when animals were detected to plan fencing, patrols and support." },
      { title: "Device & owner management", text: "Register additional DakzinAI systems and assign  farm owners at the field" },
      { title: "User management", text: "Control who can access the dashboard and what they can do." },
      { title: "Device connection settings", text: "Manage the MQTT credentials each DakzinAI system uses to send detections to the server." },
    ],
  },
];

/* ───────────── FAQ ───────────── */
// Only questions not already answered on another page.

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "detection",
    title: "Detection",
    items: [
      { q: "Which animals can it recognise?", a: "[List the species your model currently classifies.]" },
      { q: "How accurate is it?", a: "In field tests the system reached [YOUR ACCURACY FIGURE] detection accuracy. [Add how you measured it.]" },
      { q: "Does it work at night?", a: "[Describe night-time operation, e.g. infrared cameras or field lighting.]" },
    ],
  },
  {
    id: "alerts",
    title: "Alerts & repellent",
    items: [
      { q: "Can more than one person get alerts for a farm?", a: "[Explain whether family members or neighbours can be added to receive alerts.]" },
      { q: "Will animals get used to the repellent?", a: "Combining lights, a moving tiger doll and varied sounds makes it harder for animals to get used to it. Monitoring in December 2025 did find some habituation to the repellent sounds at the Beling (Trongsa) site, and this is one of the areas the team is now improving." },
    ],
  },
  {
    id: "account",
    title: "Getting Dakzin & your data",
    items: [
      { q: "How can I get Dakzin for my farm?", a: "[Explain how farmers or gewogs can request a device, who installs it and any cost.]" },
      { q: "How do I log in?", a: "Use the Log in button at the top right of any page with the username and password given to you. [Add who to contact if you forget your password.]" },
      { q: "Does it record people? What about privacy?", a: "[Describe how images of people are handled, for example not stored, blurred, or deleted after X days.]" },
      { q: "Who can see my detection data?", a: "[Explain who has access, e.g. the farm owner and authorised administrators from CST and AMTC.]" },
    ],
  },
];

/* ───────────── About ───────────── */

export const PARTNER_DETAILS: PartnerDetail[] = [
  { name: "College of Science and Technology (CST), Royal University of Bhutan", role: "Conceived and developed the system through its Information Technology Department." },
  { name: "Agriculture Machinery and Technology Center (AMTC), Paro", role: "Collaborating partner and co-financier." },
  { name: "Department of Agriculture (DoA), Ministry of Agriculture and Livestock", role: "Government partner, Royal Government of Bhutan." },
  { name: "Bhutan Foundation, Thimphu", role: "Funder of the 2024–2025 project." },
];

export const RELATED_PROJECTS: string[] = [
  "Smart Greenhouse Automation",
  "Smart Open Irrigation System",
  "Smart Water Distribution for Irrigation System",
];

export const TEAM_GROUPS: TeamGroup[] = [
  {
    title: "Project team (2024–2026)",
    members: [
      { name: "Mr. Tsheten Dorji", role: "Project PI · Lecturer, CST", photo: "/team/tsheten-dorji.jpg" },
      { name: "Mr. Karma Wangchuk", role: "Project member · Lecturer, CST", photo: "/team/karma-wangchuk.jpg" },
      { name: "Mr. Yeshi Jamtsho", role: "Project member · Lecturer, CST", photo: "/team/yeshi-jamtsho.jpg" },
      { name: "Mr. Pema Galey", role: "Project member · Lecturer, CST", photo: "/team/pema-galey.jpg" },
      { name: "Mr. Namgay", role: "Project member · Executive Engineer, AMTC" },
      { name: "Mr. Karma Tshering", role: "Focal person · Junior Engineer, AMTC" },
      { name: "Mr. Thinley Dorji", role: "Project member · Assistant Engineer, AMTC" },
      { name: "Kezang Dema", role: "Project member", photo: "/team/kezang-dema.jpg" },
      { name: "Kezang Namgay", role: "Project member", photo: "/team/kezang-namgay.jpg" },
      { name: "Nyingjay Metog Dorji", role: "Project member", photo: "/team/nyingjay-metog-dorji.jpg" },
      { name: "Ugyen Penjor", role: "Project member", photo: "/team/ugyen-penjor.jpg" },
    ],
  },
  {
    title: "Supported by",
    members: [
      { name: "Mr. Jeevan Gurung", role: "Lecturer, CST" },
      { name: "Mr. Tandin Phuntsho", role: "Software Engineer · CST IT graduate" },
      { name: "Mr. Pravaat Chhetri", role: "Software Engineer · CST IT graduate" },
      { name: "Bijay Kumar", photo: "/team/bijay-kumar.jpg" },
    ],
  },
  {
    title: "Final-year student project team (2023–2024)",
    members: [
      { name: "Mr. Tsheten Dorji", role: "Project Supervisor · Lecturer", photo: "/team/tsheten-dorji.jpg" },
      { name: "Mr. Tandin Phuntsho", role: "AIoT Developer" },
      { name: "Miss Pema Lhaden Wangchuk", role: "Team Leader & App Developer" },
      { name: "Miss Yeshi Tshomo", role: "Web Developer" },
      { name: "Mr. Karsel Dawa", role: "Data Engineer" },
    ],
  },
];
export const CONTACT = {
  email: "[YOUR EMAIL]",
  place: "Phuentsholing, Bhutan",
  org: "IT Department, College of Science and Technology, RUB",
};
export const HERO_IMAGES: HeroImage[] = [
  { src: "https://images.unsplash.com/photo-1607317146126-64b09b69eb4e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Wild animal photo 1" },
  { src: "https://images.unsplash.com/photo-1595173425119-1c54835c1874?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Wild animal photo 2" },
  { src: "https://images.unsplash.com/photo-1700410405744-60f007b2afea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Wild animal photo 3" },
  { src: "https://images.unsplash.com/photo-1726810396849-7df4da2fc0f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Wild animal photo 4" },
];

/* ───────────── Project milestones ───────────── */

export const MILESTONES: Milestone[] = [
  {
    id: "idea",
    when: "2021",
    title: "Idea & student project",
    tag: "Started",
    text: "The IT Department of CST conceptualises an AI-powered Animal Intrusion Detection System and work begins as a student project.",
  },
  {
    id: "prototype",
    when: "2023–2024",
    title: "System prototype",
    tag: "Prototype",
    text: "A final-year student team builds the first working prototype, in collaboration with AMTC Paro, the Department of Agriculture and MoAL.",
  },
  {
    id: "funded",
    when: "2024–2025",
    title: "Funded enhancement",
    tag: "Funded",
    text: "The system is enhanced through “Smart Solution for Human-Wildlife Conflict: Implementing an Intrusion Detection System”, funded by the Bhutan Foundation and co-financed by AMTC and CST.",
  },
  {
    id: "pilot",
    when: "Pilot",
    title: "Field pilots",
    tag: "In the field",
    text: "The prototype goes into the field at two pilot sites.",
  },
];

export const PILOT_SITES: PilotSite[] = [
  { place: "Langthil", dzongkhag: "Trongsa" },
  { place: "Trong", dzongkhag: "Zhemgang" },
];
