import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Background from "../components/Background";
import AuthInput from "../components/AuthInput";
import MainButton from "../components/MainButton";
import AuthVariants from "../components/AuthVariants";
import BgImg from "../assets/images/bg-img.jpg";
import AddIcon from "../assets/images/add.png";
import { colors } from "../styles/global";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    const credentials = {
      login,
      email,
      password,
    };
    console.log(credentials);

    Alert.alert(`Реєстрація успішна!`);
    setLogin("");
    setEmail("");
    setPassword("");
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Background source={BgImg}>
          <View style={styles.contentContainer}>
            <View style={styles.avatarWrapper}>
              <Image source={AddIcon} style={styles.addBtn} />
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
  avatarWrapper: {
    width: 120,
    height: 120,
    backgroundColor: colors.lightGrayBg,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: "-38%" }],
    borderRadius: 16,
    zIndex: 2,
  },
  addBtn: {
    position: "absolute",
    width: 25,
    height: 25,
    bottom: 14,
    right: -12,
    zIndex: 3,
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
