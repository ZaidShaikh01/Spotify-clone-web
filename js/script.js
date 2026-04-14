const filters = document.querySelector('.content-area-content-filters');
const toggleButton = document.querySelector('.header-theme-toggle');
const icon = document.querySelector('.header-theme-svg');
const shuffleButton = document.querySelector('.music-player-shuffle-svg');
const prevBtn = document.querySelector('.music-backward');
const nextBtn = document.querySelector('.music-forward');
const playBtn = document.querySelector('.music-stop');
const musicRepeat = document.querySelector('.music-repeat');
const sound = document.querySelector('.music-sound-svg');
const headerLogo = document.querySelector('.header-logo-svg');
const headerHome = document.querySelector('.home-svg');
const headerUser = document.querySelector('.header-user-svg');
const contentShuffle = document.querySelector('.content-shuffle');
const contentDownload = document.querySelector('.content-download');
const contentlist = document.querySelector('.content-list');
const tableClock = document.querySelector('.table-clock');
const contentAreaMusicSection = document.querySelector(
  '.content-area-music-sections',
);
const volume = document.getElementById('volume-range');
const audio = document.getElementById('footer-music');
const playerCover = document.getElementById('music-player-cover');
const playerSongTitle = document.querySelector('.music-player-song-title');
const playerProgressBar = document.getElementById('music-player-progress-bar');
const musicDuration = document.getElementById('player-end-time');
const musicCurrentTime = document.getElementById('player-start-time');
let path = window.location.pathname;

// Creating an array of songs
const songs = ['pillowtalk', 'rakhlo', 'sanam', 'tereliye', 'tumHiHo'];
// creating a song index
let songIndex = 4;

// Load song details
function loadSong(song) {
  playerSongTitle.innerHTML = song.toUpperCase();
  playerCover.src = `images/album-cover/${song}.jpg`;
  audio.src = `songs/${song}.mp3`;
}
// Play song
function playSong() {
  playBtn.innerHTML = `<path fill="white" d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 192l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128c0-17.7 14.3-32 32-32s32 14.3 32 32z"/>`;
  audio.play();
}
// Pause song
function pauseSong() {
  playBtn.innerHTML = `<path
                    fill="white"
                    d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                  />`;
  audio.pause();
}
// Prev song
function prevSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// Next song
function nextSong() {
  console.log('Next song function');
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  if (!playerProgressBar.dragging) {
    playerProgressBar.value = audio.currentTime;
    const formatted = formateTime(audio.currentTime);
    musicCurrentTime.innerHTML = `${formatted}`;
  }
}

function setProgress(e) {
  audio.currentTime = playerProgressBar.value;
  playerProgressBar.dragging = false;
}

