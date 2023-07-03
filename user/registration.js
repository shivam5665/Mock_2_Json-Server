document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
  
    registrationForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get form values
      const name = document.getElementById('name').value;
      const age = parseInt(document.getElementById('age').value);
      const place = document.getElementById('place').value;
      const batchName = document.getElementById('batchName').value;
      const profession = document.getElementById('profession').value;
  
      // Create an object with the user details
      const user = {
        name: name,
        age: age,
        place: place,
        batch_name: batchName,
        profession: profession,
      };
  
      // Send the user data to the JSON server
      postUserData(user)
        .then(() => {
          // Show success message
          alert('Successfully registered!');
          // Reset the form
          registrationForm.reset();
        })
        .catch((error) => {
          console.error('Error registering user:', error);
          // Show error message
          alert('Registration failed. Please try again later.');
        });
    });
  });
  
  async function postUserData(userData) {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('User data posted successfully:', data);
    } catch (error) {
      console.error('Error posting user data:', error);
      throw error;
    }
  }
  