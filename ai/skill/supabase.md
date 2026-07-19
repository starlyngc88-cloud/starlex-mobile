\# Supabase



\- Usar Postgres como DB principal

\- Storage para archivos (PDF, imágenes, videos)



Reglas:

\- No llamadas directas desde UI

\- Siempre usar services

\- Manejar errores correctamente

Pautas para la IA:

- Tratar el esquema `public` como un namespace por defecto, no como un mecanismo de seguridad.
- Aplicar seguridad con permisos/grants, Row Level Security (RLS) y políticas (`POLICIES`), no con el esquema solo.
- Evitar exponer datos sensibles a rutas o servicios que usen el rol `anon` sin políticas estrictas.
- No usar `service_role` en el frontend; reservarlo para backend/servicios confiables.
- Para datos privados, diseñar tablas protegidas y usar RLS, no depender únicamente del esquema.
- Usar esquemas para separar organización o responsabilidad, pero recordar que la seguridad real depende de políticas y roles.
