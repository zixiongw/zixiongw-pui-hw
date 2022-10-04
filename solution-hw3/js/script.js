// Creating arrays of options for select elements

const allGlazings = [
    {name: 'Keep original', price: 0,},
    {name: 'Sugar milk', price: 0,},
    {name: 'Vanilla milk', price: 0.50,},
    {name: 'Double chocolate', price: 1.50,}
];

const allPackSizes = [
    {name: '1', price: 1,},
    {name: '3', price: 3,},
    {name: '6', price: 6,},
    {name: '12', price: 12,} 
];

function populateOptions(selectElement, optionArray) {
    for (let i = 0; i < optionArray.length; i++) {
        let option = document.createElement('option');
        option.text = optionArray[i].name;
        option.value = optionArray[i].price; 
        selectElement.add(option);
    }
}

// Populating dropdown fields with created arrays 

let dropdown1 = document.querySelector('#glazing');
let dropdown2 = document.querySelector('#pack_size');

populateOptions(dropdown1, allGlazings);
populateOptions(dropdown2, allPackSizes);

// Computing the price

const basePrice = 2.49;
let glazingPrice = 0;
let packSize = 1;

function updatePrice() {
    let price = (basePrice + glazingPrice) * packSize;
    console.log(price, glazingPrice, packSize);
    let price_rounded = price.toFixed(2);
    let realtimePriceElement = document.querySelector('#realtime_price');
    realtimePriceElement.innerText = '$ ' + String(price_rounded);
}

// Update price when changing selections

dropdown1.addEventListener('change', glazingChange);
dropdown2.addEventListener('change', packSizeChange);

function glazingChange() {
    glazingPrice = Number(this.value);
    updatePrice();
    console.log('You selected ' + this.value);
}

function packSizeChange() {
    packSize = Number(this.value);
    updatePrice();
    console.log('You selected ' + this.value);
}

// Initial state

updatePrice();