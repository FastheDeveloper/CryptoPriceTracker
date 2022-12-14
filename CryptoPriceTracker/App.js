import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import CoinItems from './src/components/coinitems';
import Crypcurr from './assets/data/Crypcurr.json'
import HomeScreen from './src/Screens/HomeScreen'
import CoinsDetails from './src/Screens/CoinsDetails';
import BasicExample from './src/Screens/CoinsDetails/mix';

export default function App() {
  return (
    <View style={styles.container}>
        {/* <HomeScreen /> */}
        <CoinsDetails />
        
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop:35, 
  }

});
