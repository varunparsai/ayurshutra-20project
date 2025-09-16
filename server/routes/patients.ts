import { RequestHandler } from "express";
import { PatientSchema } from "@shared/api";
import { db, removePatient, upsertPatient } from "../data/store";

export const listPatients: RequestHandler = (_req, res) => {
  const items = Array.from(db.patients.values());
  res.json({ items });
};

export const getPatient: RequestHandler = (req, res) => {
  const { id } = req.params;
  const item = db.patients.get(id);
  if (!item) return res.status(404).json({ error: "Patient not found" });
  res.json(item);
};

export const createPatient: RequestHandler = (req, res) => {
  const parsed = PatientSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  const { id, createdAt, updatedAt, ...data } = parsed.data;
  const saved = upsertPatient(data as any);
  res.status(201).json(saved);
};

export const updatePatient: RequestHandler = (req, res) => {
  const { id } = req.params;
  const parsed = PatientSchema.partial().safeParse({ ...req.body, id });
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  const existing = db.patients.get(id);
  if (!existing) return res.status(404).json({ error: "Patient not found" });
  const saved = upsertPatient({ ...existing, ...parsed.data, id } as any);
  res.json(saved);
};

export const deletePatient: RequestHandler = (req, res) => {
  const { id } = req.params;
  const existing = db.patients.get(id);
  if (!existing) return res.status(404).json({ error: "Patient not found" });
  removePatient(id);
  res.status(204).send();
};
