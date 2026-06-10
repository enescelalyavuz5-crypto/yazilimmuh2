import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuthStore } from '../store/authStore';

export default function AliMainScreen({ navigation }: any) {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ali's Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, {user?.firstName || 'User'}!</Text>

      <View style={styles.menuContainer}>
        <Button title="Courses" onPress={() => navigation.navigate('Courses')} />
        <View style={{ height: 10 }} />
        <Button title="Exams" onPress={() => navigation.navigate('Exams')} />
        <View style={{ height: 10 }} />
        <Button title="Certificates" onPress={() => navigation.navigate('Certificates')} />
        <View style={{ height: 10 }} />
        <Button title="AI Practice" onPress={() => navigation.navigate('AIPractice')} />
      </View>

      <View style={{ marginTop: 40 }}>
        <Button title="Logout" color="red" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  menuContainer: { flex: 1 }
});
