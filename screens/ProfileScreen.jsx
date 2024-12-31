import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutDB } from "../utils/auth";
import { getUserPosts } from "../utils/firestore";
import Background from "../components/Background";
import CustomTabBar from "../components/CustomTabBar";
import PostsList from "../components/PostsList";
import { colors } from "../styles/global";
import BgImg from "../assets/images/bg-img.jpg";
import ExitIcon from "../components/icons/ExitIcon";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    } else {
      navigation.replace("Login");
    }
  }, []);

  async function fetchUserPosts() {
    try {
      const postsData = await getUserPosts(user.uid);
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  if (!user) {
    return <ActivityIndicator size="large" color="#FF6C00" />;
  }

  return (
    <View style={styles.container}>
      <Background source={BgImg}>
        <View style={styles.contentContainer}>
          <View style={styles.avatarWrapper}>
            {user?.photoURL && (
              <Image source={{ uri: user.photoURL }} style={styles.avatarImg} />
            )}
          </View>

          <TouchableOpacity
            style={styles.exitBtn}
            onPress={() => logoutDB(dispatch)}
          >
            <ExitIcon />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>{user.displayName}</Text>
          <PostsList posts={posts} navigation={navigation} />
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
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
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
  exitBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  profileTitle: {
    color: colors.black,
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 32,
  },
});
