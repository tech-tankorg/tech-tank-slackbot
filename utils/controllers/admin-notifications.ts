import { get_collection_reference } from "../config/firebase-config.ts";

import { addDoc, serverTimestamp } from "firebase/firestore";

export const create_admin_notification = async (
  message: string,
  user_id: string,
  user_name: string
) => {
  const user_suggestion = {
    message,
    createdAt: serverTimestamp(),
    user_id,
    user_name,
  };

  const col_ref = await get_collection_reference("admin-notifications");

  await addDoc(col_ref, user_suggestion);
};
