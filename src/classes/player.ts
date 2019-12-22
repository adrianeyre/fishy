import IFishyProps from '../components/fishy/interfaces/fishy-props';

import playerLeft from '../images/player-left.gif';
import playerRight from '../images/player-right.gif';

import IPlayer from './interfaces/player';

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
	public initialPlayerSize: number;
	public image: string[];
	public isAlive: boolean;

	private defaultFishWidthMultiplier: number;
	private defaultFishHeightMultiplier: number;
	private defaultPlayerMaxSize: number;
	readonly DEFAULT_FISH_WIDTH_MULTIPLIER: number = 20;
	readonly DEFAULT_FISH_HEIGHT_MULTIPLIER: number = 10;
	readonly INITIAL_PLAYER_SIZE: number = 10;
	readonly INITIAL_PLAYER_LIVES: number = 5;
	readonly DEFAULT_PLAYER_MAX_SIZE: number = 500;

	constructor(config: IFishyProps) {
		this.key = 'player';
		this.x = 0;
		this.y = 0;
		this.initialPlayerSize = config.initialPlayerSize || this.INITIAL_PLAYER_SIZE;
		this.size = this.initialPlayerSize
		this.direction = false;
		this.score = 0;
		this.lives = config.initialPlayerLives || this.INITIAL_PLAYER_LIVES;
		this.image = [playerLeft, playerRight];
		this.isAlive = true;
		this.defaultFishWidthMultiplier = config.fishWidthMultiplier || this.DEFAULT_FISH_WIDTH_MULTIPLIER;
		this.defaultFishHeightMultiplier = config.fishHeightMultiplier || this.DEFAULT_FISH_HEIGHT_MULTIPLIER;
		this.defaultPlayerMaxSize = config.playerMaxSize || this.DEFAULT_PLAYER_MAX_SIZE;
		this.height = this.newHeight(this.size);
		this.width = this.newWidth(this.size);
	}

	public amountOfLives = (): number => this.lives;

	public resetPlayerSize = (): void => {
		this.size = this.initialPlayerSize;
		this.height = this.newHeight(this.size);
		this.width = this.newWidth(this.size);
	}

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

	public growPlayer = (): boolean => {
		this.size ++;
		this.width = this.newWidth(this.size);
		this.height = this.newHeight(this.size);

		return this.size >= this.defaultPlayerMaxSize;
	}

	private newWidth = (size: number): number => size / 10 * this.defaultFishWidthMultiplier;
	private newHeight = (size: number): number => size / 10 * this.defaultFishHeightMultiplier;
}