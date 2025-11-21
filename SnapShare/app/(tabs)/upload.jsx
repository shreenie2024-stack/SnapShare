import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInUp } from "react-native-reanimated";

// Temporary local storage for uploads
export const localPosts = [];

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const savePost = () => {
    if (!image || !caption) return Alert.alert("Error", "Add image + caption");

    localPosts.unshift({
      imageUrl: image,
      caption,
      owner: "You",
    });

    Alert.alert("Success", "Post added!");
    setImage(null);
    setCaption("");
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Write caption..."
        placeholderTextColor="#00E5FF"
        value={caption}
        onChangeText={setCaption}
      />

      {image && (
        <Animated.Image
          entering={FadeInUp.duration(500)}
          source={{ uri: image }}
          style={styles.preview}
        />
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={savePost}>
        <Text style={styles.buttonText}>Save Post</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D", padding: 20 },
  pickButton: {
    backgroundColor: "#00E5FF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: "#005A66",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
  input: {
    borderWidth: 2,
    borderColor: "#00E5FF",
    padding: 12,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
  },
  preview: {
    width: "100%",
    height: 350,
    borderRadius: 15,
    marginTop: 20,
    resizeMode: "cover",
  },
});
