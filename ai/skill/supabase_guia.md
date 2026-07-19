# 🔌 CONEXIÓN CON SUPABASE - GUÍA COMPLETA

## 📦 Instalación

```bash
npm install @supabase/supabase-js
# o
yarn add @supabase/supabase-js
```

---

## 🔐 Configuración de Variables de Entorno

### 1. Crear proyecto en Supabase
```
1. Ve a https://app.supabase.com
2. Crea un nuevo proyecto
3. Espera a que se cree la base de datos
```

### 2. Obtener credenciales
```
1. Settings > API
2. Copia:
   - Project URL → EXPO_PUBLIC_SUPABASE_URL
   - anon public key → EXPO_PUBLIC_SUPABASE_ANON_KEY
```

### 3. Crear archivo `.env`
```bash
# .env (NUNCA subir a Git, añadir a .gitignore)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🏗️ Estructura del Proyecto

```
app/
├── lib/
│   └── supabase.ts           ← Cliente Supabase (ÚNICO PUNTO DE CONEXIÓN)
├── services/
│   ├── index.ts              ← Exporta todos los servicios
│   ├── procesados.service.ts
│   ├── audiencias.service.ts
│   └── finanzas.service.ts
├── hooks/
│   └── useProcesados.ts      ← Hook que usa el servicio
├── components/
│   └── ProcesadosList.example.tsx ← Componente que usa el hook
├── types/
│   └── index.ts              ← Tipos TypeScript
└── theme/
    └── colors.ts
```

---

## 🛠️ Cómo Usar los Servicios

### Opción A: Directamente en componentes (Simple)

```typescript
import React, { useState, useEffect } from 'react';
import { procesadosService } from '../services';

export function MyComponent() {
  const [procesados, setProcesados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const response = await procesadosService.getProcesados();
      if (response.success) {
        setProcesados(response.data);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Text>Cargando...</Text>;
  
  return (
    <View>
      {procesados.map((p) => (
        <Text key={p.id}>{p.nombre}</Text>
      ))}
    </View>
  );
}
```

### Opción B: Con hooks personalizados (Recomendado)

```typescript
import { useProcesados } from '../hooks/useProcesados';

export function MyComponent() {
  const { procesados, loading, error } = useProcesados();

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <View>
      {procesados.map((p) => (
        <Text key={p.id}>{p.nombre}</Text>
      ))}
    </View>
  );
}
```

---

## 📝 Métodos Disponibles

### ProcesadosService
```typescript
// Obtener todos
const response = await procesadosService.getProcesados();

// Obtener uno
const response = await procesadosService.getProcesado('id-123');

// Crear
const response = await procesadosService.createProcesado({
  nombre: 'Juan',
  apellido: 'Pérez',
  cedula: '123456789',
  estado: 'indagacion',
});

// Actualizar
const response = await procesadosService.updateProcesado('id-123', {
  estado: 'imputado',
});

// Eliminar
const response = await procesadosService.deleteProcesado('id-123');

// Buscar
const response = await procesadosService.searchProcesados('Juan');
```

### AudienciasService
```typescript
// Por procesado
const response = await audienciasService.getAudienciasByProcesado('procesado-id');

// Pendientes
const response = await audienciasService.getAudienciasPendientes();

// Crear
const response = await audienciasService.createAudiencia({
  procesado_id: 'id-123',
  titulo: 'Audiencia de Pruebas',
  fecha: '2026-07-25',
  hora: '10:00',
  juzgado: 'Juzgado 14',
  radicado: '2023-00452',
  tipo_audiencia: 'pruebas',
  estado: 'pendiente',
});
```

### FinanzasService
```typescript
// Por procesado
const response = await finanzasService.getFinanzasByProcesado('procesado-id');

// Balance
const response = await finanzasService.getBalance('procesado-id');
// Retorna: { pendiente: 500000, pagado: 1000000, total: 1500000 }

// Crear
const response = await finanzasService.createFinanza({
  procesado_id: 'id-123',
  concepto: 'Honorarios parciales',
  monto: 500000,
  tipo: 'honorario',
  estado: 'pendiente',
  fecha: '2026-07-18',
});

// Marcar como pagado
const response = await finanzasService.markAsPaid('finanza-id');
```

---

## ✅ Estructura de Response

Todos los servicios retornan un objeto estandarizado:

```typescript
// Para operaciones con datos
interface ApiResponse<T> {
  data: T | null;        // Los datos (null si error)
  error: string | null;  // El error (null si éxito)
  success: boolean;      // true/false
}

// Para listados
interface ListResponse<T> {
  data: T[];             // Array de datos
  count: number;         // Total de registros
  error: string | null;
  success: boolean;
}

// USO:
const response = await procesadosService.getProcesados();
if (response.success) {
  console.log(response.data);  // Array de Procesados
  console.log(response.count); // Total
} else {
  console.error(response.error); // Mensaje de error
}
```

---

## 🗄️ Modelos de Datos (Tablas en Supabase)

### Tabla: `procesados`
```sql
id              UUID PRIMARY KEY
nombre          VARCHAR(100) NOT NULL
apellido        VARCHAR(100) NOT NULL
cedula          VARCHAR(20) NOT NULL UNIQUE
email           VARCHAR(100)
telefono        VARCHAR(20)
estado          VARCHAR(20) -- 'indagacion', 'imputado', 'juicio', 'sentencia'
fecha_inicio    DATE
observaciones   TEXT
created_at      TIMESTAMP DEFAULT NOW()
updated_at      TIMESTAMP DEFAULT NOW()
```

### Tabla: `audiencias`
```sql
id              UUID PRIMARY KEY
procesado_id    UUID NOT NULL (FOREIGN KEY → procesados.id)
titulo          VARCHAR(255) NOT NULL
descripcion     TEXT
fecha           DATE NOT NULL
hora            TIME NOT NULL
juzgado         VARCHAR(100) NOT NULL
radicado        VARCHAR(20) NOT NULL
tipo_audiencia  VARCHAR(50)
estado          VARCHAR(20) -- 'pendiente', 'realizada', 'cancelada'
created_at      TIMESTAMP DEFAULT NOW()
updated_at      TIMESTAMP DEFAULT NOW()
```

### Tabla: `finanzas`
```sql
id              UUID PRIMARY KEY
procesado_id    UUID NOT NULL (FOREIGN KEY → procesados.id)
concepto        VARCHAR(255) NOT NULL
monto           DECIMAL(12,2) NOT NULL
tipo            VARCHAR(20) -- 'honorario', 'gasto', 'pago'
estado          VARCHAR(20) -- 'pendiente', 'pagado'
fecha           DATE NOT NULL
notas           TEXT
created_at      TIMESTAMP DEFAULT NOW()
updated_at      TIMESTAMP DEFAULT NOW()
```

---

## 🔒 Seguridad (RLS)

Regla estricta del proyecto: todo debe ser privado por defecto y solo el usuario que creó el registro puede verlo o modificarlo.

```sql
-- Reglas obligatorias para procesados, audiencias y finanzas
-- 1) Siempre habilitar RLS
ALTER TABLE public.procesados ENABLE ROW LEVEL SECURITY;

