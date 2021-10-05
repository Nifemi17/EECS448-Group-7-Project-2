let sonarIc = {image: ' ', x: 800, y: 250, size: 100, isEnabled: false, isPlaced: false};

function validSonarPlace(centerR, centerC) {
	if (centerC > 0 && centerC < 9 && centerR > 0 && centerR < 8)
	{
		return true;
	}
	
	else
	{
		return false;
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