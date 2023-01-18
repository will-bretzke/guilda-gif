// const express = require('express');

// let app = express();

// const port = process.env.PORT || 3000;
// const http = require('http');
// const server = http.createServer(app);
// server.listen(port);

import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use(express.json());
app.use(routes);

app.use(
    (
        err: Error,
        request: Request,
        response: Response,
        // eslint-disable-next-line
        next: NextFunction
    ) => {
        return response.status(500).json({
            status: "error",
            message: `[Internal server error] ${err.message}`
        });
    }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
