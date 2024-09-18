import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../utils/http.util';
import { useAuth } from '../store/context/auth.context';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate } = useAuth();

  async function loginHandler(credentials) {
    setIsLoading(true);
    try {
      const token = await login(credentials);
      authenticate(token);
    } catch (error) {
      console.log(error, credentials);
      Alert.alert(
        'Authentication failed',
        'Could not log you in, please check your credentials or try again later!'
      );
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingOverlay message="Logging you in..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
