import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCiO1ydx0HwbhWl55z9MEvJqoliw_vJBIg",
  authDomain: "tombola-sorteo.firebaseapp.com",
  projectId: "tombola-sorteo",
  storageBucket: "tombola-sorteo.firebasestorage.app",
  messagingSenderId: "173928571058",
  appId: "1:173928571058:web:8bc608beac506d75daa9ab"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistencia configurada correctamente ✅");
  })
  .catch((error) => {
    console.error("Error configurando persistencia:", error);
  });

export { auth };
