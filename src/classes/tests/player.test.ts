import Player from '../player';

describe('Player', () => {
	it('Should create Player class', () => {
		const player = new Player({});

		expect(player.height).toEqual(10);
		expect(player.width).toEqual(20);
		expect(player.size).toEqual(10);
		expect(player.isAlive).toEqual(true);
		expect(player.key).toEqual('player');
		expect(player.image).toEqual(["player-left.gif", "player-right.gif"]);
		expect(player.lives).toEqual(5);
		expect(player.score).toEqual(0);
		expect(player.x).toEqual(0);
		expect(player.y).toEqual(0);
	});
});