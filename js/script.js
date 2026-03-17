const filters = document.querySelector('.content-area-content-filters');

window.addEventListener('scroll', function () {
  
  if (window.scrollY > 100) {
    filters.classList.add('scroll');
  } else {
    filters.classList.remove('scroll');
  }
});
