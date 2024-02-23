/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import { BallCollider, Physics, RigidBody, CylinderCollider } from "@react-three/rapier"

const color = new THREE.Color()

export default function Model({ scroll, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/model.glb")
  const { actions } = useAnimations(animations, group)
  const [hovered, set] = useState()
  const extras = { receiveShadow: true, castShadow: true, "material-envMapIntensity": 0.2 }
  useEffect(() => void (actions["CameraAction.005"].play().paused = true), [])
  useEffect(() => {
    if (hovered) group.current.getObjectByName(hovered).material.color.set("white")
    document.body.style.cursor = hovered ? "pointer" : "auto"
  }, [hovered])
  useFrame((state) => {
    actions["CameraAction.005"].time = THREE.MathUtils.lerp(actions["CameraAction.005"].time, actions["CameraAction.005"].getClip().duration * scroll.current, 0.05)
    group.current.children[0].children.forEach((child, index) => {
      child.material.color.lerp(color.set(hovered === child.name ? "tomato" : "#202020"), hovered ? 0.1 : 0.05)
      const et = state.clock.elapsedTime
      child.position.y = Math.sin((et + index * 2000) / 2) * 1
      child.rotation.x = Math.sin((et + index * 2000) / 3) / 10
      child.rotation.y = Math.cos((et + index * 2000) / 2) / 10
      child.rotation.z = Math.sin((et + index * 2000) / 3) / 10
    })
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        onPointerOver={(e) => (e.stopPropagation(), set(e.object.name))}
        onPointerOut={(e) => (e.stopPropagation(), set(null))}
        position={[0.06, 4.04, 0.35]}
        scale={[0.25, 0.25, 0.25]}>
        <mesh name="Headphones" geometry={nodes.Headphones.geometry} material={materials.M_Headphone} {...extras} />
        <mesh name="Notebook" geometry={nodes.Notebook.geometry} material={materials.M_Notebook} {...extras} />
        <mesh name="Rocket003" geometry={nodes.Rocket003.geometry} material={materials.M_Rocket} {...extras} />
        <mesh name="Roundcube001" geometry={nodes.Roundcube001.geometry} material={materials.M_Roundcube} {...extras} />
        <mesh name="Table" geometry={nodes.Table.geometry} material={materials.M_Table} {...extras} />
        <mesh name="VR_Headset" geometry={nodes.VR_Headset.geometry} material={materials.M_Headset} {...extras} />
        <mesh name="Zeppelin" geometry={nodes.Zeppelin.geometry} material={materials.M_Zeppelin} v />
      </group>
      <group name="Camera" position={[-1.78, 2.04, 23.58]} rotation={[1.62, 0.01, 0.11]}>
        <PerspectiveCamera makeDefault far={100} near={0.1} fov={28} rotation={[-Math.PI / 2, 0, 0]}>
          <directionalLight
            castShadow
            position={[10, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={2}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
      </group>
      <Physics gravity={[-2, 10, 0]}>
        {clumps.map((props, i) => <Clump key={i} {...props} />)}
        {baubles.map((props, i) => <Bauble key={i} {...props} />)}
      </Physics>
      <EffectComposer disableNormalPass>
        <N8AO color="red" aoRadius={2} intensity={1} />
      </EffectComposer>
    </group>
  )
}

useGLTF.preload("/model.glb")


THREE.ColorManagement.legacyMode = false
const baubleMaterial = new THREE.MeshLambertMaterial({ color: "#c0a0a0", emissive: "pink" })
const capMaterial = new THREE.MeshStandardMaterial({ metalness: 0.75, roughness: 0.15, color: "#8a492f", emissive: "#600000", envMapIntensity: 20 })
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)
const baubles = [...Array(45)].map(() => ({ scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)] }))
const clumps = [...Array(5)].map(() => ({ scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)] }))

function Clump({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread }) {
  const { nodes } = useGLTF("/cap.glb")
  const texture = useTexture("/cross.jpg");
  const api = useRef()
  // useFrame((state, delta) => {
  //   delta = Math.min(0.1, delta)
  //   api.current.applyImpulse(
  //     vec
  //       .copy(api.current.translation())
  //       .normalize()
  //       .multiply({ x: -50 * delta * scale, y: -150 * delta * scale, z: -50 * delta * scale }),
  //   )
  // })
  return (
    <RigidBody linearDamping={0.65} angularDamping={0.1} friction={0.2} position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders={false} dispose={null}>
      <BallCollider args={[scale]} />
      <CylinderCollider rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.2 * scale]} args={[0.15 * scale, 0.275 * scale]} />
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry} material-map={texture} />
      <mesh castShadow scale={2.5 * scale} position={[0, 0, -1.8 * scale]} geometry={nodes.Mesh_1.geometry} material={capMaterial} />
    </RigidBody>
  )
}


function Bauble({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread }) {
  const { nodes } = useGLTF("/cap.glb")
  const api = useRef()
  // useFrame((state, delta) => {
    // delta = Math.min(0.1, delta)
    // api.current.applyImpulse(
    //   vec
    //     .copy(api.current.translation())
    //     .normalize()
    //     .multiply({ x: -50 * delta * scale, y: -150 * delta * scale, z: -50 * delta * scale }),
    // )
  // })
  return (
    <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders={false} dispose={null}>
      <BallCollider args={[scale]} />
      <CylinderCollider rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.2 * scale]} args={[0.15 * scale, 0.275 * scale]} />
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry} material={baubleMaterial} />
      <mesh castShadow scale={2.5 * scale} position={[0, 0, -1.8 * scale]} geometry={nodes.Mesh_1.geometry} material={capMaterial} />
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    vec.lerp({ x: (mouse.x * viewport.width) / 2, y: (mouse.y * viewport.height) / 2, z: 0 }, 0.2)
    ref.current?.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  )
}