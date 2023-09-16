import { get_collection_reference } from "../config/firebase-config.ts";
import {
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { subDays } from "date-fns";

import { db_thanks_type } from "../types/zod-types.ts";

import { format_thanks_reponse } from "../helpers/thanks-helpers.ts";

export const create_thanks = async (
  user_id_receiver: string,
  user_id_sender: string,
  message: string
) => {
  const col_ref = await get_collection_reference("thanks-channel");

  // ____________
  // This is commented out for testing purposes. May come in hand for a revision
  // const now = new Date();
  // const doc_ref = await get_document_reference(
  //   "thanks-channel",
  //   user_id_receiver
  // );

  // const doc_snapshot = await getDoc(doc_ref);

  // if (doc_snapshot.exists()) {
  //   await updateDoc(doc_ref, {
  //     thank_you: arrayUnion({
  //       data_created: now,
  //       user_id_sender,
  //       message,
  //     }),
  //   });
  // } else {
  //   await setDoc(doc_ref, {
  //     user_id_receiver,
  //     thank_you: [
  //       {
  //         data_created: now,
  //         user_id_sender,
  //         message,
  //       },
  //     ],
  //   });
  // }

  // ____

  await addDoc(col_ref, {
    date_created: serverTimestamp(),
    user_id_sender,
    user_id_receiver,
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
