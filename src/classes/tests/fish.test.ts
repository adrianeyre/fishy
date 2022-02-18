import * as sinon from 'sinon';

import Fish from '../fish';

describe('Fish', () => {
	let randomStub: any;

	beforeEach(() => {
		randomStub = sinon.stub(Math, 'random').returns(0.5);
	})

	afterEach(() => {
		randomStub.restore();
	})

	it('Should create Fish class', () => {
		const fish = new Fish({}, 1, 1, 1);

		expect(fish.key).toEqual('fish');
		expect(fish.width).toEqual(12);
		expect(fish.size).toEqual(6);
		expect(fish.fishImage).toEqual('fish3-right.gif');
		expect(fish.x).toEqual(-12);
		expect(fish.y).toEqual(0);
	});

	it('Should move the fish', () => {
		const fish = new Fish({}, 1, 1, 1);
		fish.move();

		expect(fish.x).toEqual(-9);
	});

	it('Should eat the player', () => {
		const fish = new Fish({}, 1, 1, 1);
		const result = fish.isEatingPlayer(-12, 0);

		expect(result).toEqual(true);
	});

	it('Should not eat the player', () => {
		const fish = new Fish({}, 1, 1, 1);
		const result = fish.isEatingPlayer(-11, 0);

		expect(result).toEqual(true);
	});
});