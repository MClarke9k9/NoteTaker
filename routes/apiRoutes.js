const fs = require("fs");
const path = require("path");
let dbJson = require("../db/db.json");
let json = path.join(__dirname, "../db/db.json");

function writedb(note) {
    fs.writeFileSync(json, note, "utf8", function(err) {
        if (err) console.log("There was an error");
        return `Finished!`;
    });
}

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(dbJson);
    });

    app.post("/api/notes", function(req, res) {
        dbJson = JSON.parse(fs.readFileSync(json, "utf-8"));
        var note = {
            text: req.body.text,
        };
        note.id = Math.floor(Math.random() * Date.now());
        dbJson.push(req.body);
        var newNote = JSON.stringify(dbJson);
        writedb(newNote);
        res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req, res) {
        dbJson = JSON.parse(fs.readFileSync(json, "utf-8"));
        var id = req.params.id;
        dbJson = dbJson.filter((selectNote) => {
            return selectNote.id != id;
        });

        let noteDelete = JSON.stringify(dbJson);
        writedb(noteDelete);
        res.json(dbJson);
    });
};