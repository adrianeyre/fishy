import React from 'react';
import { shallow } from 'enzyme';

import DrawFish from '../draw-fish';
import IDrawFishProps from '../interfaces/draw-fish-props';
import Fish from '../../../classes/fish';

describe('Draw Fish', () => {
	it('Should render correctly', () => {
		const defaultProps: IDrawFishProps = {
			fish: new Fish({}, 1, 1, 1),
			image: 'image',
		};

		const drawFish = shallow(<DrawFish {...defaultProps} />);
		expect(drawFish).toMatchSnapshot();
	});
});