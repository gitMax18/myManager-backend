import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server is now working on : " + `http://localhost:${PORT}`);
});
