import { View, TextInput, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfolioAssets";
import { getAllCoins, getDetailedCoinData } from "../../service/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import uuid from 'react-native-uuid';

const AddNewAssets = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCoinID, setSelectedCoinID] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );

   const navigation=useNavigation();

  const isQuantityEntered = () => boughtAssetQuantity === "";

    
  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getDetailedCoinData(selectedCoinID);
    setSelectedCoin(coinInfo);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if(selectedCoinID){
      fetchCoinInfo()
    }
  }, [selectedCoinID]);

  // const {symbol,market_data:{current_price}}=selectedCoin

  const onAddNewAssets = async () => {
    const newAsset={
      id: selectedCoin.id,
      unique_id:selectedCoin.id+uuid.v4(),
      name:selectedCoin.name,
      image:selectedCoin.image.small,
      ticker:selectedCoin.symbol.toUpperCase(),
      quantitybought:parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd
    
    }
    const newAssets=[...assetsInStorage,newAsset]
    const jsonValue=JSON.stringify(newAsset);
    await AsyncStorage.setItem('@portfolio_coins',jsonValue)
    setAssetsInStorage(newAssets)
    navigation.goBack();

  };

  return (
    <View style={{ flex: 1 }}>
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item) => setSelectedCoinID(item.id)}
        containerStyle={styles.dropDownCotainer}
        itemStyle={styles.itemStyle}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder={selectedCoinID || "Select a coin..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#444444",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            color: "white",
          },
        }}
      />
      {selectedCoin && (
        <>
          <View style={styles.boughtQuantity}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ color: "white", fontSize: 90 }}
                value={boughtAssetQuantity}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={setBoughtAssetQuantity}
              />
              <Text style={styles.ticker}>{selectedCoin.symbol.toUpperCase()}</Text>
            
            </View>
            <Text style={styles.pricePerCoin}>${selectedCoin.market_data.current_price.usd} per coin</Text>
            
          </View>
          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: isQuantityEntered() ? "#303030" : "#4169E1",
            }}
            disabled={isQuantityEntered()}
            onPress={onAddNewAssets}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: isQuantityEntered() ? "grey" : "white",
              }}
            >
              Add New Assets
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AddNewAssets;
