import React from 'react';
import { Image, Text, View,Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'

const CoinItems = ({marketCoin}) => {
  const  {
    name,
    id,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    market_cap,
    symbol,
    prices,
    image}=marketCoin;

const navigation=useNavigation();

    const normalizemarketCap=(marketCap)=>{
      if (marketCap>1e12){
        return `${(marketCap/1e12).toFixed(3)} T`
      }if (marketCap>1e9){
        return `${(marketCap/1e9).toFixed(3)} B`
      }if (marketCap>1e6){
        return `${(marketCap/1e6).toFixed(3)} M`
      }if (marketCap>1e3){
        return `${(marketCap/1e3).toFixed(3)} K`
      }
      return marketCap 
    } 

    const percentagecolor=price_change_percentage_24h <0 ? '#b60033' : '#80dd6d' || 'white'

    return (
        <Pressable 
        style={styles.coinContainer} 
        onPress={()=>navigation.navigate('CoinDetails',{coinId:id})}>
          <Image source={{uri:image}} 
          style={{height:30,width:30,marginRight:10}}/>
          <View>
            <Text style={styles.title}>{name}</Text>

            <View style={styles.row}>

              <View style={styles.rankContainer}>
              <Text style={styles.rank}>{market_cap_rank}</Text>
              </View>

              
              <Text style={styles.text}>{symbol}</Text>
              <AntDesign name={price_change_percentage_24h <0 ? 'caretdown':'caretup'} size={14} color={percentagecolor} style={{alignSelf:'center',marginRight:5}} />
              <Text style={{color:percentagecolor}}>{price_change_percentage_24h?.toFixed(2)}%</Text>
            </View>
        </View>

        <View style={{marginLeft:'auto', alignItems:'flex-end'}}>
          <Text style={styles.title}>{current_price}</Text>
          <Text style={{color:'white'}}>MCap {normalizemarketCap(market_cap)}</Text>
        </View>
      </Pressable>
    );
};
 
export default CoinItems;