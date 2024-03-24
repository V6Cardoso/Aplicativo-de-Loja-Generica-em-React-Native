import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



import ProductsList from '../components/ProductsList';

const EditProductsScreen = () => {

  return (
    <View style={styles.container}>
      <ProductsList isEdit/>


      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
  },
});



export default EditProductsScreen;