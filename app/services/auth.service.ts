// services/auth.service.ts
import { supabase } from '../lib/supabase';
import { AuthCredentials, AuthSession, SignUpData, Usuario, ApiResponse } from '../types';

export class AuthService {
  async signIn(credentials: AuthCredentials): Promise<ApiResponse<AuthSession>> {
    try {
      if (!credentials.email || !credentials.password) {
        return {
          data: null,
          error: 'Correo y contraseña son requeridos',
          success: false,
        };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return {
          data: null,
          error: error.message,
          success: false,
        };
      }

      if (!data.session) {
        return {
          data: null,
          error: 'No se pudo iniciar sesión',
          success: false,
        };
      }

      return {
        data: {
          user: {
            id: data.user.id,
            email: data.user.email,
          },
          session: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          },
        },
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      console.error('AuthService.signIn:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  async signUp(data: SignUpData): Promise<ApiResponse<AuthSession>> {
    try {
      if (!data.email || !data.password) {
        return {
          data: null,
          error: 'Correo y contraseña son requeridos',
          success: false,
        };
      }

      if (data.password.length < 6) {
        return {
          data: null,
          error: 'La contraseña debe tener al menos 6 caracteres',
          success: false,
        };
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        return {
          data: null,
          error: authError.message,
          success: false,
        };
      }

      const profileResult = await this.createProfile({
        auth_id: authData.user.id,
        email: data.email,
        nombre: data.nombre,
        apellido: data.apellido,
      });

      if (!profileResult.success) {
        console.error('Error creating user profile:', profileResult.error);
      }

      return {
        data: {
          user: {
            id: authData.user.id,
            email: authData.user.email,
          },
          session: authData.session ? {
            access_token: authData.session.access_token,
            refresh_token: authData.session.refresh_token,
          } : null,
        },
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      console.error('AuthService.signUp:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  private async createProfile(profile: {
    auth_id: string;
    email: string;
    nombre: string;
    apellido: string;
  }): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase.from('usuarios').insert({
        auth_id: profile.auth_id,
        email: profile.email,
        nombre: profile.nombre,
        apellido: profile.apellido,
      });

      if (error) {
        return {
          data: null,
          error: error.message,
          success: false,
        };
      }

      return {
        data: null,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  async signOut(): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          data: null,
          error: error.message,
          success: false,
        };
      }

      return {
        data: null,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      console.error('AuthService.signOut:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  async getSession(): Promise<ApiResponse<AuthSession>> {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return {
          data: null,
          error: error.message,
          success: false,
        };
      }

      if (!data.session) {
        return {
          data: null,
          error: null,
          success: true,
        };
      }

      return {
        data: {
          user: {
            id: data.session.user.id,
            email: data.session.user.email,
          },
          session: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          },
        },
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      console.error('AuthService.getSession:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  async getProfile(authId: string): Promise<ApiResponse<Usuario>> {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('auth_id', authId)
        .single();

      if (error) {
        return {
          data: null,
          error: error.message,
          success: false,
        };
      }

      return {
        data: data as Usuario,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  onAuthStateChange(callback: (session: AuthSession | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        callback(null);
        return;
      }
      callback({
        user: {
          id: session.user.id,
          email: session.user.email,
        },
        session: {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        },
      });
    });
  }
}

export const authService = new AuthService();
