/*
----------------------------------------------------------------------------------
GAME RULES:
Battleship is a two player game.
Both Players secretly place 1 to 6 ships on a 9x10 grid.
Taking turns, each player announces where onthe opponent's grid they wish to fire.
The opponent must announce whether or not one of the ships was hit.
The first player to sink all of the opponent's ships wins.
----------------------------------------------------------------------------------
GAME SETUP:
Board Size: 9x10, columns denoted by letters (A-J), rows are denoted by number (1-9).
Number of Ships: Given by user, Minumum of 1 and a maximum of 6.
Types of Ships: This will be based on the ammount of ships chosen, If 1 ship is
chosen then each player gets a single 1x1 ship.
----------------------------------------------------------------------------------
PLAYING THE GAME:
Taking turns, the users pick a space on the opponent's board to "fire" at.
They must then be informed if the shot was a "hit" or "miss".
The player's view should be updated to reflect this.
After each shot, it is the other players turn.
----------------------------------------------------------------------------------
DESTROYING A SHIP:
Once a ship has been hit in every space it occupies, it is sunk.
For example, if the 1x3 ship occupies the space B3,B4 & B5.
Once the opponent has shot those three spaces, that hsip is sunk.
----------------------------------------------------------------------------------
PLAYER'S VIEW:
A player should have full view of their board and where their ships are placed.
Show how many times each ship has been hit.
A player should have a board to track all shots they've fired and whether they
were misses or hits.
----------------------------------------------------------------------------------
GAME END:
Once a player has sunk all of the opponent's ships, they immediatley win.
----------------------------------------------------------------------------------
*/

let canvas;
let context;
let gamePhase = "intro"; //string that determines what state of the game is displayd {"setup", "place", "play", "end"}
let playerTurn = 0; //int that determines which player is able to shoot and on which board, changes with each shot. { 1, 0 }
let shipNum; //int that determines the number of ships to start the game. { 1, 2, 3, 4, 5, 6 }
let playerBoards = []; //an array of board classes. { 0 (player 1), 1 (player 2)}
let userShips; //int that holds the value the user gives during the setup phase, will be set = to shipNum.
let rowSelect; //int that stores a selected row for use after it's highlighted
let colSelect; //int that stores a selected column for use after it's highlighted
let boardSelect; //int that stores a selected board for use after it's highlighted
let isHighlight = false; //denotes whether or not there is an active square highlighted
let curShipIndex; //keeps track of shipIndex for the place phase
let shotOutcomeText; //Global shot outcome text holder for intermission phase
let height = window.innerHeight;
let width = window.innerWidth;
let secondPlayer;
let difficulty;

/**
 * Calls drawGrid and then fillGrid for the place phase, setting up the game board
 */
function gamePlace()
{
	drawGrid();
    fillGrid(playerTurn);
	drawShips();
}

/**
 * Calls drawGrid and then fillGrid for the play phase, updating the game board
 */
function gamePlay()
{
    drawGrid();
    fillGrid(playerTurn);
	drawSonarIns(context);
	drawSonar(context);
    drawShips();
	drawHitsAndMisses(playerTurn);
}

/**
 * After a shot is fired, shows the results and prompts the next player to get ready.
 */
function gameIntermission()
{
    context.fillText(shotOutcomeText, 750, 350);
    if(playerTurn == 1){
        context.fillText("Player 2 Next", 750, 400);
    }
    else {
        context.fillText("Player 1 Next", 750, 400);
    }
    context.fillText("Ready", 770, 655);
    context.beginPath();
    context.moveTo(720, 600);
    context.lineTo(950, 600);
    context.lineTo(950, 700);
    context.lineTo(720, 700);
    context.lineTo(720, 600);
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
}

/**
 * Displays which player won the game and offers a choice to play again
 */
function gameEnd()
{
    //confirm button
    context.beginPath();
    context.moveTo(720, 600);
    context.lineTo(950, 600);
    context.lineTo(950, 700);
    context.lineTo(720, 700);
    context.lineTo(720, 600);
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
    context.fillText("Play Again?", 770, 655);

    if(playerTurn == 0){
        //fill the canvas with a win screen for p2
        context.fillText("Player 1 Win!", 750, 400);
    }
    if(playerTurn == 1){
        //fill the canvas with a win screen for p1
        context.fillText("Player 2 Win!", 750, 400);
    }
}



