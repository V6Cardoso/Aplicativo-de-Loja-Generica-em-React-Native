import React, { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";

import { connect } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../context/actions/cartAction";

import CustomModal from "./CustomModal";

const SellProductModal = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setQuantity(props.product.quantity ? props.product.quantity : 1);
  }, [props.product]);

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const decreaseQuantity = () => {
    if (isNaN(quantity)) setQuantity(1);

    if (quantity > 1) setQuantity(parseInt(quantity) - 1);
  };

  const increaseQuantity = () => {
    if (isNaN(quantity) || quantity === "") setQuantity(1);
    else setQuantity(parseInt(quantity) + 1);
  };

  useEffect(() => {
    setTotalPrice(props.product.price * quantity);
  }, [quantity, props.product]);

  const UpdateCart = () => {
    if (isNaN(quantity) || quantity < 1 || quantity % 1 !== 0) {
      Alert.alert(
        "Quantidade inválida",
        "A quantidade deve ser um inteiro maior que 0",
        [{ text: "Entendi" }]
      );
      return;
    }
    const { product, addToCart, updateQuantity, onCancel } = props;
    const updatedProduct = { ...product, quantity: parseInt(quantity) };

    if (props.isEdit) {
      updateQuantity(updatedProduct);
    } else if (props.isSell) {
      addToCart(updatedProduct);
    }
    onCancel();
  };

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
      onSubmit={UpdateCart}
    >
      <View style={styles.modalContent}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {props.product.category && (
            <Text
              style={[
                styles.category,
                { backgroundColor: props.categories.find((category) => category.id === props.product.category)?.color },
              ]}
            >
              {props.categories.find((category) => category.id === props.product.category)?.name}
            </Text>
          )}
        </View>
        <View style={styles.modalView}>
          <Text style={styles.description}>{props.product.description}</Text>
        </View>
        <Text style={styles.modalPriceText}>R$ {props.product.price}</Text>
        <View style={styles.quantityContainer}>
          <Pressable onPress={decreaseQuantity}>
            <Text style={styles.quantityButton}>-</Text>
          </Pressable>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={handleQuantityChange}
          />
          <Pressable onPress={increaseQuantity}>
            <Text style={styles.quantityButton}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.modalTotalPriceText}>Total: R$ {totalPrice.toFixed(2)}</Text>
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
    updateQuantity: (product) => dispatch(updateQuantity(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
  };
};

const styles = StyleSheet.create({
  modalContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalPriceText: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
  },
  modalTotalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalView: {
    marginBottom: 10,
  },
  category: {
    fontSize: 12,
    borderRadius: 5,
    padding: 5,
    marginVertical: 15,
  },
  description: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 70,
    padding: 10,
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "lightgray",
  },
  quantityInput: {
    width: 200,
    fontSize: 18,
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SellProductModal);
