import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  createNote,
  findNotes,
  getAllNotes,
  removeAllNotes, // Fix the typo here
  removeNotes,
} from "./notes.js";
import { start } from "./server.js";

const listNotes = (notes) => {
  if (notes.length === 0) {
    console.log("No matching notes found.");
    return;
  }
  notes.forEach(({ id, content, tags }) => {
    console.log("id: ", id);
    console.log("tags: ", tags);
    console.log("content :", content);
    console.log("\n");
  });
};

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "create a new note",
    (yargs) => {
      return yargs.positional("note", {
        describe: "The content of the note you want to create",
        type: "string",
      });
    },
    async (argv) => {
      const newNote = await createNote(argv.note, argv.tags); // Use argv.tags here
      console.log("New Note has been Added successfully ", newNote.id);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      listNotes(notes);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNotes(argv.id);
      if (id) {
        console.log("Note removed: ", id);
      } else {
        console.log("Note not found");
      }
      // Add your removeNote logic here
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      // Add your web server logic here
      const notes = await getAllNotes();
      start(argv.port, notes);
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes(); // Use the correct function name
      console.log("All notes removed");
    }
  )
  .demandCommand(1)
  .parse();
