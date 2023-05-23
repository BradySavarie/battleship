import { Ship } from '../models/ship';
import { getActivePlayer } from '../models/state';

let currentBlockShip: HTMLDivElement;
// Rendering Functions

export function renderGameboard(size: number) {
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board-container__game-board');

    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let row: number = 0; row < size; row++) {
        for (let col: number = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'empty');
            cell.setAttribute('data-row', `${row}`);
            cell.setAttribute('data-col', `${col}`);
            gameBoard.appendChild(cell);
        }
    }

    let gameBoardContainer = document.getElementById(
        'game-board-container'
    ) as HTMLDivElement;

    gameBoardContainer.appendChild(gameBoard);
}

export function renderShips(ships: Ship[]) {
    ships.forEach((ship) => {
        // Create Elements
        let container = document.createElement('div');
        let shipName = document.createElement('p');
        let blockShip = document.createElement('div');
        let blockShipsContainer = document.getElementById(
            'placement-controls__block-ships'
        ) as HTMLDivElement;

        // Generate Cells
        for (let i = 0; i < ship.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            blockShip.appendChild(cell);
        }

        // Add default classes and attributes, populate ship name
        container.classList.add('block-ships__container');
        shipName.classList.add('block-ships__name');
        shipName.textContent = `${ship.name}`;
        blockShip.classList.add('block-ships__ship', 'draggable');
        blockShip.setAttribute('draggable', 'true');
        blockShip.setAttribute('data-shipname', `${ship.name}`);

        // Append Elements
        container.appendChild(blockShip);
        container.appendChild(shipName);
        blockShipsContainer.appendChild(container);

        // Add DragnDrop Listeners
        blockShip.addEventListener('dragstart', (e) => {
            currentBlockShip = e.target as HTMLDivElement;
            setTimeout(() => {
                blockShip.classList.toggle('invisible');
            }, 0);
        });

        blockShip.addEventListener('dragend', () => {
            blockShip.classList.toggle('invisible');
        });
    });
}

// DragnDrop

let gameBoardContainer = document.getElementById(
    'game-board-container'
) as HTMLDivElement;

gameBoardContainer.addEventListener('dragenter', (e) => {
    const target = e.target as HTMLElement;
    let isValid: boolean;
    // get row and col data values
    let row = parseInt(target.dataset.row as string);
    let col = parseInt(target.dataset.col as string);
    // check placement validity of selected ship
    let human = getActivePlayer();
    let shipName = currentBlockShip.dataset.shipname;
    human.ships.forEach((ship) => {
        if (ship.name === shipName) {
            isValid = human.board.validatePlacement(ship, row, col);
        }
        // toggle validity classes
        if (isValid) {
            target.classList.toggle('placementValid');
        } else {
            target.classList.toggle('placementInvalid');
        }
    });
});

gameBoardContainer.addEventListener('dragleave', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('placementValid')) {
        target.classList.toggle('placementValid');
    }
    if (target.classList.contains('placementInvalid')) {
        target.classList.toggle('placementInvalid');
    }
});
