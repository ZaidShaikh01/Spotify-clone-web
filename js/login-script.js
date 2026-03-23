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

    let storedPassword = localStorage.getItem(username);

    if (storedPassword === null) {
      alert('User Not Registered');
    } else {
      if (password === storedPassword) {
        alert('User Logged in successfully !!');
        window.location.href = 'index.html';
      } else {
        alert('Invalid password');
        return;
      }
    }
  });
