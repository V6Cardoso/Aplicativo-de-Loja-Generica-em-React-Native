import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";

import { connect } from "react-redux";
import { setProductsList } from "../../context/actions/productsAction";
import { setCategoriesList } from "../../context/actions/categoriesAction";

import SalesScreen from "../screens/SalesScreen";

import CartScreen from "../screens/CartScreen";

import ManageScreen from "../screens/ManageScreen";
import EditProductsScreen from "../screens/EditProductsScreen";
import SalesListScreen from "../screens/SalesListScreen";
import DashboardScreen from "../screens/DashboardScreen";

import { createTables, getAllProducts, getAllCategories } from "../Database/dbStore";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTabs = (props) => {

  let tabelasCriadas = false;

  async function callCreateTable() {
    if (!tabelasCriadas) {
      tabelasCriadas = true;
      console.log("Criando tabelas......")
      await createTables();
    }
  }

  async function fetchData() {
    await callCreateTable();

    console.log("fetchData............");
    const products = await getAllProducts();
    props.setProductsList(products);

    const categories = await getAllCategories();
    props.setCategoriesList(categories);
  }

  useEffect(() => {
    fetchData();
  }, []);



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
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === "Carrinho" && props.cart.length > 0 && (
                <Badge
                  value={props.cart.length}
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
      {props.cart.length > 0 && <Tab.Screen name="Carrinho" component={CartScreen} />}
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
  return {
    cart: state.cart.cart,
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProductsList: (products) => dispatch(setProductsList(products)),
    setCategoriesList: (categories) => dispatch(setCategoriesList(categories)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTabs);
