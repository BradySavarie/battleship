let gameBoardContainer = document.querySelector(
    '.main__placement-controls'
) as HTMLElement;
let newGameBtn = document.querySelector('.header__reset-btn') as HTMLElement;

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
            cell.classList.add('cell');
            cell.setAttribute('data-row', `${row}`);
            cell.setAttribute('data-col', `${col}`);
            computerGameboard.appendChild(cell);
        }
    }

    gameBoardContainer.appendChild(fleetHeader);
    gameBoardContainer.appendChild(computerGameboard);
}
