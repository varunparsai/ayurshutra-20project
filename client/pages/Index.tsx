import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Users,
  Stethoscope,
  Clock8,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-40 bottom-[-10rem] h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              New: conflict-free therapy scheduling
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              AyurSutra — Panchakarma
              <br />
              Patient Management and
              <br />
              therapy scheduling Software
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              A modern, secure platform to manage patients, craft personalized
              Panchakarma plans, and schedule therapies seamlessly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="px-6">
                <Link to="/patients" className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Start Managing Patients
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="px-6">
                <Link to="/schedule" className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  View Schedule
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                HIPAA-ready patterns
              </div>
              <div className="flex items-center gap-2">
                <Clock8 className="h-4 w-4" />
                Save hours weekly
              </div>
            </div>
          </div>

          <div className="">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/50 shadow-xl ring-1 ring-border">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Today at a glance
                </CardTitle>
                <CardDescription>
                  Preview of your clinic dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Stat label="Appointments" value="12" trend="+3" />
                  <Stat label="Active Therapies" value="8" trend="+1" />
                  <Stat label="New Patients" value="4" trend="+2" />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-2 text-sm font-medium text-muted-foreground">
                      Next session
                    </div>
                    <div className="text-lg font-semibold">
                      Abhyanga · 11:30 AM
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Room A · Therapist Meera
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-2 text-sm font-medium text-muted-foreground">
                      Low availability
                    </div>
                    <div className="text-lg font-semibold">
                      Shirodhara beds · 1 left
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Today 2–5 PM peak
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border bg-primary/5 p-4 text-sm">
                  Tip: Build bespoke therapy plans with dosha-based templates.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Designed for Panchakarma excellence
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to run a serene, efficient therapy center.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<Users className="h-5 w-5" />}
            title="Patient Profiles"
            desc="Medical history, prakriti, allergies, alerts—organized and secure."
          />
          <Feature
            icon={<Stethoscope className="h-5 w-5" />}
            title="Therapy Plans"
            desc="Build tailored plans: Vamana, Virechana, Basti, Nasya, Raktamokshana."
          />
          <Feature
            icon={<CalendarDays className="h-5 w-5" />}
            title="Smart Scheduling"
            desc="Room, therapist and equipment awareness to prevent conflicts."
          />
          <Feature
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Privacy First"
            desc="Role-based access, audit logs and encryption best practices."
          />
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      <div className="mt-1 text-xs text-emerald-600">{trend} today</div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </span>
          {title}
        </CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
