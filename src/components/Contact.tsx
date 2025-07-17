import React from 'react';
import '../assets/styles/Contact.scss';

function Contact() {

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Interested in collaborating on innovative software projects? Let's connect and build something amazing together!</p>
          <div className="contact-info">
            <p><strong>Email:</strong> giannistampakis04@gmail.com</p>
            <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/giannis-tampakis-b1b378256/" target="_blank" rel="noreferrer">linkedin.com/in/giannis-tampakis-b1b378256</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/giannistbs" target="_blank" rel="noreferrer">github.com/giannistbs</a></p>
            <p><strong>Location:</strong> Athens, Greece</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;