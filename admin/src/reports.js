document.addEventListener('DOMContentLoaded', function () {
    
    fetchEventReports();
  });
  
  async function fetchEventReports() {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
  
     
      const eventReportsDiv = document.getElementById('eventReports');
      eventReportsDiv.innerHTML = ''; 
  
      const totalGuests = data.length;
      const totalStudents = data.filter((user) => user.profession === 'Student').length;
      const totalProfessionals = data.filter((user) => user.profession !== 'Student').length;
      const totalAge = data.reduce((sum, user) => sum + user.age, 0);
      const averageAge = totalGuests > 0 ? Math.round(totalAge / totalGuests) : 0;
  
      const table = document.createElement('table');
      table.innerHTML = `
        <tr>
          <td>Total number of guests attending:</td>
          <td>${totalGuests}</td>
        </tr>
        <tr>
          <td>Number of students attending:</td>
          <td>${totalStudents}</td>
        </tr>
        <tr>
          <td>Number of working professionals attending:</td>
          <td>${totalProfessionals}</td>
        </tr>
        <tr>
          <td>Average age of people attending:</td>
          <td>${averageAge}</td>
        </tr>
      `;
  
      eventReportsDiv.appendChild(table);
    } catch (error) {
      console.error('Error fetching event reports:', error);
    }
  }
  