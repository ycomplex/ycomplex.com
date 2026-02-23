/* YComplex — Shared mesh background */
function initMesh(config = {}) {
  const canvas = document.getElementById('mesh');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, nodes, mouse, dpr;

  const C = Object.assign({
    nodeCount: 60,
    connectionDistance: 220,
    nodeSpeed: 0.15,
    mouseRadius: 200,
    accentRGB: '201,168,76',
    dimRGB: '120,120,110',
  }, config);

  class Node {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * C.nodeSpeed;
      this.vy = (Math.random() - 0.5) * C.nodeSpeed;
      this.radius = Math.random() * 1.5 + 0.5;
      this.isAccent = Math.random() < 0.15;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < C.mouseRadius) {
          const force = (1 - dist / C.mouseRadius) * 0.02;
          this.vx += dx * force;
          this.vy += dy * force;
        }
      }
      this.vx *= 0.999;
      this.vy *= 0.999;
      if (this.x < -50) this.x = w + 50;
      if (this.x > w + 50) this.x = -50;
      if (this.y < -50) this.y = h + 50;
      if (this.y > h + 50) this.y = -50;
    }
    draw() {
      const rgb = this.isAccent ? C.accentRGB : C.dimRGB;
      const alpha = this.isAccent ? 0.5 : 0.2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${alpha})`;
      ctx.fill();
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = Math.max(window.innerHeight, document.body.scrollHeight);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function init() {
    mouse = { x: null, y: null };
    resize();
    nodes = Array.from({ length: C.nodeCount }, () => new Node());
  }

  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < C.connectionDistance) {
          const alpha = (1 - dist / C.connectionDistance) * 0.08;
          const isGold = nodes[i].isAccent || nodes[j].isAccent;
          const rgb = isGold ? C.accentRGB : C.dimRGB;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${rgb},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    nodes.forEach(n => n.update());
    drawConnections();
    nodes.forEach(n => n.draw());
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  init();
  animate();
}
