
import {
  BriefcaseBusiness,
  GraduationCap,
  FileSpreadsheet,
  Rocket,
  Sparkles,
} from "lucide-react";

import "./Experience.css";

const journey = [
  {
    number: "01",
    type: "PROFESSIONAL EXPERIENCE",
    title: "Full Stack Developer Intern",
    subtitle: "Luisant Software Solutions",
    period: "Present",
    description:
      "Working as a Full Stack Developer Intern, gaining practical experience in developing web applications and working with modern frontend and backend technologies.",
    skills: ["React.js", "JavaScript", "HTML", "CSS", "Node.js"],
    icon: BriefcaseBusiness,
    theme: "cyan",
  },
  {
    number: "02",
    type: "TECHNICAL EDUCATION",
    title: "Full Stack Development",
    subtitle: "Luisant Software Solutions",
    period: "6 Months",
    description:
      "Completed a six-month full stack development course, gaining practical knowledge of frontend and backend development and modern web technologies.",
    skills: ["React.js", "Java", "HTML", "Node.js", "Express.js"],
    icon: GraduationCap,
    theme: "purple",
  },
  {
    number: "03",
    type: "PART-TIME EXPERIENCE",
    title: "Data Entry Operator",
    subtitle: "Dental Clinic",
    period: "Part-Time",
    description:
      "Handling patient details and prescription records using Microsoft Excel, maintaining organized and accurate clinic data.",
    skills: ["MS Excel", "Data Entry", "Record Management"],
    icon: FileSpreadsheet,
    theme: "cyan",
  },
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-heading">
        <span>04 / MY PROFESSIONAL JOURNEY</span>

        <h2>
          Experience & <span>Growth</span>
        </h2>

        <p>
          Every experience is another step towards becoming a better developer.
        </p>
      </div>

      <div className="journey-container">
        <div className="journey-line"></div>

        {journey.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              className={`journey-item ${index % 2 === 0 ? "left" : "right"}`}
              key={item.number}
            >
              <div className={`journey-marker ${item.theme}`}>
                <span>{item.number}</span>
              </div>

              <article className={`journey-card ${item.theme}`}>
                <div className="journey-card-top">
                  <span>{item.type}</span>
                  <Icon size={25} />
                </div>

                <div className="journey-icon">
                  <Icon size={38} strokeWidth={1.4} />
                  <Sparkles className="journey-sparkle" size={18} />
                </div>

                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>

                <span className="journey-period">
                  {item.period}
                </span>

                <p>{item.description}</p>

                <div className="journey-skills">
                  {item.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="journey-card-bottom">
                  <Icon size={16} />
                  <span>LEARNING • BUILDING • GROWING</span>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <div className="journey-ending">
        <div className="ending-icon">
          <Rocket size={28} />
        </div>

        <h3>The Journey Continues...</h3>

        <p>
          Always learning, always creating, and always moving forward.
        </p>
      </div>
    </section>
  );
}
