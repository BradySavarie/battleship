import { Ship } from '../models/ship';

describe('test hits method', () => {
    it('increments hits by 1', () => {
        let battleship = new Ship(4);
        battleship.hit();
        expect(battleship.hits).toBe(1);
    });
});
