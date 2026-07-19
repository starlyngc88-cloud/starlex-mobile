-- Inserta un registro de prueba en la tabla procesados
insert into legal.procesados (user_id, nombre, apellido, cedula, email, telefono, estado, observaciones)
values (
  '00000000-0000-0000-0000-000000000000',
  'Juan',
  'Pérez',
  '12345678',
  'juan@example.com',
  '555123456',
  'indagacion',
  'Registro de prueba desde el SQL Editor'
)
on conflict (cedula) do nothing;
