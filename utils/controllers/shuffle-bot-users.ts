import {
  setDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { get_document_reference } from "../config/firebase-config.ts";

export const create_shuffle_bot_user = async (
  user_id: string,
  user_name: string
) => {
  const shuffle_user = {
    user_name,
    user_id,
    date_joined: serverTimestamp(),
    is_active: true,
    bio: {
      pronouns: "",
      title: "",
      location: "",
      interests: "",
      intro: "",
    },
  };

  const doc_ref = await get_document_reference("shuffle-bot-users", user_id);

  try {
    await setDoc(doc_ref, shuffle_user);
  } catch (err) {
    console.error(err);
  }
};

export const update_shuffle_bot_bio = async (
  user_id: string,
  bio: {
    pronouns: string;
    title: string;
    location: string;
    interests: string;
    intro: string;
  }
) => {
  const doc_ref = await get_document_reference("shuffle-bot-users", user_id);

  await updateDoc(doc_ref, bio);
};

export const update_shuffle_activity = async (
  user_id: string,
  is_active: boolean
) => {
  const doc_ref = await get_document_reference("shuffle-bot-users", user_id);

  await updateDoc(doc_ref, { is_active });
};

export const delete_shuffle_bot_user = async (user_id: string) => {
  const doc_ref = await get_document_reference("shuffle-bot-users", user_id);

  await deleteDoc(doc_ref);
};
