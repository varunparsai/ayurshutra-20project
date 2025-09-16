import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Schedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <section className="container py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <p className="mt-1 text-muted-foreground">
          Book Panchakarma therapies with conflict-free, color-coded slots.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Therapy Calendar</CardTitle>
            <CardDescription>
              Select a date to begin scheduling.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Today · No sessions scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">
              Your booked therapies will appear here.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
