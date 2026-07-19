// types/index.ts

// Estados legales
export type EstadoLegal = 'indagacion' | 'imputado' | 'juicio' | 'sentencia';

// PROCESADO (Cliente del despacho)
export interface Procesado {
  id: string;
  user_id?: string;
  nombre: string;
  apellido: string;
  cedula: string;
  email?: string;
  telefono?: string;
  estado: EstadoLegal;
  fecha_inicio?: string;
  observaciones?: string;
  created_at: string;
  updated_at: string;
}

// AUDIENCIA
export interface Audiencia {
  id: string;
  procesado_id: string;
  titulo: string;
  descripcion?: string;
  fecha: string;
  hora: string;
  juzgado: string;
  radicado: string;
  tipo_audiencia: string; // 'pruebas', 'conciliacion', 'sentencia', etc.
  estado: 'pendiente' | 'realizada' | 'cancelada';
  created_at: string;
  updated_at: string;
}

// FINANZA (Registro de honorarios/gastos)
export interface Finanza {
  id: string;
  procesado_id: string;
  concepto: string;
  monto: number;
  tipo: 'honorario' | 'gasto' | 'pago';
  estado: 'pendiente' | 'pagado';
  fecha: string;
  notas?: string;
  created_at: string;
  updated_at: string;
}

// USUARIO (Abogado)
export interface Usuario {
  id: string;
  auth_id: string;
  email: string;
  nombre: string;
  apellido: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
}

// AUTH
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthSession {
  user: {
    id: string;
    email?: string;
  };
  session: {
    access_token: string;
    refresh_token: string;
  } | null;
}

// Response genérico para operaciones
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface ListResponse<T> {
  data: T[];
  count: number;
  error: string | null;
  success: boolean;
}
