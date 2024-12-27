import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { CameraView, Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { uploadImage, getImageUrl } from "../utils/storage";
import { addPost } from "../utils/firestore";
import MainButton from "./MainButton";
import CameraIcon from "./icons/CameraIcon";
import MapPinIcon from "./icons/MapPinIcon";
import RemoveIcon from "./icons/RemoveIcon";
import { colors } from "../styles/global";

const CreatePostForm = ({ navigation }) => {
  const user = useSelector((state) => state.user.userInfo);
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

  const handleImageUpload = async (file, fileName) => {
    try {
      const imageRef = await uploadImage("posts", user.uid, file, fileName);

      const imageUrl = await getImageUrl(imageRef);

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image and getting URL:", error);
    }
  };
  const handleImageUrl = async () => {
    const response = await fetch(photo);

    const file = await response.blob();

    const fileName = photo.split("/").pop() || "123";
    const fileType = file.type;

    const postFile = new File([file], fileName, { type: fileType });

    const imageUrl = await handleImageUpload(postFile, fileName);
    return imageUrl;
  };
  const takePhoto = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photoData.uri);

      setPhoto(asset.uri);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setPhoto(uri);
    }
  };

  const clearForm = () => {
    setPhoto(null);
    setName("");
    setLocationName("");
  };

  const handlePublish = async () => {
    const photoUrl = await handleImageUrl();
    const location = await Location.getCurrentPositionAsync({});
    setGeoLocation(location.coords);
    const post = {
      photoUrl,
      name,
      locationName,
      geoLocation: location.coords,
    };
    addPost(user.uid, post);
    clearForm();
    navigation.navigate("Posts");
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
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.imageContainer}>
          <CameraView
            style={styles.imageWrapper}
            ref={(ref) => setCameraRef(ref)}
          >
            <Image source={{ uri: photo }} style={styles.img} />
            <TouchableOpacity
              style={photo ? styles.iconWrapperOpacity : styles.iconWrapper}
              onPress={takePhoto}
              disabled={photo ? true : false}
            >
              <CameraIcon />
            </TouchableOpacity>
          </CameraView>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.inputText}>Завантажити фото з галереї</Text>
          </TouchableOpacity>
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
      <TouchableOpacity style={styles.clearIconWrapper} onPress={clearForm}>
        <RemoveIcon />
      </TouchableOpacity>
    </View>
  );
};
export default CreatePostForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    backgroundColor: colors.lightGrayBg,
    borderRadius: 8,
  },
  img: {
    width: "100%",
    height: 240,
  },
  iconWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: colors.white,
  },
  iconWrapperOpacity: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: colors.whiteOpacity,
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
  clearIconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: colors.lightGrayBg,
    borderRadius: 20,
  },
});
