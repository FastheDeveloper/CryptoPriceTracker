import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchListContext = createContext();
export const useWatchList = () => useContext(WatchListContext);

const WatchlistProvider = ({ children }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState([]);

 const getWatchlistData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchListCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {}
  };

  useEffect(() => {
    getWatchlistData();
  }, []);

  const storeWatchlistCoinId = async(coinId)=>{
    try{
        const newWatchList =[...watchListCoinIds,coinId];
        const jsonValue=JSON.stringify(newWatchList)
        await AsyncStorage.setItem('@watchlist_coins',jsonValue)
        setWatchListCoinIds(newWatchList);
    }catch(e){
        console.log(e)
    }
  }

  const removeWatchlistCoinId = async (coinId)=>{
    const newWatchList=watchListCoinIds.filter((coinIdValue) =>coinIdValue !== coinId)
    const jsonValue=JSON.stringify(newWatchList);
    await AsyncStorage.setItem('@watchlist_coins',jsonValue)
    setWatchListCoinIds(newWatchList)
  }
  return (
    <WatchListContext.Provider value={{ watchListCoinIds,storeWatchlistCoinId,removeWatchlistCoinId}}>
      {children}
    </WatchListContext.Provider>
  );
};

export default WatchlistProvider;
