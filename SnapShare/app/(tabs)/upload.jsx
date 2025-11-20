import { View, TextInput, Button, Image, StyleSheet, ImageBackground, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../constants/theme";

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  // Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload image + caption to API
  const uploadFeed = async () => {
    if (!image || !caption) {
      Alert.alert("Error", "Please select an image and write a caption.");
      return;
    }

    try {
      const owner = "User1"; // Replace with dynamic user if needed

      const response = await fetch("http://localhost:3000/api/feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: image,
          caption,
          owner,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Your feed has been uploaded!");
        setImage(null);
        setCaption("");
      } else {
        Alert.alert("Error", "Failed to upload feed");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://res.cloudinary.com/dwk5a3uaf/image/upload/v1763635394/ae0eac0db34582cb33c877e890f91f4e_rapxjc.jpg" }}
      style={styles.background}
      imageStyle={{ resizeMode: "cover", opacity: 0.25 }}
    >
      <View style={styles.container}>
        <Button title="PICK IMAGE" color={COLORS.primary} onPress={pickImage} />

        <TextInput
          style={styles.input}
          placeholder="Write caption"
          placeholderTextColor={COLORS.primary}
          value={caption}
          onChangeText={setCaption}
        />

        {image && (
          <Image
            source={{ uri: image }}
            style={styles.preview}
          />
        )}

        <View style={{ marginTop: 20 }}>
          <Button title="UPLOAD" color={COLORS.primary} onPress={uploadFeed} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 12,
    marginTop: 15,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    color: COLORS.textDark,
  },
  preview: {
    width: "50%",       // Centered box size
    height: 300,        // Rectangle like Instagram
    borderRadius: 15,
    marginTop: 20,
    resizeMode: "contain",
    alignSelf: "center", // Correct spelling for centering
    //backgroundColor: "#f0f0f0", // optional background for letterboxing
  },
});
