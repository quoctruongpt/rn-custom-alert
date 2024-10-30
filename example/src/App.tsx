import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useCustomAlert, CustomAlertProvider } from 'rn-custom-alert';

export default function App() {
  return (
    <CustomAlertProvider>
      <View style={styles.container}>
        <Test />
      </View>
    </CustomAlertProvider>
  );
}

const Test = () => {
  const { show } = useCustomAlert();
  return (
    <TouchableOpacity
      onPress={() => {
        show({
          title: 'Alert',
          message: 'This is an alert abc xin chào mọi người. Ok không bạn',
          actions: [{ label: 'OK' }],
        });
      }}
    >
      <Text>Click me</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
