import { colors } from '@/theme/standardTheme';
import { Pressable, StyleSheet, Text } from 'react-native';

type MRSecondaryButtonProps = {
  title: string;
  onPress: () => void;
};

export function MRSecondaryButton({ title, onPress }: MRSecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
