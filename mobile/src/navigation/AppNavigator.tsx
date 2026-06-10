import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { View, ActivityIndicator } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WordsScreen from '../screens/WordsScreen';
import LessonsScreen from '../screens/LessonsScreen';

import CoursesScreen from '../screens/CoursesScreen';
import ExamsScreen from '../screens/ExamsScreen';
import ExamTakeScreen from '../screens/ExamTakeScreen';
import CertificatesScreen from '../screens/CertificatesScreen';
import AIPracticeScreen from '../screens/AIPracticeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, restoreToken } = useAuthStore();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      await restoreToken();
      setIsReady(true);
    };
    bootstrapAsync();
  }, [restoreToken]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token == null ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainScreen} options={{ title: 'FluentBee' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Words" component={WordsScreen} />
            <Stack.Screen name="Lessons" component={LessonsScreen} />
            <Stack.Screen name="Courses" component={CoursesScreen} />
            <Stack.Screen name="Exams" component={ExamsScreen} />
            <Stack.Screen name="ExamTake" component={ExamTakeScreen} options={{ title: 'Take Exam' }} />
            <Stack.Screen name="Certificates" component={CertificatesScreen} />
            <Stack.Screen name="AIPractice" component={AIPracticeScreen} options={{ title: 'AI Practice' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
