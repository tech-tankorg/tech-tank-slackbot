import type { TypeOfQuestion } from "../types/projectTypes.ts";

export const questions: TypeOfQuestion = [
  {
    id: "q1",
    type: "rating",
    question:
      "On a scale of 1-5, how much value are you getting from the TechTank Slack community? [Low value = 1; high value = 5]",
  },
  {
    id: "q2",
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
    id: "q3",
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
    id: "q4",
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
    id: "q5",
    type: "short_answer",
    question:
      "What is one aspect that you wish we could improve about the TechTank community or how we engage with our members across our platforms?",
  },
  {
    id: "q6",
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
    id: "q7",
    type: "rating",
    question:
      "On a scale of 1-5, how satisfied are you with the frequency and relevance of the content shared on the TechTank platforms (Slack, LinkedIn, Instagram, Meetup, etc.)? [Low satisfaction = 1; High Satisfaction = 5]",
  },
  {
    id: "q8",
    type: "yes_or_no",
    question:
      "Do you feel your contributions or feedback are valued and acted upon by the community leaders/moderators?",
  },
  {
    id: "q9",
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
    id: "q10",
    type: "rating",
    question:
      "On a scale of 1-5, how welcoming or inclusive do you find the community to be towards new members or those from diverse backgrounds? (not inclusive/welcoming = 1; highly inclusive/welcoming = 5)",
  },
  {
    id: "q11",
    type: "yes_or_no",
    question:
      "Have you ever invited or referred anyone to join the TechTank community?",
  },
];
