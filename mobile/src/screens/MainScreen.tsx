import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { enesApi } from '../api/enesApi';

export default function MainScreen({ navigation }: any) {
  const user = useAuthStore(state => state.user);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      enesApi.getStatistics(user.id).then(data => {
        setStats(data);
      }).catch(err => {
        console.error('Stats error:', err);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.firstName}!</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.subtitle}>Your Statistics</Text>
        {loading ? <ActivityIndicator /> : (
          <>
            <Text>Words Memorized: {stats?.wordsMemorized || 0}</Text>
            <Text>Lessons Completed: {stats?.lessonsCompleted || 0}</Text>
          </>
        )}
      </View>

      <View style={styles.menuContainer}>
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
        <View style={{ height: 10 }} />
        <Button title="Words" onPress={() => navigation.navigate('Words')} />
        <View style={{ height: 10 }} />
        <Button title="Lessons" onPress={() => navigation.navigate('Lessons')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  statsContainer: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 30 },
  menuContainer: { flex: 1 }
});
