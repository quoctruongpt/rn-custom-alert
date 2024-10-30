import { useState, useEffect, act } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useCustomAlert, CustomAlertProvider } from 'rn-custom-alert';

export default function App() {
  const [result, setResult] = useState<number | undefined>();

  return (
    <CustomAlertProvider>
      <View style={styles.container}>
        <Hihi />
      </View>
    </CustomAlertProvider>
  );
}

const Hihi = () => {
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
      <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
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
