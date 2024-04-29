import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample({
  image,
  setImage,
}: {
  image: null | string;
  setImage: any;
}) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});
