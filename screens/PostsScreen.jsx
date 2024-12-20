import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import PostsList from "../components/PostsList";
import { colors } from "../styles/global";

const PostsScreen = ({ route, navigation }) => {
  const post = route.params?.post;

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.avatarWrapper}>
          <Image />
        </View>
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>user1@gmail.com</Text>
        </View>
      </View>
      <PostsList post={post} navigation={navigation} />
    </View>
  );
};
export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: colors.white,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: colors.lightGrayBg,
  },
  userName: {
    color: colors.black,
    fontSize: 13,
    fontWeight: 700,
  },
  userEmail: {
    color: colors.lightBlack,
    fontSize: 11,
  },
});
