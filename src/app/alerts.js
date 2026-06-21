import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, ChevronRight, Bell } from 'lucide-react-native';

export default function AlertsScreen() {
  // Simulación de datos de alertas críticas de Starlex
  const alertsList = [
    { id: 1, title: 'Recurso Apelación #8831', time: '48h restantes', detail: 'Juzgado 14 Civil • Rad. 2023-00452' },
    { id: 2, title: 'Término de Traslado Vence', time: '3 días restantes', detail: 'Tribunal Superior • Rad. 2022-01990' },
    { id: 3, title: 'Audiencia de Pruebas', time: 'Próximo Lunes', detail: 'Juzgado 05 Penal • Rad. 2024-00112' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* HEADER DE LA PANTALLA */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleRow}>
          <Bell color="#a81c1c" size={24} style={styles.bellIcon} />
          <Text style={styles.headerTitle}>Alertas del Sistema</Text>
        </View>
        <Text style={styles.headerSubtitle}>Revisa los términos judiciales críticos</Text>
      </View>

      {/* LISTADO DE ALERTAS */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{alertsList.length} ACCIONES REQUERIDAS</Text>
        
        {alertsList.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertIndicator} />
            <View style={styles.alertContent}>
              <View style={styles.alertTextRow}>
                <AlertTriangle color="#a81c1c" size={18} style={styles.iconMargin} />
                <Text style={styles.alertMainText}>{alert.title}</Text>
              </View>
              <Text style={styles.alertTimeText}>{alert.time}</Text>
              <Text style={styles.alertDetailText}>{alert.detail}</Text>
            </View>
            <TouchableOpacity style={styles.verButton}>
              <Text style={styles.verButtonText}>Gestionar</Text>
              <ChevronRight color="#a81c1c" size={14} />
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
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 15,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a2b4c',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 4,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a81c1c',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#ffe3e3',
    borderRadius: 14,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 14,
    overflow: 'hidden',
  },
  alertIndicator: {
    width: 5,
    height: '100%',
    backgroundColor: '#a81c1c',
    position: 'absolute',
    left: 0,
  },
  alertContent: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 8,
  },
  alertTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  iconMargin: {
    marginRight: 6,
  },
  alertMainText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d1515',
    flex: 1,
  },
  alertTimeText: {
    fontSize: 12,
    color: '#a81c1c',
    fontWeight: '700',
    marginTop: 2,
  },
  alertDetailText: {
    fontSize: 13,
    color: '#5d5e63',
    marginTop: 4,
  },
  verButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe3e3',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  verButtonText: {
    color: '#a81c1c',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 2,
  },
});