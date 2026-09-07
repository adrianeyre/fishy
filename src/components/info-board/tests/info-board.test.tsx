import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import InfoBoard from '../info-board';
import type IInfoBoardProps from '../interfaces/info-board-props';

describe('Info Board', () => {
  it('Should render correctly', () => {
    const defaultProps: IInfoBoardProps = {
      gameOver: true,
      noEchosystem: true,
      score: 1000,
      startGame: vi.fn(),
    };

    const { container } = render(<InfoBoard {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should start the game when the button is pressed', async () => {
    const startGame = vi.fn();
    render(<InfoBoard gameOver={false} noEchosystem={false} score={0} startGame={startGame} />);

    await userEvent.click(screen.getByRole('button', { name: 'Play Game' }));

    expect(startGame).toHaveBeenCalledOnce();
  });
});
