document.addEventListener('DOMContentLoaded', function () {
    const adminButton = document.getElementById('adminButton');
    const userButton = document.getElementById('userButton');
  
    adminButton.addEventListener('click', function () {
      window.location.href = 'admin/login.html';
    });
  
    userButton.addEventListener('click', function () {
      window.location.href = './user/registration.html';
    });
  });
  