const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

let orders = [];

// order endpoint
app.post("/order", (req, res) => {
  const { name, email, product, quantity, address } = req.body;

  const order = {
    name,
    email,
    product,
    quantity,
    address,
    orderId: orders.length + 1, // auto id Increasing :)
  };

  // Store the orders 
  orders.push(order);

  res.status(200).json({
    message: "Order received successfully!",
    orderDetails: order,
  });
});


app.get("/order", (req, res) => {
 
  // display data in DOM
  let orderListHtml = "<h1>Customer Orders</h1>";

  if (orders.length > 0) {
    orderListHtml += "<ul>";
    orders.forEach((order) => {
      orderListHtml += `
                <li>
                    <strong>Order ID:</strong> ${order.orderId}<br>
                    <strong>Name:</strong> ${order.name}<br>
                    <strong>Email:</strong> ${order.email}<br>
                    <strong>Product:</strong> ${order.product}<br>
                    <strong>Quantity:</strong> ${order.quantity}<br>
                    <strong>Address:</strong> ${order.address}<br>
                    <hr>
                </li>
            `;
    });
    orderListHtml += "</ul>";
  } else {
    orderListHtml += "<p>No orders placed yet.</p>";
  }

  res.send(orderListHtml);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
