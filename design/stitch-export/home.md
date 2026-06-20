---
name: Institutional Minimalist
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#434656'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004bee'
  primary: '#003dc7'
  on-primary: '#ffffff'
  primary-container: '#0051ff'
  on-primary-container: '#dee2ff'
  inverse-primary: '#b7c4ff'
  secondary: '#5d5e63'
  on-secondary: '#ffffff'
  secondary-container: '#e0dfe4'
  on-secondary-container: '#626267'
  tertiary: '#715c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca800'
  on-tertiary-container: '#4d3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001452'
  on-primary-fixed-variant: '#0038b7'
  secondary-fixed: '#e3e2e7'
  secondary-fixed-dim: '#c6c6cb'
  on-secondary-fixed: '#1a1b1f'
  on-secondary-fixed-variant: '#46464b'
  tertiary-fixed: '#ffe17b'
  tertiary-fixed-dim: '#ecc300'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 41px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 25px
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-margin: 20px
  gutter: 16px
  section-gap: 32px
  stack-sm: 8px
  stack-md: 16px
---

## Brand & Style
The design system is anchored in the principles of precision, authority, and clarity. It targets legal professionals who require an environment that feels both high-security and effortlessly premium. The aesthetic is heavily inspired by Apple’s design language—prioritizing function through generous whitespace and a reductionist interface.

By blending **Minimalism** with subtle **Glassmorphism**, the UI creates a sense of depth and hierarchy without visual clutter. The inclusion of a minute, three-color thread representing the Colombian national colors provides a localized identity that feels integrated rather than decorative. The goal is to evoke a sense of calm control in the high-stakes world of legal management.

## Colors
The palette is dominated by "Apple-style" neutrals: stark whites for backgrounds, soft grays for containers, and deep blacks for primary text.

- **Primary Blue:** A professional, high-contrast blue used for primary actions and navigation.
- **Alert System:** Critical legal deadlines are signaled using vibrant Red and Orange, ensuring they are the only elements that break the monochromatic harmony.
- **National Thread:** At the very top edge of the screen, a 2px tall horizontal line is divided into Yellow, Blue, and Red segments (proportions 2:1:1), serving as a subtle mark of institutional heritage.
- **Backgrounds:** Use a pure white (`#FFFFFF`) for main surfaces and a subtle light gray (`#F2F2F7`) for secondary background layers to create depth.

## Typography
This design system utilizes **Inter** for its systematic, neutral, and highly legible characteristics. The hierarchy is modeled after iOS conventions, using weight and tracking rather than extreme size shifts to differentiate information.

- **Headlines:** Utilize semi-bold and bold weights with slightly negative letter-spacing to appear more compact and authoritative.
- **Body Text:** Standardized at 17px (Large) and 15px (Medium) for optimal readability in legal documents and case notes.
- **Labels:** Small caps with increased tracking are used for metadata and section headers within tables to provide a clean, "pro-tool" aesthetic.

## Layout & Spacing
The layout follows a **fluid grid** based on an 8pt system, ensuring consistency across varying screen sizes.

- **Safe Areas:** Adhere strictly to iOS and Android safe area insets.
- **Margins:** A standard 20px margin is applied to the left and right of all screens to provide breathing room and a premium "editorial" feel.
- **Rhythm:** Use vertical stacks in multiples of 8px. Use 32px gaps to separate major logical sections (e.g., Case Details vs. Documents).
- **Tables:** Data-heavy tables should span the full width with horizontal scrolling enabled for mobile, maintaining clear alignment between headers and cell data.

## Elevation & Depth
Depth is communicated through **Glassmorphism** and **Tonal Layering** rather than heavy shadows.

- **Navigation & Toolbars:** Use a backdrop blur (20px to 30px) with a semi-transparent white fill (`rgba(255, 255, 255, 0.7)`). This creates a sense of "material" passing underneath the navigation.
- **Cards:** Use a very subtle 1px border (`#E5E5EA`) and a soft, diffused shadow (Blur: 15px, Opacity: 4%, Color: Black) to lift cards off the background.
- **Depth Levels:**
  - **Level 0:** Main background (`#F2F2F7`).
  - **Level 1:** Content cards (`#FFFFFF`).
  - **Level 2:** Floating action buttons and modals.

## Shapes
The shape language is refined and "Apple-rounded." 

- **Standard Elements:** Buttons, input fields, and small cards use a **0.5rem (8px)** radius.
- **Large Elements:** Primary containers and modals use a **1rem (16px)** radius.
- **Subtle Accents:** Selection indicators and chips use a "Squircle" approach where possible, appearing softer than a standard geometric corner.

## Components
Consistent component styling is vital for the institutional feel of this design system.

- **Buttons:** 
  - *Primary:* Filled with Professional Blue, white text, 8px roundedness.
  - *Secondary:* Ghost style with a light gray border.
  - *Critical:* Filled with Alert Red, used sparingly for "Delete Case" or "Missed Deadline."
- **Data Tables:** Highly legible with 1px horizontal dividers. No vertical lines. Header labels are small caps.
- **Chips:** Used for case status (e.g., "Active," "Closed"). Status colors should be low-saturation backgrounds with high-saturation text.
- **Input Fields:** Minimalist design with a 1px border that turns Professional Blue on focus. Labels are always visible above the field in a smaller, secondary font size.
- **The National Thread:** A persistent component at the top of the `navigationBar`. It is a 2px line where Yellow occupies 50% and Blue/Red occupy 25% each.
- **Cards:** Content is grouped in white cards with generous padding (20px) and soft corners to ensure complex legal data remains digestible.