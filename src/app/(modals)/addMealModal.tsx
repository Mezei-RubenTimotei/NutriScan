import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { usePostMeal } from "../hooks/use-postMeal";
import { mealType } from "../dataTypes/types";

type Props = {
  handleCloseBottomSheet: () => void;
};

type Ref = BottomSheet;

const emptyMeal = {
  name: "",
  totalKCal: "",
  proteins: "",
  carbohydrates: "",
  fats: "",
};

const AddMealModal = forwardRef<Ref, Props>(
  ({ handleCloseBottomSheet }: Props, ref) => {
    const snapPoints = useMemo(() => ["65%", "80%"], []);
    const [meal, setMeal] = useState(emptyMeal);
    const { mutate } = usePostMeal();
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

    const validData = ({
      name,
      totalKCal,
      carbohydrates,
      proteins,
      fats,
    }: typeof emptyMeal) => {
      if (
        name != "" &&
        !isNaN(+totalKCal) &&
        !isNaN(+carbohydrates) &&
        !isNaN(+proteins) &&
        !isNaN(+fats)
      )
        return true;
      return false;
    };

    const handleAddMeal = () => {
      if (validData(meal)) {
        const mealToAdd: mealType = {
          name: meal.name,
          totalKCal: parseInt(meal.totalKCal),
          carbohydrates: parseInt(meal.carbohydrates),
          proteins: parseInt(meal.proteins),
          fats: parseInt(meal.fats),
        };
        mutate(mealToAdd);
        setMeal(emptyMeal);
        handleCloseBottomSheet();
      } else {
        alert("invalid data");
      }
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
            <BottomSheetTextInput
              style={styles.input}
              value={meal.name}
              onChangeText={(value) => setMeal({ ...meal, name: value })}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.name}>Kalories</Text>
            <BottomSheetTextInput
              style={styles.input}
              value={meal.totalKCal}
              onChangeText={(value) => setMeal({ ...meal, totalKCal: value })}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.name}>Proteins</Text>
            <BottomSheetTextInput
              style={styles.input}
              value={meal.proteins}
              onChangeText={(value) => setMeal({ ...meal, proteins: value })}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.name}>Carbs</Text>
            <BottomSheetTextInput
              style={styles.input}
              value={meal.carbohydrates}
              onChangeText={(value) =>
                setMeal({ ...meal, carbohydrates: value })
              }
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.name}>Fats</Text>
            <BottomSheetTextInput
              style={styles.input}
              value={meal.fats}
              onChangeText={(value) => setMeal({ ...meal, fats: value })}
            />
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
