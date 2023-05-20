/* Manages the game state, including player turns, game status (ongoing, victory, defeat), and other game-related data. */
import { Human, Computer } from './player';

let activePlayer: Human | Computer;

function setActivePlayer(player: Human | Computer) {
    activePlayer = player;
}

function getActivePlayer(): Human | Computer {
    return activePlayer;
}
