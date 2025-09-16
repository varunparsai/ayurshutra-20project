import { Patient, TherapySession } from "@shared/api";

function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export const db = {
  patients: new Map<string, Patient>(),
  sessions: new Map<string, TherapySession>(),
};

export const createTimestamps = () => {
  const now = new Date().toISOString();
  return { createdAt: now, updatedAt: now } as const;
};

export function upsertPatient(
  input: Omit<Patient, "id" | "createdAt" | "updatedAt"> &
    Partial<Pick<Patient, "id">>,
): Patient {
  if (!input.id) {
    const id = uid("pat");
    const patient: Patient = { ...input, id, ...createTimestamps() } as Patient;
    db.patients.set(id, patient);
    return patient;
  }
  const existing = db.patients.get(input.id);
  const updated: Patient = {
    ...(existing ?? ({} as Patient)),
    ...input,
    id: input.id,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.patients.set(updated.id, updated);
  return updated;
}

export function removePatient(id: string) {
  db.patients.delete(id);
  // also cascade delete sessions
  for (const [sid, s] of db.sessions)
    if (s.patientId === id) db.sessions.delete(sid);
}

export function overlaps(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
) {
  const aS = new Date(aStart).getTime();
  const aE = new Date(aEnd).getTime();
  const bS = new Date(bStart).getTime();
  const bE = new Date(bEnd).getTime();
  return aS < bE && bS < aE;
}

export function upsertSession(
  input: Omit<TherapySession, "id" | "createdAt" | "updatedAt"> &
    Partial<Pick<TherapySession, "id">>,
): { ok: true; value: TherapySession } | { ok: false; error: string } {
  // conflict checks: therapist and room cannot overlap
  for (const s of db.sessions.values()) {
    if (input.id && s.id === input.id) continue;
    if (
      s.therapist === input.therapist &&
      overlaps(s.start, s.end, input.start, input.end)
    ) {
      return {
        ok: false,
        error: `Therapist ${input.therapist} is already booked for this time.`,
      };
    }
    if (
      s.room === input.room &&
      overlaps(s.start, s.end, input.start, input.end)
    ) {
      return {
        ok: false,
        error: `Room ${input.room} is already in use for this time.`,
      };
    }
  }

  if (!input.id) {
    const id = uid("sess");
    const session: TherapySession = {
      ...input,
      id,
      ...createTimestamps(),
    } as TherapySession;
    db.sessions.set(id, session);
    return { ok: true, value: session };
  }

  const existing = db.sessions.get(input.id);
  const updated: TherapySession = {
    ...(existing ?? ({} as TherapySession)),
    ...input,
    id: input.id,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.sessions.set(updated.id, updated);
  return { ok: true, value: updated };
}

export function removeSession(id: string) {
  db.sessions.delete(id);
}
