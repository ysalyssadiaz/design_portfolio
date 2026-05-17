// function toggleMenu() {
//   document.getElementById("menu").classList.toggle("open");
// }

// const bg = document.querySelector('.star-background');

// window.addEventListener('mousemove', (e) => {
//   // Calculate movement (divided by 50 to keep it subtle)
//   const moveX = e.clientX / 50;
//   const moveY = e.clientY / 50;

//   bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
// });

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const starBg = document.querySelector(".star-background");
  if (!starBg) return;

  const spacing = 250;
  const starSize = 120; // matches --star-size in style.css
  const radius = starSize / 2;
  const influenceRadius = 700;
  const maxNudge = 120; // px toward cursor at full strength
  const followBlend = 0.045;
  const returnBlend = 0.04;

  const cols = Math.ceil(window.innerWidth / spacing) + 2;
  const rows = Math.ceil(window.innerHeight / spacing) + 2;

  const stars = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const star = document.createElement("div");
      star.className = "star";

      const homeX = col * spacing + (Math.random() - 0.5) * spacing * 0.4;
      const homeY = row * spacing + (Math.random() - 0.5) * spacing * 0.4;

      star.style.left = `${homeX}px`;
      star.style.top = `${homeY}px`;

      starBg.appendChild(star);

      stars.push({
        el: star,
        homeX,
        homeY,
        ox: 0,
        oy: 0,
      });
    }
  }

  let mouseX = -9999;
  let mouseY = -9999;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    stars.forEach((star) => {
      const cx = star.homeX + radius;
      const cy = star.homeY + radius;
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.hypot(dx, dy);

      let targetOx = 0;
      let targetOy = 0;
      const inZone = dist > 0 && dist < influenceRadius;
      if (inZone) {
        const t = 1 - dist / influenceRadius;
        const mag = maxNudge * t * t * t;
        targetOx = (dx / dist) * mag;
        targetOy = (dy / dist) * mag;
      }

      const blend = inZone ? followBlend : returnBlend;
      star.ox += (targetOx - star.ox) * blend;
      star.oy += (targetOy - star.oy) * blend;

      if (Math.abs(star.ox) < 0.08) star.ox = 0;
      if (Math.abs(star.oy) < 0.08) star.oy = 0;

      star.el.style.left = `${star.homeX + star.ox}px`;
      star.el.style.top = `${star.homeY + star.oy}px`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
