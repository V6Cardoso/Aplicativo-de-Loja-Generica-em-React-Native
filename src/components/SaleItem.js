import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const SaleItem = (props) => {
  const [open, setOpen] = useState(false);

  function formatDate(dateString) {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", options);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <View style={styles.cardDetails}>
          <View style={styles.columnData}>
            <Text>id</Text>
            <Text>{props.item.id}</Text>
          </View>
          <View style={styles.columnData}>
            <Text>Total</Text>
            <Text>R$ {props.item.price}</Text>
          </View>
          <View style={styles.columnData}>
            <Text>Data</Text>
            <Text>{formatDate(props.item.time)}</Text>
          </View>
        </View>
        <View style={[styles.cardDetails, styles.button]}>
          {open ? (
            <Text>Esconder Produtos</Text>
          ) : (
            <Text>Mostrar Produtos</Text>
          )}
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={20}
            color={"#000000"}
          />
        </View>
      </TouchableOpacity>

      {open && (
        <View>
          <FlatList
            data={props.saleItems.filter(
              (saleItem) => saleItem.sale === props.item.id
            )}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <View style={styles.header}>
                <Text style={styles.columnData}>Nome</Text>
                <Text style={styles.columnData}>Preço</Text>
                <Text style={styles.columnData}>Quantidade</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.cardDetails}>
                <Text style={styles.columnData}>{item.product_name}</Text>
                <Text style={styles.columnData}>R${item.price}</Text>
                <Text style={styles.columnData}>{item.quantity}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
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
  },
  button: {
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  columnData: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default SaleItem;
