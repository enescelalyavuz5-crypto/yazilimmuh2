import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { View, Text, ActivityIndicator, Button } from 'react-native';

import AliMainScreen from '../screens/AliMainScreen';
import CoursesScreen from '../screens/CoursesScreen';
import ExamsScreen from '../screens/ExamsScreen';
import ExamTakeScreen from '../screens/ExamTakeScreen';
import CertificatesScreen from '../screens/CertificatesScreen';
import AIPracticeScreen from '../screens/AIPracticeScreen';

const Stack = createNativeStackNavigator();

const MockAuthScreen = () => {
  const setAuth = useAuthStore(state => state.setAuth);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Mock Login for Ali's Branch</Text>
      <Button 
        title="Mock Login" 
        onPress={() => setAuth('mock-token', { id: 'user1', email: 'ali@example.com', firstName: 'Ali', lastName: 'Seker', englishLevel: 'beginner' })} 
      />
    </View>
  );
};

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
          <Stack.Screen name="Auth" component={MockAuthScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Main" component={AliMainScreen} options={{ title: 'FluentBee' }} />
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
