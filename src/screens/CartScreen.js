import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { removeFromCart } from "../../context/actions/cartAction";

import SellProductModal from "../components/SellProductModal";


const CartScreen = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [item, setItem] = useState({});

  useEffect(() => {
    setCartItems(props.cart);
    calculateTotalAmount(props.cart);
  }, [props.cart]);

  const calculateTotalAmount = (items) => {
    // Calculate total amount based on items
    let total = 0;
    items?.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  };

  
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const dispatchPressEvent = (item) => {
    setItem(item);
    setShowModal(true);
  };

  const renderCartItem = ({ item }) => (
    
    <View style={styles.cartItemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R${item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>
        Total: R${item.price * item.quantity}
      </Text>
      <TouchableOpacity onPress={() => dispatchPressEvent(item)}>
        <Ionicons name="create-outline" size={36} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.removeFromCart(item)}>
        <Ionicons name="trash-outline" size={36} color="red" />
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    // Implement your checkout logic
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartItemsList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>
          Total: R${totalAmount.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
      <SellProductModal
          product={item}
          visible={showModal}
          title={item.name}
          onCancel={closeModalHandler}
          submitText="Atualizar carrinho"
          isEdit
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 30,
    paddingBottom: 130,
  },
  cartItemsList: {
    paddingTop: 50,
    paddingBottom: 15,
  },
  cartItemContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
  },
  itemDetails: {
    flexDirection: "column",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#888",
  },
  totalAmountContainer: {
    position: "absolute",
    bottom: 80,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalAmountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#5cb85c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
