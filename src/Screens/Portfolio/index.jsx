import React,{Suspense} from 'react'
import { View,Text } from 'react-native'
import PortfolioAssets from './components/portfolioAssets';

const PortfolioScreen=()=> {
  return (
    <View style={{flex:1}}>
      <Suspense fallback={<Text style={{color:'white'}}>Loading...Please Wait</Text>}>
        <PortfolioAssets/>
        </Suspense>
    </View>
  )
}

export default PortfolioScreen;