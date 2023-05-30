import { Human } from '../models/player';
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

export function renderResultMessage(attackState: string | null) {
    let activePlayer = getActivePlayer();

    if (activePlayer instanceof Human) {
        if (attackState === 'miss') {
            statusMessage.textContent = 'The computer missed!';
        } else {
            statusMessage.textContent = 'The computer hit a ship!';
        }
    } else {
        if (attackState === 'miss') {
            statusMessage.textContent = 'You missed!';
        } else {
            statusMessage.textContent = 'You hit a ship!';
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

        if (activePlayer instanceof Human) {
            takeTurn(activePlayer, row, col);
        }
    }
});
