import React from 'react';
import { range } from 'lodash';

import playerLeft from './images/player-left.gif';
import playerRight from './images/player-right.gif';

import Player from './classes/player';
import Fish from './classes/fish';

import IFish from './interfaces/fish';
import IPlayer from './interfaces/player';
import IFishProps from './interfaces/fish-props';
import IFishState from './interfaces/fish-state';

import './fish.scss';

export default class Fishy extends React.Component<IFishProps, IFishState> {
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
		};

		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
	}

	public async componentDidMount() {
		window.addEventListener("mousemove", this.handleMouseMove);
		window.addEventListener("touchmove", this.handleTouchMove);
		window.addEventListener('resize', this.updatePlayerArea)
		await this.resetGame();
		this.updatePlayerArea();
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
						src={ this.player.image[this.player.direction ? 0 : 1] }
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
			fish.push(new Fish(this.INITIAL_PLAYER_SIZE, this.state.playAreaWidth, this.state.playAreaWidth));
		}
	
		await this.setState(() => ({ fish }));
	}

	private setupPlayer = async (): Promise<void> => {
		this.player = new Player();// this.newPlayer();
	}

	private handleMouseMove(data: MouseEvent) {
		if (!this.player) return;

		let { pageX, pageY } = data;
		this.player.move(pageX, pageY);
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
			fish[fishIndex].move();

			if (fish[fishIndex].isEatingPlayer(this.player.x, this.player.y)) {
				if (this.player.size >= fish[fishIndex].size) {
					await this.player.addScore(fish[fishIndex].size * 10);
					await this.killFish(fishIndex);
					await this.player.growPlayer();
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
			fish.push(new Fish(this.player.size, this.state.playAreaWidth, this.state.playAreaWidth));
		}

		this.setState(() => ({ fish }));
	}

	private killFish = async (fishIndex: number): Promise<void> => {
		const fish = this.state.fish;
		if (fishIndex < 0 || fishIndex > fish.length + 1) throw Error('Eating fish out of fish range');

		fish.splice(fishIndex, 1);
		this.setState(() => ({ fish }));
	}

	private looseLife = async (): Promise<void> => {
		this.stopTimer();
		if (!this.player) throw Error('No player to loose a life with');

		const isGameOn = this.player.looseLife();

		if (isGameOn) {
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
}
