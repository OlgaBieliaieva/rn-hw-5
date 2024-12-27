import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { getAllPosts } from "../utils/firestore";
import PostsList from "../components/PostsList";
import { colors } from "../styles/global";

const PostsScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.userInfo);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const postsData = await getAllPosts();
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.userContainer}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: user.photoURL }} style={styles.avatarImg} />
          </View>
          <View>
            <Text style={styles.userName}>{user.displayName}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
      )}
      {posts && <PostsList posts={posts} navigation={navigation} />}
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
    overflow: "hidden",
    backgroundColor: colors.lightGrayBg,
  },
  avatarImg: {
    width: 60,
    height: 60,
    objectFit: "cover",
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
