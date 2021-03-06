export default interface IFish {
	key: string;
	x: number;
	y: number;
	size: number;
	height: number;
	width: number;
	speed: number;
	direction: boolean;
	fishImage: string;
	move(): void;
	isEatingPlayer(playerX: number, playerY: number): boolean;
}
