
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

// Cart information
let cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

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

