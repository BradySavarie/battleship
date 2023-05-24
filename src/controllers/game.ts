// Responsible for handling the general flow of the game.
import { Human, Computer } from '../models/player';
import { setActivePlayer } from '../models/state';
import { initialGameboardRender, renderShips } from '../views/placeShipsScreen';

export function startGame() {
    let human = new Human();
    let computer = new Computer();
    placeComputerShips(computer);
    setActivePlayer(human);
    initialGameboardRender(human.board.boardSize);
    renderShips(human.ships);
}

function placeComputerShips(computer: Computer) {
    // for each ship
    computer.ships.forEach(function (value, index) {
        let isSuccessful;
        // while the ship has not successfully been placed on the board
        while (!isSuccessful) {
            // randomly generate a valid coordinate pair
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            // attempt to place the ship on the board
            isSuccessful = computer.board.placeShip(value, index, [row, col]);
        }
    });
}
