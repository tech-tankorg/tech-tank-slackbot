import { app } from "../config/firebase-config.ts";
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";

export const create_suggestion = (
  tag: string,
  suggestion: string,
  user_id: string,
  user_name: string
) => {
  const user_suggestion = {
    tag,
    suggestion,
    createdAt: serverTimestamp(),
    user_id,
    user_name,
  };

  const db = getDatabase(app);
  const dbRef = ref(db);
  push(dbRef, user_suggestion);
};