function initTheme() {
  // Check for the themem that is in local storage or use preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
}
// Changing the theme & adding new theme to local storage
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Changing SVG Icons
function toggleIcons() {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  if (currentTheme === 'dark') {
    icon.innerHTML = `<path fill="white" d="M288-32c8.4 0 16.3 4.4 20.6 11.7L364.1 72.3 468.9 46c8.2-2 16.9 .4 22.8 6.3S500 67 498 75.1l-26.3 104.7 92.7 55.5c7.2 4.3 11.7 12.2 11.7 20.6s-4.4 16.3-11.7 20.6L471.7 332.1 498 436.8c2 8.2-.4 16.9-6.3 22.8S477 468 468.9 466l-104.7-26.3-55.5 92.7c-4.3 7.2-12.2 11.7-20.6 11.7s-16.3-4.4-20.6-11.7L211.9 439.7 107.2 466c-8.2 2-16.8-.4-22.8-6.3S76 445 78 436.8l26.2-104.7-92.6-55.5C4.4 272.2 0 264.4 0 256s4.4-16.3 11.7-20.6L104.3 179.9 78 75.1c-2-8.2 .3-16.8 6.3-22.8S99 44 107.2 46l104.7 26.2 55.5-92.6 1.8-2.6c4.5-5.7 11.4-9.1 18.8-9.1zm0 144a144 144 0 1 0 0 288 144 144 0 1 0 0-288zm0 240a96 96 0 1 1 0-192 96 96 0 1 1 0 192z" />`;
    shuffleButton.innerHTML = `
    <path
                    fill="#a8a8a8"
                    d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9S384 204.9 384 192l0-32-32 0c-10.1 0-19.6 4.7-25.6 12.8l-32.4 43.2-40-53.3 21.2-28.3C293.3 110.2 321.8 96 352 96l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6zM154 296l40 53.3-21.2 28.3C154.7 401.8 126.2 416 96 416l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c10.1 0 19.6-4.7 25.6-12.8L154 296zM438.6 470.6c-9.2 9.2-22.9 11.9-34.9 6.9S384 460.9 384 448l0-32-32 0c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8l-64 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"
                  />
    `;
    prevBtn.innerHTML = `<path
                    fill="#a8a8a8"
                    d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9S192 115.1 192 128l0 64 336 0c26.5 0 48 21.5 48 48l0 32c0 26.5-21.5 48-48 48l-336 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
                  />`;
    nextBtn.innerHTML = `<path
                    fill="#a8a8a8"
                    d="M566.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-128 128c-9.2 9.2-22.9 11.9-34.9 6.9S384 396.9 384 384l0-64-336 0c-26.5 0-48-21.5-48-48l0-32c0-26.5 21.5-48 48-48l336 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l128 128z"
                  />`;
    playBtn.innerHTML = `<path
                    fill="white"
                    d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                  />`;
    musicRepeat.innerHTML = `<path
                    fill="#a8a8a8"
                    d="M470.6 118.6c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S352 19.1 352 32l0 32-160 0C86 64 0 150 0 256 0 273.7 14.3 288 32 288s32-14.3 32-32c0-70.7 57.3-128 128-128l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64zM41.4 393.4c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9S160 492.9 160 480l0-32 160 0c106 0 192-86 192-192 0-17.7-14.3-32-32-32s-32 14.3-32 32c0 70.7-57.3 128-128 128l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64z"
                  />`;
    sound.innerHTML = `<path
                fill="white"
                d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"
              />`;

    headerLogo.innerHTML = `<path
              fill="white"
              d="M256 8a248 248 0 1 0 0 496 248 248 0 1 0 0-496zM356.7 372.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
            />`;
    headerHome.innerHTML = `<path
                fill="white"
                d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z"
              />`;
    headerUser.innerHTML = `<path
                fill="white"
                d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"
              />`;
    if (path === '/liked-song.html' || path === '/playlist.html') {
      contentShuffle.innerHTML = `<path
                        fill="#a8a8a8"
                        d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9S384 204.9 384 192l0-32-32 0c-10.1 0-19.6 4.7-25.6 12.8l-32.4 43.2-40-53.3 21.2-28.3C293.3 110.2 321.8 96 352 96l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6zM154 296l40 53.3-21.2 28.3C154.7 401.8 126.2 416 96 416l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c10.1 0 19.6-4.7 25.6-12.8L154 296zM438.6 470.6c-9.2 9.2-22.9 11.9-34.9 6.9S384 460.9 384 448l0-32-32 0c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8l-64 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"
                      />`;
      contentDownload.innerHTML = `<path
                      fill="#a8a8a8"
                      d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM239 377l-80-80c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l39 39 0-150.1c0-13.3 10.7-24 24-24s24 10.7 24 24l0 150.1 39-39c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0z"
                    />`;
      contentlist.innerHTML = `<path
                    fill="#a8a8a8"
                    d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"
                  />`;
      tableClock.innerHTML = `<path
                          fill="#a8a8a8"
                          d="M464 256a208 208 0 1 1 -416 0 208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                        />`;
    }
  } else {
    icon.innerHTML = `<path fill="black" d="M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512c68.8 0 131.3-27.2 177.3-71.4 7.3-7 9.4-17.9 5.3-27.1s-13.7-14.9-23.8-14.1c-4.9 .4-9.8 .6-14.8 .6-101.6 0-184-82.4-184-184 0-72.1 41.5-134.6 102.1-164.8 9.1-4.5 14.3-14.3 13.1-24.4S322.6 8.5 312.7 6.3C294.4 2.2 275.4 0 256 0z"/>`;

    shuffleButton.innerHTML = `
    <path
                    fill="black"
                    d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9S384 204.9 384 192l0-32-32 0c-10.1 0-19.6 4.7-25.6 12.8l-32.4 43.2-40-53.3 21.2-28.3C293.3 110.2 321.8 96 352 96l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6zM154 296l40 53.3-21.2 28.3C154.7 401.8 126.2 416 96 416l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c10.1 0 19.6-4.7 25.6-12.8L154 296zM438.6 470.6c-9.2 9.2-22.9 11.9-34.9 6.9S384 460.9 384 448l0-32-32 0c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8l-64 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"
                  />
    `;
    prevBtn.innerHTML = `<path
                    fill="black"
                    d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9S192 115.1 192 128l0 64 336 0c26.5 0 48 21.5 48 48l0 32c0 26.5-21.5 48-48 48l-336 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
                  />`;
    nextBtn.innerHTML = `<path
                    fill="black"
                    d="M566.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-128 128c-9.2 9.2-22.9 11.9-34.9 6.9S384 396.9 384 384l0-64-336 0c-26.5 0-48-21.5-48-48l0-32c0-26.5 21.5-48 48-48l336 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l128 128z"
                  />`;
    playBtn.innerHTML = `<path
                    fill="black"
                    d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                  />`;
    musicRepeat.innerHTML = `<path
                    fill="black"
                    d="M470.6 118.6c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S352 19.1 352 32l0 32-160 0C86 64 0 150 0 256 0 273.7 14.3 288 32 288s32-14.3 32-32c0-70.7 57.3-128 128-128l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64zM41.4 393.4c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9S160 492.9 160 480l0-32 160 0c106 0 192-86 192-192 0-17.7-14.3-32-32-32s-32 14.3-32 32c0 70.7-57.3 128-128 128l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64z"
                  />`;
    sound.innerHTML = `<path
                fill="black"
                d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"
              />`;
    headerLogo.innerHTML = `<path
              fill="#3be477"
              d="M256 8a248 248 0 1 0 0 496 248 248 0 1 0 0-496zM356.7 372.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
            />`;
    headerHome.innerHTML = `<path
                fill="black"
                d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z"
              />`;
    headerUser.innerHTML = `<path
                fill="black"
                d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"
              />`;
    if (path === '/liked-song.html' || path === '/playlist.html') {
      contentShuffle.innerHTML = `<path
                        fill="#000"
                        d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9S384 204.9 384 192l0-32-32 0c-10.1 0-19.6 4.7-25.6 12.8l-32.4 43.2-40-53.3 21.2-28.3C293.3 110.2 321.8 96 352 96l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6zM154 296l40 53.3-21.2 28.3C154.7 401.8 126.2 416 96 416l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c10.1 0 19.6-4.7 25.6-12.8L154 296zM438.6 470.6c-9.2 9.2-22.9 11.9-34.9 6.9S384 460.9 384 448l0-32-32 0c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8l-64 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"
                      />`;
      contentDownload.innerHTML = `<path
                      fill="#000"
                      d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM239 377l-80-80c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l39 39 0-150.1c0-13.3 10.7-24 24-24s24 10.7 24 24l0 150.1 39-39c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0z"
                    />`;
      contentlist.innerHTML = `<path
                    fill="#000"
                    d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"
                  />`;
      tableClock.innerHTML = `<path
                          fill="#000"
                          d="M464 256a208 208 0 1 1 -416 0 208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                        />`;
    }
  }
}

