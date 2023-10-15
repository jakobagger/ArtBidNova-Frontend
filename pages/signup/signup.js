import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";

export async function initSignup() {
  document.getElementById("signup-form").addEventListener("submit", signUp);
}

async function signUp(){
  event.preventDefault();
  
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  
  const payload = {
    username: username,
    password: password,
    email: email
  };
  
  try {
    const response = await fetch(`${API_URL}/members`, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Access-Control-Request-Headers":
        "content-type",
        "Access-Control-Request-Method":
        "POST",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Signup successful", data);
    } else {
      const errorData = await response.json();
      console.log("Signup failed", errorData);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
