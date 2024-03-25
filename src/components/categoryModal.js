import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ColorPicker from "react-native-wheel-color-picker";

import CustomModal from "./CustomModal";
import { Button } from "react-native-elements";

import { connect } from "react-redux";
import { setCategoriesList } from "../../context/actions/categoriesAction";

import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../Database/dbStore";

const CategoryModal = (props) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [name, setName] = useState("");
  const [currentColor, setCurrentColor] = useState("black");

  const onColorChangeComplete = (color) => {
    setCurrentColor(color);
  };

  const saveCategory = async () => {
    if (!name) {
      alert("Preencha o nome da categoria");
      return;
    }

    const category = {
      name: name,
      color: currentColor,
    };

    await addCategory(category);
    const categories = await getAllCategories();
    props.setCategoriesList(categories);
    setName("");
    setOpenPicker(false);
  };

  const removeCategory = async (category) => {
    await deleteCategory(category.id);
    const categories = await getAllCategories();
    props.setCategoriesList(categories);
  };

  return (
    <CustomModal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      submitText={props.submitText}
      cancelColor="gray"
      cancelColorRipple="gray"
      noSubmit
    >
      <View style={styles.container}>
        {!openPicker && (
          <>
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.text}
              showsVerticalScrollIndicator={false}
              data={props.categories}
              renderItem={({ item }) => (
                <View
                  style={[styles.categoryItem, { backgroundColor: item.color }]}
                >
                  <Text style={[styles.buttonContent]}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.buttonContent}
                    onPress={() => removeCategory(item)}
                  >
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              style={styles.addCategoryButtonContainer}
              onPress={() => {
                setOpenPicker(true);
              }}
            >
              <Text style={styles.addCategoryButton}>Adicionar Categoria</Text>
            </TouchableOpacity>
          </>
        )}
        {openPicker && (
          <View style={styles.addCategory}>
            <TextInput
              placeholder="Nome da Categoria"
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <ColorPicker
              color={currentColor}
              swatchesOnly={false}
              onColorChangeComplete={onColorChangeComplete}
              thumbSize={30}
              sliderSize={40}
              noSnap={false}
              row={true}
              swatchesLast={false}
              swatches={false}
              discrete={false}
              wheelLodingIndicator={<ActivityIndicator size={40} />}
              sliderLodingIndicator={<ActivityIndicator size={20} />}
              useNativeDriver={false}
              useNativeLayout={false}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={styles.addCategoryButtonContainer}
                onPress={() => {
                  setOpenPicker(false);
                }}
              >
                <Text style={styles.addCategoryButton}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addCategoryButtonContainer}
                onPress={() => {
                  saveCategory();
                }}
              >
                <Text style={styles.addCategoryButton}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    maxHeight: 600,
  },
  list: {
    marginBottom: 15,
    width: 350,
  },
  categoryItem: {
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
  buttonContent: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addCategory: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  addCategoryButtonContainer: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  addCategoryButton: {
    color: "white",
    fontSize: 16,
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
});

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategoriesList: (categories) => dispatch(setCategoriesList(categories)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryModal);
