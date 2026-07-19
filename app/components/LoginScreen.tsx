// components/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { useAuth } from '../hooks/useAuth';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, loading, error, clearError } = useAuth();

  const handleSubmit = async () => {
    if (isSignUp) {
      await signUp({ email, password, nombre, apellido });
    } else {
      await signIn({ email, password });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Image
              source={require('../../src/assets/logo_starlex.png')}
              style={styles.logoImage}
            />

            <View style={styles.brandContainer}>
              <Text style={styles.logoText}>STARLEX</Text>
              <View style={styles.tricolorContainer}>
                <View style={[styles.colorLine, { backgroundColor: colors.tricolor.yellow }]} />
                <View style={[styles.colorLine, { backgroundColor: colors.tricolor.blue }]} />
                <View style={[styles.colorLine, { backgroundColor: colors.tricolor.red }]} />
              </View>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formTitle}>
                {isSignUp ? 'CREAR CUENTA' : 'INICIAR SESIÓN'}
              </Text>

              {isSignUp && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombres</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Tus nombres"
                      placeholderTextColor={colors.text.tertiary}
                      value={nombre}
                      onChangeText={setNombre}
                      autoCapitalize="words"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Apellidos</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Tus apellidos"
                      placeholderTextColor={colors.text.tertiary}
                      value={apellido}
                      onChangeText={setApellido}
                      autoCapitalize="words"
                    />
                  </View>
                </>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  style={styles.input}
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor={colors.text.tertiary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={colors.text.tertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color={colors.text.inverse} />
                ) : (
                  <Text style={styles.buttonText}>
                    {isSignUp ? 'CREAR CUENTA' : 'INICIAR SESIÓN'}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => {
                  setIsSignUp(!isSignUp);
                  clearError();
                }}
                disabled={loading}
              >
                <Text style={styles.switchText}>
                  {isSignUp
                    ? '¿Ya tienes cuenta? Inicia sesión'
                    : '¿No tienes cuenta? Regístrate'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoImage: {
    width: 280,
    height: 180,
    resizeMode: 'contain',
    marginBottom: spacing.sm,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    ...typography.h2,
    letterSpacing: 6,
    color: '#1a2b4c',
  },
  tricolorContainer: {
    flexDirection: 'row',
    width: 150,
    height: 3,
    marginTop: spacing.xs,
  },
  colorLine: {
    flex: 1,
    height: '100%',
  },
  formCard: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    ...shadows.light,
  },
  formTitle: {
    ...typography.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
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
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.body,
    color: colors.text.primary,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.medium,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    ...typography.bodyBold,
    color: colors.text.inverse,
  },
  switchButton: {
    alignItems: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },
  switchText: {
    ...typography.caption,
    color: colors.info,
  },
});
