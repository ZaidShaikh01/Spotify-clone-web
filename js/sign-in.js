document
  .querySelector('.hero-body-sign-up-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let username = document.querySelector(
      '.hero-body-sign-up-form-email-input',
    ).value;
    let password = document.querySelector(
      '.hero-body-sign-up-form-password-input',
    ).value;

    if (localStorage.getItem(username)) {
      alert('This username is already taken, Try another One');
      return;
    }

    localStorage.setItem(username, password);
    alert('user registered in successfully');

    window.location.href = 'index.html';
  });
