import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { enesApi } from '../api/enesApi';

export default function ProfileScreen() {
  const { user, token, setAuth, logout } = useAuthStore();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [password, setPassword] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');

  const handleUpdateProfile = async () => {
    if (!user) return;
    try {
      const updatedUser = await enesApi.updateProfile(user.id, {
        firstName,
        lastName,
        password: password ? password : undefined
      });
      // Update local store with new user info
      if (token) await setAuth(token, updatedUser);
      Alert.alert('Success', 'Profile updated');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Update failed');
    }
  };

  const handleUpdateGoal = async () => {
    if (!user) return;
    try {
      await enesApi.updateStudyGoal(user.id, parseInt(dailyGoal, 10));
      Alert.alert('Success', 'Study goal updated');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Email: {user?.email}</Text>
      
      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="New Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Update Profile" onPress={handleUpdateProfile} />

      <View style={{ marginTop: 20 }}>
        <Text style={styles.subtitle}>Study Goal</Text>
        <TextInput style={styles.input} placeholder="Daily Goal (minutes)" value={dailyGoal} onChangeText={setDailyGoal} keyboardType="numeric" />
        <Button title="Update Goal" onPress={handleUpdateGoal} />
      </View>

      <View style={{ marginTop: 40 }}>
        <Button title="Logout" color="red" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});
