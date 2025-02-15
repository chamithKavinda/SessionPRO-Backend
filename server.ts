import express from "express";
import sessionRouter from "./routes/SessionRoutes";

const app = express();

app.use(express.json());
app.use("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type");
    next();
});
app.use("/session", sessionRouter);
app.listen(3000, (err) => {
    console.log("The server is running on port 3000");
});