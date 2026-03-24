const dog = document.getElementById('dog');
const modal = document.getElementById('revealModal');
const winnerNameEl = document.getElementById('winnerName');
const closeBtn = document.getElementById('closeBtn');

let danceTimer = null;
let rainInterval = null;

const scores = {
  '민주': 0,
  '지우': 0,
  '나라': 0,
  '수현': 0
};

const moneyEmojis = ['💸', '💰', '💵', '🪙', '💎'];
const candidates = ['민주', '지우', '나라', '수현'];
const dances = ['dance-wave', 'dance-spin', 'dance-wiggle'];
let currentDance = '';

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

dog.addEventListener('click', () => {
  // If dog is already dancing or modal is open, ignore clicks
  if (danceTimer || modal.classList.contains('show')) return;

  // Pick a random dance
  currentDance = dances[Math.floor(Math.random() * dances.length)];
  dog.classList.add(currentDance);

  // Start money rain (spawn a money particle every 80ms)
  rainInterval = setInterval(createMoneyRain, 80);

  // Stop dancing and reveal winner after 3 seconds
  danceTimer = setTimeout(() => {
    // 1. Stop dance
    dog.classList.remove(currentDance);
    currentDance = '';
    danceTimer = null;
    
    // 2. Stop money rain
    clearInterval(rainInterval);
    
    // 3. Reveal Winner & Update Leaderboard Score
    const winner = candidates[Math.floor(Math.random() * candidates.length)];
    
    // Add 10억 (10 Billion) per win
    scores[winner] += 10; 
    const scoreSpan = document.getElementById(`score-${winner}`);
    scoreSpan.textContent = scores[winner];
    
    // Highlight the winner's score box briefly
    const playerBox = scoreSpan.parentElement;
    playerBox.style.transform = 'scale(1.3) translateY(-5px)';
    playerBox.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
    
    setTimeout(() => {
      playerBox.style.transform = '';
      playerBox.style.backgroundColor = '';
    }, 600);

    winnerNameEl.textContent = winner;
    modal.classList.add('show');
    
  }, 3000);
});

function createMoneyRain() {
  const particle = document.createElement('div');
  particle.classList.add('money-particle');
  
  // Pick random money emoji
  particle.textContent = moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)];
  
  // Random horizontal position across the entire viewport
  particle.style.left = `${Math.random() * 100}vw`;
  
  // Random fall duration between 1.5s and 2.5s
  const duration = 1.5 + Math.random() * 1.0;
  particle.style.animationDuration = `${duration}s`;
  
  // Random size for depth effect
  const size = 1 + Math.random() * 1.5;
  particle.style.fontSize = `${size}rem`;
  
  document.body.appendChild(particle);
  
  // Cleanup particle after it falls past the screen
  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}
