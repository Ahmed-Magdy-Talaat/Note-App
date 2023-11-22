import fs from "node:fs/promises";
import http from "node:http";
import { fileURLToPath } from "node:url";
import opn from "opn";

export const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `
        <div class="note">
          <p>${note.content}</p>
          <div class="tags">
            ${note.tags}
          </div>
        </div>
      `;
    })
    .join("\n");
};

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = fileURLToPath(
      new URL("./template.html", import.meta.url)
    );
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, { notes: formatNotes(notes) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export const start = async (port, notes) => {
  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  opn(`http://localhost:${port}`);
};
