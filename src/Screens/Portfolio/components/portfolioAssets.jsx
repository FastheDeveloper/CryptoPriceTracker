import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { AntDesign,EvilIcons } from "@expo/vector-icons";
import styles from "../styles";
import PortfolioAssetsItems from "./PortfolioAssetsItems";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { allPortfolioAssets , allPortfolioBoughtAssetsInStorage} from "../../../atoms/PortfolioAssets";
import AsyncStorage from "@react-native-async-storage/async-storage";
// '#b60033' : '#80dd6d'
import { SwipeListView } from 'react-native-swipe-list-view';

const PortfolioAssets = () => {
  const navigation = useNavigation();
  const assets = useRecoilValue(allPortfolioAssets);
  const [storageAssets,setStorageAssets] = useRecoilState(allPortfolioBoughtAssetsInStorage);

  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total +
        currentAsset.currentPrice.toFixed(2) * currentAsset.quantitybought,
      0
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantitybought,
      0
    );
    return (currentBalance - boughtBalance);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantitybought,
      0
    );

    return (
      (((currentBalance - boughtBalance) / boughtBalance) * 100) || 0
    );
  };

  const isChangePositive = () => getCurrentValueChange() >= 0;

  const checker =()=>{
    if  (getCurrentPercentageChange()<0){
     return getCurrentPercentageChange().toFixed(4)
    }
    return getCurrentPercentageChange().toFixed(2)
  }

  const onDeleteAssets = async(asset)=>{
    const newAssets=storageAssets.filter((coin,index)=>coin.unique_id !== asset.item.unique_id)
    const jsonValue=JSON.stringify(newAssets);
    await AsyncStorage.setItem('@portfolio_coins',jsonValue)
    setStorageAssets(newAssets);
  }

  const renderDeleteButton =  (data)=>{
    return(
      <Pressable style={{
        flex:1,
        backgroundColor:'#ea3943',
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:25,
        marginLeft:20
      }}
      onPress={()=>onDeleteAssets(data)}
      >
        <EvilIcons name="trash" size={30} color="white" />
      </Pressable>
    )
  }

  return (
    <SwipeListView
      data={assets}
      renderItem={({ item }) => <PortfolioAssetsItems assetItem={item} />}
      rightOpenValue={-75}
      disableRightSwipe
      keyExtractor={({id},index)=>`${id}${index}`}
      renderHiddenItem={(data)=>renderDeleteButton(data)}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}>Current Balance</Text>
              <Text style={styles.currentBalanceValue}>
                ${getCurrentBalance().toFixed(2)}
              </Text>
              <Text
                style={{
                  ...styles.valueChange,
                  color: isChangePositive() ? "#80dd6d" : "#b60033",
                }}
              >
                ${getCurrentValueChange().toFixed(2)}(All Time)
              </Text>
            </View>
            <View
              style={{
                ...styles.priceChangecontainer,
                backgroundColor: isChangePositive() ? "#80dd6d" : "#b60033",
              }}
            >
              <AntDesign
                name={isChangePositive() ? "caretup" : "caretdown"}
                size={14}
                color={"white"}
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text style={styles.percentageChange}>
                {getCurrentPercentageChange().toFixed(2)}%
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.assetsLabel}>Your Assets</Text>
          </View>
        </>
      }
      ListFooterComponent={
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("AddNewAssets")}
        >
          <Text style={styles.buttonText}>Add New Assets</Text>
        </Pressable>
      }
    />
  );
};

export default PortfolioAssets;
