import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import Spacing from "../components/Spacing";
import Macro from "../components/macros";
import Meal from "../components/mealItem";
import Meals from "../components/meals";
import AntDesign from "react-native-vector-icons/AntDesign";
import AddMeal from "../components/addMealButton";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AddMealModal from "../(modals)/addMealModal";
import Modal from "react-native-modal/dist/modal";
import DeleteModal from "../components/deleteModal";
import DeleteIcon from "../components/deleteIcon";
import { useAuth } from "../context/AuthContext";
import { useGetMeals } from "../hooks/use-getMeals";
import { useGetGoal } from "../hooks/use-getGoals";
import calculateProgress from "../helperFunctions/calculateProgress";
import { usePostMeal } from "../hooks/use-postMeal";
import { mealType } from "../dataTypes/types";

const today = () => {
  const [bar, setBar] = useState(0.2);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);
  const handleCloseBottomSheet = () => bottomSheetRef.current?.close();
  const [isModalVisible, setModalVisible] = useState(false);
  const { authState } = useAuth();
  const {
    data: meals,
    isError,
    isLoading: isLoadingMeals,
  } = useGetMeals(authState.authenticated);

  const { mutate: addMealMutation } = usePostMeal();
  const { data: userGoal, isLoading: loadingGoal } = useGetGoal(
    authState.authenticated
  );

  const handleCircleValue = (): number => {
    return Math.min(calculateProgress(meals).totalKCal, userGoal.totalKCal);
  };

  const handleRemainingKcal = () => {
    const kcalLeft = userGoal.totalKCal - calculateProgress(meals).totalKCal;
    return kcalLeft > 0 ? kcalLeft : 0;
  };

  const toggleModal = () => {
    setModalVisible(false);
  };

  const handleMacroLeft = (macroName: string): number => {
    if (!status) return 0;
    switch (macroName) {
      case "carbs":
        const carbsLeft =
          userGoal.carbohydrates - calculateProgress(meals).carbohydrates;
        return carbsLeft > 0 ? carbsLeft : 0;
      case "fats":
        const fatsLeft = userGoal.fats - calculateProgress(meals).fats;
        return fatsLeft > 0 ? fatsLeft : 0;
      case "proteins":
        const proteinsLeft =
          userGoal.proteins - calculateProgress(meals).proteins;
        return proteinsLeft > 0 ? proteinsLeft : 0;
      default:
        return 0;
    }
  };

  const handleProgressMacro = (macroName: string): number => {
    if (!status) return 0.5;
    switch (macroName) {
      case "carbs":
        return calculateProgress(meals).carbohydrates / userGoal.carbohydrates;
      case "fats":
        return calculateProgress(meals).fats / userGoal.fats;
      case "proteins":
        return calculateProgress(meals).proteins / userGoal.proteins;
      default:
        return 0;
    }
  };

  const status = !loadingGoal && !isLoadingMeals;

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.kcalCount}>
            <View style={styles.leftSide}>
              <Spacing space={13} />
              <Text style={styles.targetTitle}>Target</Text>
              <Spacing space={10} />
              <View style={styles.targetContainer}>
                <Image
                  source={require("./../../assets/iftar.png")}
                  style={styles.targetIconStyle}
                  resizeMode="contain"
                />
                <Text style={styles.countKcal}>{userGoal?.totalKCal ?? 0}</Text>
                <Text style={styles.kcal}>Kcal</Text>
              </View>
              <Spacing space={25} />
              <Text style={styles.targetTitle}>Left</Text>
              <Spacing space={8} />
              <View style={styles.targetContainer}>
                <Image
                  source={require("./../../assets/flame.png")}
                  style={styles.eatenIconStyle}
                  resizeMode="contain"
                />
                <Text style={styles.countKcal}>
                  {!status ? 0 : handleRemainingKcal()}
                </Text>
                <Text style={styles.kcal}>Kcal</Text>
              </View>
            </View>
            <View style={styles.rightSide}>
              {!status ? (
                <ActivityIndicator />
              ) : (
                <CircularProgress
                  radius={80}
                  value={handleCircleValue()}
                  maxValue={userGoal.totalKCal}
                  title="Kcal" //"Complete"
                  titleColor={"gray"}
                  titleStyle={{ fontWeight: "500" }}
                  activeStrokeColor={"#2465FD"}
                  activeStrokeSecondaryColor={"#C25AFF"}
                  inActiveStrokeOpacity={0.2}
                  initialValue={0}
                />
              )}
            </View>
          </View>
          <Spacing space={15} />
          <View style={styles.lineContainer}>
            <View style={styles.lineStyle}></View>
          </View>
          <Spacing space={30} />
          <View style={styles.bars}>
            <Macro
              name="carbs"
              progress={handleProgressMacro("carbs")}
              gramsLeft={handleMacroLeft("carbs")}
            />
            <Macro
              name="proteins"
              progress={handleProgressMacro("proteins")}
              color="#ff7c7c"
              gramsLeft={handleMacroLeft("proteins")}
            />
            <Macro
              name="fats"
              progress={handleProgressMacro("fats")}
              color="#ffbe5b"
              gramsLeft={handleMacroLeft("fats")}
            />
          </View>
        </View>
        <View style={styles.mealsTitleContainer}>
          <Text style={styles.mealsTodayTitle}>Meals today</Text>
          <AddMeal handleOpenBottomSheet={handleOpenBottomSheet} />
          <DeleteIcon setModalVisible={setModalVisible} />
        </View>
        {isLoadingMeals && <ActivityIndicator />}
        {isError && (
          <Text style={styles.erorrText}>
            A unexpected erorr has occured , please try again
          </Text>
        )}
        <Meals meals={meals} />
        <Modal
          isVisible={isModalVisible}
          backdropTransitionOutTiming={0}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
        >
          <DeleteModal toggleModal={toggleModal} />
        </Modal>
      </View>
      <AddMealModal
        ref={bottomSheetRef}
        handleCloseBottomSheet={handleCloseBottomSheet}
        addMealMutation={addMealMutation}
      />
    </GestureHandlerRootView>
  );
};

export default today;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    width: "100%",
    flex: 1,
  },
  mealsTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  mealsTodayTitle: {
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 25,
  },
  erorrText: {
    fontWeight: "600",
    fontSize: 20,
    padding: 10,
    color: "red",
  },
  kcalCount: {
    flexDirection: "row",
  },
  bars: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  lineContainer: {
    display: "flex",
    alignItems: "center",
  },
  lineStyle: {
    width: "90%",
    backgroundColor: "#D3D3D3",
    height: 1,
  },
  targetIconStyle: {
    width: 40,
    height: 40,
  },
  eatenIconStyle: {
    width: 30,
    height: 30,
  },
  targetTitle: {
    color: "gray",
    fontSize: 20,
  },
  targetContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  countKcal: {
    fontWeight: "bold",
    fontSize: 25,
  },
  kcal: {
    paddingLeft: 4,
    color: "gray",
    fontSize: 20,
  },
  leftSide: {
    paddingLeft: 20,
    height: 200,
    width: "50%",
  },
  rightSide: {
    width: "50%",
    paddingLeft: 10,
    justifyContent: "center",
  },
  box: {
    width: 355,
    height: 320,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
