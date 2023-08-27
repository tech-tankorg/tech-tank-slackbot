import { get_collection_reference } from "../config/firebase-config.ts";
import { redis } from "../config/upstash-config.ts";

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
