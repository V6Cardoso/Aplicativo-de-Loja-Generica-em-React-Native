import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./src/components/MyTabs";
import store from "./context/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

import { createTables } from "./src/Database/dbStore";

export default function App() {
  let tabelasCriadas = false;

  async function callCreateTable() {
    if (!tabelasCriadas) {
      tabelasCriadas = true;
      await createTables();
    }
  }

  useEffect(() => {
    callCreateTable();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}

let bottomHeight = 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: bottomHeight,
  },
  tabBarStyle: {
    backgroundColor: "#F5F5F5",
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    borderRadius: 30,
    height: bottomHeight,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
