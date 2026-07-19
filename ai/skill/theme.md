# Design Tokens - STARLEX

## Colores Semánticos por Estado Legal

Estos colores representan las fases del proceso penal colombiano:

### Estados
- **INDAGACIÓN** → Amarillo (`#FFA500`)
  - Fase preliminar de investigación
  - Símbolo: precaución/atención
  
- **IMPUTADO** → Azul (`#007AFF`)
  - Ya hay acusación formal
  - Símbolo: información activa
  
- **JUICIO** → Rojo (`#FF3B30`)
  - En fase de juicio/sentencia
  - Símbolo: crítico/urgente

### Neutros
- **Éxito/Resuelto** → Verde (`#34C759`)
- **Error/Problema** → Rojo (`#FF3B30`)
- **Advertencia** → Naranja (`#FF9500`)
- **Información** → Azul (`#007AFF`)

## Espaciado (REM = 8px)

```
xs: 4px (0.5rem)
sm: 8px (1rem)
md: 16px (2rem)
lg: 24px (3rem)
xl: 32px (4rem)
xxl: 48px (6rem)
```

## Tipografía

```
H1: 32px, bold - Títulos principales
H2: 24px, bold - Subtítulos
H3: 20px, semibold - Encabezados secundarios
Body: 16px, regular - Texto principal
Caption: 14px, regular - Texto auxiliar
Small: 12px, regular - Etiquetas
```

## Sombra
- Light: 0px 2px 4px rgba(0,0,0,0.1)
- Medium: 0px 4px 8px rgba(0,0,0,0.15)
- Heavy: 0px 8px 16px rgba(0,0,0,0.2)

## Border Radius
- None: 0px
- Small: 4px
- Medium: 8px
- Large: 12px
- Round: 24px

## Importancia
⚠️ **OBLIGATORIO**: Usar siempre `/app/theme/colors.ts`, `/app/theme/spacing.ts` y `/app/theme/typography.ts`

Nunca hardcodear valores de diseño en componentes.
