import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import styles from "../CoinsDetails/styles";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useWatchList} from "../../Contexts/WatchlistContext";

const CardHeader = (props) => {
  const navigation = useNavigation();
  const { coinId, image, symbol, marketCapRank } = props;
  const { watchListCoinIds,storeWatchlistCoinId,removeWatchlistCoinId  } = useWatchList();

  const checkIfCoinWatchlist = () =>watchListCoinIds.some((coinIdValue) => coinIdValue === coinId);

    const handleWatchlistCoin=()=>{
        if(checkIfCoinWatchlist()){
            return removeWatchlistCoinId(coinId)
        }
        return storeWatchlistCoinId(coinId)
    }


  return (
    <View>
      <View style={styles.iconView}>
        <Ionicons
          name="chevron-back-sharp"
          size={35}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mid}>
          <Image source={{ uri: image }} style={{ height: 30, width: 30 }} />
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
          <View>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              #{marketCapRank}
            </Text>
          </View>
        </View>
        <AntDesign
          name={checkIfCoinWatchlist() ? "star" : "staro"}
          size={24}
          color={checkIfCoinWatchlist() ? "gold" : "white"}
          onPress={handleWatchlistCoin}
        />
      </View>
    </View>
  );
};

export default CardHeader;
