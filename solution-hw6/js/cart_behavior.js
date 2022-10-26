// Initialize by creating an empty array

let cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// retrieve from local storage

if (localStorage.getItem('storedCart') != null) {
    retrieveFromLocalStorage();
}

console.log(cart);

function retrieveFromLocalStorage() {
    const cartString = localStorage.getItem('storedCart');
    const cartArray = JSON.parse(cartString);
    for (const cartItem of cartArray) {
        const newItem = new Roll(
            cartItem.type,
            cartItem.glazing,
            Number(cartItem.size),
            Number(cartItem.basePrice)
        )
        console.log('retrieved' + newItem);
        cart.push(newItem);
    }
}

function saveToLocalStorage() {
    const cartString = JSON.stringify(cart);
    localStorage.setItem('storedCart', cartString);
}


// Display cart items

repopulateCart();

function repopulateCart(){
    // Clears existing cart items and remap current array index to each remove button
    const cartContainerElement = document.querySelector('.item_container');
    cartContainerElement.innerHTML = '';
    for (let i = 0; i < cart.length; i++) {
        createCartItem(cart[i], i);
    }
    updateTotalPrice();
}

function createCartItem(item, index) {

    // make a clone of the template
    const template = document.querySelector('#cart_item_template');
    const clone = template.content.cloneNode(true);
    item.element = clone.querySelector('.cart_item');

    // add interaction to remove button
    const removeButton = item.element.querySelector('.remove_button');
    removeButton.addEventListener('click', () => {
        deleteCartItem(item, index);
        console.log('item #' + index + ' removed');
        saveToLocalStorage();
    });
    
    updateCartItem(item);

    // prepend to parent element
    const cartContainerElement = document.querySelector('.item_container');
    cartContainerElement.append(item.element);
  }
  
function updateCartItem(item) {
    const productImageElement = item.element.querySelector('.product_image');
    const productNameElement = item.element.querySelector('.product_name');
    const productGlazingElement = item.element.querySelector('.product_glazing');
    const productPackSizeElement = item.element.querySelector('.product_pack_size');
    const productPrice = item.element.querySelector('#product_price');

    productImageElement.src = './product_images/' + rolls[item.type]["imageFile"];
    productNameElement.innerText = item.type + ' Cinnamon Roll';
    productGlazingElement.innerText = 'Glazing: ' + item.glazing;
    productPackSizeElement.innerText = 'Pack Size: ' + item.size;
    console.log(item.size);
    itemPrice = calculatePrice(item);
    productPrice.innerText = '$ ' + String(itemPrice);

  }

function calculatePrice(item) {
    let price = (item.basePrice + glazings[item.glazing]) * packSizes[item.size];
    let price_rounded = price.toFixed(2);
    return price_rounded;
}

function updateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        itemPrice = calculatePrice(cart[i]);
        totalPrice = Number(itemPrice) + Number(totalPrice);
        totalPrice = totalPrice.toFixed(2);
    }
    totalPriceElement = document.querySelector('#total_price');
    totalPriceElement.innerText = '$ ' + totalPrice;
}

function deleteCartItem(item, index) {
    cart.splice(index, 1);
    item.element.remove();
    updateTotalPrice();
    console.log(cart);
    repopulateCart();
  }

