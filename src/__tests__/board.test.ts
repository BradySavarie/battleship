import { Gameboard } from '../models/board';
import { Human } from '../models/player';

describe('tests placeShips method', () => {
    it('Checks if a ship collides with another ship horizontally', () => {
        // Manually insert a test ship of length 5 horizontally
        let testPlayer = new Human();
        let testCoordinate = [5, 5];
        let [row, col] = testCoordinate;
        for (let i = 0; i < testPlayer.ships[0].length; i++) {
            testPlayer.board.shipPositions[row][col + i] = 1;
        }
        // Does the start coordinate collide?
        expect(
            testPlayer.board.placeShip(testPlayer.ships[0], testCoordinate)
        ).toBe(false);
        // Does the end coordinate collide?
        expect(
            testPlayer.board.placeShip(testPlayer.ships[0], [row, col - 4])
        ).toBe(false);
    });
});

describe('tests placeShips method', () => {
    it('Checks if a ship collides with another ship vertically', () => {
        // Manually insert a test ship of length 3 vertically
        let testPlayer = new Human();
        let testCoordinate = [5, 5];
        let [row, col] = testCoordinate;
        testPlayer.ships[2].changeOrientation();
        for (let i = 0; i < testPlayer.ships[2].length; i++) {
            testPlayer.board.shipPositions[row + i][col] = 1;
        }
        // Does the start coordinate register a collision?
        expect(
            testPlayer.board.placeShip(testPlayer.ships[2], testCoordinate)
        ).toBe(false);
        // Does the end coordinate register a collision?
        expect(
            testPlayer.board.placeShip(testPlayer.ships[2], [row - 2, col])
        ).toBe(false);
    });
});

describe('tests placeShips method', () => {
    it('Checks if a ship extends past the edge vertically', () => {
        // Create a player to test a ship with
        let testPlayer = new Human();
        testPlayer.ships[0].changeOrientation();
        // Does the ship extend past the edge of the board?
        expect(testPlayer.board.placeShip(testPlayer.ships[0], [6, 0])).toBe(
            false
        );
    });
});

describe('tests placeShips method', () => {
    it('Checks if a ship extends past the edge horizontally', () => {
        // Create a player to test a ship with
        let testPlayer = new Human();
        // Does the ship extend past the edge of the board?
        expect(testPlayer.board.placeShip(testPlayer.ships[0], [0, 6])).toBe(
            false
        );
    });
});
