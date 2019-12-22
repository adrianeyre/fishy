import IFish from '../../../classes/interfaces/fish';

export default interface IFishyState {
	playAreaWidth: number,
	playAreaHeight: number,
	fish: IFish[];
	timer?: any;
	isPlayerAlive: boolean;
	isGameActive: boolean;
	noEchosystem: boolean;
}
