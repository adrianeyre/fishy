import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Fishy from '../fishy';
import type IFishyProps from '../interfaces/fishy-props';

describe('Fishy', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should render correctly', () => {
    const defaultProps: IFishyProps = {};
    const { container } = render(<Fishy {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should open on the info board, with the player not yet swimming', () => {
    render(<Fishy />);

    expect(screen.getByRole('button', { name: 'Play Game' })).toBeInTheDocument();
    expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
  });
});
