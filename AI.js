

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

function medAIShot (userBoard, aiBoard) {
	try {
	if (nextShot.foundShip == false) {
		let row;
		let col;
		do {
			row = getRandomInt(9);
			col = getRandomInt(10);

			console.log("row: ", row, "col: ", col);
		} while(!userBoard.isValidShot(row, col));
		
		if (userBoard.isHit(row, col)) {
			nextShot.foundShip = true;
			nextShot.originR = row;
			nextShot.originC = col;
			nextShot.curR = row;
			nextShot.curC = col;
		}
		
		Shoot(row, col);
	}
	
	else {
		
		let curDir = nextShot.nextDir;
		let shot = orthSelect(aiBoard, curDir);
		
		if (userBoard.isHit(shot.row, shot.col)) {
			nextShot.foundShip = true;
			nextShot.curR = shot.row;
			nextShot.curC = shot.col;
				if (nextShot.lastWasHit) {
					if (curDir == 'u' || curDir == 'd') {
						nextShot.shipOr = 'V';
					}
					
					else {
						nextShot.shipOr = 'H';
					}
				}
		}
			
		Shoot(shot.row, shot.col);
	}
	}
	
	catch(e) {
		console.log(e);
	}
}

function orthSelect(userBoard, curDir) {
	let row = 0;
	let col = 0;
	let reset = false;
	do {
		console.log("nextShot current: ", nextShot.curR, nextShot.curC);
		console.log("nextShot origin: ", nextShot.originR, nextShot.originC);
		console.log(nextShot.curR + 1 < 9);
		if ((nextShot.curR - 1) >= 0 && nextShot.nextDir == 'u') {
			row = nextShot.curR - 1;
			col = nextShot.curC;
			nextShot.nextDir = 'd';
		}
		
		else if ((nextShot.curR + 1) < 9 && nextShot.nextDir == 'd') {
			row = nextShot.curR + 1;
			col = nextShot.curC;
			nextShot.nextDir = 'l';
		}
		
		else if ((nextShot.curC - 1) >= 0 && nextShot.nextDir == 'l') {
			row = nextShot.curR;
			col = nextShot.curC - 1;
			nextShot.nextDir = 'r';
		}
		
		else if ((nextShot.curC + 1) < 10 && nextShot.nextDir == 'r') {
			row = nextShot.curR;
			col = nextShot.curC + 1;
			reset = true;
		}
		
		if (reset) {
			console.log("got here");
			nextShot.nextDir = 'u';
			nextShot.curR = nextShot.originR;
			nextShot.curC = nextShot.originC;

			reset = false;
		}
		
		console.log("row: ", row, "col: ", col);
	} while (!userBoard.isValidShot(row, col));
	
	nextShot.nextDir = 'u';
		
	return{row, col};
}

function resetNextShot() {
	nextShot.foundShip = false;
	nextShot.nextDir = 'u';
	nextShot.shipOr = ' ';
}