import React, { useEffect, useRef, useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import profilePhoto from '../assets/images/your-photo.png';

function Main() {

  const [githubMenuOpenDesktop, setGithubMenuOpenDesktop] = useState<boolean>(false);
  const [githubMenuOpenMobile, setGithubMenuOpenMobile] = useState<boolean>(false);
  const desktopPopoverRef = useRef<HTMLDivElement | null>(null);
  const mobilePopoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (githubMenuOpenDesktop && desktopPopoverRef.current && target && !desktopPopoverRef.current.contains(target)) {
        setGithubMenuOpenDesktop(false);
      }
      if (githubMenuOpenMobile && mobilePopoverRef.current && target && !mobilePopoverRef.current.contains(target)) {
        setGithubMenuOpenMobile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [githubMenuOpenDesktop, githubMenuOpenMobile]);

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profilePhoto} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <div
              ref={desktopPopoverRef}
              className={`social-popover ${githubMenuOpenDesktop ? 'open' : ''}`}
              onClick={() => {
                setGithubMenuOpenDesktop((v) => !v);
                setGithubMenuOpenMobile(false);
              }}
            >
              <div className="social-trigger" title="GitHub profiles" aria-label="GitHub profiles" aria-expanded={githubMenuOpenDesktop}>
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
          <p>R&D Software & Platform Engineer</p>

          <div className="mobile_social_icons">
            <div
              ref={mobilePopoverRef}
              className={`social-popover ${githubMenuOpenMobile ? 'open' : ''}`}
              onClick={() => {
                setGithubMenuOpenMobile((v) => !v);
                setGithubMenuOpenDesktop(false);
              }}
            >
              <div className="social-trigger" title="GitHub profiles" aria-label="GitHub profiles" aria-expanded={githubMenuOpenMobile}>
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