import React from 'react';
import { get } from 'lodash';

import Player from '../../classes/player';
import Fish from '../../classes/fish';

import IFish from '../../classes/interfaces/fish';
import IPlayer from '../../classes/interfaces/player';
import IFishyProps from './interfaces/fishy-props';
import IFishyState from './interfaces/fishy-state';
import InfoBoard from '../info-board/info-board';
import GameStatus from '../game-status/game-status';
import DrawFish from '../draw-fish/draw-fish';

import './styles/fishy.scss';

export default class Fishy extends React.Component<IFishyProps, IFishyState> {
	private INITIAL_PLAYER_SIZE: number = this.props.initialPlayerSize || 10;
	private DEFAULT_FISH_MAX_ON_SCREEN: number = this.props.maxFishOnScreen || 20;
	private DEFAULT_FISH_TIMER_INTERVAL: number = this.props.fishTimerInterval || 10;
	private DEFAULT_FISH_SPAWN_PERCENT: number = this.props.fishSpawnPercent || 10;
	private container: HTMLDivElement | null = null;
	private player: IPlayer;

	constructor(props: IFishyProps) {
		super(props);

		this.state = {
			playAreaWidth: 0,
			playAreaHeight: 0,
			isPlayerAlive: false,
			isGameActive: false,
			noEchosystem: false,
			fish: [],
		};

		this.player = new Player(this.props);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
	}

	public async componentDidMount() {
		window.addEventListener("mousemove", this.handleMouseMove);
		window.addEventListener("touchmove", this.handleTouchMove);
		window.addEventListener('resize', this.updatePlayerArea)
		this.updatePlayerArea();
	}

	public componentWillUnmount() {
		window.removeEventListener("mousemove", this.handleMouseMove);
		window.removeEventListener("touchmove", this.handleTouchMove);
		window.removeEventListener('resize', this.updatePlayerArea)
	}

	public render() {
		return <div className="fish-play-container" ref={(d) => { this.container = d }}>
			<GameStatus score={ this.player.score } lives={ this.player.lives }/>

			{ !this.state.isPlayerAlive && <InfoBoard gameOver={ this.player.lives < 1 } startGame={ this.startGame } score={ this.player.score } noEchosystem={ this.state.noEchosystem } /> }

			{ this.state.isPlayerAlive && <div>
				<DrawFish fish={ this.player } image={ this.player.image[this.player.direction ? 0 : 1] } />

				{ this.state.fish.map((fish: IFish, fishIndex: number) => <DrawFish key={ `fish-${ fishIndex }` } fish={ fish } image={ fish.fishImage } />) }
			</div> }
			
		</div>
	}

	private startGame = async (): Promise<void> => {
		await this.setupPlayer();
		await this.setupFish();
		await this.startTimer();
		await this.setState(() => ({ isPlayerAlive: true, isGameActive: true, noEchosystem: false }));
	}

	private setupFish = async (): Promise<void> => {
		const fish: IFish[] = [];
		const amountOfFish = Math.floor(Math.random() * this.DEFAULT_FISH_MAX_ON_SCREEN) + 1

		for (let fishCount = 0; fishCount <= amountOfFish; fishCount ++) {
			fish.push(new Fish(this.props, this.INITIAL_PLAYER_SIZE, this.state.playAreaWidth, this.state.playAreaWidth));
		}
	
		await this.setState(() => ({ fish }));
	}

	private setupPlayer = async (): Promise<IPlayer> => this.player = new Player(this.props);
	private handleMouseMove = ({ pageX, pageY }: MouseEvent): void => this.player.move(pageX, pageY);
	private handleTouchMove = (data: any): void => this.handleMouseMove(data.touches[0]);
	private updatePlayerArea = () => this.setState(() => ({ playAreaWidth: this.container && get(this, 'container.offsetWidth', 200), playAreaHeight: this.container && get(this, 'container.offsetHeight', 100), }))

	private myTimer = async () => {
		let fish = this.state.fish;

		for (let fishIndex = 0; fishIndex < fish.length; fishIndex ++) {
			if (!this.state.isGameActive) return;
			fish[fishIndex].move();

			if (fish[fishIndex].isEatingPlayer(this.player.x, this.player.y)) {
				if (this.player.size >= fish[fishIndex].size) {
					await this.player.addScore(fish[fishIndex].size * 10);
					await this.killFish(fishIndex);
					const noEchosystem = await this.player.growPlayer();
					await this.setState(() => ({ noEchosystem, isPlayerAlive: !noEchosystem }));
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

		if (fish.length < this.DEFAULT_FISH_MAX_ON_SCREEN && Math.floor(Math.random() * 100) > (100 - this.DEFAULT_FISH_SPAWN_PERCENT)) {
			fish.push(new Fish(this.props, this.player.size, this.state.playAreaWidth, this.state.playAreaWidth));
		}

		this.setState(() => ({ fish }));
	}

	private killFish = async (fishIndex: number): Promise<void> => {
		const fish = this.state.fish;

		fish.splice(fishIndex, 1);
		this.setState(() => ({ fish }));
	}

	private looseLife = async (): Promise<void> => {
		await this.setState(() => ({ isGameActive: false }));
		await this.stopTimer();
		const isPlayerAlive = this.player.looseLife();

		if (!isPlayerAlive) return await this.setState(() => ({ isPlayerAlive: false }));

		await this.setupFish();
		await this.startTimer();
		await this.setState(() => ({ isGameActive: true }));
	}

	private startTimer = async (): Promise<void> => {
		const timer = setInterval(this.myTimer, this.DEFAULT_FISH_TIMER_INTERVAL);

		await this.setState(() => ({ timer }));
	}

	private stopTimer = async (): Promise<void> => {
		clearInterval(this.state.timer);

		await this.setState(() => ({ timer: undefined }));
	}
}
