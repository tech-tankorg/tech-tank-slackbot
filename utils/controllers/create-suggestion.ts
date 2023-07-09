import { app } from "../config/firebase-config.ts";
import { getDatabase, ref, push } from "firebase/database";

export const create_suggestion = (
  tag: string,
  suggestion: string,
  createdAt: string,
  user_id: string,
  user_name: string
) => {
  const user_suggestion = {
    tag,
    suggestion,
    createdAt,
    user_id,
    user_name,
  };

  (() => {
    const db = getDatabase(app);
    const dbRef = ref(db);
    push(dbRef, user_suggestion);
  })();
};
