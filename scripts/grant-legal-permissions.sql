-- USAGE: necesario para que PostgREST pueda ver el schema
GRANT USAGE ON SCHEMA legal TO anon;
GRANT USAGE ON SCHEMA legal TO authenticated;

-- Datos: solo usuarios autenticados pueden leer/escribir
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA legal TO authenticated;
