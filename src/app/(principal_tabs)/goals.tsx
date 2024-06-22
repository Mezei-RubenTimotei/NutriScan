import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import SwitchButton from "../components/switchBtn";
import ToogleGoalOption from "../components/tripleToogle";
import BottomSheet from "@gorhom/bottom-sheet";
import ActivityBtn from "../components/activityBtn";
import SelectActivityModal from "../(modals)/selectActivityModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import tdeeCalculator from "../helperFunctions/tdeeCalculator";
import { goalResultType } from "../dataTypes/types";
import Meals from "../components/meals";
import ResultGoal from "../components/goalResultList";
import { useUpdateGoal } from "../hooks/use-updateGoal";

const Goal = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activity, setActivity] = useState("Select Item");
  const [goalOption, setGoalOption] = useState("Maintenance");
  const [goalResult, setGoalResult] = useState<goalResultType | null>(null);
  const bottomSheetModalRef = useRef<BottomSheet>(null);

  const { mutate, isSuccess } = useUpdateGoal();

  const handleOpenActivityBtn = () =>
    bottomSheetModalRef.current.snapToIndex(0);

  const handleCloseActivityBtn = () => bottomSheetModalRef.current.close();

  const handleSetGoal = (goalResult: goalResultType) => {
    mutate(goalResult);
    if (isSuccess) alert("you goal is set");
  };

  const handleReset = () => {
    setAge(0);
    setWeight(0);
    setHeight(0);
    setActivity("Select Item");
    setGoalResult(null);
  };

  const handleCalculate = () => {
    if (age && weight && height && activity != "Select Item") {
      setGoalResult(
        tdeeCalculator({ gender, age, weight, height, activity, goalOption })
      );
    }
  };

  useEffect(() => {
    if (goalResult) {
      handleCalculate();
    }
  }, [goalOption]);

  return (
    <GestureHandlerRootView>
      <View style={styles.bodyContainer}>
        <View style={styles.lineContainer}>
          <Text style={styles.name}>Gender</Text>
          <SwitchButton gender={gender} setGender={setGender} />
        </View>
        <View style={styles.lineContainer}>
          <Text style={styles.name}>Age</Text>
          <TextInput
            style={styles.input}
            value={age ? age.toString() : ""}
            onChangeText={(age) => setAge(parseInt(age))}
          />
        </View>
        <View style={styles.lineContainer}>
          <Text style={styles.name}>Weight</Text>
          <TextInput
            style={styles.input}
            placeholder="kg"
            placeholderTextColor={"#9c9c9c"}
            value={weight ? weight.toString() : ""}
            onChangeText={(weight) => setWeight(parseInt(weight))}
          />
        </View>
        <View style={styles.lineContainer}>
          <Text style={styles.name}>Height</Text>
          <TextInput
            style={styles.input}
            placeholder="cm"
            placeholderTextColor={"#9c9c9c"}
            value={height ? height.toString() : ""}
            onChangeText={(height) => setHeight(parseInt(height))}
          />
        </View>
        <View style={styles.lineContainer}>
          <Text style={styles.name}>Activity</Text>
          <ActivityBtn
            activity={activity}
            handleOpenActivityBtn={handleOpenActivityBtn}
          />
        </View>
        <ToogleGoalOption
          goalOption={goalOption}
          setGoalOption={setGoalOption}
        />

        {goalResult ? null : (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleCalculate}>
              <Text style={styles.buttonText}>Calculate</Text>
            </Pressable>
          </View>
        )}
        {goalResult ? (
          <>
            <ResultGoal goalResult={goalResult} />
            <View style={styles.buttonsContainer}>
              <View style={[styles.buttonContainer, { width: "40%" }]}>
                <Pressable style={styles.button} onPress={handleReset}>
                  <Text style={styles.buttonText}>Reset</Text>
                </Pressable>
              </View>
              <View style={[styles.buttonContainer, { width: "40%" }]}>
                <Pressable
                  style={styles.button}
                  onPress={() => handleSetGoal(goalResult)}
                >
                  <Text style={styles.buttonText}>Set Goal</Text>
                </Pressable>
              </View>
            </View>
          </>
        ) : null}
      </View>
      <SelectActivityModal
        ref={bottomSheetModalRef}
        activity={activity}
        setActivity={setActivity}
        handleCloseActivityBtn={handleCloseActivityBtn}
      />
    </GestureHandlerRootView>
  );
};

export default Goal;

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
    width: 140,
    justifyContent: "center",
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
