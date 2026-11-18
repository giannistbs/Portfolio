export const SITE = {
  fullName: "Ioannis Tampakis",
  description:
    "Ioannis Tampakis: DevOps engineer at Certora, with a background in platform engineering and smart contract auditing.",
  url: "https://portfolio.giannistbs.shop",
  socials: {
    github: "https://github.com/giannistbs",
    linkedin: "https://www.linkedin.com/in/giannis-tampakis-b1b378256/",
    audits: "https://github.com/giannistbs/audit-portfolio",
    mail: "ioannistbs@gmail.com",
  },
};

export const HERO = {
  title: "gm, I'm Ioannis",
  roles: ["devops", "web3", "security", "platform", "backend"],
  subtext:
    "DevOps engineer at Certora. Before that I spent two and a half years building and running cloud infrastructure for EU research projects at Netcompany, alongside eight months of freelance auditing where I found bugs in DeFi protocols in audit contests and private audits.",
  cta: "get in touch",
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  cta: string;
  href: string;
  external?: boolean;
};

export const STATS: Stat[] = [
  {
    value: 3,
    prefix: "#",
    label: "best finish in a public Sherlock audit contest, out of hundreds",
    cta: "audit portfolio",
    href: SITE.socials.audits,
    external: true,
  },
  {
    value: 6,
    label: "valid High and Medium findings in audit contests",
    cta: "see findings",
    href: SITE.socials.audits,
    external: true,
  },
  {
    value: 4,
    suffix: "+",
    label: "EU research projects running a workflow engine I designed",
    cta: "projects",
    href: "/tech/projects/",
  },
  {
    value: 3,
    label: "EU Horizon projects where I led DevOps and architecture",
    cta: "experience",
    href: "/tech/experience/",
  },
];

export const STRENGTHS = {
  title: "what I bring",
  items: [
    {
      icon: "shield" as const,
      title: "security mindset",
      description:
        "I read code looking for how it breaks: lending, vaults, oracles, reentrancy, access control. Then I write it up clearly enough to get it fixed.",
    },
    {
      icon: "server" as const,
      title: "infrastructure that ships",
      description:
        "Infrastructure as code, containers, Kubernetes, GitOps and CI/CD. I've taken platforms from an empty account to live production and kept them running.",
    },
    {
      icon: "boxes" as const,
      title: "systems, end to end",
      description:
        "From architecture and specs to backends, data pipelines and deployment, I'm comfortable owning the whole thing and working across large teams.",
    },
  ],
};

export type XpItem = {
  date: string;
  title: string;
  org: string;
  description: string;
  skills?: string[];
};

export const XP_TABS = ["work", "security", "education"] as const;
export type XpTab = (typeof XP_TABS)[number];

export const XP: Record<XpTab, { badges?: string[]; items: XpItem[] }> = {
  work: {
    items: [
      {
        date: "Nov 2026 – present",
        title: "DevOps Engineer",
        org: "Certora",
        description:
          "DevOps at Certora, a smart contract security company.",
        skills: ["DevOps", "Infrastructure", "Web3"],
      },
      {
        date: "Mar 2024 – Nov 2026",
        title: "R&D DevOps Engineer",
        org: "Netcompany",
        description:
          "Technical manager for DevOps and architecture on EU Horizon projects: iDriving (road safety), UniMaaS (manufacturing as a service) and PETSforDeFi (privacy-enhancing tech for DeFi).\nBuilt their infrastructure from scratch and ran deployments for AI components, digital twins, knowledge graphs and control centres, with CI/CD, GitOps and monitoring.\nLed the design of a reusable workflow engine now used across 4+ research projects, and built production Java backends, including a notification service for a European research cloud used by thousands of researchers.",
        skills: ["Kubernetes", "Terraform", "Docker", "GitOps", "CI/CD", "Java", "Go", "Kafka"],
      },
      {
        date: "Aug 2025 – Mar 2026 · 8 months",
        title: "Smart Contract Security Researcher",
        org: "freelance",
        description:
          "Audit contests and private audits across DeFi: collateralised lending, yield tokenisation, oracle manipulation, ERC-4626 vaults, reentrancy and access control.",
        skills: ["Solidity", "Foundry", "Auditing"],
      },
    ],
  },
  security: {
    badges: ["2 High", "4 Medium", "Top 3 finish", "Sherlock", "Private audits"],
    items: [
      {
        date: "Sherlock contest",
        title: "Inverse Finance: Junior Tranche",
        org: "Sherlock",
        description:
          "Placed 3rd among hundreds of participants, finding one of the only two Medium-severity issues.",
      },
      {
        date: "Sherlock contest",
        title: "USG / Tangent",
        org: "Sherlock",
        description:
          "Placed 9th among hundreds of participants with 5 findings: 2 High and 3 Medium.",
      },
      {
        date: "Private audits",
        title: "Silo Finance, Euler Vault Kit periphery, IZkonen",
        org: "Zark · KannAudits",
        description:
          "Private audits of Silo Finance and the Euler Vault Kit periphery with Zark, and a security review of the IZkonen protocol with KannAudits.",
      },
    ],
  },
  education: {
    badges: ["Software technologies", "Data analysis", "Cryptography", "Consensus"],
    items: [
      {
        date: "Sep 2022 – Sep 2026",
        title: "BSc Management Science and Technology",
        org: "Athens University of Economics and Business",
        description:
          "Focus on software technologies and data analysis. Thesis: an Ethereum Layer 2 package integrity registry, a decentralised alternative to the central trust that software repositories rely on today.",
      },
      {
        date: "Spring 2026",
        title: "Blockchain Foundations (Advanced Topics in Cryptography)",
        org: "NTUA",
        description:
          "Graduate course by Dr. Dionysis Zindros: consensus, proof-of-work and longest-chain, quorum-based proof-of-stake, light clients and formal security proofs.",
      },
    ],
  },
};

