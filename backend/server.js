const app = require("./app");
const connectdb = require("./database/db");

const dotenv = require("dotenv");
dotenv.config();


process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log("sutting down the server due to unhandled promice rejection");
    process.exit(1);
});

connectdb();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`server is listening at port no ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log("sutting down the server due to unhandled promice rejection");
    server.close(() => {
        process.exit(1);
    });
});
