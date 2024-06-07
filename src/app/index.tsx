import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Link, Redirect, Tabs } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const Index = () => {
  return <Redirect href="profile" />;
};

export default Index;

const styles = StyleSheet.create({});
