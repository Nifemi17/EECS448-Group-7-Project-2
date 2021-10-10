/**
* returns a random int from 0 to max (max excluded)
* @param max the maximum integer number
*/
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
/*
*  Function to generated random numbers for the Row and the Col for the AI to shoot on the board
*  @param min,max
*/
function getRandomIntforRow(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/*
*  Function to generated random numbers for the Row and the Col for the AI to shoot on the board
*  @param min,max
*/
function getRandomIntInclusiveForCol(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/*
* Determines the logic for the easy AI move : will shoot randomly on the board 
* @param None
*/

// Yuri - This function works with the assumption that the AI's Board object is
//        passed in. So, the function call in main.js should look something like "hardAISHot(playerBoards[1])"
//        where playerBoards[0] is the AI's board object 
function easyAIShot(userBoard) {
	let row;
	let col;
	do {
		row = getRandomInt(9);
		col = getRandomInt(10);

		console.log("row: ", row, "col: ", col);
	} while(!userBoard.isValidShot(row, col));

/*     row = row.getRandomIntforRow(1, 10);
    col = col.getRandomIntForCol(1, 10); */

    Shoot(row, col);
}


/*
* Places the ships randomly on the board for the dumbo AI
* @param None
*/
function randomShipPlacementAI() {
	let row = 0;
	let col = 0;

	do {
		let dir = playerBoards[playerTurn].ships[curShipIndex].orientation;
		//Horizontal placement
		if (getRandomInt(2) == 0) {
			if (dir != "H") {
				playerBoards[playerTurn].ships[curShipIndex].switchOrientation();
			}
			row = getRandomInt(9);
			col = getRandomInt(10 - curShipIndex);
		}
	
		//Vertical placement
		else {
			if (dir != "V") {
				playerBoards[playerTurn].ships[curShipIndex].switchOrientation();
			}
			row = getRandomInt(9 - curShipIndex);
			col = getRandomInt(10);
		}
		console.log("row: ", row, "col: ", col, "dir: ", dir, "length: ", curShipIndex + 1);
	} while (!isValidShipCoord(row, col, curShipIndex + 1, playerBoards[playerTurn].ships[curShipIndex].orientation));

	console.log("got here");
	placeShipPic(row, col);
	playerBoards[playerTurn].ships[curShipIndex].setPosition(row, col);
	Confirm();
}

/*
* Function to determine the hard AI move where the AI knows the position of the player's ships
* 
*/

// Yuri - This function works with the assumption that the human player's Board object is
//        passed in. So, the function call in main.js should look something like "hardAISHot(playerBoards[0])"
//        where playerBoards[0] is the human player's board object
function hardAIShot(userBoard) {
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 10; c++) {
			console.log("AI checking row ", r, "column ", c);
			if (userBoard.isHit(r, c)) {
				Shoot(r, c);
				return;
			}
		}
	}
}
class AI {
	nextShot = 'r';
	initialHitRow = 0;
	initialHitCol = 0;
	
	constructor() { }
}

class Orthogonal {
	lastShotHit = false;
	nextDir = 'u';
	lastHitRow = 0;
	lastHitCol = 0;

	constructor() { }
}

let ai = new AI();
let ortho = new Orthogonal();
console.log("here",ai.nextShot);
function mediumAI(nextShotforAI, userBoard) {
	let row = 0;
	let col = 0;
	console.log("here",ai.nextShot);
	if (nextShotforAI == 'r') {
		console.log("here",ai.nextShot);
		//console.log("Entered the if for mediumAI.");
		row = getRandomInt(9);
		col = getRandomInt(10);
		ShootAI(row, col);
		//if (playerBoards[playerTurn].isValidShot(row, col))
			console.log("here shot");
			console.log(playerBoards[op(playerTurn)].isAiHit(row, col));
			ai.initialHitRow = row;
			ai.initialHitCol = col;
			ortho.lastHitRow = row;
			ortho.lastHitCol = col;
			if (playerBoards[op(playerTurn)].isHit(row, col))
			{
			console.log(playerBoards[op(playerTurn)].isHit(row, col));
			console.log("here hit")
			ai.nextShot = 'o';
			console.log("here",ai.nextshot);
			}
			
			
		//}

	}

	else {
		orthogonalShot(ortho.lastShotHit, ortho.lastHitRow, ortho.lastHitCol, ortho.nextDir);
	}

}

