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
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState(props.products);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    const filteredProducts = props.products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (items.length === 0 || items.map(x => x.value).includes(product.category))
    );
    setProducts(filteredProducts);
  }, [searchQuery, items]);

  

  const [showFilter, setShowFilter] = useState(false);
  const [openPicker, setOpenPicker] = useState(true);
  const [value, setValue] = useState([]);
  

  const filterProducts = () => {
    setShowFilter(!showFilter);
    setOpenPicker(!openPicker);
    setValue([]);
    setItems([]);
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
          onChangeText={(text) => setSearchQuery(text)}
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
            items={props.categories.map((category) => {
              return { label: category.name, value: category.id };
            }
            )}
            placeholder="Filtrar por categoria"
            multiple={true}
            mode="BADGE"
            badgeDotColors={props.categories.map((category) => category.color)}
            containerStyle={{ height: 40 }}
            style={[styles.searchContainer, styles.dropDownPicker]}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            onSelectItem={(x) => {setItems(x)}}
          />
        </View>
      )}

      {props.products.length !== 0 && (
        <FlatList
          data={products}
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
    categories: state.categories.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProductsList: (products) => dispatch(setProductsList(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
