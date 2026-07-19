const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '.env');
const envResult = dotenv.config({ path: envPath });
const env = envResult.parsed || process.env;

module.exports = {
  expo: {
    name: 'starlex',
    slug: 'starlex',
    scheme: 'starlexapp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    sdkVersion: '54.0.0',
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      supabaseUrl: env.EXPO_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
      supabaseSchema: env.EXPO_PUBLIC_SUPABASE_SCHEMA || 'legal',
    },
  },
};
