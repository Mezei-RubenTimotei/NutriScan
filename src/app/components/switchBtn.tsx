import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

type Props = {
  gender: string;
  setGender: (name: string) => void;
};

const SwitchButton = ({ gender, setGender }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <TouchableOpacity
          style={[
            styles.touch,
            { backgroundColor: gender == "male" ? "#0092ff" : "white" },
          ]}
          onPress={() => setGender("male")}
        >
          <Text
            style={[styles.text, { color: gender == "male" ? "#fff" : "#000" }]}
          >
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.touch,
            { backgroundColor: gender == "female" ? "pink" : "white" },
          ]}
          onPress={() => setGender("female")}
        >
          <Text
            style={[
              styles.text,
              { color: gender == "female" ? "#fff" : "#000" },
            ]}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    width: 200,
  },
  btn: {
    width: "100%",
    height: 30,
    borderWidth: 0.5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "3%",
    paddingBottom: "1%",
    paddingTop: "1%",
    paddingRight: "3%",
  },
  touch: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "90%",
    borderRadius: 15,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default SwitchButton;
