import { MRBackButton } from '@/components/MRBackButton';
import { MRTextInput } from '@/components/MRTextInput';
import { colors } from '@/theme/standardTheme';
import { MRPrimaryButton } from '@components/MRPrimaryButton';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const repeatPasswordInputRef = useRef<TextInput>(null);

  const handleRegister = () => {
    router.replace('/home');
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
            onChangeText={setUsername}
            placeholder="Username"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current?.focus()}
          />

          <MRTextInput
            ref={emailInputRef}
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
            onSubmitEditing={() => repeatPasswordInputRef.current?.focus()}
          />

          <MRTextInput
            ref={repeatPasswordInputRef}
            value={repeatedPassword}
            onChangeText={setRepeatedPassword}
            placeholder="Passwort bestätigen"
            isPassword
            returnKeyType="done"
          />

          <MRPrimaryButton title="Registrieren" onPress={handleRegister} />
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
});
