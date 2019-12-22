import IFish from '../../../classes/interfaces/fish';
import IPlayer from '../../../classes/interfaces/player';

export default interface IDrawFishProps {
	fish: IFish | IPlayer
	image: string;
}
