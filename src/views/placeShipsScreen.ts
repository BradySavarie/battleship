import { Ship } from '../models/ship';

export function renderGameboard(size: number) {
    const game_board = document.createElement('div');
    game_board.classList.add('game-board-container__game-board');

    game_board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    game_board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        game_board.appendChild(cell);
    }

    let game_board_container = document.getElementById(
        'game-board-container'
    ) as HTMLDivElement;

    game_board_container.appendChild(game_board);
}

export function renderShips(ships: Ship[]) {
    ships.forEach((ship) => {
        let container = document.createElement('div');
        let shipName = document.createElement('p');
        let blockShip = document.createElement('div');
        let blockShipsContainer = document.getElementById(
            'placement-controls__block-ships'
        ) as HTMLDivElement;

        for (let i = 0; i < ship.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            blockShip.appendChild(cell);
        }

        container.classList.add('block-ships__container');
        shipName.textContent = `${ship.name}`;
        shipName.classList.add('block-ships__name');
        blockShip.classList.add('block-ships__ship', 'draggable');
        blockShip.setAttribute('draggable', 'true');

        container.appendChild(blockShip);
        container.appendChild(shipName);
        blockShipsContainer.appendChild(container);
    });
}
