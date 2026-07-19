require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');

const s = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  { db: { schema: 'legal' } }
);

(async () => {
  const { data, error } = await s.from('usuarios').select('*');
  if (error) {
    console.log('Error:', JSON.stringify(error, null, 2));
    return;
  }
  console.log('Usuarios en legal.usuarios:', JSON.stringify(data, null, 2));
})();
