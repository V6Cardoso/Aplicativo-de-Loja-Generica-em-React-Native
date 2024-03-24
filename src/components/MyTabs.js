import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";
import { connect } from "react-redux";

import SalesScreen from "../screens/SalesScreen";

import CartScreen from "../screens/CartScreen";

import ManageScreen from "../screens/ManageScreen";
import AddProductScreen from "../screens/AddProductScreen";
import EditProductsScreen from "../screens/EditProductsScreen";
import SalesListScreen from "../screens/SalesListScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTabs = ({ cart }) => {
  return (
    <Tab.Navigator
      initialRouteName={"Loja"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Loja") {
            iconName = focused ? "pricetag" : "pricetag-outline";
            color = focused ? "green" : "gray";
          } else if (route.name === "Gerenciar") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Carrinho") {
            iconName = focused ? "cart" : "cart-outline";
            color = focused ? "#6A5ACD" : "gray";
            size = 30;
          }

          return (
            <View>
              <Icon name={iconName} size={size} color={color} />
              {route.name === "Carrinho" && cart.length > 0 && (
                <Badge
                  value={cart.length}
                  status="error"
                  containerStyle={{ position: "absolute", top: -4, right: -6 }}
                />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "gray",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Loja" component={SalesStack} />
      {cart.length > 0 && <Tab.Screen name="Carrinho" component={CartScreen} />}
      <Tab.Screen name="Gerenciar" component={ManageStack} />
    </Tab.Navigator>
  );
};

function SalesStack() {
  return (
    <Stack.Navigator
      initialRouteName="Sales"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Sales" component={SalesScreen} />
      
    </Stack.Navigator>
  );
}

function ManageStack() {
  return (
    <Stack.Navigator
      initialRouteName="Manage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Manage" component={ManageScreen} />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={() => {
          return {
            headerShown: true,
            title: "Adicionar Produto",
          };
        }}
      />
      <Stack.Screen
        name="EditProductsScreen"
        component={EditProductsScreen}
        options={() => {
          return {
            headerShown: true,
            title: "Editar Produtos",
          };
        }}
      />
      <Stack.Screen
        name="SalesListScreen"
        component={SalesListScreen}
        options={() => {
          return {
            headerShown: true,
            title: "Lista de Vendas",
          };
        }}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={() => {
          return {
            headerShown: true,
            title: "Dashboard",
          };
        }}
      />
    </Stack.Navigator>
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

const mapStateToProps = (state) => {
  console.log(JSON.stringify(state.cart.cart));
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(MyTabs);
