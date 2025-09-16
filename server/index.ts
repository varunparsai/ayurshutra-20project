import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  createPatient,
  deletePatient,
  getPatient,
  listPatients,
  updatePatient,
} from "./routes/patients";
import {
  createSession,
  deleteSession,
  listSessions,
  updateSession,
} from "./routes/schedule";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Patients
  app.get("/api/patients", listPatients);
  app.post("/api/patients", createPatient);
  app.get("/api/patients/:id", getPatient);
  app.put("/api/patients/:id", updatePatient);
  app.delete("/api/patients/:id", deletePatient);

  // Schedule
  app.get("/api/sessions", listSessions);
  app.post("/api/sessions", createSession);
  app.put("/api/sessions/:id", updateSession);
  app.delete("/api/sessions/:id", deleteSession);

  // Error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(
    (
      err: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error("Unhandled error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    },
  );

  return app;
}
