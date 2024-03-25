import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

import ProductItem from "../components/ProductItem";

import {deleteProduct, getAllProducts} from "../Database/dbStore";

import { connect } from "react-redux";
import { setProductsList } from "../../context/actions/productsAction";

const ProductsList = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const showDeleteProductAlert = (product) => {
    Alert.alert(
      "Deletar produto",
      `Tem certeza que deseja deletar o produto ${product.name}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Sim", onPress: () => deleteProductHandler(product) },
      ]
    );
  };

  const deleteProductHandler = async (product) => {
    await deleteProduct(product.id);
    const products = await getAllProducts();
    props.setProductsList(products);
  };

  const renderProductItem = ({ item }) => (
    <ProductItem
      item={item}
      isEdit={props.isEdit}
      isForSale={props.isForSale}
      onDelete={showDeleteProductAlert}
    />
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

      {props.products.length !== 0 && (
        <FlatList
          data={props.products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      )}
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

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProductsList: (products) => dispatch(setProductsList(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
