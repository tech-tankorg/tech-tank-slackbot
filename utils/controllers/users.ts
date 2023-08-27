import { get_collection_reference } from "../config/firebase-config.ts";

import {
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

export const add_user_to_db = async (
  user_name: string,
  user_id: string,
  coc_ack: "accepted" | "denied"
) => {
  const user = {
    user_name,
    user_id,
    coc: coc_ack,
    timestamp: serverTimestamp(),
  };

  const col_ref = await get_collection_reference("users");
  await addDoc(col_ref, user);
};

export const has_user_ack_coc = async (user_id: string) => {
  const col_ref = await get_collection_reference("users");

  const querys = query(
    col_ref,
    where("user_id", "==", user_id),
    orderBy("timestamp", "desc")
  );

  const docs = await getDocs(querys);

  const user = docs.docs[0]?.data();

  return user?.coc === "accepted";
};
