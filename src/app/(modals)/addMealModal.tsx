import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

type Props = {
  handleCloseBottomSheet: () => void;
};

type Ref = BottomSheet;

const AddMealModal = forwardRef<Ref, Props>(
  ({ handleCloseBottomSheet }: Props, ref) => {
    const snapPoints = useMemo(() => ["65%", "80%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        ></BottomSheetBackdrop>
      ),
      []
    );

    const handleAddMeal = () => {
      // add in data
      handleCloseBottomSheet();
    };

    return (
      <BottomSheet
        snapPoints={snapPoints}
        ref={ref}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Meal Info</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.lineContainer}>
            <Text style={styles.name}>Name</Text>
            <BottomSheetTextInput style={styles.input} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.name}>Kalories</Text>
            <BottomSheetTextInput style={styles.input} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.name}>Proteins</Text>
            <BottomSheetTextInput style={styles.input} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.name}>Carbs</Text>
            <BottomSheetTextInput style={styles.input} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.name}>Fats</Text>
            <BottomSheetTextInput style={styles.input} />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleAddMeal}>
              <Text style={styles.buttonText}>Add</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  bodyContainer: {
    paddingTop: 25,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 30,
  },
  lineContainer: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 600,
    paddingRight: 20,
  },
  input: {
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    width: 140,
    lineHeight: 20,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 100,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "black",
  },
  buttonText: {
    alignItems: "center",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default AddMealModal;
