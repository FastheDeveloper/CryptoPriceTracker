import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import { AntDesign } from "@expo/vector-icons";
import WatchList from "../Screens/Watchlist";
import PortfolioScreen from "../Screens/Portfolio";

const Tabs = createBottomTabNavigator();
const BottomTabNav = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          backgroundColor: "#121212",
        },
      }}
    >
      <Tabs.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="home" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name={"Portfolio"}
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="piechart" size={focused ? 32 : 27} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name={"Watchlist"}
        component={WatchList}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="staro" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
export default BottomTabNav;
