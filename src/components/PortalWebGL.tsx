import { useEffect, useRef, useState } from 'react';
import { Mesh, Program, Renderer, Transform, Triangle } from 'ogl';

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uReveal;
uniform vec2 uResolution;

void main() {
  vec2 uv = vUv;
  float r = clamp(uReveal, 0.001, 1.0);
  float t = uTime * 0.3;
  float aspect = max(uResolution.x / max(uResolution.y, 1.0), 0.5);
  vec2 center = vec2(0.5);
  float iris = smoothstep(0.0, 1.0, r * 1.15 - length(uv - center) * 0.55);
  float morph = 1.0 - r;
  vec2 warp = morph * 0.18 * vec2(
    sin(uv.y * 14.0 + t * 2.2) * cos(uv.x * 9.0 - t * 1.4),
    cos(uv.x * 12.0 - t * 1.8) * sin(uv.y * 8.0 + t * 1.1)
  );
  vec2 uvW = uv + warp * (1.0 - iris);
  vec2 p = (uvW - 0.5) * vec2(aspect, 1.0) * 2.0;
  float w1 = sin(p.x * 3.8 + t) * cos(p.y * 2.9 - t * 0.7);
  float w2 = sin((p.x + p.y * 0.6) * 4.5 + t * 0.85);
  float w3 = sin(length(p) * 3.2 - t * 1.1);
  float n = 0.5 + 0.5 * (w1 * 0.45 + w2 * 0.35 + w3 * 0.2);
  vec3 deep = vec3(0.02, 0.05, 0.14);
  vec3 teal = vec3(0.06, 0.48, 0.52);
  vec3 gold = vec3(0.52, 0.4, 0.1);
  vec3 col = mix(deep, teal, n);
  col = mix(col, gold, smoothstep(0.25, 0.92, n) * 0.32);
  float vignette = 1.0 - length(uv - 0.5) * 1.08;
  vignette = clamp(vignette, 0.0, 1.0);
  float alpha = 0.36 * vignette * iris * (0.25 + 0.75 * r);
  gl_FragColor = vec4(col, alpha);
}
`;

/**
 * Full-bleed WebGL layer inside the intro glass portal (ogl).
 * position:absolute; does not affect flex layout. Skipped when prefers-reduced-motion.
 */
const REVEAL_MS = 1100;

function easeOutCubic(x: number): number {
  return 1 - (1 - x) ** 3;
}

export function PortalWebGL({
  className,
  entranceActive = false,
}: {
  className?: string;
  /** Drives iris + warp settle (0→1) */
  entranceActive?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const revealStartRef = useRef<number | null>(null);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    setAllowMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (entranceActive) {
      revealStartRef.current = performance.now();
    } else {
      revealStartRef.current = null;
    }
  }, [entranceActive]);

  useEffect(() => {
    if (!allowMotion || !wrapRef.current) return;

    const wrap = wrapRef.current;
    const renderer = new Renderer({
      alpha: true,
      depth: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      premultipliedAlpha: false,
    });
    const { gl } = renderer;
    gl.canvas.style.display = 'block';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    wrap.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0 },
        uResolution: { value: new Float32Array([1, 1]) },
      },
    });

    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program,
      frustumCulled: false,
    });

    const scene = new Transform();
    mesh.setParent(scene);

    let raf = 0;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value[0] = w;
      program.uniforms.uResolution.value[1] = h;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const loop = (tFrame: number) => {
      program.uniforms.uTime.value = tFrame * 0.001;
      const start = revealStartRef.current;
      let reveal = 0;
      if (start != null) {
        reveal = easeOutCubic(Math.min(1, (tFrame - start) / REVEAL_MS));
      }
      program.uniforms.uReveal.value = reveal;
      renderer.render({ scene });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (gl.canvas.parentNode === wrap) {
        wrap.removeChild(gl.canvas);
      }
    };
  }, [allowMotion]);

  if (!allowMotion) {
    return null;
  }

  return <div ref={wrapRef} className={className} aria-hidden />;
}
