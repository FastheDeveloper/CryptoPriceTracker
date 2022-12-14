import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import CoinItems from '../../../src/components/coinitems';
import Crypcurr from '../../../assets/data/Crypcurr.json'

const HomeScreen = () =>{
    return(
        <FlatList 
       data={Crypcurr}
       renderItem ={({item})=> <CoinItems marketCoin={item}/>}
       />
    )
}
export default HomeScreen;