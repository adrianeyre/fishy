import type IFish from '../../../classes/interfaces/fish';
import type IPlayer from '../../../classes/interfaces/player';

export default interface IDrawFishProps {
  fish: IFish | IPlayer;
  image: string;
}
