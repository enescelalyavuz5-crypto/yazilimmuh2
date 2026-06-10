import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { aliApi } from '../api/aliApi';
import { useAuthStore } from '../store/authStore';

export default function AIPracticeScreen() {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const user = useAuthStore(state => state.user);

  const handlePractice = async () => {
    if (!user) return;
    if (!text.trim()) return;
    try {
      const data = await aliApi.aiPractice({
        userId: user.id,
        text,
        practiceType: 'grammar'
      });
      setFeedback(data);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to practice');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Practice (+5 Points)</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write an English sentence..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Get AI Feedback" onPress={handlePractice} />
      
      {feedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.subtitle}>AI Feedback:</Text>
          <Text>{feedback.correctedText}</Text>
          <Text style={styles.explanation}>{feedback.explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, height: 100, marginBottom: 15, borderRadius: 5, textAlignVertical: 'top' },
  feedbackContainer: { marginTop: 20, padding: 15, backgroundColor: '#e6f7ff', borderRadius: 8 },
  subtitle: { fontWeight: 'bold', marginBottom: 5 },
  explanation: { marginTop: 10, fontStyle: 'italic' }
});
