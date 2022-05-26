import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Image, Platform } from "react-native";
// Packages
import * as RootNavigation from "../navigation/RootNavigation";
import { launchImageLibrary } from "react-native-image-picker";
// Firebase
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

interface SignInInput {
  email: string;
  password: string;
}
interface SignUpInput {
  email: string;
  password: string;
  name: string;
}

export type UserData = {
  email: string;
  id: string;
  name: string;
  profileImageUrl: string;
};

interface UserContextType {
  isFirebaseInitializing: boolean;
  userData: UserData | null;
  isEditingProfile: boolean;
  setIsEditingProfile: (value: boolean) => void;
  signInError: string;
  signUpError: string;
  forgotPassError: string;
  changePassError: string;
  changeEmailError: string;
  signOut: () => void;
  resetError: () => void;
  signInWithEmailAndPassword: ({ email, password }: SignInInput) => void;
  createUserWithEmailAndPassword: ({
    email,
    password,
    name,
  }: SignUpInput) => void;
  deleteUser: (password: string, confirmPassword: string) => void;
  sendResetPasswordEmail: (email: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => void;
  changeEmail: (currentPassword: string, newEmail: string) => void;
  changeName: (newName: string) => void;
  selectProfileImage: () => void;
}

interface Props {
  children: ReactNode;
}

const UserContext = createContext({} as UserContextType);

export const useUser = () => useContext(UserContext);

const UserProvider: FunctionComponent<Props> = ({ children }) => {
  const [isFirebaseInitializing, setIsFirebaseInitializing] =
    React.useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [signInError, setSignInError] = React.useState("");
  const [signUpError, setSignUpError] = React.useState("");
  const [forgotPassError, setForgotPassError] = React.useState("");
  const [changePassError, setChangePassError] = React.useState("");
  const [changeEmailError, setChangeEmailError] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: SignInInput) => {
      if (validateEmail(email.trim()) == null) {
        setSignInError("Invalid e-mail address format.");
      } else {
        auth()
          .signInWithEmailAndPassword(email.trim(), password)
          .then((response) => {
            console.log(response);
            addLoginEntry(true);
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
    },
    [RootNavigation]
  );
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
            RootNavigation.navigate("LoginScreen");
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
  const deleteUser = useCallback(
    async (password: string, confirmPassword: string) => {
      if (password === confirmPassword) {
        try {
          const provider = auth.EmailAuthProvider;
          const authCredential =
            userData && provider.credential(userData.email, password);

          let user = auth().currentUser;
          if (authCredential) {
            user
              ?.reauthenticateWithCredential(authCredential)
              .then(() => {
                user
                  ?.delete()
                  .then(() => {
                    console.log("Account deleted");
                    RootNavigation.navigate("LoginScreen");
                  })
                  .catch((error) => {
                    console.log("ACCOUNT DELETION ERROR", error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } catch (e) {
          console.log(e);
        }
      } else console.log("Password Mismatch");
    },
    []
  );

  const sendResetPasswordEmail = useCallback(async (email: string) => {
    auth()
      .sendPasswordResetEmail(email.trim())
      .then(() => {
        console.log("Password reset email sent successfully");
        setForgotPassError("Password reset email sent successfully.");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setForgotPassError("There is no user with this email address!");
        }
        if (error.code === "auth/invalid-email") {
          setForgotPassError("This email address is invalid!");
        }
        console.log(error);
      });
  }, []);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      const provider = auth.EmailAuthProvider;
      const authCredential =
        userData && provider.credential(userData.email, currentPassword);

      let user = auth().currentUser;

      if (authCredential)
        user
          ?.reauthenticateWithCredential(authCredential)
          .then(() => {
            user
              ?.updatePassword(newPassword)
              .then(() => {
                console.log("Password updated!");
              })
              .catch((error) => {
                console.log(error);
                setChangePassError(error);
              });
          })
          .catch((error: any) => {
            console.log(error);
            setChangePassError(error);
          });
    },
    []
  );

  const changeEmail = useCallback(
    async (currentPassword: string, newEmail: string) => {
      if (validateEmail(newEmail)) {
        try {
          const provider = auth.EmailAuthProvider;
          const authCredential =
            userData && provider.credential(userData.email, currentPassword);

          let user = auth().currentUser;
          if (authCredential) {
            user
              ?.reauthenticateWithCredential(authCredential)
              .then(() => {
                user
                  ?.updateEmail(newEmail)
                  .then(() => {
                    console.log("Email updated!");
                  })
                  .catch((error) => {
                    console.log("ERROR>", error);
                    setChangeEmailError(error);
                  });
              })
              .catch((error) => {
                console.log("ERROR>2", error);
                setChangeEmailError(error);
              });
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        setChangeEmailError("Invalid Email address.");
        console.log("invalid");
      }
    },
    []
  );

  const changeName = useCallback(async (newName: string) => {
    try {
      // Update
      userData && // Typescript bug
        setUserData({ ...userData, name: newName });
      await firestore().collection("Users").doc(userData?.id).set({
        email: userData?.email,
        id: userData?.id,
        name: newName,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      auth().signOut();
      RootNavigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  }, [RootNavigation]);

  const refetchAndSetUserData = useCallback(async (firebaseUser) => {
    try {
      // Fetch user data
      const documentSnapshot = await firestore()
        .collection("Users")
        .doc(firebaseUser.uid)
        .get();
      const data = documentSnapshot.data();

      // Add user login entry to firebase
      addLoginEntry(false);

      // Fetch user profile picture
      let profileImageUrl: string = "";
      try {
        profileImageUrl = await storage()
          .ref(firebaseUser.uid)
          .getDownloadURL();
      } catch (error) {
        console.log("Image fetch error:", error);
      }

      // Set local user data
      setUserData(() => ({
        email: data?.email ?? null,
        id: data?.id ?? null,
        name: data?.name ?? null,
        profileImageUrl: profileImageUrl ?? null,
      }));
    } catch (error) {
      console.log("Refetch error:", error);
      await signOut();
    }
  }, []);

  const addLoginEntry = useCallback(async (isNewLogin: boolean) => {
    try {
      const firebaseUser = auth().currentUser;
      const date = new Date();
      const loginDateTime =
        date.toLocaleDateString() + "/" + date.toLocaleTimeString("en-GB");
      console.log(loginDateTime);

      // Add user login entries from firebase
      await firestore()
        .collection("Users")
        .doc(firebaseUser?.uid)
        .collection("loginEntries")
        .doc(date.getTime().toString())
        .set({
          time: loginDateTime,
          type: isNewLogin ? "newLogin" : "prevLogin",
        });

      // Load user login entries from firebase
      /*const loginEntriesSnapshot = await firestore()
        .collection("Users")
        .doc(firebaseUser?.uid)
        .collection("loginEntries")
        .get();
      loginEntriesSnapshot.forEach((doc) => {
        console.log(doc.data());
      });*/
    } catch (error) {
      console.log(error);
    }
  }, []);

  const selectProfileImage = useCallback(async () => {
    try {
      const options = {
        mediaType: "photo",
        maxWidth: 2048,
        maxHeight: 2048,
      };
      launchImageLibrary(options, (response: any) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else {
          const source = { uri: response.assets[0].uri };
          console.log(source);
          uploadProfileImage(source.uri);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const uploadProfileImage = useCallback(async (uri: string) => {
    try {
      const uploadUri =
        Platform.OS === "ios"
          ? uri.replace("file://", "")
          : uri.replace("file:///", "file://");
      const task = storage().ref(userData?.id).putFile(uploadUri.toString());
      await task;
      console.log("id", userData?.id);
      const profileImageUrl = await storage()
        .ref(userData?.id)
        .getDownloadURL();
      // Update
      userData && // Typescript bug
        setUserData({ ...userData, profileImageUrl: profileImageUrl });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const resetError = () => {
    setSignInError("");
    setSignUpError("");
    setForgotPassError("");
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      );
  };

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        void (async () => {
          await refetchAndSetUserData(firebaseUser);
          setIsFirebaseInitializing(false);
        })();
      } else {
        setUserData(null);
        setIsFirebaseInitializing(false);
      }
    });
    return subscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        isFirebaseInitializing,
        userData,
        isEditingProfile,
        setIsEditingProfile,
        signOut,
        signInError,
        signUpError,
        forgotPassError,
        resetError,
        changeEmailError,
        changePassError,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        deleteUser,
        sendResetPasswordEmail,
        changePassword,
        changeEmail,
        changeName,
        selectProfileImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
