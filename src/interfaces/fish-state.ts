import IFish from './fish';

export default interface IFishState {
	playAreaWidth: number,
	playAreaHeight: number,
	fish: IFish[];
	fishImages: any;
	timer?: any;
	isGameOn: boolean;
}
