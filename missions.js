import {missions, elements} from './datas.js';

export function calculateBasic(matrix, title, seasonScore){
    if(title == "Az erdő széle"){
        for(let i = 0; i < 11; i++){
            for(let j = 0; j < 11; j++){
                if(matrix[i][j] == 3 && i == 0 || i == 10 || j == 0 || j == 10){
                    seasonScore++;
                }
            }
        }
    }
    else if(title == "Álmos-völgy"){
        for(let i = 0; i < 11; i++){
            let counter = 0;
            for(let j = 0; j < 11; j++){
                if(matrix[i][j] == 3){
                    counter++;
                }
            }
            if(counter == 3){
                seasonScore += 4;
            }
        }
    }
    else if(title == "Krumpliöntözés"){
        const neighbor = [[-1, 1], [0, 1], [1, 1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1]];
        for(let i = 0; i < 11; i++){
            for(let j = 1; j < 10; j++){
                if(matrix[i][j] == 4){
                    neightbor.forEach(element => {
                        let newI = i + neighbor[0];
                        let newJ = j + neighbor[1];
                        if(newI >= 0 && newI < 11 && newJ >= 0 && newJ < 11){
                            if(matrix[i + element[0]][j + element[1]] == 2){
                                seasonScore += 2;
                            }
                        }
                    });
                }
            }
        }
    }
    else if(title = "Határvidék"){
        for(let i = 0; i < 11; i++){
            let isFullColumn = true;
            let isFullRow = true;
            for(let j = 0; j < 11; j++){
                if(matrix[i][j] == 0){
                    isFullColumn = false;
                }
                if(matrix[j][i] == 0){
                    isFullRow = false;
                }
            }
            if(isFullColumn){
                seasonScore += 6;
            }
            if(isFullRow){
                seasonScore += 6;
            }
        }

    }
}

/*
function calculateExtra(matrix, title){
    if(title = "Fasor"){
        let max = 0;
        for(let i = 0; i < 11; i++){
            let forest = false;
            let tempMax = 0;
            for(let j = 0; j < 11; j++){
                if(matrix[j][i] == 3){
                    forest = true;
                    tempMax++;
                }
                else if(forest){
                    if(tempMax > max){
                        max = tempMax;
                        tempMax = 0;
                        forest = false;
                    }
                }
            }
        }
        score += max*2;
    }
    else if(title = "Gazdag város"){
        const neighbor = [[-1, 1], [0, 1], [1, 1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1]];
        for(let i = 1; i < 10; i++){
            for(let j = 1; j < 10; j++){
                if(matrix[i][j] == 5){
                    let isTown = true;
                    while()
                }
            }
        }
    }
}
*/