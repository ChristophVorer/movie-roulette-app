// src/components/MRTextInput.tsx

import { colors } from '@/theme/standardTheme';
import { SymbolView } from 'expo-symbols';
import { forwardRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type MRTextInputProps = TextInputProps & {
  isPassword?: boolean;
};

export const MRTextInput = forwardRef<TextInput, MRTextInputProps>(
  (
    {
      style,
      placeholderTextColor = colors.textMuted,
      isPassword = false,
      secureTextEntry,
      ...props
    },
    ref,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const isSecure = isPassword ? !passwordVisible : secureTextEntry;

    return (
      <View style={styles.container}>
        <TextInput
          ref={ref}
          {...props}
          secureTextEntry={isSecure}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, style]}
        />

        {isPassword && (
          <Pressable
            onPress={() => setPasswordVisible((visible) => !visible)}
            style={styles.eyeButton}
            hitSlop={8}
          >
            <SymbolView
              name={
                passwordVisible
                  ? {
                      ios: 'eye.slash',
                      android: 'visibility_off',
                      web: 'visibility_off',
                    }
                  : {
                      ios: 'eye',
                      android: 'visibility',
                      web: 'visibility',
                    }
              }
              size={20}
              tintColor={colors.textMuted}
            />
          </Pressable>
        )}
      </View>
    );
  },
);

MRTextInput.displayName = 'MRTextInput';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
  },

  input: {
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 48,
    fontSize: 16,
  },

  eyeButton: {
    position: 'absolute',
    right: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
