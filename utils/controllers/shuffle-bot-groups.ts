import { getWeek, getYear } from "date-fns";

import { shuffle_bot_groups } from "../types/zod-types.ts";

import { getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { get_document_reference } from "../config/firebase-config.ts";

import type { shuffle_group } from "../types/projectTypes.ts";

export const get_previous_week_shuffles = async () => {
  const now = new Date();
  const doc_id = `week-${getWeek(now) - 1}-${getYear(now)}`;
  const doc_ref = await get_document_reference("shuffle-bot-groups", doc_id);

  const doc_snapshot = await getDoc(doc_ref);

  const data = shuffle_bot_groups.parse(doc_snapshot.data());

  return data;
};

export const create_shuffle_groups = async (groups: shuffle_group) => {
  const now = new Date();
  const doc_id = `week-${getWeek(now)}-${getYear(now)}`;

  const doc_ref = await get_document_reference("shuffle-bot-groups", doc_id);

  await setDoc(doc_ref, { date_created: serverTimestamp(), groups });
};
