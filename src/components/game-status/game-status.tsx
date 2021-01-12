import React, { FC } from 'react';
import { range } from 'lodash';

import IGameStatusProps from './interfaces/game-status-props';

import playerLeft from '../../images/player-left.gif';

import './styles/game-status.scss';

const GameStatus: FC<IGameStatusProps> = (props: IGameStatusProps) => {
	return <div className="game-status">
		<div className="game-status-left">Score: { props.score }</div>
		<div className="game-status-right">Lives: { range(props.lives).map((fishIndex: number) => <img className="player-lives" key={ `lives-image-${ fishIndex }` } src={ playerLeft } alt="lives" />) }</div>
	</div>
}

export default GameStatus;
