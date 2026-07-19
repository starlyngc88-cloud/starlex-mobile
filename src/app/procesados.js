import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, User, BadgeIcon as Id, Briefcase } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, spacing, typography, shadows, borderRadius as br } from '../theme';
import { procesadosService } from '../../app/services';
import { useRouter } from 'expo-router';

function getEstadoStyle(estado) {
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

export default function ProcesadosScreen() {
  const router = useRouter();
  const [procesados, setProcesados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const loadProcesados = async () => {
    setLoading(true);
    const res = await procesadosService.getProcesados();
    if (res.success) {
      setProcesados(res.data);
      setError(null);
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadProcesados();
    }, [])
  );

  const filtered = procesados.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.nombre.toLowerCase().includes(q) ||
      p.apellido.toLowerCase().includes(q) ||
      p.cedula.includes(q);
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {item.nombre[0]}{item.apellido[0]}
          </Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardNombre}>{item.nombre} {item.apellido}</Text>
          <View style={styles.cardMeta}>
            <Id color={colors.secondary} size={12} />
            <Text style={styles.cardCedula}>{item.cedula}</Text>
          </View>
        </View>
        <View style={[styles.estadoBadge, getEstadoStyle(item.estado)]}>
          <Text style={styles.estadoText}>{item.estado?.toUpperCase()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.topSection}>
        <Text style={styles.screenTitle}>PROCESADOS</Text>
        <Text style={styles.screenSubtitle}>{filtered.length} registros</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color={colors.secondary} size={18} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o cédula"
          placeholderTextColor={colors.text.tertiary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadProcesados}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>
                {search.trim() ? 'Sin resultados' : 'No hay procesados registrados'}
              </Text>
            </View>
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => router.push('/nuevo-procesado')}
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
  topSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  screenTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  screenSubtitle: {
    ...typography.caption,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: br.medium,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text.primary,
    paddingVertical: spacing.sm + 2,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: br.large,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  cardInfo: {
    flex: 1,
  },
  cardNombre: {
    ...typography.body,
    color: colors.text.primary,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  cardCedula: {
    ...typography.caption,
    color: colors.secondary,
  },
  estadoBadge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: br.round,
  },
  estadoText: {
    ...typography.label,
    color: colors.text.inverse,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: br.medium,
  },
  retryText: {
    ...typography.bodyBold,
    color: colors.text.inverse,
  },
  emptyText: {
    ...typography.body,
    color: colors.secondary,
    textAlign: 'center',
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
