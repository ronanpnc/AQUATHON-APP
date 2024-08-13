import { Request, Response } from "express";
import { app } from "./server";

const port = 8080;
app.get("/", (req: Request, res:Response) => {
    res.status(200).send("hello AA! Team!!!");
});

app.listen(port, () => {
    console.log(`running Node server on http://127.0.0.1:${port}`);
})
