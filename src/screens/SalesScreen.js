import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

import ProductItem from "../components/ProductItem";
import ProductsList from "../components/ProductsList";


const SalesScreen = () => {

  return (
    <View style={styles.container}>
      <ProductsList isForSale />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
    paddingTop: 50,
  },
});

export default SalesScreen;
