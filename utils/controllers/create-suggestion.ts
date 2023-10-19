import { get_collection_reference } from "../config/firebase-config.ts";

import { addDoc, serverTimestamp } from "firebase/firestore";

export const create_suggestion = async (
  suggestion: string,
  user_id: string,
  user_name: string
) => {
  const user_suggestion = {
    suggestion,
    createdAt: serverTimestamp(),
    user_id,
    user_name,
  };

  const col_ref = await get_collection_reference("suggestion-bot");

  await addDoc(col_ref, user_suggestion);
};
