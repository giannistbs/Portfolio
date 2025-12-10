import React, { useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss'

function Footer() {
  const [githubMenuOpen, setGithubMenuOpen] = useState<boolean>(false);
  return (
    <footer>
      <div>
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
      <p>A portfolio built by <a href="https://github.com/giannistbs" target="_blank" rel="noreferrer">Ioannis Tampakis</a></p>
    </footer>
  );
}

export default Footer;