// Set up the throttler
const throttle = (fn, delay) => {
  // Capture the current time
  let time = Date.now();

  // Here's our logic
  return () => {
    if (time + delay - Date.now() <= 0) {
      // Checks if enough time has passed since the last execution.
      // time + delay is the earliest allowed next run
      // Run the function we've passed to our throttler,
      // and reset the `time` variable (so we can check again).
      fn();
      time = Date.now();
    }
  };
};
function createNewMusicSection() {
  const musicSection = document.createElement('div');
  musicSection.classList.add('content-area-music-category');
  musicSection.innerHTML = `
                <!-- Content title -->
                <div class="content-area-section-header">
                  <h2 class="content-area-section-title">
                    Popular albums and singles
                  </h2>
                  <p class="content-area-section-action">Show All</p>
                </div>
                <!-- Lists -->

                <div class="content-area-music-grid">
                  <!-- Item 1 -->
                  <a href="playlist.html" class="content-area-music-card">
                    <div class="content-area-music-cover">
                      <img src="images/album-3.jpg" alt="" />
                    </div>
                    <div class="content-area-music-title">Aashique 2</div>
                    <div class="content-area-music-artist">
                      Mithoon, Ankit Tiwari, Jeet Gannuali
                    </div>
                    <div class="content-area-music-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="3rem"
                      >
                        <path
                          fill="#3be477"
                          d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                      </svg>
                    </div>
                  </a>
                  <!-- Item 2 -->
                  <div class="content-area-music-card">
                    <div class="content-area-music-cover">
                      <img src="images/album-1.jpg" alt="" />
                    </div>
                    <div class="content-area-music-title">Mind Of Mine</div>
                    <div class="content-area-music-artist">Zayn Malik</div>
                    <div class="content-area-music-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="3rem"
                      >
                        <path
                          fill="#3be477"
                          d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <!-- Item 3 -->
                  <div class="content-area-music-card">
                    <div class="content-area-music-cover">
                      <img src="images/album-4.jpg" alt="" />
                    </div>
                    <div class="content-area-music-title">Sanam Teri Kasam</div>
                    <div class="content-area-music-artist">
                      Himesh Reshamiya
                    </div>
                    <div class="content-area-music-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="3rem"
                      >
                        <path
                          fill="#3be477"
                          d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <!-- Item 4 -->
                  <div class="content-area-music-card">
                    <div class="content-area-music-cover">
                      <img src="images/song-1.jpg" alt="" />
                    </div>
                    <div class="content-area-music-title">Bargad</div>
                    <div class="content-area-music-artist">Arpit kala</div>
                    <div class="content-area-music-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="3rem"
                      >
                        <path
                          fill="#3be477"
                          d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <!-- Item 5 -->
                  <div class="content-area-music-card">
                    <div class="content-area-music-cover">
                      <img src="images/song-2.jpg" alt="" />
                    </div>
                    <div class="content-area-music-title">
                      Kal Chaudhavi ki raat thi
                    </div>
                    <div class="content-area-music-artist">Jagjit Singh</div>
                    <div class="content-area-music-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="3rem"
                      >
                        <path
                          fill="#3be477"
                          d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <!-- Item 6 -->
                  <div class="content-area-music-card">
                    <div class="content-area-music-cover">
                      <img src="images/song-3.jpg" alt="" />
                    </div>
                    <div class="content-area-music-title">
                      Yeh Jawaani hai deewani
                    </div>
                    <div class="content-area-music-artist">Pritam</div>
                    <div class="content-area-music-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="3rem"
                      >
                        <path
                          fill="#3be477"
                          d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="content-area-music-card">
                    <div class="content-area-music-cover">
                      <img src="images/album-1.jpg" alt="" />
                    </div>
                    <div class="content-area-music-title">Mind Of Mine</div>
                    <div class="content-area-music-artist">Zayn Malik</div>
                    <div class="content-area-music-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="3rem"
                      >
                        <path
                          fill="#3be477"
                          d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <!-- Item 3 -->
                  <div class="content-area-music-card">
                    <div class="content-area-music-cover">
                      <img src="images/album-4.jpg" alt="" />
                    </div>
                    <div class="content-area-music-title">Sanam Teri Kasam</div>
                    <div class="content-area-music-artist">
                      Himesh Reshamiya
                    </div>
                    <div class="content-area-music-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="3rem"
                      >
                        <path
                          fill="#3be477"
                          d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <!-- Item 4 -->
                  <div class="content-area-music-card">
                    <div class="content-area-music-cover">
                      <img src="images/song-1.jpg" alt="" />
                    </div>
                    <div class="content-area-music-title">Bargad</div>
                    <div class="content-area-music-artist">Arpit kala</div>
                    <div class="content-area-music-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="3rem"
                      >
                        <path
                          fill="#3be477"
                          d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              `;
  contentAreaMusicSection.append(musicSection);
  console.log('New Element Added!!');
}
function formateTime(duration) {
  const totalSeconds = Math.floor(duration);
  const minutes = Math.floor(totalSeconds / 60);
  const secounds = totalSeconds % 60;
  // formate with leading zero for secounds
  const formatted = `${minutes}:${secounds}`;
  return formatted;
}

// We can use this like so (this will run runOnScroll at most once per second):

if (path === '/index.html') {
  const contentArea = document.querySelector('.content-area');
  contentArea.addEventListener('scroll', throttle(createNewMusicSection, 1000));
}

toggleButton.addEventListener('click', () => {
  toggleTheme();
  toggleIcons();
});
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});
volume.addEventListener('change', () => {
  audio.volume = volume.value;
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
  playerProgressBar.max = audio.duration;
  // Format with leading zero for seconds
  const formatted = formateTime(audio.duration);
  musicDuration.innerHTML = `${formatted}`;
  musicCurrentTime.innerHTML = 0;
});
// Allows to add input value and chage the value
playerProgressBar.addEventListener('input', () => {
  playerProgressBar.dragging = true; // Mark dragging state
});
// Allows to change the value
playerProgressBar.addEventListener('change', setProgress);
initTheme();
toggleIcons();
createNewMusicSection();

console.log(path);
