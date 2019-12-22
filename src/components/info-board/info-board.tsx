import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import playerLeft from '../../images/player-left.gif';
import playerRight from '../../images/player-right.gif';

import './styles/info-board.scss';

export default class InfoBoard extends React.Component<IInfoBoardProps, {}> {

	public render() {
		return <div className="fish-info-board">
			<div className="fish-header">
				<img src={ playerRight } alt="player" />
				<span className="header-text">Fishy</span>
				<img src={playerLeft } alt="player" />
			</div>

			{ this.props.gameOver && <div className="game-over-area">
				<div className="game-over-title">Game Over</div>
				<div className="game-over-text">You scored { this.props.score }, better luck next time!</div>
			</div> }

			{ this.props.noEchosystem && <div className="eco-system-area">
				<div className="eco-system-title">Game Over</div>
				<div className="eco-system-text">You scored { this.props.score }</div>
				<div className="eco-system-text">You ate the whole ecosystem! no more food for you!</div>
			</div> }

			<div className="fish-instructions">
				You are a little fish minding your own business swimming around the sea, but in order to survive you must eat other fish! Be aware, you may only eat fish that are small than yourself. Larger fish will eat you up, so you must avoid them at all costs!
			</div>

			<div className="button-area">
				<button type="button" onClick={ this.props.startGame }>Play Game</button>
			</div>
		</div>
	}
}
