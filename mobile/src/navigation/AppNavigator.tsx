import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { View, Text, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

// Temporary placeholders until branches are merged
const AuthPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Auth Placeholder</Text>
  </View>
);

const HomePlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Placeholder</Text>
  </View>
);

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token == null ? (
          // Auth screens
          <Stack.Screen name="Auth" component={AuthPlaceholder} />
        ) : (
          // App screens
          <Stack.Screen name="Main" component={HomePlaceholder} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
