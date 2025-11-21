import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const posts = [
  "https://picsum.photos/400?1",
  "https://picsum.photos/400?2",
  "https://picsum.photos/400?3",
  "https://picsum.photos/400?4",
  "https://picsum.photos/400?5",
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Image
          source={{ uri: "https://res.cloudinary.com/dwk5a3uaf/image/upload/v1763633006/profile_szgn9y.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>THE NATIONAL INSTITUTE OF ENGINEERING</Text>
        <Text style={styles.email}>2024nie@example.com</Text>
        <Text style={styles.uploads}>Uploads: {posts.length}</Text>
      </View>

      <FlatList
        data={posts}
        numColumns={3}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100)} style={styles.postBox}>
            <Image source={{ uri: item }} style={styles.postImage} />
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D", paddingTop: 40 },
  header: { alignItems: "center", marginBottom: 20 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#00E5FF",
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  email: { marginTop: 6, fontSize: 14, color: "#8A8A8A" },
  uploads: { marginTop: 8, fontSize: 16, color: "#00E5FF" },
  postBox: { width: "33%", aspectRatio: 1, padding: 2 },
  postImage: { width: "100%", height: "100%", borderRadius: 5 },
});
