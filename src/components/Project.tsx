import React from "react";
import mock01 from '../assets/images/mock01.png';
import mock02 from '../assets/images/mock02.png';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">
            <div className="project">
                <div className="project-image"><img src={mock01} className="zoom" alt="thumbnail" width="100%"/></div>
                <div className="project-title"><h2>Enterprise Management System</h2></div>
                <p>Full-stack web application built with Java Spring Boot and React. Features include user authentication, database management, and RESTful API design for business process optimization.</p>
            </div>
            <div className="project">
                <div className="project-image"><img src={mock02} className="zoom" alt="thumbnail" width="100%"/></div>
                <div className="project-title"><h2>Database Performance Analyzer</h2></div>
                <p>Python-based tool for analyzing and optimizing database performance. Implements advanced SQL query optimization techniques and provides detailed performance metrics and recommendations.</p>
            </div>
            <div className="project">
                <div className="project-image"><img src={mock03} className="zoom" alt="thumbnail" width="100%"/></div>
                <div className="project-title"><h2>Microservices Architecture Platform</h2></div>
                <p>Containerized microservices platform using Docker and JavaScript. Demonstrates scalable architecture design with service discovery, load balancing, and inter-service communication.</p>
            </div>
            <div className="project">
                <div className="project-image"><img src={mock04} className="zoom" alt="thumbnail" width="100%"/></div>
                <div className="project-title"><h2>REST API Development Framework</h2></div>
                <p>Comprehensive REST API framework built with Java and Spring Boot. Features include authentication, rate limiting, documentation generation, and automated testing suites.</p>
            </div>
            <div className="project">
                <div className="project-image"><img src={mock05} className="zoom" alt="thumbnail" width="100%"/></div>
                <div className="project-title"><h2>European R&D Data Management System</h2></div>
                <p>Data management system developed for European research projects. Implements advanced data processing pipelines, visualization tools, and collaborative research features.</p>
            </div>
            <div className="project">
                <div className="project-image"><img src={mock06} className="zoom" alt="thumbnail" width="100%"/></div>
                <div className="project-title"><h2>Software Architecture Documentation Tool</h2></div>
                <p>Interactive tool for documenting and visualizing software architecture. Built with modern web technologies to help teams maintain clear architectural documentation and design decisions.</p>
            </div>
        </div>
    </div>
    );
}

export default Project;