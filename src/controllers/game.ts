// Responsible for handling the general flow of the game.
import { Human, Computer } from '../models/player';
import {
    getCriticalHit,
    setActivePlayer,
    setCriticalHit,
} from '../models/state';
import {
    buildHumanGameboard,
    renderFleet,
    renderGameBoard,
} from '../views/placeShipsScreen';
import {
    buildComputerGameboard,
    renderAttackState,
    renderSunkenShip,
    renderResultMessage,
    clearResultMessage,
    renderEndGameModal,
} from '../views/battleScreen';
import { Ship } from '../models/ship';
import { setGameStatus } from '../models/state';

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
    // Humans turn
    if (activePlayer instanceof Human) {
        // target computer
        setActivePlayer(computer);
        // send an attack
        let attackSuccess = computer.board.receiveAttack(
            [row, col],
            computer.ships
        );
        // reset target and return if unsuccesful
        if (!attackSuccess) {
            setActivePlayer(human);
            return;
        }
        // check for sunken ship
        let criticalHit = getCriticalHit();
        if (criticalHit) {
            // if sunk, render sunken ship and results message
            let sunkenShipName = renderSunkenShip(
                computer.board.shipPositions,
                computer.ships,
                row,
                col
            );
            renderResultMessage(
                computer.board.attackState[row][col],
                sunkenShipName
            );
        } else {
            // if not sunk, render sunken ship and results message
            renderAttackState();
            renderResultMessage(computer.board.attackState[row][col]);
        }

        // Check if end game conditions are met
        let gameOver = isGameOver(computer.ships);

        if (gameOver) {
            renderEndGameModal(human);
        } else {
            // Trigger computers turn
            setTimeout(() => {
                takeTurn(computer, row, col);
            }, 1000);
        }
    }
    // Computers turn
    else {
        setActivePlayer(human);
        let attackSuccess = false;
        let coordinate: number[] = [];
        // send attack
        while (!attackSuccess) {
            coordinate = generateComputersMove(human);
            attackSuccess = human.board.receiveAttack(coordinate, human.ships);
        }
        // update attacked row and col
        row = coordinate[0];
        col = coordinate[1];

        // render attack results
        let criticalHit = getCriticalHit();
        if (criticalHit) {
            let sunkenShipName = renderSunkenShip(
                human.board.shipPositions,
                human.ships,
                row,
                col
            );
            renderResultMessage(
                human.board.attackState[row][col],
                sunkenShipName
            );
        } else {
            renderAttackState();
            renderResultMessage(human.board.attackState[row][col]);
        }

        // Check if end game conditions are met
        let gameOver = isGameOver(human.ships);

        if (gameOver) {
            renderEndGameModal(computer);
        } else {
            setTimeout(() => {
                clearResultMessage();
            }, 1000);
        }
    }
    setCriticalHit(false);
}

export function isGameOver(ships: Ship[]): boolean {
    let gameOver = true;
    ships.forEach((ship) => {
        if (!ship.isSunk()) {
            gameOver = false;
            return;
        }
    });
    if (gameOver) {
        setGameStatus('gameOver');
        return true;
    } else {
        return false;
    }
}

export function generateComputersMove(human: Human): number[] {
    let targetShip = human.board.findDamagedShip(human.ships);
    let coordinate: number[];
    if (targetShip === null) {
        coordinate = human.board.generateRandomCoordinate();
        return coordinate;
    }
    let coordinates = human.board.findDamagedShipsCoordinates(
        targetShip,
        human.ships
    );
    let targetCoordinate = human.board.findValidAdjacentCoordinate(coordinates);
    return targetCoordinate;
}
