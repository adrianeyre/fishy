import React from 'react';
import { range } from 'lodash';

import playerLeft from './images/player-left.gif';
import playerRight from './images/player-right.gif';

import fish0Left from './images/fish0-left.gif';
import fish0Right from './images/fish0-right.gif';
import fish1Left from './images/fish1-left.gif';
import fish1Right from './images/fish1-right.gif';
import fish2Left from './images/fish2-left.gif';
import fish2Right from './images/fish2-right.gif';
import fish3Left from './images/fish3-left.gif';
import fish3Right from './images/fish3-right.gif';
import fish4Left from './images/fish4-left.gif';
import fish4Right from './images/fish4-right.gif';
import fish5Left from './images/fish5-left.gif';
import fish5Right from './images/fish5-right.gif';

import IFish from './interfaces/fish';
import IPlayer from './interfaces/player';
import IFishProps from './interfaces/fish-props';
import IFishState from './interfaces/fish-state';

import './fish.scss';

export default class Fish extends React.Component<IFishProps, IFishState> {
	private INITIAL_PLAYER_SIZE: number = this.props.initialPlayerSize || 10;
	private INITIAL_PLAYER_LIVES: number = this.props.initialPlayerLives || 5;
	private DEFAULT_FISH_HEIGHT_MULTIPLIER: number = this.props.fishHeightMultiplier || 10;
	private DEFAULT_FISH_WIDTH_MULTIPLIER: number = this.props.fishWidthMultiplier || 20;
	private DEFUALT_FISH_MAX_SIZE: number = this.props.fishMaxSize || 200;
	private DEFAULT_FISH_MAX_ON_SCREEN: number = this.props.maxFishOnScreen || 20;
	private DEFAULT_PLAYER_MAX_SIZE: number = this.props.playerMaxSize || 500;
	private container: HTMLDivElement | null = null;
	private player?: IPlayer;

	constructor(props: IFishProps) {
		super(props);

		this.state = {
			playAreaWidth: 0,
			playAreaHeight: 0,
			isGameOn: false,
			fish: [],
			fishImages: [
				[ fish0Left, fish0Right ],
				[ fish1Left, fish1Right ],
				[ fish2Left, fish2Right ],
				[ fish3Left, fish3Right ],
				[ fish4Left, fish4Right ],
				[ fish5Left, fish5Right ],
			]
		};

		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
	}

	public async componentDidMount() {
		window.addEventListener("mousemove", this.handleMouseMove);
		window.addEventListener("touchmove", this.handleTouchMove);
		window.addEventListener('resize', this.updatePlayerArea)
		await this.resetGame();
		this.updatePlayerArea()
	}

	public componentWillUnmount() {
		window.removeEventListener("mousemove", this.handleMouseMove);
		window.removeEventListener("touchmove", this.handleTouchMove);
		window.removeEventListener('resize', this.updatePlayerArea)
	}

	public render() {
		if (!this.player) return <div>Loading!</div>
		if (this.player.size >= this.DEFAULT_PLAYER_MAX_SIZE) return <div>No more ecosystem!</div>

		return <div className="fish-play-container" ref={(d) => { this.container = d }}>
			<div className="game-status">
				<div className="game-status-left">Score: { this.player.score }</div>
				<div className="game-status-right">Lives: { range(this.player.lives).map((fishIndex: number) => <img className="player-lives" key={ `lives-image-${ fishIndex }` } src={ playerLeft } alt="lives" />) }</div>
			</div>

			{ !this.state.isGameOn && <div className="fish-info-board">
				<div className="fish-header">
					<img src={ playerRight } alt="player" />
					<span className="header-text">Fishy</span>
					<img src={playerLeft } alt="player" />
				</div>

				{ this.player.lives < 1 && <div className="game-over-area">
					<div className="game-over-title">Game Over!</div>
				</div> }

				<div className="fish-instructions">
					You are a little fish minding your own business swimming around the sea, but in order to survive you must eat other fish! Be aware, you may only eat fish that are small than yourself. Larger fish will eat you up, so you must avoid them at all costs!
				</div>

				<div className="button-area">
					<button type="button" onClick={ this.startGame }>Play Game</button>
				</div>
			</div> }

			{ this.state.isGameOn && <div>
				<div key={ this.player.key } style={ this.styleFish(this.player.x, this.player.y) }>
					<img
						src={ this.player.direction ? playerLeft : playerRight }
						height={ this.player.height }
						width={ this.player.width }
						alt="player"
					/>
				</div>

				{ this.state.fish.map((fish: IFish, fishIndex: number) => <div key={ `${ fish.key }-${ fishIndex }` } style={ this.styleFish(fish.x, fish.y) }>
					<img
						src={ fish.fishImage }
						height={ fish.height }
						width={ fish.width }
						alt="fish"
					/>
				</div>) }
			</div> }
			
		</div>
	}

	private styleFish = (x: number, y: number) => ({
		width: 0,
		height: 0,
		opacity: 1,
		WebkitTransform: `translate3d(${ x }px, ${ y }px, 0)`,
		transform: `translate3d(${ x }px, ${ y }px, 0)`,
		zIndex: 5000
	})

	private resetGame = async (): Promise<void> => {
		await this.setupPlayer();
		await this.setupFish();
	}

	private startGame = async (): Promise<void> => {
		await this.startTimer();
		await this.setState(() => ({ isGameOn: true }));
	}

	private setupFish = async (): Promise<void> => {
		const fish: IFish[] = [];
		const amountOfFish = Math.floor(Math.random() * this.DEFAULT_FISH_MAX_ON_SCREEN) + 1

		for (let fishCount = 0; fishCount <= amountOfFish; fishCount ++) {
			fish.push(this.resetFish(this.INITIAL_PLAYER_SIZE));
		}
	
		await this.setState(() => ({ fish }));
	}

