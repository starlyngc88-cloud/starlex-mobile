## Crear Design System

Usa context + architecture + ux\_ui + mobile\_react\_native

Crea un Design System básico en:

/app/theme

Archivos:

- colors.ts
- spacing.ts
- typography.ts

Reglas:

- No hardcodear estilos
- Todo debe venir de theme
- Debe ser reutilizable y escalable


## Crear pantalla

Usa context + architecture + ux\_ui + mobile\_react\_native + theme

Crea una pantalla en React Native usando Expo.

Requisitos:

- UI limpia
- Usar services
- NO lógica en components
- NO usar fetch, axios ni llamadas HTTP directas — usar siempre los services de /app/services

OBLIGATORIO:

- Usar SafeAreaView de react-native-safe-area-context
- StatusBar barStyle="dark-content" backgroundColor={colors.background}
- Fondo: colors.background (blanco)
- Contenido centrado con alignItems: 'center' y justifyContent: 'center'
- Branding en la parte superior: logo (imagen) + STARLEX + línea tricolor
- Tarjetas con borderRadius.large, shadows.light, border colors.border
- Usar Layout global (Header + BottomTabs)
- No crear headers propios
- No duplicar navegación
- Solo implementar contenido interno


ESTILO:

- Usar colors, spacing y typography (Design System)
- No hardcodear estilos
- Imports estándar:

```typescript
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
```

El diseño debe seguir el estándar definido en ux\_ui.md


## Crear servicio

Crea un servicio desacoplado para consumir Supabase.

Requisitos:

- Manejar errores
- Tipado claro
- Reutilizable
- No acoplado a la UI

## Actualizar README

Usa context + architecture + product

Actualiza el archivo README.md en la raíz del proyecto.

Objetivo:
Mantener una descripción clara y actualizada de la aplicación.

Reglas:
- Explicar qué hace la app en pocas palabras
- Incluir nuevas funcionalidades añadidas recientemente
- Mantener texto breve, claro y profesional
- No eliminar información existente importante
- Optimizar para que sea fácil de leer (bullets o secciones cortas)

Contenido mínimo:
- Descripción de la app
- Módulos principales
- Últimas funcionalidades añadidas

Formato:
- Markdown limpio
- Evitar textos largos
- Enfocado en desarrolladores y producto
