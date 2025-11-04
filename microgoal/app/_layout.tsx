import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SplashScreen, Stack, router } from "expo-router";
import { useFonts } from 'expo-font'; // <-- 1. You MUST import useFonts

// 2. Call this *outside* the component
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 3. Set up all your loading states
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  
  // 4. Load your fonts
  const [fontsLoaded, fontError] = useFonts({
    // 'Your-Font-Name': require('../assets/fonts/Your-Font.ttf'),
    // 'Your-Other-Font': require('../assets/fonts/Your-Other-Font.ttf'),
    // ^^^ ADD YOUR FONTS HERE
  });

  // 5. This effect checks onboarding status
  useEffect(() => {
    async function checkOnboarding() {
      const hasSeen = await AsyncStorage.getItem("hasSeenOnboarding");
      setIsFirstLaunch(!hasSeen);
    }
    checkOnboarding();
  }, []); // <-- This runs once

  // 6. This effect waits for ALL loading to finish
  useEffect(() => {
    // Check if fonts are loaded (or errored) AND if the storage check is done
    if ((fontsLoaded || fontError) && isFirstLaunch !== null) {
      
      // 7. Hide the splash screen NOW that everything is ready
      SplashScreen.hideAsync();

      // 8. Navigate to the correct screen
      if (isFirstLaunch) {
        // Make sure you have a file at app/(onboardings)/index.js
        router.replace("/(onboardings)"); 
      } else {
        // Make sure you have a layout at app/(tabs)/_layout.js
        router.replace("/home"); 
      }
    }
  }, [fontsLoaded, fontError, isFirstLaunch]); // <-- Runs when any of these change

  // 9. While loading, show nothing (the splash screen is still visible)
  if (!fontsLoaded && !fontError) {
    return null;
  }
  if (isFirstLaunch === null) {
    return null;
  }
  
  // 10. When loaded, render the Stack
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define your stack screens here if not using groups */}
      <Stack.Screen name="(onboardings)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}