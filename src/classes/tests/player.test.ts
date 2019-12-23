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

	it('Should bring back the player lives', () => {
		const player = new Player({});

		expect(player.amountOfLives()).toEqual(5);
	});

	it('Should reset player size', () => {
		const player = new Player({});
		player.resetPlayerSize()

		expect(player.size).toEqual(10);
		expect(player.height).toEqual(10);
		expect(player.width).toEqual(20);
	});

	it('Should bring back the player lives', () => {
		const player = new Player({});

		expect(player.looseLife()).toEqual(true);
		player.looseLife();
		player.looseLife();
		player.looseLife();
		expect(player.looseLife()).toEqual(false);
	});

	it('Should add 10 to score', () => {
		const player = new Player({});
		player.addScore(10)

		expect(player.score).toEqual(10);
	});

	it('Should move player', () => {
		const player = new Player({});
		player.move(100, 200)

		expect(player.x).toEqual(90);
		expect(player.y).toEqual(195);
		expect(player.direction).toEqual(false);
	});

	it('Should grow player', () => {
		const player = new Player({});
		expect(player.growPlayer()).toEqual(false);

		expect(player.size).toEqual(11);
		expect(player.height).toEqual(11);
		expect(player.width).toEqual(22);
	});

	it('Should grow player to max', () => {
		const player = new Player({});
		player.size = 499;

		expect(player.growPlayer()).toEqual(true);
	});
});