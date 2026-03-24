const dog = document.getElementById('dog');
const scoreElement = document.getElementById('score');
let score = 0;
let danceTimer = null;

const emojis = ['✨', '💖', '🎵', '⭐', '🦴', '🐾'];

const dances = ['dance-wave', 'dance-spin', 'dance-wiggle'];
let currentDance = '';

dog.addEventListener('click', (e) => {
  // Update the score
  score += 10;
  scoreElement.textContent = score;

  // Add click scale effect dynamically to the score
  scoreElement.style.transform = 'scale(1.4)';
  setTimeout(() => scoreElement.style.transform = 'scale(1)', 150);

  // Clear existing dance if any
  if (currentDance) {
    dog.classList.remove(currentDance);
  }

  // Pick a random dance!
  currentDance = dances[Math.floor(Math.random() * dances.length)];
  
  // Trigger SVG CSS animation
  dog.classList.add(currentDance);

  // Create Particles
  createParticles(e.clientX, e.clientY);

  // Clear previous timer if clicked again while already dancing
  if (danceTimer) {
    clearTimeout(danceTimer);
  }

  // Set timeout to restore original state after 3 seconds
  danceTimer = setTimeout(() => {
    dog.classList.remove(currentDance);
    currentDance = '';
    danceTimer = null;
  }, 3000);
});

function createParticles(x, y) {
  // Generate 4-7 particles per click for a lush effect
  const particleCount = Math.floor(Math.random() * 4) + 4;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Pick random emoji
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Random position offset around cursor
    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = (Math.random() - 0.5) * 80;
    
    particle.style.left = `${x + offsetX}px`;
    particle.style.top = `${y + offsetY}px`;
    
    // Random float duration between 0.8s and 1.3s
    const duration = 0.8 + Math.random() * 0.5;
    particle.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(particle);
    
    // Cleanup
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }
}
