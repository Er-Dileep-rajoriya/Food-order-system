let menu = [];
let itemSection = document.getElementById("item-section");

async function getMenu() {
  const response = await fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  );
  const data = await response.json();

  // Loop through the data array and create the HTML structure for each item
  data.forEach((item) => {
    // Create a new div element for the item
    const newItem = document.createElement("div");
    newItem.className = "item"; // Add the class name

    // Add inner HTML for the new item
    newItem.innerHTML = `
        <div class='top'>
        <img
        src="${item.imgSrc}"
        alt="${item.name}"
      />
        </div>
      <div class="bottom">
        <div class="item-detail">
          <p class="item-name">${item.name}</p>
          <small class="item-price">$${item.price}/-</small>
        </div>
        <div class="plus">
          <span>+</span>
        </div>
      </div>
    `;

    // Append the newly created item to the itemSection
    itemSection.appendChild(newItem);
  });

  // Push the data to the menu array
  menu.push(...data); // Spread the data into the array
  console.log(menu); // Log the menu after it's updated
}

getMenu();

let order = [];

// 2. Take Order: Simulate placing an order by randomly selecting 3 burgers
function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const selectedItems = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * menu.length);
        selectedItems.push(menu[randomIndex]);
      }
      resolve(selectedItems);
    }, 2500);
  });
}

// 3. Order Preparation: Simulate preparing the order
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// 4. Pay Order: Simulate paying for the order
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

// 5. Thank You: Display a thank you message after payment
function thankyouFnc() {
  alert(`Thank you for your order!`);
}

// Function to execute the complete order process
async function placeOrder() {
  // Load menu items
  await getMenu();

  // Take order and display it
  const orderedItems = await takeOrder();
  order = orderedItems;
  console.log("Your Order:");
  orderedItems.forEach((item) => {
    const orderItem = document.createElement("p");
    orderItem.innerText = `${item.name} - $${item.price}`;
    // orderStatus.appendChild(orderItem);
  });

  // Prepare order
  const prepStatus = await orderPrep();
  if (prepStatus.order_status) {
    console.log("Order is being prepared...");
  }

  // Pay for order
  const paymentStatus = await payOrder();
  if (paymentStatus.paid) {
    console.log("Order has been paid.");
    thankyouFnc();
  }
}

// Call the function to place an order
placeOrder();
