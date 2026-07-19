import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { Home, Calendar, Users, DollarSign, Settings } from 'lucide-react-native';
import { useAuth } from '../../app/hooks/useAuth';
import { LoginScreen } from '../../app/components/LoginScreen';
import { colors, typography, spacing } from '../theme';

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

function TricolorLine() {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: colors.background }}>
      <View style={{ flexDirection: 'row', height: 3 }}>
        <View style={{ flex: 1, backgroundColor: colors.tricolor.yellow }} />
        <View style={{ flex: 1, backgroundColor: colors.tricolor.blue }} />
        <View style={{ flex: 1, backgroundColor: colors.tricolor.red }} />
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaProvider>
        <LoadingScreen />
      </SafeAreaProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaProvider>
        <LoginScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <TricolorLine />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.secondary,
            tabBarStyle: {
              backgroundColor: colors.background,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              height: 65,
              paddingBottom: spacing.sm,
              paddingTop: spacing.xs,
            },
            tabBarLabelStyle: {
              ...typography.label,
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <Home color={color} size={22} />,
            }}
          />

          <Tabs.Screen
            name="calendario"
            options={{
              title: 'calendario',
              tabBarIcon: ({ color }) => <Calendar color={color} size={22} />,
            }}
          />

          <Tabs.Screen
            name="procesados"
            options={{
              title: 'procesados',
              tabBarIcon: ({ color }) => <Users color={color} size={22} />,
            }}
          />

          <Tabs.Screen
            name="finanzas"
            options={{
              title: 'finanzas',
              tabBarIcon: ({ color }) => <DollarSign color={color} size={22} />,
            }}
          />

          <Tabs.Screen
            name="ajustes"
            options={{
              title: 'ajustes',
              tabBarIcon: ({ color }) => <Settings color={color} size={22} />,
            }}
          />

        <Tabs.Screen
          name="alerts"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="nuevo-evento"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="nuevo-procesado"
          options={{
            href: null,
          }}
        />
      </Tabs>
      </View>
    </SafeAreaProvider>
  );
}
