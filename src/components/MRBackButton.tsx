// src/components/MRBackButton.tsx

import { colors } from '@/theme/standardTheme';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet } from 'react-native';

export function MRBackButton() {
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={10}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <SymbolView
        name={{
          ios: 'chevron.left',
          android: 'chevron_backward',
          web: 'arrow_back',
        }}
        size={22}
        tintColor={colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPressed: {
    opacity: 0.7,
  },
});
