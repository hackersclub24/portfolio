import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import "./styles/TechStack.css";

const textureLoader = new THREE.TextureLoader();
const fastApiUrl = "/images/fastapi.png";
const pgsqlUrl = "/images/pgsql.png";
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];
const fastApiTexture = textureLoader.load(fastApiUrl);
const pgsqlTexture = textureLoader.load(pgsqlUrl);
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const workSection = document.getElementById("work");
    if (!workSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "200px 0px",
      }
    );

    observer.observe(workSection);

    return () => {
      observer.disconnect();
    };
  }, []);
  const materials = useMemo(() => {
    return [fastApiTexture, pgsqlTexture, ...textures].map((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;

      return new THREE.MeshPhysicalMaterial({
        map: texture,
        color: "#ffffff",
        emissive: "#f4ecff",
        emissiveMap: texture,
        emissiveIntensity: 0.32,
        transparent: true,
        opacity: 0.98,
        metalness: 0.04,
        roughness: 0.32,
        clearcoat: 0.48,
        clearcoatRoughness: 0.14,
        envMapIntensity: 1.1,
      });
    });
  }, []);
  const sphereProps = useMemo(
    () => {
      const renderedSpheres = spheres.slice(0, 18);
      return renderedSpheres.map((props, index) => {
        const textureIndex = index % materials.length;

        return {
          ...props,
          material: materials[textureIndex],
        };
      });
    },
    [materials]
  );

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      {isVisible ? (
        <Canvas
          shadows={false}
          frameloop={isActive ? "always" : "demand"}
          dpr={[1, 1.25]}
          gl={{ alpha: true, stencil: false, depth: false, antialias: false, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.2)}
          className="tech-canvas"
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[0, 5, -4]} intensity={1.4} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {sphereProps.slice(0, 18).map((props, i) => (
              <SphereGeo key={i} {...props} isActive={isActive} />
            ))}
          </Physics>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.25}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false} multisampling={0}>
            <N8AO color="#0f002c" aoRadius={1.5} intensity={0.85} />
          </EffectComposer>
        </Canvas>
      ) : (
        <div className="tech-canvas tech-canvas-placeholder" aria-hidden="true" />
      )}
    </div>
  );
};

export default TechStack;
