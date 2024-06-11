import { View, Text, StyleSheet, LayoutChangeEvent } from "react-native";
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { mealType } from "../dataTypes/types";

type mealProps = {
  mealItem: mealType;
};

const MealItem = ({ mealItem }: mealProps) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);

  const handleItemPress = () => {
    setExpanded(!expanded);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;

    if (layoutHeight > 0 && layoutHeight != height) setHeight(layoutHeight);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = expanded ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight,
    };
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleItemPress}>
        <Text style={styles.name}>{mealItem.name}</Text>
        <Text style={styles.details}>{mealItem.totalKCal} kcal</Text>
      </TouchableWithoutFeedback>
      <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
        <View onLayout={onLayout} style={{ position: "absolute" }}>
          <Text style={styles.detailsTitle}>Details</Text>
          <View style={styles.macrosContainer}>
            <Text style={styles.macroText}>
              Proteins {mealItem.proteins}g ,
            </Text>
            <Text style={styles.macroText}>Fats {mealItem.fats}g ,</Text>
            <Text style={styles.macroText}>
              Carbs {mealItem.carbohydrates}g
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gainsboro",
    padding: 10,
    borderRadius: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  details: {
    color: "dimgray",
  },
  detailsTitle: {
    paddingTop: 10,
    paddingBottom: 4,
    fontSize: 17,
    fontStyle: "italic",
    fontWeight: "400",
  },
  macrosContainer: {
    paddingLeft: 10,
    flexDirection: "row",
    columnGap: 10,
  },
  macroText: {
    fontSize: 15,
    color: "dimgray",
  },
});
