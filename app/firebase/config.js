// @ts-nocheck
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh-YGt5uhs7QNxLkSkF4PCH-sua9s1WjQ",
  databaseURL: "https://your-database-name.firebaseio.com",
  projectId: "ariya-99d61",
  storageBucket: "ariya-99d61.appspot.com",
  appId: "1:446250678274:android:608fe4a15ffbfd2532cf1b",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
