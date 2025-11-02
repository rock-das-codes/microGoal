import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native';
import { AppState } from "react-native";
import Svg, { Circle } from 'react-native-svg';
import { useGoal } from './stores/pomodoro.js';
import { router } from 'expo-router';
import { useTime } from './stores/pomodoro.js';
const { width } = Dimensions.get('window');
import {markGoalDone,markGoalFailed,deleteGoal} from './goalService.js';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
export default function MyTinyGoal() {
  const [timeRemaining, setTimeRemaining] = useState(useTime((state) => parseInt(state.time) * 60 || 0));
  const [progress, setProgress] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const initialTime = useTime((state) => parseInt(state.time) * 60 || 0);
  const goal = useGoal((state) => state.goal);
  const resetGoal = useGoal((state) => state.resetGoal); // if you have this in store
  const deleteGoal = useGoal((state) => state.deleteGoal); // optional — for later use

useEffect(() => {
  const totalTime = parseInt(useTime.getState().time) * 60 || 0;
  if (totalTime <= 0) return;

  // Calculate or store end time once
  const endTime = Date.now() + totalTime * 1000;
  useTime.setState({ endTime }); // optional if you want persistence

  const updateRemaining = () => {
    const now = Date.now();
    const diff = Math.max(0, Math.floor((endTime - now) / 1000));
    setTimeRemaining(diff);

    const progress = ((totalTime - diff) / totalTime) * 100;
    setProgress(progress);

    if (diff <= 0) clearInterval(interval);
  };

  // Run immediately and then every second
  updateRemaining();
  const interval = setInterval(updateRemaining, 1000);

  // When app state changes (background/foreground)
  const subscription = AppState.addEventListener("change", (state) => {
    if (state === "active") {
      updateRemaining(); // recalc when returning to foreground
    }
  });

  return () => {
    clearInterval(interval);
    subscription.remove();
  };
}, []);

  const formatTime = (seconds:number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const  handleSubmit = async () => {
    alert('Congratulations on completing your Tiny Goal! 🎉');
    await markGoalDone(useGoal.getState().id);
    goal && useGoal.getState().addCompletedGoal({ title: goal, date: new Date().toLocaleString(), status: 'completed' });
    router.push('/');
  }
  const  handleMenuOption = async (option:string) => {
    setMenuVisible(false);
    if (option === 'sorry') {
      alert("It's okay! You can always try again 💪");
      await markGoalFailed(useGoal.getState().id);
      goal && useGoal.getState().addGaveupGoal({ title: goal, date: new Date().toLocaleString(), status: 'gaveup' });
      router.push('/');
    } else if (option === 'reset') {
      resetGoal?.();
      goal && useGoal.getState().updateGoal(goal);
      useTime.getState().updateTime(((initialTime / 60 ).toString()));
    
      setTimeRemaining(initialTime);
      alert('Goal has been reset!');
    } else if (option === 'delete') {
      await deleteGoal(useGoal.getState().id);
      deleteGoal?.();
      router.push('/');
    }
  };

  const radius = 140;
  const circumference = 2 * Math.PI * radius;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.iconButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Tiny Goal</Text>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.iconButton}>
            <Text style={styles.menuIcon}>⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Modal */}
        <Modal
          transparent
          visible={menuVisible}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setMenuVisible(false)}
          >
            <View style={styles.menuBox}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuOption('sorry')}
              >
                <Text style={styles.menuText}>😔 Sorry I gave up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuOption('reset')}
              >
                <Text style={styles.menuText}>🔁 Reset the goal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuOption('delete')}
              >
                <Text style={[styles.menuText, { color: 'red' }]}>🗑️ Delete this goal</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Goal Card */}
          <View style={styles.goalCardContainer}>
            <View style={styles.goalCard}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          </View>

          {/* Circular Timer */}
          <View style={styles.timerContainer}>
            <Svg width={320} height={320} viewBox="0 0 320 320">
              <Circle
                cx="160"
                cy="160"
                r={radius}
                stroke="#A8D5E2"
                strokeWidth="20"
                fill="none"
              />
              <Circle
                cx="160"
                cy="160"
                r={radius}
                stroke="#000"
                strokeWidth="20"
                fill="none"
                strokeDasharray={`${circumference * (progress / 100)} ${circumference * (1 - progress / 100)}`}
                strokeDashoffset={10}
                rotation="-90"
                origin="160, 160"
                strokeLinecap="butt"
              />
            </Svg>

            <View style={styles.centerContent}>
              <View style={styles.rocketContainer}>
                <Text style={styles.rocketEmoji}>🚀</Text>
              </View>
              <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
            </View>
          </View>

          {/* Message */}
          <Text style={styles.messageText}>
            Finish before the roast timer ends 🔥
          </Text>

          {/* Mark as Done Button */}
          <TouchableOpacity onPress={handleSubmit} style={styles.doneButton} activeOpacity={0.8}>
            <Text style={styles.doneButtonText}>Mark as Done ✅</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAE4D8' },
  content: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconButton: { padding: 8 },
  backIcon: { fontSize: 32, fontWeight: 'bold' },
  menuIcon: { fontSize: 32, fontWeight: 'bold' },
  headerTitle: { marginTop: 40, fontSize: 24, fontWeight: 'bold' },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  goalCardContainer: { width: '100%', maxWidth: 400, marginBottom: 60 },
  goalCard: {
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 25,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  goalText: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  timerContainer: {
    width: 320,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  centerContent: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  rocketContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#E8D9C0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  rocketEmoji: { fontSize: 48 },
  timerText: { fontSize: 48, fontWeight: 'bold' },
  messageText: { fontSize: 20, textAlign: 'center', color: '#555', marginBottom: 30 },
  doneButton: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#F4D35E',
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  doneButtonText: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },

  // Menu styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  menuBox: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    paddingVertical: 14,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
