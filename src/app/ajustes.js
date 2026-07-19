import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export default function Ajustes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
});