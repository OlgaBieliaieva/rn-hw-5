import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../config";

export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const addPost = async (userId, post) => {
  try {
    const postWithMetadata = {
      ...post,
      userId,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "posts"), postWithMetadata);
    return docRef.id;
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const updateUserInFirestore = async (uid, data) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
    console.log("User data updated to Firestore:", uid);
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};

export const getAllPosts = async () => {
  const postsRef = collection(db, "posts");
  const querySnapshot = await getDocs(postsRef);

  const posts = [];

  for (const postDoc of querySnapshot.docs) {
    const post = { id: postDoc.id, ...postDoc.data() };

    const commentsRef = collection(db, "posts", post.id, "comments");
    const commentsSnapshot = await getDocs(commentsRef);

    post.commentCount = commentsSnapshot.size;
    posts.push(post);
  }

  return posts;
};

export const getUserPosts = async (userId) => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const userPosts = [];

  for (const postDoc of querySnapshot.docs) {
    const post = { id: postDoc.id, ...postDoc.data() };

    const commentsRef = collection(db, "posts", post.id, "comments");
    const commentsSnapshot = await getDocs(commentsRef);

    post.commentCount = commentsSnapshot.size;
    userPosts.push(post);
  }

  return userPosts;
};

export const addCommentToPost = async (postId, userId, content) => {
  try {
    if (!postId || !userId || !content) {
      throw new Error(
        "Invalid input: postId, userId, and content are required."
      );
    }

    const commentsRef = collection(db, "posts", postId, "comments");

    const commentData = {
      userId,
      content,
      createdAt: serverTimestamp(),
    };

    const commentDoc = await addDoc(commentsRef, commentData);

    console.log("Comment added with ID:", commentDoc.id);
    return commentDoc.id;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getCommentsForPost = async (postId) => {
  try {
    if (!postId) {
      throw new Error("Invalid input: postId is required.");
    }

    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const userCache = new Map();

    const comments = [];
    for (const docSnap of querySnapshot.docs) {
      const commentData = docSnap.data();
      const userId = commentData.userId;

      if (!userCache.has(userId)) {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          userCache.set(userId, {
            id: userDocSnap.id,
            ...userDocSnap.data(),
          });
        } else {
          userCache.set(userId, null);
        }
      }

      comments.push({
        id: docSnap.id,
        ...commentData,
        author: userCache.get(userId),
      });
    }

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const formatFirestoreDate = (timestamp) => {
  if (!timestamp) return "Невідома дата";

  const date = timestamp.toDate();

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat("uk-UA", options).format(date);
};
