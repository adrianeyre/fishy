import type IFish from '../../../classes/interfaces/fish';

export default interface IFishyState {
  playAreaWidth: number;
  playAreaHeight: number;
  fish: IFish[];
  /** `setInterval`'s handle: a number in the browser, a Timeout under Node. */
  timer?: ReturnType<typeof setInterval>;
  isPlayerAlive: boolean;
  isGameActive: boolean;
  noEchosystem: boolean;
}
