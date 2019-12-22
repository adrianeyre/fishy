import Fish from '../fish';

describe('Fish', () => {
	it('Should create Fish class', () => {
		const player = new Fish({}, 1, 1, 1);

		expect(player.key).toEqual('fish');
	});
});