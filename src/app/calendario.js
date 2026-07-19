import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, FileText, Plus } from 'lucide-react-native';
import { colors, spacing, typography, shadows, borderRadius as br } from '../theme';
import { audienciasService } from '../../app/services';
import { useRouter } from 'expo-router';

export default function CalendarioScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [audiencias, setAudiencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await audienciasService.getAudienciasPendientes();
      if (res.success) {
        setAudiencias(res.data);
      }
      setLoading(false);
    };
    load();
  }, []);

  const daysOfWeek = [
    { dayName: 'DOM', dayNum: 20, hasEvent: false },
    { dayName: 'LUN', dayNum: 21, hasEvent: false },
    { dayName: 'MAR', dayNum: 22, hasEvent: false },
    { dayName: 'MIÉ', dayNum: 23, hasEvent: false },
    { dayName: 'JUE', dayNum: 24, hasEvent: false },
    { dayName: 'VIE', dayNum: 25, hasEvent: false },
    { dayName: 'SÁB', dayNum: 26, hasEvent: false },
  ];

  const agendaEvents = audiencias.map((a) => ({
    id: a.id,
    time: a.hora,
    title: a.titulo,
    court: a.juzgado,
    rad: 'Rad. ' + a.radicado,
    client: '',
    type: a.estado === 'pendiente' ? 'Normal' : 'Crítico',
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* HEADER CON CONTROL DE MES */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>Calendario</Text>
          <Text style={styles.headerSubtitle}>Gestión de términos y audiencias</Text>
        </View>
        <View style={styles.monthSelector}>
          <TouchableOpacity style={styles.arrowButton}>
            <ChevronLeft color={colors.secondary} size={18} />
          </TouchableOpacity>
          <Text style={styles.monthText}>Mayo 2026</Text>
          <TouchableOpacity style={styles.arrowButton}>
            <ChevronRight color={colors.secondary} size={18} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CUADRÍCULA DE DÍAS */}
      <View style={styles.calendarStrip}>
        {daysOfWeek.map((item) => {
          const isSelected = item.dayNum === selectedDay;
          return (
            <TouchableOpacity
              key={item.dayNum}
              style={[styles.dayCard, isSelected && styles.dayCardSelected]}
              onPress={() => setSelectedDay(item.dayNum)}
            >
              <Text style={[styles.dayNameText, isSelected && styles.dayNameTextSelected]}>
                {item.dayName}
              </Text>
              <Text style={[styles.dayNumText, isSelected && styles.dayNumTextSelected]}>
                {item.dayNum}
              </Text>
              {item.hasEvent && (
                <View style={[styles.eventDot, isSelected && styles.eventDotSelected]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LISTADO DE COMPROMISOS JUDICIALES */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>AUDIENCIAS PENDIENTES</Text>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.xl }} />
        ) : agendaEvents.length === 0 ? (
          <Text style={styles.emptyText}>No hay audiencias pendientes</Text>
        ) : agendaEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            
            <View style={styles.cardHeader}>
              <View style={styles.metaRow}>
                <Clock color={colors.primary} size={14} style={styles.metaIcon} />
                <Text style={styles.timeText}>{event.time}</Text>
              </View>
              <View style={[styles.statusBadge, event.type === 'Crítico' ? styles.badgeError : styles.badgeInfo]}>
                <Text style={[styles.statusBadgeText, event.type === 'Crítico' ? styles.textError : styles.textInfo]}>
                  {event.type}
                </Text>
              </View>
            </View>

            <Text style={styles.eventTitle}>{event.title}</Text>

            <View style={styles.detailsContainer}>
              <View style={styles.metaRow}>
                <MapPin color={colors.secondary} size={13} style={styles.metaIcon} />
                <Text style={styles.detailText}>{event.court}</Text>
              </View>
              
              <View style={styles.subDetailRow}>
                <View style={styles.metaRow}>
                  <FileText color={colors.secondary} size={13} style={styles.metaIcon} />
                  <Text style={styles.codeText}>{event.rad}</Text>
                </View>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.clientText}>{event.client}</Text>
              </View>
            </View>

          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => router.push('/nuevo-evento')}
      >
        <Plus color={colors.text.inverse} size={26} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
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
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: br.small,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  arrowButton: {
    padding: spacing.sm,
  },
  monthText: {
    ...typography.captionBold,
    color: colors.text.primary,
    paddingHorizontal: spacing.md,
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  dayCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginHorizontal: spacing.xs,
    borderRadius: br.small,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.medium,
  },
  dayNameText: {
    ...typography.small,
    color: colors.secondary,
    letterSpacing: 0.5,
  },
  dayNameTextSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dayNumText: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  dayNumTextSelected: {
    color: colors.background,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
  eventDotSelected: {
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.secondary,
    letterSpacing: 1.5,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  eventCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: br.large,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  timeText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  statusBadge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: br.round,
  },
  badgeError: {
    backgroundColor: '#fff5f5',
  },
  badgeInfo: {
    backgroundColor: colors.surface,
  },
  statusBadgeText: {
    ...typography.small,
  },
  textError: {
    color: colors.juicio,
  },
  textInfo: {
    color: colors.secondary,
  },
  eventTitle: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    paddingTop: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  metaIcon: {
    marginRight: spacing.sm,
  },
  detailText: {
    ...typography.caption,
    color: '#434656',
  },
  codeText: {
    ...typography.small,
    color: '#737688',
  },
  bullet: {
    marginHorizontal: spacing.md,
    color: colors.border,
  },
  clientText: {
    ...typography.small,
    color: '#737688',
  },
  emptyText: {
    ...typography.body,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.heavy,
  },
});