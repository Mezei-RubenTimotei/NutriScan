import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

type Props = {
  activity: string;
  setActivity: (val: string) => void;
  handleCloseActivityBtn: () => void;
};

type Ref = BottomSheet;

const SelectActivityModal = forwardRef<Ref, Props>(
  ({ activity, setActivity, handleCloseActivityBtn }: Props, ref) => {
    const snapPoints = useMemo(() => ["65%", "80%"], []);
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        ></BottomSheetBackdrop>
      ),
      []
    );

    const handleSelectActivity = (activityName: string) => {
      setActivity(activityName);
      setTimeout(() => handleCloseActivityBtn(), 400);
    };

    return (
      <BottomSheet
        snapPoints={snapPoints}
        ref={ref}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Activity level</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Pressable onPress={() => handleSelectActivity("sedentary")}>
            <View
              style={[
                styles.lineContainer,
                {
                  backgroundColor: activity == "sedentary" ? "#a5a5a5" : null,
                },
              ]}
            >
              <Text style={styles.name}>Sedentary (office job)</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => handleSelectActivity("light")}>
            <View
              style={[
                styles.lineContainer,
                { backgroundColor: activity == "light" ? "#a5a5a5" : null },
              ]}
            >
              <Text style={styles.name}>Light exercise (1-2 days/week)</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => handleSelectActivity("moderate")}>
            <View
              style={[
                styles.lineContainer,
                {
                  backgroundColor: activity == "moderate" ? "#a5a5a5" : null,
                },
              ]}
            >
              <Text style={styles.name}>Moderate exercise (3-5 days/week)</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => handleSelectActivity("heavy")}>
            <View
              style={[
                styles.lineContainer,
                { backgroundColor: activity == "heavy" ? "#a5a5a5" : null },
              ]}
            >
              <Text style={styles.name}>Heavy exercise (6-7 days/week)</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => handleSelectActivity("athlete")}>
            <View
              style={[
                styles.lineContainer,
                {
                  backgroundColor: activity == "athlete" ? "#a5a5a5" : null,
                },
              ]}
            >
              <Text style={styles.name}>Athlete (2x per day)</Text>
            </View>
          </Pressable>
        </View>
      </BottomSheet>
    );
  }
);

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
  },
  lineContainer: {
    flexDirection: "row",
    borderRadius: 15,
    paddingLeft: 20,
    height: 60,
    alignItems: "center",
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
    width: 100,
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
});

export default SelectActivityModal;
