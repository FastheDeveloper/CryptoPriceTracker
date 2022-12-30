import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import CoinItems from "../../components/coinitems";
import { useWatchList } from "../../Contexts/WatchlistContext";
import { getWatchlistedCoins } from "../../service/request";

const WatchList = () => {
  const { watchListCoinIds } = useWatchList();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchListCoinIds.join("%2C");

  const fetchWatchListedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchListedCoinData = await getWatchlistedCoins(
      1,
      transformCoinIds() 
    );
    setCoins(watchListedCoinData);
    
    setLoading(false);
  };

  const emptyCoinRefresher=()=>{
    setCoins([])
  }

  useEffect(() => {
    if(watchListCoinIds.length > 0){
      fetchWatchListedCoins();
    }
  }, [watchListCoinIds]);


  // watchListCoinIds>0 ? fetchWatchListedCoins : emptyCoinRefresher
  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItems marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={watchListCoinIds.length>0 ? fetchWatchListedCoins: null}
        />
      }
    />
  );
};
export default WatchList;
