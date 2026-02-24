import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getTokenDuration() {
  const expiration = await AsyncStorage.getItem('expiration');
  const expirationDate = new Date(expiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export async function getToken() {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = await getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function checkAuthLoader() {
  const token = getToken();

  if (!token) {
    return redirect('/auth');
  }
}
