import { missions, elements } from './datas.js';
import { calculateBasic } from './missions.js';

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
const currentSeason = document.querySelector('#currentSeason');
const seasonTimer = document.querySelector('#seasonTimer');
const turnButton = document.querySelector('#turn');
const mirrorButton = document.querySelector('#mirror');
const restartButton = document.querySelector('#restart');
const endGameDiv = document.getElementById('endGame');

const mountains = [[2,2], [4,9], [6,4], [9,10], [10,6]];
const seasons = ['Tavasz (AB)', 'Nyár (BC)', 'Ősz (CD)', 'Tél (DA)'];
let selectedMissions = [];

let matrix = [];
let tempMatrix = [];
let randomElement;
let timer = 0;
let score = 0;
let springScore = 0;
let summerScore = 0;
let fallScore = 0;
let winterScore = 0;
let running;

function start(matrix){
    endGameDiv.classList.add('hideEndGame');
    for(let i = 0; i < 11; i++){
        let row = Array.from({length: 11}, () => 0);
        matrix.push(row);
    }
    mountains.forEach((coord) =>{
        matrix[coord[0]-1][coord[1]-1] = 1;
    });

    for(let i = 0; i < 4; i++){
        selectedMissions.push(missions.basic[i]);
    }

    currentSeason.textContent = 'Jelenlegi évszak: ' + seasons[0];
    document.querySelector('#spring').innerHTML = 'Tavasz:<br>' + 0 + " pont";
    document.querySelector('#summer').innerHTML = 'Nyár:<br>' + 0 + " pont";
    document.querySelector('#fall').innerHTML = 'Ősz:<br>' + 0 + " pont";
    document.querySelector('#winter').innerHTML = 'Tél:<br>' + 0 + " pont";
    document.querySelector('#score').innerHTML = 'Összesen: ' + score + ' pont';

    let remainingTime = 7- (timer % 7);
    seasonTimer.textContent = `Évszakból hátralévő idő: ${remainingTime}/7`;

    running = true;
    nextElement();
    initGame(matrix);
    placeElement();
}

function initGame(matrix){
    gamefield.innerHTML = '';

    let table = document.createElement('table');

    matrix.forEach(row => {
        let tr = table.insertRow();
        row.forEach(cell => {
            let td = tr.insertCell();
            if(cell == 1){
                td.style.backgroundColor = 'rgb(129, 68, 0)';
            }
            else if(cell == 2){
                td.style.backgroundColor = 'yellow';
            }
            else if(cell == 3){
                td.style.backgroundColor = 'green';
            }
            else if(cell == 4){
                td.style.backgroundColor = 'blue';
            }
            else if(cell == 5){
                td.style.backgroundColor = 'red';
            }
            else{
                td.style.backgroundColor = 'rgb(247, 223, 147)';
            }
        });
    });
    gamefield.appendChild(table);
}

function initNextElement(){
    nextElementTable.innerHTML = '';

    let color;
    if (randomElement.type === 'farm') {
        color = 'yellow';
    } else if (randomElement.type === 'forest') {
        color = 'green';
    } else if (randomElement.type === 'water') {
        color = 'blue';
    } else if (randomElement.type === 'town') {
        color = 'red';
    } else {
        color = 'white';
    }

    let table = document.createElement('table');

    randomElement.shape.forEach(row => {
        let tr = table.insertRow();
        row.forEach(cell => {
            let td = tr.insertCell();
            if (cell != 0) {
                td.style.backgroundColor = color;
            }
        });
    });
    nextElementTable.appendChild(table);
}

function getNextElement(){
    return elements[Math.floor(Math.random() * elements.length)];
}

function nextElement() {
    randomElement = getNextElement();
    initNextElement();
    document.querySelector('#timeCost').innerHTML = 'Időigény: ' + randomElement.time;
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
    delegate(gamefield, 'mouseover', 'td', handleMouseOver);
    delegate(gamefield, 'click', 'td', handleClick);
    delegate(gamefield, 'mouseout', 'td', handleMouseOut)
}

let entered = false;
let canPlace;
function handleMouseOver(event){
    if(!entered && running){
        entered = true;
        canPlace = true;
        let row = event.target.parentNode.rowIndex;
        let column = event.target.cellIndex;
    
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
        initGame(matrix);
        setSeason();
        checkEnd();
    }
}


function setSeason(){
    let currentSeasonIndex = Math.floor(timer / 7) % 4;
    if(currentSeason.textContent != 'Jelenlegi évszak: ' + seasons[currentSeasonIndex]){
        if(currentSeasonIndex == 1){
            springScore += calculateBasic(matrix, selectedMissions[0].title);
            springScore += calculateBasic(matrix, selectedMissions[1].title);
            score += springScore
            document.querySelector('#spring').innerHTML = 'Tavasz:<br>' + springScore + " pont";
        }
        else if(currentSeasonIndex == 2){
            summerScore += calculateBasic(matrix, selectedMissions[1].title);
            summerScore += calculateBasic(matrix, selectedMissions[2].title);
            score += summerScore
            document.querySelector('#summer').innerHTML = 'Nyár:<br>' + summerScore + " pont";
        }
        else if(currentSeasonIndex == 3){
            fallScore += calculateBasic(matrix, selectedMissions[2].title);
            fallScore += calculateBasic(matrix, selectedMissions[3].title);
            score += fallScore
            document.querySelector('#fall').innerHTML = 'Ősz:<br>' + fallScore + " pont";
        }
        else if(currentSeasonIndex == 0){
            winterScore += calculateBasic(matrix, selectedMissions[3].title);
            winterScore += calculateBasic(matrix, selectedMissions[0].title);
            score += winterScore
            document.querySelector('#winter').innerHTML = 'Tél:<br>' + winterScore + " pont";
        }
        currentSeason.textContent = 'Jelenlegi évszak: ' + seasons[currentSeasonIndex];
        document.querySelector('#score').innerHTML = 'Összesen: ' + score + ' pont';
    }

    let remainingTime = 7 - (timer % 7);
    seasonTimer.textContent = `Évszakból hátralévő idő: ${remainingTime}/7`;
}

function checkEnd(){
    if(timer >= 28){
        const cells = gamefield.querySelectorAll('td');
        const cellsArray = Array.from(cells);
        for(let i = 0; i < cellsArray.length; i++){
            cells[i].style.cursor = 'default';
        }
        gamefield.style.filter = 'blur(10px)';
        endGameDiv.classList.add('showEndGame');
        running = false;

        restartButton.addEventListener('click', () => {
            location.reload();
        })
    } else {
        nextElement();
    }
}


start(matrix);