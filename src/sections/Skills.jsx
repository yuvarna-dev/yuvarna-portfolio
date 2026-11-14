
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles, Stars } from "@react-three/drei";
import { Code2 } from "lucide-react";
import "./Skills.css";

const skillNodes = [
  { name: "React.js", position: [-2.2, 1.4, 0], color: "#38bdf8" },
  { name: "JavaScript", position: [0, 2, 0], color: "#facc15" },
  { name: "HTML5", position: [2.2, 1.3, 0], color: "#fb923c" },
  { name: "CSS3", position: [2.5, -1, 0], color: "#60a5fa" },
  { name: "Node.js", position: [0.8, -2, 0], color: "#4ade80" },
  { name: "Express.js", position: [-1.8, -1.5, 0], color: "#c084fc" },
  { name: "PostgreSQL", position: [-3, 0, 0], color: "#38bdf8" },
  { name: "Prisma", position: [3.2, 0.2, 0], color: "#a78bfa" },
];

function SkillUniverse() {
  const universe = useRef();
  const core = useRef();

  useFrame((state, delta) => {
    if (universe.current) {
      universe.current.rotation.y += delta * 0.08;
    }

    if (core.current) {
      core.current.rotation.y += delta * 0.35;
      core.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 4]} intensity={35} color="#38bdf8" />
      <pointLight position={[3, 2, 2]} intensity={25} color="#a855f7" />

      {/* Central technology core */}
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[0.85, 2]} />
          <meshStandardMaterial
            color="#164e9b"
            emissive="#087bff"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#123d75"
            emissive="#168cff"
            emissiveIntensity={2}
            metalness={0.7}
          />
        </mesh>

        <Html center distanceFactor={7}>
          <div className="skill-core-label">
            <Code2 size={25} />
            <span>TECH</span>
          </div>
        </Html>
      </group>

      {/* Floating technology nodes */}
      <group ref={universe}>
        {skillNodes.map((skill, index) => (
          <Float
            key={skill.name}
            speed={1.5 + index * 0.15}
            floatIntensity={0.35}
          >
            <group position={skill.position}>
              <mesh>
                <icosahedronGeometry args={[0.38, 1]} />
                <meshStandardMaterial
                  color={skill.color}
                  emissive={skill.color}
                  emissiveIntensity={1.3}
                  metalness={0.7}
                  roughness={0.2}
                  wireframe
                />
              </mesh>

              <mesh>
                <sphereGeometry args={[0.19, 24, 24]} />
                <meshStandardMaterial
                  color={skill.color}
                  emissive={skill.color}
                  emissiveIntensity={2}
                />
              </mesh>

              <Html center distanceFactor={7}>
                <div className="skill-node-label">
                  {skill.name}
                </div>
              </Html>
            </group>
          </Float>
        ))}
      </group>

      <Sparkles
        count={120}
        scale={10}
        size={2}
        speed={0.5}
        color="#65caff"
      />

      <Stars
        radius={30}
        depth={20}
        count={500}
        factor={2}
        fade
      />
    </>
  );
}

const otherSkills = [
  "Git",
  "GitHub",
  "Postman",
  "Python (Basic)",
  "REST APIs",
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-heading">
        <span>02 / MY TECHNOLOGY UNIVERSE</span>
        <h2>
          My Technical <span>Universe</span>
        </h2>
        <p>
          Exploring technologies and building meaningful digital experiences.
        </p>
      </div>

      <div className="skills-universe">
        <Canvas
          camera={{ position: [0, 0, 9], fov: 48 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <SkillUniverse />
        </Canvas>
      </div>

      <div className="skills-bottom">
        <p>ALSO EXPLORING</p>
        <div className="other-skills">
          {otherSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
