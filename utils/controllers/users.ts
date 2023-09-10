import {
  get_collection_reference,
  get_document_reference,
} from "../config/firebase-config.ts";
import { redis } from "../config/upstash-config.ts";

import {
  serverTimestamp,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
  setDoc,
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
    coc_ack_timestamp: serverTimestamp(),
  };

  const doc_ref = await get_document_reference("users", user_id);
  const doc = await getDoc(doc_ref);

  if (doc.exists()) {
    await setDoc(
      doc_ref,
      {
        coc: coc_ack,
        coc_ack_timestamp: serverTimestamp(),
      },
      { merge: true }
    );
  } else {
    await setDoc(doc_ref, user);
  }

  const redis_user_id_exists = (await redis.get(user_id)) as string | undefined;

  // first check the redis cache for the user id and value, if found then delete the record
  // set a new record
  if (redis_user_id_exists !== undefined) {
    await redis.del(user_id);
  }

  await redis.set(user_id, coc_ack);
};

export const has_user_ack_coc = async (user_id: string) => {
  const user_coc_ack_redis = (await redis.get(user_id)) as string | undefined;

  // first check the redis cache for the user id and value, if not found the query the db
  if (user_coc_ack_redis === undefined) {
    const col_ref = await get_collection_reference("users");
    const querys = query(
      col_ref,
      where("user_id", "==", user_id),
      orderBy("timestamp", "desc")
    );

    const docs = await getDocs(querys);

    const user = docs.docs[0]?.data();

    return user?.coc === "accepted";
  }

  return user_coc_ack_redis === "accepted";
};

export const add_team_joined_user_db = async (
  user_id: string,
  user_name: string
) => {
  const user = {
    user_id,
    user_name,
    time_joined: serverTimestamp(),
  };

  try {
    const doc_ref = await get_document_reference("users", user_id);
    await setDoc(doc_ref, user);
  } catch {
    throw new Error("Failed to add to db");
  }
};
