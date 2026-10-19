// DakzinAI project news for the /news page (and the "Latest news" strip on the home page).
// Newest first. The big project phases stay on the Project milestones page.
//
// To add a story: copy one block, put it at the TOP of NEWS_ITEMS and fill in every field.
//   lead  = the first paragraph (always visible)
//   body  = the remaining paragraphs (shown after "Read full story")
//   facts = short key facts shown in a box beside the story

export type NewsCategory = "Recognition" | "Technology release" | "Field work" | "Development";

export interface NewsFact { label: string; value: string }

export interface NewsItem {
  id: string;          // used in the link, e.g. /news#pilot-deployment
  date: string;        // shown as written
  year: number;        // used to group stories by year
  category: NewsCategory;
  title: string;
  place: string;
  lead: string;
  body: string[];
  facts: NewsFact[];
  image?: string;      // optional photo (e.g. a file in /public or an images.unsplash.com link)
}

export const NEWS_INTRO = {
  title: "DakzinAI project news & updates",
  lead: "Innovation, development, field implementation and technology dissemination.",
};

export const NEWS_CATEGORIES: NewsCategory[] = ["Recognition", "Technology release", "Field work", "Development"];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "rub-foundation-day-2026",
    date: "2 June 2026",
    year: 2026,
    category: "Recognition",
    title: "DakzinAI showcased at the Royal University of Bhutan's 23rd Foundation Day",
    place: "Office of the Vice Chancellor, Thimphu",
    lead: "The College of Science and Technology (CST/RUB) proudly showcased its locally developed AI-powered Animal Intrusion Detection System at the “One College, One Product” exhibition during the Royal University of Bhutan's 23rd Foundation Day celebration, held at the Office of the Vice Chancellor in Thimphu.",
    body: [
      "DakzinAI was selected as CST's representative innovation for the “One College, One Product” exhibition, highlighting the College's commitment to research-driven innovation and the development of practical technological solutions to national challenges.",
      "The exhibition provided an opportunity to demonstrate the potential of AI-powered agricultural technology in mitigating human-wildlife conflict while promoting sustainable farming practices and strengthening the role of university research in addressing real-world community needs.",
    ],
    facts: [
      { label: "Occasion", value: "RUB 23rd Foundation Day" },
      { label: "Exhibition", value: "“One College, One Product”" },
      { label: "Representing", value: "College of Science and Technology" },
    ],
  },
  {
    id: "technology-release-committee-2026",
    date: "13 May 2026",
    year: 2026,
    category: "Technology release",
    title: "DakzinAI presented to the Department of Agriculture's Technology Release Committee",
    place: "DoA Conference Hall, Thimphu",
    lead: "Following successful pilot implementation at two agricultural sites, DakzinAI was presented as an agricultural technology innovation to the Research Management Committee on 20 April 2026, and subsequently to the Technology Release Committee, Department of Agriculture, Ministry of Agriculture and Livestock, on 13 May 2026.",
    body: [
      "The presentations were delivered by Mr. Tsheten Dorji, Principal Investigator of the project, seeking approval for the proposed technology release and wider adoption.",
      "Recognising the system's potential, the Technology Release Committee recommended that CST and AMTC undertake additional field deployments to further validate its economic impact and assess its suitability for wider implementation.",
      "This marks an important step towards translating DakzinAI from a research prototype into a practical agricultural technology for addressing human-wildlife conflict in Bhutan.",
    ],
    facts: [
      { label: "Research Management Committee", value: "20 April 2026" },
      { label: "Technology Release Committee", value: "13 May 2026" },
      { label: "Presented by", value: "Mr. Tsheten Dorji, Principal Investigator" },
      { label: "Outcome", value: "Further field deployments recommended" },
    ],
  },
  {
    id: "field-monitoring-2025",
    date: "December 2025",
    year: 2025,
    category: "Field work",
    title: "Field monitoring confirms promising results from the DakzinAI pilot",
    place: "Zhemgang and Trongsa",
    lead: "A follow-up monitoring and user-feedback assessment was conducted in December 2025 at the two pilot sites under the Bhutan Foundation-supported project “Smart Solution for Human-Wildlife Conflicts: Implementing Animal Intrusion System” (September 2024 – December 2025).",
    body: [
      "The assessment confirmed that the system remained largely functional and demonstrated promising results in detecting wildlife intrusions, notifying farmers, reducing crop losses and minimising manual crop guarding.",
      "Farmers at Site 1 (Zurphi, Zhemgang) rated the system's benefits as Excellent, while Site 2 (Beling, Trongsa) rated them as Good. The monitoring also identified opportunities for improvement, particularly in network connectivity, field coverage, and animal habituation to repellent sounds at Site 2.",
      "Overall, the findings highlight the system's potential as a locally developed, scalable and non-lethal alternative or complementary solution to existing electric and chain-link fencing, particularly for smaller agricultural fields beyond existing government fencing coverage.",
      "The monitoring outcomes will guide further technical refinement, operational improvements and future deployment to promote sustainable agriculture and human-wildlife coexistence in Bhutan.",
    ],
    facts: [
      { label: "Site 1 · Zurphi, Zhemgang", value: "Rated Excellent" },
      { label: "Site 2 · Beling, Trongsa", value: "Rated Good" },
      { label: "To improve", value: "Network connectivity, field coverage, habituation to repellent sounds" },
      { label: "Project period", value: "September 2024 – December 2025" },
    ],
  },
  {
    id: "pilot-deployment-2025",
    date: "15–21 September 2025",
    year: 2025,
    category: "Field work",
    title: "DakzinAI successfully deployed at two agricultural pilot sites",
    place: "Zhemgang and Trongsa",
    lead: "The AI-powered Animal Intrusion Detection System was successfully deployed for real-world pilot testing at two remote agricultural sites in Bhutan, a major milestone in translating locally developed research into practical agricultural technology.",
    body: [
      "The pilot implementation was led by CST/RUB in partnership with AMTC, Department of Agriculture, Ministry of Agriculture and Livestock, with funding support from the Bhutan Foundation and co-financing from AMTC and CST.",
      "The inauguration and hands-on user training brought together local government leaders, community members and site-owner families, demonstrating strong community participation and support for the initiative.",
      "The pilot aims to evaluate the system's effectiveness under actual farming conditions and explore its potential as a smart, non-lethal virtual fencing solution for mitigating human-wildlife conflict in Bhutan.",
    ],
    facts: [
      { label: "Site 1 · Zurphi, Zhemgang", value: "15–17 September 2025" },
      { label: "Site 2 · Beling, Trongsa", value: "19–21 September 2025" },
      { label: "Included", value: "Inauguration and hands-on user training" },
      { label: "Funding", value: "Bhutan Foundation, co-financed by AMTC and CST" },
    ],
  },
  {
    id: "prototype-testing-amtc-2024",
    date: "13–14 May 2024",
    year: 2024,
    category: "Development",
    title: "Prototype integrated and tested with real animals at AMTC",
    place: "AMTC, Paro",
    lead: "A significant milestone was achieved with the successful integration and testing of the AI-powered Animal Intrusion Detection System prototype with the existing Animal Repellent System prototype developed by the Agriculture Machinery and Technology Centre (AMTC), Paro.",
    body: [
      "Developed by the Department of Information Technology, College of Science and Technology (CST/RUB), in collaboration with AMTC under the Department of Agriculture, the system aims to mitigate human-wildlife conflict through intelligent animal detection and automated repellent mechanisms.",
      "The testing and demonstration coincided with the third project progress review, attended by AMTC management, engineers and researchers, the Wangdue District Agriculture Officer, and a Japan International Cooperation Agency (JICA) volunteer and IT expert. The District Agriculture Officer expressed strong interest in supporting future pilot implementation in Wangdue.",
      "The AI model was further trained using the High-Performance Computing (HPC) facility of the Government Technology Agency, Thimphu, during the project students' three-month internship. The project team gratefully acknowledges the Agency's valuable technical and institutional support.",
    ],
    facts: [
      { label: "Tested with", value: "Real animals" },
      { label: "Integrated with", value: "AMTC's Animal Repellent System prototype" },
      { label: "Occasion", value: "Third project progress review" },
      { label: "AI training", value: "GovTech Agency HPC facility, Thimphu" },
    ],
  },
  {
    id: "world-ip-day-2024",
    date: "26 April 2024",
    year: 2024,
    category: "Recognition",
    title: "Showcased as a notable innovation on World Intellectual Property Day",
    place: "Thimphu",
    lead: "The AI-based Animal Intrusion Detection System for Human-Wildlife Conflicts in Bhutan was selected as a notable innovation by the Department of Media, Creative Industry and Intellectual Property, Ministry of Industry, Commerce and Employment (MoICE), Royal Government of Bhutan.",
    body: [
      "Selected from applications submitted through Bhutan's Technology and Innovation Support Centres (TISCs), the system was showcased at the innovation exhibition during World Intellectual Property Day 2024 in Thimphu.",
      "The event, themed “IP and SDGs: Building Our Common Future with Innovation and Creativity”, recognised innovative technologies contributing to sustainable development and encouraged locally developed solutions to national challenges.",
    ],
    facts: [
      { label: "Selected by", value: "Department of Media, Creative Industry and IP, MoICE" },
      { label: "Event", value: "World Intellectual Property Day 2024" },
      { label: "Theme", value: "“IP and SDGs: Building Our Common Future with Innovation and Creativity”" },
    ],
  },
];
