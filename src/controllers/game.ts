// Responsible for handling the general flow of the game.
import { Human, Computer } from '../models/player';
import { setActivePlayer } from '../models/state';
import {
    buildHumanGameboard,
    renderFleet,
    renderGameBoard,
} from '../views/placeShipsScreen';
import {
    buildComputerGameboard,
    renderAttackState,
    renderResultMessage,
    clearResultMessage,
} from '../views/battleScreen';

let human = new Human();
let computer = new Computer();

export function initializePlaceShipsScreen() {
    setActivePlayer(human);
    buildHumanGameboard(human.board.boardSize);
    renderFleet(human.ships);
}

export function initializeBattleScreen() {
    renderGameBoard();
    placeComputerShips(computer);
    buildComputerGameboard(computer.board.boardSize);
}

function placeComputerShips(computer: Computer) {
    // for each ship
    computer.ships.forEach(function (ship, index) {
        let isSuccessful;
        // while the ship has not successfully been placed on the board
        while (!isSuccessful) {
            // randomly rotate and generate a valid coordinate pair
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            let orientationChanged = Math.random() < 0.5;

            if (orientationChanged) {
                ship.changeOrientation();
            }
            // attempt to place the ship on the board
            isSuccessful = computer.board.placeShip(ship, index, [row, col]);
        }
        ship.isPlaced = true;
    });
}

export function takeTurn(
    activePlayer: Human | Computer,
    row: number,
    col: number
) {
    if (activePlayer instanceof Human) {
        setActivePlayer(computer);
        computer.board.receiveAttack([row, col], computer.ships);
        renderAttackState();
        renderResultMessage(computer.board.attackState[row][col]);
        setTimeout(() => {
            takeTurn(computer, row, col);
        }, 1000);
    } else {
        setActivePlayer(human);
        human.board.receiveAttack([row, col], human.ships);
        renderAttackState();
        renderResultMessage(human.board.attackState[row][col]);
        setTimeout(() => {
            clearResultMessage();
        }, 1000);
    }
}
