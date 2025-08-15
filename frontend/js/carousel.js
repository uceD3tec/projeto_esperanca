const track = document.querySelector('.partners .carousel-track');
const images = document.querySelectorAll('.partners .carousel-track img');
const totalImages = images.length;
let index = 0;

// Duplicar as imagens no final do carrossel para criar o efeito de loop
track.innerHTML += track.innerHTML;

// Função para mover o carrossel
function moveCarousel() {
  index++;
  track.style.transition = "transform 0.5s ease-in-out"; // Adiciona transição suave
  track.style.transform = `translateX(-${index * 100}%)`;

  // Quando o índice atingir o final das imagens originais, reseta sem transição
  if (index === totalImages) {
    setTimeout(() => {
      track.style.transition = "none"; // Remove a transição
      track.style.transform = `translateX(0)`; // Reseta para a posição inicial
      index = 0; // Reseta o índice
    }, 500); // Tempo deve ser igual à duração da transição
  }
}

// Inicia o carrossel
setInterval(moveCarousel, 2500); // Muda a imagem a cada 2.5 segundos