/* This module defines a Gameboard class that represents a game board for battleships. It has properties for ship positions and attack state, and includes a method to place a ship on the board. */

import { Ship } from './ship';

export class Gameboard {
    public shipPositions: (null | number)[][];
    public attackState: (null | string)[][];

    constructor(readonly boardSize: number = 10) {
        this.shipPositions = new Array(boardSize)
            .fill(false)
            .map(() => new Array(boardSize).fill(null));
        this.attackState = new Array(boardSize)
            .fill(false)
            .map(() => new Array(boardSize).fill(null));
    }

    placeShip(
        ship: Ship,
        shipIndex: number,
        coordinatePair: number[]
    ): boolean {
        const [row, col] = coordinatePair;

        // Validate coordinates
        let isValid = this.validatePlacement(ship, row, col);
        if (!isValid) return false;

        // Insert ships index number into shipPositions array
        if (ship.orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.shipPositions[row][col + i] = shipIndex;
            }
        } else if (ship.orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.shipPositions[row + i][col] = shipIndex;
            }
        }

        return true;
    }

    receiveAttack(coordinate: number[], ships: Ship[]): boolean {
        const [row, col] = coordinate;
        // Validate that coordinate has not been previously attacked
        if (this.attackState[row][col] === 'miss') {
            return false;
        } else if (this.shipPositions[row][col] === null) {
            // Update state to miss
            this.attackState[row][col] = 'miss';
            return true;
            // Update state to hit
        } else {
            let index = this.shipPositions[row][col] as number;
            this.attackState[row][col] = 'hit';
            ships[index].hit();
            return true;
        }
    }

    validatePlacement(ship: Ship, row: number, col: number): boolean {
        // Will the ship collide with another ship?
        if (ship.orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                if (
                    col + i > this.boardSize - 1 ||
                    this.shipPositions[row][col + i] !== null
                )
                    return false;
            }
        } else if (ship.orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                if (
                    row + i > this.boardSize - 1 ||
                    this.shipPositions[row + i][col] !== null
                )
                    return false;
            }
        }

        // Will the ship extend past the edge of the board?
        if (ship.orientation === 'horizontal') {
            if (col + ship.length > this.boardSize) return false;
        } else if (ship.orientation === 'vertical') {
            if (row + ship.length > this.boardSize) return false;
        }

        return true;
    }
}
