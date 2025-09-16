/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

import { z } from "zod";

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Domain models
 */
export const PatientSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional().or(z.literal("")),
  birthDate: z.string().optional(),
  notes: z.string().optional().default(""),
  allergies: z.array(z.string()).default([]),
  prakriti: z.enum(["Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Kapha", "Vata-Kapha"]).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Patient = z.infer<typeof PatientSchema> & { id: string; createdAt: string; updatedAt: string };

export const TherapySessionSchema = z.object({
  id: z.string().optional(),
  patientId: z.string().min(1),
  therapyType: z.string().min(1), // e.g., Abhyanga, Shirodhara
  therapist: z.string().min(1),
  room: z.string().min(1),
  start: z.string(), // ISO datetime
  end: z.string(),   // ISO datetime
  notes: z.string().optional().default(""),
  status: z.enum(["scheduled", "completed", "cancelled"]).default("scheduled"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type TherapySession = z.infer<typeof TherapySessionSchema> & { id: string; createdAt: string; updatedAt: string };

export const DateQuerySchema = z.object({ date: z.string().optional() });
