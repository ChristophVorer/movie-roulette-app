// src/components/MRTextInput.tsx

import { colors } from '@/theme/standardTheme';
import { SymbolView } from 'expo-symbols';
import { forwardRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type MRTextInputProps = TextInputProps & {
  isPassword?: boolean;
  error?: string;
};

export const MRTextInput = forwardRef<TextInput, MRTextInputProps>(
  (
    {
      style,
      placeholderTextColor = colors.textMuted,
      isPassword = false,
      secureTextEntry,
      error,
      ...props
    },
    ref,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const isSecure = isPassword ? !passwordVisible : secureTextEntry;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            {...props}
            secureTextEntry={isSecure}
            placeholderTextColor={placeholderTextColor}
            style={[
              styles.input,
              error && styles.inputError,
              isPassword && styles.passwordInput,
              style,
            ]}
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
                tintColor={error ? styles.errorColor.color : colors.textMuted}
              />
            </Pressable>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

MRTextInput.displayName = 'MRTextInput';

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },

  inputContainer: {
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
    fontSize: 16,
  },

  passwordInput: {
    paddingRight: 48,
  },

  inputError: {
    borderColor: '#dc2626',
  },

  errorText: {
    color: '#dc2626',
    fontSize: 13,
    paddingHorizontal: 4,
  },

  errorColor: {
    color: '#dc2626',
  },

  eyeButton: {
    position: 'absolute',
    right: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
