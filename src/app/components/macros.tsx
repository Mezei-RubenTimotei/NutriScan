import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import React from "react";

type macroProps = {
  name: string;
  progress: number;
  color?: string;
  gramsLeft: number;
};

const Macro = ({ name, progress, color, gramsLeft }: macroProps) => {
  return (
    <View style={styles.macro}>
      <Text style={styles.macroNameText}>{name}</Text>
      <Progress.Bar
        progress={progress}
        width={70}
        animated={true}
        animationType="timing"
        color={color}
      />
      <Text style={styles.macroLeft}>{gramsLeft}g left</Text>
    </View>
  );
};

export default Macro;

const styles = StyleSheet.create({
  macro: {
    flexDirection: "column",
  },
  macroNameText: {
    fontSize: 15,
    fontWeight: 600,
    paddingBottom: 4,
  },
  macroLeft: {
    color: "gray",
    paddingTop: 4,
    fontSize: 13,
  },
});
