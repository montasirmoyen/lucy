import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

export async function isOnboardingComplete(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error reading onboarding status:', error);
    return false;
  }
}

export async function setOnboardingComplete(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
  } catch (error) {
    console.error('Error saving onboarding status:', error);
  }
}

export async function getOnboardingAnswers(): Promise<Record<string, string> | null> {
  try {
    const value = await AsyncStorage.getItem('onboarding_answers');
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error reading onboarding answers:', error);
    return null;
  }
}

export async function saveOnboardingAnswers(answers: Record<string, string>): Promise<void> {
  try {
    await AsyncStorage.setItem('onboarding_answers', JSON.stringify(answers));
  } catch (error) {
    console.error('Error saving onboarding answers:', error);
  }
}

