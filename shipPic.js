let shipIc = {
	image: ' ', //stores the link to the sonar icon image
	x: 820, //x position to draw the sonar icon
	y: 60, //y position to draw the sonar icon
	prevX: 800, //previous x position before the sonar icon is clicked and dragged
	prevY: 125, //previous y position before the sonar icon is clicked and dragged
	width: 65,
	height: 140, //size of the sonar icon
	//size: 100,
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
	
    if(gamePhase == "place")
		context.drawImage(shipIc.image, shipIc.x, shipIc.y, shipIc.width, shipIc.height);
	
	else if (gamePhase == "play") {
		for (let i = 0; i < shipNum; i++) {
			if (playerBoards[op(playerTurn)].ships[i].isSunk()) {
				playerBoards[op(playerTurn)].ships[i].draw(true);
			}
		}
	}
}

function placeShipPic(centerR, centerC) {
	
	if (centerC >= 0 && centerC < 10 && centerR >= 0 && centerR < 9)
	{
        shipIc.x = (100 + ((colSelect) * 65));
		shipIc.y = (75 + ((rowSelect) * 65));
        shipIc.prevX = shipIc.x;
		shipIc.prevY = shipIc.y;
        if (shipIc.isPlaced == true) {
            shipIc.prevX = shipIc.x;
		    shipIc.prevY = shipIc.y;
        }
        else {
            shipIc.isPlaced = true;
		    shipIc.height = 65;
		    shipIc.width = 65+((curShipIndex)*65);
        }

		playerBoards[playerTurn].ships[curShipIndex].setImage();
	}
	
	else
	{
		cancelShipMove();
		console.log("Invalid ship placement");
	}
}

/**
* @pre after dragging the sonar icon, mouseup event sensed outside of the valid sonar placement boundary
* @post sonar icon returned to previous position before being dragged
*/
function cancelShipMove() {
	let tempX = shipIc.prevX;
	let tempY = shipIc.prevY;
	console.log(shipIc.prevX, shipIc.prevY);
	shipIc.x = tempX;
	shipIc.y = tempY;
}

function resetShip() {
	shipIc.isEnabled = false;
	shipIc.x = 820;
	shipIc.y = 60;
	shipIc.prevX = 800;
	shipIc.prevY = 125;
	shipIc.height = 140;
	shipIc.width = 65;
	//shipIc.size = 100;
	shipIc.isPlaced = false;
	shipIc.isDragging = false;
}

function eraseShip() {
	shipIc.width = 0;
}

function switchShipV() {
    shipIc.height = 65+((curShipIndex)*65);
    shipIc.width = 65;
	playerBoards[playerTurn].ships[curShipIndex].setImage();
}

function switchShipH() {
    shipIc.width = 65+((curShipIndex)*65);
    shipIc.height = 65;
	playerBoards[playerTurn].ships[curShipIndex].setImage();
}

