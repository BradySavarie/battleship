import { Ship } from '../models/ship';
import { getActivePlayer } from '../models/state';

// Global Variables

let currentBlockShip: HTMLDivElement;
let dropSuccessful: boolean;
let gameBoardContainer = document.getElementById(
    'game-board-container'
) as HTMLDivElement;

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

        // Make ships invisible on dragstart
        blockShip.addEventListener('dragstart', (e) => {
            currentBlockShip = e.target as HTMLDivElement;
            setTimeout(() => {
                blockShip.classList.toggle('invisible');
            }, 0);
        });

        // Remove validity classes for empty cells on dragend
        blockShip.addEventListener('dragend', () => {
            if (!dropSuccessful) {
                blockShip.classList.toggle('invisible');
            }
            let empties = document.querySelectorAll('.empty');
            for (let empty of empties) {
                empty.classList.remove('placementValid', 'placementInvalid');
            }
        });
    });
}

// Add DragnDrop functionality to gameboard

gameBoardContainer.addEventListener('dragenter', (e) => {
    // loop through each empty cell, removing both validity classes
    let empties = document.querySelectorAll('.empty');
    for (let empty of empties) {
        empty.classList.remove('placementValid', 'placementInvalid');
    }

    // get targets row and col data values
    const target = e.target as HTMLElement;
    let row = parseInt(target.dataset.row as string);
    let col = parseInt(target.dataset.col as string);

    // Identify ship being dragged
    let human = getActivePlayer();
    let shipName = currentBlockShip.dataset.shipname;
    let ship = human.ships.find((ship) => ship.name === shipName) as Ship;

    // Validate placement and add validity classes to correct cells
    let isValid: boolean = human.board.validatePlacement(ship, row, col);
    if (isValid) {
        for (let i = 0; i < ship.length; i++) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col + i}"]`
            ) as HTMLDivElement;
            cell.classList.add('placementValid');
            cell.classList.remove('placementInvalid');
        }
    } else {
        for (let i = 0; col + i < 10; i++) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col + i}"]`
            ) as HTMLDivElement;
            cell.classList.add('placementInvalid');
            cell.classList.remove('placementValid');
        }
    }
});

// Handle dragover events
gameBoardContainer.addEventListener('dragover', handleDragOver);

function handleDragOver(e: DragEvent) {
    e.preventDefault();
}

gameBoardContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    // get targets row and col data values
    const target = e.target as HTMLElement;
    let row = parseInt(target.dataset.row as string);
    let col = parseInt(target.dataset.col as string);

    // Identify ship being dragged
    let human = getActivePlayer();
    let shipName = currentBlockShip.dataset.shipname;
    let ship = human.ships.find((ship) => ship.name === shipName) as Ship;
    const shipIndex = human.ships.findIndex((ship) => ship.name === shipName);

    // Handle Drop Success
    dropSuccessful = human.board.placeShip(ship, shipIndex, [row, col]);
    if (dropSuccessful) {
        // for each valid cell
        // add replace empty class with fill class
        for (let i = 0; i < ship.length; i++) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col + i}"]`
            ) as HTMLDivElement;
            cell.classList.replace('empty', 'fill');
        }
    }
});
