import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [feeds, setFeeds] = useState([]);

  const fetchFeeds = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/feeds');
      const data = await response.json();
      setFeeds(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={feeds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.feedImage}
            />
            <Text style={styles.caption}>{item.caption}</Text>
            <Text style={styles.owner}>by {item.owner}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  postContainer: { marginBottom: 20 },
  feedImage: {
    width: '100%',
    aspectRatio: 1,      // Instagram-style square
    borderRadius: 15,
    resizeMode: 'cover',
  },
  caption: { marginTop: 8, fontSize: 16 },
  owner: { fontSize: 14, color: 'gray' },
});
