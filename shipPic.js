let shipIc = {
	image: ' ', //stores the link to the sonar icon image
	x: 820, //x position to draw the sonar icon
	y: 60, //y position to draw the sonar icon
	prevX: 820, //previous x position before the sonar icon is clicked and dragged
	prevY: 60, //previous y position before the sonar icon is clicked and dragged
	width: 65,
	height: 140, //size of the sonar icon
	isPlaced: false, //tracks if the sonar icon has been properly placed 
	isDragging: false
    };


   
    /**
* @pre gamePhase == "place"
* @post ship is drawn
*/
function drawShips() {
	for (let i = shipNum - 1; i > curShipIndex; i--) {
		if (playerBoards[playerTurn].ships[i].shipImage.isPlaced) {
			playerBoards[playerTurn].ships[i].draw(false);
		}
	}
	
    if(gamePhase == "place") {	
		context.drawImage(shipIc.image, shipIc.x, shipIc.y, shipIc.width, shipIc.height);
		context.fillStyle = "black";
		context.font = "12pt Georgia";
		context.fillText("Click and drag", 800, 40);
		context.fillText("to place ship", 805, 60);
	}
	
	else if (gamePhase == "play") {
		for (let i = 0; i < shipNum; i++) {
			if (playerBoards[op(playerTurn)].ships[i].isSunk()) {
				playerBoards[op(playerTurn)].ships[i].draw(true);
			}
		}
	}
}

function placeShipPic(centerR, centerC) {
    shipIc.x = (100 + ((colSelect) * 65));
	shipIc.y = (75 + ((rowSelect) * 65));
    shipIc.prevX = shipIc.x;
	shipIc.prevY = shipIc.y;
	
    shipIc.isPlaced = true;
}

/**
* @pre after dragging the sonar icon, mouseup event sensed outside of the valid sonar placement boundary
* @post sonar icon returned to previous position before being dragged
*/
function cancelShipMove() {
	let tempX = shipIc.prevX;
	let tempY = shipIc.prevY;
	shipIc.x = tempX;
	shipIc.y = tempY;
}

function resetShip() {
	shipIc.isEnabled = false;
	shipIc.x = 820;
	shipIc.y = 60;
	shipIc.prevX = 820;
	shipIc.prevY = 60;
	shipIc.height = 65 + curShipIndex*65;
	shipIc.width = 65;
	shipIc.isPlaced = false;
	shipIc.isDragging = false;
}

function switchShipV() {
    shipIc.height = 65+((curShipIndex)*65);
    shipIc.width = 65;
}

function switchShipH() {
    shipIc.width = 65+((curShipIndex)*65);
    shipIc.height = 65;
}

