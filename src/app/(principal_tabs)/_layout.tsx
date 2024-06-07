import { Tabs } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";

export default () => {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Tabs.Screen
          name="today"
          options={{
            tabBarLabel: "Today",

            tabBarIcon: ({ color }) => (
              <AntDesign
                name="carryout"
                color={color}
                style={{ fontSize: 24 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="goals"
          options={{
            tabBarLabel: "Goals",

            tabBarIcon: ({ color }) => (
              <AntDesign name="Trophy" color={color} style={{ fontSize: 24 }} />
            ),
          }}
        />
        <Tabs.Screen
          name="info"
          options={{
            tabBarLabel: "Info",

            tabBarIcon: ({ color }) => (
              <AntDesign
                name="camerao"
                color={color}
                style={{ fontSize: 24 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" color={color} style={{ fontSize: 24 }} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};
