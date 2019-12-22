import React from 'react';
import { range } from 'lodash';

import IGameStatusProps from './interfaces/game-status-props';

import playerLeft from '../../images/player-left.gif';

import './styles/game-status.scss';

export default class GameStatus extends React.Component<IGameStatusProps, {}> {

	public render() {
		return <div className="game-status">
			<div className="game-status-left">Score: { this.props.score }</div>
			<div className="game-status-right">Lives: { range(this.props.lives).map((fishIndex: number) => <img className="player-lives" key={ `lives-image-${ fishIndex }` } src={ playerLeft } alt="lives" />) }</div>
		</div>
	}
}
