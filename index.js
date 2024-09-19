// DOM Elements
const registrationForm = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const termsCheckbox = document.getElementById("acceptTerms");
const registrationTable = document.querySelector("#content table");

// Data Management
let registrations = [];

// Load saved registrations
function loadRegistrations() {
  const savedData = localStorage.getItem("registrations");
  registrations = savedData ? JSON.parse(savedData) : [];
}

// Save registrations to local storage
function saveRegistrations() {
  localStorage.setItem("registrations", JSON.stringify(registrations));
}

// Validate age (18-55 years)
function isValidAge(birthDate) {
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18 && age <= 55;
}

// Handle form submission
function handleRegistration(event) {
  event.preventDefault();

  const birthDate = new Date(dobInput.value);

  if (!isValidAge(birthDate)) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const newRegistration = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    dob: dobInput.value,
    agreedToTerms: termsCheckbox.checked,
  };

  registrations.push(newRegistration);
  saveRegistrations();
  updateRegistrationTable();
  registrationForm.reset();
}

// Update the registration table
function updateRegistrationTable() {
  registrationTable.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Date of Birth</th>
        <th>Agreed to Terms</th>
      </tr>
    </thead>
    <tbody>
      ${registrations
        .map(
          (registration) => `
        <tr>
          <td>${registration.name}</td>
          <td>${registration.email}</td>
          <td>${registration.password}</td>
          <td>${registration.dob}</td>
          <td>${registration.agreedToTerms ? "Yes" : "No"}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;
}

// Initialize
loadRegistrations();
updateRegistrationTable();
registrationForm.addEventListener("submit", handleRegistration);
