export function renderHumanGameboard(size: number) {
    const board = document.createElement('div');
    board.classList.add('board');

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.style.outline = '1px solid black';
        board.appendChild(cell);
    }

    let human_game_board_container = document.getElementById(
        'human_game_board_container'
    ) as HTMLDivElement;

    human_game_board_container.appendChild(board);
}
