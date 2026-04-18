import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Explicitly define the config object to ensure robust export/import during production builds
export const firebaseAppConfig = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  firestoreDatabaseId: firebaseConfig.firestoreDatabaseId
};

const app = initializeApp(firebaseAppConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseAppConfig.firestoreDatabaseId || "(default)");

// Test connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    // Expected to fail if offline or unauthorized, but confirms initialization
    console.log("Firebase storage initialized.");
  }
}
testConnection();
