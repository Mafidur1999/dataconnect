async function fetchUsers() {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();
    displayUsers(data);
}

function displayUsers(users) {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.message}</td>
            <td>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userList.appendChild(tr);
    });
}

async function sendMessage() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;   

    const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },  
        body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
        fetchUsers();
    }
}

async function deleteUser(id) {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        fetchUsers();
    }
}       



fetchUsers();
