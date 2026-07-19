# Guidelines

- Código limpio (Clean Code)
- Naming consistente
- Componentes pequeños
- Evitar lógica en UI
- Manejar errores siempre

Convenciones:
- camelCase variables
- PascalCase componentes

Archivos:
- 1 responsabilidad por archivo

Design System obligatorio:
- Usar siempre colors, spacing y typography
- Prohibido hardcodear estilos

Colores:
- Todos los colores deben venir de /app/theme/colors.ts
- Prohibido usar hex directos en componentes
- Los estados legales deben usar colores semánticos (ver skill/theme.md)
- INDAGACIÓN → amarillo | IMPUTADO → azul | JUICIO → rojo

Pantallas:
- Toda pantalla usa SafeAreaView + StatusBar dark-content
- Fondo siempre colors.background (blanco)
- Prohibido usar fondos de color sólido (azul, primary, etc.) en pantallas completas
- Contenido centrado con alignItems: 'center' y justifyContent: 'center'
- Branding: logo + STARLEX + línea tricolor (ver skill/ux_ui.md)
- Tarjetas con borderRadius.large, shadows.light, border colors.border
- Importar siempre de react-native-safe-area-context para SafeAreaView
