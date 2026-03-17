import { render, screen } from '@testing-library/react';
import { SocialButton, resolveButtonWidth } from './Sozial-Button';

describe('SocialButton', () => {
  it('renders a default large provider button', () => {
    render(<SocialButton Provider="google" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Sign in with Google');
  });

  it('renders custom children text when provided', () => {
    render(<SocialButton Provider="google">Continue with Google</SocialButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Continue with Google');
  });

  it('renders custom provider label fallback text', () => {
    render(
      <SocialButton
        Provider={{
          type: 'custom',
          name: 'MyID',
          svg: <svg data-testid="custom-provider-icon" viewBox="0 0 20 20" />,
        }}
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Sign in with MyID');
    expect(screen.getByTestId('custom-provider-icon')).toBeInTheDocument();
  });

  it('is disabled when disabled=true', () => {
    render(<SocialButton Provider="google" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled and hides text while loading', () => {
    render(<SocialButton Provider="google" loading />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
    expect(screen.queryByText('Sign in with Google')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders circle variant as icon button', () => {
    render(<SocialButton Provider="google" variant="circle" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toHaveTextContent('Sign in with Google');
  });

  it('resolves width to 400px with extrawidth={400-183}', () => {
    expect(resolveButtonWidth(400 - 183)).toBe('400px');
  });

  it('resolves width to 400px with maxWidth={400}', () => {
    expect(resolveButtonWidth(undefined, 400)).toBe('400px');
  });

  it('clamps width to maxWidth when extrawidth exceeds it', () => {
    expect(resolveButtonWidth(300, 400)).toBe('400px');
  });

  it('never resolves width below base width', () => {
    expect(resolveButtonWidth(-50)).toBe('183px');
  });
});
