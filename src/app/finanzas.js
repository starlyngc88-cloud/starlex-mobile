import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react-native';
import { colors, spacing, typography, shadows, borderRadius as br } from '../theme';
import { finanzasService } from '../../app/services';

function formatCurrency(amount) {
  return '$' + amount.toLocaleString('es-CO');
}

export default function Finanzas() {
  const [finanzas, setFinanzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await finanzasService.getAllFinanzas();
      if (res.success) {
        setFinanzas(res.data);
      }
      setLoading(false);
    };
    load();
  }, []);

  const totalPendiente = finanzas
    .filter((f) => f.estado === 'pendiente')
    .reduce((sum, f) => sum + f.monto, 0);

  const totalPagado = finanzas
    .filter((f) => f.estado === 'pagado')
    .reduce((sum, f) => sum + f.monto, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Finanzas</Text>
        <Text style={styles.headerSubtitle}>{finanzas.length} registro{finanzas.length !== 1 ? 's' : ''}</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.xl }} />
      ) : finanzas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <DollarSign color={colors.secondary} size={48} />
          <Text style={styles.emptyText}>No hay registros financieros</Text>
        </View>
      ) : (
        <>
          <View style={styles.summaryContainer}>
            <View style={[styles.summaryCard, { borderLeftColor: colors.warning }]}>
              <TrendingDown color={colors.warning} size={20} />
              <Text style={styles.summaryLabel}>Pendiente</Text>
              <Text style={[styles.summaryAmount, { color: colors.warning }]}>{formatCurrency(totalPendiente)}</Text>
            </View>
            <View style={[styles.summaryCard, { borderLeftColor: colors.success }]}>
              <TrendingUp color={colors.success} size={20} />
              <Text style={styles.summaryLabel}>Pagado</Text>
              <Text style={[styles.summaryAmount, { color: colors.success }]}>{formatCurrency(totalPagado)}</Text>
            </View>
          </View>

          <FlatList
            data={finanzas}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardRow}>
                  <Text style={styles.cardConcepto}>{item.concepto}</Text>
                  <Text style={[styles.cardMonto, item.estado === 'pagado' ? styles.montoPagado : styles.montoPendiente]}>
                    {formatCurrency(item.monto)}
                  </Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardFecha}>{item.fecha}</Text>
                  <Text style={[styles.cardEstado, item.estado === 'pagado' ? styles.estadoPagado : styles.estadoPendiente]}>
                    {item.estado.toUpperCase()}
                  </Text>
                </View>
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  summaryContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderLeftWidth: 3,
    borderRadius: br.medium,
    padding: spacing.md,
  },
  summaryLabel: {
    ...typography.small,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  summaryAmount: {
    ...typography.h3,
    marginTop: spacing.xs,
  },
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: br.large,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardConcepto: {
    ...typography.captionBold,
    color: colors.text.primary,
    flex: 1,
  },
  cardMonto: {
    ...typography.captionBold,
  },
  montoPagado: {
    color: colors.success,
  },
  montoPendiente: {
    color: colors.warning,
  },
  cardFecha: {
    ...typography.small,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  cardEstado: {
    ...typography.small,
    marginTop: spacing.xs,
  },
  estadoPagado: {
    color: colors.success,
  },
  estadoPendiente: {
    color: colors.warning,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyText: {
    ...typography.body,
    color: colors.secondary,
    marginTop: spacing.md,
  },
});