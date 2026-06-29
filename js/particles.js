/* ==========================================
   TECHPRIX — Particle Canvas System
   ========================================== */

(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, animId;
  let particles = [];
  let mouse = { x: null, y: null };

  const CONFIG = {
    count: 90,
    maxDist: 130,
    speed: 0.4,
    size: { min: 1, max: 2.5 },
    colors: ['rgba(124,58,237,', 'rgba(6,182,212,', 'rgba(159,103,255,', 'rgba(34,211,238,'],
    mouseRepel: 100,
  };

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = rand(0, width);
      this.y = rand(0, height);
      this.vx = rand(-CONFIG.speed, CONFIG.speed);
      this.vy = rand(-CONFIG.speed, CONFIG.speed);
      this.r = rand(CONFIG.size.min, CONFIG.size.max);
      this.colorBase = CONFIG.colors[Math.floor(rand(0, CONFIG.colors.length))];
      this.opacity = rand(0.15, 0.55);
      this.baseOpacity = this.opacity;
    }
    update() {
      // Mouse interaction
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRepel) {
          const force = (CONFIG.mouseRepel - dist) / CONFIG.mouseRepel;
          this.vx += (dx / dist) * force * 0.6;
          this.vy += (dy / dist) * force * 0.6;
        }
      }
      // Velocity damping
      this.vx *= 0.99;
      this.vy *= 0.99;
      // Speed clamp
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > CONFIG.speed * 3) {
        this.vx = (this.vx / speed) * CONFIG.speed * 3;
        this.vy = (this.vy / speed) * CONFIG.speed * 3;
      }
      this.x += this.vx;
      this.y += this.vy;
      // Wrap around
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.colorBase + this.opacity + ')';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.maxDist) {
          const alpha = (1 - dist / CONFIG.maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          // Blend colors of the two particles
          const g = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          g.addColorStop(0, particles[i].colorBase + alpha + ')');
          g.addColorStop(1, particles[j].colorBase + alpha + ')');
          ctx.strokeStyle = g;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  // Mouse
  const section = canvas.parentElement;
  section.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  section.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Touch
  section.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
  }, { passive: true });

  // Init
  resize();
  initParticles();
  loop();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    initParticles();
    loop();
  });
})();
