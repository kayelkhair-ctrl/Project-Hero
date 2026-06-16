import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  IcosahedronGeometry,
  ShaderMaterial,
  Mesh,
  Vector2,
  Clock,
  Color,
} from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lerp, prefersReducedMotion, isTouch } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Shape ids morphed between (each sandwiched by the blob):
//   1 sphere · 2 cube · 3 gem/pyramid · 4 app slab · 5 website plane
const SEQUENCE = [1, 2, 3, 4, 5];

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  uniform float uMorph;
  uniform float uShape;
  uniform vec2  uMouse;
  varying vec3  vViewPos;
  varying float vD;

  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  float fbm(vec3 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<3;i++){ v += a*snoise(p); p *= 2.1; a *= 0.5; }
    return v;
  }
  float disp(vec3 pos){
    float t = uTime * 0.22;
    float warp = snoise(pos*0.85 + t);
    return fbm(pos*1.1 + warp*0.6 + t);
  }

  vec3 cubeMap(vec3 d){
    float m = max(abs(d.x), max(abs(d.y), abs(d.z)));
    return d / m;
  }

  vec3 shapePos(vec3 dir){
    float R = 1.3;
    if (uShape < 1.5) return dir * R;                                   // sphere
    if (uShape < 2.5) return cubeMap(dir) * R * 0.82;                   // cube
    if (uShape < 3.5) return dir / (abs(dir.x)+abs(dir.y)+abs(dir.z)) * R * 1.3; // gem
    if (uShape < 4.5) return cubeMap(dir) * vec3(0.5, 0.92, 0.16) * R;  // app slab (phone)
    return cubeMap(dir) * vec3(1.25, 0.8, 0.12) * R;                    // website plane
  }

  void main(){
    vec3 dir = normalize(position);
    float d = disp(position);
    float amt = uDistort * (0.55 + 0.45 * length(uMouse));
    vec3 blobP = position + dir * d * amt;
    vec3 shapeP = shapePos(dir);
    vec3 p = mix(blobP, shapeP, uMorph);

    vD = d;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

// Premium glass: nearly-transparent body, sharp specular highlights, iridescent
// Fresnel rim (replaces the old dark-edge look), and face-normals for crisp flat forms.
const fragment = /* glsl */ `
  precision highp float;
  uniform vec3  uAccent;
  uniform float uTime;
  uniform float uFrost;
  varying vec3  vViewPos;
  varying float vD;

  vec3 palette(float t){
    return 0.5 + 0.5*cos(6.2831*(vec3(0.0,0.33,0.67)+t));
  }

  void main(){
    vec3 V = normalize(-vViewPos);
    vec3 N = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
    if (dot(N, V) < 0.0) N = -N;
    vec3 R = reflect(-V, N);

    float NdotV = max(dot(N, V), 0.0);
    // Power 5 = tight, crisp glass Fresnel (vs old power 3 which was wide and soft)
    float fres = pow(1.0 - NdotV, 5.0);

    // Environment: warm cream top (matches page bg), bright white below
    float up = R.y * 0.5 + 0.5;
    vec3 env = mix(vec3(0.91, 0.89, 0.85), vec3(1.0, 1.0, 1.0), smoothstep(0.15, 0.95, up));

    // Three-light setup: key (top-right), fill (bottom-left), backlight rim
    vec3 L1 = normalize(vec3(0.55, 0.85, 0.5));
    vec3 L2 = normalize(vec3(-0.45, -0.15, 0.75));
    vec3 L3 = normalize(vec3(0.0, 0.5, -0.85));
    // Very high shininess = sharp glass highlight
    float shin   = mix(320.0, 50.0, uFrost);
    float spec1  = pow(max(dot(R, L1), 0.0), shin);
    float spec2  = 0.30 * pow(max(dot(R, L2), 0.0), shin * 0.55);
    float spec3  = 0.55 * pow(max(dot(R, -L3), 0.0), shin * 0.28);
    float spec   = spec1 + spec2 + spec3;

    // Iridescent prismatic rim — replaces old dark-edge tint
    vec3 prism = palette(fres * 0.55 + vD * 0.25 + uTime * 0.012);

    // Body: env reflection + gentle milk frost
    vec3 milk = vec3(0.96, 0.97, 1.0);
    vec3 col  = mix(env, milk, uFrost * 0.38);

    // Diffuse shading preserves form on flat faces (cube/slab/gem)
    float diff = dot(N, L1) * 0.5 + 0.5;
    col *= 0.78 + diff * 0.35;

    // Iridescent colour bleeds in on the rim
    col = mix(col, prism * 1.3, fres * 0.42);
    // Accent-blue tint concentrates on the outermost edge
    col = mix(col, uAccent * 1.8, fres * fres * 0.18);
    // Sharp, bright specular (glass reflects hard)
    col += spec * (2.4 - uFrost * 0.5);

    // Alpha: near-transparent body, strong glass rim + highlights
    float alpha = clamp(
      mix(0.05, 0.38, uFrost) + fres * 0.78 + spec * 1.2,
      0.0, 1.0
    );
    gl_FragColor = vec4(col, alpha);
  }
`;

export function initHero() {
  const canvas = document.getElementById("gl") as HTMLCanvasElement | null;
  if (!canvas) return;

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 5.0;

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);

  const detail = isTouch() ? 38 : 72;
  const geometry = new IcosahedronGeometry(1.3, detail);

  const uTime = { value: 0 };
  const uDistort = { value: 0 };
  const uMouse = { value: new Vector2(0, 0) };
  const uMorph = { value: 0 };
  const uShape = { value: 1 };
  const uFrost = { value: 0.55 };

  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime,
      uDistort,
      uMouse,
      uMorph,
      uShape,
      uFrost,
      uAccent: { value: new Color("#2e5bff") },
    },
  });

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const mouse = new Vector2(0, 0);
  const mouseTarget = new Vector2(0, 0);
  let restY = 0;

  function resize() {
    const rect = canvas!.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const wide = w > 900;
    mesh.position.x = wide ? 1.85 : 1.05;
    restY = wide ? -0.1 : -0.9;
    if (uMorph.value < 0.01) mesh.position.y = restY; // don't fight an active bounce
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  if (!isTouch()) {
    window.addEventListener("pointermove", (e) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
    });
  }

  const reduced = prefersReducedMotion();
  const clock = new Clock();
  let scrollProgress = 0;

  ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      scrollProgress = self.progress;
    },
  });

  function frame() {
    const t = clock.getElapsedTime();
    mouse.x = lerp(mouse.x, mouseTarget.x, 0.05);
    mouse.y = lerp(mouse.y, mouseTarget.y, 0.05);

    uTime.value = reduced ? 0 : t;
    uMouse.value.set(mouse.x, mouse.y);

    const baseScale = (canvas!.getBoundingClientRect().width > 900 ? 0.6 : 0.62);
    mesh.scale.setScalar(baseScale * (1 + scrollProgress * 0.3));
    // Gentle drift so flat forms (phone/website slabs) stay roughly face-on
    // and legible rather than whipping edge-on.
    mesh.rotation.y = mouse.x * 0.3 + (reduced ? 0 : Math.sin(t * 0.4) * 0.35) + scrollProgress * 0.8;
    mesh.rotation.x = mouse.y * 0.22 + scrollProgress * 0.35;

    renderer.render(scene, camera);
  }
  // Only render when the tab is visible AND the hero is on-screen — protects
  // battery, CPU and INP, and stops the canvas costing anything once scrolled past.
  let tabVisible = !document.hidden;
  let onScreen = true;
  const syncLoop = () =>
    renderer.setAnimationLoop(tabVisible && onScreen ? frame : null);
  document.addEventListener("visibilitychange", () => {
    tabVisible = !document.hidden;
    syncLoop();
  });
  const heroEl = document.getElementById("hero");
  if (heroEl && "IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        syncLoop();
      },
      { threshold: 0 }
    ).observe(heroEl);
  }
  syncLoop();

  // ---- morph state machine: blob → shape → blob, advancing through SEQUENCE.
  let si = 0;
  function runCycle() {
    if (reduced) return;
    uShape.value = SEQUENCE[si];
    const isSphere = SEQUENCE[si] === 1;

    const tl = gsap.timeline({
      onComplete: () => {
        si = (si + 1) % SEQUENCE.length;
        runCycle();
      },
    });

    // form the shape
    tl.to(uMorph, { value: 1, duration: 1.0, ease: "power3.inOut" });

    if (isSphere) {
      // gravity: drop and bounce on the ground, then settle and rise back
      tl.to(mesh.position, { y: restY - 1.0, duration: 1.3, ease: "bounce.out" }, ">-0.1");
      tl.to({}, { duration: 0.25 });
      tl.to(mesh.position, { y: restY, duration: 0.7, ease: "power2.inOut" });
    } else {
      // hold the shape with a slow extra spin handled by frame()
      tl.to({}, { duration: 1.3 });
    }

    // melt back to the blob
    tl.to(uMorph, { value: 0, duration: 1.0, ease: "power3.inOut" });
    tl.to({}, { duration: 0.5 });
  }

  return {
    reveal() {
      gsap.to(uDistort, {
        value: reduced ? 0.2 : 0.65,
        duration: 1.6,
        ease: "power3.out",
      });
      if (!reduced) gsap.delayedCall(1.8, runCycle);
    },
  };
}
