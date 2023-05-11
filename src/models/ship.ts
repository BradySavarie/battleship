/* Represents a single ship on the board, with properties like its length, number of hits, and isSunk */

export class Ship {
    length: number;
    hits: number;
    isSunk: boolean;

    constructor(length: number) {
        this.length = length;
        this.hits = 0;
        this.isSunk = false;
    }

    hit() {
        this.hits++;
    }
}
