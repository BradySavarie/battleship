import { Ship } from '../models/ship';

describe('test hits method', () => {
    it('increments hits by 1', () => {
        let battleship = new Ship(4);
        battleship.hit();
        expect(battleship.hits).toBe(1);
    });
});

describe('check if ship is sunk', () => {
    it('Sinks ship and tests isSunk for accuracy', () => {
        let patrolBoat = new Ship(2);
        patrolBoat.hit();
        patrolBoat.hit();
        expect(patrolBoat.isSunk()).toBe(true);
    });
});
