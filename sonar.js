let sonarIc = {image: ' ', x: 800, y: 250, size: 100, isEnabled: false, isPlaced: false};


function drawSonar(context) {
	context.drawImage(sonarIc.image, sonarIc.x, sonarIc.y, sonarIc.size, sonarIc.size);
}

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
	sonarIc.y = 250;
	sonarIc.size = 100;
	sonarIc.isPlaced = false;
}