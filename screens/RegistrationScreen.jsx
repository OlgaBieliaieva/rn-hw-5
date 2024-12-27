import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage, getImageUrl, removeImage } from "../utils/storage";
import { registerDB } from "../utils/auth";
import Background from "../components/Background";
import AuthInput from "../components/AuthInput";
import MainButton from "../components/MainButton";
import AuthVariants from "../components/AuthVariants";
import BgImg from "../assets/images/bg-img.jpg";
import AddIcon from "../assets/images/add.png";
import CrossIcon from "../components/icons/CrossIcon";
import { colors } from "../styles/global";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPath, setAvatarPath] = useState("");

  const handleImageUpload = async (file, fileName) => {
    try {
      const imageRef = await uploadImage(
        "user_avatars",
        "temp",
        file,
        fileName
      );
      setAvatarPath(imageRef);
      const imageUrl = await getImageUrl(imageRef);

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image and getting URL:", error);
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

      const response = await fetch(uri);

      const file = await response.blob();

      const fileName = uri.split("/").pop() || "123";
      const fileType = file.type;

      const avatarFile = new File([file], fileName, { type: fileType });

      const imageUrl = await handleImageUpload(avatarFile, fileName);
      setAvatarUrl(imageUrl);
    }
  };

  const removeAvatar = async () => {
    const result = await removeImage(avatarPath);

    if (result) {
      setAvatarUrl("");
      setAvatarPath("");
    }
  };

  function handleSubmit() {
    const credentials = {
      avatar: avatarPath,
      login,
      email,
      password,
    };
    registerDB(credentials);
    setLogin("");
    setEmail("");
    setPassword("");
    setAvatarUrl("");
    setAvatarPath("");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Background source={BgImg}>
          <View style={styles.contentContainer}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                {avatarUrl && (
                  <Image source={{ uri: avatarUrl }} style={styles.avatarImg} />
                )}
              </View>
              {avatarUrl ? (
                <TouchableOpacity style={styles.addBtn} onPress={removeAvatar}>
                  <CrossIcon style={styles.btnIcon} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.addBtn} onPress={pickImage}>
                  <Image source={AddIcon} style={styles.btnIcon} />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.formTitle}>Реєстрація</Text>

            <View style={styles.formWrapper}>
              <AuthInput
                value={login}
                onChangeText={setLogin}
                placeholder="Логін"
                autoCapitalize="words"
                autoFocus={true}
              />
              <AuthInput
                value={email}
                onChangeText={setEmail}
                placeholder="Адреса електронної пошти"
                inputMode="email"
              />
              <AuthInput
                value={password}
                onChangeText={setPassword}
                placeholder="Пароль"
                secureText={true}
                rightBtn={true}
              />
            </View>

            <MainButton action={handleSubmit}>
              <Text style={styles.formBtnText}>Зареєструватися</Text>
            </MainButton>
            <AuthVariants
              textVariant="Вже є акаунт?"
              textAction="Увійти"
              navigation={navigation}
              targetNav="Login"
            />
          </View>
        </Background>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.white,
    height: "65%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 40,
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    backgroundColor: colors.lightGrayBg,
    borderRadius: 16,
    overflow: "hidden",
    zIndex: 2,
  },
  avatarImg: {
    width: 120,
    height: 120,
    objectFit: "cover",
  },
  addBtn: {
    position: "absolute",
    bottom: 14,
    right: -12,
    zIndex: 3,
  },
  btnIcon: {
    width: 25,
    height: 25,
  },
  formTitle: {
    width: "100%",
    textAlign: "center",
    marginBottom: 32,
    color: colors.black,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
  formWrapper: {
    width: "100%",
    display: "flex",
    gap: 16,
    marginBottom: 43,
  },
  formBtnText: {
    color: colors.white,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
