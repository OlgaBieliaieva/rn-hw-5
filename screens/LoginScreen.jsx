import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Background from "../components/Background";
import AuthInput from "../components/AuthInput";
import MainButton from "../components/MainButton";
import AuthVariants from "../components/AuthVariants";
import BgImg from "../assets/images/bg-img.jpg";
import { colors } from "../styles/global";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(navigation);

  function handleSubmit() {
    navigation.replace("Home");

    Alert.alert(`Вітаємо!`);
    setEmail("");
    setPassword("");
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Background source={BgImg}>
          <View style={styles.contentContainer}>
            <Text style={styles.formTitle}>Увійти</Text>

            <View style={styles.formWrapper}>
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
              <Text style={styles.formBtnText}>Увійти</Text>
            </MainButton>
            <AuthVariants
              textVariant="Немає акаунту?"
              textAction="Зареєструватися"
              navigation={navigation}
              targetNav="Registration"
            />
          </View>
        </Background>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    backgroundColor: colors.white,
    height: "60%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
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
