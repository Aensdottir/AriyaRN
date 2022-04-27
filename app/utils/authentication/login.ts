// Packages
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../navigation/RootNavigation";

// Custom Imports
import { validateEmail } from "./validateEmail";

const onLoginPress = (
  email: string,
  password: string,
  _callback: (string: string) => void
) => {
  if (validateEmail(email) != null) {
    console.log("Email VALID");
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("Signed in!");

        const user = { userId: email };
        setLoginLocal(user); // storing in local storage for next launch

        RootNavigation.navigate("Main", undefined);
      })
      .catch((error) => {
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          console.log(error);
          _callback("Invalid e-mail address or password.");
        }
        console.error(error);
        _callback("Login attempt failed, please try again later.");
      });
  } else {
    console.log("Email INVALID");
    _callback("Invalid e-mail address format.");
  }
};
const setLoginLocal = async (loginData: { userId: string }) => {
  try {
    await AsyncStorage.setItem("loginData", JSON.stringify(loginData));
  } catch (err) {
    console.log(err);
  }
};

export { onLoginPress };
