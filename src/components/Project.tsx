import React from "react";
import Chip from '@mui/material/Chip';
import '../assets/styles/Project.scss';

type ProjectCard = {
    title: string;
    context: string;
    description: string;
    highlights: string[];
    techStack: string[];
};

const projects: ProjectCard[] = [
    {
        title: "iDriving EU – Technical Lead",
        context: "Netcompany - Intrasoft | 2024 – present",
        description:
            "Led the architecture and delivery of the iDriving EU platform, owning system specifications and cross-partner integration.",
        highlights: [
            "Authored system architecture and first functional prototype specs for the consortium.",
            "Built CI/CD with Jenkins + Harbor on Hetzner Cloud; set up Kafka messaging and Minio S3 storage."
        ],
        techStack: ["Jenkins", "Harbor", "Apache Kafka", "Docker", "Minio (S3)", "Hetzner Cloud"]
    },
    {
        title: "On-prem GenAI Assistant – Backend",
        context: "Netcompany - Intrasoft | 2024 – present",
        description:
            "Backend for an internal GenAI assistant optimized for low latency and flexible RAG integrations.",
        highlights: [
            "Integrated multiple RAG knowledge bases with configurable retrieval.",
            "Implemented chat history, user configuration, and detailed tracking/logging."
        ],
        techStack: ["Java", "Quarkus", "RAG", "REST APIs"]
    },
    {
        title: "EOSC EU Node – Notification Service",
        context: "Netcompany - Intrasoft | 2024 – present",
        description:
            "Production-grade notification microservice for the EOSC ecosystem.",
        highlights: [
            "Engineered reliability and scalability for live traffic.",
            "Delivered Quarkus-based service aligned with platform SLAs."
        ],
        techStack: ["Java", "Quarkus", "Microservices"]
    },
    {
        title: "UniMaaS EU – Technical Lead",
        context: "Netcompany - Intrasoft | 2024 – present",
        description:
            "Led integration and delivery for the UniMaaS platform with secure, containerized deployments.",
        highlights: [
            "Orchestrated Kubernetes deployments and IAM with Keycloak.",
            "Managed cloud infrastructure and VPN for cross-partner access."
        ],
        techStack: ["Kubernetes", "Keycloak", "Jenkins", "Cloud", "VPN Management"]
    },
    {
        title: "Workflow Management Engine (SOPRANO / MODUL4R / GreenDatAI)",
        context: "Full Stack | 2022 – present",
        description:
            "Reusable workflow engine enabling MLOps pipelines across multiple EU R&D projects.",
        highlights: [
            "Built Spring Boot + Vue 3 solution with Airflow DAGs for workflow generation.",
            "Implemented event-driven pipelines with Kafka/Celery and observability via ELK."
        ],
        techStack: ["Spring Boot", "Vue 3", "Apache Kafka", "Apache Airflow", "Python", "Celery", "ELK", "Keycloak", "Docker"]
    }
];

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Projects</h1>
        <div className="projects-grid">
            {projects.map((project) => (
                <div className="project-card" key={project.title}>
                    <div className="project-header">
                        <h2>{project.title}</h2>
                        <p className="project-context">{project.context}</p>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <ul className="project-highlights">
                        {project.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                        ))}
                    </ul>
                    <div className="project-tags">
                        {project.techStack.map((tag) => (
                            <Chip key={tag} className="project-chip" label={tag} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}

export default Project;