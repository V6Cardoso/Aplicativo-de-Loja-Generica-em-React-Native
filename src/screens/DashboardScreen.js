import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

import { mostSellingProducts, getSalesGroupByDate } from "../Database/dbStore";

const DashboardScreen = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const loadSales = async () => {
    const productsResult = await mostSellingProducts();
    setProducts(
      productsResult.map((product) => ({
        ...product,
        name: product.product_name,
        color:
          "#" +
          ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(
            -6
          ), //16777215 = ffffff
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
    );

    const salesResult = await getSalesGroupByDate();
    setSales(
      salesResult.map((sale) => ({ date: sale.date, count: sale.count }))
    );

    console.log("products", JSON.stringify(products));
  };

  useEffect(() => {
    loadSales();
  }, []);
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5 Produtos mais vendidos</Text>
      <PieChart
        data={products}
        width={screenWidth - 15}
        height={250}
        chartConfig={styles.chartConfig}
        accessor={"total"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        style={styles.chart}
        
        
      />
      <Text style={styles.title}>Heatmap de vendas</Text>
      <ContributionGraph
        values={sales}
        endDate={new Date()}
        numDays={105}
        width={screenWidth - 15}
        height={220}
        chartConfig={styles.chartConfig}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  chartConfig: {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    backgroundGradientFrom: "gray",
    backgroundGradientTo: "black",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DashboardScreen;
