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
    // for each ship
    ships.forEach((ship) => {
        let container = document.createElement('div');
        let name = document.createElement('p');
        let shipGrid = document.createElement('div');
        shipGrid.classList.add('shipGrid');
        shipGrid.style.display = 'flex';
        shipGrid.style.flexDirection = 'row';
        name.textContent = `${ship.name}`;

        for (let i = 0; i < ship.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            shipGrid.appendChild(cell);
        }

        container.appendChild(name);
        container.appendChild(shipGrid);

        let unplaced_ships_container = document.getElementById(
            'unplaced_ships_container'
        ) as HTMLDivElement;

        unplaced_ships_container.appendChild(container);
    });
}
