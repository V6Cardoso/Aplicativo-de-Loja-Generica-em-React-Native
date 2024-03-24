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

const ProductsList = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 10, category: {text: "Categoria 1", color: "green"}, description: "Descrição do produto 1 muito legal e interessante lorem ipsum dolor sit amet" },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 15 },
    { id: 4, name: "Product 4", price: 25 },
    { id: 5, name: "Product 5", price: 30 },
    { id: 6, name: "Product 6", price: 35 },
    { id: 7, name: "Product 7", price: 40 },
    { id: 8, name: "Product 8", price: 45 },
    { id: 9, name: "Product 9", price: 50 },
    { id: 10, name: "Product 10", price: 55 },
    { id: 11, name: "Product 11", price: 60 },
    { id: 12, name: "Product 12", price: 65 },
    { id: 13, name: "Product 13", price: 70 },
    { id: 14, name: "Product 14", price: 75 },
    { id: 15, name: "Product 15", price: 80 },
    { id: 16, name: "Product 16", price: 85 },
    { id: 17, name: "Product 17", price: 90 },
    { id: 18, name: "Product 18", price: 95 },
    { id: 19, name: "Product 19", price: 100 },
    { id: 20, name: "Product 20", price: 105 },
    { id: 21, name: "Product 21", price: 110 },
    { id: 22, name: "Product 22", price: 115 },
    { id: 23, name: "Product 23", price: 120 },
    { id: 24, name: "Product 24", price: 125 },
    { id: 25, name: "Product 25", price: 130 },
    { id: 26, name: "Product 26", price: 135 },
    { id: 27, name: "Product 27", price: 140 },
    { id: 28, name: "Product 28", price: 145 },
    { id: 29, name: "Product 29", price: 150 },
    { id: 30, name: "Product 30", price: 155 },
    { id: 31, name: "Product 31", price: 160 },
    { id: 32, name: "Product 32", price: 165 },
    { id: 33, name: "Product 33", price: 170 },
    { id: 34, name: "Product 34", price: 175 },
    { id: 35, name: "Product 35", price: 180 },
    { id: 36, name: "Product 36", price: 185 },
    { id: 37, name: "Product 37", price: 190 },
    { id: 38, name: "Product 38", price: 195 },
    { id: 39, name: "Product 39", price: 200 },
    { id: 40, name: "Product 40", price: 205 },
    { id: 41, name: "Product 41", price: 210 },
    { id: 42, name: "Product 42", price: 215 },
    { id: 43, name: "Product 43", price: 220 },
    { id: 44, name: "Product 44", price: 225 },
    { id: 45, name: "Product 45", price: 230 },
    { id: 46, name: "Product 46", price: 235 },
    { id: 47, name: "Product 47", price: 240 },
    { id: 48, name: "Product 48", price: 245 },
    { id: 49, name: "Product 49", price: 250 },
    { id: 50, name: "Product 50", price: 255 },
  ]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Implement your search logic here, filter products based on searchQuery
  };

  const [showFilter, setShowFilter] = useState(false);
  const [openPicker, setOpenPicker] = useState(true);
  const [items, setItems] = useState([
    { label: "Categoria 1", value: "1" },
    { label: "Categoria 2", value: "2" },
    { label: "Categoria 3", value: "3" },
    // Add more categories as needed
  ]);
  const [value, setValue] = useState([]);

  const filterProducts = () => {
    setShowFilter(!showFilter);
    setOpenPicker(!openPicker);
    setValue([]);
  };

  const renderProductItem = ({ item }) => (
    <ProductItem item={item} isEdit={props.isEdit} isForSale={props.isForSale}/>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color="#aaa"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produto"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => filterProducts()}>
          <Ionicons
            name="filter"
            size={24}
            color="#aaa"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      

      {showFilter && (
        <View style={styles.filterContainer}>
          <DropDownPicker
            open={openPicker}
            value={value}
            setValue={setValue}
            setOpen={setOpenPicker}
            items={items}
            setItems={setItems}
            placeholder="Filtrar por categoria"
            multiple={true}
            mode="BADGE"
            badgeColors={["lightblue", "lightgreen", "lightcoral"]}
            containerStyle={{ height: 40 }}
            style={[styles.searchContainer, styles.dropDownPicker]}
            dropDownContainerStyle={styles.dropDownContainerStyle}

            onChangeItem={(item) => setFilter(item.value)}
          />
        </View>
      )}
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 60,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#333",
  },
  filterContainer: {
    marginBottom: 30,
  },
  dropDownPicker: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 15,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: "lightgray",
  },
  productList: {
    flexGrow: 1,
    paddingBottom: 130,
  },
});

export default ProductsList;
