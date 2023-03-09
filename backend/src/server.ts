import app from "./app";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();
app.use(router);
