import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { formatFirestoreDate } from "../utils/firestore";
import { colors } from "../styles/global";

const Comment = ({ comment }) => {
  return (
    <View style={styles.commentCard}>
      <View style={styles.imgWrapper}>
        <Image source={{ uri: comment.author.photoURL }} style={styles.img} />
      </View>
      <View style={styles.commentWrapper}>
        <Text style={styles.commentText}>{comment.content}</Text>
        <Text style={styles.commentDate}>
          {formatFirestoreDate(comment.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 32,
  },
  imgWrapper: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  commentWrapper: {
    width: 299,
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: colors.lightGrayBg,
  },
  commentText: {
    fontSize: 13,
    marginBottom: 8,
  },
  commentDate: {
    fontSize: 10,
    color: colors.lightGrayText,
    textAlign: "right",
  },
});
