
import {
  ShoppingBag,
  HeartPulse,
  ChartNoAxesCombined,
  ArrowUpRight,
  Layers3,
} from "lucide-react";

import "./Projects.css";

const projects = [
  {
    number: "01",
    title: "Royal Jewels",
    category: "JEWELLERY E-COMMERCE",
    description:
      "A jewellery shop management application for managing products, categories, customers and orders through a modern interface.",
    tech: ["React", "JavaScript","HTML","CSS", "Node.js", "Express.js", "PostgreSQL", "Prisma", "Postman"],
    icon: ShoppingBag,
    theme: "gold",
    status: "DEVELOPED PROJECT",
  },
  {
    number: "02",
    title: "Ever Smile",
    category: "DENTAL CLINIC WEBSITE",
    description:
      "A professional dental clinic website providing information about dental services, doctors and appointment booking.",
    tech: ["React", "JavaScript", "HTML", "CSS", "Node.js", "Express.js", "PostgreSQL", "Postman","Prisma"],
    icon: HeartPulse,
    theme: "blue",
    status: "DEVELOPED PROJECT",
  },
  {
    number: "03",
    title: "MarketoCRM",
    category: "MARKETING & CAMPAIGN CRM",
    description:
      "A CRM application designed to organize marketing activities, campaigns and customer-related workflows.",
    tech: ["React", "JavaScript","HTML","CSS", "Node.js", "Express.js", "PostgreSQL", "Postman","Prisma"],
    icon: ChartNoAxesCombined,
    theme: "purple",
    status: "IN PROGRESS",
  },
];

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-heading">
        <span>03 / MY DIGITAL CREATIONS</span>

        <h2>
          Projects That <span>Define Me</span>
        </h2>

        <p>
          Ideas transformed into practical digital experiences.
        </p>
      </div>

      <div className="project-stage">
        <div className="project-stage-glow"></div>

        <div className="project-orbit orbit-a"></div>
        <div className="project-orbit orbit-b"></div>

        <div className="projects-showcase">
          {projects.map((project) => {
            const ProjectIcon = project.icon;

            return (
              <article
                className={`showcase-card ${project.theme}`}
                key={project.number}
              >
                <div className="showcase-top">
                  <span>{project.number} / 03</span>
                  <ArrowUpRight size={21} />
                </div>

                <div className="showcase-visual">
                  <div className="showcase-circle"></div>
                  <div className="showcase-ring"></div>

                  <div className="showcase-icon">
                    <ProjectIcon size={65} strokeWidth={1.3} />
                  </div>

                  <div className="showcase-floating-icon">
                    <Layers3 size={22} />
                  </div>
                </div>

                <div className="showcase-content">
                  <span className="showcase-category">
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="showcase-tech">
                    {project.tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="showcase-footer">
                    <span>{project.status}</span>
                    <span className="showcase-number">
                      PROJECT {project.number}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="projects-footer">
        <span>DESIGNED WITH CREATIVITY</span>
        <span>BUILT WITH TECHNOLOGY</span>
        <span>POWERED BY CURIOSITY</span>
      </div>
    </section>
  );
}
