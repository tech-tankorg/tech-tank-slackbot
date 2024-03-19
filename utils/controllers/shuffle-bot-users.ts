import {
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  get_document_reference,
  get_collection_reference,
} from "../config/firebase-config.ts";

import { shuffle_bot_user } from "../types/zod-types.ts";

export const create_shuffle_bot_user = async (
  user_id: string,
  user_name: string,
  user_image: string
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
      img_url: user_image,
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

export const get_shuffle_bot_user = async (user_id: string) => {
  const doc_ref = await get_document_reference("shuffle-bot-users", user_id);

  const doc = await getDoc(doc_ref);

  const user_data = shuffle_bot_user.parse(doc.data());

  return user_data;
};

export const get_all_active_shuffle_bot_users = async () => {
  const col_ref = await get_collection_reference("shuffle-bot-users");

  const q = query(col_ref, where("is_active", "==", true));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => shuffle_bot_user.parse(doc.data()));
};
