// services/procesados.service.ts
import { supabase } from '../lib/supabase';
import { Procesado, ApiResponse, ListResponse } from '../types';

export class ProcesadosService {
  /**
   * Obtener todos los procesados del usuario actual
   * ✅ Desacoplado: No depende de React
   * ✅ Tipado: Retorna tipos claros
   * ✅ Manejo de errores: Try/catch
   */
  async getProcesados(): Promise<ListResponse<Procesado>> {
    try {
      const { data, error, count } = await supabase
        .from('procesados')
        .select('*', { count: 'exact' })
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching procesados:', error);
        try {
          console.error('Supabase error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        } catch (e) {
          console.error('Failed to stringify error details', e);
        }
        return {
          data: [],
          count: 0,
          error: error.message,
          success: false,
        };
      }

      return {
        data: data || [],
        count: count || 0,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('ProcesadosService.getProcesados:', message);
      return {
        data: [],
        count: 0,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Obtener un procesado por ID
   */
  async getProcesado(id: string): Promise<ApiResponse<Procesado>> {
    try {
      const { data, error } = await supabase
        .from('procesados')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching procesado:', error);
        try {
          console.error('Supabase error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        } catch (e) {
          console.error('Failed to stringify error details', e);
        }
        return {
          data: null,
          error: error.message,
          success: false,
        };
      }

      return {
        data: data as Procesado,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('ProcesadosService.getProcesado:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Crear nuevo procesado
   */
  async createProcesado(procesado: Omit<Procesado, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Procesado>> {
    try {
      // Validaciones básicas
      if (!procesado.nombre || !procesado.apellido) {
        return {
          data: null,
          error: 'Nombre y apellido son requeridos',
          success: false,
        };
      }

      const { data: userData } = await supabase.auth.getUser();
      const user_id = userData?.user?.id;

      const { data, error } = await supabase
        .from('procesados')
        .insert([{ ...procesado, user_id }])
        .select()
        .single();

      if (error) {
        console.error('Error creating procesado:', error);
        try {
          console.error('Supabase error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        } catch (e) {
          console.error('Failed to stringify error details', e);
        }
        return {
          data: null,
          error: error.message,
          success: false,
        };
      }

      return {
        data: data as Procesado,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('ProcesadosService.createProcesado:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Actualizar procesado
   */
  async updateProcesado(id: string, updates: Partial<Procesado>): Promise<ApiResponse<Procesado>> {
    try {
      const { data, error } = await supabase
        .from('procesados')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating procesado:', error);
        try {
          console.error('Supabase error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        } catch (e) {
          console.error('Failed to stringify error details', e);
        }
        return {
          data: null,
          error: error.message,
          success: false,
        };
      }

      return {
        data: data as Procesado,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('ProcesadosService.updateProcesado:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Eliminar procesado
   */
  async deleteProcesado(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('procesados')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting procesado:', error);
        try {
          console.error('Supabase error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        } catch (e) {
          console.error('Failed to stringify error details', e);
        }
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
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('ProcesadosService.deleteProcesado:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Buscar procesados por nombre
   */
  async searchProcesados(query: string): Promise<ListResponse<Procesado>> {
    try {
      const { data, error, count } = await supabase
        .from('procesados')
        .select('*', { count: 'exact' })
        .or(`nombre.ilike.%${query}%,apellido.ilike.%${query}%`);

      if (error) {
        console.error('Error searching procesados:', error);
        try {
          console.error('Supabase error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        } catch (e) {
          console.error('Failed to stringify error details', e);
        }
        return {
          data: [],
          count: 0,
          error: error.message,
          success: false,
        };
      }

      return {
        data: data || [],
        count: count || 0,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('ProcesadosService.searchProcesados:', message);
      return {
        data: [],
        count: 0,
        error: message,
        success: false,
      };
    }
  }
}

// Singleton: una sola instancia del servicio
export const procesadosService = new ProcesadosService();
