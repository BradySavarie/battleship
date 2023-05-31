import { Human } from '../models/player';
import { Ship } from '../models/ship';
import { getActivePlayer } from '../models/state';
import { takeTurn } from '../controllers/game';

let gameBoardContainer = document.querySelector(
    '.main__placement-controls'
) as HTMLElement;
let newGameBtn = document.querySelector('.header__reset-btn') as HTMLElement;
let statusMessage = document.querySelector(
    '.header__status-message'
) as HTMLElement;

export function buildComputerGameboard(size: number) {
    gameBoardContainer.innerHTML = '';
    gameBoardContainer.classList.replace(
        'main__placement-controls',
        'main__game-board-container'
    );

    let computerGameboard = document.createElement('div');
    computerGameboard.classList.add('game-board-container__game-board');
    let fleetHeader = document.createElement('p');
    fleetHeader.textContent = 'Computers Fleet';
    fleetHeader.style.alignSelf = 'flex-end';
    newGameBtn.textContent = 'NEW GAME';

    for (let row: number = 0; row < size; row++) {
        for (let col: number = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'unattacked');
            cell.id = 'computerCell';
            cell.setAttribute('data-row', `${row}`);
            cell.setAttribute('data-col', `${col}`);
            computerGameboard.appendChild(cell);
        }
    }

    gameBoardContainer.appendChild(fleetHeader);
    gameBoardContainer.appendChild(computerGameboard);
}

export function renderAttackState() {
    let cells;
    let activePlayer = getActivePlayer();

    if (activePlayer instanceof Human) {
        cells = document.querySelectorAll('#humanCell');
    } else {
        cells = document.querySelectorAll('#computerCell');
    }

    cells.forEach((cell) => {
        if (cell instanceof HTMLElement) {
            let row = parseInt(cell.dataset.row as string);
            let col = parseInt(cell.dataset.col as string);

            if (activePlayer instanceof Human) {
                if (activePlayer.board.attackState[row][col] === 'miss') {
                    cell.classList.add('miss');
                } else if (activePlayer.board.attackState[row][col] === 'hit') {
                    cell.classList.add('hit');
                }
            } else {
                if (activePlayer.board.attackState[row][col] === 'miss') {
                    cell.classList.replace('unattacked', 'miss');
                } else if (activePlayer.board.attackState[row][col] === 'hit') {
                    cell.classList.replace('unattacked', 'hit');
                }
            }
        }
    });
}

export function renderSunkenShip(
    shipPositions: (number | null)[][],
    ships: Ship[],
    row: number,
    col: number
) {
    let dataRow: number;
    let dataCol: number;
    let activePlayer = getActivePlayer();
    let index = shipPositions[row][col];

    // Select correct cells and update classes
    if (activePlayer instanceof Human) {
        for (let i = 0; i < activePlayer.board.boardSize; i++) {
            for (let j = 0; j < activePlayer.board.boardSize; j++) {
                if (shipPositions[i][j] === index) {
                    let cells = Array.from(
                        document.querySelectorAll('#humanCell')
                    ) as HTMLDivElement[];
                    let cell = cells.find(
                        (cell) =>
                            parseInt(cell.dataset.row as string) === i &&
                            parseInt(cell.dataset.col as string) === j
                    ) as HTMLDivElement;
                    cell.classList.remove('hit');
                    cell.classList.add('isSunk');
                }
            }
        }
    } else {
        for (let i = 0; i < activePlayer.board.boardSize; i++) {
            for (let j = 0; j < activePlayer.board.boardSize; j++) {
                if (shipPositions[i][j] === index) {
                    let cells = Array.from(
                        document.querySelectorAll('#computerCell')
                    ) as HTMLDivElement[];
                    let cell = cells.find(
                        (cell) =>
                            parseInt(cell.dataset.row as string) === i &&
                            parseInt(cell.dataset.col as string) === j
                    ) as HTMLDivElement;
                    cell.classList.remove('hit');
                    cell.classList.add('isSunk');
                }
            }
        }
    }
    if (index !== null) {
        return ships[index].name;
    }
}

export function renderResultMessage(
    attackState: string | null,
    shipName: string = 'none'
) {
    let activePlayer = getActivePlayer();

    if (activePlayer instanceof Human) {
        if (shipName === 'none') {
            if (attackState === 'miss') {
                statusMessage.textContent = 'The computer missed!';
            } else {
                statusMessage.textContent = `The computer hit your ship!`;
            }
        } else {
            statusMessage.textContent = `The computer sunk your ${shipName}!`;
        }
    } else {
        if (shipName === 'none') {
            if (attackState === 'miss') {
                statusMessage.textContent = 'You missed!';
            } else {
                statusMessage.textContent = 'You hit a ship!';
            }
        } else {
            statusMessage.textContent = `You sunk the computers ${shipName}!`;
        }
    }
}

export function clearResultMessage() {
    statusMessage.textContent = '';
}

gameBoardContainer.addEventListener('click', (e) => {
    if (e.target instanceof HTMLDivElement) {
        let targetCell = e.target;
        let activePlayer = getActivePlayer();

        let row = parseInt(targetCell.dataset.row as string);
        let col = parseInt(targetCell.dataset.col as string);

        // Reject event delegation that results in bad row/col values
        if (Number.isNaN(row) || Number.isNaN(col)) return;

        // Reject clicks during computers turn
        if (activePlayer instanceof Human) {
            takeTurn(activePlayer, row, col);
        }
    }
});
