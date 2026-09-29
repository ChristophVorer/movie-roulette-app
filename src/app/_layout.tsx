import { colors } from '@/theme/standardTheme';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
  }, []);

  return (
    <KeyboardProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
          animation: 'slide_from_right',
        }}
      />
    </KeyboardProvider>
  );
}
