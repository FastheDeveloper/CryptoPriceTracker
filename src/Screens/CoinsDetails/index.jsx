import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CardHeader from "../components/CardHeader";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getCoinMarketChart,
  getCandleChartData,
} from "../../service/request";
import Filters from "./FilterComponent";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const CoinsDetails = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const now = new Date().getHours();
    // console.log(now)

    if (now <= 11) {
      setMessage("Good Morning, Ohayo!");
    } else if (now > 11 && now < 17) {
      setMessage("Good afternoon, konnichiwa!");
    } else if (now >= 17) {
      setMessage("Good evening, Konbanwa!");
    }
  }, []);

  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    setCoin(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  const fetchCandleStickChartData = async (selectedRangeValue) => {
    const fetchedSelectedCandleChartData = await getCandleChartData(
      coinId,
      selectedRangeValue
    );
    setCoinCandleChartData(fetchedSelectedCandleChartData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1); 
    fetchCandleStickChartData();
  }, []);

 
  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };

  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range),
    []
  );

  if (loading || !coin || !coinMarketData || !coinCandleChartData) {
    return <ActivityIndicator size="large" />;
  }

  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;
  const { prices } = coinMarketData;
  const changeCoin = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value) || 0;
    const ans = floatValue * current_price.usd;
    setUsdValue(ans.toString());
  };

  const formatCurrency = (value) => {
    "worklet";
    if (value === "") {
      if (current_price.usd < 1) {
        return `$${current_price.usd}`;
      }
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${current_price.usd.toFixed(2)}`;
  };

  const changeUsd = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value) || 0;
    const ans = floatValue / current_price.usd;
    setCoinValue(ans.toString());
  };

  const screenWidth = Dimensions.get("window").width;

  const percentagecolor =
    price_change_percentage_24h < 0 ? "#b60033" : "#80dd6d" || "white";
  const chartColor = current_price.usd > prices[0][1] ? "#80dd6d" : "#b60033";



  return (
    <View style={{ paddingHorizontal: 10 }}>
      <LineChart.Provider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <CardHeader
          coinId={id}
          image={small}
          name={name}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={{ padding: 10, marginRight: -9 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={styles.names}>{name}</Text>
              {/* <LineChart.PriceText format={formatCurrency} style={styles.price}/> */}
              <Text style={styles.price}>${current_price.usd}</Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: percentagecolor,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {price_change_percentage_24h?.toFixed(2)}%
              </Text>
            </View>
          </View>
          <Text style={{ color: "white", letterSpacing: 4, fontSize: 12 }}>
            {message}
          </Text>
          <View style={styles.timeFilterContainer}>
            <Filters
              filterDay="1"
              filterText="24"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            <Filters
              filterDay="7"
              filterText="7d"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            <Filters
              filterDay="30"
              filterText="30d"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            <Filters
              filterDay="365"
              filterText="1y"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            <Filters
              filterDay="max"
              filterText="All"
              selectedRange={selectedRange}
              setSelectedRange={memoOnSelectedRangeChange}
            />
            {isCandleChartVisible  ?(
                <AntDesign name="linechart" size={24} color={chartColor} onPress={()=>setIsCandleChartVisible(false)}/>
            ): (
            <MaterialIcons name="waterfall-chart" size={24} color={chartColor} onPress={()=>setIsCandleChartVisible(true)}/>
            )}
            
            
          </View>
        </View>
              {isCandleChartVisible ? (
                <CandlestickChart.Provider 
                data={coinCandleChartData.map(
                  ([timestamp, open, high, low, close]) => ({
                    timestamp, open, high, low, close
                  })
                )}
              >
                <CandlestickChart height={screenWidth / 2} width={screenWidth}>
                  <CandlestickChart.Candles />
                  <CandlestickChart.Crosshair>
                    <CandlestickChart.Tooltip/>
                  </CandlestickChart.Crosshair>
                </CandlestickChart>
                {/* <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginTop:20}}>
                  <View>
                    <Text style={styles.candlelabel}>Open</Text>
                  <CandlestickChart.PriceText style={{color:'white',fontWeight:'700'}} type="open"/>
                  </View>

                  <View>
                    <Text style={styles.candlelabel}>High</Text>
                  <CandlestickChart.PriceText style={{color:'white',fontWeight:'700'}} type="high"/>
                  </View>

                  <View>
                    <Text style={styles.candlelabel}>Low</Text>
                  <CandlestickChart.PriceText style={{color:'white',fontWeight:'700'}} type="low"/>
                  </View>

                </View> */}
                <CandlestickChart.DatetimeText style={{color:'white',fontWeight:'700',margin:10}} />
      
              </CandlestickChart.Provider>
              ):(
                <LineChart height={screenWidth / 2} width={screenWidth}>
          <LineChart.Path color={chartColor} />
          <LineChart.CursorCrosshair />
        </LineChart>
              )}
        

        

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoin}
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsd}
            />
          </View>
        </View>
      </LineChart.Provider>
    </View>
  );
};
export default CoinsDetails;
