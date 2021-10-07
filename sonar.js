/**
*  helper function to manage the sonar ability
*/

/**
*  Stores all data used when managing the sonar ability.
*/
let sonarIc = {image: ' ', x: 800, y: 125, size: 100, isEnabled: false, isPlaced: false, isDragging: false};


/**
* draws sonar guidelines
*/

function drawSonarIns(context) {
	context.fillText("Sonar:", 625, 700);
	context.fillText("reveals the enemy ship positions within a 3x3 grid", 625, 725);
	context.fillText("when enabled, click on board to place and", 625, 775);
	context.fillText("'fire' button to confirm.", 625, 800);
	context.fillText("R: enemy ship.  W: empty water", 625, 825);
	context.stroke;
}
/**
* draws the sonar icon image as a canvas element
* @param context canvas context from main.js
*/
function drawSonar(context) {
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
*
*/
function placeSonar(centerR, centerC) {
	if (centerC > 0 && centerC < 9 && centerR > 0 && centerR < 8)
	{
		sonarIc.isPlaced = true;
		sonarIc.x = (1000 + ((colSelect - 1) * 65));
		sonarIc.y = (75 + ((rowSelect - 1) * 65));
		sonarIc.size = 195;
	}
	
	else
	{
		console.log("Invalid sonar placement");
	}
}

function revealShips(r, c, tBoard) {
	console.log("c: ", c, "r: ", r);
	if (tBoard.isHit(r, c)) {
		return true;
	}
	return false;
}

function resetSonar() {
	sonarIc.isEnabled = false;
	sonarIc.x = 800;
	sonarIc.y = 125;
	sonarIc.size = 100;
	sonarIc.isPlaced = false;
}

function drawBox() {
	context.beginPath();
	context.moveTo(800, 250);
	context.lineTo(900, 250);
	context.lineTo(900, 350);
	context.lineTo(800, 350);
	context.closePath();
	context.strokeStyle = 'red';
	context.lineWidth = 6;		
	context.stroke();
}