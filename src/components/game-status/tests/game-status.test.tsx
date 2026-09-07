import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import GameStatus from '../game-status';
import type IGameStatusProps from '../interfaces/game-status-props';

describe('Game Status', () => {
  it('Should render correctly', () => {
    const defaultProps: IGameStatusProps = {
      score: 1000,
      lives: 5,
    };

    const { container } = render(<GameStatus {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should draw one life image per life', () => {
    const { container } = render(<GameStatus score={0} lives={3} />);

    expect(container.querySelectorAll('img.player-lives')).toHaveLength(3);
  });
});
