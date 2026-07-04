/* eslint-disable react-hooks/immutability -- FieldMesh mutates the memoized
   `uniforms` object imperatively inside useEffect/useFrame. That is the
   standard react-three-fiber pattern (docs.pmnd.rs: "mutate, don't
   re-render") for driving a ShaderMaterial every frame without allocating
   or re-rendering; it is not the unsafe-mutation case this new rule targets.
   Code below is pasted verbatim from the plan's Appendix A — do not rewrite
   to satisfy the linter. */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import '../styles/signal-field.css'

const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uProgress;
varying vec2 vUv;
varying float vElev;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vUv = uv;
  float t = uTime * 0.12;
  float n = fbm(uv * 3.0 + vec2(t, -t * 0.6));
  float d = distance(uv, uMouse);
  float ripple = smoothstep(0.35, 0.0, d) * 0.35 * sin(d * 28.0 - uTime * 2.4);
  float amp = mix(0.22, 0.03, uProgress);
  vec3 pos = position;
  pos.z += (n + ripple) * amp;
  vElev = n + ripple * 0.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = /* glsl */ `
precision highp float;
uniform float uTime;
uniform float uProgress;
varying vec2 vUv;
varying float vElev;

const vec3 C1 = vec3(0.106, 0.055, 0.329); /* #1B0E54 */
const vec3 C2 = vec3(0.424, 0.294, 1.000); /* #6C4BFF */
const vec3 C3 = vec3(1.000, 0.361, 0.200); /* #FF5C33 */
const vec3 C4 = vec3(1.000, 0.769, 0.420); /* #FFC46B */

vec3 ramp(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 col = mix(C1, C2, smoothstep(0.00, 0.38, t));
  col = mix(col, C3, smoothstep(0.38, 0.72, t));
  col = mix(col, C4, smoothstep(0.72, 1.00, t));
  return col;
}

void main() {
  float t = vElev * 0.55 + 0.5;
  t += 0.10 * sin(uTime * 0.2 + vUv.x * 4.0);
  vec3 col = ramp(t);
  float vig = smoothstep(1.05, 0.30, distance(vUv, vec2(0.5, 0.55)));
  col *= mix(0.22, 1.0, vig);
  col *= (1.0 - uProgress * 0.85);
  float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 128.0;
  col += dither;
  gl_FragColor = vec4(col, 1.0);
}
`

function FieldMesh({ segments }) {
  const { viewport } = useThree()
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5))

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uProgress: { value: 0 },
    }),
    []
  )

  useEffect(() => {
    const onMove = (e) => {
      targetMouse.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    }
    const onScroll = () => {
      uniforms.uProgress.value = Math.min(1, window.scrollY / window.innerHeight)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [uniforms])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uMouse.value.lerp(targetMouse.current, 0.05)
  })

  return (
    <mesh scale={[viewport.width * 1.35, viewport.height * 1.35, 1]} rotation={[-0.35, 0, 0]} position={[0, -0.12, 0]}>
      <planeGeometry args={[1, 1, segments, segments]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  )
}

export default function SignalField() {
  const wrapRef = useRef(null)
  const [inView, setInView] = useState(true)
  const [visible, setVisible] = useState(!document.hidden)
  const segments = window.innerWidth < 900 ? 90 : 160

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 })
    if (wrapRef.current) io.observe(wrapRef.current)
    const onVis = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const active = inView && visible

  return (
    <div ref={wrapRef} className="signal-field" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        camera={{ position: [0, 0, 1.4], fov: 45 }}
      >
        <FieldMesh segments={segments} />
      </Canvas>
    </div>
  )
}
