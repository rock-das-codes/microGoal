
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SplashScreen, Stack, router } from "expo-router";

export default function RootLayout() {
    const [ready, setReady] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeen = await AsyncStorage.getItem("hasSeenOnboarding");
      setIsFirstLaunch(!hasSeen);
      setReady(true);
    };
    checkOnboarding();
  }, []);

 
useEffect(() => {
    if (ready) {
      if(isFirstLaunch){
        router.replace("/(onboardings)");
      }
      else{
        router.replace("/(tabs)/home");
      }
    }
},[ready]);
  
  return <Stack  screenOptions={{headerShown: false}}>

  </Stack>
}
