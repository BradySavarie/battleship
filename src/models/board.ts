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
        const [row, col] = coordinatePair;

        // Will the ship collide with another ship?
        if (ship.orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                if (this.shipPositions[row][col + i] !== null) return false;
            }
        } else if (ship.orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                if (this.shipPositions[row + i][col] !== null) return false;
            }
        }
        // Will the ship extend past the edge of the board?
        if (ship.orientation === 'horizontal') {
            if (this.boardSize - ship.length > col + 1) return false;
        } else if (ship.orientation === 'vertical') {
            if (this.boardSize - ship.length > row + 1) return false;
        }
        // insert ships index number into each valid coordinate
        return true;
    }
}
