/* This module is used to create player objects that conform to the specified isPlayer interface */
import { Ship } from './ship';
import { Gameboard } from './board';

interface Player {
    board: Gameboard;
    ships: Ship[];
    initializeShips(): void;
}

export class Human implements Player {
    board: Gameboard = new Gameboard();
    ships: Ship[] = [];

    constructor() {
        this.initializeShips();
    }

    initializeShips(): void {
        const carrier = new Ship(5);
        const battleship = new Ship(4);
        const cruiser = new Ship(3);
        const submarine = new Ship(3);
        const destroyer = new Ship(2);

        this.ships.push(carrier);
        this.ships.push(battleship);
        this.ships.push(cruiser);
        this.ships.push(submarine);
        this.ships.push(destroyer);
    }
}

const player = new Human();
console.log(player.board.shipPositions[0]);
