
import {
  GraduationCap,
  MapPin,
  Code2,
  Target,
  Sparkles,
} from "lucide-react";
import "./About.css";

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-scene-label">
        <span>01 / ABOUT MY JOURNEY</span>
        <span className="scene-line"></span>
        <span>PERSONAL PROFILE</span>
      </div>

      <div className="about-container">
        <div className="about-info">
          <p className="about-eyebrow">
            <Sparkles size={15} /> BEYOND THE CODE
          </p>

          <h2>
            A little about
            <span> who I am.</span>
          </h2>

          <h3>Yuvarna Vellaisamy</h3>

          <p className="about-role">
            Computer Science Student · Full Stack Developer
          </p>

          <p className="about-description">
            I am a third-year B.Sc. Computer Science student
            at Avinashilingam University, Coimbatore.
            I love creating modern web applications and
            turning creative ideas into useful digital experiences.
          </p>

          <p className="about-description">
            I continuously explore new technologies, build
            practical projects and improve my development skills.
            My ambition is to grow as a software developer
            in the IT industry.
          </p>

          <div className="about-facts">
            <div>
              <GraduationCap />
              <span>EDUCATION</span>
              <strong>B.Sc. Computer Science</strong>
            </div>

            <div>
              <MapPin />
              <span>LOCATION</span>
              <strong>Coimbatore, India</strong>
            </div>

            <div>
              <Code2 />
              <span>INTEREST</span>
              <strong>Full Stack Development</strong>
            </div>

            <div>
              <Target />
              <span>MY GOAL</span>
              <strong>Software Developer</strong>
            </div>
          </div>
        </div>

        <div className="about-3d-visual">
          <div className="about-orbit orbit-one"></div>
          <div className="about-orbit orbit-two"></div>
          <div className="about-orbit orbit-three"></div>

          <div className="about-photo-frame">
            <div className="about-photo-inner">
              <img
                src="/images/avatar.png"
                alt="Yuvarna"
              />
            </div>
            <div className="photo-name">
              <span>✦</span> YUV​​ARNA
            </div>
          </div>

          <div className="floating-tech tech-react">
            REACT.JS
          </div>

          <div className="floating-tech tech-js">
            JAVASCRIPT
          </div>

          <div className="floating-tech tech-code">
            {"</>"}
          </div>

          <div className="about-glow"></div>
        </div>
      </div>

      <div className="about-bottom-label">
        <span>CURIOUS MIND</span>
        <span>CREATIVE THINKER</span>
        <span>FUTURE DEVELOPER</span>
      </div>
    </section>
  );
}
