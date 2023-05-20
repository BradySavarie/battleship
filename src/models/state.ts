/* Manages the game state, including player turns, game status (ongoing, victory, defeat), and other game-related data. */
import { Human, Computer } from './player';

let activePlayer: Human | Computer;

export function setActivePlayer(player: Human | Computer) {
    activePlayer = player;
}

export function getActivePlayer(): Human | Computer {
    return activePlayer;
}
