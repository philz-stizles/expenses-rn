import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Input from '../UI/Input';
import Button from '../UI/Button';

function AuthForm({ isLogin, invalidCredentials, onSubmit }) {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    email: emailIsInValid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInValid,
    confirmPassword: passwordsDontMatch,
  } = invalidCredentials;

  function submitHandler() {
    onSubmit({
      email,
      confirmEmail,
      password,
      confirmPassword,
    });
  }

  function changeTextHandler(name, value) {
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'confirmEmail':
        setConfirmEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={changeTextHandler.bind(this, 'email')}
          invalid={emailIsInValid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            keyboardType="email-address"
            value={confirmEmail}
            onChangeText={changeTextHandler.bind(this, 'confirmEmail')}
            invalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={changeTextHandler.bind(this, 'password')}
          invalid={passwordIsInValid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={changeTextHandler.bind(this, 'confirmPassword')}
            invalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
