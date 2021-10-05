/*
----------------------------------------------------------------------------------
GAME SETUP:
Board Size: 9x10, columns denoted by letters (A-J), rows are denoted by number (1-9).
Number of Ships: Given by user, Minumum of 1 and a maximum of 6.
Types of Ships: This will be based on the ammount of ships chosen, If 1 ship is
chosen then each player gets a single 1x1 ship.
----------------------------------------------------------------------------------
*/

//SECTION 1: PRINT MAIN SCREEN AND RECORD NUMBER OF SHIPS (MAKE SURE VALID NUMBER)

/**
 * draws the start menu for ship selection
 */
 function gameSetup()
 {
     context.font = "30pt Georgia";
     context.fillText("Battleship Game", (width/2)-140, height/4);
     context.font = "18pt Georgia";
     context.fillStyle = "black";
     context.fillText("Press a key:", (width/2)-60, (height/4)+100);
     context.fillText("Select a number of ships. 1-6", (width/2)-150, (height/4)+50);
     context.beginPath();
     context.moveTo((width/2)-140, 600);
     context.lineTo((width/2)+140, 600);
     context.lineTo((width/2)+140, 700);
     context.lineTo((width/2)-140, 700);
     context.lineTo((width/2)-140, 600);
     context.strokeStyle = 'black';
     context.lineWidth = 2;
     context.stroke();
     context.closePath();
     context.fillText("Confirm Selection", (width/2)-100, 655);
     if(userShips != null){
         context.fillText(userShips, (width/2), 450);
     }
 }


 /**
 * Takes user input for a number of ships and checks it's valid, then if it is sets the number of ships
 * @param {number} n stores user input
 */
function setShipNum(n){
    if(n != "1" && n != "2" && n != "3" && n != "4" && n != "5" && n != "6"){
        console.log("Throw");
        throw "Invalid number, pick again";
    }
    else{
        console.log("No Throw");
        shipNum = n;
    }
}


//SECTION 2: SETTING THE SHIPS
/**
 * Places a ship at the highlighted coordinate from setHighlight
 */
 function Confirm() {
    console.log("Hello confirm!");
    if (playerBoards[playerTurn].isValidSetShip(curShipIndex)) {
        playerBoards[playerTurn].setShip(curShipIndex);
        curShipIndex--;

        if (curShipIndex < 0) {
            if (playerTurn == 1) {
                playerTurn = 0;
                gamePhase = "play";
                isHighlight = false;
            }
            else {
                curShipIndex = shipNum - 1;
                playerTurn = 1;
            }
        }
    }
    else {
        window.alert("Invalid placement! Try again in a spot with no ship.");
    }
}


/**
 * Draws a red square around a selected coordinate
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 * @param {number} board value storing either the left or right board
 */
 function setHighlight(x, y, board)
 {
     //if the selection is on the left board, draws a red square surrounding selection.
     if(board == 0){
             context.beginPath();
             context.moveTo(100 + (x * 65), 75 + (y * 65));
             context.lineTo(165 + (x * 65), 75 + (y * 65));
             context.lineTo(165 + (x * 65), 140 + (y * 65));
             context.lineTo(100 + (x * 65), 140 + (y * 65));
             context.lineTo(100 + (x * 65), 75 + (y * 65));
             context.strokeStyle = 'red';
             context.lineWidth = 4;
             context.stroke();
             context.closePath();
     }
     //if the selection is on the right board, draws a red square surrounding selection.
     if(board == 1){
             context.beginPath();
             context.moveTo(1000 + (x * 65), 75 + (y * 65));
             context.lineTo(1065 + (x * 65), 75 + (y * 65));
             context.lineTo(1065 + (x * 65), 140 + (y * 65));
             context.lineTo(1000 + (x * 65), 140 + (y * 65));
             context.lineTo(1000 + (x * 65), 75 + (y * 65));
             context.strokeStyle = 'red';
             context.lineWidth = 4;
             context.stroke();
             context.closePath();
     }
 }