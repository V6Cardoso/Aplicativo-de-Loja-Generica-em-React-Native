import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../../context/actions/cartAction";
import { setProductsList } from "../../context/actions/productsAction";

import CustomModal from "./CustomModal";

import {addProduct, updateProduct, getAllProducts} from "../Database/dbStore";

const ProductModal = (props) => {
  const [openPicker, setOpenPicker] = useState(false);

  const [name, setName] = useState(props?.product?.name);
  const [price, setPrice] = useState(props?.product?.price?.toString());
  const [category, setCategory] = useState(props?.product?.category);
  const [description, setDescription] = useState(props?.product?.description);


  const saveProduct = async () => {
    if (!name || !price || !category || !description) {
      alert("Preencha todos os campos");
      return;
    }

    const product = {
      id: props.product?.id,
      name,
      price: parseFloat(price),
      category,
      description,
    };

    if (props.product) {
      product.id = props.product.id;
      await updateProduct(product);
    } else {
      await addProduct(product);
    }

    const products = await getAllProducts();
    props.setProductsList(products);
    clearFields();
    props.onCancel();
  };

  const clearFields = () => {
    if(props.product) // If it's an update, don't clear the fields
      return;
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
  }

  return (
    <CustomModal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      submitText={props.submitText}
      cancelColor="gray"
      cancelColorRipple="gray"
      submitColor="green"
      submitColorRipple="darkgreen"
      onSubmit={saveProduct}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.text}>Preço</Text>
        <TextInput
          style={styles.input}
          inputMode="decimal"
          value={price}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
        />
        <Text style={styles.text}>Categoria</Text>
        <DropDownPicker
          open={openPicker}
          value={category}
          items={props.categories.map((category) => {
            return { label: category.name, value: category.id };
          })}
          placeholder="Selecione a categoria"
          setOpen={setOpenPicker}
          setValue={setCategory}
          style={[styles.input, styles.dropDownPicker]}
          dropDownContainerStyle={styles.dropDownContainerStyle}
        />

        <Text style={styles.text}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
    </CustomModal>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    categories: state.categories.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    setProductsList: (products) => dispatch(setProductsList(products)),
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    marginBottom: 10,
    width: 300,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
    lineHeight: 20,
  },
  dropDownPicker: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dropDownContainerStyle: {
    width: 300,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderWidth: 1,
  },

  textArea: {
    height: 150,
    textAlignVertical: "top",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
