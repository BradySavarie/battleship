import { Ship } from '../models/ship';

export function renderGameboard(size: number) {
    const board = document.createElement('div');
    board.classList.add('board');

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }

    let game_board_container = document.getElementById(
        'game_board_container'
    ) as HTMLDivElement;

    game_board_container.appendChild(board);
}

export function renderShips(ships: Ship[]) {
    ships.forEach((ship) => {
        let container = document.createElement('div');
        let shipName = document.createElement('p');
        let blockShip = document.createElement('div');
        let unplaced_ships_container = document.getElementById(
            'unplaced_ships_container'
        ) as HTMLDivElement;

        for (let i = 0; i < ship.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            blockShip.appendChild(cell);
        }

        shipName.textContent = `${ship.name}`;
        shipName.classList.add('ship_name');
        blockShip.classList.add('block_ship', 'draggable');
        blockShip.setAttribute('draggable', 'true');

        container.appendChild(blockShip);
        container.appendChild(shipName);
        unplaced_ships_container.appendChild(container);
    });
}
