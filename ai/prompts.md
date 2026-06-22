\## Crear Design System



Usa context + architecture + ux\_ui + mobile\_react\_native



Crea un Design System básico en:

/app/theme



Archivos:

\- colors.ts

\- spacing.ts

\- typography.ts



Reglas:

\- No hardcodear estilos

\- Todo debe venir de theme

\- Debe ser reutilizable y escalable





\## Crear pantalla



Usa context + architecture + ux\_ui + mobile\_react\_native + theme



Crea una pantalla en React Native usando Expo.



Requisitos:

\- UI limpia

\- Usar services

\- NO lógica en components



OBLIGATORIO:

\- Usar Layout global (Header + BottomTabs)

\- No crear headers propios

\- No duplicar navegación

\- Solo implementar contenido interno



ESTILO:

\- Usar colors, spacing y typography (Design System)

\- No hardcodear estilos



El diseño debe seguir el estándar definido en ux\_ui.md





\## Crear servicio



Crea un servicio desacoplado para consumir Supabase.



Requisitos:

\- Manejar errores

\- Tipado claro

\- Reutilizable

\- No acoplado a la UI



