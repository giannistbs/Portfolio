import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="Mar 2024 – Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Software Engineer / Technical Lead</h3>
            <h4 className="vertical-timeline-element-subtitle">Netcompany - Intrasoft, Athens</h4>
            <p>
              Leading architecture and delivery across European R&D platforms with a focus on reliable, scalable services.
            </p>
            <ul>
              <li>Technical lead for iDriving EU and UniMaaS: system specs, CI/CD (Jenkins + Harbor), Kubernetes, and secure IAM with Keycloak.</li>
              <li>Built backend services: on-prem GenAI assistant (Quarkus, RAG integrations) and EOSC Notification Service.</li>
              <li>Developed reusable Workflow Management Engine (Spring Boot, Vue 3, Kafka, Airflow, Celery, ELK) for MLOps pipelines.</li>
            </ul>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="Sep 2022 – Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Bachelor in Management Science And Technology</h3>
            <h4 className="vertical-timeline-element-subtitle">Athens University of Economics and Business</h4>
            <p>
              Currently pursuing degree focusing on technology management, business analysis, and software development
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;