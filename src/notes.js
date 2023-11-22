import { getDB, insertDB, saveDB } from "./db.js";

export const createNote = async (note, tags) => {
  const newNote = {
    tags,
    content: note,
    id: Date.now(),
  };
  await insertDB(newNote);
  return newNote;
};

export const getAllNotes = async () => {
  const db = await getDB();
  return db.notes;
};

export const findNotes = async (filter) => {
  const { notes } = await getDB();
  return notes.filter((note) => {
    return note.content.toLowerCase().includes(filter.toLowerCase());
  });
};

export const removeNotes = async (id) => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);
  console.log(match);
  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = () => {
  saveDB({ notes: [] });
};
