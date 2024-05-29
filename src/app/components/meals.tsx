import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import MealItem from "./mealItem";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

const data = [
  {
    name: "pizza",
    calories: 350,
    distributor: "dominos",
  },
  {
    name: "jamon",
    calories: 250,
    distributor: "lidl",
  },
  {
    name: "banana",
    calories: 100,
    distributor: "kaufland",
  },
  {
    name: "banana",
    calories: 100,
    distributor: "kaufland",
  },
  {
    name: "banana",
    calories: 100,
    distributor: "kaufland",
  },
  {
    name: "banana",
    calories: 100,
    distributor: "kaufland",
  },
  {
    name: "banana",
    calories: 100,
    distributor: "kaufland",
  },
  {
    name: "banana",
    calories: 100,
    distributor: "kaufland",
  },
];

const Meals = () => {
  return (
    <View style={styles.mealsContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MealItem
            name={item.name}
            calories={item.calories}
            distributor={item.distributor}
          />
        )}
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
