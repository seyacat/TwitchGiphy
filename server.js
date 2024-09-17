const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/files", (req, res) => {
  const fs = require("fs");
  const directoryPath = path.join(__dirname, "public");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    const result = {
      files: [],
    };

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        const content = fs.readFileSync(filePath, "utf8");
        const ext = path.extname(file).replace(".", "");
        result.files.push({
          filename: file,
          content,
          ext,
        });
      }
    });

    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
