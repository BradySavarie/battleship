import { Ship } from '../models/ship';

describe('tests hits method', () => {
    it('increments hits by 1', () => {
        let battleship = new Ship(4);
        battleship.hit();
        expect(battleship.hits).toBe(1);
    });
});

describe('tests isSunk method', () => {
    it('Sinks ship and tests return value', () => {
        let patrolBoat = new Ship(2);
        patrolBoat.hit();
        patrolBoat.hit();
        expect(patrolBoat.isSunk()).toBe(true);
    });
});

describe('tests changeOrientation method', () => {
    it('Changes orientation to vertical', () => {
        let patrolBoat = new Ship(2);
        patrolBoat.changeOrientation();
        expect(patrolBoat.orientation).toBe('vertical');
    });
});

describe('tests changeOrientation method', () => {
    it('Changes orientation back to horizontal', () => {
        let patrolBoat = new Ship(2);
        patrolBoat.changeOrientation();
        patrolBoat.changeOrientation();
        expect(patrolBoat.orientation).toBe('horizontal');
    });
});
