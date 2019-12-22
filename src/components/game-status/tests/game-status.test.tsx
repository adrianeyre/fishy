import React from 'react';
import { shallow } from 'enzyme';

import GameStatus from '../game-status';
import IGameStatusProps from '../interfaces/game-status-props';

describe('Game Status', () => {
	it('Should render correctly', () => {
		const defaultProps: IGameStatusProps = {
			score: 1000,
			lives: 5,
		};

		const gameStatus = shallow(<GameStatus {...defaultProps} />);
		expect(gameStatus).toMatchSnapshot();
	});
});