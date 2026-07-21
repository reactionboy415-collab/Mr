export const SUGGESTED_SKILLS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python",
  "Go", "Rust", "Java", "C#", "C++", "PHP", "Ruby", "Swift",
  "Kotlin", "Flutter", "React Native", "Angular", "Vue", "Svelte",
  "Express", "NestJS", "MongoDB", "PostgreSQL", "Supabase", "Firebase",
  "Docker", "Kubernetes", "AWS", "Azure", "GCP", "GraphQL",
  "Tailwind CSS", "HTML", "CSS", "Machine Learning", "TensorFlow", "PyTorch"
];

export const INTERESTS = [
  { id: "frontend", label: "Frontend", icon: "Layout" },
  { id: "backend", label: "Backend", icon: "Server" },
  { id: "ai", label: "AI", icon: "Cpu" },
  { id: "devtools", label: "DevTools", icon: "Terminal" },
  { id: "mobile", label: "Mobile", icon: "Smartphone" },
  { id: "infra", label: "Infra", icon: "Database" }
];

export const EXPERIENCE_LEVELS = [
  { id: "beginner", label: "Beginner", description: "First-time contributors, good-first-issues" },
  { id: "intermediate", label: "Intermediate", description: "Requires general framework & logic skills" },
  { id: "advanced", label: "Advanced", description: "Complex systems, optimization & system design" }
];

export const WHY_MR_GIT = [
  {
    title: "Saves Hours of Manual Triage",
    description: "Instead of clicking through thousands of repositories looking for active, unclaimed issues, Mr. Git performs live cross-repository analysis for you.",
    icon: "Clock"
  },
  {
    title: "Precision Matching",
    description: "Our proprietary alignment matching scores are computed based on your unique combination of languages, library expertise, and core field interests.",
    icon: "Target"
  },
  {
    title: "Real-Time Open Issues",
    description: "No dead issues or stale code. We fetch active issues that are ready for collaboration immediately, complete with labels and discussions.",
    icon: "GitPullRequest"
  },
  {
    title: "Tailored to Your Experience",
    description: "Whether you are a seasoned engineer looking for complex systems bugs, or a beginner looking for well-documented walkthroughs, we've got you covered.",
    icon: "Award"
  }
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Define Your Stack",
    description: "Select 1 to 10 of your engineering skills, choose your proficiency level, and specify your project domain interests (e.g. AI, Backend, DevTools)."
  },
  {
    step: "02",
    title: "Match & Align",
    description: "Our engine scans active repositories, computes match scores, categorizes the issue difficulty, and lists the precise match alignment reasons."
  },
  {
    step: "03",
    title: "Claim & Contribute",
    description: "Examine comments, read the problem statement, open the live issue directly on GitHub, and start writing code to complete your PR!"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Mr. Git completely changed how I contribute. I found an intermediate TypeScript issue in an active developer tool and got my PR merged in 2 days!",
    author: "Elena Rostov",
    role: "Senior Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    quote: "As a student, finding 'good first issues' that weren't already solved was impossible. Mr. Git curated three active beginner issues that got me started immediately.",
    author: "Marcus Chen",
    role: "Computer Science Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    quote: "We manage a popular open-source repository. Thanks to Mr. Git, we receive high-quality contributions from developers whose skills perfectly align with our codebase.",
    author: "Sarah Jenkins",
    role: "Core Maintainer, DevKitOS",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80"
  }
];

export const FAQS = [
  {
    question: "Where do these issues come from?",
    answer: "These are real, live open-source issues pulled directly from active, public GitHub repositories. Our matching engine queries real-time database opportunities to serve the best items."
  },
  {
    question: "How is the Match Score calculated?",
    answer: "We compare your selected skills and interests with the repository's primary programming languages, recent contribution topics, active labels, and issue description taxonomy. Higher scores represent strong skill-issue symmetry."
  },
  {
    question: "Is there any cost to use Mr. Git?",
    answer: "None! Mr. Git is 100% free and open-source. Our mission is to democratize open-source contributions and make coding accessible to everyone."
  },
  {
    question: "Can I bookmark issues for later?",
    answer: "Yes! You can bookmark any issue using the star/bookmark button on the result card. Your bookmarks are saved locally in your browser's secure localStorage, meaning you won't lose them across sessions."
  },
  {
    question: "How do I filter issues based on difficulty?",
    answer: "Once you run a search, you can use the sidebar filters to refine the result set by difficulty (Easy, Medium, Hard), star counts, repository languages, and custom sorted categories like Highest Match or Most Stars."
  }
];