function orthogonalShot(lastShotHit, r, c, nextDir) {
	if (nextDir == 'u' && (r > 0)) {
		ShootAI(r - 1, c);
		if (playerBoards[playerTurn].isValidShot(r-1, c))
		{
			if (playerBoards[op(playerTurn)].isHit(r-1, c))
			{
				console.log("here",ai.nextshot);
			ortho.lastShotHit = true;
			ortho.lastHitRow = r - 1;
			ortho.lastHitCol = c;
			}
		else if (!(playerBoards[op(playerTurn)].isHit(r-1, c)) || (!(playerBoards[playerTurn].isValidShot(r-1, c)) && lastShotHit)) {
			ortho.nextDir = 'd';
			ortho.lastHitRow = ai.initialHitRow;
			ortho.lastHitCol = ai.initialHitCol;
		}

		else {
			ortho.nextShot = 'r';
		}
	}
	else {
        throw "invalid shot";
    }
}
	else if (nextDir == 'd' && (r < 9) ) {
		Shoot(r + 1, c);
		if (playerBoards[playerTurn].isValidShot(r+1, c))
		{
		if (playerBoards[op(playerTurn)].isHit(r+1, c)) {
			ortho.lastShotHit = true;
			ortho.lastHitRow = r + 1;
			ortho.lastHitCol = c;
		}

		else if (!(playerBoards[op(playerTurn)].isHit(r+1, c)) && lastShotHit) {
			ai.nextShot = 'r';
		}
		else {
			ortho.nextShot = 'l';
		}
	}
	else {
        throw "invalid shot";
    }
	}

	else if (nextDir == 'r') {
		Shoot(r, c + 1);
		if (playerBoards[playerTurn].isValidShot(r, c+1))
		{
		if (playerBoards[op(playerTurn)].isHit(r, c-1)) {
			ortho.lastShotHit = true;
			ortho.lastHitRow = r;
			ortho.lastHitCol = c + 1;
			console.log(ai.nextshot);
		}
		
		else if (!(playerBoards[op(playerTurn)].isHit(r, c+1)) || (!(playerBoards[playerTurn].isValidShot(r, c+1)) && lastShotHit)) {
			ortho.nextShot = 'l';
			ortho.lastHitRow = ai.initialHitRow;
			ortho.lastHitCol = ai.initialHitCol;
		}

		else {
			ortho.nextShot = 'd';
		}
	}
	else {
        throw "invalid shot";
    }
	}

	else {
		Shoot(r, c - 1);
		if (playerBoards[playerTurn].isValidShot(r, c-1))
		{
			if ((playerBoards[op(playerTurn)].isHit(r, c-1))) {
			ortho.lastShotHit = true;
			ortho.lastHitRow = r;
			ortho.lastHitCol = c - 1;
			}
		else {
			ai.nextShot = 'r';
		}
	}
	else {
        throw "invalid shot";
    }
	}

}
function ShootAI(r, c){
    if (playerBoards[playerTurn].isValidShot(r, c)) {
        if(playerBoards[op(playerTurn)].isHit(r, c)) {
            console.log(playerBoards[op(playerTurn)].isHit(r, c));
            let sI = playerBoards[op(playerTurn)].findHitShip(r, c);
            console.log("sI: ", sI);
            console.log(playerBoards[playerTurn].ships[sI]);
            playerBoards[op(playerTurn)].ships[sI].setHit();

            if (playerBoards[op(playerTurn)].ships[sI].isSunk()) {
                
                let coords = playerBoards[op(playerTurn)].ships[sI].getPosition();
                playerBoards[op(playerTurn)].setKeySunkShip(sI + 1, coords);
                playerBoards[playerTurn].setGameSunkShip(sI + 1, coords);
                playerBoards[playerTurn].SunkShip();
                
                if(playerBoards[playerTurn].isGameOver()){
                    gamePhase = "end";
                }
                else {
                    playerTurn = op(playerTurn);
                    shotOutcomeText = "Sunk Ship #" + (sI+1).toString() + "!";
                    gamePhase = "intermission";
                }
            }
            else {
                playerBoards[op(playerTurn)].setKeyHit(r, c);
                playerBoards[playerTurn].setGameHit(r, c);
                playerTurn = op(playerTurn);
                shotOutcomeText = "It was a hit!";
                gamePhase = "intermission"
				orthogonalShot(ortho.lastShotHit, ortho.lastHitRow, ortho.lastHitCol, ortho.nextDir);
				try{
					orthogonalShot(ortho.lastShotHit, ortho.lastHitRow, ortho.lastHitCol, ortho.nextDir);
				}
				catch(e)
				{
					console.error(e);
				}
            }
        }
        else {
            playerBoards[op(playerTurn)].setKeyMiss(r, c);
            playerBoards[playerTurn].setGameMiss(r, c);
            playerTurn = op(playerTurn);
            shotOutcomeText = "It was a miss!";
            gamePhase = "intermission";
        }
    }
    
    else {
        //throw "invalid shot";
        try{
            if (playerTurn == 1)
            {
                mediumAI(ai.nextShot,playerBoards[0]);
            }
        }
        catch(err)
        {
            console.error(err);
        }
    }
	
	isHighlight = false;
}