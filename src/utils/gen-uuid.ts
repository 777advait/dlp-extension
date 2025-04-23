import { customRandom, random } from "nanoid";

const nanoid = customRandom(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  10,
  random,
);

export const getUUID = () => nanoid();
