function validSonarPlace(centerX, centerY) {
	if (centerX > 0 && centerX < 10 && centerY > 0 && centerY < 9)
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
