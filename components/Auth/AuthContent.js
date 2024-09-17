import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import AuthForm from './AuthForm';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate('SignupScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    const emailIsValid = email;
    const emailsAreEqual = email === confirmEmail;
    const passwordIsValid = password;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || !passwordsAreEqual) {
      Alert.alert('');
    }

    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm isLogin={isLogin} onSubmit={submitHandler} />
      <View></View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
  },
});
