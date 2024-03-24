import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react";

import CustomModal from "./CustomModal";

const CategoryModal = (props) => {
  return (
    <CustomModal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      submitText={props.submitText}
      cancelColor="gray"
      cancelColorRipple="gray"
      submitColor="skyblue"
      submitColorRipple="yellow"
    ></CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryModal;
