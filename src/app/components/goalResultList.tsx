import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import MealItem from "./mealItem";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { goalResultType } from "../dataTypes/types";

type Props = {
  goalResult: goalResultType;
};

const ResultGoal = ({ goalResult }: Props) => {
  const displayProperty = (propName: string) => {
    if (propName == "carbohydrates") return "carbs";
    else if (propName == "totalKCal") return "Kcal";
    return propName;
  };
  return (
    <View style={styles.Container}>
      {Object.entries(goalResult).map(([key, value]) => (
        <View key={key} style={styles.line}>
          <Text style={styles.text}>{displayProperty(key)}</Text>
          <Text style={styles.text}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

export default ResultGoal;

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    paddingBottom: 8,
    alignItems: "center",
    gap: 10,
  },
  line: {
    flexDirection: "row",
    backgroundColor: "#afafaf",
    width: "60%",
    borderRadius: 15,
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: 600,
    paddingRight: 20,
  },
});
