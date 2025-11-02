import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Start with a tiny step.</Text>
        <Text style={styles.subtitle}>
          Focus on one small, achievable goal at a time. Celebrate the little victories!
        </Text>
      </View>

      {/* Page Indicator */}
      {/* <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View> */}

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Let's Go!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F0',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#000',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#F4D35E',
  },
  button: {
    backgroundColor: '#F4D35E',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
