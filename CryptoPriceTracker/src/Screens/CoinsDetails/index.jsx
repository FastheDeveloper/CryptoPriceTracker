import React,{useState,useEffect} from 'react';
import { Image, StyleSheet, Text, View,Dimensions, TextInput } from 'react-native';
import Coin from '../../../assets/data/crypto.json'  
// import {ChartDot, ChartPath, ChartPathProvider } from '@rainbow-me/animated-charts';
import CardHeader from '../components/CardHeader';
import styles from './styles';


// const data = [
//   {x: 1453075200, y: 1.47}, {x: 1453161600, y: 1.37},
//   {x: 1453248000, y: 1.53}, {x: 1453334400, y: 1.54},
//   {x: 1453420800, y: 1.52}, {x: 1453507200, y: 2.03},
//   {x: 1453593600, y: 2.10}, {x: 1453680000, y: 2.50},
//   {x: 1453766400, y: 2.30}, {x: 1453852800, y: 2.42},
//   {x: 1453939200, y: 2.55}, {x: 1454025600, y: 2.41},
//   {x: 1454112000, y: 2.43}, {x: 1454198400, y: 2.20},
// ];

// const points = monotoneCubicInterpolation({data, range: 40});

const CoinsDetails =()=>{
  const {
    image :{small},
    name,
    market_data:{market_cap_rank,current_price},
    symbol,prices,
    market_data:{price_change_percentage_7d}} =Coin;

    const [coinValue,setCoinValue]=useState('1')
    const [usdValue,setUsdValue]=useState(current_price.usd.toString())
    
    // useEffect(()=>{
    //   const floatValue=parseFloat(coinValue) || 0
    //   setUsdValue((floatValue * current_price.usd).toString())
    // },[coinValue])
    
    // useEffect(()=>{
    //   const floatValue=parseFloat(usdValue) || 0
    //   setCoinValue((floatValue / current_price.usd).toString())
    // },[usdValue])

    const changeCoin=(value)=>{
      setCoinValue(value)
      const floatValue=parseFloat(value) || 0
      const ans=(floatValue * current_price.usd)
      setUsdValue(ans.toString()) 
    }

    const changeUsd=(value)=>{
      setUsdValue(value)
      const floatValue=parseFloat(value) || 0
      const ans =(floatValue / current_price.usd)
      setCoinValue(ans.toString()) 
    }
   

    const screenWidth =Dimensions.get('window').width;

    // const gra

  const [message,setMessage]=React.useState('');
  React.useEffect(() => {
    const now = new Date().getHours();

    if (now <= 11) {
      setMessage('Good Morning, Ohayo!');
    } else if (now >11 && now<5) {
      setMessage('Good afternoon, konnichiwa!');
    } else if (now>5) {
      setMessage('Good evening, Konbanwa!');
    }
    
  }, []);
    const percentagecolor=price_change_percentage_7d <0 ? '#b60033' : '#80dd6d'
      return(
          <View style={{paddingHorizontal:10}}>
            {/* <ChartPathProvider data={{
              // points:prices.map((price)=>({x:price[0],y:price[1]})),
              points,
               smoothingStrategy: 'bezier' 
               }}> */}
            <CardHeader image={small} name={name} symbol={symbol} marketCapRank={market_cap_rank} />
            <View style={{padding:10,marginRight:-9}}>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <View>
                      <Text style={styles.names}>{name}</Text>
                      <Text style={styles.price}>${current_price.usd}</Text>
                      </View>
                      <View style={{}}>
                      <Text style={{color:percentagecolor,fontSize:14,fontWeight:'bold'}}>{price_change_percentage_7d.toFixed(2)}%</Text>
                      </View>
                  </View>
                  <Text style={{color:'white',letterSpacing:4,fontSize:12}}>{message}</Text>
            </View>
            <View style={{height:screenWidth/2,width:screenWidth  ,justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:'white'}}>
              <Text  style={{color:'white'}}> THIS IS SUPPOSED T0 BE A CHART...INCOMING </Text>
            </View>
              {/* <ChartPath height={screenWidth / 2} stroke="yellow" width={screenWidth} />
              <ChartDot style={{ backgroundColor: 'blue' }} />
           */}
          <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'row',flex:1}}>
                <Text style={{color:'white',alignSelf:'center'}}>{symbol.toUpperCase()}</Text>
                <TextInput 
                style={styles.input} 
                value={coinValue}
                keyboardType='numeric'
                onChangeText={changeCoin}
                
                />
            </View>

            <View style={{flexDirection:'row',flex:1}}>
              <Text style={{color:'white',alignSelf:'center'}}>USD</Text>
              <TextInput 
              style={styles.input} 
              value={usdValue}
              keyboardType='numeric'
              onChangeText={changeUsd}
              
              />
            </View>
            
          </View>
          {/* </ChartPathProvider>  */}
          </View>
      );
}
export default CoinsDetails;

