// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { SelectList } from "react-native-dropdown-select-list";
// import { router } from "expo-router";
// import {useGoal,useTime} from "./stores/pomodoro.js";
// export default function Home() {

//   const [time, setTime] = useState("");
//   const goal = useGoal((state) => state.goal);
//   const handlePress = () => {
//     if(!goal || !time) {
//       alert("Please enter your goal and select a time estimate.");
//       return;
//     }
//     useTime.getState().updateTime(time);
//     router.push("/pomodoro");
//     console.log("Goal:", goal);
//     console.log("Time estimate (minutes):", time);
//   }
//   return (
//     <View style={styles.page}>
//       <View style={styles.card}>
//         <Text style={styles.title}>
//           What's your Tiny{'\n'}Goal today?
//         </Text>

//         <Text style={styles.label}>Your Goal</Text>
//         <TextInput
//           value={goal}
//           onChangeText={(text) => useGoal.getState().updateGoal(text)}
//           placeholder="e.g., Drink a glass of water"
//           placeholderTextColor="#999"
//           style={styles.input}
//         />

//         <Text style={[styles.label, { marginTop: 18 }]}>Time estimate</Text>
//         <View style={styles.selectRow}>
//           <View style={styles.clockIcon}>
//             <Text>🕒</Text>
//           </View>
//           <View style={styles.pickerContainer}>
//             <SelectList
//               setSelected={setTime}
//               data={[
//                 { key: "5", value: "5 minutes" },
//                 { key: "10", value: "10 minutes" },
//                 { key: "15", value: "15 minutes" },
//                 { key: "30", value: "30 minutes" },
//                 {key: "60", value: "1 hour" },
//                 { key: "120", value: "2 hours" },
//                 {key: "240", value: "4 hours" },
//               ]}
//               placeholder="Select time..."
//               boxStyles={styles.selectBox}
//               inputStyles={styles.selectInput}
//               dropdownStyles={styles.dropdown}
//             />
//           </View>
//         </View>

//         <TouchableOpacity onPress={handlePress} style={styles.primaryButton}>
//           <Text style={styles.buttonText}>Let's Go 🚀</Text>
//         </TouchableOpacity>

//         <Text style={styles.footer}>Finish your current goal first, champ 😉</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: "#f6f5f4",
//     padding: 20,
//     justifyContent: "center",
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "#fbf7f5",
//     borderRadius: 18,
//     padding: 28,
//     borderWidth: 4,
//     borderColor: "rgba(0,0,0,0.9)",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.9,
//     shadowRadius: 0,
//     elevation: 8,
//   },
//   title: {
//     fontSize: 34,
//     lineHeight: 36,
//     textAlign: "center",
//     marginVertical: 6,
//     color: "#111",
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 14,
//     color: "#222",
//     marginBottom: 6,
//   },
//   input: {
//     padding: 18,
//     borderRadius: 28,
//     borderWidth: 4,
//     borderColor: "#111",
//     backgroundColor: "#fbf5ee",
//     fontSize: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 6, height: 6 },
//     shadowOpacity: 0.85,
//     shadowRadius: 0,
//     elevation: 6,
//   },
//   selectRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   clockIcon: {
//     backgroundColor: "#e9f7fb",
//     padding: 8,
//     borderRadius: 18,
//     borderWidth: 2,
//     borderColor: "rgba(0,0,0,0.08)",
//   },
//   pickerContainer: {
//     flex: 1,
//   },
//   selectBox: {
//     borderRadius: 28,
//     borderWidth: 4,
//     borderColor: "#111",
//     backgroundColor: "#fbf5ee",
//     paddingHorizontal: 18,
//     paddingVertical: 14,
//     shadowColor: "#000",
//     shadowOffset: { width: 6, height: 6 },
//     shadowOpacity: 0.85,
//     shadowRadius: 0,
//     elevation: 6,
//   },
//   selectInput: {
//     fontSize: 16,
//     color: "#111",
//   },
//   dropdown: {
//     borderRadius: 16,
//     borderWidth: 4,
//     borderColor: "#111",
//     backgroundColor: "#fbf5ee",
//     marginTop: 8,
//   },
//   primaryButton: {
//     marginTop: 18,
//     backgroundColor: "#FFD23F",
//     borderWidth: 4,
//     borderColor: "#111",
//     padding: 16,
//     borderRadius: 40,
//     shadowColor: "#000",
//     shadowOffset: { width: 6, height: 6 },
//     shadowOpacity: 0.85,
//     shadowRadius: 0,
//     elevation: 6,
//   },
//   buttonText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   footer: {
//     textAlign: "center",
//     color: "#e45",
//     marginTop: 18,
//     fontSize: 14,
//   },
// });
