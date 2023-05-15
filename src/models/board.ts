/* This module defines a Gameboard class that represents a game board for battleships. It has properties for ship positions and attack state, and includes a method to place a ship on the board. */

import { Ship } from './ship';

export class Gameboard {
    public shipPositions: (null | number)[][];
    public attackState: (null | number)[][];

    constructor(readonly boardSize: number = 10) {
        this.shipPositions = new Array(boardSize)
            .fill(false)
            .map(() => new Array(boardSize).fill(null));
        this.attackState = new Array(boardSize)
            .fill(false)
            .map(() => new Array(boardSize).fill(null));
    }

    placeShip(ship: Ship, coordinatePair: number[]) {
        let [row, col] = coordinatePair;
        // Does a ship already exist at this coordinate?
        if (this.shipPositions[row][col] !== null) return false;
        // Is the ship too long to fit at this coordinate?
    }
}
