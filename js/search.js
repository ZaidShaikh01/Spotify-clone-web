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
const inputField = document.querySelector('.header-input');

inputField.addEventListener('input', function () {
  search(inputField.value);
  console.log(inputField.value);
});


// Implementing dark theme
const toggleButton = document.querySelector('.header-theme-toggle');
const icon = document.querySelector('.header-theme-svg');

toggleButton.addEventListener('click', () => {
  icon.classList.toggle('moon');
  if (icon.classList.contains('moon')) {
    icon.innerHTML = `<path fill="white" d="M288-32c8.4 0 16.3 4.4 20.6 11.7L364.1 72.3 468.9 46c8.2-2 16.9 .4 22.8 6.3S500 67 498 75.1l-26.3 104.7 92.7 55.5c7.2 4.3 11.7 12.2 11.7 20.6s-4.4 16.3-11.7 20.6L471.7 332.1 498 436.8c2 8.2-.4 16.9-6.3 22.8S477 468 468.9 466l-104.7-26.3-55.5 92.7c-4.3 7.2-12.2 11.7-20.6 11.7s-16.3-4.4-20.6-11.7L211.9 439.7 107.2 466c-8.2 2-16.8-.4-22.8-6.3S76 445 78 436.8l26.2-104.7-92.6-55.5C4.4 272.2 0 264.4 0 256s4.4-16.3 11.7-20.6L104.3 179.9 78 75.1c-2-8.2 .3-16.8 6.3-22.8S99 44 107.2 46l104.7 26.2 55.5-92.6 1.8-2.6c4.5-5.7 11.4-9.1 18.8-9.1zm0 144a144 144 0 1 0 0 288 144 144 0 1 0 0-288zm0 240a96 96 0 1 1 0-192 96 96 0 1 1 0 192z" />`;
  } else {
    icon.innerHTML = `<path fill="white" d="M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512c68.8 0 131.3-27.2 177.3-71.4 7.3-7 9.4-17.9 5.3-27.1s-13.7-14.9-23.8-14.1c-4.9 .4-9.8 .6-14.8 .6-101.6 0-184-82.4-184-184 0-72.1 41.5-134.6 102.1-164.8 9.1-4.5 14.3-14.3 13.1-24.4S322.6 8.5 312.7 6.3C294.4 2.2 275.4 0 256 0z"/>`;
  }
});