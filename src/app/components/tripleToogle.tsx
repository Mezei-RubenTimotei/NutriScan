import { useState } from "react";
import { View, StyleSheet } from "react-native";
import MultiSwitch from "react-native-multiple-switch";

type Props = {
  goalOption: string;
  setGoalOption: (name: string) => void;
};

const ToogleGoalOption = ({ goalOption, setGoalOption }: Props) => {
  const items = ["Bulk", "Maintenance", "Cut"];

  return (
    <MultiSwitch
      items={items}
      value={goalOption}
      onChange={(val) => setGoalOption(val)}
      containerStyle={{
        backgroundColor: "#5783db",
        height: 40,
      }}
      sliderStyle={{
        backgroundColor: "#13b8eb",
      }}
      textStyle={{
        color: "#ffffff",
        fontSize: 18,
      }}
    />
  );
};

export default ToogleGoalOption;
