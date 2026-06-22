\# Arquitectura



Patrón:

UI → Services → DB



Reglas:

\- UI nunca accede a Supabase directamente

\- Toda la lógica va en Services

\- Hooks usan Services

\- Componentes son reutilizables



Stack:

\- React Native + Expo

\- Supabase (Postgres + Storage)

\- React Query

