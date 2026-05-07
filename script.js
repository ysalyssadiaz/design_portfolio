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
document.addEventListener('DOMContentLoaded', () => {
  const starBg = document.querySelector('.star-background');
  const spacing = 250; // Match the CSS --spacing
  const starSize = 25; // Match the CSS --star-size

  // Calculate number of stars needed
  const cols = Math.ceil(window.innerWidth / spacing) + 2;
  const rows = Math.ceil(window.innerHeight / spacing) + 2;

  // Create stars
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Position with random offset for more natural look
      let x = col * spacing + (Math.random() - 0.5) * spacing * 0.6; // Random offset up to 60% of spacing
      let y = row * spacing + (Math.random() - 0.5) * spacing * 0.6;
      
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      
      starBg.appendChild(star);
    }
  }

  // Mouse interaction
  const stars = document.querySelectorAll('.star');
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    stars.forEach(star => {
      const rect = star.getBoundingClientRect();
      const starX = rect.left + rect.width / 2;
      const starY = rect.top + rect.height / 2;
      
      const deltaX = mouseX - starX;
      const deltaY = mouseY - starY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Move towards mouse if within range
      if (distance < 200) { // Increased range
        const moveX = (deltaX / distance) * 10; // Stronger movement
        const moveY = (deltaY / distance) * 10;
        star.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        star.style.transform = 'translate(0, 0)';
      }
    });
  });
});