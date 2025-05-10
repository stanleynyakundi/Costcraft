// script.js
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

function toggleHamburger() {
  navMenu.classList.toggle("show");
}

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    dropdownElement.classList.toggle("active");
    dropdown.forEach((drop) => {
      if (drop.id !== btn.dataset["dropdown"]) {
        drop.classList.remove("active");
      }
    });
    e.stopPropagation();
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});

hamburgerBtn.addEventListener("click", toggleHamburger);
document.addEventListener('DOMContentLoaded', (event) => {
  // Get the modals
  var createAccountModal = document.getElementById("createAccountModal");
  var loginModal = document.getElementById("loginModal");

  // Get the buttons that open the modals
  var btn = document.querySelector(".btn.btn-primary");

  // Get the <span> elements that close the modals
  var closeButtons = document.getElementsByClassName("close");

  // Get the links to switch between modals
  var loginLink = document.getElementById("loginLink");
  var createAccountLink = document.getElementById("createAccountLink");

  // When the user clicks the button, open the create account modal
  btn.onclick = function() {
    createAccountModal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
      createAccountModal.style.display = "none";
      loginModal.style.display = "none";
    }
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == createAccountModal) {
      createAccountModal.style.display = "none";
    } else if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
  }

  // Switch to login modal
  loginLink.onclick = function(event) {
    event.preventDefault();
    createAccountModal.style.display = "none";
    loginModal.style.display = "block";
  }

  // Switch to create account modal
  createAccountLink.onclick = function(event) {
    event.preventDefault();
    loginModal.style.display = "none";
    createAccountModal.style.display = "block";
  }

  // Handle create account form submission
  var createAccountForm = document.getElementById("createAccountForm");
  createAccountForm.onsubmit = function(event) {
    event.preventDefault();
    // Add your form submission logic here
    alert("Account created successfully!");
    createAccountModal.style.display = "none";
  }

  // Handle login form submission
  var loginForm = document.getElementById("loginForm");
  loginForm.onsubmit = function(event) {
    event.preventDefault();
    // Add your form submission logic here
    alert("Logged in successfully!");
    loginModal.style.display = "none";
  }
});

document.addEventListener('DOMContentLoaded', function () {
  console.log("Materials Prices Script Loaded and DOM is Ready");

  // Sample data based on the Integrum Construction website
  const materialsData = [
      { material: 'Site Clearance', unit: 'per Square Metre', price: 70 },
      { material: '150mm Deep Excavation', unit: 'per Square Metre', price: 90 },
      { material: 'Manual Bulk Excavation', unit: 'per Cubic Metre', price: 275 },
      { material: '50mm Thick Sand Blinding', unit: 'per Square Metre', price: 110 },
      { material: '100mm Thick Hardcore Filling', unit: 'per Square Metre', price: 200 },
      { material: '300mm Thick Hardcore Filling', unit: 'per Square Metre', price: 600 },
      { material: 'Murram Filling', unit: 'per Cubic Metre', price: 360 },
      { material: 'Anti-Termite Treatment', unit: 'per Square Metre', price: 90 },
      { material: '50mm Plain Concrete Blinding', unit: 'per Square Metre', price: 200 },
      { material: 'Sawn Formwork to Sides of Strip Foundations', unit: 'per Square Metre', price: 400 },
      { material: 'Sawn Formwork to Sides of Ground Beams', unit: 'per Square Metre', price: 400 },
      { material: 'Y8 Bars', unit: 'per Kilogramme', price: 120 },
      { material: 'Y10 Bars', unit: 'per Kilogramme', price: 120 },
      { material: 'Y12 Bars', unit: 'per Kilogramme', price: 120 },
      { material: 'Y16 Bars', unit: 'per Kilogramme', price: 120 },
      { material: 'Y20 Bars', unit: 'per Kilogramme', price: 120 },
      { material: 'Y25 Bars', unit: 'per Kilogramme', price: 120 },
      { material: 'Y32 Bars', unit: 'per Kilogramme', price: 120 },
      { material: 'D8 Bars', unit: 'per Kilogramme', price: 120 },
      { material: '25mm Thick Asphalt Damp Proof Course', unit: 'per Square Metre', price: 400 },
      { material: '3-Ply Bituminous Felt Damp Proof Membrane', unit: 'per Square Metre', price: 400 },
      { material: '100mm Thick Quarry Stones', unit: 'per Square Metre', price: 800 },
      { material: '150mm Thick Quarry Stones', unit: 'per Square Metre', price: 1000 },
      { material: '200mm Thick Quarry Stones', unit: 'per Square Metre', price: 1200 },
      { material: 'Ordinary Portland Cement', unit: 'per 50kg Bag', price: 650 },
      { material: 'River Sand', unit: 'per Tonne', price: 2000 },
      { material: 'Machine Cut Stones', unit: 'per Piece', price: 50 },
      { material: 'Hardcore', unit: 'per Tonne', price: 2000 },
      { material: 'Ballast', unit: 'per Tonne', price: 2500 },
      { material: 'Steel Reinforcement (D8 - D32)', unit: 'per Tonne', price: 120000 },
      { material: 'BRC Mesh Reinforcement', unit: 'per Roll', price: 25000 },
      { material: 'Ordinary Glass Window Pane', unit: 'per Square Metre', price: 1000 },
      { material: 'Steel Casement Windows', unit: 'per Square Metre', price: 6000 },
      { material: 'Timber Doors (Mahogany)', unit: 'per Square Metre', price: 8000 },
      { material: 'PVC Floor Tiles', unit: 'per Square Metre', price: 1500 },
      { material: 'Ceramic Wall Tiles', unit: 'per Square Metre', price: 2000 },
      { material: 'Emulsion Paint', unit: 'per Litre', price: 300 },
      { material: 'Gloss Paint', unit: 'per Litre', price: 400 },
      { material: 'Plaster (Cement and Sand)', unit: 'per Square Metre', price: 350 },
      { material: 'Plumbing Pipes (PVC)', unit: 'per Metre', price: 200 },
      { material: 'Electrical Conduits (PVC)', unit: 'per Metre', price: 100 },
      { material: 'Roofing Sheets (Gauge 30)', unit: 'per Metre', price: 800 },
      { material: 'Roofing Nails', unit: 'per Kilogramme', price: 200 },
      { material: 'Ordinary Bolts and Nuts', unit: 'per Kilogramme', price: 250 },
      { material: 'Mild Steel Plates', unit: 'per Kilogramme', price: 150 },
      { material: 'Structural Steel I-Beams', unit: 'per Kilogramme', price: 120 },
      { material: 'PVC Gutters', unit: 'per Metre', price: 300 },
      { material: 'PVC Downpipes', unit: 'per Metre', price: 250 },
      { material: 'Waterproofing Membrane', unit: 'per Square Metre', price: 500 },
      { material: 'Bituminous Paint', unit: 'per Litre', price: 350 },
      { material: 'Aluminium Flashings', unit: 'per Metre', price: 600 },
      { material: 'Stainless Steel Handrails', unit: 'per Metre', price: 4000 },
      { material: 'Mild Steel Grilles', unit: 'per Square Metre', price: 3000 },
    { material: 'Gypsum Ceiling Boards', unit: 'per Square Metre', price: 150 }
]; // Add more materials as needed

const materialsTableBody = document.getElementById('materialsTable').querySelector('tbody');

  materialsData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.material}</td>
          <td>${item.unit}</td>
          <td>${item.price.toLocaleString()}</td>
      `;
      materialsTableBody.appendChild(row);
  });
console.log("Materials table populated successfully!");
});
