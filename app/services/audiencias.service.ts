// services/audiencias.service.ts
import { supabase } from '../lib/supabase';
import { Audiencia, ApiResponse, ListResponse } from '../types';

export class AudienciasService {
  /**
   * Obtener todas las audiencias de un procesado
   */
  async getAudienciasByProcesado(procesado_id: string): Promise<ListResponse<Audiencia>> {
    try {
      const { data, error, count } = await supabase
        .from('audiencias')
        .select('*', { count: 'exact' })
        .eq('procesado_id', procesado_id)
        .order('fecha', { ascending: true });

      if (error) {
        console.error('Error fetching audiencias:', error);
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
      console.error('AudienciasService.getAudienciasByProcesado:', message);
      return {
        data: [],
        count: 0,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Obtener todas las audiencias pendientes
   */
  async getAudienciasPendientes(): Promise<ListResponse<Audiencia>> {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error, count } = await supabase
        .from('audiencias')
        .select('*', { count: 'exact' })
        .eq('estado', 'pendiente')
        .gte('fecha', today)
        .order('fecha', { ascending: true });

      if (error) {
        console.error('Error fetching audiencias pendientes:', error);
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
      console.error('AudienciasService.getAudienciasPendientes:', message);
      return {
        data: [],
        count: 0,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Crear nueva audiencia
   */
  async createAudiencia(audiencia: Omit<Audiencia, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Audiencia>> {
    try {
      if (!audiencia.procesado_id || !audiencia.fecha || !audiencia.hora) {
        return {
          data: null,
          error: 'Datos requeridos faltantes',
          success: false,
        };
      }

      const { data, error } = await supabase
        .from('audiencias')
        .insert([audiencia])
        .select()
        .single();

      if (error) {
        console.error('Error creating audiencia:', error);
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
        data: data as Audiencia,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('AudienciasService.createAudiencia:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Actualizar audiencia
   */
  async updateAudiencia(id: string, updates: Partial<Audiencia>): Promise<ApiResponse<Audiencia>> {
    try {
      const { data, error } = await supabase
        .from('audiencias')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating audiencia:', error);
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
        data: data as Audiencia,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('AudienciasService.updateAudiencia:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Eliminar audiencia
   */
  async deleteAudiencia(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('audiencias')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting audiencia:', error);
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
      console.error('AudienciasService.deleteAudiencia:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }
}

export const audienciasService = new AudienciasService();
