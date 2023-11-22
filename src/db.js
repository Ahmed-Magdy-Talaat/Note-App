import fs from "node:fs/promises";
import { fileURLToPath } from "url";

const DB_path = fileURLToPath(new URL("../db.json", import.meta.url));

export const getDB = async () => {
  return JSON.parse(await fs.readFile(DB_path, "utf-8"));
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_path, JSON.stringify(db, null, 2));
  return db;
};
// console.log(getDB());
export const insertDB = async (note) => {
  const db = await getDB();
  db.notes.push(note);
  await saveDB(db);
  return note;
};
