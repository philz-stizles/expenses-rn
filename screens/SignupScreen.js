import { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/http.util';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useAuth } from '../store/context/auth.context';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
   const { authenticate } = useAuth();

  async function signupHandler(credentials) {
    setIsLoading(true);
    try {
      const token = await createUser(credentials);
      authenticate(token);
    } catch (error) {
      console.log(error, credentials);
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again.'
      );
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingOverlay />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
