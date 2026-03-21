import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SocialButton, resolveButtonWidth } from './Sozial-Button';
import * as SVG from './SVGs';
import { NotificationProvider } from '../../Notefication/Notifications';

function renderWithNotifications(ui: React.ReactElement) {
  return render(<NotificationProvider>{ui}</NotificationProvider>);
}
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
        Props={
          {
            ButtonProps: {
              id: "custom-provider-icon"
            }
          }
        }
        Provider={
          {
            type: "custom",
            name: "MyID",
            svg: <SVG.AppleSVG />,
            color: {
              backgroundColor: "#FFFFFF",
              border: "#9898aa",
              color: "#240303",
              hoverBgColor: "#dba5a5",
              hoverBorder: "#d8adad",
              loadingcolor: "#252201",
            }
          }
        }
      />
    );

    const buttonElement = screen.getByRole('button', { name: 'Sign in with MyID' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('id', 'custom-provider-icon');
  });

  it('is disabled when disabled=true', () => {
    render(<SocialButton Provider="google" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled and hides text while loading', () => {
    render(<SocialButton Provider="google" loading />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveTextContent('Sign in with Google');
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

  it('executes action on click', async () => {
    const user = userEvent.setup();
    const action = jest.fn().mockResolvedValue(undefined);

    render(<SocialButton Provider="google" action={action} />);

    await user.click(screen.getByRole('button', { name: 'Sign in with Google' }));

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(1);
    });
  });

  it('uses internal loading while action is running', async () => {
    const user = userEvent.setup();
    let resolveAction: (() => void) | undefined;
    const action = jest.fn(() => new Promise<void>((resolve) => {
      resolveAction = resolve;
    }));

    render(<SocialButton Provider="google" action={action} />);

    const buttonElement = screen.getByRole('button', { name: 'Sign in with Google' });
    await user.click(buttonElement);

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    resolveAction?.();

    await waitFor(() => {
      expect(buttonElement).not.toBeDisabled();
      expect(buttonElement).toHaveAttribute('aria-busy', 'false');
    });
  });

  it('shows success notification when enabled', async () => {
    const user = userEvent.setup();
    const action = jest.fn().mockResolvedValue(undefined);

    renderWithNotifications(
      <SocialButton
        Provider="google"
        action={action}
        Notification={{
          useNotification: true,
          successmessage: 'Signed in',
          errormessage: 'Sign in failed',
        }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Sign in with Google' }));

    expect(await screen.findByText('Signed in')).toBeInTheDocument();
  });

  it('shows error notification when enabled', async () => {
    const user = userEvent.setup();
    const action = jest.fn().mockRejectedValue(new Error('Provider blocked'));

    renderWithNotifications(
      <SocialButton
        Provider="google"
        action={action}
        Notification={{
          useNotification: true,
          successmessage: 'Signed in',
          errormessage: 'Sign in failed',
        }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Sign in with Google' }));

    expect(await screen.findByText('Provider blocked')).toBeInTheDocument();
  });
});