/**
 * Draws all of the UI elements of the board depending on what phase the game is in
 */
function drawGrid()
{
    //draw the horizontal lines on the left grid
    context.moveTo(100, 75);
    for(var i = 0; i < 11; i++)
    {
        context.moveTo(100 + (i*65), 75);
        context.lineTo(100 + (i*65), 75 + (9*65));
    }
    //draw the vertical lines on the left grid
    context.moveTo(100, 75);
    for(var i = 0; i < 10; i++)
    {
        context.moveTo(100 , 75 + (i*65));
        context.lineTo(100 + (10*65), 75 + (i*65));
    }
    //draw the horizontal lines on the right grid
    context.moveTo(1000, 75);
    for(var i = 0; i < 11; i++)
    {
        context.moveTo(1000 + (i*65), 75);
        context.lineTo(1000 + (i*65), 75 + (9*65));
    }
    //draw the vertical lines on the right grid
    context.moveTo(1000, 75);
    for(var i = 0; i < 10; i++)
    {
        context.moveTo(1000 , 75 + (i*65));
        context.lineTo(1000 + (10*65), 75 + (i*65));
    }

    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    //set the column indicators above the grids
    let column = "ABCDEFGHIJ";
    for(var k = 0; k < 11; k++)
    {
        context.fillText(column.charAt(k), 125 + (k*65), 60);
        context.fillText(column.charAt(k), 1025 + (k*65), 60);
    }

    //set the row indicators beside the grids
    for(var k = 0; k < 9; k++)
    {
        context.fillText(k + 1, 65, 115 + (k*65));
        context.fillText(k + 1, 965, 115 + (k*65));
    }

    //SECTION 2

    if(gamePhase == "place")
    {
        if (secondPlayer == "Player2")
        {
            if(playerTurn == 0)
            {
	        context.fillText("Player 1", 810, 425);
	        }
	        else if(playerTurn == 1){
	        context.fillText("Player 2", 810, 425);
	        }
        }
        else if (secondPlayer == "computer" )
        {
            context.fillText("Player 1", 810, 425);
        }
        context.fillText("Place your ships", 760, 450);
        context.fillText("<------", 820, 480);
        let temp = "Ship being placed: " + (curShipIndex + 1).toString();
        context.fillText(temp, 300, 750);
	    context.fillText("Switch Orientation:", 740, 775);
	    context.fillText("Spacebar", 800, 800);
        temp = "Orientation: " + playerBoards[playerTurn].ships[curShipIndex].orientation;
        context.fillText(temp, 775, 750);
        context.fillText("Confirm", 1300, 750);
        // Box around Confirm
        context.beginPath();
        context.moveTo(1250, 700);
        context.lineTo(1440, 700);
        context.lineTo(1440, 785);
        context.lineTo(1250, 785);
        context.lineTo(1250, 700);
        context.stroke();
        context.closePath();
        //context.beginPath();
        if (isHighlight == true)
        {
            //console.log("isHighlight:", isHighlight);
            playerBoards[playerTurn].ships[curShipIndex].setPosition(rowSelect, colSelect);
            let coords = playerBoards[playerTurn].ships[curShipIndex].getPosition();
            for (let i = 0; i < curShipIndex + 1; i++) {
                coord = coords[i];
                setHighlight(coord[1], coord[0], boardSelect);
            }
        }
    }

    //WHEN PLAYING

    else if (gamePhase == "play") {
        context.fillText("Place your shot", 770, 450);
        context.fillText("------>", 820, 480);
        context.fillText("Fire", 1300, 750);
	    context.fillText("Legend:", 100, 700);
	    context.fillText(". = empty water", 100, 725);
	    context.fillText("X = a ship on your board", 100, 750);
	    context.fillText("0 = hit on the enemy board", 100, 775);
	    context.fillText("# = miss on the enemy board", 100, 800);
	    context.fillText("number = size of a ship after it's sunk", 100, 825);
	    if(playerTurn == 0){
	        context.fillText("Player 1", 810, 425);
	    }
	    else if(playerTurn == 1){
	        context.fillText("Player 2", 810, 425);
	    }
        // Box around Confirm
        context.beginPath();
        context.moveTo(1250, 700);
        context.lineTo(1400, 700);
        context.lineTo(1400, 785);
        context.lineTo(1250, 785);
        context.lineTo(1250, 700);
        context.stroke();
        context.closePath();
        if (isHighlight) {
            console.log("Phase: play; isHighlight: ", isHighlight);
            setHighlight(colSelect, rowSelect, boardSelect);
        }
    }

}

