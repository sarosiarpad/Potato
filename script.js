import { missionsData, elements } from './datas.js';
import { calculateMission } from './missions.js';

/*
    üres = 0
    hegy = 1
    farm = 2
    erdő = 3
    víz = 4
    falu = 5
*/

const gamefield = document.querySelector('#gamefield');
const nextElementTable = document.querySelector('#element');
const cells = gamefield.querySelectorAll('td');
const cellsArray = Array.from(cells);

const currentSeason = document.querySelector('#currentSeason');
const seasonTimer = document.querySelector('#seasonTimer');

const turnButton = document.querySelector('#turn');
const mirrorButton = document.querySelector('#mirror');
const restartButton = document.querySelector('#restart');

const endGameDiv = document.getElementById('endGame');

const missions = document.querySelectorAll('.mission');

const mountains = [[2,2], [4,9], [6,4], [9,10], [10,6]];
const seasons = ['Tavasz (AB)', 'Nyár (BC)', 'Ősz (CD)', 'Tél (DA)'];

const tiles = [
    '<img src="tiles/base_tile.png">',
    '<img src="tiles/mountain_tile.png">',
    '<img src="tiles/plains_tile.png">',
    '<img src="tiles/forest_tile.png">',
    '<img src="tiles/water_tile.png">',
    '<img src="tiles/village_tile.png">',
]

let matrix = [];
let tempMatrix = [];
let selectedMissions = [];
let usedElements = [];

let randomElement;
let timer;

let score = 0;
let springScore = 0;
let summerScore = 0;
let fallScore = 0;
let winterScore = 0;
let running;
let entered = false;
let canPlace;


function start(){
    running = true;
    setScores();

    for(let i = 0; i < cellsArray.length; i++){
        cells[i].style.cursor = 'pointer';
    }
    gamefield.style.filter = 'blur(0px)';
    endGameDiv.classList.remove('showEndGame');
    endGameDiv.classList.add('hideEndGame');

    for (let i = 0; i < 4; i++) {
        let randType = Math.floor(Math.random() * 2);
        if (randType == 0) {
            let added = false;
            while (!added) {
                let randMission = Math.floor(Math.random() * missionsData.basic.length);
                if (!selectedMissions.includes(missionsData.basic[randMission])) {
                    selectedMissions.push(missionsData.basic[randMission]);
                    added = true;
                }
            }
        }else{
            let added = false;
            while (!added) {
                let randMission = Math.floor(Math.random() * missionsData.extra.length);
                if (!selectedMissions.includes(missionsData.extra[randMission])) {
                    selectedMissions.push(missionsData.extra[randMission]);
                    added = true;
                }
            }
        }
    }
    
    matrix = initMatrix();
    tempMatrix = [];
    initMissions();
    initGame(matrix);
    initSeasons();

    timer = 0;
    let remainingTime = 7- (timer % 7);
    seasonTimer.innerHTML = `Évszakból hátralévő idő: ${remainingTime}/7`;

    nextElement();

    setActiveMissions(seasons[0]);

    placeElement(matrix, tempMatrix, randomElement, timer);
}

function initSeasons(){
    currentSeason.textContent = 'Jelenlegi évszak: ' + seasons[0];
    document.querySelector('#spring').innerHTML = 'Tavasz:<br>' + 0 + " pont";
    document.querySelector('#summer').innerHTML = 'Nyár:<br>' + 0 + " pont";
    document.querySelector('#fall').innerHTML = 'Ősz:<br>' + 0 + " pont";
    document.querySelector('#winter').innerHTML = 'Tél:<br>' + 0 + " pont";
    document.querySelector('#score').innerHTML = 'Összesen: ' + score + ' pont';
}

function initMatrix(){
    let matrix = new Array(11).fill(0).map(() => new Array(11).fill(0));
    mountains.forEach((coord) => {
        matrix[coord[0]-1][coord[1]-1] = 1;
    })

    return matrix;
}

function initMissions(){
    let i = 0;
    missions.forEach((mission) => {
        mission.style.backgroundImage = `url(${selectedMissions[i].img})`;
        mission.querySelector('.missionScore').textContent = selectedMissions[i].score + ' pont';
        i++;
    });
}

