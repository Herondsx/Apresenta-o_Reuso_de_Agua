const slides = [...document.querySelectorAll('.slide')];
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const counter = document.getElementById('counter');
const bar = document.getElementById('bar');

let i = 0;
const total = slides.length;
let isNavigating = false;
// Duração da animação (deve ser igual ao --transition-speed no CSS)
const ANIMATION_DURATION = 500; 

function show(n){
  // Garante que 'n' esteja dentro dos limites (0 a total-1)
  n = Math.max(0, Math.min(total - 1, n));
  
  // Não faz nada se já estiver animando ou for o mesmo slide
  if (n === i || isNavigating) return;

  // Trava a navegação para evitar cliques duplos
  isNavigating = true;

  const current = slides[i];
  const incoming = slides[n];

  // Adiciona classes de animação
  current.classList.add('leaving');
  incoming.classList.remove('leaving'); // Limpa 'leaving' caso esteja voltando
  incoming.classList.add('active');

  // Atualiza o índice atual
  i = n;

  // Destrava a navegação após a animação
  setTimeout(() => {
    current.classList.remove('active', 'leaving');
    isNavigating = false;
  }, ANIMATION_DURATION);

  // Atualiza a UI (contador, barra, botões)
  updateUI();
}

function updateUI(){
  counter.textContent = `${i + 1} / ${total}`;
  bar.style.width = `${((i + 1) / total) * 100}%`;
  
  // Desabilita/habilita botões
  prev.disabled = (i === 0);
  next.disabled = (i === total - 1);
}

// Event Listeners para os botões
prev.addEventListener('click', () => show(i - 1));
next.addEventListener('click', () => show(i + 1));

// Event Listeners para o teclado
document.addEventListener('keydown', e => {
  if (isNavigating) return; // Ignora se estiver animando
  if (['ArrowRight','PageDown',' '].includes(e.key)) { e.preventDefault(); show(i + 1); }
  if (['ArrowLeft','PageUp'].includes(e.key))        { e.preventDefault(); show(i - 1); }
  if (e.key === 'Home') { e.preventDefault(); show(0); }
  if (e.key === 'End')  { e.preventDefault(); show(total - 1); }
});

// Pré-carrega as imagens para evitar "piscar"
[
  'Foto_Drone.png',
  'Foto_Patio1.png',
  'Foto_Patio_projeto_em_produção.png',
  'Prototipo_3D.png'
].forEach(src => { const img = new Image(); img.src = src; });

// Inicialização
show(0);
updateUI();
