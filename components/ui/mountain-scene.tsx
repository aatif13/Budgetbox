"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

const Terrain = () => {
    const meshRef = useRef<THREE.Mesh>(null)

    // Generate terrain data
    const { geometry } = useMemo(() => {
        const geo = new THREE.PlaneGeometry(30, 30, 64, 64)
        const pos = geo.attributes.position
        const pa = pos.array

        // Simple height map generation using sine waves
        for (let i = 0; i < pos.count; i++) {
            const x = pa[i * 3]
            const y = pa[i * 3 + 1]
            // Combine frequencies for "mountain" look
            const z = Math.sin(x * 0.3) * Math.cos(y * 0.3) * 2
                + Math.sin(x * 1) * Math.cos(y * 1) * 0.5
                + Math.max(0, Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 3 // Peaks

            pa[i * 3 + 2] = z
        }

        geo.computeVertexNormals()
        return { geometry: geo }
    }, [])

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Gentle rotation
            meshRef.current.rotation.z += 0.001
        }
    })

    return (
        <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
                color="#0ea5e9" // Sky blue / Cyan
                wireframe
                emissive="#0ea5e9"
                emissiveIntensity={0.5}
                roughness={0.1}
                metalness={0.9}
            />
        </mesh>
    )
}

const FloatingGrid = () => {
    return (
        <gridHelper args={[50, 50, 0xffffff, 0xffffff]} position={[0, -2, 0]} rotation={[0, 0, 0]}>
            <meshBasicMaterial attach="material" color="#333" transparent opacity={0.2} />
        </gridHelper>
    )
}

export function MountainScene({ className }: { className?: string }) {
    return (
        <div className={`relative w-full h-full min-h-[400px] overflow-hidden rounded-xl border border-white/10 bg-black ${className}`}>

            {/* Overlay Gradients for "Glass" feel */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-transparent opacity-50" />

            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 5, 12]} fov={50} />
                <color attach="background" args={['#020617']} /> {/* Slate 950 */}

                <fog attach="fog" args={['#020617', 5, 25]} />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
                <pointLight position={[-10, 5, -10]} intensity={1} color="#c084fc" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Terrain />
                {/* <FloatingGrid /> */}

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2 - 0.1}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>

            <div className="absolute bottom-4 left-4 z-20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-white/50 font-mono tracking-wider">SYSTEM ACTIVE</span>
                </div>
            </div>
        </div>
    )
}

export default MountainScene
