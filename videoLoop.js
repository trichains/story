document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.thumbnail-video'); // Seleciona apenas os vídeos nas thumbnails

  let currentVideo = 0; // Index do vídeo atual
  const videoDuration = 5000; // Duração que cada vídeo deve tocar

  // Função para iniciar a reprodução do vídeo
  function playVideo(index) {
    videos.forEach((vid, idx) => {
      vid.pause(); // Pausa todos os vídeos
      if (idx === index) {
        vid.currentTime = 0; // Reseta o tempo do vídeo atual
        vid.play(); // Toca o vídeo do índice especificado
      }
    });
  }

  // Função para transitar para o próximo vídeo
  function setNextVideo() {
    currentVideo = (currentVideo + 1) % videos.length; // Atualiza o índice do vídeo
    playVideo(currentVideo); // Toca o próximo vídeo
  }

  // Configura o evento para cada vídeo
  videos.forEach((video) => {
    video.addEventListener('loadedmetadata', () => {
      video.muted = true; // Garante que o vídeo está mudo
    });

    video.addEventListener('ended', () => {
      setNextVideo(); // Se o vídeo terminar, vai para o próximo
    });
  });

  // Inicia o primeiro vídeo
  playVideo(currentVideo);

  // Configura o intervalo para trocar os vídeos a cada 5 segundos
  setInterval(() => {
    if (!videos[currentVideo].paused) {
      // Verifica se o vídeo atual não está pausado
      setNextVideo(); // Muda para o próximo vídeo
    }
  }, videoDuration);
});
