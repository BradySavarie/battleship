import { initializeBattleScreen } from '../controllers/game';
import { Human } from '../models/player';
import { Ship } from '../models/ship';
import { getActivePlayer, getGameStatus, setGameStatus } from '../models/state';

// Global Variables

let activeShip: HTMLElement;
let dropSuccessful: boolean;

let gameBoardContainer = document.getElementById(
    'game-board-container'
) as HTMLElement;
let randomizeBtn = document.getElementById(
    'buttons__randomize-btn'
) as HTMLElement;
let startGameBtn = document.getElementById(
    'buttons__start-game-btn'
) as HTMLElement;

// Functions

export function buildHumanGameboard(size: number) {
    let humanGameboard = document.createElement('div');
    humanGameboard.classList.add('game-board-container__game-board');

    for (let row: number = 0; row < size; row++) {
        for (let col: number = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'empty');
            cell.setAttribute('data-row', `${row}`);
            cell.setAttribute('data-col', `${col}`);
            humanGameboard.appendChild(cell);
        }
    }

    gameBoardContainer.appendChild(humanGameboard);
}

export function renderFleet(ships: Ship[]) {
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
            activeShip = e.target as HTMLDivElement;
            setTimeout(() => {
                blockShip.classList.toggle('invisible');
            }, 0);
        });

        // Remove validity classes for empty cells on dragend
        blockShip.addEventListener('dragend', () => {
            if (!dropSuccessful) {
                blockShip.classList.toggle('invisible');
            }
            resetValidityRendering();
        });
    });
}

export function renderGameBoard() {
    let gameStatus = getGameStatus();
    resetValidityRendering();
    let human = getActivePlayer();
    for (let row = 0; row < human.board.boardSize; row++) {
        for (let col = 0; col < human.board.boardSize; col++) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            ) as HTMLDivElement;
            if (gameStatus === 'ongoing') {
                cell.classList.replace('fill', 'containsShip');
            } else {
                if (human.board.shipPositions[row][col] !== null) {
                    cell.classList.replace('empty', 'fill');
                } else {
                    cell.classList.replace('fill', 'empty');
                }
            }
        }
    }
}

function renderValidityStatus(
    isValid: boolean,
    ship: Ship,
    row: number,
    col: number
) {
    if (isValid) {
        for (let offset = 0; offset < ship.length; offset++) {
            const cell = document.querySelector(
                `[data-row="${row}"][data-col="${col + offset}"]`
            ) as HTMLDivElement;
            cell.classList.add('placementValid');
            cell.classList.remove('placementInvalid');
        }
    } else {
        for (let offset = 0; offset < ship.length; offset++) {
            if (col + offset < 10) {
                const cell = document.querySelector(
                    `[data-row="${row}"][data-col="${col + offset}"]`
                ) as HTMLDivElement;

                cell.classList.add('placementInvalid');
                cell.classList.remove('placementValid');
            }
        }
    }
}

function resetValidityRendering() {
    let cells = document.querySelectorAll('.empty, .fill');
    for (let cell of cells) {
        cell.classList.remove('placementValid', 'placementInvalid');
    }
}

// Event Listeners

gameBoardContainer.addEventListener('dragenter', (e) => {
    // Reset validity classes
    resetValidityRendering();

    // Identify target cell
    const target = e.target as HTMLElement;
    let row = parseInt(target.dataset.row as string);
    let col = parseInt(target.dataset.col as string);

    // Identify ship being dragged
    let human = getActivePlayer();
    let shipName = activeShip.dataset.shipname;
    let ship = human.ships.find((ship) => ship.name === shipName) as Ship;

    // Validate placement
    let isValid: boolean = human.board.validatePlacement(ship, row, col);

    // Render status to board
    renderValidityStatus(isValid, ship, row, col);
});

gameBoardContainer.addEventListener('dragover', handleDragOver);

function handleDragOver(e: DragEvent) {
    e.preventDefault();
}

gameBoardContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    // get target cells row and col data values
    const targetCell = e.target as HTMLElement;
    let row = parseInt(targetCell.dataset.row as string);
    let col = parseInt(targetCell.dataset.col as string);

    // Identify ship being dragged
    let human = getActivePlayer();
    let shipName = activeShip.dataset.shipname;
    let ship = human.ships.find((ship) => ship.name === shipName) as Ship;
    const shipIndex = human.ships.findIndex((ship) => ship.name === shipName);

    // Place ship
    dropSuccessful = human.board.placeShip(ship, shipIndex, [row, col]);

    // Render ship to board
    if (dropSuccessful) {
        renderGameBoard();
    } else {
        resetValidityRendering();
    }
});

// Handle ship rotations on click
gameBoardContainer.addEventListener('click', (e) => {
    let gameStatus = getGameStatus();
    if (gameStatus !== 'pregame') return;
    if (e.target instanceof HTMLDivElement) {
        let human = getActivePlayer();
        const target = e.target;
        let row = parseInt(target.dataset.row as string);
        let col = parseInt(target.dataset.col as string);

        if (human.board.shipPositions[row][col] !== null) {
            let index = human.board.shipPositions[row][col] as number;
            let ship = human.ships[index];
            let isSuccess = human.board.rotateShip(ship, index, row, col);
            if (isSuccess) {
                renderGameBoard();
            }
        }
    }
});

// Handle randomization of ships on click
randomizeBtn.addEventListener('click', () => {
    let blockShips = Array.from(
        document.getElementsByClassName('block-ships__ship')
    );
    blockShips.forEach((blockShip) => {
        blockShip.classList.add('invisible');
    });
    let human = getActivePlayer();
    human.board.randomizeShips(human.ships);
    resetValidityRendering();
    renderGameBoard();
});

// Notify controller of game start if ships are all placed
startGameBtn.addEventListener('click', () => {
    let shipsPlaced: boolean = true;
    let human = getActivePlayer();

    for (let ship of human.ships) {
        if (!ship.isPlaced) {
            shipsPlaced = false;
            return;
        }
    }

    if (shipsPlaced) {
        setGameStatus('ongoing');
        initializeBattleScreen();
    }
});
