/* Represents the game board, including the positions of ships and the state of each cell (hit, miss, or empty). */

import { Ship } from './ship';

export class Gameboard {
    private board: Object;
    private attackState: Object;

    constructor(public boardSize: number = 10) {
        this.board = new Array(boardSize)
            .fill(false)
            .map(() => new Array(boardSize).fill(null));
        this.attackState = new Array(boardSize)
            .fill(false)
            .map(() => new Array(boardSize).fill(null));
    }

    placeShip(ship: Ship, coordinatePair: number[]) {
        let [xPos, yPos] = coordinatePair;
        // Is the ship too long to fit at this coordinate?

        // Does a ship already exist at this coordinate?
    }
}
