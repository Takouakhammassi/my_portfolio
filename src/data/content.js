export const profile = {
  name: "Takoua Khammassi",
  role: "Data Science & AI Enthusiast",
  tagline:
    "I transform raw data into decisions through modeling, experimentation, and deployment.",
  location: "Tunis, Tunisia",
  email: "takoua.khammassi@isamm.u-manouba.tn",
  resumeUrl: "/cv_takoua_khammassi.pdf",
  
  introVideo: "/profile/me.mp4",
  introVideoChromaKey: "#000000",
  contactAccessKey: "c57ac034-8357-4294-ade4-522afc3e7813",
  codingVideo: "/profile/coding.mp4",
  codingVideoChromaKey: "#000000",
  socials: [
    { label: "GitHub", href: "https://github.com/Takouakhammassi" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/takouakhammassi" },
  ],
};

export const about = {
  paragraphs: [
    "Data Science and AI enthusiast who enjoys turning messy, imperfect data into reliable machine learning solutions. I like building end-to-end projects from exploring raw datasets and engineering features to training, explaining, and deploying models",
    "What motivates me most is solving real-world problems where data isn't perfect. I enjoy combining statistical thinking, machine learning, and software engineering to create solutions that are not only accurate in experiments but also practical, interpretable, and ready for production.",
  ],
  focusAreas: [
    "Problem Solving",
    "Curiosity",
    "Collaboration",
    "Continuous Improvement",
  ],
};

export const skills = [
  {
    category: "Langages",
    items: [
      { name: "Python"},
      { name: "SQL"},
      { name: "JavaScript"},
      { name: "Java"},
    ],
  },
  {
    category: "Data Science & AI",
    items: [
      { name: "Pandas" },
      { name: "NumPy"},
      { name: "Scikit-learn"},
      { name: "TensorFlow"},
      { name: "PyTorch"},
      { name: "Machine Learning"},
      { name: "Deep Learning"},
      { name: "Transfer Learning" },
      { name: "Computer Vision"},
      { name: "Transformers"},
      { name: "LLMs"},
      { name: "RAG" },
      { name: "NLP"},
    ],
  },
  {
    category: "Big Data",
    items: [
      { name: "Hadoop"},
      { name: "HDFS"},
      { name: "Spark"},
      { name: "NoSQL"},
    ],
  },
  {
    category: "Visualisation",
    items: [
      { name: "Power BI"},
      { name: "Matplotlib"},
      { name: "Seaborn"},
    ],
  },
];

export const experience = [
  {
    period: "July 2026 — Present",
    role: "AI & Machine Learning Intern",
    org: "Bee Coders",
    logo : "/projects/bee_coders.png",
    description:
      "Developing intelligent AI solutions for sales forecasting and commercial optimization. Designing machine learning models, recommendation systems, and conversational AI to analyze customer behavior, predict future sales, and support data-driven business decisions.",
  },
  {
    period: "August 2025 — September 2025",
    role: "Software Engineering Intern",
    org: "Sagemcom",
    logo : "/projects/logo_sagem.png",
    description:
      "Developed a Python application to automate Wi-Fi test analysis in an industrial manufacturing environment. Designed data processing and statistical analysis workflows, generated interactive visualizations with Gaussian distribution curves and process capability metrics, and streamlined quality control by replacing manual analysis with an efficient automated solution.",
  },
  {
    period: "February 2024 - May 2024",
    role: "AI & Data Science Intern",
    org: "DeepAI",
    logo : "/projects/deepAI.webp",
    description:
      "Built an end-to-end AI pipeline to automate the collection, cleaning, classification, and clustering of educational resources for an e-learning platform. Designed ETL workflows, developed a SQL Server data warehouse, and built interactive Power BI dashboards for analytics and monitoring.",
  },
];

export const projects = [
  {
    title: "AssistSales · AI Sales Analytics Chatbot",
    description:
      "End-to-end platform combining data engineering and NLP to analyze and predict commercial performance for a multi-store electronics retailer: multi-source data cleaning (sales, products, clients, stores, reviews), comparative study of 3 non-similar NLP intent-matching approaches, Flask API, and a full Symfony web application with secure authentication and a ChatGPT-style multi-conversation interface.",
    tags: ["Python", "Flask", "Sentence-Transformers", "Symfony", "MySQL", "scikit-learn"],
    metric: { label: "16", value: " intents recognized" },
    dataset: "5 data sources cleaned",
    image: "/projects/chatbot.png",
    demoUrl: "https://my-portfolio-takoua.vercel.app/",
    githubUrl: "https://github.com/Takouakhammassi/sales_analysis_chatbot",
  },
  {
    title: "Hirfatuna · Tunisian Craft Heritage AI Platform",
    description:
      "End-to-end platform combining computer vision and generative AI to identify and document Tunisian handicrafts: self-collected dataset, comparative architecture study, VLM filtering guard, RAG-powered chatbot, and deployed web application.",
    tags: ["ResNet-50", "Qwen3.5-VL", "FAISS", "Streamlit"],
    metric: { label: "ACCURACY", value: " 90.8%" },
    dataset: "3,264 images",
    image: "/projects/hirfatuna.png",
    demoUrl: "https://hirfatuna.streamlit.app/",
    githubUrl: "https://github.com/Takouakhammassi/Hirfatuna-tunisian-craft-ai",
  },
  {
    title: "HDFS Small Files Optimization",
    description:
      "Designed and implemented a graph-based strategy to optimize HDFS storage by intelligently merging correlated small files using a modified Louvain clustering algorithm. Improved storage efficiency, reduced NameNode metadata overhead, and enhanced block utilization while preserving fast file retrieval through an indexing mechanism.",
    tags: ["Hadoop", "HDFS", "Python"],
    metric: { label: "Block Reduction", value: "97.1%" },
    dataset: "64.7% Less NameNode Memory",
    image: "/projects/louvain.png",
    demoUrl: "#",
    githubUrl: "#",
  },
];

export const education = [
  {
    period: "2024 — Present",
    role: "Higher Institute of Arts and Multimedia of Manouba · ISAMM",
    logo : "/projects/logo_isamm.png",
    description:
      "Software Engineering Student",
  },
  {
    period: "2021 — 2024",
    role: "Higher Institute of Arts and Multimedia of Manouba · ISAMM",
    logo : "/projects/logo_isamm.png",
    description:
      "Bachelor's Degree in Big Data and Data Analytics ",
  },
];

export const certifications = [
  {
    title: "Associate Data Scientist",
    issuer: "DataCamp",
    date: "July 2026",
    image: "/certificates/associate_data_scientist.png",
    fileUrl: "/certificates/associate_data_scientist.pdf",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "June 2026",
    image: "/certificates/Intro_data_science.png",
    fileUrl: "/certificates/Intro_data_science.pdf",
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP Foundation",
    date: "June 2026",
    image: "/certificates/data_science_and_analytics.png",
    fileUrl: "/certificates/Data Science_and_Analytics.pdf",
  },
  {
    title: "Data Science Essentials with Python",
    issuer: "Cisco Networking Academy",
    date: "June 2026",
    image: "/certificates/data_science_with_python.png",
    fileUrl: "/certificates/Data_Science_with_Python.pdf",
  },
  {
    title: "AI Fundamentals",
    issuer: "Cisco Networking Academy in collaboration with IBM",
    date: "September 2024",
    image: "/certificates/AI_fundamentals.png",
    fileUrl: "/certificates/AI_fundamentals.pdf",
  },
  {
    title: "Deep Learning using TensorFlow",
    issuer: "IBM",
    date: "July 2024",
    image: "/certificates/DL.png",
    fileUrl: "/certificates/DL.pdf",
  },
];