-- 2) El usuario solo ve sus propios registros
CREATE POLICY "procesados_select_own_only"
ON public.procesados FOR SELECT
USING (auth.uid() = user_id);

-- 3) El usuario solo puede crear registros para sí mismo
CREATE POLICY "procesados_insert_own_only"
ON public.procesados FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 4) El usuario solo puede actualizar sus propios registros
CREATE POLICY "procesados_update_own_only"
ON public.procesados FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5) El usuario solo puede borrar sus propios registros
CREATE POLICY "procesados_delete_own_only"
ON public.procesados FOR DELETE
USING (auth.uid() = user_id);
```

> No se permiten accesos públicos ni por defecto ni por opción. Si en el futuro se quiere compartir algo, debe hacerse explícitamente y de forma manual.

---

## 🧪 Testing

```typescript
// test/procesados.service.test.ts
import { procesadosService } from '../services';

describe('ProcesadosService', () => {
  it('should get all procesados', async () => {
    const response = await procesadosService.getProcesados();
    expect(response.success).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    const response = await procesadosService.createProcesado({
      nombre: '',  // Error: nombre requerido
      apellido: 'Pérez',
      cedula: '123',
      estado: 'indagacion',
    });
    expect(response.success).toBe(false);
    expect(response.error).toBeDefined();
  });
});
```

---

## 🚨 Troubleshooting

### Error: "Missing Supabase environment variables"
```
✅ Solución: 
- Verifica que .env existe en la raíz del proyecto
- Las variables empiezan con EXPO_PUBLIC_
- Reinicia el servidor: npm start
```

### Error: "Invalid API Key"
```
✅ Solución:
- Copia bien la anon key (sin espacios)
- Asegúrate que no sea la service_role_key
```

### Error: "Authentication required"
```
✅ Solución:
- Implementa autenticación antes de usar
- O desactiva RLS temporalmente para testing
```

---

## ⚡ Próximos Pasos

1. ✅ Crear tablas en Supabase
2. ✅ Añadir credenciales en .env
3. ✅ Usar servicios en componentes
4. ✅ Implementar autenticación
5. ✅ Añadir RLS para seguridad

Listo. Los servicios están desacoplados y listos para usar. 🚀
