// EJEMPLO: components/ProcesadosList.tsx
// Este archivo es un EJEMPLO - úsalo como referencia

import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useProcesados } from '../hooks/useProcesados';
import { colors, spacing, typography } from '../theme';

/**
 * ✅ COMPONENTE DESACOPLADO
 * - Solo UI
 * - Sin lógica de Supabase
 * - Usa hooks que llaman servicios
 * - Tipado y manejo de errores
 */
export function ProcesadosList() {
  const { procesados, loading, error } = useProcesados();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (procesados.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hay procesados registrados</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={procesados}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.nombre}>{item.nombre} {item.apellido}</Text>
          <Text style={styles.cédula}>{item.cedula}</Text>
          <View style={[styles.badge, getEstadoStyle(item.estado)]}>
            <Text style={styles.badgeText}>{item.estado.toUpperCase()}</Text>
          </View>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

function getEstadoStyle(estado: string) {
  switch (estado) {
    case 'indagacion':
      return { backgroundColor: colors.indagacion };
    case 'imputado':
      return { backgroundColor: colors.imputado };
    case 'juicio':
      return { backgroundColor: colors.juicio };
    default:
      return { backgroundColor: colors.secondary };
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  card: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  nombre: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  cédula: {
    ...typography.caption,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  badge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...typography.label,
    color: colors.background,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
  },
  emptyText: {
    ...typography.body,
    color: colors.secondary,
  },
});
