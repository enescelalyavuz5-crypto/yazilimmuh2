import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { aliApi } from '../api/aliApi';
import { useAuthStore } from '../store/authStore';

export default function ExamTakeScreen({ route, navigation }: any) {
  const { examId } = route.params;
  const user = useAuthStore(state => state.user);
  
  const handleSubmit = async () => {
    if (!user) return;
    try {
      // Mocking exam answers submission
      await aliApi.addExamResult(user.id, {
        examId,
        answers: [{ questionId: 'q1', selectedOption: 'A' }],
        score: 85
      });
      Alert.alert('Success', 'Exam submitted successfully');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit exam');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Taking Exam: {examId}</Text>
      <Text style={{ marginBottom: 20 }}>Question 1: What is the capital of France?</Text>
      <Button title="Submit Mock Result (85 points)" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }
});
