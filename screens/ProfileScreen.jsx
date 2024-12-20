import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Background from "../components/Background";
import CustomTabBar from "../components/CustomTabBar";
import PostsList from "../components/PostsList";
import { colors } from "../styles/global";
import BgImg from "../assets/images/bg-img.jpg";
import AddIcon from "../assets/images/add.png";
import ExitIcon from "../components/icons/ExitIcon";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Background source={BgImg}>
        <View style={styles.contentContainer}>
          <View style={styles.avatarWrapper}>
            <Image source={AddIcon} style={styles.addBtn} />
          </View>
          <TouchableOpacity
            style={styles.exitBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <ExitIcon />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>Natali Romanova</Text>
          <PostsList navigation={navigation}/>
        </View>
        <CustomTabBar navigation={navigation} />
      </Background>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    position: "relative",
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 148,
    paddingTop: 92,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    backgroundColor: colors.lightGrayBg,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: "-50%" }],
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
  exitBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  profileTitle: {
    color: colors.black,
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 32
  },
});
