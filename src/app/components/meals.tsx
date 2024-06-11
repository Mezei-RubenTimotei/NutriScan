import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import MealItem from "./mealItem";
import { mealType } from "../dataTypes/types";

type Props = {
  meals: mealType[];
};

const Meals = ({ meals }: Props) => {
  return (
    <View style={styles.mealsContainer}>
      <FlatList
        data={meals}
        renderItem={({ item }) => <MealItem mealItem={item} />}
        contentContainerStyle={styles.listMealsStyle}
      ></FlatList>
    </View>
  );
};

export default Meals;

const styles = StyleSheet.create({
  mealsContainer: {
    width: "87%",
    flex: 1,
    paddingBottom: 8,
  },
  listMealsStyle: {
    gap: 5,
  },
});
