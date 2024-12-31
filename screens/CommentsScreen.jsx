import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { getCommentsForPost, addCommentToPost } from "../utils/firestore";
import CommentsList from "../components/CommentsList";
import ArrowUpIcon from "../components/icons/ArrowUpIcon";
import { colors } from "../styles/global";

const CommentsScreen = ({ route }) => {
  const user = useSelector((state) => state.user.userInfo);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState("");
  const post = route.params?.post;

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const postsComments = await getCommentsForPost(post.id);
      setComments(postsComments);
    } catch (error) {
      console.error("Error fetching posts comments:", error);
    }
  }

  async function addComment() {
    try {
      const commentId = await addCommentToPost(post.id, user.uid, newComment);
      return commentId;
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  }

  const handleSubmit = () => {
    addComment();
    setNewComment("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image source={{ uri: post.photoUrl }} style={styles.img} />
      </View>
      {comments && (
        <CommentsList comments={comments} postAuthor={post.userId} />
      )}
      <View style={styles.commentContainer}>
        <TextInput
          multiline
          placeholder="Коментувати..."
          onChangeText={setNewComment}
          value={newComment}
        />
        <TouchableOpacity style={styles.iconWrapper} onPress={handleSubmit}>
          <ArrowUpIcon stroke={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 32,
    backgroundColor: colors.white,
  },
  imgWrapper: {
    width: 343,
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
  },
  img: {
    width: "100%",
    height: 240,
    objectFit: "cover",
  },
  commentContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    width: "100%",
    minHeight: 50,
    display: "flex",
    justifyContent: "center",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 46,
    backgroundColor: colors.lightGrayBg,
    borderRadius: 40,
    fontSize: 16,
    fontWeight: 500,
    zIndex: 2,
  },
  iconWrapper: {
    position: "absolute",
    top: "50%",
    right: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    backgroundColor: colors.orange,
    borderRadius: 20,
  },
});
