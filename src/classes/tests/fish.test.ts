import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Fish from '../fish';

describe('Fish', () => {
  beforeEach(() => {
    // sinon is gone: Vitest's own spies do this, and sinon was a *runtime*
    // dependency of the game before, which it never needed to be.
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should create Fish class', () => {
    const fish = new Fish({}, 1, 1, 1);

    expect(fish.key).toEqual('fish');
    expect(fish.width).toEqual(12);
    expect(fish.size).toEqual(6);
    // Vite resolves an image import to its served URL, where react-scripts'
    // jest fileMock returned the bare filename.
    expect(fish.fishImage).toContain('fish3-right');
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
    const result = fish.isEatingPlayer(-100, 0);

    expect(result).toEqual(false);
  });
});
