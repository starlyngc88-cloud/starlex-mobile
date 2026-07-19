-- Ejecutar en Supabase SQL Editor (https://app.supabase.com > SQL Editor)
-- 1. Crear el esquema legal (si no existe)
CREATE SCHEMA IF NOT EXISTS legal;

-- 2. Crear la tabla de usuarios en el esquema legal
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

-- 3. Habilitar Row Level Security
ALTER TABLE legal.usuarios ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de seguridad (cada usuario solo ve/modifica su propio perfil)
CREATE POLICY "usuarios_select_own" ON legal.usuarios
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "usuarios_insert_own" ON legal.usuarios
  FOR INSERT WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "usuarios_update_own" ON legal.usuarios
  FOR UPDATE USING (auth.uid() = auth_id) WITH CHECK (auth.uid() = auth_id);

-- 5. Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION legal.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_usuarios_updated_at
  BEFORE UPDATE ON legal.usuarios
  FOR EACH ROW
  EXECUTE FUNCTION legal.update_updated_at_column();
