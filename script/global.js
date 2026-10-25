const hamburger = document.getElementById('hamburger');
const navTabs = document.getElementById('nav-tabs');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navTabs.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("instagram-popup");
  const closeBtn = document.getElementById("close-popup");

  // Check if the user has visited before
  if (!localStorage.getItem("instagramPopupShown")) {
    // Show the popup after a brief delay (e.g., 1 second)
    setTimeout(() => {
      popup.style.display = "flex";
    }, 1000);
  }

  // Close the popup when the 'X' is clicked and save state to localStorage
  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
    localStorage.setItem("instagramPopupShown", "true");
  });

  // Optional: Close if the user clicks outside the modal box
  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
      localStorage.setItem("instagramPopupShown", "true");
    }
  });
});