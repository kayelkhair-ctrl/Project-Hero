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

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  uniform float uScroll;
  uniform vec2  uMouse;
  varying vec3  vNormal;
  varying vec3  vView;
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
    for(int i=0;i<2;i++){ v += a*snoise(p); p *= 2.0; a *= 0.5; }
    return v;
  }
  // Single-sample organic displacement (cheap enough for software WebGL and
  // low-end GPUs). Surface bumps are recovered in the fragment via derivatives.
  float disp(vec3 pos){
    float t = uTime * 0.22;
    float warp = snoise(pos*0.85 + t);
    return fbm(pos*1.1 + warp*0.6 + t);
  }

  void main(){
    float d = disp(position);
    float amt = uDistort * (0.55 + 0.45*length(uMouse)) + uScroll*0.35;
    vec3 pd = position + normalize(position) * d * amt;

    vD = d;
    vec4 mv = modelViewMatrix * vec4(pd, 1.0);
    vView = -mv.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

// Cheap-but-premium look: a faked studio environment (vertical softbox
// gradient) sampled by the reflected view vector, a crisp specular, an
// iridescent fresnel rim and a touch of colour from displacement.
const fragment = /* glsl */ `
  precision highp float;
  uniform vec3 uAccent;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vD;

  vec3 palette(float t){
    // smooth iridescent ramp
    return 0.55 + 0.45*cos(6.2831*(vec3(0.0,0.33,0.67)+t));
  }

  void main(){
    vec3 V = normalize(vView);

    // Cheap surface bump: perturb the normal by the screen-space gradient of
    // the displacement so the chrome reflections ripple without vertex cost.
    vec3 N = normalize(vNormal);
    vec3 dPdx = dFdx(vView);
    vec3 dPdy = dFdy(vView);
    float dHx = dFdx(vD);
    float dHy = dFdy(vD);
    vec3 bump = (dHx * cross(N, dPdy) + dHy * cross(dPdx, N));
    N = normalize(N - bump * 6.0);

    vec3 R = reflect(-V, N);

    // Faked softbox environment: bright top, mid sides, dim bottom.
    float up = R.y*0.5 + 0.5;
    vec3 env = mix(vec3(0.62), vec3(1.0), smoothstep(0.35,0.95,up));
    env = mix(env, vec3(0.50,0.54,0.62), smoothstep(0.35,0.0,up));

    // Specular hotspot from a key light.
    vec3 L = normalize(vec3(0.5, 0.8, 0.7));
    float spec = pow(max(dot(R, L), 0.0), 48.0);

    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.5);
    vec3 irid = palette(fres*0.8 + vD*0.6 + uTime*0.02);

    vec3 col = env;                          // base chrome reflection
    col = mix(col, irid, fres*0.55);         // iridescent rim
    col += spec * 1.2;                        // highlight
    col = mix(col, uAccent, fres*0.18);      // brand tint in the grazing angles

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function initHero() {
  const canvas = document.getElementById("gl") as HTMLCanvasElement | null;
  if (!canvas) return;

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 4.4;

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);

  const detail = isTouch() ? 24 : 48;
  const geometry = new IcosahedronGeometry(1.3, detail);

  const uTime = { value: 0 };
  const uDistort = { value: 0 };
  const uMouse = { value: new Vector2(0, 0) };
  const uScroll = { value: 0 };

  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      uTime,
      uDistort,
      uMouse,
      uScroll,
      uAccent: { value: new Color("#2e5bff") },
    },
  });

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const mouse = new Vector2(0, 0);
  const mouseTarget = new Vector2(0, 0);

  let baseScale = 1;
  function resize() {
    const rect = canvas!.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const wide = w > 900;
    // On phones, tuck the blob lower-right and shrink it so the headline and
    // nav stay clean; on desktop it sits to the right of the copy.
    mesh.position.x = wide ? 1.15 : 0.6;
    mesh.position.y = wide ? 0.1 : -0.85;
    baseScale = wide ? 1 : 0.72;
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
    uScroll.value = scrollProgress;

    mesh.scale.setScalar(baseScale * (1 + scrollProgress * 0.3));
    mesh.rotation.y = mouse.x * 0.5 + (reduced ? 0 : t * 0.08) + scrollProgress * 1.2;
    mesh.rotation.x = mouse.y * 0.35 + scrollProgress * 0.5;

    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(frame);

  return {
    reveal() {
      gsap.to(uDistort, {
        value: reduced ? 0.2 : 0.5,
        duration: 1.8,
        ease: "power3.out",
      });
    },
  };
}
