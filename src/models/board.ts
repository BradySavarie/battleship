/* This module defines a Gameboard class that represents a game board for battleships. It has properties for ship positions and attack state, and includes a method to place a ship on the board. */

import { Ship } from './ship';
import { getCriticalHit, setCriticalHit } from './state';

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

        ship.isPlaced = true;
        return true;
    }

    rotateShip(ship: Ship, index: number, row: number, col: number) {
        let prevState = this.shipPositions;

        // change orientation of ship
        ship.changeOrientation();

        // find and replace index values with null in shipPositions array
        this.shipPositions = this.shipPositions.map((row) =>
            row.map((element) => (element === index ? null : element))
        );

        // call placeShip using input coordinates
        let isValid = this.placeShip(ship, index, [row, col]);

        // Reset ship and positions array if isValid is false, return status
        if (isValid) return true;
        else {
            this.shipPositions = prevState;
            ship.changeOrientation();
            return false;
        }
    }

    randomizeShips(ships: Ship[]) {
        // clear positioned ships
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                this.shipPositions[i][j] = null;
            }
        }
        // while ship is not placed, generate random coordinate and attempt placement
        ships.forEach((ship, index) => {
            let isSuccessful;

            while (!isSuccessful) {
                let row = Math.floor(Math.random() * 10);
                let col = Math.floor(Math.random() * 10);
                let orientationChanged = Math.random() < 0.5;

                if (orientationChanged) {
                    ship.changeOrientation();
                }

                isSuccessful = this.placeShip(ship, index, [row, col]);
            }
        });
    }

    receiveAttack(coordinate: number[], ships: Ship[]): boolean {
        const [row, col] = coordinate;

        if (
            this.attackState[row][col] === 'miss' ||
            this.attackState[row][col] === 'hit'
        ) {
            // Return false for unsuccessful attack if coordinate has been previously attacked
            return false;
        } else if (this.shipPositions[row][col] === null) {
            // Update state to miss if coordinate empty
            this.attackState[row][col] = 'miss';
        } else {
            // Register a hit
            let index = this.shipPositions[row][col] as number;
            this.attackState[row][col] = 'hit';
            ships[index].hit();

            // Update critical hit variable
            if (ships[index].isSunk()) {
                setCriticalHit(true);
            } else {
                setCriticalHit(false);
            }
        }
        // Return to true to indicate a successful attack
        return true;
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

        // Return true to indicate a valid placement
        return true;
    }

    chooseShipToAttack(ships: Ship[]) {
        let targetShip: Ship | boolean = false;

        for (let ship of ships) {
            let isSunk = ship.isSunk();
            if (!isSunk && ship.hits > 0) {
                targetShip = ship;
                break;
            }
        }

        return targetShip;
    }

    generateRandomCoordinate() {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        return [row, col];
    }
}
