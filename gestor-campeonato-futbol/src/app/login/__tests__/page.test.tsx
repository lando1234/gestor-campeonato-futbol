import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../page';

// Mock next-auth
jest.mock('next-auth/react');
jest.mock('next/navigation');

const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('LoginPage', () => {
  let mockPush: jest.Mock;
  let mockRefresh: jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    mockPush = jest.fn();
    mockRefresh = jest.fn();
    
    mockUseRouter.mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    } as any);
  });

  describe('Renderizado', () => {
    it('debe renderizar el formulario de login correctamente', () => {
      render(<LoginPage />);

      expect(screen.getByText('Gestor de Campeonato')).toBeInTheDocument();
      expect(screen.getByText('Panel de Administración')).toBeInTheDocument();
      expect(screen.getByLabelText('Usuario')).toBeInTheDocument();
      expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it('debe mostrar los placeholders correctos', () => {
      render(<LoginPage />);

      const usernameInput = screen.getByPlaceholderText('admin');
      const passwordInput = screen.getByPlaceholderText('••••••••');

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('debe mostrar el mensaje de acceso restringido', () => {
      render(<LoginPage />);

      expect(screen.getByText('Acceso restringido a administradores')).toBeInTheDocument();
    });
  });

  describe('Validación de Formulario', () => {
    it('debe requerir el campo de usuario', async () => {
      render(<LoginPage />);

      const usernameInput = screen.getByLabelText('Usuario') as HTMLInputElement;
      expect(usernameInput).toHaveAttribute('required');
    });

    it('debe requerir el campo de contraseña', async () => {
      render(<LoginPage />);

      const passwordInput = screen.getByLabelText('Contraseña') as HTMLInputElement;
      expect(passwordInput).toHaveAttribute('required');
    });

    it('debe actualizar el valor del input de usuario', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);

      const usernameInput = screen.getByLabelText('Usuario') as HTMLInputElement;
      await user.type(usernameInput, 'admin');

      expect(usernameInput.value).toBe('admin');
    });

    it('debe actualizar el valor del input de contraseña', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);

      const passwordInput = screen.getByLabelText('Contraseña') as HTMLInputElement;
      await user.type(passwordInput, 'galaxia');

      expect(passwordInput.value).toBe('galaxia');
    });
  });

  describe('Autenticación', () => {
    it('debe llamar a signIn con las credenciales correctas', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ error: null, ok: true } as any);

      render(<LoginPage />);

      const usernameInput = screen.getByLabelText('Usuario');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

      await user.type(usernameInput, 'admin');
      await user.type(passwordInput, 'galaxia');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('credentials', {
          username: 'admin',
          password: 'galaxia',
          redirect: false,
        });
      });
    });

    it('debe redirigir a /admin después de un login exitoso', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ error: null, ok: true } as any);

      render(<LoginPage />);

      const usernameInput = screen.getByLabelText('Usuario');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

      await user.type(usernameInput, 'admin');
      await user.type(passwordInput, 'galaxia');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin');
        expect(mockRefresh).toHaveBeenCalled();
      });
    });

    it('debe mostrar error con credenciales inválidas', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ error: 'CredentialsSignin', ok: false } as any);

      render(<LoginPage />);

      const usernameInput = screen.getByLabelText('Usuario');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

      await user.type(usernameInput, 'admin');
      await user.type(passwordInput, 'wrong-password');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
      });

      expect(mockPush).not.toHaveBeenCalled();
    });

    it('debe mostrar error genérico cuando falla la autenticación', async () => {
      const user = userEvent.setup();
      mockSignIn.mockRejectedValue(new Error('Network error'));

      render(<LoginPage />);

      const usernameInput = screen.getByLabelText('Usuario');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

      await user.type(usernameInput, 'admin');
      await user.type(passwordInput, 'galaxia');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Error al iniciar sesión')).toBeInTheDocument();
      });
    });
  });

  describe('Estado de Carga', () => {
    it('debe deshabilitar el formulario durante el login', async () => {
      const user = userEvent.setup();
      mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ ok: true } as any), 100)));

      render(<LoginPage />);

      const usernameInput = screen.getByLabelText('Usuario') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Contraseña') as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i }) as HTMLButtonElement;

      await user.type(usernameInput, 'admin');
      await user.type(passwordInput, 'galaxia');
      await user.click(submitButton);

      // Durante la carga
      expect(submitButton).toBeDisabled();
      expect(usernameInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(screen.getByText('Iniciando sesión...')).toBeInTheDocument();

      // Esperar a que termine
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });

    it('debe cambiar el texto del botón durante la carga', async () => {
      const user = userEvent.setup();
      mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ ok: true } as any), 100)));

      render(<LoginPage />);

      const usernameInput = screen.getByLabelText('Usuario');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

      expect(submitButton).toHaveTextContent('Iniciar Sesión');

      await user.type(usernameInput, 'admin');
      await user.type(passwordInput, 'galaxia');
      await user.click(submitButton);

      expect(submitButton).toHaveTextContent('Iniciando sesión...');

      await waitFor(() => {
        expect(submitButton).toHaveTextContent('Iniciar Sesión');
      });
    });
  });

  describe('Manejo de Errores', () => {
    it('debe limpiar el mensaje de error al volver a intentar', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValueOnce({ error: 'CredentialsSignin', ok: false } as any);

      render(<LoginPage />);

      const usernameInput = screen.getByLabelText('Usuario');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

      // Primer intento fallido
      await user.type(usernameInput, 'admin');
      await user.type(passwordInput, 'wrong');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
      });

      // Segundo intento - el error debe desaparecer
      mockSignIn.mockResolvedValueOnce({ error: null, ok: true } as any);
      
      await user.clear(passwordInput);
      await user.type(passwordInput, 'galaxia');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Credenciales inválidas')).not.toBeInTheDocument();
      });
    });
  });
});

