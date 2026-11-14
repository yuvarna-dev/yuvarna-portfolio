import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Home.css";

function PortalScene() {
 
  const outerRing = useRef();
  const innerRing = useRef();
    const portal = useRef();
  const { camera } = useThree();

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    timeline.to(
      portal.current.rotation,
      {
        y: 0.55,
        z: Math.PI * 0.7,
        ease: "none",
      },
      0
    );

    timeline.to(
      portal.current.scale,
      {
        x: 1.35,
        y: 1.35,
        z: 1.35,
        ease: "none",
      },
      0
    );

    timeline.to(
      camera.position,
      {
        z: 5.2,
        x: 0.5,
        ease: "none",
      },
      0
    );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [camera]);

  useFrame((state, delta) => {
    if (outerRing.current) {
      outerRing.current.rotation.z += delta * 0.18;
    }

    if (innerRing.current) {
      innerRing.current.rotation.z -= delta * 0.28;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[2, 3, 4]} intensity={35} color="#168cff" />
      <pointLight position={[-3, -2, 2]} intensity={25} color="#a855f7" />

      {/* Main glowing portal */}
      <group ref={portal} position={[1.4, 0, 0]}>
        <mesh ref={outerRing}>
          <torusGeometry args={[1.9, 0.055, 20, 120]} />
          <meshStandardMaterial
            color="#168cff"
            emissive="#087bff"
            emissiveIntensity={3}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        <mesh ref={innerRing} rotation={[0, 0, 0]}>
          <torusGeometry args={[1.65, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#bd72ff"
            emissive="#a855f7"
            emissiveIntensity={3}
          />
        </mesh>

        <mesh>
          <circleGeometry args={[1.58, 80]} />
          <meshBasicMaterial
            color="#071735"
            transparent
            opacity={0.65}
          />
        </mesh>

        <Float speed={2} floatIntensity={0.5}>
          <mesh position={[2.2, 1.2, 0.5]}>
            <icosahedronGeometry args={[0.25, 0]} />
            <meshStandardMaterial
              color="#38bdf8"
              metalness={0.8}
              roughness={0.2}
              emissive="#168cff"
            />
          </mesh>
        </Float>

        <Float speed={3} floatIntensity={0.7}>
          <mesh position={[-2, -1.4, 0.5]}>
            <octahedronGeometry args={[0.3]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#7c3aed"
            />
          </mesh>
        </Float>
      </group>

      <Sparkles
        count={180}
        scale={12}
        size={2.5}
        speed={0.5}
        color="#8bd5ff"
      />

      <Stars
        radius={80}
        depth={40}
        count={1200}
        factor={3}
        fade
        speed={0.5}
      />
    </>
  );
}

export default function Home() {
  const [avatarSpeaking, setAvatarSpeaking] = useState(false);

useEffect(() => {
  const handleSpeaking = (event) => {
    setAvatarSpeaking(event.detail.speaking);
  };

  window.addEventListener("avatar-speaking", handleSpeaking);

  return () => {
    window.removeEventListener("avatar-speaking", handleSpeaking);
  };
}, []);
  return (
    <section className="home" id="home">
      <div className="home-canvas">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <PortalScene />
        </Canvas>
      </div>

      <div className="home-content">
        <p className="home-tag">
          ✦ WELCOME TO MY DIGITAL WORLD
        </p>

        <h1>
          I'm <span>Yuvarna</span>
        </h1>

        <h2>Full Stack Developer</h2>

        <p className="home-description">
          I transform creative ideas into beautiful,
          interactive and meaningful digital experiences.
          Welcome to my world of technology and creativity.
        </p>

        <div className="home-buttons">
          <a href="#projects" className="primary-btn">
            Explore My World ↗
          </a>

          <a href="#contact" className="secondary-btn">
            Let's Connect
          </a>
        </div>

        <div className="scroll-down">
          <span className="mouse-icon"></span>
          <p>Scroll to enter my world</p>
        </div>
      </div>

      <div className={`home-profile ${avatarSpeaking ? "speaking" : ""}`}>
        <img src="/images/avatar.png" alt="Yuvarna - Full Stack Developer" />
      </div>

      <div className="home-glow"></div>
    </section>
  );
}
