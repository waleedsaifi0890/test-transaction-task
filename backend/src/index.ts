import express, { Request, Response } from "express";
import router from "./routes";
import cors from "cors";

// Create an Express application
const app = express();
const port = process.env.PORT || 4000;
// Define a simple route
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from test transaction server");
});

app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
