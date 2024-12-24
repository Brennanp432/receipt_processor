import { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import express from "express";

export const setupMiddleware = (app: Application): void => {
  app.use(express.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  app.use(morgan("dev")); // Log requests to the console
  app.use(cors());
};
