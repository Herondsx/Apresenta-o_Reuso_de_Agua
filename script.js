const slides = [...document.querySelectorAll('.slide')];
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const counter = document.getElementById('counter');
const bar = document.getElementById('bar');

let i = 0;
const total = slides.length;
let isNavigating = false;
const ANIMATION_DURATION = 500;

function show(n){
  n = Math.max(0, Math.min(total - 1, n));
  if (n === i || isNavigating) return;

  isNavigating = true;

  const current = slides[i];
  const incoming = slides[n];

  current.classList.add('leaving');
  incoming.classList.remove('leaving');
  incoming.classList.add('active');

  i = n;

  setTimeout(() => {
    current.classList.remove('active', 'leaving');
    isNavigating = false;
  }, ANIMATION_DURATION);

  updateUI();
}

function updateUI(){
  counter.textContent = `${i + 1} / ${total}`;
  bar.style.width = `${((i + 1) / total) * 100}%`;
  prev.disabled = (i === 0);
  next.disabled = (i === total - 1);
}

prev.addEventListener('click', () => show(i - 1));
next.addEventListener('click', () => show(i + 1));

document.addEventListener('keydown', e => {
  if (isNavigating) return;
  if (['ArrowRight','PageDown',' '].includes(e.key)) { e.preventDefault(); show(i + 1); }
  if (['ArrowLeft','PageUp'].includes(e.key))        { e.preventDefault(); show(i - 1); }
  if (e.key === 'Home') { e.preventDefault(); show(0); }
  if (e.key === 'End')  { e.preventDefault(); show(total - 1); }
});

// Preload imagens
[
  'Foto_Drone.png',
  'Foto_Patio1.png',
  'Foto_Patio_projeto_em_produção.png',
  'Prototipo_3D.png'
].forEach(src => { const img = new Image(); img.src = src; });

// Init
show(0);
updateUI();
