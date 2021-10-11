class Board {
    constructor(shipNum) {
        this.shipNum = shipNum;
        this.shipsSunk = 0;
        this.key = [];
        this.game = [];
        for (let r = 0; r < 9; r++) {
            this.key[r] = [];
            this.game[r] = [];
            for (let c = 0; c < 10; c++) {
                this.key[r][c] = ".";
                this.game[r][c] = ".";
            }
        }
        this.ships = [];
        for (let i = 0; i < this.shipNum; i++) {
            this.ships[i] = new Ship(i+1);
        }
		
		this.sonarUsed = false;
    }

    /**
     * Makes sure that the ship coordinates are in a valid setup position
     * @param {number} shipIndex a spot in the ships array
     * @returns {boolean} shows if the coordinates are valid
     */
    isValidSetShip(shipIndex) {
        let coords = this.ships[shipIndex].getPosition();
        for (let i = 0; i < shipIndex + 1; i++) {
            let c = coords[i];
            if (this.key[c[0]][c[1]] != ".") {
                return false;
            }
        }
        return true;
    }

    /**
     * Takes shipIndex, gets the ship coordinates, and updates the key
     * @param {number} shipIndex a spot in the ships array
     */
    setShip(shipIndex) {
        let coords = this.ships[shipIndex].getPosition();
        for (let i = 0; i < shipIndex + 1; i++) {
            let c = coords[i];
            this.key[c[0]][c[1]] = "X";
        }
    }

    /**
     * Checks the board's game to see if it's a valid shot due to being open water
     * @param {number} r row index
     * @param {number} c column index
     * @returns {boolean} shows if the shot location is valid
     */
    isValidShot(r, c) {
        if (this.game[r][c] == "." || this.game[r][c] == "R" || this.game[r][c] == "W") {
            return true;
        }
		
		else {
			return false;
		}
    }

    /**
     * Checks the board's key to see if it's been hit
     * @param {number} r row index
     * @param {number} c column index
     * @returns {boolean} checks if the key has been hit
     */
    isHit(r, c) {
        if (this.key[r][c] == "X") {
            return true;
        }
        return false;
    }
    isAiHit(r, c) {
        if (this.key[r][c] == "H") {
            return true;
        }
        return false;
    }
    /**
     * Changes the coordinate value of the key to a "#" to indicate a miss on the opponent's board
     * @param {number} r row index
     * @param {number} c column index
     */
    setKeyMiss(r, c) {
        this.key[r][c] = "#";
    }

    /**
     * Changes the coordinate value of the game to a "#" to indicate a miss on the current player's board
     * @param {number} r row index
     * @param {number} c column index
     */
    // Use this on the current users board if missed
    // Meaning if p1 misses call board_p1.setGameMiss(r,c);
    // and if p2 misses call board_p2.setGameMiss(r,c);
    setGameMiss(r, c) {
        this.game[r][c] = "#";
    }

    /**
     * Iterates through all the board's ships and returns the index of the ship that isHit() at the hit location
     * @param {number} r row index
     * @param {number} c column index
     * @returns {number} the index of the ship that was hit
     */
    findHitShip(r, c) {
        let shipIndex = -1
        for (let i = 0; i < this.shipNum; i++) {
            if (this.ships[i].isHit(r,c)) {
                shipIndex = i;
            }
        }
        return shipIndex;
    }

    /**
     * Changes the coordinate value of the key to a "0" to indicate a hit on the opponent's board
     * @param {number} r row index
     * @param {number} c column index
     */
    setKeyHit(r, c) {
        this.key[r][c] = "0";
    }

    /**
     * Changes the coordinate value of the game to a "0" to indicate a hit on the current player's board
     * @param {number} r row index
     * @param {number} c column index
     */
    setGameHit(r, c) {
        this.game[r][c] = "0";
    }

    /**
     * Changes the coordinate values of an entire ship on the key to the
     * ship's length to indicate a sunken ship on the opponent's board
     * @param {number} shipLength the length of the given ship
     * @param {Array} coords an array of the given ship's coords
     */
    setKeySunkShip(shipLength, coords) {
        var shipChar = shipLength.toString();
        for(let i = 0; i < shipLength; i++) {
            var coord = coords[i];
            this.key[coord[0]][coord[1]] = shipChar;
        }
    }
	
	/**
	* @pre a unhit part of a ship is position at row r, column c of the game board array.
	* @pre postion at row r, column c is within sonar range
	* @post value at row r, column c of game board array is changed to 'R'
	* @param r row of position on the board
	* @param c column of position on the board
	*/
	revealShipPos(r, c) {
		if (this.game[r][c] == ".") {
			this.game[r][c] = "R";
		}
	}
	
	/**
	* @pre nothing in the position at row r, column c of the game board array.
	* @pre postion at row r, column c is within sonar range
	* @post value at row r, column c of game board array is changed to 'W'
	* @param r row of position on the board
	* @param c column of position on the board
	*/
	revealEmptyPos(r, c) {
		if (this.game[r][c] == ".") {
			this.game[r][c] = "W";
		}
	}

    /**
     * Changes the coordinate values of an entire ship on the game to the
     * ship's length to indicate a sunken ship on the current player's board
     * @param {number} shipLength the length of the given ship
     * @param {Array} coords an array of the given ship's coords 
     */
    setGameSunkShip(shipLength, coords) {
        var shipChar = shipLength.toString();
        for (let i = 0; i < shipLength; i++) {
            var coord = coords[i];
            this.game[coord[0]][coord[1]] = shipChar;
        }
    }
    SunkShip() {
        this.shipsSunk++;
    }

    isGameOver() {
        if (this.shipsSunk == this.shipNum) {
            return true;
        }
        return false;
    }
}

