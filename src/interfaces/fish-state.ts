import IFish from './fish';

export default interface IFishState {
	playAreaWidth: number,
	playAreaHeight: number,
	fish: IFish[];
	timer?: any;
	isGameOn: boolean;
}
