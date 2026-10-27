// Content for the Project milestones page (/milestones).
// Dates come from the project timeline slide and the news stories (news-content.ts).
//
// Each card is one project phase. `points` are the dated events inside that phase.
// Photo options (use one):  image = photo that fills the top of the card
//                           inset = small photo shown framed on a light green background
//                           neither = a green panel with the card's icon

export interface MilestonePoint {
  date: string;
  text: string;
}

export interface MilestoneCard {
  id: string;
  when: string;
  tag: string;
  title: string;
  text: string;
  points: MilestonePoint[];
  image?: string;
  inset?: string;
  icon?: "bulb";
}

export interface PilotSiteDetail {
  place: string;
  dzongkhag: string;
}

export const MILESTONE_CARDS: MilestoneCard[] = [
  {
    id: "idea",
    when: "2020–2022",
    tag: "Started",
    title: "Idea & first steps",
    text: "The IT Department of CST conceptualises an AI-powered Animal Intrusion Detection System.",
    image: "/milestones/idea-field.jpg",
    points: [
      { date: "2020", text: "Project conceptualised" },
      { date: "July 2022", text: "First prototype development started" },
    ],
  },
  {
    id: "prototype",
    when: "2023–2024",
    tag: "Prototypes",
    title: "Two prototypes",
    text: "From a lab-based prototype to a second prototype built with AMTC Paro and tested with real animals.",
    image: "/news/prototype-testing-amtc-2024.jpg",
    points: [
      { date: "June 2023", text: "First prototype (lab-based) released" },
      { date: "October 2023", text: "CST signed an MoU with AMTC" },
      { date: "April 2024", text: "Showcased as a notable innovation on World IP Day" },
      { date: "May 2024", text: "Second prototype integrated with AMTC's Animal Repellent System and tested with real animals" },
    ],
  },
  {
    id: "funded",
    when: "2024–2025",
    tag: "Funded",
    title: "Funded enhancement",
    text: "“Smart Solution for Human-Wildlife Conflicts: Implementing Animal Intrusion System”, funded by the Bhutan Foundation and co-financed by AMTC and CST.",
    inset: "/milestones/dakzin-unit.jpg",
    points: [
      { date: "September 2024", text: "Bhutan Foundation project begins" },
      { date: "September 2025", text: "Enhanced AI-powered Dakzin System ready for the field" },
    ],
  },
  {
    id: "pilot",
    when: "2025–2026",
    tag: "In the field",
    title: "Field pilots & release",
    text: "The enhanced system goes into the field at two pilot sites and is put forward for technology release.",
    image: "/milestones/zurphi.jpg",
    points: [
      { date: "September 2025", text: "Pilot implementation at Zurphi, Zhemgang and Beling, Trongsa" },
      { date: "December 2025", text: "Monitoring: farmers rate the benefits Excellent (Zurphi) and Good (Beling)" },
      { date: "May 2026", text: "Presented to the Technology Release Committee" },
      { date: "June 2026", text: "Showcased at RUB's 23rd Foundation Day" },
    ],
  },
];

export const PILOT_SITE_DETAILS: PilotSiteDetail[] = [
  { place: "Zurphi", dzongkhag: "Zhemgang" },
  { place: "Beling", dzongkhag: "Trongsa" },
];
