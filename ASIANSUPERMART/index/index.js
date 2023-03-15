// Fetch data from JSON to append products to HTML
fetch('/products')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const productGrid = document.getElementById('product-grid');
    data.forEach(product => {
      const card = document.createElement('div');
      card.innerHTML = `
                <div class="card h-100">
                <img class="card-img-top" src="${product.src}" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <h6>${product.cost}£</h6>
                </div>
                <div class="card-footer">
                    <button type="button" class="btn btn-primary add-to-cart">Add to Cart</button>
                </div>
                </div>
            `;
      // add an event listener 'click' to product grid that adds items to cart
      const addToCartButton = card.querySelector('.add-to-cart');
      addToCartButton.addEventListener('click', () => {
        addToCart(product.id, product.name, product.cost);
      });
      productGrid.appendChild(card);
    });
  })
  .catch(error => console.error(error));

let totalPrice = 0;
// function that adds and removes item from cart
function addToCart (productId, productName, productCost) {
  // select Cart Menu
  const cartMenu = document.getElementById('cart-menu');
  if (!cartMenu.cart) {
    cartMenu.cart = {};
  }

  let cartItem;

  if (cartMenu.cart[productId]) {
    // if cart already has product, increase quantity instead
    cartMenu.cart[productId].quantity++;
    cartMenu.cart[productId].totalcost += parseFloat(productCost);
    totalPrice += parseFloat(productCost);
    // change value in cart

    cartItem = document.getElementById(`cart-item-${productId}-${cartMenu.cart[productId].uniqueId}`);
    cartItem.querySelector('.cart-item-quantity').textContent = cartMenu.cart[productId].quantity;
  } else {
    const timestamp = Date.now();
    cartMenu.cart[productId] = {
      name: productName,
      quantity: 1,
      uniqueId: timestamp,
      totalcost: parseFloat(productCost)
    };

    // adds product to cartmenu
    const uniqueId = cartMenu.cart[productId].uniqueId;
    const cartItem = document.createElement('div');
    cartItem.id = `cart-item-${productId}-${uniqueId}`;
    cartItem.innerHTML = `${productName} <span class ="cart-item-quantity">1</span> <button type="button" class="btn btn-secondary btn-sm remove-from-cart">remove</button>`;
    cartMenu.appendChild(cartItem);

    totalPrice += parseFloat(productCost);
    document.getElementById('cart-cost').textContent = totalPrice;

    // removes from cart
    const removeFromCartButton = cartItem.querySelector('.remove-from-cart');
    removeFromCartButton.addEventListener('click', () => {
      const removeCartItem = cartItem;
      removeCartItem.remove();
      delete cartMenu.cart[productId];
    });
  }
}

function checkoutButton () {
  const cartData = document.getElementById('cart-menu');
  const cartDataArray = [];

  Array.from(cartData.children).forEach(cartProduct => {
    const productName = cartProduct.textContent.trim().split(' ')[0];
    const productQuantity = cartProduct.id.split('-')[2];

    if (!isNaN(productQuantity)) {
      cartDataArray.push({
        name: productName,
        quantity: productQuantity
      });
    }
  });
  const finalCartData = {
    cart: cartDataArray
  };
  console.log(JSON.stringify(finalCartData));

  const cartMenu = document.getElementById('cart-menu');
  cartMenu.innerHTML = '';
  cartMenu.cart = {};
  cartMenu.innerHTML = `<h3 id="shopping-cart">Shopping Cart:</h3>
        <button class="btn btn-primary" id="checkout-button">Checkout</button>`;

  fetch('/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartDataArray)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
document.addEventListener('DOMContentLoaded', () => {
  const checkOutButtonClick = document.getElementById('checkout-button');
  checkOutButtonClick.addEventListener('click', () => {
    checkoutButton();
  });
});
