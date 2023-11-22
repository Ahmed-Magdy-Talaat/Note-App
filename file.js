const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  html = fs.readFileSync("./greet.html", "utf-8");
  const name = "ahmed";
  html = html.replace("{{name}}", name);
  res.end(html);
});
server.listen(2000, () => console.log("listening on 2000"));
