import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextAlign } from "@shopify/react-native-skia";
import { useDeleteMeals } from "../hooks/use-deleteMeals";

type Props = {
  toggleModal: () => void;
};

const DeleteModal = ({ toggleModal }: Props) => {
  const [isDeleted, setIsDeleted] = useState(false);
  useDeleteMeals(isDeleted);
  const handleDelete = () => {
    setIsDeleted(true);
    toggleModal();
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Are you sure you want to delete all the meals?
        </Text>
        <View style={styles.buttonsContainer}>
          <Button title="Canel" onPress={toggleModal} />
          <Button title="Yes" onPress={handleDelete} color={"red"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 200,
    height: 110,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    top: "43%",
    left: "20%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  text: {
    fontSize: 16,
    paddingBottom: 5,
  },
});

export default DeleteModal;
