import React from "react";
import { StyleSheet, View, Image, ScrollView, Text } from "react-native";
import BgImg from "../assets/images/bg-img.jpg";

import { colors } from "../styles/global";

const CommentsList = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.commentCard}>
        <View style={styles.imgWrapper}>
          <Image source={BgImg} style={styles.img} />
        </View>
        <View style={styles.commentWrapper}>
          <Text style={styles.commentText}>
            Really love your most recent photo. I’ve been trying to capture the
            same thing for a few months and would love some tips!
          </Text>
          <Text style={styles.commentDate}>09 червня, 2020 | 08:40</Text>
        </View>
      </View>
      <View style={styles.commentCard}>
        <View style={styles.commentWrapperRight}>
          <Text style={styles.commentText}>
            A fast 50mm like f1.8 would help with the bokeh. I’ve been using
            primes as they tend to get a bit sharper images.
          </Text>
          <Text style={styles.commentDateLeft}>09 червня, 2020 | 09:14</Text>
        </View>
        <View style={styles.imgWrapper}>
          <Image source={BgImg} style={styles.img} />
        </View>
      </View>
      <View style={styles.commentCard}>
        <View style={styles.imgWrapper}>
          <Image source={BgImg} style={styles.img} />
        </View>
        <View style={styles.commentWrapper}>
          <Text style={styles.commentText}>
            Really love your most recent photo. I’ve been trying to capture the
            same thing for a few months and would love some tips!
          </Text>
          <Text style={styles.commentDate}>09 червня, 2020 | 08:40</Text>
        </View>
      </View>
      <View style={styles.commentCard}>
        <View style={styles.commentWrapperRight}>
          <Text style={styles.commentText}>
            A fast 50mm like f1.8 would help with the bokeh. I’ve been using
            primes as they tend to get a bit sharper images.
          </Text>
          <Text style={styles.commentDateLeft}>09 червня, 2020 | 09:14</Text>
        </View>
        <View style={styles.imgWrapper}>
          <Image source={BgImg} style={styles.img} />
        </View>
      </View>
    </ScrollView>
  );
};
export default CommentsList;

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    paddingHorizontal: 16,
    display: "flex",
    marginBottom: 72,
  },
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
  commentWrapperRight: {
    width: 299,
    padding: 16,
    borderRadius: 6,
    borderTopRightRadius: 0,
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
  commentDateLeft: {
    fontSize: 10,
    color: colors.lightGrayText,
    textAlign: "left",
  },
});
