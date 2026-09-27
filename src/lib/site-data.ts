export const COMPANY = {
  name: "ABI Tech",
  email: "admin@abitech.site",
  emailHref: "mailto:admin@abitech.site",
  whatsapp: "+63 945 4456 764",
  whatsappHref: "https://wa.me/639454456764",
  officeName: "Ortigas Office",
  addressLines: [
    "One Corporate Center",
    "Julia Vargas Ave. cor. Meralco Ave.",
    "Ortigas Center, Pasig City 1605",
    "Philippines",
  ],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=One%20Corporate%20Center%20Julia%20Vargas%20Ave%20Meralco%20Ave%20Ortigas%20Center%20Pasig",
  appointmentNote: "Meetings by appointment.",
} as const;

export type NavChild =
  | { label: string; to: string; params?: Record<string, string>; href?: never }
  | { label: string; href: string; to?: never; params?: never };

export type NavItem =
  | { label: string; to: string; params?: Record<string, string>; href?: never; children?: NavChild[] }
  | { label: string; href: string; to?: never; params?: never; children?: never };

export const NAV: NavItem[] = [
  {
    label: "Company",
    to: "/about",
    children: [
      { label: "About", to: "/about" },
      { label: "Approach", to: "/approach" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Overview", to: "/services" },
      { label: "Strategy", to: "/services/$slug", params: { slug: "ai-strategy" } },
      { label: "Custom AI", to: "/services/$slug", params: { slug: "custom-ai" } },
      { label: "Automation", to: "/services/$slug", params: { slug: "automation" } },
      { label: "Teams", to: "/services/$slug", params: { slug: "dedicated-teams" } },
    ],
  },
  {
    label: "Work",
    to: "/use-cases",
    children: [
      { label: "Use Cases", to: "/use-cases" },
      { label: "Case Studies", to: "/case-studies" },
    ],
  },
  { label: "Insights", to: "/blog" },
  { label: "Apps", href: "/abitech-apps/index.html" },
  { label: "Contact", to: "/contact" },
];

export const SERVICES = [
  {
    slug: "ai-strategy",
    title: "AI Strategy & Advisory",
    short: "Identify opportunities, define roadmaps, and build AI strategies tailored to your business goals.",
    icon: "lightbulb" as const,
    body: "We sit with your operators, not just your slide deck. In a few weeks we map where AI can move revenue, cost, or risk — and where it cannot. You leave with a sequenced roadmap, a build-vs-buy view, and a business case your board can actually fund.",
    outcomes: [
      "Opportunity map ranked by value, feasibility, and data readiness",
      "12–18 month implementation roadmap with owners and gates",
      "Risk, governance, and model-use policy starter kit",
      "Executive readout your leadership team can decide from",
    ],
  },
  {
    slug: "custom-ai",
    title: "Custom AI Development",
    short: "Build and deploy AI agents, voice AI, computer vision, NLP, and more — designed for your use case.",
    icon: "code" as const,
    body: "Off-the-shelf chatbots stall the moment they meet your data. We design, train, and ship production systems — agents, voice, vision, retrieval, and decisioning — that live inside the tools your teams already use.",
    outcomes: [
      "Production-grade agents with tool use, memory, and audit trails",
      "Voice AI for contact centers and field operations",
      "Computer vision for quality, safety, and document intake",
      "Domain NLP and RAG over your private knowledge",
    ],
  },
  {
    slug: "automation",
    title: "Automation & Integration",
    short: "Streamline operations and reduce costs through intelligent automation and system integration.",
    icon: "cog" as const,
    body: "Most of the value in AI is not a model — it is the plumbing. We connect models to ERP, CRM, EHR, core banking, and the messy middle of your stack so work actually moves without a human copy-paste.",
    outcomes: [
      "Intelligent document processing with human-in-the-loop review",
      "Workflow automation across SAP, Salesforce, ServiceNow, and custom APIs",
      "Event-driven orchestration with observability and rollback",
      "Cost-to-serve reduction you can measure in a quarter",
    ],
  },
  {
    slug: "dedicated-teams",
    title: "Dedicated Teams",
    short: "Skilled AI and software engineers to scale your vision, faster.",
    icon: "users" as const,
    body: "When you need more than a project, we embed a squad — engineers, an applied scientist, and a delivery lead — that works as an extension of your team. Same rituals, same repo, faster throughput.",
    outcomes: [
      "Squads staffed in weeks, not quarters",
      "Senior AI + full-stack coverage in one pod",
      "Knowledge transfer baked into every sprint",
      "Scale up or wind down without a hiring freeze",
    ],
  },
] as const;

export const AUTOMATION_FLOWS = [
  {
    aspect: "Sales",
    title: "New inquiry to booked meeting",
    tagline: "No lead waits overnight — every inquiry gets an instant, personal response.",
    steps: [
      "Lead captured from form or chat",
      "AI scores fit and intent",
      "CRM creates contact and task",
      "Calendar link sent instantly",
      "Rep gets a brief before the call",
    ],
    result: "Every inquiry answered in under 60 seconds.",
  },
  {
    aspect: "Support",
    title: "Inbox zero without hiring",
    tagline: "Your helpdesk clears itself while the team handles only the tricky cases.",
    steps: [
      "Ticket arrives from any channel",
      "AI drafts a reply from your docs",
      "Confidence check sends or routes",
      "Human approves edge cases",
      "CSAT logged automatically",
    ],
    result: "70% of tickets resolved without a human touch.",
  },
  {
    aspect: "Hiring",
    title: "Resumes to shortlist overnight",
    tagline: "Wake up to a ranked shortlist instead of a 300-resume pile.",
    steps: [
      "Applications collected in one place",
      "AI screens for must-have skills",
      "Shortlist ranked with reasons",
      "Interviews scheduled automatically",
      "Kind rejections sent to the rest",
    ],
    result: "Shortlist ready before your morning coffee.",
  },
  {
    aspect: "Finance",
    title: "Invoices pay themselves",
    tagline: "Accounts payable runs in the background — approvals take one tap.",
    steps: [
      "Invoice lands in the inbox",
      "Data extracted, matched to PO",
      "Policy check flags exceptions",
      "Manager approves in one tap",
      "Posted straight to the ledger",
    ],
    result: "Close the books three days earlier.",
  },
  {
    aspect: "Healthcare",
    title: "No more intake clipboard",
    tagline: "Patients arrive verified and pre-registered; staff greet instead of type.",
    steps: [
      "Patient books online",
      "Insurance verified instantly",
      "Forms pre-filled from records",
      "Reminders cut no-shows",
      "Visit notes drafted for review",
    ],
    result: "Front-desk workload cut in half.",
  },
  {
    aspect: "Retail",
    title: "Win back abandoned carts",
    tagline: "Shoppers who drift away get a timely nudge — and a reason to return.",
    steps: [
      "Shopper leaves items in cart",
      "Nudge sent within minutes",
      "Personalized offer generated",
      "Deep link returns to checkout",
      "Purchase attributed to campaign",
    ],
    result: "Recover 15% of lost checkouts.",
  },
  {
    aspect: "Logistics",
    title: "Exceptions fixed before customers notice",
    tagline: "Delays get rerouted and explained proactively — not via angry tickets.",
    steps: [
      "Delay detected from carrier feed",
      "Impact assessed per order",
      "Shipment rerouted or split",
      "Customer notified proactively",
      "Credit issued where due",
    ],
    result: "“Where is my order?” tickets down 40%.",
  },
  {
    aspect: "Legal",
    title: "Contracts reviewed in minutes",
    tagline: "Routine agreements stop bottlenecking on one lawyer's inbox.",
    steps: [
      "Contract uploaded by anyone",
      "Key terms extracted",
      "Risky clauses flagged",
      "Redline draft proposed",
      "Lawyer approves the final",
    ],
    result: "Review cycle from days to hours.",
  },
  {
    aspect: "Marketing",
    title: "One idea, everywhere",
    tagline: "A single approved topic becomes a week of on-brand content.",
    steps: [
      "Topic approved once",
      "Draft written in brand voice",
      "Human edits a single pass",
      "Resized for every channel",
      "Scheduled with auto-reporting",
    ],
    result: "Publish five times more with the same team.",
  },
  {
    aspect: "Factory",
    title: "Defects caught on the line",
    tagline: "Every unit inspected, every defect photographed — no sampling luck.",
    steps: [
      "Camera inspects every unit",
      "AI flags defects instantly",
      "Line diverts rejects",
      "Ticket created with photo",
      "Weekly trend report delivered",
    ],
    result: "Scrap rate down 30%.",
  },
] as const;

export type AutomationFlow = (typeof AUTOMATION_FLOWS)[number];

export const INDUSTRIES = [
  {
    slug: "healthcare",
    title: "Healthcare",
    tagline: "Better care. Smarter systems.",
    image: "/images/ind-healthcare.jpg",
    summary:
      "Clinical operations, patient support, and medical documentation that keep clinicians with patients — not keyboards.",
    useCases: [
      "AI-assisted patient intake and triage",
      "Ambient clinical documentation",
      "Prior-authorization and claims acceleration",
      "Care-gap outreach that patients actually answer",
    ],
  },
  {
    slug: "finance",
    title: "Finance",
    tagline: "Faster insights. Lower risk.",
    image: "/images/ind-finance.jpg",
    summary:
      "From KYC to credit memos, we put models where analysts already work — with the controls a regulated firm requires.",
    useCases: [
      "Automated document processing for KYC and lending",
      "Fraud and AML investigation copilots",
      "Earnings and research summarization",
      "Operations bots for reconciliations and exceptions",
    ],
  },
  {
    slug: "retail",
    title: "Retail",
    tagline: "Personalized experiences. Higher sales.",
    image: "/images/ind-retail.jpg",
    summary:
      "Store, e-commerce, and contact-center AI that treats every shopper as if your best associate is always on shift.",
    useCases: [
      "Real-time multilingual support",
      "Personalized product discovery",
      "Inventory and demand sensing",
      "Associate copilot on the floor",
    ],
  },
  {
    slug: "education",
    title: "Education",
    tagline: "More inclusive learning. Greater access.",
    image: "/images/ind-education.jpg",
    summary:
      "Tutors, content tools, and admin automation that give teachers hours back and students a path that fits them.",
    useCases: [
      "Adaptive tutoring in multiple languages",
      "Assignment feedback at classroom scale",
      "Enrollment and advising assistants",
      "Accessibility tools for diverse learners",
    ],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    tagline: "Smarter operations. Higher productivity.",
    image: "/images/ind-manufacturing.jpg",
    summary:
      "Vision, maintenance, and planning systems that catch defects early and keep lines moving.",
    useCases: [
      "Visual inspection on the line",
      "Predictive maintenance from sensor streams",
      "Work-instruction and safety copilots",
      "Supply-chain exception handling",
    ],
  },
  {
    slug: "government",
    title: "Government",
    tagline: "Efficient services. Stronger communities.",
    image: "/images/ind-government.jpg",
    summary:
      "Citizen services, casework, and records that move at the speed people expect — with the transparency the public deserves.",
    useCases: [
      "Multilingual citizen service desks",
      "Caseworker document assistants",
      "Records search across decades of archives",
      "Benefits eligibility screening with auditability",
    ],
  },
] as const;

export const CASE_STUDIES = [
  {
    slug: "patient-support",
    industry: "Healthcare",
    industrySlug: "healthcare",
    title: "AI-Powered Patient Support System",
    image: "/images/case-healthcare.jpg",
    challenge:
      "A regional hospital network was drowning in after-hours calls. Nurses spent nights answering the same five questions, wait times stretched past twenty minutes, and satisfaction scores were sliding.",
    solution:
      "We designed a voice-and-chat support layer that handles scheduling, refill status, and care-instruction follow-ups, with a warm handoff to a nurse when the model is unsure. It sits on top of their existing EHR — no rip-and-replace.",
    metrics: [
      { value: "70%", label: "Higher Patient Satisfaction" },
      { value: "50%", label: "Lower Support Costs" },
      { value: "3X", label: "Faster Response Time" },
    ],
  },
  {
    slug: "document-processing",
    industry: "Finance",
    industrySlug: "finance",
    title: "Automated Document Processing",
    image: "/images/case-finance.jpg",
    challenge:
      "A Southeast Asian lender was taking six days to underwrite SME facilities because analysts read every bank statement, invoice, and ID by hand. Growth was capped by headcount.",
    solution:
      "We built an intake pipeline that classifies, extracts, and cross-checks 40+ document types, then writes a structured credit memo for analyst review. Exceptions route to a queue with the original page highlighted.",
    metrics: [
      { value: "100,000+", label: "Documents Processed Monthly" },
      { value: "99.5%", label: "Accuracy Rate" },
      { value: "80%", label: "Reduced Processing Time" },
    ],
  },
  {
    slug: "multilingual-support",
    industry: "Retail",
    industrySlug: "retail",
    title: "Real-Time Multilingual Support",
    image: "/images/case-retail.jpg",
    challenge:
      "A specialty retailer expanding across ASEAN could not staff native speakers for every store and chat channel. Cart abandonment spiked whenever shoppers hit a language wall.",
    solution:
      "We deployed a real-time multilingual assistant — in-store kiosk, web, and WhatsApp — grounded in the live catalog and return policy, with associate takeover when a sale is on the line.",
    metrics: [
      { value: "50+", label: "Languages Supported" },
      { value: "90%", label: "Customer Satisfaction Increase" },
      { value: "2X", label: "Higher Conversion Rate" },
    ],
  },
] as const;

export const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "Understand your goals, challenges, and opportunities.",
    icon: "search" as const,
  },
  {
    n: "02",
    title: "Design",
    body: "Create a tailored AI solution and implementation plan.",
    icon: "pen" as const,
  },
  {
    n: "03",
    title: "Develop",
    body: "Build, test, and iterate with transparency.",
    icon: "code" as const,
  },
  {
    n: "04",
    title: "Deploy",
    body: "Launch and integrate into your operations.",
    icon: "rocket" as const,
  },
  {
    n: "05",
    title: "Scale",
    body: "Optimize, monitor, and expand for greater impact.",
    icon: "bars" as const,
  },
] as const;

