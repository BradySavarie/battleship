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
        // Does a ship exist at the target or any secondary coordinates?
        if (ship.orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                if (this.shipPositions[row][col + i] !== null) return false;
            }
        } else if (ship.orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                if (this.shipPositions[row + i][col] !== null) return false;
            }
        }
        // Is the ship too long to fit at this coordinate?
        return true;
    }
}
