import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://res.cloudinary.com/dwk5a3uaf/image/upload/v1763633006/profile_szgn9y.jpg" }}  // Your uploaded swan image file
        style={styles.profileImage}
      />
      <Text style={styles.name}>THE NATIONAL INSTITUTE OF ENGINEERING</Text>
      <Text style={styles.email}>2024nie@example.com</Text>
      <Text style={styles.uploads}>Uploads: 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: COLORS.background,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  name: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  email: {
    marginTop: 8,
    fontSize: 16,
    color: COLORS.textLight,
  },
  uploads: {
    marginTop: 12,
    fontSize: 18,
    color: COLORS.primary,
  },
});
