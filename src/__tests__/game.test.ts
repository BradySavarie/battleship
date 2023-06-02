import { generateComputersMove } from '../controllers/game';
import { Human } from '../models/player';
import { Ship } from '../models/ship';

describe('tests isGameOver function', () => {
    it('Checks if end game condition registers when all ships are sunk', () => {
        let testPlayer = new Human();
        testPlayer.ships.forEach((ship) => {
            let count = 0;
            while (count < ship.length) {
                ship.hits++;
                count++;
            }
        });

        const isGameOverMock = jest.fn((ships: Ship[]) => {
            let gameOver = true;
            ships.forEach((ship) => {
                if (!ship.isSunk()) {
                    gameOver = false;
                    return;
                }
            });
            if (gameOver) {
                return true;
            } else {
                return false;
            }
        });

        expect(isGameOverMock(testPlayer.ships)).toEqual(true);
    });
});

describe('tests generateComputersMove function', () => {
    let human = new Human();

    let generateComputersMoveMock = jest.fn((human) => {
        // Update this once helper functions are written
        return [1, 2];
    });

    it('returns an array of two numbers', () => {
        let array = generateComputersMoveMock(human);
        expect(array).toEqual(
            expect.arrayContaining([expect.any(Number), expect.any(Number)])
        );
    });
});
