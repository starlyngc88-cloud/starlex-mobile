import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, FileText } from 'lucide-react-native';

export default function CalendarioScreen() {
  const [selectedDay, setSelectedDay] = useState(23); // Lunes 23 por defecto

  // Días de la semana para la cuadrícula superior (Mayo 2026 / diseño Starlex)
  const daysOfWeek = [
    { dayName: 'DOM', dayNum: 22, hasEvent: false },
    { dayName: 'LUN', dayNum: 23, hasEvent: true },
    { dayName: 'MAR', dayNum: 24, hasEvent: true },
    { dayName: 'MIÉ', dayNum: 25, hasEvent: false },
    { dayName: 'JUE', dayNum: 26, hasEvent: true },
    { dayName: 'VIE', dayNum: 27, hasEvent: false },
    { dayName: 'SÁB', dayNum: 28, hasEvent: false },
  ];

  // Eventos filtrados para el día seleccionado
  const agendaEvents = [
    {
      id: 1,
      time: '09:00 AM',
      title: 'Audiencia de Pruebas y Alegatos',
      court: 'Juzgado 14 Civil Municipal',
      rad: 'Rad. 2023-00452',
      client: 'Rivera & Asociados',
      type: 'Crítico',
    },
    {
      id: 2,
      time: '11:30 AM',
      title: 'Audiencia de Conciliación Extrajudicial',
      court: 'Centro de Arbitraje y Conciliación',
      rad: 'Rad. 2024-00112',
      client: 'Carlos Mendoza',
      type: 'Normal',
    },
    {
      id: 3,
      time: '03:00 PM',
      title: 'Revisión Extraordinaria de Términos',
      court: 'Tribunal Superior de Distrito',
      rad: 'Rad. 2022-01990',
      client: 'Banco Nacional',
      type: 'Normal',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* HILO NACIONAL TRICOLOR INSTITUTIONAL */}
      <View style={styles.nationalThread}>
        <View style={[styles.threadLine, { flex: 2, backgroundColor: '#f1c40f' }]} />
        <View style={[styles.threadLine, { flex: 1, backgroundColor: '#003dc7' }]} />
        <View style={[styles.threadLine, { flex: 1, backgroundColor: '#c0392b' }]} />
      </View>

      {/* HEADER CON CONTROL DE MES */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>Calendario</Text>
          <Text style={styles.headerSubtitle}>Gestión de términos y audiencias</Text>
        </View>
        <View style={styles.monthSelector}>
          <TouchableOpacity style={styles.arrowButton}>
            <ChevronLeft color="#5d5e63" size={18} />
          </TouchableOpacity>
          <Text style={styles.monthText}>Mayo 2026</Text>
          <TouchableOpacity style={styles.arrowButton}>
            <ChevronRight color="#5d5e63" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CUADRÍCULA DE DÍAS (WIDGET DE LA PLANTILLA ORIGINAL) */}
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
              {/* Indicador de evento puntual bajo el número */}
              {item.hasEvent && (
                <View style={[styles.eventDot, isSelected && styles.eventDotSelected]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LISTADO DE COMPROMISOS JUDICIALES */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>AUDIENCIAS PARA HOY</Text>

        {agendaEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            
            {/* Fila superior: Hora y etiqueta de tipo */}
            <View style={styles.cardHeader}>
              <View style={styles.metaRow}>
                <Clock color="#003dc7" size={14} style={styles.metaIcon} />
                <Text style={styles.timeText}>{event.time}</Text>
              </View>
              <View style={[styles.statusBadge, event.type === 'Crítico' ? styles.badgeError : styles.badgeInfo]}>
                <Text style={[styles.statusBadgeText, event.type === 'Crítico' ? styles.textError : styles.textInfo]}>
                  {event.type}
                </Text>
              </View>
            </View>

            {/* Título de la audiencia */}
            <Text style={styles.eventTitle}>{event.title}</Text>

            {/* Detalles del despacho */}
            <View style={styles.detailsContainer}>
              <View style={styles.metaRow}>
                <MapPin color="#71717a" size={13} style={styles.metaIcon} />
                <Text style={styles.detailText}>{event.court}</Text>
              </View>
              
              <View style={styles.subDetailRow}>
                <View style={styles.metaRow}>
                  <FileText color="#71717a" size={13} style={styles.metaIcon} />
                  <Text style={styles.codeText}>{event.rad}</Text>
                </View>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.clientText}>{event.client}</Text>
              </View>
            </View>

          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  nationalThread: {
    flexDirection: 'row',
    width: '100%',
    height: 3,
  },
  threadLine: {
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 18,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1b1b1d',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#5d5e63',
    marginTop: 2,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f3f5',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#eae7ea',
  },
  arrowButton: {
    padding: 6,
  },
  monthText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1b1b1d',
    paddingHorizontal: 8,
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  dayCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 3,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eae7ea',
  },
  dayCardSelected: {
    backgroundColor: '#003dc7',
    borderColor: '#003dc7',
    shadowColor: '#003dc7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  dayNameText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#5d5e63',
    letterSpacing: 0.5,
  },
  dayNameTextSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dayNumText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1b1b1d',
    marginTop: 4,
  },
  dayNumTextSelected: {
    color: '#ffffff',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#003dc7',
    marginTop: 4,
  },
  eventDotSelected: {
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5d5e63',
    letterSpacing: 1.5,
    marginBottom: 14,
    marginTop: 4,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eae7ea',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#003dc7',
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeError: {
    backgroundColor: '#fff5f5',
  },
  badgeInfo: {
    backgroundColor: '#f0edef',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  textError: {
    color: '#c0392b',
  },
  textInfo: {
    color: '#5d5e63',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b1b1d',
    lineHeight: 22,
    marginBottom: 12,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0edef',
    paddingTop: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaIcon: {
    marginRight: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#434656',
  },
  codeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#737688',
  },
  bullet: {
    marginHorizontal: 6,
    color: '#c3c5d9',
  },
  clientText: {
    fontSize: 12,
    color: '#737688',
  },
});