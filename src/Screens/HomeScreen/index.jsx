import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, RefreshControl, View, Text } from "react-native";
import CoinItems from "../../../src/components/coinitems";

import { getMarketData } from "../../service/request";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinData]);
    setLoading(false);
  };

  const refreshCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinData = await getMarketData();
    setCoins(coinData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <View>
      <View style={{flexDirection:'row' ,justifyContent:'space-around',alignItems:'center'}}>
      <Text
        style={{
          
          color: "white",
          // fontWeight: "300",
          fontSize: 20,
          paddingHorizontal: 10,
          paddingBottom: 5,
        }}
      >
        COIN TRACKER
      </Text>
      <Text style={{color:'white',fontSize:10,paddingHorizontal:10}}> powered by CoinGeckoAPI</Text>
      </View>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItems marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refreshCoins}
          />
        }
      />
    </View>
  );
};
export default HomeScreen;