	private setupPlayer = async (): Promise<void> => {
		this.player = this.newPlayer();
	}

	private newPlayer = (): IPlayer => {
		const size = this.INITIAL_PLAYER_SIZE;
		const playAreaWidth = this.state.playAreaWidth ? this.state.playAreaWidth : 100;
		const playAreaHeight = this.state.playAreaHeight ? this.state.playAreaHeight : 100;
		
		return {
			key: 'player',
			x: playAreaWidth,
			y: playAreaHeight,
			size,
			width: this.newWidth(size),
			height: this.newHeight(size),
			direction: false,
			score: this.player && this.player.score ? this.player.score : 0,
			lives: this.player && this.player.lives ? this.player.lives : this.INITIAL_PLAYER_LIVES,
		};
	}

	private handleMouseMove(data: MouseEvent) {
		if (!this.player) return;

		let { pageX, pageY } = data;
		let player = {...this.player}
		if (pageY < player.height / 2) pageY = player.height / 2;

		player.x = pageX - player.width / 2;
		player.y = pageY - player.height / 2;
		player.direction = player.x <= this.player.x;

		this.player = player;
	}

	private handleTouchMove(data: any) {
		this.handleMouseMove(data.touches[0]);
	}

	private updatePlayerArea = () => this.setState(() => ({
		playAreaWidth: this.container && this.container.offsetWidth ? this.container.offsetWidth : 200,
		playAreaHeight: this.container && this.container.offsetHeight ? this.container.offsetHeight : 100,
	}))

	private myTimer = async () => {
		if (!this.player) return;
		let fish = this.state.fish;

		for (let fishIndex = 0; fishIndex < fish.length; fishIndex ++) {
			if (fish[fishIndex].direction) fish[fishIndex].x -= fish[fishIndex].speed;
			if (!fish[fishIndex].direction) fish[fishIndex].x += fish[fishIndex].speed;

			if (
				this.player.y >= fish[fishIndex].y &&
				this.player.y <= fish[fishIndex].y + fish[fishIndex].height &&
				this.player.x >= fish[fishIndex].x &&
				this.player.x <= fish[fishIndex].x + fish[fishIndex].width
			) {
				if (this.player.size >= fish[fishIndex].size) {
					await this.addScore(fish[fishIndex].size * 10);
					await this.killFish(fishIndex);
					await this.growPlayer();
					return;
				} else {
					this.looseLife();
				}
			}

			if (fish[fishIndex].x >= this.state.playAreaWidth + fish[fishIndex].width || fish[fishIndex].x + fish[fishIndex].width < 0) {
				await this.killFish(fishIndex);
				return;
			}
		}

		if (fish.length < this.DEFAULT_FISH_MAX_ON_SCREEN && Math.floor(Math.random() * 100) > 90) {
			fish.push(this.resetFish(this.player.size))
		}

		this.setState(() => ({ fish }));
	}

	private resetFish = (currentPlayerSize: number): IFish => {
		const direction = Math.floor(Math.random() * 100) > 50;
		const randomSize = Math.floor(Math.random() * currentPlayerSize * 10) + 1;
		const size = randomSize > this.DEFUALT_FISH_MAX_SIZE ? this.DEFUALT_FISH_MAX_SIZE : randomSize;
		const width = this.newWidth(size);
		const height = this.newHeight(size);

		return {
			key: `fish-${ Math.floor(Date.now() / 1000) }-${ Math.floor(Math.random() * 999) }-${ this.state.fish.length }`,
			size,
			x: direction ? this.state.playAreaWidth : -width,
			y: Math.floor(Math.random() * this.state.playAreaHeight),
			width,
			height,
			direction,
			speed: Math.floor(Math.random() * 5) + 1,
			fishImage: this.state.fishImages[Math.floor(Math.random() * this.state.fishImages.length)][direction ? 0 : 1],
		}
	}

	private killFish = async (fishIndex: number): Promise<void> => {
		const fish = this.state.fish;
		if (fishIndex < 0 || fishIndex > fish.length + 1) throw Error('Eating fish out of fish range');

		fish.splice(fishIndex, 1);
		this.setState(() => ({ fish }));
	}

	private growPlayer = async () => {
		if (!this.player) throw Error('No player to grow');
		let player = this.player;

		player.size ++;
		player.width = this.newWidth(player.size);
		player.height = this.newHeight(player.size);
	}

	private addScore = async (extraScore: number): Promise<void> => {
		if (!this.player) throw Error('No player to add score');

		this.player.score += extraScore;
	}

	private looseLife = async (): Promise<void> => {
		this.stopTimer();
		if (!this.player) throw Error('No player to loose a life with');
		this.player.lives--;

		if (this.player.lives > 0) {
			await this.resetGame();
			await this.startTimer();
			return;
		}

		await this.setState(() => ({ isGameOn: false }))
	}

	private startTimer = async (): Promise<void> => {
		const timer = setInterval(this.myTimer, 10);

		this.setState(() => ({ timer }));
	}

	private stopTimer = async (): Promise<void> => {
		const timer = this.state.timer;
		clearInterval(timer);

		await this.setState(() => ({ timer: undefined }));
	}

	private newWidth = (size: number): number => size / 10 * this.DEFAULT_FISH_WIDTH_MULTIPLIER;
	private newHeight = (size: number): number => size / 10 * this.DEFAULT_FISH_HEIGHT_MULTIPLIER;
}
