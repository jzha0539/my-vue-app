import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARuyQAmMtUWy57gWYt5vtHG040y3Xzsow",
  authDomain: "junyi-zhang-7cd0a.firebaseapp.com",
  projectId: "junyi-zhang-7cd0a",
  storageBucket: "junyi-zhang-7cd0a.firebasestorage.app",
  messagingSenderId: "454971608903",
  appId: "1:454971608903:web:3e1effe745381b2dbd8662"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default db