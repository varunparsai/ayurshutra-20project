import { Link, NavLink, useLocation } from "react-router-dom";
import { CalendarDays, Users, Plus, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            AyurSutra
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavItem to="/" label="Home" active={location.pathname === "/"} />
          <NavItem to="/patients" label="Patients" />
          <NavItem to="/schedule" label="Schedule" />
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link to="/schedule" className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              View Schedule
            </Link>
          </Button>
          <Button asChild>
            <Link to="/patients" className="inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Patient
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, label, active }: { to: string; label: string; active?: boolean }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
          (isActive || active) && "text-foreground",
        )
      }
      end
    >
      {label}
    </NavLink>
  );
}
