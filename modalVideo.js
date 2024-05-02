document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('video-modal');
  const videoElement = document.getElementById('modal-video');
  const closeButton = document.querySelector('.close');
  const muteButton = document.querySelector('.mute');

  closeButton.addEventListener('click', closeModal);

  muteButton.addEventListener('click', () => {
    videoElement.muted = !videoElement.muted;
    muteButton.textContent = videoElement.muted ? '🔇' : '🔊';
  });

  videoElement.addEventListener('timeupdate', () => {
    const progressBar = document.querySelector('.progress-bar');
    const percentage = (videoElement.currentTime / videoElement.duration) * 100;
    progressBar.style.width = `${percentage}%`;
  });

  // Manipulador de cliques ajustado para capturar cliques no modal
  modal.addEventListener('click', (event) => {
    // Verifica se o clique ocorreu fora dos controles nativos ou qualquer elemento interativo
    if (
      !event.target.matches(
        'video, .close, .mute, .up-arrow, .down-arrow, .share, .buy-button'
      )
    ) {
      togglePlayPause();
    }
  });
});

function togglePlayPause() {
  const videoElement = document.getElementById('modal-video');
  const playPauseIcon = document.querySelector('.play-pause');
  if (videoElement.paused || videoElement.ended) {
    videoElement.play();
    playPauseIcon.style.display = 'none'; // Esconde o ícone quando o vídeo está tocando
  } else {
    videoElement.pause();
    playPauseIcon.style.display = 'block'; // Mostra o ícone quando o vídeo está pausado
    playPauseIcon.textContent = '▶️'; // Assegura que o ícone correto é mostrado
  }
}

function openModal(videoSrc) {
  const modal = document.getElementById('video-modal');
  const videoElement = document.getElementById('modal-video');
  const playPauseIcon = document.querySelector('.play-pause');

  videoElement.src = videoSrc;
  modal.style.display = 'flex';
  videoElement.play();
  playPauseIcon.style.display = 'none'; // O ícone só será mostrado quando o vídeo estiver pausado
}

function closeModal() {
  const modal = document.getElementById('video-modal');
  const videoElement = document.getElementById('modal-video');
  const playPauseIcon = document.querySelector('.play-pause');

  videoElement.pause();
  videoElement.currentTime = 0;
  videoElement.src = '';
  modal.style.display = 'none';
  playPauseIcon.style.display = 'none';
}
