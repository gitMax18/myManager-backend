import express, { Express } from "express";
import dotenv from "dotenv";
import shoppingListRouter from "./routes/shoppingListRouter";
import authRouter from "./routes/authRouter";
import errorMiddlewares from "./middlewares/errorMiddlewares";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(shoppingListRouter);
app.use(authRouter);

// must be at the end of routers
app.use(errorMiddlewares);

app.listen(PORT, () => {
    console.log("server is now working on : " + `http://localhost:${PORT}`);
});
