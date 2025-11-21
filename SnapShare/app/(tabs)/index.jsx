import React from "react";
import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { localPosts } from "./upload";

export default function Index() {
  const presetPosts = [
    { id: "1", imageUrl: "https://picsum.photos/800?1", caption: "Night sky vibes 🌌", owner: "Ava" },
    { id: "2", imageUrl: "https://picsum.photos/800?2", caption: "City dreams ✨", owner: "Liam" },
    { id: "3", imageUrl: "https://picsum.photos/800?3", caption: "Coffee run ☕", owner: "Zara" },
    { id: "4", imageUrl: "https://picsum.photos/800?4", caption: "Lost in thoughts 🌙", owner: "Noah" },
    { id: "5", imageUrl: "https://picsum.photos/800?5", caption: "Pastel skies 🌅", owner: "Mia" },
    { id: "6", imageUrl: "https://picsum.photos/800?6", caption: "Neon nights 🔥", owner: "Lucas" },
    { id: "7", imageUrl: "https://picsum.photos/800?7", caption: "Summer chill 🌴", owner: "Isla" },
    { id: "8", imageUrl: "https://picsum.photos/800?8", caption: "Cold breeze ❄️", owner: "Ethan" },
    { id: "9", imageUrl: "https://picsum.photos/800?9", caption: "Rainy roads 🌧️", owner: "Nora" },
    { id: "10", imageUrl: "https://picsum.photos/800?10", caption: "Lost in Kyoto 🏮", owner: "Kai" },
    { id: "11", imageUrl: "https://picsum.photos/800?11", caption: "Warm sunsets 🌞", owner: "Olive" },
    { id: "12", imageUrl: "https://picsum.photos/800?12", caption: "Long drives 🚘", owner: "Aiden" },
    { id: "13", imageUrl: "https://picsum.photos/800?13", caption: "Midnight coding 💻", owner: "Riya" },
    { id: "14", imageUrl: "https://picsum.photos/800?14", caption: "Study grind 📚", owner: "Jay" },
    { id: "15", imageUrl: "https://picsum.photos/800?15", caption: "Ocean waves 🌊", owner: "Ella" },
  ];

  // Combine uploaded local posts + preset posts
  const allPosts = [...localPosts, ...presetPosts];

  return (
    <View style={styles.container}>
      <FlatList
        data={allPosts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.delay(index * 70)} style={styles.post}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.caption}>
              <Text style={styles.owner}>{item.owner}: </Text>
              {item.caption}
            </Text>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D", padding: 10 },
  post: {
    marginBottom: 25,
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
  },
  caption: { marginTop: 8, fontSize: 15, paddingHorizontal: 10, color: "#FFFFFF" },
  owner: { fontWeight: "bold", color: "#00E5FF" },
});
