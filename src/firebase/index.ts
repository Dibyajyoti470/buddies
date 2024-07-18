import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();

export const profileImageFileName = {
  ORIGINAL: "profile_original.jpg",
  CROPPED: "profile_cropped.jpg",
};

export function getProfileImageRefs(userId: string) {
  const originalImageRef = ref(
    storage,
    `profile_images/${userId}/${profileImageFileName.ORIGINAL}`
  );
  const croppedImageRef = ref(
    storage,
    `profile_images/${userId}/${profileImageFileName.CROPPED}`
  );

  return { originalImageRef, croppedImageRef };
}

export function getChatMediaRef(
  chatId: string,
  mediaType: string,
  originalFileName: string
) {
  return ref(storage, `chat_media/${chatId}/${mediaType}/${originalFileName}`);
}
