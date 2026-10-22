import restaurantImg from "@/assets/proj-restaurant.jpg";
import clusteringImg from "@/assets/proj-clustering.jpg";
import fakeNewsImg from "@/assets/proj-fakenews.jpg";
import contactsImg from "@/assets/proj-contacts.jpg";
import hotstarImg from "@/assets/proj-hotstar.jpg";
import netflixImg from "@/assets/proj-netflix.jpg";
import portfolioPilotImg from "@/assets/proj-portfoliopilot.jpg";

export const profile = {
  name: "Sahil S. Sharma",
  role: "Software Development Engineer",
  company: "ZS Associates",
  location: "Pune, Maharashtra",
  email: "sahilshatrughan2003@gmail.com",
  phone: "+91 8657081837",
  github: "https://github.com/SharmaSahil2003",
  linkedin: "https://www.linkedin.com/in/sahil-sharma-58948222a/",
  leetcode: "https://leetcode.com/sharmazon2003/",
  summary:
    "Software engineer with a strong foundation in data structures, algorithms and full-stack development. I build production REST APIs and frontend systems at enterprise scale — backed by 1500+ LeetCode problems solved, two published IEEE papers and a hackathon-winning automated QA pipeline. Seeking a Software Development Engineer role on a high-scale engineering team.",
};

export const typedRoles = [
  "Backend Developer",
  "Full-Stack Engineer",
  "Competitive Programmer",
  "Effective Problem Solver",
];

export const stats = [
  { value: "1500+", label: "LeetCode solved" },
  { value: "02", label: "IEEE publications" },
  { value: "9.22", label: "B.E. CGPA" },
  { value: "#1", label: "Takeda AI Hackathon" },
];

