-- Crear usuario de prueba directamente (evita rate limit de Auth)
-- Reemplaza email y password con los que quieras

-- 1. Crear usuario en auth.users
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, confirmation_sent_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES (
  'test@starlex.com',
  crypt('123456', gen_salt('bf')),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated'
)
ON CONFLICT (email) DO UPDATE SET email_confirmed_at = NOW()
RETURNING id;

-- 2. Crear perfil en legal.usuarios (reemplaza el id del paso anterior)
INSERT INTO legal.usuarios (auth_id, email, nombre, apellido)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'test@starlex.com'),
  'test@starlex.com',
  'Test',
  'Usuario'
)
ON CONFLICT (auth_id) DO NOTHING;
