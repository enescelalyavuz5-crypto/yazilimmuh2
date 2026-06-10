import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { enesApi } from '../api/enesApi';
import { useAuthStore } from '../store/authStore';

export default function WordsScreen() {
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    try {
      const data = await enesApi.getWords();
      setWords(data.items || []); // Assuming paginated response has items
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (wordId: string) => {
    if (!user) return;
    try {
      await enesApi.addFavoriteWord(user.id, wordId);
      alert('Added to favorites');
    } catch (error) {
      alert('Failed to add');
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Words List</Text>
      <FlatList
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.word}>{item.english}</Text>
              <Text>{item.turkish}</Text>
            </View>
            <Button title="Favorite" onPress={() => handleAddFavorite(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  word: { fontSize: 18, fontWeight: 'bold' }
});
