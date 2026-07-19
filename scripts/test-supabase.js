require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseSchema = process.env.EXPO_PUBLIC_SUPABASE_SCHEMA || 'public';

if (!supabaseUrl || !supabaseKey) {
  console.error('Faltan variables de entorno');
  process.exit(1);
}

console.log(`URL: ${supabaseUrl}`);
console.log(`Schema: ${supabaseSchema}\n`);

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: supabaseSchema },
});

async function test() {
  const tables = ['usuarios', 'procesados', 'audiencias', 'finanzas'];
  let allOk = true;

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('count', { count: 'exact', head: true }).limit(1).maybeSingle();
    if (error) {
      const msg = (error.message || '').toLowerCase();
      const code = (error.code || '').toLowerCase();
      if (code === '42p01' || msg.includes('does not exist') || msg.includes('relation')) {
        console.log(`  ${table} → Schema OK, tabla no existe (debes crearla)`);
      } else if (!error.message) {
        console.log(`  ${table} → Error sin mensaje (schema podría no existir)`);
        allOk = false;
      } else {
        console.log(`  ${table} → Error: ${error.message}`);
        allOk = false;
      }
    } else {
      console.log(`  ${table} → OK`);
    }
  }

  if (allOk) {
    console.log('\n✅ Conexión con schema legal verificada.');
  } else {
    console.log('\n⚠️  Hay errores - posiblemente el schema legal no existe aún.');
  }
}

test().catch((err) => console.error('Error:', err.message));
