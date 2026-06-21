import { Tabs } from 'expo-router';
import { Calendar, Users, CreditCard, Settings } from 'lucide-react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#003dc7',     // Color azul primario para el item activo
        tabBarInactiveTintColor: '#5d5e63',   // Color gris para los inactivos
        tabBarStyle: {
          height: 80,
          backgroundColor: '#fcf8fb',
          borderTopWidth: 1,
          borderTopColor: 'rgba(195, 197, 217, 0.3)',
          paddingBottom: 20,
          paddingTop: 10,
        },
        headerShown: false, // Ocultamos la barra superior por defecto
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calendario',
          tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="clientes"
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color }) => <Users color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="finanzas"
        options={{
          title: 'Finanzas',
          tabBarIcon: ({ color }) => <CreditCard color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="ajustes"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}