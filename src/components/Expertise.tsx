import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "Java",
    "Python", 
    "JavaScript",
    "TypeScript",
    "React",
    "HTML5",
    "CSS3",
    "REST APIs",
    "Spring Boot",
    "Node.js"
];

const labelsSecond = [
    "SQL",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Database Design",
    "Data Management",
    "Performance Optimization"
];

const labelsThird = [
    "Docker",
    "Git",
    "GitHub",
    "AWS",
    "Linux",
    "CI/CD",
    "Software Architecture",
    "System Design",
    "Microservices"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Full Stack Development</h3>
                    <p>Experienced in building end-to-end applications using modern technologies. Proficient in both frontend and backend development with a focus on creating scalable and maintainable solutions.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDatabase} size="3x"/>
                    <h3>Database Management</h3>
                    <p>Strong background in database design, optimization, and management. Experience with both relational and NoSQL databases for various application requirements.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDocker} size="3x"/>
                    <h3>Software Architecture</h3>
                    <p>Skilled in designing and implementing software architecture solutions. Experience with containerization, cloud services, and building scalable distributed systems.</p>
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