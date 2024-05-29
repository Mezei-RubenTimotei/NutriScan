import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import propTypes from "prop-types";

function Spacing({
  space = 10,
  horizontal = false,
  backgroundColor = "transparent",
}: propTypes) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        spacerStyle: {
          [horizontal ? "width" : "height"]: space,
          backgroundColor: backgroundColor || "transparent",
        },
      }),
    [horizontal, space, backgroundColor]
  );

  return <View style={[styles.spacerStyle]} />;
}

type propTypes = {
  space: number | string;
  horizontal?: boolean;
  backgroundColor?: string;
};

export default Spacing;
