import { Ship } from '../models/ship';

// Rendering Functions

export function renderGameboard(size: number) {
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board-container__game-board');

    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
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

        // Append Elements
        container.appendChild(blockShip);
        container.appendChild(shipName);
        blockShipsContainer.appendChild(container);

        // Add DragnDrop Listeners
        blockShip.addEventListener('dragstart', () => {
            setTimeout(() => {
                blockShip.classList.toggle('invisible');
            }, 0);
        });

        container.addEventListener('dragend', () => {
            blockShip.classList.toggle('invisible');
        });
    });
}

// DragnDrop

let empties = document.getElementsByClassName('empty');
