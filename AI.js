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
    let row1;
    let col1;
	/**temp = getRandomInt(6)
		if(temp % 2 == 0 )
		{
			orient = 'V';
		}
		else
		{
			orient = 'H';
		}
		canSwitchOrientation(row1,col1,)*/ 
    row1 = getRandomIntforRow(1, 10);
    col1 = getRandomIntInclusiveForCol(1, 10);
		if (isValidShipCoord(row1, col1, curShipIndex + 1, playerBoards[playerTurn].ships[curShipIndex].orientation))
		{
			playerBoards[playerTurn].ships[curShipIndex].setPosition(row1, col1);
			//setShipNum(curShipIndex);
			
		}
		console.log(row1,col1);
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