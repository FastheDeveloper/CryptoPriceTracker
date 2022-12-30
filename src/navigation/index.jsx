import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import CoinsDetails from "../Screens/CoinsDetails";
import BottomTabNav from "./bottomTabs";
import AddNewAssets from "../Screens/AddNewAssets";

const Stack = createNativeStackNavigator();

const Nvigation = () => {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name={"Root"}
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"CoinDetails"}
        component={CoinsDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"AddNewAssets"}
        component={AddNewAssets}
        options={{
          title: "Add New Assets",
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor:'white',
          headerTitleStyle:{
            fontWeight:'bold'
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default Nvigation;
