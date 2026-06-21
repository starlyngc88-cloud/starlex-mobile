import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, ChevronRight, Calendar, Users, DollarSign, Settings } from 'lucide-react-native'; // 👈 Importados todos los iconos del sistema para evitar errores
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* HEADER SUPERIOR FIJO: Nunca baja y se alinea perfectamente a la derecha */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.profileHeaderButton}
          onPress={() => console.log('Ir al perfil del usuario')}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150' }} 
            style={styles.profileHeaderImage} 
          />
        </TouchableOpacity>
      </View>

      {/* CONTENEDOR CENTRAL: Todo el contenido agrupado de forma compacta */}
      <View style={styles.centerColumnContent}>
        
        {/* LOGO CENTRALIZADO Y GRANDE (Tus proporciones intactas) */}
        <Image 
          source={require('../assets/logo_starlex.png')} 
          style={styles.avatarLogo} 
        />

        {/* NOMBRE DE LA MARCA E INSTITUCIONAL */}
        <View style={styles.brandContainer}>
          <Text style={styles.logoText}>STARLEX</Text>
          <View style={styles.tricolorContainer}>
            <View style={[styles.colorLine, { backgroundColor: '#f1c40f' }]} />
            <View style={[styles.colorLine, { backgroundColor: '#003dc7' }]} />
            <View style={[styles.colorLine, { backgroundColor: '#c0392b' }]} />
          </View>
        </View>

        {/* SALUDO DE BIENVENIDA */}
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

        {/* ALERTAS CRÍTICAS */}
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
            <TouchableOpacity 
              style={styles.verButton}
              onPress={() => router.push('/alerts')}
            >
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
    paddingHorizontal: 24,
  },
  headerContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 5,
  },
  profileHeaderButton: {
    height: 42,
    width: 42,
  },
  profileHeaderImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  centerColumnContent: {
    flex: 1,
    alignItems: 'center',       
    justifyContent: 'center',    
    width: '100%',
    marginTop: -30,
  },
  avatarLogo: {
    width: 350,                 // 👈 Restaurado exactamente a como te gusta
    height: 220,            
    resizeMode: 'contain',  
    marginBottom: 5,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '300',
    letterSpacing: 6,
    color: '#1a2b4c',
  },
  tricolorContainer: {
    flexDirection: 'row',
    width: 150,
    height: 3,
    marginTop: 4,
  },
  colorLine: {
    flex: 1,
    height: '100%',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionSection: {
    alignItems: 'center',
    marginVertical: 2,
    width: '100%',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5d5e63',
    letterSpacing: 2,
    marginBottom: 2,
  },
  mainInfo: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111111',
  },
  subInfo: {
    fontSize: 13,
    color: '#71717a',
  },
  divider: {
    width: '25%',
    height: 1,
    backgroundColor: 'rgba(195, 197, 217, 0.3)',
    marginVertical: 6,
  },
  moneyInfo: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111111',
  },
  alertsContainer: {
    width: '100%',
    marginTop: 18,
  },
  alertsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a81c1c',
    letterSpacing: 1.5,
    marginBottom: 6,
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