/*

Logic for implementing the local storage

1. Retrive all the elements from local storage (Done)
destructure the elements (Done)
2. Create an Element & add it to DOM
3. Iterate through local storage and show all elements or particular elemenents
4. Design a search page

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

document.addEventListener(
  'DOMContentLoaded',
  function () {
    showAllEntries();
  },
  { once: true },
);

const inputField = document.querySelector('.header-input');

inputField.addEventListener('input', function () {
  search(inputField.value);
  console.log(inputField.value);
});

function createNewTableItem(song, author) {
  const tr = document.createElement('tr');
  const tdSong = document.createElement('td');
  tdSong.appendChild(document.createTextNode(song));
  const tdAuthor = document.createElement('td');
  tdAuthor.appendChild(document.createTextNode(author));
  tr.append(tdSong, tdAuthor);
  document.querySelector('.search-body').appendChild(tr);
}
function removeAllEntries() {
  document.querySelector('.search-body').innerHTML = '';
}
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
