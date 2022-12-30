import { StatusBar } from "expo-status-bar";
import { FlatList, Image, StyleSheet, Text, View,ActivityIndicator } from "react-native";
import CoinItems from "./src/components/coinitems";
import Crypcurr from "./assets/data/Crypcurr.json";
import HomeScreen from "./src/Screens/HomeScreen";
import CoinsDetails from "./src/Screens/CoinsDetails";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import BasicExample from "./src/Screens/CoinsDetails/mix";
import Nvigation from "./src/navigation";
import WatchlistProvider from "./src/Contexts/WatchlistContext";
import { RecoilRoot } from "recoil";
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function App() {
  // let [fontsLoaded] = useFonts({
  //   Inter_900Black,
  //   Conquest: require('./assets/fonts/Conquest.ttf'),
  //   CryptoCrash:require('./assets/fonts/CryptoCrash-K7jWe.ttf'),
  //   CryptoCrashItalics:require('./assets/fonts/CryptoCrashItalic-vmogL.ttf')
  // });

  // if(!fontsLoaded){
  //   return <ActivityIndicator size={'large'}/>
  // }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#121212",
        },
      }}
    >
      <RecoilRoot>
        <WatchlistProvider>
          <View style={styles.container}>
            <Nvigation />
            <StatusBar style="light" />
          </View>
        </WatchlistProvider>
      </RecoilRoot>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 35,
  },
});
