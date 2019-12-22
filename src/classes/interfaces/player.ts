export default interface IPlayer {
	key: string;
	x: number;
	y: number;
	size: number;
	height: number;
	width: number;
	direction: boolean;
	score: number;
	lives: number;
	image: string[];
	isAlive: boolean;
	amountOfLives(): number
	looseLife(): boolean;
	addScore(extra: number): number;
	move(x: number, y: number): void;
	growPlayer(): boolean;
}
