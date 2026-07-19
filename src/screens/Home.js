import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius as br } from '../theme';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/images/home.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenida a Starlex</Text>
      <Text style={styles.subtitle}>Tu app lista para iOS y Android</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: br.medium,
  },
  buttonText: {
    ...typography.bodyBold,
    color: colors.text.inverse,
  },
});
