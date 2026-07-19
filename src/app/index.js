import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, ChevronRight, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, shadows, borderRadius as br } from '../theme';
import { audienciasService, finanzasService, authService } from '../../app/services';
import { useAuth } from '../../app/hooks/useAuth';

function formatCurrency(amount) {
  return '$' + (amount / 1000000).toFixed(1).replace('.0', '') + 'M';
}

function getNextHearing(audiencias) {
  if (audiencias.length === 0) return null;
  return audiencias.sort((a, b) => new Date(a.fecha + 'T' + a.hora).getTime() - new Date(b.fecha + 'T' + b.hora).getTime())[0];
}

export default function Home() {
  const router = useRouter();
  const { signOut, session } = useAuth();
  const [nextHearing, setNextHearing] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [alertCount, setAlertCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [audienciasRes, finanzasRes] = await Promise.all([
        audienciasService.getAudienciasPendientes(),
        finanzasService.getAllFinanzas(),
      ]);

      if (audienciasRes.success) {
        setNextHearing(getNextHearing(audienciasRes.data));
      }
      if (finanzasRes.success) {
        const pending = finanzasRes.data
          .filter((f) => f.estado === 'pendiente')
          .reduce((sum, f) => sum + f.monto, 0);
        setPendingAmount(pending);
      }
      setAlertCount(audienciasRes.success ? audienciasRes.data.length : 0);

      if (session?.user?.id) {
        const profileRes = await authService.getProfile(session.user.id);
        if (profileRes.success && profileRes.data) {
          setUserName(profileRes.data.nombre);
        } else if (session?.user?.email) {
          setUserName(session.user.email.split('@')[0]);
        }
      }

      setLoading(false);
    };
    loadData();
  }, [session]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.profileHeaderButton}
          onPress={() => setMenuVisible(true)}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150' }}
            style={styles.profileHeaderImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.centerColumnContent}>
        <Image
          source={require('../assets/logo_starlex.png')}
          style={styles.avatarLogo}
        />

        <View style={styles.brandContainer}>
          <Text style={styles.logoText}>STARLEX</Text>
        </View>

        <Text style={styles.welcomeText}>Hola, Dr. {userName || '...'}</Text>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.lg }} />
        ) : (
          <>
            <View style={styles.sectionSection}>
              <Text style={styles.sectionLabel}>PRÓXIMA</Text>
              {nextHearing ? (
                <>
                  <Text style={styles.mainInfo}>{nextHearing.hora} — {nextHearing.juzgado}</Text>
                  <Text style={styles.subInfo}>Rad. {nextHearing.radicado}</Text>
                </>
              ) : (
                <Text style={styles.subInfo}>Sin audiencias pendientes</Text>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.sectionSection}>
              <Text style={styles.sectionLabel}>PENDIENTE</Text>
              <Text style={styles.moneyInfo}>
                {pendingAmount > 0 ? formatCurrency(pendingAmount) : '$0'}
              </Text>
            </View>

            {alertCount > 0 && (
              <View style={styles.alertsContainer}>
                <Text style={styles.alertsTitle}>{alertCount} {alertCount === 1 ? 'ALERTA CRÍTICA' : 'ALERTAS CRÍTICAS'}</Text>
                <View style={styles.alertCard}>
                  <View style={styles.alertLeft}>
                    <AlertTriangle color={colors.critical} size={22} style={styles.alertIcon} />
                    <View>
                      <Text style={styles.alertMainText}>{alertCount} audiencia{alertCount !== 1 ? 's' : ''} pendiente{alertCount !== 1 ? 's' : ''}</Text>
                      <Text style={styles.alertSubText}>Revisa el calendario</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.verButton}
                    onPress={() => router.push('/alerts')}
                  >
                    <Text style={styles.verButtonText}>Ver</Text>
                    <ChevronRight color={colors.critical} size={14} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}
      </View>
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={async () => {
                setMenuVisible(false);
                await signOut();
              }}
            >
              <LogOut color={colors.error} size={18} />
              <Text style={styles.menuItemText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: spacing.xs,
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
    borderColor: colors.border,
  },
  centerColumnContent: {
    flex: 1,
    alignItems: 'center',       
    justifyContent: 'center',    
    width: '100%',
    marginTop: -30,
  },
  avatarLogo: {
    width: 350,
    height: 220,
    resizeMode: 'contain',
    marginBottom: spacing.sm,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    ...typography.h2,
    letterSpacing: 6,
    color: '#1a2b4c',
  },
  welcomeText: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  sectionSection: {
    alignItems: 'center',
    marginVertical: spacing.xs,
    width: '100%',
  },
  sectionLabel: {
    ...typography.label,
    color: colors.secondary,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  mainInfo: {
    ...typography.h3,
    color: colors.text.primary,
  },
  subInfo: {
    ...typography.body,
    color: colors.secondary,
  },
  divider: {
    width: '25%',
    height: 1,
    backgroundColor: 'rgba(195, 197, 217, 0.3)',
    marginVertical: spacing.md,
  },
  moneyInfo: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.text.primary,
  },
  alertsContainer: {
    width: '100%',
    marginTop: spacing.lg,
  },
  alertsTitle: {
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
    padding: spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertIcon: {
    marginRight: spacing.md,
  },
  alertMainText: {
    ...typography.captionBold,
    color: '#2d1515',
  },
  alertSubText: {
    ...typography.small,
    color: colors.critical,
    marginTop: spacing.xs,
  },
  verButton: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: br.round,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe3e3',
  },
  verButtonText: {
    ...typography.captionBold,
    color: colors.critical,
    marginRight: spacing.xs,
  },
  menuOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menuContainer: {
    marginTop: 80,
    marginRight: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: br.medium,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.medium,
    minWidth: 180,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  menuItemText: {
    ...typography.body,
    color: colors.error,
    marginLeft: spacing.sm,
  },
});