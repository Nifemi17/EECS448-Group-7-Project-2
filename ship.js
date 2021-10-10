/**
 * a class for the ships
 */
class Ship {
    constructor(length) {
        this.length = length;
        this.HP = length;
        this.orientation = "H"; // Default Horizontal
		this.shipImage = {
			image: ' ', //stores the link to the sonar icon image
			x: 0, //x position to draw the sonar icon
			y: 0, //y position to draw the sonar icon
			width: 0,
			height: 0, //size of the sonar icon
			isPlaced: false
		};
    }

    /**
     * Switches the orientation of the ship in the place phase
     */
    switchOrientation() {
        if (this.orientation == "V") {
            this.orientation = "H";
            switchShipH();
        }
        else {
            this.orientation = "V";
            switchShipV();
        }
    }

    /**
     * sets up the array this.coords with the values the player selected
     * @param {number} r row index
     * @param {number} c column index
     */
    // main.js will have the logic to make sure it's a valid position.
    setPosition(r, c) {
        this.r = r;
        this.c = c;
        this.coords = [];
        for (let i = 0; i < this.length; i++) {
            if (this.orientation == "H") {
                this.coords[i] = [this.r, this.c + i];
            }
            else {
                this.coords[i] = [this.r + i, this.c];
            }
        }
    }

    // This method can be used after setPosition has been called
    // return this.coords
    /**
     * returns the coordinates of the ship after it's been put in place
     * @returns {array} array with the coords the ship occupies
     */
    getPosition() {
        if (this.r != null && this.c != null) {
            return this.coords;
        }
        else {
            return []
        }
    }

    /**
     * Iterates through the coordinate array to see if the given row and column match any entries
     * @param {number} r row index
     * @param {number} c column index
     * @returns {boolean} shows if (r,c) is in the coord array
     */
    isHit(r, c) {
        for (let i = 0; i < this.length; i++) {
            let coord = this.coords[i];
            if (r == coord[0] && c == coord[1]) {
                return true;
            }
        }

        return false;
    }

    /**
     * hits a ship, reducing its hp
     */
    setHit() {
        this.HP--;
    }

    /**
     * returns true if hp is 0 or less, false if not
     * @returns {boolean} shows if hp is 0
     */
    isSunk() {
        if (this.HP <= 0) {
            return true;
        }
        return false;
    }
	
	setImage() {
		this.shipImage.image = shipIc.image;
		this.shipImage.x = shipIc.x;
		this.shipImage.y = shipIc.y;
		this.shipImage.width = shipIc.width;
		this.shipImage.height = shipIc.height;
		this.shipImage.isPlaced = true;
	}
	
	draw(isOpponent) {
		if (isOpponent) {
			context.drawImage(this.shipImage.image, this.shipImage.x + 900, this.shipImage.y, this.shipImage.width, this.shipImage.height);
		}
		
		else {
			context.drawImage(this.shipImage.image, this.shipImage.x, this.shipImage.y, this.shipImage.width, this.shipImage.height);
		}
	}
	
	getIsPlaced() {
		return this.shipImage.isPlaced;
	}
}