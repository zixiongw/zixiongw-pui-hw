// Getting the URL parameter

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
console.log(rollType);

// Updating detail page based on parameter

const basePrice = rolls[rollType]['basePrice'];

const rollHeaderText = document.querySelector('#roll_header_text');
rollHeaderText.innerText = rollType + ' Cinnamon Roll';

const rollImage = document.querySelector('#product_detail_image');
rollImage.src = './product_images/' + rolls[rollType]['imageFile'];

// Creating arrays of options for select elements

const allGlazings = [
    {name: 'Keep original', price: '0',},
    {name: 'Sugar milk', price: '0',},
    {name: 'Vanilla milk', price: '0.50',},
    {name: 'Double chocolate', price: '1.50',}
];

const allPackSizes = [
    {name: '1', price: 1,},
    {name: '3', price: 3,},
    {name: '6', price: 5,},
    {name: '12', price: 10,} 
];

// Populating dropdown fields with created arrays 

function populateOptions(selectElement, optionArray) {
    for (let i = 0; i < optionArray.length; i++) {
        let option = document.createElement('option');
        option.text = optionArray[i].name;
        option.value = optionArray[i].price; 
        selectElement.add(option);
    }
}

const dropdown1 = document.querySelector('#glazing');
const dropdown2 = document.querySelector('#pack_size');

populateOptions(dropdown1, allGlazings);
populateOptions(dropdown2, allPackSizes);

// Computing the price

let glazingPrice = 0;
let packSize = 1;
let glazingName = dropdown1.options[dropdown1.selectedIndex].text;

function updatePrice() {
    let price = (basePrice + glazingPrice) * packSize;
    let price_rounded = price.toFixed(2);
    console.log(price_rounded, glazingPrice, packSize);
    let realtimePriceElement = document.querySelector('#realtime_price');
    realtimePriceElement.innerText = '$ ' + String(price_rounded);
}

// Update the price when changing selections

dropdown1.addEventListener('change', glazingChange);
dropdown2.addEventListener('change', packSizeChange);

function glazingChange() {
    glazingPrice = Number(this.value);
    glazingName = dropdown1.options[dropdown1.selectedIndex].text;
    updatePrice();
    console.log('You selected ' + glazingName);
}

function packSizeChange() {
    packSize = Number(this.value);
    updatePrice();
    console.log('You selected ' + this.value);
}

// Initial state
updatePrice();

// Creating roll class & four initial rolls in cart

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

let cart = [];

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


// Adding item to cart

const addButton = document.querySelector('#add_to_cart');

addButton.addEventListener('click', addItemToCart)

function addItemToCart() {
    const newItem = new Roll(
        rollType,
        glazingName,
        packSize,
        basePrice
    )
    cart.push(newItem);
    console.log(cart);
}

// Populating cart with items

function createCartItem(item) {
    // make a clone of the template
    const template = document.querySelector('#cart_item_template');
    const clone = template.content.cloneNode(true);
    
    // connect this clone to our notecard.element
    // from this point we only need to refer to notecard.element
    item.element = clone.querySelector('.item');
  
    const removeButton = notecard.element.querySelector('.remove_button');
    console.log(removeButton);
    removeButton.addEventListener('click', () => {
      deleteCartItem(item);
    });
    
    // add the notecard clone to the DOM
    // find the notecard parent (#notecard-list) and add our notecard as its child
    const cartContainerElement = document.querySelector('#cart_container');
    cartContainerElement.prepend(item.element);
    
    // populate the notecard clone with the actual notecard content
    updateElement(item);
  }
  
function updateCartItem(item) {
    // get the HTML elements that need updating
    const noteImageElement = notecard.element.querySelector('.notecard-thumbnail');
    const noteTitleElement = notecard.element.querySelector('.note-title');
    const noteBodyElement = notecard.element.querySelector('.note-body');
    
    // copy our notecard content over to the corresponding HTML elements
    noteImageElement.src = notecard.noteImageURL;
    noteTitleElement.innerText = notecard.noteTitle;
    noteBodyElement.innerText = notecard.noteBody;

    const productImageElement = item.element.querySelector('.product_image');
    const productNameElement = item.element.querySelector('.product_name');
    const productGlazingElement = item.element.querySelector('.product_glazing');
    const productPackSizeElement = item.element.querySelector('.product_pack_size');
    const productPrice = item.element.querySelector('#product_price');

    productImageElement.src = rolls[item.type][imageFile];
    productNameElement.innerText = item.type + ' Cinnamon Roll';
  }

function deleteCartItem(item) {
    // remove the notecard DOM object from the UI
    item.element.remove();
  
    // remove the actual Notecard object from our set of notecards
    notecardSet.delete(notecard);
  }

for (let i = 0; i < cart.length; i++) {
    createCartItem(cart[i]);
    console.log('created');
}
