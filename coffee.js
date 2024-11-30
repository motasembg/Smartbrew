let header = document.querySelector("header");
let menuBtn = document.getElementById("menu-btn");
let closeBtn = document.getElementById("close-menu-btn");
let orderNow = document.getElementById("orderNow");
let orderFormModal = document.getElementById("orderFormModal");
let closeModal = document.getElementById("closeModal");
let confirmationMessage = document.getElementById("confirmationMessage");
const orderForm = document.getElementById('orderFormData');

menuBtn.addEventListener("click", () => {
  header.classList.toggle("show-menu-hum");
});

closeBtn.addEventListener("click", () => {
    header.classList.remove("show-menu-hum");
    header.classList.toggle("close-menu-hum");
});

orderForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  // Get data
  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      product: document.getElementById('product').value,
      quantity: document.getElementById('quantity').value,
      address: document.getElementById('address').value
  };

  // Send data to backend
  fetch('http://localhost:3000/order', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // JSON
  })
  .then(response => response.json()) // JSON response
  .then(data => {
    // show order
      const { name, product, quantity, address, email } = data;
      const confirmationHTML = `
          <h3>Order Confirmation</h3>
          <p>Thank you, ${formData.name}!</p>
          <p>You have ordered ${formData.quantity} x ${formData.product}.</p>
          <p>We will deliver it to: ${formData.address}</p>
          <p>We will contact you at: ${formData.email}</p>
      `;
      document.getElementById("orderFormData").innerHTML = ""
      confirmationMessage.innerHTML = confirmationHTML;
  })
  .catch((error) => {
      console.error('Error:', error);
      // error handle
      confirmationMessage.innerHTML = "<p>Something went wrong, please try again later.</p>";
  });
});