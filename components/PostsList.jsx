import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Post from "./Post";

const PostsList = ({ navigation, posts }) => {
  return (
    <ScrollView style={styles.container}>
      {posts?.map((post, index) => (
        <Post post={post} navigation={navigation} key={index} />
      ))}
    </ScrollView>
  );
};
export default PostsList;

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    paddingHorizontal: 16,
    display: "flex",
    marginBottom: 60,
  },
});
