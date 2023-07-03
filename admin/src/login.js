




document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      adminLogin(username, password)
        .then(() => {
          
          window.location.href = 'data.html';
        })
        .catch((error) => {
          console.error('Error during admin login:', error);
          
          alert('Login failed. Please check your credentials and try again.');
        });
    });
  });
  
  async function adminLogin(username, password) {
    try {
      
        const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Admin logged in successfully:', data);
    } catch (error) {
      console.error('Error during admin login:', error);
      throw error;
    }
  }
  