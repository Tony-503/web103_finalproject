document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");

  const setActiveLink = () => {
    const current = location.pathname.split("/").pop() || "index.html";
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === current) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  };

  setActiveLink();

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login form submitted. Connect this to your backend later.");
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = document.getElementById("password")?.value || "";
      const confirmPassword = document.getElementById("confirm-password")?.value || "";

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      alert("Sign up form submitted. Connect this to your backend later.");
    });
  }
});
