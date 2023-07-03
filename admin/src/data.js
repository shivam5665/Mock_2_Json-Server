document.addEventListener('DOMContentLoaded', function () {
    
    fetchUserData();
  
    
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', function () {
      fetchUserData(this.value);
    });
  
    
    const filterSelect = document.getElementById('filterSelect');
    filterSelect.addEventListener('change', function () {
      fetchUserData(null, this.value);
    });
  
   
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
      fetchUserData(null, null, this.value);
    });
  });
  
  async function fetchUserData(sortBy, filterBy, searchValue) {
    try {
      let url = 'http://localhost:3000/users';
  
      if (sortBy) {
        url += `?_sort=${sortBy}`;
      }
  
      if (filterBy) {
        url += sortBy ? `&profession=${filterBy}` : `?profession=${filterBy}`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
  
      
      const filteredData = data.filter((user) =>
        searchValue ? user.name.toLowerCase().includes(searchValue.toLowerCase()) : true
      );
  
      
      const userDataDiv = document.getElementById('userData');
      userDataDiv.innerHTML = ''; 
  
      filteredData.forEach((user) => {
        const card = createUserCard(user);
        userDataDiv.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  function createUserCard(user) {
    
    const card = document.createElement('div');
    card.classList.add('user-card');
    const img_card = document.createElement('div')
    const user_img = document.createElement('img');
    user_img.src = './user.png';
    img_card.append(user_img)
    const name = document.createElement('h3');
    name.textContent = `Name: ${user.name}`;
  
    const age = document.createElement('p');
    age.textContent = `Age: ${user.age}`;
  
    const place = document.createElement('p');
    place.textContent = `Place: ${user.place}`;
  
    const batchName = document.createElement('p');
    batchName.textContent = `Batch Name: ${user.batch_name}`;
  
    const profession = document.createElement('p');
    profession.textContent = `Profession: ${user.profession}`;
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editUser(user.id));
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteUser(user.id));
    card.append(name,age,place,batchName,profession,editButton,deleteButton)
    const p_card = document.createElement('div');
    p_card.style.display = "flex"
    p_card.style.boxShadow =  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px';
    p_card.append(img_card,card)

    
  
    return p_card;
  }
  
  function editUser(userId) {
    const newName = prompt('Enter new name:');
    if (newName !== null && newName !== '') {
      const newAge = parseInt(prompt('Enter new age:'));
      const newPlace = prompt('Enter new place:');
      const newBatchName = prompt('Enter new batch name:');
      const newProfession = prompt('Enter new profession:');
  
      const updatedUser = {
        name: newName,
        age: newAge,
        place: newPlace,
        batch_name: newBatchName,
        profession: newProfession,
      };
  
      updateUser(userId, updatedUser);
    }
  }
  
  async function updateUser(userId, updatedUser) {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (response.ok) {
        alert('User details updated successfully!');
        fetchUserData();
      } else {
        console.error('Error updating user details:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  }
  
  function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUserFromServer(userId);
    }
  }
  
  async function deleteUserFromServer(userId) {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('User deleted successfully!');
        fetchUserData();
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  