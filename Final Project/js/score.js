const baseScore = 100;
let score = 0;
let totalScore = 0;

let bestScore = 0;
let currCityData = [];

let difficulty = 0;

bestScore = localStorage.getItem('storedBestScore');
console.log("Retrieved score:" + bestScore);

// Duplicates city data array
function readFromData(CityData) {
    for (i = 0; i < CityData.length; i++) {
        currCityData[i] = CityData[i];
    }
}


function reloadCities(cityList) {
    const currentCityElement = document.querySelector('.current_city_panel');
    currentCityElement.textContent = 'Current City: ' + cityList[0]['name'];

    const cityListElement = document.querySelector('.list_content');
    cityListElement.textContent = '';
    for (const city of cityList) {
        cityName = city['name'];
        addCity(cityName);
    } 
}

function calculateDistance(city) {
    // Get the latlng of the marker
    var latlng = markers[0].getPosition();

    // Get the latitude and longitude coordinates from the latlng object
    const playerLat = latlng.lat().toFixed(4);
    const playerLng = latlng.lng().toFixed(4);
    console.log('Marker Latitude: ' + playerLat + ', Longitude: ' + playerLng);

    const correctLat = city['lat'];
    const correctLng = city['lng'];
    var latDist = (playerLat - correctLat)*111
    var lngDist = (playerLng - correctLng)*77
    // Different factors due to distortion of Earth's surface
    // Taking an approximate value for longitudinal distance conversion here 
    var dist = Math.sqrt(latDist**2 + lngDist**2).toFixed(4);
    dist = Math.round(dist);
    console.log('Distance:' + dist);
    return dist
}

function calculateScore(dist) {
    let scoreFactor = Math.min(Math.sqrt(20/dist), 1);
    let finalScore = Math.round(baseScore * scoreFactor);
    score = finalScore;
    totalScore += score;
}

function addCity(name) {
    const template = document.querySelector('#list_item_template');
    const clone = template.content.cloneNode(true);
    const newElement = clone.querySelector('.list_item');
    newElement.innerText = name;
    const cityListElement = document.querySelector('.list_content');
    cityListElement.append(newElement);
}

// Ask for confirmation
function confirmChoice() {
    console.log("confirmed!");
    showResult();
}

function cancelChoice() {
    console.log("cancelled!");
    clearMarkers();
    markers = [];
    hideConfirmationPanel();
}


// Calculate result, show user-end panel and update city list
function showResult() {
    // calculateDistance();
    showResultPanel();
    hideConfirmationPanel();
    updateScoreBoard();
    currCityData.shift();
    reloadCities(currCityData);
}

function updateScoreBoard() {
    const board = document.querySelector('.scoreboard');
    const totalScoreElement = board.querySelector('.total_score');

    const template = board.querySelector('#score_item_template');
    const clone = template.content.cloneNode(true);
    const newElement = clone.querySelector('.score_item');
    newElement.innerText = currCityData[0]['name'] + ': ' + score;

    const scoreListElement = board.querySelector('.score_list');
    scoreListElement.append(newElement);
    totalScoreElement.innerText = 'Total Score: ' + totalScore;
}

function showResultPanel() {
    city = currCityData[0]
    const panel = document.querySelector('.result_panel');
    panel.style.display = "block";

    const cityInfo = panel.querySelector('.result_city_info');
    const distanceElement = panel.querySelector('.result_distance');
    const scoreElement = panel.querySelector('.result_score');
    const linkElement = panel.querySelector('a');
    const dist = calculateDistance(city);
    calculateScore(dist);

    cityInfo.innerHTML = city['name'] + ', ' + city['country'];
    distanceElement.innerHTML = 'Your guess was ' + dist + 'km away!';
    scoreElement.innerHTML = 'Score: ' + score;
    linkElement.setAttribute("href", "https://en.wikipedia.org/wiki/" + city['name']);
}

function hideResultPanel() {
    const panel = document.querySelector('.result_panel');
    panel.style.display = "none";
    // const cityList = currCityData;
    // const currentCityElement = document.querySelector('.current_city_panel');
    // currentCityElement.textContent = 'Current City: ' + cityList[0]['name'];
}

// Start a new round of guess
function goToNextGuess() {
    hideResultPanel();
    clearMarkers();
    markers = [];
    if (currCityData.length == 0) {
        showSummary();
    }
}

// Game end
function showSummary() {
    const summary = document.querySelector('.summary_panel')
    summary.style.display = "flex";

    const totalElement = summary.querySelector('.result_score')
    const avgElement = summary.querySelector('#avg_score')
    totalElement.innerHTML = "Your total score: " + totalScore;
    avgElement.innerHTML = "Average score per city: " + Math.round(totalScore/cityData1.length);
}

function restartGame() {
    // reloads city list
    const summary = document.querySelector('.summary_panel');
    summary.style.display = "none";
    if (difficulty == 0) {
        readFromData(cityData1);
    }
    else {
        readFromData(cityData2);
    }

    reloadCities(currCityData);

    // Add score to local storage
    if (bestScore < totalScore) {
        bestScore = totalScore;
    }
    localStorage.setItem('storedBestScores', bestScore);

    // resets scoreboard
    totalScore = 0;
    const scoreListElement = document.querySelector('.score_list');
    const totalScoreElement = document.querySelector('.total_score');
    scoreListElement.textContent = '';
    totalScoreElement.innerText = 'Total Score: 0';
}

function switchDifficulty() {
    if (difficulty == 0) {
        difficulty = 1;
        document.querySelector('#difficulty_display').innerText = 'Current Difficulty: Hard';
    }
    else {
        difficulty = 0;
        document.querySelector('#difficulty_display').innerText = 'Current Difficulty: Easy';
    }
    console.log("difficulty swtiched to: " + difficulty)
    restartGame();
}

readFromData(cityData1);
document.addEventListener('keypress', addCity("Beijing"));
reloadCities(currCityData);