export const PROJECT_TABS = ["engineering", "web3"] as const;
export type ProjectTab = (typeof PROJECT_TABS)[number];

export type Project = {
  title: string;
  context: string;
  description: string;
  tags: string[];
  href?: string;
};

export const PROJECTS: Record<ProjectTab, Project[]> = {
  engineering: [
    {
      title: "Workflow Management Engine",
      context: "Netcompany · design lead",
      description:
        "A reusable workflow engine adopted as a core component across 4+ EU research projects, powering MLOps pipelines in manufacturing, robotics and AI.",
      tags: ["Java", "Go", "Python", "Vue 3", "Kafka", "Airflow"],
    },
    {
      title: "iDriving",
      context: "EU Horizon · road safety",
      description:
        "Owned DevOps and architecture: infrastructure as code, a decoupled deployment of AI components, digital twins and control centres, CI/CD and monitoring.",
      tags: ["Terraform", "Containers", "CI/CD", "Event streaming"],
    },
    {
      title: "UniMaaS",
      context: "EU Horizon · manufacturing",
      description:
        "Deployed on Kubernetes a platform that solves complex planning problems for aerospace and automotive, with AI agents, knowledge graphs and dataspace connectors.",
      tags: ["Kubernetes", "ArgoCD", "GitOps", "AI agents"],
    },
    {
      title: "EOSC EU Node: Notification Service",
      context: "Production backend",
      description:
        "The notification service of a live European research cloud used by thousands of researchers.",
      tags: ["Java", "Quarkus", "Microservices"],
    },
    {
      title: "RAG AI Assistant",
      context: "Internal tool",
      description:
        "Backend for an internal AI assistant with retrieval over multiple knowledge bases, chat history and per-user configuration.",
      tags: ["Java", "Quarkus", "RAG"],
    },
  ],
  web3: [
    {
      title: "Audit Portfolio",
      context: "Smart contract security",
      description:
        "My audit contest results and private audit reports, with High and Medium findings across DeFi protocols.",
      tags: ["Solidity", "Foundry", "DeFi"],
      href: "https://github.com/giannistbs/audit-portfolio",
    },
    {
      title: "PETSforDeFi",
      context: "EU Horizon · privacy for DeFi",
      description:
        "Technical lead for integration, testing and deployment: designing the Ethereum test-network deployment of lending/DEX, NFT/DAO and off-chain components, plus the audit cycle.",
      tags: ["Ethereum", "DeFi", "Security audits"],
    },
    {
      title: "Marabu Blockchain Node",
      context: "NTUA · Blockchain Foundations",
      description:
        "A proof-of-work UTXO full node in TypeScript, run on a live student network: raw TCP peer layer with strict validation of incoming data, P2P gossip, block validation and persistent chain state.",
      tags: ["TypeScript", "P2P", "Consensus"],
    },
    {
      title: "L2 Package Integrity Registry",
      context: "BSc thesis",
      description:
        "An Ethereum Layer 2 registry for software package integrity, as a decentralised alternative to the central trust package repositories rely on.",
      tags: ["Ethereum", "Layer 2", "Supply chain"],
    },
  ],
};
