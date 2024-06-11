import { View, Text, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";

type Props = {
  setModalVisible: (boolean) => void;
};

const DeleteIcon = ({ setModalVisible }: Props) => {
  return (
    <Pressable
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <AntDesign
        name="delete"
        style={{ fontSize: 24, color: "red" }}
        color="royalblue"
      />
    </Pressable>
  );
};

export default DeleteIcon;
