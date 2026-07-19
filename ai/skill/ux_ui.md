# UI STANDARD - STARLEX

Todas las pantallas deben seguir esta estructura obligatoria:

## Layout Base

1. SafeAreaView + StatusBar
   - `<SafeAreaView style={styles.container}>`
   - `<StatusBar barStyle="dark-content" backgroundColor={colors.background} />`

2. HEADER FIJO
   - Avatar de usuario (lado derecho), despliega menú con opciones adicionales
   - Logo y nombre de app manejados dentro del contenido de cada pantalla

3. CONTENIDO
   - Sección dinámica centrada
   - Evitar Scroll horizontal
   - Componentes reutilizables
   - Alineación: center (flex, justifyContent, alignItems)

4. BOTTOM NAVIGATION
   - Iconos: Inicio, Calendario, Clientes, Finanzas, Ajustes

## Estilo visual

- Diseño limpio y profesional
- Fondo: colors.background (blanco)
- Colores por estado legal:
  - Amarillo (colors.indagacion) → Indagación
  - Azul (colors.imputado) → Imputados
  - Rojo (colors.juicio) → Juicio
- Tarjetas:
  - Bordes redondeados (borderRadius.large)
  - Sombra ligera (shadows.light)
  - Borde: colors.border
  - Información clara y compacta

## TricolorLine (layout global)

El layout raíz (_layout.js) renderiza una línea tricolor de 3px en la parte superior de todas las pantallas autenticadas (tabs). No se muestra en la pantalla de login.

```jsx
function TricolorLine() {
  return (
    <View style={{ flexDirection: 'row', height: 3 }}>
      <View style={{ flex: 1, backgroundColor: colors.tricolor.yellow }} />
      <View style={{ flex: 1, backgroundColor: colors.tricolor.blue }} />
      <View style={{ flex: 1, backgroundColor: colors.tricolor.red }} />
    </View>
  );
}
```

## Branding obligatorio

La pantalla Home debe incluir:
- Logo de Starlex (imagen desde src/assets/)
- Texto "STARLEX" con typography.h2, letterSpacing: 6, color: '#1a2b4c'

Las pantallas de autenticación (login) muestran el branding completo (logo + STARLEX).

## Reglas obligatorias

- No crear headers diferentes
- No crear footers diferentes
- No duplicar navegación
- Toda pantalla usa el mismo layout base
- Toda pantalla usa el mismo logo
- Usar colors.background como fondo general
- No usar fondos de color sólido (azul, etc.) como fondo de pantalla completa
- Contenido centrado con alignItems: 'center' y justifyContent: 'center'

## Colores por estado legal

La aplicación usa colores semánticos para representar el estado de un proceso:
- INDAGACIÓN → amarillo (colors.indagacion)
- IMPUTADO → azul (colors.imputado)
- JUICIO → rojo (colors.juicio)

Reglas:
- Siempre usar colores del theme
- Nunca hardcodear colores
- Usar colores para bordes, indicadores y etiquetas

## Estructura de estilos (StyleSheet)

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // ... usar siempre colors, spacing, typography, borderRadius, shadows del theme
});
```

## Imports estándar

```typescript
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
```
