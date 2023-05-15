import { Gameboard } from '../models/board';
import { Human } from '../models/player';

describe('tests placeShips method', () => {
    it('Checks if the specified coordinate is empty', () => {
        let testPlayer = new Human();
        expect(testPlayer.board.placeShip(testPlayer.ships[0], [5, 5])).toBe(
            true
        );
    });
});

describe('tests placeShips method', () => {
    it('Checks if the specified coordinate contains a ship', () => {
        let testPlayer = new Human();
        testPlayer.board.shipPositions[5][5] = 1;
        expect(testPlayer.board.placeShip(testPlayer.ships[0], [5, 5])).toBe(
            false
        );
    });
});
