// services/finanzas.service.ts
import { supabase } from '../lib/supabase';
import { Finanza, ApiResponse, ListResponse } from '../types';

export class FinanzasService {
  /**
   * Obtener todas las finanzas de un procesado
   */
  async getFinanzasByProcesado(procesado_id: string): Promise<ListResponse<Finanza>> {
    try {
      const { data, error, count } = await supabase
        .from('finanzas')
        .select('*', { count: 'exact' })
        .eq('procesado_id', procesado_id)
        .order('fecha', { ascending: false });

      if (error) {
        console.error('Error fetching finanzas:', error);
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
      console.error('FinanzasService.getFinanzasByProcesado:', message);
      return {
        data: [],
        count: 0,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Obtener balance total (pendiente + pagado)
   */
  async getBalance(procesado_id: string): Promise<ApiResponse<{ pendiente: number; pagado: number; total: number }>> {
    try {
      const { data, error } = await supabase
        .from('finanzas')
        .select('monto,estado')
        .eq('procesado_id', procesado_id);

      if (error) {
        console.error('Error calculating balance:', error);
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

      const balance = {
        pendiente: 0,
        pagado: 0,
        total: 0,
      };

      (data || []).forEach((item) => {
        if (item.estado === 'pendiente') {
          balance.pendiente += item.monto;
        } else if (item.estado === 'pagado') {
          balance.pagado += item.monto;
        }
      });

      balance.total = balance.pendiente + balance.pagado;

      return {
        data: balance,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('FinanzasService.getBalance:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Obtener todas las finanzas (vista general)
   */
  async getAllFinanzas(): Promise<ListResponse<Finanza>> {
    try {
      const { data, error, count } = await supabase
        .from('finanzas')
        .select('*', { count: 'exact' })
        .order('fecha', { ascending: false });

      if (error) {
        console.error('Error fetching all finanzas:', error);
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
      console.error('FinanzasService.getAllFinanzas:', message);
      return {
        data: [],
        count: 0,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Crear nuevo registro financiero
   */
  async createFinanza(finanza: Omit<Finanza, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Finanza>> {
    try {
      if (!finanza.procesado_id || !finanza.monto) {
        return {
          data: null,
          error: 'Procesado y monto son requeridos',
          success: false,
        };
      }

      if (finanza.monto < 0) {
        return {
          data: null,
          error: 'El monto no puede ser negativo',
          success: false,
        };
      }

      const { data, error } = await supabase
        .from('finanzas')
        .insert([finanza])
        .select()
        .single();

      if (error) {
        console.error('Error creating finanza:', error);
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
        data: data as Finanza,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('FinanzasService.createFinanza:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Actualizar finanza
   */
  async updateFinanza(id: string, updates: Partial<Finanza>): Promise<ApiResponse<Finanza>> {
    try {
      const { data, error } = await supabase
        .from('finanzas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating finanza:', error);
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
        data: data as Finanza,
        error: null,
        success: true,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('FinanzasService.updateFinanza:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }

  /**
   * Marcar como pagado
   */
  async markAsPaid(id: string): Promise<ApiResponse<Finanza>> {
    return this.updateFinanza(id, { estado: 'pagado' });
  }

  /**
   * Eliminar finanza
   */
  async deleteFinanza(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('finanzas')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting finanza:', error);
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
      console.error('FinanzasService.deleteFinanza:', message);
      return {
        data: null,
        error: message,
        success: false,
      };
    }
  }
}

export const finanzasService = new FinanzasService();
