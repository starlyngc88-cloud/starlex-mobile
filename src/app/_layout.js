import { Tabs } from 'expo-router';
import { Home, Calendar, Users, DollarSign, Settings } from 'lucide-react-native'; // 👈 'Calendar' siempre debe importarse así en inglés

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#003dc7', // Azul Starlex
        tabBarInactiveTintColor: '#71717a',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          textTransform: 'lowercase',
        },
        headerShown: false,
      }}
    >
      {/* 1. HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />
      
      {/* 2. CALENDARIO */}
      <Tabs.Screen
        name="calendario" // 👈 Tu archivo en español físico
        options={{
          title: 'calendario',
          // 👈 AQUÍ: Aseguramos que use el componente <Calendar /> de Lucide en mayúscula
          tabBarIcon: ({ color }) => <Calendar color={color} size={22} />, 
        }}
      />

      {/* 3. CLIENTES */}
      <Tabs.Screen
        name="clientes" 
        options={{
          title: 'clientes',
          tabBarIcon: ({ color }) => <Users color={color} size={22} />,
        }}
      />

      {/* 4. FINANZAS */}
      <Tabs.Screen
        name="finanzas" 
        options={{
          title: 'finanzas',
          tabBarIcon: ({ color }) => <DollarSign color={color} size={22} />,
        }}
      />

      {/* 5. AJUSTES */}
      <Tabs.Screen
        name="ajustes" 
        options={{
          title: 'ajustes',
          tabBarIcon: ({ color }) => <Settings color={color} size={22} />,
        }}
      />

      {/* RUTA DE ALERTAS OCULTA */}
      <Tabs.Screen
        name="alerts"
        options={{
          href: null, 
        }}
      />
    </Tabs>
  );
}