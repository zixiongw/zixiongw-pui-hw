// Initialize cart by creating an array

let cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const startingItem1 = new Roll(
    'Original',
    'Sugar milk',
    1,
    rolls['Original']['basePrice']
)
const startingItem2 = new Roll(
    'Walnut',
    'Vanilla milk',
    12,
    rolls['Walnut']['basePrice']
)
const startingItem3 = new Roll(
    'Raisin',
    'Sugar milk',
    3,
    rolls['Raisin']['basePrice']
)
const startingItem4 = new Roll(
    'Apple',
    'Keep original',
    3,
    rolls['Apple']['basePrice']
)

cart.push(startingItem1, startingItem2, startingItem3, startingItem4);
console.log(cart);

// Display cart items

for (let i = 0; i < cart.length; i++) {
    createCartItem(cart[i], i);
}
updateTotalPrice();

function createCartItem(item, index) {

    // make a clone of the template
    const template = document.querySelector('#cart_item_template');
    const clone = template.content.cloneNode(true);
    item.element = clone.querySelector('.cart_item');
    console.log(item);
    console.log(item.element);

    // add interaction to remove button
    const removeButton = item.element.querySelector('.remove_button');
    console.log(removeButton);
    removeButton.addEventListener('click', () => {
      deleteCartItem(item, index);
    });
    
    updateCartItem(item);

    // prepend to parent element
    const cartContainerElement = document.querySelector('.cart_container');
    cartContainerElement.prepend(item.element);
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
    itemPrice = calculatePrice(item);
    productPrice.innerText = '$ ' + String(itemPrice);

  }

function calculatePrice(item) {
    let price = (item.basePrice + glazings[item.glazing]) * packSizes[item.size];
    let price_rounded = price.toFixed(2);
    console.log(price_rounded);
    return price_rounded;
}

function updateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        itemPrice = calculatePrice(cart[i]);
        totalPrice = Number(itemPrice) + Number(totalPrice);
        console.log(totalPrice);
    }
    totalPriceElement = document.querySelector('#total_price');
    totalPriceElement.innerText = '$ ' + totalPrice;
}

function deleteCartItem(item, index) {
    cart.splice(index);
    item.element.remove();
    updateTotalPrice();
    console.log(cart);
  }

