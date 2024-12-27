import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../config";
import { setUserInfo, clearUserInfo } from "../redux/reducers/userSlice";
import { addUser, getUser } from "./firestore";
import { replaceImage } from "./storage";

export const registerDB = async ({ avatar, login, email, password }) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credentials.user;
    let newAvatarUrl = "";

    if (avatar) {
      newAvatarUrl = await replaceImage(avatar, user.uid);
    }

    await addUser(user.uid, {
      uid: user.uid,
      email: user.email || "",
      displayName: login || "",
      photoURL: newAvatarUrl,
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
  }
};

export const loginDB = async ({ email, password }, dispatch) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;

    dispatch(
      setUserInfo({
        uid: user.uid,
        email: user?.email || "",
        displayName: user?.displayName || "",
        profilePhoto: user?.photoURL || "",
      })
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const logoutDB = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUserInfo());
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const authStateChanged = (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUser(user.uid);

      dispatch(
        setUserInfo({
          ...userData,
          uid: user.uid,
          email: user.email || "",
        })
      );
    } else {
      dispatch(clearUserInfo());
    }
  });
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
