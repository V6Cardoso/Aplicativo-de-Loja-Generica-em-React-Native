import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

import ProductModal from "../components/ProductModal";
import CategoryModal from "../components/categoryModal";

export const CustomButton = (
  props
) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: props.color }]}
    >
      <Text style={styles.text}>{props.text}</Text>
      <Icon name={props.icon} size={24} />
    </TouchableOpacity>
  );
};

const ManageScreen = ({ navigation }) => {
  let [showProductModal, setShowProductModal] = useState(false);
  let [showCategoryModal, setShowCategoryModal] = useState(false);

  const closeProductModalHandler = () => {
    setShowProductModal(false);
  };

  const dispatchPressProductEvent = () => {
    setShowProductModal(true);
  };

  const closeCategoryModalHandler = () => {
    setShowCategoryModal(false);
  }

  const dispatchPressCategoryEvent = () => {
    setShowCategoryModal(true);
  }

  return (
    <View style={styles.container}>
      <CustomButton
        text="Adicionar Produto"
        screen="AddProduct"
        icon="add-circle-outline"
        color="lightgreen"
        onPress={dispatchPressProductEvent}
      />
      <CustomButton
        text="Editar Produtos"
        icon="create-outline"
        color="lightyellow"
        onPress={() => navigation.navigate("EditProductsScreen")}
      />
      <CustomButton
        text="Gerenciar Categorias"
        icon="add-circle-outline"
        color="lightblue"
        onPress={dispatchPressCategoryEvent}
      />
      <CustomButton
        text="Lista de vendas"
        icon="list-outline"
        color="lightpink"
        onPress={() => navigation.navigate("SalesListScreen")}
      />
      <CustomButton
        text="Dashboard"
        icon="bar-chart-outline"
        color="lightgray"
        onPress={() => navigation.navigate("DashboardScreen")}
      />

      <ProductModal
        visible={showProductModal}
        onCancel={closeProductModalHandler}
        submitText="Adicionar Produto"
      />
      <CategoryModal
        visible={showCategoryModal}
        onCancel={closeCategoryModalHandler}
        submitText="Salvar Categorias"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
    paddingTop: 130,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  button: {
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
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
});

export default ManageScreen;
