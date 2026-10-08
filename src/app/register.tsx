import { ApiError } from '@/api/ApiError';
import { isValidationProblem } from '@/api/apiErrorUtils';
import { register } from '@/api/authApi';
import { MRBackButton } from '@/components/MRBackButton';
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

type FieldErrors = Partial<
  Record<'username' | 'email' | 'password' | 'repeatedPassword', string>
>;

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const repeatPasswordInputRef = useRef<TextInput>(null);

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const handleRegister = async () => {
    setErrorMessage(null);
    setFieldErrors({});

    if (password !== repeatedPassword) {
      setFieldErrors({
        repeatedPassword: 'Die Passwörter stimmen nicht überein.',
      });

      return;
    }

    setIsLoading(true);

    try {
      await register({
        username,
        email,
        password,
      });

      router.replace('/home');
    } catch (error) {
      if (error instanceof ApiError && error.problem) {
        if (isValidationProblem(error.problem)) {
          const validationErrors: FieldErrors = {};

          error.problem.validationErrors.forEach((validationError) => {
            const field = validationError.field;

            if (
              field === 'username' ||
              field === 'email' ||
              field === 'password'
            ) {
              validationErrors[field] = validationError.message;
            }
          });

          setFieldErrors(validationErrors);
        } else {
          setErrorMessage(
            error.problem.detail ??
              'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
          );
        }
      } else {
        setErrorMessage(
          'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MRBackButton />
      </View>

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

          <Text style={styles.subtitle}>Registriere dich bei uns</Text>

          <MRTextInput
            value={username}
            onChangeText={(value) => {
              setUsername(value);
              clearFieldError('username');
            }}
            placeholder="Username"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current?.focus()}
            error={fieldErrors.username}
          />

          <MRTextInput
            ref={emailInputRef}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              clearFieldError('email');
            }}
            placeholder="E-Mail"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            error={fieldErrors.email}
          />

          <View style={styles.passwordContainer}>
            <MRTextInput
              ref={passwordInputRef}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                clearFieldError('password');
              }}
              placeholder="Passwort"
              isPassword
              returnKeyType="next"
              onSubmitEditing={() => repeatPasswordInputRef.current?.focus()}
              error={fieldErrors.password}
            />

            <Text
              style={[
                styles.passwordHint,
                fieldErrors.password && styles.passwordHintError,
              ]}
            >
              Das Passwort muss mindestens 8 Zeichen sowie Groß- und
              Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.
            </Text>
          </View>

          <MRTextInput
            ref={repeatPasswordInputRef}
            value={repeatedPassword}
            onChangeText={(value) => {
              setRepeatedPassword(value);
              clearFieldError('repeatedPassword');
            }}
            placeholder="Passwort bestätigen"
            isPassword
            returnKeyType="done"
            onSubmitEditing={handleRegister}
            error={fieldErrors.repeatedPassword}
          />

          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingText}>Registrierung läuft...</Text>
            </View>
          ) : (
            <MRPrimaryButton title="Registrieren" onPress={handleRegister} />
          )}
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

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 8,
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

  passwordContainer: {
    gap: 6,
  },

  passwordHint: {
    color: colors.textMuted,
    fontSize: 13,
    paddingHorizontal: 4,
  },

  passwordHintError: {
    color: colors.error,
  },

  errorMessage: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
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
});
