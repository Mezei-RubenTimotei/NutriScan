import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useRef } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";

interface Props {
  title?: string;
  handleOpenBottomSheet: () => void;
}

type Ref = BottomSheet;

const AddMeal = forwardRef<Ref, Props>(
  ({ title, handleOpenBottomSheet }, ref) => {
    return (
      <Pressable
        onPress={() => {
          handleOpenBottomSheet();
        }}
      >
        <AntDesign
          name="pluscircleo"
          style={{ fontSize: 24 }}
          color="royalblue"
        />
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default AddMeal;
