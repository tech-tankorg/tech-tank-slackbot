import {
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { get_collection_reference } from "../config/firebase-config.ts";

import { subDays } from "date-fns";

import {
  create_thanks_usr_name_validation,
  db_thanks_type,
} from "../types/zod-types.ts";

import { format_thanks_reponse } from "../helpers/thanks-helpers.ts";

export const create_thanks = async (
  user_id_receiver: string,
  user_id_sender: string,
  message: string
) => {
  const col_ref = await get_collection_reference("thanks-channel");

  const parsed_user_id_receiver =
    create_thanks_usr_name_validation.parse(user_id_receiver);

  const parsed_user_id_sender =
    create_thanks_usr_name_validation.parse(user_id_sender);

  await addDoc(col_ref, {
    date_created: serverTimestamp(),
    user_id_sender: parsed_user_id_sender,
    user_id_receiver: parsed_user_id_receiver,
    message,
  });
};

export const get_thanks = async () => {
  const start_of_last_week = subDays(new Date(), 8);
  const end_of_the_week = subDays(new Date(), 2);

  const col_ref = await get_collection_reference("thanks-channel");
  const querys = query(
    col_ref,
    where("date_created", ">=", start_of_last_week),
    where("date_created", "<=", end_of_the_week)
  );

  const docs = await getDocs(querys);

  const thanks_array = docs.docs.map((item) =>
    db_thanks_type.parse(item.data())
  );

  return format_thanks_reponse(thanks_array);
};
