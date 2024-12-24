import express, { Request, Response, NextFunction } from "express";
import { setupMiddleware } from "./middleware";
import router from "./routes/receipts";

// Init with port
const app = express();
const PORT = process.env.PORT || 3000;

// Setup middleware
setupMiddleware(app);

// Setup routes
app.use("/receipts", router);

// 404 error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ error: "Route not found" });
});

// General error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: "An internal server error occurred" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
