import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, shadows, borderRadius as br } from '../theme';
import { procesadosService } from '../../app/services';

const ESTADOS = [
  { value: 'indagacion', label: 'Indagación' },
  { value: 'imputado', label: 'Imputado' },
  { value: 'juicio', label: 'Juicio' },
  { value: 'sentencia', label: 'Sentencia' },
];

export default function NuevoProcesadoScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState('indagacion');
  const [fechaInicio, setFechaInicio] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showEstados, setShowEstados] = useState(false);

  const handleSave = async () => {
    setError(null);

    if (!nombre.trim()) { setError('El nombre es obligatorio'); return; }
    if (!apellido.trim()) { setError('El apellido es obligatorio'); return; }
    if (!cedula.trim()) { setError('La cédula es obligatoria'); return; }

    setSaving(true);

    const res = await procesadosService.createProcesado({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      cedula: cedula.trim(),
      email: email.trim() || undefined,
      telefono: telefono.trim() || undefined,
      estado,
      fecha_inicio: fechaInicio.trim() || undefined,
      observaciones: observaciones.trim() || undefined,
    });

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
        <Text style={styles.topTitle}>NUEVO PROCESADO</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfInput]}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor={colors.text.tertiary}
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View style={[styles.inputGroup, styles.halfInput]}>
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor={colors.text.tertiary}
              value={apellido}
              onChangeText={setApellido}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cédula</Text>
          <TextInput
            style={styles.input}
            placeholder="N° de cédula"
            placeholderTextColor={colors.text.tertiary}
            value={cedula}
            onChangeText={setCedula}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Estado legal</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setShowEstados(true)}
          >
            <Text style={styles.selectorText}>
              {ESTADOS.find(e => e.value === estado)?.label}
            </Text>
            <ChevronDown color={colors.secondary} size={18} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@ejemplo.com"
            placeholderTextColor={colors.text.tertiary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="N° de teléfono"
            placeholderTextColor={colors.text.tertiary}
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fecha de inicio</Text>
          <TextInput
            style={styles.input}
            placeholder="2026-07-20"
            placeholderTextColor={colors.text.tertiary}
            value={fechaInicio}
            onChangeText={setFechaInicio}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observaciones</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Notas adicionales..."
            placeholderTextColor={colors.text.tertiary}
            value={observaciones}
            onChangeText={setObservaciones}
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

      <Modal visible={showEstados} transparent animationType="fade" onRequestClose={() => setShowEstados(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowEstados(false)}>
          <View style={styles.modalContainer}>
            {ESTADOS.map((e) => (
              <TouchableOpacity
                key={e.value}
                style={[styles.estadoItem, estado === e.value && styles.estadoItemActive]}
                onPress={() => {
                  setEstado(e.value);
                  setShowEstados(false);
                }}
              >
                <Text style={[styles.estadoItemText, estado === e.value && styles.estadoItemTextActive]}>
                  {e.label}
                </Text>
              </TouchableOpacity>
            ))}
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
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  halfInput: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderRadius: br.large,
    width: '75%',
    paddingVertical: spacing.sm,
    ...shadows.heavy,
  },
  estadoItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  estadoItemActive: {
    backgroundColor: colors.surface,
  },
  estadoItemText: {
    ...typography.body,
    color: colors.text.primary,
  },
  estadoItemTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
