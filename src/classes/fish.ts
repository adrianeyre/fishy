import fish0Left from '../images/fish0-left.gif';
import fish0Right from '../images/fish0-right.gif';
import fish1Left from '../images/fish1-left.gif';
import fish1Right from '../images/fish1-right.gif';
import fish2Left from '../images/fish2-left.gif';
import fish2Right from '../images/fish2-right.gif';
import fish3Left from '../images/fish3-left.gif';
import fish3Right from '../images/fish3-right.gif';
import fish4Left from '../images/fish4-left.gif';
import fish4Right from '../images/fish4-right.gif';
import fish5Left from '../images/fish5-left.gif';
import fish5Right from '../images/fish5-right.gif';

import IFish from './interfaces/fish';
import IFishProps from '../components/fishy/interfaces/fishy-props';

export default class Fish implements IFish {
	public key: string;
	public x: number;
	public y: number;
	public size: number;
	public height: number;
	public width: number;
	public speed: number;
	public direction: boolean;
	public fishImage: string;

	private defaultFishWidthMultiplier: number;
	private defaultFishHeightMultiplier: number;
	private DEFAULT_FISH_WIDTH_MULTIPLIER: number = 20;
	private DEFAULT_FISH_HEIGHT_MULTIPLIER: number = 10;
	private DEFUALT_FISH_MAX_SIZE: number = 200;
	private fishImages: string[][] = [
		[ fish0Left, fish0Right ],
		[ fish1Left, fish1Right ],
		[ fish2Left, fish2Right ],
		[ fish3Left, fish3Right ],
		[ fish4Left, fish4Right ],
		[ fish5Left, fish5Right ],
	]

	constructor(config: IFishProps, currentPlayerSize: number, playAreaWidth: number, playAreaHeight: number) {
		const randomSize = Math.floor(Math.random() * currentPlayerSize * 10) + 1;
		
		this.key = 'fish';
		this.direction = Math.floor(Math.random() * 100) > 50;
		this.size = randomSize > this.DEFUALT_FISH_MAX_SIZE ? this.DEFUALT_FISH_MAX_SIZE : randomSize;
		this.speed = Math.floor(Math.random() * 5) + 1;
		this.fishImage= this.fishImages[Math.floor(Math.random() * this.fishImages.length)][this.direction ? 0 : 1];
		this.defaultFishWidthMultiplier = config.fishWidthMultiplier || this.DEFAULT_FISH_WIDTH_MULTIPLIER;
		this.defaultFishHeightMultiplier = config.fishHeightMultiplier || this.DEFAULT_FISH_HEIGHT_MULTIPLIER;
		this.height = this.newHeight(this.size);
		this.width = this.newWidth(this.size);
		this.x = this.direction ? playAreaWidth : -this.width;
		this.y = Math.floor(Math.random() * playAreaHeight);
	}

	public move = (): void => {
		if (this.direction) {
			this.x -= this.speed;
		} else {
			this.x += this.speed;
		}
	}

	public isEatingPlayer = (playerX: number, playerY: number): boolean =>
		playerY >= this.y &&
		playerY <= this.y + this.height &&
		playerX >= this.x &&
		playerX <= this.x + this.width;
	

	private newWidth = (size: number): number => size / 10 * this.defaultFishWidthMultiplier;
	private newHeight = (size: number): number => size / 10 * this.defaultFishHeightMultiplier;
}