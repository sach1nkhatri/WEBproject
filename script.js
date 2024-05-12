document.addEventListener('DOMContentLoaded', function () {
    const musicPlayers = document.querySelectorAll('.music-player');

    musicPlayers.forEach(function (player) {
        const audioPlayer = player.querySelector('.audio-player');
        const playBtn = player.querySelector('.play-btn');
        const pauseBtn = player.querySelector('.pause-btn');
        const repeatBtn = player.querySelector('.repeat-btn');
        const loveBtn = player.querySelector('.love-btn');
        const progressBar = player.querySelector('.progress-bar');
        const songTitle = player.querySelector('.song-title');
        const durationDisplay = player.querySelector('.duration');
        const progressContainer = player.querySelector('.progress-container');

        let isPlaying = false;
        let touchStartX = 0;
        let touchEndX = 0;

        playBtn.addEventListener('click', function () {
            audioPlayer.play();
            isPlaying = true;
        });

        pauseBtn.addEventListener('click', function () {
            audioPlayer.pause();
            isPlaying = false;
        });

        repeatBtn.addEventListener('click', function () {
            audioPlayer.loop = !audioPlayer.loop;
            repeatBtn.classList.toggle('active');
        });

        loveBtn.addEventListener('click', function () {
            loveBtn.classList.toggle('active');
        });

        progressContainer.addEventListener('click', function (event) {
            const clickX = event.clientX - this.getBoundingClientRect().left;
            const progressPercentage = (clickX / this.offsetWidth) * 100;
            progressBar.style.width = progressPercentage + '%';
            audioPlayer.currentTime = (audioPlayer.duration * progressPercentage) / 100;
        });

        progressContainer.addEventListener('touchstart', function (event) {
            touchStartX = event.touches[0].clientX;
        });

        progressContainer.addEventListener('touchmove', function (event) {
            event.preventDefault();
            touchEndX = event.touches[0].clientX;
            const touchDiff = touchEndX - touchStartX;
            const newWidth = Math.min(Math.max(progressBar.offsetWidth + touchDiff, 0), this.offsetWidth);
            const progressPercentage = (newWidth / this.offsetWidth) * 100;
            progressBar.style.width = progressPercentage + '%';
            audioPlayer.currentTime = (audioPlayer.duration * progressPercentage) / 100;
            touchStartX = touchEndX;
        });

        audioPlayer.addEventListener('timeupdate', function () {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            const progressPercentage = (currentTime / duration) * 100;
            progressBar.style.width = progressPercentage + '%';

            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            const durationString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            durationDisplay.textContent = durationString;

            if (currentTime === duration && !audioPlayer.loop) {
                isPlaying = false;
            }
        });

        audioPlayer.addEventListener('loadedmetadata', function () {
            songTitle.textContent = audioPlayer.currentSrc.split('/').pop().split('.')[0];
        });
    });
});