function setActiveMissions(currentSeason){
    missions.forEach((mission) => {
        mission.classList.remove('activeMission');
    });
    if(currentSeason == 'Tavasz (AB)'){
        missions[0].classList.add('activeMission');
        missions[1].classList.add('activeMission');
    } else if(currentSeason == 'Nyár (BC)'){
        missions[1].classList.add('activeMission');
        missions[2].classList.add('activeMission');
    } else if(currentSeason == 'Ősz (CD)'){
        missions[2].classList.add('activeMission');
        missions[3].classList.add('activeMission');
    } else if(currentSeason == 'Tél (DA)'){
        missions[3].classList.add('activeMission');
        missions[0].classList.add('activeMission');
    }
}

function initGame(matrix){
    gamefield.innerHTML = '';

    let table = document.createElement('table');

    matrix.forEach(row => {
        let tr = table.insertRow();
        row.forEach(cell => {
            let td = tr.insertCell();
            switch(cell){
                case 0:
                    td.innerHTML = tiles[0];
                    break;
                case 1:
                    td.innerHTML = tiles[1];
                    break; 
                case 2:
                    td.innerHTML = tiles[2];
                    break; 
                case 3:
                    td.innerHTML = tiles[3];
                    break; 
                case 4:
                    td.innerHTML = tiles[4];
                    break; 
                case 5:
                    td.innerHTML = tiles[5];
                    break; 
            }
        });
    });
    gamefield.appendChild(table);
}

function initNextElement(){
    nextElementTable.innerHTML = '';

    let tile;
    if (randomElement.type === 'farm') {
        tile = tiles[2];
    } else if (randomElement.type === 'forest') {
        tile = tiles[3];
    } else if (randomElement.type === 'water') {
        tile = tiles[4];
    } else if (randomElement.type === 'town') {
        tile = tiles[5];
    }

    let table = document.createElement('table');

    randomElement.shape.forEach(row => {
        let tr = table.insertRow();
        row.forEach(cell => {
            let td = tr.insertCell();
            if (cell != 0) {
                td.innerHTML = tile;
            }
        });
    });
    nextElementTable.appendChild(table);
}

function getNextElement(){
    if(elements.length == 0){
        return usedElements[Math.floor(Math.random() * usedElements.length)];
    }
    let randIndex = Math.floor(Math.random() * elements.length)
    if(!usedElements.includes(elements[randIndex])){
        usedElements.push(elements[randIndex]);
        elements.splice(randIndex, 1);
        return usedElements[usedElements.length-1];
    }else{
        return getNextElement();
    }
}

function nextElement() {
    randomElement = getNextElement();
    initNextElement();
    document.querySelector('#timeCost').innerHTML = '<img src="clock.webp"> ' + randomElement.time;
}

function setScores(){
    score = 0;
    springScore = 0;
    summerScore = 0;
    fallScore = 0;
    winterScore = 0;
}

turnButton.addEventListener('click', () => {
    for(let i = 0; i < 3/2; i++){
        for (let j = i; j < 3 - i - 1; j++){
            let temp = randomElement.shape[i][j];
            randomElement.shape[i][j] = randomElement.shape[3 - j - 1][i];
            randomElement.shape[3 - j - 1][i] = randomElement.shape[3 - i - 1][3 - j - 1];
            randomElement.shape[3 - i - 1][3 - j - 1] = randomElement.shape[j][3 - i - 1];
            randomElement.shape[j][3 - i - 1] = temp;
        }
    }
    initNextElement();
})

mirrorButton.addEventListener('click', () => {
    randomElement.shape.map(row => row.reverse());
    initNextElement();
});

function delegate(parent, type, selector, handler) {
    function delegatedFunction(event) {
        const handlerElement = this;
        const sourceElement = event.target;

        const closestElement =
            sourceElement.closest(selector);

        if (handlerElement.contains(closestElement)) {
            const targetElement = closestElement;
            handler.call(targetElement, event);
        }
    }

    parent.addEventListener(type, delegatedFunction);
}

function validate(x, y, matrix){
    return (
        x >= 0 &&
        x < 11 &&
        matrix[x] !== undefined &&
        y >= 0 &&
        y < 11 &&
        matrix[x][y] !== undefined
    );
}

function placeElement() {
    delegate(gamefield, 'mouseover', 'img', handleMouseOver);
    delegate(gamefield, 'click', 'td', handleClick);
    delegate(gamefield, 'mouseout', 'td', handleMouseOut)
}

