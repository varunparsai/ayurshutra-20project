import { RequestHandler } from "express";
import { DateQuerySchema, TherapySessionSchema } from "@shared/api";
import { db, removeSession, upsertSession } from "../data/store";

export const listSessions: RequestHandler = (req, res) => {
  const parsed = DateQuerySchema.safeParse(req.query);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  const { date } = parsed.data;

  let items = Array.from(db.sessions.values());
  if (date) {
    const d = new Date(date);
    const yyyy = d.getUTCFullYear();
    const mm = d.getUTCMonth();
    const dd = d.getUTCDate();
    const start = new Date(Date.UTC(yyyy, mm, dd, 0, 0, 0));
    const end = new Date(Date.UTC(yyyy, mm, dd + 1, 0, 0, 0));
    items = items.filter(
      (s) => new Date(s.start) < end && new Date(s.end) > start,
    );
  }

  res.json({ items });
};

export const createSession: RequestHandler = (req, res) => {
  const parsed = TherapySessionSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  const { id, createdAt, updatedAt, ...data } = parsed.data;

  if (!db.patients.get(data.patientId)) {
    return res
      .status(400)
      .json({ error: `Patient ${data.patientId} does not exist` });
  }

  const result = upsertSession(data as any);
  if (!result.ok) return res.status(409).json({ error: result.error });
  res.status(201).json(result.value);
};

export const updateSession: RequestHandler = (req, res) => {
  const { id } = req.params;
  const parsed = TherapySessionSchema.partial().safeParse({ ...req.body, id });
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  const existing = db.sessions.get(id);
  if (!existing) return res.status(404).json({ error: "Session not found" });
  const result = upsertSession({ ...existing, ...parsed.data, id } as any);
  if (!result.ok) return res.status(409).json({ error: result.error });
  res.json(result.value);
};

export const deleteSession: RequestHandler = (req, res) => {
  const { id } = req.params;
  const existing = db.sessions.get(id);
  if (!existing) return res.status(404).json({ error: "Session not found" });
  removeSession(id);
  res.status(204).send();
};
