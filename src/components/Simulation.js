import { useEffect, useRef } from 'react';
import * as p5 from 'p5';

export default function Simulation() {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      p.setup = () => {
        p.createCanvas(400, 300);
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-2, 2),
            vy: p.random(-2, 2),
          });
        }
      };
      p.draw = () => {
        p.background(255);
        p.fill(0, 0, 255);
        for (let particle of particles) {
          p.circle(particle.x, particle.y, 5);
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
        }
      };
    };
    const p5Instance = new p5(sketch, sketchRef.current);
    return () => p5Instance.remove();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Interactive Simulation: Particle Motion</h3>
      <p className="text-gray-600 mb-4">A simple simulation of particle movement.</p>
      <div ref={sketchRef} className="border border-gray-300 rounded"></div>
    </div>
  );
}
