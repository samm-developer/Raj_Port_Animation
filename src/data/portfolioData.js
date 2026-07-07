export const personalInfo = {
  name: "Rajat Keshari",
  title: "Software Developer & NIT Student",
  tagline: "Crafting robust, scalable systems with performance-driven engineering",
  bio: "Resourceful Software Developer with expertise in designing robust, scalable system architectures and crafting efficient solutions that prioritize performance, reliability, and long-term maintainability.",
  email: "samdeveloper7777@gmail.com",
  phone: "7355904515",
  location: "Delhi, India",
  website: "https://rajat-porfile.netlify.app/",
  linkedin: "https://linkedin.com/in/rajat-kumar-keshari-201524218",
  github: "https://github.com/samm-developer",
  cv: "/Rajat_CV.pdf",
};

export const skills = [
  "React.js", "Next.js", "JavaScript", "TypeScript", "MERN",
  "AWS", "MongoDB", "GraphQL", "Redux Toolkit", "RabbitMQ",
  "Tailwind CSS", "Socket.io", "Node.js", "Express.js", "Razorpay",
];

export const experience = [
  {
    role: "Software Developer (Owner)",
    company: "The Kings Library",
    period: "04/2023 - 07/2025",
    url: "http://thekingslibrary.in/",
    highlights: [
      "Developed full stack Library Management System with React, TypeScript, Express, Node.js & MongoDB",
      "Built real-time automatic seat allocation with transactions & rollback preventing booking conflicts",
      "Implemented secure auth with access/refresh tokens and token blacklisting via cache",
      "Integrated RazorPay & PhonePe payment gateways for reservations and book purchases",
      "Built RabbitMQ notification microservice for async email processing",
      "Optimized MongoDB with indexes — reduced response times for high-traffic operations",
      "Improved search latency by 60% using debouncing, throttling & Redux Toolkit",
    ],
  },
];

export const education = [
  {
    degree: "M. Tech (Computer Science)",
    school: "NIT Jalandhar",
    period: "07/2025 - Present",
    grade: "74%",
    subjects: ["Machine Learning", "Advanced Computer Network", "Data Structures", "Operating System", "Cryptography"],
  },
  {
    degree: "B. Tech (Computer Science)",
    school: "B.I.E.T Jhansi",
    period: "07/2019 - 04/2023",
    grade: "74%",
    subjects: ["Web Development", "DBMS", "Operating System", "Compiler Design", "Computer Network", "OOPS"],
  },
];

export const projects = [
  {
    title: "SyncStream",
    subtitle: "Real-Time Collaborative Video Platform",
    description: "Synchronized YouTube playback for multiple users with sub-second accuracy using Socket.io, Node.js, and React.",
    tech: ["Socket.io", "Node.js", "React", "YouTube API"],
    color: "#00f0ff",
  },
  {
    title: "YouTube Clone",
    subtitle: "Optimized Search & Video Streaming",
    description: "Video streaming platform with 98% fewer API calls via debouncing & caching. Nested comments and live chat simulation.",
    tech: ["React", "Redux Toolkit", "Tailwind CSS", "YouTube API"],
    color: "#ff006e",
  },
  {
    title: "The Kings Library",
    subtitle: "Full Stack Library Management",
    description: "Complete library system with seat booking, book rentals, payments, and real-time notifications.",
    tech: ["MERN", "RabbitMQ", "Razorpay", "TypeScript"],
    color: "#8338ec",
  },
];

export const achievements = [
  { label: "DSA Problems Solved", value: "500+", detail: "CodeChef, GFG, LeetCode" },
  { label: "Load Time Reduction", value: "40%", detail: "Performance optimization" },
  { label: "API Call Reduction", value: "98%", detail: "Search optimization" },
  { label: "Search Latency", value: "60%", detail: "Faster response times" },
];

export const certificates = [
  "Cyber Job Simulation — Deloitte",
  "Graph Theory Programming Camp",
  "Introduction to C++",
  "Data Structures in C++",
  "C Language — LearnVern",
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];
