import { get_document_reference } from "../config/firebase-config.ts";
import {
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

import { endOfWeek, getWeek, isBefore, getYear } from "date-fns";

export const append_user_to_welcome_lst = async (user_id: string) => {
  // Given a date, determine the end of the week
  // Then check if the date for the doc is before that end date
  // if so, then append user_id to the users array
  // otherwise create a new doc with the users array and timestamp

  const now = new Date();
  const doc_id = `week-${getWeek(now)}-${getYear(now)}`;
  const doc_ref = await get_document_reference("welcomes", doc_id);
  const end_of_current_week = endOfWeek(now);

  const doc_snapshot = await getDoc(doc_ref);

  if (isBefore(now, end_of_current_week) && doc_snapshot.exists()) {
    await updateDoc(doc_ref, { users: arrayUnion(user_id) });
  } else {
    await setDoc(doc_ref, {
      users: [user_id],
      time_stamp: serverTimestamp(),
    });
  }
};