export const skillGroups = [
  {
    title: "Languages",
    kind: "bars" as const,
    items: [
      { name: "C++", level: 92 },
      { name: "Python", level: 84 },
      { name: "Java", level: 85 },
      { name: "TypeScript", level: 82 },
      { name: "JavaScript", level: 80 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    title: "Frameworks & infrastructure",
    kind: "chips" as const,
    items: [
      "React",
      "FastAPI",
      "Flask",
      "Spring Boot",
      "REST APIs",
      "HTML / CSS",
      "Bootstrap",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Docker",
      "Git",
    ],
  },
  {
    title: "AI & core CS",
    kind: "chips" as const,
    items: [
      "LLMs",
      "RAG",
      "NLP",
      "Sentence Transformers",
      "Semantic Search",
      "Machine Learning",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Operating Systems",
      "Computer Networks",
      "Database Management Systems",
    ],
  },
];

export const tools = ["VS Code", "IntelliJ IDEA", "Eclipse", "Postman", "GitHub", "Docker"];

export const experience = [
  {
    role: "Business Technology Solutions Associate",
    company: "ZS Associates",
    period: "Jun 2025 — Present",
    location: "Pune, Maharashtra",
    summary:
      "Building scalable React frontend features and REST APIs across enterprise test automation, data quality and contract-intelligence platforms.",
    workstreams: [
      {
        name: "Testra — AI-Powered Test Management & Automation",
        points: [
          "Developed and scaled React/TypeScript frontend features and REST APIs for test-case management, generation, execution, test suites, releases and UI, ETL, CRM and API testing workflows.",
          "Built scalable import and bulk-operation APIs with batch and parallel processing for high-volume test data.",
          "Implemented test-case generation workflows with real-time progress tracking, agent reasoning logs, workflow monitoring, recovery mechanisms and long-running-operation handling.",
          "Contributed reusable components and responsive modules for projects, users, releases, audit history, defects, automation suites, reporting and configuration; reduced redundant API requests and improved reliability.",
          "Integrated Ask Testra assistant capabilities, including chatbot APIs, document management, workflow orchestration, conversation management, reasoning visualisation and stop-generation controls.",
        ],
      },
      {
        name: "BRMS — Data Quality Platform",
        points: [
          "Developed React modules and REST APIs for creating, editing, cloning and managing data-quality rules and execution jobs, including versioning and audit history.",
          "Delivered approval and ticketing workflows, lifecycle-based rule states, environment-specific views and promotion across development, test and production.",
          "Implemented RBAC-driven access control for governed data-quality operations.",
        ],
      },
      {
        name: "ContractIQ — Contract Intelligence Platform",
        points: [
          "Developed the contract repository with advanced search, filtering and repository-management capabilities for a contract-analytics platform.",
          "Built frontend enhancements and contributed to RBAC implementation, user restrictions, secure redirection and access-control workflows.",
        ],
      },
      {
        name: "Asset Wizard",
        points: [
          "Enhanced features and UI for an enterprise contract-intelligence chatbot.",
          "Validated contract-extraction accuracy across contract types.",
        ],
      },
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  year: string;
};

export const projects: Project[] = [
  {
    title: "PortfolioPilot — AI Portfolio Evolution Platform",
    description:
      "Agentic platform that turns updated résumés into evolving developer portfolios. Its three-level architecture supports structured data synchronisation, page-level code generation and full-workspace modifications with versioned workspaces, code diffs, rollback, human approval and automated validation.",
    tags: ["React", "Python", "LLMs", "RAG", "FastAPI", "PostgreSQL", "Docker"],
    image: portfolioPilotImg,
    year: "2026",
  },
  {
    title: "Agentic Social Media Intelligence Platform",
    description:
      "Agentic AI platform that combines RAG, semantic embeddings, comment clustering and sentiment analysis to automate social-media comment understanding and creator engagement. Flask APIs and MongoDB persist comments, embeddings, clusters, sentiment scores and conversation context behind a React analytics and chatbot interface. Findings are published in two IEEE papers.",
    tags: ["Python", "LLMs", "RAG", "NLP", "Flask", "MongoDB", "React"],
    image: clusteringImg,
    github: "https://github.com/SharmaSahil2003",
    year: "2025",
  },
  {
    title: "Restaurant Order Management System",
    description:
      "End-to-end order-management platform coordinating waitstaff, kitchen and delivery workflows. Spring Boot REST APIs drive the web app and persist order data in MySQL for downstream analysis, with role-specific views, delivery tracking and menu management.",
    tags: ["React JS", "Spring Boot", "MySQL", "Bootstrap"],
    image: restaurantImg,
    github: "https://github.com/SharmaSahil2003/Restaurant-Dine-in-Management-System",
    year: "2024",
  },
  {
    title: "Fake News Detection",
    description:
      "React + Flask application classifying news articles as authentic or misleading using NLP models. Flask APIs handle data retrieval, model integration and classification behind a responsive, categorised news interface.",
    tags: ["React", "Flask", "ML", "NLP"],
    image: fakeNewsImg,
    github: "https://github.com/SharmaSahil2003/Fake-News-Detection",
    year: "2024",
  },
  {
    title: "Contact Manager",
    description:
      "Spring Boot and Thymeleaf contact management app with Spring Security authentication and authorisation, Spring Data JPA persistence and full CRUD over a SQL database.",
    tags: ["Spring Boot", "Spring Security", "JPA", "Thymeleaf"],
    image: contactsImg,
    github: "https://github.com/SharmaSahil2003/Contact-Manager",
    year: "2023",
  },
  {
    title: "Disney+ Hotstar Replica",
    description:
      "Responsive streaming interface with user authentication, video playback, dynamic content loading and search, tuned for smooth navigation across devices.",
    tags: ["React", "Bootstrap"],
    image: hotstarImg,
    github: "https://github.com/SharmaSahil2003/Disney-Hotstar-Replica",
    demo: "https://disney-hotstar-replica.vercel.app/",
    year: "2023",
  },
  {
    title: "ReactFlix (Netflix Replica)",
    description:
      "Netflix-inspired streaming app with authentication, preference-driven content rows, smooth playback and effective search across an engaging, responsive UI.",
    tags: ["React", "Bootstrap"],
    image: netflixImg,
    github: "https://github.com/SharmaSahil2003/ReactFlix",
    demo: "https://react-flix-lime.vercel.app/",
    year: "2023",
  },
];

export const education = [
  {
    school: "Pune Institute of Computer Technology",
    detail: "Bachelor of Computer Engineering",
    meta: "CGPA 9.22 / 10.00",
    period: "Dec 2021 — May 2025",
    place: "Pune, Maharashtra",
  },
  {
    school: "SSH Junior College",
    detail: "HSC (XII)",
    meta: "88.33%",
    period: "2021",
    place: "Navi Mumbai, Maharashtra",
  },
  {
    school: "Ryan International School",
    detail: "CBSE (X)",
    meta: "91.80%",
    period: "2019",
    place: "Navi Mumbai, Maharashtra",
  },
];

export const achievements = [
  {
    title: "1st Place — Takeda AI Hackathon, ZS Associates",
    detail:
      "Built ATLAS, an automated QA pipeline validating Tableau dashboards against Databricks data, cutting dashboard-validation turnaround by 30–40%.",
  },
  {
    title: "Two IEEE Publications",
    detail:
      "“Optimizing User-Content Creator Engagement via Semantic Comment Clustering, Automated Chatbots, and Sentiment Analysis” and “Semantic Comment Analysis for Engagement Optimization”.",
  },
  {
    title: "1500+ LeetCode problems solved",
    detail: "Maintained 1000-day, 500-day and 365-day solving streaks.",
  },
  {
    title: "Redington Scholarship recipient",
    detail: "Awarded for academic merit and education funding.",
  },
  {
    title: "JEE MAIN 2021 rank 47,807 · MHT-CET 2021 99.63 percentile",
    detail: "Competitive entrance results across national and state examinations.",
  },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },

  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
