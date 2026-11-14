
import {
  Mail,
  Phone,
  Code2,
  Sparkles,
  ArrowUpRight,
  FileDown
} from "lucide-react";

import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">

      <div className="contact-heading">
        <span>05 / LET'S CONNECT</span>

        <h2>
          Let's Build Something <span>Great</span>
        </h2>

        <p>
          Have an opportunity or an interesting idea?
          Let's connect and create something meaningful.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <div className="contact-glow"></div>

          <div className="contact-orb">
            <Sparkles size={55} />
          </div>

          <h3>Let's Talk!</h3>

          <p>
            I'm always excited to explore new opportunities,
            collaborate on projects and grow as a developer.
          </p>

          <div className="contact-links">

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=yuvarnavellaisamy@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={19} />
              <span>yuvarnavellaisamy@gmail.com</span>
              <ArrowUpRight size={17} />
            </a>

            <a href="tel:+917639323025">
              <Phone size={19} />
              <span>+91 76393 23025</span>
              <ArrowUpRight size={17} />
            </a>

            <a
              href="https://www.linkedin.com/in/yuvarna-vellaisamy-46b245349/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-brand">in</span>
              <span>LinkedIn</span>
              <ArrowUpRight size={17} />
            </a>

            <a
              href="https://github.com/yuvarna-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 size={19} />
              <span>GitHub</span>
              <ArrowUpRight size={17} />
            </a>

          </div>
          <a
  href="/resume.pdf"
  download="Yuvarna_Vellaisamy_Resume.pdf"
  className="resume-download"
>
  <FileDown size={20} />
  Download My Resume
  <ArrowUpRight size={18} />
</a>
        </div>

      </div>

      <footer className="portfolio-footer">

        <div className="footer-logo">
          &lt;/&gt; Yuvarna<span>.</span>
        </div>

        <p>
          Designed & Developed with creativity and passion.
        </p>

        <span>
          © 2026 Yuvarna. All Rights Reserved.
        </span>

      </footer>

    </section>
  );
}
