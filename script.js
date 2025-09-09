// =========================
//  DATABASE & CREDENTIALS
// =========================
let staffDB = []; // Staff list: {username, password}
let admin = {username: "admin", password: "admin123"};

// =========================
//  LOGIN LOGIC
// =========================
document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if(username && password && role){
        document.querySelector('.login-container').style.display = 'none';
        
        if(role === "admin"){
            if(username === admin.username && password === admin.password){
                showAdminDashboard();
            } else {
                alert("Invalid Admin credentials!");
                location.reload();
            }
        } else if(role === "staff"){
            let staff = staffDB.find(s => s.username === username && s.password === password);
            if(staff){
                showStaffDashboard(username);
            } else {
                alert("Invalid Staff credentials!");
                location.reload();
            }
        }
    } else {
        alert("Please fill all fields");
    }
});

// =========================
//  FORGOT ADMIN PASSWORD
// =========================
document.getElementById('forgotPassword').addEventListener('click', function(e){
    e.preventDefault();

    let role = document.getElementById('role').value;
    if(role !== "admin"){
        alert("Password reset is only for Admin. Please select 'Admin' role first.");
        return;
    }

    let answer = prompt("Enter new Admin password:");
    if(!answer) return alert("Cancelled");

    admin.password = answer;
    alert("Admin password updated successfully!");
});

// =========================
//  ADMIN DASHBOARD
// =========================
function showAdminDashboard(){
    const container = document.createElement('div');
    container.classList.add('dashboard-container');
    container.innerHTML = `
        <h1>Admin Dashboard</h1>
        <button onclick="addStaff()">Add Staff</button>
        <button onclick="editStaff()">Edit Staff Password</button>
        <button onclick="showStaffList()">View Staff List</button>
        <button onclick="resetAdminPassword()">Reset Admin Password</button>
        <button onclick="location.reload()">Logout</button>
    `;
    document.body.appendChild(container);
}

// Add Staff
function addStaff(){
    let username = prompt("Enter Staff Username:");
    if(!username) return alert("Cancelled");
    
    let password = prompt("Enter Staff Password:");
    if(!password) return alert("Cancelled");
    
    staffDB.push({username: username, password: password});
    alert(`Staff ${username} added successfully!`);
}

// Edit Staff Password
function editStaff(){
    let username = prompt("Enter Staff Username to Edit:");
    let staff = staffDB.find(s => s.username === username);
    if(!staff) return alert("Staff not found!");
    
    let newPassword = prompt(`Enter new password for ${username}:`);
    if(!newPassword) return alert("Cancelled");
    
    staff.password = newPassword;
    alert(`Password updated for ${username}`);
}

// View Staff List
function showStaffList(){
    let listHTML = "<h3>Staff List:</h3><ul>";
    staffDB.forEach(s => listHTML += `<li>${s.username}</li>`);
    listHTML += "</ul>";
    document.querySelector('.dashboard-container').innerHTML += listHTML;
}

// Reset Admin Password
function resetAdminPassword(){
    let newPass = prompt("Enter new Admin Password:");
    if(!newPass) return alert("Cancelled");
    
    admin.password = newPass;
    alert("Admin password updated successfully!");
}

// =========================
//  STAFF DASHBOARD
// =========================
function showStaffDashboard(username){
    const container = document.createElement('div');
    container.classList.add('dashboard-container');
    container.innerHTML = `
        <h1>Staff Dashboard (${username})</h1>
        <button onclick="punchAttendance()">Punch Attendance</button>
        <button onclick="punchWithLocation()">Punch Attendance with Location</button>
        <button onclick="location.reload()">Logout</button>
    `;
    document.body.appendChild(container);
}

// Punch Attendance (Face Recognition Placeholder)
function punchAttendance(){
    alert("Face Recognition & Attendance Punch feature coming soon!");
}

// Punch Attendance with Location
function punchWithLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            alert(`Location captured:\nLatitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`);
        });
    } else {
        alert("Geolocation not supported by your browser.");
    }
}
