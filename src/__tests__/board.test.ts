import { Gameboard } from '../models/board';
import { Human } from '../models/player';

let testPlayer = new Human();
let testCoordinate = [0, 0];

describe('tests placeShips method', () => {
    it('Checks if horizontally placed ship is recognized at all positions', () => {
        // Manually insert a test ship of length 5 horizontally
        for (let i = 0; i < testPlayer.ships[0].length; i++) {
            testPlayer.board.shipPositions[0][i] = 1;
        }
        expect(testPlayer.board.placeShip(testPlayer.ships[0], [0, 0])).toBe(
            false
        );
        expect(testPlayer.board.placeShip(testPlayer.ships[0], [0, 4])).toBe(
            false
        );
    });
});
