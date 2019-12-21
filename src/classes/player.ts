import playerLeft from '../images/player-left.gif';
import playerRight from '../images/player-right.gif';

import IPlayer from '../interfaces/player';

export default class Player implements IPlayer {
	public key: string;
	public x: number;
	public y: number;
	public size: number;
	public height: number;
	public width: number;
	public direction: boolean;
	public score: number;
	public lives: number;
	public image: string[];
	public isAlive: boolean;

	private DEFAULT_FISH_WIDTH_MULTIPLIER: number = 20;
	private DEFAULT_FISH_HEIGHT_MULTIPLIER: number = 10;

	constructor(object?: any) {
		this.key = 'player';
		this.x = 0;
		this.y = 0;
		this.size = 10;
		this.height = this.newHeight(this.size);
		this.width = this.newWidth(this.size);
		this.direction = false;
		this.score = 0;
		this.lives = 5;
		this.image = [playerLeft, playerRight];
		this.isAlive = true;
	}

	public amountOfLives = (): number => this.lives;

	public looseLife = (): boolean => {
		this.lives--;
		if (this.lives < 1) this.isAlive = false;

		return this.isAlive;
	}

	public addScore = (extra: number): number => this.score += extra;

	public move = (x: number, y: number): void => {
		const originalX = this.x;
		if (y < this.height / 2) y = this.height / 2;

		this.x = x - this.width / 2;
		this.y = y - this.height / 2;
		this.direction = this.x <= originalX
	}

	public growPlayer = (): void => {
		this.size ++;
		this.width = this.newWidth(this.size);
		this.height = this.newHeight(this.size);
	}

	private newWidth = (size: number): number => size / 10 * this.DEFAULT_FISH_WIDTH_MULTIPLIER;
	private newHeight = (size: number): number => size / 10 * this.DEFAULT_FISH_HEIGHT_MULTIPLIER;
}