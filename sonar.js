/**
*  helper function to manage the sonar ability
*/

/**
*  Stores all data used when managing the sonar ability and icon.
*/
let sonarIc = {
	image: ' ', //stores the link to the sonar icon image
	x: 800, //x position to draw the sonar icon
	y: 125, //y position to draw the sonar icon
	prevX: 800, //previous x position before the sonar icon is clicked and dragged
	prevY: 125, //previous y position before the sonar icon is clicked and dragged
	size: 100, //size of the sonar icon
	isEnabled: false, //tracks if the sonar ability is enabled
	isPlaced: false, //tracks if the sonar icon has been properly placed 
	isDragging: false}; //tracks if the sonar icon is currently being dragged


/**
* @pre gamePhase == "play"
* @post Instructions for sonar ability are drawn on canvas
*/
function drawSonarIns() {
	context.fillText("Sonar:", 625, 700);
	context.fillText("reveals the enemy ship positions within a 3x3 grid.", 625, 725);
	context.fillText("when enabled, click and drag icon to place and", 625, 750);
	context.fillText("'fire' button to confirm.", 625, 775);
	context.fillText("R: enemy ship.  W: empty water", 625, 825);
	context.stroke;
}
/**
* @pre gamePhase == "play"
* @post sonar icon (if enabled) and toggle button are drawn on canvas
*/
function drawSonar() {
	drawBox();
	
	if (sonarIc.isEnabled) {
		context.font = "12pt Georgia";
		context.fillText("Disable", 825, 290);
		context.fillText("Sonar", 830,320);
		context.stroke();
		
		context.drawImage(sonarIc.image, sonarIc.x, sonarIc.y, sonarIc.size, sonarIc.size);
	}
		
	else {
		context.font = "12pt Georgia";
		context.fillText("Enable", 827, 290);
		context.fillText("Sonar", 830, 320);
		context.stroke();
	}
	
}

/**
* @pre sonarIc.isEnabled == true
* @post sonar icon is enlarged and drawn on board, sonarIc.isPlaced = true
* @param centerR the row through the center of the placed icon
* @param centerC the column through the center of the placed icon
*/
function placeSonar(centerR, centerC, boardSelect) {
	if (centerC > 0 && centerC < 9 && centerR > 0 && centerR < 8 && boardSelect == 1)
	{
		sonarIc.isPlaced = true;
		sonarIc.x = (1000 + ((colSelect - 1) * 65));
		sonarIc.y = (75 + ((rowSelect - 1) * 65));
		sonarIc.size = 195;
		sonarIc.prevX = sonarIc.x;
		sonarIc.prevY = sonarIc.y;
	}
	
	else
	{
		cancelSonarMove();
		console.log("Invalid sonar placement");
	}
}

/**
* @pre sonar icon placed on board and fire button is pressed
* @return true if position at row r, column c in tBoard's key array holds an unhit ship, false otherwise
* @param r the row of the position to be checked
* @param c the column of the position to be checked
* @param plBoard the current player's board object
* @param opBoard the opponent's board object
*/
function revealShips(r, c, opBoard, plBoard) {
	console.log("c: ", c, "r: ", r);
	if (opBoard.isHit(r, c)) {
		plBoard.revealShipPos(r, c);
	}
	else {
		plBoard.revealEmptyPos(r, c);
	}
}

/**
* resets sonarIc's variables to their initial values when the sonar ability is disabled
*/
function resetSonar() {
	sonarIc.isEnabled = false;
	sonarIc.x = 800;
	sonarIc.y = 125;
	sonarIc.prevX = 800;
	sonarIc.prevY = 125;
	sonarIc.size = 100;
	sonarIc.isPlaced = false;
}

/**
* @pre after dragging the sonar icon, mouseup event sensed outside of the valid sonar placement boundary
* @post sonar icon returned to previous position before being dragged
*/
function cancelSonarMove() {
	let tempX = sonarIc.prevX;
	let tempY = sonarIc.prevY;
	console.log(sonarIc.prevX, sonarIc.prevY);
	sonarIc.x = tempX;
	sonarIc.y = tempY;
}

/**
* draws the box around the enable/disable sonar button 
*/
function drawBox() {
	context.beginPath();
	context.moveTo(800, 250);
	context.lineTo(900, 250);
	context.lineTo(900, 350);
	context.lineTo(800, 350);
	context.closePath();
	context.strokeStyle = 'red';
	context.lineWidth = 4;		
	context.stroke();
}