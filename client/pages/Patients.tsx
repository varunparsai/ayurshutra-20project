import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

export default function Patients() {
  return (
    <section className="container py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="mt-1 text-muted-foreground">
            Manage patient profiles, history, and therapy plans.
          </p>
        </div>
        <Button className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </span>
                Patient #{i}
              </CardTitle>
              <CardDescription>Ayurveda ID: AS-{1000 + i}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Next therapy</span>
                <span>— Not scheduled</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="secondary">
                  View
                </Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
