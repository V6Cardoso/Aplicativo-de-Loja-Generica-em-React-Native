import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import SaleItem from "../components/SaleItem";

import { getAllSales, getAllSaleItems } from "../Database/dbStore";

const SalesListScreen = () => {
  const [sales, setSales] = useState([]);
  const [saleItems, setSaleItems] = useState([]);

  const loadSales = async () => {
    const sales = await getAllSales();
    setSales(sales);

    const items = await getAllSaleItems();
    setSaleItems(items);

    console.log("saleItems", JSON.stringify(saleItems));
  };

  useEffect(() => {
    loadSales();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={sales}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SaleItem item={item} saleItems={saleItems} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
  },
});

export default SalesListScreen;
