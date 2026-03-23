const searchContainer = document.querySelector('.search-container');

/*

Logic for implementing the local storage

1. Retrive all the elements from local storage (Done)
destructure the elements (Done)
2. Create an Element & add it to DOM
3. Iterate through local storage and show all elements or particular elemenents
4. Design a search page

*/

function createNewTableItem(song, author) {
  const tr = document.createElement('tr');
  const tdSong = document.createElement('td');
  tdSong.appendChild(document.createTextNode(song));
  const tdAuthor = document.createElement('td');
  tdAuthor.appendChild(document.createTextNode(author));
  tr.append(tdSong, tdAuthor);
  document.querySelector('.search-body').appendChild(tr);
}
for (let i = 0; i < localStorage.length - 1; i++) {
  const songName = localStorage.key(i);
  const author = localStorage.getItem(songName);

  if (songName.includes('@gmail.com')) {
    continue;
  } else {
    createNewTableItem(songName, author);
  }
}
