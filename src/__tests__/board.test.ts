import {} from '../models/board';
import { Human } from '../models/player';

describe('tests placeShips method', () => {
    it('Checks if a ship collides with another ship horizontally', () => {
        // Manually insert a test ship of length 5 horizontally
        let testPlayer = new Human();
        let testCoordinate = [5, 5];
        let testIndex = 0;
        let [row, col] = testCoordinate;
        for (let i = 0; i < testPlayer.ships[testIndex].length; i++) {
            testPlayer.board.shipPositions[row][col + i] = 1;
        }
        // Does the start coordinate collide?
        expect(
            testPlayer.board.placeShip(
                testPlayer.ships[0],
                testIndex,
                testCoordinate
            )
        ).toBe(false);
        // Does the end coordinate collide?
        expect(
            testPlayer.board.placeShip(testPlayer.ships[testIndex], testIndex, [
                row,
                col - 4,
            ])
        ).toBe(false);
    });

    it('Checks if a ship collides with another ship vertically', () => {
        // Manually insert a test ship of length 3 vertically
        let testPlayer = new Human();
        let testCoordinate = [5, 5];
        let testIndex = 2;
        let [row, col] = testCoordinate;
        testPlayer.ships[2].changeOrientation();
        for (let i = 0; i < testPlayer.ships[testIndex].length; i++) {
            testPlayer.board.shipPositions[row + i][col] = 1;
        }
        // Does the start coordinate register a collision?
        expect(
            testPlayer.board.placeShip(
                testPlayer.ships[2],
                testIndex,
                testCoordinate
            )
        ).toBe(false);
        // Does the end coordinate register a collision?
        expect(
            testPlayer.board.placeShip(testPlayer.ships[testIndex], testIndex, [
                row - 2,
                col,
            ])
        ).toBe(false);
    });

    it('Checks if a ship extends past the edge horizontally', () => {
        // Create a player to test a ship with
        let testPlayer = new Human();
        let testIndex = 0;
        // Does the ship extend past the edge of the board?
        expect(
            testPlayer.board.placeShip(
                testPlayer.ships[testIndex],
                testIndex,
                [0, 6]
            )
        ).toBe(false);
    });

    it('Checks if a ship extends past the edge vertically', () => {
        // Create a player to test a ship with
        let testPlayer = new Human();
        let testIndex = 0;
        testPlayer.ships[testIndex].changeOrientation();
        // Does the ship extend past the edge of the board?
        expect(
            testPlayer.board.placeShip(
                testPlayer.ships[testIndex],
                testIndex,
                [6, 0]
            )
        ).toBe(false);
    });
});

describe('tests rotateShip method', () => {
    it('Checks if valid rotation occurs', () => {
        let testPlayer = new Human();
        testPlayer.board.placeShip(testPlayer.ships[0], 0, [0, 0]);
        testPlayer.board.rotateShip(testPlayer.ships[0], 0, 0, 0);
        expect(testPlayer.board.shipPositions[4][0]).toBe(0);
    });

    it('Checks if invalid rotation is handled', () => {
        let testPlayer = new Human();
        testPlayer.board.placeShip(testPlayer.ships[0], 0, [6, 0]);
        testPlayer.board.rotateShip(testPlayer.ships[0], 0, 6, 0);
        expect(testPlayer.board.shipPositions[6][1]).toBe(0);
    });
});

describe('tests receiveAttack method', () => {
    it('Checks if attackState array is accurately updated on hit', () => {
        let testPlayer = new Human();
        testPlayer.board.placeShip(testPlayer.ships[0], 0, [0, 0]);
        testPlayer.board.receiveAttack([0, 0], testPlayer.ships);
        expect(testPlayer.board.attackState[0][0]).toBe('hit');
    });

    it('Checks if method returns false when coordinate has already been attacked', () => {
        let testPlayer = new Human();
        testPlayer.board.receiveAttack([0, 0], testPlayer.ships);
        expect(testPlayer.board.receiveAttack([0, 0], testPlayer.ships)).toBe(
            false
        );
    });

    it('Checks if ships hit property is updated', () => {
        let testPlayer = new Human();
        testPlayer.board.placeShip(testPlayer.ships[0], 0, [0, 0]);
        testPlayer.board.receiveAttack([0, 0], testPlayer.ships);
        expect(testPlayer.ships[0].hits).toEqual(1);
    });
});

describe('tests chooseShipToAttack function', () => {
    it('selects first damaged ship it encounters', () => {
        let human = new Human();
        human.ships[1].hit();
        let ship = human.board.chooseShipToAttack(human.ships);
        expect(ship).toBe(human.ships[1]);
    });

    it('returns false if no damaged ship is found', () => {
        let human = new Human();
        let ship = human.board.chooseShipToAttack(human.ships);
        expect(ship).toEqual(false);
    });
});

describe('tests generateRandomCoordinate function', () => {});
