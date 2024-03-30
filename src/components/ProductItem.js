import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";

import SellProductModal from "./SellProductModal";
import ProductModal from "./ProductModal";

import { connect } from "react-redux";

const ProductItem = (props) => {
  let [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const dispatchPressEvent = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.productItem}>
      <TouchableOpacity
        onPress={() => {
          if (props.isEdit || props.isForSale) {
            dispatchPressEvent();
          }
        }}
        style={styles.touchableOpacity}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.productName}>{props.item.name}</Text>
            <Text style={styles.productPrice}>R${props.item.price}</Text>
          </View>
          <View style={{ position: "absolute", right: 10, bottom: 0 }}>
            {props.item.category && (
              <Text
                style={[
                  styles.category,
                  {
                    backgroundColor: props.categories.find(
                      (category) => category.id === props.item.category
                    )?.color,
                  },
                ]}
              >
                {
                  props.categories.find(
                    (category) => category.id === props.item.category
                  )?.name
                }
              </Text>
            )}
          </View>
        </View>
        <View style={{ position: "absolute", right: 10, top: 10 }}>
          {props.isEdit && (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => props.onDelete(props.item)}>
                <Ionicons name="trash-outline" size={32} color="red" />
              </TouchableOpacity>
            </View>
          )}
          {props.isForSale && (
            <Ionicons name="pricetag-outline" size={24} color="green" />
          )}
        </View>
      </TouchableOpacity>

      {props.isForSale && (
        <SellProductModal
          product={props.item}
          visible={showModal}
          title={props.item.name}
          onCancel={closeModalHandler}
          submitText="Adicionar ao carrinho"
          isSell
        />
      )}
      {props.isEdit && (
        <ProductModal
          product={props.item}
          visible={showModal}
          onCancel={closeModalHandler}
          submitText="Atualizar Produto"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  touchableOpacity: {
    borderRadius: 10,
    padding: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#666",
  },
  category: {
    fontSize: 12,
    borderRadius: 5,
    color: "#000",
    padding: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  };
};

export default connect(mapStateToProps)(ProductItem);
