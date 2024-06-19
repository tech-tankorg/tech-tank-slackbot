import type { Block, KnownBlock } from "@slack/types";

type r = Block;
type s = KnownBlock;

type v = s["type"];

//biome-ignore lint:testing
export function assertFunc<T extends Object | undefined>(
  obj: T,
  key: string
): asserts obj is T & { key: string } {
  if (typeof obj === "undefined" || obj === null)
    throw new Error("obj is undefined");

  if (!Object.hasOwn(obj, key)) throw new Error("key not in string");
}

export function isKnownBlock(
  key: Block | KnownBlock | undefined
): asserts key is KnownBlock {
  if (typeof key === "undefined" || key === null)
    throw new Error("obj is undefined");
  if (key.type !== "") throw new Error("key not in string");
}
