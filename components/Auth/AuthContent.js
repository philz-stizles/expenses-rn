import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import AuthForm from './AuthForm';
import { GlobalStyles } from '../../constants/styles';
import Button from '../UI/Button';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [invalidCredentials, setInvalidCredentials] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    const emailIsValid = email;
    const emailsAreEqual = email === confirmEmail;
    const passwordIsValid = password;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert('', '');
      setInvalidCredentials({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    onAuthenticate({ email, password });
  }
  

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        invalidCredentials={invalidCredentials}
      />
      <View style={styles.buttons}>
        <Button onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </Button>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    marginTop: 8,
  },
});