/**
 * Fills up the grid with up-to-date indicators for the spaces
 * @param {number} player shows whose turn it is
 */
function fillGrid(player)
{
    if(secondPlayer == "Player2")
    {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 10; c++) {
            if(player == 0){
                context.fillText(playerBoards[player].key[r][c], 125 + c*65, 110 + r*65);
                context.fillText(playerBoards[player].game[r][c], 1027 + c*65, 110 + r*65);
            }
            if(player == 1){
                context.fillText(playerBoards[player].key[r][c], 125 + c*65, 110 + r*65);
                context.fillText(playerBoards[player].game[r][c], 1027 + c*65, 110 + r*65);
            }
        }
    }
    }
    if(secondPlayer == "computer")
    {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 10; c++) {
                    context.fillText(playerBoards[player].key[r][c], 125 + c*65, 110 + r*65);
                    context.fillText(playerBoards[player].game[r][c], 1027 + c*65, 110 + r*65);
            }
        }  
    }
}

/**
 * Displays a frame of animation
 */
function tick() {
    window.requestAnimationFrame(refresh);
}

/**
 * Clears the display and changes the game phase to move on to the next one
 */
function refresh() {
    context.clearRect(0,0,canvas.width,canvas.height);
    context.font = "18pt Georgia";
    context.fillStyle = "black";
    if( gamePhase == 'intro')
    {
        gameIntro();
    }
    if( gamePhase == 'selection')
    {
        selection();
    }
    if(gamePhase == 'setup'){
        gameSetup();
    }
    if(gamePhase == 'place'){
        gamePlace();
    }
    if(gamePhase == 'play'){
        gamePlay();
    }
    if(gamePhase == 'intermission'){
        gameIntermission();
    }
    if(gamePhase == 'end'){
        gameEnd();
    }
    tick();
}

/**
 * Waits until the dom is loaded to print to the screen
 */
document.addEventListener("DOMContentLoaded", () => { 
    canvas = document.querySelector("#gameCanvas");
    context = canvas.getContext("2d");
	sonarIc.image = document.getElementById('sonar');
    shipIc.image = document.getElementById('ship');
	hitIc = document.getElementById('hit');
	missIc = document.getElementById('miss');
    refresh();

    isHighlight = false;
  })

/**
 * Translates click coordinates into grid coordinates on the board
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 * @returns {object} an object with the x and y coords as well as the board
 */
function clickCoord(x, y)
{
    let col;
    let row;
    let playerBoard;
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 9; j++)
        {
           if((x > 100 + i*65) && (x < 165 + i*65)){
               if((y > 75 + j*65) && (y < 140 + j*65)){
                   col = i;
                   row = j;
                   playerBoard = 0;
                }
            }
           if((x > 1000 + i*65) && (x < 1065 + i*65)){
                if((y > 75 + j*65) && (y < 140 + j*65)){
                    col = i;
                    row = j;
                    playerBoard = 1;
                }
            }
        }
    }
    console.log("clickBoard");
    console.log(col, row);
    console.log(playerBoard);
    //return the col, row, and playerBoard values inside an object, reference them via clickCoord(event.pageX, event.pageY).row (or col).
    return {
        col,
        row,
        playerBoard
    }
}


/**
 * Davis: This one needs a more detailed description than I can give
 * @param {number} r row index
 * @param {number} c column index
 */
