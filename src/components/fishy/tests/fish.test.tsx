import React from 'react';
import { shallow } from 'enzyme';

import Fishy from '../fishy';
import IFishyProps from '../interfaces/fishy-props';

describe('Fishy', () => {
	it('Should render correctly', () => {
		const defaultProps: IFishyProps = {};
		const fishy = shallow(<Fishy {...defaultProps} />);
		expect(fishy).toMatchSnapshot();
	});
});