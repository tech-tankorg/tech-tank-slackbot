import type { TypeOfQuestion } from "../types/projectTypes.ts";

export const questions: TypeOfQuestion = [
  {
    id: "c1718974200766hurt0b1sylerhm3h",
    type: "rating",
    question:
      "On a scale of 1-5, how much value are you getting from the TechTank Slack community? [Low value = 1; high value = 5]",
  },
  {
    id: "c1718974200766bgjzkb9ghbmtx1w9",
    type: "multi_select",
    question:
      "Which platforms do you actively engage with at TechTank? Select all that apply: ",
    options: [
      "a) Slack",
      "b) Meetup",
      "c) LinkedIn",
      "d) Instagram",
      "e) YouTube",
      "f) Spotify",
      "g) Website",
      "h) All of the above",
      "i) None of the above",
    ],
  },
  {
    id: "c171897420076659xedp3y21cel4y5",
    type: "multiple_choice",
    question: "Which of our channels on Slack do you engage with the most?",
    options: [
      "a) #announcements",
      "b) #general",
      "c) #networking-events",
      "d) #social-toronto",
      "e) #code-diversity",
      "f) #random",
      "g) #study-tank",
      "h) #job-postings",
      "i) Other",
    ],
  },
  {
    id: "c1718974200766lnewrnayc8oytdcw",
    type: "multiple_choice",
    question:
      "What is the most important thing that gives you value from being part of the TechTank community?",
    options: [
      "a) Networking opportunities with other professionals",
      "b) Support and feedback from a like-minded community",
      "c) Opportunities to collaborate on tech projects",
      "d) Access to job postings and career resources",
      "e) Mentorship from experienced industry leaders",
      "f) Access to community events and meetups",
      "g) Other",
    ],
  },
  {
    id: "c1718974200766x512gxfzdwyym6m8",
    type: "short_answer",
    question:
      "What is one aspect that you wish we could improve about the TechTank community or how we engage with our members across our platforms?",
  },
  {
    id: "c171897420076670jnqc8n2ppya35j",
    type: "multiple_choice",
    question:
      "What types of content or discussions would you like to see more of in the community?",
    options: [
      "a) Technical Content, Study-tank",
      "b) Social Events",
      "c) Networking Events",
      "d) Memes",
      "e) Job postings/job-related support",
      "f) Other",
    ],
  },
  {
    id: "c1718974200766qa2c6mfdppy0kabz",
    type: "rating",
    question:
      "On a scale of 1-5, how satisfied are you with the frequency and relevance of the content shared on the TechTank platforms (Slack, LinkedIn, Instagram, Meetup, etc.)? [Low satisfaction = 1; High Satisfaction = 5]",
  },
  {
    id: "c1718974200766o7evz1uaatw98u8n",
    type: "yes_or_no",
    question:
      "Do you feel your contributions or feedback are valued and acted upon by the community leaders/moderators?",
  },
  {
    id: "c171897420076692nwiykx9p3mo81a",
    type: "multiple_choice",
    question: "How often do you participate in TechTank events or activities?",
    options: [
      "a) Daily",
      "b) Weekly",
      "c) Monthly",
      "d) A few times a year",
      "e) Once a year",
      "f) Never",
    ],
  },
  {
    id: "c1718974200766sxmf0k0m9ysnk9fj",
    type: "rating",
    question:
      "On a scale of 1-5, how welcoming or inclusive do you find the community to be towards new members or those from diverse backgrounds? (not inclusive/welcoming = 1; highly inclusive/welcoming = 5)",
  },
  {
    id: "c171897420076682etiawhhjf8fr95",
    type: "yes_or_no",
    question:
      "Have you ever invited or referred anyone to join the TechTank community?",
  },
];
