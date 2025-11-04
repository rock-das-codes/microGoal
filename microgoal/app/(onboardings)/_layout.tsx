import { Stack } from 'expo-router';

// This defines the (onboardings) group as its own 
// stack navigator.
export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}