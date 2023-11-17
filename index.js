let userForm = document.querySelector("form");
let userEntries = [];

// Retrieve existing entries from local storage on page load
const storedEntries = localStorage.getItem("user-entries");
userEntries = storedEntries ? JSON.parse(storedEntries) : [];

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const dob = document.querySelector("#dob").value;
    const acceptedtermsandConditions = document.querySelector("#acceptTerms").checked;

    // Add additional validation for dob
    const today = new Date();
    const dobDate = new Date(dob);
    const age = today.getFullYear() - dobDate.getFullYear();

    if (age < 18 || age > 55) {
        alert("Please enter a valid date of birth between 18 and 55 years.");
        return false;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedtermsandConditions
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    // Update the table after saving the form
    printTable();
};

// Function to print table
function printTable() {
    const table = document.querySelector("#content table");

    // Clear existing rows
    // table.innerHTML = "";

    // // Add header row
    // table.innerHTML += `

    //     <thead>
    //         <tr>
    //             <th>Name</th>
    //             <th>Email</th>
    //             <th>Password</th>
    //             <th>Dob</th>
    //             <th>Accepted terms?</th>
    //         </tr>
    //     </thead>
    // `;

    // Add data rows
    for (const entry of userEntries) {
        table.innerHTML += `
            <tr>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.acceptedtermsandConditions ? 'Yes' : 'No'}</td>
            </tr>
        `;
    }
}

// Call the function to print the table on page load
printTable();

// Event listener for form submission
userForm.addEventListener("submit", saveUserForm);
