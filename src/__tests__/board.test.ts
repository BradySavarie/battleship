import { Gameboard } from '../models/board';
import { Human } from '../models/player';

describe('tests placeShips method', () => {
    it('Checks if a ship can be placed on top of an existing ship horizontally', () => {
        // Manually insert a test ship of length 5 horizontally
        let testPlayer = new Human();
        let testCoordinate = [5, 5];
        let [row, col] = testCoordinate;
        for (let i = 0; i < testPlayer.ships[0].length; i++) {
            testPlayer.board.shipPositions[row][col + i] = 1;
        }
        expect(
            testPlayer.board.placeShip(testPlayer.ships[0], testCoordinate)
        ).toBe(false);
        expect(
            testPlayer.board.placeShip(testPlayer.ships[0], [row, col - 5])
        ).toBe(true);
    });
});

describe('tests placeShips method', () => {
    it('Checks if a ship can be placed on top of an existing ship vertically', () => {
        // Manually insert a test ship of length 3 vertically
        let testPlayer = new Human();
        let testCoordinate = [5, 5];
        let [row, col] = testCoordinate;
        testPlayer.ships[2].changeOrientation();
        for (let i = 0; i < testPlayer.ships[2].length; i++) {
            testPlayer.board.shipPositions[row + i][col] = 1;
        }
        expect(
            testPlayer.board.placeShip(testPlayer.ships[2], testCoordinate)
        ).toBe(false);
        expect(
            testPlayer.board.placeShip(testPlayer.ships[2], [row - 3, col])
        ).toBe(true);
    });
});