function handleMouseOver(event){
    if(!entered && running){
        entered = true;
        canPlace = true;
        let row = event.target.parentNode.parentNode.rowIndex;
        let column = event.target.parentNode.cellIndex;
    
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (randomElement.shape[i][j] != 0) {
                    let currentRow = i + row;
                    let currentColumn = j + column;
                    if (!validate(currentRow, currentColumn, matrix)) {
                        canPlace = false;
                    } else if( matrix[currentRow][currentColumn] != 0 ){
                        canPlace = false;
                    }
                }
            }
        }
    
        tempMatrix = JSON.parse(JSON.stringify(matrix));
                
        if(canPlace){
            let num;
            switch(randomElement.type){
                case 'farm': 
                    num = 2;
                        break;
                case 'forest':
                    num = 3;
                    break;
                case 'water':
                    num = 4;
                    break;
                case 'town':
                    num = 5;
                    break;
                default:
                    console.log('Error');
                    break;
            }
    
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(randomElement.shape[i][j] != 0){
                        tempMatrix[row+i][column+j] = num;
                    }
                }
            }
            initGame(tempMatrix);
        } else {
            initGame(matrix);
        }
    }
}

function handleMouseOut(){
    entered = false;
}

function handleClick() {
    if(canPlace && running){
        entered = false;
        matrix = JSON.parse(JSON.stringify(tempMatrix));
        timer += randomElement.time;
        console.log(timer);
        initGame(matrix);
        setSeason();
        nextElement();
        checkEnd();
    }
}


function setSeason(){
    let currentSeasonIndex = Math.floor(timer / 7) % 4;
    if(currentSeason.textContent != 'Jelenlegi évszak: ' + seasons[currentSeasonIndex]){
        if(currentSeasonIndex == 1){
            springScore += calculateMission(matrix, selectedMissions[0].title);
            selectedMissions[0].score += calculateMission(matrix, selectedMissions[0].title);
            springScore += calculateMission(matrix, selectedMissions[1].title);
            selectedMissions[1].score += calculateMission(matrix, selectedMissions[1].title);
            score += springScore
            document.querySelector('#spring').innerHTML = 'Tavasz:<br>' + springScore + " pont";
        }
        else if(currentSeasonIndex == 2){
            summerScore += calculateMission(matrix, selectedMissions[1].title);
            selectedMissions[1].score += calculateMission(matrix, selectedMissions[1].title);
            summerScore += calculateMission(matrix, selectedMissions[2].title);
            selectedMissions[2].score += calculateMission(matrix, selectedMissions[2].title);
            score += summerScore
            document.querySelector('#summer').innerHTML = 'Nyár:<br>' + summerScore + " pont";
        }
        else if(currentSeasonIndex == 3){
            fallScore += calculateMission(matrix, selectedMissions[2].title);
            selectedMissions[2].score += calculateMission(matrix, selectedMissions[2].title);
            fallScore += calculateMission(matrix, selectedMissions[3].title);
            selectedMissions[3].score += calculateMission(matrix, selectedMissions[3].title);
            score += fallScore
            document.querySelector('#fall').innerHTML = 'Ősz:<br>' + fallScore + " pont";
        }
        else if(currentSeasonIndex == 0){
            winterScore += calculateMission(matrix, selectedMissions[3].title);
            selectedMissions[3].score += calculateMission(matrix, selectedMissions[3].title);
            winterScore += calculateMission(matrix, selectedMissions[0].title);
            selectedMissions[0].score += calculateMission(matrix, selectedMissions[0].title);
            score += winterScore
            document.querySelector('#winter').innerHTML = 'Tél:<br>' + winterScore + " pont";
        }
        setActiveMissions(seasons[currentSeasonIndex]);
        currentSeason.textContent = 'Jelenlegi évszak: ' + seasons[currentSeasonIndex];
        document.querySelector('#score').innerHTML = 'Összesen: ' + score + ' pont';
    }

    let remainingTime = 7 - (timer % 7);
    seasonTimer.textContent = `Évszakból hátralévő idő: ${remainingTime}/7`;

    let i = 0;
    missions.forEach((mission) => {
        mission.querySelector('.missionScore').textContent = selectedMissions[i].score + ' pont';
        i++;
    });
}

function checkEnd(){
    if(timer >= 28){
        for(let i = 0; i < cellsArray.length; i++){
            cells[i].style.cursor = 'default';
        }
        gamefield.style.filter = 'blur(10px)';
        endGameDiv.classList.add('showEndGame');
        running = false;

        restartButton.addEventListener('click', () => {
            start();
        })
    }
}

start();