import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.message]}>An error occurred</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
});
