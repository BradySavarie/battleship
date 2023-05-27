// Responsible for handling the general flow of the game.
import { Human, Computer } from '../models/player';
import { setActivePlayer } from '../models/state';
import { buildHumanGameboard, renderFleet } from '../views/placeShipsScreen';
import { buildComputerGameboard } from '../views/battleScreen';

let human = new Human();
let computer = new Computer();

export function initializePlaceShipsScreen() {
    setActivePlayer(human);
    buildHumanGameboard(human.board.boardSize);
    renderFleet(human.ships);
}

export function initializeBattleScreen() {
    placeComputerShips(computer);
    buildComputerGameboard(computer.board.boardSize);
}

function placeComputerShips(computer: Computer) {
    // for each ship
    computer.ships.forEach(function (ship, index) {
        let isSuccessful;
        // while the ship has not successfully been placed on the board
        while (!isSuccessful) {
            // randomly generate a valid coordinate pair
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            // attempt to place the ship on the board
            isSuccessful = computer.board.placeShip(ship, index, [row, col]);
        }
        ship.isPlaced = true;
    });
}
