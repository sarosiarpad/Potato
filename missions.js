import {missionsData} from './datas.js';

export function calculateMission(matrix, title){
    let seasonScore = 0;
    if(title == "Az erdő széle"){
        for(let i = 0; i < 11; i++){
            for(let j = 0; j < 11; j++){
                if(matrix[i][j] == 3 && (i === 0 || i === 10 || j === 0 || j === 10)){
                    seasonScore++;
                }
            }
        }
    }else if(title == "Álmos-völgy"){
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
    }else if(title == "Krumpliöntözés"){
        const neighbor = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for(let i = 0; i < 11; i++){
            for(let j = 1; j < 10; j++){
                if(matrix[i][j] == 4){
                    neighbor.forEach(coord => {
                        let newI = i + coord[0];
                        let newJ = j + coord[1];
                        if(newI >= 0 && newI < 11 && newJ >= 0 && newJ < 11){
                            if(matrix[newI][newJ] == 2){
                                seasonScore += 2;
                            }
                        }
                    });
                }
            }
        }
    }else if(title = "Határvidék"){
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
    }else if(title = "Fasor"){
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
        seasonScores += max * 2;
    }else if(title == "Öntözőcsatorna"){
        for(let i = 0; i < 11; i++){
            for(let j = 0; j < 11; j++){
                let farms = 0;
                let waters = 0;
                if(matrix[j][i] == 2){
                    farms++;
                }else if(matrix[j][i] == 4){
                    waters++;
                }
            }
            if(farms > 0 && farms == waters){
                seasonScore += 4;
            }
        }
    }else if(title == "Mágusok völgye"){
        const neighbor = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for(let i = 0; i < 11; i++){
            for(let j = 0; j < 11; j++){
                if(matrix[i][j] == 1){
                    neighbor.forEach((coord) => {
                        if(maatrix[i + coord[0]][j+coord[1]] == 4){
                            seasonScore += 3;
                        }
                    })
                }
            }
        }
    }else if(title == "Üres telek"){
        const neighbor = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for(let i = 0; i < 11; i++){
            for(let j = 0; j < 11; j++){
                if(matrix[i][j] == 5){
                    neighbor.forEach((coord) => {
                        if(maatrix[i + coord[0]][j+coord[1]] == 0){
                            seasonScore += 2;
                        }
                    })
                }
            }
        }
    }else if("Páratlan silók"){
        let full = true
        matrix.forEach((row) => {
            row.forEach((cell) => {
                if(cell == 0){
                    full = false;
                }
            });
            if(full){
                seasonScore += 10;
            }
        });
    }else if("Gazdag vidék"){
        let tiles = [];
        matrix.forEach((row) => {
            row.forEach((cell) => {
                if(!tiles.includes(cell)){
                    tiles.push(cell);
                }
            });
            if(tiles.length == 5){
                seasonScore += 4;
            }
        });
    }

    return seasonScore;
}