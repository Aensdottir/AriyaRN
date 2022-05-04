import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import * as RootNavigation from "../navigation/RootNavigation";

interface SignInInput {
  email: string;
  password: string;
}
interface SignUpInput {
  email: string;
  password: string;
  name: string;
}

interface UserContextType {
  signInError: string;
  signUpError: string;
  forgotPassText: string;
  resetError: () => void;
  signInWithEmailAndPassword: ({ email, password }: SignInInput) => void;
  createUserWithEmailAndPassword: ({
    email,
    password,
    name,
  }: SignUpInput) => void;
  sendResetPasswordEmail: (email: string) => void;
}

interface Props {
  children: ReactNode;
}

const UserContext = createContext({} as UserContextType);

export const useUser = () => useContext(UserContext);

const UserProvider: FunctionComponent<Props> = ({ children }) => {
  const [signInError, setSignInError] = React.useState("");
  const [signUpError, setSignUpError] = React.useState("");
  const [forgotPassText, setForgotPassText] = React.useState("");

  const signInWithEmailAndPassword = async ({
    email,
    password,
  }: SignInInput) => {
    if (validateEmail(email) == null) {
      setSignInError("Invalid e-mail address format.");
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          console.log(response);
          RootNavigation.navigate("Main", undefined);
        })
        .catch((error) => {
          if (
            error.code === "auth/invalid-email" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            setSignInError("Invalid e-mail address or password.");
          } else {
            setSignInError("Login attempt failed, please try again later.");
          }
        });
    }
  };
  const createUserWithEmailAndPassword = async ({
    email,
    password,
    name,
  }: SignUpInput) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("User account created");
        const uid = response.user.uid;

        firestore()
          .collection("Users")
          .doc(uid)
          .set({
            id: uid,
            name: name,
            email: email,
          })
          .then(() => {
            console.log("User data added!");
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setSignUpError("This email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          setSignUpError("This email address is invalid!");
        }
        console.log(error);
      });
  };

  const sendResetPasswordEmail = async (email: string) => {
    auth()
      .sendPasswordResetEmail(email.trim())
      .then(() => {
        console.log("Password reset email sent successfully");
        setForgotPassText("Password reset email sent successfully.");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setForgotPassText("There is no user with this email address!");
        }
        if (error.code === "auth/invalid-email") {
          setForgotPassText("This email address is invalid!");
        }
        console.log(error);
      });
  };

  const resetError = () => {
    setSignInError("");
    setSignUpError("");
    setForgotPassText("");
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      );
  };

  return (
    <UserContext.Provider
      value={{
        signInError,
        signUpError,
        forgotPassText,
        resetError,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        sendResetPasswordEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
