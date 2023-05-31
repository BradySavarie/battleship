/* Manages the game state, including player turns, game status (ongoing, victory, defeat), and other game-related data. */
import { Human, Computer } from './player';

let activePlayer: Human | Computer;
let gameStatus: string = 'pregame';
let criticalHit: boolean;

export function setActivePlayer(player: Human | Computer) {
    activePlayer = player;
}

export function getActivePlayer(): Human | Computer {
    return activePlayer;
}

export function setGameStatus(status: string) {
    gameStatus = status;
}

export function getGameStatus() {
    return gameStatus;
}

export function getCriticalHit() {
    return criticalHit;
}

export function setCriticalHit(isCriticalHit: boolean) {
    criticalHit = isCriticalHit;
}
