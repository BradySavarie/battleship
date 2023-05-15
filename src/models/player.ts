/* This module defines a class called Human that implements the Player interface. The Human class has properties for a game board (Gameboard) and an array of ships (Ship[]), and it includes a method to initialize the ships. */

import { Ship } from './ship';
import { Gameboard } from './board';

interface Player {
    board: Gameboard;
    ships: Ship[];
}

export class Human implements Player {
    board: Gameboard = new Gameboard();
    ships: Ship[] = [];

    constructor() {
        this.initializeShips();
    }

    private initializeShips() {
        const shipsData: { length: number; name: string }[] = [
            { length: 5, name: 'Carrier' },
            { length: 4, name: 'Battleship' },
            { length: 3, name: 'Cruiser' },
            { length: 3, name: 'Submarine' },
            { length: 2, name: 'Destroyer' },
        ];

        for (let data of shipsData) {
            let ship = new Ship(data.length, data.name);
            this.ships.push(ship);
        }
    }
}
