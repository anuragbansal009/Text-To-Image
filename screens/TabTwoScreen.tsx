import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ marginHorizontal: 20, marginTop: 20, justifyContent: 'center', alignContent: 'center', textAlign: 'center', fontSize: 20 }}>Neural Networks Project</Text>
      <Text style={{ marginHorizontal: 20, justifyContent: 'center', alignContent: 'center', textAlign: 'center', fontSize: 20 }}>Text To Image</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', textAlign: 'center', fontSize: 16, opacity: 0.75 }}>Submitted To:</Text>
      <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', fontSize: 14, opacity: 0.6 }}>Dr. Varun Gupta</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={{ marginTop: 10, justifyContent: 'center', alignContent: 'center', textAlign: 'center', fontSize: 16, opacity: 0.75 }}>Made By:</Text>
      <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', fontSize: 14, opacity: 0.6 }}>Ankit Gupta (CO19311)</Text>
      <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', fontSize: 14, opacity: 0.6 }}>Anurag Bansal (CO19313)</Text>
      <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', fontSize: 14, opacity: 0.6 }}>Himanshu Rathee (CO19327)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    marginTop: 20,
    height: 1,
    width: '80%',
  },
});