export const STATS = [
  { value: "50+", label: "Projects Delivered", icon: "globe" as const },
  { value: "30+", label: "Global Clients", icon: "users" as const },
  { value: "99%", label: "Client Satisfaction", icon: "thumb" as const },
  { value: "5+", label: "Years of Experience", icon: "trophy" as const },
] as const;

export const JOBS = [
  {
    id: "sr-ai-engineer",
    title: "Senior AI Engineer",
    team: "Delivery",
    location: "Ortigas, Pasig · Hybrid",
    type: "Full-time",
    blurb:
      "Own model integration, evaluation, and production reliability on client squads. You have shipped RAG or agents that real users depend on.",
  },
  {
    id: "solutions-consultant",
    title: "AI Solutions Consultant",
    team: "Advisory",
    location: "Ortigas, Pasig · Client-facing",
    type: "Full-time",
    blurb:
      "Translate messy operations into a scoped AI program. You are as comfortable in a boardroom as you are in a process workshop.",
  },
  {
    id: "mlops",
    title: "MLOps Engineer",
    team: "Platform",
    location: "Remote · APAC",
    type: "Full-time",
    blurb:
      "Stand up evaluation, tracing, and deployment pipelines so models do not become mystery boxes after go-live.",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    team: "Experience",
    location: "Ortigas, Pasig · Hybrid",
    type: "Full-time",
    blurb:
      "Design the human side of AI products — handoff states, trust, and the moments a person should take over from a model.",
  },
  {
    id: "engagement-manager",
    title: "Engagement Manager",
    team: "Delivery",
    location: "Ortigas, Pasig · Hybrid",
    type: "Full-time",
    blurb:
      "Run the engagement. Scope, staffing, executive communication, and the unglamorous work of making a program land.",
  },
] as const;

export const PARTNERS = [
  "Microsoft",
  "NVIDIA",
  "AWS",
  "Google Cloud",
  "OpenAI",
  "Meta",
] as const;
