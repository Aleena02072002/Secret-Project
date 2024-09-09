import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var inputPass = "";

app.use(bodyParser.urlencoded({ extended: true }));

function checkPass(req, res, next) {
    console.log(req.body);
    inputPass = req.body['password'];
    next();

}

app.use(checkPass);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");

});
app.post("/check", (req, res) => {

    if (inputPass === 'MynameisLy') {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.status(401).send('<h1>Wrong Password!</h1>');

    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
