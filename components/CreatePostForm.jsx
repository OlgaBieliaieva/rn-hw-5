import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import MainButton from "./MainButton";
import CameraIcon from "./icons/CameraIcon";
import MapPinIcon from "./icons/MapPinIcon";
import { colors } from "../styles/global";

const CreatePostForm = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");
  const isFormValid = name && locationName;

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        cameraStatus.status === "granted" &&
          locationStatus.status === "granted" &&
          mediaLibraryStatus.status === "granted"
      );
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photoData.uri);
      setPhoto(asset.uri);
    }
  };

  const handlePublish = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setGeoLocation(location.coords);
    const post = {
      photo,
      name,
      locationName,
      geoLocation: location.coords,
    };

    navigation.navigate("Posts", { post });
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Запит дозволу...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>Доступ до камери чи локації заборонено</Text>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.imageContainer}>
        <CameraView
          style={styles.imageWrapper}
          ref={(ref) => setCameraRef(ref)}
        >
          <TouchableOpacity style={styles.iconWrapper} onPress={takePhoto}>
            <CameraIcon />
          </TouchableOpacity>
        </CameraView>
        <Text style={styles.inputText}>Завантажте фото</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Назва..."
          autoComplete="off"
          autoCapitalize="true"
          style={styles.commonInput}
        />
        <TextInput
          value={locationName}
          onChangeText={setLocationName}
          placeholder="Місцевість..."
          autoComplete="off"
          autoCapitalize="true"
          style={[styles.commonInput, styles.locationInput]}
        />
        <MapPinIcon style={styles.inputIcon} />
      </View>
      <MainButton action={handlePublish} disabled={!isFormValid}>
        <Text
          style={isFormValid ? styles.activeBtnText : styles.inactiveBtnText}
        >
          Опублікувати
        </Text>
      </MainButton>
    </View>
  );
};
export default CreatePostForm;

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 32,
  },
  imageContainer: {
    width: "100%",
    display: "flex",
    gap: 8,
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    backgroundColor: colors.lightGrayBg,
    borderRadius: 8,
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: colors.white,
  },
  inputText: {
    fontSize: 16,
    color: colors.lightGrayText,
  },
  inputsContainer: {
    width: "100%",
    display: "flex",
    gap: 16,
  },
  commonInput: {
    paddingVertical: 16,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrayBorder,
    color: colors.black,
    fontSize: 16,
  },
  locationInput: {
    position: "relative",
    paddingLeft: 28,
  },
  inputIcon: {
    position: "absolute",
    bottom: 16,
    left: 0,
  },
  activeBtnText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.white,
  },
  inactiveBtnText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.lightGrayText,
  },
});
