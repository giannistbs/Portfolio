import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "Java (Spring Boot, Quarkus)",
    "Go",
    "Python",
    "TypeScript",
    "JavaScript",
    "Vue 3",
    "React",
    "SQL",
    "REST APIs"
];

const labelsSecond = [
    "Kubernetes",
    "Docker",
    "Jenkins",
    "GitHub Actions",
    "Harbor",
    "Hetzner Cloud",
    "Minio (S3)",
    "VPN Management",
    "Keycloak"
];

const labelsThird = [
    "Apache Kafka",
    "Apache Airflow",
    "Celery",
    "ELK Stack",
    "Microservices",
    "Event-Driven Architecture",
    "MLOps",
    "RAG"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Full Stack & Architecture</h3>
                    <p>Design and build end-to-end products with strong focus on clean APIs, microservices, and pragmatic frontend delivery.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDatabase} size="3x"/>
                    <h3>Cloud & DevOps</h3>
                    <p>Own CI/CD and platform operations: containerized deployments, secure IAM, and cloud delivery pipelines for R&D products.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDocker} size="3x"/>
                    <h3>Data, Messaging & AI Platforms</h3>
                    <p>Build event-driven and MLOps pipelines with strong observability and reliable data movement for AI/analytics workloads.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;