// Creating arrays of options for select elements

const allGlazings = ['Keep original', 'Sugar milk', 'Vanilla milk', 'Double Chocolate'];
const allPackSizes = [1, 3, 6, 12];

function populateOptions(selectElement, optionArray) {
    for (let i = 0; i < optionArray.length; i++) {
        let option = document.createElement('option');
        option.text = optionArray[i];
        option.value = optionArray[i]; 
        selectElement.add(option);
    }
}

// Populating dropdown fields with created arrays 

let dropdown1 = document.querySelector('#glazing');
let dropdown2 = document.querySelector('#pack_size');

populateOptions(dropdown1, allGlazings);
populateOptions(dropdown2, allPackSizes);



const basePrice = 2.49;
let glazingPrice = 0.5;
let packSize = 1;

function updatePrice(price) {
    let price_rounded = price.toFixed(2);
    let realtimePriceElement = document.querySelector('#realtime_price');
    realtimePriceElement.innerText = '$ ' + String(price_rounded);
}

// function glazingChange()

// function packSizeChange()

let finalPrice = (basePrice + glazingPrice) * packSize;
updatePrice(4.99);