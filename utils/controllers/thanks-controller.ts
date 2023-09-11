import { get_document_reference } from "../config/firebase-config.ts";
import {
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

export const create_thanks = async (
  user_id_receiver: string,
  user_id_sender: string,
  message: string
) => {
  const doc_ref = await get_document_reference(
    "thanks-channel",
    user_id_receiver
  );

  const doc_snapshot = await getDoc(doc_ref);

  if (doc_snapshot.exists()) {
    await updateDoc(doc_ref, {
      thank_you: arrayUnion({
        data_created: serverTimestamp(),
        user_id_sender,
        message,
      }),
    });
  } else {
    await setDoc(doc_ref, {
      user_id_receiver,
      thank_you: [
        {
          data_created: serverTimestamp(),
          user_id_sender,
          message,
        },
      ],
    });
  }
};
