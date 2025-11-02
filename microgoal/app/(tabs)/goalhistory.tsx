import React, { useEffect, useState } from "react";
import { ListRenderItem } from 'react-native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useGoal } from "../stores/pomodoro.js"; // adjust path if needed
import { router } from "expo-router";
import { getCompletedGoals,getFailedGoals } from "../goalService.js";

interface Goal {
  title: string;
  date: string;
  status: 'completed' | 'failed';
}
export default  function GoalHistory() {
  // Example data — replace with your Zustand store if available
 
  const [completedGoals, setCompletedGoals] = useState<Goal[]>([]);
  const [failedGoals, setFailedGoals] = useState<Goal[]>([]);
  const [hasGoals, setHasGoals] = useState(false);
useEffect(() => {
    // 3. Define an async function *inside* useEffect
    const loadData = async () => {
      const completed = await getCompletedGoals() || [];
      const failed = await getFailedGoals() || [];
      
      // 4. Set your state with the results
      setCompletedGoals(completed);
      setFailedGoals(failed);
      setHasGoals(completed.length > 0 || failed.length > 0);
    };

    // 5. Call the async function
    loadData();
  }, []);
  

  const renderGoalItem:ListRenderItem<Goal> = ({ item }) => (
    <View
      style={[
        styles.goalCard,
        {
          backgroundColor: item.status === "completed" ? "#D5E8D4" : "#F8D7DA",
          borderColor: item.status === "completed" ? "#3C763D" : "#A94442",
        },
      ]}
    >
      <Text style={styles.goalTitle}>{item.title}</Text>
      <Text style={styles.goalTime}>{item.date}</Text>
      <Text style={styles.goalStatus}>
        {item.status === "completed" ? "✅ Completed" : "💔 Gave Up"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>

        <Text style={styles.headerTitle}>Goal History</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      {hasGoals ? (
        <FlatList
          data={[...completedGoals, ...failedGoals]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderGoalItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>No goals recorded yet</Text>
          
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAE4D8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 32,
    fontWeight: "bold",
  },
  headerTitle: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  goalCard: {
    backgroundColor: "white",
    borderWidth: 4,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  goalTime: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  goalStatus: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 20,
    color: "#555",
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#F4D35E",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
