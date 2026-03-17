import { render, screen } from '@testing-library/react';
import { SocialButton } from './Sozial-Button';

describe('SocialButton', () => {
  it('renders without crashing', () => {
    render(<SocialButton Provider="google" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });
});
