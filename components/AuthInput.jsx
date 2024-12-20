import { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "../styles/global";

const AuthInput = ({
  value,
  onChangeText,
  placeholder,
  inputMode = "text",
  autoCapitalize = "none",
  autoFocus = false,
  secureText = false,
  rightBtn = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureText);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  function toggle() {
    setIsSecure(!isSecure);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          inputMode={inputMode}
          secureTextEntry={isSecure}
          autoFocus={autoFocus}
          autoComplete="off"
          autoCapitalize={autoCapitalize}
          style={[styles.formInput, inputIsFocused && styles.formInputFocused]}
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
        />

        {rightBtn && (
          <Pressable onPress={toggle} style={styles.inputPassLab}>
            <Text style={styles.inputPassLabText}>
              {isSecure ? "Показати" : "Приховати"}
            </Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
export default AuthInput;

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
  },
  formInput: {
    width: "100%",
    height: 50,
    backgroundColor: colors.lightGrayBg,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.lightGrayBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    color: colors.black,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  formInputFocused: {
    borderColor: colors.orange,
  },
  inputPassLab: {
    height: 24,
    position: "absolute",
    bottom: 10,
    right: 16,
  },
  inputPassLabText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: colors.blue,
  },
});
