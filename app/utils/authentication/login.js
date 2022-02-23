// @ts-nocheck
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateEmail } from "./validateEmail";

import * as RootNavigation from "../navigation/RootNavigation.js";

const onLoginPress = (email, password, _callback) => {
  if (validateEmail(email) != null) {
    console.log("Email VALID");
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("Signed in!");

        const user = { userId: email };
        setLoginLocal(user); // storing in local storage for next launch

        RootNavigation.navigate("Main");
      })
      .catch((error) => {
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          console.log(error);
          _callback(1);
        }
        console.error(error);
        _callback(3);
      });
  } else {
    console.log("Email INVALID");
    _callback(2);
  }
};
const setLoginLocal = async (loginData) => {
  try {
    await AsyncStorage.setItem("loginData", JSON.stringify(loginData));
  } catch (err) {
    console.log(err);
  }
};

export { onLoginPress };
