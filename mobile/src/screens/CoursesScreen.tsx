import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { aliApi } from '../api/aliApi';
import { useAuthStore } from '../store/authStore';

export default function CoursesScreen() {
  const [courses, setCourses] = useState<any[]>([]);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    // For demo purposes, we'll just mock courses since GET /courses isn't explicitly defined, only POST /users/{userId}/courses
    setCourses([
      { id: '1', title: 'Beginner English', level: 'beginner' },
      { id: '2', title: 'Advanced Grammar', level: 'advanced' },
    ]);
  }, []);

  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    try {
      await aliApi.enrollCourse(user.id, courseId);
      Alert.alert('Success', 'Enrolled in course successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to enroll');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text>Level: {item.level}</Text>
            <Button title="Enroll" onPress={() => handleEnroll(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 10 },
  courseTitle: { fontSize: 18, fontWeight: 'bold' }
});
