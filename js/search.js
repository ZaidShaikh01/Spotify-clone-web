/*
TODO: Implement Local Storage search function
Logic for implementing the local storage

1. Retrive all the elements from local storage (Done)
destructure the elements (Done)
2. Create an Element & add it to DOM
3. Iterate through local storage and show all elements or particular elemenents
4. Design a search pagek

*/

// Inserting some valus in local storage
localStorage.setItem('Shape of You', 'Ed Sheeran');
localStorage.setItem('Blinding Lights', 'The Weeknd');
localStorage.setItem('Believer', 'Imagine Dragons');
localStorage.setItem('Rolling in the Deep', 'Adele');
localStorage.setItem('Smells Like Teen Spirit', 'Nirvana');
localStorage.setItem('Bohemian Rhapsody', 'Queen');
localStorage.setItem('Lose Yourself', 'Eminem');
localStorage.setItem('Hotel California', 'Eagles');
localStorage.setItem('Someone Like You', 'Adele');
localStorage.setItem('Uptown Funk', 'Mark Ronson ft. Bruno Mars');
localStorage.setItem('Tum Hi Ho', 'Arijit Singh');
localStorage.setItem('Kabira', 'Tochi Raina, Rekha Bhardwaj');
localStorage.setItem('Kal Ho Naa Ho', 'Sonu Nigam');
localStorage.setItem('Tera Ban Jaunga', 'Akhil, Tulsi Kumar');
localStorage.setItem('Chaiyya Chaiyya', 'Sukhwinder Singh, Sapna Awasthi');
localStorage.setItem('Pee Loon', 'Mohit Chauhan');
localStorage.setItem('Tujh Mein Rab Dikhta Hai', 'Roop Kumar Rathod');
localStorage.setItem('Ae Dil Hai Mushkil', 'Arijit Singh');
localStorage.setItem('Galliyan', 'Ankit Tiwari');
localStorage.setItem('Dil Diyan Gallan', 'Atif Aslam');

const toggleButton = document.querySelector('.header-theme-toggle');
const icon = document.querySelector('.header-theme-svg');
const headerLogo = document.querySelector('.header-logo-svg');
// List all songs in first try
document.addEventListener(
  'DOMContentLoaded',
  function () {
    showAllEntries();
  },
  { once: true },
);

// Adding new table element
function createNewTableItem(song, author) {
  const tr = document.createElement('tr');
  const tdSong = document.createElement('td');
  tdSong.appendChild(document.createTextNode(song));
  const tdAuthor = document.createElement('td');
  tdAuthor.appendChild(document.createTextNode(author));
  tr.append(tdSong, tdAuthor);
  document.querySelector('.search-body').appendChild(tr);
}
// removing all entries
function removeAllEntries() {
  document.querySelector('.search-body').innerHTML = '';
}
// to show all entries at the start
function showAllEntries() {
  for (let i = 0; i < localStorage.length; i++) {
    const songName = localStorage.key(i);
    const author = localStorage.getItem(songName);

    if (songName.includes('@gmail.com')) {
      continue;
    }
    createNewTableItem(songName, author);
  }
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    // restarts the timer
    clearTimeout(timer);
    // sets the timer & actully implements it on the function
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// serach function
function search(inputValue) {
  removeAllEntries();

  for (let i = 0; i < localStorage.length; i++) {
    const songName = localStorage.key(i);
    const author = localStorage.getItem(songName);
    console.log(inputValue);
    console.log(songName);

    if (songName.includes('@gmail.com')) {
      // console.log(songName);
      continue;
    }
    if (songName.toLowerCase().includes(inputValue.toLowerCase())) {
      createNewTableItem(songName, author);
    }
  }
}

function toggleIcons() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    icon.innerHTML = `<path fill="white" d="M288-32c8.4 0 16.3 4.4 20.6 11.7L364.1 72.3 468.9 46c8.2-2 16.9 .4 22.8 6.3S500 67 498 75.1l-26.3 104.7 92.7 55.5c7.2 4.3 11.7 12.2 11.7 20.6s-4.4 16.3-11.7 20.6L471.7 332.1 498 436.8c2 8.2-.4 16.9-6.3 22.8S477 468 468.9 466l-104.7-26.3-55.5 92.7c-4.3 7.2-12.2 11.7-20.6 11.7s-16.3-4.4-20.6-11.7L211.9 439.7 107.2 466c-8.2 2-16.8-.4-22.8-6.3S76 445 78 436.8l26.2-104.7-92.6-55.5C4.4 272.2 0 264.4 0 256s4.4-16.3 11.7-20.6L104.3 179.9 78 75.1c-2-8.2 .3-16.8 6.3-22.8S99 44 107.2 46l104.7 26.2 55.5-92.6 1.8-2.6c4.5-5.7 11.4-9.1 18.8-9.1zm0 144a144 144 0 1 0 0 288 144 144 0 1 0 0-288zm0 240a96 96 0 1 1 0-192 96 96 0 1 1 0 192z" />`;
    headerLogo.innerHTML = `<path
              fill="white"
              d="M256 8a248 248 0 1 0 0 496 248 248 0 1 0 0-496zM356.7 372.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
            />`;
    headerLogo.innerHTML = `<path
              fill="white"
              d="M256 8a248 248 0 1 0 0 496 248 248 0 1 0 0-496zM356.7 372.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
            />`;
  } else {
    icon.innerHTML = `<path fill="black" d="M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512c68.8 0 131.3-27.2 177.3-71.4 7.3-7 9.4-17.9 5.3-27.1s-13.7-14.9-23.8-14.1c-4.9 .4-9.8 .6-14.8 .6-101.6 0-184-82.4-184-184 0-72.1 41.5-134.6 102.1-164.8 9.1-4.5 14.3-14.3 13.1-24.4S322.6 8.5 312.7 6.3C294.4 2.2 275.4 0 256 0z"/>`;

    headerLogo.innerHTML = `<path
              fill="#3be477"
              d="M256 8a248 248 0 1 0 0 496 248 248 0 1 0 0-496zM356.7 372.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
            />`;
  }
}

// UI animation
const searchBarInput = document.querySelector('.header-input');
const searchBar = document.querySelector('.header-navigation');

function onFocus() {
  searchBar.style.border = '1px solid #f0f0f0';
}
function onBlur() {
  searchBar.style.border = 'none';
}

searchBarInput.addEventListener('focus', onFocus);
searchBarInput.addEventListener('blur', onBlur);

// Implementing dark theme

function initTheme() {
  // Check for the themem that is in local storage or use preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

toggleButton.addEventListener('click', () => {
  toggleTheme();

  toggleIcons();
});

const debouncedSearch = debounce(search, 300); // passing parameters

const inputField = document.querySelector('.header-input');

inputField.addEventListener('input', function (e) {
  debouncedSearch(e.target.value);
});
// Calling debounce search

initTheme();
toggleIcons();
