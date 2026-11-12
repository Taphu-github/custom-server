// All text used by the public DakzinAI pages lives here, so it can be edited in one place.
// Each fact has ONE home page; other pages link to it instead of repeating it.
//   Home (/) ................. short overview: hero, how it works, features, latest news, about
//   How it works ............. the detect → classify → alert → repel process and the architecture diagram
//   Features ................. capabilities that are not part of that process (accuracy aids, data, dashboard)
//   News ..................... news-content.ts
//   Project milestones ....... journey-content.ts
//   About .................... mission, partners, team, other joint projects
// Replace any [BRACKETED] placeholder with your real details.

/* ───────────── Types ───────────── */

export interface NavItem { href: string; label: string }
export interface Step { n: string; title: string; text: string }
export interface StepDetail { n: string; title: string; lead: string; body: string[] }
export interface TitledText { title: string; text: string }
export interface FeatureGroup { id: string; title: string; intro: string; items: TitledText[] }
export interface PartnerDetail { name: string; role: string }
// photo: a file in /public/team, e.g. "/team/kezang-dema.jpg" (square, about 400 × 400 px)
export interface TeamMember { name: string; role?: string; photo?: string | null }
export interface TeamGroup { title: string; members: TeamMember[] }

export const LOGIN_PATH = "/login";

/* Photo shown in the top band of each inner page (keyed by the page's crumb name). Files are in /public/pages. */
export interface PagePhoto { src: string; caption: string }
export const PAGE_PHOTOS: Record<string, PagePhoto> = {
  "How it works": { src: "/pages/station-community.jpg", caption: "The Dakzin team and local farmers at a repellent station during the system launch" },
  Features: { src: "/pages/monkey-capture.jpg", caption: "A monkey seen at the forest edge of a pilot site" },
  News: { src: "/pages/launch-banner.jpg", caption: "Dakzin System Launch · Trongsa & Zhemgang, September 2025" },
  "Project milestones": { src: "/pages/launch-community.jpg", caption: "Launching the system with the local community" },
  About: { src: "/pages/blessing.jpg", caption: "Blessing the Dakzin station at a pilot site" },
};

export const NAV: NavItem[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/news", label: "News" },
  { href: "/milestones", label: "Project milestones" },
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
    ],
  },
  {
    n: "02",
    title: "Classify",
    lead: "Artificial Intelligence recognises the animal.",
    body: [
      "A computer-vision model analyses the images to detect and classify animals, so the system knows what has entered the field.",
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

/* ───────────── Contact (footer and "Contact us" button) ───────────── */

export const CONTACT = {
  email: "[YOUR EMAIL]",
  place: "Phuentsholing, Bhutan",
  org: "College of Science and Technology, RUB",
};
