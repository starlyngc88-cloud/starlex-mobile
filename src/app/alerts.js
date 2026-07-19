import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, ChevronRight, Bell } from 'lucide-react-native';
import { colors, spacing, typography, shadows, borderRadius as br } from '../theme';
import { audienciasService } from '../../app/services';

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await audienciasService.getAudienciasPendientes();
      if (res.success) {
        const mapped = res.data.map((a) => ({
          id: a.id,
          title: a.titulo,
          time: `${a.fecha} — ${a.hora}`,
          detail: `${a.juzgado} • Rad. ${a.radicado}`,
        }));
        setAlerts(mapped);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleRow}>
          <Bell color={colors.critical} size={24} style={styles.bellIcon} />
          <Text style={styles.headerTitle}>Alertas del Sistema</Text>
        </View>
        <Text style={styles.headerSubtitle}>Revisa los términos judiciales críticos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{alerts.length} {alerts.length === 1 ? 'ACCIÓN REQUERIDA' : 'ACCIONES REQUERIDAS'}</Text>
        
        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.xl }} />
        ) : alerts.length === 0 ? (
          <Text style={styles.emptyText}>No hay alertas pendientes</Text>
        ) : alerts.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertIndicator} />
            <View style={styles.alertContent}>
              <View style={styles.alertTextRow}>
                <AlertTriangle color={colors.critical} size={18} style={styles.iconMargin} />
                <Text style={styles.alertMainText}>{alert.title}</Text>
              </View>
              <Text style={styles.alertTimeText}>{alert.time}</Text>
              <Text style={styles.alertDetailText}>{alert.detail}</Text>
            </View>
            <TouchableOpacity style={styles.verButton}>
              <Text style={styles.verButtonText}>Gestionar</Text>
              <ChevronRight color={colors.critical} size={14} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  headerContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
    paddingBottom: spacing.md,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginRight: spacing.sm,
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
  scrollContainer: {
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.critical,
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#ffe3e3',
    borderRadius: br.large,
    marginBottom: spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: spacing.md,
    overflow: 'hidden',
  },
  alertIndicator: {
    width: 5,
    height: '100%',
    backgroundColor: colors.critical,
    position: 'absolute',
    left: 0,
  },
  alertContent: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
  },
  alertTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  iconMargin: {
    marginRight: spacing.xs,
  },
  alertMainText: {
    ...typography.captionBold,
    color: '#2d1515',
    flex: 1,
  },
  alertTimeText: {
    ...typography.small,
    color: colors.critical,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  alertDetailText: {
    ...typography.small,
    color: '#5d5e63',
    marginTop: spacing.xs,
  },
  verButton: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: br.round,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe3e3',
    ...shadows.light,
  },
  verButtonText: {
    ...typography.small,
    color: colors.critical,
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  emptyText: {
    ...typography.body,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});