import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";

type Props = {
  activity: string;
  handleOpenActivityBtn: () => void;
};

const ActivityBtn = ({ activity, handleOpenActivityBtn }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => handleOpenActivityBtn()}
      >
        <View style={styles.lineContainer}>
          <Text style={styles.text}>{activity}</Text>
          <AntDesign name="down" style={{ fontSize: 20 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    width: 150,
    height: 30,
  },
  touch: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "100%",
    height: "100%",
  },
  lineContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ActivityBtn;
