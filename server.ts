import express from "express";
import sessionRouter from "./routes/SessionRoutes";
import speakerRouter from "./routes/SpeakerRoutes";
import userRouter from "./routes/UserRoutes";

const app = express();

// Middleware to handle JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to set headers for CORS
app.use("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type");
    next();
});

app.use("/session", sessionRouter);
app.use("/speaker", speakerRouter);
app.use("/user", userRouter);

app.listen(3000, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("The server is running on port 3000");
    }
});