function Shoot(r, c){
    if (playerBoards[playerTurn].isValidShot(r, c)) {
        if(playerBoards[op(playerTurn)].isHit(r, c)) {
            
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
        throw "invalid shot";
    }
}

/**
 * Checks if a user presses a key and performs a different action based on the game phase
 */
document.addEventListener("keydown", function(event){
    console.log(event.key);
    //SECTION 1
    if(gamePhase == "setup"){
        userShips = event.key;
        //console.log(userShips);
    }
    //SECTION 2
    if(gamePhase == "place"){
        if(event.key == ' '){
            console.log("TESTING: ", event.key);
            if (canSwitchOrientation(rowSelect, colSelect, curShipIndex + 1, playerBoards[playerTurn].ships[curShipIndex].orientation)) {
                playerBoards[playerTurn].ships[curShipIndex].switchOrientation();
                console.log("TESTING: ", playerBoards[playerTurn].ships[curShipIndex].orientation);
            }
        }
    }
})

/**
 * Checks if a user clicks the screen and performs a different action based on the game phase
 */
document.addEventListener('mousedown', function(event) {
    console.log(event.pageX, event.pageY);
    //SECTION 1

    if (gamePhase == "intro")
    {
        console.log(gamePhase);
        if(((width/2)-200) < event.pageX && (width/2) > event.pageX){
            if((height/2) < event.pageY && ((height/2) + 50) > event.pageY){
                    secondPlayer = "Player2";
                    gamePhase = "setup";
                    //selection();
            }
        }
        if(((width/2)+100) < event.pageX && ((width/2)+300) > event.pageX){
            if((height/2) < event.pageY && ((height/2) + 50) > event.pageY){
                    secondPlayer = "computer";
                    console.log(secondPlayer);
                   gamePhase = "selection";   
            }
        }
        selection();
    }
    else if (gamePhase == "selection")
    {
        if(((width/2)-250 < event.pageX && ((width/2)-50) > event.pageX))
        {
            if((height/2) < event.pageY && ((height/2) + 50) > event.pageY)
            {
                difficulty = "easy";
            }
        }
        if(((width/2)-20) < event.pageX && ((width/2)+180) > event.pageX)
        {
            if((height/2) < event.pageY && ((height/2) + 50) > event.pageY)
            {
                difficulty = "medium";
            }
        }
        if(((width/2)+210) < event.pageX && ((width/2)+410) > event.pageX)
        {
            if((height/2) < event.pageY && ((height/2) + 50) > event.pageY)
            {
                difficulty = "hard";
            }
        }
        console.log(difficulty);
        gamePhase = "setup";
    }
    else if(gamePhase == "setup"){
        if(770 < event.pageX && 1056 > event.pageX){
            if(607 < event.pageY && 708 > event.pageY){
                try {
                    setShipNum(userShips);
                    playerBoards[0] = new Board(shipNum);
                    playerBoards[1] = new Board(shipNum);
                    gamePhase = "place";
                    curShipIndex = shipNum - 1;
                    isHighlight = false;
                    }
                catch(err){
                    alert("Error: " + err + " .");
                    gameSetup();
                }
            }
        }
    }
    //SECTION 2
    else if(gamePhase == "place"){
        /*
        if ((event.pageX > 100 && event.pageX < 750) && (event.pageY > 75 && event.pageY < 660)) {
            let temp = clickCoord(event.pageX, event.pageY);
            if (isValidShipCoord(temp.row, temp.col, curShipIndex + 1, playerBoards[playerTurn].ships[curShipIndex].orientation)) {
                rowSelect = temp.row;
                colSelect = temp.col;
                boardSelect = temp.playerBoard;
                isHighlight = true;
            }
            else {
                window.alert("Invalid placement! Try again within the grid.")
            }
        }
        */
        if ((event.pageX > shipIc.x && event.pageX < shipIc.x + shipIc.width) && (event.pageY > shipIc.y && event.pageY < shipIc.y + shipIc.height)) {
            shipIc.isDragging = true;
			console.log ("isDragging: ", shipIc.isDragging);
        }
        else if ((event.pageX > 1250 && event.pageX < 1440) && (event.pageY > 700 && event.pageY < 785)) {
            if (isHighlight) {
                isHighlight = false;
                Confirm();
            }
        }
        else {
            window.alert("Invalid placement! Try again within the grid.")
        }
    }
    else if(gamePhase == "play"){
        
        if ((event.pageX > 1000 && event.pageX < 1650) && (event.pageY > 75 && event.pageY < 660)) {
			let temp = clickCoord(event.pageX, event.pageY);
			rowSelect = temp.row;
			colSelect = temp.col;
			boardSelect = temp.playerBoard;
			if (!sonarIc.isEnabled) {
				isHighlight = true;
			}	
        }
		
		if ((event.pageX > 800 && event.pageX < (900)) && (event.pageY > 250 && event.pageY < (350))) {
			if (!sonarIc.isEnabled) {
				sonarIc.isEnabled = true;
				isHighlight = false;
			}
			
			else {
				resetSonar();
			}
		}
		
		if ((event.pageX > sonarIc.x && event.pageX < sonarIc.x + sonarIc.size) && (event.pageY > sonarIc.y && event.pageY < sonarIc.y + sonarIc.size)) {
			if (sonarIc.isEnabled == true) {
				sonarIc.isDragging = true;
				console.log ("isDragging: ", sonarIc.isDragging);
			}
		}
			
        if ((event.pageX > 1250 && event.pageX < 1440) && (event.pageY > 700 && event.pageY < 785)) {
            if (isHighlight) {
                Shoot(rowSelect, colSelect);
            }
			
			if (sonarIc.isPlaced) {
				let opBoard = playerBoards[op(playerTurn)];
				let plBoard = playerBoards[playerTurn];
				
				for (let r = rowSelect - 1; r < rowSelect + 2; r++) {
					for (let c = colSelect - 1; c < colSelect + 2; c++) {
						revealShips(r, c, opBoard, plBoard);
					}
				}
				resetSonar();
			}
        }
    }
    else if(gamePhase == "intermission"){
        if(720 < event.pageX && 950 > event.pageX){
            if(600 < event.pageY && 700 > event.pageY){
                
                gamePhase = "play";
                
            }
	    }
    }
    else if(gamePhase == "end"){
        if(720 < event.pageX && 950 > event.pageX){
            if(600 < event.pageY && 700 > event.pageY){
                location.reload();
            }
	}
    }
})

/**
* tracks the position of the cursor when dragging the sonar icon image
*/
document.addEventListener('mousemove', function (event) {
	if (sonarIc.isDragging == true) {
		sonarIc.x = event.pageX - (sonarIc.size/2);
		sonarIc.y = event.pageY - (sonarIc.size/2);
	}
    else if (shipIc.isDragging == true) {
		shipIc.x = event.pageX - (shipIc.width/2);
		shipIc.y = event.pageY - (shipIc.height/2);
	}
})

/*
* reads the position of a dragged image when the mouse button is released, then sends the position to
* placeSonar to verify valid sonar placement
*/
document.addEventListener('mouseup', function(event) {
	if (sonarIc.isDragging == true) {
		let temp = clickCoord(event.pageX, event.pageY);
		rowSelect = temp.row;
		colSelect = temp.col;
		boardSelect = temp.playerBoard;
		
		console.log("boardSelect: ", boardSelect);
		sonarIc.isDragging = false;
		console.log("isDragging: ", sonarIc.isDragging);
		placeSonar(rowSelect, colSelect, boardSelect);	
	}
    else if (shipIc.isDragging == true && gamePhase == "place") {
		
        if ((event.pageX > 100 && event.pageX < 750) && (event.pageY > 75 && event.pageY < 660)) {
            let temp = clickCoord(event.pageX, event.pageY);
            if (isValidShipCoord(temp.row, temp.col, curShipIndex + 1, playerBoards[playerTurn].ships[curShipIndex].orientation)) {
                rowSelect = temp.row;
                colSelect = temp.col;
                boardSelect = temp.playerBoard;
                isHighlight = true;
				placeShipPic(rowSelect, colSelect);
            }
            else {
				cancelShipMove();
                window.alert("Invalid placement! Try again within the grid.")
            }
        }
		
		else {
			cancelShipMove();
		}
		
		console.log("boardSelect: ", boardSelect);
		shipIc.isDragging = false;
		console.log("isDragging: ", shipIc.isDragging);

    }
})

