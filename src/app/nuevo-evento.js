import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Search } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, shadows, borderRadius as br } from '../theme';
import { procesadosService, audienciasService } from '../../app/services';

export default function NuevaAudienciaScreen() {
  const router = useRouter();
  const [tipo, setTipo] = useState('audiencia');
  const [procesadoId, setProcesadoId] = useState(null);
  const [procesadoNombre, setProcesadoNombre] = useState('');
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [juzgado, setJuzgado] = useState('');
  const [radicado, setRadicado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [saving, setSaving] = useState(false);

  const [procesados, setProcesados] = useState([]);
  const [showProcesados, setShowProcesados] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const res = await procesadosService.getProcesados();
        if (res.success) setProcesados(res.data);
      };
      load();
    }, [])
  );

  const filteredProcesados = procesados.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.nombre.toLowerCase().includes(q) || p.apellido.toLowerCase().includes(q) || p.cedula.includes(q);
  });

  const handleSave = async () => {
    setError(null);

    if (!titulo.trim()) {
      setError('El título es obligatorio');
      return;
    }
    if (!fecha.trim()) {
      setError('La fecha es obligatoria');
      return;
    }
    if (!hora.trim()) {
      setError('La hora es obligatoria');
      return;
    }
    if (tipo === 'audiencia' && !procesadoId) {
      setError('Selecciona un procesado');
      return;
    }

    setSaving(true);

    const payload = {
      procesado_id: tipo === 'audiencia' ? procesadoId : null,
      titulo: titulo.trim(),
      descripcion: descripcion.trim() || null,
      fecha: fecha.trim(),
      hora: hora.trim(),
      juzgado: tipo === 'audiencia' ? juzgado.trim() : 'Reunión general',
      radicado: tipo === 'audiencia' ? radicado.trim() : '0000-000',
      tipo_audiencia: tipo === 'audiencia' ? 'audiencia' : 'reunion',
      estado: 'pendiente',
    };

    const res = await audienciasService.createAudiencia(payload);
    setSaving(false);

    if (res.success) {
      router.back();
    } else {
      setError(res.error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={colors.primary} size={22} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>NUEVO EVENTO</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[styles.segment, tipo === 'audiencia' && styles.segmentActive]}
            onPress={() => setTipo('audiencia')}
          >
            <Text style={[styles.segmentText, tipo === 'audiencia' && styles.segmentTextActive]}>
              Audiencia judicial
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segment, tipo === 'reunion' && styles.segmentActive]}
            onPress={() => setTipo('reunion')}
          >
            <Text style={[styles.segmentText, tipo === 'reunion' && styles.segmentTextActive]}>
              Reunión general
            </Text>
          </TouchableOpacity>
        </View>

        {tipo === 'audiencia' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Procesado</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowProcesados(true)}
            >
              <Text style={procesadoNombre ? styles.selectorText : styles.selectorPlaceholder}>
                {procesadoNombre || 'Seleccionar procesado'}
              </Text>
              <Search color={colors.secondary} size={18} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Audiencia de imputación de cargos"
            placeholderTextColor={colors.text.tertiary}
            value={titulo}
            onChangeText={setTitulo}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfInput]}>
            <Text style={styles.label}>Fecha</Text>
            <TextInput
              style={styles.input}
              placeholder="2026-07-20"
              placeholderTextColor={colors.text.tertiary}
              value={fecha}
              onChangeText={setFecha}
            />
          </View>
          <View style={[styles.inputGroup, styles.halfInput]}>
            <Text style={styles.label}>Hora</Text>
            <TextInput
              style={styles.input}
              placeholder="10:00"
              placeholderTextColor={colors.text.tertiary}
              value={hora}
              onChangeText={setHora}
            />
          </View>
        </View>

        {tipo === 'audiencia' && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Juzgado</Text>
              <TextInput
                style={styles.input}
                placeholder="Juzgado 14 Penal Municipal"
                placeholderTextColor={colors.text.tertiary}
                value={juzgado}
                onChangeText={setJuzgado}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Radicado</Text>
              <TextInput
                style={styles.input}
                placeholder="2023-00452"
                placeholderTextColor={colors.text.tertiary}
                value={radicado}
                onChangeText={setRadicado}
              />
            </View>
          </>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Notas adicionales..."
            placeholderTextColor={colors.text.tertiary}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={3}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.85}
        >
          {saving ? (
            <ActivityIndicator color={colors.text.inverse} />
          ) : (
            <Text style={styles.saveButtonText}>GUARDAR</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showProcesados} transparent animationType="slide" onRequestClose={() => setShowProcesados(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar procesado</Text>
              <TouchableOpacity onPress={() => setShowProcesados(false)}>
                <Text style={styles.modalClose}>Cerrar</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre o cédula"
              placeholderTextColor={colors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <FlatList
              data={filteredProcesados}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.procesadoItem}
                  onPress={() => {
                    setProcesadoId(item.id);
                    setProcesadoNombre(`${item.nombre} ${item.apellido}`);
                    setShowProcesados(false);
                    setSearchQuery('');
                  }}
                >
                  <Text style={styles.procesadoNombre}>{item.nombre} {item.apellido}</Text>
                  <Text style={styles.procesadoCedula}>{item.cedula}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.emptyModalText}>Sin resultados</Text>}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: br.medium,
    padding: spacing.xs,
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: br.small,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: colors.background,
    ...shadows.light,
  },
  segmentText: {
    ...typography.captionBold,
    color: colors.text.secondary,
  },
  segmentTextActive: {
    color: colors.primary,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.captionBold,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: br.medium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.body,
    color: colors.text.primary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: br.medium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  selectorText: {
    ...typography.body,
    color: colors.text.primary,
  },
  selectorPlaceholder: {
    ...typography.body,
    color: colors.text.tertiary,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: br.medium,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    ...typography.bodyBold,
    color: colors.text.inverse,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: br.large,
    borderTopRightRadius: br.large,
    maxHeight: '70%',
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  modalClose: {
    ...typography.bodyBold,
    color: colors.info,
  },
  searchInput: {
    margin: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: br.medium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.text.primary,
  },
  procesadoItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  procesadoNombre: {
    ...typography.body,
    color: colors.text.primary,
  },
  procesadoCedula: {
    ...typography.caption,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  emptyModalText: {
    ...typography.body,
    color: colors.secondary,
    textAlign: 'center',
    padding: spacing.lg,
  },
});
