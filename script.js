document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.Student-form');
    const tableBody = document.querySelector('table tbody');
    let editIndex = null;
    
    const loadTable = () => {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    tableBody.innerHTML = students.map((student, index) => `
    <tr data-index="${index}">
    <td data-label="Name">${student.name}</td>
    <td data-label="Username">${student.username}</td>
    <td data-label="Email">${student.email}</td>
    <td data-label="Phone">${student.phone}</td>
    <td data-label="Gender">${student.gender}</td>
    <td data-label="Image"><img src="${student.image}" alt="Student Image"></td>
    <td>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    </td>
    </tr>
    `).join('');
    };
    
    loadTable();
    
    form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;
    const image = document.getElementById('image').files[0]
    ? URL.createObjectURL(document.getElementById('image').files[0])
    : 'https://via.placeholder.com/50';
    
    if (!name || !username || !email || !phone || !gender) {
    alert('Please fill in all required fields.');
    return;
    }
    
    const student = { name, username, email, phone, gender, image };
    const students = JSON.parse(localStorage.getItem('students')) || [];
    
    if (editIndex !== null) {
    students[editIndex] = student;
    editIndex = null;
    } else {
    students.push(student);
    }
    
    localStorage.setItem('students', JSON.stringify(students));
    form.reset();
    loadTable();
    });
    
    tableBody.addEventListener('click', function(event) {
    const row = event.target.closest('tr');
    const index = row.dataset.index;
    const students = JSON.parse(localStorage.getItem('students')) || [];
    
    if (event.target.classList.contains('delete-btn')) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadTable();
    }
    
    if (event.target.classList.contains('edit-btn')) {
    const student = students[index];
    document.getElementById('name').value =
    document.getElementById('username').value = student.username;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone;
    document.getElementById('gender').value = student.gender;
    document.getElementById('image').value = '';
    editIndex = index;
    }
    });
    });
    
    
    
    
    
    
    
    