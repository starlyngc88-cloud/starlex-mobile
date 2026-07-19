-- ============================================================
-- STARLEX - Creación del schema legal con todas las tablas
-- Ejecutar en: https://app.supabase.com > SQL Editor
-- ============================================================

-- 1. Limpiar schema legal si existe (seguro porque no hay datos)
DROP SCHEMA IF EXISTS legal CASCADE;

-- 2. Crear el schema legal
CREATE SCHEMA legal;

-- ============================================================
-- TABLA: usuarios
-- ============================================================
CREATE TABLE legal.usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE legal.usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios_select_own" ON legal.usuarios
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "usuarios_insert_own" ON legal.usuarios
  FOR INSERT WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "usuarios_update_own" ON legal.usuarios
  FOR UPDATE USING (auth.uid() = auth_id) WITH CHECK (auth.uid() = auth_id);

-- ============================================================
-- TABLA: procesados
-- ============================================================
CREATE TABLE legal.procesados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  cedula VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100),
  telefono VARCHAR(20),
  estado VARCHAR(20) NOT NULL DEFAULT 'indagacion',
  fecha_inicio DATE,
  observaciones TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE legal.procesados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "procesados_select_own" ON legal.procesados
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "procesados_insert_own" ON legal.procesados
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "procesados_update_own" ON legal.procesados
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "procesados_delete_own" ON legal.procesados
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- TABLA: audiencias
-- ============================================================
CREATE TABLE legal.audiencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procesado_id UUID NOT NULL REFERENCES legal.procesados(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  juzgado VARCHAR(100) NOT NULL,
  radicado VARCHAR(20) NOT NULL,
  tipo_audiencia VARCHAR(50),
  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE legal.audiencias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audiencias_select_own" ON legal.audiencias
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "audiencias_insert_own" ON legal.audiencias
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "audiencias_update_own" ON legal.audiencias
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "audiencias_delete_own" ON legal.audiencias
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- TABLA: finanzas
-- ============================================================
CREATE TABLE legal.finanzas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procesado_id UUID NOT NULL REFERENCES legal.procesados(id) ON DELETE CASCADE,
  concepto VARCHAR(255) NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  tipo VARCHAR(20) NOT NULL DEFAULT 'honorario',
  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  notas TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE legal.finanzas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "finanzas_select_own" ON legal.finanzas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "finanzas_insert_own" ON legal.finanzas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "finanzas_update_own" ON legal.finanzas
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "finanzas_delete_own" ON legal.finanzas
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- FUNCIÓN: actualizar updated_at automáticamente
-- ============================================================
CREATE OR REPLACE FUNCTION legal.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para todas las tablas
CREATE TRIGGER set_usuarios_updated_at
  BEFORE UPDATE ON legal.usuarios
  FOR EACH ROW EXECUTE FUNCTION legal.update_updated_at_column();

CREATE TRIGGER set_procesados_updated_at
  BEFORE UPDATE ON legal.procesados
  FOR EACH ROW EXECUTE FUNCTION legal.update_updated_at_column();

CREATE TRIGGER set_audiencias_updated_at
  BEFORE UPDATE ON legal.audiencias
  FOR EACH ROW EXECUTE FUNCTION legal.update_updated_at_column();

CREATE TRIGGER set_finanzas_updated_at
  BEFORE UPDATE ON legal.finanzas
  FOR EACH ROW EXECUTE FUNCTION legal.update_updated_at_column();

-- ============================================================
-- PERMISOS para roles de Supabase
-- ============================================================
GRANT USAGE ON SCHEMA legal TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA legal TO authenticated;
