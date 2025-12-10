import React, { useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import profilePhoto from '../assets/images/your-photo.png';

function Main() {

  const [githubMenuOpen, setGithubMenuOpen] = useState<boolean>(false);

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profilePhoto} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <div
              className={`social-popover ${githubMenuOpen ? 'open' : ''}`}
              onClick={() => setGithubMenuOpen((v) => !v)}
            >
              <div className="social-trigger" title="GitHub profiles" aria-label="GitHub profiles">
                <GitHubIcon/>
              </div>
              <div className="social-menu">
                <a href="https://github.com/giannistbs" target="_blank" rel="noreferrer">Personal</a>
                <a href="https://github.com/giannistbsnet" target="_blank" rel="noreferrer">Professional</a>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/giannis-tampakis-b1b378256/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Ioannis Tampakis</h1>
          <p>R&D Software Engineer</p>

          <div className="mobile_social_icons">
            <div
              className={`social-popover ${githubMenuOpen ? 'open' : ''}`}
              onClick={() => setGithubMenuOpen((v) => !v)}
            >
              <div className="social-trigger" title="GitHub profiles" aria-label="GitHub profiles">
                <GitHubIcon/>
              </div>
              <div className="social-menu">
                <a href="https://github.com/giannistbs" target="_blank" rel="noreferrer">Personal</a>
                <a href="https://github.com/giannistbsnet" target="_blank" rel="noreferrer">Professional</a>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/giannis-tampakis-b1b378256/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;