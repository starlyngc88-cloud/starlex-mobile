import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, ChevronRight } from 'lucide-react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* SECCIÓN SUPERIOR: ENCABEZADO CON PERFIL FLOTANTE */}
      <View style={styles.headerContainer}>
        {/* Foto de perfil cliqueable en la esquina superior derecha */}
        <TouchableOpacity 
          style={styles.profileHeaderButton}
          onPress={() => console.log('Ir al perfil del usuario')}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150' }} // Imagen ejemplo del Dr.
            style={styles.profileHeaderImage} 
          />
        </TouchableOpacity>

        {/* Logo Central de la Justicia */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=200' }} 
          style={styles.avatarLogo} 
        />
        <Text style={styles.logoText}>STARLEX</Text>
        
        {/* LÍNEA TRICOLOR (Amarillo, Azul y Rojo) */}
        <View style={styles.tricolorContainer}>
          <View style={[styles.colorLine, { backgroundColor: '#f1c40f' }]} />
          <View style={[styles.colorLine, { backgroundColor: '#003dc7' }]} />
          <View style={[styles.colorLine, { backgroundColor: '#c0392b' }]} />
        </View>
      </View>

      {/* SECCIÓN CENTRAL: CONTENIDO PRINCIPAL */}
      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Hola, Dr. Alejandro</Text>

        {/* PRÓXIMA CITA */}
        <View style={styles.sectionSection}>
          <Text style={styles.sectionLabel}>PRÓXIMA</Text>
          <Text style={styles.mainInfo}>10:00 AM — Juzgado 14</Text>
          <Text style={styles.subInfo}>Rad. 2023-00452 • Rivera</Text>
        </View>

        <View style={styles.divider} />

        {/* PENDIENTE FINANCIERO */}
        <View style={styles.sectionSection}>
          <Text style={styles.sectionLabel}>PENDIENTE</Text>
          <Text style={styles.moneyInfo}>$12.5M</Text>
        </View>
      </View>

      {/* SECCIÓN INFERIOR: ALERTAS CRÍTICAS */}
      <View style={styles.bottomContent}>
        <View style={styles.alertsContainer}>
          <Text style={styles.alertsTitle}>2 ALERTAS CRÍTICAS</Text>
          
          <View style={styles.alertCard}>
            <View style={styles.alertLeft}>
              <AlertTriangle color="#a81c1c" size={22} style={styles.alertIcon} />
              <View>
                <Text style={styles.alertMainText}>Recurso Apelación #8831</Text>
                <Text style={styles.alertSubText}>48h restantes</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.verButton}>
              <Text style={styles.verButtonText}>Ver</Text>
              <ChevronRight color="#a81c1c" size={14} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
    position: 'relative',
  },
  profileHeaderButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  },
  profileHeaderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avatarLogo: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 6,
    color: '#1a2b4c',
  },
  tricolorContainer: {
    flexDirection: 'row',
    width: 120,
    height: 3,
    marginTop: 8,
  },
  colorLine: {
    flex: 1, // Divide de forma exactamente proporcional los 3 colores
    height: '100%',
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 20,
  },
  sectionSection: {
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5d5e63',
    letterSpacing: 2,
    marginBottom: 4,
  },
  mainInfo: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 2,
  },
  subInfo: {
    fontSize: 13,
    color: '#71717a',
  },
  divider: {
    width: '30%',
    height: 1,
    backgroundColor: 'rgba(195, 197, 217, 0.3)',
    marginVertical: 10,
  },
  moneyInfo: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111111',
  },
  bottomContent: {
    width: '100%',
    marginBottom: 25,
  },
  alertsContainer: {
    width: '100%',
  },
  alertsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a81c1c',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#ffe3e3',
    borderRadius: 14,
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  alertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertIcon: {
    marginRight: 10,
  },
  alertMainText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d1515',
  },
  alertSubText: {
    fontSize: 12,
    color: '#a81c1c',
    fontWeight: '500',
    marginTop: 1,
  },
  verButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe3e3',
  },
  verButtonText: {
    color: '#a81c1c',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 2,
  },
});