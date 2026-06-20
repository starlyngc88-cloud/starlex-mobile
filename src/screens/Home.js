import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#ffffff' },
  logo: { width: 220, height: 220, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 24, color: '#111', fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 28, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});
