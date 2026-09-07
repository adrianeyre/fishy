import { Component } from 'react';

import Fish from '../../classes/fish';
import Player from '../../classes/player';

import type IFish from '../../classes/interfaces/fish';
import type IPlayer from '../../classes/interfaces/player';
import DrawFish from '../draw-fish/draw-fish';
import GameStatus from '../game-status/game-status';
import InfoBoard from '../info-board/info-board';
import type IFishyProps from './interfaces/fishy-props';
import type IFishyState from './interfaces/fishy-state';

import './styles/fishy.scss';

/** The two coordinates the player reads off a pointer, mouse or touch alike. */
interface IPointerPosition {
  pageX: number;
  pageY: number;
}

export default class Fishy extends Component<IFishyProps, IFishyState> {
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

  public override async componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('resize', this.updatePlayerArea);
    this.updatePlayerArea();
  }

  public override componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('resize', this.updatePlayerArea);
    // Directly, not via `stopTimer`: that also calls setState, and React
    // discards — and warns about — a setState on an unmounting component.
    clearInterval(this.state.timer);
  }

  public override render() {
    return (
      <div
        className="fish-play-container"
        ref={(d) => {
          // A block body, not a concise one: React 19 reads a ref callback's
          // return value as a cleanup function, and returning the element
          // would make React call it as one.
          this.container = d;
        }}
      >
        <GameStatus score={this.player.score} lives={this.player.lives} />

        {!this.state.isPlayerAlive && (
          <InfoBoard
            gameOver={this.player.lives < 1}
            startGame={this.startGame}
            score={this.player.score}
            noEchosystem={this.state.noEchosystem}
          />
        )}

        {this.state.isPlayerAlive && (
          <div>
            <DrawFish fish={this.player} image={this.player.image[this.player.direction ? 0 : 1]} />

            {this.state.fish.map((fish: IFish, fishIndex: number) => (
              <DrawFish key={`fish-${fishIndex}`} fish={fish} image={fish.fishImage} />
            ))}
          </div>
        )}
      </div>
    );
  }

  private startGame = async (): Promise<void> => {
    await this.setupPlayer();
    await this.setupFish();
    await this.startTimer();
    this.setState(() => ({ isPlayerAlive: true, isGameActive: true, noEchosystem: false }));
  };

  private setupFish = async (): Promise<void> => {
    const fish: IFish[] = [];
    const amountOfFish = Math.floor(Math.random() * this.DEFAULT_FISH_MAX_ON_SCREEN) + 1;

    for (let fishCount = 0; fishCount <= amountOfFish; fishCount++) {
      fish.push(
        new Fish(
          this.props,
          this.INITIAL_PLAYER_SIZE,
          this.state.playAreaWidth,
          this.state.playAreaWidth,
        ),
      );
    }

    this.setState(() => ({ fish }));
  };

  private setupPlayer = async (): Promise<IPlayer> => (this.player = new Player(this.props));
  private handleMouseMove = ({ pageX, pageY }: IPointerPosition): void =>
    this.player.move(pageX, pageY);
  private handleTouchMove = (event: TouchEvent): void => {
    const touch = event.touches[0];
    if (touch) this.handleMouseMove(touch);
  };
  private updatePlayerArea = () =>
    this.setState(() => ({
      playAreaWidth: this.container?.offsetWidth || 200,
      playAreaHeight: this.container?.offsetHeight || 100,
    }));

  private myTimer = async () => {
    const fish = this.state.fish;

    for (let fishIndex = 0; fishIndex < fish.length; fishIndex++) {
      const current = fish[fishIndex];
      if (!this.state.isGameActive || !current) return;
      current.move();

      if (current.isEatingPlayer(this.player.x, this.player.y)) {
        if (this.player.size >= current.size) {
          this.player.addScore(current.size * 10);
          await this.killFish(fishIndex);
          const noEchosystem = this.player.growPlayer();
          this.setState(() => ({ noEchosystem, isPlayerAlive: !noEchosystem }));
          return;
        } else {
          this.looseLife();
        }
      }

      if (current.x >= this.state.playAreaWidth + current.width || current.x + current.width < 0) {
        await this.killFish(fishIndex);
        return;
      }
    }

    if (
      fish.length < this.DEFAULT_FISH_MAX_ON_SCREEN &&
      Math.floor(Math.random() * 100) > 100 - this.DEFAULT_FISH_SPAWN_PERCENT
    ) {
      fish.push(
        new Fish(this.props, this.player.size, this.state.playAreaWidth, this.state.playAreaWidth),
      );
    }

    this.setState(() => ({ fish }));
  };

  private killFish = async (fishIndex: number): Promise<void> => {
    const fish = this.state.fish;

    fish.splice(fishIndex, 1);
    this.setState(() => ({ fish }));
  };

  private looseLife = async (): Promise<void> => {
    this.setState(() => ({ isGameActive: false }));
    this.stopTimer();
    const isPlayerAlive = this.player.looseLife();

    if (!isPlayerAlive) {
      this.setState(() => ({ isPlayerAlive: false }));
      return;
    }

    this.player.resetPlayerSize();
    await this.setupFish();
    await this.startTimer();
    this.setState(() => ({ isGameActive: true }));
  };

  private startTimer = async (): Promise<void> => {
    const timer = setInterval(this.myTimer, this.DEFAULT_FISH_TIMER_INTERVAL);

    this.setState(() => ({ timer }));
  };

  private stopTimer = (): void => {
    clearInterval(this.state.timer);

    this.setState(() => ({ timer: undefined }));
  };
}
