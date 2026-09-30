import { ApiError } from '@/api/ApiError';
import { login } from '@/api/authApi';
import { MRSecondaryButton } from '@/components/MRSecondaryButton';
import { MRTextInput } from '@/components/MRTextInput';
import { colors } from '@/theme/standardTheme';
import { MRPrimaryButton } from '@components/MRPrimaryButton';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await login({
        email,
        password,
      });

      router.replace('/home');
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(
          error.problem?.detail ??
            'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
        );
      } else {
        setErrorMessage(
          'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('@assets/logo/movie-roulette-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Movie Roulette</Text>
          <Text style={styles.subtitle}>Melde dich an, um fortzufahren.</Text>

          <MRTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="E-Mail"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />

          <MRTextInput
            ref={passwordInputRef}
            value={password}
            onChangeText={setPassword}
            placeholder="Passwort"
            isPassword
            returnKeyType="done"
          />

          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingText}>Anmeldung läuft...</Text>
            </View>
          ) : (
            <MRPrimaryButton title="Anmelden" onPress={handleLogin} />
          )}

          <View style={styles.divider}>
            <View style={styles.dividerLine} />

            <Text style={styles.dividerText}>Noch kein Konto?</Text>

            <View style={styles.dividerLine} />
          </View>

          <MRSecondaryButton title="Konto erstellen" onPress={handleRegister} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
  },

  logoContainer: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  logo: {
    width: 150,
    height: 150,
  },

  form: {
    gap: 16,
  },

  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: colors.textMuted,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },

  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: '#dc2626',
  },

  loadingContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  loadingText: {
    color: colors.textMuted,
    fontSize: 14,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  dividerText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
