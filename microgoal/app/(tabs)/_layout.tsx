import React, { use, useEffect } from "react";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { initDB } from '../db.js';
export default function Layout() {
    useEffect(() => {
    initDB();
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={28}
                color={focused ? "#000" : "#777"}
              />
             
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="goalhistory"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? "time" : "time-outline"}
                size={28}
                color={focused ? "#000" : "#777"}
              />
            
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: "#F4D35E",
    borderRadius: 40,
    height: 70,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    marginTop: 2,
  },
  iconTextFocused: {
    color: "#000",
  },
});
