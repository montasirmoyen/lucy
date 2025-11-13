import { Colors } from '@/constants/theme';
import { isOnboardingComplete } from '@/utils/storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingAndRedirect();
  }, []);

  const checkOnboardingAndRedirect = async () => {
    try {
      const completed = await isOnboardingComplete();
      if (completed) {
        router.replace('/(tabs)/methods');
      } else {
        router.replace('/onboarding');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      router.replace('/onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  const [fontsLoaded] = useFonts({
    'Font-Regular': require('../assets/fonts/Nunito/static/Nunito-Regular.ttf'),
    'Font-Bold': require('../assets/fonts/Nunito/static/Nunito-Bold.ttf'),
  });

  if (isLoading || !fontsLoaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.dark.tint} />
        </View>
      </GestureHandlerRootView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});