import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Fish from '../../../classes/fish';
import DrawFish from '../draw-fish';
import type IDrawFishProps from '../interfaces/draw-fish-props';

describe('Draw Fish', () => {
  // A Fish picks its size, speed, image and lane at random. Pinning
  // Math.random is what makes a snapshot of one mean anything.
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should render correctly', () => {
    const defaultProps: IDrawFishProps = {
      fish: new Fish({}, 1, 1, 1),
      image: 'image',
    };

    const { container } = render(<DrawFish {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should position the fish with a 3d transform', () => {
    const fish = new Fish({}, 1, 1, 1);
    const { container } = render(<DrawFish fish={fish} image="image" />);

    expect(container.firstElementChild).toHaveStyle({
      transform: `translate3d(${fish.x}px, ${fish.y}px, 0)`,
    });
  });
});
